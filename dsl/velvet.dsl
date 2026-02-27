name: Velvet
description: "Velvet noise stereo reverb (prime-based delay lines)"
category: "effects"

import { VelvetKernel }

parameters {
  room { default: 0.5, min: 0.05, max: 1.0, unit: "normal",
             description: "Room size" }
  damping  { default: 0.5, min: 0, max: 1,
             description: "High-frequency damping", unit: "normal" }
  decay    { default: 0.5, min: 0, max: 1,
             description: "Decay / feedback", unit: "normal" }
}

fields {
  velvetKernel: VelvetKernel = new VelvetKernel()
}

control {
  velvetKernel.setSampleRate(sampleRate)
}

stereo {
  velvetKernel.setSampleRate(sampleRate)
  velvetKernel.process(inputLeft, inputRight, room * 2.0, damping, decay)
  outputLeft = velvetKernel.outL
  outputRight = velvetKernel.outR
}
