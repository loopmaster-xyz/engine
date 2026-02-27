name: TestGain
description: "Simple gain/amplifier"
category: "test"

parameters {
  amount { default: 1.0, min: 0, max: 2,
           description: "Gain amount" }
}

audio {
  output = input * amount
}

stereo {
  outputLeft = inputLeft * amount
  outputRight = inputRight * amount
}
