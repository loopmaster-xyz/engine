name: Dc
description: "DC blocker (~8 Hz highpass, removes offset)"
category: "filters"

fields {
  x1: f32 = 0.0
  y1: f32 = 0.0
}

control {
  coeff = 1.0 - (TWO_PI * 8.0 / sampleRate)
}

audio {
  y = input - x1 + coeff * y1
  x1 = input
  y1 = y
  output = y * 0.9996
}
