name: Svf
description: "State variable filter (SVF)"
category: "filters"

parameters {
  cutoff { default: 1000,       min: 50.0, max: 20000.0, unit: "hz",
           description: "Cutoff frequency" }
  q      { default: 0.70710678, min: 0.01, max: 0.985,
           description: "Q factor" }
}

control {
  w0 = cutoff * piOverNyquist
  w0Half = w0 * 0.5
  g = sin(w0Half) / cos(w0Half)
  k = 2.0 - 2.0 * q
  a1 = 1.0 / (1.0 + g * (g + k))
  a2 = g * a1
  a3 = g * a2

  variant lps "Lowpass filter (SVF)" {
    outVal = v2
  }

  variant hps "Highpass filter (SVF)" {
    outVal = v0 - k * v1 - v2
  }

  variant bps "Bandpass filter (SVF)" {
    outVal = v1
  }

  variant bss "Bandstop filter (SVF)" {
    outVal = v0 - k * v1
  }

  variant peaks "Peak (notch) filter (SVF)" {
    outVal = v0 - k * v1 - 2.0 * v2
  }

  variant aps "Allpass filter (SVF)" {
    outVal = v0 - 2.0 * k * v1
  }
}

audio {
  v0 = input
  v3 = v0 - c2
  v1 = a1 * c1 + a2 * v3
  v2 = c2 + a2 * c1 + a3 * v3
  c1 = 2.0 * v1 - c1
  c2 = 2.0 * v2 - c2
  output = outVal
}
