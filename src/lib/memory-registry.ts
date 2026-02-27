export type MemoryCategory = 'SharedArrayBuffer' | 'ArrayBuffer' | 'sample' | 'wasm'

export type AllocationEntry = {
  id: string
  category: MemoryCategory
  bytes: number
  meta?: Record<string, unknown>
  at: number
}

export type BySource = Record<string, { count: number; bytes: number }>

export type MemorySnapshot = {
  allocations: AllocationEntry[]
  byCategory: Record<MemoryCategory, { count: number; bytes: number; bySource: BySource }>
  totalBytes: number
}

const allocations = new Map<string, AllocationEntry>()

function ensureCategory(
  byCategory: Record<MemoryCategory, { count: number; bytes: number; bySource: BySource }>,
  cat: MemoryCategory,
) {
  if (!byCategory[cat]) {
    byCategory[cat] = { count: 0, bytes: 0, bySource: {} }
  }
  return byCategory[cat]
}

function addToBySource(bySource: BySource, source: string, bytes: number) {
  const cur = bySource[source] ?? { count: 0, bytes: 0 }
  cur.count += 1
  cur.bytes += bytes
  bySource[source] = cur
}

export function track(
  id: string,
  category: MemoryCategory,
  bytes: number,
  meta?: Record<string, unknown>,
): void {
  const source = (meta?.source as string) ?? 'unknown'
  allocations.set(id, {
    id,
    category,
    bytes,
    meta: { ...meta, source },
    at: Date.now(),
  })
}

export function untrack(id: string): void {
  allocations.delete(id)
}

export function getSnapshot(): MemorySnapshot {
  const byCategory = {} as Record<MemoryCategory, { count: number; bytes: number; bySource: BySource }>
  let totalBytes = 0
  const entries = Array.from(allocations.values())
  for (const a of entries) {
    const cat = ensureCategory(byCategory, a.category)
    cat.count += 1
    cat.bytes += a.bytes
    totalBytes += a.bytes
    const src = (a.meta?.source as string) ?? 'unknown'
    addToBySource(cat.bySource, src, a.bytes)
  }
  return {
    allocations: entries,
    byCategory,
    totalBytes,
  }
}

export function reset(): void {
  allocations.clear()
}
