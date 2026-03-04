// dprint-ignore-file

import { bicubicAt } from './bicubic'
import {
  decodeAudio,
  decodeCellRef,
  decodeScalar,
  encodeAudio,
  encodeScalar,
  isAudio,
  isCellRef,
  isScalar,
} from './constants'
import * as genOpHelpers from './gen-op-helpers'
import * as resample from './resample'
import { RunParams, RunResult } from './run-params'
import { OS_DOWN_BOXCAR, OS_UP_LINEAR } from './vm-constants'
import * as vmStack from './vm-stack'
import { BufferEntry, VmState } from './vm-state'
import * as vmOpsVars from './vm-ops-vars'
import { nextPow2, readOperandI32, writeChunkToRingBuffer } from './util'

const OVERSAMPLED_BUFFER_HANDLE_OFFSET: i32 = 0x100000
const ALLOC_HANDLE_SITE_STRIDE: i32 = 1024
const MAX_EXACT_F32_INT: i32 = 0x1000000
const ALLOC_COUNTER_KEY_BIAS: i32 = -1

// Per-run alloc ordinal for a callsite. Stored as negative keys in stepRegistry to avoid extra tables.
function nextAllocOrdinal(vm: VmState, callSiteId: i32): i32 {
  const key: i32 = ALLOC_COUNTER_KEY_BIAS - callSiteId
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

function buildAllocHandle(vm: VmState, callSiteId: i32, ordinal: i32, osFactor: i32): i32 {
  let handle: i32 = vm.nextBufferHandle++
  if (callSiteId >= 0 && ordinal >= 0 && ordinal < ALLOC_HANDLE_SITE_STRIDE) {
    const candidate: i32 = callSiteId * ALLOC_HANDLE_SITE_STRIDE + ordinal
    // Keep scalar round-trip exact when encoded as f32.
    if (candidate >= 0 && candidate < MAX_EXACT_F32_INT) handle = candidate
  }
  if (osFactor > 1) handle += OVERSAMPLED_BUFFER_HANDLE_OFFSET
  return handle
}

export function resetAllocCounters(vm: VmState): void {
  const keys = vm.stepRegistry.keys()
  for (let i: i32 = 0; i < keys.length; i++) {
    const key: i32 = keys.get(i)
    if (key >= 0) continue
    vm.stepEntryPool.release(vm.stepRegistry.get(key))
    vm.stepRegistry.delete(key)
  }
}

/** Read bl samples from ring buffer with optional offset (scalar or audio); write to outputPtr. Bicubic interpolated. Releases offset if audio. offsetStride: when >1 and offset is audio, sample offset at i*offsetStride (for base-rate read from oversampled LFO). */
export function readChunkFromRingBuffer(
  vm: VmState,
  entry: BufferEntry,
  offsetResolved: f64,
  outputPtr: usize,
  bl: i32,
  offsetStride: i32 = 1,
): void {
  const bufPtr: usize = entry.buffer.dataStart
  const lengthSamples: i32 = entry.lengthSamples
  const writeIndex: i32 = entry.writeIndex
  const sampleRate: f32 = entry.sampleRate
  if (isScalar(offsetResolved)) {
    const offsetSeconds: f32 = decodeScalar(offsetResolved)
    const offsetSamples: f32 = offsetSeconds * sampleRate
    for (let i: i32 = 0; i < bl; i++) {
      const index: f32 = f32(writeIndex - bl + i) - offsetSamples
      store<f32>(outputPtr + (usize(i) << 2), bicubicAt(bufPtr, lengthSamples, index))
    }
  }
  else if (isAudio(offsetResolved)) {
    const offsetPtr: usize = decodeAudio(offsetResolved)
    for (let i: i32 = 0; i < bl; i++) {
      const offsetIdx: i32 = i * offsetStride
      const offsetSeconds: f32 = load<f32>(offsetPtr + (usize(offsetIdx) << 2))
      const offsetSamples: f32 = offsetSeconds * sampleRate
      const index: f32 = f32(writeIndex - bl + i) - offsetSamples
      store<f32>(outputPtr + (usize(i) << 2), bicubicAt(bufPtr, lengthSamples, index))
    }
    vmStack.releaseValueTagged(vm, offsetResolved)
  }
  else {
    memory.fill(outputPtr, 0, usize(bl) << 2)
  }
}

/** Pop duration (seconds); allocate or reuse buffer of that length; push handle (scalar). */

export function handleAlloc(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const callSiteId: i32 = readOperandI32(opsPtr, pc)
  pc++

  const secondsTagged: f64 = vmStack.pop(vm)
  const secondsResolved: f64 = vmOpsVars.resolveCellRef(vm, secondsTagged)
  const secondsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, secondsResolved)
  const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
  const baseSampleRate: f32 = osFactor > 1 ? params.sampleRate / f32(osFactor) : params.sampleRate
  const lengthSamples: i32 = nextPow2(
    i32(Mathf.max(1.0, secondsValue * baseSampleRate)),
  )
  const lengthBytes: usize = usize(lengthSamples) << 2
  vmStack.releaseValueTagged(vm, secondsResolved)

  const ordinal: i32 = nextAllocOrdinal(vm, callSiteId)
  const handle: i32 = buildAllocHandle(vm, callSiteId, ordinal, osFactor)

  const existing: BufferEntry | null = vm.bufferRegistry.tryGet(handle)
  if (existing != null) {
    const entry: BufferEntry = existing
    const rateChanged: bool = entry.sampleRate != baseSampleRate
    const lengthChanged: bool = entry.lengthSamples != lengthSamples
    if (rateChanged || lengthChanged) {
      vm.arena.release(entry.buffer)
      const newBuffer: Float32Array = vm.arena.get(lengthSamples)
      memory.fill(newBuffer.dataStart, 0, lengthBytes)
      entry.buffer = newBuffer
      entry.lengthSamples = lengthSamples
      entry.sampleRate = baseSampleRate
      entry.writeIndex = 0
    }
    vmStack.push(vm, encodeScalar(f32(handle)))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  const buffer: Float32Array = vm.arena.get(lengthSamples)
  memory.fill(buffer.dataStart, 0, lengthBytes)
  const entry: BufferEntry = vm.bufferEntryPool.acquire(buffer, lengthSamples, baseSampleRate)
  vm.bufferRegistry.set(handle, entry)
  vmStack.push(vm, encodeScalar(f32(handle)))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop buffer handle and input; append input to buffer ring (wrap write index); push handle. */
export function handleWrite(
  vm: VmState,
  pc: i32,
  _opsPtr: usize,
  params: RunParams,
): RunResult {
  const bufTagged: f64 = vmStack.pop(vm)
  const inputTagged: f64 = vmStack.pop(vm)

  const bufResolved: f64 = vmOpsVars.resolveCellRef(vm, bufTagged)
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)

  const handleValue: i32 = i32(Mathf.floor(genOpHelpers.scalarOrFirstSample(vm, bufResolved)))
  const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
  const tempMark: i32 = vm.beginTempAudioScope()

  const entry: BufferEntry | null = vm.bufferRegistry.tryGet(handleValue)
  if (entry == null) {
    vm.endTempAudioScope(tempMark)
    vmStack.push(vm, encodeScalar(f32(handleValue)))
    vmStack.releaseValueTagged(vm, inputResolved)
    return RunResult.normal(pc, _opsPtr, params.opsLength)
  }

  const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
  if (osFactor > 1) {
    const baseLen: i32 = params.bufferLength / osFactor
    const downBuf: Float32Array = vm.getOversampleScratchA(baseLen)
    const downPtr: usize = downBuf.dataStart
    if (vm.osDownMode == OS_DOWN_BOXCAR) {
      resample.downsampleBoxcar(inputPtr, downPtr, baseLen, osFactor)
    } else {
      resample.downsampleDecimate(inputPtr, downPtr, baseLen, osFactor)
    }
    entry.writeIndex = writeChunkToRingBuffer(
      entry.buffer.dataStart,
      entry.lengthSamples,
      entry.writeIndex,
      downPtr,
      baseLen,
    )
  } else {
    entry.writeIndex = writeChunkToRingBuffer(
      entry.buffer.dataStart,
      entry.lengthSamples,
      entry.writeIndex,
      inputPtr,
      params.bufferLength,
    )
  }
  vm.endTempAudioScope(tempMark)
  vmStack.releaseValueTagged(vm, inputResolved)

  vmStack.push(vm, encodeScalar(f32(handleValue)))
  return RunResult.normal(pc, _opsPtr, params.opsLength)
}

/** Pop offset and handle; read from buffer at (writeIndex - block + i - offset), bicubic interpolated; push audio. */
export function handleRead(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const offsetTagged: f64 = vmStack.pop(vm)
  const handleTagged: f64 = vmStack.pop(vm)

  const handleResolved: f64 = vmOpsVars.resolveCellRef(vm, handleTagged)
  const offsetResolved: f64 = vmOpsVars.resolveCellRef(vm, offsetTagged)

  const handleValue: i32 = i32(Mathf.floor(genOpHelpers.scalarOrFirstSample(vm, handleResolved)))
  const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
  const output: Float32Array = vm.arena.get(procLen)
  const outputPtr: usize = output.dataStart

  const entry: BufferEntry | null = vm.bufferRegistry.tryGet(handleValue)
  if (entry == null) {
    memory.fill(outputPtr, 0, usize(procLen) << 2)
    vmStack.push(vm, encodeAudio(outputPtr), true)
    vmStack.releaseValueTagged(vm, offsetResolved)
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  if (osFactor > 1) {
    const baseLen: i32 = params.bufferLength / osFactor
    const baseBuf: Float32Array = vm.getOversampleScratchA(baseLen)
    const basePtr: usize = baseBuf.dataStart
    readChunkFromRingBuffer(vm, entry, offsetResolved, basePtr, baseLen, osFactor)
    if (vm.osUpMode == OS_UP_LINEAR) {
      resample.upsampleLinear(basePtr, outputPtr, baseLen, osFactor)
    } else {
      resample.upsampleHold(basePtr, outputPtr, baseLen, osFactor)
    }
  } else {
    readChunkFromRingBuffer(vm, entry, offsetResolved, outputPtr, params.bufferLength)
  }
  vmStack.push(vm, encodeAudio(outputPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
