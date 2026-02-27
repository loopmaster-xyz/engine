name: Lfosah
description: "Tempo-synced LFO sample-and-hold (random 0..1 per cycle)"
category: "generators"

import { fract01, max, sahValue }

parameters {
  bar    { default: 1, min: 0, unit: "bars",
           description: "Cycle length in bars" }
  offset { default: 0, min: 0,
           description: "Phase offset in beats" }
  seed   { default: 0,
           description: "Seed (any value, float bits used)" }
  trig   { description: "Trigger reset" }
}

fields {
  acc: f32 = 0.0
  cycleIndex: f32 = 0.0
  phase: f32 = 0.0
}

emit {
  phase
}

control {
  if trig > 0.0 && prevTrig <= 0.0 {
    acc = fract01(offset * samplesPerBeat / max(bar * samplesPerBar, 1.0))
    cycleIndex = 0.0
  }

  prevTrig = trig

  phaseInc = 1.0 / max(bar * samplesPerBar, 1.0)
}

audio {
  phase = sahValue(seed, cycleIndex)
  output = phase
  acc += phaseInc
  if acc >= 1.0 {
    acc = fract01(acc)
    cycleIndex = cycleIndex + 1.0
  }
}
