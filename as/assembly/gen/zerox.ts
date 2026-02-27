// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Zerox_default_ {
  static readonly defaultInstance: Zerox_default_ = new Zerox_default_()

  lastInput: f32 = 0

  reset(): void {
    this.copyFrom(Zerox_default_.defaultInstance)
  }

  copyFrom(src: Zerox_default_): void {
    this.lastInput = src.lastInput
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize): void {

    let lastInput: f32 = this.lastInput
    let input: f32
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = ((lastInput <= 0) && (input > 0)) ? 1 : 0
        lastInput = input
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.lastInput = lastInput
  }
}