// dprint-ignore-file

import { SincosKernel } from './kernel/sincos'

export * from './kernel/compressor'
export * from './kernel/dattorro'
export * from './kernel/fdn'
export * from './kernel/freeverb'
export * from './kernel/velvet'
export * from './kernel/pitch-shift'
export * from './kernel/sampler'
export * from './kernel/sincos'
import { euclidHit } from './lib/euclid'

const sincos = new SincosKernel(12)
const FRAC_BITS: i32 = 12
const FRAC_SCALE: f32 = f32(1 << FRAC_BITS)
const FRAC_MASK: i32 = (1 << FRAC_BITS) - 1

// @ts-ignore
// // @inline
export function log(x: f32): void {
  console.log(`${x}`)
}

// @ts-ignore
// // @inline
export function warn(x: f32): void {
  console.warn(`${x}`)
}

// @ts-ignore
@inline
export function clamp(value: f32, min: f32, max: f32): f32 {
  return Mathf.max(min, Mathf.min(value, max))
}

// @ts-ignore
@inline
export function clamp01(value: f32): f32 {
  return Mathf.max(0.0, Mathf.min(value, 1.0))
}

// @ts-ignore
@inline
export function clamp11(value: f32): f32 {
  return Mathf.max(-1.0, Mathf.min(value, 1.0))
}

// 4-point cubic interpolation (Niemitalo). Samples at [-1,0,1,2], frac in [0..1].
// @ts-ignore
@inline
export function cubic(xm1: f32, x0: f32, x1: f32, x2: f32, frac: f32): f32 {
  const a: f32 = (3.0 * (x0 - x1) - xm1 + x2) * 0.5
  const b: f32 = 2.0 * x1 + xm1 - (5.0 * x0 + x2) * 0.5
  const c: f32 = (x1 - xm1) * 0.5
  return ((a * frac + b) * frac + c) * frac + x0
}

// @ts-ignore
@inline
export function sin(value: f32): f32 {
  return sincos.lookupSin(value)
}

// @ts-ignore
@inline
export function cos(value: f32): f32 {
  return sincos.lookupCos(value)
}

// @ts-ignore
// @inline
export function tan(value: f32): f32 {
  return Mathf.tan(value)
}

// @ts-ignore
@inline
export function sinNormalized(value: f32): f32 {
  return sincos.lookupSinNormalized(value)
}

// @ts-ignore
@inline
export function cosNormalized(value: f32): f32 {
  return sincos.lookupCosNormalized(value)
}

// @ts-ignore
@inline
export function fract01(value: f32): f32 {
  const x: i32 = i32(value * FRAC_SCALE)
  return f32(x & FRAC_MASK) / FRAC_SCALE
}

// @ts-ignore
@inline
export function floor(value: f32): f32 {
  return Mathf.floor(value)
}

// @ts-ignore
@inline
export function min(a: f32, b: f32): f32 {
  return Mathf.min(a, b)
}

// @ts-ignore
@inline
export function max(a: f32, b: f32): f32 {
  return Mathf.max(a, b)
}

// @ts-ignore
@inline
export function pow(base: f32, exp: f32): f32 {
  return Mathf.pow(base, exp)
}

// @ts-ignore
@inline
export function sqrt(x: f32): f32 {
  return Mathf.sqrt(x)
}

// @ts-ignore
@inline
export function exp(x: f32): f32 {
  return Mathf.exp(x)
}

// Hyperbolic tangent approximation for Moog ladder filter
// @ts-ignore
@inline
export function tanha(x: f32): f32 {
  return x / (1.0 + (x * x) / (3.0 + (x * x) / 5.0))
}

// @ts-ignore
@inline
export function tanh(x: f32): f32 {
  return Mathf.tanh(x)
}

// @ts-ignore
@inline
export function atan(x: f32): f32 {
  return Mathf.atan(x)
}

// @ts-ignore
@inline
export function asin(x: f32): f32 {
  return Mathf.asin(x)
}

// @ts-ignore
@inline
export function acos(x: f32): f32 {
  return Mathf.acos(x)
}

// @ts-ignore
@inline
export function log10(x: f32): f32 {
  return Mathf.log(x) / Mathf.LN10
}

// @ts-ignore
@inline
export function log2(x: f32): f32 {
  return Mathf.log(x) / Mathf.LN2
}

// @ts-ignore
@inline
export function exp2(x: f32): f32 {
  return Mathf.pow(2.0, x)
}

// @ts-ignore
@inline
export function trunc(x: f32): f32 {
  return Mathf.trunc(x)
}

// @ts-ignore
@inline
export function sign(x: f32): f32 {
  if (x > 0.0) return 1.0
  if (x < 0.0) return -1.0
  return 0.0
}

// @ts-ignore
@inline
export function square(x: f32): f32 {
  return x * x
}

// @ts-ignore
@inline
export function cube(x: f32): f32 {
  return x * x * x
}

// @ts-ignore
@inline
export function fract(x: f32): f32 {
  return x - Mathf.floor(x)
}

// @ts-ignore
// @inline
export function heaviside(x: f32): f32 {
  if (x < 0.0) return 0.0
  if (x > 0.0) return 1.0
  return 0.5
}

// @ts-ignore
// @inline
export function isnan(x: f32): f32 {
  return isNaN(x) ? 1.0 : 0.0
}

// @ts-ignore
// @inline
export function isinf(x: f32): f32 {
  return (!isFinite(x) && !isNaN(x)) ? 1.0 : 0.0
}

// @ts-ignore
@inline
export function hypot(a: f32, b: f32): f32 {
  return Mathf.sqrt(a * a + b * b)
}

// @ts-ignore
@inline
export function abs(x: f32): f32 {
  return Mathf.abs(x)
}

// @ts-ignore
@inline
export function round(x: f32): f32 {
  return Mathf.round(x)
}

// @ts-ignore
@inline
export function ceil(x: f32): f32 {
  return Mathf.ceil(x)
}

// Natural log for math builtins (util.log is console.log)
// @ts-ignore
@inline
export function logMath(x: f32): f32 {
  return Mathf.log(x)
}

// @ts-ignore
@inline
export function lerp(a: f32, b: f32, t: f32): f32 {
  return a + (b - a) * t
}

// @ts-ignore
// @inline
export function smoothstep(edge0: f32, edge1: f32, x: f32): f32 {
  const t: f32 = Mathf.min(1.0, Mathf.max(0.0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3.0 - 2.0 * t)
}

// @ts-ignore
// @inline
export function smootherstep(edge0: f32, edge1: f32, x: f32): f32 {
  const t: f32 = Mathf.min(1.0, Mathf.max(0.0, (x - edge0) / (edge1 - edge0)))
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0)
}

// @ts-ignore
// @inline
export function modFn(x: f32, y: f32): f32 {
  return x - y * Mathf.floor(x / y)
}

// @ts-ignore
// @inline
export function snap(x: f32, step: f32): f32 {
  return Mathf.round(x / step) * step
}

// @ts-ignore
// @inline
export function stepFn(edge: f32, x: f32): f32 {
  return x < edge ? 0.0 : 1.0
}

// @ts-ignore
// @inline
export function safediv(x: f32, y: f32): f32 {
  return y == 0.0 ? 0.0 : x / y
}

// @ts-ignore
// @inline
export function wrap(x: f32, lo: f32, hi: f32): f32 {
  const range: f32 = hi - lo
  if (range <= 0.0) return lo
  const offset: f32 = x - lo
  return lo + (offset - Mathf.floor(offset / range) * range)
}

// @ts-ignore
// @inline
export function pingpong(x: f32, lo: f32, hi: f32): f32 {
  const range: f32 = hi - lo
  if (range <= 0.0) return lo
  const normalized: f32 = (x - lo) / range
  const cycle: f32 = normalized - 2.0 * Mathf.floor(normalized * 0.5)
  const triangle: f32 = cycle > 1.0 ? 2.0 - cycle : cycle
  return lo + triangle * range
}

// @ts-ignore
// @inline
export function fold(x: f32, lo: f32, hi: f32): f32 {
  const range: f32 = hi - lo
  if (range <= 0.0) return lo
  let val: f32 = x
  const range2: f32 = range * 2.0
  if (val < lo) {
    val = lo - val
    val = val - range2 * Mathf.floor(val / range2)
    if (val > range) val = range2 - val
    val = val + lo
  }
  else if (val > hi) {
    val = val - hi
    val = val - range2 * Mathf.floor(val / range2)
    if (val > range) val = range2 - val
    val = hi - val
  }
  return val
}

// select(a, b, cond): cond != 0 ? b : a
// @ts-ignore
@inline
export function select(cond: f32, a: f32, b: f32): f32 {
  return cond != 0.0 ? b : a
}

// @ts-ignore
@inline
export function euclidHitF32(pulses: f32, steps: f32, step: f32, offset: f32): f32 {
  return euclidHit(
    i32(Mathf.floor(pulses)),
    i32(Mathf.floor(steps)),
    i32(Mathf.floor(step)),
    i32(Mathf.floor(offset)),
  )
    ? 1.0
    : 0.0
}

// swing(t, amount): match lm2 Every.process - clamp amount to [0,1], shift odd cycles earlier
// @ts-ignore
// @inline
export function swing(t: f32, amount: f32): f32 {
  const s: f32 = Mathf.min(1.0, Mathf.max(0.0, amount))
  if (s == 0.0) return t
  const interval: f32 = 1.0
  const swingOffset: f32 = interval * s * 0.5
  const cycle: i32 = i32(Mathf.floor(t / interval))
  if ((cycle & 1) == 1) return t - swingOffset
  return t
}

// PolyBLEP for band-limited oscillators (phase and phaseInc in 0..1)
// @ts-ignore
@inline
export function polyBlep(phase: f32, phaseInc: f32): f32 {
  if (phaseInc <= 0.0) return 0.0
  if (phase < phaseInc) {
    const t: f32 = phase / phaseInc
    return t + t - t * t - 1.0
  }
  if (phase > 1.0 - phaseInc) {
    const t: f32 = (phase - 1.0) / phaseInc
    return t * t + t + t + 1.0
  }
  return 0.0
}

export const TWO_PI: f32 = Mathf.PI * 2.0

// Fast path for audio-rate pow when exponent is a small non-negative integer.
// This avoids calling into libm for common cases like x^2, x^4, etc.
// exp must be in [0..16].
// @ts-ignore
@inline
export function fastPowAudio(base: f32, exp: i32): f32 {
  let result: f32 = f32(1)

  if ((exp & 1) != 0) result *= base
  let b: f32 = base * base // ^2

  if ((exp & 2) != 0) result *= b
  b *= b // ^4

  if ((exp & 4) != 0) result *= b
  b *= b // ^8

  if ((exp & 8) != 0) result *= b
  b *= b // ^16

  if ((exp & 16) != 0) result *= b

  return result
}

// Curve shape for envelopes: positive = power curve, negative = mirrored complement, 0 = linear
// @ts-ignore
@inline
export function applyCurve(t: f32, curve: f32): f32 {
  if (curve > 0.0) return Mathf.pow(t, curve)
  if (curve < 0.0) {
    const base: f32 = -curve
    if (base > 0.0) {
      return 1.0 - Mathf.pow(1.0 - t, base)
    }
  }
  return t
}

// Noise PRNG helpers (state passed as f32 bits for DSL compatibility)
// @ts-ignore
@inline
function hashU32(v: u32): u32 {
  v ^= v >> 16
  v *= 0x7feb352d
  v ^= v >> 15
  v *= 0x846ca68b
  v ^= v >> 16
  return v
}

// @ts-ignore
@inline
function xorshift32(s: u32): u32 {
  s ^= s << 13
  s ^= s >> 17
  s ^= s << 5
  return s
}

// @ts-ignore
@inline
function u32To01(v: u32): f32 {
  return (f32(v >>> 8) * (1.0 / 16777216.0)) as f32
}

// @ts-ignore
@inline
function u32To11(v: u32): f32 {
  return (u32To01(v) * 2.0 - 1.0) as f32
}

// @ts-ignore
@inline
export function seedToNoiseState(seed: f32): f32 {
  const v: u32 = hashU32(reinterpret<u32>(seed))
  return reinterpret<f32>((v | 1) as u32)
}

// @ts-ignore
@inline
export function whiteNoiseValue(state: f32): f32 {
  return u32To11(reinterpret<u32>(state))
}

// @ts-ignore
@inline
export function whiteNoiseNextState(state: f32): f32 {
  const s: u32 = xorshift32(reinterpret<u32>(state))
  return reinterpret<f32>(s)
}

// @ts-ignore
@inline
export function gaussNoiseValue(state: f32): f32 {
  let s: u32 = reinterpret<u32>(state)
  let sum: f32 = 0.0
  s = xorshift32(s)
  sum += u32To01(s)
  s = xorshift32(s)
  sum += u32To01(s)
  s = xorshift32(s)
  sum += u32To01(s)
  s = xorshift32(s)
  sum += u32To01(s)
  s = xorshift32(s)
  sum += u32To01(s)
  s = xorshift32(s)
  sum += u32To01(s)
  return ((sum - 3.0) * (1.0 / 3.0)) as f32
}

// @ts-ignore
@inline
export function gaussNoiseNextState(state: f32): f32 {
  let s: u32 = reinterpret<u32>(state)
  for (let i: i32 = 0; i < 6; i++) {
    s = xorshift32(s)
  }
  return reinterpret<f32>(s)
}

// @ts-ignore
@inline
export function uniform01Value(state: f32): f32 {
  return u32To01(reinterpret<u32>(state))
}

// @ts-ignore
@inline
export function uniform01NextState(state: f32): f32 {
  const s: u32 = xorshift32(reinterpret<u32>(state))
  return reinterpret<f32>(s)
}

// Deterministic 0..1 from (seed, index) for LFO sample-and-hold. Index in f32 (cycle count).
// @ts-ignore
// @inline
export function sahValue(seed: f32, index: f32): f32 {
  const seedBits: u32 = hashU32(reinterpret<u32>(seed))
  const h: u32 = hashU32(seedBits ^ (u32(i32(index)) * 0x9e3779b9))
  return u32To01(h)
}

// @ts-ignore
// @inline
function fade5(t: f32): f32 {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0)
}

// @ts-ignore
// @inline
export function fadeWithCurve(t: f32, curve: f32): f32 {
  const c: f32 = clamp01(curve)
  const f: f32 = fade5(t)
  return (t + (f - t) * c) as f32
}

function trailingZerosU32(v: u32): i32 {
  if (v === 0) return 32
  let n: i32 = 0
  let x: u32 = v
  while ((x & 1) === 0) {
    n++
    x >>= 1
  }
  return n
}

// @ts-ignore
// @inline
export function trailingZerosF32(counter: f32): f32 {
  const v: u32 = reinterpret<u32>(counter)
  return f32(trailingZerosU32(v)) as f32
}

// @ts-ignore
// @inline
export function uintIncrementF32(x: f32): f32 {
  const u: u32 = reinterpret<u32>(x) + 1
  return reinterpret<f32>(u)
}

// @ts-ignore
// @inline
export function seedForOctave(seed: f32, octaveIndex: f32): f32 {
  const seedBits: u32 = hashU32(reinterpret<u32>(seed))
  const base: u32 = hashU32(seedBits ^ 0x66726163) | 1
  const o: i32 = i32(octaveIndex)
  const s: u32 = hashU32(base ^ (u32(o) * 0x9e3779b9)) | 1
  return reinterpret<f32>(s)
}
