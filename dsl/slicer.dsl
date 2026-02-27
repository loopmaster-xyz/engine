name: Slicer
description: "Slice-based sample player"
category: "samplers"

import { SlicerKernel, SlicerKernelStereo }

parameters {
  sample    { types: [scalar], unit: "handle", description: "Sample handle from freesound() or record()" }
  speed     { default: 1.0, unit: "multiplier", description: "Playback speed (negative for reverse)" }
  offset    { default: 0.0, unit: "phase", min: 0.0, max: 1.0, description: "Offset phase within slice" }
  slice     { default: 0.0, unit: "fraction", min: 0.0, max: 1.0, description: "Slice index (0..1)" }
  threshold { types: [scalar], default: 0.0, unit: "fraction", min: 0.0, max: 1.0, description: "Slice detection threshold" }
  repeat    { default: 0.0, unit: "boolean", description: "Loop slice when not 0" }
  trig      { description: "Trigger to restart playback" }
}

fields {
  kernel: SlicerKernel = new SlicerKernel()
  kernelStereo: SlicerKernelStereo = new SlicerKernelStereo()
  currentSpeed: f32 = 1.0
  currentRepeat: f32 = 0.0
  slicePosition: f32 = 0.0
  slicePlaying: f32 = 0.0
  slicePrevTrig: f32 = -1.0
  currentSlice: f32 = -1.0
}

emit {
  slicePosition
  slicePlaying
  currentSlice
}

control {
  currentSpeed = speed
  currentRepeat = repeat
  kernel.updateSliceInfo(sample, threshold)
  kernel.setSliceFromNormalized(slice)
  kernel.handleTrigger(trig, speed, offset)
  kernelStereo.left.updateSliceInfo(sample, threshold)
  kernelStereo.left.setSliceFromNormalized(slice)
  kernelStereo.left.handleTrigger(trig, speed, offset)
  kernelStereo.right.updateSliceInfo(sample, threshold)
  kernelStereo.right.setSliceFromNormalized(slice)
  kernelStereo.right.handleTrigger(trig, speed, offset)
}

audio {
  kernel.setSliceFromNormalized(slice)
  shouldTrigger = (trig > 0.0 && slicePrevTrig <= 0.0) ? 1.0 : 0.0
  if shouldTrigger > 0.0 {
    currentSlice = slice
    if currentSpeed < 0.0 && offset == 0.0 {
      slicePosition = f32(kernel.playSliceLength) - 1.0
    } else {
      slicePosition = offset * f32(kernel.playSliceLength)
    }
    slicePlaying = 1.0
  }
  slicePrevTrig = trig

  output = 0.0

  if slicePlaying > 0.0 && kernel.playSliceLength > 0 {
    output = kernel.readSample(sample, 0, slicePosition)
    slicePosition = slicePosition + currentSpeed
    if slicePosition >= f32(kernel.playSliceLength) {
      if currentRepeat > 0.0 {
        slicePosition = 0.0
      } else {
        slicePlaying = 0.0
      }
    }
  }
}

stereo {
  kernelStereo.left.setSliceFromNormalized(slice)
  kernelStereo.right.setSliceFromNormalized(slice)
  outputLeft = 0.0
  outputRight = 0.0

  if slicePlaying > 0.0 && kernelStereo.left.playSliceLength > 0 {
    outputLeft = kernelStereo.left.readSample(sample, 0, slicePosition)
  }

  if slicePlaying > 0.0 && kernelStereo.right.playSliceLength > 0 {
    channel = 1
    if kernelStereo.right.channelCount < 2 {
      channel = 0
    }
    outputRight = kernelStereo.right.readSample(sample, channel, slicePosition)
  }

  if slicePlaying > 0.0 {
    slicePosition = slicePosition + currentSpeed
    if slicePosition >= f32(kernelStereo.left.playSliceLength) {
      if currentRepeat > 0.0 {
        slicePosition = 0.0
      } else {
        slicePlaying = 0.0
      }
    }
  }
}
