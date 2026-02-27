/** Pre-allocate buckets to avoid ensureBucket allocations on hot path */
const INITIAL_BUCKET_COUNT: i32 = 16

function createInt32Buckets(): Array<Array<Int32Array>> {
  const b: Array<Array<Int32Array>> = new Array<Array<Int32Array>>()
  for (let i: i32 = 0; i < INITIAL_BUCKET_COUNT; i++) b.push(new Array<Int32Array>())
  return b
}
function createUint8Buckets(): Array<Array<Uint8Array>> {
  const b: Array<Array<Uint8Array>> = new Array<Array<Uint8Array>>()
  for (let i: i32 = 0; i < INITIAL_BUCKET_COUNT; i++) b.push(new Array<Uint8Array>())
  return b
}
function createUint32Buckets(): Array<Array<Uint32Array>> {
  const b: Array<Array<Uint32Array>> = new Array<Array<Uint32Array>>()
  for (let i: i32 = 0; i < INITIAL_BUCKET_COUNT; i++) b.push(new Array<Uint32Array>())
  return b
}
function createFloat32Buckets(): Array<Array<Float32Array>> {
  const b: Array<Array<Float32Array>> = new Array<Array<Float32Array>>()
  for (let i: i32 = 0; i < INITIAL_BUCKET_COUNT; i++) b.push(new Array<Float32Array>())
  return b
}
function createFloat64Buckets(): Array<Array<Float64Array>> {
  const b: Array<Array<Float64Array>> = new Array<Array<Float64Array>>()
  for (let i: i32 = 0; i < INITIAL_BUCKET_COUNT; i++) b.push(new Array<Float64Array>())
  return b
}

/** Bucket arenas for Int32/Float32/Float64 arrays (get/release by size). */
export class Int32Arena {
  private buckets: Array<Array<Int32Array>> = createInt32Buckets()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  // @inline
  get(length: i32): Int32Array {
    const size: i32 = this.nextPow2(length)
    const index: i32 = this.bucketIndex(size)
    this.ensureBucket(index)
    const bucket: Array<Int32Array> = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Int32Array(size)
  }

  // @inline
  release(buf: Int32Array): void {
    this.returned++
    const index: i32 = this.bucketIndex(buf.length)
    this.ensureBucket(index)
    this.buckets[index].push(buf)
  }

  // @inline
  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Int32Array>())
    }
  }

  // @inline
  private nextPow2(value: i32): i32 {
    let size: i32 = 1
    while (size < value) size <<= 1
    return size
  }

  // @inline
  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let current: i32 = size
    while (current > 1) {
      current >>= 1
      index++
    }
    return index
  }

  clear(): void {
    for (let i: i32 = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }
}

export class Uint8Arena {
  private buckets: Array<Array<Uint8Array>> = createUint8Buckets()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  get(length: i32): Uint8Array {
    const size: i32 = this.nextPow2(length)
    const index: i32 = this.bucketIndex(size)
    this.ensureBucket(index)
    const bucket: Array<Uint8Array> = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Uint8Array(size)
  }

  release(buf: Uint8Array): void {
    this.returned++
    const index: i32 = this.bucketIndex(buf.length)
    this.ensureBucket(index)
    this.buckets[index].push(buf)
  }

  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Uint8Array>())
    }
  }

  private nextPow2(value: i32): i32 {
    let size: i32 = 1
    while (size < value) size <<= 1
    return size
  }

  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let current: i32 = size
    while (current > 1) {
      current >>= 1
      index++
    }
    return index
  }

  clear(): void {
    for (let i: i32 = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }
}

export class Uint32Arena {
  private buckets: Array<Array<Uint32Array>> = createUint32Buckets()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  // @inline
  get(length: i32): Uint32Array {
    const size: i32 = this.nextPow2(length)
    const index: i32 = this.bucketIndex(size)
    this.ensureBucket(index)
    const bucket: Array<Uint32Array> = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Uint32Array(size)
  }

  // @inline
  release(buf: Uint32Array): void {
    this.returned++
    const index: i32 = this.bucketIndex(buf.length)
    this.ensureBucket(index)
    this.buckets[index].push(buf)
  }

  // @inline
  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Uint32Array>())
    }
  }

  // @inline
  private nextPow2(value: i32): i32 {
    let size: i32 = 1
    while (size < value) size <<= 1
    return size
  }

  // @inline
  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let current: i32 = size
    while (current > 1) {
      current >>= 1
      index++
    }
    return index
  }

  clear(): void {
    for (let i: i32 = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }
}

export class Float32Arena {
  private buckets: Array<Array<Float32Array>> = createFloat32Buckets()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  // @inline
  get(length: i32): Float32Array {
    const size: i32 = this.nextPow2(length)
    const index: i32 = this.bucketIndex(size)
    this.ensureBucket(index)
    const bucket: Array<Float32Array> = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Float32Array(size)
  }

  // @inline
  release(buf: Float32Array): void {
    this.returned++
    const index: i32 = this.bucketIndex(buf.length)
    this.ensureBucket(index)
    this.buckets[index].push(buf)
  }

  // @inline
  refFromPtr(ptr: u32): u32 {
    if (ptr == 0) return 0
    return ptr
  }

  // @inline
  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Float32Array>())
    }
  }

  // @inline
  private nextPow2(value: i32): i32 {
    let size: i32 = 1
    while (size < value) size <<= 1
    return size
  }

  // @inline
  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let current: i32 = size
    while (current > 1) {
      current >>= 1
      index++
    }
    return index
  }

  clear(): void {
    for (let i: i32 = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }
}

export class Float64Arena {
  private buckets: Array<Array<Float64Array>> = createFloat64Buckets()
  created: i32 = 0
  returned: i32 = 0
  ensureBucketGrowCount: i32 = 0

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.ensureBucketGrowCount = 0
  }

  // @inline
  get(length: i32): Float64Array {
    const size: i32 = this.nextPow2(length)
    const index: i32 = this.bucketIndex(size)
    this.ensureBucket(index)
    const bucket: Array<Float64Array> = this.buckets[index]
    if (bucket.length > 0) return bucket.pop()
    this.created++
    return new Float64Array(size)
  }

  // @inline
  release(buf: Float64Array): void {
    this.returned++
    const index: i32 = this.bucketIndex(buf.length)
    this.ensureBucket(index)
    this.buckets[index].push(buf)
  }

  // @inline
  private ensureBucket(index: i32): void {
    while (this.buckets.length <= index) {
      this.ensureBucketGrowCount++
      this.buckets.push(new Array<Float64Array>())
    }
  }

  // @inline
  private nextPow2(value: i32): i32 {
    let size: i32 = 1
    while (size < value) size <<= 1
    return size
  }

  // @inline
  private bucketIndex(size: i32): i32 {
    let index: i32 = 0
    let current: i32 = size
    while (current > 1) {
      current >>= 1
      index++
    }
    return index
  }

  clear(): void {
    for (let i: i32 = 0; i < this.buckets.length; i++) {
      this.buckets[i].length = 0
    }
  }
}
