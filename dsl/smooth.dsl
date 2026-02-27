name: Smooth
description: "Smooth interpolated random steps with rate and curve"
category: "generators"

import { fadeWithCurve, fract01, seedToNoiseState, uniform01Value, uniform01NextState }

parameters {
  seed  { default: 0, types: [scalar], description: "Seed" }
  rate  { default: 2, min: 0, unit: "hz", description: "Step rate" }
  curve { default: 1.0, description: "Interpolation curve (0=linear, 1=smooth5)" }
  trig  { description: "Trigger resets acc" }
}

fields {
  acc: f32 = 0.0
  a: f32 = 0.0
  b: f32 = 0.0
  state: f32 = 0.0
  prevTrig: f32 = 0.0
  prevSeed: f32 = -1.0
  phase: f32 = 0.0
}

emit {
  phase
}

control {
  if seed != prevSeed {
    state = seedToNoiseState(seed)
    a = uniform01Value(state)
    state = uniform01NextState(state)
    b = uniform01Value(state)
    state = uniform01NextState(state)
    prevSeed = seed
  }

  if trig > 0.0 && prevTrig <= 0.0 {
    state = seedToNoiseState(seed)
    acc = 0.0
    a = uniform01Value(state)
    state = uniform01NextState(state)
    b = uniform01Value(state)
    state = uniform01NextState(state)
  }
  prevTrig = trig
}

audio {
  phase = a + (b - a) * fadeWithCurve(acc, curve)
  output = phase
  acc = acc + rate / sampleRate
  if acc >= 1.0 {
    acc = fract01(acc)
    a = b
    b = uniform01Value(state)
    state = uniform01NextState(state)
  }
}
