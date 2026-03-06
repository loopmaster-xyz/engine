name: Acc
description: "Accumulates (adds) a value on trigger"
category: "utilities"

parameters {
  trig { description: "Trigger impulse" }
  amount { types: [scalar], default: 1, description: "Amount to accumulate" }
}

fields {
  value: f32 = 0.0
}

control {
  if trig > 0.0 && prevTrig <= 0.0 {
    value = floor(value + amount)
  }

  prevTrig = trig
}

audio {
  output = value
}
