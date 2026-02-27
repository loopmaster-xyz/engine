// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { FreeverbKernel, FreeverbKernelStereo, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'
export const INPUT_SCALE: f32 = f32(0.015)
export const OUTPUT_SCALE: f32 = f32(3)

export class Freeverb_default_room_scalar_damping_scalar {
  static readonly defaultInstance: Freeverb_default_room_scalar_damping_scalar = new Freeverb_default_room_scalar_damping_scalar()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()
  lastDamping: f32 = Infinity
  damping1: f32
  damping2: f32

  reset(): void {
    this.copyFrom(Freeverb_default_room_scalar_damping_scalar.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_scalar_damping_scalar): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
    this.lastDamping = src.lastDamping
    this.damping1 = src.damping1
    this.damping2 = src.damping2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping: f32): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const dampingChanged: boolean = dampingClamped !== this.lastDamping


    if (dampingChanged) {
      this.damping1 = dampingClamped
      this.damping2 = (1 - this.damping1)
      this.lastDamping = dampingClamped
    }

    this.freeverbKernel.setSampleRate(sampleRate)
    this.freeverbKernelStereo.left.setSampleRate(sampleRate)
    this.freeverbKernelStereo.right.setSampleRate(sampleRate)

    let input: f32
    let output: f32
    let damping1: f32 = this.damping1
    let damping2: f32 = this.damping2
    const freeverbKernel: FreeverbKernel = this.freeverbKernel

    let inputScaled: f32
    let out: f32
    let sum: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        inputScaled = (input * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernel.combs.length; i++) {
          const comb = freeverbKernel.combs[i]
          sum = (sum + comb.process(inputScaled, roomClamped, damping1, damping2))
        }
        out = (sum / 8)
        for (let i = 0; i < freeverbKernel.allpasses.length; i++) {
          const allpass = freeverbKernel.allpasses[i]
          out = allpass.process(out)
        }
        output = (out * OUTPUT_SCALE)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }
  }
}

export class Freeverb_default_room_scalar_damping_audio {
  static readonly defaultInstance: Freeverb_default_room_scalar_damping_audio = new Freeverb_default_room_scalar_damping_audio()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()

  reset(): void {
    this.copyFrom(Freeverb_default_room_scalar_damping_audio.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_scalar_damping_audio): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)

    let damping1: f32 = 0
    let damping2: f32 = 0

    let input: f32
    let output: f32
    const freeverbKernel: FreeverbKernel = this.freeverbKernel

    let inputScaled: f32
    let out: f32
    let sum: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        damping1 = clamp(load<f32>(damping$), 0, 1)
        damping2 = (1 - damping1)
        inputScaled = (input * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernel.combs.length; i++) {
          const comb = freeverbKernel.combs[i]
          sum = (sum + comb.process(inputScaled, roomClamped, damping1, damping2))
        }
        out = (sum / 8)
        for (let i = 0; i < freeverbKernel.allpasses.length; i++) {
          const allpass = freeverbKernel.allpasses[i]
          out = allpass.process(out)
        }
        output = (out * OUTPUT_SCALE)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        damping$ += 4
      })
    }
  }
}

export class Freeverb_default_room_audio_damping_scalar {
  static readonly defaultInstance: Freeverb_default_room_audio_damping_scalar = new Freeverb_default_room_audio_damping_scalar()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()
  lastDamping: f32 = Infinity
  damping1: f32
  damping2: f32

  reset(): void {
    this.copyFrom(Freeverb_default_room_audio_damping_scalar.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_audio_damping_scalar): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
    this.lastDamping = src.lastDamping
    this.damping1 = src.damping1
    this.damping2 = src.damping2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, damping: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const dampingChanged: boolean = dampingClamped !== this.lastDamping


    if (dampingChanged) {
      this.damping1 = dampingClamped
      this.damping2 = (1 - this.damping1)
      this.lastDamping = dampingClamped
    }

    this.freeverbKernel.setSampleRate(sampleRate)
    this.freeverbKernelStereo.left.setSampleRate(sampleRate)
    this.freeverbKernelStereo.right.setSampleRate(sampleRate)

    let input: f32
    let output: f32
    let damping1: f32 = this.damping1
    let damping2: f32 = this.damping2
    const freeverbKernel: FreeverbKernel = this.freeverbKernel

    let inputScaled: f32
    let out: f32
    let sum: f32

    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0, 1)
        input = load<f32>(input$)
        inputScaled = (input * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernel.combs.length; i++) {
          const comb = freeverbKernel.combs[i]
          sum = (sum + comb.process(inputScaled, roomClamped, damping1, damping2))
        }
        out = (sum / 8)
        for (let i = 0; i < freeverbKernel.allpasses.length; i++) {
          const allpass = freeverbKernel.allpasses[i]
          out = allpass.process(out)
        }
        output = (out * OUTPUT_SCALE)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        room$ += 4
      })
    }
  }
}

export class Freeverb_default_room_audio_damping_audio {
  static readonly defaultInstance: Freeverb_default_room_audio_damping_audio = new Freeverb_default_room_audio_damping_audio()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()

  reset(): void {
    this.copyFrom(Freeverb_default_room_audio_damping_audio.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_audio_damping_audio): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, room$: usize, damping$: usize): void {

    let damping1: f32 = 0
    let damping2: f32 = 0

    let input: f32
    let output: f32
    const freeverbKernel: FreeverbKernel = this.freeverbKernel

    let inputScaled: f32
    let out: f32
    let sum: f32


    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0, 1)
        input = load<f32>(input$)
        damping1 = clamp(load<f32>(damping$), 0, 1)
        damping2 = (1 - damping1)
        inputScaled = (input * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernel.combs.length; i++) {
          const comb = freeverbKernel.combs[i]
          sum = (sum + comb.process(inputScaled, roomClamped, damping1, damping2))
        }
        out = (sum / 8)
        for (let i = 0; i < freeverbKernel.allpasses.length; i++) {
          const allpass = freeverbKernel.allpasses[i]
          out = allpass.process(out)
        }
        output = (out * OUTPUT_SCALE)
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        room$ += 4
        damping$ += 4
      })
    }
  }
}

export class Freeverb_default_room_scalar_damping_scalar_stereo {
  static readonly defaultInstance: Freeverb_default_room_scalar_damping_scalar_stereo = new Freeverb_default_room_scalar_damping_scalar_stereo()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()
  lastDamping: f32 = Infinity
  damping1: f32
  damping2: f32

  reset(): void {
    this.copyFrom(Freeverb_default_room_scalar_damping_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_scalar_damping_scalar_stereo): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
    this.lastDamping = src.lastDamping
    this.damping1 = src.damping1
    this.damping2 = src.damping2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping: f32): void {
    const roomClamped: f32 = clamp(room, 0, 1)
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const dampingChanged: boolean = dampingClamped !== this.lastDamping


    if (dampingChanged) {
      this.damping1 = dampingClamped
      this.damping2 = (1 - this.damping1)
      this.lastDamping = dampingClamped
    }

    this.freeverbKernel.setSampleRate(sampleRate)
    this.freeverbKernelStereo.left.setSampleRate(sampleRate)
    this.freeverbKernelStereo.right.setSampleRate(sampleRate)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    let damping1: f32 = this.damping1
    let damping2: f32 = this.damping2
    const freeverbKernelStereo: FreeverbKernelStereo = this.freeverbKernelStereo

    let inputScaledLeft: f32
    let inputScaledRight: f32
    let outLeft: f32
    let outRight: f32
    let sum: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        inputScaledLeft = (inputLeft * INPUT_SCALE)
        inputScaledRight = (inputRight * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.left.combs.length; i++) {
          const comb = freeverbKernelStereo.left.combs[i]
          sum = (sum + comb.process(inputScaledLeft, roomClamped, damping1, damping2))
        }
        outLeft = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.left.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.left.allpasses[i]
          outLeft = allpass.process(outLeft)
        }
        outputLeft = (outLeft * OUTPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.right.combs.length; i++) {
          const comb = freeverbKernelStereo.right.combs[i]
          sum = (sum + comb.process(inputScaledRight, roomClamped, damping1, damping2))
        }
        outRight = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.right.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.right.allpasses[i]
          outRight = allpass.process(outRight)
        }
        outputRight = (outRight * OUTPUT_SCALE)
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

export class Freeverb_default_room_scalar_damping_audio_stereo {
  static readonly defaultInstance: Freeverb_default_room_scalar_damping_audio_stereo = new Freeverb_default_room_scalar_damping_audio_stereo()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()

  reset(): void {
    this.copyFrom(Freeverb_default_room_scalar_damping_audio_stereo.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_scalar_damping_audio_stereo): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room: f32, damping$: usize): void {
    const roomClamped: f32 = clamp(room, 0, 1)

    let damping1: f32 = 0
    let damping2: f32 = 0

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const freeverbKernelStereo: FreeverbKernelStereo = this.freeverbKernelStereo

    let inputScaledLeft: f32
    let inputScaledRight: f32
    let outLeft: f32
    let outRight: f32
    let sum: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        damping1 = clamp(load<f32>(damping$), 0, 1)
        damping2 = (1 - damping1)
        inputScaledLeft = (inputLeft * INPUT_SCALE)
        inputScaledRight = (inputRight * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.left.combs.length; i++) {
          const comb = freeverbKernelStereo.left.combs[i]
          sum = (sum + comb.process(inputScaledLeft, roomClamped, damping1, damping2))
        }
        outLeft = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.left.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.left.allpasses[i]
          outLeft = allpass.process(outLeft)
        }
        outputLeft = (outLeft * OUTPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.right.combs.length; i++) {
          const comb = freeverbKernelStereo.right.combs[i]
          sum = (sum + comb.process(inputScaledRight, roomClamped, damping1, damping2))
        }
        outRight = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.right.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.right.allpasses[i]
          outRight = allpass.process(outRight)
        }
        outputRight = (outRight * OUTPUT_SCALE)
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

export class Freeverb_default_room_audio_damping_scalar_stereo {
  static readonly defaultInstance: Freeverb_default_room_audio_damping_scalar_stereo = new Freeverb_default_room_audio_damping_scalar_stereo()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()
  lastDamping: f32 = Infinity
  damping1: f32
  damping2: f32

  reset(): void {
    this.copyFrom(Freeverb_default_room_audio_damping_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_audio_damping_scalar_stereo): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
    this.lastDamping = src.lastDamping
    this.damping1 = src.damping1
    this.damping2 = src.damping2
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, damping: f32, room$: usize): void {
    const dampingClamped: f32 = clamp(damping, 0, 1)
    const dampingChanged: boolean = dampingClamped !== this.lastDamping


    if (dampingChanged) {
      this.damping1 = dampingClamped
      this.damping2 = (1 - this.damping1)
      this.lastDamping = dampingClamped
    }

    this.freeverbKernel.setSampleRate(sampleRate)
    this.freeverbKernelStereo.left.setSampleRate(sampleRate)
    this.freeverbKernelStereo.right.setSampleRate(sampleRate)

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    let damping1: f32 = this.damping1
    let damping2: f32 = this.damping2
    const freeverbKernelStereo: FreeverbKernelStereo = this.freeverbKernelStereo

    let inputScaledLeft: f32
    let inputScaledRight: f32
    let outLeft: f32
    let outRight: f32
    let sum: f32

    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        inputScaledLeft = (inputLeft * INPUT_SCALE)
        inputScaledRight = (inputRight * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.left.combs.length; i++) {
          const comb = freeverbKernelStereo.left.combs[i]
          sum = (sum + comb.process(inputScaledLeft, roomClamped, damping1, damping2))
        }
        outLeft = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.left.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.left.allpasses[i]
          outLeft = allpass.process(outLeft)
        }
        outputLeft = (outLeft * OUTPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.right.combs.length; i++) {
          const comb = freeverbKernelStereo.right.combs[i]
          sum = (sum + comb.process(inputScaledRight, roomClamped, damping1, damping2))
        }
        outRight = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.right.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.right.allpasses[i]
          outRight = allpass.process(outRight)
        }
        outputRight = (outRight * OUTPUT_SCALE)
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

export class Freeverb_default_room_audio_damping_audio_stereo {
  static readonly defaultInstance: Freeverb_default_room_audio_damping_audio_stereo = new Freeverb_default_room_audio_damping_audio_stereo()

  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()

  reset(): void {
    this.copyFrom(Freeverb_default_room_audio_damping_audio_stereo.defaultInstance)
  }

  copyFrom(src: Freeverb_default_room_audio_damping_audio_stereo): void {
    this.freeverbKernel.reset()
    this.freeverbKernelStereo.reset()
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, room$: usize, damping$: usize): void {

    let damping1: f32 = 0
    let damping2: f32 = 0

    let inputLeft: f32
    let inputRight: f32
    let outputLeft: f32
    let outputRight: f32
    const freeverbKernelStereo: FreeverbKernelStereo = this.freeverbKernelStereo

    let inputScaledLeft: f32
    let inputScaledRight: f32
    let outLeft: f32
    let outRight: f32
    let sum: f32


    let roomClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        roomClamped = clamp(load<f32>(room$), 0, 1)
        inputLeft = load<f32>(inputLeft$)
        inputRight = load<f32>(inputRight$)
        damping1 = clamp(load<f32>(damping$), 0, 1)
        damping2 = (1 - damping1)
        inputScaledLeft = (inputLeft * INPUT_SCALE)
        inputScaledRight = (inputRight * INPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.left.combs.length; i++) {
          const comb = freeverbKernelStereo.left.combs[i]
          sum = (sum + comb.process(inputScaledLeft, roomClamped, damping1, damping2))
        }
        outLeft = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.left.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.left.allpasses[i]
          outLeft = allpass.process(outLeft)
        }
        outputLeft = (outLeft * OUTPUT_SCALE)
        sum = 0
        for (let i = 0; i < freeverbKernelStereo.right.combs.length; i++) {
          const comb = freeverbKernelStereo.right.combs[i]
          sum = (sum + comb.process(inputScaledRight, roomClamped, damping1, damping2))
        }
        outRight = (sum / 8)
        for (let i = 0; i < freeverbKernelStereo.right.allpasses.length; i++) {
          const allpass = freeverbKernelStereo.right.allpasses[i]
          outRight = allpass.process(outRight)
        }
        outputRight = (outRight * OUTPUT_SCALE)
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