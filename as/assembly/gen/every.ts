// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Every_default_bars_scalar_offset_scalar_length_scalar {
  static readonly defaultInstance: Every_default_bars_scalar_offset_scalar_length_scalar = new Every_default_bars_scalar_offset_scalar_length_scalar()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastBars: f32 = Infinity
  lastOffset: f32 = Infinity
  lastLength: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  barSamples: f32
  periodSamples: f32
  offsetSamples: f32

  reset(): void {
    this.copyFrom(Every_default_bars_scalar_offset_scalar_length_scalar.defaultInstance)
  }

  copyFrom(src: Every_default_bars_scalar_offset_scalar_length_scalar): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastBars = src.lastBars
    this.lastOffset = src.lastOffset
    this.lastLength = src.lastLength
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.barSamples = src.barSamples
    this.periodSamples = src.periodSamples
    this.offsetSamples = src.offsetSamples
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars: f32, offset: f32, length: f32): void {
    const barsClamped: f32 = max(bars, 0.0001)
    const offsetClamped: f32 = max(offset, 0)
    const lengthClamped: f32 = max(length, 0.0001)
    const lengthChanged: boolean = lengthClamped !== this.lastLength
    const barsChanged: boolean = barsClamped !== this.lastBars
    const offsetChanged: boolean = offsetClamped !== this.lastOffset
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    if (lengthChanged || samplesPerBarChanged) {
      this.barSamples = (samplesPerBar * lengthClamped)
      this.lastLength = lengthClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (barsChanged || lengthChanged) {
      this.periodSamples = (this.barSamples * barsClamped)
      this.lastBars = barsClamped
      this.lastLength = lengthClamped
    }

    if (offsetChanged || lengthChanged) {
      this.offsetSamples = (this.barSamples * offsetClamped)
      this.lastOffset = offsetClamped
      this.lastLength = lengthClamped
    }

    if (barsChanged || offsetChanged || lengthChanged) {
      const isLateStart: f32 = f32(((sampleCount > 0) && (this.lastPeriodIndex < 0)))
      this.lastBars = barsClamped
      this.lastOffset = offsetClamped
      this.lastLength = lengthClamped
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32
    let offsetSamples: f32 = this.offsetSamples
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
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
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

export class Every_default_bars_scalar_offset_scalar_length_audio {
  static readonly defaultInstance: Every_default_bars_scalar_offset_scalar_length_audio = new Every_default_bars_scalar_offset_scalar_length_audio()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Every_default_bars_scalar_offset_scalar_length_audio.defaultInstance)
  }

  copyFrom(src: Every_default_bars_scalar_offset_scalar_length_audio): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars: f32, offset: f32, length$: usize): void {
    const barsClamped: f32 = max(bars, 0.0001)
    const offsetClamped: f32 = max(offset, 0)

    let offsetSamples: f32 = 0
    let periodSamples: f32 = 0
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))
    if (this.fired) {
      this.fired = 0
    }

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let barSamples: f32
    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barSamples = (samplesPerBar * max(load<f32>(length$), 0.0001))
        periodSamples = (barSamples * barsClamped)
        offsetSamples = (barSamples * offsetClamped)
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        length$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_scalar_offset_audio_length_scalar {
  static readonly defaultInstance: Every_default_bars_scalar_offset_audio_length_scalar = new Every_default_bars_scalar_offset_audio_length_scalar()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastBars: f32 = Infinity
  lastLength: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  barSamples: f32
  periodSamples: f32

  reset(): void {
    this.copyFrom(Every_default_bars_scalar_offset_audio_length_scalar.defaultInstance)
  }

  copyFrom(src: Every_default_bars_scalar_offset_audio_length_scalar): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastBars = src.lastBars
    this.lastLength = src.lastLength
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.barSamples = src.barSamples
    this.periodSamples = src.periodSamples
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars: f32, length: f32, offset$: usize): void {
    const barsClamped: f32 = max(bars, 0.0001)
    const lengthClamped: f32 = max(length, 0.0001)
    const lengthChanged: boolean = lengthClamped !== this.lastLength
    const barsChanged: boolean = barsClamped !== this.lastBars
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let offsetSamples: f32 = 0

    if (lengthChanged || samplesPerBarChanged) {
      this.barSamples = (samplesPerBar * lengthClamped)
      this.lastLength = lengthClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (barsChanged || lengthChanged) {
      this.periodSamples = (this.barSamples * barsClamped)
      this.lastBars = barsClamped
      this.lastLength = lengthClamped
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32
    let barSamples: f32 = this.barSamples
    let periodSamples: f32 = this.periodSamples

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetSamples = (barSamples * max(load<f32>(offset$), 0))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_scalar_offset_audio_length_audio {
  static readonly defaultInstance: Every_default_bars_scalar_offset_audio_length_audio = new Every_default_bars_scalar_offset_audio_length_audio()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Every_default_bars_scalar_offset_audio_length_audio.defaultInstance)
  }

  copyFrom(src: Every_default_bars_scalar_offset_audio_length_audio): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars: f32, offset$: usize, length$: usize): void {
    const barsClamped: f32 = max(bars, 0.0001)

    let offsetSamples: f32 = 0
    let periodSamples: f32 = 0
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))
    if (this.fired) {
      this.fired = 0
    }

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let barSamples: f32
    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barSamples = (samplesPerBar * max(load<f32>(length$), 0.0001))
        periodSamples = (barSamples * barsClamped)
        offsetSamples = (barSamples * max(load<f32>(offset$), 0))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        length$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_audio_offset_scalar_length_scalar {
  static readonly defaultInstance: Every_default_bars_audio_offset_scalar_length_scalar = new Every_default_bars_audio_offset_scalar_length_scalar()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastOffset: f32 = Infinity
  lastLength: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  barSamples: f32
  offsetSamples: f32

  reset(): void {
    this.copyFrom(Every_default_bars_audio_offset_scalar_length_scalar.defaultInstance)
  }

  copyFrom(src: Every_default_bars_audio_offset_scalar_length_scalar): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastOffset = src.lastOffset
    this.lastLength = src.lastLength
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.barSamples = src.barSamples
    this.offsetSamples = src.offsetSamples
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, length: f32, bars$: usize): void {
    const offsetClamped: f32 = max(offset, 0)
    const lengthClamped: f32 = max(length, 0.0001)
    const lengthChanged: boolean = lengthClamped !== this.lastLength
    const offsetChanged: boolean = offsetClamped !== this.lastOffset
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let periodSamples: f32 = 0

    if (lengthChanged || samplesPerBarChanged) {
      this.barSamples = (samplesPerBar * lengthClamped)
      this.lastLength = lengthClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (offsetChanged || lengthChanged) {
      this.offsetSamples = (this.barSamples * offsetClamped)
      this.lastOffset = offsetClamped
      this.lastLength = lengthClamped
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32
    let barSamples: f32 = this.barSamples
    let offsetSamples: f32 = this.offsetSamples

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        periodSamples = (barSamples * max(load<f32>(bars$), 0.0001))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
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

export class Every_default_bars_audio_offset_scalar_length_audio {
  static readonly defaultInstance: Every_default_bars_audio_offset_scalar_length_audio = new Every_default_bars_audio_offset_scalar_length_audio()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0

  reset(): void {
    this.copyFrom(Every_default_bars_audio_offset_scalar_length_audio.defaultInstance)
  }

  copyFrom(src: Every_default_bars_audio_offset_scalar_length_audio): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, offset: f32, bars$: usize, length$: usize): void {
    const offsetClamped: f32 = max(offset, 0)

    let offsetSamples: f32 = 0
    let periodSamples: f32 = 0
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))
    if (this.fired) {
      this.fired = 0
    }

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let barSamples: f32
    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barSamples = (samplesPerBar * max(load<f32>(length$), 0.0001))
        periodSamples = (barSamples * max(load<f32>(bars$), 0.0001))
        offsetSamples = (barSamples * offsetClamped)
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        bars$ += 4
        length$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_audio_offset_audio_length_scalar {
  static readonly defaultInstance: Every_default_bars_audio_offset_audio_length_scalar = new Every_default_bars_audio_offset_audio_length_scalar()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastLength: f32 = Infinity
  lastSamplesPerBar: f32 = Infinity
  barSamples: f32

  reset(): void {
    this.copyFrom(Every_default_bars_audio_offset_audio_length_scalar.defaultInstance)
  }

  copyFrom(src: Every_default_bars_audio_offset_audio_length_scalar): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastLength = src.lastLength
    this.lastSamplesPerBar = src.lastSamplesPerBar
    this.barSamples = src.barSamples
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, length: f32, bars$: usize, offset$: usize): void {
    const lengthClamped: f32 = max(length, 0.0001)
    const lengthChanged: boolean = lengthClamped !== this.lastLength
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let offsetSamples: f32 = 0
    let periodSamples: f32 = 0

    if (lengthChanged || samplesPerBarChanged) {
      this.barSamples = (samplesPerBar * lengthClamped)
      this.lastLength = lengthClamped
      this.lastSamplesPerBar = samplesPerBar
    }

    if (this.fired) {
      this.fired = 0
    }
    const nextSampleCount: f32 = (f32(sampleCount) + f32(bufferLength))

    let lastPeriodIndex: f32 = this.lastPeriodIndex
    let fired: f32 = this.fired
    let output: f32
    let barSamples: f32 = this.barSamples

    let isBoundary: f32
    let periodIndex: f32
    let prevSamplePeriodIndex: f32
    let shouldTrigger: f32

    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        periodSamples = (barSamples * max(load<f32>(bars$), 0.0001))
        offsetSamples = (barSamples * max(load<f32>(offset$), 0))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        bars$ += 4
        offset$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}

export class Every_default_bars_audio_offset_audio_length_audio {
  static readonly defaultInstance: Every_default_bars_audio_offset_audio_length_audio = new Every_default_bars_audio_offset_audio_length_audio()

  lastPeriodIndex: f32 =-1
  isLateStart: f32 = 0
  fired: f32 = 0
  lastSamplesPerBar: f32 = Infinity

  reset(): void {
    this.copyFrom(Every_default_bars_audio_offset_audio_length_audio.defaultInstance)
  }

  copyFrom(src: Every_default_bars_audio_offset_audio_length_audio): void {
    this.lastPeriodIndex = src.lastPeriodIndex
    this.isLateStart = src.isLateStart
    this.fired = src.fired
    this.lastSamplesPerBar = src.lastSamplesPerBar
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bars$: usize, offset$: usize, length$: usize): void {
    const samplesPerBarChanged: boolean = samplesPerBar !== this.lastSamplesPerBar


    let offsetSamples: f32 = 0
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

    let barSamples: f32
    let isLateStart: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barSamples = (samplesPerBar * max(load<f32>(length$), 0.0001))
        periodSamples = (barSamples * max(load<f32>(bars$), 0.0001))
        offsetSamples = (barSamples * max(load<f32>(offset$), 0))
        isLateStart = f32(((sampleCount > 0) && (lastPeriodIndex < 0)))
        periodIndex = floor(((f32(sc) - offsetSamples) / periodSamples))
        prevSamplePeriodIndex = f32(Math.floor((((f64(sc) - 1) - offsetSamples) / periodSamples)))
        isBoundary = f32(((prevSamplePeriodIndex != periodIndex) && (periodIndex >= 0)))
        shouldTrigger = f32(isBoundary)
        output = shouldTrigger ? 1 : 0
        if ((shouldTrigger > 0)) {
          fired = 1
        }
        lastPeriodIndex = periodIndex
        store<f32>(output$, output)
        output$ += 4
        bars$ += 4
        offset$ += 4
        length$ += 4
        sc = sc + 1
      })
    }

    this.lastPeriodIndex = lastPeriodIndex
    this.fired = fired
  }
}