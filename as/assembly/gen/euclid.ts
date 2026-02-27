// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, euclidHitF32, floor, fract01, log, max, min, modFn, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar = new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar()

  lastStepAbs: f32 =-1
  lastSteps: f32 = Infinity
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  stepDur: f32
  isDiscontinuous: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastSteps = src.lastSteps
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.stepDur = src.stepDur
    this.isDiscontinuous = src.isDiscontinuous
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, steps: f32, offset: f32, bar: f32): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const stepsClamped: f32 = max(steps, 1)
    const offsetClamped: f32 = max(offset, 0)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const stepsChanged: boolean = stepsClamped !== this.lastSteps
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (stepsChanged || barChanged) {
      this.stepDur = (stepsClamped > 0) ? (this.intervalSamples / max(stepsClamped, 1)) : this.intervalSamples
      this.stepDur = max(1, this.stepDur)
      const isLateStart: f32 = f32(((sampleCount >= 0) && (this.lastStepAbs < 0)))
      this.isDiscontinuous = f32(((sampleCount != this.nextSampleCount) && !isLateStart))
      this.lastSteps = stepsClamped
      this.lastBar = barClamped
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let stepDur: f32 = this.stepDur

    let isDiscontinuous: f32 = this.isDiscontinuous

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio = new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, steps: f32, offset: f32, bar$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const stepsClamped: f32 = max(steps, 1)
    const offsetClamped: f32 = max(offset, 0)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (stepsClamped > 0) ? (intervalSamples / max(stepsClamped, 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar = new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar()

  lastStepAbs: f32 =-1
  lastSteps: f32 = Infinity
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  stepDur: f32
  isDiscontinuous: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastSteps = src.lastSteps
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.stepDur = src.stepDur
    this.isDiscontinuous = src.isDiscontinuous
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, steps: f32, bar: f32, offset$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const stepsClamped: f32 = max(steps, 1)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const stepsChanged: boolean = stepsClamped !== this.lastSteps
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (stepsChanged || barChanged) {
      this.stepDur = (stepsClamped > 0) ? (this.intervalSamples / max(stepsClamped, 1)) : this.intervalSamples
      this.stepDur = max(1, this.stepDur)
      const isLateStart: f32 = f32(((sampleCount >= 0) && (this.lastStepAbs < 0)))
      this.isDiscontinuous = f32(((sampleCount != this.nextSampleCount) && !isLateStart))
      this.lastSteps = stepsClamped
      this.lastBar = barClamped
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let stepDur: f32 = this.stepDur

    let isDiscontinuous: f32 = this.isDiscontinuous

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let offsetClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio = new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, steps: f32, offset$: usize, bar$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const stepsClamped: f32 = max(steps, 1)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let offsetClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (stepsClamped > 0) ? (intervalSamples / max(stepsClamped, 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar = new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar()

  lastStepAbs: f32 =-1
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, offset: f32, bar: f32, steps$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const offsetClamped: f32 = max(offset, 0)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0

    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let intervalSamples: f32 = this.intervalSamples
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stepsClamped = max(load<f32>(steps$), 1)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        steps$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio = new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, offset: f32, steps$: usize, bar$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const offsetClamped: f32 = max(offset, 0)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        stepsClamped = max(load<f32>(steps$), 1)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        steps$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar = new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar()

  lastStepAbs: f32 =-1
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, bar: f32, steps$: usize, offset$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0

    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let intervalSamples: f32 = this.intervalSamples
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let offsetClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        steps$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio = new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses: f32, steps$: usize, offset$: usize, bar$: usize): void {
    const pulsesClamped: f32 = max(pulses, 0)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let offsetClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        steps$ += 4
        offset$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar = new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar()

  lastStepAbs: f32 =-1
  lastSteps: f32 = Infinity
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  stepDur: f32
  isDiscontinuous: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastSteps = src.lastSteps
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.stepDur = src.stepDur
    this.isDiscontinuous = src.isDiscontinuous
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, steps: f32, offset: f32, bar: f32, pulses$: usize): void {
    const stepsClamped: f32 = max(steps, 1)
    const offsetClamped: f32 = max(offset, 0)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const stepsChanged: boolean = stepsClamped !== this.lastSteps
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (stepsChanged || barChanged) {
      this.stepDur = (stepsClamped > 0) ? (this.intervalSamples / max(stepsClamped, 1)) : this.intervalSamples
      this.stepDur = max(1, this.stepDur)
      const isLateStart: f32 = f32(((sampleCount >= 0) && (this.lastStepAbs < 0)))
      this.isDiscontinuous = f32(((sampleCount != this.nextSampleCount) && !isLateStart))
      this.lastSteps = stepsClamped
      this.lastBar = barClamped
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let stepDur: f32 = this.stepDur

    let isDiscontinuous: f32 = this.isDiscontinuous

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let pulsesClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        pulsesClamped = max(load<f32>(pulses$), 0)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio = new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, steps: f32, offset: f32, pulses$: usize, bar$: usize): void {
    const stepsClamped: f32 = max(steps, 1)
    const offsetClamped: f32 = max(offset, 0)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let pulsesClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        pulsesClamped = max(load<f32>(pulses$), 0)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (stepsClamped > 0) ? (intervalSamples / max(stepsClamped, 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar = new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar()

  lastStepAbs: f32 =-1
  lastSteps: f32 = Infinity
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  stepDur: f32
  isDiscontinuous: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastSteps = src.lastSteps
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.stepDur = src.stepDur
    this.isDiscontinuous = src.isDiscontinuous
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, steps: f32, bar: f32, pulses$: usize, offset$: usize): void {
    const stepsClamped: f32 = max(steps, 1)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const stepsChanged: boolean = stepsClamped !== this.lastSteps
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (stepsChanged || barChanged) {
      this.stepDur = (stepsClamped > 0) ? (this.intervalSamples / max(stepsClamped, 1)) : this.intervalSamples
      this.stepDur = max(1, this.stepDur)
      const isLateStart: f32 = f32(((sampleCount >= 0) && (this.lastStepAbs < 0)))
      this.isDiscontinuous = f32(((sampleCount != this.nextSampleCount) && !isLateStart))
      this.lastSteps = stepsClamped
      this.lastBar = barClamped
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let stepDur: f32 = this.stepDur

    let isDiscontinuous: f32 = this.isDiscontinuous

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let offsetClamped: f32
    let pulsesClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        pulsesClamped = max(load<f32>(pulses$), 0)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio = new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, steps: f32, pulses$: usize, offset$: usize, bar$: usize): void {
    const stepsClamped: f32 = max(steps, 1)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let offsetClamped: f32
    let pulsesClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        pulsesClamped = max(load<f32>(pulses$), 0)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (stepsClamped > 0) ? (intervalSamples / max(stepsClamped, 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        offset$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar = new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar()

  lastStepAbs: f32 =-1
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, bar: f32, pulses$: usize, steps$: usize): void {
    const offsetClamped: f32 = max(offset, 0)
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0

    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let intervalSamples: f32 = this.intervalSamples
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let pulsesClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        pulsesClamped = max(load<f32>(pulses$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        steps$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio = new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio()

  lastStepAbs: f32 =-1
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, pulses$: usize, steps$: usize, bar$: usize): void {
    const offsetClamped: f32 = max(offset, 0)

    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0
    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let pulsesClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        pulsesClamped = max(load<f32>(pulses$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        steps$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar = new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar()

  lastStepAbs: f32 =-1
  lastBar: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  intervalSamples: f32
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastBar = src.lastBar
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.intervalSamples = src.intervalSamples
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, pulses$: usize, steps$: usize, offset$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const barChanged: boolean = barClamped !== this.lastBar
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0

    if (barChanged || samplesPerBarChanged) {
      const barBars: f32 = max((1 / samplesPerBar), barClamped)
      this.intervalSamples = (barBars * samplesPerBar)
      this.lastBar = barClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let intervalSamples: f32 = this.intervalSamples
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let isLateStart: f32

    let offsetClamped: f32
    let pulsesClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        pulsesClamped = max(load<f32>(pulses$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        steps$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}

export class Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio {
  static readonly defaultInstance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio = new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio()

  lastStepAbs: f32 =-1
  lastSamplesPerBar: f32 = Infinity
  nextSampleCount: i32

  reset(): void {
    this.copyFrom(Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio.defaultInstance)
  }

  copyFrom(src: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio): void {
    this.lastStepAbs = src.lastStepAbs
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.nextSampleCount = src.nextSampleCount
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, pulses$: usize, steps$: usize, offset$: usize, bar$: usize): void {
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let isDiscontinuous: f32 = 0
    let stepDur: f32 = 0

    if (samplesPerBarChanged) {
      this.lastSamplesPerBar = samplesPerBar
    }

    this.nextSampleCount = (sampleCount + bufferLength)

    let lastStepAbs: f32 = this.lastStepAbs
    let output: f32
    let nextSampleCount: i32 = this.nextSampleCount

    let curStepAbs: f32
    let hit: f32
    let isBoundary: f32
    let prevStepAbs: f32
    let shouldTrigger: f32
    let stepInBar: f32

    let barBars: f32
    let intervalSamples: f32
    let isLateStart: f32

    let offsetClamped: f32
    let pulsesClamped: f32
    let stepsClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = max(load<f32>(offset$), 0)
        pulsesClamped = max(load<f32>(pulses$), 0)
        stepsClamped = max(load<f32>(steps$), 1)
        barBars = max((1 / samplesPerBar), max(load<f32>(bar$), 0))
        intervalSamples = (barBars * samplesPerBar)
        stepDur = (max(load<f32>(steps$), 1) > 0) ? (intervalSamples / max(max(load<f32>(steps$), 1), 1)) : intervalSamples
        stepDur = max(1, stepDur)
        isLateStart = f32(((sampleCount >= 0) && (lastStepAbs < 0)))
        isDiscontinuous = f32(((sampleCount != nextSampleCount) && !isLateStart))
        curStepAbs = f32(Math.floor((f64(sc) / stepDur)))
        prevStepAbs = f32(Math.floor(((f64(sc) - 1) / stepDur)))
        isBoundary = f32((curStepAbs > prevStepAbs))
        stepInBar = modFn(curStepAbs, max(stepsClamped, 1))
        if ((stepInBar < 0)) {
          stepInBar = (stepInBar + max(stepsClamped, 1))
        }
        hit = euclidHitF32(pulsesClamped, stepsClamped, stepInBar, offsetClamped)
        shouldTrigger = f32((!isDiscontinuous && isBoundary))
        output = shouldTrigger ? hit : 0
        lastStepAbs = curStepAbs
        isDiscontinuous = 0
        store<f32>(output$, output)
        output$ += 4
        pulses$ += 4
        steps$ += 4
        offset$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.lastStepAbs = lastStepAbs
  }
}