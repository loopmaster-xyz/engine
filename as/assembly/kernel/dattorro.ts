import { AudioBufferArena } from '../audio-vm/audio-buffer-arena'
import { cubic } from '../util'

const NUM_DELAYS: i32 = 12
const NUM_TAPS: i32 = 14
const WET_GAIN: f32 = 0.18
const EXC_2PI_1: f64 = 6.28
const EXC_2PI_2: f64 = 6.2847

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

export class DattorroKernel {
  static delaySecs: f64[] = [
    0.004771345,
    0.003595309,
    0.012734787,
    0.009307483,
    0.022579886,
    0.149625349,
    0.060481839,
    0.1249958,
    0.030509727,
    0.141695508,
    0.089244313,
    0.106280031,
  ]
  static tapSecs: f64[] = [
    0.008937872,
    0.099929438,
    0.064278754,
    0.067067639,
    0.066866033,
    0.006283391,
    0.035818689,
    0.011861161,
    0.121870905,
    0.041262054,
    0.08981553,
    0.070931756,
    0.011256342,
    0.004065724,
  ]

  sampleRate: f32 = 44100.0
  arena: AudioBufferArena = new AudioBufferArena()
  lastSampleRate: f32 = 0.0
  initialized: boolean = false

  preDelay: Float32Array = new Float32Array(0)
  preDelayLength: i32 = 0
  preDelayWrite: i32 = 0

  dBufs: Array<Float32Array | null> = new Array<Float32Array | null>(NUM_DELAYS)
  dMask: i32[] = new Array<i32>(NUM_DELAYS)
  dLen: i32[] = new Array<i32>(NUM_DELAYS)
  dWrite: i32[] = new Array<i32>(NUM_DELAYS)
  dRead: i32[] = new Array<i32>(NUM_DELAYS)
  taps: i32[] = new Array<i32>(NUM_TAPS)

  lp1: f32 = 0.0
  lp2: f32 = 0.0
  lp3: f32 = 0.0
  excPhase: f64 = 0.0

  outL: f32 = 0.0
  outR: f32 = 0.0

  reset(): void {
    if (!this.initialized) this.initialize()
    this.preDelayWrite = 0
    this.lp1 = 0.0
    this.lp2 = 0.0
    this.lp3 = 0.0
    this.excPhase = 0.0
    this.preDelay.fill(0.0)
    for (let d: i32 = 0; d < NUM_DELAYS; d++) {
      const m: i32 = this.dMask[d]
      const len: i32 = this.dLen[d]
      this.dWrite[d] = (len - 1) & m
      this.dRead[d] = 0
      const b: Float32Array = changetype<Float32Array>(this.dBufs[d])
      b.fill(0.0)
    }
  }

  setSampleRate(sr: f32): void {
    if (this.sampleRate === sr && this.initialized) return
    this.sampleRate = sr
    this.lastSampleRate = sr
    this.initialize()
  }

  private initialize(): void {
    const sr: f64 = f64(this.sampleRate)
    const srI: i32 = i32(this.sampleRate)

    let pLen: i32 = srI
    const rem: i32 = pLen % 128
    if (rem !== 0) pLen += 128 - rem
    this.preDelayLength = pLen
    if (this.preDelay && this.preDelay.length > 0) this.arena.release(this.preDelay)
    this.preDelay = this.arena.get(pLen)
    this.preDelay.fill(0.0)
    this.preDelayWrite = 0

    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      const baseSec: f64 = DattorroKernel.delaySecs[i]
      let len: i32 = i32(Math.round(baseSec * sr))
      if (len < 1) len = 1
      const cap: i32 = nextPow2(len)
      const mask: i32 = cap - 1
      const existing: Float32Array | null = this.dBufs[i]
      if (existing && existing.length > 0) this.arena.release(existing)
      const buf: Float32Array = this.arena.get(cap)
      this.dBufs[i] = buf
      buf.fill(0.0)
      this.dMask[i] = mask
      this.dLen[i] = len
      this.dWrite[i] = (len - 1) & mask
      this.dRead[i] = 0
    }

    for (let i: i32 = 0; i < NUM_TAPS; i++) {
      this.taps[i] = i32(Math.round(DattorroKernel.tapSecs[i] * sr))
    }

    this.initialized = true
  }

  private writeDelay(i: i32, v: f32): void {
    const w: i32 = this.dWrite[i]
    changetype<Float32Array>(this.dBufs[i])[w] = v
  }

  private readDelay(i: i32): f32 {
    return changetype<Float32Array>(this.dBufs[i])[this.dRead[i]]
  }

  private readDelayAt(i: i32, off: i32): f32 {
    const r: i32 = this.dRead[i]
    const m: i32 = this.dMask[i]
    return changetype<Float32Array>(this.dBufs[i])[(r + off) & m]
  }

  private readDelayCAt(i: i32, off: f32): f32 {
    const ip: i32 = i32(off)
    const frac: f32 = off - f32(ip)
    let idx: i32 = ip + this.dRead[i] - 1
    const m: i32 = this.dMask[i]
    const b: Float32Array = changetype<Float32Array>(this.dBufs[i])
    const xm1: f32 = b[idx & m]
    idx++
    const x0: f32 = b[idx & m]
    idx++
    const x1: f32 = b[idx & m]
    idx++
    const x2: f32 = b[idx & m]
    return cubic(xm1, x0, x1, x2, frac)
  }

  private advanceDelays(): void {
    for (let i: i32 = 0; i < NUM_DELAYS; i++) {
      const m: i32 = this.dMask[i]
      this.dWrite[i] = (this.dWrite[i] + 1) & m
      this.dRead[i] = (this.dRead[i] + 1) & m
    }
  }

  process(
    inL: f32,
    inR: f32,
    roomSize: f32,
    damping: f32,
    bandwidth: f32,
    inputDiffusion1: f32,
    inputDiffusion2: f32,
    decayDiffusion1: f32,
    decayDiffusion2: f32,
    excursionRate: f32,
    excursionDepth: f32,
    preDelayNorm: f32,
  ): void {
    if (!this.initialized) this.initialize()

    const input: f32 = (inL + inR) * 0.5
    const pd: i32 = i32(Mathf.round(Mathf.max(0.0, Mathf.min(1.0, preDelayNorm)) * f32(this.preDelayLength - 1)))
    this.preDelay[this.preDelayWrite] = input
    const preIdx: i32 = (this.preDelayLength + this.preDelayWrite - pd) % this.preDelayLength
    const preIn: f32 = this.preDelay[preIdx]
    this.preDelayWrite = (this.preDelayWrite + 1) % this.preDelayLength

    const bw: f32 = Mathf.max(0.0, Mathf.min(1.0, bandwidth))
    this.lp1 = this.lp1 + bw * (preIn - this.lp1)

    const fi: f32 = Mathf.max(0.0, Mathf.min(1.0, inputDiffusion1))
    const si: f32 = Mathf.max(0.0, Mathf.min(1.0, inputDiffusion2))

    let pre: f32 = 0.0
    pre = this.lp1 - fi * this.readDelay(0)
    this.writeDelay(0, pre)
    pre = fi * (pre - this.readDelay(1)) + this.readDelay(0)
    this.writeDelay(1, pre)
    pre = fi * pre + this.readDelay(1) - si * this.readDelay(2)
    this.writeDelay(2, pre)
    pre = si * (pre - this.readDelay(3)) + this.readDelay(2)
    this.writeDelay(3, pre)
    const split: f32 = si * pre + this.readDelay(3)

    const room: f32 = Mathf.max(0.0, Mathf.min(1.0, roomSize))
    const phaseStep: f64 = (f64(Mathf.max(0.0, Mathf.min(1.0, excursionRate))) * 2.0) / f64(this.sampleRate)
    const depth: f64 = f64(Mathf.max(0.0, Mathf.min(1.0, excursionDepth))) * 2.0 * f64(this.sampleRate) / 1000.0
    this.excPhase += phaseStep
    const exc: f32 = f32(depth * (1.0 + Math.cos(this.excPhase * EXC_2PI_1)))
    const exc2: f32 = f32(depth * (1.0 + Math.sin(this.excPhase * EXC_2PI_2)))

    const ft: f32 = Mathf.max(0.0, Mathf.min(1.0, decayDiffusion1))
    const st: f32 = Mathf.max(0.0, Mathf.min(1.0, decayDiffusion2))
    const dp: f32 = 1.0 - Mathf.max(0.0, Mathf.min(1.0, damping))

    let temp: f32 = 0.0
    temp = split + room * this.readDelay(11) + ft * this.readDelayCAt(4, exc)
    this.writeDelay(4, temp)
    this.writeDelay(5, this.readDelayCAt(4, exc) - ft * temp)
    this.lp2 = this.lp2 + dp * (this.readDelay(5) - this.lp2)
    temp = room * this.lp2 - st * this.readDelay(6)
    this.writeDelay(6, temp)
    this.writeDelay(7, this.readDelay(6) + st * temp)

    temp = split + room * this.readDelay(7) + ft * this.readDelayCAt(8, exc2)
    this.writeDelay(8, temp)
    this.writeDelay(9, this.readDelayCAt(8, exc2) - ft * temp)
    this.lp3 = this.lp3 + dp * (this.readDelay(9) - this.lp3)
    temp = room * this.lp3 - st * this.readDelay(10)
    this.writeDelay(10, temp)
    this.writeDelay(11, this.readDelay(10) + st * temp)

    let lo: f32 = this.readDelayAt(9, this.taps[0])
      + this.readDelayAt(9, this.taps[1])
      - this.readDelayAt(10, this.taps[2])
      + this.readDelayAt(11, this.taps[3])
      - this.readDelayAt(5, this.taps[4])
      - this.readDelayAt(6, this.taps[5])
      - this.readDelayAt(7, this.taps[6])
    let ro: f32 = this.readDelayAt(5, this.taps[7])
      + this.readDelayAt(5, this.taps[8])
      - this.readDelayAt(6, this.taps[9])
      + this.readDelayAt(7, this.taps[10])
      - this.readDelayAt(9, this.taps[11])
      - this.readDelayAt(10, this.taps[12])
      - this.readDelayAt(11, this.taps[13])

    this.advanceDelays()

    this.outL = lo * WET_GAIN
    this.outR = ro * WET_GAIN
  }
}
