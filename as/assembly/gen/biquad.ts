// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Biquad_lp_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Biquad_lp_cutoff_scalar_q_scalar = new Biquad_lp_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  a2: f32
  z: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_lp_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_lp_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.a2 = src.a2
    this.z = src.z
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (1 - c)
      const __opt1: f32 = (__opt0 * 0.5)
      this.b0 = __opt1
      this.b1 = __opt0
      this.b2 = __opt1
      this.a1 = (-2 * c)
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
      const a0: f32 = (1 + alpha)
      this.a2 = (1 - alpha)
      this.z = (1 / a0)
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const a2: f32 = this.a2
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    const z: f32 = this.z
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_lp_cutoff_scalar_q_audio {
  static readonly defaultInstance: Biquad_lp_cutoff_scalar_q_audio = new Biquad_lp_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_lp_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_lp_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (1 - c)
      const __opt1: f32 = (__opt0 * 0.5)
      this.b0 = __opt1
      this.b1 = __opt0
      this.b2 = __opt1
      this.a1 = (-2 * c)
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    let s: f32 = this.s

    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        a0 = (1 + alpha)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_lp_cutoff_audio_q_scalar {
  static readonly defaultInstance: Biquad_lp_cutoff_audio_q_scalar = new Biquad_lp_cutoff_audio_q_scalar()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_lp_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_lp_cutoff_audio_q_scalar): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)

    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (1 - c)
        __opt1 = (__opt0 * 0.5)
        b0 = __opt1
        b1 = __opt0
        b2 = __opt1
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_lp_cutoff_audio_q_audio {
  static readonly defaultInstance: Biquad_lp_cutoff_audio_q_audio = new Biquad_lp_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_lp_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_lp_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (1 - c)
        __opt1 = (__opt0 * 0.5)
        b0 = __opt1
        b1 = __opt0
        b2 = __opt1
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_hp_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Biquad_hp_cutoff_scalar_q_scalar = new Biquad_hp_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  a2: f32
  z: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_hp_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_hp_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.a2 = src.a2
    this.z = src.z
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (1 + c)
      const __opt1: f32 = (__opt0 / 2)
      this.b0 = __opt1
      this.b1 = -__opt0
      this.b2 = __opt1
      this.a1 = (-2 * c)
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
      const a0: f32 = (1 + alpha)
      this.a2 = (1 - alpha)
      this.z = (1 / a0)
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const a2: f32 = this.a2
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    const z: f32 = this.z
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_hp_cutoff_scalar_q_audio {
  static readonly defaultInstance: Biquad_hp_cutoff_scalar_q_audio = new Biquad_hp_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_hp_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_hp_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (1 + c)
      const __opt1: f32 = (__opt0 / 2)
      this.b0 = __opt1
      this.b1 = -__opt0
      this.b2 = __opt1
      this.a1 = (-2 * c)
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    let s: f32 = this.s

    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        a0 = (1 + alpha)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_hp_cutoff_audio_q_scalar {
  static readonly defaultInstance: Biquad_hp_cutoff_audio_q_scalar = new Biquad_hp_cutoff_audio_q_scalar()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_hp_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_hp_cutoff_audio_q_scalar): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)

    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (1 + c)
        __opt1 = (__opt0 / 2)
        b0 = __opt1
        b1 = -__opt0
        b2 = __opt1
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_hp_cutoff_audio_q_audio {
  static readonly defaultInstance: Biquad_hp_cutoff_audio_q_audio = new Biquad_hp_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_hp_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_hp_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (1 + c)
        __opt1 = (__opt0 / 2)
        b0 = __opt1
        b1 = -__opt0
        b2 = __opt1
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bp_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Biquad_bp_cutoff_scalar_q_scalar = new Biquad_bp_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  a2: f32
  z: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bp_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_bp_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.a2 = src.a2
    this.z = src.z
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      this.a1 = (-2 * c)
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
      this.b0 = alpha
      this.b2 = -alpha
      const a0: f32 = (1 + alpha)
      this.a2 = (1 - alpha)
      this.z = (1 / a0)
    }

    this.b1 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const a2: f32 = this.a2
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    const z: f32 = this.z
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bp_cutoff_scalar_q_audio {
  static readonly defaultInstance: Biquad_bp_cutoff_scalar_q_audio = new Biquad_bp_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b1: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bp_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_bp_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b1 = src.b1
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a2: f32 = 0
    let b0: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      this.a1 = (-2 * c)
    }

    this.b1 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const b1: f32 = this.b1
    let s: f32 = this.s

    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        b0 = alpha
        b2 = -alpha
        a0 = (1 + alpha)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bp_cutoff_audio_q_scalar {
  static readonly defaultInstance: Biquad_bp_cutoff_audio_q_scalar = new Biquad_bp_cutoff_audio_q_scalar()

  b1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bp_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_bp_cutoff_audio_q_scalar): void {
    this.b1 = src.b1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)

    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0
    this.b1 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const b1: f32 = this.b1

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        b0 = alpha
        b2 = -alpha
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bp_cutoff_audio_q_audio {
  static readonly defaultInstance: Biquad_bp_cutoff_audio_q_audio = new Biquad_bp_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  b1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bp_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_bp_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.b1 = src.b1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }

    this.b1 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const b1: f32 = this.b1

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        b0 = alpha
        b2 = -alpha
        a0 = (1 + alpha)
        a1 = (-2 * c)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bs_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Biquad_bs_cutoff_scalar_q_scalar = new Biquad_bs_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  a2: f32
  z: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bs_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_bs_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.a2 = src.a2
    this.z = src.z
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (-2 * c)
      this.b1 = __opt0
      this.a1 = __opt0
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
      const a0: f32 = (1 + alpha)
      this.a2 = (1 - alpha)
      this.z = (1 / a0)
    }

    this.b0 = 1
    this.b2 = this.b0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const a2: f32 = this.a2
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    const z: f32 = this.z
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bs_cutoff_scalar_q_audio {
  static readonly defaultInstance: Biquad_bs_cutoff_scalar_q_audio = new Biquad_bs_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bs_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_bs_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (-2 * c)
      this.b1 = __opt0
      this.a1 = __opt0
    }

    this.b0 = 1
    this.b2 = this.b0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    let s: f32 = this.s

    let alpha: f32
    let a0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        a0 = (1 + alpha)
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bs_cutoff_audio_q_scalar {
  static readonly defaultInstance: Biquad_bs_cutoff_audio_q_scalar = new Biquad_bs_cutoff_audio_q_scalar()

  b0: f32
  b2: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bs_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_bs_cutoff_audio_q_scalar): void {
    this.b0 = src.b0
    this.b2 = src.b2
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)

    let a1: f32 = 0
    let a2: f32 = 0
    let b1: f32 = 0
    let z: f32 = 0
    this.b0 = 1
    this.b2 = 1

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const b0: f32 = this.b0
    const b2: f32 = this.b2

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (-2 * c)
        b1 = __opt0
        a0 = (1 + alpha)
        a1 = __opt0
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_bs_cutoff_audio_q_audio {
  static readonly defaultInstance: Biquad_bs_cutoff_audio_q_audio = new Biquad_bs_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  b0: f32
  b2: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_bs_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_bs_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.b0 = src.b0
    this.b2 = src.b2
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b1: f32 = 0
    let z: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }

    this.b0 = 1
    this.b2 = this.b0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const b0: f32 = this.b0
    const b2: f32 = this.b2

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (-2 * c)
        b1 = __opt0
        a0 = (1 + alpha)
        a1 = __opt0
        a2 = (1 - alpha)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_ap_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Biquad_ap_cutoff_scalar_q_scalar = new Biquad_ap_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b0: f32
  b1: f32
  b2: f32
  a1: f32
  a2: f32
  z: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_ap_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_ap_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b0 = src.b0
    this.b1 = src.b1
    this.b2 = src.b2
    this.a1 = src.a1
    this.a2 = src.a2
    this.z = src.z
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (-2 * c)
      this.b1 = __opt0
      this.a1 = __opt0
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
      const __opt0: f32 = (1 - alpha)
      const __opt1: f32 = (1 + alpha)
      this.b0 = __opt0
      this.b2 = __opt1
      const a0: f32 = __opt1
      this.a2 = __opt0
      this.z = (1 / a0)
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const a2: f32 = this.a2
    const b0: f32 = this.b0
    const b1: f32 = this.b1
    const b2: f32 = this.b2
    const z: f32 = this.z
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_ap_cutoff_scalar_q_audio {
  static readonly defaultInstance: Biquad_ap_cutoff_scalar_q_audio = new Biquad_ap_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  b1: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_ap_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_ap_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.b1 = src.b1
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a2: f32 = 0
    let b0: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const c: f32 = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
      const __opt0: f32 = (-2 * c)
      this.b1 = __opt0
      this.a1 = __opt0
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    const b1: f32 = this.b1
    let s: f32 = this.s

    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (1 - alpha)
        __opt1 = (1 + alpha)
        b0 = __opt0
        b2 = __opt1
        a0 = __opt1
        a2 = __opt0
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_ap_cutoff_audio_q_scalar {
  static readonly defaultInstance: Biquad_ap_cutoff_audio_q_scalar = new Biquad_ap_cutoff_audio_q_scalar()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_ap_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Biquad_ap_cutoff_audio_q_scalar): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)

    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (-2 * c)
        __opt1 = (1 - alpha)
        __opt2 = (1 + alpha)
        b0 = __opt1
        b1 = __opt0
        b2 = __opt2
        a0 = __opt2
        a1 = __opt0
        a2 = __opt1
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquad_ap_cutoff_audio_q_audio {
  static readonly defaultInstance: Biquad_ap_cutoff_audio_q_audio = new Biquad_ap_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquad_ap_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Biquad_ap_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (-2 * c)
        __opt1 = (1 - alpha)
        __opt2 = (1 + alpha)
        b0 = __opt1
        b1 = __opt0
        b2 = __opt2
        a0 = __opt2
        a1 = __opt0
        a2 = __opt1
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}