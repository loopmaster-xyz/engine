name: Fdn
description: "Feedback delay network reverb (8-line Hadamard, modulated)"
category: "effects"

import { FdnKernel }

parameters {
  room { default: 0.5, min: 0.05, max: 1.0, unit: "normal",
             description: "Room size" }
  damping  { default: 0.5, min: 0, max: 1, unit: "normal",
             description: "High-frequency damping" }
  decay    { default: 0.5, min: 0, max: 1, unit: "normal",
             description: "Decay / feedback" }
  depth { default: 0.5, min: 0, max: 1, unit: "normal",
                    description: "Delay modulation depth" }
}

fields {
  fdnKernel: FdnKernel = new FdnKernel()
}

control {
  fdnKernel.setSampleRate(sampleRate)
}

stereo {
  fdnKernel.setSampleRate(sampleRate)
  fdnKernel.process(inputLeft, inputRight, room * 2.0, damping, decay, depth)
  outputLeft = fdnKernel.outL
  outputRight = fdnKernel.outR
}
