type DspLatencySnapshot = {
  latencySamples: number
  latencySeconds: number
  deltaTime: number
  sampleRate: number
  sampleCount: number
  rawSampleCount: number
  timeSeconds: number
}

type DspLatencyContext = {
  isPlaying: boolean
  sampleRate: number
  latencySamples: number
  latencySeconds: number
  deltaTime: number
}

function getAudioLatencyParams(
  ctx: AudioContext,
): { sampleRate: number; latencySamples: number; latencySeconds: number } {
  const sampleRate = ctx.sampleRate
  const latencySeconds = (ctx.outputLatency || 0) - (ctx.baseLatency || 0)
  const latencySamples = latencySeconds * sampleRate
  return { sampleRate, latencySamples, latencySeconds }
}

export const ZERO_LATENCY: DspLatencySnapshot = {
  latencySamples: 0,
  latencySeconds: 0,
  deltaTime: 0,
  sampleRate: 0,
  sampleCount: 0,
  rawSampleCount: 0,
  timeSeconds: 0,
}

function computePredictionAndLatency(
  rawSampleCount: number,
  previousPredicted: number | null,
  ctx: DspLatencyContext | null,
): { predicted: number; latency: DspLatencySnapshot } {
  if (!ctx) {
    const z: DspLatencySnapshot = {
      latencySamples: 0,
      latencySeconds: 0,
      deltaTime: 0,
      sampleRate: 0,
      sampleCount: 0,
      rawSampleCount: 0,
      timeSeconds: 0,
    }
    return { predicted: rawSampleCount, latency: z }
  }
  const { isPlaying, sampleRate, latencySamples, latencySeconds, deltaTime } = ctx
  const rawPlaybackPosition = rawSampleCount - (isPlaying ? latencySamples : 0)
  let predicted = previousPredicted
  const isFirstFrame = predicted == null

  if (isFirstFrame || !isPlaying) {
    predicted = rawPlaybackPosition
  }
  else {
    const drift = rawPlaybackPosition - (predicted ?? 0)
    if (Math.abs(drift) > sampleRate) {
      predicted = rawPlaybackPosition
    }
    else {
      predicted = (predicted ?? 0) + deltaTime * sampleRate
      if (Math.abs(drift) > 100) {
        predicted += drift * 0.5
      }
    }
  }

  predicted = Math.max(0, predicted ?? 0)

  const sampleCount = predicted
  const timeSeconds = sampleRate ? sampleCount / sampleRate : 0
  const latency: DspLatencySnapshot = {
    latencySamples,
    latencySeconds,
    deltaTime,
    sampleRate,
    sampleCount,
    rawSampleCount,
    timeSeconds,
  }
  return { predicted, latency }
}

export type DspLatencyOptions = {
  audioContext: AudioContext
  getIsPlaying: () => boolean
  getRawSampleCount: () => number
}

export type DspLatency = ReturnType<typeof createDspLatency>

export function createDspLatency(opts: DspLatencyOptions) {
  let lastWallTime: number | null = null
  let predictedSampleCount: number | null = null
  let latency: DspLatencySnapshot = { ...ZERO_LATENCY }
  const { audioContext, getIsPlaying, getRawSampleCount } = opts
  return {
    get state(): DspLatencySnapshot {
      return latency
    },
    update(updateOpts?: { reset?: boolean; isPlaying?: boolean }) {
      const isPlaying = updateOpts?.isPlaying ?? getIsPlaying()
      const { sampleRate, latencySamples, latencySeconds } = getAudioLatencyParams(audioContext)
      const nowSec = performance.now() / 1000
      const lastWall = updateOpts?.reset ? nowSec : lastWallTime ?? nowSec
      const deltaTime = Math.max(0, nowSec - lastWall)
      lastWallTime = nowSec
      const ctx: DspLatencyContext = { isPlaying, sampleRate, latencySamples, latencySeconds, deltaTime }
      const rawSampleCount = getRawSampleCount()
      const prevPredicted = updateOpts?.reset ? null : predictedSampleCount
      const { predicted, latency: next } = computePredictionAndLatency(rawSampleCount, prevPredicted, ctx)
      predictedSampleCount = predicted
      latency = next
    },
  }
}
