import { AudioBufferArena } from '../audio-vm/audio-buffer-arena'

// Comb: read tap y, lowpass state fs = y*damping2 + fs*damping1, write x + fs*roomSize, return y (lm2)
class CombFilter {
  buffer: Float32Array
  readPos: i32 = 0
  writePos: i32 = 0
  delayLength: i32
  lowpassState: f32 = 0.0

  constructor(buffer: Float32Array, delayLength: i32) {
    this.buffer = buffer
    this.delayLength = delayLength
  }

  process(x: f32, roomSize: f32, damping1: f32, damping2: f32): f32 {
    const y: f32 = this.buffer[this.readPos]
    this.lowpassState = y * damping2 + this.lowpassState * damping1
    this.buffer[this.writePos] = x + this.lowpassState * roomSize
    this.readPos = (this.readPos + 1) % this.delayLength
    this.writePos = (this.writePos + 1) % this.delayLength
    return y
  }
}

// Allpass: store x + bufOut*feedback, output = bufOut - x (lm2)
class AllpassFilter {
  buffer: Float32Array
  readPos: i32 = 0
  writePos: i32 = 0
  delayLength: i32
  feedback: f32 = 0.5

  constructor(buffer: Float32Array, delayLength: i32) {
    this.buffer = buffer
    this.delayLength = delayLength
  }

  process(x: f32): f32 {
    const bufOut: f32 = this.buffer[this.readPos]
    this.buffer[this.writePos] = x + bufOut * this.feedback
    this.readPos = (this.readPos + 1) % this.delayLength
    this.writePos = (this.writePos + 1) % this.delayLength
    return bufOut - x
  }
}

function scaledDelaySamples(baseMs: f32, sr: f32): i32 {
  let n: i32 = i32(Mathf.round(baseMs * sr / 1000.0))
  if (n < 1) n = 1
  return n
}

export class FreeverbKernel {
  static combDelaysMs: f32[] = [1116.0, 1188.0, 1277.0, 1356.0, 1422.0, 1491.0, 1557.0, 1617.0]
  static allpassDelaysMs: f32[] = [556.0, 441.0, 341.0, 225.0]

  sampleRate: f32 = 44100.0
  arena: AudioBufferArena = new AudioBufferArena()
  initialized: boolean = false

  combs: CombFilter[] = []
  allpasses: AllpassFilter[] = []

  constructor(private stereoSpread: f32 = 0.0) {}

  reset(): void {}

  setSampleRate(sampleRate: f32): void {
    if (this.sampleRate === sampleRate && this.initialized) {
      return
    }
    this.sampleRate = sampleRate
    this.initialize()
  }

  private initialize(): void {
    for (let i: i32 = 0; i < FreeverbKernel.combDelaysMs.length; i++) {
      const baseMs: f32 = FreeverbKernel.combDelaysMs[i] + this.stereoSpread
      const delaySamples: i32 = scaledDelaySamples(baseMs, this.sampleRate)
      if (i < this.combs.length) {
        this.arena.release(this.combs[i].buffer)
        const buffer: Float32Array = this.arena.get(delaySamples)
        for (let j: i32 = 0; j < buffer.length; j++) {
          buffer[j] = 0.0
        }
        this.combs[i].buffer = buffer
        this.combs[i].delayLength = delaySamples
        this.combs[i].readPos = 0
        this.combs[i].writePos = 0
        this.combs[i].lowpassState = 0.0
      }
      else {
        const buffer: Float32Array = this.arena.get(delaySamples)
        for (let j: i32 = 0; j < buffer.length; j++) {
          buffer[j] = 0.0
        }
        this.combs.push(new CombFilter(buffer, delaySamples))
      }
    }

    for (let i: i32 = 0; i < FreeverbKernel.allpassDelaysMs.length; i++) {
      const baseMs: f32 = FreeverbKernel.allpassDelaysMs[i] + this.stereoSpread
      const delaySamples: i32 = scaledDelaySamples(baseMs, this.sampleRate)
      if (i < this.allpasses.length) {
        this.arena.release(this.allpasses[i].buffer)
        const buffer: Float32Array = this.arena.get(delaySamples)
        for (let j: i32 = 0; j < buffer.length; j++) {
          buffer[j] = 0.0
        }
        this.allpasses[i].buffer = buffer
        this.allpasses[i].delayLength = delaySamples
        this.allpasses[i].readPos = 0
        this.allpasses[i].writePos = 0
      }
      else {
        const buffer: Float32Array = this.arena.get(delaySamples)
        for (let j: i32 = 0; j < buffer.length; j++) {
          buffer[j] = 0.0
        }
        this.allpasses.push(new AllpassFilter(buffer, delaySamples))
      }
    }

    this.initialized = true
  }
}

export class FreeverbKernelStereo {
  left: FreeverbKernel = new FreeverbKernel(0.0)
  right: FreeverbKernel = new FreeverbKernel(23.0)
  reset(): void {
    this.left.reset()
    this.right.reset()
  }
}
