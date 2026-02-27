name: Ramp
description: "Band-limited ramp (inverse saw) oscillator"
category: "generators"

parameters {
  hz     { default: 440, min: 0, unit: "hz",
           description: "Frequency" }
  offset { min: 0, max: 1,
           description: "Offset phase" }
  trig   { description: "Trigger impulse" }
}

fields {
  angle: f32 = 0.0
}

control {
  if trig > 0.0 && prevTrig <= 0.0 {
    angle = offset
  }

  prevTrig = trig

  if hz > 0 {
    phaseInc = hz / sampleRate
  }
}

audio {
  output = -(2.0 * angle - 1.0 - polyBlep(angle, phaseInc))
  angle += phaseInc
  if angle >= 1.0 {
    angle = fract01(angle)
  }
}
