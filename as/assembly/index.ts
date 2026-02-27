import { audioVms } from './audio-vm'
import {
  copyAudioVmStateFrom,
  ensureGlobalsSize,
  getArrayElement,
  getArrayElementIsUndefined,
  getArrayElementIsUndefinedNested,
  getArrayElementNested,
  getInfo,
  getScalarGlobal,
  releaseOutputs,
  run,
  setOversampleModes,
  setScalarGlobal,
  setUndefinedGlobal,
} from './audio-vm/runner'

export { bpmOverride } from './audio-vm/constants'
export * from './kernel/sample-record'
export * from './mini'

const float32Buffers: Array<Float32Array> = new Array<Float32Array>()
const float32BufferPtrs: Array<usize> = new Array<usize>()
const float32BufferSizes: Array<i32> = new Array<i32>()
const float32BufferFree: Array<bool> = new Array<bool>()
const float32BufferInfo: Uint32Array = new Uint32Array(4)

function roundUpPow2(v: i32): i32 {
  // v > 0
  v -= 1
  v |= v >> 1
  v |= v >> 2
  v |= v >> 4
  v |= v >> 8
  v |= v >> 16
  return v + 1
}

export function createFloat32Buffer(size: i32): usize {
  // Arena allocator: keep strong refs forever; reuse freed buffers by size class.
  const req: i32 = size > 0 ? size : 1
  const want: i32 = roundUpPow2(req)
  let best: i32 = -1
  let bestSize: i32 = 0
  for (let i = 0; i < float32BufferPtrs.length; i++) {
    if (!float32BufferFree[i]) continue
    const cap: i32 = float32BufferSizes[i]
    if (cap < want) continue
    if (best < 0 || cap < bestSize) {
      best = i
      bestSize = cap
      if (cap == want) break
    }
  }
  if (best >= 0) {
    float32BufferFree[best] = false
    return float32BufferPtrs[best]
  }

  // console.log(`createFloat32Buffer: new size=${want} total=${float32Buffers.length}`)
  const buffer: Float32Array = new Float32Array(want)
  const ptr: usize = buffer.dataStart
  float32Buffers.push(buffer)
  float32BufferPtrs.push(ptr)
  float32BufferSizes.push(want)
  float32BufferFree.push(false)
  return ptr
}

export function freeFloat32Buffer(ptr: usize): void {
  for (let i = 0; i < float32BufferPtrs.length; i++) {
    if (float32BufferPtrs[i] != ptr) continue
    float32BufferFree[i] = true
    return
  }
}

/** Returns approximate heap memory usage in bytes */
export function memoryUsage(): usize {
  // Total memory allocated in bytes
  let totalBytes = memory.size() * 64 * 1024
  // Heap usage = total memory - start of heap
  return totalBytes - i32(__heap_base)
}

export function memoryGrow(delta: i32): i32 {
  return memory.grow(delta)
}

/** Returns pointer to `[total, free, totalFloats, totalBytes]` */
export function getFloat32BufferArenaInfo(): usize {
  let freeCount: u32 = 0
  let totalFloats: u32 = 0
  for (let i = 0; i < float32BufferPtrs.length; i++) {
    if (float32BufferFree[i]) freeCount++
    totalFloats += u32(float32BufferSizes[i])
  }
  float32BufferInfo[0] = u32(float32BufferPtrs.length)
  float32BufferInfo[1] = freeCount
  float32BufferInfo[2] = totalFloats
  float32BufferInfo[3] = totalFloats << 2
  return float32BufferInfo.dataStart
}

export function runAudioVm(
  opsPtr: usize,
  opsLength: i32,
  bufferLength: i32,
  sampleCount: i32,
  sampleRate: f32,
  nyquist: f32,
  piOverNyquist: f32,
  bpm: f32,
): void {
  run(audioVms.get(0), opsPtr, opsLength, bufferLength, sampleCount, sampleRate, nyquist, piOverNyquist, bpm)
}

export function getAudioVmInfo(): usize {
  return getInfo(audioVms.get(0))
}

export function runAudioVmAt(
  vmId: i32,
  opsPtr: usize,
  opsLength: i32,
  bufferLength: i32,
  sampleCount: i32,
  sampleRate: f32,
  nyquist: f32,
  piOverNyquist: f32,
  bpm: f32,
): void {
  run(audioVms.get(vmId), opsPtr, opsLength, bufferLength, sampleCount, sampleRate, nyquist, piOverNyquist, bpm)
}

export function getAudioVmInfoAt(vmId: i32): usize {
  return getInfo(audioVms.get(vmId))
}

export function getAudioVmArenaInfoAt(vmId: i32): usize {
  const state = audioVms.get(vmId)
  const stats = state.arena.getStats()
  return stats.dataStart
}

export function releaseAudioVmOutputsAt(vmId: i32): void {
  releaseOutputs(audioVms.get(vmId))
}

export function copyAudioVmState(fromVmId: i32, toVmId: i32): void {
  copyAudioVmStateFrom(audioVms.get(toVmId), audioVms.get(fromVmId))
}

export function resetAudioVmAt(vmId: i32): void {
  audioVms.reset(vmId)
}

export function getAudioVmGlobalAt(vmId: i32, index: i32): f32 {
  return getScalarGlobal(audioVms.get(vmId), index)
}

export function setAudioVmGlobalAt(vmId: i32, index: i32, value: f32): void {
  setScalarGlobal(audioVms.get(vmId), index, value)
}

export function setAudioVmGlobalUndefined(vmId: i32, index: i32): void {
  setUndefinedGlobal(audioVms.get(vmId), index)
}

export function setAudioVmGlobalsSize(vmId: i32, size: i32): void {
  ensureGlobalsSize(audioVms.get(vmId), size)
}

export function getAudioVmArrayElementAt(vmId: i32, arrayGlobalIndex: i32, elementIndex: i32): f32 {
  return getArrayElement(audioVms.get(vmId), arrayGlobalIndex, elementIndex)
}

export function getAudioVmArrayElementIsUndefined(vmId: i32, arrayGlobalIndex: i32, elementIndex: i32): bool {
  return getArrayElementIsUndefined(audioVms.get(vmId), arrayGlobalIndex, elementIndex)
}

export function getAudioVmNestedArrayElementAt(
  vmId: i32,
  outerArrayGlobalIndex: i32,
  outerIndex: i32,
  innerIndex: i32,
): f32 {
  return getArrayElementNested(audioVms.get(vmId), outerArrayGlobalIndex, outerIndex, innerIndex)
}

export function getAudioVmNestedArrayElementIsUndefined(
  vmId: i32,
  outerArrayGlobalIndex: i32,
  outerIndex: i32,
  innerIndex: i32,
): bool {
  return getArrayElementIsUndefinedNested(audioVms.get(vmId), outerArrayGlobalIndex, outerIndex, innerIndex)
}

export function setAudioVmOversampleModes(vmId: i32, upMode: i32, downMode: i32): void {
  setOversampleModes(audioVms.get(vmId), upMode, downMode)
}

export function setAudioVmPreserveFunctionState(vmId: i32, value: bool): void {
  audioVms.get(vmId).preserveFunctionState = value
}
