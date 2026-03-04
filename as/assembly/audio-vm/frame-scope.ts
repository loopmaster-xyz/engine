import { ArrayBufferPool } from './array-buffer-pool'
import { decodeCellRef, isCellRef } from './constants'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { VmState } from './vm-state'
import { CallFrame, ClosureEnv } from './vm-types'

/** Per-frame locals tracking; release on return/throw. */
export class FrameScope {
  locals: FastArray<i32>

  constructor(bufferPool: ArrayBufferPool<i32> | null = null) {
    this.locals = new FastArray<i32>(16, bufferPool)
  }

  trackCell(idx: i32): void {
    this.locals.push(idx)
  }

  releaseAll(vm: VmState, frame: CallFrame, returnValue: f64): void {
    for (let i: i32 = 0; i < vm.locals.length; i++) {
      const cellIdx: i32 = vm.locals.get(i)
      if (cellIdx < 0 || cellIdx >= vm.cells.length) continue
      if (isCellInLocalsSaved(frame, cellIdx)) continue
      if (isCellInClosureEnv(vm, cellIdx)) continue
      if (isCellRef(returnValue) && decodeCellRef(returnValue) == cellIdx) continue

      heap.releaseCell(vm, cellIdx)
    }
  }
}

function isCellInLocalsSaved(frame: CallFrame, cellIdx: i32): bool {
  for (let i: i32 = 0; i < frame.localsSaved.length; i++) {
    if (frame.localsSaved.get(i) == cellIdx) return true
  }
  return false
}

function isCellInClosureEnv(vm: VmState, cellIdx: i32): bool {
  const envIds: FastArray<i32> = vm.closureEnvs.keys()
  for (let e: i32 = 0; e < envIds.length; e++) {
    const env: ClosureEnv | null = vm.closureEnvs.tryGet(envIds.get(e))
    if (env == null) continue
    for (let c: i32 = 0; c < env.cells.length; c++) {
      if (env.cells.get(c) == cellIdx) return true
    }
  }
  return false
}
