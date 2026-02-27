// dprint-ignore-file

// Grain-based pitch shifter: overlap-add with Hann window, single-sample process.

const TWO_PI: f32 = Mathf.PI * 2.0

export class PitchShiftKernel {
  private bufferSize: i32 = 16384
  private grainSize: i32 = 8192
  private hopSize: i32 = 4096

  private writePos: i32 = 0
  private readPos: i32 = 0
  private outPhase: i32 = 0

  private buffer: Float32Array = new Float32Array(16384)
  private grainBuffer: Float32Array = new Float32Array(8192)
  private prevGrainBuffer: Float32Array = new Float32Array(8192)
  private window: Float32Array = new Float32Array(8192)

  constructor() {
    for (let i: i32 = 0; i < this.grainSize; i++) {
      this.window[i] = 0.5 - 0.5 * Mathf.cos(TWO_PI * f32(i) / f32(this.grainSize))
    }
  }

  reset(): void {
    this.writePos = 0
    this.readPos = 0
    this.outPhase = 0
    for (let i: i32 = 0; i < this.bufferSize; i++) {
      this.buffer[i] = 0.0
    }
    for (let i: i32 = 0; i < this.grainSize; i++) {
      this.grainBuffer[i] = 0.0
      this.prevGrainBuffer[i] = 0.0
    }
  }

  process(input: f32, ratio: f32): f32 {
    const pitchRatio: f32 = Mathf.max(0.25, Mathf.min(ratio, 4.0))
    const hopPhase: i32 = this.outPhase % this.hopSize

    if (hopPhase == 0) {
      for (let j: i32 = 0; j < this.grainSize; j++) {
        this.prevGrainBuffer[j] = this.grainBuffer[j]
      }
      for (let j: i32 = 0; j < this.grainSize; j++) {
        const idx: i32 = (this.readPos + j) % this.bufferSize
        this.grainBuffer[j] = this.buffer[idx]
      }
      this.readPos = (this.readPos + this.hopSize) % this.bufferSize
    }

    let sampleValue: f32 = 0.0

    const grainPos: f32 = f32(hopPhase) * pitchRatio
    const grainIdx: i32 = i32(Mathf.floor(grainPos))
    const grainFrac: f32 = grainPos - f32(grainIdx)

    if (grainIdx >= 0 && grainIdx < this.grainSize - 1 && grainPos < f32(this.grainSize - 1)) {
      const s0: f32 = this.grainBuffer[grainIdx]
      const s1: f32 = this.grainBuffer[grainIdx + 1]
      const interp: f32 = s0 + grainFrac * (s1 - s0)
      sampleValue += interp * this.window[hopPhase]
    } else if (grainIdx >= 0 && grainIdx < this.grainSize) {
      const clampedIdx: i32 = grainIdx < this.grainSize ? grainIdx : this.grainSize - 1
      sampleValue += this.grainBuffer[clampedIdx] * this.window[hopPhase]
    }

    const prevGrainPos: f32 = f32(hopPhase + this.hopSize) * pitchRatio
    const prevGrainIdx: i32 = i32(Mathf.floor(prevGrainPos))
    const prevGrainFrac: f32 = prevGrainPos - f32(prevGrainIdx)

    if (
      prevGrainIdx >= 0 &&
      prevGrainIdx < this.grainSize - 1 &&
      prevGrainPos < f32(this.grainSize - 1)
    ) {
      const s0: f32 = this.prevGrainBuffer[prevGrainIdx]
      const s1: f32 = this.prevGrainBuffer[prevGrainIdx + 1]
      const interp: f32 = s0 + prevGrainFrac * (s1 - s0)
      sampleValue += interp * this.window[hopPhase + this.hopSize]
    } else if (prevGrainIdx >= 0 && prevGrainIdx < this.grainSize) {
      const clampedIdx: i32 = prevGrainIdx < this.grainSize ? prevGrainIdx : this.grainSize - 1
      sampleValue += this.prevGrainBuffer[clampedIdx] * this.window[hopPhase + this.hopSize]
    }

    this.buffer[this.writePos] = input
    this.writePos = (this.writePos + 1) % this.bufferSize
    this.outPhase = (this.outPhase + 1) % (this.hopSize * 2)

    return sampleValue
  }
}
