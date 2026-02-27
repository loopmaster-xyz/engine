import { TIMELINE_HEADER_SIZE, TIMELINE_KIND_GLIDE, TIMELINE_MAGIC, TIMELINE_SEGMENT_SIZE } from './timeline-constants.ts'
import { applyCurve } from '../util.ts'

export class TimelineKernel {
  reset(): void {}

  process(
    bufferLength: i32,
    sampleCount: i32,
    sampleRate: f32,
    bpm: f32,
    bytecodePtr: usize,
    bytecodeLength: i32,
    outputPtr: usize,
  ): void {
    if (bytecodePtr === 0 || bytecodeLength <= 0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    const base: i32 = 0
    const opLength: i32 = i32(load<f32>(bytecodePtr + (base << 2)))
    if (opLength <= 0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    const dataStart: i32 = base + 1
    if (i32(load<f32>(bytecodePtr + (dataStart << 2))) !== TIMELINE_MAGIC) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    const totalUnitsSigned: f32 = load<f32>(bytecodePtr + ((base + 3) << 2))
    if (totalUnitsSigned === 0.0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }
    const noWrap: bool = totalUnitsSigned < 0.0
    const totalUnits: f32 = noWrap ? -totalUnitsSigned : totalUnitsSigned
    if (totalUnits <= 0.0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    const storedBeatDiv: f32 = load<f32>(bytecodePtr + ((base + 4) << 2))
    if (storedBeatDiv <= 0.0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    const segCount: i32 = i32(load<f32>(bytecodePtr + ((base + 2) << 2)))
    const segBase: i32 = dataStart + TIMELINE_HEADER_SIZE

    const cycleBeats: f64 = (totalUnits * storedBeatDiv) as f64
    if (cycleBeats <= 0.0) {
      memory.fill(outputPtr, 0, (bufferLength << 2) as usize)
      return
    }

    let lastB: f32 = 0.0
    for (let s: i32 = 0; s < segCount; s++) {
      const segOffset: i32 = segBase + s * TIMELINE_SEGMENT_SIZE
      const durUnits: f32 = load<f32>(bytecodePtr + ((segOffset + 1) << 2))
      if (durUnits <= 0.0) continue
      lastB = load<f32>(bytecodePtr + ((segOffset + 3) << 2))
    }

    const beatsPerSample: f64 = (bpm as f64) / 60.0 / (sampleRate as f64)
    let beatAbs: f64 = (sampleCount as f64) * beatsPerSample

    for (let i: i32 = 0; i < bufferLength; i++) {
      let localBeat: f64 = 0.0
      if (noWrap) {
        localBeat = beatAbs
        if (localBeat < 0.0) localBeat = 0.0
      }
      else {
        const cycle: f64 = Math.floor(beatAbs / cycleBeats)
        localBeat = beatAbs - cycle * cycleBeats
      }

      let accBeats: f64 = 0.0
      let v: f32 = lastB

      for (let s: i32 = 0; s < segCount; s++) {
        const segOffset: i32 = segBase + s * TIMELINE_SEGMENT_SIZE
        const kind: i32 = i32(load<f32>(bytecodePtr + (segOffset << 2)))
        const durUnits: f32 = load<f32>(bytecodePtr + ((segOffset + 1) << 2))
        if (durUnits <= 0.0) continue

        const durBeats: f64 = (durUnits * storedBeatDiv) as f64
        if (localBeat < accBeats + durBeats) {
          const a: f32 = load<f32>(bytecodePtr + ((segOffset + 2) << 2))
          const b: f32 = load<f32>(bytecodePtr + ((segOffset + 3) << 2))
          if (kind !== TIMELINE_KIND_GLIDE || durBeats <= 0.0) {
            v = a
          }
          else {
            const curve: f32 = load<f32>(bytecodePtr + ((segOffset + 4) << 2))
            const t: f64 = (localBeat - accBeats) / durBeats
            const p: f32 = applyCurve(f32(t), curve)
            v = a + (b - a) * p
          }
          break
        }
        accBeats += durBeats
      }

      store<f32>(outputPtr + (i << 2), v)
      beatAbs += beatsPerSample
    }
  }
}
