// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Dc_default_ {
  static readonly defaultInstance: Dc_default_ = new Dc_default_()

  x1: f32 = 0
  y1: f32 = 0
  lastSampleRate: f32 = Infinity
  coeff: f32

  reset(): void {
    this.copyFrom(Dc_default_.defaultInstance)
  }

  copyFrom(src: Dc_default_): void {
    this.x1 = src.x1
    this.y1 = src.y1
    this.lastSampleRate = src.lastSampleRate
    this.coeff = src.coeff
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (sampleRateChanged) {
      this.coeff = (1 - ((TWO_PI * 8) / sampleRate))
      this.lastSampleRate = sampleRate
    }


    let x1: f32 = this.x1
    let y1: f32 = this.y1
    let input: f32
    let output: f32
    let coeff: f32 = this.coeff

    let y: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        y = ((input - x1) + (coeff * y1))
        x1 = input
        y1 = y
        output = (y * 0.9996)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.x1 = x1
    this.y1 = y1
  }
}