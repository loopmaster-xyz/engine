name: At
description: "Probabilistic trigger at bar start and/or every N bars"
category: "sequencers"
rate: "control"

import { floor, max, sahValue }

parameters {
  bar   { default: 0, min: 0, unit: "bars", description: "Start time in bars" }
  every { default: 0, min: 0, unit: "bars", description: "Interval in bars (0 = single trigger at start)" }
  probability  { default: 1, min: 0, max: 1, unit: "factor", description: "Probability of 1 when trigger fires" }
  seed  { default: 0, types: [scalar], description: "Seed for deterministic random" }
}

fields {
  prevSeed: f32 = -1.0
  baseSeed: f32 = 0.0
  fired: f32 = 0.0
}

emit {
  fired
}

control {
  if seed != prevSeed {
    prevSeed = seed
    baseSeed = seed
  }
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
    random = sahValue(baseSeed, cycle)
    out = random < probability ? 1.0 : 0.0
    output = out
    if out > 0.0 {
      fired = 1.0
    }
  }
  else {
    output = 0.0
  }
}
