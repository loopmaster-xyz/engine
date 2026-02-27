/** Fixed-size power-of-two array buffer pool */
const POOL_INITIAL_BUCKET_COUNT: i32 = 16

export class ArrayBufferPool<T> {
  private static readonly MIN_CAP: i32 = 16
  private buckets: Array<Array<Array<T>>> = new Array<Array<Array<T>>>()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  constructor() {
    for (let i: i32 = 0; i < POOL_INITIAL_BUCKET_COUNT; i++) this.buckets.push(new Array<Array<T>>())
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  get(cap: i32): Array<T> {
    const size = cap <= ArrayBufferPool.MIN_CAP
      ? ArrayBufferPool.MIN_CAP
      : this.nextPow2(cap)

    const index = this.bucketIndex(size)
    this.ensureBucket(index)

    const bucket = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Array<T>(size)
  }

  release(arr: Array<T>): void {
    const size = arr.length
    if (size < ArrayBufferPool.MIN_CAP) return

    this.returned++
    const index = this.bucketIndex(size)
    this.ensureBucket(index)
    this.buckets[index].push(arr)
  }

  clear(): void {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }

  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push([])
    }
  }

  private nextPow2(value: i32): i32 {
    let v = value - 1
    v |= v >> 1
    v |= v >> 2
    v |= v >> 4
    v |= v >> 8
    v |= v >> 16
    return v + 1
  }

  /** log2(size) - log2(MIN_CAP) */
  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let v = size
    while (v > ArrayBufferPool.MIN_CAP) {
      v >>= 1
      index++
    }
    return index
  }
}
