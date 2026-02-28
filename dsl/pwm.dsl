name: Pwm
description: "Band-limited PWM oscillator"
category: "generators"

parameters {
  hz     { default: 440, min: 0, unit: "hz",
           description: "Frequency" }
  width  { default: 0.5, min: 0, max: 1,
           description: "Pulse width" }
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
  pulseWidth = width * 0.985 + 0.0075
  raw = angle < pulseWidth ? 1.0 : -1.0
  fallingPhase = angle - pulseWidth
  fallingPhase = fallingPhase < 0.0 ? fallingPhase + 1.0 : fallingPhase
  output = raw + polyBlep(angle, phaseInc) - polyBlep(fallingPhase, phaseInc)
  angle += phaseInc
  if angle >= 1.0 {
    angle = fract01(angle)
  }
}
