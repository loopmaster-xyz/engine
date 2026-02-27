export class TramKernel {
  fired: f32 = -1.0

  reset(): void {
    this.fired = -1.0
  }

  // @inline
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
    for (let i: i32 = 0; i < bufferLength; i++) {
      const s64: f64 = f64(sampleCount) + f64(i)
      let pos64: f64 = s64 % totalSamples64
      if (pos64 < 0.0) pos64 += totalSamples64
      const pos: f32 = f32(pos64)

      const prev64: f64 = s64 - 1.0
      let prevPos64: f64 = prev64 % totalSamples64
      if (prevPos64 < 0.0) prevPos64 += totalSamples64
      const prevPos: f32 = f32(prevPos64)

      const hit = this.evalSeq(
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

      store<f32>(outputPtr + (i << 2), hit)
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
        const crossed = (prevPos < bStart && pos >= bStart)
          || (prevPos > pos && (pos >= bStart || prevPos < bStart))

        if (crossed) {
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

        const subLinear = this.countLinear(ptr, len, i, subCount)
        const end = this.skip(ptr, len, i, subCount)

        if (hit !== 0.0) return hit

        linear += subLinear
        i = end
        beat += 1.0
      }
      else {
        i++
      }
    }

    return 0.0
  }

  private skip(ptr: usize, len: i32, index: i32, beats: f32): i32 {
    let i = index
    let b: f32 = 0.0

    while (i < len && b < beats) {
      const op = load<f32>(ptr + (i << 2))
      if (op === 2.0 || op === 1.0 || op === 0.5 || op === 0.0) {
        b += 1.0
        i++
      }
      else if (op === -1.0) {
        i++
        const c = load<f32>(ptr + (i << 2))
        i++
        i = this.skip(ptr, len, i, c)
        b += 1.0
      }
      else {
        i++
      }
    }

    return i
  }

  private countLinear(ptr: usize, len: i32, index: i32, beats: f32): f32 {
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
        c += this.countLinear(ptr, len, i, sub)
        i = this.skip(ptr, len, i, sub)
        b += 1.0
      }
      else {
        i++
      }
    }

    return c
  }

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
        i = this.skip(ptr, len, i, c)
      }
      else {
        i++
      }
    }

    return b
  }
}
