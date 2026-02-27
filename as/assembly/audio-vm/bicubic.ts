/** 1D Catmull-Rom bicubic interpolation. Reads 4 samples around the fractional index with wrap. */

import { wrapIndex } from './util'

/** Return interpolated sample at fractional index. Index can be negative or >= length; it is wrapped. */
export function bicubicAt(ptr: usize, length: i32, index: f32): f32 {
  if (length <= 0) return 0.0
  const idx: i32 = i32(Mathf.floor(index))
  const t: f32 = index - f32(idx)
  const i0: i32 = wrapIndex(idx - 1, length)
  const i1: i32 = wrapIndex(idx, length)
  const i2: i32 = wrapIndex(idx + 1, length)
  const i3: i32 = wrapIndex(idx + 2, length)
  const p0: f32 = load<f32>(ptr + (usize(i0) << 2))
  const p1: f32 = load<f32>(ptr + (usize(i1) << 2))
  const p2: f32 = load<f32>(ptr + (usize(i2) << 2))
  const p3: f32 = load<f32>(ptr + (usize(i3) << 2))
  const t2: f32 = t * t
  const t3: f32 = t2 * t
  const half: f32 = 0.5
  const a: f32 = half * (-p0 + 3.0 * p1 - 3.0 * p2 + p3)
  const b: f32 = half * (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3)
  const c: f32 = half * (-p0 + p2)
  const d: f32 = p1
  return a * t3 + b * t2 + c * t + d
}
