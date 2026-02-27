name: Diodeladder
description: "Diode ladder filter (4-pole, with HPF and soft saturation)"
category: "filters"

constants {
  DIODELADDER_Q_COMP = 2.5
  DIODELADDER_K_COMP = 1.0
}

parameters {
  cutoff { default: 1000,       min: 20.0, max: 20000.0, unit: "hz",
           description: "Cutoff frequency" }
  q      { default: 0.5,       min: 0.0, max: 1.0,
           description: "Resonance" }
  k      { default: 0.0,        min: 0.0, max: 1.0,
           description: "HPF amount" }
  sat    { default: 1.0,        min: 0.1, max: 10.0,
           description: "Input saturation" }
}

fields {
  A: f32 = 0.0
  ah: f32 = 0.0
  bh: f32 = 0.0
  a: f32 = 0.0
  a2: f32 = 0.0
  b: f32 = 0.0
  b2: f32 = 0.0
  c: f32 = 0.0
  g: f32 = 0.0
  g0: f32 = 0.0
  ainv: f32 = 0.0
  kRes: f32 = 0.0
}

control {
  cutNorm = cutoff / nyquist
  qq = q * q
  ah = (k * (TWO_PI / 2.0) - 2.0) / (k * (TWO_PI / 2.0) + 2.0)
  bh = 2.0 / (k * (TWO_PI / 2.0) + 2.0)
  kRes = 20.0 * q
  A = 1.0 + 0.5 * kRes
  comp = 1.0 + DIODELADDER_Q_COMP * qq + DIODELADDER_K_COMP * (k * q)
  cutComp = max(20.0, min((cutNorm / comp) * nyquist, nyquist))
  a = (TWO_PI / 2.0) * (cutComp / nyquist)
  a = 2.0 * sin(0.5 * a) / cos(0.5 * a)
  ainv = 1.0 / a
  a2 = a * a
  b = 2.0 * a + 1.0
  b2 = b * b
  a2x2 = 2.0 * a2 * a2
  c = 1.0 / (a2x2 - 4.0 * a2 * b2 + b2 * b2)
  g0 = a2x2 * c
  g = g0 * bh
}

audio {
  s0 = (a2 * a * z0 + a2 * b * z1 + z2 * (b2 - 2.0 * a2) * a + z3 * (b2 - 3.0 * a2) * b) * c
  s = bh * s0 - z4
  y5 = (g * input + s) / (1.0 + g * kRes)
  xIn = input - kRes * y5
  absXIn = xIn < 0 ? -xIn : xIn
  y0 = xIn / (1.0 / sat + absXIn)
  y5 = g * y0 + s
  y4 = g0 * y0 + s0
  y3 = (b * y4 - z3) * ainv
  y2 = (b * y3 - a * y4 - z2) * ainv
  y1 = (b * y2 - a * y3 - z1) * ainv
  z0 = z0 + 4.0 * a * (y0 - y1 + y2)
  z1 = z1 + 2.0 * a * (y1 - 2.0 * y2 + y3)
  z2 = z2 + 2.0 * a * (y2 - 2.0 * y3 + y4)
  z3 = z3 + 2.0 * a * (y3 - 2.0 * y4)
  z4 = bh * y4 + ah * y5
  output = A * y4
}
