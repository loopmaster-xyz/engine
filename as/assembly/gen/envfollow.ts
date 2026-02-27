// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import { TWO_PI, abs, applyCurve, clamp, cos, cosNormalized, exp, floor, fract01, log, max, min, polyBlep, pow, sin, sinNormalized, sqrt, warn } from '../util'

export class Envfollow_default_attack_scalar_release_scalar {
  static readonly defaultInstance: Envfollow_default_attack_scalar_release_scalar = new Envfollow_default_attack_scalar_release_scalar()

  envelope: f32 = 0
  lastAttack: f32 = Infinity
  lastRelease: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackTime: f32
  releaseTime: f32
  attackCoeff: f32
  releaseCoeff: f32

  reset(): void {
    this.copyFrom(Envfollow_default_attack_scalar_release_scalar.defaultInstance)
  }

  copyFrom(src: Envfollow_default_attack_scalar_release_scalar): void {
    this.envelope = src.envelope
    this.lastAttack = src.lastAttack
    this.lastRelease = src.lastRelease
    this.lastSampleRate = src.lastSampleRate
    this.attackTime = src.attackTime
    this.releaseTime = src.releaseTime
    this.attackCoeff = src.attackCoeff
    this.releaseCoeff = src.releaseCoeff
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release: f32): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 10)
    const releaseClamped: f32 = clamp(release, 0.0001, 10)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const releaseChanged: boolean = releaseClamped !== this.lastRelease
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    if (attackChanged) {
      this.attackTime = max(0.0001, min(attackClamped, 10))
      this.lastAttack = attackClamped
    }

    if (releaseChanged) {
      this.releaseTime = max(0.0001, min(releaseClamped, 10))
      this.lastRelease = releaseClamped
    }

    if (attackChanged || sampleRateChanged) {
      this.attackCoeff = exp((-1 / (this.attackTime * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    if (releaseChanged || sampleRateChanged) {
      this.releaseCoeff = exp((-1 / (this.releaseTime * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    let envelope: f32 = this.envelope
    let input: f32
    let output: f32
    let attackCoeff: f32 = this.attackCoeff
    let releaseCoeff: f32 = this.releaseCoeff

    let inputAbs: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        inputAbs = abs(input)
        if ((inputAbs > envelope)) {
          envelope = (inputAbs + ((envelope - inputAbs) * attackCoeff))
        } else {
          envelope = (inputAbs + ((envelope - inputAbs) * releaseCoeff))
        }
        envelope = max(0, min(envelope, 1))
        output = envelope
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
      })
    }

    this.envelope = envelope
  }
}

export class Envfollow_default_attack_scalar_release_audio {
  static readonly defaultInstance: Envfollow_default_attack_scalar_release_audio = new Envfollow_default_attack_scalar_release_audio()

  envelope: f32 = 0
  lastAttack: f32 = Infinity
  lastSampleRate: f32 = Infinity
  attackTime: f32
  attackCoeff: f32

  reset(): void {
    this.copyFrom(Envfollow_default_attack_scalar_release_audio.defaultInstance)
  }

  copyFrom(src: Envfollow_default_attack_scalar_release_audio): void {
    this.envelope = src.envelope
    this.lastAttack = src.lastAttack
    this.lastSampleRate = src.lastSampleRate
    this.attackTime = src.attackTime
    this.attackCoeff = src.attackCoeff
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack: f32, release$: usize): void {
    const attackClamped: f32 = clamp(attack, 0.0001, 10)
    const attackChanged: boolean = attackClamped !== this.lastAttack
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let releaseCoeff: f32 = 0

    if (attackChanged) {
      this.attackTime = max(0.0001, min(attackClamped, 10))
      this.lastAttack = attackClamped
    }

    if (attackChanged || sampleRateChanged) {
      this.attackCoeff = exp((-1 / (this.attackTime * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    let envelope: f32 = this.envelope
    let input: f32
    let output: f32
    let attackCoeff: f32 = this.attackCoeff

    let inputAbs: f32

    let releaseTime: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        releaseTime = max(0.0001, min(clamp(load<f32>(release$), 0.0001, 10), 10))
        releaseCoeff = exp((-1 / (releaseTime * sampleRate)))
        inputAbs = abs(input)
        if ((inputAbs > envelope)) {
          envelope = (inputAbs + ((envelope - inputAbs) * attackCoeff))
        } else {
          envelope = (inputAbs + ((envelope - inputAbs) * releaseCoeff))
        }
        envelope = max(0, min(envelope, 1))
        output = envelope
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        release$ += 4
      })
    }

    this.envelope = envelope
  }
}

export class Envfollow_default_attack_audio_release_scalar {
  static readonly defaultInstance: Envfollow_default_attack_audio_release_scalar = new Envfollow_default_attack_audio_release_scalar()

  envelope: f32 = 0
  lastRelease: f32 = Infinity
  lastSampleRate: f32 = Infinity
  releaseTime: f32
  releaseCoeff: f32

  reset(): void {
    this.copyFrom(Envfollow_default_attack_audio_release_scalar.defaultInstance)
  }

  copyFrom(src: Envfollow_default_attack_audio_release_scalar): void {
    this.envelope = src.envelope
    this.lastRelease = src.lastRelease
    this.lastSampleRate = src.lastSampleRate
    this.releaseTime = src.releaseTime
    this.releaseCoeff = src.releaseCoeff
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, release: f32, attack$: usize): void {
    const releaseClamped: f32 = clamp(release, 0.0001, 10)
    const releaseChanged: boolean = releaseClamped !== this.lastRelease
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackCoeff: f32 = 0

    if (releaseChanged) {
      this.releaseTime = max(0.0001, min(releaseClamped, 10))
      this.lastRelease = releaseClamped
    }

    if (releaseChanged || sampleRateChanged) {
      this.releaseCoeff = exp((-1 / (this.releaseTime * sampleRate)))
      this.lastSampleRate = sampleRate
    }

    let envelope: f32 = this.envelope
    let input: f32
    let output: f32
    let releaseCoeff: f32 = this.releaseCoeff

    let inputAbs: f32

    let attackTime: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        attackTime = max(0.0001, min(clamp(load<f32>(attack$), 0.0001, 10), 10))
        attackCoeff = exp((-1 / (attackTime * sampleRate)))
        inputAbs = abs(input)
        if ((inputAbs > envelope)) {
          envelope = (inputAbs + ((envelope - inputAbs) * attackCoeff))
        } else {
          envelope = (inputAbs + ((envelope - inputAbs) * releaseCoeff))
        }
        envelope = max(0, min(envelope, 1))
        output = envelope
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
      })
    }

    this.envelope = envelope
  }
}

export class Envfollow_default_attack_audio_release_audio {
  static readonly defaultInstance: Envfollow_default_attack_audio_release_audio = new Envfollow_default_attack_audio_release_audio()

  envelope: f32 = 0
  lastSampleRate: f32 = Infinity

  reset(): void {
    this.copyFrom(Envfollow_default_attack_audio_release_audio.defaultInstance)
  }

  copyFrom(src: Envfollow_default_attack_audio_release_audio): void {
    this.envelope = src.envelope
    this.lastSampleRate = src.lastSampleRate
  }

  process(bufferLength: i32, sampleCount: i32, sampleRate: f32, nyquist: f32, piOverNyquist: f32, bpm: f32, co: f32, samplesPerBeat: f32, samplesPerBar: f32, input$: usize, output$: usize, attack$: usize, release$: usize): void {
    const sampleRateChanged: boolean = sampleRate !== this.lastSampleRate


    let attackCoeff: f32 = 0
    let releaseCoeff: f32 = 0

    if (sampleRateChanged) {
      this.lastSampleRate = sampleRate
    }


    let envelope: f32 = this.envelope
    let input: f32
    let output: f32

    let inputAbs: f32

    let attackTime: f32
    let releaseTime: f32
    for (let i = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        input = load<f32>(input$)
        attackTime = max(0.0001, min(clamp(load<f32>(attack$), 0.0001, 10), 10))
        releaseTime = max(0.0001, min(clamp(load<f32>(release$), 0.0001, 10), 10))
        attackCoeff = exp((-1 / (attackTime * sampleRate)))
        releaseCoeff = exp((-1 / (releaseTime * sampleRate)))
        inputAbs = abs(input)
        if ((inputAbs > envelope)) {
          envelope = (inputAbs + ((envelope - inputAbs) * attackCoeff))
        } else {
          envelope = (inputAbs + ((envelope - inputAbs) * releaseCoeff))
        }
        envelope = max(0, min(envelope, 1))
        output = envelope
        store<f32>(output$, output)
        input$ += 4
        output$ += 4
        attack$ += 4
        release$ += 4
      })
    }

    this.envelope = envelope
  }
}