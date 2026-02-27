import { ArrayBufferPool } from '../array-buffer-pool'
import { FastArray } from './fast-array'

/** GC-free map u32 -> u32: parallel key/value arrays, linear scan. */
export class FastMapU32U32 {
  private keys: FastArray<u32>
  private values: FastArray<u32>

  constructor(initialCap: i32 = 16, bufferPool: ArrayBufferPool<u32> | null = null) {
    this.keys = new FastArray<u32>(initialCap, bufferPool)
    this.values = new FastArray<u32>(initialCap, bufferPool)
  }

  // @inline
  set(key: u32, value: u32): void {
    for (let i: i32 = 0; i < this.keys.length; i++) {
      if (this.keys.get(i) == key) {
        this.values.set(i, value)
        return
      }
    }
    this.keys.push(key)
    this.values.push(value)
  }

  // @inline
  has(key: u32): bool {
    for (let i: i32 = 0; i < this.keys.length; i++) {
      if (this.keys.get(i) == key) return true
    }
    return false
  }

  // @inline
  get(key: u32): u32 {
    for (let i: i32 = 0; i < this.keys.length; i++) {
      if (this.keys.get(i) == key) return this.values.get(i)
    }
    return 0
  }

  // @inline
  clear(): void {
    this.keys.clear()
    this.values.clear()
  }

  resetCounters(): void {
    this.keys.resetCounters()
    this.values.resetCounters()
  }

  valuesLength(): i32 {
    return this.values.length
  }

  valueAt(index: i32): u32 {
    return this.values.get(index)
  }
}
