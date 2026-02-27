// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'
export const IDLE: f32 = f32(0)
export const ATTACK: f32 = f32(1)
export const DECAY: f32 = f32(2)
export const SUSTAIN: f32 = f32(3)
export const RELEASE: f32 = f32(4)

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, release: f32, exponent: f32, trig: f32): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, release: f32, exponent: f32, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, release: f32, trig: f32, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, release: f32, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, exponent: f32, trig: f32, release$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, exponent: f32, release$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, trig: f32, release$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let exponent: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain: f32, release$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    let exponent: f32
    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, release: f32, exponent: f32, trig: f32, sustain$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, release: f32, exponent: f32, sustain$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, release: f32, trig: f32, sustain$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, release: f32, sustain$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, exponent: f32, trig: f32, sustain$: usize, release$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, exponent: f32, sustain$: usize, release$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, trig: f32, sustain$: usize, release$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, sustain$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, release: f32, exponent: f32, trig: f32, decay$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, release: f32, exponent: f32, decay$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, release: f32, trig: f32, decay$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, release: f32, decay$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, exponent: f32, trig: f32, decay$: usize, release$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, exponent: f32, decay$: usize, release$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, trig: f32, decay$: usize, release$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, sustain: f32, decay$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, exponent: f32, trig: f32, decay$: usize, sustain$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, exponent: f32, decay$: usize, sustain$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, trig: f32, decay$: usize, sustain$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32, decay$: usize, sustain$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, exponent: f32, trig: f32, decay$: usize, sustain$: usize, release$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, exponent: f32, decay$: usize, sustain$: usize, release$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, trig: f32, decay$: usize, sustain$: usize, release$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay$: usize, sustain$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || sampleRateChanged) {
      this.attackStep = (1 / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let attackStep: f32 = this.attackStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, release: f32, exponent: f32, trig: f32, attack$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, release: f32, exponent: f32, attack$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, release: f32, trig: f32, attack$: usize, exponent$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, release: f32, attack$: usize, exponent$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, exponent: f32, trig: f32, attack$: usize, release$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, exponent: f32, attack$: usize, release$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, trig: f32, attack$: usize, release$: usize, exponent$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastDecay: f32 = Infinity
  lastSustain: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastDecay = src.lastDecay
    this.lastSustain = src.lastSustain
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, sustain: f32, attack$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sustainChanged: boolean = sustainClamped !== this.lastSustain
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || sustainChanged || sampleRateChanged) {
      this.decayStep = ((1 - sustainClamped) / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastSustain = sustainClamped
      this.lastSampleRate = sampleRate
    }

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32
    let decayStep: f32 = this.decayStep

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, release: f32, exponent: f32, trig: f32, attack$: usize, sustain$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, release: f32, exponent: f32, attack$: usize, sustain$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, release: f32, trig: f32, attack$: usize, sustain$: usize, exponent$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, release: f32, attack$: usize, sustain$: usize, exponent$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, exponent: f32, trig: f32, attack$: usize, sustain$: usize, release$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, exponent: f32, attack$: usize, sustain$: usize, release$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, trig: f32, attack$: usize, sustain$: usize, release$: usize, exponent$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, attack$: usize, sustain$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, release: f32, exponent: f32, trig: f32, attack$: usize, decay$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32

    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, release: f32, exponent: f32, attack$: usize, decay$: usize, trig$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, release: f32, trig: f32, attack$: usize, decay$: usize, exponent$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, release: f32, attack$: usize, decay$: usize, exponent$: usize, trig$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, exponent: f32, trig: f32, attack$: usize, decay$: usize, release$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, exponent: f32, attack$: usize, decay$: usize, release$: usize, trig$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, trig: f32, attack$: usize, decay$: usize, release$: usize, exponent$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, sustain: f32, attack$: usize, decay$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const sustainClamped: f32 = clamp(sustain, 0, 1)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - sustainClamped) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, exponent: f32, trig: f32, attack$: usize, decay$: usize, sustain$: usize): void {
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, exponent: f32, attack$: usize, decay$: usize, sustain$: usize, trig$: usize): void {
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, trig: f32, attack$: usize, decay$: usize, sustain$: usize, exponent$: usize): void {
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, attack$: usize, decay$: usize, sustain$: usize, exponent$: usize, trig$: usize): void {
    const releaseClamped: f32 = max(release, 0.00001)

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, exponent: f32, trig: f32, attack$: usize, decay$: usize, sustain$: usize, release$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, exponent: f32, attack$: usize, decay$: usize, sustain$: usize, release$: usize, trig$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  sustainLevel: f32 = 0
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, attack$: usize, decay$: usize, sustain$: usize, release$: usize, exponent$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}

export class Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio = new Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio()

  env: f32 = 0
  sustainLevel: f32 = 0
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.sustainLevel = src.sustainLevel
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack$: usize, decay$: usize, sustain$: usize, release$: usize, exponent$: usize, trig$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0
    let decayStep: f32 = 0

    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let sustainLevel: f32 = this.sustainLevel
    let output: f32

    let releaseStep: f32


    let exponent: f32
    let releaseClamped: f32
    let sustainClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        releaseClamped = max(load<f32>(release$), 0.00001)
        sustainClamped = clamp(load<f32>(sustain$), 0, 1)
        trig = load<f32>(trig$)
        attackStep = (1 / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = ((1 - clamp(load<f32>(sustain$), 0, 1)) / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= 1)) {
              env = 1
              stage = DECAY
            }
            break
          case DECAY:
            if (((1 - sustainClamped) <= 0)) {
              env = sustainClamped
              stage = SUSTAIN
            } else {
              env = (env - decayStep)
              if ((env <= sustainClamped)) {
                env = sustainClamped
                stage = SUSTAIN
              }
            }
            break
          case SUSTAIN:
            if ((trig <= 0)) {
              sustainLevel = env
              stage = RELEASE
            }
            break
          case RELEASE:
            releaseStep = (sustainLevel / (releaseClamped * sampleRate))
            env = (env - releaseStep)
            if ((env <= 0)) {
              env = 0
              stage = IDLE
            }
            break
        }
        output = (stage == IDLE) ? 0 : applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        sustain$ += 4
        release$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.sustainLevel = sustainLevel
  }
}