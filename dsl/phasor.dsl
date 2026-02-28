name: Phasor
description: "Phase ramp 0..1"
category: "generators"

parameters {
  hz     { default: 440, min: 0, unit: "hz",
           description: "Frequency" }
  offset { min: 0, max: 1,
           description: "Offset phase" }
  trig   { description: "Trigger impulse, resets to offset phase" }
}

fields {
  phase: f32 = 0.0
}

emit {
  phase
}

control {
  if trig > 0.0 && prevTrig <= 0.0 {
    phase = offset
  }

  prevTrig = trig

  if hz > 0 {
    phaseInc = hz / sampleRate
  }
}

audio {
  output = phase
  phase += phaseInc
  if phase >= 1.0 {
    phase = 0.0
  }
}
