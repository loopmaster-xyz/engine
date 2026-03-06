// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Acc_default_trig_scalar_amount_scalar {
  static readonly defaultInstance: Acc_default_trig_scalar_amount_scalar = new Acc_default_trig_scalar_amount_scalar()

  value: f32 = 0
  lastTrig: f32 = Infinity
  prevTrig: f32

  reset(): void {
    this.copyFrom(Acc_default_trig_scalar_amount_scalar.defaultInstance)
  }

  copyFrom(src: Acc_default_trig_scalar_amount_scalar): void {
    this.value = src.value
    this.lastTrig = src.lastTrig
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, amount: f32): void {
    const trigChanged: boolean = trig !== this.lastTrig


    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.value = floor((this.value + amount))
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let output: f32
    let value: f32 = this.value
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = value
        store<f32>(output$, output)
        output$ += 4
      })
    }
  }
}

export class Acc_default_trig_audio_amount_scalar {
  static readonly defaultInstance: Acc_default_trig_audio_amount_scalar = new Acc_default_trig_audio_amount_scalar()

  value: f32 = 0
  prevTrig: f32

  reset(): void {
    this.copyFrom(Acc_default_trig_audio_amount_scalar.defaultInstance)
  }

  copyFrom(src: Acc_default_trig_audio_amount_scalar): void {
    this.value = src.value
    this.prevTrig = src.prevTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, amount: f32, trig$: usize): void {

    let output: f32
    let value: f32 = this.value

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          value = floor((value + amount))
        }
        prevTrig = trig
        output = value
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
  }
}