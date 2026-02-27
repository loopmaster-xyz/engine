import {
  decodeArray,
  decodeAudio,
  encodeArray,
  encodeAudio,
  encodeScalar,
  encodeUndefined,
  isArray,
  isAudio,
  isScalar,
} from './constants'
import { GenSlot } from './gen-history'
import { resolveAndPushAbsolutePC, writeCallStackMetaToHistory, writeTaggedSampleAt } from './gen-op-helpers'
import * as heap from './heap'
import { RunParams, RunResult } from './run-params'
import { readOperandI32, wrapIndex, wrappedIndexFromAudioAt, wrappedIndexFromScalar } from './util'
import { ValueScope } from './value-scope'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { ArraySlotResult } from './vm-types'

export enum ArrayOpName {
  Step,
  Random,
  Walk,
  Glide,
  ArrayLen,
  ArrayGet,
  ArraySet,
  ArrayPush,
  OutSolo,
  ApplyMixResultToOutput,
  GetArrayElement,
  BinaryArray,
}

export function arrayOpNameString(op: ArrayOpName): string {
  switch (op) {
    case ArrayOpName.Step:
      return 'Step'
    case ArrayOpName.Random:
      return 'Random'
    case ArrayOpName.Walk:
      return 'Walk'
    case ArrayOpName.Glide:
      return 'Glide'
    case ArrayOpName.ArrayLen:
      return 'ArrayLen'
    case ArrayOpName.ArrayGet:
      return 'ArrayGet'
    case ArrayOpName.ArraySet:
      return 'ArraySet'
    case ArrayOpName.ArrayPush:
      return 'ArrayPush'
    case ArrayOpName.OutSolo:
      return 'OutSolo'
    case ArrayOpName.ApplyMixResultToOutput:
      return 'applyMixResultToOutput'
    case ArrayOpName.GetArrayElement:
      return 'getArrayElement'
    case ArrayOpName.BinaryArray:
      return 'binary array'
    default:
      return 'array'
  }
}

/** Validate array id and return zero-based index or throw. */
export function getArrayIndexOrThrow(vm: VmState, id: u32, op: ArrayOpName): i32 {
  if (id == 0 || id > u32(vm.arrays.length)) {
    const opName: string = arrayOpNameString(op)
    throw new Error(opName + ': id=' + id.toString() + ' arrays.length=' + vm.arrays.length.toString())
  }
  return i32(id) - 1
}

export { ArraySlotResult } from './vm-types'

/** Resolve tagged, require array, return slot (values + length). Caller must release to vm.arraySlotResultPool. */
export function getArraySlotFromTagged(vm: VmState, tagged: f64, op: ArrayOpName): ArraySlotResult {
  const resolved: f64 = vmOpsVars.resolveCellRef(vm, tagged)
  if (!isArray(resolved)) throw new Error(arrayOpNameString(op) + ': not array')
  const id: u32 = decodeArray(resolved)
  const idx: i32 = getArrayIndexOrThrow(vm, id, op)
  const result: ArraySlotResult = vm.arraySlotResultPool.acquire()
  result.values = vm.arrays.get(idx)
  result.length = vm.arrayLengths.get(idx)
  return result
}

/** Return array element at index (wrapped), with cell ref resolved. */
export function getElementAt(vm: VmState, values: Float64Array, index: i32, length: i32): f64 {
  return vmOpsVars.resolveCellRef(vm, values[wrapIndex(index, length)])
}

/** Pop len values, create array, push array ref. */
export function handleMakeArray(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const len: i32 = readOperandI32(opsPtr, pc)
  pc++
  const values: Float64Array = len > 0 ? vm.float64Arena.get(len) : VmState.EMPTY_FLOAT64_ARRAY
  for (let i: i32 = len - 1; i >= 0; i--) {
    values[i] = vmStack.pop(vm)
  }
  vm.arrays.push(values)
  vm.arrayLengths.push(len)
  vm.arrayRefcounts.push(0)
  vmStack.push(vm, encodeArray(u32(vm.arrays.length))) // push retains
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop array, push its length as scalar. */
export function handleArrayLen(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const tagged: f64 = vmStack.pop(vm)
  scope.track(tagged)
  const resolved: f64 = vmOpsVars.resolveCellRef(vm, tagged)
  if (!isArray(resolved)) throw new Error('ArrayLen: not array')
  const id: u32 = decodeArray(resolved)
  const idxLen: i32 = getArrayIndexOrThrow(vm, id, ArrayOpName.ArrayLen)
  const len: i32 = vm.arrayLengths.get(idxLen)
  vm.valueScopePool.release(scope)
  vmStack.push(vm, encodeScalar(f32(len)))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop count values and array; append values to array (up to maxLen); push array. */
export function handleArrayPush(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const count: i32 = readOperandI32(opsPtr, pc)
  pc++
  if (count <= 0) throw new Error(`ArrayPush: count=${count} <= 0`)
  const newValues: Float64Array = vm.float64Arena.get(count)
  for (let i: i32 = count - 1; i >= 0; i--) {
    newValues[i] = vmStack.pop(vm)
  }
  const arrTagged: f64 = vmStack.pop(vm)
  scope.track(arrTagged)
  const arrResolved: f64 = vmOpsVars.resolveCellRef(vm, arrTagged)
  if (!isArray(arrResolved)) {
    for (let i: i32 = 0; i < count; i++) heap.releaseValue(vm, newValues[i])
    vm.float64Arena.release(newValues)
    vm.valueScopePool.release(scope)
    throw new Error('ArrayPush: not array')
  }
  const id: u32 = decodeArray(arrResolved)
  if (id == 0 || id > u32(vm.arrays.length)) {
    for (let i: i32 = 0; i < count; i++) heap.releaseValue(vm, newValues[i])
    vm.float64Arena.release(newValues)
    vm.valueScopePool.release(scope)
    throw new Error('ArrayPush: id=' + id.toString() + ' arrays.length=' + vm.arrays.length.toString())
  }
  const idx: i32 = i32(id) - 1
  const oldValues: Float64Array = vm.arrays.get(idx)
  const oldLen: i32 = vm.arrayLengths.get(idx)
  const maxLen: i32 = 1024
  const newLen: i32 = min(oldLen + count, maxLen)
  const actualCount: i32 = newLen - oldLen
  const combined: Float64Array = vm.float64Arena.get(newLen)
  for (let i: i32 = 0; i < oldLen; i++) combined[i] = oldValues[i]
  for (let i: i32 = 0; i < actualCount; i++) {
    const v: f64 = newValues[i]
    heap.retainValue(vm, v)
    combined[oldLen + i] = v
  }
  for (let i: i32 = 0; i < count; i++) {
    heap.releaseValue(vm, newValues[i])
  }
  if (oldValues.length > 0) vm.float64Arena.release(oldValues)
  vm.float64Arena.release(newValues)
  vm.arrays.set(idx, combined)
  vm.arrayLengths.set(idx, newLen)
  vmStack.push(vm, arrTagged)
  vm.valueScopePool.release(scope)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** ArrayGet: pop index and array; push array[index] (or undefined). Index can be scalar (single element) or audio (per-sample indices). */
export function handleArrayGet(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  pc++
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const indexTagged: f64 = vmStack.pop(vm)
  scope.track(indexTagged)
  const arrTagged: f64 = vmStack.pop(vm)
  scope.track(arrTagged)
  const slot: GenSlot = vm.arrayGetGenPoolIndex >= 0
    ? vm.genPools[vm.arrayGetGenPoolIndex].get()
    : changetype<GenSlot>(0)

  const indexResolved: f64 = vmOpsVars.resolveCellRef(vm, indexTagged)
  const arrResolved: f64 = vmOpsVars.resolveCellRef(vm, arrTagged)
  if (!isArray(arrResolved)) throw new Error('ArrayGet: not array')
  const id: u32 = decodeArray(arrResolved)
  const idxArr: i32 = getArrayIndexOrThrow(vm, id, ArrayOpName.ArrayGet)
  const values: Float64Array = vm.arrays.get(idxArr)
  const len: i32 = vm.arrayLengths.get(idxArr)
  let recordIdx: i32 = -1
  if (len <= 0) {
    vmStack.push(vm, encodeUndefined())
  }
  else {
    const n: i32 = min(values.length, len)
    if (n <= 0) {
      vmStack.push(vm, encodeUndefined())
    }
    else if (isAudio(indexResolved)) {
      const indexPtr: usize = decodeAudio(indexResolved)
      recordIdx = wrappedIndexFromAudioAt(indexPtr, 0, n)
      const output: Float32Array = vm.arena.get(params.bufferLength)
      const outPtr: usize = output.dataStart
      for (let i: i32 = 0; i < params.bufferLength; i++) {
        const idx: i32 = wrappedIndexFromAudioAt(indexPtr, i, n)
        const elem: f64 = getElementAt(vm, values, idx, n)
        writeTaggedSampleAt(elem, outPtr, i)
      }
      vmStack.push(vm, encodeAudio(outPtr), true)
    }
    else if (isScalar(indexResolved)) {
      recordIdx = wrappedIndexFromScalar(indexResolved, n)
      const elem: f64 = getElementAt(vm, values, recordIdx, n)
      if (isAudio(elem)) {
        vmStack.pushAudioCopy(vm, elem, params.bufferLength)
      }
      else {
        vmStack.push(vm, elem)
      }
    }
    else {
      vmStack.push(vm, encodeUndefined())
    }
  }

  if (vm.arrayGetGenPoolIndex >= 0) {
    resolveAndPushAbsolutePC(vm, pc - 1)
    writeCallStackMetaToHistory(vm, slot.history)
    vm.paramScratch[0] = f32(recordIdx)
    slot.history.write(params.sampleCount, vm.paramScratch)
    if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  }

  vm.valueScopePool.release(scope)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop value, index, array; set array[wrappedIndex] = value (release old, retain new). */
export function handleArraySet(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const valueTagged: f64 = vmStack.pop(vm)
  const indexTagged: f64 = vmStack.pop(vm)
  scope.track(indexTagged)
  const arrTagged: f64 = vmStack.pop(vm)
  scope.track(arrTagged)
  const indexResolved: f64 = vmOpsVars.resolveCellRef(vm, indexTagged)
  const arrResolved: f64 = vmOpsVars.resolveCellRef(vm, arrTagged)
  if (!isArray(arrResolved) || !isScalar(indexResolved)) throw new Error('ArraySet: arr must be array and index scalar')
  const id: u32 = decodeArray(arrResolved)
  const idxArr: i32 = getArrayIndexOrThrow(vm, id, ArrayOpName.ArraySet)
  const len: i32 = vm.arrayLengths.get(idxArr)
  if (len <= 0) throw new Error(`ArraySet: len=${len} <= 0`)
  const idx: i32 = wrappedIndexFromScalar(indexResolved, len)
  assert(idx >= 0 && idx < len, 'ArraySet: idx')
  const arr: Float64Array = vm.arrays.get(idxArr)
  const oldVal: f64 = arr[idx]
  heap.releaseValue(vm, oldVal)
  arr[idx] = valueTagged
  vm.valueScopePool.release(scope)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
