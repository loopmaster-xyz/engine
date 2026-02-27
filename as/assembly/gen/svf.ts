// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Svf_lps_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_lps_cutoff_scalar_q_scalar = new Svf_lps_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_lps_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_lps_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v2
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_lps_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_lps_cutoff_scalar_q_audio = new Svf_lps_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_lps_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_lps_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v2
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_lps_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_lps_cutoff_audio_q_scalar = new Svf_lps_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_lps_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_lps_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v2
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_lps_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_lps_cutoff_audio_q_audio = new Svf_lps_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_lps_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_lps_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v2
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_hps_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_hps_cutoff_scalar_q_scalar = new Svf_hps_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_hps_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_hps_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - v2)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_hps_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_hps_cutoff_scalar_q_audio = new Svf_hps_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_hps_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_hps_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - v2)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_hps_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_hps_cutoff_audio_q_scalar = new Svf_hps_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_hps_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_hps_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - v2)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_hps_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_hps_cutoff_audio_q_audio = new Svf_hps_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_hps_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_hps_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - v2)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bps_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_bps_cutoff_scalar_q_scalar = new Svf_bps_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bps_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_bps_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bps_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_bps_cutoff_scalar_q_audio = new Svf_bps_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bps_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_bps_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bps_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_bps_cutoff_audio_q_scalar = new Svf_bps_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bps_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_bps_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bps_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_bps_cutoff_audio_q_audio = new Svf_bps_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bps_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_bps_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = v1
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bss_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_bss_cutoff_scalar_q_scalar = new Svf_bss_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bss_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_bss_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - (k * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bss_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_bss_cutoff_scalar_q_audio = new Svf_bss_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bss_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_bss_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - (k * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bss_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_bss_cutoff_audio_q_scalar = new Svf_bss_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bss_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_bss_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - (k * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_bss_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_bss_cutoff_audio_q_audio = new Svf_bss_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_bss_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_bss_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - (k * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_peaks_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_peaks_cutoff_scalar_q_scalar = new Svf_peaks_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_peaks_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_peaks_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - (2 * v2))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_peaks_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_peaks_cutoff_scalar_q_audio = new Svf_peaks_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_peaks_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_peaks_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - (2 * v2))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_peaks_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_peaks_cutoff_audio_q_scalar = new Svf_peaks_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_peaks_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_peaks_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - (2 * v2))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_peaks_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_peaks_cutoff_audio_q_audio = new Svf_peaks_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_peaks_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_peaks_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = ((v0 - (k * v1)) - (2 * v2))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_aps_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Svf_aps_cutoff_scalar_q_scalar = new Svf_aps_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  k: f32
  a1: f32
  a2: f32
  a3: f32
  outVal: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_aps_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_aps_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.k = src.k
    this.a1 = src.a1
    this.a2 = src.a2
    this.a3 = src.a3
    this.outVal = src.outVal
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.a1 = (1 / (1 + (this.g * (this.g + this.k))))
      this.a2 = (this.g * this.a1)
      this.a3 = (this.g * this.a2)
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let a1: f32 = this.a1
    let a2: f32 = this.a2
    let a3: f32 = this.a3
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - ((2 * k) * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_aps_cutoff_scalar_q_audio {
  static readonly defaultInstance: Svf_aps_cutoff_scalar_q_audio = new Svf_aps_cutoff_scalar_q_audio()

  lastCutoff: f32 = Infinity
  lastPiOverNyquist: f32 = Infinity
  w0: f32
  g: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_aps_cutoff_scalar_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_aps_cutoff_scalar_q_audio): void {
    this.lastCutoff = src.lastCutoff
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.w0 = src.w0
    this.g = src.g
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (cutoffChanged || piOverNyquistChanged) {
      this.w0 = (cutoffClamped * piOverNyquist)
      this.lastPiOverNyquist = piOverNyquist
    }

    if (cutoffChanged) {
      const w0Half: f32 = (this.w0 * 0.5)
      this.g = (sin(w0Half) / cos(w0Half))
      this.lastCutoff = cutoffClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let g: f32 = this.g

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - ((2 * k) * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_aps_cutoff_audio_q_scalar {
  static readonly defaultInstance: Svf_aps_cutoff_audio_q_scalar = new Svf_aps_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  k: f32
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_aps_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Svf_aps_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.k = src.k
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.k = (2 - (2 * qClamped))
      this.lastQ = qClamped
    }

    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32
    let k: f32 = this.k

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - ((2 * k) * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}

export class Svf_aps_cutoff_audio_q_audio {
  static readonly defaultInstance: Svf_aps_cutoff_audio_q_audio = new Svf_aps_cutoff_audio_q_audio()

  lastPiOverNyquist: f32 = Infinity
  c2: f32
  c1: f32

  reset(): void {
    this.copyFrom(Svf_aps_cutoff_audio_q_audio.defaultInstance)
  }

  copyFrom(src: Svf_aps_cutoff_audio_q_audio): void {
    this.lastPiOverNyquist = src.lastPiOverNyquist
    this.c2 = src.c2
    this.c1 = src.c1
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize): void {
    const piOverNyquistChanged: boolean = piOverNyquist !== this.lastPiOverNyquist


    let a1: f32 = 0
    let a2: f32 = 0
    let a3: f32 = 0
    let outVal: f32 = 0

    if (piOverNyquistChanged) {
      this.lastPiOverNyquist = piOverNyquist
    }


    let c2: f32 = this.c2
    let c1: f32 = this.c1
    let input: f32
    let output: f32

    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32

    let w0: f32
    let w0Half: f32
    let g: f32
    let k: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        w0 = (clamp(load<f32>(cutoff$), 50, 20000) * piOverNyquist)
        w0Half = (w0 * 0.5)
        g = (sin(w0Half) / cos(w0Half))
        k = (2 - (2 * clamp(load<f32>(q$), 0.01, 0.985)))
        a1 = (1 / (1 + (g * (g + k))))
        a2 = (g * a1)
        a3 = (g * a2)
        v0 = input
        v3 = (v0 - c2)
        v1 = ((a1 * c1) + (a2 * v3))
        v2 = ((c2 + (a2 * c1)) + (a3 * v3))
        c1 = ((2 * v1) - c1)
        c2 = ((2 * v2) - c2)
        outVal = (v0 - ((2 * k) * v1))
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.c2 = c2
    this.c1 = c1
  }
}