// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class TestOversample_default_ {
  static readonly defaultInstance: TestOversample_default_ = new TestOversample_default_()

  reset(): void {
    this.copyFrom(TestOversample_default_.defaultInstance)
  }

  copyFrom(src: TestOversample_default_): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize): void {

    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = (sampleRate / 48000)
        store<f32>(output$, output)
        output$ += 4
      })
    }
  }
}

export class TestOversample_default__stereo {
  static readonly defaultInstance: TestOversample_default__stereo = new TestOversample_default__stereo()

  reset(): void {
    this.copyFrom(TestOversample_default__stereo.defaultInstance)
  }

  copyFrom(src: TestOversample_default__stereo): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize): void {

    let outputLeft: f32
    let outputRight: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        outputLeft = (sampleRate / 48000)
        outputRight = (sampleRate / 48000)
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
      })
    }
  }
}