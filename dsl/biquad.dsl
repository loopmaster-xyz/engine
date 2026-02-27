name: Biquad
description: "Biquad filter"
category: "filters"

parameters {
  cutoff { default: 1000,       min: 20.0, max: 20000.0, unit: "hz",
           description: "Cutoff frequency" }
  q      { default: 0.70710678, min: 0.01, max:    20.0,
           description: "Q factor" }
}

control {
  w0 = cutoff * piOverNyquist
  c = cos(w0)
  s = sin(w0)
  alpha = s / (2.0 * q)

  variant lp "Lowpass filter (Biquad)" {
    b0 = (1.0 - c) * 0.5
    b1 = 1.0 - c
    b2 = (1.0 - c) * 0.5
    a0 = 1.0 + alpha
    a1 = -2.0 * c
    a2 = 1.0 - alpha
    z = 1.0 / a0
  }

  variant hp "Highpass filter (Biquad)" {
    b0 = (1 + c) / 2
    b1 = -(1 + c)
    b2 = (1 + c) / 2
    a0 = 1 + alpha
    a1 = -2 * c
    a2 = 1 - alpha
    z = 1.0 / a0
  }

  variant bp "Bandpass filter (Biquad)" {
    b0 = alpha
    b1 = 0
    b2 = -alpha
    a0 = 1.0 + alpha
    a1 = -2.0 * c
    a2 = 1.0 - alpha
    z = 1.0 / a0
  }

  variant bs "Bandstop filter (Biquad)" {
    b0 = 1
    b1 = -2.0 * c
    b2 = 1
    a0 = 1.0 + alpha
    a1 = -2.0 * c
    a2 = 1.0 - alpha
    z = 1.0 / a0
  }

  variant ap "Allpass filter (Biquad)" {
    b0 = 1.0 - alpha
    b1 = -2.0 * c
    b2 = 1.0 + alpha
    a0 = 1.0 + alpha
    a1 = -2.0 * c
    a2 = 1.0 - alpha
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
