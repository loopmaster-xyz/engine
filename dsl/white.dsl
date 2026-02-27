name: White
description: "Uniform white noise with trigger reset"
category: "generators"

import { whiteNoiseValue, whiteNoiseNextState, seedToNoiseState }

parameters {
  seed { default: 0, types: [scalar], description: "Seed (any value, float bits used)" }
  trig { description: "Trigger resets phase" }
}

fields {
  state: f32 = 0.0
  prevTrig: f32 = 0.0
}

control {
  state = seedToNoiseState(seed)

  if trig > 0.0 && prevTrig <= 0.0 {
    state = seedToNoiseState(seed)
  }
  prevTrig = trig
}

audio {
  output = whiteNoiseValue(state)
  state = whiteNoiseNextState(state)
}
