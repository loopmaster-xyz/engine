// dprint-ignore-file

import {
  decodeArray,
  decodeAudio,
  decodeCellRef,
  decodeFunction,
  decodeScalar,
  isArray,
  isAudio,
  isCellRef,
  isFunction,
  isScalar,
  isUndefined,
  TAG_MASK,
} from './constants'
import * as vmOpsVars from './vm-ops-vars'
import { VmState } from './vm-state'

/** Seeded random in [0, 1). Used for deterministic random selection. */
export function seededRandom01(baseSeed: u32, cycle: f64, opIndex: i32, valueIndex: i32 = 0): f64 {
  let state: i32 = i32(baseSeed)
  state ^= i32(cycle) * 374761393
  state ^= opIndex * 668265263
  state ^= valueIndex * 224682251

  state = (state * 9301 + 49297) % 233280
  if (state < 0) state += 233280

  return f64(state) / 233280.0
}

/** Wrap index into [0, length); length <= 0 returns 0. */
// @ts-ignore
// @inline
export function wrapIndex(i: i32, length: i32): i32 {
  if (length <= 0) return 0
  let r: i32 = i % length
  if (r < 0) r += length
  return r
}

/** Wrapped index from audio buffer at sample (floor load, then wrap into length). */
export function wrappedIndexFromAudioAt(audioPtr: usize, sampleIndex: i32, length: i32): i32 {
  return wrapIndex(i32(Mathf.floor(load<f32>(audioPtr + (usize(sampleIndex) << 2)))), length)
}

/** Wrapped index from scalar tagged value. */
export function wrappedIndexFromScalar(tagged: f64, length: i32): i32 {
  return wrapIndex(i32(Mathf.floor(decodeScalar(tagged))), length)
}

/** Read i32 operand at pc from bytecode (opsPtr + pc * 4). Caller advances pc. */
export function readOperandI32(opsPtr: usize, pc: i32): i32 {
  return i32(load<f32>(opsPtr + (pc << 2)))
}

/** Copy chunkLen samples from inputPtr into ring buffer at bufPtr; return next write index. */
export function writeChunkToRingBuffer(
  bufPtr: usize,
  len: i32,
  writeIndex: i32,
  inputPtr: usize,
  chunkLen: i32,
): i32 {
  let wi: i32 = writeIndex
  for (let i: i32 = 0; i < chunkLen; i++) {
    const dst: i32 = wrapIndex(wi, len)
    store<f32>(bufPtr + (usize(dst) << 2), load<f32>(inputPtr + (usize(i) << 2)))
    wi++
  }
  return wrapIndex(wi, len)
}

/** Fill outPtr with time-in-beats: t = sampleCount/samplesPerBeat, then t += 1/samplesPerBeat per sample. */
export function writeTimeBuffer(outPtr: usize, bufferLength: i32, sampleCount: i32, samplesPerBeat: f32): void {
  let t: f32 = f32(sampleCount) / samplesPerBeat
  const dt: f32 = f32(1) / samplesPerBeat
  for (let i: i32 = 0; i < bufferLength; i++) {
    store<f32>(outPtr + (usize(i) << 2), t)
    t += dt
  }
}

/** Human-readable type name for error messages. */
export function taggedTypeName(tagged: f64): string {
  if (isUndefined(tagged)) return 'undefined'
  if (isArray(tagged)) return 'array'
  if (isCellRef(tagged)) return 'unresolved cellref'
  if (isScalar(tagged)) return 'scalar'
  if (isAudio(tagged)) return 'audio'
  if (isFunction(tagged)) return 'function'
  const bits: u64 = reinterpret<u64>(tagged)
  const tag: u64 = bits & TAG_MASK
  return `unknown tag=0x${tag.toString(16)} raw=${tagged.toString(16)}`
}

/** True if both are audio and point to the same buffer. */
export function isSameAudioPtr(tagL: f64, tagR: f64): bool {
  return isAudio(tagL) && isAudio(tagR) && decodeAudio(tagL) == decodeAudio(tagR)
}

/** Return smallest power of 2 >= value (or 1 if value <= 1). */
export function nextPow2(value: i32): i32 {
  if (value <= 1) return 1
  let v: u32 = u32(value - 1)
  v |= v >> 1
  v |= v >> 2
  v |= v >> 4
  v |= v >> 8
  v |= v >> 16
  return i32(v + 1)
}

export function stackDump(vm: VmState): void {
  console.log(`Stack dump: stackTop=${vm.stackTop}`)
  for (let j: i32 = 0; j < vm.stackTop; j++) {
    const val = vm.stack[j]
    if (isAudio(val)) {
      console.log(`  slot ${j}: audio ptr=${decodeAudio(val)}`)
    }
    else if (isScalar(val)) {
      console.log(`  slot ${j}: scalar=${decodeScalar(val)}`)
    }
    else if (isArray(val)) {
      console.log(`  slot ${j}: array=${decodeArray(val)}`)
      const idx: i32 = decodeArray(val) - 1
      const len: i32 = vm.arrayLengths.get(idx)
      console.log(`             arraylength=${len}`)
    }
    else if (isCellRef(val)) {
      console.log(`  slot ${j}: cellref=${decodeCellRef(val)}`)
      console.log(`             cellvalue=${vmOpsVars.resolveCellRef(vm, val)}`)
    }
    else if (isUndefined(val)) {
      console.log(`  slot ${j}: undefined`)
    }
    else if (isFunction(val)) {
      console.log(`  slot ${j}: function=${decodeFunction(val)}`)
    }
    else {
      const bits: u64 = reinterpret<u64>(val)
      const tag: u64 = bits & TAG_MASK
      console.log(`  slot ${j}: unknown tag=0x${tag.toString(16)} raw=${val}`)
    }
  }
}
