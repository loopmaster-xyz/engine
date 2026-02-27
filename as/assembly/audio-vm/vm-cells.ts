import { decodeCellRef, encodeUndefined, isCellRef, isUndefined } from './constants'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { VmState } from './vm-state'
import { CallFrame, Cell, ClosureEnv } from './vm-types'

export function isCellInGlobals(vm: VmState, cellIdx: i32): bool {
  for (let i: i32 = 0; i < vm.globals.length; i++) {
    if (vm.globals.get(i) == cellIdx) return true
  }
  return false
}

export function isCellInClosureEnvs(vm: VmState, cellIdx: i32): bool {
  const envIds: FastArray<i32> = vm.closureEnvs.keys()
  for (let e: i32 = 0; e < envIds.length; e++) {
    if (!vm.closureEnvs.has(envIds.get(e))) continue
    const env: ClosureEnv = vm.closureEnvs.get(envIds.get(e))
    for (let c: i32 = 0; c < env.cells.length; c++) {
      if (env.cells.get(c) == cellIdx) return true
    }
  }
  return false
}

/** Cell storage: get/set cell value, closure override, release to free list. */
function getCellValueRaw(vm: VmState, cellIdx: i32): f64 {
  if (cellIdx < 0 || cellIdx >= vm.cells.length) return encodeUndefined()
  if (vm.callStack.length > 0) {
    const frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
    const ov: Float64Array | null = frame.closureOverride
    if (ov != null && frame.closureEnvId >= 0 && vm.closureEnvs.has(frame.closureEnvId)) {
      const env: ClosureEnv = vm.closureEnvs.get(frame.closureEnvId)
      for (let i: i32 = 0; i < env.cells.length; i++) {
        if (env.cells.get(i) == cellIdx && i < ov.length) {
          const over: f64 = ov[i]
          if (!isUndefined(over)) return over
          break
        }
      }
    }
  }
  return vm.cells.get(cellIdx).value
}

const MAX_CELL_REF_DEPTH: i32 = 32

export function getCellValue(vm: VmState, cellIdx: i32): f64 {
  let v: f64 = getCellValueRaw(vm, cellIdx)
  let depth: i32 = 0
  while (isCellRef(v) && depth < MAX_CELL_REF_DEPTH) {
    v = getCellValueRaw(vm, decodeCellRef(v))
    depth++
  }
  return v
}

export function isCellIndexInFreeList(vm: VmState, idx: i32): bool {
  for (let i: i32 = 0; i < vm.cellFreeList.length; i++) {
    if (vm.cellFreeList.get(i) == idx) return true
  }
  return false
}

export function allocateCell(vm: VmState, value: f64): i32 {
  if (vm.cellFreeList.length > 0) {
    const idx: i32 = vm.cellFreeList.pop()
    const cell: Cell = vm.cellPool.acquire(value)
    vm.cells.set(idx, cell)
    return idx
  }
  vm.cells.push(vm.cellPool.acquire(value))
  return vm.cells.length - 1
}

export function releaseCell(vm: VmState, cellIdx: i32): void {
  heap.releaseCell(vm, cellIdx)
}

export function releaseFrameLocals(vm: VmState, frame: CallFrame, returnValue: f64): void {
  const exclude: i32 = isCellRef(returnValue) ? decodeCellRef(returnValue) : -1
  frame.frameCells.releaseAll(vm, exclude)
}

export function registerFrameCell(vm: VmState, cellIdx: i32): void {
  if (vm.callStack.length > 0) {
    const frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
    frame.frameCells.register(vm, cellIdx)
  }
}
