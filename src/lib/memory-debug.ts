import type { MemorySnapshot } from './memory-registry.ts'
import { getSnapshot, reset as registryReset } from './memory-registry.ts'
import { sampleManager } from './sample-manager.ts'

export type ContextMemoryInfo = {
  snapshot: MemorySnapshot
  samples?: { handleCount: number; totalChannelBytes: number }
  wasmMemoryMb?: number
}

export type AggregatedMemoryInfo = {
  main: ContextMemoryInfo
  worklet: ContextMemoryInfo | null
  record: ContextMemoryInfo | null
  sab: { totalBytes: number; bySource: Record<string, { count: number; bytes: number }> }
  arrayBuffer: { totalBytes: number; bySource: Record<string, { count: number; bytes: number }> }
  samples: { handleCount: number; totalChannelBytes: number }
}

type WorkletLike = { getMemoryInfo?(): Promise<ContextMemoryInfo> }
type RecordLike = { getMemoryInfo?(): Promise<ContextMemoryInfo> }

function mergeBySource(
  a: Record<string, { count: number; bytes: number }>,
  b: Record<string, { count: number; bytes: number }>,
): Record<string, { count: number; bytes: number }> {
  const out = { ...a }
  for (const [k, v] of Object.entries(b)) {
    const cur = out[k] ?? { count: 0, bytes: 0 }
    out[k] = { count: cur.count + v.count, bytes: cur.bytes + v.bytes }
  }
  return out
}

export async function getInfo(opts?: {
  worklet?: WorkletLike
  record?: RecordLike
}): Promise<AggregatedMemoryInfo> {
  const mainSnapshot = getSnapshot()
  const mainSamples = sampleManager.getSampleMemoryInfo()

  let workletInfo: ContextMemoryInfo | null = null
  let recordInfo: ContextMemoryInfo | null = null

  if (opts?.worklet?.getMemoryInfo) {
    workletInfo = await opts.worklet.getMemoryInfo()
  }
  if (opts?.record?.getMemoryInfo) {
    recordInfo = await opts.record.getMemoryInfo()
  }

  const sabCat = mainSnapshot.byCategory.SharedArrayBuffer
  let sabTotal = sabCat?.bytes ?? 0
  let sabBySource = { ...(sabCat?.bySource ?? {}) }

  const abCat = mainSnapshot.byCategory.ArrayBuffer
  let abTotal = abCat?.bytes ?? 0
  let abBySource = { ...(abCat?.bySource ?? {}) }

  if (workletInfo) {
    const w = workletInfo.snapshot.byCategory.SharedArrayBuffer
    if (w) {
      sabTotal += w.bytes
      sabBySource = mergeBySource(sabBySource, w.bySource)
    }
    const wa = workletInfo.snapshot.byCategory.ArrayBuffer
    if (wa) {
      abTotal += wa.bytes
      abBySource = mergeBySource(abBySource, wa.bySource)
    }
  }
  if (recordInfo) {
    const r = recordInfo.snapshot.byCategory.SharedArrayBuffer
    if (r) {
      sabTotal += r.bytes
      sabBySource = mergeBySource(sabBySource, r.bySource)
    }
    const ra = recordInfo.snapshot.byCategory.ArrayBuffer
    if (ra) {
      abTotal += ra.bytes
      abBySource = mergeBySource(abBySource, ra.bySource)
    }
  }

  return {
    main: { snapshot: mainSnapshot, samples: mainSamples },
    worklet: workletInfo,
    record: recordInfo,
    sab: { totalBytes: sabTotal, bySource: sabBySource },
    arrayBuffer: { totalBytes: abTotal, bySource: abBySource },
    samples: mainSamples,
  }
}

export function reset(): void {
  registryReset()
}

export const memoryDebug = { getInfo, reset }
