name: Adsr
description: "Attack/Decay/Sustain/Release envelope"
category: "generators"
rate: "control"

parameters {
  attack  { default: 0.005, min: 0.00001, unit: "s",
            description: "Attack time" }
  decay   { default: 0.200, min: 0.00001, unit: "s",
            description: "Decay time" }
  sustain { default: 0.7, min: 0, max: 1,
            description: "Sustain level (0..1)" }
  release   { default: 0.300, min: 0.00001, unit: "s",
              description: "Release time" }
  exponent  { default: 1.0, description: "Curve (0=linear, >0=power, <0=mirrored)" }
  trig      { description: "Trigger (gate): high = hold sustain, low = release" }
}

constants {
  IDLE = 0
  ATTACK = 1
  DECAY = 2
  SUSTAIN = 3
  RELEASE = 4
}

control {
  attackStep = 1.0 / (attack * sampleRate)
  decayStep = (1.0 - sustain) / (decay * sampleRate)
}

fields {
  env: f32 = 0.0
  sustainLevel: f32 = 0.0
}

emit {
  stage
  env
}

audio {
  if trig > 0.0 && prevTrig <= 0.0 {
    env = 0.0
    stage = ATTACK
  }

  prevTrig = trig

  switch (stage) {
    case ATTACK:
      env = env + attackStep
      if env >= 1.0 {
        env = 1.0
        stage = DECAY
      }
      break

    case DECAY:
      if (1.0 - sustain) <= 0.0 {
        env = sustain
        stage = SUSTAIN
      } else {
        env = env - decayStep
        if env <= sustain {
          env = sustain
          stage = SUSTAIN
        }
      }
      break

    case SUSTAIN:
      if trig <= 0.0 {
        sustainLevel = env
        stage = RELEASE
      }
      break

    case RELEASE:
      releaseStep = sustainLevel / (release * sampleRate)
      env = env - releaseStep
      if env <= 0.0 {
        env = 0.0
        stage = IDLE
      }
      break
  }

  output = stage == IDLE ? 0.0 : applyCurve(env, exponent)
}
