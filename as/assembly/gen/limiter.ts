// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, abs, applyCurve, clamp, cos, cosNormalized, exp, floor, fract01, log, log10, max, min, polyBlep, pow, sign, sin, sinNormalized, sqrt, warn } from '../util'

export class Limiter_default_threshold_scalar_release_scalar {
  static readonly defaultInstance: Limiter_default_threshold_scalar_release_scalar = new Limiter_default_threshold_scalar_release_scalar()

  currentGain: f32 = 1
  lastThreshold: f32 = Infinity
  lastRelease: f32 = Infinity
  lastSampleRate: f32 = Infinity
  rel: f32
  releaseCoeff: f32
  thresholdLinear: f32

  reset(): void {
    this.copyFrom(Limiter_default_threshold_scalar_release_scalar.defaultInstance)
  }

  copyFrom(src: Limiter_default_threshold_scalar_release_scalar): void {
    this.currentGain = src.currentGain
    this.lastThreshold = src.lastThreshold
    this.lastRelease = src.lastRelease
    this.lastSampleRate = src.lastSampleRate
    this.rel = src.rel
    this.releaseCoeff = src.releaseCoeff
    this.thresholdLinear = src.thresholdLinear
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, release: f32): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdChanged: boolean = thresholdClamped !== this.lastThreshold
    const releaseChanged: boolean = releaseClamped !== this.lastRelease
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (thresholdChanged) {
      const th: f32 = max(-80, min(thresholdClamped, 0))
      this.thresholdLinear = pow(10, (th / 20))
      this.lastThreshold = thresholdClamped
    }

    if (releaseChanged) {
      this.rel = max(0.0001, min(releaseClamped, 5))
      this.lastRelease = releaseClamped
    }

    if (releaseChanged || sampleRateChanged) {
      this.releaseCoeff = exp((-3 / (this.rel * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    let currentGain: f32 = this.currentGain
    let input: f32
    let output: f32
    let releaseCoeff: f32 = this.releaseCoeff
    let thresholdLinear: f32 = this.thresholdLinear

    let inputLevel: f32
    let outSample: f32
    let targetGain: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        inputLevel = abs(input)
        targetGain = (inputLevel > thresholdLinear) ? (thresholdLinear / inputLevel) : 1
        if ((currentGain > targetGain)) {
          currentGain = (targetGain + ((currentGain - targetGain) * releaseCoeff))
        } else {
          currentGain = targetGain
        }
        currentGain = max(0, min(1, currentGain))
        outSample = (input * currentGain)
        if ((abs(outSample) > thresholdLinear)) {
          outSample = (thresholdLinear * sign(outSample))
          currentGain = targetGain
        }
        output = outSample
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.currentGain = currentGain
  }
}

export class Limiter_default_threshold_scalar_release_audio {
  static readonly defaultInstance: Limiter_default_threshold_scalar_release_audio = new Limiter_default_threshold_scalar_release_audio()

  currentGain: f32 = 1
  lastThreshold: f32 = Infinity
  thresholdLinear: f32

  reset(): void {
    this.copyFrom(Limiter_default_threshold_scalar_release_audio.defaultInstance)
  }

  copyFrom(src: Limiter_default_threshold_scalar_release_audio): void {
    this.currentGain = src.currentGain
    this.lastThreshold = src.lastThreshold
    this.thresholdLinear = src.thresholdLinear
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, release$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const thresholdChanged: boolean = thresholdClamped !== this.lastThreshold


    let releaseCoeff: f32 = 0

    if (thresholdChanged) {
      const th: f32 = max(-80, min(thresholdClamped, 0))
      this.thresholdLinear = pow(10, (th / 20))
      this.lastThreshold = thresholdClamped
    }

    let currentGain: f32 = this.currentGain
    let input: f32
    let output: f32
    let thresholdLinear: f32 = this.thresholdLinear

    let inputLevel: f32
    let outSample: f32
    let targetGain: f32

    let rel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        rel = max(0.0001, min(clamp(load<f32>(release$), 0.0001, 5), 5))
        releaseCoeff = exp((-3 / (rel * sampleRate)))
        inputLevel = abs(input)
        targetGain = (inputLevel > thresholdLinear) ? (thresholdLinear / inputLevel) : 1
        if ((currentGain > targetGain)) {
          currentGain = (targetGain + ((currentGain - targetGain) * releaseCoeff))
        } else {
          currentGain = targetGain
        }
        currentGain = max(0, min(1, currentGain))
        outSample = (input * currentGain)
        if ((abs(outSample) > thresholdLinear)) {
          outSample = (thresholdLinear * sign(outSample))
          currentGain = targetGain
        }
        output = outSample
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
      })
    }

    this.currentGain = currentGain
  }
}

export class Limiter_default_threshold_audio_release_scalar {
  static readonly defaultInstance: Limiter_default_threshold_audio_release_scalar = new Limiter_default_threshold_audio_release_scalar()

  currentGain: f32 = 1
  lastRelease: f32 = Infinity
  lastSampleRate: f32 = Infinity
  rel: f32
  releaseCoeff: f32

  reset(): void {
    this.copyFrom(Limiter_default_threshold_audio_release_scalar.defaultInstance)
  }

  copyFrom(src: Limiter_default_threshold_audio_release_scalar): void {
    this.currentGain = src.currentGain
    this.lastRelease = src.lastRelease
    this.lastSampleRate = src.lastSampleRate
    this.rel = src.rel
    this.releaseCoeff = src.releaseCoeff
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const releaseChanged: boolean = releaseClamped !== this.lastRelease
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let thresholdLinear: f32 = 0

    if (releaseChanged) {
      this.rel = max(0.0001, min(releaseClamped, 5))
      this.lastRelease = releaseClamped
    }

    if (releaseChanged || sampleRateChanged) {
      this.releaseCoeff = exp((-3 / (this.rel * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    let currentGain: f32 = this.currentGain
    let input: f32
    let output: f32
    let releaseCoeff: f32 = this.releaseCoeff

    let inputLevel: f32
    let outSample: f32
    let targetGain: f32

    let th: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        th = max(-80, min(clamp(load<f32>(threshold$), -80, 0), 0))
        thresholdLinear = pow(10, (th / 20))
        inputLevel = abs(input)
        targetGain = (inputLevel > thresholdLinear) ? (thresholdLinear / inputLevel) : 1
        if ((currentGain > targetGain)) {
          currentGain = (targetGain + ((currentGain - targetGain) * releaseCoeff))
        } else {
          currentGain = targetGain
        }
        currentGain = max(0, min(1, currentGain))
        outSample = (input * currentGain)
        if ((abs(outSample) > thresholdLinear)) {
          outSample = (thresholdLinear * sign(outSample))
          currentGain = targetGain
        }
        output = outSample
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
      })
    }

    this.currentGain = currentGain
  }
}

export class Limiter_default_threshold_audio_release_audio {
  static readonly defaultInstance: Limiter_default_threshold_audio_release_audio = new Limiter_default_threshold_audio_release_audio()

  currentGain: f32 = 1
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Limiter_default_threshold_audio_release_audio.defaultInstance)
  }

  copyFrom(src: Limiter_default_threshold_audio_release_audio): void {
    this.currentGain = src.currentGain
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold$: usize, release$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let releaseCoeff: f32 = 0
    let thresholdLinear: f32 = 0

    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let currentGain: f32 = this.currentGain
    let input: f32
    let output: f32

    let inputLevel: f32
    let outSample: f32
    let targetGain: f32

    let th: f32
    let rel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        th = max(-80, min(clamp(load<f32>(threshold$), -80, 0), 0))
        rel = max(0.0001, min(clamp(load<f32>(release$), 0.0001, 5), 5))
        releaseCoeff = exp((-3 / (rel * sampleRate)))
        thresholdLinear = pow(10, (th / 20))
        inputLevel = abs(input)
        targetGain = (inputLevel > thresholdLinear) ? (thresholdLinear / inputLevel) : 1
        if ((currentGain > targetGain)) {
          currentGain = (targetGain + ((currentGain - targetGain) * releaseCoeff))
        } else {
          currentGain = targetGain
        }
        currentGain = max(0, min(1, currentGain))
        outSample = (input * currentGain)
        if ((abs(outSample) > thresholdLinear)) {
          outSample = (thresholdLinear * sign(outSample))
          currentGain = targetGain
        }
        output = outSample
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        release$ += 4
      })
    }

    this.currentGain = currentGain
  }
}