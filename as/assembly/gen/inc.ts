// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar = new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, ceil: f32, offset: f32, trig: f32): void {
    const hzClamped: f32 = max(hz, 0)
    const ceilClamped: f32 = max(ceil, 0)
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (trigChanged) {
      if (((trig > 0) && (trig != this.prevTrig))) {
        this.phase = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio = new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, ceil: f32, offset: f32, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const ceilClamped: f32 = max(ceil, 0)
    const offsetClamped: f32 = max(offset, 0)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (trig != prevTrig))) {
          phase = offsetClamped
        }
        prevTrig = trig
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar = new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, ceil: f32, trig: f32, offset$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const ceilClamped: f32 = max(ceil, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio = new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, ceil: f32, offset$: usize, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const ceilClamped: f32 = max(ceil, 0)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (trig != prevTrig))) {
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = offsetClamped
        }
        prevTrig = trig
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar = new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, offset: f32, trig: f32, ceil$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (trigChanged) {
      if (((trig > 0) && (trig != this.prevTrig))) {
        this.phase = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        ceilClamped = max(load<f32>(ceil$), 0)
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        ceil$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio = new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, offset: f32, ceil$: usize, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const offsetClamped: f32 = max(offset, 0)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        ceilClamped = max(load<f32>(ceil$), 0)
        if (((trig > 0) && (trig != prevTrig))) {
          phase = offsetClamped
        }
        prevTrig = trig
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        ceil$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar = new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, trig: f32, ceil$: usize, offset$: usize): void {
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
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        ceilClamped = max(load<f32>(ceil$), 0)
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        ceil$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio {
  static readonly defaultInstance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio = new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio()

  phase: f32 = 0
  lastHz: f32 = Infinity
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.lastHz = src.lastHz
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz: f32, ceil$: usize, offset$: usize, trig$: usize): void {
    const hzClamped: f32 = max(hz, 0)
    const hzChanged: boolean = hzClamped !== this.lastHz
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (hzChanged || sampleRateChanged) {
      if ((hzClamped > 0)) {
        this.phaseInc = (hzClamped / sampleRate)
      }
      this.lastHz = hzClamped
      this.lastSampleRate = sampleRate
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        ceilClamped = max(load<f32>(ceil$), 0)
        if (((trig > 0) && (trig != prevTrig))) {
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = offsetClamped
        }
        prevTrig = trig
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        ceil$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar = new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ceil: f32, offset: f32, trig: f32, hz$: usize): void {
    const ceilClamped: f32 = max(ceil, 0)
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      if (((trig > 0) && (trig != this.prevTrig))) {
        this.phase = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio = new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio()

  phase: f32 = 0
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ceil: f32, offset: f32, hz$: usize, trig$: usize): void {
    const ceilClamped: f32 = max(ceil, 0)
    const offsetClamped: f32 = max(offset, 0)

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        if (((trig > 0) && (trig != prevTrig))) {
          phase = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar = new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ceil: f32, trig: f32, hz$: usize, offset$: usize): void {
    const ceilClamped: f32 = max(ceil, 0)
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio = new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio()

  phase: f32 = 0
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ceil: f32, hz$: usize, offset$: usize, trig$: usize): void {
    const ceilClamped: f32 = max(ceil, 0)

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        if (((trig > 0) && (trig != prevTrig))) {
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar = new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, trig: f32, hz$: usize, ceil$: usize): void {
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      if (((trig > 0) && (trig != this.prevTrig))) {
        this.phase = offsetClamped
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        ceilClamped = max(load<f32>(ceil$), 0)
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        ceil$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio = new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio()

  phase: f32 = 0
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, hz$: usize, ceil$: usize, trig$: usize): void {
    const offsetClamped: f32 = max(offset, 0)

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        ceilClamped = max(load<f32>(ceil$), 0)
        if (((trig > 0) && (trig != prevTrig))) {
          phase = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        ceil$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar = new Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, hz$: usize, ceil$: usize, offset$: usize): void {
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        ceilClamped = max(load<f32>(ceil$), 0)
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        ceil$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio {
  static readonly defaultInstance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio = new Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio()

  phase: f32 = 0
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, hz$: usize, ceil$: usize, offset$: usize, trig$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let hzClamped: f32
    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let ceilClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        hzClamped = max(load<f32>(hz$), 0)
        trig = load<f32>(trig$)
        ceilClamped = max(load<f32>(ceil$), 0)
        if (((trig > 0) && (trig != prevTrig))) {
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = offsetClamped
        }
        prevTrig = trig
        if ((hzClamped > 0)) {
          phaseInc = (hzClamped / sampleRate)
        }
        output = phase
        phase = (phase + phaseInc)
        if ((phase > ceilClamped)) {
          phase = ceilClamped
        }
        store<f32>(output$, output)
        output$ += 4
        hz$ += 4
        ceil$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}