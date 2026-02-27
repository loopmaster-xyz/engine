// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { DattorroKernel, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, bandwidth$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, damping$: usize, bandwidth$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, bandwidth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, damping$: usize): void {
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar = new Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, damping$: usize, bandwidth$: usize): void {
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, bandwidth$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let bandwidthClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        bandwidthClamped = clamp(load<f32>(bandwidth$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let dampingClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        damping$ += 4
      })
    }
  }
}

export class Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, damping$: usize, bandwidth$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let bandwidthClamped: f32
    let dampingClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        bandwidthClamped = clamp(load<f32>(bandwidth$), 0, 1)
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        damping$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, bandwidth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let bandwidthClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        bandwidthClamped = clamp(load<f32>(bandwidth$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        bandwidth$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, bandwidth: f32, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, damping$: usize): void {
    const bandwidthClamped: f32 = clamp(bandwidth, 0, 1)
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let dampingClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        damping$ += 4
      })
    }
  }
}

export class Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo {
  static readonly defaultInstance: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = new Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo()

  dattorroKernel: DattorroKernel = new DattorroKernel()

  reset(): void {
    this.copyFrom(Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo): void {
    this.dattorroKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, indiff1: f32, indiff2: f32, decdiff1: f32, decdiff2: f32, excrate: f32, excdepth: f32, predelay: f32, room$: usize, damping$: usize, bandwidth$: usize): void {
    const indiff1Clamped: f32 = clamp(indiff1, 0, 1)
    const indiff2Clamped: f32 = clamp(indiff2, 0, 1)
    const decdiff1Clamped: f32 = clamp(decdiff1, 0, 1)
    const decdiff2Clamped: f32 = clamp(decdiff2, 0, 1)
    const excrateClamped: f32 = clamp(excrate, 0, 1)
    const excdepthClamped: f32 = clamp(excdepth, 0, 1)
    const predelayClamped: f32 = clamp(predelay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const dattorroKernel: DattorroKernel = this.dattorroKernel

    let bandwidthClamped: f32
    let dampingClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        bandwidthClamped = clamp(load<f32>(bandwidth$), 0, 1)
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        dattorroKernel.setSampleRate(sampleRate)
        dattorroKernel.process(inputLeft, inputRight, roomClamped, dampingClamped, bandwidthClamped, indiff1Clamped, indiff2Clamped, decdiff1Clamped, decdiff2Clamped, excrateClamped, excdepthClamped, predelayClamped)
        outputLeft = dattorroKernel.outL
        outputRight = dattorroKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        damping$ += 4
        bandwidth$ += 4
      })
    }
  }
}