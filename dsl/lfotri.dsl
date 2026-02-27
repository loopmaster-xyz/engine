name: Lfotri
description: "Tempo-synced LFO triangle 0..1"
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
  p = fract01(phase + 0.25)
  tri = p < 0.5 ? 4.0 * p - 1.0 : 3.0 - 4.0 * p
  output = (tri + 1.0) * 0.5
  phase += phaseInc
  if phase >= 1.0 {
    phase = fract01(phase)
  }
}
