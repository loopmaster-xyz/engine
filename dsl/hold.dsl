name: Hold
description: "Holds its input if zero is received"
category: "utilities"

fields {
  last: f32 = 0.0
}

audio {
  y = input
  if y > 0 {
    last = y
  }
  output = last
}
