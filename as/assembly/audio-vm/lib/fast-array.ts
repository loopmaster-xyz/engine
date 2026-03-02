import { ArrayBufferPool } from '../array-buffer-pool'

export class FastArray<T> {
  private buf: Array<T>
  length: i32
  private bufferPool: ArrayBufferPool<T> | null
  growCountRaw: i32 = 0

  constructor(initialCap: i32 = 16, bufferPool: ArrayBufferPool<T> | null = null) {
    this.bufferPool = bufferPool
    const pool: ArrayBufferPool<T> | null = bufferPool
    if (pool != null) {
      this.buf = pool.get(initialCap)
    }
    else {
      this.buf = new Array<T>(initialCap)
    }
    this.length = 0
  }

  /** Push a value, growing if needed */
  // @inline
  push(value: T): void {
    if (this.length >= this.buf.length) {
      const newCap: i32 = this.buf.length << 1
      // console.log(`FastArray: grow old=${this.buf.length} new=${newCap} pool=${this.bufferPool != null}`)
      let newBuf: Array<T>
      const pool: ArrayBufferPool<T> | null = this.bufferPool
      if (pool != null) {
        newBuf = pool.get(newCap)
        for (let i: i32 = 0; i < this.length; i++) newBuf[i] = this.buf[i]
        pool.release(this.buf)
      }
      else {
        this.growCountRaw++
        newBuf = new Array<T>(newCap)
        for (let i: i32 = 0; i < this.length; i++) newBuf[i] = this.buf[i]
      }
      this.buf = newBuf
    }
    this.buf[this.length++] = value
  }

  /** Push a value without checking capacity (ensure enough capacity first) */
  // @inline
  pushUnchecked(value: T): void {
    this.buf[this.length++] = value
  }

  /** Get value at index */
  // @inline
  get(index: i32): T {
    return this.buf[index]
  }

  /** Set value at index */
  // @inline
  set(index: i32, value: T): void {
    this.buf[index] = value
  }

  /** Remove and return last element */
  // @inline
  pop(): T {
    // Handle empty array case
    assert(this.length > 0, 'Cannot pop from empty array')
    let v = this.buf[--this.length]
    this.buf[this.length] = changetype<T>(0)
    return v
  }

  /** Reset array length to zero */
  // @inline
  clear(): void {
    this.length = 0
  }

  /** Ensure capacity is at least n */
  // @inline
  reserve(n: i32): void {
    if (n > this.buf.length) {
      // console.log(`FastArray: reserve old=${this.buf.length} new=${n} pool=${this.bufferPool != null}`)
      let newBuf: Array<T>
      const pool: ArrayBufferPool<T> | null = this.bufferPool
      if (pool != null) {
        newBuf = pool.get(n)
        for (let i: i32 = 0; i < this.length; i++) newBuf[i] = this.buf[i]
        pool.release(this.buf)
      }
      else {
        this.growCountRaw++
        newBuf = new Array<T>(n)
        for (let i: i32 = 0; i < this.length; i++) newBuf[i] = this.buf[i]
      }
      this.buf = newBuf
    }
  }

  // @inline
  resetCounters(): void {
    this.growCountRaw = 0
  }
}
