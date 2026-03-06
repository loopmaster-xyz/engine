// dprint-ignore-file

import {
  decodeArray,
  decodeAudio,
  decodeFunction,
  decodeScalar,
  encodeScalar,
  encodeUndefined,
  isArray,
  isAudio,
  isCellRef,
  isFunction,
  isScalar,
} from './constants'
import * as heap from './heap'
import { RunParams, RunResult } from './run-params'
import { VmState } from './vm-state'
import { StoreEntry } from './vm-types'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { readOperandI32, wrapIndex } from './util'

const STORE_COUNTER_KEY_BIAS: i32 = -1073741824
const STORE_HANDLE_ORDINAL_BITS: i32 = 12
const STORE_HANDLE_ORDINAL_MASK: i32 = (1 << STORE_HANDLE_ORDINAL_BITS) - 1
const STORE_HANDLE_CALLSITE_MAX: i32 = ((1 << 24) - 1) >> STORE_HANDLE_ORDINAL_BITS
const CLOSURE_FUNCTION_INSTANCE_MASK: u32 = 0x80000000

function storeCounterKey(callSiteId: i32): i32 {
  return STORE_COUNTER_KEY_BIAS - callSiteId
}

function nextStoreOrdinal(vm: VmState, callSiteId: i32): i32 {
  const key: i32 = storeCounterKey(callSiteId)
  const existing = vm.stepRegistry.tryGet(key)
  if (existing != null) {
    const entry = existing
    const ordinal: i32 = entry.currentIndex
    entry.currentIndex = ordinal + 1
    return ordinal
  }
  const entry = vm.stepEntryPool.acquire()
  entry.currentIndex = 1
  entry.lastTrig = 0.0
  vm.stepRegistry.set(key, entry)
  return 0
}

function buildStoreHandle(callSiteId: i32, ordinal: i32): i32 {
  if (callSiteId < 0 || callSiteId > STORE_HANDLE_CALLSITE_MAX) {
    throw new Error('store callsite capacity exceeded')
  }
  if (ordinal < 0 || ordinal > STORE_HANDLE_ORDINAL_MASK) {
    throw new Error('store ordinal capacity exceeded')
  }
  return (callSiteId << STORE_HANDLE_ORDINAL_BITS) | ordinal
}

function coerceStoreValue(value: f64): f64 {
  if (isAudio(value)) return encodeScalar(load<f32>(decodeAudio(value)))
  return value
}

function getStoreValueValidationError(value: f64): string | null {
  if (isArray(value)) return 'store does not support nested array/object values'
  if (isFunction(value)) {
    const functionId: u32 = decodeFunction(value)
    if ((functionId & CLOSURE_FUNCTION_INSTANCE_MASK) != 0) {
      return 'store does not support closure-bound function values'
    }
  }
  return null
}

function createStoreEntryFromInit(vm: VmState, initTagged: f64): StoreEntry {
  const initResolved: f64 = vmOpsVars.resolveCellRef(vm, initTagged)
  if (!isArray(initResolved)) {
    vmStack.releaseValueTagged(vm, initTagged)
    throw new Error('StoreInit requires array/object literal initializer')
  }
  const id: u32 = decodeArray(initResolved)
  if (id == 0 || id > u32(vm.arrays.length)) {
    vmStack.releaseValueTagged(vm, initTagged)
    throw new Error('StoreInit requires array/object literal initializer')
  }
  const idx: i32 = i32(id) - 1
  const valuesSrc: Float64Array = vm.arrays.get(idx)
  const srcLen: i32 = vm.arrayLengths.get(idx)
  const len: i32 = min(srcLen, valuesSrc.length)
  const valuesDst: Float64Array = len > 0 ? vm.float64Arena.get(len) : VmState.EMPTY_FLOAT64_ARRAY
  for (let i: i32 = 0; i < len; i++) {
    const resolvedValue: f64 = vmOpsVars.resolveCellRef(vm, valuesSrc[i])
    const coercedValue: f64 = coerceStoreValue(resolvedValue)
    const validationError: string | null = getStoreValueValidationError(coercedValue)
    if (validationError != null) {
      vmStack.releaseValueTagged(vm, initTagged)
      for (let j: i32 = 0; j < i; j++) {
        heap.releaseValue(vm, valuesDst[j])
      }
      if (valuesDst.length > 0) vm.float64Arena.release(valuesDst)
      throw new Error(validationError)
    }
    heap.retainValue(vm, coercedValue)
    valuesDst[i] = coercedValue
  }

  vmStack.releaseValueTagged(vm, initTagged)
  return vm.storeEntryPool.acquire(valuesDst, len)
}

function resolveWrappedStoreIndex(indexResolved: f64, len: i32): i32 {
  if (isAudio(indexResolved)) {
    const ptr: usize = decodeAudio(indexResolved)
    const value: f32 = load<f32>(ptr)
    return wrapIndex(i32(Math.floor(value)), len)
  }
  if (isScalar(indexResolved)) {
    return wrapIndex(i32(Math.floor(decodeScalar(indexResolved))), len)
  }
  return 0
}

function releaseStoreEntry(vm: VmState, entry: StoreEntry): void {
  const len: i32 = min(entry.length, entry.values.length)
  for (let i: i32 = 0; i < len; i++) {
    heap.releaseValue(vm, entry.values[i])
  }
  if (entry.values.length > 0) vm.float64Arena.release(entry.values)
  vm.storeEntryPool.release(entry)
}

export function resetStoreCounters(vm: VmState): void {
  const keys = vm.stepRegistry.keys()
  for (let i: i32 = 0; i < keys.length; i++) {
    const key: i32 = keys.get(i)
    if (key > STORE_COUNTER_KEY_BIAS) continue
    vm.stepEntryPool.release(vm.stepRegistry.get(key))
    vm.stepRegistry.delete(key)
  }
}

export function clearStoreRegistry(vm: VmState): void {
  const keys = vm.storeRegistry.keys()
  for (let i: i32 = 0; i < keys.length; i++) {
    const key: i32 = keys.get(i)
    releaseStoreEntry(vm, vm.storeRegistry.get(key))
  }
  vm.storeRegistry.clear()
}

export function copyStoreRegistry(dst: VmState, src: VmState): void {
  clearStoreRegistry(dst)
  const keys = src.storeRegistry.keys()
  for (let i: i32 = 0; i < keys.length; i++) {
    const key: i32 = keys.get(i)
    const srcEntry: StoreEntry = src.storeRegistry.get(key)
    const len: i32 = min(srcEntry.length, srcEntry.values.length)
    const values: Float64Array = len > 0 ? dst.float64Arena.get(len) : VmState.EMPTY_FLOAT64_ARRAY
    for (let j: i32 = 0; j < len; j++) {
      const value: f64 = srcEntry.values[j]
      heap.retainValue(dst, value)
      values[j] = value
    }
    dst.storeRegistry.set(key, dst.storeEntryPool.acquire(values, len))
  }
}

export function handleStoreInit(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const callSiteId: i32 = readOperandI32(opsPtr, pc)
  pc++
  const initTagged: f64 = vmStack.pop(vm)
  const ordinal: i32 = nextStoreOrdinal(vm, callSiteId)
  const handle: i32 = buildStoreHandle(callSiteId, ordinal)

  const existing: StoreEntry | null = vm.storeRegistry.tryGet(handle)
  if (existing != null) {
    vmStack.releaseValueTagged(vm, initTagged)
    vmStack.push(vm, encodeScalar(f32(handle)))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  const entry: StoreEntry = createStoreEntryFromInit(vm, initTagged)
  vm.storeRegistry.set(handle, entry)
  vmStack.push(vm, encodeScalar(f32(handle)))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

export function handleStoreGet(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const indexTagged: f64 = vmStack.pop(vm)
  const handleTagged: f64 = vmStack.pop(vm)
  const indexResolved: f64 = vmOpsVars.resolveCellRef(vm, indexTagged)
  const handleResolved: f64 = vmOpsVars.resolveCellRef(vm, handleTagged)
  if (!isScalar(handleResolved)) {
    vmStack.releaseValueTagged(vm, indexTagged)
    vmStack.releaseValueTagged(vm, handleTagged)
    throw new Error('StoreGet: handle must be scalar')
  }
  const handle: i32 = i32(Math.floor(decodeScalar(handleResolved)))
  const entry: StoreEntry | null = vm.storeRegistry.tryGet(handle)
  if (entry == null || entry.length <= 0) {
    vmStack.releaseValueTagged(vm, indexTagged)
    vmStack.releaseValueTagged(vm, handleTagged)
    vmStack.push(vm, encodeUndefined())
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const idx: i32 = resolveWrappedStoreIndex(indexResolved, entry.length)
  const value: f64 = entry.values[idx]
  vmStack.releaseValueTagged(vm, indexTagged)
  vmStack.releaseValueTagged(vm, handleTagged)
  vmStack.push(vm, value)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

export function handleStoreSet(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const valueTagged: f64 = vmStack.pop(vm)
  const indexTagged: f64 = vmStack.pop(vm)
  const handleTagged: f64 = vmStack.pop(vm)
  const valueResolved: f64 = vmOpsVars.resolveCellRef(vm, valueTagged)
  const coercedValue: f64 = coerceStoreValue(valueResolved)
  const indexResolved: f64 = vmOpsVars.resolveCellRef(vm, indexTagged)
  const handleResolved: f64 = vmOpsVars.resolveCellRef(vm, handleTagged)
  if (!isScalar(handleResolved)) {
    vmStack.releaseValueTagged(vm, valueTagged)
    vmStack.releaseValueTagged(vm, indexTagged)
    vmStack.releaseValueTagged(vm, handleTagged)
    throw new Error('StoreSet: handle must be scalar')
  }
  const validationError: string | null = getStoreValueValidationError(coercedValue)
  if (validationError != null) {
    vmStack.releaseValueTagged(vm, valueTagged)
    vmStack.releaseValueTagged(vm, indexTagged)
    vmStack.releaseValueTagged(vm, handleTagged)
    throw new Error(validationError)
  }
  const handle: i32 = i32(Math.floor(decodeScalar(handleResolved)))
  const entry: StoreEntry | null = vm.storeRegistry.tryGet(handle)
  if (entry == null || entry.length <= 0) {
    vmStack.releaseValueTagged(vm, valueTagged)
    vmStack.releaseValueTagged(vm, indexTagged)
    vmStack.releaseValueTagged(vm, handleTagged)
    throw new Error('StoreSet: unknown store handle')
  }
  const idx: i32 = resolveWrappedStoreIndex(indexResolved, entry.length)
  if (isCellRef(valueTagged) && coercedValue == valueResolved) heap.retainValue(vm, coercedValue)
  heap.releaseValue(vm, entry.values[idx])
  entry.values[idx] = coercedValue
  if (isAudio(valueResolved) && !isCellRef(valueTagged)) heap.releaseValue(vm, valueResolved)
  vmStack.releaseValueTagged(vm, indexTagged)
  vmStack.releaseValueTagged(vm, handleTagged)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
