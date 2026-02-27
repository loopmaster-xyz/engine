// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { SlicerKernel, SlicerKernelStereo, TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig: f32): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, trig: f32, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentRepeat = load<f32>(repeat$)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, repeat: f32, trig: f32, slice$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        slice$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, repeat: f32, slice$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, trig: f32, slice$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, slice$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, offset$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let offsetClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, repeat: f32, offset$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

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
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, trig: f32, offset$: usize, repeat$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let offsetClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, offset$: usize, repeat$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let offsetClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        trig = load<f32>(trig$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, threshold: f32, repeat: f32, trig: f32, offset$: usize, slice$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let offsetClamped: f32
    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        slice$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, threshold: f32, repeat: f32, offset$: usize, slice$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let offsetClamped: f32
    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, threshold: f32, trig: f32, offset$: usize, slice$: usize, repeat$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let offsetClamped: f32
    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, speed: f32, threshold: f32, offset$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentRepeat: f32

    let offsetClamped: f32
    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, speed$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, trig: f32, speed$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, speed$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, slice$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        slice$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, threshold: f32, repeat: f32, speed$: usize, slice$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, threshold: f32, trig: f32, speed$: usize, slice$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, offset: f32, threshold: f32, speed$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, offset$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let offsetClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, slice: f32, threshold: f32, repeat: f32, speed$: usize, offset$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let offsetClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, slice: f32, threshold: f32, trig: f32, speed$: usize, offset$: usize, repeat$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let offsetClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, slice: f32, threshold: f32, speed$: usize, offset$: usize, repeat$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let offsetClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, offset$: usize, slice$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let offsetClamped: f32
    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, threshold: f32, repeat: f32, speed$: usize, offset$: usize, slice$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32

    let offsetClamped: f32
    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, threshold: f32, trig: f32, speed$: usize, offset$: usize, slice$: usize, repeat$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let offsetClamped: f32
    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sample: f32, threshold: f32, speed$: usize, offset$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePrevTrig: f32 = this.slicePrevTrig
    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let currentSlice: f32 = this.currentSlice
    let output: f32
    const kernel: SlicerKernel = this.kernel

    let shouldTrigger: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let offsetClamped: f32
    let sliceClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        offsetClamped = clamp(load<f32>(offset$), 0, 1)
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        trig = load<f32>(trig$)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernel.setSliceFromNormalized(sliceClamped)
        shouldTrigger = ((trig > 0) && (slicePrevTrig <= 0)) ? 1 : 0
        if ((shouldTrigger > 0)) {
          currentSlice = sliceClamped
          if (((currentSpeed < 0) && (offsetClamped == 0))) {
            slicePosition = (f32(kernel.playSliceLength) - 1)
          } else {
            slicePosition = (offsetClamped * f32(kernel.playSliceLength))
          }
          slicePlaying = 1
        }
        slicePrevTrig = trig
        output = 0
        if (((slicePlaying > 0) && (kernel.playSliceLength > 0))) {
          output = kernel.readSample(sample, 0, slicePosition)
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernel.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(output$, output)
        output$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePrevTrig = slicePrevTrig
    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
    this.currentSlice = currentSlice
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig: f32): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
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

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, trig: f32, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentRepeat = load<f32>(repeat$)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, slice: f32, threshold: f32, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, repeat: f32, trig: f32, slice$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        slice$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, repeat: f32, slice$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, trig: f32, slice$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.handleTrigger(trig, speed, offsetClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.handleTrigger(trig, speed, offsetClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, offset: f32, threshold: f32, slice$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, offset$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
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

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, repeat: f32, offset$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
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

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, trig: f32, offset$: usize, repeat$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, slice: f32, threshold: f32, offset$: usize, repeat$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, threshold: f32, repeat: f32, trig: f32, offset$: usize, slice$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        slice$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, threshold: f32, repeat: f32, offset$: usize, slice$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
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

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, threshold: f32, trig: f32, offset$: usize, slice$: usize, repeat$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastSpeed: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastSpeed = src.lastSpeed
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, speed: f32, threshold: f32, offset$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const speedChanged: boolean = speed !== this.lastSpeed


    if (speedChanged) {
      this.currentSpeed = speed
      this.lastSpeed = speed
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentSpeed: f32 = this.currentSpeed
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), currentSpeed, clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, repeat: f32, speed$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, trig: f32, speed$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, slice: f32, threshold: f32, speed$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, slice$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        slice$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, threshold: f32, repeat: f32, speed$: usize, slice$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, threshold: f32, trig: f32, speed$: usize, slice$: usize, repeat$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, offset: f32, threshold: f32, speed$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const offsetClamped: f32 = clamp(offset, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), offsetClamped)
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, slice: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, offset$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, slice: f32, threshold: f32, repeat: f32, speed$: usize, offset$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernel.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.setSliceFromNormalized(sliceClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.setSliceFromNormalized(sliceClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, slice: f32, threshold: f32, trig: f32, speed$: usize, offset$: usize, repeat$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, slice: f32, threshold: f32, speed$: usize, offset$: usize, repeat$: usize, trig$: usize): void {
    const sliceClamped: f32 = clamp(slice, 0, 1)
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, threshold: f32, repeat: f32, trig: f32, speed$: usize, offset$: usize, slice$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1
  lastRepeat: f32 = Infinity

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
    this.lastRepeat = src.lastRepeat
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, threshold: f32, repeat: f32, speed$: usize, offset$: usize, slice$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)
    const repeatChanged: boolean = repeat !== this.lastRepeat


    if (repeatChanged) {
      this.currentRepeat = repeat
      this.lastRepeat = repeat
    }

    this.kernel.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.left.updateSliceInfo(sample, thresholdClamped)
    this.kernelStereo.right.updateSliceInfo(sample, thresholdClamped)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    let currentRepeat: f32 = this.currentRepeat
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, threshold: f32, trig: f32, speed$: usize, offset$: usize, slice$: usize, repeat$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(trig, load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}

export class Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo {
  static readonly defaultInstance: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo = new Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo()

  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1
  currentRepeat: f32 = 0
  slicePosition: f32 = 0
  slicePlaying: f32 = 0
  slicePrevTrig: f32 =-1
  currentSlice: f32 =-1

  reset(): void {
    this.copyFrom(Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo.defaultInstance)
  }

  copyFrom(src: Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo): void {
    this.kernel.reset()
    this.kernelStereo.reset()
    this.currentSpeed = src.currentSpeed
    this.currentRepeat = src.currentRepeat
    this.slicePosition = src.slicePosition
    this.slicePlaying = src.slicePlaying
    this.slicePrevTrig = src.slicePrevTrig
    this.currentSlice = src.currentSlice
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, inputLeft$: usize, inputRight$: usize, outputLeft$: usize, outputRight$: usize, sample: f32, threshold: f32, speed$: usize, offset$: usize, slice$: usize, repeat$: usize, trig$: usize): void {
    const thresholdClamped: f32 = clamp(threshold, 0, 1)

    let slicePosition: f32 = this.slicePosition
    let slicePlaying: f32 = this.slicePlaying
    let outputLeft: f32
    let outputRight: f32
    const kernelStereo: SlicerKernelStereo = this.kernelStereo

    let channel: f32

    let currentSpeed: f32
    let currentRepeat: f32

    let sliceClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sliceClamped = clamp(load<f32>(slice$), 0, 1)
        currentSpeed = load<f32>(speed$)
        currentRepeat = load<f32>(repeat$)
        this.kernel.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernel.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.left.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.left.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        this.kernelStereo.right.setSliceFromNormalized(clamp(load<f32>(slice$), 0, 1))
        this.kernelStereo.right.handleTrigger(load<f32>(trig$), load<f32>(speed$), clamp(load<f32>(offset$), 0, 1))
        kernelStereo.left.setSliceFromNormalized(sliceClamped)
        kernelStereo.right.setSliceFromNormalized(sliceClamped)
        outputLeft = 0
        outputRight = 0
        if (((slicePlaying > 0) && (kernelStereo.left.playSliceLength > 0))) {
          outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
        }
        if (((slicePlaying > 0) && (kernelStereo.right.playSliceLength > 0))) {
          channel = 1
          if ((kernelStereo.right.channelCount < 2)) {
            channel = 0
          }
          outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
        }
        if ((slicePlaying > 0)) {
          slicePosition = (slicePosition + currentSpeed)
          if ((slicePosition >= f32(kernelStereo.left.playSliceLength))) {
            if ((currentRepeat > 0)) {
              slicePosition = 0
            } else {
              slicePlaying = 0
            }
          }
        }
        store<f32>(outputLeft$, outputLeft)
        store<f32>(outputRight$, outputRight)
        outputLeft$ += 4
        outputRight$ += 4
        speed$ += 4
        offset$ += 4
        slice$ += 4
        repeat$ += 4
        trig$ += 4
      })
    }

    this.slicePosition = slicePosition
    this.slicePlaying = slicePlaying
  }
}