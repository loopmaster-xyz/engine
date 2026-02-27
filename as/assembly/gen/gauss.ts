// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, gaussNoiseNextState, gaussNoiseValue, log, max, min, polyBlep, pow, seedToNoiseState, sin, sinNormalized, sqrt, warn } from '../util'

export class Gauss_default_seed_scalar_trig_scalar {
  static readonly defaultInstance: Gauss_default_seed_scalar_trig_scalar = new Gauss_default_seed_scalar_trig_scalar()

  state: f32 = 0
  prevTrig: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Gauss_default_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Gauss_default_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig: f32): void {
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      this.state = seedToNoiseState(seed)
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let state: f32 = this.state
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = gaussNoiseValue(state)
        state = gaussNoiseNextState(state)
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.state = state
  }
}

export class Gauss_default_seed_scalar_trig_audio {
  static readonly defaultInstance: Gauss_default_seed_scalar_trig_audio = new Gauss_default_seed_scalar_trig_audio()

  state: f32 = 0
  prevTrig: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Gauss_default_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Gauss_default_seed_scalar_trig_audio): void {
    this.state = src.state
    this.prevTrig = src.prevTrig
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      this.state = seedToNoiseState(seed)
      this.lastSeed = seed
    }

    let state: f32 = this.state
    let output: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
        }
        prevTrig = trig
        output = gaussNoiseValue(state)
        state = gaussNoiseNextState(state)
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.state = state
    this.prevTrig = prevTrig
  }
}