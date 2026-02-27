// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { SamplerKernel, SamplerKernelStereo, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar = new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, repeat: f32, trig: f32): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSampleInfo(sample)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let prevTrig: f32 = this.prevTrig
    let position: f32 = this.position
    let playing: f32 = this.playing
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SamplerKernel = this.kernel

    let shouldTrigger: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        shouldTrigger = ((trig > 0) && (prevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            position = (f32(kernel.sampleLength) - 1)
          } else {
            position = (offsetClamped * f32(kernel.sampleLength))
          }
          playing = 1
        }
        prevTrig = trig
        output = 0
        if (((playing > 0) && (kernel.sampleLength > 0))) {
          output = kernel.readSample(sample, 0, position)
          position = (position + currentSpeed)
          if ((position >= f32(kernel.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio = new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, repeat: f32, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let prevTrig: f32 = this.prevTrig
    let position: f32 = this.position
    let playing: f32 = this.playing
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SamplerKernel = this.kernel

    let shouldTrigger: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        shouldTrigger = ((trig > 0) && (prevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            position = (f32(kernel.sampleLength) - 1)
          } else {
            position = (offsetClamped * f32(kernel.sampleLength))
          }
          playing = 1
        }
        prevTrig = trig
        output = 0
        if (((playing > 0) && (kernel.sampleLength > 0))) {
          output = kernel.readSample(sample, 0, position)
          position = (position + currentSpeed)
          if ((position >= f32(kernel.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar = new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, repeat: f32, trig: f32, offset$: usize): void {
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let prevTrig: f32 = this.prevTrig
    let position: f32 = this.position
    let playing: f32 = this.playing
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SamplerKernel = this.kernel

    let shouldTrigger: f32

    let offsetClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        shouldTrigger = ((trig > 0) && (prevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            position = (f32(kernel.sampleLength) - 1)
          } else {
            position = (offsetClamped * f32(kernel.sampleLength))
          }
          playing = 1
        }
        prevTrig = trig
        output = 0
        if (((playing > 0) && (kernel.sampleLength > 0))) {
          output = kernel.readSample(sample, 0, position)
          position = (position + currentSpeed)
          if ((position >= f32(kernel.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio = new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, repeat: f32, offset$: usize, trig$: usize): void {
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let prevTrig: f32 = this.prevTrig
    let position: f32 = this.position
    let playing: f32 = this.playing
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SamplerKernel = this.kernel

    let shouldTrigger: f32

    let offsetClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        trig = load<f32>(trig$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        shouldTrigger = ((trig > 0) && (prevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            position = (f32(kernel.sampleLength) - 1)
          } else {
            position = (offsetClamped * f32(kernel.sampleLength))
          }
          playing = 1
        }
        prevTrig = trig
        output = 0
        if (((playing > 0) && (kernel.sampleLength > 0))) {
          output = kernel.readSample(sample, 0, position)
          position = (position + currentSpeed)
          if ((position >= f32(kernel.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo = new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, repeat: f32, trig: f32): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSampleInfo(sample)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let position: f32 = this.position
    let playing: f32 = this.playing
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SamplerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        outputLeft = 0
        outputRight = 0
        if (((playing > 0) && (kernelStereo.left.sampleLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, position)
        }
        if (((playing > 0) && (kernelStereo.right.sampleLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, position)
        }
        if ((playing > 0)) {
          position = (position + currentSpeed)
          if ((position >= f32(kernelStereo.left.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
      })
    }

    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo = new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, repeat: f32, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let position: f32 = this.position
    let playing: f32 = this.playing
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SamplerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        outputLeft = 0
        outputRight = 0
        if (((playing > 0) && (kernelStereo.left.sampleLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, position)
        }
        if (((playing > 0) && (kernelStereo.right.sampleLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, position)
        }
        if ((playing > 0)) {
          position = (position + currentSpeed)
          if ((position >= f32(kernelStereo.left.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        trig$ += 4
      })
    }

    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo = new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, repeat: f32, trig: f32, offset$: usize): void {
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let position: f32 = this.position
    let playing: f32 = this.playing
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SamplerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        outputLeft = 0
        outputRight = 0
        if (((playing > 0) && (kernelStereo.left.sampleLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, position)
        }
        if (((playing > 0) && (kernelStereo.right.sampleLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, position)
        }
        if ((playing > 0)) {
          position = (position + currentSpeed)
          if ((position >= f32(kernelStereo.left.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
      })
    }

    this.position = position
    this.playing = playing
  }
}

export class Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo = new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo()

  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  position: f32 = 0
  playing: f32 = 0
  prevTrig: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.position = src.position
    this.playing = src.playing
    this.prevTrig = src.prevTrig
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, repeat: f32, offset$: usize, trig$: usize): void {
    const speedChanged: boolean = speed !== this.lastSpeed
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSampleInfo(sample)
    this.kernelStereo.left.updateSampleInfo(sample)
    this.kernelStereo.right.updateSampleInfo(sample)

    let position: f32 = this.position
    let playing: f32 = this.playing
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SamplerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        outputLeft = 0
        outputRight = 0
        if (((playing > 0) && (kernelStereo.left.sampleLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, position)
        }
        if (((playing > 0) && (kernelStereo.right.sampleLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, position)
        }
        if ((playing > 0)) {
          position = (position + currentSpeed)
          if ((position >= f32(kernelStereo.left.sampleLength))) {
            if ((currentRepeat > 0)) {
              position = 0
            } else {
              playing = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.position = position
    this.playing = playing
  }
}