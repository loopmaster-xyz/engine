// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { PitchShiftKernel, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Pitchshift_default_ratio_scalar {
  static readonly defaultInstance: Pitchshift_default_ratio_scalar = new Pitchshift_default_ratio_scalar()

  kernel: PitchShiftKernel = new PitchShiftKernel()

  reset(): void {
    this.copyFrom(Pitchshift_default_ratio_scalar.defaultInstance)
  }

  copyFrom(src: Pitchshift_default_ratio_scalar): void {
    this.kernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio: f32): void {
    const ratioClamped: f32 = clamp(ratio, 0.01, 10)

    let input: f32
    let output: f32
    const kernel: PitchShiftKernel = this.kernel
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = kernel.process(input, ratioClamped)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }
  }
}

export class Pitchshift_default_ratio_audio {
  static readonly defaultInstance: Pitchshift_default_ratio_audio = new Pitchshift_default_ratio_audio()

  kernel: PitchShiftKernel = new PitchShiftKernel()

  reset(): void {
    this.copyFrom(Pitchshift_default_ratio_audio.defaultInstance)
  }

  copyFrom(src: Pitchshift_default_ratio_audio): void {
    this.kernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, ratio$: usize): void {

    let input: f32
    let output: f32
    const kernel: PitchShiftKernel = this.kernel

    let ratioClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        ratioClamped = clamp(load<f32>(ratio$), 0.01, 10)
        input = load<f32>(input$)
        output = kernel.process(input, ratioClamped)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        ratio$ += 4
      })
    }
  }
}