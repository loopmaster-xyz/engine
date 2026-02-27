name: Pitchshift
description: "Grain-based pitch shifter (overlap-add)"
category: "effects"

import { PitchShiftKernel }

parameters {
  ratio { default: 1.0, min: 0.01, max: 10.0, unit: "multiplier",
         description: "Pitch ratio (e.g. 2 = one octave up)" }
}

fields {
  kernel: PitchShiftKernel = new PitchShiftKernel()
}

audio {
  output = kernel.process(input, ratio)
}
