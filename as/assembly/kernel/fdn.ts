import { AudioBufferArena } from '../audio-vm/audio-buffer-arena'
import { cubic } from '../util'

const NUM_DELAYS: i32 = 8
const DC_A: f32 = 0.995
const MOD_RATE_HZ: f32 = 0.15
const MOD_DEPTH_MS: f32 = 0.35
const BASE_SR: f32 = 48000.0
const H: f32 = 0.3535533905932738

const BASE_DELAYS: i32[] = [1061, 1153, 1307, 1499, 1747, 2017, 2399, 2791]

const HADAMARD: f32[] = [
  H, H, H, H, H, H, H, H,
  H, -H, H, -H, H, -H, H, -H,
  H, H, -H, -H, H, H, -H, -H,
  H, -H, -H, H, H, -H, -H, H,
  H, H, H, H, -H, -H, -H, -H,
  H, -H, H, -H, -H, H, -H, H,
  H, H, -H, -H, -H, -H, H, H,
  H, -H, -H, H, -H, H, H, -H,
]

const MOD_PHASES: f32[] = [
  0.0,
  0.7853981633974483,
  1.5707963267948966,
  2.356194490192345,
  3.141592653589793,
  3.9269908169872414,
  4.71238898038469,
  5.497787143782138,
]

const TWO_PI: f32 = 6.283185307179586
const LP_CUTOFF_MAX: f32 = 12000.0
const LP_CUTOFF_MIN: f32 = 1500.0
const HP_CUTOFF: f32 = 120.0

function nextPow2(n: i32): i32 {
  if (n <= 1) return 1
  let x: i32 = n - 1
  x |= x >> 1
  x |= x >> 2
  x |= x >> 4
  x |= x >> 8
  x |= x >> 16
  return x + 1
}

export class FdnKernel {
  sampleRate: f32 = 44100.0
  arena: AudioBufferArena = new AudioBufferArena()
  lastSampleRate: f32 = 0.0
  initialized: boolean = false

  buf: Array<Float32Array | null> = new Array<Float32Array | null>(NUM_DELAYS)
  mask: i32[] = new Array<i32>(NUM_DELAYS)
  write: i32[] = new Array<i32>(NUM_DELAYS)
  baseLen: f32[] = new Array<f32>(NUM_DELAYS)

  dcX1: f32[] = new Array<f32>(NUM_DELAYS)
  dcY1: f32[] = new Array<f32>(NUM_DELAYS)
  lpY1: f32[] = new Array<f32>(NUM_DELAYS)
  hpX1: f32[] = new Array<f32>(NUM_DELAYS)
  hpY1: f32[] = new Array<f32>(NUM_DELAYS)
  modPhases: f32[] = new Array<f32>(NUM_DELAYS)

  tmpDelayOuts: f32[] = new Array<f32>(NUM_DELAYS)
  tmpFeedback: f32[] = new Array<f32>(NUM_DELAYS)

  outL: f32 = 0.0
  outR: f32 = 0.0

  reset(): void {
    if (!this.initialized) this.initialize()
    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      this.write[i] = 0
      this.dcX1[i] = 0.0
      this.dcY1[i] = 0.0
      this.lpY1[i] = 0.0
      this.hpX1[i] = 0.0
      this.hpY1[i] = 0.0
      this.modPhases[i] = MOD_PHASES[i]
      const b: Float32Array = changetype<Float32Array>(this.buf[i])
      for (let j: i32 = 0; j < b.length; j++) b[j] = 0.0
    }
  }

  setSampleRate(sr: f32): void {
    if (this.sampleRate === sr && this.initialized) return
    this.sampleRate = sr
    this.lastSampleRate = sr
    this.initialize()
  }

  private initialize(): void {
    const scale: f32 = this.sampleRate / BASE_SR
    const maxModSamples: i32 = i32(Mathf.ceil(MOD_DEPTH_MS * this.sampleRate / 1000.0))
    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      this.baseLen[i] = f32(BASE_DELAYS[i]) * scale
      this.write[i] = 0
      this.dcX1[i] = 0.0
      this.dcY1[i] = 0.0
      this.lpY1[i] = 0.0
      this.hpX1[i] = 0.0
      this.hpY1[i] = 0.0
      this.modPhases[i] = MOD_PHASES[i]
      const baseSamples: i32 = i32(Mathf.ceil(this.baseLen[i]))
      const cap: i32 = nextPow2(baseSamples + maxModSamples + 4)
      if (this.buf[i] && changetype<Float32Array>(this.buf[i]).length > 0) {
        this.arena.release(changetype<Float32Array>(this.buf[i]))
      }
      const b: Float32Array = this.arena.get(cap)
      for (let j: i32 = 0; j < b.length; j++) b[j] = 0.0
      this.buf[i] = b
      this.mask[i] = cap - 1
    }
    this.initialized = true
  }

  private writeDelay(i: i32, value: f32): void {
    const b: Float32Array = changetype<Float32Array>(this.buf[i])
    const m: i32 = this.mask[i]
    const w: i32 = this.write[i]
    b[w] = value
    this.write[i] = (w + 1) & m
  }

  private processFeedback(i: i32, input: f32, decay: f32, damping: f32): f32 {
    const x1: f32 = this.dcX1[i]
    const y1: f32 = this.dcY1[i]
    const dcOut: f32 = input - x1 + DC_A * y1
    this.dcX1[i] = input
    this.dcY1[i] = dcOut

    const cutoffHz: f32 = LP_CUTOFF_MAX - damping * (LP_CUTOFF_MAX - LP_CUTOFF_MIN)
    const lpA: f32 = Mathf.exp(-2.0 * Mathf.PI * cutoffHz / this.sampleRate)
    const lpY: f32 = (1.0 - lpA) * dcOut + lpA * this.lpY1[i]
    this.lpY1[i] = lpY

    const hpA: f32 = Mathf.exp(-2.0 * Mathf.PI * HP_CUTOFF / this.sampleRate)
    const hpY: f32 = hpA * (this.hpY1[i] + lpY - this.hpX1[i])
    this.hpX1[i] = lpY
    this.hpY1[i] = hpY

    return hpY * decay
  }

  process(inL: f32, inR: f32, roomSize: f32, damping: f32, decay: f32, modulationDepth: f32): void {
    if (!this.initialized) this.initialize()

    const room: f32 = Mathf.max(0.1, Mathf.min(2.0, roomSize))
    const damp: f32 = Mathf.max(0.0, Mathf.min(1.0, damping))
    const dec: f32 = Mathf.max(0.0, Mathf.min(1.0, decay))
    const modDepth: f32 = Mathf.max(0.0, Mathf.min(1.0, modulationDepth))
    const monoIn: f32 = 0.5 * (inL + inR)

    const phaseInc: f32 = TWO_PI * MOD_RATE_HZ / this.sampleRate
    const depthSamples: f32 = MOD_DEPTH_MS * this.sampleRate / 1000.0

    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      const baseDelay: f32 = this.baseLen[i] * room
      const phase: f32 = this.modPhases[i]
      const mod: f32 = Mathf.sin(phase)
      const modOffset: f32 = depthSamples * modDepth * mod
      const totalDelay: f32 = baseDelay + modOffset

      const b: Float32Array = changetype<Float32Array>(this.buf[i])
      const m: i32 = this.mask[i]
      const w: i32 = this.write[i]
      const ip: i32 = i32(totalDelay)
      const frac: f32 = totalDelay - f32(ip)
      const idx: i32 = (w - ip) & m
      const xm1: f32 = b[(idx - 1) & m]
      const x0: f32 = b[idx]
      const x1: f32 = b[(idx + 1) & m]
      const x2: f32 = b[(idx + 2) & m]
      this.tmpDelayOuts[i] = cubic(xm1, x0, x1, x2, frac)

      let p: f32 = phase + phaseInc
      if (p >= TWO_PI) p -= TWO_PI
      this.modPhases[i] = p
    }

    for (let row: i32 = 0; row < NUM_DELAYS; row++) {
      let sum: f32 = 0.0
      for (let col: i32 = 0; col < NUM_DELAYS; col++) {
        sum += HADAMARD[row * NUM_DELAYS + col] * this.tmpDelayOuts[col]
      }
      this.tmpFeedback[row] = this.processFeedback(row, sum, dec, damp)
    }

    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      this.writeDelay(i, monoIn + this.tmpFeedback[i])
    }

    this.outL = (this.tmpDelayOuts[0] + this.tmpDelayOuts[2] + this.tmpDelayOuts[4] + this.tmpDelayOuts[6]) * 0.5
    this.outR = (this.tmpDelayOuts[1] + this.tmpDelayOuts[3] + this.tmpDelayOuts[5] + this.tmpDelayOuts[7]) * 0.5
  }
}
