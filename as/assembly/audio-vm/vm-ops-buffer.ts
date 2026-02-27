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
import { nextPow2, writeChunkToRingBuffer } from './util'

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
  pc++

  const secondsTagged: f64 = vmStack.pop(vm)
  const secondsResolved: f64 = vmOpsVars.resolveCellRef(vm, secondsTagged)
  const secondsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, secondsResolved)
  const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
  const baseSampleRate: f32 = osFactor > 1 ? params.sampleRate / f32(osFactor) : params.sampleRate
  const lengthSamples: i32 = nextPow2(
    i32(Mathf.max(1.0, secondsValue * baseSampleRate)),
  )

  let handle: i32 = vm.nextBufferHandle++
  // Offset must stay < 2^24 so encodeScalar(decodeScalar) round-trip preserves the handle (f32 precision)
  if (osFactor > 1) handle = 0x100000 + handle

  if (vm.bufferRegistry.has(handle)) {
    const entry: BufferEntry = vm.bufferRegistry.get(handle)
    const rateChanged: bool = entry.sampleRate != baseSampleRate
    const lengthChanged: bool = entry.lengthSamples != lengthSamples
    if (rateChanged || lengthChanged) {
      vm.arena.release(entry.buffer)
      entry.buffer = vm.arena.get(lengthSamples)
      entry.lengthSamples = lengthSamples
      entry.sampleRate = baseSampleRate
      entry.writeIndex = 0
    }
    vmStack.push(vm, encodeScalar(f32(handle)))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  const entry: BufferEntry = vm.bufferEntryPool.acquire(
    vm.arena.get(lengthSamples),
    lengthSamples,
    baseSampleRate,
  )
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

  if (!vm.bufferRegistry.has(handleValue)) {
    vmStack.push(vm, encodeScalar(f32(handleValue)))
    vmStack.releaseValueTagged(vm, inputResolved)
    return RunResult.normal(pc, _opsPtr, params.opsLength)
  }

  const entry: BufferEntry = vm.bufferRegistry.get(handleValue)
  const inputResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
  if (osFactor > 1) {
    const baseLen: i32 = params.bufferLength / osFactor
    const downBuf: Float32Array = vm.arena.get(baseLen)
    if (vm.osDownMode == OS_DOWN_BOXCAR) {
      resample.downsampleBoxcar(inputResult.ptr, downBuf.dataStart, baseLen, osFactor)
    } else {
      resample.downsampleDecimate(inputResult.ptr, downBuf.dataStart, baseLen, osFactor)
    }
    entry.writeIndex = writeChunkToRingBuffer(
      entry.buffer.dataStart,
      entry.lengthSamples,
      entry.writeIndex,
      downBuf.dataStart,
      baseLen,
    )
    vm.arena.release(downBuf)
  } else {
    entry.writeIndex = writeChunkToRingBuffer(
      entry.buffer.dataStart,
      entry.lengthSamples,
      entry.writeIndex,
      inputResult.ptr,
      params.bufferLength,
    )
  }
  genOpHelpers.releaseTaggedInputBuf(vm, inputResult.buf)
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

  if (!vm.bufferRegistry.has(handleValue)) {
    memory.fill(outputPtr, 0, usize(procLen) << 2)
    vmStack.push(vm, encodeAudio(outputPtr), true)
    vmStack.releaseValueTagged(vm, offsetResolved)
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  const entry: BufferEntry = vm.bufferRegistry.get(handleValue)
  if (osFactor > 1) {
    const baseLen: i32 = params.bufferLength / osFactor
    const baseBuf: Float32Array = vm.arena.get(baseLen)
    readChunkFromRingBuffer(vm, entry, offsetResolved, baseBuf.dataStart, baseLen, osFactor)
    if (vm.osUpMode == OS_UP_LINEAR) {
      resample.upsampleLinear(baseBuf.dataStart, outputPtr, baseLen, osFactor)
    } else {
      resample.upsampleHold(baseBuf.dataStart, outputPtr, baseLen, osFactor)
    }
    vm.arena.release(baseBuf)
  } else {
    readChunkFromRingBuffer(vm, entry, offsetResolved, outputPtr, params.bufferLength)
  }
  vmStack.push(vm, encodeAudio(outputPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
