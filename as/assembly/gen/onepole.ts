// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, exp, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Onepole_lp1_cutoff_scalar {
  static readonly defaultInstance: Onepole_lp1_cutoff_scalar = new Onepole_lp1_cutoff_scalar()

  lastCutoff: f32 = Infinity
  lastNyquist: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  freq: f32
  w0: f32
  alpha: f32
  outVal: f32
  y1: f32

  reset(): void {
    this.copyFrom(Onepole_lp1_cutoff_scalar.defaultInstance)
  }

  copyFrom(src: Onepole_lp1_cutoff_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastNyquist = src.lastNyquist
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.freq = src.freq
    this.w0 = src.w0
    this.alpha = src.alpha
    this.outVal = src.outVal
    this.y1 = src.y1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const nyquistChanged: boolean = nyquist !== this.lastNyquist
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || nyquistChanged) {
      this.freq = max(20, min(cutoffClamped, nyquist))
      this.lastNyquist = nyquist
    }

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (this.freq * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.alpha = (1 - exp(-this.w0))
      this.lastCutoff = cutoffClamped
    }

    let y1: f32 = this.y1
    let input: f32
    let output: f32
    let alpha: f32 = this.alpha

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        y1 = (y1 + (alpha * (input - y1)))
        outVal = y1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.y1 = y1
  }
}

export class Onepole_lp1_cutoff_audio {
  static readonly defaultInstance: Onepole_lp1_cutoff_audio = new Onepole_lp1_cutoff_audio()

  lastNyquist: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  y1: f32

  reset(): void {
    this.copyFrom(Onepole_lp1_cutoff_audio.defaultInstance)
  }

  copyFrom(src: Onepole_lp1_cutoff_audio): void {
    this.lastNyquist = src.lastNyquist
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.y1 = src.y1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize): void {
    const nyquistChanged: boolean = nyquist !== this.lastNyquist
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let alpha: f32 = 0
    let outVal: f32 = 0

    if (nyquistChanged) {
      this.lastNyquist = nyquist
    }

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let y1: f32 = this.y1
    let input: f32
    let output: f32

    let freq: f32
    let w0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        freq = max(20, min(clamp(load<f32>(cutoff$), 20, 20000), nyquist))
        w0 = (freq * piOverNyquist)
        alpha = (1 - exp(-w0))
        y1 = (y1 + (alpha * (input - y1)))
        outVal = y1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.y1 = y1
  }
}

export class Onepole_hp1_cutoff_scalar {
  static readonly defaultInstance: Onepole_hp1_cutoff_scalar = new Onepole_hp1_cutoff_scalar()

  lastCutoff: f32 = Infinity
  lastNyquist: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  freq: f32
  w0: f32
  alpha: f32
  outVal: f32
  y1: f32

  reset(): void {
    this.copyFrom(Onepole_hp1_cutoff_scalar.defaultInstance)
  }

  copyFrom(src: Onepole_hp1_cutoff_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastNyquist = src.lastNyquist
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.freq = src.freq
    this.w0 = src.w0
    this.alpha = src.alpha
    this.outVal = src.outVal
    this.y1 = src.y1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const nyquistChanged: boolean = nyquist !== this.lastNyquist
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || nyquistChanged) {
      this.freq = max(20, min(cutoffClamped, nyquist))
      this.lastNyquist = nyquist
    }

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (this.freq * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.alpha = (1 - exp(-this.w0))
      this.lastCutoff = cutoffClamped
    }

    let y1: f32 = this.y1
    let input: f32
    let output: f32
    let alpha: f32 = this.alpha

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        y1 = (y1 + (alpha * (input - y1)))
        outVal = (input - y1)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.y1 = y1
  }
}

export class Onepole_hp1_cutoff_audio {
  static readonly defaultInstance: Onepole_hp1_cutoff_audio = new Onepole_hp1_cutoff_audio()

  lastNyquist: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  y1: f32

  reset(): void {
    this.copyFrom(Onepole_hp1_cutoff_audio.defaultInstance)
  }

  copyFrom(src: Onepole_hp1_cutoff_audio): void {
    this.lastNyquist = src.lastNyquist
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.y1 = src.y1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize): void {
    const nyquistChanged: boolean = nyquist !== this.lastNyquist
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let alpha: f32 = 0
    let outVal: f32 = 0

    if (nyquistChanged) {
      this.lastNyquist = nyquist
    }

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let y1: f32 = this.y1
    let input: f32
    let output: f32

    let freq: f32
    let w0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        freq = max(20, min(clamp(load<f32>(cutoff$), 20, 20000), nyquist))
        w0 = (freq * piOverNyquist)
        alpha = (1 - exp(-w0))
        y1 = (y1 + (alpha * (input - y1)))
        outVal = (input - y1)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.y1 = y1
  }
}