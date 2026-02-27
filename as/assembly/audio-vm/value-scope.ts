import { ArrayBufferPool } from './array-buffer-pool'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { VmState } from './vm-state'

/** Tracks values for batch release. */
export class ValueScope {
  private values: FastArray<f64>
  private vm: VmState

  constructor(vm: VmState, bufferPool: ArrayBufferPool<f64> | null = null) {
    this.vm = vm
    this.values = new FastArray<f64>(16, bufferPool)
  }

  // @inline
  init(vm: VmState): void {
    this.vm = vm
    this.values.clear()
  }

  track(tagged: f64): void {
    this.values.push(tagged)
  }

  releaseAll(): void {
    for (let i: i32 = 0; i < this.values.length; i++) {
      heap.releaseValue(this.vm, this.values.get(i))
    }
    this.values.clear()
  }
}
