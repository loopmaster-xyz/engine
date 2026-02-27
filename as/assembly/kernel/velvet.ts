import { AudioBufferArena } from '../audio-vm/audio-buffer-arena'

const NUM_VELVET: i32 = 8
const DC_A: f32 = 0.995
const OUT_SCALE: f32 = 0.25

const BASE_LENS: i32[] = [2377, 2851, 3323, 3803, 2411, 2887, 3361, 3847]

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

export class VelvetKernel {
  sampleRate: f32 = 44100.0
  arena: AudioBufferArena = new AudioBufferArena()
  lastSampleRate: f32 = 0.0
  initialized: boolean = false

  buf: Array<Float32Array | null> = new Array<Float32Array | null>(NUM_VELVET)
  mask: i32[] = new Array<i32>(NUM_VELVET)
  len: i32[] = new Array<i32>(NUM_VELVET)
  write: i32[] = new Array<i32>(NUM_VELVET)
  baseLen: i32[] = new Array<i32>(NUM_VELVET)
  lp: f32[] = new Array<f32>(NUM_VELVET)
  dcX1: f32[] = new Array<f32>(NUM_VELVET)
  dcY1: f32[] = new Array<f32>(NUM_VELVET)

  outL: f32 = 0.0
  outR: f32 = 0.0

  reset(): void {
    if (!this.initialized) this.initialize()
    for (let i: i32 = 0; i < NUM_VELVET; i++) {
      this.write[i] = 0
      this.lp[i] = 0.0
      this.dcX1[i] = 0.0
      this.dcY1[i] = 0.0
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
    const scale: f32 = this.sampleRate / 44100.0
    for (let i: i32 = 0; i < NUM_VELVET; i++) {
      const base: i32 = BASE_LENS[i]
      const scaled: i32 = i32(Mathf.floor(f32(base) * scale))
      this.baseLen[i] = scaled
      this.len[i] = scaled
      this.write[i] = 0
      this.lp[i] = 0.0
      this.dcX1[i] = 0.0
      this.dcY1[i] = 0.0
      const maxLen: i32 = scaled * 2 + 4
      const cap: i32 = nextPow2(maxLen)
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

  private updateLens(roomSize: f32): void {
    const r: f32 = Mathf.max(0.1, Mathf.min(2.0, roomSize))
    for (let i: i32 = 0; i < NUM_VELVET; i++) {
      let n: i32 = i32(Mathf.floor(f32(this.baseLen[i]) * r))
      if (n < 1) n = 1
      const maxN: i32 = this.mask[i]
      if (n > maxN) n = maxN
      this.len[i] = n
    }
  }

  private tick(i: i32, input: f32, damping: f32, decay: f32): f32 {
    const b: Float32Array = changetype<Float32Array>(this.buf[i])
    const m: i32 = this.mask[i]
    const n: i32 = this.len[i]
    const w: i32 = this.write[i]
    const r: i32 = (w - n) & m
    const v: f32 = b[r]

    const x1: f32 = this.dcX1[i]
    const y1: f32 = this.dcY1[i]
    const dcOut: f32 = v - x1 + DC_A * y1
    this.dcX1[i] = v
    this.dcY1[i] = dcOut

    let lpVal: f32 = this.lp[i]
    lpVal = dcOut * (1.0 - damping) + lpVal * damping
    this.lp[i] = lpVal

    b[w] = input + lpVal * decay
    this.write[i] = (w + 1) & m
    return dcOut
  }

  process(inL: f32, inR: f32, roomSize: f32, damping: f32, decay: f32): void {
    if (!this.initialized) this.initialize()

    const room: f32 = Mathf.max(0.1, Mathf.min(2.0, roomSize))
    const damp: f32 = Mathf.max(0.0, Mathf.min(1.0, damping))
    const dec: f32 = Mathf.max(0.0, Mathf.min(1.0, decay))
    this.updateLens(room)

    let sumL: f32 = 0.0
    for (let i: i32 = 0; i < 4; i++) {
      sumL += this.tick(i, inL, damp, dec)
    }
    let sumR: f32 = 0.0
    for (let i: i32 = 4; i < NUM_VELVET; i++) {
      sumR += this.tick(i, inR, damp, dec)
    }

    this.outL = sumL * OUT_SCALE
    this.outR = sumR * OUT_SCALE
  }
}
