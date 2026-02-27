import {
  MINI_HISTORY_DATA_OFFSET,
  MINI_HISTORY_ENTRY_SIZE,
  MINI_HISTORY_HEADER_SIZE,
  MINI_HISTORY_SIZE,
  MINI_HISTORY_SIZE_MINUS_ONE,
  MINI_HISTORY_WRITE_POS_OFFSET,
} from './constants'
import { MiniEvents } from './events'
import { MiniEventBuffer } from './util'

const miniHistoryEvents: MiniEvents = new MiniEvents()
const miniHistoryBuffer: MiniEventBuffer = new MiniEventBuffer()

export function generateMiniHistoryWindow(
  bytecode$: usize,
  history$: usize,
  windowStartSample: i32,
  windowEndSample: i32,
  bpm: f32,
  sampleRate: f32,
  barValue: f32,
): void {
  if (history$ === 0) return
  const history = changetype<StaticArray<f32>>(history$)
  memory.fill(
    changetype<usize>(history),
    0,
    (MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE) * 4,
  )

  if (bytecode$ === 0) return
  if (windowEndSample <= windowStartSample) return
  if (bpm <= 0.0 || sampleRate <= 0.0) return

  const cycleLength: f32 = 1.0
  const secondsPerBeat: f64 = 60.0 / (bpm as f64)
  const cycleSamplesF: f64 = (secondsPerBeat * 4.0) * (sampleRate as f64)
  if (cycleSamplesF <= 0.0) return
  const cycleSamples: f32 = cycleSamplesF as f32

  let startCycle: i32 = i32(Math.floor((windowStartSample as f64) / cycleSamplesF)) - 2
  if (startCycle < 0) startCycle = 0
  let endCycle: i32 = i32(Math.ceil((windowEndSample as f64) / cycleSamplesF)) + 2
  if (endCycle < startCycle) endCycle = startCycle

  let historyWritePos: i32 = 0

  for (let cycle: i32 = startCycle; cycle <= endCycle; cycle++) {
    const cycleStartSample: i32 = i32((cycle as f64) * cycleSamplesF)
    miniHistoryBuffer.clear()
    miniHistoryEvents.emitEvents(
      bytecode$,
      miniHistoryBuffer,
      cycleStartSample,
      cycleLength,
      cycleSamples,
      windowStartSample,
      windowEndSample,
      barValue,
    )

    for (let i: i32 = 0; i < miniHistoryBuffer.writePos; i++) {
      const ev = miniHistoryBuffer.events[i]
      if (!ev) continue

      const slot: i32 = historyWritePos & MINI_HISTORY_SIZE_MINUS_ONE
      const historyIdx: i32 = MINI_HISTORY_DATA_OFFSET + slot * MINI_HISTORY_ENTRY_SIZE
      history[historyIdx + 0] = ev.opIndex as f32
      history[historyIdx + 1] = ev.voiceIndex as f32
      history[historyIdx + 2] = ev.value
      history[historyIdx + 3] = ev.velocity
      history[historyIdx + 4] = ev.startSample as f32
      history[historyIdx + 5] = ev.endSample as f32

      historyWritePos = (historyWritePos + 1) & MINI_HISTORY_SIZE_MINUS_ONE
    }
  }

  history[MINI_HISTORY_WRITE_POS_OFFSET] = historyWritePos as f32
}
