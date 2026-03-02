import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { hashF32Bits } from '../../src/lib/bytecode-hash.ts'
import { sampleManager } from '../../src/lib/sample-manager.ts'
import { compile } from '../../src/live/compiler/index.ts'
import { parse } from '../../src/live/parser.ts'
import { controlPipeline } from '../../src/live/pipeline.ts'
import { audio, audioAsync, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

beforeEach(() => {
  sampleManager.clear()
})

describe('record function', () => {
  it('registers a record request', () => {
    const handle = sampleManager.registerRecord(null, 0.5, 1)
    expect(handle).toBeGreaterThan(0)
  })

  it('returns same handle for same record parameters', () => {
    const handle1 = sampleManager.registerRecord(null, 0.5, 1)
    const handle2 = sampleManager.registerRecord(null, 0.5, 1)
    expect(handle1).toBe(handle2)
  })

  it('returns different handles for different callback ids', () => {
    const handle1 = sampleManager.registerRecord(null, 0.5, 1)
    const handle2 = sampleManager.registerRecord(null, 0.5, 2)
    expect(handle1).not.toBe(handle2)
  })

  it('can manually record audio data', () => {
    const handle = sampleManager.registerRecord(null, 0.5, 10)
    const audioData = new Float32Array(24000)
    for (let i = 0; i < audioData.length; i++) {
      audioData[i] = Math.sin((i / 24000) * Math.PI * 2)
    }

    sampleManager.recordSample(handle, [audioData], 48000)

    const sample = sampleManager.getSample(handle)
    expect(sample).not.toBeNull()
    expect(sample?.ready).toBe(true)
    expect(sample?.length).toBe(24000)
  })

  it('compiles record callback to bytecode', async () => {
    const code = `sample=record(0.1,()->sine(440))`
    const parseResult = parse(code)
    const compileResult = compile(parseResult.program!, parseResult.preludeLines)

    expect(compileResult.errors).toHaveLength(0)
    const recordRegs = compileResult.sampleRegistrations.filter(r => r.type === 'record')
    expect(recordRegs.length).toBeGreaterThanOrEqual(1)
    expect(recordRegs.some(r => r.recordSeconds === 0.1)).toBe(true)
  })

  it('records and plays back audio from callback', async () => {
    // Record a sine wave at 440Hz for 0.01 seconds (480 samples at 48kHz)
    // Then play it back with sampler triggered immediately
    const code = `sample=record(0.01,()->sine(440))
sampler(sample,trig:1) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })

    // The sampler should play back the recorded sine wave
    // Check that we have non-zero audio output
    const [left, right] = result
    expect(left.length).toBeGreaterThan(0)
    expect(right.length).toBeGreaterThan(0)

    // Check that some samples are non-zero (audio is playing)
    const hasNonZero = Array.from(left).some(v => Math.abs(v) > 0.001)
    expect(hasNonZero).toBe(true)

    // The output should contain the sine wave pattern
    // At 440Hz and 48kHz sample rate, we expect ~109 samples per cycle
    // Check that we have oscillating values
    let signChanges = 0
    for (let i = 1; i < Math.min(left.length, 128); i++) {
      if ((left[i] > 0) !== (left[i - 1] > 0)) {
        signChanges++
      }
    }
    // Should have multiple sign changes indicating oscillation
    expect(signChanges).toBeGreaterThan(2)
  })

  it('records constant value', async () => {
    // Record a constant value
    const code = `sample=record(0.01,()->0.5)
sampler(sample,trig:1) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Check that the output is approximately 0.5
    const firstSamples = Array.from(left.slice(0, 10))
    for (const sample of firstSamples) {
      expect(Math.abs(sample - 0.5)).toBeLessThan(0.01)
    }
  })

  it('accepts function reference as callback', async () => {
    // Define a function and pass it directly to record
    const code = `kick=()->sine(440)
sample=record(0.1,kick)`
    const parseResult = parse(code)
    const compileResult = compile(parseResult.program!, parseResult.preludeLines)

    expect(compileResult.errors).toHaveLength(0)
    const recordRegs = compileResult.sampleRegistrations.filter(r => r.type === 'record')
    expect(recordRegs.length).toBeGreaterThanOrEqual(1)
    const userReg = recordRegs.find(r => r.recordSeconds === 0.1)
    expect(userReg).toBeDefined()
    expect(compileResult.recordCallbacks?.size).toBeGreaterThanOrEqual(1)
    const callbackId = userReg!.recordCallbackId
    expect(callbackId).toBeDefined()
    expect(compileResult.recordCallbacks?.get(callbackId!)).toBeDefined()
  })

  it('captures outer variables in record callback', async () => {
    // The callback references 'y' from the outer scope
    const code = `kick=(x)->{
  trig=1
  sine(x,offset:.5,trig)*ad(.012,.8,trig)**5
}
y=52
sample=record(0.01,()->kick(y))`
    const parseResult = parse(code)
    const compileResult = compile(parseResult.program!, parseResult.preludeLines)

    expect(compileResult.errors).toHaveLength(0)
    expect(compileResult.recordCallbacks?.size).toBeGreaterThanOrEqual(1)

    const userReg = compileResult.sampleRegistrations.filter(r => r.type === 'record').find(r =>
      r.recordSeconds === 0.01
    )
    expect(userReg).toBeDefined()
    const callbackId = userReg!.recordCallbackId
    expect(callbackId).toBeDefined()
    const callbackData = compileResult.recordCallbacks?.get(callbackId!)
    expect(callbackData).toBeDefined()
    expect(callbackData?.recordGlobalIndices.length).toBeGreaterThan(0)
  })

  it('simple: direct record with global variable', async () => {
    // Simple test: record a constant value from a global
    const code = `x=5
sample=record(0.01,()->x)
sampler(sample,trig:1) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Should get constant value of 5
    expect(left[0]).toBeCloseTo(5, 0.1)
    expect(left[10]).toBeCloseTo(5, 0.1)
    expect(left[100]).toBeCloseTo(5, 0.1)
  })

  it('simple: function with local parameter', async () => {
    // Simple test: function with record() capturing local parameter
    const code = `f=(x)->{
  sample=record(0.01,()->x)
  sampler(sample,trig:1)
}
f(3) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Should get constant value of 3
    expect(left[0]).toBeCloseTo(3, 0.1)
    expect(left[10]).toBeCloseTo(3, 0.1)
  })

  it('simple: multiple calls to same function', async () => {
    // Simple test: multiple calls should capture different values
    const code = `f=(x)->{
  sample=record(0.01,()->x)
  sampler(sample,trig:1)
}
f(1) |> out([$,0])
f(2) |> out([0,$])`

    const result = await audioAsync(code, { ticks: 1 })
    const [left, right] = result

    // Left channel should have 1, right channel should have 2
    expect(left[0]).toBeCloseTo(1, 0.1)
    expect(right[0]).toBeCloseTo(2, 0.1)
  })

  it('records with captured outer variable value', async () => {
    // Record a sine wave with frequency from outer variable
    // y=440 means we should get a 440Hz sine
    const code = `y=440
sample=record(0.01,()->sine(y))
sampler(sample,trig:1) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Check we have oscillation (non-zero output)
    const hasNonZero = Array.from(left).some(v => Math.abs(v) > 0.001)
    expect(hasNonZero).toBe(true)

    // Check for sign changes indicating oscillation
    let signChanges = 0
    for (let i = 1; i < Math.min(left.length, 128); i++) {
      if ((left[i] > 0) !== (left[i - 1] > 0)) {
        signChanges++
      }
    }
    expect(signChanges).toBeGreaterThan(2)
  })

  it('captures function with parameter from outer scope', async () => {
    // More complex case: function kick takes a parameter, and we pass y from outer scope
    const code = `
      kick=x->sine(x)
      y=440
      sample=record(0.01,()->kick(y))
      sampler(sample,trig:1) |> out($)
    `

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Check we have non-zero audio
    const hasNonZero = Array.from(left).some(v => Math.abs(v) > 0.001)
    expect(hasNonZero).toBe(true)
  })

  it('captures correct value when y changes', async () => {
    const code = `
      y=880
      sample=record(0.01,()->sine(y))
      sampler(sample,trig:1) |> out($)
    `

    const result = await audioAsync(code)
    expect(result).toMatchAudio(audio('out(sine(880))'))
  })

  it('verifies captured value affects output', async () => {
    // Record with y=0 - should produce silence (sine(0) = 0 always)
    const codeZero = `y=0
sample=record(0.01,()->y)
sampler(sample,trig:1) |> out($)`

    const resultZero = await audioAsync(codeZero, { ticks: 1 })
    const [leftZero] = resultZero

    // All samples should be 0 when y=0 and callback just returns y
    const maxAbsZero = Math.max(...Array.from(leftZero.slice(0, 100)).map(Math.abs))
    expect(maxAbsZero).toBeLessThan(0.001)

    // Record with y=0.5 - should produce constant 0.5
    const codeHalf = `y=0.5
sample=record(0.01,()->y)
sampler(sample,trig:1) |> out($)`

    const resultHalf = await audioAsync(codeHalf, { ticks: 1 })
    const [leftHalf] = resultHalf

    // First samples should be approximately 0.5
    const firstSamples = Array.from(leftHalf.slice(0, 10))
    for (const s of firstSamples) {
      expect(Math.abs(s - 0.5)).toBeLessThan(0.01)
    }
  })

  it('captures local parameter from enclosing function', async () => {
    // Local parameter y is captured from the kick function scope
    const code = `kick=(y=440)->{
  sample=record(0.01,()->sine(y))
  sampler(sample,trig:1)
}

kick(880) |> out($)`

    const result = await audioAsync(code, { ticks: 1 })
    const [left] = result

    // Check we have oscillation (non-zero output)
    const hasNonZero = Array.from(left).some(v => Math.abs(v) > 0.001)
    expect(hasNonZero).toBe(true)

    // Count sign changes - at 880Hz with 48kHz sample rate in 128 samples
    let signChanges = 0
    for (let i = 1; i < 128; i++) {
      if ((left[i] > 0) !== (left[i - 1] > 0)) signChanges++
    }
    // Should have at least some oscillation
    expect(signChanges).toBeGreaterThan(2)
  })

  it('re-hashes record callback when small literals change', async () => {
    const legacyHash = (arr: Float32Array): number => {
      let hash = 0
      for (let i = 0; i < arr.length; i++) hash = (hash * 31 + arr[i]!) | 0
      return hash
    }

    const src1 = `kicksynth=(x,trig=1)->{
  sine(x+18000*ad(.001,.8,trig)**300,offset:.5,trig)*ad(.012,.8,trig)**8
}

kick=(y=52,z=1/4)->{
  sample=record(0.01,()->kicksynth(y))
  sampler(sample,trig:every(z))
}

kick(52,1/4) |> out($)`

    const src2 = `kicksynth=(x,trig=1)->{
  sine(x+18000*ad(.001,.8,trig)**300,offset:.5,trig)*ad(.0012,.8,trig)**8
}

kick=(y=52,z=1/4)->{
  sample=record(0.01,()->kicksynth(y))
  sampler(sample,trig:every(z))
}

kick(52,1/4) |> out($)`

    const r1 = controlPipeline.compileSource(src1)
    const r2 = controlPipeline.compileSource(src2)

    expect(r1.lex.errors).toHaveLength(0)
    expect(r1.parse.errors).toHaveLength(0)
    expect(r1.compile.errors).toHaveLength(0)
    expect(r2.lex.errors).toHaveLength(0)
    expect(r2.parse.errors).toHaveLength(0)
    expect(r2.compile.errors).toHaveLength(0)

    const b1 = r1.compile.bytecode
    const b2 = r2.compile.bytecode
    expect(b1).toBeTruthy()
    expect(b2).toBeTruthy()
    expect(hashF32Bits(b1!)).not.toBe(hashF32Bits(b2!))
    expect(legacyHash(b1!)).toBe(legacyHash(b2!))

    const reg1 = r1.compile.sampleRegistrations.find(r => r.type === 'record' && r.recordSeconds === 0.01)
    const reg2 = r2.compile.sampleRegistrations.find(r => r.type === 'record' && r.recordSeconds === 0.01)
    expect(reg1?.recordCallbackId).toBeDefined()
    expect(reg2?.recordCallbackId).toBeDefined()
    const cb1 = reg1 && r1.compile.recordCallbacks?.get(reg1.recordCallbackId!)
    const cb2 = reg2 && r2.compile.recordCallbacks?.get(reg2.recordCallbackId!)
    expect(cb1).toBeTruthy()
    expect(cb2).toBeTruthy()

    const s1 = cb1!.setup
    const l1 = cb1!.loop
    const s2 = cb2!.setup
    const l2 = cb2!.loop
    expect(hashF32Bits(s1)).not.toBe(hashF32Bits(s2))
    expect(hashF32Bits(l1)).toBe(hashF32Bits(l2))
    expect(legacyHash(s1)).toBe(legacyHash(s2))
    expect(legacyHash(l1)).toBe(legacyHash(l2))
  })

  it('plays different for multiple calls to record', async () => {
    const code = `
      f=(x)->{
        sample=record(0.1,()->x)
        sampler(sample,trig:1)
      }
      f(1) |> out([$,0])
      f(2) |> out([0,$])
    `

    const result = await audioAsync(code, { ticks: 1 })
    expect(result).toMatchAudio([[1, 1, 1], [2, 2, 2]])
  })

  it('edge 1', async () => {
    const code = `
      x=1?1:2
      f=(y=52)->{
        sample=record(1,()->y)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `

    const result = await audioAsync(code, { ticks: 1 })
  })

  it('record with dependency', async () => {
    const code = `
      f=(y=1)->{
        sample=record(0.1,()->y)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `

    const result = await audioAsync(code)
    expect(result).toMatchAudio(audio('out(1)'))
  })

  it('record without dependencies', async () => {
    const code = `
      f=()->{
        sample=record(0.1,()->1)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `

    const result = await audioAsync(code)
    expect(result).toMatchAudio(audio('out(1)'))
  })

  it('record with default function parameters', async () => {
    const actual = await audioAsync(`
      f=(x=()->1)->{
        sample=record(0.1,()->x())
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->1)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).toMatchAudio(expected)
  })

  it('record with default function parameters aliased', async () => {
    const actual = await audioAsync(`
      x=(v)->v+1
      y=x
      f=(z=y(1))->{
        sample=record(0.1,()->z)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->2)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).toMatchAudio(expected)
  })

  it('record with default function parameters aliased indirect', async () => {
    const actual = await audioAsync(`
      x=(v)->v+1
      y=x
      z=(a=y(1))->a
      f=()->{
        sample=record(0.1,()->z())
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->2)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).toMatchAudio(expected)
  })

  it('record with default prelude call', async () => {
    const actual = await audioAsync(`
      z=(a=ntof(10))->a
      f=()->{
        sample=record(0.1,()->z())
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->ntof(10))
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).not.toMatchAudio([[0, 0, 0], [0, 0, 0]])
    expect(actual).toMatchAudio(expected)
  })

  it('record with fn default param override', async () => {
    const actual = await audioAsync(`
      f=(x=()->1)->{
        sample=record(0.1,()->x())
        sampler(sample,trig:1)
      }
      f(x:()->2) |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->2)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).toMatchAudio(expected)
  })

  it('record preserves undefined function captures for downstream defaults', async () => {
    const result = await audioAsync(`
      bd() |> out($)
    `, { ticks: 1 })

    const [left] = result
    const hasSignal = Array.from(left).some(v => Math.abs(v) > 0.0001)
    expect(hasSignal).toBe(true)
  })

  it('record with fn default param override with skipped parameters', async () => {
    const actual = await audioAsync(`
      f=(x=()->1,y=()->2)->{
        sample=record(0.1,()->x()+y())
        sampler(sample,trig:1)
      }
      f(x:()->2) |> out($)
    `)

    const expected = await audioAsync(`
      f=()->{
        sample=record(0.1,()->4)
        sampler(sample,trig:1)
      }
      f() |> out($)
    `)

    expect(actual).toMatchAudio(expected)
  })

  it('record edge case callee is not a function', async () => {
    const result = await audioAsync(`
      bpm=144 transpose=-2

      bd(punch:4k,cutoff:5k,q:.2,fm:trig->ad(.01,.1,trig)) |> out($)
    `)

    const [left] = result
    const hasSignal = Array.from(left).some(v => Math.abs(v) > 0.0001)
    expect(hasSignal).toBe(true)
  })
})
