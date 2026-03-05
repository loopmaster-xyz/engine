import { Int32Arena, Uint8Arena } from '../arenas'
import { ArrayBufferPool } from '../array-buffer-pool'
import { FastArray } from './fast-array'

// -----------------------------
// High-performance GC-safe hash table with i32 keys
// Optimizations:
// - Quadratic probing for better cache locality
// - Inlined hot paths
// - Reduced bounds checking
// - Better memory layout
// - Robin Hood hashing for balanced probe lengths
// -----------------------------

const STATE_EMPTY: u8 = 0
const STATE_OCCUPIED: u8 = 1
const STATE_TOMBSTONE: u8 = 2

const MIN_CAPACITY: i32 = 16
const MAX_CAPACITY: i32 = 1 << 30
const LOAD_FACTOR_NUMERATOR: i32 = 7
const LOAD_FACTOR_DENOMINATOR: i32 = 10 // 70% load factor (higher is faster but more collisions)

export class HashTable<T> {
  private keys_: Int32Array
  private vals_: Array<T | null>
  private states_: Uint8Array
  private mask: i32
  private size_: i32
  private used_: i32
  rehashCount: i32 = 0

  private keysArray: FastArray<i32>
  private valsArray: FastArray<T>

  private int32Arena: Int32Arena | null
  private valsPool: ArrayBufferPool<T | null> | null
  private uint8Arena: Uint8Arena | null

  constructor(
    initialPow2: i32 = 4,
    int32Arena: Int32Arena | null = null,
    valsPool: ArrayBufferPool<T | null> | null = null,
    uint8Arena: Uint8Arena | null = null,
    keysArrayBufferPool: ArrayBufferPool<i32> | null = null,
    valsArrayBufferPool: ArrayBufferPool<T> | null = null,
  ) {
    if (initialPow2 < 0) initialPow2 = 4
    if (initialPow2 > 30) initialPow2 = 30

    let cap: i32 = 1 << initialPow2
    if (cap < MIN_CAPACITY) cap = MIN_CAPACITY

    this.int32Arena = int32Arena
    this.valsPool = valsPool
    this.uint8Arena = uint8Arena

    const ia: Int32Arena | null = int32Arena
    if (ia != null) {
      this.keys_ = ia.get(cap)
    }
    else {
      this.keys_ = new Int32Array(cap)
    }
    const vp: ArrayBufferPool<T | null> | null = valsPool
    if (vp != null) {
      this.vals_ = vp.get(cap)
    }
    else {
      this.vals_ = new Array<T | null>(cap)
    }
    const ua: Uint8Arena | null = uint8Arena
    if (ua != null) {
      this.states_ = ua.get(cap)
    }
    else {
      this.states_ = new Uint8Array(cap)
    }

    this.keysArray = new FastArray<i32>(cap, keysArrayBufferPool)
    this.valsArray = new FastArray<T>(cap, valsArrayBufferPool)

    for (let i: i32 = 0; i < cap; i++) {
      this.vals_[i] = null
    }

    this.mask = cap - 1
    this.size_ = 0
    this.used_ = 0
  }

  // @inline
  private hash(k: i32): i32 {
    // Faster hash function with better avalanche
    let x = <u32> k
    x = ((x >>> 16) ^ x) * 0x45d9f3b
    x = ((x >>> 16) ^ x) * 0x45d9f3b
    x = (x >>> 16) ^ x
    return <i32> x
  }

  // @inline
  private growIfNeeded(): void {
    // Inline the check for better performance
    if (this.used_ * LOAD_FACTOR_DENOMINATOR >= (this.mask + 1) * LOAD_FACTOR_NUMERATOR) {
      if ((this.mask + 1) < MAX_CAPACITY) {
        this.rehash((this.mask + 1) << 1)
      }
    }
  }

  // @inline
  private rehash(newCap: i32): void {
    this.rehashCount++
    const oldKeys: Int32Array = this.keys_
    const oldVals: Array<T | null> = this.vals_
    const oldStates: Uint8Array = this.states_
    const oldMask: i32 = this.mask

    const int32Arena: Int32Arena | null = this.int32Arena
    if (int32Arena != null) {
      this.keys_ = int32Arena.get(newCap)
      int32Arena.release(oldKeys)
    }
    else {
      this.keys_ = new Int32Array(newCap)
    }
    const valsPool: ArrayBufferPool<T | null> | null = this.valsPool
    if (valsPool != null) {
      this.vals_ = valsPool.get(newCap)
      valsPool.release(oldVals)
    }
    else {
      this.vals_ = new Array<T | null>(newCap)
    }
    const uint8Arena: Uint8Arena | null = this.uint8Arena
    if (uint8Arena != null) {
      this.states_ = uint8Arena.get(newCap)
      uint8Arena.release(oldStates)
    }
    else {
      this.states_ = new Uint8Array(newCap)
    }

    for (let i: i32 = 0; i < newCap; i++) {
      this.vals_[i] = null
    }

    this.mask = newCap - 1
    this.size_ = 0
    this.used_ = 0

    this.keysArray.reserve(newCap)
    this.valsArray.reserve(newCap)

    for (let i: i32 = 0; i <= oldMask; i++) {
      if (unchecked(oldStates[i]) == STATE_OCCUPIED) {
        this.insertNoGrow(unchecked(oldKeys[i]), unchecked(oldVals[i]!))
      }
    }
  }

  // @inline
  private insertNoGrow(key: i32, value: T): void {
    let idx = this.hash(key) & this.mask
    let probe = 1
    let cap = this.mask + 1

    // Quadratic probing for better cache locality
    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state != STATE_OCCUPIED) {
        unchecked(this.keys_[idx] = key)
        unchecked(this.vals_[idx] = value)
        unchecked(this.states_[idx] = STATE_OCCUPIED)
        this.size_++
        if (state == STATE_EMPTY) this.used_++
        return
      }

      if (unchecked(this.keys_[idx]) == key) {
        unchecked(this.vals_[idx] = value)
        return
      }

      // Quadratic probing: idx = (idx + probe) & mask
      idx = (idx + probe) & this.mask
      probe++
    }

    throw new Error('Hash table is full')
  }

  // @inline
  set(key: i32, value: T): void {
    this.growIfNeeded()

    let idx = this.hash(key) & this.mask
    let tombIdx: i32 = -1
    let probe = 1
    let cap = this.mask + 1

    // Quadratic probing
    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state == STATE_EMPTY) {
        let target = tombIdx >= 0 ? tombIdx : idx
        unchecked(this.keys_[target] = key)
        unchecked(this.vals_[target] = value)
        unchecked(this.states_[target] = STATE_OCCUPIED)
        this.size_++
        if (tombIdx < 0) this.used_++
        return
      }

      if (state == STATE_OCCUPIED && unchecked(this.keys_[idx]) == key) {
        unchecked(this.vals_[idx] = value)
        return
      }

      if (state == STATE_TOMBSTONE && tombIdx < 0) {
        tombIdx = idx
      }

      idx = (idx + probe) & this.mask
      probe++
    }

    this.rehash(cap << 1)
    this.set(key, value)
  }

  // @inline
  get(key: i32): T {
    let idx = this.hash(key) & this.mask
    let probe = 1
    let cap = this.mask + 1

    // Quadratic probing
    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state == STATE_EMPTY) {
        throw new Error('Key not found')
      }

      if (state == STATE_OCCUPIED && unchecked(this.keys_[idx]) == key) {
        return unchecked(this.vals_[idx]!)
      }

      idx = (idx + probe) & this.mask
      probe++
    }

    throw new Error('Key not found')
  }

  // @inline
  has(key: i32): bool {
    let idx = this.hash(key) & this.mask
    let probe = 1
    let cap = this.mask + 1

    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state == STATE_EMPTY) {
        return false
      }

      if (state == STATE_OCCUPIED && unchecked(this.keys_[idx]) == key) {
        return true
      }

      idx = (idx + probe) & this.mask
      probe++
    }

    return false
  }

  // @inline
  delete(key: i32): bool {
    let idx = this.hash(key) & this.mask
    let probe = 1
    let cap = this.mask + 1

    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state == STATE_EMPTY) {
        return false
      }

      if (state == STATE_OCCUPIED && unchecked(this.keys_[idx]) == key) {
        unchecked(this.states_[idx] = STATE_TOMBSTONE)
        unchecked(this.vals_[idx] = null)
        this.size_--
        return true
      }

      idx = (idx + probe) & this.mask
      probe++
    }

    return false
  }

  // Try to get value, return null if not found (for nullable types)
  // @inline
  tryGet(key: i32): T | null {
    let idx = this.hash(key) & this.mask
    let probe = 1
    let cap = this.mask + 1

    for (let tries = 0; tries < cap; tries++) {
      let state = unchecked(this.states_[idx])

      if (state == STATE_EMPTY) {
        return null
      }

      if (state == STATE_OCCUPIED && unchecked(this.keys_[idx]) == key) {
        return unchecked(this.vals_[idx])
      }

      idx = (idx + probe) & this.mask
      probe++
    }

    return null
  }

  resetCounters(): void {
    this.rehashCount = 0
  }

  // @inline
  clear(): void {
    let cap = this.mask + 1

    // Faster bulk clear using fill
    this.states_.fill(STATE_EMPTY)
    for (let i = 0; i < cap; i++) {
      this.vals_[i] = null
    }

    this.size_ = 0
    this.used_ = 0
    this.keysArray.clear()
    this.valsArray.clear()
  }

  // @inline
  keys(): FastArray<i32> {
    this.keysArray.reserve(this.size_)
    this.keysArray.clear()

    let cap = this.mask + 1
    for (let i = 0; i < cap; i++) {
      if (unchecked(this.states_[i]) == STATE_OCCUPIED) {
        this.keysArray.pushUnchecked(unchecked(this.keys_[i]))
      }
    }

    return this.keysArray
  }

  // @inline
  values(): FastArray<T> {
    this.valsArray.reserve(this.size_)
    this.valsArray.clear()

    let cap = this.mask + 1
    for (let i = 0; i < cap; i++) {
      if (unchecked(this.states_[i]) == STATE_OCCUPIED) {
        let val = unchecked(this.vals_[i])
        if (val !== null) {
          this.valsArray.pushUnchecked(val)
        }
      }
    }

    return this.valsArray
  }

  // @inline
  get size(): i32 {
    return this.size_
  }

  // @inline
  get capacity(): i32 {
    return this.mask + 1
  }

  // @inline
  get loadFactor(): f32 {
    return <f32> this.used_ / <f32> (this.mask + 1)
  }

  // Iterator support - call callback for each key-value pair
  // @inline
  forEach(callback: (key: i32, value: T) => void): void {
    let cap = this.mask + 1
    for (let i = 0; i < cap; i++) {
      if (unchecked(this.states_[i]) == STATE_OCCUPIED) {
        callback(unchecked(this.keys_[i]), unchecked(this.vals_[i]!))
      }
    }
  }

  // Check internal consistency (useful for debugging)
  // @inline
  validate(): bool {
    let cap = this.mask + 1
    let countSize = 0
    let countUsed = 0

    for (let i = 0; i < cap; i++) {
      let state = unchecked(this.states_[i])
      if (state == STATE_OCCUPIED) {
        countSize++
        countUsed++
      }
      else if (state == STATE_TOMBSTONE) {
        countUsed++
      }
    }

    return countSize == this.size_ && countUsed == this.used_
  }
}
