// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { CompressorKernel, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio: f32, knee: f32, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio: f32, knee: f32, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio: f32, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio: f32, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, knee: f32, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, knee: f32, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold: f32, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, ratio: f32, knee: f32, threshold$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, ratio: f32, knee: f32, threshold$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, ratio: f32, threshold$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, ratio: f32, threshold$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, knee: f32, threshold$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, knee: f32, threshold$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, ratio: f32, knee: f32, release$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, ratio: f32, knee: f32, release$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, ratio: f32, release$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, ratio: f32, release$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, knee: f32, release$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, knee: f32, release$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, release$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, threshold: f32, release$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, ratio: f32, knee: f32, release$: usize, threshold$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, ratio: f32, knee: f32, release$: usize, threshold$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, ratio: f32, release$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, ratio: f32, release$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, knee: f32, release$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, knee: f32, release$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 1)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, ratio: f32, knee: f32, attack$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, ratio: f32, knee: f32, attack$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, ratio: f32, attack$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, ratio: f32, attack$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, knee: f32, attack$: usize, ratio$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, knee: f32, attack$: usize, ratio$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, attack$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, threshold: f32, attack$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, ratio: f32, knee: f32, attack$: usize, threshold$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, ratio: f32, knee: f32, attack$: usize, threshold$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, ratio: f32, attack$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, ratio: f32, attack$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, knee: f32, attack$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, knee: f32, attack$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, attack$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, attack$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 5)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, ratio: f32, knee: f32, attack$: usize, release$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, ratio: f32, knee: f32, attack$: usize, release$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, ratio: f32, attack$: usize, release$: usize, knee$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, ratio: f32, attack$: usize, release$: usize, knee$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, knee: f32, attack$: usize, release$: usize, ratio$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, knee: f32, attack$: usize, release$: usize, ratio$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, attack$: usize, release$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, threshold: f32, attack$: usize, release$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, -80, 0)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio: f32, knee: f32, attack$: usize, release$: usize, threshold$: usize, key$: usize): void {
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio: f32, knee: f32, attack$: usize, release$: usize, threshold$: usize, key$: usize): void {
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio: f32, attack$: usize, release$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio: f32, attack$: usize, release$: usize, threshold$: usize, knee$: usize, key$: usize): void {
    const ratioClamped: f32 = clamp(ratio, 1, 20)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, knee: f32, attack$: usize, release$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, knee: f32, attack$: usize, release$: usize, threshold$: usize, ratio$: usize, key$: usize): void {
    const kneeClamped: f32 = clamp(knee, 0, 40)
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack$: usize, release$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }

    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}

export class Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio {
  static readonly defaultInstance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio()

  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0
  gainReduction: f32 = 0
  prevSampleRate: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio.defaultInstance)
  }

  copyFrom(src: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio): void {
    this.compressorKernel.reset()
    this.inputLevel = src.inputLevel
    this.gainReduction = src.gainReduction
    this.prevSampleRate = src.prevSampleRate
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack$: usize, release$: usize, threshold$: usize, ratio$: usize, knee$: usize, key$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      if (sampleRate) {
        this.compressorKernel.setSampleRate(sampleRate)
      }
      this.lastSampleRate = sampleRate
    }


    let inputLevel: f32 = this.inputLevel
    let gainReduction: f32 = this.gainReduction
    let input: f32
    let output: f32
    const compressorKernel: CompressorKernel = this.compressorKernel

    let attackClamped: f32
    let key: f32
    let kneeClamped: f32
    let ratioClamped: f32
    let releaseClamped: f32
    let thresholdClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = clamp(load<f32>(attack$), 0.0001, 1)
        key = load<f32>(key$)
        kneeClamped = clamp(load<f32>(knee$), 0, 40)
        ratioClamped = clamp(load<f32>(ratio$), 1, 20)
        releaseClamped = clamp(load<f32>(release$), 0.0001, 5)
        thresholdClamped = clamp(load<f32>(threshold$), -80, 0)
        input = load<f32>(input$)
        output = compressorKernel.process(input, key, attackClamped, releaseClamped, thresholdClamped, ratioClamped, kneeClamped)
        inputLevel = compressorKernel.inputLevel
        gainReduction = compressorKernel.gainReduction
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
        threshold$ += 4
        ratio$ += 4
        knee$ += 4
        key$ += 4
      })
    }

    this.inputLevel = inputLevel
    this.gainReduction = gainReduction
  }
}