name: Limiter
description: "Peak limiter with release smoothing"
category: "mixing"

import { abs, exp, log10, sign }

parameters {
  threshold { default: 0, min: -80, max: 0, unit: "dB",
              description: "Limit threshold in dB" }
  release   { default: 0.1, min: 0.0001, max: 5.0, unit: "s",
              description: "Release time" }
}

fields {
  currentGain: f32 = 1.0
}

control {
  th = max(-80.0, min(threshold, 0.0))
  rel = max(0.0001, min(release, 5.0))
  releaseCoeff = exp(-3.0 / (rel * sampleRate))
  thresholdLinear = pow(10.0, th / 20.0)
}

audio {
  inputLevel = abs(input)
  targetGain = inputLevel > thresholdLinear ? thresholdLinear / inputLevel : 1.0

  if currentGain > targetGain {
    currentGain = targetGain + (currentGain - targetGain) * releaseCoeff
  } else {
    currentGain = targetGain
  }
  currentGain = max(0.0, min(1.0, currentGain))
  outSample = input * currentGain
  if abs(outSample) > thresholdLinear {
    outSample = thresholdLinear * sign(outSample)
    currentGain = targetGain
  }
  output = outSample
}
