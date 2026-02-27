// SampleRecord - handles recording audio from a callback into a sample buffer

import {
  getAudioVmInfoAt,
  resetAudioVmAt,
  runAudioVmAt,
  setAudioVmGlobalAt,
  setAudioVmGlobalsSize,
  setAudioVmGlobalUndefined,
  setAudioVmPreserveFunctionState,
} from '../'

// Reserved VM ID for sample recording
const RECORD_VM_ID: i32 = 1

class SampleRecord {
  setupBytecode: Float32Array = new Float32Array(0)
  loopBytecode: Float32Array = new Float32Array(0)
  output: Float32Array = new Float32Array(0)
  numSamples: i32 = 0
  sampleRate: f32 = 48000.0
  isSetup: bool = false
  samplesRecorded: i32 = 0

  reset(): void {
    resetAudioVmAt(RECORD_VM_ID)
    this.setupBytecode = new Float32Array(0)
    this.loopBytecode = new Float32Array(0)
    this.output = new Float32Array(0)
    this.numSamples = 0
    this.sampleRate = 48000.0
    this.isSetup = false
    this.samplesRecorded = 0
  }

  // Initialize recording with bytecode and parameters
  init(
    setupPtr: usize,
    setupLength: i32,
    loopPtr: usize,
    loopLength: i32,
    numSamples: i32,
    sampleRate: f32,
  ): void {
    this.numSamples = numSamples
    this.sampleRate = sampleRate
    this.isSetup = false
    this.samplesRecorded = 0

    // Copy setup bytecode
    this.setupBytecode = new Float32Array(setupLength)
    for (let i: i32 = 0; i < setupLength; i++) {
      this.setupBytecode[i] = load<f32>(setupPtr + i * 4)
    }

    // Copy loop bytecode
    this.loopBytecode = new Float32Array(loopLength)
    for (let i: i32 = 0; i < loopLength; i++) {
      this.loopBytecode[i] = load<f32>(loopPtr + i * 4)
    }

    // Allocate output buffer
    this.output = new Float32Array(numSamples)

    // Reset the recording VM
    resetAudioVmAt(RECORD_VM_ID)
  }

  // Run the setup bytecode once (defines functions and stores them in globals)
  runSetup(): void {
    if (this.isSetup || this.setupBytecode.length == 0) return

    setAudioVmPreserveFunctionState(RECORD_VM_ID, true)
    const nyquist: f32 = this.sampleRate / 2.0
    const piOverNyquist: f32 = f32(Math.PI) / nyquist
    const bpm: f32 = 120.0

    // Run setup with just 1 sample to initialize function definitions
    runAudioVmAt(
      RECORD_VM_ID,
      this.setupBytecode.dataStart,
      this.setupBytecode.length,
      1,
      0,
      this.sampleRate,
      nyquist,
      piOverNyquist,
      bpm,
    )

    this.isSetup = true
  }

  // Record a chunk of samples, returns number of samples recorded in this chunk
  recordChunk(chunkSize: i32): i32 {
    if (!this.isSetup) {
      this.runSetup()
    }

    if (this.samplesRecorded >= this.numSamples) {
      return 0
    }

    const remaining: i32 = this.numSamples - this.samplesRecorded
    let toRecord: i32 = remaining < chunkSize ? remaining : chunkSize
    // Round up to nearest multiple of 64 for the request
    const framesToRequest: i32 = toRecord > 0 ? ((toRecord + 63) / 64) * 64 : 0
    // Number of frames we actually need to copy (crop to what we need)
    const framesToCopy: i32 = remaining < framesToRequest ? remaining : framesToRequest

    if (framesToRequest == 0) {
      return 0
    }

    const nyquist: f32 = this.sampleRate / 2.0
    const piOverNyquist: f32 = f32(Math.PI) / nyquist
    const bpm: f32 = 120.0

    // Run the loop bytecode for this chunk - always request frames divisible by 64
    setAudioVmPreserveFunctionState(RECORD_VM_ID, true)
    runAudioVmAt(
      RECORD_VM_ID,
      this.loopBytecode.dataStart,
      this.loopBytecode.length,
      framesToRequest,
      this.samplesRecorded,
      this.sampleRate,
      nyquist,
      piOverNyquist,
      bpm,
    )
    setAudioVmPreserveFunctionState(RECORD_VM_ID, false)

    // Get the output from the VM (info[8]=outputLeftPtr, info[9]=outputRightPtr; buffer length is framesToRequest we passed to runAudioVmAt)
    const infoPtr: usize = getAudioVmInfoAt(RECORD_VM_ID)
    const outputLeftPtr: usize = load<u32>(infoPtr + 8 * 4) // info[8]

    let advanced: i32 = framesToCopy
    if (outputLeftPtr != 0 && framesToRequest > 0) {
      const outputLen: i32 = this.output.length
      const maxDest: i32 = outputLen - this.samplesRecorded
      if (maxDest <= 0) {
        advanced = 0
      }
      else {
        const copyLimit: i32 = this.numSamples - this.samplesRecorded
        const readLimit: i32 = framesToRequest < framesToCopy ? framesToRequest : framesToCopy
        const toCopy: i32 = readLimit < copyLimit ? readLimit : copyLimit
        const toWrite: i32 = toCopy < maxDest ? toCopy : maxDest
        for (let i: i32 = 0; i < toWrite; i++) {
          const destIdx: i32 = this.samplesRecorded + i
          if (destIdx >= 0 && destIdx < outputLen) {
            this.output[destIdx] = load<f32>(outputLeftPtr + i * 4)
          }
        }
        advanced = toWrite
      }
    }

    this.samplesRecorded += advanced
    return advanced
  }

  // Record all samples at once (convenience method)
  recordAll(): void {
    const chunkSize: i32 = 128
    while (this.samplesRecorded < this.numSamples) {
      this.recordChunk(chunkSize)
    }
    // Clean up the recording VM after completion
    resetAudioVmAt(RECORD_VM_ID)
  }

  // Get pointer to output data
  getOutputPtr(): usize {
    return this.output.dataStart
  }

  // Get number of samples recorded so far
  getSamplesRecorded(): i32 {
    return this.samplesRecorded
  }

  // Check if recording is complete
  isComplete(): bool {
    return this.samplesRecorded >= this.numSamples
  }
}

// Global instance for sample recording
const sampleRecorder: SampleRecord = new SampleRecord()

// Export functions for use from JS

export function initSampleRecord(
  setupPtr: usize,
  setupLength: i32,
  loopPtr: usize,
  loopLength: i32,
  numSamples: i32,
  sampleRate: f32,
): void {
  sampleRecorder.init(setupPtr, setupLength, loopPtr, loopLength, numSamples, sampleRate)
}

export function runSampleRecordSetup(): void {
  sampleRecorder.runSetup()
}

export function recordSampleChunk(chunkSize: i32): i32 {
  return sampleRecorder.recordChunk(chunkSize)
}

export function recordSampleAll(): void {
  sampleRecorder.recordAll()
}

export function getSampleRecordOutputPtr(): usize {
  return sampleRecorder.getOutputPtr()
}

export function getSampleRecordSamplesRecorded(): i32 {
  return sampleRecorder.getSamplesRecorded()
}

export function isSampleRecordComplete(): bool {
  return sampleRecorder.isComplete()
}

export function resetSampleRecord(): void {
  sampleRecorder.reset()
}

// Grow record VM globals to at least size (new slots undefined).
export function ensureSampleRecordGlobalsSize(size: i32): void {
  setAudioVmGlobalsSize(RECORD_VM_ID, size)
}

// Set a captured scalar global for the recording VM
// Called before running setup to initialize captured variables from outer scope
export function setSampleRecordGlobal(index: i32, value: f32): void {
  setAudioVmGlobalAt(RECORD_VM_ID, index, value)
}

// Set a record global to undefined (for captured undefined values)
export function setSampleRecordGlobalUndefined(index: i32): void {
  setAudioVmGlobalUndefined(RECORD_VM_ID, index)
}
