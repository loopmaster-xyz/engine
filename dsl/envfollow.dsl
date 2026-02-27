name: Envfollow
description: "Envelope follower with attack and release time"
category: "utilities"

import { abs, exp }

parameters {
  attack  { default: 0.01, min: 0.0001, max: 10.0, unit: "s",
            description: "Attack time" }
  release { default: 0.1, min: 0.0001, max: 10.0, unit: "s",
            description: "Release time" }
}

fields {
  envelope: f32 = 0.0
}

control {
  attackTime = max(0.0001, min(attack, 10.0))
  releaseTime = max(0.0001, min(release, 10.0))
  attackCoeff = exp(-1.0 / (attackTime * sampleRate))
  releaseCoeff = exp(-1.0 / (releaseTime * sampleRate))
}

audio {
  inputAbs = abs(input)
  if inputAbs > envelope {
    envelope = inputAbs + (envelope - inputAbs) * attackCoeff
  } else {
    envelope = inputAbs + (envelope - inputAbs) * releaseCoeff
  }
  envelope = max(0.0, min(envelope, 1.0))
  output = envelope
}
