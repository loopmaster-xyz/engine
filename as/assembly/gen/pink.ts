// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, clamp11, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, seedToNoiseState, sin, sinNormalized, sqrt, trailingZerosF32, uintIncrementF32, warn, whiteNoiseNextState, whiteNoiseValue } from '../util'

export class Pink_default_seed_scalar_trig_scalar {
  static readonly defaultInstance: Pink_default_seed_scalar_trig_scalar = new Pink_default_seed_scalar_trig_scalar()

  row0: f32 = 0
  row1: f32 = 0
  row2: f32 = 0
  row3: f32 = 0
  row4: f32 = 0
  row5: f32 = 0
  row6: f32 = 0
  row7: f32 = 0
  state: f32 = 0
  counter: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Pink_default_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Pink_default_seed_scalar_trig_scalar): void {
    this.row0 = src.row0
    this.row1 = src.row1
    this.row2 = src.row2
    this.row3 = src.row3
    this.row4 = src.row4
    this.row5 = src.row5
    this.row6 = src.row6
    this.row7 = src.row7
    this.state = src.state
    this.counter = src.counter
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig: f32): void {
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state = seedToNoiseState(seed)
        this.row0 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row1 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row2 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row3 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row4 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row5 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row6 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row7 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.counter = 0
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state = seedToNoiseState(seed)
        this.row0 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row1 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row2 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row3 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row4 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row5 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row6 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row7 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.counter = 0
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let row0: f32 = this.row0
    let row1: f32 = this.row1
    let row2: f32 = this.row2
    let row3: f32 = this.row3
    let row4: f32 = this.row4
    let row5: f32 = this.row5
    let row6: f32 = this.row6
    let row7: f32 = this.row7
    let state: f32 = this.state
    let counter: f32 = this.counter
    let output: f32

    let newR: f32
    let rowIndex: f32
    let sum: f32
    let white: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        counter = uintIncrementF32(counter)
        rowIndex = min(7, trailingZerosF32(counter))
        newR = whiteNoiseValue(state)
        state = whiteNoiseNextState(state)
        row0 = (rowIndex == 0) ? newR : row0
        row1 = (rowIndex == 1) ? newR : row1
        row2 = (rowIndex == 2) ? newR : row2
        row3 = (rowIndex == 3) ? newR : row3
        row4 = (rowIndex == 4) ? newR : row4
        row5 = (rowIndex == 5) ? newR : row5
        row6 = (rowIndex == 6) ? newR : row6
        row7 = (rowIndex == 7) ? newR : row7
        sum = (((((((row0 + row1) + row2) + row3) + row4) + row5) + row6) + row7)
        white = whiteNoiseValue(state)
        state = whiteNoiseNextState(state)
        output = clamp11(((sum + white) * (1 / 9)))
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.row0 = row0
    this.row1 = row1
    this.row2 = row2
    this.row3 = row3
    this.row4 = row4
    this.row5 = row5
    this.row6 = row6
    this.row7 = row7
    this.state = state
    this.counter = counter
  }
}

export class Pink_default_seed_scalar_trig_audio {
  static readonly defaultInstance: Pink_default_seed_scalar_trig_audio = new Pink_default_seed_scalar_trig_audio()

  row0: f32 = 0
  row1: f32 = 0
  row2: f32 = 0
  row3: f32 = 0
  row4: f32 = 0
  row5: f32 = 0
  row6: f32 = 0
  row7: f32 = 0
  state: f32 = 0
  counter: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Pink_default_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Pink_default_seed_scalar_trig_audio): void {
    this.row0 = src.row0
    this.row1 = src.row1
    this.row2 = src.row2
    this.row3 = src.row3
    this.row4 = src.row4
    this.row5 = src.row5
    this.row6 = src.row6
    this.row7 = src.row7
    this.state = src.state
    this.counter = src.counter
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state = seedToNoiseState(seed)
        this.row0 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row1 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row2 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row3 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row4 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row5 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row6 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.row7 = whiteNoiseValue(this.state)
        this.state = whiteNoiseNextState(this.state)
        this.counter = 0
      }
      this.lastSeed = seed
    }

    let row0: f32 = this.row0
    let row1: f32 = this.row1
    let row2: f32 = this.row2
    let row3: f32 = this.row3
    let row4: f32 = this.row4
    let row5: f32 = this.row5
    let row6: f32 = this.row6
    let row7: f32 = this.row7
    let state: f32 = this.state
    let counter: f32 = this.counter
    let output: f32

    let newR: f32
    let rowIndex: f32
    let sum: f32
    let white: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          state = seedToNoiseState(seed)
          row0 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row1 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row2 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row3 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row4 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row5 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row6 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          row7 = whiteNoiseValue(state)
          state = whiteNoiseNextState(state)
          counter = 0
        }
        prevTrig = trig
        counter = uintIncrementF32(counter)
        rowIndex = min(7, trailingZerosF32(counter))
        newR = whiteNoiseValue(state)
        state = whiteNoiseNextState(state)
        row0 = (rowIndex == 0) ? newR : row0
        row1 = (rowIndex == 1) ? newR : row1
        row2 = (rowIndex == 2) ? newR : row2
        row3 = (rowIndex == 3) ? newR : row3
        row4 = (rowIndex == 4) ? newR : row4
        row5 = (rowIndex == 5) ? newR : row5
        row6 = (rowIndex == 6) ? newR : row6
        row7 = (rowIndex == 7) ? newR : row7
        sum = (((((((row0 + row1) + row2) + row3) + row4) + row5) + row6) + row7)
        white = whiteNoiseValue(state)
        state = whiteNoiseNextState(state)
        output = clamp11(((sum + white) * (1 / 9)))
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.row0 = row0
    this.row1 = row1
    this.row2 = row2
    this.row3 = row3
    this.row4 = row4
    this.row5 = row5
    this.row6 = row6
    this.row7 = row7
    this.state = state
    this.counter = counter
    this.prevTrig = prevTrig
  }
}