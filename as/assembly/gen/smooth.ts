// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, fadeWithCurve, floor, fract01, log, max, min, polyBlep, pow, seedToNoiseState, sin, sinNormalized, sqrt, uniform01NextState, uniform01Value, warn } from '../util'

export class Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar = new Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, curve: f32, trig: f32): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
        this.acc = 0
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
  }
}

export class Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio = new Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, curve: f32, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
          acc = 0
          a = uniform01Value(state)
          state = uniform01NextState(state)
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        prevTrig = trig
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar = new Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, trig: f32, curve$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
        this.acc = 0
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let curve: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        curve = load<f32>(curve$)
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        curve$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
  }
}

export class Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio = new Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, curve$: usize, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let curve: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        curve = load<f32>(curve$)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
          acc = 0
          a = uniform01Value(state)
          state = uniform01NextState(state)
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        prevTrig = trig
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        curve$ += 4
        trig$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar = new Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, curve: f32, trig: f32, rate$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
        this.acc = 0
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        rateClamped = max(load<f32>(rate$), 0)
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
  }
}

export class Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio = new Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, curve: f32, rate$: usize, trig$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
          acc = 0
          a = uniform01Value(state)
          state = uniform01NextState(state)
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        prevTrig = trig
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        trig$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar = new Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig: f32, rate$: usize, curve$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
        this.acc = 0
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let curve: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        curve = load<f32>(curve$)
        rateClamped = max(load<f32>(rate$), 0)
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        curve$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
  }
}

export class Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio {
  static readonly defaultInstance: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio = new Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio()

  acc: f32 = 0
  a: f32 = 0
  b: f32 = 0
  state: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio): void {
    this.acc = src.acc
    this.a = src.a
    this.b = src.b
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate$: usize, curve$: usize, trig$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        this.state = seedToNoiseState(seed)
        this.a = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.b = uniform01Value(this.state)
        this.state = uniform01NextState(this.state)
        this.prevSeed = seed
      }
      this.lastSeed = seed
    }

    let acc: f32 = this.acc
    let a: f32 = this.a
    let b: f32 = this.b
    let state: f32 = this.state
    let phase: f32 = this.phase
    let output: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let curve: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        curve = load<f32>(curve$)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
          acc = 0
          a = uniform01Value(state)
          state = uniform01NextState(state)
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        prevTrig = trig
        phase = (a + ((b - a) * fadeWithCurve(acc, curve)))
        output = phase
        acc = (acc + (rateClamped / sampleRate))
        if ((acc >= 1)) {
          acc = fract01(acc)
          a = b
          b = uniform01Value(state)
          state = uniform01NextState(state)
        }
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        curve$ += 4
        trig$ += 4
      })
    }

    this.acc = acc
    this.a = a
    this.b = b
    this.state = state
    this.phase = phase
    this.prevTrig = prevTrig
  }
}