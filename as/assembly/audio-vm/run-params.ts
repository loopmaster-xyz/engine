/** Run parameters (buffer length, sample rate, etc.). */
export class RunParams {
  static instance: RunParams = new RunParams(0, 0, 0, 0, 0, 0)

  bufferLength: i32
  sampleRate: f32
  sampleCount: i32
  nyquist: f32
  piOverNyquist: f32
  opsLength: i32
  outTop: i32
  hadSolo: bool
  hadStereo: bool

  constructor(
    bufferLength: i32,
    sampleRate: f32,
    sampleCount: i32,
    nyquist: f32,
    piOverNyquist: f32,
    opsLength: i32,
  ) {
    this.bufferLength = bufferLength
    this.sampleRate = sampleRate
    this.sampleCount = sampleCount
    this.nyquist = nyquist
    this.piOverNyquist = piOverNyquist
    this.opsLength = opsLength
    this.outTop = 0
    this.hadSolo = false
    this.hadStereo = false
  }
}

export class RunResult {
  static instance: RunResult = new RunResult(0, 0, 0)

  pc: i32
  opsPtr: usize
  opsLength: i32
  continueLoop: bool

  constructor(pc: i32, opsPtr: usize, opsLength: i32, continueLoop: bool = false) {
    this.pc = pc
    this.opsPtr = opsPtr
    this.opsLength = opsLength
    this.continueLoop = continueLoop
  }

  // @inline
  static normal(pc: i32, opsPtr: usize, opsLength: i32): RunResult {
    const instance = RunResult.instance
    instance.pc = pc
    instance.opsPtr = opsPtr
    instance.opsLength = opsLength
    instance.continueLoop = false
    return instance
  }

  // @inline
  static continue(pc: i32, opsPtr: usize, opsLength: i32): RunResult {
    const instance = RunResult.instance
    instance.pc = pc
    instance.opsPtr = opsPtr
    instance.opsLength = opsLength
    instance.continueLoop = true
    return instance
  }
}
