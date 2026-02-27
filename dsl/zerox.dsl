name: Zerox
description: "Positive zero-crossing detector (1 when input crosses from ≤0 to >0)"
category: "utilities"

fields {
  lastInput: f32 = 0.0
}

audio {
  output = (lastInput <= 0.0 && input > 0.0) ? 1.0 : 0.0
  lastInput = input
}
