name: Every
description: "Generates an impulse on a regular period in bars"
category: "sequencers"
rate: "control"

parameters {
  bars { default: 0.25, min: 0.0001, unit: "bars",
         description: "Number of bars per impulse" }
  offset { default: 0, min: 0, unit: "bars",
           description: "Start offset in bars" }
  length { default: 1, min: 0.0001, unit: "bars",
        description: "Bar length multiplier" }
}

fields {
  lastPeriodIndex: f32 = -1.0
  isLateStart: f32 = 0.0
  fired: f32 = 0.0
}

emit {
  fired
}

control {
  barSamples = samplesPerBar * length
  periodSamples = barSamples * bars
  offsetSamples = barSamples * offset
  isLateStart = f32(sampleCount > 0 && lastPeriodIndex < 0.0)
  nextSampleCount = f32(sampleCount) + f32(bufferLength)
  if fired {
    fired = 0.0
  }
}

audio {
  periodIndex = floor((sampleCount - offsetSamples) / periodSamples)
  prevSamplePeriodIndex = floor((sampleCount - 1.0 - offsetSamples) / periodSamples)
  isBoundary = f32(prevSamplePeriodIndex != periodIndex && periodIndex >= 0.0)
  shouldTrigger = f32(isBoundary)
  output = shouldTrigger ? 1.0 : 0.0
  if shouldTrigger > 0.0 {
    fired = 1.0
  }
  lastPeriodIndex = periodIndex
}
