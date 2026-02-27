name: Dattorro
description: "Dattorro-style stereo reverb (modulated tank)"
category: "effects"

import { DattorroKernel }

parameters {
  room { default: 0.5, min: 0, max: 1,
             description: "Room size / decay", unit: "normal" }
  damping  { default: 0.5, min: 0, max: 1,
             description: "High-frequency damping", unit: "normal" }
  bandwidth { default: 0.5, min: 0, max: 1,
              description: "Input bandwidth", unit: "normal" }
  indiff1 { default: 0.75, types: [scalar], min: 0, max: 1,
                    description: "Input diffusion 1", unit: "normal" }
  indiff2 { default: 0.625, types: [scalar], min: 0, max: 1,
                   description: "Input diffusion 2", unit: "normal" }
  decdiff1 { default: 0.7, types: [scalar], min: 0, max: 1,
                   description: "Decay diffusion 1", unit: "normal" }
  decdiff2 { default: 0.5, types: [scalar], min: 0, max: 1,
                   description: "Decay diffusion 2", unit: "normal" }
  excrate { default: 0.5, types: [scalar], min: 0, max: 1,
                 description: "Modulation rate", unit: "normal" }
  excdepth { default: 0.5, types: [scalar], min: 0, max: 1,
                  description: "Modulation depth", unit: "normal" }
  predelay { default: 0, types: [scalar], min: 0, max: 1,
            description: "Pre-delay", unit: "s" }
}

fields {
  dattorroKernel: DattorroKernel = new DattorroKernel()
}

control {
  dattorroKernel.setSampleRate(sampleRate)
}

stereo {
  dattorroKernel.setSampleRate(sampleRate)
  dattorroKernel.process(inputLeft, inputRight, room, damping, bandwidth, indiff1, indiff2, decdiff1, decdiff2, excrate, excdepth, predelay)
  outputLeft = dattorroKernel.outL
  outputRight = dattorroKernel.outR
}
