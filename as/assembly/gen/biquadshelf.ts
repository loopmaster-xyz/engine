// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar = new Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  A: f32
  beta: f32
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
    this.copyFrom(Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.A = src.A
    this.beta = src.beta
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || gainChanged) {
      const __opt0: f32 = (this.A + 1)
      const __opt1: f32 = (this.A - 1)
      const __opt2: f32 = (this.beta * this.s)
      const __opt3: f32 = (__opt1 * this.c)
      const __opt4: f32 = (__opt0 * this.c)
      const __opt5: f32 = (__opt0 - (__opt1 * this.c))
      const __opt6: f32 = (__opt0 + (__opt1 * this.c))
      this.b0 = (this.A * (__opt5 + __opt2))
      this.b1 = ((2 * this.A) * (__opt1 - __opt4))
      this.b2 = (this.A * (__opt5 - __opt2))
      const a0: f32 = (__opt6 + __opt2)
      this.a1 = (-2 * (__opt1 + __opt4))
      this.a2 = (__opt6 - __opt2)
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

export class Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio = new Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let c: f32 = this.c
    let s: f32 = this.s

    let A: f32
    let beta: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar = new Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar()

  lastCutoff: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  A: f32
  beta: f32
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
    this.copyFrom(Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.A = src.A
    this.beta = src.beta
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, gain: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    if (cutoffChanged || gainChanged) {
      const __opt0: f32 = (this.A + 1)
      const __opt1: f32 = (this.A - 1)
      const __opt2: f32 = (this.beta * this.s)
      const __opt3: f32 = (__opt1 * this.c)
      const __opt4: f32 = (__opt0 * this.c)
      const __opt5: f32 = (__opt0 - (__opt1 * this.c))
      const __opt6: f32 = (__opt0 + (__opt1 * this.c))
      this.b0 = (this.A * (__opt5 + __opt2))
      this.b1 = ((2 * this.A) * (__opt1 - __opt4))
      this.b2 = (this.A * (__opt5 - __opt2))
      const a0: f32 = (__opt6 + __opt2)
      this.a1 = (-2 * (__opt1 + __opt4))
      this.a2 = (__opt6 - __opt2)
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
    let s: f32 = this.s
    const z: f32 = this.z

    let alpha: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
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

export class Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio = new Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize, gain$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let c: f32 = this.c
    let s: f32 = this.s

    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar = new Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  beta: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.beta = src.beta
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, gain: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A
    let beta: f32 = this.beta

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
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

export class Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio = new Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * qClamped))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar = new Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  beta: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.beta = src.beta
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, gain: f32, cutoff$: usize, q$: usize): void {
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A
    let beta: f32 = this.beta

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
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

export class Biquadshelf_ls_cutoff_audio_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_ls_cutoff_audio_q_audio_gain_audio = new Biquadshelf_ls_cutoff_audio_q_audio_gain_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_ls_cutoff_audio_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_ls_cutoff_audio_q_audio_gain_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 - (__opt1 * c))
        __opt6 = (__opt0 + (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((2 * A) * (__opt1 - __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (-2 * (__opt1 + __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar = new Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  A: f32
  beta: f32
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
    this.copyFrom(Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.A = src.A
    this.beta = src.beta
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || gainChanged) {
      const __opt0: f32 = (this.A + 1)
      const __opt1: f32 = (this.A - 1)
      const __opt2: f32 = (this.beta * this.s)
      const __opt3: f32 = (__opt1 * this.c)
      const __opt4: f32 = (__opt0 * this.c)
      const __opt5: f32 = (__opt0 + (__opt1 * this.c))
      const __opt6: f32 = (__opt0 - (__opt1 * this.c))
      this.b0 = (this.A * (__opt5 + __opt2))
      this.b1 = ((-2 * this.A) * (__opt1 + __opt4))
      this.b2 = (this.A * (__opt5 - __opt2))
      const a0: f32 = (__opt6 + __opt2)
      this.a1 = (2 * (__opt1 - __opt4))
      this.a2 = (__opt6 - __opt2)
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

export class Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio = new Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (cutoffChanged || qChanged) {
      const alpha: f32 = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let c: f32 = this.c
    let s: f32 = this.s

    let A: f32
    let beta: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar = new Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar()

  lastCutoff: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  A: f32
  beta: f32
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
    this.copyFrom(Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.A = src.A
    this.beta = src.beta
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, gain: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    if (cutoffChanged || gainChanged) {
      const __opt0: f32 = (this.A + 1)
      const __opt1: f32 = (this.A - 1)
      const __opt2: f32 = (this.beta * this.s)
      const __opt3: f32 = (__opt1 * this.c)
      const __opt4: f32 = (__opt0 * this.c)
      const __opt5: f32 = (__opt0 + (__opt1 * this.c))
      const __opt6: f32 = (__opt0 - (__opt1 * this.c))
      this.b0 = (this.A * (__opt5 + __opt2))
      this.b1 = ((-2 * this.A) * (__opt1 + __opt4))
      this.b2 = (this.A * (__opt5 - __opt2))
      const a0: f32 = (__opt6 + __opt2)
      this.a1 = (2 * (__opt1 - __opt4))
      this.a2 = (__opt6 - __opt2)
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
    let s: f32 = this.s
    const z: f32 = this.z

    let alpha: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
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

export class Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio = new Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  c: f32
  s: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.c = src.c
    this.s = src.s
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize, gain$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      this.c = cos(this.w0)
      this.s = sin(this.w0)
      this.lastCutoff = cutoffClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let c: f32 = this.c
    let s: f32 = this.s

    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar = new Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  beta: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.beta = src.beta
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, gain: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A
    let beta: f32 = this.beta

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * qClamped))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
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

export class Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio = new Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * qClamped))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar = new Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  beta: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.beta = src.beta
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, gain: f32, cutoff$: usize, q$: usize): void {
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      this.beta = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A
    let beta: f32 = this.beta

    let w0: f32
    let c: f32
    let s: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
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

export class Biquadshelf_hs_cutoff_audio_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_hs_cutoff_audio_q_audio_gain_audio = new Biquadshelf_hs_cutoff_audio_q_audio_gain_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_hs_cutoff_audio_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_hs_cutoff_audio_q_audio_gain_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    let __opt2: f32
    let __opt3: f32
    let __opt4: f32
    let __opt5: f32
    let __opt6: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 20, 20000) * piOverNyquist)
        c = cos(w0)
        s = sin(w0)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (A + 1)
        __opt1 = (A - 1)
        __opt2 = (beta * s)
        __opt3 = (__opt1 * c)
        __opt4 = (__opt0 * c)
        __opt5 = (__opt0 + (__opt1 * c))
        __opt6 = (__opt0 - (__opt1 * c))
        b0 = (A * (__opt5 + __opt2))
        b1 = ((-2 * A) * (__opt1 + __opt4))
        b2 = (A * (__opt5 - __opt2))
        a0 = (__opt6 + __opt2)
        a1 = (2 * (__opt1 - __opt4))
        a2 = (__opt6 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar = new Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  A: f32
  alpha: f32
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
    this.copyFrom(Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.A = src.A
    this.alpha = src.alpha
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
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

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      const beta: f32 = sqrt(this.A)
      this.lastGain = gainClamped
    }

    if (cutoffChanged || qChanged) {
      this.alpha = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged || gainChanged) {
      this.lastQ = qClamped
      const __opt0: f32 = (this.alpha * this.A)
      const __opt1: f32 = (this.alpha / this.A)
      this.b0 = (1 + __opt0)
      this.b2 = (1 - __opt0)
      const a0: f32 = (1 + __opt1)
      this.a2 = (1 - __opt1)
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

export class Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio = new Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  alpha: f32
  b1: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.alpha = src.alpha
    this.b1 = src.b1
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, gain$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0.01, 20)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
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

    if (cutoffChanged || qChanged) {
      this.alpha = (this.s / (2 * qClamped))
      this.lastQ = qClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    const a1: f32 = this.a1
    let alpha: f32 = this.alpha
    const b1: f32 = this.b1

    let A: f32
    let beta: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        __opt0 = (alpha * A)
        __opt1 = (alpha / A)
        b0 = (1 + __opt0)
        b2 = (1 - __opt0)
        a0 = (1 + __opt1)
        a2 = (1 - __opt1)
        z = (1 / a0)
        output = ((((((b0 * z) * input) + ((b1 * z) * x1)) + ((b2 * z) * x2)) - ((a1 * z) * y1)) - ((a2 * z) * y2))
        x2 = x1
        x1 = input
        y2 = y1
        y1 = output
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar = new Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar()

  lastCutoff: f32 = Infinity
  lastGain: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  s: f32
  A: f32
  b1: f32
  a1: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastGain = src.lastGain
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.s = src.s
    this.A = src.A
    this.b1 = src.b1
    this.a1 = src.a1
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, gain: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const gainChanged: boolean = gainClamped !== this.lastGain
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

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      const beta: f32 = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A
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
        __opt0 = (alpha * A)
        __opt1 = (alpha / A)
        b0 = (1 + __opt0)
        b2 = (1 - __opt0)
        a0 = (1 + __opt1)
        a2 = (1 - __opt1)
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

export class Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio = new Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio()

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
    this.copyFrom(Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio): void {
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

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize, gain$: usize): void {
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

    let A: f32
    let beta: f32
    let alpha: f32
    let a0: f32
    let __opt0: f32
    let __opt1: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (alpha * A)
        __opt1 = (alpha / A)
        b0 = (1 + __opt0)
        b2 = (1 - __opt0)
        a0 = (1 + __opt1)
        a2 = (1 - __opt1)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar = new Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, gain: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 20)
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      const beta: f32 = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A

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
        __opt1 = (alpha * A)
        __opt2 = (alpha / A)
        b0 = (1 + __opt1)
        b1 = __opt0
        b2 = (1 - __opt1)
        a0 = (1 + __opt2)
        a1 = __opt0
        a2 = (1 - __opt2)
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

export class Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio = new Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio()

  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio): void {
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
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
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * qClamped))
        __opt0 = (-2 * c)
        __opt1 = (alpha * A)
        __opt2 = (alpha / A)
        b0 = (1 + __opt1)
        b1 = __opt0
        b2 = (1 - __opt1)
        a0 = (1 + __opt2)
        a1 = __opt0
        a2 = (1 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

export class Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar = new Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar()

  lastGain: f32 = Infinity
  A: f32
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar): void {
    this.lastGain = src.lastGain
    this.A = src.A
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, gain: f32, cutoff$: usize, q$: usize): void {
    const gainClamped: f32 = clamp(gain, -40, 40)
    const gainChanged: boolean = gainClamped !== this.lastGain


    let a1: f32 = 0
    let a2: f32 = 0
    let b0: f32 = 0
    let b1: f32 = 0
    let b2: f32 = 0
    let z: f32 = 0

    if (gainChanged) {
      this.A = pow(10, (gainClamped / 40))
      const beta: f32 = sqrt(this.A)
      this.lastGain = gainClamped
    }

    let x1: f32 = this.x1
    let x2: f32 = this.x2
    let y1: f32 = this.y1
    let y2: f32 = this.y2
    let input: f32
    let output: f32
    let A: f32 = this.A

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
        __opt1 = (alpha * A)
        __opt2 = (alpha / A)
        b0 = (1 + __opt1)
        b1 = __opt0
        b2 = (1 - __opt1)
        a0 = (1 + __opt2)
        a1 = __opt0
        a2 = (1 - __opt2)
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

export class Biquadshelf_peak_cutoff_audio_q_audio_gain_audio {
  static readonly defaultInstance: Biquadshelf_peak_cutoff_audio_q_audio_gain_audio = new Biquadshelf_peak_cutoff_audio_q_audio_gain_audio()

  lastPiOverNyquist: f32 = Infinity
  x1: f32
  x2: f32
  y1: f32
  y2: f32

  reset(): void {
    this.copyFrom(Biquadshelf_peak_cutoff_audio_q_audio_gain_audio.defaultInstance)
  }

  copyFrom(src: Biquadshelf_peak_cutoff_audio_q_audio_gain_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.x1 = src.x1
    this.x2 = src.x2
    this.y1 = src.y1
    this.y2 = src.y2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize, gain$: usize): void {
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
    let A: f32
    let beta: f32
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
        A = pow(10, (clamp(load<f32>(gain$), -40, 40) / 40))
        beta = sqrt(A)
        alpha = (s / (2 * clamp(load<f32>(q$), 0.01, 20)))
        __opt0 = (-2 * c)
        __opt1 = (alpha * A)
        __opt2 = (alpha / A)
        b0 = (1 + __opt1)
        b1 = __opt0
        b2 = (1 - __opt1)
        a0 = (1 + __opt2)
        a1 = __opt0
        a2 = (1 - __opt2)
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
        gain$ += 4
      })
    }

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}