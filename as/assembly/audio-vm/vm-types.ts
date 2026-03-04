import { ArrayBufferPool } from './array-buffer-pool'
import { CellScope } from './cell-scope'
import { EMPTY_FLOAT64_ARRAY, encodeUndefined } from './constants'
import { FrameScope } from './frame-scope'
import { FastArray } from './lib/fast-array'

const EMPTY_FAST_ARRAY_I32: FastArray<i32> = new FastArray<i32>()

export class ArraySlotResult {
  values: Float64Array = EMPTY_FLOAT64_ARRAY
  length: i32 = 0
}

export class BufferEntry {
  buffer: Float32Array
  lengthSamples: i32
  writeIndex: i32
  sampleRate: f32

  constructor(buffer: Float32Array, lengthSamples: i32, sampleRate: f32) {
    this.buffer = buffer
    this.lengthSamples = lengthSamples
    this.writeIndex = 0
    this.sampleRate = sampleRate
  }
}

export class StepEntry {
  currentIndex: i32 = 0
  lastTrig: f32 = 0.0
}

/** VM types (CallFrame, Cell, FunctionDef, etc.). */
export class FunctionDef {
  functionId: i32
  paramCount: i32
  firstParamIn: i32
  closureCount: i32
  localCount: i32
  bytecode!: Float32Array
  bytecodeLength: i32
  bytecodeStartPC: i32
  sourceOpsPtr: usize

  constructor(functionId: i32, paramCount: i32, firstParamIn: i32, closureCount: i32, localCount: i32,
    bytecode: Float32Array, bytecodeLength: i32)
  {
    this.init(functionId, paramCount, firstParamIn, closureCount, localCount, bytecode, bytecodeLength)
  }

  // @inline
  init(functionId: i32, paramCount: i32, firstParamIn: i32, closureCount: i32, localCount: i32, bytecode: Float32Array,
    bytecodeLength: i32): void
  {
    this.functionId = functionId
    this.paramCount = paramCount
    this.firstParamIn = firstParamIn
    this.closureCount = closureCount
    this.localCount = localCount
    this.bytecode = bytecode
    this.bytecodeLength = bytecodeLength
    this.bytecodeStartPC = 0
    this.sourceOpsPtr = 0
  }
}

export class Cell {
  value: f64
  refcount: u32

  constructor(value: f64 = 0, refcount: u32 = 1) {
    this.value = value
    this.refcount = refcount
  }

  // @inline
  init(value: f64, refcount: u32 = 1): void {
    this.value = value
    this.refcount = refcount
  }
}

export class FunctionInstance {
  defId: i32
  instanceId: i32
  closureEnvId: i32

  constructor(defId: i32, instanceId: i32, closureEnvId: i32) {
    this.init(defId, instanceId, closureEnvId)
  }

  // @inline
  init(defId: i32, instanceId: i32, closureEnvId: i32): void {
    this.defId = defId
    this.instanceId = instanceId
    this.closureEnvId = closureEnvId
  }
}

export class ClosureEnv {
  cells: FastArray<i32>

  constructor(cells: FastArray<i32>) {
    this.cells = cells
  }

  // @inline
  init(cells: FastArray<i32>): void {
    this.cells = cells
  }
}

export class CallFrame {
  returnPc: i32
  returnOpsPtr: usize
  returnOpsLength: i32
  returnStackTop: i32
  localsSaved!: FastArray<i32>
  scope: FrameScope
  frameCells: CellScope
  closureEnvId: i32
  functionId: i32
  isOversample: bool
  oversampleFactor: i32
  savedSampleRate: f32
  savedNyquist: f32
  savedPiOverNyquist: f32
  savedBufferLength: i32
  savedSampleCount: f32
  tempClosureEnvId: i32
  tempArrayIds: FastArray<u32> | null
  closureOverride: Float64Array | null
  relativePC: i32
  stereoFirst: bool
  stereoLeftValue: f64
  stereoInstanceId: i32
  stereoClosureEnvId: i32
  stereoArgCount: i32
  stereoArgs: Float64Array | null

  constructor(
    returnPc: i32 = 0,
    returnOpsPtr: usize = 0,
    returnOpsLength: i32 = 0,
    returnStackTop: i32 = 0,
    localsSaved: FastArray<i32> | null = null,
    closureEnvId: i32 = -1,
    functionId: i32 = -1,
    isOversample: bool = false,
    oversampleFactor: i32 = 1,
    savedSampleRate: f32 = 0,
    savedNyquist: f32 = 0,
    savedPiOverNyquist: f32 = 0,
    savedBufferLength: i32 = 0,
    savedSampleCount: f32 = 0,
    tempClosureEnvId: i32 = -1,
    tempArrayIds: FastArray<u32> | null = null,
    closureOverride: Float64Array | null = null,
    relativePC: i32 = -1,
    stereoFirst: bool = false,
    stereoLeftValue: f64 = 0,
    stereoInstanceId: i32 = -1,
    stereoClosureEnvId: i32 = -1,
    stereoArgCount: i32 = 0,
    stereoArgs: Float64Array | null = null,
    bufferPool: ArrayBufferPool<i32> | null = null,
  ) {
    this.scope = new FrameScope(bufferPool)
    this.frameCells = new CellScope(bufferPool)
    this.init(
      returnPc,
      returnOpsPtr,
      returnOpsLength,
      returnStackTop,
      localsSaved != null ? localsSaved : EMPTY_FAST_ARRAY_I32,
      closureEnvId,
      functionId,
      isOversample,
      oversampleFactor,
      savedSampleRate,
      savedNyquist,
      savedPiOverNyquist,
      savedBufferLength,
      savedSampleCount,
      tempClosureEnvId,
      tempArrayIds,
      closureOverride,
      relativePC,
      stereoFirst,
      stereoLeftValue,
      stereoInstanceId,
      stereoClosureEnvId,
      stereoArgCount,
      stereoArgs,
    )
  }

  // @inline
  init(
    returnPc: i32,
    returnOpsPtr: usize,
    returnOpsLength: i32,
    returnStackTop: i32,
    localsSaved: FastArray<i32>,
    closureEnvId: i32,
    functionId: i32,
    isOversample: bool,
    oversampleFactor: i32,
    savedSampleRate: f32,
    savedNyquist: f32,
    savedPiOverNyquist: f32,
    savedBufferLength: i32,
    savedSampleCount: f32,
    tempClosureEnvId: i32,
    tempArrayIds: FastArray<u32> | null,
    closureOverride: Float64Array | null,
    relativePC: i32,
    stereoFirst: bool,
    stereoLeftValue: f64,
    stereoInstanceId: i32,
    stereoClosureEnvId: i32,
    stereoArgCount: i32,
    stereoArgs: Float64Array | null,
  ): void {
    this.returnPc = returnPc
    this.returnOpsPtr = returnOpsPtr
    this.returnOpsLength = returnOpsLength
    this.returnStackTop = returnStackTop
    this.localsSaved = localsSaved
    this.scope.locals.clear()
    this.frameCells.clear()
    this.closureEnvId = closureEnvId
    this.functionId = functionId
    this.isOversample = isOversample
    this.oversampleFactor = oversampleFactor
    this.savedSampleRate = savedSampleRate
    this.savedNyquist = savedNyquist
    this.savedPiOverNyquist = savedPiOverNyquist
    this.savedBufferLength = savedBufferLength
    this.savedSampleCount = savedSampleCount
    this.tempClosureEnvId = tempClosureEnvId
    this.tempArrayIds = tempArrayIds
    this.closureOverride = closureOverride
    this.relativePC = relativePC
    this.stereoFirst = stereoFirst
    this.stereoLeftValue = stereoLeftValue
    this.stereoInstanceId = stereoInstanceId
    this.stereoClosureEnvId = stereoClosureEnvId
    this.stereoArgCount = stereoArgCount
    this.stereoArgs = stereoArgs
  }
}

export class TryBlock {
  catchPc: i32
  finallyPc: i32
  catchParam: i32
  opsPtr: usize
  opsLength: i32
  stackTop: i32
  pendingReturn: bool
  returnValue: f64
  inHandler: bool

  constructor(catchPc: i32, finallyPc: i32, catchParam: i32, opsPtr: usize, opsLength: i32, stackTop: i32) {
    this.init(catchPc, finallyPc, catchParam, opsPtr, opsLength, stackTop)
  }

  // @inline
  init(catchPc: i32, finallyPc: i32, catchParam: i32, opsPtr: usize, opsLength: i32, stackTop: i32): void {
    this.catchPc = catchPc
    this.finallyPc = finallyPc
    this.catchParam = catchParam
    this.opsPtr = opsPtr
    this.opsLength = opsLength
    this.stackTop = stackTop
    this.pendingReturn = false
    this.returnValue = encodeUndefined()
    this.inHandler = false
  }
}
