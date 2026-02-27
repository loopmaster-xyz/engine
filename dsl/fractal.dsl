name: Fractal
description: "Fractal (octave-sum) noise with rate, octaves, gain"
category: "generators"

import { fadeWithCurve, fract01, uniform01Value, uniform01NextState, seedForOctave, clamp01, floor, pow }

parameters {
  seed    { default: 0, types: [scalar], description: "Seed" }
  rate    { default: 2, min: 0, unit: "hz", description: "Base rate" }
  octaves { default: 4, min: 1, max: 16, description: "Number of octaves" }
  gain    { default: 0.5, min: 0, max: 1, description: "Octave amplitude decay" }
  trig    { description: "Trigger resets phase" }
}

fields {
  phase0: f32 = 0.0
  a0: f32 = 0.0
  b0: f32 = 0.0
  state0: f32 = 0.0
  phase1: f32 = 0.0
  a1: f32 = 0.0
  b1: f32 = 0.0
  state1: f32 = 0.0
  phase2: f32 = 0.0
  a2: f32 = 0.0
  b2: f32 = 0.0
  state2: f32 = 0.0
  phase3: f32 = 0.0
  a3: f32 = 0.0
  b3: f32 = 0.0
  state3: f32 = 0.0
  phase4: f32 = 0.0
  a4: f32 = 0.0
  b4: f32 = 0.0
  state4: f32 = 0.0
  phase5: f32 = 0.0
  a5: f32 = 0.0
  b5: f32 = 0.0
  state5: f32 = 0.0
  phase6: f32 = 0.0
  a6: f32 = 0.0
  b6: f32 = 0.0
  state6: f32 = 0.0
  phase7: f32 = 0.0
  a7: f32 = 0.0
  b7: f32 = 0.0
  state7: f32 = 0.0
  prevTrig: f32 = 0.0
  prevSeed: f32 = -1.0
  phase: f32 = 0.0
}

control {
  if prevSeed != seed {
    state0 = seedForOctave(seed, 0.0)
    phase0 = 0.0
    a0 = uniform01Value(state0)
    state0 = uniform01NextState(state0)
    b0 = uniform01Value(state0)
    state0 = uniform01NextState(state0)
    state1 = seedForOctave(seed, 1.0)
    phase1 = 0.0
    a1 = uniform01Value(state1)
    state1 = uniform01NextState(state1)
    b1 = uniform01Value(state1)
    state1 = uniform01NextState(state1)
    state2 = seedForOctave(seed, 2.0)
    phase2 = 0.0
    a2 = uniform01Value(state2)
    state2 = uniform01NextState(state2)
    b2 = uniform01Value(state2)
    state2 = uniform01NextState(state2)
    state3 = seedForOctave(seed, 3.0)
    phase3 = 0.0
    a3 = uniform01Value(state3)
    state3 = uniform01NextState(state3)
    b3 = uniform01Value(state3)
    state3 = uniform01NextState(state3)
    state4 = seedForOctave(seed, 4.0)
    phase4 = 0.0
    a4 = uniform01Value(state4)
    state4 = uniform01NextState(state4)
    b4 = uniform01Value(state4)
    state4 = uniform01NextState(state4)
    state5 = seedForOctave(seed, 5.0)
    phase5 = 0.0
    a5 = uniform01Value(state5)
    state5 = uniform01NextState(state5)
    b5 = uniform01Value(state5)
    state5 = uniform01NextState(state5)
    state6 = seedForOctave(seed, 6.0)
    phase6 = 0.0
    a6 = uniform01Value(state6)
    state6 = uniform01NextState(state6)
    b6 = uniform01Value(state6)
    state6 = uniform01NextState(state6)
    state7 = seedForOctave(seed, 7.0)
    phase7 = 0.0
    a7 = uniform01Value(state7)
    state7 = uniform01NextState(state7)
    b7 = uniform01Value(state7)
    state7 = uniform01NextState(state7)
  }
  if trig > 0.0 && prevTrig <= 0.0 {
    state0 = seedForOctave(seed, 0.0)
    phase0 = 0.0
    a0 = uniform01Value(state0)
    state0 = uniform01NextState(state0)
    b0 = uniform01Value(state0)
    state0 = uniform01NextState(state0)
    state1 = seedForOctave(seed, 1.0)
    phase1 = 0.0
    a1 = uniform01Value(state1)
    state1 = uniform01NextState(state1)
    b1 = uniform01Value(state1)
    state1 = uniform01NextState(state1)
    state2 = seedForOctave(seed, 2.0)
    phase2 = 0.0
    a2 = uniform01Value(state2)
    state2 = uniform01NextState(state2)
    b2 = uniform01Value(state2)
    state2 = uniform01NextState(state2)
    state3 = seedForOctave(seed, 3.0)
    phase3 = 0.0
    a3 = uniform01Value(state3)
    state3 = uniform01NextState(state3)
    b3 = uniform01Value(state3)
    state3 = uniform01NextState(state3)
    state4 = seedForOctave(seed, 4.0)
    phase4 = 0.0
    a4 = uniform01Value(state4)
    state4 = uniform01NextState(state4)
    b4 = uniform01Value(state4)
    state4 = uniform01NextState(state4)
    state5 = seedForOctave(seed, 5.0)
    phase5 = 0.0
    a5 = uniform01Value(state5)
    state5 = uniform01NextState(state5)
    b5 = uniform01Value(state5)
    state5 = uniform01NextState(state5)
    state6 = seedForOctave(seed, 6.0)
    phase6 = 0.0
    a6 = uniform01Value(state6)
    state6 = uniform01NextState(state6)
    b6 = uniform01Value(state6)
    state6 = uniform01NextState(state6)
    state7 = seedForOctave(seed, 7.0)
    phase7 = 0.0
    a7 = uniform01Value(state7)
    state7 = uniform01NextState(state7)
    b7 = uniform01Value(state7)
    state7 = uniform01NextState(state7)
  }
  prevTrig = trig
}

emit {
  phase
}

audio {
  oct = floor(octaves)
  inc = rate / sampleRate
  sum = 0.0
  norm = 0.0
  v0 = a0 + (b0 - a0) * fadeWithCurve(phase0, 1.0)
  sum = sum + (oct > 0.0 ? v0 : 0.0)
  norm = norm + (oct > 0.0 ? 1.0 : 0.0)
  phase0 = phase0 + inc
  if phase0 >= 1.0 {
    phase0 = fract01(phase0)
    a0 = b0
    b0 = uniform01Value(state0)
    state0 = uniform01NextState(state0)
  }
  amp = gain
  freq = rate * 2.0
  v1 = a1 + (b1 - a1) * fadeWithCurve(phase1, 1.0)
  sum = sum + (oct > 1.0 ? amp * v1 : 0.0)
  norm = norm + (oct > 1.0 ? amp : 0.0)
  phase1 = phase1 + freq / sampleRate
  if phase1 >= 1.0 {
    phase1 = fract01(phase1)
    a1 = b1
    b1 = uniform01Value(state1)
    state1 = uniform01NextState(state1)
  }
  amp = amp * gain
  freq = freq * 2.0
  v2 = a2 + (b2 - a2) * fadeWithCurve(phase2, 1.0)
  sum = sum + (oct > 2.0 ? amp * v2 : 0.0)
  norm = norm + (oct > 2.0 ? amp : 0.0)
  phase2 = phase2 + freq / sampleRate
  if phase2 >= 1.0 {
    phase2 = fract01(phase2)
    a2 = b2
    b2 = uniform01Value(state2)
    state2 = uniform01NextState(state2)
  }
  amp = amp * gain
  freq = freq * 2.0
  v3 = a3 + (b3 - a3) * fadeWithCurve(phase3, 1.0)
  sum = sum + (oct > 3.0 ? amp * v3 : 0.0)
  norm = norm + (oct > 3.0 ? amp : 0.0)
  phase3 = phase3 + freq / sampleRate
  if phase3 >= 1.0 {
    phase3 = fract01(phase3)
    a3 = b3
    b3 = uniform01Value(state3)
    state3 = uniform01NextState(state3)
  }
  amp = amp * gain
  freq = freq * 2.0
  v4 = a4 + (b4 - a4) * fadeWithCurve(phase4, 1.0)
  sum = sum + (oct > 4.0 ? amp * v4 : 0.0)
  norm = norm + (oct > 4.0 ? amp : 0.0)
  phase4 = phase4 + freq / sampleRate
  if phase4 >= 1.0 {
    phase4 = fract01(phase4)
    a4 = b4
    b4 = uniform01Value(state4)
    state4 = uniform01NextState(state4)
  }
  amp = amp * gain
  freq = freq * 2.0
  v5 = a5 + (b5 - a5) * fadeWithCurve(phase5, 1.0)
  sum = sum + (oct > 5.0 ? amp * v5 : 0.0)
  norm = norm + (oct > 5.0 ? amp : 0.0)
  phase5 = phase5 + freq / sampleRate
  if phase5 >= 1.0 {
    phase5 = fract01(phase5)
    a5 = b5
    b5 = uniform01Value(state5)
    state5 = uniform01NextState(state5)
  }
  amp = amp * gain
  freq = freq * 2.0
  v6 = a6 + (b6 - a6) * fadeWithCurve(phase6, 1.0)
  sum = sum + (oct > 6.0 ? amp * v6 : 0.0)
  norm = norm + (oct > 6.0 ? amp : 0.0)
  phase6 = phase6 + freq / sampleRate
  if phase6 >= 1.0 {
    phase6 = fract01(phase6)
    a6 = b6
    b6 = uniform01Value(state6)
    state6 = uniform01NextState(state6)
  }
  amp = amp * gain
  freq = freq * 2.0
  v7 = a7 + (b7 - a7) * fadeWithCurve(phase7, 1.0)
  sum = sum + (oct > 7.0 ? amp * v7 : 0.0)
  norm = norm + (oct > 7.0 ? amp : 0.0)
  phase7 = phase7 + freq / sampleRate
  if phase7 >= 1.0 {
    phase7 = fract01(phase7)
    a7 = b7
    b7 = uniform01Value(state7)
    state7 = uniform01NextState(state7)
  }
  phase = (norm > 0.0 ? clamp01(sum / norm) : 0.0)
  output = phase
}
