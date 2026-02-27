name: Moog
description: "Moog ladder filter (4-pole, nonlinear)"
category: "filters"

import { exp, tanha }

parameters {
  cutoff { default: 1000,       min: 50.0, max: 22040.0, unit: "hz",
           description: "Cutoff frequency" }
  q      { default: 0.70710678, min: 0.01, max: 0.985,
           types: [scalar],
           description: "Q factor" }
}

control {
  freqClamped = max(50, min(cutoff, 22040))
  kfc = freqClamped / sampleRate
  kfcr = 1.873 * (kfc * kfc * kfc) + 0.4955 * (kfc * kfc) - 0.649 * kfc + 0.9988
  x = -TWO_PI * kfcr * kfc
  expOut = exp(x)
  k2vg = 3.2 * (1.0 - expOut)
  kacr = q * (-3.9364 * (kfc * kfc) + 1.8409 * kfc + 0.9968)
  postGain = 1.0001784074555027 + 0.9331585678097162 * q
  v2 = 3.2

  variant lpm "Lowpass filter (Moog)" {
    outVal = amf * postGain
  }

  variant hpm "Highpass filter (Moog)" {
    outVal = (x1 - 3.0 * az3 + 2.0 * az4) * postGain
  }
}

audio {
  x1 = input - amf * kacr
  az1 = azt1 + k2vg * tanha(x1 / v2)
  at1 = k2vg * tanha(az1 / v2)
  azt1 = az1 - at1

  az2 = azt2 + at1
  at2 = k2vg * tanha(az2 / v2)
  azt2 = az2 - at2

  az3 = azt3 + at2
  at3 = k2vg * tanha(az3 / v2)
  azt3 = az3 - at3

  az4 = azt4 + at3
  at4 = k2vg * tanha(az4 / v2)
  azt4 = az4 - at4

  amf = az4
  output = outVal
}
