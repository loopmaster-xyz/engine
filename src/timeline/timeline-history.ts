import { TIMELINE_HEADER_SIZE, TIMELINE_KIND_GLIDE, TIMELINE_KIND_HOLD, TIMELINE_MAGIC, TIMELINE_SEGMENT_SIZE } from './constants.ts'

function applyCurve(t: number, curve: number): number {
  if (curve > 0) return Math.pow(t, curve)
  if (curve < 0) {
    const base = -curve
    if (base > 0) return 1 - Math.pow(1 - t, base)
  }
  return t
}

export type TimelineSeg = {
  startSample: number
  endSample: number
  a: number
  b: number
  kind: number
  exp: number
}

export type CompiledTimelineSeg = {
  kind: number
  durBars: number
  startValue: number
  endValue: number
  exp: number
}

export type CompiledTimeline = {
  beatDiv: number
  totalBars: number
  cycleBeats: number
  noWrap: boolean
  segs: CompiledTimelineSeg[]
}

export function parseCompiledTimeline(bytecode: Float32Array): CompiledTimeline | null {
  const opLength = bytecode[0] as number
  if (!opLength || opLength <= 0) return null

  const magic = bytecode[1] as number
  if (magic !== TIMELINE_MAGIC) return null

  const segCount = Math.floor(bytecode[2] as number)
  if (!Number.isFinite(segCount) || segCount <= 0) return null

  const totalBarsRaw = bytecode[3] as number
  const noWrap = totalBarsRaw < 0
  const totalBars = Math.abs(totalBarsRaw)
  const beatDiv = bytecode[4] as number
  if (!Number.isFinite(totalBars) || !Number.isFinite(beatDiv) || totalBars <= 0 || beatDiv <= 0) return null

  const segs: CompiledTimelineSeg[] = []
  const segBase = 1 + TIMELINE_HEADER_SIZE
  for (let si = 0; si < segCount; si++) {
    const o = segBase + si * TIMELINE_SEGMENT_SIZE
    const kind = bytecode[o] as number
    const durBars = bytecode[o + 1] as number
    const startValue = bytecode[o + 2] as number
    const endValue = bytecode[o + 3] as number
    const exp = bytecode[o + 4] as number
    if (!durBars || durBars <= 0) continue
    segs.push({ kind, durBars, startValue, endValue, exp })
  }

  if (segs.length === 0) return null

  const cycleBeats = totalBars * beatDiv
  if (!Number.isFinite(cycleBeats) || cycleBeats <= 0) return null

  return { beatDiv, totalBars, cycleBeats, noWrap, segs }
}

export function readTimelineSegsFromCompiledTimeline(
  arrayRaw: Float32Array,
  sampleRate: number,
  bpm: number,
  windowStartTimeSeconds: number,
  windowEndTimeSeconds: number,
): TimelineSeg[] {
  const beatsPerSecond = bpm / 60
  if (!(beatsPerSecond > 0) || !Number.isFinite(beatsPerSecond)) return []
  if (!Number.isFinite(windowStartTimeSeconds) || !Number.isFinite(windowEndTimeSeconds)) return []

  const tl = parseCompiledTimeline(arrayRaw)
  if (!tl) return []

  const startBeat = windowStartTimeSeconds * beatsPerSecond
  const endBeat = windowEndTimeSeconds * beatsPerSecond
  if (!Number.isFinite(startBeat) || !Number.isFinite(endBeat)) return []

  const segs: TimelineSeg[] = []

  if (tl.noWrap) {
    let accBeats = 0
    for (let i = 0; i < tl.segs.length; i++) {
      const s = tl.segs[i]!
      const durBeats = s.durBars * tl.beatDiv
      if (!(durBeats > 0) || !Number.isFinite(durBeats)) continue

      const segStartBeat = accBeats
      const segEndBeat = segStartBeat + durBeats
      accBeats += durBeats

      const startTimeSeconds = segStartBeat / beatsPerSecond
      const endTimeSeconds = segEndBeat / beatsPerSecond
      if (endTimeSeconds < windowStartTimeSeconds || startTimeSeconds > windowEndTimeSeconds) continue

      const startSample = startTimeSeconds * sampleRate
      const endSample = endTimeSeconds * sampleRate
      if (!Number.isFinite(startSample) || !Number.isFinite(endSample)) continue

      segs.push({
        startSample,
        endSample,
        a: s.startValue,
        b: s.endValue,
        kind: s.kind,
        exp: s.exp,
      })
    }

    const last = tl.segs[tl.segs.length - 1]
    const holdValue = last ? last.endValue : 0
    const holdStartBeat = Math.max(0, Math.max(startBeat, tl.cycleBeats))
    if (endBeat > holdStartBeat && Number.isFinite(holdValue)) {
      const startTimeSeconds = holdStartBeat / beatsPerSecond
      const endTimeSeconds = endBeat / beatsPerSecond
      const startSample = startTimeSeconds * sampleRate
      const endSample = endTimeSeconds * sampleRate
      if (Number.isFinite(startSample) && Number.isFinite(endSample)) {
        const prev = segs[segs.length - 1]
        if (
          prev
          && prev.kind === TIMELINE_KIND_HOLD
          && prev.a === holdValue
          && prev.b === holdValue
          && Math.abs(prev.endSample - startSample) < 0.0001
        ) {
          prev.endSample = endSample
        }
        else {
          segs.push({
            startSample,
            endSample,
            a: holdValue,
            b: holdValue,
            kind: TIMELINE_KIND_HOLD,
            exp: 1,
          })
        }
      }
    }
  }
  else {
    const cycleBeats = tl.cycleBeats
    if (!(cycleBeats > 0) || !Number.isFinite(cycleBeats)) return []

    const firstCycle = Math.floor(startBeat / cycleBeats) - 1
    const lastCycle = Math.floor(endBeat / cycleBeats) + 1

    for (let cycle = firstCycle; cycle <= lastCycle; cycle++) {
      const cycleStartBeat = cycle * cycleBeats
      let accBeats = 0
      for (let i = 0; i < tl.segs.length; i++) {
        const s = tl.segs[i]!
        const durBeats = s.durBars * tl.beatDiv
        if (!(durBeats > 0) || !Number.isFinite(durBeats)) continue

        const segStartBeat = cycleStartBeat + accBeats
        const segEndBeat = segStartBeat + durBeats
        accBeats += durBeats

        const startTimeSeconds = segStartBeat / beatsPerSecond
        const endTimeSeconds = segEndBeat / beatsPerSecond
        if (endTimeSeconds < windowStartTimeSeconds || startTimeSeconds > windowEndTimeSeconds) continue

        const startSample = startTimeSeconds * sampleRate
        const endSample = endTimeSeconds * sampleRate
        if (!Number.isFinite(startSample) || !Number.isFinite(endSample)) continue

        segs.push({
          startSample,
          endSample,
          a: s.startValue,
          b: s.endValue,
          kind: s.kind,
          exp: s.exp,
        })
      }
    }
  }

  segs.sort((x, y) => x.startSample - y.startSample)
  return segs
}

export function getTimelineValue(segs: TimelineSeg[], si: number, sample: number): { v: number; si: number } {
  while (si < segs.length && sample >= segs[si]!.endSample) si++
  const s = segs[si]
  if (!s) {
    const last = segs[segs.length - 1]
    if (!last) return { v: 0, si }
    return { v: last.kind === TIMELINE_KIND_GLIDE ? last.b : last.a, si }
  }
  if (sample < s.startSample) {
    const prev = segs[si - 1]
    if (prev) return { v: prev.kind === TIMELINE_KIND_GLIDE ? prev.b : prev.a, si }
    return { v: s.a, si }
  }
  if (s.kind !== TIMELINE_KIND_GLIDE || s.endSample <= s.startSample) return { v: s.a, si }
  const tt = (sample - s.startSample) / (s.endSample - s.startSample)
  const p = applyCurve(tt, s.exp)
  return { v: s.a + (s.b - s.a) * p, si }
}

export function getTimelineValueAtSample(segs: TimelineSeg[], sample: number): number {
  for (let k = 0; k < segs.length; k++) {
    const ss = segs[k]!
    if (sample >= ss.startSample && sample < ss.endSample) {
      if (ss.kind !== TIMELINE_KIND_GLIDE || ss.endSample <= ss.startSample) return ss.a
      const tt = (sample - ss.startSample) / (ss.endSample - ss.startSample)
      const p = applyCurve(tt, ss.exp)
      return ss.a + (ss.b - ss.a) * p
    }
  }
  for (let k = 0; k < segs.length; k++) {
    const ss = segs[k]!
    if (ss.startSample === sample) {
      if (ss.kind !== TIMELINE_KIND_GLIDE || ss.endSample <= ss.startSample) return ss.a
      return ss.a + (ss.b - ss.a) * applyCurve(0, ss.exp)
    }
  }
  for (let k = 0; k < segs.length; k++) {
    const ss = segs[k]!
    if (ss.endSample === sample) return ss.kind === TIMELINE_KIND_GLIDE ? ss.b : ss.a
  }
  const first = segs[0]
  if (!first) return 0
  if (sample < first.startSample) return first.a

  let prev: TimelineSeg | null = null
  for (let k = 0; k < segs.length; k++) {
    const ss = segs[k]!
    if (sample < ss.startSample) break
    prev = ss
  }
  if (prev) return prev.kind === TIMELINE_KIND_GLIDE ? prev.b : prev.a

  const last = segs[segs.length - 1]!
  return last.kind === TIMELINE_KIND_GLIDE ? last.b : last.a
}

export function getActiveTimelineSegIndex(
  arrayRaw: Float32Array,
  sampleCount: number,
  sampleRate: number,
  bpm: number,
): { si: number; tt: number } | null {
  const base = 0
  const opLength = arrayRaw[base] as number
  if (!opLength || opLength <= 0) return null

  const magic = arrayRaw[base + 1] as number
  if (magic !== TIMELINE_MAGIC) return null

  const segCount = Math.floor(arrayRaw[base + 2] as number)
  if (!Number.isFinite(segCount) || segCount <= 0) return null

  const totalBarsRaw = arrayRaw[base + 3] as number
  const noWrap = totalBarsRaw < 0
  const totalBars = Math.abs(totalBarsRaw)
  const beatDiv = arrayRaw[base + 4] as number
  if (!Number.isFinite(totalBars) || !Number.isFinite(beatDiv) || totalBars <= 0 || beatDiv <= 0) return null

  const cycleBeats = totalBars * beatDiv
  const beatsPerSample = (bpm / 60) / sampleRate
  const beatAbs = sampleCount * beatsPerSample
  let localBeat = 0
  if (noWrap) {
    localBeat = Math.max(0, beatAbs)
  }
  else {
    const cycle = Math.floor(beatAbs / cycleBeats)
    localBeat = beatAbs - cycle * cycleBeats
    if (localBeat < 0) localBeat += cycleBeats
  }

  const segBase = base + 1 + TIMELINE_HEADER_SIZE
  let accBeats = 0
  let lastValidSi = -1
  for (let si = 0; si < segCount; si++) {
    const segOffset = segBase + si * TIMELINE_SEGMENT_SIZE
    const durBars = arrayRaw[segOffset + 1] as number
    if (!durBars || durBars <= 0) continue
    lastValidSi = si
    const durBeats = durBars * beatDiv
    if (localBeat < accBeats + durBeats) {
      const tt = durBeats > 0 ? (localBeat - accBeats) / durBeats : 0
      return { si, tt: Math.max(0, Math.min(1, tt)) }
    }
    accBeats += durBeats
  }

  if (noWrap && lastValidSi >= 0) return { si: lastValidSi, tt: 1 }
  return null
}
