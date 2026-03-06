import { Float32Arena, Float64Arena, Int32Arena, Uint32Arena, Uint8Arena } from './arenas'
import { ArrayBufferPool } from './array-buffer-pool'
import { AudioBufferArena } from './audio-buffer-arena'
import { AUDIO_VM_INFO_STRIDE, EMPTY_FLOAT64_ARRAY as SENTINEL_EMPTY_F64 } from './constants'
import { GenPool, GenPoolManager } from './gen-pool'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { FastMapU32U32 } from './lib/fast-map-u32-u32'
import { FastSetU32 } from './lib/fast-set-u32'
import { HashTable } from './lib/hash-table'
import {
  ArraySlotResultPool,
  BufferEntryPool,
  CallFramePool,
  CellPool,
  ClosureEnvPool,
  FastArrayPool,
  FunctionDefPool,
  FunctionInstancePool,
  StoreEntryPool,
  StepEntryPool,
  TryBlockPool,
  ValueScopePool,
} from './pools'
import { ValueScope } from './value-scope'
import { OS_DOWN_BOXCAR, OS_DOWN_DECIMATE, OS_UP_HOLD, OS_UP_LINEAR } from './vm-constants'
import { MAX_PARAM_COUNT } from './vm-params'
import { ArraySlotResult, BufferEntry, CallFrame, Cell, ClosureEnv, FunctionDef, FunctionInstance, StepEntry,
  StoreEntry, TryBlock } from './vm-types'

export { BufferEntry, StepEntry } from './vm-types'

/** VM state (stack, globals, buffers, gen pools, etc.). */
export class VmState {
  static readonly EMPTY_OUTPUT: Float32Array = new Float32Array(0)
  static readonly EMPTY_FLOAT64_ARRAY: Float64Array = SENTINEL_EMPTY_F64
  arena!: AudioBufferArena
  float64Arena!: Float64Arena
  int32Arena!: Int32Arena
  float32Arena!: Float32Arena
  genPoolManager: GenPoolManager
  genPools: Array<GenPool>
  stack!: Float64Array
  outs!: Float64Array
  solos!: Int32Array
  outsCapacity: i32
  outTop: i32
  arrays!: FastArray<Float64Array>
  arrayLengths!: FastArray<i32>
  arrayRefcounts!: FastArray<u32>
  cells!: FastArray<Cell>
  cellFreeList!: FastArray<i32>
  globals!: FastArray<i32>
  locals!: FastArray<i32>
  functions!: HashTable<FunctionDef>
  functionInstances!: HashTable<FunctionInstance>
  closureEnvs!: HashTable<ClosureEnv>
  nextInstanceId: i32
  nextClosureEnvId: i32
  callFramePool!: CallFramePool
  closureEnvPool!: ClosureEnvPool
  tryBlockPool!: TryBlockPool
  cellPool!: CellPool
  functionDefPool!: FunctionDefPool
  functionInstancePool!: FunctionInstancePool
  fastArrayI32Pool!: FastArrayPool<i32>
  fastArrayU32Pool!: FastArrayPool<u32>
  arraySlotResultPool!: ArraySlotResultPool
  stepEntryPool!: StepEntryPool
  bufferEntryPool!: BufferEntryPool
  storeEntryPool!: StoreEntryPool
  valueScopePool!: ValueScopePool
  callStack!: FastArray<CallFrame>
  absolutePCCallStack!: Int32Array
  absolutePCCallStackTop: i32
  tryStack!: FastArray<TryBlock>
  stackCapacity: i32
  currentBpm: f32
  co: f32
  samplesPerBeat: f32
  samplesPerBar: f32
  stackTop: i32
  info!: Uint32Array
  paramScratch!: Float32Array
  outputLeft!: Float32Array
  outputRight!: Float32Array
  outputBufferLength: i32
  oversampleScratchA!: Float32Array
  oversampleScratchB!: Float32Array
  perfCounters!: Uint32Array
  perfCountersEnabled: bool
  osUpMode: i32
  osDownMode: i32
  cachedOversampleCallStackLen: i32
  cachedOversampleTopFrameRef: usize
  cachedOversampleFactor: i32
  tableGenPoolIndex: i32
  tramGenPoolIndex: i32
  miniGenPoolIndex: i32
  timelineGenPoolIndex: i32
  outGenPoolIndex: i32
  mixGenPoolIndex: i32
  postPcForMixHistory: i32
  work!: FastArray<i32>
  pendingReleaseAudio!: FastSetU32
  upsampleCache!: FastMapU32U32
  tempAudioPtrs!: FastArray<u32>
  nextBufferHandle: i32
  bufferRegistry!: HashTable<BufferEntry>
  storeRegistry!: HashTable<StoreEntry>
  stepRegistry!: HashTable<StepEntry>
  arrayGetGenPoolIndex: i32 = -1
  preserveFunctionState: bool = false

  private arrayBufferPoolFloat64Array: ArrayBufferPool<Float64Array>
  private arrayBufferPoolF64: ArrayBufferPool<f64>
  private arrayBufferPoolI32: ArrayBufferPool<i32>
  private arrayBufferPoolU32: ArrayBufferPool<u32>
  private arrayBufferPoolCell: ArrayBufferPool<Cell>
  private arrayBufferPoolCallFrame: ArrayBufferPool<CallFrame>
  private arrayBufferPoolTryBlock: ArrayBufferPool<TryBlock>
  private hashTableInt32Arena: Int32Arena
  private hashTableUint8Arena: Uint8Arena
  private hashTableInt32ArenaRuntime: Int32Arena
  private hashTableUint8ArenaRuntime: Uint8Arena
  private arrayBufferPoolI32Runtime: ArrayBufferPool<i32>
  private arrayBufferPoolHashValsFunctionDef: ArrayBufferPool<FunctionDef | null>
  private arrayBufferPoolHashValsFunctionInstance: ArrayBufferPool<FunctionInstance | null>
  private arrayBufferPoolHashValsClosureEnv: ArrayBufferPool<ClosureEnv | null>
  private arrayBufferPoolHashValsBufferEntry: ArrayBufferPool<BufferEntry | null>
  private arrayBufferPoolHashValsStepEntry: ArrayBufferPool<StepEntry | null>
  private arrayBufferPoolHashValsStoreEntry: ArrayBufferPool<StoreEntry | null>
  private arrayBufferPoolFunctionDef: ArrayBufferPool<FunctionDef>
  private arrayBufferPoolFunctionInstance: ArrayBufferPool<FunctionInstance>
  private arrayBufferPoolClosureEnv: ArrayBufferPool<ClosureEnv>
  private arrayBufferPoolBufferEntry: ArrayBufferPool<BufferEntry>
  private arrayBufferPoolStepEntry: ArrayBufferPool<StepEntry>
  private arrayBufferPoolStoreEntry: ArrayBufferPool<StoreEntry>
  private audioBufferPtrUint8Arena: Uint8Arena
  private audioBufferPtrUint32Arena: Uint32Arena
  private arrayBufferPoolFloat32ArrayOrNull: ArrayBufferPool<Float32Array | null>
  private arrayBufferPoolArraySlotResult: ArrayBufferPool<ArraySlotResult>
  private arrayBufferPoolValueScope: ArrayBufferPool<ValueScope>

  constructor() {
    this.genPoolManager = new GenPoolManager()
    this.genPools = new Array<GenPool>()
    this.osUpMode = OS_UP_HOLD
    this.osDownMode = OS_DOWN_DECIMATE
    this.cachedOversampleCallStackLen = -1
    this.cachedOversampleTopFrameRef = 0
    this.cachedOversampleFactor = 0
    this.outGenPoolIndex = -1
    this.mixGenPoolIndex = -1
    this.postPcForMixHistory = -1

    this.arrayBufferPoolFloat64Array = new ArrayBufferPool<Float64Array>()
    this.arrayBufferPoolF64 = new ArrayBufferPool<f64>()
    this.arrayBufferPoolI32 = new ArrayBufferPool<i32>()
    this.arrayBufferPoolU32 = new ArrayBufferPool<u32>()
    this.arrayBufferPoolCell = new ArrayBufferPool<Cell>()
    this.arrayBufferPoolCallFrame = new ArrayBufferPool<CallFrame>()
    this.arrayBufferPoolTryBlock = new ArrayBufferPool<TryBlock>()
    this.hashTableInt32Arena = new Int32Arena()
    this.hashTableUint8Arena = new Uint8Arena()
    this.hashTableInt32ArenaRuntime = new Int32Arena()
    this.hashTableUint8ArenaRuntime = new Uint8Arena()
    this.arrayBufferPoolI32Runtime = new ArrayBufferPool<i32>()
    this.arrayBufferPoolHashValsFunctionDef = new ArrayBufferPool<FunctionDef | null>()
    this.arrayBufferPoolHashValsFunctionInstance = new ArrayBufferPool<FunctionInstance | null>()
    this.arrayBufferPoolHashValsClosureEnv = new ArrayBufferPool<ClosureEnv | null>()
    this.arrayBufferPoolHashValsBufferEntry = new ArrayBufferPool<BufferEntry | null>()
    this.arrayBufferPoolHashValsStepEntry = new ArrayBufferPool<StepEntry | null>()
    this.arrayBufferPoolHashValsStoreEntry = new ArrayBufferPool<StoreEntry | null>()
    this.arrayBufferPoolFunctionDef = new ArrayBufferPool<FunctionDef>()
    this.arrayBufferPoolFunctionInstance = new ArrayBufferPool<FunctionInstance>()
    this.arrayBufferPoolClosureEnv = new ArrayBufferPool<ClosureEnv>()
    this.arrayBufferPoolBufferEntry = new ArrayBufferPool<BufferEntry>()
    this.arrayBufferPoolStepEntry = new ArrayBufferPool<StepEntry>()
    this.arrayBufferPoolStoreEntry = new ArrayBufferPool<StoreEntry>()
    this.audioBufferPtrUint8Arena = new Uint8Arena()
    this.audioBufferPtrUint32Arena = new Uint32Arena()
    this.arrayBufferPoolFloat32ArrayOrNull = new ArrayBufferPool<Float32Array | null>()
    this.arrayBufferPoolArraySlotResult = new ArrayBufferPool<ArraySlotResult>()
    this.arrayBufferPoolValueScope = new ArrayBufferPool<ValueScope>()

    this.functions = new HashTable<FunctionDef>(
      4,
      this.hashTableInt32Arena,
      this.arrayBufferPoolHashValsFunctionDef,
      this.hashTableUint8Arena,
      this.arrayBufferPoolI32,
      this.arrayBufferPoolFunctionDef,
    )
    this.functionInstances = new HashTable<FunctionInstance>(
      4,
      this.hashTableInt32ArenaRuntime,
      this.arrayBufferPoolHashValsFunctionInstance,
      this.hashTableUint8ArenaRuntime,
      this.arrayBufferPoolI32Runtime,
      this.arrayBufferPoolFunctionInstance,
    )
    this.closureEnvs = new HashTable<ClosureEnv>(
      4,
      this.hashTableInt32ArenaRuntime,
      this.arrayBufferPoolHashValsClosureEnv,
      this.hashTableUint8ArenaRuntime,
      this.arrayBufferPoolI32Runtime,
      this.arrayBufferPoolClosureEnv,
    )
    this.work = new FastArray<i32>(16, this.arrayBufferPoolI32)
    this.pendingReleaseAudio = new FastSetU32(16, this.arrayBufferPoolU32)
    this.upsampleCache = new FastMapU32U32(16, this.arrayBufferPoolU32)
    this.tempAudioPtrs = new FastArray<u32>(32, this.arrayBufferPoolU32)
    this.nextBufferHandle = 0
    this.bufferRegistry = new HashTable<BufferEntry>(
      4,
      this.hashTableInt32Arena,
      this.arrayBufferPoolHashValsBufferEntry,
      this.hashTableUint8Arena,
      this.arrayBufferPoolI32,
      this.arrayBufferPoolBufferEntry,
    )
    this.storeRegistry = new HashTable<StoreEntry>(
      4,
      this.hashTableInt32ArenaRuntime,
      this.arrayBufferPoolHashValsStoreEntry,
      this.hashTableUint8ArenaRuntime,
      this.arrayBufferPoolI32Runtime,
      this.arrayBufferPoolStoreEntry,
    )
    this.stepRegistry = new HashTable<StepEntry>(
      4,
      this.hashTableInt32Arena,
      this.arrayBufferPoolHashValsStepEntry,
      this.hashTableUint8Arena,
      this.arrayBufferPoolI32,
      this.arrayBufferPoolStepEntry,
    )

    this.arrays = new FastArray<Float64Array>(16, this.arrayBufferPoolFloat64Array)
    this.arrayLengths = new FastArray<i32>(16, this.arrayBufferPoolI32)
    this.arrayRefcounts = new FastArray<u32>(16, this.arrayBufferPoolU32)
    this.cells = new FastArray<Cell>(16, this.arrayBufferPoolCell)
    this.cellFreeList = new FastArray<i32>(16, this.arrayBufferPoolI32)
    this.globals = new FastArray<i32>(16, this.arrayBufferPoolI32)
    this.locals = new FastArray<i32>(16, this.arrayBufferPoolI32)

    this.callFramePool = new CallFramePool(this.arrayBufferPoolI32)
    this.closureEnvPool = new ClosureEnvPool()
    this.tryBlockPool = new TryBlockPool()
    this.cellPool = new CellPool()
    this.functionDefPool = new FunctionDefPool()
    this.functionInstancePool = new FunctionInstancePool()
    this.fastArrayI32Pool = new FastArrayPool<i32>(this.arrayBufferPoolI32)
    this.fastArrayU32Pool = new FastArrayPool<u32>(this.arrayBufferPoolU32)
    this.arraySlotResultPool = new ArraySlotResultPool(this.arrayBufferPoolArraySlotResult)
    this.stepEntryPool = new StepEntryPool()
    this.bufferEntryPool = new BufferEntryPool()
    this.storeEntryPool = new StoreEntryPool()
    this.valueScopePool = new ValueScopePool(this.arrayBufferPoolF64, this.arrayBufferPoolValueScope)
    this.callStack = new FastArray<CallFrame>(16, this.arrayBufferPoolCallFrame)
    this.tryStack = new FastArray<TryBlock>(16, this.arrayBufferPoolTryBlock)

    this.info = new Uint32Array(AUDIO_VM_INFO_STRIDE)
    this.paramScratch = new Float32Array(MAX_PARAM_COUNT)
    this.perfCounters = new Uint32Array(16)
    this.perfCountersEnabled = false
    this.absolutePCCallStack = new Int32Array(8)
    this.arena = new AudioBufferArena(
      this.audioBufferPtrUint8Arena,
      this.audioBufferPtrUint32Arena,
      this.arrayBufferPoolFloat32ArrayOrNull,
    )
    this.float64Arena = new Float64Arena()
    this.int32Arena = new Int32Arena()
    this.float32Arena = new Float32Arena()
    this.stack = new Float64Array(0)
    this.outs = new Float64Array(0)
    this.solos = new Int32Array(0)

    this.reset()
  }

  reset(): void {
    this.arena.clear()
    this.float64Arena.clear()
    this.int32Arena.clear()
    this.float32Arena.clear()

    this.outsCapacity = 0
    this.outTop = 0

    this.arrays.clear()
    this.arrayLengths.clear()
    this.arrayRefcounts.clear()
    for (let c: i32 = 0; c < this.cells.length; c++) this.cellPool.release(this.cells.get(c))
    this.cells.clear()
    this.cellFreeList.clear()
    this.globals.clear()
    this.locals.clear()

    const instIds: FastArray<i32> = this.functionInstances.keys()
    for (let i: i32 = 0; i < instIds.length; i++) {
      this.functionInstancePool.release(this.functionInstances.get(instIds.get(i)))
    }
    this.functionInstances.clear()
    const envIds: FastArray<i32> = this.closureEnvs.keys()
    for (let i: i32 = 0; i < envIds.length; i++) {
      this.closureEnvPool.release(this.fastArrayI32Pool, this.closureEnvs.get(envIds.get(i)))
    }
    this.closureEnvs.clear()
    this.nextInstanceId = 0
    this.nextClosureEnvId = 0

    this.callStack.clear()
    for (let t: i32 = 0; t < this.tryStack.length; t++) this.tryBlockPool.release(this.tryStack.get(t))
    this.tryStack.clear()

    if (this.absolutePCCallStack.length < 8) {
      this.absolutePCCallStack = new Int32Array(8)
    }
    this.absolutePCCallStack.fill(-1)
    this.absolutePCCallStackTop = 0

    this.stackCapacity = 0
    this.currentBpm = 120.0
    this.co = 0.5
    this.samplesPerBeat = 0.0
    this.samplesPerBar = 0.0
    this.stackTop = 0

    this.info.fill(0)
    this.paramScratch.fill(0)

    this.outputLeft = VmState.EMPTY_OUTPUT
    this.outputRight = VmState.EMPTY_OUTPUT
    this.oversampleScratchA = VmState.EMPTY_OUTPUT
    this.oversampleScratchB = VmState.EMPTY_OUTPUT

    this.outputBufferLength = 0
    this.work.clear()
    this.pendingReleaseAudio.clear()
    this.cachedOversampleCallStackLen = -1
    this.cachedOversampleTopFrameRef = 0
    this.cachedOversampleFactor = 0
    this.tempAudioPtrs.clear()
    this.nextBufferHandle = 0
    const bufferIds: FastArray<i32> = this.bufferRegistry.keys()
    for (let i: i32 = 0; i < bufferIds.length; i++) {
      this.bufferEntryPool.release(this.bufferRegistry.get(bufferIds.get(i)))
    }
    this.bufferRegistry.clear()
    const storeIds: FastArray<i32> = this.storeRegistry.keys()
    for (let i: i32 = 0; i < storeIds.length; i++) {
      const entry: StoreEntry = this.storeRegistry.get(storeIds.get(i))
      const len: i32 = min(entry.length, entry.values.length)
      for (let j: i32 = 0; j < len; j++) {
        heap.releaseValue(this, entry.values[j])
      }
      if (entry.values.length > 0) this.float64Arena.release(entry.values)
      this.storeEntryPool.release(entry)
    }
    this.storeRegistry.clear()
    const stepIds: FastArray<i32> = this.stepRegistry.keys()
    for (let i: i32 = 0; i < stepIds.length; i++) {
      this.stepEntryPool.release(this.stepRegistry.get(stepIds.get(i)))
    }
    this.stepRegistry.clear()
    this.perfCounters.fill(0)
    this.perfCountersEnabled = false
  }

  // @inline
  private ensureScratchLength(required: i32, current: Float32Array): Float32Array {
    if (current.length >= required) return current
    let cap: i32 = 1
    while (cap < required) cap <<= 1
    return new Float32Array(cap)
  }

  // @inline
  getOversampleScratchA(required: i32): Float32Array {
    if (required <= 0) required = 1
    this.oversampleScratchA = this.ensureScratchLength(required, this.oversampleScratchA)
    return this.oversampleScratchA
  }

  // @inline
  getOversampleScratchB(required: i32): Float32Array {
    if (required <= 0) required = 1
    this.oversampleScratchB = this.ensureScratchLength(required, this.oversampleScratchB)
    return this.oversampleScratchB
  }

  // @inline
  beginTempAudioScope(): i32 {
    return this.tempAudioPtrs.length
  }

  // @inline
  trackTempAudioPtr(ptr: u32): void {
    if (ptr == 0) return
    this.tempAudioPtrs.push(ptr)
    if (this.perfCountersEnabled) this.perfCounters[2]++
  }

  // @inline
  endTempAudioScope(mark: i32): void {
    let target: i32 = mark
    if (target < 0) target = 0
    if (target > this.tempAudioPtrs.length) target = this.tempAudioPtrs.length
    for (let i: i32 = this.tempAudioPtrs.length - 1; i >= target; i--) {
      this.arena.releaseByPtr(this.tempAudioPtrs.get(i))
      if (this.perfCountersEnabled) this.perfCounters[3]++
    }
    this.tempAudioPtrs.length = target
  }

  resetPerfCounters(): void {
    this.perfCounters.fill(0)
  }

  // @inline
  setPerfCountersEnabled(enabled: bool): void {
    this.perfCountersEnabled = enabled
  }

  resetArenaPoolCounters(): void {
    this.hashTableInt32Arena.resetCounters()
    this.hashTableUint8Arena.resetCounters()
    this.hashTableInt32ArenaRuntime.resetCounters()
    this.hashTableUint8ArenaRuntime.resetCounters()
    this.audioBufferPtrUint8Arena.resetCounters()
    this.audioBufferPtrUint32Arena.resetCounters()
    this.float64Arena.resetCounters()
    this.int32Arena.resetCounters()
    this.float32Arena.resetCounters()
    this.arena.resetCounters()
    this.genPoolManager.resetArenaCounters()
    this.functions.resetCounters()
    this.functionInstances.resetCounters()
    this.closureEnvs.resetCounters()
    this.bufferRegistry.resetCounters()
    this.storeRegistry.resetCounters()
    this.stepRegistry.resetCounters()
    this.work.resetCounters()
    this.arrays.resetCounters()
    this.arrayLengths.resetCounters()
    this.arrayRefcounts.resetCounters()
    this.cells.resetCounters()
    this.cellFreeList.resetCounters()
    this.globals.resetCounters()
    this.locals.resetCounters()
    this.callStack.resetCounters()
    this.tryStack.resetCounters()
    this.pendingReleaseAudio.resetCounters()
    this.upsampleCache.resetCounters()
    this.arrayBufferPoolFloat64Array.resetCounters()
    this.arrayBufferPoolF64.resetCounters()
    this.arrayBufferPoolI32.resetCounters()
    this.arrayBufferPoolU32.resetCounters()
    this.arrayBufferPoolCell.resetCounters()
    this.arrayBufferPoolCallFrame.resetCounters()
    this.arrayBufferPoolTryBlock.resetCounters()
    this.arrayBufferPoolI32Runtime.resetCounters()
    this.arrayBufferPoolHashValsFunctionDef.resetCounters()
    this.arrayBufferPoolHashValsFunctionInstance.resetCounters()
    this.arrayBufferPoolHashValsClosureEnv.resetCounters()
    this.arrayBufferPoolHashValsBufferEntry.resetCounters()
    this.arrayBufferPoolHashValsStepEntry.resetCounters()
    this.arrayBufferPoolHashValsStoreEntry.resetCounters()
    this.arrayBufferPoolFunctionDef.resetCounters()
    this.arrayBufferPoolFunctionInstance.resetCounters()
    this.arrayBufferPoolClosureEnv.resetCounters()
    this.arrayBufferPoolBufferEntry.resetCounters()
    this.arrayBufferPoolStepEntry.resetCounters()
    this.arrayBufferPoolStoreEntry.resetCounters()
    this.arrayBufferPoolFloat32ArrayOrNull.resetCounters()
    this.arrayBufferPoolArraySlotResult.resetCounters()
    this.arrayBufferPoolValueScope.resetCounters()
    this.callFramePool.resetCounters()
    this.closureEnvPool.resetCounters()
    this.tryBlockPool.resetCounters()
    this.cellPool.resetCounters()
    this.functionDefPool.resetCounters()
    this.functionInstancePool.resetCounters()
    this.fastArrayI32Pool.resetCounters()
    this.fastArrayU32Pool.resetCounters()
    this.arraySlotResultPool.resetCounters()
    this.stepEntryPool.resetCounters()
    this.bufferEntryPool.resetCounters()
    this.storeEntryPool.resetCounters()
    this.valueScopePool.resetCounters()
    for (let i: i32 = 0; i < this.genPools.length; i++) {
      this.genPools[i].resetCounters()
    }
  }

  checkArenaPoolLeaks(): void {
    return
    const check = (name: string, c: i32, r: i32): void => {
      if (c > r) console.log(`${name} LEAK: created=${c} returned=${r}`)
    }
    check('hashTableInt32Arena', this.hashTableInt32Arena.created, this.hashTableInt32Arena.returned)
    check('hashTableUint8Arena', this.hashTableUint8Arena.created, this.hashTableUint8Arena.returned)
    check('hashTableInt32ArenaRuntime', this.hashTableInt32ArenaRuntime.created,
      this.hashTableInt32ArenaRuntime.returned)
    check('hashTableUint8ArenaRuntime', this.hashTableUint8ArenaRuntime.created,
      this.hashTableUint8ArenaRuntime.returned)
    check('audioBufferPtrUint8Arena', this.audioBufferPtrUint8Arena.created, this.audioBufferPtrUint8Arena.returned)
    check('audioBufferPtrUint32Arena', this.audioBufferPtrUint32Arena.created, this.audioBufferPtrUint32Arena.returned)
    check('float64Arena', this.float64Arena.created, this.float64Arena.returned)
    check('int32Arena', this.int32Arena.created, this.int32Arena.returned)
    check('float32Arena', this.float32Arena.created, this.float32Arena.returned)
    this.genPoolManager.checkArenaLeaks()
    check('arrayBufferPoolFloat64Array', this.arrayBufferPoolFloat64Array.created,
      this.arrayBufferPoolFloat64Array.returned)
    check('arrayBufferPoolF64', this.arrayBufferPoolF64.created, this.arrayBufferPoolF64.returned)
    check('arrayBufferPoolI32', this.arrayBufferPoolI32.created, this.arrayBufferPoolI32.returned)
    check('arrayBufferPoolU32', this.arrayBufferPoolU32.created, this.arrayBufferPoolU32.returned)
    check('arrayBufferPoolCell', this.arrayBufferPoolCell.created, this.arrayBufferPoolCell.returned)
    check('arrayBufferPoolCallFrame', this.arrayBufferPoolCallFrame.created, this.arrayBufferPoolCallFrame.returned)
    check('arrayBufferPoolTryBlock', this.arrayBufferPoolTryBlock.created, this.arrayBufferPoolTryBlock.returned)
    check('arrayBufferPoolI32Runtime', this.arrayBufferPoolI32Runtime.created, this.arrayBufferPoolI32Runtime.returned)
    check('arrayBufferPoolHashValsFunctionDef', this.arrayBufferPoolHashValsFunctionDef.created,
      this.arrayBufferPoolHashValsFunctionDef.returned)
    check('arrayBufferPoolHashValsFunctionInstance', this.arrayBufferPoolHashValsFunctionInstance.created,
      this.arrayBufferPoolHashValsFunctionInstance.returned)
    check('arrayBufferPoolHashValsClosureEnv', this.arrayBufferPoolHashValsClosureEnv.created,
      this.arrayBufferPoolHashValsClosureEnv.returned)
    check('arrayBufferPoolHashValsBufferEntry', this.arrayBufferPoolHashValsBufferEntry.created,
      this.arrayBufferPoolHashValsBufferEntry.returned)
    check('arrayBufferPoolHashValsStepEntry', this.arrayBufferPoolHashValsStepEntry.created,
      this.arrayBufferPoolHashValsStepEntry.returned)
    check('arrayBufferPoolHashValsStoreEntry', this.arrayBufferPoolHashValsStoreEntry.created,
      this.arrayBufferPoolHashValsStoreEntry.returned)
    check('arrayBufferPoolFunctionDef', this.arrayBufferPoolFunctionDef.created,
      this.arrayBufferPoolFunctionDef.returned)
    check('arrayBufferPoolFunctionInstance', this.arrayBufferPoolFunctionInstance.created,
      this.arrayBufferPoolFunctionInstance.returned)
    check('arrayBufferPoolClosureEnv', this.arrayBufferPoolClosureEnv.created, this.arrayBufferPoolClosureEnv.returned)
    check('arrayBufferPoolBufferEntry', this.arrayBufferPoolBufferEntry.created,
      this.arrayBufferPoolBufferEntry.returned)
    check('arrayBufferPoolStepEntry', this.arrayBufferPoolStepEntry.created, this.arrayBufferPoolStepEntry.returned)
    check('arrayBufferPoolStoreEntry', this.arrayBufferPoolStoreEntry.created, this.arrayBufferPoolStoreEntry.returned)
    check('arrayBufferPoolFloat32ArrayOrNull', this.arrayBufferPoolFloat32ArrayOrNull.created,
      this.arrayBufferPoolFloat32ArrayOrNull.returned)
    check('arrayBufferPoolArraySlotResult', this.arrayBufferPoolArraySlotResult.created,
      this.arrayBufferPoolArraySlotResult.returned)
    check('arrayBufferPoolValueScope', this.arrayBufferPoolValueScope.created, this.arrayBufferPoolValueScope.returned)
    check('callFramePool', this.callFramePool.created, this.callFramePool.returned)
    check('closureEnvPool', this.closureEnvPool.created, this.closureEnvPool.returned)
    check('tryBlockPool', this.tryBlockPool.created, this.tryBlockPool.returned)
    check('cellPool', this.cellPool.created, this.cellPool.returned)
    check('functionDefPool', this.functionDefPool.created, this.functionDefPool.returned)
    check('functionInstancePool', this.functionInstancePool.created, this.functionInstancePool.returned)
    check('fastArrayI32Pool', this.fastArrayI32Pool.created, this.fastArrayI32Pool.returned)
    check('fastArrayU32Pool', this.fastArrayU32Pool.created, this.fastArrayU32Pool.returned)
    check('arraySlotResultPool', this.arraySlotResultPool.created, this.arraySlotResultPool.returned)
    check('stepEntryPool', this.stepEntryPool.created, this.stepEntryPool.returned)
    check('bufferEntryPool', this.bufferEntryPool.created, this.bufferEntryPool.returned)
    check('storeEntryPool', this.storeEntryPool.created, this.storeEntryPool.returned)
    check('valueScopePool', this.valueScopePool.created, this.valueScopePool.returned)
    for (let i: i32 = 0; i < this.genPools.length; i++) {
      const gp: GenPool = this.genPools[i]
      if (gp.slotCreated > gp.slotReturned) {
        console.log(`genPools[${i}] LEAK: slotCreated=${gp.slotCreated} slotReturned=${gp.slotReturned}`)
      }
    }
    const hotRehash: i32 = this.functions.rehashCount
      + this.functionInstances.rehashCount
      + this.closureEnvs.rehashCount
      + this.bufferRegistry.rehashCount
      + this.storeRegistry.rehashCount
      + this.stepRegistry.rehashCount
    const arenaBucketGrow: i32 = this.arena.ensureBucketGrowCount
      + this.float64Arena.ensureBucketGrowCount
      + this.int32Arena.ensureBucketGrowCount
      + this.float32Arena.ensureBucketGrowCount
      + this.hashTableInt32Arena.ensureBucketGrowCount
      + this.hashTableUint8Arena.ensureBucketGrowCount
      + this.hashTableInt32ArenaRuntime.ensureBucketGrowCount
      + this.hashTableUint8ArenaRuntime.ensureBucketGrowCount
      + this.audioBufferPtrUint8Arena.ensureBucketGrowCount
      + this.audioBufferPtrUint32Arena.ensureBucketGrowCount
    const poolBucketGrow: i32 = this.arrayBufferPoolFloat64Array.ensureBucketGrowCount
      + this.arrayBufferPoolF64.ensureBucketGrowCount
      + this.arrayBufferPoolI32.ensureBucketGrowCount
      + this.arrayBufferPoolU32.ensureBucketGrowCount
    const poolGrowRaw: i32 = this.callFramePool.getPoolGrowCountRaw()
      + this.closureEnvPool.getPoolGrowCountRaw()
      + this.tryBlockPool.getPoolGrowCountRaw()
      + this.cellPool.getPoolGrowCountRaw()
      + this.functionDefPool.getPoolGrowCountRaw()
      + this.functionInstancePool.getPoolGrowCountRaw()
      + this.fastArrayI32Pool.getPoolGrowCountRaw()
      + this.fastArrayU32Pool.getPoolGrowCountRaw()
      + this.stepEntryPool.getPoolGrowCountRaw()
      + this.bufferEntryPool.getPoolGrowCountRaw()
      + this.storeEntryPool.getPoolGrowCountRaw()
    if (hotRehash > 0 || this.arena.rehashPtrCount > 0 || poolGrowRaw > 0 || arenaBucketGrow > 0
      || poolBucketGrow > 0)
    {
      console.log(
        `hotPath: HashTable rehash=${hotRehash} arena.rehashPtr=${this.arena.rehashPtrCount} arenaBucketGrow=${arenaBucketGrow} poolBucketGrow=${poolBucketGrow} poolGrowRaw=${poolGrowRaw}`,
      )
    }
  }
}
