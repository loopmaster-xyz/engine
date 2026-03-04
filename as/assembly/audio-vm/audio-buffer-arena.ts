import { Uint32Arena, Uint8Arena } from './arenas'
import { ArrayBufferPool } from './array-buffer-pool'

const ARENA_INITIAL_BUCKET_COUNT: i32 = 16

function createAudioBuckets(): Array<Array<Float32Array>> {
  const b: Array<Array<Float32Array>> = new Array<Array<Float32Array>>()
  for (let i: i32 = 0; i < ARENA_INITIAL_BUCKET_COUNT; i++) b.push(new Array<Float32Array>())
  return b
}

/** Refcounted arena for Float32 audio buffers; tracks in-flight by ptr for GC.
 *
 *  The internal hash table uses backward-shift deletion instead of tombstones.
 *  With a high-churn get/release workload, tombstone-based schemes trigger
 *  constant compaction rehashes even when live occupancy is low.  Backward-shift
 *  deletion keeps pTomb == 0 at all times, so the only rehash trigger is actual
 *  load growth (pCount * 4 >= cap * 3).
 */
export class AudioBufferArena {
  private buckets: Array<Array<Float32Array>> = createAudioBuckets()
  private allocated: u32 = 0
  private reused: u32 = 0
  private released: u32 = 0
  private freed: u32 = 0
  private inFlight: u32 = 0

  private ptrUint8Arena: Uint8Arena | null
  private ptrUint32Arena: Uint32Arena | null
  private ptrBufPool: ArrayBufferPool<Float32Array | null> | null

  private pCap: i32 = 0
  private pMask: u32 = 0
  private pState: Uint8Array = new Uint8Array(0) // 0=empty, 1=full  (no deleted state needed)
  private pKey: Uint32Array = new Uint32Array(0)
  private pBuf: Array<Float32Array | null> = new Array<Float32Array | null>(0)
  private pRefcount: Uint32Array = new Uint32Array(0)
  private pCount: u32 = 0
  // pTomb is gone — backward-shift deletion produces no tombstones.
  private pLastSlot: i32 = -1

  private pendingFreeBuffers: Array<Float32Array> = new Array<Float32Array>()
  private statsBuf: Uint32Array = new Uint32Array(9)
  rehashPtrCount: i32 = 0
  ensureBucketGrowCount: i32 = 0

  constructor(
    ptrUint8Arena: Uint8Arena | null = null,
    ptrUint32Arena: Uint32Arena | null = null,
    ptrBufPool: ArrayBufferPool<Float32Array | null> | null = null,
  ) {
    this.ptrUint8Arena = ptrUint8Arena
    this.ptrUint32Arena = ptrUint32Arena
    this.ptrBufPool = ptrBufPool
  }

  // @inline
  private initPtrTable(capacity: i32): void {
    // if (capacity > 0) console.log(`AudioBufferArena: initPtrTable capacity=${capacity}`)
    this.pCap = capacity
    this.pMask = capacity > 0 ? u32(capacity - 1) : 0
    if (capacity == 0) {
      this.pState = new Uint8Array(0)
      this.pKey = new Uint32Array(0)
      this.pBuf = new Array<Float32Array | null>(0)
      this.pRefcount = new Uint32Array(0)
    }
    else {
      const u8: Uint8Arena | null = this.ptrUint8Arena
      const u32a: Uint32Arena | null = this.ptrUint32Arena
      const bufPool: ArrayBufferPool<Float32Array | null> | null = this.ptrBufPool
      this.pState = u8 != null ? u8.get(capacity) : new Uint8Array(capacity)
      this.pKey = u32a != null ? u32a.get(capacity) : new Uint32Array(capacity)
      this.pBuf = bufPool != null ? bufPool.get(capacity) : new Array<Float32Array | null>(capacity)
      this.pRefcount = u32a != null ? u32a.get(capacity) : new Uint32Array(capacity)
      for (let i: i32 = 0; i < capacity; i++) this.pBuf[i] = null
    }
    this.pCount = 0
    this.pLastSlot = -1
  }

  // @inline
  private hashPtr(ptr: u32): u32 {
    return ((ptr >> 2) * 2654435761) & this.pMask
  }

  // @inline
  private ensurePtrTable(): void {
    if (this.pCap == 0) {
      this.initPtrTable(32768)
      return
    }
    // Only one trigger now: live load >= 75%.  No tombstone compaction needed.
    if (this.pCount * 4 >= u32(this.pCap) * 3) {
      this.rehashPtr(this.pCap << 1)
    }
  }

  // @inline
  private rehashPtr(newCap: i32): void {
    this.rehashPtrCount++
    const oldState: Uint8Array = this.pState
    const oldKey: Uint32Array = this.pKey
    const oldBuf: Array<Float32Array | null> = this.pBuf
    const oldRefcount: Uint32Array = this.pRefcount
    const oldCap: i32 = this.pCap

    this.initPtrTable(newCap)
    for (let i: i32 = 0; i < oldCap; i++) {
      if (unchecked(oldState[i]) == 1) {
        const ptr: u32 = unchecked(oldKey[i])
        const buf: Float32Array | null = unchecked(oldBuf[i])
        if (buf == null) continue
        const refcount: u32 = unchecked(oldRefcount[i])
        assert(refcount > 0, 'arena rehash: refcount')
        this.pPutNoEnsure(ptr, buf, refcount)
      }
    }

    const u8: Uint8Arena | null = this.ptrUint8Arena
    if (u8 != null) u8.release(oldState)
    const u32a: Uint32Arena | null = this.ptrUint32Arena
    if (u32a != null) {
      u32a.release(oldKey)
      u32a.release(oldRefcount)
    }
    const bufPool: ArrayBufferPool<Float32Array | null> | null = this.ptrBufPool
    if (bufPool != null) bufPool.release(oldBuf)
  }

  // @inline
  /** Returns the slot index for ptr, or -1 if not found.
   *  With no tombstones, probing stops at the first empty slot. */
  private pFindSlot(ptr: u32): i32 {
    const state: Uint8Array = this.pState
    const key: Uint32Array = this.pKey
    const cached: i32 = this.pLastSlot
    if (cached >= 0 && cached < this.pCap && unchecked(state[cached]) == 1 && unchecked(key[cached]) == ptr) {
      return cached
    }
    const mask: u32 = this.pMask
    let idx: u32 = ((ptr >> 2) * 2654435761) & mask
    const cap: i32 = this.pCap
    for (let probes: i32 = 0; probes < cap; probes++) {
      const s: u8 = unchecked(state[idx])
      if (s == 0) return -1 // empty → definitely not present
      if (unchecked(key[idx]) == ptr) {
        this.pLastSlot = i32(idx)
        return i32(idx)
      }
      idx = (idx + 1) & mask
    }
    this.pLastSlot = -1
    return -1
  }

  // @inline
  private pFindInsertSlot(ptr: u32): i32 {
    const state: Uint8Array = this.pState
    const key: Uint32Array = this.pKey
    const mask: u32 = this.pMask
    let idx: u32 = ((ptr >> 2) * 2654435761) & mask
    const cap: i32 = this.pCap
    for (let probes: i32 = 0; probes < cap; probes++) {
      const s: u8 = unchecked(state[idx])
      if (s == 0) return i32(idx) // empty — insert here
      if (unchecked(key[idx]) == ptr) return i32(idx) // existing key
      idx = (idx + 1) & mask
    }
    return -1
  }

  // @inline
  private pPutNoEnsure(ptr: u32, buffer: Float32Array, refcount: u32 = 1): void {
    const slot: i32 = this.pFindInsertSlot(ptr)
    if (slot < 0) throw new Error(`Arena pPut: no slot for ptr ${ptr}`)
    if (unchecked(this.pState[slot]) == 1 && unchecked(this.pKey[slot]) == ptr) {
      assert(this.pRefcount[slot] < u32.MAX_VALUE, 'arena pPutNoEnsure: refcount overflow')
      this.pRefcount[slot]++
      this.pLastSlot = slot
      return
    }
    this.pCount++
    this.pState[slot] = 1
    this.pKey[slot] = ptr
    this.pBuf[slot] = buffer
    this.pRefcount[slot] = refcount
    this.pLastSlot = slot
  }

  /** Backward-shift deletion.
   *
   *  After marking the slot empty, walk forward and pull back any entry whose
   *  natural home is at or before the newly created gap.  This restores the
   *  probe-chain invariant with zero tombstones, so pFindSlot can stop at the
   *  first empty slot and the table never needs tombstone-driven compaction.
   *
   *  The shift condition in the circular table:
   *    An entry currently at `scan` with home `home` should move into `gap` if
   *    removing it from `scan` and placing it at `gap` still satisfies the
   *    invariant — i.e. `gap` lies on the probe path from `home` to `scan`.
   *
   *    In a linear (non-wrapping) layout that means: home <= gap <= scan.
   *    In the circular layout we check the three possible orderings. */
  // @inline
  private pDelAtSlot(slotArg: i32): void {
    const state: Uint8Array = this.pState
    const key: Uint32Array = this.pKey
    const buf: Array<Float32Array | null> = this.pBuf
    const refcount: Uint32Array = this.pRefcount
    const mask: u32 = this.pMask
    const cap: i32 = this.pCap

    let gap: u32 = u32(slotArg)
    this.pLastSlot = -1
    state[gap] = 0
    buf[gap] = null
    this.pCount--

    let scan: u32 = (gap + 1) & mask
    for (let probes: i32 = 0; probes < cap; probes++) {
      if (unchecked(state[scan]) == 0) break // empty — probe chain ends here

      const scanPtr: u32 = unchecked(key[scan])
      const home: u32 = ((scanPtr >> 2) * 2654435761) & mask

      // Does `home` lie in the circular arc [gap, scan]?  If so the entry at
      // `scan` would have been placed into `gap` (or earlier) during insertion,
      // meaning it is safe — and necessary — to shift it back.
      const shouldShift: bool = (home <= gap && gap <= scan) // no wrap-around in [home..scan]
        || (scan < home && home <= gap) // scan wrapped, gap in upper half
        || (gap <= scan && scan < home) // gap wrapped (should not occur given gap<scan on first iter, but handles multi-step chains)

      if (shouldShift) {
        state[gap] = 1
        key[gap] = scanPtr
        buf[gap] = unchecked(buf[scan])
        refcount[gap] = unchecked(refcount[scan])
        state[scan] = 0
        buf[scan] = null
        gap = scan
      }

      scan = (scan + 1) & mask
    }
  }

  // @inline
  get(length: i32): Float32Array {
    const size: i32 = length <= 1 ? 1 : 1 << (32 - clz(u32(length - 1)))
    const index: i32 = ctz(u32(size))
    this.ensureBucket(index)
    const bucket: Array<Float32Array> = this.buckets[index]
    this.inFlight++

    let buffer: Float32Array
    if (bucket.length > 0) {
      this.reused++
      buffer = bucket.pop()
    }
    else {
      this.allocated++
      // console.log(`AudioBufferArena: alloc size=${size} index=${index} allocated=${this.allocated}`)
      buffer = new Float32Array(size)
    }

    this.ensurePtrTable()
    this.pPutNoEnsure(u32(buffer.dataStart), buffer)
    assert(this.inFlight > 0, 'arena get: inFlight')
    return buffer
  }

  // @inline
  retain(ptr: u32): void {
    if (this.pCap == 0) return
    const slot: i32 = this.pFindSlot(ptr)
    if (slot < 0) return
    if (this.pRefcount[slot] == u32.MAX_VALUE) {
      throw new Error(`Arena retain: refcount overflow for ptr ${ptr}`)
    }
    this.pRefcount[slot]++
  }

  // @inline
  canMutateByPtr(ptr: u32): bool {
    if (this.pCap == 0) return false
    const slot: i32 = this.pFindSlot(ptr)
    if (slot < 0) return false
    return this.pRefcount[slot] == 1
  }

  // @inline
  private releaseAtSlot(slot: i32): void {
    const rc: u32 = this.pRefcount[slot]
    if (rc == 0) return
    this.released++
    this.pRefcount[slot] = rc - 1
    if (rc == 1) {
      const b: Float32Array | null = this.pBuf[slot]
      this.pDelAtSlot(slot)
      if (b != null) {
        const index: i32 = ctz(u32(b.length))
        this.ensureBucket(index)
        this.buckets[index].push(b)
      }
      assert(this.inFlight > 0, 'arena release: inFlight underflow')
      this.inFlight--
      this.freed++
    }
  }

  // @inline
  release(buffer: Float32Array): void {
    if (this.pCap == 0) return
    const slot: i32 = this.pFindSlot(u32(buffer.dataStart))
    if (slot < 0) return
    this.releaseAtSlot(slot)
  }

  // @inline
  releaseByRef(ref: u32): void {
    this.release(changetype<Float32Array>(ref))
  }

  // @inline
  releaseByPtr(ptr: u32): void {
    if (this.pCap == 0) return
    const slot: i32 = this.pFindSlot(ptr)
    if (slot < 0) return
    this.releaseAtSlot(slot)
  }

  clear(): void {
    this.drainPendingFree()
    this.pLastSlot = -1
    for (let i: i32 = 0; i < this.pCap; i++) {
      if (unchecked(this.pState[i]) == 1) {
        const b: Float32Array | null = unchecked(this.pBuf[i])
        if (b != null) {
          const index: i32 = ctz(u32(b.length))
          this.ensureBucket(index)
          this.buckets[index].push(b)
        }
      }
      this.pState[i] = 0
      this.pBuf[i] = null
    }
    this.pCount = 0
    this.allocated = 0
    this.reused = 0
    this.released = 0
    this.freed = 0
    this.inFlight = 0
    this.drainPendingFree()
  }

  drainPendingFree(): void {
    const pending = this.pendingFreeBuffers
    const len: i32 = pending.length
    for (let i: i32 = 0; i < len; i++) {
      const buffer: Float32Array = pending[i]
      const index: i32 = ctz(u32(buffer.length))
      this.ensureBucket(index)
      this.buckets[index].push(buffer)
    }
    pending.length = 0
  }

  // @inline
  refFromPtr(ptr: u32): u32 {
    if (this.pCap == 0) return 0
    const slot: i32 = this.pFindSlot(ptr)
    if (slot < 0) return 0
    const b: Float32Array | null = this.pBuf[slot]
    if (b == null) return 0
    return u32(changetype<usize>(b))
  }

  resetCounters(): void {
    this.rehashPtrCount = 0
    this.ensureBucketGrowCount = 0
  }

  // @inline
  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Float32Array>())
    }
  }

  // @inline
  getStats(): Uint32Array {
    const stats: Uint32Array = this.statsBuf
    stats[0] = this.allocated
    stats[1] = this.reused
    stats[2] = this.released
    stats[3] = this.inFlight
    stats[4] = u32(this.pCap)
    stats[5] = this.pCount
    stats[6] = 0 // pTomb always 0 with backward-shift deletion
    stats[7] = u32(this.buckets.length)
    stats[8] = this.freed
    return stats
  }
}
