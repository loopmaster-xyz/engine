name: Sustain
description: "Sustain an impulse for a fixed duration"
category: "sequencers"
rate: "control"

parameters {
  seconds { default: 0.1, min: 0.00001, unit: "s",
            description: "Sustain duration in seconds" }
  trig    { description: "Trigger impulse" }
}

fields {
  remainingSamples: f32 = 0.0
}

control {
  sustainSamples = seconds * sampleRate
}

audio {
  if trig > 0.0 && prevTrig <= 0.0 {
    remainingSamples = sustainSamples
  }

  prevTrig = trig

  isActive = remainingSamples > 0.0 ? 1.0 : 0.0
  output = isActive

  if isActive > 0.0 {
    remainingSamples = remainingSamples - 1.0
  }
}
