name: Inc
description: "Ramp from offset to ceil at hz rate, trigger reset"
category: "generators"

parameters {
  hz    { default: 1, min: 0, unit: "hz",
          description: "Rate" }
  ceil  { default: 1, min: 0,
          description: "Ceiling value" }
  offset { default: 0, min: 0,
           description: "Value on trigger" }
  trig  { description: "Trigger impulse" }
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
  if phase > ceil {
    phase = ceil
  }
}
