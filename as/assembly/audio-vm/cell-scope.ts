import { ArrayBufferPool } from './array-buffer-pool'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { VmState } from './vm-state'

/** Owns a set of cell indices; releases all on close. */
export class CellScope {
  cells: FastArray<i32>

  constructor(bufferPool: ArrayBufferPool<i32> | null = null) {
    this.cells = new FastArray<i32>(16, bufferPool)
  }

  // @inline
  register(vm: VmState, cellIdx: i32): void {
    this.cells.push(cellIdx)
  }

  // @inline
  releaseAll(vm: VmState, excludeCellIdx: i32 = -1): void {
    for (let i: i32 = 0; i < this.cells.length; i++) {
      const idx: i32 = this.cells.get(i)
      if (idx >= 0 && idx == excludeCellIdx) continue
      heap.releaseCell(vm, idx)
    }
    this.cells.clear()
  }

  // @inline
  clear(): void {
    this.cells.clear()
  }
}
