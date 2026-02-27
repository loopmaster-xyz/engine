// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sahValue, sin, sinNormalized, sqrt, warn } from '../util'

export class Random_default_seed_scalar {
  static readonly defaultInstance: Random_default_seed_scalar = new Random_default_seed_scalar()

  prevSeed: f32 =-1
  counter: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Random_default_seed_scalar.defaultInstance)
  }

  copyFrom(src: Random_default_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.counter = src.counter
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.counter = 0
      }
      this.lastSeed = seed
    }

    let counter: f32 = this.counter
    let output: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        output = sahValue(seed, counter)
        counter = (counter + 1)
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.counter = counter
  }
}