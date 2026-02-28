name: Sine
description: "Sine wave generator"
category: "generators"

parameters {
  hz     { default: 440, min: 0, unit: "hz",
           description: "Frequency" }
  offset { min: 0, max: 1, unit: "phase",
           description: "Offset phase" }
  trig   { description: "Trigger impulse, resets to offset phase", unit: "impulse" }
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
    angleStep = hz / sampleRate
  }
}

audio {
  output = sinNormalized(angle)
  angle += angleStep
  if angle >= 1.0 {
    angle = fract01(angle)
  }
}
