name: Onepole
description: "One-pole filter (lowpass / highpass)"
category: "filters"

import { exp }

parameters {
  cutoff { default: 1000,       min: 20.0, max: 20000.0, unit: "hz",
           description: "Cutoff frequency" }
}

control {
  freq = max(20.0, min(cutoff, nyquist))
  w0 = freq * piOverNyquist
  alpha = 1.0 - exp(-w0)

  variant lp1 "Lowpass filter (One-pole)" {
    outVal = y1
  }

  variant hp1 "Highpass filter (One-pole)" {
    outVal = input - y1
  }
}

audio {
  y1 = y1 + alpha * (input - y1)
  output = outVal
}
