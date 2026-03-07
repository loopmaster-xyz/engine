import {
  MINI_MAX_EVENT_VALUES,
  MINI_HISTORY_DATA_OFFSET,
  MINI_HISTORY_ENTRY_SIZE,
  MINI_HISTORY_HEADER_SIZE,
  MINI_HISTORY_SIZE,
  MINI_HISTORY_SIZE_MINUS_ONE,
  MINI_HISTORY_WRITE_POS_OFFSET,
} from '../mini/constants'
import { generateMiniHistoryWindow } from '../mini/index'

const MINI_EVENT_FIELDS: i32 = 4 // hz, trig, from, id
const MINI_LANE_STATE_CAPACITY: i32 = MINI_HISTORY_SIZE

export class MiniKernel {
  history: Float32Array = new Float32Array(
    MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE,
  )
  laneIds: StaticArray<i32> = new StaticArray<i32>(MINI_LANE_STATE_CAPACITY)
  laneHz: StaticArray<f32> = new StaticArray<f32>(MINI_LANE_STATE_CAPACITY)
  laneActive: StaticArray<i32> = new StaticArray<i32>(MINI_LANE_STATE_CAPACITY)
  laneTouched: StaticArray<i32> = new StaticArray<i32>(MINI_LANE_STATE_CAPACITY)
  laneCount: i32 = 0
  touchToken: i32 = 1
  lastWindowEndSample: i32 = -1
  lastBytecodePtr: usize = 0
  lastBytecodeLength: i32 = 0

  private clearLaneState(): void {
    this.laneCount = 0
    this.touchToken = 1
    this.lastWindowEndSample = -1
  }

  private beginWindow(bytecodePtr: usize, bytecodeLength: i32, windowStartSample: i32): void {
    const hasDiscontinuity = this.lastWindowEndSample >= 0 && windowStartSample !== this.lastWindowEndSample
    const changedBytecode = bytecodePtr !== this.lastBytecodePtr || bytecodeLength !== this.lastBytecodeLength
    if (hasDiscontinuity || changedBytecode) {
      this.clearLaneState()
    }

    this.lastBytecodePtr = bytecodePtr
    this.lastBytecodeLength = bytecodeLength

    this.touchToken++
    if (this.touchToken <= 0) {
      this.touchToken = 1
      for (let i: i32 = 0; i < this.laneCount; i++) this.laneTouched[i] = 0
    }
  }

  private finishWindow(windowEndSample: i32): void {
    for (let i: i32 = 0; i < this.laneCount; i++) {
      if (this.laneTouched[i] !== this.touchToken) this.laneActive[i] = 0
    }
    this.lastWindowEndSample = windowEndSample
  }

  private getOrCreateLane(id: i32): i32 {
    for (let i: i32 = 0; i < this.laneCount; i++) {
      if (this.laneIds[i] === id) return i
    }
    if (this.laneCount >= MINI_LANE_STATE_CAPACITY) return -1
    const slot = this.laneCount++
    this.laneIds[slot] = id
    this.laneHz[slot] = 0.0
    this.laneActive[slot] = 0
    this.laneTouched[slot] = 0
    return slot
  }

  reset(): void {
    // History buffer is reused, generateMiniHistoryWindow clears it.
    // Lane state is local to a running stream and must be reset across VM resets.
    this.clearLaneState()
    this.lastBytecodePtr = 0
    this.lastBytecodeLength = 0
  }

  process(
    bufferLength: i32,
    sampleCount: f32,
    sampleRate: f32,
    bpm: f32,
    bytecodePtr: usize,
    bytecodeLength: i32,
    bars: f32,
    windowStartSample: i32,
    windowEndSample: i32,
    tupleBuffer: Float64Array,
  ): i32 {
    this.beginWindow(bytecodePtr, bytecodeLength, windowStartSample)

    // Generate history for the window
    generateMiniHistoryWindow(
      bytecodePtr,
      this.history.dataStart,
      windowStartSample,
      windowEndSample,
      bpm,
      sampleRate,
      bars,
    )

    // Read history entries
    const history = changetype<StaticArray<f32>>(this.history.dataStart)
    const writePos = i32(history[MINI_HISTORY_WRITE_POS_OFFSET])

    // Fill buffer with mini events encoded as object-shape arrays:
    // [hz, trig, from, id]
    // id is a stable lane key: id = opIndex * MINI_MAX_EVENT_VALUES + voiceIndex + 1.
    // This keeps IDs deterministic for the same sequence while avoiding voice-age allocation.
    let tupleIdx: i32 = 0
    const maxTuples = tupleBuffer.length / MINI_EVENT_FIELDS

    for (let i: i32 = 0; i < writePos && i < MINI_HISTORY_SIZE && tupleIdx < maxTuples; i++) {
      const slot: i32 = i & MINI_HISTORY_SIZE_MINUS_ONE
      const historyIdx: i32 = MINI_HISTORY_DATA_OFFSET + slot * MINI_HISTORY_ENTRY_SIZE
      const voiceIndex = i32(history[historyIdx + 1])
      if (voiceIndex < 0) continue // skip control events

      const hz = history[historyIdx + 2]
      if (hz <= 0.0) continue

      const velocity = history[historyIdx + 3]
      const startSample = i32(history[historyIdx + 4])
      const endSample = i32(history[historyIdx + 5])

      // Check if event overlaps with window
      if (windowStartSample < endSample && windowEndSample > startSample) {
        const opIndex = i32(history[historyIdx + 0])
        const id: i32 = opIndex * MINI_MAX_EVENT_VALUES + voiceIndex + 1
        const lane = this.getOrCreateLane(id)
        if (lane < 0) continue

        this.laneTouched[lane] = this.touchToken

        const onset: bool = startSample >= windowStartSample && startSample < windowEndSample
        let trig: f64 = 0.0
        let from: f64 = 0.0

        if (onset) {
          trig = velocity as f64
          if (this.laneActive[lane] !== 0) from = this.laneHz[lane] as f64
        }

        this.laneHz[lane] = hz
        this.laneActive[lane] = 1

        tupleBuffer[tupleIdx++] = hz as f64
        tupleBuffer[tupleIdx++] = trig
        tupleBuffer[tupleIdx++] = from
        tupleBuffer[tupleIdx++] = id as f64
      }
    }

    this.finishWindow(windowEndSample)

    // Return number of events (each event has MINI_EVENT_FIELDS values).
    return tupleIdx / MINI_EVENT_FIELDS
  }
}
