name: Sqr
description: "Band-limited square oscillator"
category: "generators"

parameters {
  hz     { default: 440, min: 0, unit: "hz",
           description: "Frequency" }
  offset { min: 0, max: 1,
           description: "Offset phase" }
  trig   { description: "Trigger impulse, resets to offset phase" }
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
  raw = angle < 0.5 ? 1.0 : -1.0
  fallingPhase = fract01(angle + 0.5)
  output = raw + polyBlep(angle, phaseInc) - polyBlep(fallingPhase, phaseInc)
  angle += phaseInc
  if angle >= 1.0 {
    angle = fract01(angle)
  }
}
