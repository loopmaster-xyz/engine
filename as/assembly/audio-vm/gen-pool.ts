import { Float32Arena, Int32Arena, Uint32Arena } from './arenas'
import { HISTORY_META_STRIDE, HISTORY_SIZE, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_CHUNKS,
  WAVEFORM_RING_SAMPLES } from './constants'
import { GenHistory, GenSlot } from './gen-history'

/** Gen slot pools and history meta for UI (GenPoolManager, GenPool). */
export class GenPoolManager {
  private int32Arena: Int32Arena = new Int32Arena()
  private uint32Arena: Uint32Arena = new Uint32Arena()
  private float32Arena: Float32Arena = new Float32Arena()
  historyCreated: i32 = 0
  historyReturned: i32 = 0
  private historyMeta: Uint32Array = new Uint32Array(0)
  private historyMetaCapacity: i32 = 0
  private historyCount: i32 = 0
  private histories: Array<GenHistory> = new Array<GenHistory>()
  private historyPool: Array<GenHistory> = new Array<GenHistory>()

  getHistoryMetaPointer(): u32 {
    return u32(this.historyMeta.dataStart)
  }

  getHistoryCount(): u32 {
    return u32(this.historyCount)
  }

  resetArenaCounters(): void {
    this.int32Arena.resetCounters()
    this.uint32Arena.resetCounters()
    this.float32Arena.resetCounters()
    this.historyCreated = 0
    this.historyReturned = 0
  }

  checkArenaLeaks(): void {
    return
    if (this.int32Arena.created > this.int32Arena.returned) {
      console.log(
        `GenPoolManager.int32Arena LEAK: created=${this.int32Arena.created} returned=${this.int32Arena.returned}`,
      )
    }
    if (this.uint32Arena.created > this.uint32Arena.returned) {
      console.log(
        `GenPoolManager.uint32Arena LEAK: created=${this.uint32Arena.created} returned=${this.uint32Arena.returned}`,
      )
    }
    if (this.float32Arena.created > this.float32Arena.returned) {
      console.log(
        `GenPoolManager.float32Arena LEAK: created=${this.float32Arena.created} returned=${this.float32Arena.returned}`,
      )
    }
    if (this.historyCreated > this.historyReturned) {
      console.log(`GenPoolManager.history LEAK: created=${this.historyCreated} returned=${this.historyReturned}`)
    }
    const genBucketGrow: i32 = this.int32Arena.ensureBucketGrowCount
      + this.uint32Arena.ensureBucketGrowCount
      + this.float32Arena.ensureBucketGrowCount
    if (genBucketGrow > 0) {
      console.log(`GenPoolManager ensureBucketGrow=${genBucketGrow}`)
    }
  }

  disposeHistories(): void {
    while (this.histories.length > 0) {
      const history: GenHistory = this.histories.pop()
      history.dispose()
      this.historyReturned++
      this.historyPool.push(history)
    }
    this.historyCount = 0
    if (this.historyMetaCapacity > 0) this.uint32Arena.release(this.historyMeta)
    this.historyMeta = new Uint32Array(0)
    this.historyMetaCapacity = 0
  }

  // @ts-ignore
  // @inline
  private ensureHistoryMetaCapacity(required: i32): void {
    if (required <= this.historyMetaCapacity) return
    let capacity: i32 = 1
    while (capacity < required) {
      capacity <<= 1
    }
    const elemCount: i32 = capacity * HISTORY_META_STRIDE
    const nextMeta: Uint32Array = this.uint32Arena.get(elemCount)
    if (this.historyCount > 0) {
      memory.copy(nextMeta.dataStart, this.historyMeta.dataStart, usize(this.historyCount * HISTORY_META_STRIDE) << 2)
    }
    if (this.historyMetaCapacity > 0) this.uint32Arena.release(this.historyMeta)
    this.historyMeta = nextMeta
    this.historyMetaCapacity = nextMeta.length / HISTORY_META_STRIDE
    for (let i: i32 = 0; i < this.histories.length; i++) {
      this.histories[i].meta = nextMeta
      this.histories[i].metaOffset = i * HISTORY_META_STRIDE
    }
  }

  createHistory(typeId: i32, paramCount: i32): GenHistory {
    this.ensureHistoryMetaCapacity(this.historyCount + 1)
    let history: GenHistory
    if (this.historyPool.length > 0) {
      history = this.historyPool.pop()
    }
    else {
      this.historyCreated++
      history = new GenHistory()
    }
    history.int32Arena = this.int32Arena
    history.float32Arena = this.float32Arena
    history.typeId = typeId
    history.paramCount = paramCount
    history.size = HISTORY_SIZE
    history.mask = HISTORY_SIZE - 1
    history.sampleCounts = this.int32Arena.get(HISTORY_SIZE)
    history.values = this.float32Arena.get(HISTORY_SIZE * paramCount)
    history.inputRing = this.float32Arena.get(WAVEFORM_RING_SAMPLES)
    history.outputRing = this.float32Arena.get(WAVEFORM_RING_SAMPLES)
    history.inputChunkPos = 0
    history.outputChunkPos = 0
    history.meta = this.historyMeta
    history.metaOffset = this.historyCount * HISTORY_META_STRIDE
    const offset: i32 = history.metaOffset
    this.historyMeta[offset] = u32(typeId)
    this.historyMeta[offset + 1] = u32(paramCount)
    this.historyMeta[offset + 2] = u32(history.size)
    this.historyMeta[offset + 3] = u32(history.writeIndex)
    this.historyMeta[offset + 4] = u32(history.sampleCounts.dataStart)
    this.historyMeta[offset + 5] = u32(history.values.dataStart)
    this.historyMeta[offset + 6] = u32(history.inputRing.dataStart)
    this.historyMeta[offset + 7] = u32(history.inputChunkPos)
    this.historyMeta[offset + 8] = u32(history.outputRing.dataStart)
    this.historyMeta[offset + 9] = u32(history.outputChunkPos)
    this.historyMeta[offset + 10] = u32(WAVEFORM_CHUNK_SAMPLES)
    this.historyMeta[offset + 11] = u32(WAVEFORM_RING_CHUNKS)
    // Call stack frames (8 frames) - initialize with -1 (0 is a valid PC)
    for (let i: i32 = 0; i < 8; i++) {
      this.historyMeta[offset + 12 + i] = u32(0xFFFFFFFF)
    }
    this.histories.push(history)
    this.historyCount++
    return history
  }
}

export class GenPool {
  private factory: () => Object = () => changetype<Object>(0)
  private copier: (dst: Object, src: Object) => void = () => {}
  private resetter: (dst: Object) => void = () => {}
  private typeId: i32
  private paramCount: i32
  private slots: Array<GenSlot> = new Array<GenSlot>()
  private slotPool: Array<GenSlot> = new Array<GenSlot>()
  private index: i32 = 0
  private manager: GenPoolManager = changetype<GenPoolManager>(0)

  constructor(
    factory: () => Object,
    typeId: i32,
    paramCount: i32,
    manager: GenPoolManager,
    copier: (dst: Object, src: Object) => void = () => {},
    resetter: (dst: Object) => void = () => {},
  ) {
    this.factory = factory
    this.copier = copier
    this.resetter = resetter
    this.typeId = typeId
    this.paramCount = paramCount
    this.manager = manager
  }

  slotCreated: i32 = 0
  slotReturned: i32 = 0

  getSlotsLength(): i32 {
    return this.slots.length
  }

  resetCounters(): void {
    this.slotCreated = 0
    this.slotReturned = 0
  }

  resetIndex(): void {
    this.index = 0
  }

  resetAll(): void {
    this.index = 0
    for (let i: i32 = 0; i < this.slots.length; i++) {
      const slot = this.slots[i]
      this.resetter(slot.instance)
      slot.history.reset()
    }
  }

  disposeAll(): void {
    while (this.slots.length > 0) {
      const slot: GenSlot = this.slots.pop()
      slot.history.dispose()
      slot.instance = changetype<Object>(0)
      slot.history = changetype<GenHistory>(0)
      this.slotReturned++
      this.slotPool.push(slot)
    }
    this.index = 0
  }

  // @ts-ignore
  // @inline
  get(): GenSlot {
    const index: i32 = this.index++
    if (index < this.slots.length) {
      return this.slots[index]
    }
    let slot: GenSlot
    if (this.slotPool.length > 0) {
      slot = this.slotPool.pop()
    }
    else {
      this.slotCreated++
      slot = new GenSlot()
    }
    slot.instance = this.factory()
    slot.history = this.manager.createHistory(this.typeId, this.paramCount)
    // When a slot is first created it may come from reused heap memory.
    // Ensure deterministic initial generator state and clean history.
    this.resetter(slot.instance)
    slot.history.reset()
    this.slots.push(slot)
    return slot
  }

  copyFrom(other: GenPool): void {
    const srcCount: i32 = other.slots.length
    if (srcCount <= 0) return
    while (this.slots.length < srcCount) {
      let slot: GenSlot
      if (this.slotPool.length > 0) {
        slot = this.slotPool.pop()
      }
      else {
        this.slotCreated++
        slot = new GenSlot()
      }
      slot.instance = this.factory()
      slot.history = this.manager.createHistory(this.typeId, this.paramCount)
      this.slots.push(slot)
    }
    for (let i: i32 = 0; i < srcCount; i++) {
      const dstSlot: GenSlot = this.slots[i]
      const srcSlot: GenSlot = other.slots[i]
      this.copier(dstSlot.instance, srcSlot.instance)
    }
  }
}
