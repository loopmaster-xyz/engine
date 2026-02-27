// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, abs, applyCurve, clamp, clamp01, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Slew_default_up_scalar_down_scalar_exp_scalar {
  static readonly defaultInstance: Slew_default_up_scalar_down_scalar_exp_scalar = new Slew_default_up_scalar_down_scalar_exp_scalar()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_scalar_down_scalar_exp_scalar.defaultInstance)
  }

  copyFrom(src: Slew_default_up_scalar_down_scalar_exp_scalar): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, up: f32, down: f32, exp: f32): void {
    const upClamped: f32 = clamp(up, 0, 1)
    const downClamped: f32 = clamp(down, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_scalar_down_scalar_exp_audio {
  static readonly defaultInstance: Slew_default_up_scalar_down_scalar_exp_audio = new Slew_default_up_scalar_down_scalar_exp_audio()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_scalar_down_scalar_exp_audio.defaultInstance)
  }

  copyFrom(src: Slew_default_up_scalar_down_scalar_exp_audio): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, up: f32, down: f32, exp$: usize): void {
    const upClamped: f32 = clamp(up, 0, 1)
    const downClamped: f32 = clamp(down, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let exp: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exp = load<f32>(exp$)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        exp$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_scalar_down_audio_exp_scalar {
  static readonly defaultInstance: Slew_default_up_scalar_down_audio_exp_scalar = new Slew_default_up_scalar_down_audio_exp_scalar()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_scalar_down_audio_exp_scalar.defaultInstance)
  }

  copyFrom(src: Slew_default_up_scalar_down_audio_exp_scalar): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, up: f32, exp: f32, down$: usize): void {
    const upClamped: f32 = clamp(up, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let downClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        downClamped = clamp(load<f32>(down$), 0, 1)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        down$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_scalar_down_audio_exp_audio {
  static readonly defaultInstance: Slew_default_up_scalar_down_audio_exp_audio = new Slew_default_up_scalar_down_audio_exp_audio()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_scalar_down_audio_exp_audio.defaultInstance)
  }

  copyFrom(src: Slew_default_up_scalar_down_audio_exp_audio): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, up: f32, down$: usize, exp$: usize): void {
    const upClamped: f32 = clamp(up, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let downClamped: f32
    let exp: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        downClamped = clamp(load<f32>(down$), 0, 1)
        exp = load<f32>(exp$)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        down$ += 4
        exp$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_audio_down_scalar_exp_scalar {
  static readonly defaultInstance: Slew_default_up_audio_down_scalar_exp_scalar = new Slew_default_up_audio_down_scalar_exp_scalar()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_audio_down_scalar_exp_scalar.defaultInstance)
  }

  copyFrom(src: Slew_default_up_audio_down_scalar_exp_scalar): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, down: f32, exp: f32, up$: usize): void {
    const downClamped: f32 = clamp(down, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let upClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        upClamped = clamp(load<f32>(up$), 0, 1)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        up$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_audio_down_scalar_exp_audio {
  static readonly defaultInstance: Slew_default_up_audio_down_scalar_exp_audio = new Slew_default_up_audio_down_scalar_exp_audio()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_audio_down_scalar_exp_audio.defaultInstance)
  }

  copyFrom(src: Slew_default_up_audio_down_scalar_exp_audio): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, down: f32, up$: usize, exp$: usize): void {
    const downClamped: f32 = clamp(down, 0, 1)

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let exp: f32
    let upClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exp = load<f32>(exp$)
        upClamped = clamp(load<f32>(up$), 0, 1)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        up$ += 4
        exp$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_audio_down_audio_exp_scalar {
  static readonly defaultInstance: Slew_default_up_audio_down_audio_exp_scalar = new Slew_default_up_audio_down_audio_exp_scalar()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_audio_down_audio_exp_scalar.defaultInstance)
  }

  copyFrom(src: Slew_default_up_audio_down_audio_exp_scalar): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, exp: f32, up$: usize, down$: usize): void {

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let downClamped: f32
    let upClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        downClamped = clamp(load<f32>(down$), 0, 1)
        upClamped = clamp(load<f32>(up$), 0, 1)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        up$ += 4
        down$ += 4
      })
    }

    this.current = current
  }
}

export class Slew_default_up_audio_down_audio_exp_audio {
  static readonly defaultInstance: Slew_default_up_audio_down_audio_exp_audio = new Slew_default_up_audio_down_audio_exp_audio()

  current: f32 = 0

  reset(): void {
    this.copyFrom(Slew_default_up_audio_down_audio_exp_audio.defaultInstance)
  }

  copyFrom(src: Slew_default_up_audio_down_audio_exp_audio): void {
    this.current = src.current
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, up$: usize, down$: usize, exp$: usize): void {

    let current: f32 = this.current
    let input: f32
    let output: f32

    let a: f32
    let coeff: f32
    let diff: f32
    let downVal: f32
    let step: f32

    let downClamped: f32
    let exp: f32
    let upClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        downClamped = clamp(load<f32>(down$), 0, 1)
        exp = load<f32>(exp$)
        upClamped = clamp(load<f32>(up$), 0, 1)
        input = load<f32>(input$)
        diff = (input - current)
        if ((abs(diff) < 0.000001)) {
          current = input
        } else {
          downVal = (downClamped <= 0) ? upClamped : downClamped
          a = clamp01((diff > 0) ? upClamped : downVal)
          coeff = applyCurve(a, exp)
          step = (diff * coeff)
          if ((abs(step) >= abs(diff))) {
            current = input
          } else {
            current = (current + step)
          }
        }
        output = current
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        up$ += 4
        down$ += 4
        exp$ += 4
      })
    }

    this.current = current
  }
}