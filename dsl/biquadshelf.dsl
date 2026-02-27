name: Biquadshelf
description: "Biquad shelf and peak filters (gain-based)"
category: "filters"

parameters {
  cutoff { default: 1000,       min: 20.0, max: 20000.0, unit: "hz",
           description: "Cutoff frequency" }
  q      { default: 0.70710678, min: 0.01, max:    20.0,
           description: "Q factor (peak only)" }
  gain   { default: 0,          min: -40.0, max: 40.0, unit: "dB",
           description: "Gain in dB" }
}

control {
  w0 = cutoff * piOverNyquist
  c = cos(w0)
  s = sin(w0)
  A = pow(10.0, gain / 40.0)
  beta = sqrt(A)
  alpha = s / (2.0 * q)

  variant ls "Low shelf (Biquad)" {
    b0 = A * (A + 1.0 - (A - 1.0) * c + beta * s)
    b1 = 2.0 * A * (A - 1.0 - (A + 1.0) * c)
    b2 = A * (A + 1.0 - (A - 1.0) * c - beta * s)
    a0 = A + 1.0 + (A - 1.0) * c + beta * s
    a1 = -2.0 * (A - 1.0 + (A + 1.0) * c)
    a2 = A + 1.0 + (A - 1.0) * c - beta * s
    z = 1.0 / a0
  }

  variant hs "High shelf (Biquad)" {
    b0 = A * (A + 1.0 + (A - 1.0) * c + beta * s)
    b1 = -2.0 * A * (A - 1.0 + (A + 1.0) * c)
    b2 = A * (A + 1.0 + (A - 1.0) * c - beta * s)
    a0 = A + 1.0 - (A - 1.0) * c + beta * s
    a1 = 2.0 * (A - 1.0 - (A + 1.0) * c)
    a2 = A + 1.0 - (A - 1.0) * c - beta * s
    z = 1.0 / a0
  }

  variant peak "Peak (notch) (Biquad)" {
    b0 = 1.0 + alpha * A
    b1 = -2.0 * c
    b2 = 1.0 - alpha * A
    a0 = 1.0 + alpha / A
    a1 = -2.0 * c
    a2 = 1.0 - alpha / A
    z = 1.0 / a0
  }
}

audio {
  output =
      b0 * z * input
    + b1 * z * x1
    + b2 * z * x2
    - a1 * z * y1
    - a2 * z * y2

  x2 = x1
  x1 = input
  y2 = y1
  y1 = output
}
