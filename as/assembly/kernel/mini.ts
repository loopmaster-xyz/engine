import {
  MINI_HISTORY_DATA_OFFSET,
  MINI_HISTORY_ENTRY_SIZE,
  MINI_HISTORY_HEADER_SIZE,
  MINI_HISTORY_SIZE,
  MINI_HISTORY_SIZE_MINUS_ONE,
  MINI_HISTORY_WRITE_POS_OFFSET,
} from '../mini/constants'
import { generateMiniHistoryWindow } from '../mini/index'

export class MiniKernel {
  history: Float32Array = new Float32Array(
    MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE,
  )

  reset(): void {
    // History buffer is reused, generateMiniHistoryWindow clears it
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

    // Fill buffer with tuples (each tuple is 3 values: hz, velocity, trig)
    let tupleIdx: i32 = 0
    const maxTuples = tupleBuffer.length / 3

    for (let i: i32 = 0; i < writePos && i < MINI_HISTORY_SIZE && tupleIdx < maxTuples; i++) {
      const slot: i32 = i & MINI_HISTORY_SIZE_MINUS_ONE
      const historyIdx: i32 = MINI_HISTORY_DATA_OFFSET + slot * MINI_HISTORY_ENTRY_SIZE
      const startSample = i32(history[historyIdx + 4])
      const endSample = i32(history[historyIdx + 5])

      // Check if event overlaps with window
      if (windowStartSample < endSample && windowEndSample > startSample) {
        const hz = history[historyIdx + 2]
        const velocity = history[historyIdx + 3]
        // trig = 1.0 if window overlaps note's active range
        const trig: f64 = 1.0

        tupleBuffer[tupleIdx++] = hz as f64
        tupleBuffer[tupleIdx++] = velocity as f64
        tupleBuffer[tupleIdx++] = trig
      }
    }

    // Return number of tuples (each tuple is 3 values)
    return tupleIdx / 3
  }
}
