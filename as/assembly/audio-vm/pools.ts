import { Float32Arena } from './arenas'
import { ArrayBufferPool } from './array-buffer-pool'
import { FastArray } from './lib/fast-array'
import { ValueScope } from './value-scope'
import { VmState } from './vm-state'
import { ArraySlotResult, BufferEntry, CallFrame, Cell, ClosureEnv, FunctionDef, FunctionInstance, StepEntry,
  TryBlock } from './vm-types'

export { ArrayBufferPool } from './array-buffer-pool'

/** Object pools for CallFrame, Cell, ClosureEnv, FunctionDef, etc. */
export class FastArrayPool<T> {
  private pool: FastArray<FastArray<T>>
  private bufferPool: ArrayBufferPool<T> | null
  created: i32 = 0
  returned: i32 = 0

  constructor(bufferPool: ArrayBufferPool<T> | null = null) {
    this.pool = new FastArray<FastArray<T>>()
    this.bufferPool = bufferPool
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  acquire(): FastArray<T> {
    if (this.pool.length > 0) return this.pool.pop()
    this.created++
    return new FastArray<T>(16, this.bufferPool)
  }

  release(a: FastArray<T>): void {
    a.clear()
    this.returned++
    this.pool.push(a)
  }
}

export class FunctionDefPool {
  private pool: FastArray<FunctionDef>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<FunctionDef>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(bytecodeArena: Float32Arena, functionId: i32, paramCount: i32, firstParamIn: i32, closureCount: i32,
    localCount: i32, bytecodeLength: i32): FunctionDef
  {
    const bytecode: Float32Array = bytecodeArena.get(bytecodeLength)
    if (this.pool.length > 0) {
      const def: FunctionDef = this.pool.pop()
      bytecodeArena.release(def.bytecode)
      def.init(functionId, paramCount, firstParamIn, closureCount, localCount, bytecode, bytecodeLength)
      return def
    }
    this.created++
    return new FunctionDef(functionId, paramCount, firstParamIn, closureCount, localCount, bytecode, bytecodeLength)
  }

  // @inline
  release(bytecodeArena: Float32Arena, def: FunctionDef): void {
    bytecodeArena.release(def.bytecode)
    this.returned++
    this.pool.push(def)
  }
}

export class FunctionInstancePool {
  private pool: FastArray<FunctionInstance>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<FunctionInstance>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(defId: i32, instanceId: i32, closureEnvId: i32): FunctionInstance {
    if (this.pool.length > 0) {
      const instance: FunctionInstance = this.pool.pop()
      instance.init(defId, instanceId, closureEnvId)
      return instance
    }
    this.created++
    return new FunctionInstance(defId, instanceId, closureEnvId)
  }

  // @inline
  release(instance: FunctionInstance): void {
    this.returned++
    this.pool.push(instance)
  }
}

export class ClosureEnvPool {
  private pool: FastArray<ClosureEnv>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<ClosureEnv>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(cells: FastArray<i32>): ClosureEnv {
    if (this.pool.length > 0) {
      const env: ClosureEnv = this.pool.pop()
      env.init(cells)
      return env
    }
    this.created++
    return new ClosureEnv(cells)
  }

  // @inline
  release(fastArrayI32Pool: FastArrayPool<i32>, env: ClosureEnv): void {
    fastArrayI32Pool.release(env.cells)
    this.returned++
    this.pool.push(env)
  }
}

export class CellPool {
  private pool: FastArray<Cell>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<Cell>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(value: f64, refcount: u32 = 1): Cell {
    if (this.pool.length > 0) {
      const cell: Cell = this.pool.pop()
      cell.init(value, refcount)
      return cell
    }
    this.created++
    return new Cell(value, refcount)
  }

  // @inline
  release(cell: Cell): void {
    this.returned++
    this.pool.push(cell)
  }
}

export class CallFramePool {
  private pool: FastArray<CallFrame>
  private bufferPool: ArrayBufferPool<i32> | null
  created: i32 = 0
  returned: i32 = 0

  constructor(bufferPool: ArrayBufferPool<i32> | null = null) {
    this.pool = new FastArray<CallFrame>()
    this.bufferPool = bufferPool
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(): CallFrame {
    if (this.pool.length > 0) return this.pool.pop()
    this.created++
    return new CallFrame(0, 0, 0, 0, null, -1, -1, false, 1, 0, 0, 0, 0, 0, -1, null, null, -1, false, 0, -1, -1, 0,
      null, this.bufferPool)
  }

  // @inline
  release(frame: CallFrame): void {
    this.returned++
    this.pool.push(frame)
  }
}

export class TryBlockPool {
  private pool: FastArray<TryBlock>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<TryBlock>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  // @inline
  acquire(catchPc: i32, finallyPc: i32, catchParam: i32, opsPtr: usize, opsLength: i32, stackTop: i32): TryBlock {
    if (this.pool.length > 0) {
      const block: TryBlock = this.pool.pop()
      block.init(catchPc, finallyPc, catchParam, opsPtr, opsLength, stackTop)
      return block
    }
    this.created++
    return new TryBlock(catchPc, finallyPc, catchParam, opsPtr, opsLength, stackTop)
  }

  // @inline
  release(block: TryBlock): void {
    this.returned++
    this.pool.push(block)
  }
}

export class StepEntryPool {
  private pool: FastArray<StepEntry>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<StepEntry>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  acquire(): StepEntry {
    if (this.pool.length > 0) {
      const entry: StepEntry = this.pool.pop()
      entry.currentIndex = 0
      entry.lastTrig = 0.0
      return entry
    }
    this.created++
    return new StepEntry()
  }

  release(entry: StepEntry): void {
    this.returned++
    this.pool.push(entry)
  }
}

export class BufferEntryPool {
  private pool: FastArray<BufferEntry>
  created: i32 = 0
  returned: i32 = 0

  constructor() {
    this.pool = new FastArray<BufferEntry>()
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  getPoolGrowCountRaw(): i32 {
    return this.pool.growCountRaw
  }

  acquire(buffer: Float32Array, lengthSamples: i32, sampleRate: f32): BufferEntry {
    if (this.pool.length > 0) {
      const entry: BufferEntry = this.pool.pop()
      entry.buffer = buffer
      entry.lengthSamples = lengthSamples
      entry.writeIndex = 0
      entry.sampleRate = sampleRate
      return entry
    }
    this.created++
    return new BufferEntry(buffer, lengthSamples, sampleRate)
  }

  release(entry: BufferEntry): void {
    this.returned++
    this.pool.push(entry)
  }
}

export class ArraySlotResultPool {
  private pool: FastArray<ArraySlotResult>
  created: i32 = 0
  returned: i32 = 0

  constructor(poolBuffer: ArrayBufferPool<ArraySlotResult> | null = null) {
    this.pool = new FastArray<ArraySlotResult>(16, poolBuffer)
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  acquire(): ArraySlotResult {
    if (this.pool.length > 0) return this.pool.pop()
    this.created++
    return new ArraySlotResult()
  }

  release(slot: ArraySlotResult): void {
    this.returned++
    this.pool.push(slot)
  }
}

export class ValueScopePool {
  private pool: FastArray<ValueScope>
  private bufferPool: ArrayBufferPool<f64> | null
  created: i32 = 0
  returned: i32 = 0

  constructor(bufferPool: ArrayBufferPool<f64> | null = null, poolBuffer: ArrayBufferPool<ValueScope> | null = null) {
    this.pool = new FastArray<ValueScope>(16, poolBuffer)
    this.bufferPool = bufferPool
  }

  resetCounters(): void {
    this.created = 0
    this.returned = 0
    this.pool.resetCounters()
  }

  acquire(vm: VmState): ValueScope {
    if (this.pool.length > 0) {
      const scope: ValueScope = this.pool.pop()
      scope.init(vm)
      return scope
    }
    this.created++
    return new ValueScope(vm, this.bufferPool)
  }

  // @inline
  release(scope: ValueScope): void {
    scope.releaseAll()
    this.returned++
    this.pool.push(scope)
  }
}
