// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sahValue, sin, sinNormalized, sqrt, warn } from '../util'

export class At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar {
  static readonly defaultInstance: At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar = new At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, every: f32, probability: f32, seed: f32): void {
    const barClamped: f32 = max(bar, 0)
    const everyClamped: f32 = max(every, 0)
    const probabilityClamped: f32 = clamp(probability, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_scalar_every_scalar_probability_audio_seed_scalar {
  static readonly defaultInstance: At_default_bar_scalar_every_scalar_probability_audio_seed_scalar = new At_default_bar_scalar_every_scalar_probability_audio_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_scalar_every_scalar_probability_audio_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_scalar_every_scalar_probability_audio_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, every: f32, seed: f32, probability$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const everyClamped: f32 = max(every, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let probabilityClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        probabilityClamped = clamp(load<f32>(probability$), 0, 1)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        probability$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_scalar_every_audio_probability_scalar_seed_scalar {
  static readonly defaultInstance: At_default_bar_scalar_every_audio_probability_scalar_seed_scalar = new At_default_bar_scalar_every_audio_probability_scalar_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_scalar_every_audio_probability_scalar_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_scalar_every_audio_probability_scalar_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, probability: f32, seed: f32, every$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const probabilityClamped: f32 = clamp(probability, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let everyClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        everyClamped = max(load<f32>(every$), 0)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        every$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_scalar_every_audio_probability_audio_seed_scalar {
  static readonly defaultInstance: At_default_bar_scalar_every_audio_probability_audio_seed_scalar = new At_default_bar_scalar_every_audio_probability_audio_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_scalar_every_audio_probability_audio_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_scalar_every_audio_probability_audio_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bar: f32, seed: f32, every$: usize, probability$: usize): void {
    const barClamped: f32 = max(bar, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let everyClamped: f32
    let probabilityClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        everyClamped = max(load<f32>(every$), 0)
        probabilityClamped = clamp(load<f32>(probability$), 0, 1)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        every$ += 4
        probability$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_audio_every_scalar_probability_scalar_seed_scalar {
  static readonly defaultInstance: At_default_bar_audio_every_scalar_probability_scalar_seed_scalar = new At_default_bar_audio_every_scalar_probability_scalar_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_audio_every_scalar_probability_scalar_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_audio_every_scalar_probability_scalar_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, every: f32, probability: f32, seed: f32, bar$: usize): void {
    const everyClamped: f32 = max(every, 0)
    const probabilityClamped: f32 = clamp(probability, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let barClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barClamped = max(load<f32>(bar$), 0)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_audio_every_scalar_probability_audio_seed_scalar {
  static readonly defaultInstance: At_default_bar_audio_every_scalar_probability_audio_seed_scalar = new At_default_bar_audio_every_scalar_probability_audio_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_audio_every_scalar_probability_audio_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_audio_every_scalar_probability_audio_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, every: f32, seed: f32, bar$: usize, probability$: usize): void {
    const everyClamped: f32 = max(every, 0)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let barClamped: f32
    let probabilityClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barClamped = max(load<f32>(bar$), 0)
        probabilityClamped = clamp(load<f32>(probability$), 0, 1)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        probability$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_audio_every_audio_probability_scalar_seed_scalar {
  static readonly defaultInstance: At_default_bar_audio_every_audio_probability_scalar_seed_scalar = new At_default_bar_audio_every_audio_probability_scalar_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_audio_every_audio_probability_scalar_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_audio_every_audio_probability_scalar_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, probability: f32, seed: f32, bar$: usize, every$: usize): void {
    const probabilityClamped: f32 = clamp(probability, 0, 1)
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let barClamped: f32
    let everyClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barClamped = max(load<f32>(bar$), 0)
        everyClamped = max(load<f32>(every$), 0)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        every$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}

export class At_default_bar_audio_every_audio_probability_audio_seed_scalar {
  static readonly defaultInstance: At_default_bar_audio_every_audio_probability_audio_seed_scalar = new At_default_bar_audio_every_audio_probability_audio_seed_scalar()

  prevSeed: f32 =-1
  baseSeed: f32 = 0
  fired: f32 = 0
  lastSeed: f32 = Infinity

  reset(): void {
    this.copyFrom(At_default_bar_audio_every_audio_probability_audio_seed_scalar.defaultInstance)
  }

  copyFrom(src: At_default_bar_audio_every_audio_probability_audio_seed_scalar): void {
    this.prevSeed = src.prevSeed
    this.baseSeed = src.baseSeed
    this.fired = src.fired
    this.lastSeed = src.lastSeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, seed: f32, bar$: usize, every$: usize, probability$: usize): void {
    const seedChanged: boolean = seed !== this.lastSeed


    if (seedChanged) {
      if ((seed != this.prevSeed)) {
        const prevSeed: f32 = seed
        this.baseSeed = seed
      }
      this.lastSeed = seed
    }

    if ((this.fired > 0)) {
      this.fired = 0
    }

    let fired: f32 = this.fired
    let output: f32
    let baseSeed: f32 = this.baseSeed

    let currentCycle: f32
    let cycle: f32
    let delta: f32
    let globalSample: f32
    let intervalSamples: f32
    let out: f32
    let prevCycle: f32
    let prevDelta: f32
    let prevSample: f32
    let random: f32
    let shouldTrigger: f32
    let startSample: f32

    let barClamped: f32
    let everyClamped: f32
    let probabilityClamped: f32
    let sc: i32 = sampleCount
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        barClamped = max(load<f32>(bar$), 0)
        everyClamped = max(load<f32>(every$), 0)
        probabilityClamped = clamp(load<f32>(probability$), 0, 1)
        startSample = (barClamped * samplesPerBar)
        globalSample = f32(sc)
        prevSample = (globalSample - 1)
        shouldTrigger = 0
        cycle = 0
        if ((everyClamped > 0)) {
          intervalSamples = max((everyClamped * samplesPerBar), 1)
          delta = (globalSample - startSample)
          prevDelta = (prevSample - startSample)
          currentCycle = floor((delta / intervalSamples))
          prevCycle = floor((prevDelta / intervalSamples))
          if (((currentCycle >= 0) && (currentCycle > prevCycle))) {
            shouldTrigger = 1
            cycle = currentCycle
          }
        } else if (((globalSample >= startSample) && (prevSample < startSample))) {
          shouldTrigger = 1
        }
        if ((shouldTrigger > 0)) {
          random = sahValue(baseSeed, cycle)
          out = (random < probabilityClamped) ? 1 : 0
          output = out
          if ((out > 0)) {
            fired = 1
          }
        } else {
          output = 0
        }
        store<f32>(output$, output)
        output$ += 4
        bar$ += 4
        every$ += 4
        probability$ += 4
        sc = sc + 1
      })
    }

    this.fired = fired
  }
}