const TWO_PI: f32 = 2 * Mathf.PI
const INV_TWO_PI: f32 = 1.0 / TWO_PI

const FRAC_BITS: i32 = 12
const FRAC_SCALE: f32 = f32(1 << FRAC_BITS)
const FRAC_MASK: i32 = (1 << FRAC_BITS) - 1

export class SincosKernel {
  private sinTable!: Float32Array
  private cosTable!: Float32Array
  private tableSize: i32
  private tableLength: i32
  private initialized: bool = false

  constructor(bits: i32) {
    this.tableSize = 1 << bits
    this.tableLength = this.tableSize + 1
    this.sinTable = new Float32Array(this.tableLength)
    this.cosTable = new Float32Array(this.tableLength)
    this.initialize()
  }

  private initialize(): void {
    if (this.initialized) {
      return
    }
    const step: f32 = TWO_PI / f32(this.tableSize)
    for (let i: i32 = 0; i < this.tableSize; i++) {
      const angle: f32 = f32(i) * step
      this.sinTable[i] = Mathf.sin(angle)
      this.cosTable[i] = Mathf.cos(angle)
    }
    // Add extra sample for interpolation (same as first sample for wrapping)
    this.sinTable[this.tableSize] = this.sinTable[0]
    this.cosTable[this.tableSize] = this.cosTable[0]
    this.initialized = true
  }

  reset(): void {
    // No state to reset for wavetables
  }

  @inline
  private lookupInterpolated(table: Float32Array, phase: f32): f32 {
    let normalizedPhase: f32 = phase % TWO_PI
    if (normalizedPhase < 0.0) {
      normalizedPhase = normalizedPhase + TWO_PI
    }
    return this.lookupInterpolatedNormalized(table, normalizedPhase * INV_TWO_PI)
  }

  @inline
  private lookupInterpolatedNormalized(table: Float32Array, phaseNormalized: f32): f32 {
    const mask: i32 = this.tableSize - 1
    const x: i32 = i32(phaseNormalized * f32(this.tableSize) * FRAC_SCALE)
    const idx0: i32 = (x >> FRAC_BITS) & mask
    const fract: f32 = f32(x & FRAC_MASK) / FRAC_SCALE
    const idx1: i32 = idx0 + 1
    const v0: f32 = load<f32>(table.dataStart + idx0 * 4)
    const v1: f32 = load<f32>(table.dataStart + idx1 * 4)
    return v0 + (v1 - v0) * fract
  }

  @inline
  lookupSin(phase: f32): f32 {
    return this.lookupInterpolated(this.sinTable, phase)
  }

  @inline
  lookupSinNormalized(phaseNormalized: f32): f32 {
    return this.lookupInterpolatedNormalized(this.sinTable, phaseNormalized)
  }

  @inline
  lookupCos(phase: f32): f32 {
    return this.lookupInterpolated(this.cosTable, phase)
  }

  @inline
  lookupCosNormalized(phaseNormalized: f32): f32 {
    return this.lookupInterpolatedNormalized(this.cosTable, phaseNormalized)
  }
}
