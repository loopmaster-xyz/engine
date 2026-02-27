name: Ad
description: "Attack/Decay envelope"
category: "generators"
rate: "control"

parameters {
  attack { default: 0.005, min: 0.00001, unit: "s",
           description: "Attack time" }
  decay     { default: 0.200, min: 0.00001, unit: "s",
             description: "Decay time" }
  exponent  { default: 1.0, description: "Curve (0=linear, >0=power, <0=mirrored)" }
  trig      { description: "Trigger impulse" }
}

constants {
  RELEASE = 0
  ATTACK = 1
  DECAY = 2
}

fields {
  env: f32 = 0.0
  target: f32 = 1.0
}

emit {
  stage
  env
}

control {
  attackStep = target / (attack * sampleRate)
  decayStep = target / (decay * sampleRate)
}

audio {
  if trig > 0.0 && prevTrig <= 0.0 {
    env = 0.0
    stage = ATTACK
    target = trig
    attackStep = target / (attack * sampleRate)
    decayStep = target / (decay * sampleRate)
  }

  prevTrig = trig

  switch (stage) {
    case ATTACK:
      env = env + attackStep
      if env >= target {
        env = target
        stage = DECAY
      }
      break

    case DECAY:
      env = env - decayStep
      if env <= 0.0 {
        env = 0.0
        stage = RELEASE
      }
      break
  }

  output = applyCurve(env, exponent)
}
