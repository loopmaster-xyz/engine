name: Brown
description: "Brownian (random walk) noise"
category: "generators"

import { clamp, whiteNoiseValue, whiteNoiseNextState, seedToNoiseState }

parameters {
  seed { default: 0, types: [scalar], description: "Seed" }
  trig { description: "Trigger resets walk" }
}

fields {
  y: f32 = 0.0
  state: f32 = 0.0
  prevTrig: f32 = 0.0
}

control {
  state = seedToNoiseState(seed)

  if trig > 0.0 && prevTrig <= 0.0 {
    state = seedToNoiseState(seed)
    y = 0.0
  }
  prevTrig = trig
}

audio {
  output = y
  y = clamp(y * 0.999 + whiteNoiseValue(state) * 0.02, -1.0, 1.0)
  state = whiteNoiseNextState(state)
}
