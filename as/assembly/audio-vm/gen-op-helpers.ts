// dprint-ignore-file

import {
  decodeArray,
  decodeAudio,
  decodeCellRef,
  decodeScalar,
  encodeAudio,
  isArray,
  isAudio,
  isCellRef,
  isScalar,
  WAVEFORM_CHUNK_SAMPLES,
  WAVEFORM_RING_MASK,
} from './constants'
import { GenHistory, GenSlot } from './gen-history'
import { RunParams, RunResult } from './run-params'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { CallFrame, FunctionDef } from './vm-types'

/** Resolve absolute PC from call stack and push to absolutePCCallStack. Returns absolutePC. */
// @ts-ignore
// @inline
export function resolveAndPushAbsolutePC(state: VmState, pc: i32): i32 {
  const relativePC: i32 = pc - 1
  let absolutePC: i32 = relativePC
  if (state.callStack.length > 0) {
    const frame: CallFrame = state.callStack.get(state.callStack.length - 1)
    if (state.functions.has(frame.functionId)) {
      const funcDef: FunctionDef = state.functions.get(frame.functionId)
      absolutePC = funcDef.bytecodeStartPC + relativePC
    }
  }
  if (state.absolutePCCallStackTop < 8) {
    state.absolutePCCallStack[state.absolutePCCallStackTop++] = absolutePC
  }
  return absolutePC
}

/** Copy absolutePCCallStack (or 0xFFFFFFFF) into slot.history.meta[metaOffset+12..+20]. */
// @ts-ignore
// @inline
export function writeCallStackMetaToSlot(state: VmState, slot: GenSlot): void {
  writeCallStackMetaToHistory(state, slot.history)
}

/** Copy absolutePCCallStack (or 0xFFFFFFFF) into history.meta[metaOffset+12..+20]. */
// @ts-ignore
// @inline
export function writeCallStackMetaToHistory(state: VmState, history: GenHistory): void {
  const callStackMetaOffset: i32 = history.metaOffset + 12
  for (let i: i32 = 0; i < 8; i++) {
    if (i < state.absolutePCCallStackTop && state.absolutePCCallStack[i] >= 0) {
      history.meta[callStackMetaOffset + i] = u32(state.absolutePCCallStack[i])
    }
    else {
      history.meta[callStackMetaOffset + i] = u32(0xffffffff)
    }
  }
}

/** Return oversample factor from call stack (0 if none active). */
// @ts-ignore
// @inline
export function getOversampleFactor(state: VmState): i32 {
  for (let si: i32 = state.callStack.length - 1; si >= 0; si--) {
    const fr: CallFrame = state.callStack.get(si)
    if (fr.isOversample && fr.oversampleFactor > 1) return fr.oversampleFactor
  }
  return 0
}

/** Align buffer length to 16-sample boundary for SIMD-friendly allocation. */
// @ts-ignore
// @inline
export function alignedProcLength(bufferLength: i32): i32 {
  return (bufferLength + 15) & ~15
}

/** Allocate silence buffer, push as audio, return RunResult.normal. */
export function pushSilenceAndReturn(vm: VmState, pc: i32, opsPtr: usize, params: RunParams): RunResult {
  const procLen: i32 = alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(procLen)
  memory.fill(output.dataStart, 0, usize(procLen) << 2)
  vmStack.push(vm, encodeAudio(output.dataStart))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Write output buffer to history output ring and advance outputChunkPos. */
export function writeOutputToHistoryRing(history: GenHistory, outputPtr: usize, bufferLength: i32): void {
  const outputChunkPos: i32 = history.outputChunkPos
  const outputRingPtr: usize = history.outputRing.dataStart
  const outputDstPtr: usize = outputRingPtr + (usize(outputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
  if (bufferLength <= WAVEFORM_CHUNK_SAMPLES) {
    memory.copy(outputDstPtr, outputPtr, usize(bufferLength) << 2)
    if (bufferLength < WAVEFORM_CHUNK_SAMPLES) {
      memory.fill(outputDstPtr + (usize(bufferLength) << 2), 0,
        usize(WAVEFORM_CHUNK_SAMPLES - bufferLength) << 2)
    }
  }
  else {
    const stride: i32 = bufferLength / WAVEFORM_CHUNK_SAMPLES
    for (let i: i32 = 0; i < WAVEFORM_CHUNK_SAMPLES; i++) {
      const srcIdx: i32 = i * stride
      store<f32>(outputDstPtr + (i << 2),
        srcIdx < bufferLength ? load<f32>(outputPtr + (usize(srcIdx) << 2)) : 0.0)
    }
  }
  history.outputChunkPos = (outputChunkPos + 1) & WAVEFORM_RING_MASK
  history.meta[history.metaOffset + 9] = u32(history.outputChunkPos)
}

/** Write (L+R)*0.5 to history output ring chunk and advance outputChunkPos. */
export function writeStereoChunkToHistoryRing(history: GenHistory, ptrL: usize, ptrR: usize, bufferLength: i32): void {
  const outputChunkPos: i32 = history.outputChunkPos
  const outputRingPtr: usize = history.outputRing.dataStart
  const outputDstPtr: usize = outputRingPtr + (usize(outputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
  const copyLen: i32 = bufferLength < WAVEFORM_CHUNK_SAMPLES ? bufferLength : WAVEFORM_CHUNK_SAMPLES
  for (let i: i32 = 0; i < copyLen; i++) {
    const l: f32 = load<f32>(ptrL + (usize(i) << 2))
    const r: f32 = load<f32>(ptrR + (usize(i) << 2))
    store<f32>(outputDstPtr + (usize(i) << 2), (l + r) * 0.5)
  }
  if (copyLen < WAVEFORM_CHUNK_SAMPLES) {
    memory.fill(outputDstPtr + (usize(copyLen) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - copyLen) << 2)
  }
  history.outputChunkPos = (outputChunkPos + 1) & WAVEFORM_RING_MASK
  history.meta[history.metaOffset + 9] = u32(history.outputChunkPos)
}

/** Copy input buffer into history input ring and advance inputChunkPos. */
export function writeInputToHistoryRing(history: GenHistory, inputSrcPtr: usize, bufferLength: i32): void {
  const inputChunkPos: i32 = history.inputChunkPos
  const inputRingPtr: usize = history.inputRing.dataStart
  const inputDstPtr: usize = inputRingPtr + (usize(inputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
  const inWfLen: i32 = bufferLength < WAVEFORM_CHUNK_SAMPLES ? bufferLength : WAVEFORM_CHUNK_SAMPLES
  memory.copy(inputDstPtr, inputSrcPtr, usize(inWfLen) << 2)
  if (inWfLen < WAVEFORM_CHUNK_SAMPLES) {
    memory.fill(inputDstPtr + (usize(inWfLen) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - inWfLen) << 2)
  }
  history.inputChunkPos = (inputChunkPos + 1) & WAVEFORM_RING_MASK
  history.meta[history.metaOffset + 7] = u32(history.inputChunkPos)
}

/** Zero-fill current chunk in history input ring and advance inputChunkPos. */
export function writeInputToHistoryRingZero(history: GenHistory): void {
  const inputChunkPos: i32 = history.inputChunkPos
  const inputRingPtr: usize = history.inputRing.dataStart
  const inputDstPtr: usize = inputRingPtr + (usize(inputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
  memory.fill(inputDstPtr, 0, usize(WAVEFORM_CHUNK_SAMPLES) << 2)
  history.inputChunkPos = (inputChunkPos + 1) & WAVEFORM_RING_MASK
  history.meta[history.metaOffset + 7] = u32(history.inputChunkPos)
}

/** Extend buffer with last sample from bufferLength to procLen. */
// @ts-ignore
// @inline
export function extendBufferWithLastSample(ptr: usize, bufferLength: i32, procLen: i32): void {
  if (procLen > bufferLength && bufferLength > 0) {
    const last: f32 = load<f32>(ptr + (usize(bufferLength - 1) << 2))
    for (let k: i32 = bufferLength; k < procLen; k++) {
      store<f32>(ptr + (usize(k) << 2), last)
    }
  }
}

/** True if tagged is 2-element array with both elements audio. */
export function isStereoAudioArray(vm: VmState, tagged: f64): bool {
  const arrId: u32 = decodeArray(tagged)
  if (arrId === 0 || arrId > u32(vm.arrays.length)) return false
  const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
  if (vm.arrayLengths.get(i32(arrId) - 1) !== 2) return false
  return isAudio(vmOpsVars.resolveCellRef(vm, arr[0])) && isAudio(vmOpsVars.resolveCellRef(vm, arr[1]))
}

/** True if tagged is 2-element array with each element scalar or audio. */
function isStereoScalarOrAudioArray(vm: VmState, tagged: f64): bool {
  const arrId: u32 = decodeArray(tagged)
  if (arrId === 0 || arrId > u32(vm.arrays.length)) return false
  const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
  if (vm.arrayLengths.get(i32(arrId) - 1) !== 2) return false
  const left: f64 = vmOpsVars.resolveCellRef(vm, arr[0])
  const right: f64 = vmOpsVars.resolveCellRef(vm, arr[1])
  return (isScalar(left) || isAudio(left)) && (isScalar(right) || isAudio(right))
}

/** (L[0]+R[0])*0.5 for 2-element audio array. Call only when isStereoAudioArray returned true. */
function stereoArrayToMonoScalar(vm: VmState, tagged: f64): f32 {
  const arr: Float64Array = vm.arrays.get(i32(decodeArray(tagged)) - 1)
  const leftPtr: usize = decodeAudio(vmOpsVars.resolveCellRef(vm, arr[0]))
  const rightPtr: usize = decodeAudio(vmOpsVars.resolveCellRef(vm, arr[1]))
  return (load<f32>(leftPtr) + load<f32>(rightPtr)) * 0.5
}

/** Allocate buffer, fill with (L[i]+R[i])*0.5. Call only when isStereoAudioArray returned true. Returns new instance. */
function stereoArrayToMonoBuffer(vm: VmState, tagged: f64, length: i32): TaggedInputResult {
  const result = new TaggedInputResult()
  result.buf = vm.arena.get(length)
  result.ptr = result.buf.dataStart
  const arr: Float64Array = vm.arrays.get(i32(decodeArray(tagged)) - 1)
  const leftTagged: f64 = vmOpsVars.resolveCellRef(vm, arr[0])
  const rightTagged: f64 = vmOpsVars.resolveCellRef(vm, arr[1])
  const leftIsAudio: bool = isAudio(leftTagged)
  const rightIsAudio: bool = isAudio(rightTagged)
  const leftPtr: usize = leftIsAudio ? decodeAudio(leftTagged) : 0
  const rightPtr: usize = rightIsAudio ? decodeAudio(rightTagged) : 0
  const leftScalar: f32 = leftIsAudio ? 0.0 : decodeScalar(leftTagged)
  const rightScalar: f32 = rightIsAudio ? 0.0 : decodeScalar(rightTagged)
  for (let i: i32 = 0; i < length; i++) {
    const off: usize = usize(i) << 2
    const leftSample: f32 = leftIsAudio ? load<f32>(leftPtr + off) : leftScalar
    const rightSample: f32 = rightIsAudio ? load<f32>(rightPtr + off) : rightScalar
    store<f32>(result.ptr + off, (leftSample + rightSample) * 0.5)
  }
  return result
}

/** Convert tagged to audio buffer: if isAudio return ptr (buf=null); if 2-element audio array allocate (L+R)*0.5 and return ptr+buf; else throw. Caller must release: releaseTaggedInputResult then releaseByPtr(ptr) when buf is null. Returns new instance per call. */
export function taggedToAudioParamBuffer(vm: VmState, tagged: f64, length: i32): TaggedInputResult {
  if (isCellRef(tagged)) return taggedToAudioParamBuffer(vm, vmOpsVars.resolveCellRef(vm, tagged), length)
  const result = new TaggedInputResult()
  result.ptr = 0
  result.buf = changetype<Float32Array>(0)
  if (isAudio(tagged)) {
    result.ptr = decodeAudio(tagged)
    return result
  }
  if (isStereoScalarOrAudioArray(vm, tagged)) return stereoArrayToMonoBuffer(vm, tagged, length)
  throw new Error('Gen parameter expects scalar or audio, not array')
}

/** Scalar value from tagged: resolve cell refs, then decodeScalar if scalar, first sample if audio. Stereo array [L,R] downmixes to (L+R)*0.5. Throws if array is not 2-element audio. */
export function scalarOrFirstSample(vm: VmState, tagged: f64): f32 {
  if (isCellRef(tagged)) return scalarOrFirstSample(vm, vmOpsVars.resolveCellRef(vm, tagged))
  if (isArray(tagged)) {
    if (isStereoScalarOrAudioArray(vm, tagged)) {
      const arr: Float64Array = vm.arrays.get(i32(decodeArray(tagged)) - 1)
      const left: f64 = vmOpsVars.resolveCellRef(vm, arr[0])
      const right: f64 = vmOpsVars.resolveCellRef(vm, arr[1])
      const lv: f32 = isAudio(left) ? load<f32>(decodeAudio(left)) : decodeScalar(left)
      const rv: f32 = isAudio(right) ? load<f32>(decodeAudio(right)) : decodeScalar(right)
      return (lv + rv) * 0.5
    }
    throw new Error('Gen parameter expects scalar or audio, not array')
  }
  if (isScalar(tagged)) return decodeScalar(tagged)
  if (isAudio(tagged)) return load<f32>(decodeAudio(tagged))
  return 0.0
}

/** Write one sample of resolved tagged value to outPtr at sampleIndex (audio: sample at index; scalar: same value; else 0). */
export function writeTaggedSampleAt(tagged: f64, outPtr: usize, sampleIndex: i32): void {
  const off: usize = usize(sampleIndex) << 2
  if (isAudio(tagged)) store<f32>(outPtr + off, load<f32>(decodeAudio(tagged) + off))
  else if (isScalar(tagged)) store<f32>(outPtr + off, decodeScalar(tagged))
  else store<f32>(outPtr + off, 0.0)
}

/** Allocate buffer, fill with scalar value, return encodeAudio(ptr). Caller owns the buffer (do not push to stack). */
export function scalarToAudioEncoded(vm: VmState, scalarTagged: f64, length: i32): f64 {
  const scalarVal: f32 = decodeScalar(scalarTagged)
  const output: Float32Array = vm.arena.get(length)
  const outputPtr: usize = output.dataStart
  for (let i: i32 = 0; i < length; i++) {
    store<f32>(outputPtr + (usize(i) << 2), scalarVal)
  }
  return encodeAudio(outputPtr)
}

/** Result of converting a tagged input to a buffer. ptr is dataStart (raw data pointer); buf is the Float32Array to release when non-null (caller releases buf, never ptr). */
export class TaggedInputResult {
  static instance: TaggedInputResult = new TaggedInputResult()
  ptr: usize = 0
  buf: Float32Array = changetype<Float32Array>(0)
}

/** Convert tagged (audio/scalar/undefined) to ptr (dataStart) + optional buf. Resolves cell refs first. For audio we only get ptr (dataStart from stack); we never have the Float32Array. Release: if we allocated use releaseTaggedInputBuf(vm, result.buf); if it was audio use releaseTaggedInputByPtr(vm, result.ptr) when the buffer is no longer referenced (arena resolves ptr to Float32Array internally). */
export function taggedToInputBuffer(vm: VmState, tagged: f64, length: i32): TaggedInputResult {
  if (isCellRef(tagged)) return taggedToInputBuffer(vm, vmOpsVars.resolveCellRef(vm, tagged), length)
  const result = TaggedInputResult.instance
  result.ptr = 0
  result.buf = changetype<Float32Array>(0)
  if (isAudio(tagged)) {
    result.ptr = decodeAudio(tagged)
    return result
  }
  result.buf = vm.arena.get(length)
  result.ptr = result.buf.dataStart
  if (isScalar(tagged)) {
    const scalarVal: f32 = decodeScalar(tagged)
    for (let i: i32 = 0; i < length; i++) {
      store<f32>(result.ptr + (usize(i) << 2), scalarVal)
    }
  }
  else {
    memory.fill(result.ptr, 0, usize(length) << 2)
  }
  return result
}

/** Release only the allocated buffer (buf) when non-null. When buf is null (audio input) we only had ptr (dataStart); do not release here — caller must vm.arena.releaseByPtr(ptr) when the reference is dropped. */
// @ts-ignore
// @inline
export function releaseTaggedInputBuf(vm: VmState, buf: Float32Array): void {
  if (buf != changetype<Float32Array>(0)) vm.arena.release(buf)
}

/** Release result: releases buf when non-null (allocated path). When buf is null (audio), caller must vm.arena.releaseByPtr(ptr) when the reference is dropped. */
// @ts-ignore
// @inline
export function releaseTaggedInputResult(vm: VmState, _ptr: usize, buf: Float32Array): void {
  if (buf != changetype<Float32Array>(0)) vm.arena.release(buf)
}

/** Release result from taggedToAudioParamBuffer: only releases buf when we allocated it (stereo downmix). When buf is null the ptr came from the stack and is released at tick end. */
export function releaseTaggedAudioParamResult(vm: VmState, result: TaggedInputResult): void {
  if (result.buf != changetype<Float32Array>(0)) vm.arena.release(result.buf)
}

/** Release when we only have ptr (dataStart), e.g. from decodeAudio. Arena looks up the Float32Array via its ptr table and releases it. Use when the buffer is no longer referenced. */
// @ts-ignore
// @inline
export function releaseTaggedInputByPtr(vm: VmState, ptr: usize): void {
  if (ptr != 0) vm.arena.releaseByPtr(u32(ptr))
}
