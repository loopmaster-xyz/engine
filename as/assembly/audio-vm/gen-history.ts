import { Float32Arena, Int32Arena } from './arenas'

/** History buffers for a gen (params, input/output rings, meta). */
export class GenHistory {
  int32Arena: Int32Arena = changetype<Int32Arena>(0)
  float32Arena: Float32Arena = changetype<Float32Arena>(0)
  typeId: i32 = 0
  paramCount: i32 = 0
  size: i32 = 0
  mask: i32 = 0
  writeIndex: i32 = 0
  sampleCounts: Int32Array = new Int32Array(0)
  values: Float32Array = new Float32Array(0)
  meta: Uint32Array = new Uint32Array(0)
  metaOffset: i32 = 0
  inputRing: Float32Array = new Float32Array(0)
  outputRing: Float32Array = new Float32Array(0)
  inputChunkPos: i32 = 0
  outputChunkPos: i32 = 0

  reset(): void {
    this.writeIndex = 0
    this.inputChunkPos = 0
    this.outputChunkPos = 0
    if (this.sampleCounts.length > 0) {
      memory.fill(this.sampleCounts.dataStart, 0xFF, usize(this.sampleCounts.length) << 2)
    }
    if (this.values.length > 0) {
      memory.fill(this.values.dataStart, 0, usize(this.values.length) << 2)
    }
    if (this.inputRing.length > 0) {
      memory.fill(this.inputRing.dataStart, 0, usize(this.inputRing.length) << 2)
    }
    if (this.outputRing.length > 0) {
      memory.fill(this.outputRing.dataStart, 0, usize(this.outputRing.length) << 2)
    }
    if (this.meta.length > 0) {
      this.meta[this.metaOffset + 3] = u32(this.writeIndex)
      this.meta[this.metaOffset + 7] = u32(this.inputChunkPos)
      this.meta[this.metaOffset + 9] = u32(this.outputChunkPos)
      // Reset call stack frames to -1 (0 is a valid PC)
      for (let i: i32 = 0; i < 8; i++) {
        this.meta[this.metaOffset + 12 + i] = u32(0xFFFFFFFF)
      }
    }
  }

  // Release large arrays to arenas - history becomes unusable after this
  dispose(): void {
    if (this.sampleCounts.length > 0) {
      this.int32Arena.release(this.sampleCounts)
      this.sampleCounts = new Int32Array(0)
    }
    if (this.values.length > 0) {
      this.float32Arena.release(this.values)
      this.values = new Float32Array(0)
    }
    if (this.inputRing.length > 0) {
      this.float32Arena.release(this.inputRing)
      this.inputRing = new Float32Array(0)
    }
    if (this.outputRing.length > 0) {
      this.float32Arena.release(this.outputRing)
      this.outputRing = new Float32Array(0)
    }
  }

  // @inline
  write(sampleCount: i32, params: Float32Array): void {
    const index: i32 = this.writeIndex
    this.sampleCounts[index] = sampleCount
    let offset: i32 = index * this.paramCount
    let i: i32 = 0
    while (i < this.paramCount) {
      this.values[offset + i] = params[i]
      i++
    }
    this.writeIndex = (index + 1) & this.mask
    this.meta[this.metaOffset + 3] = u32(this.writeIndex)
  }
}

export class GenSlot {
  instance: Object = changetype<Object>(0)
  history: GenHistory = changetype<GenHistory>(0)
}
