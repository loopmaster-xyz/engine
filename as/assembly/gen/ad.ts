// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, applyCurve, clamp, cos, cosNormalized, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'
export const RELEASE: f32 = f32(0)
export const ATTACK: f32 = f32(1)
export const DECAY: f32 = f32(2)

export class Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar = new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, exponent: f32, trig: f32): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const trigChanged: boolean = trig !== this.lastTrig
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || trigChanged || sampleRateChanged) {
      this.attackStep = (this.target / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || trigChanged || sampleRateChanged) {
      this.decayStep = (this.target / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio = new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  target: f32 = 1
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, exponent: f32, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        trig = load<f32>(trig$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar = new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastAttack: f32 = Infinity
  lastDecay: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastAttack = src.lastAttack
    this.lastDecay = src.lastDecay
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, trig: f32, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const trigChanged: boolean = trig !== this.lastTrig
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged || trigChanged || sampleRateChanged) {
      this.attackStep = (this.target / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    if (decayChanged || trigChanged || sampleRateChanged) {
      this.decayStep = (this.target / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        exponent$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio = new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  target: f32 = 1
  attackStep: f32
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.attackStep = src.attackStep
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay: f32, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const decayClamped: f32 = max(decay, 0.00001)

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep
    let decayStep: f32 = this.decayStep

    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar = new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastAttack: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastAttack = src.lastAttack
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, exponent: f32, trig: f32, decay$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const trigChanged: boolean = trig !== this.lastTrig
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || trigChanged || sampleRateChanged) {
      this.attackStep = (this.target / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep


    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = max(load<f32>(decay$), 0.00001)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
  }
}

export class Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio = new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  target: f32 = 1
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, exponent: f32, decay$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)

    let decayStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep


    let decayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = max(load<f32>(decay$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
  }
}

export class Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar = new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastAttack: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastAttack = src.lastAttack
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, trig: f32, decay$: usize, exponent$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const trigChanged: boolean = trig !== this.lastTrig
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let decayStep: f32 = 0

    if (attackChanged || trigChanged || sampleRateChanged) {
      this.attackStep = (this.target / (attackClamped * sampleRate))
      this.lastAttack = attackClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep


    let decayClamped: f32
    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = max(load<f32>(decay$), 0.00001)
        exponent = load<f32>(exponent$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        exponent$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
  }
}

export class Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio = new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio()

  env: f32 = 0
  target: f32 = 1
  attackStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.attackStep = src.attackStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, decay$: usize, exponent$: usize, trig$: usize): void {
    const attackClamped: f32 = max(attack, 0.00001)

    let decayStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let attackStep: f32 = this.attackStep


    let decayClamped: f32
    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        decayClamped = max(load<f32>(decay$), 0.00001)
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (target / (attackClamped * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        decay$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.attackStep = attackStep
  }
}

export class Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar = new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastDecay: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastDecay = src.lastDecay
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, exponent: f32, trig: f32, attack$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const trigChanged: boolean = trig !== this.lastTrig
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || trigChanged || sampleRateChanged) {
      this.decayStep = (this.target / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let decayStep: f32 = this.decayStep


    let attackClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio {
  static readonly defaultInstance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio = new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio()

  env: f32 = 0
  target: f32 = 1
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, exponent: f32, attack$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let decayStep: f32 = this.decayStep


    let attackClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar = new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  lastDecay: f32 = Infinity
  lastTrig: f32 = Infinity
  lastSampleRate: f32 = Infinity
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.lastDecay = src.lastDecay
    this.lastTrig = src.lastTrig
    this.lastSampleRate = src.lastSampleRate
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, trig: f32, attack$: usize, exponent$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)
    const decayChanged: boolean = decayClamped !== this.lastDecay
    const trigChanged: boolean = trig !== this.lastTrig
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0

    if (decayChanged || trigChanged || sampleRateChanged) {
      this.decayStep = (this.target / (decayClamped * sampleRate))
      this.lastDecay = decayClamped
      this.lastTrig = trig
      this.lastSampleRate = sampleRate
    }

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let decayStep: f32 = this.decayStep


    let attackClamped: f32
    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        exponent = load<f32>(exponent$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        exponent$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio {
  static readonly defaultInstance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio = new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio()

  env: f32 = 0
  target: f32 = 1
  decayStep: f32
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.decayStep = src.decayStep
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, decay: f32, attack$: usize, exponent$: usize, trig$: usize): void {
    const decayClamped: f32 = max(decay, 0.00001)

    let attackStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32

    let decayStep: f32 = this.decayStep


    let attackClamped: f32
    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (decayClamped * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
    this.decayStep = decayStep
  }
}

export class Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar = new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, exponent: f32, trig: f32, attack$: usize, decay$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32


    let attackClamped: f32
    let decayClamped: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        decayClamped = max(load<f32>(decay$), 0.00001)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
  }
}

export class Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio {
  static readonly defaultInstance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio = new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio()

  env: f32 = 0
  target: f32 = 1
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, exponent: f32, attack$: usize, decay$: usize, trig$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32


    let attackClamped: f32
    let decayClamped: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        decayClamped = max(load<f32>(decay$), 0.00001)
        trig = load<f32>(trig$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
  }
}

export class Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar {
  static readonly defaultInstance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar = new Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar()

  env: f32 = 0
  target: f32 = 1
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar): void {
    this.env = src.env
    this.target = src.target
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, trig: f32, attack$: usize, decay$: usize, exponent$: usize): void {

    let attackStep: f32 = 0
    let decayStep: f32 = 0

    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32


    let attackClamped: f32
    let decayClamped: f32
    let exponent: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        decayClamped = max(load<f32>(decay$), 0.00001)
        exponent = load<f32>(exponent$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        exponent$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
  }
}

export class Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio {
  static readonly defaultInstance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio = new Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio()

  env: f32 = 0
  target: f32 = 1
  lastSampleRate: f32 = Infinity
  prevTrig: f32
  stage: f32

  reset(): void {
    this.copyFrom(Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio.defaultInstance)
  }

  copyFrom(src: Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio): void {
    this.env = src.env
    this.target = src.target
    this.lastSampleRate = src.lastSampleRate
    this.prevTrig = src.prevTrig
    this.stage = src.stage
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack$: usize, decay$: usize, exponent$: usize, trig$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackStep: f32 = 0
    let decayStep: f32 = 0

    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let target: f32 = this.target
    let prevTrig: f32 = this.prevTrig
    let env: f32 = this.env
    let stage: f32 = this.stage
    let output: f32


    let attackClamped: f32
    let decayClamped: f32
    let exponent: f32
    let trig: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        attackClamped = max(load<f32>(attack$), 0.00001)
        decayClamped = max(load<f32>(decay$), 0.00001)
        exponent = load<f32>(exponent$)
        trig = load<f32>(trig$)
        attackStep = (target / (max(load<f32>(attack$), 0.00001) * sampleRate))
        decayStep = (target / (max(load<f32>(decay$), 0.00001) * sampleRate))
        if (((trig > 0) && (prevTrig <= 0))) {
          env = 0
          stage = ATTACK
          target = trig
          attackStep = (target / (attackClamped * sampleRate))
          decayStep = (target / (decayClamped * sampleRate))
        }
        prevTrig = trig
        switch (stage) {
          case ATTACK:
            env = (env + attackStep)
            if ((env >= target)) {
              env = target
              stage = DECAY
            }
            break
          case DECAY:
            env = (env - decayStep)
            if ((env <= 0)) {
              env = 0
              stage = RELEASE
            }
            break
        }
        output = applyCurve(env, exponent)
        store<f32>(output$, output)
        output$ += 4
        attack$ += 4
        decay$ += 4
        exponent$ += 4
        trig$ += 4
      })
    }

    this.target = target
    this.prevTrig = prevTrig
    this.env = env
    this.stage = stage
  }
}