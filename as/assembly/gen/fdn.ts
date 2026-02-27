// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { FdnKernel, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar = new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, decay: f32, depth: f32): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio = new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, decay: f32, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar = new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, depth: f32, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio = new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, decay$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar = new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, decay: f32, depth: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio = new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, decay: f32, damping$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar = new Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, depth: f32, damping$: usize, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio = new Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping$: usize, decay$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar = new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, decay: f32, depth: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio = new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, decay: f32, room$: usize, depth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar = new Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, depth: f32, room$: usize, decay$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio = new Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, room$: usize, decay$: usize, depth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar = new Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, depth: f32, room$: usize, damping$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio = new Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, room$: usize, damping$: usize, depth$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar = new Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, depth: f32, room$: usize, damping$: usize, decay$: usize): void {
    const depthClamped: f32 = clamp(depth, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_audio_depth_audio {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio = new Fdn_default_room_audio_damping_audio_decay_audio_depth_audio()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_audio_depth_audio.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room$: usize, damping$: usize, decay$: usize, depth$: usize): void {

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo = new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, decay: f32, depth: f32): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
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

export class Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo = new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, decay: f32, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let depthClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo = new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, depth: f32, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo = new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, decay$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let decayClamped: f32
    let depthClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo = new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, decay: f32, depth: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
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

export class Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo = new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, decay: f32, damping$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let depthClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        damping$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo = new Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, depth: f32, damping$: usize, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo = new Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping$: usize, decay$: usize, depth$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let decayClamped: f32
    let depthClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        damping$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo = new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, decay: f32, depth: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
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

export class Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo = new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, decay: f32, room$: usize, depth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let depthClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo = new Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, depth: f32, room$: usize, decay$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let decayClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo = new Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, room$: usize, decay$: usize, depth$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let decayClamped: f32
    let depthClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo = new Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, decay: f32, depth: f32, room$: usize, damping$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
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

export class Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo = new Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, decay: f32, room$: usize, damping$: usize, depth$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let depthClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        damping$ += 4
        depth$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo = new Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, depth: f32, room$: usize, damping$: usize, decay$: usize): void {
    const depthClamped: f32 = clamp(depth, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let decayClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo {
  static readonly defaultInstance: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo = new Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo()

  fdnKernel: FdnKernel = new FdnKernel()

  reset(): void {
    this.copyFrom(Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo.defaultInstance)
  }

  copyFrom(src: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo): void {
    this.fdnKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room$: usize, damping$: usize, decay$: usize, depth$: usize): void {

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const fdnKernel: FdnKernel = this.fdnKernel

    let dampingClamped: f32
    let decayClamped: f32
    let depthClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        depthClamped = clamp(load<f32>(depth$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        fdnKernel.setSampleRate(sampleRate)
        fdnKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped, depthClamped)
        outputLeft = fdnKernel.outL
        outputRight = fdnKernel.outR
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        inputLeft$ += 4
        inputRight$ += 4
        outputLeft$ += 4
        outputRight$ += 4
        room$ += 4
        damping$ += 4
        decay$ += 4
        depth$ += 4
      })
    }
  }
}