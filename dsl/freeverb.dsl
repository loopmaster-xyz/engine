name: Freeverb
description: "Freeverb reverb"
category: "effects"

import { FreeverbKernel, FreeverbKernelStereo }

parameters {
  room { default: 0.5, min: 0, max: 1, unit: "normal",
             description: "Room size" }
  damping  { default: 0.5, min: 0, max: 1,
             description: "Damping", unit: "normal" }
}

constants {
  INPUT_SCALE = 0.015
  OUTPUT_SCALE = 3
}

fields {
  freeverbKernel: FreeverbKernel = new FreeverbKernel()
  freeverbKernelStereo: FreeverbKernelStereo = new FreeverbKernelStereo()
}

control {
  freeverbKernel.setSampleRate(sampleRate)
  freeverbKernelStereo.left.setSampleRate(sampleRate)
  freeverbKernelStereo.right.setSampleRate(sampleRate)
  damping1 = damping
  damping2 = 1.0 - damping1
}

audio {
  inputScaled = input * INPUT_SCALE

  sum = 0.0

  for comb in freeverbKernel.combs {
    sum += comb.process(inputScaled, room, damping1, damping2)
  }

  out = sum / 8

  for allpass in freeverbKernel.allpasses {
    out = allpass.process(out)
  }

  output = out * OUTPUT_SCALE
}

stereo {
  inputScaledLeft = inputLeft * INPUT_SCALE
  inputScaledRight = inputRight * INPUT_SCALE

  // Left channel
  sum = 0.0

  for comb in freeverbKernelStereo.left.combs {
    sum += comb.process(inputScaledLeft, room, damping1, damping2)
  }

  outLeft = sum / 8

  for allpass in freeverbKernelStereo.left.allpasses {
    outLeft = allpass.process(outLeft)
  }

  outputLeft = outLeft * OUTPUT_SCALE

  // Right channel
  sum = 0.0

  for comb in freeverbKernelStereo.right.combs {
    sum += comb.process(inputScaledRight, room, damping1, damping2)
  }

  outRight = sum / 8

  for allpass in freeverbKernelStereo.right.allpasses {
    outRight = allpass.process(outRight)
  }

  outputRight = outRight * OUTPUT_SCALE
}
