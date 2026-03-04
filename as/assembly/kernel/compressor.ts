export class CompressorKernel {
  sampleRate: f32 = 44100.0
  targetGain: f32 = 1.0
  currentGain: f32 = 1.0
  inputLevel: f32 = 0.0
  gainReduction: f32 = 0.0

  reset(): void {
    this.targetGain = 1.0
    this.currentGain = 1.0
  }

  setSampleRate(sampleRate: f32): void {
    this.sampleRate = sampleRate
  }

  // @inline
  process(
    inSample: f32,
    keySample: f32,
    attack: f32,
    release: f32,
    threshold: f32,
    ratio: f32,
    knee: f32,
  ): f32 {
    const th0: f32 = threshold
    const r0: f32 = ratio
    const att0: f32 = attack
    const rel0: f32 = release
    const k0: f32 = knee

    const th: f32 = Mathf.max(-80.0, Mathf.min(th0, 0.0))
    const r: f32 = Mathf.max(1.0, Mathf.min(r0, 20.0))
    const att: f32 = Mathf.max(0.0001, Mathf.min(att0, 1.0))
    const rel: f32 = Mathf.max(0.0001, Mathf.min(rel0, 5.0))
    const k: f32 = Mathf.max(0.0, Mathf.min(k0, 40.0))

    const sr: f32 = this.sampleRate
    const attackCoeff: f32 = Mathf.exp(-3.0 / (att * sr))
    const releaseCoeff: f32 = Mathf.exp(-3.0 / (rel * sr))

    const ratioFactor: f32 = 1.0 - 1.0 / r
    const safeK: f32 = Mathf.max(k, 1e-12)

    const keyLevel: f32 = Mathf.abs(keySample)
    const safeLevel: f32 = Mathf.max(keyLevel, 0.0001)
    const inputDb: f32 = 20.0 * Mathf.log10(safeLevel)

    const halfK: f32 = k * 0.5
    const delta: f32 = inputDb - th

    const belowKnee: f32 = f32(delta < -halfK)
    const aboveKnee: f32 = f32(delta > halfK)
    const inKnee: f32 = (1.0 - aboveKnee) * (1.0 - belowKnee)

    const linearReduction: f32 = delta * ratioFactor

    const kneeInput: f32 = delta + halfK
    const kneeOvershoot: f32 = kneeInput / safeK
    const overThreshold: f32 = kneeInput - halfK
    const kneeReduction: f32 = overThreshold * ratioFactor * kneeOvershoot

    const hasKnee: f32 = f32(k > 0.0)
    const noKnee: f32 = 1.0 - hasKnee

    const kneeResult: f32 = inKnee * kneeReduction + aboveKnee * linearReduction
    const noKneeResult: f32 = f32(inputDb > th) * linearReduction

    let reductionDb: f32 = hasKnee * kneeResult + noKnee * noKneeResult
    reductionDb = Mathf.max(0.0, reductionDb)

    const hasReduction: f32 = f32(reductionDb > 0.0)
    const targetGain: f32 = hasReduction * Mathf.max(0.0, Mathf.pow(10.0, -reductionDb / 20.0))
      + (1.0 - hasReduction) * 1.0
    this.targetGain = targetGain

    const isAttack: f32 = f32(this.currentGain > targetGain)
    const attackGain: f32 = targetGain + (this.currentGain - targetGain) * attackCoeff
    const releaseGain: f32 = targetGain - (targetGain - this.currentGain) * releaseCoeff
    this.currentGain = isAttack * attackGain + (1.0 - isAttack) * releaseGain

    this.currentGain = Mathf.max(0.0, Mathf.min(1.0, this.currentGain))
    this.inputLevel = keyLevel
    this.gainReduction = 1.0 - this.currentGain

    return inSample * this.currentGain
  }
}
