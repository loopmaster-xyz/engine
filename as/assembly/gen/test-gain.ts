// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class TestGain_default_amount_scalar {
  static readonly defaultInstance: TestGain_default_amount_scalar = new TestGain_default_amount_scalar()

  reset(): void {
    this.copyFrom(TestGain_default_amount_scalar.defaultInstance)
  }

  copyFrom(src: TestGain_default_amount_scalar): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, amount: f32): void {
    const amountClamped: f32 = clamp(amount, 0, 2)

    let input: f32
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        output = (input * amountClamped)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }
  }
}

export class TestGain_default_amount_audio {
  static readonly defaultInstance: TestGain_default_amount_audio = new TestGain_default_amount_audio()

  reset(): void {
    this.copyFrom(TestGain_default_amount_audio.defaultInstance)
  }

  copyFrom(src: TestGain_default_amount_audio): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, amount$: usize): void {

    let input: f32
    let output: f32

    let amountClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        amountClamped = clamp(load<f32>(amount$), 0, 2)
        input = load<f32>(input$)
        output = (input * amountClamped)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        amount$ += 4
      })
    }
  }
}

export class TestGain_default_amount_scalar_stereo {
  static readonly defaultInstance: TestGain_default_amount_scalar_stereo = new TestGain_default_amount_scalar_stereo()

  reset(): void {
    this.copyFrom(TestGain_default_amount_scalar_stereo.defaultInstance)
  }

  copyFrom(src: TestGain_default_amount_scalar_stereo): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, amount: f32): void {
    const amountClamped: f32 = clamp(amount, 0, 2)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        outputLeft = (inputLeft * amountClamped)
        outputRight = (inputRight * amountClamped)
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
      })
    }
  }
}

export class TestGain_default_amount_audio_stereo {
  static readonly defaultInstance: TestGain_default_amount_audio_stereo = new TestGain_default_amount_audio_stereo()

  reset(): void {
    this.copyFrom(TestGain_default_amount_audio_stereo.defaultInstance)
  }

  copyFrom(src: TestGain_default_amount_audio_stereo): void {
    // No fields to copy
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, amount$: usize): void {

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32

    let amountClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        amountClamped = clamp(load<f32>(amount$), 0, 2)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        outputLeft = (inputLeft * amountClamped)
        outputRight = (inputRight * amountClamped)
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        amount$ += 4
      })
    }
  }
}