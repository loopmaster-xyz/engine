// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Lfotri_default_bar_scalar_offset_scalar_trig_scalar {
  static readonly defaultInstance: Lfotri_default_bar_scalar_offset_scalar_trig_scalar = new Lfotri_default_bar_scalar_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastBar: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSamplesPerBeat: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_scalar_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_scalar_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastBar = src.lastBar
    this.lastTrig = src.lastTrig
    this.lastSamplesPerBeat = src.lastSamplesPerBeat
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, offset: f32, trig: f32): void {
    const barClamped: f32 = max(bar, 0)
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBeatChanged: boolean = samplesPerBeat !== this.lastSamplesPerBeat
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (trigChanged || samplesPerBeatChanged || samplesPerBarChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.phase = fract01(((offsetClamped * samplesPerBeat) / max((barClamped * samplesPerBar), 1)))
      }
      this.lastSamplesPerBeat = samplesPerBeat
      this.lastSamplesPerBar = samplesPerBar
    }

    if (barChanged || samplesPerBarChanged) {
      this.phaseInc = (1 / max((barClamped * samplesPerBar), 1))
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let p: f32
    let tri: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.phase = phase
  }
}

export class Lfotri_default_bar_scalar_offset_scalar_trig_audio {
  static readonly defaultInstance: Lfotri_default_bar_scalar_offset_scalar_trig_audio = new Lfotri_default_bar_scalar_offset_scalar_trig_audio()

  phase: f32 = 0
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_scalar_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_scalar_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, offset: f32, trig$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const offsetClamped: f32 = max(offset, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      this.phaseInc = (1 / max((barClamped * samplesPerBar), 1))
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let p: f32
    let tri: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          phase = fract01(((offsetClamped * samplesPerBeat) / max((barClamped * samplesPerBar), 1)))
        }
        prevTrig = trig
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
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

export class Lfotri_default_bar_scalar_offset_audio_trig_scalar {
  static readonly defaultInstance: Lfotri_default_bar_scalar_offset_audio_trig_scalar = new Lfotri_default_bar_scalar_offset_audio_trig_scalar()

  phase: f32 = 0
  lastBar: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSamplesPerBeat: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_scalar_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_scalar_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastBar = src.lastBar
    this.lastTrig = src.lastTrig
    this.lastSamplesPerBeat = src.lastSamplesPerBeat
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, trig: f32, offset$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBeatChanged: boolean = samplesPerBeat !== this.lastSamplesPerBeat
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (trigChanged || samplesPerBeatChanged || samplesPerBarChanged) {
      this.lastSamplesPerBeat = samplesPerBeat
      this.lastSamplesPerBar = samplesPerBar
    }

    if (barChanged || samplesPerBarChanged) {
      this.phaseInc = (1 / max((barClamped * samplesPerBar), 1))
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let p: f32
    let tri: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Lfotri_default_bar_scalar_offset_audio_trig_audio {
  static readonly defaultInstance: Lfotri_default_bar_scalar_offset_audio_trig_audio = new Lfotri_default_bar_scalar_offset_audio_trig_audio()

  phase: f32 = 0
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32
  phaseInc: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_scalar_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_scalar_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
    this.phaseInc = src.phaseInc
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, offset$: usize, trig$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      this.phaseInc = (1 / max((barClamped * samplesPerBar), 1))
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32
    let phaseInc: f32 = this.phaseInc

    let p: f32
    let tri: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = fract01(((offsetClamped * samplesPerBeat) / max((barClamped * samplesPerBar), 1)))
        }
        prevTrig = trig
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
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

export class Lfotri_default_bar_audio_offset_scalar_trig_scalar {
  static readonly defaultInstance: Lfotri_default_bar_audio_offset_scalar_trig_scalar = new Lfotri_default_bar_audio_offset_scalar_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  lastSamplesPerBeat: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_audio_offset_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_audio_offset_scalar_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.lastSamplesPerBeat = src.lastSamplesPerBeat
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, trig: f32, bar$: usize): void {
    const offsetClamped: f32 = max(offset, 0)
    const trigChanged: boolean = trig !== this.lastTrig
    const samplesPerBeatChanged: boolean = samplesPerBeat !== this.lastSamplesPerBeat
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let phaseInc: f32 = 0

    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (trigChanged || samplesPerBeatChanged || samplesPerBarChanged) {
      this.lastSamplesPerBeat = samplesPerBeat
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32

    let p: f32
    let tri: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        phaseInc = (1 / max((max(load<f32>(bar$), 0) * samplesPerBar), 1))
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
      })
    }

    this.phase = phase
  }
}

export class Lfotri_default_bar_audio_offset_scalar_trig_audio {
  static readonly defaultInstance: Lfotri_default_bar_audio_offset_scalar_trig_audio = new Lfotri_default_bar_audio_offset_scalar_trig_audio()

  phase: f32 = 0
  prevTrig: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_audio_offset_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_audio_offset_scalar_trig_audio): void {
    this.phase = src.phase
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, bar$: usize, trig$: usize): void {
    const offsetClamped: f32 = max(offset, 0)

    let phaseInc: f32 = 0

    let phase: f32 = this.phase
    let output: f32

    let p: f32
    let tri: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          const barClamped: f32 = max(load<f32>(bar$), 0)
          phase = fract01(((offsetClamped * samplesPerBeat) / max((barClamped * samplesPerBar), 1)))
        }
        prevTrig = trig
        phaseInc = (1 / max((max(load<f32>(bar$), 0) * samplesPerBar), 1))
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Lfotri_default_bar_audio_offset_audio_trig_scalar {
  static readonly defaultInstance: Lfotri_default_bar_audio_offset_audio_trig_scalar = new Lfotri_default_bar_audio_offset_audio_trig_scalar()

  phase: f32 = 0
  lastTrig: f32 = Infinity
  lastSamplesPerBeat: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_audio_offset_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_audio_offset_audio_trig_scalar): void {
    this.phase = src.phase
    this.lastTrig = src.lastTrig
    this.lastSamplesPerBeat = src.lastSamplesPerBeat
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, bar$: usize, offset$: usize): void {
    const trigChanged: boolean = trig !== this.lastTrig
    const samplesPerBeatChanged: boolean = samplesPerBeat !== this.lastSamplesPerBeat
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let phaseInc: f32 = 0

    if (trigChanged) {
      this.prevTrig = trig
      this.lastTrig = trig
    }

    if (trigChanged || samplesPerBeatChanged || samplesPerBarChanged) {
      this.lastSamplesPerBeat = samplesPerBeat
      this.lastSamplesPerBar = samplesPerBar
    }

    let phase: f32 = this.phase
    let output: f32

    let p: f32
    let tri: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        phaseInc = (1 / max((max(load<f32>(bar$), 0) * samplesPerBar), 1))
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        offset$ += 4
      })
    }

    this.phase = phase
  }
}

export class Lfotri_default_bar_audio_offset_audio_trig_audio {
  static readonly defaultInstance: Lfotri_default_bar_audio_offset_audio_trig_audio = new Lfotri_default_bar_audio_offset_audio_trig_audio()

  phase: f32 = 0
  lastSamplesPerBeat: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  prevTrig: f32

  reset(): void {
    this.copyFrom(Lfotri_default_bar_audio_offset_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Lfotri_default_bar_audio_offset_audio_trig_audio): void {
    this.phase = src.phase
    this.lastSamplesPerBeat = src.lastSamplesPerBeat
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar$: usize, offset$: usize, trig$: usize): void {
    const samplesPerBeatChanged: boolean = samplesPerBeat !== this.lastSamplesPerBeat
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let phaseInc: f32 = 0

    if (samplesPerBarChanged) {
      this.lastSamplesPerBar = samplesPerBar
    }

    if (samplesPerBeatChanged || samplesPerBarChanged) {
      this.lastSamplesPerBeat = samplesPerBeat
      this.lastSamplesPerBar = samplesPerBar
    }


    let phase: f32 = this.phase
    let output: f32

    let p: f32
    let tri: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          const barClamped: f32 = max(load<f32>(bar$), 0)
          const offsetClamped: f32 = max(load<f32>(offset$), 0)
          phase = fract01(((offsetClamped * samplesPerBeat) / max((barClamped * samplesPerBar), 1)))
        }
        prevTrig = trig
        phaseInc = (1 / max((max(load<f32>(bar$), 0) * samplesPerBar), 1))
        p = fract01((phase + 0.25))
        tri = (p < 0.5) ? ((4 * p) - 1) : (3 - (4 * p))
        output = ((tri + 1) * 0.5)
        phase = (phase + phaseInc)
        if ((phase >= 1)) {
          phase = fract01(phase)
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.phase = phase
    this.prevTrig = prevTrig
  }
}