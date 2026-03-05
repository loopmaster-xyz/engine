import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { controlPipeline } from '../../src/live/pipeline.ts'
import { audio, audioAsync, getCore, runTicks, setOversampleModes, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
  setOversampleModes({ up: 'hold', down: 'decimate' })
})

describe('oversample function', () => {
  it('oversamples mono signal and returns downsampled output', () => {
    // testOversample() outputs sampleRate / 48000.0
    // At 48000 Hz: outputs 1.0
    // At 48000 * 16 Hz: outputs 16.0
    // After downsampling by 16x, we should get 16.0
    const result = audio('out(oversample(16, () -> testOversample()))')
    expect(result).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('oversamples stereo signal and returns downsampled output', () => {
    // testOversample() with stereo input outputs [sampleRate/48000, sampleRate/48000]
    // At 48000 * 16 Hz: outputs [16.0, 16.0]
    // After downsampling by 16x, we should get [16.0, 16.0]
    const result = audio('out(oversample(16, () -> [testOversample(), testOversample()]))')
    expect(result).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('handles factor of 1 as passthrough', () => {
    // Factor 1 means no oversampling
    const result = audio('out(oversample(1, () -> testOversample()))')
    expect(result).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('handles factor of 2', () => {
    // At 48000 * 2 Hz: outputs 2.0
    const result = audio('out(oversample(2, () -> testOversample()))')
    expect(result).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('handles factor of 4', () => {
    // At 48000 * 4 Hz: outputs 4.0
    const result = audio('out(oversample(4, () -> testOversample()))')
    expect(result).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('with trig=every(1/4)', () => {
    expect(audio(`
      oversample(4,()->{
        trig=every(1/4)
        ad(.01,.5,trig)
      }) |> out($)
    `)).toMatchAudio(audio('trig=every(1/4) ad(.01,.5,trig) |> out($)'))
  })

  it('edge 1', () => {
    expect(audio(`
      f=()->{
        trig=every(1/4)
        oversample(4,()->{
          env=ad(.01,.5,trig)
          sine(440*100*env)*env
        })
      }
      f() |> out($)
    `)).toMatchAudio(audio('trig=every(1/4) env=ad(.01,.5,trig) sine(440*100*env)*env |> out($)'))
  })

  it('edge 2', () => {
    expect(audio(`
      f=()->{
        trig:=every(1/4)
        oversample(4,()->{
          sine(440*100*ad(.01,.5,trig))*ad(.01,.5,trig)
        })
      }
      f() |> out($)
    `)).toMatchAudio(audio(`
      f=()->{
        trig:=every(1/4)
        oversample(4,()->{
          env:=ad(.01,.5,trig)
          sine(440*100*env)*env
        })
      }
      f() |> out($)
    `))
  })

  it('edge 3', () => {
    expect(audio(`
      trig=every(1/8) synth=>oversample(4,()->sine($/2+sine($/8)*$*1)*ad(.0001,.5,trig)**3*.2)

      ;[61,62,65,67,71,60][t*4] |> midiToHz($)    |> synth($) |> out($)
      ;[61,62,65,67,71,60][t*4] |> midiToHz($+65) |> synth($) |> out($/1.5)

      tom=()->{
        oversample(4,()->{
          trig=every(1/8)
          sine(80+100*ad(.001,.92,trig)**4)*ad(.00001,.12,trig)**4
        })
      }

      tom() |> out($*.85)
    `, { ticks: 100 })).toMatchAudio(audio(`

      trig=every(1/8) synth=>oversample(4,()->sine($/2+sine($/8)*$*1)*ad(.0001,.5,trig)**3*.2)

      ;[61,62,65,67,71,60][t*4] |> midiToHz($)    |> synth($) |> out($)
      ;[61,62,65,67,71,60][t*4] |> midiToHz($+65) |> synth($) |> out($/1.5)

      tom=()->{
        oversample(4,()->{
          sine(80+100*ad(.001,.92,trig)**4)*ad(.00001,.12,trig)**4
        })
      }

      tom() |> out($*.85)

    `, { ticks: 100 }), 12800)
  })

  it.skip('edge 4', async () => { // flaky leaking test state
    const actual = await audioAsync(`ch() |> oversample(4,()->chorus($)) |> out($)`, { ticks: 1024 })
    const expected = await audioAsync(`x=ch(); oversample(4,()->chorus(x)) |> out($)`, { ticks: 1024 })
    expect(actual).toMatchAudio(expected)
  })

  it('oversample capture outer value', () => {
    expect(audio(`
      x=mini('c4 e4/2 g4 a4/5')
      ;[hz,vel,trig]=x.length > 0 ? x[0] : [0,0,0]
      hz=hold(hz)
      f=>oversample(2,()->{
        sine($+sine($)*$)*ad(.0001,.12,trig)
      })
      f(hz) |> out($)
    `)).toMatchAudio(audio(`
      x=mini('c4 e4/2 g4 a4/5')
      ;[hz,vel,trig]=x.length > 0 ? x[0] : [0,0,0]
      hz=hold(hz)
      f=>oversample(2,()->{
        m=$
        sine($+sine($)*$)*ad(.0001,.12,trig)
      })
      f(hz) |> out($)
    `), 1024)
  })

  it('oversample memory index out of bounds', () => {
    runTicks('oversample(4,()->sine(330)) |> out($)', { ticks: 2048 })
    const [l, r] = audio('oversample(4,()->sine(330)) |> out($)', { ticks: 4096 })
    expect(l.length).toBe(r.length)
    expect(l.length).toBeGreaterThan(0)
    for (let i = 0; i < l.length; i += 256) {
      expect(Number.isFinite(l[i])).toBe(true)
      expect(Number.isFinite(r[i])).toBe(true)
      expect(Math.abs(l[i])).toBeLessThanOrEqual(2)
      expect(Math.abs(r[i])).toBeLessThanOrEqual(2)
    }
  }, 60_000)

  it('oversample upsampling dependencies', () => {
    expect(audio('x=sine(330) oversample(2,()->x) |> out($)')).toMatchAudio(audio('sine(330) |> out($)'))
  })

  it('oversample using closure scalars', () => {
    expect(audio('x=1 oversample(2,()->1) |> out($)')).toMatchAudio(audio('1 |> out($)'))
  })

  it('oversample using closure audio', () => {
    expect(audio('x=every(1) oversample(2,()->x) |> out($)')).toMatchAudio(audio('every(1) |> out($)'))
  })

  it('oversample closure array roundtrip', () => {
    expect(audio(`
      pair=[sine(220),sine(330)]
      oversample(2,()->pair) |> out($)
    `)).toMatchAudio(audio(`
      [sine(220),sine(330)] |> out($)
    `), 1024)
  })

  it('oversample using pipe', () => {
    expect(audio(`
      f=x->x|>oversample(2,()->$)
      f(1) |> out($)
    `)).toMatchAudio(audio('1 |> out($)'))
  })

  it('oversample using pipe multiple', () => {
    expect(audio(`
      f=x->x|>oversample(2,()->$+$)
      f(1) |> out($)
    `)).toMatchAudio(audio('2 |> out($)'))
  })

  it('oversample using pipe with audio', () => {
    expect(audio(`
      f=x->x|>oversample(2,()->sine($))
      f(1) |> out($)
    `)).toMatchAudio(audio('sine(1) |> out($)'))
  })

  it('oversample with passed value through pipe', () => {
    expect(audio(`
      synth=hz->oversample(2,()->sine(hz))
      midiToHz(60) |> synth($) |> out($)
    `)).toMatchAudio(audio('sine(midiToHz(60)) |> out($)'))
  })

  it('oversample with midiToHz', () => {
    expect(audio('oversample(2,()->sine(midiToHz(60))) |> out($)'))
      .toMatchAudio(audio('sine(midiToHz(60)) |> out($)'))
  })

  it('oversample complex', () => {
    expect(audio(`
      bpm=144

      trig=every(1/8)
      synth=hz->hz|>oversample(4,()->sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2)

      ;[61,62,65,67,71,60][t*4] |> midiToHz($) |> synth($) |> out($)

    `, { ticks: 128 })).toMatchAudio(audio(`
      bpm=144

      trig=every(1/8)
      synth=hz->hz|>sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2

      ;[61,62,65,67,71,60][t*4] |> midiToHz($) |> synth($) |> out($)
    `, { ticks: 128 }))
  })

  it('oversample ad', () => {
    expect(audio(`
      oversample(4,()->ad(.001,.5,trig:1)) |> out($)
    `)).toMatchAudio(audio(`
      ad(.001,.5,trig:1) |> out($)
    `))
  })

  it('oversample arithmetic', () => {
    expect(audio(`
      oversample(4,()->2*4**2) |> out($)
    `)).toMatchAudio(audio(`
      2*4**2 |> out($)
    `))
  })

  it('oversample arithmetic scalar/audio', () => {
    expect(audio(`
      oversample(4,()->sine(1)/2) |> out($)
    `)).toMatchAudio(audio(`
      sine(1)/2 |> out($)
    `))
  })

  it('oversample capture of outer scalar/audio binary remains stable', () => {
    const cases = [
      {
        oversampled: `
          x=sine(220)+0.5
          oversample(4,()->x+0.1) |> out($)
        `,
        baseline: `
          (sine(220)+0.5)+0.1 |> out($)
        `,
      },
      {
        oversampled: `
          x=0.5+sine(220)
          oversample(4,()->x*0.25) |> out($)
        `,
        baseline: `
          (0.5+sine(220))*0.25 |> out($)
        `,
      },
    ]

    for (const c of cases) {
      const actual = audio(c.oversampled, { ticks: 128 })
      const [left, right] = actual
      for (let i = 0; i < left.length; i += 64) {
        expect(Number.isFinite(left[i])).toBe(true)
        expect(Number.isFinite(right[i])).toBe(true)
      }
      expect(actual).toMatchAudio(audio(c.baseline, { ticks: 128 }), 4096)
    }
  })

  it('oversample nested closure captures overridden audio cells', () => {
    const [left, right] = audio(`
      hz=sine(1)*40+220
      dt=safediv(1,hz)
      dc=hz*((1-.5)*30)
      oversample(8,()->delay(1,dt,1,x->tanh(lp1(x,dc)))) |> out($)
    `, { ticks: 256 })
    for (let i = 0; i < left.length; i += 64) {
      expect(Number.isFinite(left[i])).toBe(true)
      expect(Number.isFinite(right[i])).toBe(true)
    }
  })

  it('updates oversample callback literals when editing bytecode in-place', () => {
    const core = getCore()
    const vmId = 0
    core.wasm.resetAudioVmAt(vmId)

    const compiledA = controlPipeline.compileSource('out(oversample(4,()->0.1))')
    const compiledB = controlPipeline.compileSource('out(oversample(4,()->0.9))')
    if (compiledA.errors.length > 0 || compiledB.errors.length > 0) {
      throw new Error(`Compilation failed:\n${[...compiledA.errors, ...compiledB.errors].join('\n')}`)
    }
    if (!compiledA.compile.bytecode || !compiledB.compile.bytecode) {
      throw new Error('Missing bytecode for oversample literal update test')
    }
    const bytecodeA = compiledA.compile.bytecode
    const bytecodeB = compiledB.compile.bytecode
    expect(bytecodeA.length).toBe(bytecodeB.length)

    const bytecodeLength = bytecodeA.length
    const bufferLength = 128
    const sampleRate = 48000
    const nyquist = sampleRate * 0.5
    const piOverNyquist = Math.PI / nyquist

    const opsPtr = core.wasm.createFloat32Buffer(bytecodeLength)
    const ops = new Float32Array(core.memory.buffer, opsPtr, bytecodeLength)

    const runTick = (sampleCount: number): number => {
      core.wasm.runAudioVmAt(
        vmId,
        opsPtr,
        bytecodeLength,
        bufferLength,
        sampleCount,
        sampleRate,
        nyquist,
        piOverNyquist,
        120,
      )
      const infoPtr = core.wasm.getAudioVmInfoAt(vmId)
      const info = new Uint32Array(core.memory.buffer, infoPtr, 10)
      const outputLeftPtr = info[8] ?? 0
      if (!outputLeftPtr) throw new Error('Missing output buffer pointer')
      const left = new Float32Array(core.memory.buffer, outputLeftPtr, bufferLength)
      return left[0] ?? 0
    }

    try {
      ops.set(bytecodeA)
      const first = runTick(0)

      ops.set(bytecodeB)
      const second = runTick(bufferLength)

      expect(first).toBeCloseTo(0.1, 4)
      expect(second).toBeCloseTo(0.9, 4)
    }
    finally {
      core.wasm.freeFloat32Buffer(opsPtr)
      core.wasm.resetAudioVmAt(vmId)
    }
  })

  it('mini + oversample', () => {
    expect(audio(`
      x=mini('c4 e4/2 g4 a4/5')
      ;[hz,vel,trig]=x.length > 0 ? x[0] : [0,0,0]
      hz=hold(hz)
      hz|>oversample(1,()->
        sine($+sine($)*$)*ad(.0001,.12,trig)
      ) |> out($)
    `)).toMatchAudio(audio(`
      x=mini('c4 e4/2 g4 a4/5')
      ;[hz,vel,trig]=x.length > 0 ? x[0] : [0,0,0]
      hz=hold(hz)
      hz|>sine($+sine($)*$)*ad(.0001,.12,trig) |> out($)
    `), 128)
  })

  it('oversample captures scalars', () => {
    expect(audio(`
      z=(v)->v()
      f=(k=1)->{
        xIt:=k+0
        oversample(8,()->{
          y=()->xIt+0
          z(y)
        })
      }
      f() |> out($)
    `)).toMatchAudio(audio(`out(1)`))
  })
})
