name: TestOversample
description: "Test generator that outputs sample rate dependent signal"
category: "test"

parameters {
}

audio {
  output = sampleRate / 48000.0
}

stereo {
  outputLeft = sampleRate / 48000.0
  outputRight = sampleRate / 48000.0
}
