// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Emit_default_value_scalar {
  static readonly defaultInstance: Emit_default_value_scalar = new Emit_default_value_scalar()

  reset(): void {
    this.copyFrom(Emit_default_value_scalar.defaultInstance)
  }

  copyFrom(src: Emit_default_value_scalar): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, value: f32): void {

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
      })
    }
  }
}

export class Emit_default_value_audio {
  static readonly defaultInstance: Emit_default_value_audio = new Emit_default_value_audio()

  reset(): void {
    this.copyFrom(Emit_default_value_audio.defaultInstance)
  }

  copyFrom(src: Emit_default_value_audio): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, value$: usize): void {

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        value$ += 4
      })
    }
  }
}