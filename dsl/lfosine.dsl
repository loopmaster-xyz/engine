name: Lfosine
description: "Tempo-synced LFO sine 0..1"
category: "generators"

parameters {
  bar    { default: 1, min: 0, unit: "bars",
           description: "Cycle length in bars" }
  offset { default: 0, min: 0,
           description: "Phase offset in beats" }
  trig   { description: "Trigger reset" }
}

fields {
  phase: f32 = 0.0
}

emit {
  phase
}

control {
  if trig > 0.0 && prevTrig <= 0.0 {
    phase = fract01(offset * samplesPerBeat / max(bar * samplesPerBar, 1.0))
  }

  prevTrig = trig

  phaseInc = 1.0 / max(bar * samplesPerBar, 1.0)
}

audio {
  p = sinNormalized(phase)
  p = p * 0.5 + 0.5
  output = p
  phase += phaseInc
  if phase >= 1.0 {
    phase = fract01(phase)
  }
}
