// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Analyser_default_ {
  static readonly defaultInstance: Analyser_default_ = new Analyser_default_()

  reset(): void {
    this.copyFrom(Analyser_default_.defaultInstance)
  }

  copyFrom(src: Analyser_default_): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize): void {

    let input: f32
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = input
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }
  }
}