// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, clamp01, cos, cosNormalized, fadeWithCurve, floor, fract01, log, max, min, polyBlep, pow, seedForOctave, sin, sinNormalized, sqrt, uniform01NextState, uniform01Value, warn } from '../util'

export class Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar = new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, octaves: f32, gain: f32, trig: f32): void {
    const rateClamped: f32 = max(rate, 0)
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio = new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, octaves: f32, gain: f32, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar = new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, octaves: f32, trig: f32, gain$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let gainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        gain$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio = new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, octaves: f32, gain$: usize, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let gainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        gain$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar = new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, gain: f32, trig: f32, octaves$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let octavesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        octaves$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio = new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, gain: f32, octaves$: usize, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let octavesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        octaves$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar = new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, trig: f32, octaves$: usize, gain$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let gainClamped: f32
    let octavesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        octaves$ += 4
        gain$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio = new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate: f32, octaves$: usize, gain$: usize, trig$: usize): void {
    const rateClamped: f32 = max(rate, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let gainClamped: f32
    let octavesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        octaves$ += 4
        gain$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar = new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, octaves: f32, gain: f32, trig: f32, rate$: usize): void {
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        rateClamped = max(load<f32>(rate$), 0)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio = new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, octaves: f32, gain: f32, rate$: usize, trig$: usize): void {
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar = new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, octaves: f32, trig: f32, rate$: usize, gain$: usize): void {
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let gainClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        rateClamped = max(load<f32>(rate$), 0)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        gain$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio = new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, octaves: f32, rate$: usize, gain$: usize, trig$: usize): void {
    const octavesClamped: f32 = clamp(octaves, 1, 16)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let gainClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        gain$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar = new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, gain: f32, trig: f32, rate$: usize, octaves$: usize): void {
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let octavesClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        rateClamped = max(load<f32>(rate$), 0)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        octaves$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio = new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, gain: f32, rate$: usize, octaves$: usize, trig$: usize): void {
    const gainClamped: f32 = clamp(gain, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let octavesClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        octaves$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar = new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity
  lastTrig: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
    this.lastTrig = src.lastTrig
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig: f32, rate$: usize, octaves$: usize, gain$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed
    const trigChanged: boolean = trig !== this.lastTrig


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    if (trigChanged) {
      if (((trig > 0) && (this.prevTrig <= 0))) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.prevTrig = trig
      this.lastTrig = trig
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let gainClamped: f32
    let octavesClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        rateClamped = max(load<f32>(rate$), 0)
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        octaves$ += 4
        gain$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
  }
}

export class Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio {
  static readonly defaultInstance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio = new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio()

  phase0: f32 = 0
  a0: f32 = 0
  b0: f32 = 0
  state0: f32 = 0
  phase1: f32 = 0
  a1: f32 = 0
  b1: f32 = 0
  state1: f32 = 0
  phase2: f32 = 0
  a2: f32 = 0
  b2: f32 = 0
  state2: f32 = 0
  phase3: f32 = 0
  a3: f32 = 0
  b3: f32 = 0
  state3: f32 = 0
  phase4: f32 = 0
  a4: f32 = 0
  b4: f32 = 0
  state4: f32 = 0
  phase5: f32 = 0
  a5: f32 = 0
  b5: f32 = 0
  state5: f32 = 0
  phase6: f32 = 0
  a6: f32 = 0
  b6: f32 = 0
  state6: f32 = 0
  phase7: f32 = 0
  a7: f32 = 0
  b7: f32 = 0
  state7: f32 = 0
  prevTrig: f32 = 0
  prevSeed: f32 =-1
  phase: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio): void {
    this.phase0 = src.phase0
    this.a0 = src.a0
    this.b0 = src.b0
    this.state0 = src.state0
    this.phase1 = src.phase1
    this.a1 = src.a1
    this.b1 = src.b1
    this.state1 = src.state1
    this.phase2 = src.phase2
    this.a2 = src.a2
    this.b2 = src.b2
    this.state2 = src.state2
    this.phase3 = src.phase3
    this.a3 = src.a3
    this.b3 = src.b3
    this.state3 = src.state3
    this.phase4 = src.phase4
    this.a4 = src.a4
    this.b4 = src.b4
    this.state4 = src.state4
    this.phase5 = src.phase5
    this.a5 = src.a5
    this.b5 = src.b5
    this.state5 = src.state5
    this.phase6 = src.phase6
    this.a6 = src.a6
    this.b6 = src.b6
    this.state6 = src.state6
    this.phase7 = src.phase7
    this.a7 = src.a7
    this.b7 = src.b7
    this.state7 = src.state7
    this.prevTrig = src.prevTrig
    this.prevSeed = src.prevSeed
    this.phase = src.phase
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, rate$: usize, octaves$: usize, gain$: usize, trig$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((this.prevSeed != seed)) {
        this.state0 = seedForOctave(seed, 0)
        this.phase0 = 0
        this.a0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.b0 = uniform01Value(this.state0)
        this.state0 = uniform01NextState(this.state0)
        this.state1 = seedForOctave(seed, 1)
        this.phase1 = 0
        this.a1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.b1 = uniform01Value(this.state1)
        this.state1 = uniform01NextState(this.state1)
        this.state2 = seedForOctave(seed, 2)
        this.phase2 = 0
        this.a2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.b2 = uniform01Value(this.state2)
        this.state2 = uniform01NextState(this.state2)
        this.state3 = seedForOctave(seed, 3)
        this.phase3 = 0
        this.a3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.b3 = uniform01Value(this.state3)
        this.state3 = uniform01NextState(this.state3)
        this.state4 = seedForOctave(seed, 4)
        this.phase4 = 0
        this.a4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.b4 = uniform01Value(this.state4)
        this.state4 = uniform01NextState(this.state4)
        this.state5 = seedForOctave(seed, 5)
        this.phase5 = 0
        this.a5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.b5 = uniform01Value(this.state5)
        this.state5 = uniform01NextState(this.state5)
        this.state6 = seedForOctave(seed, 6)
        this.phase6 = 0
        this.a6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.b6 = uniform01Value(this.state6)
        this.state6 = uniform01NextState(this.state6)
        this.state7 = seedForOctave(seed, 7)
        this.phase7 = 0
        this.a7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
        this.b7 = uniform01Value(this.state7)
        this.state7 = uniform01NextState(this.state7)
      }
      this.lastSeed = seed
    }

    let phase0: f32 = this.phase0
    let a0: f32 = this.a0
    let b0: f32 = this.b0
    let state0: f32 = this.state0
    let phase1: f32 = this.phase1
    let a1: f32 = this.a1
    let b1: f32 = this.b1
    let state1: f32 = this.state1
    let phase2: f32 = this.phase2
    let a2: f32 = this.a2
    let b2: f32 = this.b2
    let state2: f32 = this.state2
    let phase3: f32 = this.phase3
    let a3: f32 = this.a3
    let b3: f32 = this.b3
    let state3: f32 = this.state3
    let phase4: f32 = this.phase4
    let a4: f32 = this.a4
    let b4: f32 = this.b4
    let state4: f32 = this.state4
    let phase5: f32 = this.phase5
    let a5: f32 = this.a5
    let b5: f32 = this.b5
    let state5: f32 = this.state5
    let phase6: f32 = this.phase6
    let a6: f32 = this.a6
    let b6: f32 = this.b6
    let state6: f32 = this.state6
    let phase7: f32 = this.phase7
    let a7: f32 = this.a7
    let b7: f32 = this.b7
    let state7: f32 = this.state7
    let phase: f32 = this.phase
    let output: f32

    let amp: f32
    let freq: f32
    let inc: f32
    let norm: f32
    let oct: f32
    let sum: f32
    let v0: f32
    let v1: f32
    let v2: f32
    let v3: f32
    let v4: f32
    let v5: f32
    let v6: f32
    let v7: f32

    let trig: f32

    let prevTrig: f32 = this.prevTrig

    let gainClamped: f32
    let octavesClamped: f32
    let rateClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        gainClamped = clamp(load<f32>(gain$), 0, 1)
        octavesClamped = clamp(load<f32>(octaves$), 1, 16)
        rateClamped = max(load<f32>(rate$), 0)
        if (((trig > 0) && (prevTrig <= 0))) {
          state0 = seedForOctave(seed, 0)
          phase0 = 0
          a0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
          state1 = seedForOctave(seed, 1)
          phase1 = 0
          a1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
          state2 = seedForOctave(seed, 2)
          phase2 = 0
          a2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
          state3 = seedForOctave(seed, 3)
          phase3 = 0
          a3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
          state4 = seedForOctave(seed, 4)
          phase4 = 0
          a4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
          state5 = seedForOctave(seed, 5)
          phase5 = 0
          a5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
          state6 = seedForOctave(seed, 6)
          phase6 = 0
          a6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
          state7 = seedForOctave(seed, 7)
          phase7 = 0
          a7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        prevTrig = trig
        oct = floor(octavesClamped)
        inc = (rateClamped / sampleRate)
        sum = 0
        norm = 0
        v0 = (a0 + ((b0 - a0) * fadeWithCurve(phase0, 1)))
        sum = (sum + (oct > 0) ? v0 : 0)
        norm = (norm + (oct > 0) ? 1 : 0)
        phase0 = (phase0 + inc)
        if ((phase0 >= 1)) {
          phase0 = fract01(phase0)
          a0 = b0
          b0 = uniform01Value(state0)
          state0 = uniform01NextState(state0)
        }
        amp = gainClamped
        freq = (rateClamped * 2)
        v1 = (a1 + ((b1 - a1) * fadeWithCurve(phase1, 1)))
        sum = (sum + (oct > 1) ? (amp * v1) : 0)
        norm = (norm + (oct > 1) ? amp : 0)
        phase1 = (phase1 + (freq / sampleRate))
        if ((phase1 >= 1)) {
          phase1 = fract01(phase1)
          a1 = b1
          b1 = uniform01Value(state1)
          state1 = uniform01NextState(state1)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v2 = (a2 + ((b2 - a2) * fadeWithCurve(phase2, 1)))
        sum = (sum + (oct > 2) ? (amp * v2) : 0)
        norm = (norm + (oct > 2) ? amp : 0)
        phase2 = (phase2 + (freq / sampleRate))
        if ((phase2 >= 1)) {
          phase2 = fract01(phase2)
          a2 = b2
          b2 = uniform01Value(state2)
          state2 = uniform01NextState(state2)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v3 = (a3 + ((b3 - a3) * fadeWithCurve(phase3, 1)))
        sum = (sum + (oct > 3) ? (amp * v3) : 0)
        norm = (norm + (oct > 3) ? amp : 0)
        phase3 = (phase3 + (freq / sampleRate))
        if ((phase3 >= 1)) {
          phase3 = fract01(phase3)
          a3 = b3
          b3 = uniform01Value(state3)
          state3 = uniform01NextState(state3)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v4 = (a4 + ((b4 - a4) * fadeWithCurve(phase4, 1)))
        sum = (sum + (oct > 4) ? (amp * v4) : 0)
        norm = (norm + (oct > 4) ? amp : 0)
        phase4 = (phase4 + (freq / sampleRate))
        if ((phase4 >= 1)) {
          phase4 = fract01(phase4)
          a4 = b4
          b4 = uniform01Value(state4)
          state4 = uniform01NextState(state4)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v5 = (a5 + ((b5 - a5) * fadeWithCurve(phase5, 1)))
        sum = (sum + (oct > 5) ? (amp * v5) : 0)
        norm = (norm + (oct > 5) ? amp : 0)
        phase5 = (phase5 + (freq / sampleRate))
        if ((phase5 >= 1)) {
          phase5 = fract01(phase5)
          a5 = b5
          b5 = uniform01Value(state5)
          state5 = uniform01NextState(state5)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v6 = (a6 + ((b6 - a6) * fadeWithCurve(phase6, 1)))
        sum = (sum + (oct > 6) ? (amp * v6) : 0)
        norm = (norm + (oct > 6) ? amp : 0)
        phase6 = (phase6 + (freq / sampleRate))
        if ((phase6 >= 1)) {
          phase6 = fract01(phase6)
          a6 = b6
          b6 = uniform01Value(state6)
          state6 = uniform01NextState(state6)
        }
        amp = (amp * gainClamped)
        freq = (freq * 2)
        v7 = (a7 + ((b7 - a7) * fadeWithCurve(phase7, 1)))
        sum = (sum + (oct > 7) ? (amp * v7) : 0)
        norm = (norm + (oct > 7) ? amp : 0)
        phase7 = (phase7 + (freq / sampleRate))
        if ((phase7 >= 1)) {
          phase7 = fract01(phase7)
          a7 = b7
          b7 = uniform01Value(state7)
          state7 = uniform01NextState(state7)
        }
        phase = (norm > 0) ? clamp01((sum / norm)) : 0
        output = phase
        store<f32>(output$, output)
        output$ += 4
        rate$ += 4
        octaves$ += 4
        gain$ += 4
        trig$ += 4
      })
    }

    this.phase0 = phase0
    this.a0 = a0
    this.b0 = b0
    this.state0 = state0
    this.phase1 = phase1
    this.a1 = a1
    this.b1 = b1
    this.state1 = state1
    this.phase2 = phase2
    this.a2 = a2
    this.b2 = b2
    this.state2 = state2
    this.phase3 = phase3
    this.a3 = a3
    this.b3 = b3
    this.state3 = state3
    this.phase4 = phase4
    this.a4 = a4
    this.b4 = b4
    this.state4 = state4
    this.phase5 = phase5
    this.a5 = a5
    this.b5 = b5
    this.state5 = state5
    this.phase6 = phase6
    this.a6 = a6
    this.b6 = b6
    this.state6 = state6
    this.phase7 = phase7
    this.a7 = a7
    this.b7 = b7
    this.state7 = state7
    this.phase = phase
    this.prevTrig = prevTrig
  }
}