import { describe, expect, it } from 'bun:test'
import '../as/build/index.wasm'
import {
  disassembleBytecode,
} from '../src/live/compiler/index.ts'
import { setup } from './test-utils.ts'

await setup()

const testUtils = await import('./test-utils.ts')
const core = testUtils.coreSingleton
if (!core) throw new Error('WASM not loaded')

const { controlPipeline } = await import('../src/live/pipeline.ts')

function getArenaStats(vmId: number) {
  const arenaInfoPtr = core!.wasm.getAudioVmArenaInfoAt(vmId)
  const stats = new Uint32Array(core!.memory.buffer, arenaInfoPtr, 8)
  return {
    allocated: stats[0],
    reused: stats[1],
    released: stats[2],
    inFlight: stats[3],
    pCap: stats[4],
    pCount: stats[5],
    pTomb: stats[6],
    buckets: stats[7],
    // Computed: totalAllocs = allocated + reused (total get() calls)
    totalAllocs: stats[0] + stats[1],
  }
}

function getVmInfo(vmId: number) {
  const infoPtr = core!.wasm.getAudioVmInfoAt(vmId)
  const info = new Uint32Array(core!.memory.buffer, infoPtr, 30)
  return { cellsLength: info[18], globalsLength: info[19] }
}

function getOversampleDebug(vmId: number) {
  const infoPtr = core!.wasm.getAudioVmInfoAt(vmId)
  const info = new Uint32Array(core!.memory.buffer, infoPtr, 30)
  return {
    osRetain: info[24],
    osReleaseTemp: info[25],
    osReleaseDownsample: info[26],
    osReleaseClosureCells: info[27],
    innerGet: info[28],
    innerRelease: info[29],
  }
}

function runTicks(vmId: number, bytecode: Float32Array, ticks: number, bufferLength = 128) {
  const audioOpsPtr = core!.wasm.createFloat32Buffer(bytecode.length)
  new Float32Array(core!.memory.buffer, audioOpsPtr, bytecode.length).set(bytecode)

  const sampleRate = 48000
  const nyquist = sampleRate * 0.5
  const piOverNyquist = Math.PI / nyquist
  const bpm = 144

  let sampleCount = 0
  for (let t = 0; t < ticks; t++) {
    core!.wasm.runAudioVmAt(vmId, audioOpsPtr, bytecode.length, bufferLength, sampleCount, sampleRate, nyquist,
      piOverNyquist, bpm)
    if (ticks % 20 === 0) core!.wasm.__collect()
    sampleCount += bufferLength
  }

  core!.wasm.freeFloat32Buffer(audioOpsPtr)
}

describe('memory leak detection', () => {
  it('simple sine should stabilize memory', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = 'out(sine(440))'
    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable (allocated count should not grow significantly)
    const growth = after.allocated - warmup.allocated
    expect(growth).toBeLessThan(10) // Allow small variance
  })

  it('oversample with no captures should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `synth=hz->hz|>oversample(4,()->sine($))
out(synth(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable
    const growth = after.allocated - warmup.allocated
    console.log(`Oversample (no captures) test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  pCount: ${warmup.pCount} -> ${after.pCount}`)
    expect(growth).toBeLessThan(100)
  })

  it('oversample with captures should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2)
out(synth(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable
    const growth = after.allocated - warmup.allocated
    const debug = getOversampleDebug(vmId)
    console.log(
      `Oversample (with captures) test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`,
    )
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  pCount: ${warmup.pCount} -> ${after.pCount}`)
    console.log(
      `  oversample debug: retain=${debug.osRetain} releaseTemp=${debug.osReleaseTemp} releaseDownsample=${debug.osReleaseDownsample} releaseClosureCells=${debug.osReleaseClosureCells} innerGet=${debug.innerGet} innerRelease=${debug.innerRelease}`,
    )
    expect(growth).toBeLessThan(100)
  })

  it('oversample with scalar capture should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `x=0.5
synth=hz->hz|>oversample(4,()->sine($)*x)
out(synth(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable
    const growth = after.allocated - warmup.allocated
    console.log(
      `Oversample (scalar capture) test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`,
    )
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  pCount: ${warmup.pCount} -> ${after.pCount}`)
    expect(growth).toBeLessThan(100)
  })

  describe('memory leak isolation (fine-grained)', () => {
    // These isolate which pattern leaks. Current finding: oversample + audio capture = 1 buffer/tick leak.
    // Closure over audio without oversample passes; oversample without audio capture passes; stereo return passes.

    it('isolate: oversample with scalar capture only (no audio, should pass)', () => {
      const code = `x=0.5
synth=hz->hz|>oversample(4,()->sine(440)*x)
out(synth(440))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      console.log(`isolate oversample+scalar: growth=${growth} (500 ticks)`)
      expect(growth).toBeLessThan(100)
    })

    it('isolate: oversample with one audio capture (trig only)', () => {
      const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine(440)*trig)
out(synth(440))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      const inFlightGrowth = after.inFlight - warmup.inFlight
      console.log(`isolate oversample+trig: growth=${growth} inFlightGrowth=${inFlightGrowth} (500 ticks)`)
      expect(growth).toBeLessThan(100)
    })

    it('isolate: closure reading audio, no oversample', () => {
      const code = `trig=every(1/8)
f=()->sine(440)*trig
out(f())`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      console.log(`isolate closure+audio: growth=${growth} (500 ticks)`)
      expect(growth).toBeLessThan(100)
    })

    it('isolate: oversample with ad(trig) only (minimal envelope capture)', () => {
      const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine(440)*ad(0.001,0.5,trig)**2)
out(synth(440))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      console.log(`isolate oversample+ad(trig): growth=${growth} (500 ticks)`)
      expect(growth).toBeLessThan(100)
    })

    it('isolate: every(1/8) only, no closure', () => {
      const code = `out(every(1/8))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      console.log(`isolate every only: growth=${growth} (500 ticks)`)
      expect(growth).toBeLessThan(50)
    })

    it('isolate: growth per tick (oversample with captures, reports rate)', () => {
      const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine($)*ad(.0001,.5,trig)**2)
out(synth(440))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!

      runTicks(0, bytecode, 50)
      const w = getArenaStats(0)
      runTicks(0, bytecode, 100)
      const a100 = getArenaStats(0)
      core!.wasm.resetAudioVmAt(0)
      runTicks(0, bytecode, 50)
      const w2 = getArenaStats(0)
      runTicks(0, bytecode, 200)
      const a200 = getArenaStats(0)

      const g100 = a100.allocated - w.allocated
      const g200 = a200.allocated - w2.allocated
      const rate100 = g100 / 100
      const rate200 = g200 / 200
      console.log(`per-tick: after 100 ticks growth=${g100} (${rate100.toFixed(2)}/tick)`)
      console.log(`per-tick: after 200 ticks growth=${g200} (${rate200.toFixed(2)}/tick)`)
      // Strict: should be ~0/tick once leak is fixed
      expect(g100).toBeLessThan(50)
      expect(g200).toBeLessThan(100)
    })

    it('isolate: oversample returning stereo array', () => {
      const code = `synth=hz->hz|>oversample(4,()->[sine(440),sine(440)])
out(synth(440))`
      core!.wasm.resetAudioVmAt(0)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(0, bytecode, 100)
      const warmup = getArenaStats(0)
      runTicks(0, bytecode, 500)
      const after = getArenaStats(0)
      const growth = after.allocated - warmup.allocated
      console.log(`isolate oversample stereo return: growth=${growth} (500 ticks)`)
      expect(growth).toBeLessThan(100)
    })
  })

  it('just binary op should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Simplest case: just sine * scalar, no oversample
    const code = `out(sine(440)*0.5)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const growth = after.allocated - warmup.allocated
    console.log(
      `Binary op test: warmup allocated=${warmup.allocated} reused=${warmup.reused} released=${warmup.released}`,
    )
    console.log(`Binary op test: after  allocated=${after.allocated} reused=${after.reused} released=${after.released}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  totalAllocs: ${warmup.totalAllocs} -> ${after.totalAllocs}`)
    console.log(`  allocGrowth=${growth}, releaseGrowth=${after.released - warmup.released}`)
    expect(growth).toBeLessThan(10)
  })

  it('just sine should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `out(sine(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const growth = after.allocated - warmup.allocated
    console.log(`Just sine test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    expect(growth).toBeLessThan(10)
  })

  it('oversample without multiply should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Oversample with just sine, no multiply
    const code = `synth=hz->hz|>oversample(4,()->sine($))
out(synth(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const growth = after.allocated - warmup.allocated
    console.log(`Oversample no-mul test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    expect(growth).toBeLessThan(10)
  })

  it('oversample with multiply but no capture should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Oversample with multiply, but multiplier is literal not captured
    const code = `synth=hz->hz|>oversample(4,()->sine($)*0.5)
out(synth(440))`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const growth = after.allocated - warmup.allocated
    console.log(
      `Oversample mul-no-capture test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`,
    )
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    expect(growth).toBeLessThan(10)
  })

  it('record and sampler should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `bpm=144
trig=every(1/8)
kicksynth=(x,trig=1)->{
  sine(x+18000*ad(.001,.8,trig)**300,offset:.5,trig)*ad(.012,.8,trig)**8
}
kick=(y=52,z=1/4)->{
  sample=record(1,()->kicksynth(y))
  sampler(sample,trig:every(z))
}
kick(52,1/4) |> out($)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable
    const growth = after.allocated - warmup.allocated
    console.log(`Record test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  pCount: ${warmup.pCount} -> ${after.pCount}`)
    expect(growth).toBeLessThan(100)
  })

  it('program swap should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Run first program
    const code1 = `trig=every(1/4)
synth=hz->sine(hz)*ad(.01,.5,trig)
out(synth(440))`
    const result1 = controlPipeline.compileSource(code1)
    expect(result1.compile.bytecode).toBeDefined()
    const bytecode1 = result1.compile.bytecode!
    runTicks(vmId, bytecode1, 100)

    // Reset (simulating program swap)
    core!.wasm.resetAudioVmAt(vmId)
    const afterReset = getArenaStats(vmId)

    // Run second program
    const code2 = `out(sine(220))`
    const result2 = controlPipeline.compileSource(code2)
    expect(result2.compile.bytecode).toBeDefined()
    const bytecode2 = result2.compile.bytecode!
    runTicks(vmId, bytecode2, 100)
    const afterSecond = getArenaStats(vmId)

    // Reset again
    core!.wasm.resetAudioVmAt(vmId)
    const afterSecondReset = getArenaStats(vmId)

    console.log(`Program swap test:`)
    console.log(`  After reset 1: inFlight=${afterReset.inFlight}`)
    console.log(`  After program 2: inFlight=${afterSecond.inFlight}`)
    console.log(`  After reset 2: inFlight=${afterSecondReset.inFlight}`)

    // After reset, inFlight should be 0 (all buffers returned to pool)
    expect(afterReset.inFlight).toBe(0)
    expect(afterSecondReset.inFlight).toBe(0)
  })

  it('multiple resets should not leak', () => {
    const vmId = 0

    for (let round = 0; round < 5; round++) {
      core!.wasm.resetAudioVmAt(vmId)

      const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine($)*ad(.01,.5,trig))
out(synth(440))`
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      runTicks(vmId, result.compile.bytecode!, 50)
    }

    core!.wasm.resetAudioVmAt(vmId)
    const final = getArenaStats(vmId)

    console.log(`Multiple resets test: final inFlight=${final.inFlight}`)
    expect(final.inFlight).toBe(0)
  })

  it('stereo arrays should not leak on reset', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Code that creates stereo arrays
    const code = `out(sine(440), sine(550))`
    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    runTicks(vmId, result.compile.bytecode!, 100)
    const beforeReset = getArenaStats(vmId)

    core!.wasm.resetAudioVmAt(vmId)
    const afterReset = getArenaStats(vmId)

    console.log(`Stereo arrays test: before=${beforeReset.inFlight}, after=${afterReset.inFlight}`)
    expect(afterReset.inFlight).toBe(0)
  })

  it('nested function calls should not leak on reset', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `add=(a,b)->a+b
mul=(a,b)->a*b
synth=hz->mul(sine(hz), add(0.3, 0.2))
out(synth(440))`
    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    runTicks(vmId, result.compile.bytecode!, 100)

    core!.wasm.resetAudioVmAt(vmId)
    const afterReset = getArenaStats(vmId)

    console.log(`Nested functions test: afterReset inFlight=${afterReset.inFlight}`)
    expect(afterReset.inFlight).toBe(0)
  })

  it('complex chain of binary ops should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    // Many chained binary operations
    const code = `out(sine(440)*0.5+sine(880)*0.3-sine(220)*0.1)`
    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    runTicks(vmId, result.compile.bytecode!, 100)
    const warmup = getArenaStats(vmId)

    runTicks(vmId, result.compile.bytecode!, 1000)
    const after = getArenaStats(vmId)

    const growth = after.allocated - warmup.allocated
    console.log(`Chain binary ops test: growth=${growth}, inFlight=${warmup.inFlight} -> ${after.inFlight}`)
    expect(growth).toBeLessThan(10)
    expect(after.inFlight).toBe(warmup.inFlight)
  })

  it('rapid program swapping should not leak', () => {
    const vmId = 0

    const codes = [
      `out(sine(440)*0.5)`,
      `trig=every(1/4)\nout(sine(440)*ad(.01,.5,trig))`,
      `synth=hz->hz|>oversample(4,()->sine($))\nout(synth(440))`,
      `out(sine(440)+sine(880)*0.5-sine(220)*0.3)`,
      `x=0.5\nsynth=hz->sine(hz)*x\nout(synth(440))`,
    ]

    // Simulate rapid editing - run each program for just a few ticks then swap
    for (let round = 0; round < 10; round++) {
      for (const code of codes) {
        core!.wasm.resetAudioVmAt(vmId)
        const result = controlPipeline.compileSource(code)
        if (result.compile.bytecode) {
          runTicks(vmId, result.compile.bytecode, 10) // Very few ticks
        }
      }
    }

    core!.wasm.resetAudioVmAt(vmId)
    const final = getArenaStats(vmId)

    console.log(`Rapid swap test: final inFlight=${final.inFlight}, pCount=${final.pCount}`)
    expect(final.inFlight).toBe(0)
  })

  it('copyAudioVmState swap should not leak WASM memory', () => {
    // This simulates the REAL worklet swap behavior:
    // 1. VM 0 runs program A
    // 2. VM 1 is created, copyAudioVmState(0, 1)
    // 3. Both run during crossfade
    // 4. VM 0 is reset and pooled
    // 5. Repeat with VM 1 -> VM 0, etc.

    const wasmMemoryBefore = core!.memory.buffer.byteLength

    const codes = [
      `out(sine(440)*0.5)`,
      `trig=every(1/4)\nout(sine(440)*ad(.01,.5,trig))`,
      `synth=hz->hz|>oversample(4,()->sine($))\nout(synth(440))`,
      `out(noise()*0.1)`,
      `out(square(440)*0.3)`,
    ]

    let fromVm = 0
    let toVm = 1

    // Reset both VMs initially
    core!.wasm.resetAudioVmAt(0)
    core!.wasm.resetAudioVmAt(1)

    // Run initial program on VM 0
    const init = controlPipeline.compileSource(codes[0])
    if (init.compile.bytecode) runTicks(0, init.compile.bytecode, 50)

    // Simulate 50 swap cycles (like editing 50 times)
    for (let i = 1; i < 50; i++) {
      const code = codes[i % codes.length]
      const result = controlPipeline.compileSource(code)
      if (!result.compile.bytecode) continue

      // Copy state from running VM to new VM (like worklet does)
      core!.wasm.copyAudioVmState(fromVm, toVm)

      // Run both VMs (simulating crossfade)
      runTicks(fromVm, init.compile.bytecode!, 5)
      runTicks(toVm, result.compile.bytecode, 5)

      // Reset the old VM (like disposeProgramSync does)
      core!.wasm.resetAudioVmAt(fromVm)
      core!.wasm.__collect()

      // Swap which VM is "from" and "to"
      const temp = fromVm
      fromVm = toVm
      toVm = temp
    }

    // Reset both VMs
    core!.wasm.resetAudioVmAt(0)
    core!.wasm.resetAudioVmAt(1)

    const wasmMemoryAfter = core!.memory.buffer.byteLength
    const memGrowth = wasmMemoryAfter - wasmMemoryBefore

    const stats0 = getArenaStats(0)
    const stats1 = getArenaStats(1)

    console.log(`copyAudioVmState swap test:`)
    console.log(`  WASM memory: ${wasmMemoryBefore} -> ${wasmMemoryAfter}, growth=${memGrowth}`)
    console.log(`  VM 0 inFlight=${stats0.inFlight}`)
    console.log(`  VM 1 inFlight=${stats1.inFlight}`)

    expect(stats0.inFlight).toBe(0)
    expect(stats1.inFlight).toBe(0)
    // Allow some growth for gen pools, but it should stabilize
    expect(memGrowth).toBeLessThan(2 * 1024 * 1024) // Less than 2MB growth
  })

  it('oversample with audio capture swap should not leak', () => {
    const vmId = 0

    // Program with oversample capturing audio
    const code = `trig=every(1/8)
env=ad(.01,.5,trig)
synth=hz->hz|>oversample(4,()->sine($)*env)
out(synth(440))`

    for (let round = 0; round < 5; round++) {
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      runTicks(vmId, result.compile.bytecode!, 50)
    }

    core!.wasm.resetAudioVmAt(vmId)
    const final = getArenaStats(vmId)

    console.log(`Oversample audio capture swap test: final inFlight=${final.inFlight}`)
    expect(final.inFlight).toBe(0)
  })

  it.skip('WASM memory should stabilize', () => {
    const vmId = 0

    const code = `trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine($)*ad(.01,.5,trig))
out(synth(440))`

    // Run many cycles
    for (let round = 0; round < 50; round++) {
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      if (result.compile.bytecode) {
        runTicks(vmId, result.compile.bytecode, 100)
      }
    }

    const memoryBefore = core!.memory.buffer.byteLength

    // Run more cycles
    for (let round = 0; round < 200; round++) {
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      if (result.compile.bytecode) {
        runTicks(vmId, result.compile.bytecode, 100)
      }
    }

    const memoryAfter = core!.memory.buffer.byteLength
    const memoryGrowth = memoryAfter - memoryBefore

    console.log(`WASM memory test: before=${memoryBefore}, after=${memoryAfter}, growth=${memoryGrowth}`)

    // Memory growth should be minimal (allow some for pool growth)
    expect(memoryGrowth).toBeLessThan(1024 * 1024) // Less than 1MB growth
  }, 40_000)

  it('continuous running with edits should not leak', () => {
    const vmId = 0

    const codes = [
      `trig=every(1/8)\nsynth=hz->sine(hz)*ad(.01,.5,trig)\nout(synth(440))`,
      `trig=every(1/4)\nsynth=hz->sine(hz)*ad(.02,.3,trig)\nout(synth(880))`,
      `trig=every(1/2)\nsynth=hz->hz|>oversample(4,()->sine($))*ad(.01,.1,trig)\nout(synth(440))`,
    ]

    // Simulate continuous running with code changes (editing)
    // Each "edit" we reset and run new code WITHOUT stopping the "transport"
    const arenaStatsBefore = getArenaStats(vmId)

    for (let round = 0; round < 30; round++) {
      core!.wasm.resetAudioVmAt(vmId)
      const code = codes[round % codes.length]
      const result = controlPipeline.compileSource(code)
      if (result.compile.bytecode) {
        // Run for several ticks (simulating continuous playback)
        runTicks(vmId, result.compile.bytecode, 50)
      }
    }

    const arenaStatsAfter = getArenaStats(vmId)

    // Check that allocated count is reasonable (not growing unbounded)
    const allocGrowth = arenaStatsAfter.allocated - arenaStatsBefore.allocated
    console.log(
      `Continuous edit test: allocated growth=${allocGrowth}, inFlight before reset=${arenaStatsAfter.inFlight}`,
    )

    // After final reset, inFlight should be 0
    core!.wasm.resetAudioVmAt(vmId)
    const final = getArenaStats(vmId)
    console.log(`  After final reset: inFlight=${final.inFlight}`)

    expect(final.inFlight).toBe(0)
  })

  // Fine-grained isolation for the two failing tests: tb303 (cells) and drums+tri+rhodes (inFlight).
  // Findings: tb303 minimal cases all pass (cells). inFlight leaks isolated to drums()|>out and rhodes70(...,trig:every(1/16)).
  describe('tb303 / drums+rhodes isolation (fine-grained)', () => {
    const vmId = 0
    const warmupTicks = 100
    const measureTicks = 500

    function runAndGetCellsGrowth(code: string): number {
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      if (!result.compile.bytecode) return -1
      runTicks(vmId, result.compile.bytecode, warmupTicks)
      const warmupInfo = getVmInfo(vmId)
      runTicks(vmId, result.compile.bytecode, measureTicks)
      const afterInfo = getVmInfo(vmId)
      return afterInfo.cellsLength - warmupInfo.cellsLength
    }

    function runAndGetInFlightGrowth(code: string): number {
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      if (!result.compile.bytecode) return -1

      if (process.env.DEBUG) {
        console.log('Bytecode length:', result.compile.bytecode.length)
        console.log('\nDisassembly:')
        const disassembly = disassembleBytecode(result.compile.bytecode)
        for (const line of disassembly) {
          console.log(line)
        }
        console.log('')
      }

      runTicks(vmId, result.compile.bytecode, warmupTicks)
      const warmup = getArenaStats(vmId)
      runTicks(vmId, result.compile.bytecode, measureTicks)
      const after = getArenaStats(vmId)
      return after.inFlight - warmup.inFlight
    }

    it('isolate tb303: every(1/16) + out only (cells)', () => {
      const code = `trig=every(1/16)
out(trig)`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate every+out: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: function with trig param, no named args (cells)', () => {
      const code = `trig=every(1/16)
f=(hz,cutoff,q,k,sat,trig)->sine(hz)*ad(.01,.5,trig)
out(f(440,.99,.00002,.9,trig))`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate f(...,trig) no named: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: diodeladder(ramp(hz),...) no trig in body (cells)', () => {
      const code = `f=(hz,cutoff,q,k,sat)->diodeladder(ramp(hz),cutoff,q,k,sat)|>tanh($*6)*.5|>dc($)
out(f(60,100,.99,.00002,.9))`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate diodeladder no trig: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: tb303 with positional args only, trig last (cells)', () => {
      const code = `trig=every(1/16)
tb303=(hz,cutoff,q,k,sat,trig)->diodeladder(ramp(hz),cutoff,q,k,sat)|>tanh($*6)*.5|>dc($)
out(tb303(60,100,.99,.00002,.9,trig))`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate positional+trig: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: tb303 with one named arg (cutoff:...) (cells)', () => {
      const code = `trig=every(1/16)
tb303=(hz,cutoff,q,k,sat,trig)->diodeladder(ramp(hz),cutoff,q,k,sat)|>tanh($*6)*.5|>dc($)
out(tb303(60,cutoff:200,.99,.00002,.9,trig))`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate one named arg: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: tb303 with ad(...,trig) in named arg (cells)', () => {
      const code = `trig=every(1/16)
tb303=(hz,cutoff,q,k,sat,trig)->diodeladder(ramp(hz),cutoff,q,k,sat)|>tanh($*6)*.5|>dc($)
out(tb303(60,cutoff:100+100*ad(.01,3,trig),.99,.00002,.9,trig))`
      const growth = runAndGetCellsGrowth(code)
      console.log(`tb303 isolate named+ad(trig): cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate tb303: drums() only (cells)', () => {
      const growth = runAndGetCellsGrowth('out(drums())')
      console.log(`tb303 isolate drums: cellsGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: drums() |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('drums()|>out($)')
      console.log(`drums isolate: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    // Drums path isolation: prelude drums = bd()+sd(seed)+ch(chw)+oh(ohw) |> limiter($); each uses record()+sampler().
    // Leak only when 3+ sampler outputs are summed: sine+sine+sine passes; bd()+sd(1)+ch(.9) leaks. So bug is in record/sampler path (or default-param gens like tram) when multiple sampler results are combined, not in generic binary add.
    it('isolate drums path: bd() only |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('bd()|>out($)')
      console.log(`drums path bd only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: sd(1) only |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('sd(1)|>out($)')
      console.log(`drums path sd only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: ch(.9) only |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('ch(.9)|>out($)')
      console.log(`drums path ch only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: oh(.4) only |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('oh(.4)|>out($)')
      console.log(`drums path oh only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: bd()+sd(1) no limiter |> out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('bd()+sd(1)|>out($)')
      console.log(`drums path bd+sd: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: ch(.9)+oh(.4) two-way sum (inFlight)', () => {
      const code = `chw=fract(1*1234.1234); ohw=fract(1*4567.4567); ch(chw)+oh(ohw)|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums path ch+oh 2-way sum: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    // Trace arena get/release (console.log from AS). Debug is enabled for all tests by default.
    it('trace arena get/release for ch+oh (run 2 ticks)', () => {
      const code = `chw=fract(1*1234.1234); ohw=fract(1*4567.4567); ch(chw)+oh(ohw)|>out($)`
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      if (result.compile.bytecode) runTicks(vmId, result.compile.bytecode, 2)
    })
    // ch/oh use oversample inside their record (hhsynth uses oversample(8,...)); test oversample-only sum
    it('isolate oversample: two oversample voices summed (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('oversample(8,()->sine(440))+oversample(8,()->sine(880))|>out($)')
      console.log(`oversample 2-way sum: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: sine(440)|>limiter($)|>out (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('sine(440)|>limiter($)|>out($)')
      console.log(`drums path limiter only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: sine+sine+sine three-way sum (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('sine(440)+sine(440)+sine(440)|>out($)')
      console.log(`drums path sine*3 sum: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: bd()+sd(1)+ch(.9) three-way sum (inFlight)', () => {
      const growth = runAndGetInFlightGrowth('bd()+sd(1)+ch(.9)|>out($)')
      console.log(`drums path 3-way sum: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })
    it('isolate drums path: bd()+sd(1)+ch(.9)+oh(.4) no limiter |> out (inFlight)', () => {
      const code = `chw=fract(1*1234.1234); ohw=fract(1*4567.4567); bd()+sd(1)+ch(chw)+oh(ohw)|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums path sum no limiter: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: tram + tri + ad(trig) (inFlight)', () => {
      const code = `trig=tram('x-x-x-',1/2)
tri(100*ad(.001,.5,trig))|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums isolate tram+tri+ad: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: rhodes70 with every(1/16) (inFlight)', () => {
      const code = `;[47,50][t*4]|>ntof($)|>rhodes70($,trig:every(1/16))*.1|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums isolate rhodes70+every: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate rhodes leak: .avg() on array of audio only (inFlight)', () => {
      const code = `[sine(440), sine(440)].avg() |> out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`isolate .avg() only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate rhodes leak: .avg() inside oversample (inFlight)', () => {
      const code = `oversample(4, ()-> [sine(440), sine(440)].avg() ) |> out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`isolate .avg() in oversample: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate rhodes leak: sum += audio in loop (chorus pattern) (inFlight)', () => {
      const code = `f=()->{ sum=0; for (i in 0..2) sum += sine(440+i); sum/3 }; f() |> out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`isolate sum+= in loop: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate rhodes leak: chorus(sine) only (inFlight)', () => {
      const code = `sine(440) |> chorus($, voices:2, rate:.15, depth:.003, spread:.4) |> out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`isolate chorus only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: tri + ad(trig) no tram (inFlight)', () => {
      const code = `trig=every(1/8)
tri(100*ad(.001,.5,trig))|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums isolate tri+ad: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: freeverb(sine) (inFlight)', () => {
      const code = `sine(440)|>freeverb($,.55,.6)|>out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums isolate freeverb: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    it('isolate drums+rhodes: tram only (inFlight)', () => {
      const code = `trig=tram('x-x-',1/2)
out(trig)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums isolate tram only: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    })

    // Full programs with same tick counts as the failing tests, to confirm what leaks
    it('isolate tb303: full program 1000 ticks (cells + inFlight)', () => {
      const code = `tb303=(hz,cutoff,q,k,sat,trig)->
  diodeladder(ramp(hz),cutoff,q,k,sat) |> tanh($*6)*.5 |> dc($)

trig=every(1/16) tb303([60,62,63,69][t]/2 |> ntof($),
cutoff:100+(1000+1k*fractal(5)**5)*ad(.01,3,12,trig),
q:.99,k:.00002,sat:.9,trig)*.2+drums() |> limiter($) |> out($)`
      core!.wasm.resetAudioVmAt(vmId)
      const result = controlPipeline.compileSource(code)
      expect(result.compile.bytecode).toBeDefined()
      const bytecode = result.compile.bytecode!
      runTicks(vmId, bytecode, 100)
      const warmupArena = getArenaStats(vmId)
      const warmupInfo = getVmInfo(vmId)
      runTicks(vmId, bytecode, 1000)
      const afterArena = getArenaStats(vmId)
      const afterInfo = getVmInfo(vmId)
      const cellsGrowth = afterInfo.cellsLength - warmupInfo.cellsLength
      const inFlightGrowth = afterArena.inFlight - warmupArena.inFlight
      console.log(`tb303 full 1000 ticks: cellsGrowth=${cellsGrowth} inFlightGrowth=${inFlightGrowth}`)
      expect(cellsGrowth).toBe(0)
      expect(inFlightGrowth).toBe(0)
    }, 20_000)

    it('isolate drums+rhodes: full kitchen-sink 1000 ticks (inFlight)', () => {
      const code = `drums() |> out($)

trig=tram('x-x-x-[xxx]-',1/2)

tri(95+[158,100][t*8]*ad(.001,.77,trig)**2)*ad(.00001,.24,trig)**3*.4
|> $+freeverb($,.55,.6)*1 |> out($)

;[47,50,51][t*4]|>ntof($)*1 |> rhodes70($,trig:every(1/16))*.08 |> out($)

;[51,54,55][t*4]|>ntof($)*2 |> rhodes70($,trig:every(1/16))*.03 |> out($)`
      const growth = runAndGetInFlightGrowth(code)
      console.log(`drums+rhodes full: inFlightGrowth=${growth}`)
      expect(growth).toBe(0)
    }, 20_000)
  })

  it('tb303 with diodeladder should not leak cells', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `tb303=(hz,cutoff,q,k,sat,trig)->
  diodeladder(ramp(hz),cutoff,q,k,sat) |> tanh($*6)*.5 |> dc($)

trig=every(1/16) tb303([60,62,63,69][t]/2 |> ntof($),
cutoff:100+(1000+1k*fractal(5)**5)*ad(.01,3,12,trig),
q:.99,k:.00002,sat:.9,trig)*.2+drums() |> limiter($) |> out($)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmupArena = getArenaStats(vmId)
    const warmupInfo = getVmInfo(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const afterArena = getArenaStats(vmId)
    const afterInfo = getVmInfo(vmId)

    const cellsGrowth = afterInfo.cellsLength - warmupInfo.cellsLength
    const inFlightGrowth = afterArena.inFlight - warmupArena.inFlight
    console.log(`tb303 test: cells ${warmupInfo.cellsLength} -> ${afterInfo.cellsLength}, growth=${cellsGrowth}`)
    console.log(`  inFlight: ${warmupArena.inFlight} -> ${afterArena.inFlight}, growth=${inFlightGrowth}`)
    expect(cellsGrowth).toBe(0)
    expect(inFlightGrowth).toBe(0)
  }, 20_000)

  it('cs80 should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `cs80=(
  hz,
  vel=1,
  trig,
  cutoff=4466,
  res=.8,
  brilliance=.9,
  aftertouch=.4
)->{
  v = clamp(vel,0,1)
  at = clamp(aftertouch,0,1)

  // =====================
  // Shared modulation
  // =====================
  vib = (.002 + .004*at) * lfosine(5.4)
  f   = hz * (1 + vib)

  // =====================
  // Voice I (saw-dominant, brassy)
  // =====================
  v1osc =
    saw(f,0,trig)*.7 +
    sine(f)*.3

  v1env = adsr(
    attack:.01,
    decay:.25,
    sustain:.6,
    release:1.6,
    exponent:3,
    trig
  )

  v1hp = hp(v1osc, 120 + 400*brilliance, .6)
  v1lp = lpm(
    v1hp,
    cutoff * (1 + v1env*1.5 + at*2),
    res + .15
  )

  v1 = v1lp * v1env

  // =====================
  // Voice II (pulse / sine, smoother)
  // =====================
  pw = .45 + .1*lfosine(.3)
  v2osc =
    oversample(12,()->pwm(f*1.002, pw, 0, trig))*.6 +
    sine(f*.5)*.4

  v2env = adsr(
    attack:.03,
    decay:.4,
    sustain:.5,
    release:2.4,
    exponent:3,
    trig
  )

  v2hp = hp(v2osc, 80, .7)
  v2lp = lpm(
    v2hp,
    cutoff*.7 * (1 + v2env + at*1.8),
    res*.8
  )

  v2 = v2lp * v2env

  // =====================
  // Layer mix + expressivity
  // =====================
  s = (v1 + v2) * (.25 + .75*v)

  // Signature CS-80 saturation (very gentle)
  s = tanh(s * 1.6)

  // Animate stereo (CS-80 is wide and alive)
  s = chorus(s, voices:3, rate:.18, depth:.001, spread:.7)

  s
}

#i.map(hz->cs80(hz*o4,trig:every(1/4))).avg() |> out($)
`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmupArena = getArenaStats(vmId)
    const warmupInfo = getVmInfo(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const afterArena = getArenaStats(vmId)
    const afterInfo = getVmInfo(vmId)

    const cellsGrowth = afterInfo.cellsLength - warmupInfo.cellsLength
    const inFlightGrowth = afterArena.inFlight - warmupArena.inFlight
    console.log(`cs80 test: cells ${warmupInfo.cellsLength} -> ${afterInfo.cellsLength}, growth=${cellsGrowth}`)
    console.log(`  inFlight: ${warmupArena.inFlight} -> ${afterArena.inFlight}, growth=${inFlightGrowth}`)
    expect(cellsGrowth).toBe(0)
    expect(inFlightGrowth).toBe(0)
  }, 20_000)

  it('large program should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `scale='hex'
transpose=[2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,21,23][t/1]

synth=>sine($/.54+sine($*1.98)*$*2.52)

oversample(3,()->((#vi7sus4*o1).map(synth).avg()/7+(#vi7sus4*o2).map(synth).avg()/18)

|> hps($,364,.90)

|> lps($,123,.93)

|> hs($,845,q:2,gain:36))

|> out($)

kicksynth=(x,trig=1)->sine(x+18000*ad(.001,.8,300,trig),offset:.5,trig)*ad(.012,.8,16,trig)

kick=(y=52,trig=every(1/4))->{
  sample=record(.2,()->kicksynth(y))
  sampler(sample,trig,offset:.05)
}

kick(trig:every(1/4)) |> lp($,54,2.7) |> out($)

ch(w:.5,trig:tram('--x-',1/4)) |> out($)

snare=(trig)->{
  sample=record(.155,()->{sdsynth(seed:1142,trig:step(.06,dec()))|>$+fdn($,.8,.7,.3,.2)})

  sampler(sample,trig)
}

snare(trig:tram('-x',1/2)) |> out($)

perc=()->{
  trig:=tram('--[xxx]---x-',1/2)

  sine(69+99*ad(.001,.84,2,trig))*ad(.00001,.12,6,trig)
}

perc() |> out($)

mix=>compressor($,thr:-25)*6 |> limiter($)
`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmupArena = getArenaStats(vmId)
    const warmupInfo = getVmInfo(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const afterArena = getArenaStats(vmId)
    const afterInfo = getVmInfo(vmId)

    const cellsGrowth = afterInfo.cellsLength - warmupInfo.cellsLength
    const inFlightGrowth = afterArena.inFlight - warmupArena.inFlight
    console.log(`     cells: ${warmupInfo.cellsLength} -> ${afterInfo.cellsLength}, growth=${cellsGrowth}`)
    console.log(`  inFlight: ${warmupArena.inFlight} -> ${afterArena.inFlight}, growth=${inFlightGrowth}`)
    expect(cellsGrowth).toBe(0)
    expect(inFlightGrowth).toBe(0)
  }, 20_000)

  it('kitchen-sink drums+tri+rhodes program should not leak inFlight', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `drums() |> out($)

trig=tram('x-x-x-[xxx]-',1/2)

tri(95+[158,100][t*8]*ad(.001,.77,trig)**2)*ad(.00001,.24,trig)**3*.4
|> $+freeverb($,.55,.6)*1 |> out($)

;[47,50,51][t*4]|>ntof($)*1 |> rhodes70($,trig:every(1/16))*.08 |> out($)

;[51,54,55][t*4]|>ntof($)*2 |> rhodes70($,trig:every(1/16))*.03 |> out($)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const inFlightGrowth = after.inFlight - warmup.inFlight
    console.log(`Drums+tri+rhodes test: inFlight ${warmup.inFlight} -> ${after.inFlight}, growth=${inFlightGrowth}`)
    expect(inFlightGrowth).toBe(0)
  }, 20_000)

  it('full user code should not leak', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `bpm=144

trig=every(1/8)

kicksynth=(x,trig=1)->{
  sine(x+18000*ad(.001,.8,trig)**300,offset:.5,trig)*ad(.012,.8,trig)**8
}

kick=(y=52,z=1/4)->{
  sample=record(1,()->kicksynth(y))
  sampler(sample,trig:every(z))
}

kick(52,1/4) |> out($)

synth=hz->hz|>oversample(4,()->sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2)

;[61,62,65,67,71,60][t*4] |> midiToHz($) |> synth($) |> out($)
;[61,62,65,67,71,60][t*4] |> midiToHz($+65) |> synth($) |> out($/1.5)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()

    const bytecode = result.compile.bytecode!

    // Warmup
    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    // Run more ticks
    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    // Memory should be stable
    const growth = after.allocated - warmup.allocated
    console.log(`Full code test: warmup=${warmup.allocated}, after=${after.allocated}, growth=${growth}`)
    console.log(`  inFlight: ${warmup.inFlight} -> ${after.inFlight}`)
    console.log(`  pCount: ${warmup.pCount} -> ${after.pCount}`)
    expect(growth).toBeLessThan(1200)
  })

  it('full user sidechain+delay program should not leak inFlight', () => {
    const vmId = 0
    core!.wasm.resetAudioVmAt(vmId)

    const code = `bpm=144 transpose=-3 scale='minor'

bd(
  punch:10.3k,
  cutoff:95k,
  q:.62,
  fm:trig->ad(.00005,.09,200,trig),
  filter:trig->ad(.001,.1,100,trig),
  amp:trig->ad(.0032,.5,21,trig),
  offset:.52,
  sampleOffset:.01,
) |> bus(0,$)

bus(0) |> $+delay($,.11,.2)/2+delay($,.3,.2)/2 |> lp($,55)/2 |> bus(1,$)

ch(0.2, trig:tram('xxxx',1/4))*[.2,.2,.7,.8][t*4] |> bus(1,$)

;[#1,#3].glide(1/2)*o2 |> saw($) |> lpm($,90,1) |> bus(1,$*.1)

;(#vi7sus2*o3).shuffle(11).walk(1/8)
|> sine($+sine($/1.02)*$*1.05)*.2+sine($+sine($*1.02)*$*1.05)*.5+sine($+sine($*12.02)*$*8.05)*.3
|> $*ad(.001,.11,3,trig:euclid(3,8)+euclid(3,8,6))*.4
|> lp($,1.5k) |> $+dattorro($,.5,.8)*.34 |> hp($,177,1) |> bus(1,$*.5)

bus(0) |> out($)

bus(1) |> compressor($,att:.0001,rel:.16,thr:-21,ratio:5,knee:4,key:bus(0)) |> out($)

mix=>compressor($,thr:-13)*2 |> limiter($)`

    const result = controlPipeline.compileSource(code)
    expect(result.compile.bytecode).toBeDefined()
    const bytecode = result.compile.bytecode!

    runTicks(vmId, bytecode, 100)
    const warmup = getArenaStats(vmId)

    runTicks(vmId, bytecode, 1000)
    const after = getArenaStats(vmId)

    const inFlightGrowth = after.inFlight - warmup.inFlight
    console.log(`Full sidechain+delay code: inFlight ${warmup.inFlight} -> ${after.inFlight}, growth=${inFlightGrowth}`)
    expect(inFlightGrowth).toBe(0)
  }, 30_000)
})
