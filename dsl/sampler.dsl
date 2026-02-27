name: Sampler
description: "Sample player"
category: "samplers"

import { SamplerKernel, SamplerKernelStereo }

parameters {
  sample { types: [scalar], description: "Sample handle from freesound() or record()" }
  speed  { types: [scalar], default: 1.0, description: "Playback speed (negative for reverse)" }
  offset { default: 0.0, min: 0.0, max: 1.0, description: "Normalized start offset" }
  repeat { types: [scalar], default: 0.0, description: "Loop sample when > 0" }
  trig   { description: "Trigger to restart playback" }
}

fields {
  kernel: SamplerKernel = new SamplerKernel()
  kernelStereo: SamplerKernelStereo = new SamplerKernelStereo()
  currentSpeed: f32 = 1.0
  currentRepeat: f32 = 0.0
  position: f32 = 0.0
  playing: f32 = 0.0
  prevTrig: f32 = -1.0
}

emit {
  position
  playing
}

control {
  currentSpeed = speed
  currentRepeat = repeat
  kernel.updateSampleInfo(sample)
  kernel.handleTrigger(trig, speed, offset)
  kernelStereo.left.updateSampleInfo(sample)
  kernelStereo.left.handleTrigger(trig, speed, offset)
  kernelStereo.right.updateSampleInfo(sample)
  kernelStereo.right.handleTrigger(trig, speed, offset)
}

audio {
  shouldTrigger = (trig > 0.0 && prevTrig <= 0.0) ? 1.0 : 0.0
  if shouldTrigger > 0.0 {
    if currentSpeed < 0.0 && offset == 0.0 {
      position = f32(kernel.sampleLength) - 1.0
    } else {
      position = offset * f32(kernel.sampleLength)
    }
    playing = 1.0
  }
  prevTrig = trig

  output = 0.0

  if playing > 0.0 && kernel.sampleLength > 0 {
    output = kernel.readSample(sample, 0, position)
    position = position + currentSpeed
    if position >= f32(kernel.sampleLength) {
      if currentRepeat > 0.0 {
        position = 0.0
      } else {
        playing = 0.0
      }
    }
  }
}

stereo {
  outputLeft = 0.0
  outputRight = 0.0

  if playing > 0.0 && kernelStereo.left.sampleLength > 0 {
    outputLeft = kernelStereo.left.readSample(sample, 0, position)
  }

  if playing > 0.0 && kernelStereo.right.sampleLength > 0 {
    channel = 1
    if kernelStereo.right.channelCount < 2 {
      channel = 0
    }
    outputRight = kernelStereo.right.readSample(sample, channel, position)
  }

  if playing > 0.0 {
    position = position + currentSpeed
    if position >= f32(kernelStereo.left.sampleLength) {
      if currentRepeat > 0.0 {
        position = 0.0
      } else {
        playing = 0.0
      }
    }
  }
}
