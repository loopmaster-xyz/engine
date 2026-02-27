name: Euclid
description: "Euclidean rhythm trigger (pulses over steps with offset)"
category: "sequencers"
rate: "control"

import { euclidHitF32, floor, modFn }

parameters {
  pulses { default: 4, min: 0, description: "Number of hits" }
  steps  { default: 8, min: 1, description: "Number of steps" }
  offset { default: 0, min: 0, description: "Rotation offset" }
  bar    { default: 1, min: 0, unit: "bars",
           description: "Pattern length in bars" }
}

fields {
  lastStepAbs: f32 = -1.0
}

control {
  barBars = max(1.0 / samplesPerBar, bar)
  intervalSamples = barBars * samplesPerBar
  stepDur = steps > 0.0 ? intervalSamples / max(steps, 1.0) : intervalSamples
  stepDur = max(1.0, stepDur)

  isLateStart = f32(sampleCount >= 0.0 && lastStepAbs < 0.0)
  isDiscontinuous = f32(sampleCount != nextSampleCount && !isLateStart)
  nextSampleCount = sampleCount + f32(bufferLength)
}

audio {
  curStepAbs = floor(sampleCount / stepDur)
  prevStepAbs = floor((sampleCount - 1.0) / stepDur)
  isBoundary = f32(curStepAbs > prevStepAbs)
  stepInBar = modFn(curStepAbs, max(steps, 1.0))
  if stepInBar < 0.0 {
    stepInBar = stepInBar + max(steps, 1.0)
  }
  hit = euclidHitF32(pulses, steps, stepInBar, offset)
  shouldTrigger = f32(!isDiscontinuous && isBoundary)
  output = shouldTrigger ? hit : 0.0
  lastStepAbs = curStepAbs
  isDiscontinuous = 0.0
}
