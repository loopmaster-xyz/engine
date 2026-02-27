// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, exp, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, tanha, warn } from '../util'

export class Moog_lpm_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Moog_lpm_cutoff_scalar_q_scalar = new Moog_lpm_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastSampleRate: f32 = Infinity
  freqClamped: f32
  kfc: f32
  k2vg: f32
  kacr: f32
  postGain: f32
  v2: f32
  outVal: f32
  amf: f32
  azt1: f32
  azt2: f32
  azt3: f32
  azt4: f32

  reset(): void {
    this.copyFrom(Moog_lpm_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Moog_lpm_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastSampleRate = src.lastSampleRate
    this.freqClamped = src.freqClamped
    this.kfc = src.kfc
    this.k2vg = src.k2vg
    this.kacr = src.kacr
    this.postGain = src.postGain
    this.v2 = src.v2
    this.outVal = src.outVal
    this.amf = src.amf
    this.azt1 = src.azt1
    this.azt2 = src.azt2
    this.azt3 = src.azt3
    this.azt4 = src.azt4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 22040)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (cutoffChanged || sampleRateChanged) {
      this.kfc = (this.freqClamped / sampleRate)
      this.lastSampleRate = sampleRate
    }

    if (cutoffChanged) {
      this.freqClamped = max(50, min(cutoffClamped, 22040))
      this.kfc = (this.freqClamped / sampleRate)
      const __opt0: f32 = (this.kfc * this.kfc)
      const kfcr: f32 = ((((1.873 * (__opt0 * this.kfc)) + (0.4955 * __opt0)) - (0.649 * this.kfc)) + 0.9988)
      const x: f32 = ((-TWO_PI * kfcr) * this.kfc)
      const expOut: f32 = exp(x)
      this.k2vg = (3.2 * (1 - expOut))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.postGain = (1.0001784074555027 + (0.9331585678097162 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.kacr = (qClamped * (((-3.9364 * (this.kfc * this.kfc)) + (1.8409 * this.kfc)) + 0.9968))
    }

    this.v2 = 3.2

    let amf: f32 = this.amf
    let azt1: f32 = this.azt1
    let azt2: f32 = this.azt2
    let azt3: f32 = this.azt3
    let azt4: f32 = this.azt4
    let input: f32
    let output: f32
    let k2vg: f32 = this.k2vg
    let kacr: f32 = this.kacr
    let postGain: f32 = this.postGain
    let v2: f32 = this.v2

    let at1: f32
    let at2: f32
    let at3: f32
    let at4: f32
    let az1: f32
    let az2: f32
    let az3: f32
    let az4: f32
    let x1: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        x1 = (input - (amf * kacr))
        az1 = (azt1 + (k2vg * tanha((x1 / v2))))
        at1 = (k2vg * tanha((az1 / v2)))
        azt1 = (az1 - at1)
        az2 = (azt2 + at1)
        at2 = (k2vg * tanha((az2 / v2)))
        azt2 = (az2 - at2)
        az3 = (azt3 + at2)
        at3 = (k2vg * tanha((az3 / v2)))
        azt3 = (az3 - at3)
        az4 = (azt4 + at3)
        at4 = (k2vg * tanha((az4 / v2)))
        azt4 = (az4 - at4)
        amf = az4
        outVal = (amf * postGain)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.amf = amf
    this.azt1 = azt1
    this.azt2 = azt2
    this.azt3 = azt3
    this.azt4 = azt4
  }
}

export class Moog_lpm_cutoff_audio_q_scalar {
  static readonly defaultInstance: Moog_lpm_cutoff_audio_q_scalar = new Moog_lpm_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  postGain: f32
  v2: f32
  amf: f32
  azt1: f32
  azt2: f32
  azt3: f32
  azt4: f32

  reset(): void {
    this.copyFrom(Moog_lpm_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Moog_lpm_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.postGain = src.postGain
    this.v2 = src.v2
    this.amf = src.amf
    this.azt1 = src.azt1
    this.azt2 = src.azt2
    this.azt3 = src.azt3
    this.azt4 = src.azt4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let k2vg: f32 = 0
    let kacr: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.postGain = (1.0001784074555027 + (0.9331585678097162 * qClamped))
      this.lastQ = qClamped
    }

    this.v2 = 3.2

    let amf: f32 = this.amf
    let azt1: f32 = this.azt1
    let azt2: f32 = this.azt2
    let azt3: f32 = this.azt3
    let azt4: f32 = this.azt4
    let input: f32
    let output: f32
    let postGain: f32 = this.postGain
    let v2: f32 = this.v2

    let at1: f32
    let at2: f32
    let at3: f32
    let at4: f32
    let az1: f32
    let az2: f32
    let az3: f32
    let az4: f32
    let x1: f32

    let freqClamped: f32
    let kfc: f32
    let kfcr: f32
    let x: f32
    let expOut: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        freqClamped = max(50, min(clamp(load<f32>(cutoff$), 50, 22040), 22040))
        kfc = (freqClamped / sampleRate)
        kfcr = ((((1.873 * ((kfc * kfc) * kfc)) + (0.4955 * (kfc * kfc))) - (0.649 * kfc)) + 0.9988)
        x = ((-TWO_PI * kfcr) * kfc)
        expOut = exp(x)
        k2vg = (3.2 * (1 - expOut))
        kacr = (qClamped * (((-3.9364 * (kfc * kfc)) + (1.8409 * kfc)) + 0.9968))
        x1 = (input - (amf * kacr))
        az1 = (azt1 + (k2vg * tanha((x1 / v2))))
        at1 = (k2vg * tanha((az1 / v2)))
        azt1 = (az1 - at1)
        az2 = (azt2 + at1)
        at2 = (k2vg * tanha((az2 / v2)))
        azt2 = (az2 - at2)
        az3 = (azt3 + at2)
        at3 = (k2vg * tanha((az3 / v2)))
        azt3 = (az3 - at3)
        az4 = (azt4 + at3)
        at4 = (k2vg * tanha((az4 / v2)))
        azt4 = (az4 - at4)
        amf = az4
        outVal = (amf * postGain)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.amf = amf
    this.azt1 = azt1
    this.azt2 = azt2
    this.azt3 = azt3
    this.azt4 = azt4
  }
}

export class Moog_hpm_cutoff_scalar_q_scalar {
  static readonly defaultInstance: Moog_hpm_cutoff_scalar_q_scalar = new Moog_hpm_cutoff_scalar_q_scalar()

  lastCutoff: f32 = Infinity
  lastQ: f32 = Infinity
  lastSampleRate: f32 = Infinity
  freqClamped: f32
  kfc: f32
  k2vg: f32
  kacr: f32
  postGain: f32
  v2: f32
  outVal: f32
  amf: f32
  azt1: f32
  azt2: f32
  azt3: f32
  azt4: f32

  reset(): void {
    this.copyFrom(Moog_hpm_cutoff_scalar_q_scalar.defaultInstance)
  }

  copyFrom(src: Moog_hpm_cutoff_scalar_q_scalar): void {
    this.lastCutoff = src.lastCutoff
    this.lastQ = src.lastQ
    this.lastSampleRate = src.lastSampleRate
    this.freqClamped = src.freqClamped
    this.kfc = src.kfc
    this.k2vg = src.k2vg
    this.kacr = src.kacr
    this.postGain = src.postGain
    this.v2 = src.v2
    this.outVal = src.outVal
    this.amf = src.amf
    this.azt1 = src.azt1
    this.azt2 = src.azt2
    this.azt3 = src.azt3
    this.azt4 = src.azt4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, cutoff: f32, q: f32): void {
    const cutoffClamped: f32 = clamp(cutoff, 50, 22040)
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const cutoffChanged: boolean = cutoffClamped !== this.lastCutoff
    const qChanged: boolean = qClamped !== this.lastQ
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (cutoffChanged || sampleRateChanged) {
      this.kfc = (this.freqClamped / sampleRate)
      this.lastSampleRate = sampleRate
    }

    if (cutoffChanged) {
      this.freqClamped = max(50, min(cutoffClamped, 22040))
      this.kfc = (this.freqClamped / sampleRate)
      const __opt0: f32 = (this.kfc * this.kfc)
      const kfcr: f32 = ((((1.873 * (__opt0 * this.kfc)) + (0.4955 * __opt0)) - (0.649 * this.kfc)) + 0.9988)
      const x: f32 = ((-TWO_PI * kfcr) * this.kfc)
      const expOut: f32 = exp(x)
      this.k2vg = (3.2 * (1 - expOut))
      this.lastCutoff = cutoffClamped
    }

    if (qChanged) {
      this.postGain = (1.0001784074555027 + (0.9331585678097162 * qClamped))
      this.lastQ = qClamped
    }

    if (cutoffChanged || qChanged) {
      this.kacr = (qClamped * (((-3.9364 * (this.kfc * this.kfc)) + (1.8409 * this.kfc)) + 0.9968))
    }

    this.v2 = 3.2

    let amf: f32 = this.amf
    let azt1: f32 = this.azt1
    let azt2: f32 = this.azt2
    let azt3: f32 = this.azt3
    let azt4: f32 = this.azt4
    let input: f32
    let output: f32
    let k2vg: f32 = this.k2vg
    let kacr: f32 = this.kacr
    let postGain: f32 = this.postGain
    let v2: f32 = this.v2

    let at1: f32
    let at2: f32
    let at3: f32
    let at4: f32
    let az1: f32
    let az2: f32
    let az3: f32
    let az4: f32
    let x1: f32

    let outVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        x1 = (input - (amf * kacr))
        az1 = (azt1 + (k2vg * tanha((x1 / v2))))
        at1 = (k2vg * tanha((az1 / v2)))
        azt1 = (az1 - at1)
        az2 = (azt2 + at1)
        at2 = (k2vg * tanha((az2 / v2)))
        azt2 = (az2 - at2)
        az3 = (azt3 + at2)
        at3 = (k2vg * tanha((az3 / v2)))
        azt3 = (az3 - at3)
        az4 = (azt4 + at3)
        at4 = (k2vg * tanha((az4 / v2)))
        azt4 = (az4 - at4)
        amf = az4
        outVal = (((x1 - (3 * az3)) + (2 * az4)) * postGain)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.amf = amf
    this.azt1 = azt1
    this.azt2 = azt2
    this.azt3 = azt3
    this.azt4 = azt4
  }
}

export class Moog_hpm_cutoff_audio_q_scalar {
  static readonly defaultInstance: Moog_hpm_cutoff_audio_q_scalar = new Moog_hpm_cutoff_audio_q_scalar()

  lastQ: f32 = Infinity
  postGain: f32
  v2: f32
  amf: f32
  azt1: f32
  azt2: f32
  azt3: f32
  azt4: f32

  reset(): void {
    this.copyFrom(Moog_hpm_cutoff_audio_q_scalar.defaultInstance)
  }

  copyFrom(src: Moog_hpm_cutoff_audio_q_scalar): void {
    this.lastQ = src.lastQ
    this.postGain = src.postGain
    this.v2 = src.v2
    this.amf = src.amf
    this.azt1 = src.azt1
    this.azt2 = src.azt2
    this.azt3 = src.azt3
    this.azt4 = src.azt4
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, q: f32, cutoff$: usize): void {
    const qClamped: f32 = clamp(q, 0.01, 0.985)
    const qChanged: boolean = qClamped !== this.lastQ


    let k2vg: f32 = 0
    let kacr: f32 = 0
    let outVal: f32 = 0

    if (qChanged) {
      this.postGain = (1.0001784074555027 + (0.9331585678097162 * qClamped))
      this.lastQ = qClamped
    }

    this.v2 = 3.2

    let amf: f32 = this.amf
    let azt1: f32 = this.azt1
    let azt2: f32 = this.azt2
    let azt3: f32 = this.azt3
    let azt4: f32 = this.azt4
    let input: f32
    let output: f32
    let postGain: f32 = this.postGain
    let v2: f32 = this.v2

    let at1: f32
    let at2: f32
    let at3: f32
    let at4: f32
    let az1: f32
    let az2: f32
    let az3: f32
    let az4: f32
    let x1: f32

    let freqClamped: f32
    let kfc: f32
    let kfcr: f32
    let x: f32
    let expOut: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        freqClamped = max(50, min(clamp(load<f32>(cutoff$), 50, 22040), 22040))
        kfc = (freqClamped / sampleRate)
        kfcr = ((((1.873 * ((kfc * kfc) * kfc)) + (0.4955 * (kfc * kfc))) - (0.649 * kfc)) + 0.9988)
        x = ((-TWO_PI * kfcr) * kfc)
        expOut = exp(x)
        k2vg = (3.2 * (1 - expOut))
        kacr = (qClamped * (((-3.9364 * (kfc * kfc)) + (1.8409 * kfc)) + 0.9968))
        x1 = (input - (amf * kacr))
        az1 = (azt1 + (k2vg * tanha((x1 / v2))))
        at1 = (k2vg * tanha((az1 / v2)))
        azt1 = (az1 - at1)
        az2 = (azt2 + at1)
        at2 = (k2vg * tanha((az2 / v2)))
        azt2 = (az2 - at2)
        az3 = (azt3 + at2)
        at3 = (k2vg * tanha((az3 / v2)))
        azt3 = (az3 - at3)
        az4 = (azt4 + at3)
        at4 = (k2vg * tanha((az4 / v2)))
        azt4 = (az4 - at4)
        amf = az4
        outVal = (((x1 - (3 * az3)) + (2 * az4)) * postGain)
        output = outVal
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        cutoff$ += 4
      })
    }

    this.amf = amf
    this.azt1 = azt1
    this.azt2 = azt2
    this.azt3 = azt3
    this.azt4 = azt4
  }
}