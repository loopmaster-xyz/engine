// dprint-ignore-file

import {
  decodeArray,
  decodeAudio,
  decodeCellRef,
  isArray,
  isAudio,
  isCellRef,
  isFunction,
  isScalar,
  isUndefined,
} from './constants'
import { VmState } from './vm-state'
import { Cell } from './vm-types'

/** Central resource manager: alloc/retain/release for audio, arrays, cells. */

// @ts-ignore
// @inline
export function retainAudio(vm: VmState, ptr: u32): void {
  vm.arena.retain(ptr)
}

// @ts-ignore
// @inline
export function releaseAudio(vm: VmState, ptr: u32): void {
  vm.arena.releaseByPtr(ptr)
}

export function retainArray(vm: VmState, arrId: u32): void {
  if (arrId == 0 || arrId > u32(vm.arrays.length)) return
  const idx: i32 = i32(arrId) - 1
  assert(idx >= 0 && idx < vm.arrayRefcounts.length, 'retainArray: arrayRefcounts out of sync')
  vm.arrayRefcounts.set(idx, vm.arrayRefcounts.get(idx) + 1)
}

export function releaseArray(vm: VmState, arrId: u32): void {
  if (arrId == 0 || arrId > u32(vm.arrays.length)) return
  const idx: i32 = i32(arrId) - 1
  assert(idx >= 0 && idx < vm.arrayRefcounts.length, 'releaseArray: arrayRefcounts out of sync')
  let rc: u32 = vm.arrayRefcounts.get(idx)
  if (rc == 0) return
  rc--
  vm.arrayRefcounts.set(idx, rc)
  if (rc == 0) {
    const arr: Float64Array = vm.arrays.get(idx)
    const len: i32 = vm.arrayLengths.get(idx)
    const n: i32 = len < arr.length ? len : arr.length
    for (let i: i32 = 0; i < n; i++) {
      releaseValue(vm, arr[i])
    }
    if (arr.length > 0) vm.float64Arena.release(arr)
    vm.arrays.set(idx, VmState.EMPTY_FLOAT64_ARRAY)
    vm.arrayLengths.set(idx, 0)
    vm.arrayRefcounts.set(idx, 0)
  }
}

// @ts-ignore
// @inline
export function retainCell(vm: VmState, cellIdx: i32): void {
  if (cellIdx < 0 || cellIdx >= vm.cells.length) return
  const cell: Cell = vm.cells.get(cellIdx)
  cell.refcount++
}

// @ts-ignore
// @inline
export function releaseCell(vm: VmState, cellIdx: i32): void {
  if (cellIdx < 0 || cellIdx >= vm.cells.length) return
  const cell: Cell = vm.cells.get(cellIdx)
  if (cell.refcount == 0) return
  cell.refcount--
  if (cell.refcount == 0) {
    releaseValue(vm, cell.value)
    vm.cellPool.release(cell)
    vm.cellFreeList.push(cellIdx)
  }
}

// @ts-ignore
// @inline
export function isImmediateValue(tagged: f64): bool {
  return isScalar(tagged) || isUndefined(tagged) || isFunction(tagged)
}

// @ts-ignore
// @inline
export function retainManagedValue(vm: VmState, tagged: f64): void {
  if (isAudio(tagged)) vm.arena.retain(u32(decodeAudio(tagged)))
  else if (isArray(tagged)) retainArray(vm, decodeArray(tagged))
  else if (isCellRef(tagged)) retainCell(vm, decodeCellRef(tagged))
}

// @ts-ignore
// @inline
export function releaseManagedValue(vm: VmState, tagged: f64): void {
  if (isAudio(tagged)) vm.arena.releaseByPtr(u32(decodeAudio(tagged)))
  else if (isArray(tagged)) releaseArray(vm, decodeArray(tagged))
  else if (isCellRef(tagged)) releaseCell(vm, decodeCellRef(tagged))
}

// @ts-ignore
// @inline
export function retainValue(vm: VmState, tagged: f64): void {
  if (isImmediateValue(tagged)) return
  retainManagedValue(vm, tagged)
}

// @ts-ignore
// @inline
export function releaseValue(vm: VmState, tagged: f64): void {
  if (isImmediateValue(tagged)) return
  releaseManagedValue(vm, tagged)
}

/** Release all values in a Float64Array of tagged values (e.g. stereoArgs, closureOverride). */
export function releaseValuesInTaggedArray(vm: VmState, arr: Float64Array, len: i32): void {
  const n: i32 = len < arr.length ? len : arr.length
  for (let i: i32 = 0; i < n; i++) {
    releaseValue(vm, arr[i])
  }
}
