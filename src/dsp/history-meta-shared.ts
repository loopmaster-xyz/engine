import { track } from '../lib/memory-registry.ts'
import { HISTORY_META_STRIDE } from './audio-vm-bindings.ts'

// Layout: [0] = lock (Int32 for Atomics), [1] = historyCount, [2..] = meta rows, stride HISTORY_META_STRIDE u32s per history.
export const HISTORY_META_SHARED_HEADER = 2
export const MAX_HISTORY_COUNT = 512

export const HISTORY_META_SHARED_BYTE_LENGTH = (HISTORY_META_SHARED_HEADER + MAX_HISTORY_COUNT * HISTORY_META_STRIDE)
  * 4

let _historyMetaId = 0
export function createHistoryMetaSharedBuffer(): SharedArrayBuffer {
  const id = `sab-history-meta-${++_historyMetaId}`
  track(id, 'SharedArrayBuffer', HISTORY_META_SHARED_BYTE_LENGTH, { source: 'history-meta-shared' })
  return new SharedArrayBuffer(HISTORY_META_SHARED_BYTE_LENGTH)
}

export function historyMetaMetaOffset(index: number): number {
  return HISTORY_META_SHARED_HEADER + index * HISTORY_META_STRIDE
}
