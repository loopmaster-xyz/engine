// dprint-ignore-file
// Constants and tags for tagged values.

export const EMPTY_FLOAT64_ARRAY: Float64Array = new Float64Array(0)
export const HISTORY_SIZE: i32 = 1024
export const HISTORY_META_STRIDE: i32 = 20
export const AUDIO_VM_INFO_STRIDE: i32 = 29

export const WAVEFORM_CHUNK_SAMPLES: i32 = 128
export const WAVEFORM_RING_SAMPLES: i32 = 8192
export const WAVEFORM_RING_CHUNKS: i32 = 64
export const WAVEFORM_RING_MASK: i32 = 63

export enum AudioValueKind {
  Scalar = 0,
  Audio = 1,
  Array = 2,
}

// Tagged value system using f64
// We use the high 16 bits of f64 for type tags
// This allows us to store type information alongside the value

// Type tags stored in high 16 bits
// @ts-ignore
// @inline
export const TAG_SCALAR: u64 = 0x0001000000000000
// @ts-ignore
// @inline
export const TAG_AUDIO: u64 = 0x0002000000000000
// @ts-ignore
// @inline
export const TAG_ARRAY: u64 = 0x0003000000000000
// @ts-ignore
// @inline
export const TAG_FUNCTION: u64 = 0x0004000000000000
// @ts-ignore
// @inline
export const TAG_UNDEFINED: u64 = 0x0005000000000000
// @ts-ignore
// @inline
export const TAG_CELL_REF: u64 = 0x0006000000000000

// @ts-ignore
// @inline
export const TAG_MASK: u64 = 0xFFFF000000000000
// @ts-ignore
// @inline
export const VALUE_MASK: u64 = 0x0000FFFFFFFFFFFF

let bpmOverrideValue: f32 = 0.0

export function bpmOverride(value: f32): void {
  bpmOverrideValue = value
}

export function getBpmOverride(): f32 {
  return bpmOverrideValue
}

// Encode a scalar value as tagged f64
// @ts-ignore
// @inline
export function encodeScalar(value: f32): f64 {
  const u: u64 = u64(reinterpret<u32>(value))
  return reinterpret<f64>(TAG_SCALAR | u)
}

// Encode an audio buffer pointer as tagged f64
// @ts-ignore
// @inline
export function encodeAudio(ptr: usize): f64 {
  const u: u64 = u64(u32(ptr))
  return reinterpret<f64>(TAG_AUDIO | u)
}

// Encode an array ID as tagged f64
// @ts-ignore
// @inline
export function encodeArray(arrayId: u32): f64 {
  const u: u64 = u64(arrayId)
  return reinterpret<f64>(TAG_ARRAY | u)
}

// Encode a function instance ID as tagged f64
// @ts-ignore
// @inline
export function encodeFunction(instanceId: u32): f64 {
  const u: u64 = u64(instanceId)
  return reinterpret<f64>(TAG_FUNCTION | u)
}

// Encode undefined
// @ts-ignore
// @inline
export function encodeUndefined(): f64 {
  return reinterpret<f64>(TAG_UNDEFINED)
}

// Get the type tag from a tagged value
// @ts-ignore
// @inline
export function getTag(tagged: f64): u64 {
  return reinterpret<u64>(tagged) & TAG_MASK
}

// Decode scalar value from tagged f64
// @ts-ignore
// @inline
export function decodeScalar(tagged: f64): f32 {
  const bits: u64 = reinterpret<u64>(tagged) & VALUE_MASK
  return reinterpret<f32>(u32(bits))
}

// Decode audio buffer pointer from tagged f64
// @ts-ignore
// @inline
export function decodeAudio(tagged: f64): usize {
  const bits: u64 = reinterpret<u64>(tagged) & VALUE_MASK
  return usize(u32(bits))
}

// Decode array ID from tagged f64
// @ts-ignore
// @inline
export function decodeArray(tagged: f64): u32 {
  const bits: u64 = reinterpret<u64>(tagged) & VALUE_MASK
  return u32(bits)
}

// Decode function instance ID from tagged f64
// @ts-ignore
// @inline
export function decodeFunction(tagged: f64): u32 {
  const bits: u64 = reinterpret<u64>(tagged) & VALUE_MASK
  return u32(bits)
}

// Runtime type check functions
// @ts-ignore
// @inline
export function isUndefined(tagged: f64): bool {
  return getTag(tagged) == TAG_UNDEFINED
}

// @ts-ignore
// @inline
export function isScalar(tagged: f64): bool {
  return getTag(tagged) == TAG_SCALAR
}

// @ts-ignore
// @inline
export function isAudio(tagged: f64): bool {
  return getTag(tagged) == TAG_AUDIO
}

// @ts-ignore
// @inline
export function isArray(tagged: f64): bool {
  return getTag(tagged) == TAG_ARRAY
}

// @ts-ignore
// @inline
export function isFunction(tagged: f64): bool {
  return getTag(tagged) == TAG_FUNCTION
}

// Cell ref: encoded on stack when capturing closure vars (index into VM cell pool)
// @ts-ignore
// @inline
export function encodeCellRef(cellIndex: i32): f64 {
  const u: u64 = u64(u32(cellIndex))
  return reinterpret<f64>(TAG_CELL_REF | u)
}

// @ts-ignore
// @inline
export function decodeCellRef(tagged: f64): i32 {
  const bits: u64 = reinterpret<u64>(tagged) & VALUE_MASK
  return i32(u32(bits))
}

// @ts-ignore
// @inline
export function isCellRef(tagged: f64): bool {
  return getTag(tagged) == TAG_CELL_REF
}

/** True if tagged is audio and its ptr equals ptr. */
// @ts-ignore
// @inline
export function taggedIsAudioWithPtr(tagged: f64, ptr: usize): bool {
  return isAudio(tagged) && decodeAudio(tagged) == ptr
}
