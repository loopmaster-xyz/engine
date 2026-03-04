export class TramKernel {
  fired: f32 = -1.0

  // Scratch fields used as "multiple return values" from skipAndCount,
  // avoiding two separate traversals of the same bytecode region.
  private _skipIndex: i32 = 0
  private _linearCount: f32 = 0.0

  reset(): void {
    this.fired = -1.0
  }

  process(
    bufferLength: i32,
    sampleCount: i32,
    sampleRate: f32,
    nyquist: f32,
    piOverNyquist: f32,
    bpm: f32,
    co: f32,
    samplesPerBeat: f32,
    samplesPerBar: f32,
    bytecodePtr: usize,
    bytecodeLength: i32,
    bars: f32,
    outputPtr: usize,
  ): void {
    if (bytecodeLength <= 0) {
      for (let i: i32 = 0; i < bufferLength; i++) {
        store<f32>(outputPtr + (i << 2), 0.0)
      }
      return
    }

    const totalSamples = samplesPerBar * bars
    const totalBeats = this.countBeats(bytecodePtr, bytecodeLength)
    if (totalBeats <= 0.0 || totalSamples <= 0.0) {
      for (let i: i32 = 0; i < bufferLength; i++) {
        store<f32>(outputPtr + (i << 2), 0.0)
      }
      return
    }
    const unit = totalSamples / totalBeats

    this.fired = -1.0

    const totalSamples64: f64 = f64(totalSamples)

    // Seed prevPos for the first sample (sampleCount - 1).
    const seed64: f64 = f64(sampleCount) - 1.0
    let prevPos64: f64 = seed64 % totalSamples64
    if (prevPos64 < 0.0) prevPos64 += totalSamples64
    let prevPos: f32 = f32(prevPos64)

    let s64: f64
    let pos64: f64
    let pos: f32
    let hit: f32

    for (let i: i32 = 0, j: i32 = 0; i < bufferLength; i += 16) {
      unroll(16, () => {
        // pos is the previous iteration's prevPos advanced by 1 — reuse it.
        s64 = f64(sampleCount) + f64(j)
        pos64 = s64 % totalSamples64
        if (pos64 < 0.0) pos64 += totalSamples64
        pos = f32(pos64)

        hit = this.evalSeq(
          bytecodePtr,
          bytecodeLength,
          0,
          totalBeats,
          0.0,
          unit,
          pos,
          prevPos,
          0.0,
        )

        store<f32>(outputPtr + (j << 2), hit)

        // Carry pos forward — next iteration's prevPos is this pos.
        prevPos = pos
        j++
      })
    }
  }

  private evalSeq(
    ptr: usize,
    len: i32,
    index: i32,
    beats: f32,
    start: f32,
    unit: f32,
    pos: f32,
    prevPos: f32,
    linearBase: f32,
  ): f32 {
    let i = index
    let beat: f32 = 0.0
    let linear = linearBase

    while (i < len && beat < beats) {
      const op = load<f32>(ptr + (i << 2))
      const bStart = start + beat * unit

      if (op === 2.0 || op === 1.0 || op === 0.5 || op === 0.0) {
        // Boundary-crossing check (handles wrap-around).
        if (prevPos < bStart ? pos >= bStart : prevPos > pos && pos >= bStart) {
          if (this.fired < 0.0) this.fired = linear
          return op
        }
        beat += 1.0
        linear += 1.0
        i++
      }
      else if (op === -1.0) {
        i++
        const subCount = load<f32>(ptr + (i << 2))
        i++

        const subUnit = unit / subCount
        const hit = this.evalSeq(
          ptr,
          len,
          i,
          subCount,
          bStart,
          subUnit,
          pos,
          prevPos,
          linear,
        )

        // Single combined traversal replaces separate skip() + countLinear().
        this.skipAndCount(ptr, len, i, subCount)
        const subLinear = this._linearCount
        i = this._skipIndex

        if (hit !== 0.0) return hit

        linear += subLinear
        beat += 1.0
      }
      else {
        i++
      }
    }

    return 0.0
  }

  /**
   * Combined skip + countLinear in a single pass.
   * Results written to this._skipIndex and this._linearCount.
   */
  private skipAndCount(ptr: usize, len: i32, index: i32, beats: f32): void {
    let i = index
    let b: f32 = 0.0
    let c: f32 = 0.0

    while (i < len && b < beats) {
      const op = load<f32>(ptr + (i << 2))
      if (op === 2.0 || op === 1.0 || op === 0.5 || op === 0.0) {
        c += 1.0
        b += 1.0
        i++
      }
      else if (op === -1.0) {
        i++
        const sub = load<f32>(ptr + (i << 2))
        i++
        this.skipAndCount(ptr, len, i, sub)
        c += this._linearCount
        i = this._skipIndex
        b += 1.0
      }
      else {
        i++
      }
    }

    this._skipIndex = i
    this._linearCount = c
  }

  // @inline
  private countBeats(ptr: usize, len: i32): f32 {
    let i: i32 = 0
    let b: f32 = 0.0

    while (i < len) {
      const op = load<f32>(ptr + (i << 2))
      if (op === 2.0 || op === 1.0 || op === 0.5 || op === 0.0) {
        b += 1.0
        i++
      }
      else if (op === -1.0) {
        b += 1.0
        i++
        const c = load<f32>(ptr + (i << 2))
        i++
        // Reuse skipAndCount — we only need the skip index here.
        this.skipAndCount(ptr, len, i, c)
        i = this._skipIndex
      }
      else {
        i++
      }
    }

    return b
  }
}
