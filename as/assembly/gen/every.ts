// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Every_default_bars_scalar {
  static readonly defaultInstance: Every_default_bars_scalar = new Every_default_bars_scalar()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastBars: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  periodSamples: f32

  reset(): void {
    this.copyFrom(Every_default_bars_scalar.defaultInstance)
  }

  copyFrom(src: Every_default_bars_scalar): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastBars = src.lastBars
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.periodSamples = src.periodSamples
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars: f32): void {
    const barsClamped: f32 = max(bars, 0.0001)
    const barsChanged: boolean = barsClamped !== this.lastBars
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (barsChanged) {
      const isLateStart: f32 = f32(((sampleCount > 0) && (this.lastPeriodIndex < 0)))
      this.lastBars = barsClamped
    }

    if (barsChanged || samplesPerBarChanged) {
      this.periodSamples = (samplesPerBar * barsClamped)
      this.lastSamplesPerBar = samplesPerBar
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32
    let periodSamples: f32 = this.periodSamples

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = f32(Math.floor((f64(sc) / periodSamples)))
        prevSamplePeriodIndex = f32(Math.floor(((f64(sc) - 1) / periodSamples)))
        isBoundary = f32((prevSamplePeriodIndex != periodIndex))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_audio {
  static readonly defaultInstance: Every_default_bars_audio = new Every_default_bars_audio()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastSamplesPerBar: f32 = Infinity

  reset(): void {
    this.copyFrom(Every_default_bars_audio.defaultInstance)
  }

  copyFrom(src: Every_default_bars_audio): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastSamplesPerBar = src.lastSamplesPerBar
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars$: usize): void {
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let periodSamples: f32 = 0

    if (samplesPerBarChanged) {
      this.lastSamplesPerBar = samplesPerBar
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        periodSamples = (samplesPerBar * max(load<f32>(bars$), 0.0001))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = f32(Math.floor((f64(sc) / periodSamples)))
        prevSamplePeriodIndex = f32(Math.floor(((f64(sc) - 1) / periodSamples)))
        isBoundary = f32((prevSamplePeriodIndex != periodIndex))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        bars$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}