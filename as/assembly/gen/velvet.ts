// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, VelvetKernel, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Velvet_default_room_scalar_damping_scalar_decay_scalar {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_scalar_decay_scalar = new Velvet_default_room_scalar_damping_scalar_decay_scalar()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_scalar_decay_scalar.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_scalar_decay_scalar): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, decay: f32): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
      })
    }
  }
}

export class Velvet_default_room_scalar_damping_scalar_decay_audio {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_scalar_decay_audio = new Velvet_default_room_scalar_damping_scalar_decay_audio()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_scalar_decay_audio.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_scalar_decay_audio): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decay$ += 4
      })
    }
  }
}

export class Velvet_default_room_scalar_damping_audio_decay_scalar {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_audio_decay_scalar = new Velvet_default_room_scalar_damping_audio_decay_scalar()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_audio_decay_scalar.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_audio_decay_scalar): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, decay: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
      })
    }
  }
}

export class Velvet_default_room_scalar_damping_audio_decay_audio {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_audio_decay_audio = new Velvet_default_room_scalar_damping_audio_decay_audio()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_audio_decay_audio.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_audio_decay_audio): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping$: usize, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Velvet_default_room_audio_damping_scalar_decay_scalar {
  static readonly defaultInstance: Velvet_default_room_audio_damping_scalar_decay_scalar = new Velvet_default_room_audio_damping_scalar_decay_scalar()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_scalar_decay_scalar.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_scalar_decay_scalar): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, decay: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
      })
    }
  }
}

export class Velvet_default_room_audio_damping_scalar_decay_audio {
  static readonly defaultInstance: Velvet_default_room_audio_damping_scalar_decay_audio = new Velvet_default_room_audio_damping_scalar_decay_audio()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_scalar_decay_audio.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_scalar_decay_audio): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, room$: usize, decay$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        decay$ += 4
      })
    }
  }
}

export class Velvet_default_room_audio_damping_audio_decay_scalar {
  static readonly defaultInstance: Velvet_default_room_audio_damping_audio_decay_scalar = new Velvet_default_room_audio_damping_audio_decay_scalar()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_audio_decay_scalar.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_audio_decay_scalar): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, room$: usize, damping$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
      })
    }
  }
}

export class Velvet_default_room_audio_damping_audio_decay_audio {
  static readonly defaultInstance: Velvet_default_room_audio_damping_audio_decay_audio = new Velvet_default_room_audio_damping_audio_decay_audio()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_audio_decay_audio.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_audio_decay_audio): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room$: usize, damping$: usize, decay$: usize): void {

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        room$ += 4
        damping$ += 4
        decay$ += 4
      })
    }
  }
}

export class Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo = new Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, decay: f32): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_scalar_damping_scalar_decay_audio_stereo {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_scalar_decay_audio_stereo = new Velvet_default_room_scalar_damping_scalar_decay_audio_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_scalar_decay_audio_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_scalar_decay_audio_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_scalar_damping_audio_decay_scalar_stereo {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_audio_decay_scalar_stereo = new Velvet_default_room_scalar_damping_audio_decay_scalar_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_audio_decay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_audio_decay_scalar_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, decay: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let dampingClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_scalar_damping_audio_decay_audio_stereo {
  static readonly defaultInstance: Velvet_default_room_scalar_damping_audio_decay_audio_stereo = new Velvet_default_room_scalar_damping_audio_decay_audio_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_scalar_damping_audio_decay_audio_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_scalar_damping_audio_decay_audio_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping$: usize, decay$: usize): void {
    const roomClamped: f32 = clamp(room, 0.05, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let dampingClamped: f32
    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_audio_damping_scalar_decay_scalar_stereo {
  static readonly defaultInstance: Velvet_default_room_audio_damping_scalar_decay_scalar_stereo = new Velvet_default_room_audio_damping_scalar_decay_scalar_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_scalar_decay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_scalar_decay_scalar_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, decay: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_audio_damping_scalar_decay_audio_stereo {
  static readonly defaultInstance: Velvet_default_room_audio_damping_scalar_decay_audio_stereo = new Velvet_default_room_audio_damping_scalar_decay_audio_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_scalar_decay_audio_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_scalar_decay_audio_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, room$: usize, decay$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let decayClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = clamp(load<f32>(decay$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_audio_damping_audio_decay_scalar_stereo {
  static readonly defaultInstance: Velvet_default_room_audio_damping_audio_decay_scalar_stereo = new Velvet_default_room_audio_damping_audio_decay_scalar_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_audio_decay_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_audio_decay_scalar_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, decay: f32, room$: usize, damping$: usize): void {
    const decayClamped: f32 = clamp(decay, 0, 1)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

    let dampingClamped: f32
    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        dampingClamped = clamp(load<f32>(damping$), 0, 1)
        roomClamped = clamp(load<f32>(room$), 0.05, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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

export class Velvet_default_room_audio_damping_audio_decay_audio_stereo {
  static readonly defaultInstance: Velvet_default_room_audio_damping_audio_decay_audio_stereo = new Velvet_default_room_audio_damping_audio_decay_audio_stereo()

  velvetKernel: VelvetKernel = new VelvetKernel()

  reset(): void {
    this.copyFrom(Velvet_default_room_audio_damping_audio_decay_audio_stereo.defaultInstance)
  }

  copyFrom(src: Velvet_default_room_audio_damping_audio_decay_audio_stereo): void {
    this.velvetKernel.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room$: usize, damping$: usize, decay$: usize): void {

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const velvetKernel: VelvetKernel = this.velvetKernel

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
        velvetKernel.setSampleRate(sampleRate)
        velvetKernel.process(inputLeft, inputRight, (roomClamped * 2), dampingClamped, decayClamped)
        outputLeft = velvetKernel.outL
        outputRight = velvetKernel.outR
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