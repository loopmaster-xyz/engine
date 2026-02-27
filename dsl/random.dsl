name: Random
description: "Deterministic uniform [0,1] per sample from seed"
category: "math"

import { sahValue }

parameters {
  seed { default: 0, types: [scalar], description: "Seed" }
}

fields {
  prevSeed: f32 = -1.0
  counter: f32 = 0.0
}

control {
  if seed != prevSeed {
    prevSeed = seed
    counter = 0.0
  }
}

audio {
  output = sahValue(seed, counter)
  counter = counter + 1.0
}
