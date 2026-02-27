// dprint-ignore-file

// External host functions for sample access
// @ts-ignore
@external("sample", "readSampleChunk")
declare function readSampleChunk(sampleHandle: i32, channel: i32, startSample: i32, length: i32, destPtr: usize): void

// @ts-ignore
@external("sample", "getSampleLength")
declare function getSampleLength(sampleHandle: i32, channel: i32): i32

// @ts-ignore
@external("sample", "getSampleChannelCount")
declare function getSampleChannelCount(sampleHandle: i32): i32

// @ts-ignore
@external("sample", "getSliceCount")
declare function getSliceCount(sampleHandle: i32, threshold: f32): i32

// @ts-ignore
@external("sample", "getSlicePoint")
declare function getSlicePoint(sampleHandle: i32, threshold: f32, index: i32): i32

// @ts-ignore
@external("sample", "getSampleVersion")
declare function getSampleVersion(sampleHandle: i32): i32

const CHUNK_SIZE = 8192
const MAX_SLICES = 4096

export class SamplerKernel {
  position: f32 = 0.0
  playing: bool = false
  prevTrig: f32 = -1.0
  sampleLength: i32 = 0
  channelCount: i32 = 0
  currentSampleHandle: i32 = -1
  batchBuffer: Float32Array = new Float32Array(CHUNK_SIZE)
  cachedChunkStart: i32 = -1
  cachedChunkChannel: i32 = -1
  cachedChunkHandle: i32 = -1
  cachedChunkVersion: i32 = -1

  reset(): void {
    this.position = 0.0
    this.playing = false
    this.prevTrig = -1.0
    this.sampleLength = 0
    this.channelCount = 0
    this.currentSampleHandle = -1
    this.cachedChunkStart = -1
    this.cachedChunkChannel = -1
    this.cachedChunkHandle = -1
    this.cachedChunkVersion = -1
  }

  // @inline
  readSample(sampleHandle: f32, channel: f32, position: f32): f32 {
    const handle = i32(sampleHandle)
    const ch = i32(channel)
    const pos = i32(position)
    if (pos < 0 || pos >= this.sampleLength) {
      return 0.0
    }

    // Use chunk caching: read 128 samples at a time
    const chunkSize: i32 = CHUNK_SIZE
    const chunkStart: i32 = (pos / chunkSize) * chunkSize
    const offsetInChunk: i32 = pos - chunkStart

    const version = getSampleVersion(handle)
    if (this.cachedChunkStart != chunkStart || this.cachedChunkChannel != ch || this.cachedChunkHandle != handle || this.cachedChunkVersion != version) {
      this.cachedChunkStart = chunkStart
      this.cachedChunkChannel = ch
      this.cachedChunkHandle = handle
      this.cachedChunkVersion = version
      const readLength = min(chunkSize, this.sampleLength - chunkStart)
      if (readLength > 0) {
        readSampleChunk(handle, ch, chunkStart, readLength, this.batchBuffer.dataStart)
        // Zero-fill the rest of the buffer if we read less than chunkSize
        if (readLength < chunkSize) {
          for (let i = readLength; i < chunkSize; i++) {
            this.batchBuffer[i] = 0.0
          }
        }
      } else {
        // If readLength is 0 or negative, zero-fill the entire buffer
        for (let i = 0; i < chunkSize; i++) {
          this.batchBuffer[i] = 0.0
        }
      }
    }

    // Check bounds before accessing buffer
    if (offsetInChunk >= 0 && offsetInChunk < chunkSize) {
      const maxValidOffset = this.sampleLength - chunkStart
      if (offsetInChunk < maxValidOffset) {
        return this.batchBuffer[offsetInChunk]
      }
    }
    return 0.0
  }

  // @inline
  readSampleBatch(sampleHandle: f32, channel: f32, startPos: f32, length: i32, destPtr: usize): void {
    const handle = i32(sampleHandle)
    const ch = i32(channel)
    const start = i32(startPos)
    // readSampleChunk handles bounds checking and zero-filling
    readSampleChunk(handle, ch, start, length, destPtr)
  }

  // @inline
  updateSampleInfo(sampleHandle: f32): void {
    const handle = i32(sampleHandle)
    const version = getSampleVersion(handle)
    const needsRefresh = handle != this.currentSampleHandle || this.sampleLength == 0 || this.cachedChunkVersion != version
    if (needsRefresh) {
      const newLength = getSampleLength(handle, 0)
      const newChannelCount = getSampleChannelCount(handle)
      if (newLength != this.sampleLength || newChannelCount != this.channelCount || this.cachedChunkVersion != version) {
        this.sampleLength = newLength
        this.channelCount = newChannelCount
        this.cachedChunkStart = -1
        this.cachedChunkChannel = -1
        this.cachedChunkHandle = -1
        this.cachedChunkVersion = -1
      }
      this.currentSampleHandle = handle
    }
  }

  // @inline
  handleTrigger(trig: f32, speed: f32, offset: f32): void {
    const shouldTrigger = trig > 0.0 && this.prevTrig <= 0.0
    if (shouldTrigger) {
      if (speed < 0.0 && offset == 0.0) {
        this.position = f32(this.sampleLength - 1)
      } else {
        this.position = offset * f32(this.sampleLength)
      }
      this.playing = true
    }
    this.prevTrig = trig
  }

  // @inline
  advancePosition(speed: f32, repeat: f32): void {
    this.position += speed

    if (speed >= 0.0) {
      if (this.position >= f32(this.sampleLength)) {
        if (repeat > 0.0) {
          this.position = this.position % f32(this.sampleLength)
        } else {
          this.playing = false
        }
      }
    } else {
      if (this.position < 0.0) {
        if (repeat > 0.0) {
          this.position = f32(this.sampleLength) + (this.position % f32(this.sampleLength))
        } else {
          this.playing = false
        }
      }
    }
  }
}

export class SamplerKernelStereo {
  left: SamplerKernel = new SamplerKernel()
  right: SamplerKernel = new SamplerKernel()
  reset(): void {
    this.left.reset()
    this.right.reset()
  }
}

export class SlicerKernel {
  position: f32 = 0.0
  playing: bool = false
  prevTrig: f32 = -1.0
  sliceStart: i32 = 0
  sliceEnd: i32 = 0
  sliceLength: i32 = 0
  playSliceStart: i32 = 0
  playSliceEnd: i32 = 0
  playSliceLength: i32 = 0
  sampleLength: i32 = 0
  channelCount: i32 = 0
  currentSampleHandle: i32 = -1
  currentThreshold: f32 = -1.0
  sliceCount: i32 = 0
  sliceStarts: Int32Array = new Int32Array(MAX_SLICES)
  sliceEnds: Int32Array = new Int32Array(MAX_SLICES)
  batchBuffer: Float32Array = new Float32Array(CHUNK_SIZE)
  cachedChunkStart: i32 = -1
  cachedChunkChannel: i32 = -1
  cachedChunkHandle: i32 = -1
  cachedChunkVersion: i32 = -1

  reset(): void {
    this.position = 0.0
    this.playing = false
    this.prevTrig = -1.0
    this.sliceStart = 0
    this.sliceEnd = 0
    this.sliceLength = 0
    this.playSliceStart = 0
    this.playSliceEnd = 0
    this.playSliceLength = 0
    this.sampleLength = 0
    this.channelCount = 0
    this.currentSampleHandle = -1
    this.currentThreshold = -1.0
    this.sliceCount = 0
    this.cachedChunkStart = -1
    this.cachedChunkChannel = -1
    this.cachedChunkHandle = -1
    this.cachedChunkVersion = -1
  }

  // Recalculates slice boundaries only when sample or threshold change (both scalar).
  // @inline
  updateSliceInfo(sampleHandle: f32, threshold: f32): void {
    const handle = i32(sampleHandle)
    if (handle == this.currentSampleHandle && threshold == this.currentThreshold && this.sampleLength > 0) {
      return
    }
    this.currentSampleHandle = handle
    this.currentThreshold = threshold
    this.sampleLength = getSampleLength(handle, 0)
    this.channelCount = getSampleChannelCount(handle)
    this.cachedChunkStart = -1
    this.cachedChunkChannel = -1
    this.cachedChunkHandle = -1
    this.cachedChunkVersion = -1

    // Host points are the START of each slice (each transient); slice i = [points[i], points[i+1]) or [points[i], sampleLength].
    const slicePointCount = getSliceCount(handle, threshold)
    const n = min(slicePointCount, MAX_SLICES)
    this.sliceCount = n

    for (let i = 0; i < n; i++) {
      this.sliceStarts[i] = getSlicePoint(handle, threshold, i)
      if (i < n - 1) {
        this.sliceEnds[i] = getSlicePoint(handle, threshold, i + 1)
      } else {
        this.sliceEnds[i] = this.sampleLength
      }
    }
  }

  // Direct read: set sliceStart/sliceEnd/sliceLength from normalized slice (0..1).
  // Use epsilon so slice=1/n floors to index 0 (not 1) and we stay in range.
  // @inline
  setSliceFromNormalized(slice: f32): void {
    const n = this.sliceCount
    if (n <= 0) {
      this.sliceStart = 0
      this.sliceEnd = this.sampleLength
      this.sliceLength = this.sampleLength > 0 ? this.sampleLength : 1
      return
    }
    const eps: f32 = 1e-7
    let sliceIndex = i32(slice * f32(n) - eps)
    if (sliceIndex >= n) {
      sliceIndex = n - 1
    }
    if (sliceIndex < 0) {
      sliceIndex = 0
    }
    this.sliceStart = this.sliceStarts[sliceIndex]
    this.sliceEnd = this.sliceEnds[sliceIndex]
    this.sliceLength = this.sliceEnd - this.sliceStart
    if (this.sliceLength < 1) {
      this.sliceLength = 1
    }
  }

  // @inline
  readSample(sampleHandle: f32, channel: f32, position: f32): f32 {
    const handle = i32(sampleHandle)
    const ch = i32(channel)
    const start = this.playing ? this.playSliceStart : this.sliceStart
    const end = this.playing ? this.playSliceEnd : this.sliceEnd
    const absolutePos = start + i32(position)
    if (absolutePos < start || absolutePos >= end) {
      return 0.0
    }

    // Use chunk caching: read 128 samples at a time
    const chunkSize = CHUNK_SIZE
    const chunkStart = (absolutePos / chunkSize) * chunkSize
    const offsetInChunk = absolutePos - chunkStart

    const version = getSampleVersion(handle)
    if (this.cachedChunkStart != chunkStart || this.cachedChunkChannel != ch || this.cachedChunkHandle != handle || this.cachedChunkVersion != version) {
      this.cachedChunkStart = chunkStart
      this.cachedChunkChannel = ch
      this.cachedChunkHandle = handle
      this.cachedChunkVersion = version
      const readLength = min(chunkSize, this.sampleLength - chunkStart)
      if (readLength > 0) {
        readSampleChunk(handle, ch, chunkStart, readLength, this.batchBuffer.dataStart)
        // Zero-fill the rest of the buffer if we read less than chunkSize
        if (readLength < chunkSize) {
          for (let i = readLength; i < chunkSize; i++) {
            this.batchBuffer[i] = 0.0
          }
        }
      } else {
        // If readLength is 0 or negative, zero-fill the entire buffer
        for (let i = 0; i < chunkSize; i++) {
          this.batchBuffer[i] = 0.0
        }
      }
    }

    // Check bounds before accessing buffer
    if (offsetInChunk >= 0 && offsetInChunk < chunkSize) {
      const maxValidOffset = this.sampleLength - chunkStart
      if (offsetInChunk < maxValidOffset) {
        return this.batchBuffer[offsetInChunk]
      }
    }
    return 0.0
  }

  // @inline
  handleTrigger(trig: f32, speed: f32, offset: f32): void {
    if (trig > 0.0 && this.prevTrig <= 0.0) {
      this.playSliceStart = this.sliceStart
      this.playSliceEnd = this.sliceEnd
      this.playSliceLength = this.sliceLength
      if (speed < 0.0 && offset == 0.0) {
        this.position = f32(this.sliceLength - 1)
      } else {
        this.position = offset * f32(this.sliceLength)
      }
      this.playing = true
    }
    this.prevTrig = trig
  }

  // @inline
  advancePosition(speed: f32, repeat: f32): void {
    this.position += speed

    if (speed >= 0.0) {
      if (this.position >= f32(this.playSliceLength)) {
        if (repeat > 0.0) {
          this.position = this.position % f32(this.playSliceLength)
        } else {
          this.playing = false
        }
      }
    } else {
      if (this.position < 0.0) {
        if (repeat > 0.0) {
          this.position = f32(this.playSliceLength) + (this.position % f32(this.playSliceLength))
        } else {
          this.playing = false
        }
      }
    }
  }
}

export class SlicerKernelStereo {
  left: SlicerKernel = new SlicerKernel()
  right: SlicerKernel = new SlicerKernel()
  reset(): void {
    this.left.reset()
    this.right.reset()
  }
}
