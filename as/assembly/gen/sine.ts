// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Sine_default_hz_scalar_offset_scalar_trig_scalar {
  static readonly defaultInstance: Sine_default_hz_scalar_offset_scalar_trig_scalar = new Sine_default_hz_scalar_offset_scalar_trig_scalar()

  angle: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_scalar_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_scalar_offset_scalar_trig_scalar): void {
    this.angle = src.angle
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, offset: f32, trig: f32): void {
    const hzClamped: f32 = max(hz, 0)
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const trigChanged: boolean = trig !== this.lastTrig
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.angle = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.angleStep = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.angle = angle
  }
}

export class Sine_default_hz_scalar_offset_scalar_trig_audio {
  static readonly defaultInstance: Sine_default_hz_scalar_offset_scalar_trig_audio = new Sine_default_hz_scalar_offset_scalar_trig_audio()

  angle: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_scalar_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_scalar_offset_scalar_trig_audio): void {
    this.angle = src.angle
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, offset: f32, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.angleStep = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          angle = offsetClamped
        }
        prevTrig = trig
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.angle = angle
    this.prevTrig = prevTrig
  }
}

export class Sine_default_hz_scalar_offset_audio_trig_scalar {
  static readonly defaultInstance: Sine_default_hz_scalar_offset_audio_trig_scalar = new Sine_default_hz_scalar_offset_audio_trig_scalar()

  angle: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_scalar_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_scalar_offset_audio_trig_scalar): void {
    this.angle = src.angle
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, trig: f32, offset$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.angleStep = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
      })
    }

    this.angle = angle
  }
}

export class Sine_default_hz_scalar_offset_audio_trig_audio {
  static readonly defaultInstance: Sine_default_hz_scalar_offset_audio_trig_audio = new Sine_default_hz_scalar_offset_audio_trig_audio()

  angle: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_scalar_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_scalar_offset_audio_trig_audio): void {
    this.angle = src.angle
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, offset$: usize, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.angleStep = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          const offsetClamped: f32 = clamp(load<f32>(offset$), 0, 1)
          angle = offsetClamped
        }
        prevTrig = trig
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.angle = angle
    this.prevTrig = prevTrig
  }
}

export class Sine_default_hz_audio_offset_scalar_trig_scalar {
  static readonly defaultInstance: Sine_default_hz_audio_offset_scalar_trig_scalar = new Sine_default_hz_audio_offset_scalar_trig_scalar()

  angle: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_audio_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_audio_offset_scalar_trig_scalar): void {
    this.angle = src.angle
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, trig: f32, hz$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.angle = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let hzClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        if ((hzClamped > 0)) {
          angleStep = (hzClamped / sampleRate)
        }
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
      })
    }

    this.angle = angle
  }
}

export class Sine_default_hz_audio_offset_scalar_trig_audio {
  static readonly defaultInstance: Sine_default_hz_audio_offset_scalar_trig_audio = new Sine_default_hz_audio_offset_scalar_trig_audio()

  angle: f32 = 0
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_audio_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_audio_offset_scalar_trig_audio): void {
    this.angle = src.angle
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, hz$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          angle = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          angleStep = (hzClamped / sampleRate)
        }
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        trig$ += 4
      })
    }

    this.angle = angle
    this.prevTrig = prevTrig
  }
}

export class Sine_default_hz_audio_offset_audio_trig_scalar {
  static readonly defaultInstance: Sine_default_hz_audio_offset_audio_trig_scalar = new Sine_default_hz_audio_offset_audio_trig_scalar()

  angle: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_audio_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_audio_offset_audio_trig_scalar): void {
    this.angle = src.angle
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, hz$: usize, offset$: usize): void {
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let hzClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        if ((hzClamped > 0)) {
          angleStep = (hzClamped / sampleRate)
        }
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        offset$ += 4
      })
    }

    this.angle = angle
  }
}

export class Sine_default_hz_audio_offset_audio_trig_audio {
  static readonly defaultInstance: Sine_default_hz_audio_offset_audio_trig_audio = new Sine_default_hz_audio_offset_audio_trig_audio()

  angle: f32 = 0
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  angleStep: f32

  reset(): void {
    this.copyFrom(Sine_default_hz_audio_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Sine_default_hz_audio_offset_audio_trig_audio): void {
    this.angle = src.angle
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.angleStep = src.angleStep
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz$: usize, offset$: usize, trig$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let angle: f32 = this.angle
    let output: f32
    let angleStep: f32 = this.angleStep

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          const offsetClamped: f32 = clamp(load<f32>(offset$), 0, 1)
          angle = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          angleStep = (hzClamped / sampleRate)
        }
        output = sinNormalized(angle)
        angle = (angle + angleStep)
        if ((angle >= 1)) {
          angle = fract01(angle)
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.angle = angle
    this.prevTrig = prevTrig
  }
}