name: At
description: "Trigger at specific bar once or every N bars"
category: "sequencers"
rate: "control"

import { floor, max }

parameters {
  bar   { default: 0, min: 0, unit: "bars", description: "Start time in bars" }
  every { default: 0, min: 0, unit: "bars", description: "Interval in bars (0 = single trigger at start)" }
}

fields {
  fired: f32 = 0.0
}

emit {
  fired
}

control {
  if fired > 0.0 {
    fired = 0.0
  }
}

audio {
  startSample = bar * samplesPerBar
  globalSample = sampleCount
  prevSample = globalSample - 1.0
  shouldTrigger = 0.0
  cycle = 0.0
  if every > 0.0 {
    intervalSamples = max(every * samplesPerBar, 1.0)
    delta = globalSample - startSample
    prevDelta = prevSample - startSample
    currentCycle = floor(delta / intervalSamples)
    prevCycle = floor(prevDelta / intervalSamples)
    if currentCycle >= 0.0 && currentCycle > prevCycle {
      shouldTrigger = 1.0
      cycle = currentCycle
    }
  }
  else {
    if globalSample >= startSample && prevSample < startSample {
      shouldTrigger = 1.0
    }
  }
  if shouldTrigger > 0.0 {
    output = 1.0
    fired = 1.0
  }
  else {
    output = 0.0
  }
}
