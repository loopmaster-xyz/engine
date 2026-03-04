// dprint-ignore-file

import {
  decodeArray,
  decodeAudio,
  decodeScalar,
  encodeArray,
  encodeAudio,
  encodeScalar,
  encodeUndefined,
  getBpmOverride,
  HISTORY_META_STRIDE,
  isArray,
  isAudio,
  isCellRef,
  isScalar,
  isUndefined
} from './constants'
import * as heap from './heap'
import { debugAudioVmOp } from './imports'
import { FastArray } from './lib/fast-array'
import {
  handleMathBinary,
  handleMathTernary,
  handleMathUnary,
} from './math-funcs'
import { MathOps } from './math-ops'
import * as resample from './resample'
import { RunParams, RunResult } from './run-params'
import { taggedTypeName } from './util'
import * as vmCells from './vm-cells'
import { OS_DOWN_BOXCAR, OS_UP_LINEAR } from './vm-constants'
import { AudioVmOp, FIRST_GEN_OP } from './vm-op'
import * as vmOpsArray from './vm-ops-array'
import * as vmOpsBuffer from './vm-ops-buffer'
import * as vmOpsControl from './vm-ops-control'
import { handleGenOp } from './vm-ops-gens'
import * as vmOpsGlide from './vm-ops-glide'
import * as vmOpsKernels from './vm-ops-kernels'
import * as vmOpsMath from './vm-ops-math'
import * as vmOpsOutput from './vm-ops-output'
import * as vmOpsRandom from './vm-ops-random'
import * as vmOpsStack from './vm-ops-stack'
import * as vmOpsStep from './vm-ops-step'
import * as vmOpsTable from './vm-ops-table'
import * as vmOpsTime from './vm-ops-time'
import * as vmOpsType from './vm-ops-type'
import * as vmOpsVars from './vm-ops-vars'
import * as vmOpsWalk from './vm-ops-walk'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { BufferEntry, CallFrame, Cell, ClosureEnv } from './vm-types'

export * from './vm-state'

/** Allocate new VM state. */
export function createVmState(): VmState {
  return new VmState()
}

// @ts-ignore
// @inline
export function push(vm: VmState, value: f64, move: bool = false): void {
  vmStack.push(vm, value, move)
}

// @ts-ignore
// @inline
export function pop(vm: VmState): f64 {
  return vmStack.pop(vm)
}

// @ts-ignore
// @inline
export function ensureStackCapacity(vm: VmState, required: i32): void {
  vmStack.ensureStackCapacity(vm, required)
}

// @ts-ignore
// @inline
export function releaseStackRange(vm: VmState, from: i32, to: i32): void {
  vmStack.releaseStackRange(vm, from, to)
}

// @ts-ignore
// @inline
export function releaseOutsRange(vm: VmState, from: i32, to: i32): void {
  vmStack.releaseOutsRange(vm, from, to)
}

function releaseElementsInArray(vm: VmState, arr: Float64Array, cap: i32): void {
  for (let i: i32 = 0; i < cap; i++) {
    heap.releaseValue(vm, arr[i])
  }
}

/** Release all elements in array slot and free array storage; clear slot. */
function releaseArraySlot(vm: VmState, idx: i32): void {
  if (idx < 0 || idx >= vm.arrays.length) return
  assert(idx >= 0 && idx < vm.arrays.length, 'releaseArraySlot: idx')
  const arr: Float64Array = vm.arrays.get(idx)
  const len: i32 = vm.arrayLengths.get(idx)
  releaseElementsInArray(vm, arr, len)
  vm.arrays.set(idx, VmState.EMPTY_FLOAT64_ARRAY)
  vm.arrayLengths.set(idx, 0)
  vm.arrayRefcounts.set(idx, 0)
  if (arr.length > 0) vm.float64Arena.release(arr)
}

// @ts-ignore
// @inline
/** Resample buffer (boxcar/decimate or linear). */
export function downsample(vm: VmState, input$: usize, output$: usize, outputSize: i32, factor: i32): void {
  if (vm.osDownMode == OS_DOWN_BOXCAR) {
    resample.downsampleBoxcar(input$, output$, outputSize, factor)
  }
  else {
    resample.downsampleDecimate(input$, output$, outputSize, factor)
  }
}

// @ts-ignore
// @inline
/** Resample buffer (linear or hold). */
export function upsample(vm: VmState, input$: usize, output$: usize, inputSize: i32, factor: i32): void {
  if (vm.osUpMode == OS_UP_LINEAR) {
    resample.upsampleLinear(input$, output$, inputSize, factor)
  }
  else {
    resample.upsampleHold(input$, output$, inputSize, factor)
  }
}

// @ts-ignore
// @inline
/** Apply unary op to tagged (scalar or audio); return result. */
export function unary(vm: VmState, op: AudioVmOp, tagged: f64, bufferLength: i32): f64 {
  if (isCellRef(tagged)) tagged = vmOpsVars.resolveCellRef(vm, tagged)
  if (isScalar(tagged)) {
    const value: f32 = decodeScalar(tagged)
    const result: f32 = MathOps.unaryScalar(op, value)
    return encodeScalar(result)
  }
  else if (isAudio(tagged)) {
    const inputPtr: usize = decodeAudio(tagged)
    const procLen: i32 = (bufferLength + 15) & ~15
    const output: Float32Array = vm.arena.get(procLen)
    const outputPtr: usize = output.dataStart
    MathOps.unaryAudio(op, inputPtr, outputPtr, procLen)
    return encodeAudio(outputPtr)
  }
  return encodeUndefined()
}

// @ts-ignore
// @inline
/** Apply binary op to left, right (scalar/audio mix); return result. */
export function binary(vm: VmState, op: AudioVmOp, left: f64, right: f64, bufferLength: i32): f64 {
  if (isCellRef(left)) left = vmOpsVars.resolveCellRef(vm, left)
  if (isCellRef(right)) right = vmOpsVars.resolveCellRef(vm, right)
  if (isUndefined(left)) left = encodeScalar(0.0)
  if (isUndefined(right)) right = encodeScalar(0.0)
  const leftIsArray: bool = isArray(left)
  const rightIsArray: bool = isArray(right)
  if (leftIsArray || rightIsArray) {
    if (leftIsArray && rightIsArray) {
      const leftId: u32 = decodeArray(left)
      const leftIdx: i32 = vmOpsArray.getArrayIndexOrThrow(vm, leftId, vmOpsArray.ArrayOpName.BinaryArray)
      const leftValues: Float64Array = vm.arrays.get(leftIdx)
      const leftLen: i32 = vm.arrayLengths.get(leftIdx)

      const rightId: u32 = decodeArray(right)
      const rightIdx: i32 = vmOpsArray.getArrayIndexOrThrow(vm, rightId, vmOpsArray.ArrayOpName.BinaryArray)
      const rightValues: Float64Array = vm.arrays.get(rightIdx)
      const rightLen: i32 = vm.arrayLengths.get(rightIdx)

      if (leftLen != rightLen) throw new Error('Binary op array to array requires equal lengths')

      const resultValues: Float64Array = vm.float64Arena.get(leftLen)
      for (let i: i32 = 0; i < leftLen; i++) {
        const leftElem: f64 = vmOpsVars.resolveCellRef(vm, leftValues[i])
        const rightElem: f64 = vmOpsVars.resolveCellRef(vm, rightValues[i])
        resultValues[i] = binary(vm, op, leftElem, rightElem, bufferLength)
      }

      vm.arrays.push(resultValues)
      vm.arrayLengths.push(leftLen)
      vm.arrayRefcounts.push(0)
      const newId: u32 = u32(vm.arrays.length)
      heap.retainArray(vm, newId)
      return encodeArray(newId)
    }

    const arrTagged: f64 = leftIsArray ? left : right
    const other: f64 = leftIsArray ? right : left
    if (!isScalar(other) && !isAudio(other)) throw new Error('Binary op array requires scalar or audio operand')
    const id: u32 = decodeArray(arrTagged)
    const idx: i32 = vmOpsArray.getArrayIndexOrThrow(vm, id, vmOpsArray.ArrayOpName.BinaryArray)
    const values: Float64Array = vm.arrays.get(idx)
    const len: i32 = vm.arrayLengths.get(idx)
    const resultValues: Float64Array = vm.float64Arena.get(len)
    for (let i: i32 = 0; i < len; i++) {
      const elem: f64 = vmOpsVars.resolveCellRef(vm, values[i])
      const leftArg: f64 = leftIsArray ? elem : other
      const rightArg: f64 = leftIsArray ? other : elem
      resultValues[i] = binary(vm, op, leftArg, rightArg, bufferLength)
    }
    vm.arrays.push(resultValues)
    vm.arrayLengths.push(len)
    vm.arrayRefcounts.push(0)
    const newId: u32 = u32(vm.arrays.length)
    heap.retainArray(vm, newId)
    return encodeArray(newId)
  }
  const leftIsAudio: bool = isAudio(left)
  const rightIsAudio: bool = isAudio(right)
  if (!leftIsAudio && !rightIsAudio) {
    const lv: f32 = decodeScalar(left)
    const rv: f32 = decodeScalar(right)
    const result: f32 = MathOps.binaryScalar(op, lv, rv)
    return encodeScalar(result)
  }
  if (!isScalar(left) && !isAudio(left)) {
    throw new Error('Binary op left must be scalar or audio, got: ' + taggedTypeName(left))
  }
  if (!isScalar(right) && !isAudio(right)) {
    throw new Error('Binary op right must be scalar or audio, got: ' + taggedTypeName(right))
  }
  const procLen: i32 = (bufferLength + 15) & ~15
  const output: Float32Array = vm.arena.get(procLen)
  const outputPtr: usize = output.dataStart
  let leftPtr: usize = 0
  let rightPtr: usize = 0
  let leftScalar: f32 = 0.0
  let rightScalar: f32 = 0.0
  if (leftIsAudio) {
    leftPtr = decodeAudio(left)
  }
  else {
    leftScalar = decodeScalar(left)
  }
  if (rightIsAudio) {
    rightPtr = decodeAudio(right)
  }
  else {
    rightScalar = decodeScalar(right)
  }
  MathOps.binaryAudio(op, leftPtr, leftScalar, rightPtr, rightScalar, outputPtr, procLen, leftIsAudio, rightIsAudio)
  return encodeAudio(outputPtr)
}

// @ts-ignore
// @inline
export function genOpUnknownNextPc(_vm: VmState, pc: i32): i32 {
  return pc + 1
}

// @ts-ignore
// @inline
export function setOversampleModes(vm: VmState, upMode: i32, downMode: i32): void {
  vm.osUpMode = upMode
  vm.osDownMode = downMode
}

// @ts-ignore
// @inline
export function copyAudioVmStateFrom(dst: VmState, src: VmState): void {
  dst.currentBpm = src.currentBpm
  dst.co = src.co
  dst.samplesPerBeat = src.samplesPerBeat
  dst.samplesPerBar = src.samplesPerBar
  dst.osUpMode = src.osUpMode
  dst.osDownMode = src.osDownMode
  for (let i: i32 = 0; i < dst.genPools.length; i++) {
    dst.genPools[i].copyFrom(src.genPools[i])
  }
}

/** Teardown call stack, upsample cache, function instances; release frame resources. */
function releaseRuntimeState(vm: VmState): void {
  while (vm.callStack.length > 0) {
    const frame: CallFrame = vm.callStack.pop()
    if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
    vmCells.releaseFrameLocals(vm, frame, encodeUndefined())
    vm.locals.length = 0
    for (let i: i32 = 0; i < frame.localsSaved.length; i++) vm.locals.push(frame.localsSaved.get(i))
    vm.fastArrayI32Pool.release(frame.localsSaved)
    if (frame.stereoArgs != null) {
      heap.releaseValuesInTaggedArray(vm, frame.stereoArgs!, frame.stereoArgs!.length)
      vm.float64Arena.release(frame.stereoArgs!)
    }
    if (frame.closureOverride != null) {
      heap.releaseValuesInTaggedArray(vm, frame.closureOverride!, frame.closureOverride!.length)
      vm.float64Arena.release(frame.closureOverride!)
    }
    if (frame.tempArrayIds != null) vm.fastArrayU32Pool.release(frame.tempArrayIds!)
    vm.callFramePool.release(frame)
  }
  const cacheLen: i32 = vm.upsampleCache.valuesLength()
  for (let i: i32 = 0; i < cacheLen; i++) {
    vm.arena.releaseByPtr(vm.upsampleCache.valueAt(i))
  }
  vm.upsampleCache.clear()
  if (!vm.preserveFunctionState) {
    const instIds: FastArray<i32> = vm.functionInstances.keys()
    for (let i: i32 = 0; i < instIds.length; i++) {
      vm.functionInstancePool.release(vm.functionInstances.get(instIds.get(i)))
    }
    vm.functionInstances.clear()
    const envIds: FastArray<i32> = vm.closureEnvs.keys()
    for (let i: i32 = 0; i < envIds.length; i++) {
      const env: ClosureEnv = vm.closureEnvs.get(envIds.get(i))
      for (let j: i32 = 0; j < env.cells.length; j++) {
        heap.releaseCell(vm, env.cells.get(j))
      }
      vm.closureEnvPool.release(vm.fastArrayI32Pool, env)
    }
    vm.closureEnvs.clear()
  }
}

/** Release globals, locals, all cells; free cells to pool. */
function releaseGlobalsAndCells(vm: VmState): void {
  for (let g: i32 = 0; g < vm.globals.length; g++) {
    const cellIdx: i32 = vm.globals.get(g)
    if (cellIdx >= 0 && cellIdx < vm.cells.length) heap.releaseCell(vm, cellIdx)
  }
  vm.globals.length = 0
  for (let l: i32 = 0; l < vm.locals.length; l++) {
    const cellIdx: i32 = vm.locals.get(l)
    if (cellIdx >= 0 && cellIdx < vm.cells.length) heap.releaseCell(vm, cellIdx)
  }
  vm.locals.length = 0
  for (let c: i32 = 0; c < vm.cells.length; c++) {
    if (vmCells.isCellIndexInFreeList(vm, c)) continue
    heap.releaseCell(vm, c)
  }
}

/** Full reset before a new run: tear down all previous state, allocate output buffers. */
function prepareForRun(vm: VmState, bufferLength: i32, opsLength: i32, sampleRate: f32, bpm: f32): void {
  vmOpsVars.flushPendingReleaseAudio(vm)
  vmOpsBuffer.resetAllocCounters(vm)
  releaseOutputs(vm)
  if (!vm.preserveFunctionState) {
    if (vm.arrays.length > 0) {
      for (let a: i32 = 0; a < vm.arrays.length; a++) releaseArraySlot(vm, a)
      vm.arrays.length = 0
      vm.arrayLengths.length = 0
      vm.arrayRefcounts.length = 0
      if (vm.outputLeft.length > 0) vm.arena.release(vm.outputLeft)
      if (vm.outputRight.length > 0) vm.arena.release(vm.outputRight)
      vm.outputLeft = VmState.EMPTY_OUTPUT
      vm.outputRight = VmState.EMPTY_OUTPUT
    }
    vm.arena.drainPendingFree()
    releaseRuntimeState(vm)
    releaseGlobalsAndCells(vm)
    vmOpsVars.flushPendingReleaseAudio(vm)
    vm.locals.length = 0
    vm.arena.drainPendingFree()
  }
  else {
    releaseArrayElementRefs(vm)
    const cacheLen: i32 = vm.upsampleCache.valuesLength()
    for (let i: i32 = 0; i < cacheLen; i++) {
      vm.arena.releaseByPtr(vm.upsampleCache.valueAt(i))
    }
    vm.upsampleCache.clear()
    vm.arena.drainPendingFree()
  }
  vm.nextBufferHandle = 0
  vm.pendingReleaseAudio.clear()
  vm.arena.drainPendingFree()

  const overrideBpm: f32 = getBpmOverride()
  vm.currentBpm = overrideBpm != 0.0 ? overrideBpm : bpm
  vm.co = 60.0 / vm.currentBpm
  vm.samplesPerBeat = sampleRate * vm.co
  vm.samplesPerBar = vm.samplesPerBeat * 4.0
  if (vm.outputLeft.length < bufferLength || vm.outputRight.length < bufferLength) {
    if (vm.outputLeft.length > 0) vm.arena.release(vm.outputLeft)
    if (vm.outputRight.length > 0) vm.arena.release(vm.outputRight)
    vm.outputLeft = vm.arena.get(bufferLength)
    vm.outputRight = vm.arena.get(bufferLength)
    memory.fill(vm.outputLeft.dataStart, 0, usize(bufferLength) << 2)
    memory.fill(vm.outputRight.dataStart, 0, usize(bufferLength) << 2)
  }

  ensureStackCapacity(vm, opsLength)
  const genPoolCount: i32 = vm.genPools.length
  for (let i: i32 = 0; i < genPoolCount; i++) vm.genPools[i].resetIndex()
  vm.resetArenaPoolCounters()
}

/** Release audio in arrays to free arena; keep scalars and functions so getArrayElement and record callbacks work. */
function releaseArrayElementRefs(vm: VmState): void {
  for (let a: i32 = 0; a < vm.arrays.length; a++) {
    const arr: Float64Array = vm.arrays.get(a)
    const len: i32 = vm.arrayLengths.get(a)
    for (let i: i32 = 0; i < len; i++) {
      const v: f64 = arr[i]
      if (isAudio(v)) {
        heap.releaseValue(vm, v)
        arr[i] = encodeUndefined()
      }
    }
  }
}

/** Release audio in globals and locals; keep scalars so getArrayElement and captured values work. */
function releaseAudioInCells(vm: VmState): void {
  for (let g: i32 = 0; g < vm.globals.length; g++) {
    const cellIdx: i32 = vm.globals.get(g)
    if (cellIdx >= 0 && cellIdx < vm.cells.length) {
      vmOpsVars.releaseAudioInCell(vm, vm.cells.get(cellIdx))
    }
  }
  for (let l: i32 = 0; l < vm.locals.length; l++) {
    const cellIdx: i32 = vm.locals.get(l)
    if (cellIdx >= 0 && cellIdx < vm.cells.length) {
      vmOpsVars.releaseAudioInCell(vm, vm.cells.get(cellIdx))
    }
  }
  if (vm.preserveFunctionState) {
    const envIds: FastArray<i32> = vm.closureEnvs.keys()
    for (let i: i32 = 0; i < envIds.length; i++) {
      const env: ClosureEnv = vm.closureEnvs.get(envIds.get(i))
      for (let j: i32 = 0; j < env.cells.length; j++) {
        const cellIdx: i32 = env.cells.get(j)
        if (cellIdx >= 0 && cellIdx < vm.cells.length) {
          vmOpsVars.releaseAudioInCell(vm, vm.cells.get(cellIdx))
        }
      }
    }
  }
}

/** Minimal teardown after run: release runtime state, release array refs (keep scalars for getArrayElement). */
function releaseAfterRun(vm: VmState): void {
  vmOpsVars.flushPendingReleaseAudio(vm)
  releaseOutputs(vm)
  releaseArrayElementRefs(vm)
  releaseAudioInCells(vm)
  vm.arena.drainPendingFree()
  vm.nextBufferHandle = 0
  vm.pendingReleaseAudio.clear()
  releaseRuntimeState(vm)
  if (vm.preserveFunctionState) {
    vm.locals.length = 0
    return
  }
  const inFlight: u32 = vm.arena.getStats()[3] - vm.bufferRegistry.size
  assert(inFlight == 2, `releaseAfterRun: inFlight=${inFlight} (expected 2)`)
  for (let i: i32 = 0; i < vm.locals.length; i++) {
    const cellIdx: i32 = vm.locals.get(i)
    if (cellIdx >= 0 && cellIdx < vm.cells.length && !vmCells.isCellIndexInFreeList(vm, cellIdx)) {
      if (!vmCells.isCellInGlobals(vm, cellIdx) && !vmCells.isCellInClosureEnvs(vm, cellIdx)) {
        heap.releaseCell(vm, cellIdx)
      }
    }
  }
  vm.locals.length = 0
  vm.arena.drainPendingFree()
}

/** Main loop: dispatch by opcode, call handler, advance pc until done; handle solo/outs. */
export function run(
  vm: VmState,
  opsPtr: usize,
  opsLength: i32,
  bufferLength: i32,
  sampleCount: i32,
  sampleRate: f32,
  nyquist: f32,
  piOverNyquist: f32,
  bpm: f32,
): void {
  prepareForRun(vm, bufferLength, opsLength, sampleRate, bpm)

  let pc: i32 = 0
  let currentOpsPtr: usize = opsPtr
  let currentOpsLength: i32 = opsLength

  const params: RunParams = RunParams.instance
  params.bufferLength = bufferLength
  params.sampleRate = sampleRate
  params.sampleCount = sampleCount
  params.nyquist = nyquist
  params.piOverNyquist = piOverNyquist
  params.opsLength = opsLength
  params.outTop = 0
  params.hadSolo = false
  params.hadStereo = false
  const perfCountersEnabled: bool = vm.perfCountersEnabled
  const perfCounters: Uint32Array = vm.perfCounters

  while (pc < currentOpsLength) {
    if (perfCountersEnabled) perfCounters[0]++
    const op: AudioVmOp = <AudioVmOp> load<u32>(currentOpsPtr + (pc << 2))
    // debugAudioVmOp(pc, op, vm.stackTop)
    pc++
    if (op >= FIRST_GEN_OP) {
      if (perfCountersEnabled) perfCounters[1]++
      pc = handleGenOp(vm, op, pc, currentOpsPtr, params)
      continue
    }

    let result: RunResult
    switch (op) {
      case AudioVmOp.Out:
      case AudioVmOp.Solo:
        result = vmOpsOutput.handleOutSolo(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Post:
        result = vmOpsOutput.handlePost(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PushScalar:
        result = vmOpsStack.handlePushScalar(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PushAudio:
        result = vmOpsStack.handlePushAudio(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PushUndefined:
        result = vmOpsStack.handlePushUndefined(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.SetBpm:
        result = vmOpsTime.handleSetBpm(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Time:
        result = vmOpsTime.handleTime(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.TableLookup:
        result = vmOpsTable.handleTableLookup(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Alloc:
        result = vmOpsBuffer.handleAlloc(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Write:
        result = vmOpsBuffer.handleWrite(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Read:
        result = vmOpsBuffer.handleRead(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Tram:
        result = vmOpsKernels.handleTram(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Mini:
        result = vmOpsKernels.handleMini(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Timeline:
        result = vmOpsKernels.handleTimeline(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Oversample:
        result = vmOpsKernels.handleOversample(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.MakeArray:
        result = vmOpsArray.handleMakeArray(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.ArrayLen:
        result = vmOpsArray.handleArrayLen(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.ArrayPush:
        result = vmOpsArray.handleArrayPush(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetSystem:
        result = vmOpsVars.handleGetSystem(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetGlobal:
        result = vmOpsVars.handleGetGlobal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetLocal:
        result = vmOpsVars.handleGetLocal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.SetGlobal:
        result = vmOpsVars.handleSetGlobal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.SetLocal:
        result = vmOpsVars.handleSetLocal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetClosure:
        result = vmOpsVars.handleGetClosure(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.SetClosure:
        result = vmOpsVars.handleSetClosure(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetCellRefLocal:
        result = vmOpsVars.handleGetCellRefLocal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetCellRefGlobal:
        result = vmOpsVars.handleGetCellRefGlobal(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.GetCellRefClosure:
        result = vmOpsVars.handleGetCellRefClosure(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.DefineFunction:
        result = vmOpsVars.handleDefineFunction(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.CallFunction:
        result = vmOpsVars.handleCallFunction(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Return:
        result = vmOpsVars.handleReturn(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Throw:
        result = vmOpsControl.handleThrow(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PushTryBlock:
        result = vmOpsControl.handlePushTryBlock(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PopTryBlock:
        result = vmOpsControl.handlePopTryBlock(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Jump:
        result = vmOpsControl.handleJump(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.JumpIfFalse:
        result = vmOpsControl.handleJumpIfFalse(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.JumpIfTrue:
        result = vmOpsControl.handleJumpIfTrue(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.PushClosure:
      case AudioVmOp.PopScope:
        result = op == AudioVmOp.PushClosure
          ? vmOpsControl.handlePushClosure(vm, pc, currentOpsPtr, params)
          : vmOpsControl.handlePopScope(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Dup:
        result = vmOpsStack.handleDup(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Pop:
        result = vmOpsStack.handlePop(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.ArrayGet:
        result = vmOpsArray.handleArrayGet(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Walk:
        result = vmOpsWalk.handleWalk(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Glide:
        result = vmOpsGlide.handleGlide(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Step:
        result = vmOpsStep.handleStep(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Random:
        result = vmOpsRandom.handleRandom(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.ArraySet:
        result = vmOpsArray.handleArraySet(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.Neg:
      case AudioVmOp.Not:
      case AudioVmOp.BitNot:
        result = vmOpsMath.handleUnary(vm, pc, currentOpsPtr, params, op)
        break
      case AudioVmOp.Add:
      case AudioVmOp.Sub:
      case AudioVmOp.Mul:
      case AudioVmOp.Div:
      case AudioVmOp.Mod:
      case AudioVmOp.Pow:
      case AudioVmOp.Greater:
      case AudioVmOp.Less:
      case AudioVmOp.GreaterEqual:
      case AudioVmOp.LessEqual:
      case AudioVmOp.Equal:
      case AudioVmOp.NotEqual:
      case AudioVmOp.And:
      case AudioVmOp.Or:
      case AudioVmOp.BitAnd:
      case AudioVmOp.BitOr:
      case AudioVmOp.BitXor:
      case AudioVmOp.ShiftLeft:
      case AudioVmOp.ShiftRight:
        result = vmOpsMath.handleBinary(vm, pc, currentOpsPtr, params, op)
        break
      case AudioVmOp.IsUndefined:
        result = vmOpsType.handleIsUndefined(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.IsScalar:
        result = vmOpsType.handleIsScalar(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.IsAudio:
        result = vmOpsType.handleIsAudio(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.IsArray:
        result = vmOpsType.handleIsArray(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.IsFunction:
        result = vmOpsType.handleIsFunction(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.MathUnary:
        result = handleMathUnary(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.MathBinary:
        result = handleMathBinary(vm, pc, currentOpsPtr, params)
        break
      case AudioVmOp.MathTernary:
        result = handleMathTernary(vm, pc, currentOpsPtr, params)
        break
      default:
        debugAudioVmOp(pc - 1, op, vm.stackTop)
        throw new Error(`Unknown operation: ${op}`)
    }

    pc = result.pc
    currentOpsPtr = result.opsPtr
    currentOpsLength = result.opsLength
    params.opsLength = result.opsLength
  }

  vmOpsVars.flushPendingReleaseAudio(vm)
  if (vm.stackTop > 0) {
    vmOpsOutput.applyMixResultToOutput(vm, bufferLength)
  }

  releaseAfterRun(vm)
  vm.checkArenaPoolLeaks()

  if (!vm.preserveFunctionState) {
    const inFlight: u32 = vm.arena.getStats()[3] - vm.bufferRegistry.size
    assert(inFlight == 2, `run: inFlight must be 2 (output buffers only), actual: ${inFlight}`)
  }
}

/** Host query: fill vm.info with stack/arena/gen history pointers and stats; return info ptr. */
export function getInfo(vm: VmState): usize {
  vm.info[0] = u32(vm.stack.dataStart)
  vm.info[1] = 0
  vm.info[2] = 0
  vm.info[3] = u32(vm.stackTop)
  vm.info[4] = u32(vm.stackCapacity)
  vm.info[5] = vm.genPoolManager.getHistoryMetaPointer()
  vm.info[6] = vm.genPoolManager.getHistoryCount()
  vm.info[7] = u32(HISTORY_META_STRIDE)
  vm.info[8] = u32(vm.outputLeft.dataStart)
  vm.info[9] = u32(vm.outputRight.dataStart)
  const astats = vm.arena.getStats()
  vm.info[10] = astats[0]
  vm.info[11] = astats[1]
  vm.info[12] = astats[2]
  vm.info[13] = astats[3]
  vm.info[14] = astats[4]
  vm.info[15] = astats[5]
  vm.info[16] = astats[6]
  vm.info[17] = astats[7]
  vm.info[18] = u32(vm.cells.length)
  vm.info[19] = u32(vm.globals.length)
  vm.info[20] = u32(vm.stackTop)
  vm.info[21] = u32(vm.callStack.length)
  vm.info[22] = u32(vm.upsampleCache.valuesLength())
  vm.info[23] = u32(vm.pendingReleaseAudio.length)
  let totalGenSlots: i32 = 0
  for (let i: i32 = 0; i < vm.genPools.length; i++) totalGenSlots += vm.genPools[i].getSlotsLength()
  vm.info[24] = u32(totalGenSlots)
  vm.info[25] = u32(vm.genPools.length)
  vm.info[26] = u32(vm.bufferRegistry.size)
  vm.info[27] = u32(vm.arrays.length)
  vm.info[28] = astats[8]
  return vm.info.dataStart
}

/** Host query: return ptr to vm perf counters buffer. */
export function getPerfCounters(vm: VmState): usize {
  return vm.perfCounters.dataStart
}

/** Host command: reset vm perf counters to zero. */
export function resetPerfCounters(vm: VmState): void {
  vm.resetPerfCounters()
}

/** Host command: enable/disable vm perf counter collection. */
export function setPerfCountersEnabled(vm: VmState, enabled: bool): void {
  vm.setPerfCountersEnabled(enabled)
}

/** Host query: return scalar value of global at index. */
export function getScalarGlobal(vm: VmState, index: i32): f32 {
  if (index < 0 || index >= vm.globals.length) {
    throw new Error(`getScalarGlobal: index=${index} globals.length=${vm.globals.length}`)
  }
  const tagged: f64 = vmOpsVars.resolveCellRef(vm, vm.cells.get(vm.globals.get(index)).value)
  if (isScalar(tagged)) return decodeScalar(tagged)
  return 0.0
}

/** Host query: return array element as scalar (or throw if not scalar/undefined). */
export function getArrayElement(vm: VmState, arrayGlobalIndex: i32, elementIndex: i32): f32 {
  if (arrayGlobalIndex < 0 || arrayGlobalIndex >= vm.globals.length) {
    throw new Error(`getArrayElement: arrayGlobalIndex=${arrayGlobalIndex} globals.length=${vm.globals.length}`)
  }
  const arrayTagged: f64 = vmOpsVars.resolveCellRef(vm, vm.cells.get(vm.globals.get(arrayGlobalIndex)).value)
  if (!isArray(arrayTagged)) {
    const type = taggedTypeName(arrayTagged)
    throw new Error(`getArrayElement: global ${arrayGlobalIndex} is not array, type: ${type}`)
  }
  const id: u32 = decodeArray(arrayTagged)
  const idx: i32 = vmOpsArray.getArrayIndexOrThrow(vm, id, vmOpsArray.ArrayOpName.GetArrayElement)
  const len: i32 = vm.arrayLengths.get(idx)
  if (elementIndex < 0 || elementIndex >= len) {
    throw new Error(`getArrayElement: elementIndex=${elementIndex} len=${len}`)
  }
  const values: Float64Array = vm.arrays.get(idx)
  assert(elementIndex >= 0 && elementIndex < len, 'getArrayElement: elementIndex')
  const elem: f64 = values[elementIndex]
  if (isScalar(elem)) return decodeScalar(elem)
  if (isUndefined(elem)) return 0.0
  throw new Error(`getArrayElement: element ${elementIndex} is not scalar/undefined, type: ${taggedTypeName(elem)}`)
}

/** Host query: return whether array element at index is undefined. */
export function getArrayElementIsUndefined(vm: VmState, arrayGlobalIndex: i32, elementIndex: i32): bool {
  if (arrayGlobalIndex < 0 || arrayGlobalIndex >= vm.globals.length) return false
  const arrayTagged: f64 = vmOpsVars.resolveCellRef(vm, vm.cells.get(vm.globals.get(arrayGlobalIndex)).value)
  if (!isArray(arrayTagged)) return false
  const id: u32 = decodeArray(arrayTagged)
  if (id == 0 || id > u32(vm.arrays.length)) return false
  const idx: i32 = i32(id) - 1
  assert(idx >= 0 && idx < vm.arrays.length, 'getArrayElementIsUndefined: idx')
  const len: i32 = vm.arrayLengths.get(idx)
  if (elementIndex < 0 || elementIndex >= len) return false
  const values: Float64Array = vm.arrays.get(idx)
  assert(elementIndex >= 0 && elementIndex < len, 'getArrayElementIsUndefined: elementIndex')
  return isUndefined(values[elementIndex])
}

/** Host query: return element of inner array at outerArray[outerIndex][innerIndex]. */
export function getArrayElementNested(
  vm: VmState,
  outerArrayGlobalIndex: i32,
  outerIndex: i32,
  innerIndex: i32,
): f32 {
  if (outerArrayGlobalIndex < 0 || outerArrayGlobalIndex >= vm.globals.length) return 0.0
  const outerTagged: f64 = vmOpsVars.resolveCellRef(vm, vm.cells.get(vm.globals.get(outerArrayGlobalIndex)).value)
  if (!isArray(outerTagged)) return 0.0
  const outerId: u32 = decodeArray(outerTagged)
  const outerIdx: i32 = vmOpsArray.getArrayIndexOrThrow(vm, outerId, vmOpsArray.ArrayOpName.GetArrayElement)
  const outerValues: Float64Array = vm.arrays.get(outerIdx)
  const outerLen: i32 = vm.arrayLengths.get(outerIdx)
  const innerTagged: f64 = outerIndex >= 0 && outerIndex < outerLen ? outerValues[outerIndex] : encodeUndefined()
  if (!isArray(innerTagged)) return 0.0
  const innerId: u32 = decodeArray(innerTagged)
  if (innerId == 0 || innerId > u32(vm.arrays.length)) return 0.0
  const innerIdx: i32 = i32(innerId) - 1
  const innerLen: i32 = vm.arrayLengths.get(innerIdx)
  if (innerIndex < 0 || innerIndex >= innerLen) return 0.0
  const innerValues: Float64Array = vm.arrays.get(innerIdx)
  const elem: f64 = innerValues[innerIndex]
  if (isScalar(elem)) return decodeScalar(elem)
  if (isUndefined(elem)) return 0.0
  return 0.0
}

/** Host query: whether outerArray[outerIndex][innerIndex] is undefined. */
export function getArrayElementIsUndefinedNested(
  vm: VmState,
  outerArrayGlobalIndex: i32,
  outerIndex: i32,
  innerIndex: i32,
): bool {
  const outerTagged: f64 = vmOpsVars.resolveCellRef(vm, vm.cells.get(vm.globals.get(outerArrayGlobalIndex)).value)
  if (!isArray(outerTagged)) return true
  const outerId: u32 = decodeArray(outerTagged)
  if (outerId == 0 || outerId > u32(vm.arrays.length)) return true
  const outerIdx: i32 = i32(outerId) - 1
  const outerLen: i32 = vm.arrayLengths.get(outerIdx)
  if (outerIndex < 0 || outerIndex >= outerLen) return true
  const outerValues: Float64Array = vm.arrays.get(outerIdx)
  const innerTagged: f64 = outerValues[outerIndex]
  if (!isArray(innerTagged)) return true
  const innerId: u32 = decodeArray(innerTagged)
  if (innerId == 0 || innerId > u32(vm.arrays.length)) return true
  const innerIdx: i32 = i32(innerId) - 1
  const innerLen: i32 = vm.arrayLengths.get(innerIdx)
  if (innerIndex < 0 || innerIndex >= innerLen) return true
  return isUndefined(vm.arrays.get(innerIdx)[innerIndex])
}

/** Grow globals array to at least size (new slots are undefined). */
export function ensureGlobalsSize(vm: VmState, size: i32): void {
  while (vm.globals.length < size) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
}

/** Host update: set global at index to scalar value. */
export function setScalarGlobal(vm: VmState, index: i32, value: f32): void {
  while (vm.globals.length <= index) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
  const cellIdx: i32 = vm.globals.get(index)
  vmOpsVars.assignCell(vm, vm.cells.get(cellIdx), encodeScalar(value))
}

/** Host update: set global at index to undefined. */
export function setUndefinedGlobal(vm: VmState, index: i32): void {
  while (vm.globals.length <= index) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
  const cellIdx: i32 = vm.globals.get(index)
  vmOpsVars.assignCell(vm, vm.cells.get(cellIdx), encodeUndefined())
}

/** Release outs and clear outTop/stackTop. */
export function releaseOutputs(vm: VmState): void {
  // releaseStackAndOutsValues already releases both stack and outs ranges.
  vmStack.releaseStackAndOutsValues(vm)
  vm.outTop = 0
  vm.stackTop = 0
}

export function softResetState(vm: VmState): void {
  for (let i: i32 = 0; i < vm.genPools.length; i++) {
    vm.genPools[i].resetAll()
  }
}

/** Release outs and reset VM for next run (buffers, call stack, etc.). */
export function resetState(vm: VmState): void {
  releaseOutputs(vm)

  const bufferIds: FastArray<i32> = vm.bufferRegistry.keys()
  for (let i: i32 = 0; i < bufferIds.length; i++) {
    const entry: BufferEntry = vm.bufferRegistry.get(bufferIds.get(i))
    vm.arena.release(entry.buffer)
    vm.bufferEntryPool.release(entry)
  }
  vm.bufferRegistry.clear()

  for (let i: i32 = 0; i < vm.genPools.length; i++) {
    vm.genPools[i].resetAll()
    vm.genPools[i].disposeAll()
  }
  vm.genPoolManager.disposeHistories()

  const funcIds: FastArray<i32> = vm.functions.keys()
  for (let i: i32 = 0; i < funcIds.length; i++) {
    vm.functionDefPool.release(vm.float32Arena, vm.functions.get(funcIds.get(i)))
  }
  vm.functions.clear()
  const instIds: FastArray<i32> = vm.functionInstances.keys()
  for (let i: i32 = 0; i < instIds.length; i++) {
    vm.functionInstancePool.release(vm.functionInstances.get(instIds.get(i)))
  }
  vm.functionInstances.clear()

  const envIds: FastArray<i32> = vm.closureEnvs.keys()
  for (let i: i32 = 0; i < envIds.length; i++) {
    const env: ClosureEnv = vm.closureEnvs.get(envIds.get(i))
    for (let j: i32 = 0; j < env.cells.length; j++) {
      heap.releaseCell(vm, env.cells.get(j))
    }
    vm.closureEnvPool.release(vm.fastArrayI32Pool, env)
  }
  vm.closureEnvs.clear()
  vm.nextInstanceId = 0
  vm.nextClosureEnvId = 0

  for (let i: i32 = 0; i < vm.globals.length; i++) {
    heap.releaseCell(vm, vm.globals.get(i))
  }
  vm.globals.clear()

  for (let i: i32 = 0; i < vm.locals.length; i++) {
    heap.releaseCell(vm, vm.locals.get(i))
  }
  vm.locals.clear()

  for (let c: i32 = 0; c < vm.cells.length; c++) {
    if (vmCells.isCellIndexInFreeList(vm, c)) continue
    const cell: Cell = vm.cells.get(c)
    heap.releaseValue(vm, cell.value)
    vm.cellPool.release(cell)
  }
  vm.cells.length = 0
  vm.cellFreeList.clear()

  for (let f: i32 = 0; f < vm.callStack.length; f++) {
    const frame: CallFrame = vm.callStack.get(f)

    const arrayIds: FastArray<u32> | null = frame.tempArrayIds
    if (arrayIds != null) {
      for (let i: i32 = 0; i < arrayIds.length; i++) {
        heap.releaseArray(vm, arrayIds.get(i))
      }
      vm.fastArrayU32Pool.release(frame.tempArrayIds!)
    }

    const ov: Float64Array | null = frame.closureOverride
    if (ov != null) {
      for (let i: i32 = 0; i < ov.length; i++) {
        heap.releaseValue(vm, ov[i])
      }
      vm.float64Arena.release(ov)
      frame.closureOverride = null
    }
  }
  vm.callStack.length = 0
  vm.absolutePCCallStackTop = 0

  for (let a: i32 = 0; a < vm.arrays.length; a++) {
    releaseArraySlot(vm, a)
  }
  vm.arrays.length = 0
  vm.arrayLengths.length = 0
  vm.arrayRefcounts.length = 0

  const cacheLen: i32 = vm.upsampleCache.valuesLength()
  for (let i: i32 = 0; i < cacheLen; i++) {
    vm.arena.releaseByPtr(vm.upsampleCache.valueAt(i))
  }
  vm.upsampleCache.clear()

  if (vm.outputLeft.length > 0) vm.arena.release(vm.outputLeft)
  if (vm.outputRight.length > 0) vm.arena.release(vm.outputRight)
  vm.reset()
}
