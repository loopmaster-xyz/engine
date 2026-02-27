name: Sah
description: "Sample-and-hold: capture input on trigger rising edge"
category: "utilities"

parameters {
  trig { description: "Trigger: on rising edge, hold current input" }
}

fields {
  lastTrig: f32 = 0.0
  heldValue: f32 = 0.0
}

audio {
  inVal = input
  if trig > 0.0 && lastTrig <= 0.0 {
    heldValue = inVal
  }
  output = heldValue
  lastTrig = trig
}
