name: Slew
description: "Slew rate limiter with separate rise/fall and curve"
category: "utilities"

import { abs, clamp01 }

parameters {
  up   { default: 0.5, min: 0, max: 1, description: "Rise coefficient (0=slow, 1=instant)" }
  down { default: 0.5, min: 0, max: 1, description: "Fall coefficient (0=slow, 1=instant); ≤0 uses up" }
  exp  { default: 1.0, description: "Curve exponent (0=linear, >0=power, <0=mirrored)" }
}

fields {
  current: f32 = 0.0
}

audio {
  diff = input - current
  if abs(diff) < 0.000001 {
    current = input
  } else {
    downVal = down <= 0.0 ? up : down
    a = clamp01(diff > 0.0 ? up : downVal)
    coeff = applyCurve(a, exp)
    step = diff * coeff
    if abs(step) >= abs(diff) {
      current = input
    } else {
      current = current + step
    }
  }
  output = current
}
