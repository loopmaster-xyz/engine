// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Sah_default_trig_scalar {
  static readonly defaultInstance: Sah_default_trig_scalar = new Sah_default_trig_scalar()

  lastTrig: f32 = 0
  heldValue: f32 = 0

  reset(): void {
    this.copyFrom(Sah_default_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sah_default_trig_scalar): void {
    this.lastTrig = src.lastTrig
    this.heldValue = src.heldValue
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32): void {

    let lastTrig: f32 = this.lastTrig
    let heldValue: f32 = this.heldValue
    let input: f32
    let output: f32

    let inVal: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        inVal = input
        if (((trig > 0) && (lastTrig <= 0))) {
          heldValue = inVal
        }
        output = heldValue
        lastTrig = trig
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.lastTrig = lastTrig
    this.heldValue = heldValue
  }
}

export class Sah_default_trig_audio {
  static readonly defaultInstance: Sah_default_trig_audio = new Sah_default_trig_audio()

  lastTrig: f32 = 0
  heldValue: f32 = 0

  reset(): void {
    this.copyFrom(Sah_default_trig_audio.defaultInstance)
  }

  copyFrom(src: Sah_default_trig_audio): void {
    this.lastTrig = src.lastTrig
    this.heldValue = src.heldValue
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig$: usize): void {

    let lastTrig: f32 = this.lastTrig
    let heldValue: f32 = this.heldValue
    let input: f32
    let output: f32

    let inVal: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        input = load<f32>(input$)
        inVal = input
        if (((trig > 0) && (lastTrig <= 0))) {
          heldValue = inVal
        }
        output = heldValue
        lastTrig = trig
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        trig$ += 4
      })
    }

    this.lastTrig = lastTrig
    this.heldValue = heldValue
  }
}