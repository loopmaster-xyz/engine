// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Sustain_default_seconds_scalar_trig_scalar {
  static readonly defaultInstance: Sustain_default_seconds_scalar_trig_scalar = new Sustain_default_seconds_scalar_trig_scalar()

  remainingSamples: f32 = 0
  lastSeconds: f32 = Infinity
  lastSampleRate: f32 = Infinity
  sustainSamples: f32
  prevTrig: f32

  reset(): void {
    this.copyFrom(Sustain_default_seconds_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sustain_default_seconds_scalar_trig_scalar): void {
    this.remainingSamples = src.remainingSamples
    this.lastSeconds = src.lastSeconds
    this.lastSampleRate = src.lastSampleRate
    this.sustainSamples = src.sustainSamples
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seconds: f32, trig: f32): void {
    const secondsClamped: f32 = max(seconds, 0.00001)
    const secondsChanged: boolean = secondsClamped !== this.lastSeconds
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (secondsChanged || sampleRateChanged) {
      this.sustainSamples = (secondsClamped * sampleRate)
      this.lastSeconds = secondsClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let remainingSamples: f32 = this.remainingSamples
    let output: f32
    let sustainSamples: f32 = this.sustainSamples

    let isActive: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        if (((trig > 0) && (prevTrig <= 0))) {
          remainingSamples = sustainSamples
        }
        prevTrig = trig
        isActive = (remainingSamples > 0) ? 1 : 0
        output = isActive
        if ((isActive > 0)) {
          remainingSamples = (remainingSamples - 1)
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.remainingSamples = remainingSamples
  }
}

export class Sustain_default_seconds_scalar_trig_audio {
  static readonly defaultInstance: Sustain_default_seconds_scalar_trig_audio = new Sustain_default_seconds_scalar_trig_audio()

  remainingSamples: f32 = 0
  lastSeconds: f32 = Infinity
  lastSampleRate: f32 = Infinity
  sustainSamples: f32
  prevTrig: f32

  reset(): void {
    this.copyFrom(Sustain_default_seconds_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Sustain_default_seconds_scalar_trig_audio): void {
    this.remainingSamples = src.remainingSamples
    this.lastSeconds = src.lastSeconds
    this.lastSampleRate = src.lastSampleRate
    this.sustainSamples = src.sustainSamples
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seconds: f32, trig$: usize): void {
    const secondsClamped: f32 = max(seconds, 0.00001)
    const secondsChanged: boolean = secondsClamped !== this.lastSeconds
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (secondsChanged || sampleRateChanged) {
      this.sustainSamples = (secondsClamped * sampleRate)
      this.lastSeconds = secondsClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let remainingSamples: f32 = this.remainingSamples
    let output: f32
    let sustainSamples: f32 = this.sustainSamples

    let isActive: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          remainingSamples = sustainSamples
        }
        prevTrig = trig
        isActive = (remainingSamples > 0) ? 1 : 0
        output = isActive
        if ((isActive > 0)) {
          remainingSamples = (remainingSamples - 1)
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.remainingSamples = remainingSamples
  }
}

export class Sustain_default_seconds_audio_trig_scalar {
  static readonly defaultInstance: Sustain_default_seconds_audio_trig_scalar = new Sustain_default_seconds_audio_trig_scalar()

  remainingSamples: f32 = 0
  prevTrig: f32

  reset(): void {
    this.copyFrom(Sustain_default_seconds_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sustain_default_seconds_audio_trig_scalar): void {
    this.remainingSamples = src.remainingSamples
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, seconds$: usize): void {

    let sustainSamples: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let remainingSamples: f32 = this.remainingSamples
    let output: f32

    let isActive: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainSamples = (max(load<f32>(seconds$), 0.00001) * sampleRate)
        if (((trig > 0) && (prevTrig <= 0))) {
          remainingSamples = sustainSamples
        }
        prevTrig = trig
        isActive = (remainingSamples > 0) ? 1 : 0
        output = isActive
        if ((isActive > 0)) {
          remainingSamples = (remainingSamples - 1)
        }
        store<f32>(output$, output)
        output$ += 4
        seconds$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.remainingSamples = remainingSamples
  }
}

export class Sustain_default_seconds_audio_trig_audio {
  static readonly defaultInstance: Sustain_default_seconds_audio_trig_audio = new Sustain_default_seconds_audio_trig_audio()

  remainingSamples: f32 = 0
  lastSampleRate: f32 = Infinity
  prevTrig: f32

  reset(): void {
    this.copyFrom(Sustain_default_seconds_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Sustain_default_seconds_audio_trig_audio): void {
    this.remainingSamples = src.remainingSamples
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seconds$: usize, trig$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let sustainSamples: f32 = 0

    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let prevTrig: f32 = this.prevTrig
    let remainingSamples: f32 = this.remainingSamples
    let output: f32

    let isActive: f32


    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        sustainSamples = (max(load<f32>(seconds$), 0.00001) * sampleRate)
        if (((trig > 0) && (prevTrig <= 0))) {
          remainingSamples = sustainSamples
        }
        prevTrig = trig
        isActive = (remainingSamples > 0) ? 1 : 0
        output = isActive
        if ((isActive > 0)) {
          remainingSamples = (remainingSamples - 1)
        }
        store<f32>(output$, output)
        output$ += 4
        seconds$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.remainingSamples = remainingSamples
  }
}