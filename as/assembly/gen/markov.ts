// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract, fract01, log, max, min, modFn, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, bias: f32, seed: f32, trig: f32): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, bias: f32, seed: f32, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, bias: f32, trig: f32, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, bias: f32, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, seed: f32, trig: f32, bias$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, seed: f32, bias$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, trig: f32, bias$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio = new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step: f32, bias$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, bias: f32, seed: f32, trig: f32, step$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, bias: f32, seed: f32, step$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, bias: f32, trig: f32, step$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio = new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, bias: f32, step$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, seed: f32, trig: f32, step$: usize, bias$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, seed: f32, step$: usize, bias$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, trig: f32, step$: usize, bias$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio = new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay: f32, step$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, bias: f32, seed: f32, trig: f32, stay$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, bias: f32, seed: f32, stay$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, bias: f32, trig: f32, stay$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio = new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, bias: f32, stay$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, seed: f32, trig: f32, stay$: usize, bias$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, seed: f32, stay$: usize, bias$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, trig: f32, stay$: usize, bias$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio = new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, step: f32, stay$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, bias: f32, seed: f32, trig: f32, stay$: usize, step$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, bias: f32, seed: f32, stay$: usize, step$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, bias: f32, trig: f32, stay$: usize, step$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio = new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, bias: f32, stay$: usize, step$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, seed: f32, trig: f32, stay$: usize, step$: usize, bias$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio = new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, seed: f32, stay$: usize, step$: usize, bias$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar = new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, trig: f32, stay$: usize, step$: usize, bias$: usize, seed$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio = new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states: f32, stay$: usize, step$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const statesClamped: f32 = clamp(states, 2, 16)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, bias: f32, seed: f32, trig: f32, states$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, bias: f32, seed: f32, states$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, bias: f32, trig: f32, states$: usize, seed$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio = new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, bias: f32, states$: usize, seed$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, seed: f32, trig: f32, states$: usize, bias$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio = new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, seed: f32, states$: usize, bias$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar = new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, trig: f32, states$: usize, bias$: usize, seed$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio = new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, step: f32, states$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, bias: f32, seed: f32, trig: f32, states$: usize, step$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, bias: f32, seed: f32, states$: usize, step$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, bias: f32, trig: f32, states$: usize, step$: usize, seed$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio = new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, bias: f32, states$: usize, step$: usize, seed$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, seed: f32, trig: f32, states$: usize, step$: usize, bias$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio = new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, seed: f32, states$: usize, step$: usize, bias$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar = new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, trig: f32, states$: usize, step$: usize, bias$: usize, seed$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio = new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, stay: f32, states$: usize, step$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const stayClamped: f32 = clamp(stay, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, bias: f32, seed: f32, trig: f32, states$: usize, stay$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, bias: f32, seed: f32, states$: usize, stay$: usize, trig$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, bias: f32, trig: f32, states$: usize, stay$: usize, seed$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio = new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, bias: f32, states$: usize, stay$: usize, seed$: usize, trig$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, seed: f32, trig: f32, states$: usize, stay$: usize, bias$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio = new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, seed: f32, states$: usize, stay$: usize, bias$: usize, trig$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar = new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, trig: f32, states$: usize, stay$: usize, bias$: usize, seed$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio = new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, step: f32, states$: usize, stay$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    const stepClamped: f32 = clamp(step, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bias: f32, seed: f32, trig: f32, states$: usize, stay$: usize, step$: usize): void {
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio = new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bias: f32, seed: f32, states$: usize, stay$: usize, step$: usize, trig$: usize): void {
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar = new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bias: f32, trig: f32, states$: usize, stay$: usize, step$: usize, seed$: usize): void {
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio = new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bias: f32, states$: usize, stay$: usize, step$: usize, seed$: usize, trig$: usize): void {
    const biasClamped: f32 = clamp(bias, 0, 1)
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar = new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, trig: f32, states$: usize, stay$: usize, step$: usize, bias$: usize): void {
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio = new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, states$: usize, stay$: usize, step$: usize, bias$: usize, trig$: usize): void {
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar = new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, states$: usize, stay$: usize, step$: usize, bias$: usize, seed$: usize): void {
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}

export class Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio {
  static readonly defaultInstance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio = new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio()

  state: f32 = 0
  rng: f32 = 0.5
  prevTrig: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio): void {
    this.state = src.state
    this.rng = src.rng
    this.prevTrig = src.prevTrig
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, states$: usize, stay$: usize, step$: usize, bias$: usize, seed$: usize, trig$: usize): void {
    if (this.fired) {
      this.fired = 0
    }

    let prevTrig: f32 = this.prevTrig
    let rng: f32 = this.rng
    let state: f32 = this.state
    let fired: f32 = this.fired
    let output: f32

    let dir: f32
    let isRising: f32
    let nextState: f32
    let r1: f32
    let r2: f32
    let stayP: f32
    let stepP: f32

    let biasClamped: f32
    let seed: f32
    let statesClamped: f32
    let stayClamped: f32
    let stepClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        biasClamped = clamp(load<f32>(bias$), 0, 1)
        seed = load<f32>(seed$)
        statesClamped = clamp(load<f32>(states$), 2, 16)
        stayClamped = clamp(load<f32>(stay$), 0, 1)
        stepClamped = clamp(load<f32>(step$), 0, 1)
        trig = load<f32>(trig$)
        isRising = f32(((trig > 0) && (prevTrig <= 0)))
        prevTrig = trig
        if (isRising) {
          rng = fract((sin(((rng * 127.1) + (seed * 311.7))) * 43758.5453))
          r1 = rng
          rng = fract((sin(((rng * 269.5) + (seed * 183.3))) * 43758.5453))
          r2 = rng
          stayP = clamp(stayClamped, 0, 1)
          stepP = clamp(stepClamped, 0, (1 - stayP))
          if ((r1 < stayP)) {
            nextState = state
          } else if ((r1 < (stayP + stepP))) {
            dir = ((f32((r2 < biasClamped)) * 2) - 1)
            nextState = modFn(((state + dir) + statesClamped), statesClamped)
          } else {
            nextState = floor((r2 * statesClamped))
          }
          state = nextState
          fired = 1
        }
        output = state
        store<f32>(output$, output)
        output$ += 4
        states$ += 4
        stay$ += 4
        step$ += 4
        bias$ += 4
        seed$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.rng = rng
    this.state = state
    this.fired = fired
  }
}