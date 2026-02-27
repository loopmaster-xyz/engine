// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'
export const DIODELADDER_Q_COMP: f32 = f32(2.5)
export const DIODELADDER_K_COMP: f32 = f32(1)

export class Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar = new Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastK: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  qq: f32
  comp: f32
  cutComp: f32
  a2x2: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastK = src.lastK
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.qq = src.qq
    this.comp = src.comp
    this.cutComp = src.cutComp
    this.a2x2 = src.a2x2
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, k: f32, sat: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0, 1)
    const kClamped: f32 = clamp(k, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const kChanged: boolean = kClamped !== this.lastK
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    if (qChanged || kChanged) {
      this.comp = ((1 + (DIODELADDER_Q_COMP * this.qq)) + (DIODELADDER_K_COMP * (kClamped * qClamped)))
    }

    if (cutoffChanged || qChanged || kChanged) {
      this.a2x2 = ((2 * this.a2) * this.a2)
      this.lastCutoff = cutoffClamped
    }

    if (cutoffChanged || qChanged || kChanged || nyquistChanged) {
      this.cutComp = max(20, min(((this.cutNorm / this.comp) * nyquist), nyquist))
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    this.A = (1 + (0.5 * this.kRes))
    this.a = ((TWO_PI / 2) * (this.cutComp / nyquist))
    this.a = ((2 * sin((0.5 * this.a))) / cos((0.5 * this.a)))
    this.ainv = (1 / this.a)
    this.a2 = (this.a * this.a)
    this.b = ((2 * this.a) + 1)
    this.b2 = (this.b * this.b)
    this.c = (1 / ((this.a2x2 - ((4 * this.a2) * this.b2)) + (this.b2 * this.b2)))
    this.g0 = (this.a2x2 * this.c)
    this.g = (this.g0 * this.bh)

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let a: f32 = this.a
    let a2: f32 = this.a2
    let ah: f32 = this.ah
    let ainv: f32 = this.ainv
    let b: f32 = this.b
    let b2: f32 = this.b2
    let bh: f32 = this.bh
    let c: f32 = this.c
    let g: f32 = this.g
    let g0: f32 = this.g0
    let kRes: f32 = this.kRes

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio = new Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastK: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  qq: f32
  comp: f32
  cutComp: f32
  a2x2: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastK = src.lastK
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.qq = src.qq
    this.comp = src.comp
    this.cutComp = src.cutComp
    this.a2x2 = src.a2x2
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, k: f32, sat$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0, 1)
    const kClamped: f32 = clamp(k, 0, 1)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const kChanged: boolean = kClamped !== this.lastK
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    if (qChanged || kChanged) {
      this.comp = ((1 + (DIODELADDER_Q_COMP * this.qq)) + (DIODELADDER_K_COMP * (kClamped * qClamped)))
    }

    if (cutoffChanged || qChanged || kChanged) {
      this.a2x2 = ((2 * this.a2) * this.a2)
      this.lastCutoff = cutoffClamped
    }

    if (cutoffChanged || qChanged || kChanged || nyquistChanged) {
      this.cutComp = max(20, min(((this.cutNorm / this.comp) * nyquist), nyquist))
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    this.A = (1 + (0.5 * this.kRes))
    this.a = ((TWO_PI / 2) * (this.cutComp / nyquist))
    this.a = ((2 * sin((0.5 * this.a))) / cos((0.5 * this.a)))
    this.ainv = (1 / this.a)
    this.a2 = (this.a * this.a)
    this.b = ((2 * this.a) + 1)
    this.b2 = (this.b * this.b)
    this.c = (1 / ((this.a2x2 - ((4 * this.a2) * this.b2)) + (this.b2 * this.b2)))
    this.g0 = (this.a2x2 * this.c)
    this.g = (this.g0 * this.bh)

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let a: f32 = this.a
    let a2: f32 = this.a2
    let ah: f32 = this.ah
    let ainv: f32 = this.ainv
    let b: f32 = this.b
    let b2: f32 = this.b2
    let bh: f32 = this.bh
    let c: f32 = this.c
    let g: f32 = this.g
    let g0: f32 = this.g0
    let kRes: f32 = this.kRes

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar = new Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  qq: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.qq = src.qq
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, sat: f32, k$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let cutNorm: f32 = this.cutNorm
    let kRes: f32 = this.kRes
    let qq: f32 = this.qq

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let ah: f32
    let bh: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * qClamped)))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        k$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio = new Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  qq: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.qq = src.qq
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32, k$: usize, sat$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const qClamped: f32 = clamp(q, 0, 1)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let cutNorm: f32 = this.cutNorm
    let kRes: f32 = this.kRes
    let qq: f32 = this.qq

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let ah: f32
    let bh: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * qClamped)))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        k$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar = new Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastK: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastK = src.lastK
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, k: f32, sat: f32, q$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const kClamped: f32 = clamp(k, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const kChanged: boolean = kClamped !== this.lastK
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let ah: f32 = this.ah
    let bh: f32 = this.bh
    let cutNorm: f32 = this.cutNorm

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let qq: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (kClamped * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio = new Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastK: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastK = src.lastK
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, k: f32, q$: usize, sat$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const kClamped: f32 = clamp(k, 0, 1)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const kChanged: boolean = kClamped !== this.lastK
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let ah: f32 = this.ah
    let bh: f32 = this.bh
    let cutNorm: f32 = this.cutNorm

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let qq: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (kClamped * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar = new Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, sat: f32, q$: usize, k$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let cutNorm: f32 = this.cutNorm

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let qq: f32
    let ah: f32
    let bh: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
        k$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio = new Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastCutoff: f32 = Infinity
  lastNyquist: f32 = Infinity
  cutNorm: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastCutoff = src.lastCutoff
    this.lastNyquist = src.lastNyquist
    this.cutNorm = src.cutNorm
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q$: usize, k$: usize, sat$: usize): void {
    const cutoffClamped: f32 = clamp(cutoff, 20, 20000)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (cutoffChanged || nyquistChanged) {
      this.cutNorm = (cutoffClamped / nyquist)
      this.lastCutoff = cutoffClamped
      this.lastNyquist = nyquist
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let cutNorm: f32 = this.cutNorm

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let qq: f32
    let ah: f32
    let bh: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        q$ += 4
        k$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar = new Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastQ: f32 = Infinity
  lastK: f32 = Infinity
  qq: f32
  comp: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastQ = src.lastQ
    this.lastK = src.lastK
    this.qq = src.qq
    this.comp = src.comp
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, k: f32, sat: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0, 1)
    const kClamped: f32 = clamp(k, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const qChanged: boolean = qClamped !== this.lastQ
    const kChanged: boolean = kClamped !== this.lastK


    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    if (qChanged || kChanged) {
      this.comp = ((1 + (DIODELADDER_Q_COMP * this.qq)) + (DIODELADDER_K_COMP * (kClamped * qClamped)))
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let ah: f32 = this.ah
    let bh: f32 = this.bh
    let comp: f32 = this.comp
    let kRes: f32 = this.kRes

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio = new Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastQ: f32 = Infinity
  lastK: f32 = Infinity
  qq: f32
  comp: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastQ = src.lastQ
    this.lastK = src.lastK
    this.qq = src.qq
    this.comp = src.comp
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, k: f32, cutoff$: usize, sat$: usize): void {
    const qClamped: f32 = clamp(q, 0, 1)
    const kClamped: f32 = clamp(k, 0, 1)
    const qChanged: boolean = qClamped !== this.lastQ
    const kChanged: boolean = kClamped !== this.lastK


    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    if (qChanged || kChanged) {
      this.comp = ((1 + (DIODELADDER_Q_COMP * this.qq)) + (DIODELADDER_K_COMP * (kClamped * qClamped)))
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let ah: f32 = this.ah
    let bh: f32 = this.bh
    let comp: f32 = this.comp
    let kRes: f32 = this.kRes

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar = new Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastQ: f32 = Infinity
  qq: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastQ = src.lastQ
    this.qq = src.qq
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, sat: f32, cutoff$: usize, k$: usize): void {
    const qClamped: f32 = clamp(q, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const qChanged: boolean = qClamped !== this.lastQ


    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let kRes: f32 = this.kRes
    let qq: f32 = this.qq

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let ah: f32
    let bh: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * qClamped)))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        k$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio = new Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastQ: f32 = Infinity
  qq: f32
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastQ = src.lastQ
    this.qq = src.qq
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize, k$: usize, sat$: usize): void {
    const qClamped: f32 = clamp(q, 0, 1)
    const qChanged: boolean = qClamped !== this.lastQ


    if (qChanged) {
      this.qq = (qClamped * qClamped)
      this.kRes = (20 * qClamped)
      this.lastQ = qClamped
    }

    this.A = (1 + (0.5 * this.kRes))

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let A: f32 = this.A
    let kRes: f32 = this.kRes
    let qq: f32 = this.qq

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let ah: f32
    let bh: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * qClamped)))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        k$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar = new Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastK: f32 = Infinity
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastK = src.lastK
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, k: f32, sat: f32, cutoff$: usize, q$: usize): void {
    const kClamped: f32 = clamp(k, 0, 1)
    const satClamped: f32 = clamp(sat, 0.1, 10)
    const kChanged: boolean = kClamped !== this.lastK


    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let ah: f32 = this.ah
    let bh: f32 = this.bh

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let qq: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (kClamped * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio = new Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastK: f32 = Infinity
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastK = src.lastK
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, k: f32, cutoff$: usize, q$: usize, sat$: usize): void {
    const kClamped: f32 = clamp(k, 0, 1)
    const kChanged: boolean = kClamped !== this.lastK


    if (kChanged) {
      const __opt0: f32 = (TWO_PI / 2)
      const __opt1: f32 = (kClamped * __opt0)
      const __opt2: f32 = ((kClamped * __opt0) + 2)
      this.ah = ((__opt1 - 2) / __opt2)
      this.bh = (2 / __opt2)
      this.lastK = kClamped
    }

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32
    let ah: f32 = this.ah
    let bh: f32 = this.bh

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let qq: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (kClamped * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar = new Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sat: f32, cutoff$: usize, q$: usize, k$: usize): void {
    const satClamped: f32 = clamp(sat, 0.1, 10)

    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let qq: f32
    let ah: f32
    let bh: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
        k$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}

export class Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio {
  static readonly defaultInstance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio = new Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio()

  A: f32 = 0
  ah: f32 = 0
  bh: f32 = 0
  a: f32 = 0
  a2: f32 = 0
  b: f32 = 0
  b2: f32 = 0
  c: f32 = 0
  g: f32 = 0
  g0: f32 = 0
  ainv: f32 = 0
  kRes: f32 = 0
  lastNyquist: f32 = Infinity
  z0: f32
  z1: f32
  z2: f32
  z3: f32
  z4: f32

  reset(): void {
    this.copyFrom(Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio.defaultInstance)
  }

  copyFrom(src: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio): void {
    this.A = src.A
    this.ah = src.ah
    this.bh = src.bh
    this.a = src.a
    this.a2 = src.a2
    this.b = src.b
    this.b2 = src.b2
    this.c = src.c
    this.g = src.g
    this.g0 = src.g0
    this.ainv = src.ainv
    this.kRes = src.kRes
    this.lastNyquist = src.lastNyquist
    this.z0 = src.z0
    this.z1 = src.z1
    this.z2 = src.z2
    this.z3 = src.z3
    this.z4 = src.z4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff$: usize, q$: usize, k$: usize, sat$: usize): void {
    const nyquistChanged: boolean = nyquist !== this.lastNyquist


    if (nyquistChanged) {
      this.lastNyquist = nyquist
    }


    let z0: f32 = this.z0
    let z1: f32 = this.z1
    let z2: f32 = this.z2
    let z3: f32 = this.z3
    let z4: f32 = this.z4
    let input: f32
    let output: f32

    let absXIn: f32
    let s: f32
    let s0: f32
    let xIn: f32
    let y0: f32
    let y1: f32
    let y2: f32
    let y3: f32
    let y4: f32
    let y5: f32

    let cutNorm: f32
    let qq: f32
    let ah: f32
    let bh: f32
    let kRes: f32
    let A: f32
    let comp: f32
    let cutComp: f32
    let a: f32
    let ainv: f32
    let a2: f32
    let b: f32
    let b2: f32
    let a2x2: f32
    let c: f32
    let g0: f32
    let g: f32

    let satClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        satClamped = clamp(load<f32>(sat$), 0.1, 10)
        input = load<f32>(input$)
        cutNorm = (clamp(load<f32>(cutoff$), 20, 20000) / nyquist)
        qq = (clamp(load<f32>(q$), 0, 1) * clamp(load<f32>(q$), 0, 1))
        ah = (((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) - 2) / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        bh = (2 / ((clamp(load<f32>(k$), 0, 1) * (TWO_PI / 2)) + 2))
        kRes = (20 * clamp(load<f32>(q$), 0, 1))
        A = (1 + (0.5 * kRes))
        comp = ((1 + (DIODELADDER_Q_COMP * qq)) + (DIODELADDER_K_COMP * (clamp(load<f32>(k$), 0, 1) * clamp(load<f32>(q$), 0, 1))))
        cutComp = max(20, min(((cutNorm / comp) * nyquist), nyquist))
        a = ((TWO_PI / 2) * (cutComp / nyquist))
        a = ((2 * sin((0.5 * a))) / cos((0.5 * a)))
        ainv = (1 / a)
        a2 = (a * a)
        b = ((2 * a) + 1)
        b2 = (b * b)
        a2x2 = ((2 * a2) * a2)
        c = (1 / ((a2x2 - ((4 * a2) * b2)) + (b2 * b2)))
        g0 = (a2x2 * c)
        g = (g0 * bh)
        s0 = ((((((a2 * a) * z0) + ((a2 * b) * z1)) + ((z2 * (b2 - (2 * a2))) * a)) + ((z3 * (b2 - (3 * a2))) * b)) * c)
        s = ((bh * s0) - z4)
        y5 = (((g * input) + s) / (1 + (g * kRes)))
        xIn = (input - (kRes * y5))
        absXIn = (xIn < 0) ? -xIn : xIn
        y0 = (xIn / ((1 / satClamped) + absXIn))
        y5 = ((g * y0) + s)
        y4 = ((g0 * y0) + s0)
        y3 = (((b * y4) - z3) * ainv)
        y2 = ((((b * y3) - (a * y4)) - z2) * ainv)
        y1 = ((((b * y2) - (a * y3)) - z1) * ainv)
        z0 = (z0 + ((4 * a) * ((y0 - y1) + y2)))
        z1 = (z1 + ((2 * a) * ((y1 - (2 * y2)) + y3)))
        z2 = (z2 + ((2 * a) * ((y2 - (2 * y3)) + y4)))
        z3 = (z3 + ((2 * a) * (y3 - (2 * y4))))
        z4 = ((bh * y4) + (ah * y5))
        output = (A * y4)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
        q$ += 4
        k$ += 4
        sat$ += 4
      })
    }

    this.z0 = z0
    this.z1 = z1
    this.z2 = z2
    this.z3 = z3
    this.z4 = z4
  }
}