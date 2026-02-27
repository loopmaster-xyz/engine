name: Compressor
description: "Dynamic range compressor with soft knee"
category: "mixing"

import { CompressorKernel }

parameters {
  attack   { default: 0.003, min: 0.0001, max: 1.0, unit: "s",
             description: "Attack time" }
  release  { default: 0.1,   min: 0.0001, max: 5.0, unit: "s",
             description: "Release time" }
  threshold { default: -12,  min: -80, max: 0, unit: "dB",
              description: "Threshold in dB" }
  ratio    { default: 4.0,   min: 1.0, max: 20.0,
             description: "Compression ratio" }
  knee     { default: 6.0,   min: 0, max: 40, unit: "dB",
             description: "Knee width in dB" }
  key      { description: "Key/sidechain input (unpatched = use input as key)" }
}

fields {
  compressorKernel: CompressorKernel = new CompressorKernel()
  inputLevel: f32 = 0.0
  gainReduction: f32 = 0.0
  prevSampleRate: f32 = 0.0
}

emit {
  inputLevel
  gainReduction
}

control {
  if sampleRate {
    compressorKernel.setSampleRate(sampleRate)
  }
}

audio {
  output = compressorKernel.process(input, key, attack, release, threshold, ratio, knee)
  inputLevel = compressorKernel.inputLevel
  gainReduction = compressorKernel.gainReduction
}
