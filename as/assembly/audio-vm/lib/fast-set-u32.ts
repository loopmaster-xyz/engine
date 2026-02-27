import { ArrayBufferPool } from '../array-buffer-pool'
import { FastArray } from './fast-array'

/** GC-free set of u32: single backing array, linear scan for membership. */
export class FastSetU32 {
  private arr: FastArray<u32>

  constructor(initialCap: i32 = 16, bufferPool: ArrayBufferPool<u32> | null = null) {
    this.arr = new FastArray<u32>(initialCap, bufferPool)
  }

  // @inline
  add(value: u32): void {
    if (!this.has(value)) this.arr.push(value)
  }

  // @inline
  has(value: u32): bool {
    for (let i: i32 = 0; i < this.arr.length; i++) {
      if (this.arr.get(i) == value) return true
    }
    return false
  }

  // @inline
  clear(): void {
    this.arr.clear()
  }

  resetCounters(): void {
    this.arr.resetCounters()
  }

  // @inline
  get length(): i32 {
    return this.arr.length
  }

  // @inline
  getAt(index: i32): u32 {
    return this.arr.get(index)
  }
}
