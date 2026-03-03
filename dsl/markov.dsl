name: Markov
description: "Markov chain state sequencer with weighted transition probabilities"
category: "sequencers"
rate: "control"

import { floor, fract, sin, clamp, modFn }

parameters {
  states { default: 4,   min: 2,   max: 16,  description: "Number of states" }
  stay   { default: 0.3, min: 0.0, max: 1.0, description: "Probability of staying on current state" }
  step   { default: 0.5, min: 0.0, max: 1.0, description: "Probability of stepping to an adjacent state (remainder is random jump)" }
  bias   { default: 0.5, min: 0.0, max: 1.0, description: "Step direction bias (0=always down, 0.5=equal, 1=always up)" }
  seed   { default: 1.0,                      description: "Random seed" }
  trig   {                                     description: "Advance trigger" }
}

fields {
  state:    f32 = 0.0
  rng:      f32 = 0.5
  prevTrig: f32 = 0.0
  fired:    f32 = 0.0
}

emit {
  state
  fired
}

control {
  if fired {
    fired = 0.0
  }
}

audio {
  isRising = f32(trig > 0.0 && prevTrig <= 0.0)
  prevTrig = trig

  if isRising {
    // Two independent RNG taps via hash chain
    rng = fract(sin(rng * 127.1 + seed * 311.7) * 43758.5453)
    r1  = rng
    rng = fract(sin(rng * 269.5 + seed * 183.3) * 43758.5453)
    r2  = rng

    stayP = clamp(stay, 0.0, 1.0)
    stepP = clamp(step, 0.0, 1.0 - stayP)
    // jumpP = 1.0 - stayP - stepP  (implicit remainder)

    if r1 < stayP {
      // Stay on current state
      nextState = state

    } else if r1 < stayP + stepP {
      // Step ±1, wrapping, direction weighted by bias
      dir = f32(r2 < bias) * 2.0 - 1.0   // +1 or -1
      nextState = modFn(state + dir + states, states)

    } else {
      // Random jump to any state
      nextState = floor(r2 * states)
    }

    state = nextState
    fired = 1.0
  }

  output = state
}
