name: Gauss
description: "Gaussian (normal-ish) noise via CLT from 6 uniforms, trigger reset"
category: "generators"

import { gaussNoiseValue, gaussNoiseNextState, seedToNoiseState }

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
  output = gaussNoiseValue(state)
  state = gaussNoiseNextState(state)
}
