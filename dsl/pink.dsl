name: Pink
description: "1/f pink noise (Voss-McCartney 8 rows)"
category: "generators"

import { whiteNoiseValue, whiteNoiseNextState, seedToNoiseState, trailingZerosF32, uintIncrementF32, clamp11, min }

parameters {
  seed { default: 0, types: [scalar], description: "Seed" }
  trig { description: "Trigger resets" }
}

fields {
  row0: f32 = 0.0
  row1: f32 = 0.0
  row2: f32 = 0.0
  row3: f32 = 0.0
  row4: f32 = 0.0
  row5: f32 = 0.0
  row6: f32 = 0.0
  row7: f32 = 0.0
  state: f32 = 0.0
  counter: f32 = 0.0
  prevTrig: f32 = 0.0
  prevSeed: f32 = -1.0
}

control {
  if prevSeed != seed {
    state = seedToNoiseState(seed)
    row0 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row1 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row2 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row3 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row4 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row5 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row6 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row7 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    counter = 0.0
  }
  if trig > 0.0 && prevTrig <= 0.0 {
    state = seedToNoiseState(seed)
    row0 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row1 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row2 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row3 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row4 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row5 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row6 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    row7 = whiteNoiseValue(state)
    state = whiteNoiseNextState(state)
    counter = 0.0
  }
  prevTrig = trig
}

audio {
  counter = uintIncrementF32(counter)
  rowIndex = min(7.0, trailingZerosF32(counter))
  newR = whiteNoiseValue(state)
  state = whiteNoiseNextState(state)
  row0 = (rowIndex == 0.0 ? newR : row0)
  row1 = (rowIndex == 1.0 ? newR : row1)
  row2 = (rowIndex == 2.0 ? newR : row2)
  row3 = (rowIndex == 3.0 ? newR : row3)
  row4 = (rowIndex == 4.0 ? newR : row4)
  row5 = (rowIndex == 5.0 ? newR : row5)
  row6 = (rowIndex == 6.0 ? newR : row6)
  row7 = (rowIndex == 7.0 ? newR : row7)
  sum = row0 + row1 + row2 + row3 + row4 + row5 + row6 + row7
  white = whiteNoiseValue(state)
  state = whiteNoiseNextState(state)
  output = clamp11((sum + white) * (1.0 / 9.0))
}
