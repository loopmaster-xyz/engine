import {
  decodeArray,
  decodeAudio,
  decodeCellRef,
  decodeFunction,
  decodeScalar,
  encodeArray,
  encodeAudio,
  encodeCellRef,
  encodeFunction,
  encodeScalar,
  encodeUndefined,
  isArray,
  isAudio,
  isCellRef,
  isFunction,
  isScalar,
  isUndefined,
} from './constants'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { RunParams, RunResult } from './run-params'
import { downsample, VmState } from './runner'
import { readOperandI32, taggedTypeName } from './util'
import * as vmCells from './vm-cells'
import * as vmStack from './vm-stack'
import { CallFrame, Cell, ClosureEnv, FunctionDef, FunctionInstance, TryBlock } from './vm-types'

const STEREO_SECOND_PASS_RELATIVE_PC: i32 = -2147483647

/** Assign value to cell (release old; caller owns value e.g. from pop). */
export function assignCell(vm: VmState, cell: Cell, value: f64): void {
  const old: f64 = cell.value
  cell.value = value
  heap.releaseValue(vm, old)
}

/** Release stack range (each slot owns its value). */
export function releaseStackRangeWithFullStackCheck(vm: VmState, from: i32, to: i32): void {
  if (from < 0) from = 0
  if (to <= from) return
  if (to > vm.stackTop) to = vm.stackTop
  for (let i: i32 = from; i < to; i++) {
    heap.releaseValue(vm, vm.stack[i])
  }
}

export function scheduleReleaseAudio(vm: VmState, ptr: usize): void {
  vm.arena.releaseByPtr(u32(ptr))
}

export function flushPendingReleaseAudio(vm: VmState): void {
  vm.arena.drainPendingFree()
  vm.pendingReleaseAudio.clear()
}

export function getCellValue(vm: VmState, cellIdx: i32): f64 {
  return vmCells.getCellValue(vm, cellIdx)
}

/** If tagged is a cell ref, return the cell value; otherwise return tagged. */
export function resolveCellRef(vm: VmState, tagged: f64): f64 {
  if (isCellRef(tagged)) return getCellValue(vm, decodeCellRef(tagged))
  return tagged
}

/** Release audio in cell; set to undefined. Keeps scalars/functions. */
export function releaseAudioInCell(vm: VmState, cell: Cell): void {
  const resolved: f64 = resolveCellRef(vm, cell.value)
  if (isAudio(resolved)) {
    heap.releaseValue(vm, cell.value)
    cell.value = encodeUndefined()
  }
}

/** Push system global (e.g. sampleRate) by index. */
export function handleGetSystem(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  if (index == 4) {
    vmStack.push(vm, encodeUndefined())
  }
  else {
    let value: f32 = 0.0
    if (index == 0) value = f32(params.sampleCount) / vm.samplesPerBeat
    else if (index == 1) value = vm.samplesPerBeat
    else if (index == 2) value = vm.samplesPerBar
    else if (index == 3) value = vm.co
    vmStack.push(vm, encodeScalar(value))
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push global at operand index (resolve cell ref). */
export function handleGetGlobal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  while (index >= 0 && vm.globals.length <= index) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
  if (index >= 0 && index < vm.globals.length) {
    vmStack.push(vm, resolveCellRef(vm, vm.cells.get(vm.globals.get(index)).value))
  }
  else {
    throw new Error(`handleGetGlobal: global index ${index} out of bounds (globals.length=${vm.globals.length})`)
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push local at operand index. */
export function handleGetLocal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  if (index >= 0 && index < vm.locals.length) {
    vmStack.push(vm, resolveCellRef(vm, vm.cells.get(vm.locals.get(index)).value))
  }
  else vmStack.push(vm, encodeUndefined())
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop value; assign to global (release old if audio). */
export function handleSetGlobal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  const value: f64 = vmStack.pop(vm)
  if (index < 0) throw new Error(`handleSetGlobal: global index ${index} out of bounds`)
  while (vm.globals.length <= index) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
  const cellIdx: i32 = vm.globals.get(index)
  if (cellIdx >= 0 && cellIdx < vm.cells.length) {
    assignCell(vm, vm.cells.get(cellIdx), value)
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop value; assign to local (release old, retain new if audio). */
export function handleSetLocal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  const value: f64 = vmStack.pop(vm)
  if (index < 0) throw new Error(`handleSetLocal: local index ${index} out of bounds`)
  while (vm.locals.length <= index) {
    const cellIdx: i32 = vmCells.allocateCell(vm, encodeUndefined())
    vmCells.registerFrameCell(vm, cellIdx)
    vm.locals.push(cellIdx)
  }
  const cellIdx: i32 = vm.locals.get(index)
  if (cellIdx >= 0 && cellIdx < vm.cells.length) {
    assignCell(vm, vm.cells.get(cellIdx), value)
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push closure slot value (resolve cell ref). */
export function handleGetClosure(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const closureIndex: i32 = readOperandI32(opsPtr, pc)
  pc++
  if (vm.callStack.length == 0) {
    vmStack.push(vm, encodeUndefined())
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
  if (frame.closureEnvId < 0) {
    vmStack.push(vm, encodeUndefined())
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const env: ClosureEnv | null = vm.closureEnvs.tryGet(frame.closureEnvId)
  if (env == null || closureIndex >= env.cells.length) {
    vmStack.push(vm, encodeUndefined())
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const ov: Float64Array | null = frame.closureOverride
  if (ov != null && closureIndex < ov.length) {
    const overrideValue: f64 = ov[closureIndex]
    if (!isUndefined(overrideValue)) {
      // Retain when pushing so each consumer (e.g. multiple ad(trig) calls) gets a valid ref; closure override releases on frame pop
      vmStack.push(vm, overrideValue, false)
      return RunResult.normal(pc, opsPtr, params.opsLength)
    }
  }
  vmStack.push(vm, resolveCellRef(vm, vm.cells.get(env.cells.get(closureIndex)).value))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop value; set closure slot (release old, retain new if audio). */
export function handleSetClosure(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const closureIndex: i32 = readOperandI32(opsPtr, pc)
  pc++
  const value: f64 = vmStack.pop(vm)
  if (vm.callStack.length == 0) {
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
  if (frame.closureEnvId < 0) {
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const env: ClosureEnv | null = vm.closureEnvs.tryGet(frame.closureEnvId)
  if (env == null || closureIndex >= env.cells.length) {
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const ov: Float64Array | null = frame.closureOverride
  const cellIdx: i32 = env.cells.get(closureIndex)
  if (ov != null && closureIndex < ov.length) {
    const old: f64 = ov[closureIndex]
    ov[closureIndex] = value
    vmStack.releaseValueTagged(vm, old)
  }
  if (cellIdx >= 0 && cellIdx < vm.cells.length) {
    assignCell(vm, vm.cells.get(cellIdx), value)
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push cell ref (not value) for local. */
export function handleGetCellRefLocal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  while (index >= 0 && vm.locals.length <= index) {
    const cellIdx: i32 = vmCells.allocateCell(vm, encodeUndefined())
    vmCells.registerFrameCell(vm, cellIdx)
    vm.locals.push(cellIdx)
  }
  if (index >= 0 && index < vm.locals.length) vmStack.push(vm, encodeCellRef(vm.locals.get(index)))
  else vmStack.push(vm, encodeCellRef(-1))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push cell ref (not value) for global. */
export function handleGetCellRefGlobal(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const index: i32 = readOperandI32(opsPtr, pc)
  pc++
  while (index >= 0 && vm.globals.length <= index) {
    vm.globals.push(vmCells.allocateCell(vm, encodeUndefined()))
  }
  if (index >= 0 && index < vm.globals.length) vmStack.push(vm, encodeCellRef(vm.globals.get(index)))
  else vmStack.push(vm, encodeCellRef(-1))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push cell ref (not value) for closure. */
export function handleGetCellRefClosure(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const closureIndex: i32 = readOperandI32(opsPtr, pc)
  pc++
  if (vm.callStack.length == 0) {
    vmStack.push(vm, encodeCellRef(-1))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
  if (frame.closureEnvId < 0) {
    vmStack.push(vm, encodeCellRef(-1))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  const env: ClosureEnv | null = vm.closureEnvs.tryGet(frame.closureEnvId)
  if (env != null && closureIndex >= 0 && closureIndex < env.cells.length) {
    vmStack.push(vm, encodeCellRef(env.cells.get(closureIndex)))
  }
  else {
    vmStack.push(vm, encodeCellRef(-1))
  }
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Register function from bytecode (params, bytecode length, etc.); advance pc past definition. */
export function handleDefineFunction(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const functionId: i32 = readOperandI32(opsPtr, pc)
  pc++
  const paramCount: i32 = readOperandI32(opsPtr, pc)
  pc++
  const firstParamIn: i32 = readOperandI32(opsPtr, pc)
  pc++
  const closureCount: i32 = readOperandI32(opsPtr, pc)
  pc++
  const localCount: i32 = readOperandI32(opsPtr, pc)
  pc++
  const bytecodeLength: i32 = readOperandI32(opsPtr, pc)
  pc++
  const bytecodeStart: i32 = pc
  let needsBytecodeCopy: bool = true
  let funcDef: FunctionDef | null = vm.functions.tryGet(functionId)
  if (funcDef != null) {
    const sameDefinition: bool = funcDef.paramCount == paramCount
      && funcDef.firstParamIn == firstParamIn
      && funcDef.closureCount == closureCount
      && funcDef.localCount == localCount
      && funcDef.bytecodeLength == bytecodeLength
    if (!sameDefinition) {
      funcDef.functionId = functionId
      funcDef.paramCount = paramCount
      funcDef.firstParamIn = firstParamIn
      funcDef.closureCount = closureCount
      funcDef.localCount = localCount
      funcDef.bytecodeLength = bytecodeLength
      if (funcDef.bytecode.length < bytecodeLength) {
        vm.float32Arena.release(funcDef.bytecode)
        funcDef.bytecode = vm.float32Arena.get(bytecodeLength)
      }
    }
    else if (funcDef.sourceOpsPtr == opsPtr && funcDef.bytecodeStartPC == bytecodeStart) {
      needsBytecodeCopy = false
    }
  }
  else {
    funcDef = vm.functionDefPool.acquire(
      vm.float32Arena,
      functionId,
      paramCount,
      firstParamIn,
      closureCount,
      localCount,
      bytecodeLength,
    )
    vm.functions.set(functionId, funcDef)
  }
  const fd: FunctionDef = funcDef
  if (needsBytecodeCopy) {
    for (let i: i32 = 0; i < bytecodeLength; i++) {
      fd.bytecode[i] = load<f32>(opsPtr + ((bytecodeStart + i) << 2))
    }
    fd.sourceOpsPtr = opsPtr
    fd.bytecodeStartPC = bytecodeStart
  }
  pc += bytecodeLength
  let instanceId: i32 = functionId
  let closureEnvId: i32 = -1
  if (closureCount > 0) {
    const cells: FastArray<i32> = vm.fastArrayI32Pool.acquire()
    cells.clear()
    cells.reserve(closureCount)
    for (let i: i32 = 0; i < closureCount; i++) cells.push(-1)
    for (let i: i32 = closureCount - 1; i >= 0; i--) {
      const tagged: f64 = vmStack.pop(vm)
      const cellIdx: i32 = isCellRef(tagged) ? decodeCellRef(tagged) : -1
      const idx: i32 = cellIdx >= 0 && cellIdx < vm.cells.length ? cellIdx : -1
      cells.set(i, idx)
      if (idx >= 0) heap.retainCell(vm, idx)
      heap.releaseValue(vm, tagged)
    }
    closureEnvId = vm.nextClosureEnvId++
    const env: ClosureEnv = vm.closureEnvPool.acquire(cells)
    vm.closureEnvs.set(closureEnvId, env)
    instanceId = i32(u32(vm.nextInstanceId++) | 0x80000000)
    const instance: FunctionInstance = vm.functionInstancePool.acquire(functionId, instanceId, closureEnvId)
    vm.functionInstances.set(instanceId, instance)
  }
  vmStack.push(vm, encodeFunction(u32(instanceId)))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop args and callable; push call frame; jump to function bytecode. */
export function handleCallFunction(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const relativePC: i32 = pc - 1
  const argCount: i32 = readOperandI32(opsPtr, pc)
  pc++
  const funcIdSlot: i32 = vm.stackTop - 1
  if (funcIdSlot < 0) throw new Error('CallFunction: stack underflow')
  let funcTagged: f64 = resolveCellRef(vm, vm.stack[funcIdSlot])
  if (!isFunction(funcTagged)) {
    throw new Error(
      'CallFunction: callee is not a function (got ' + taggedTypeName(funcTagged) + '), argCount='
        + argCount.toString(),
    )
  }
  const instanceId: i32 = i32(decodeFunction(funcTagged))
  const argsStart: i32 = funcIdSlot - argCount
  let closureEnvId: i32 = -1
  let funcDef: FunctionDef | null = null
  const instance: FunctionInstance | null = vm.functionInstances.tryGet(instanceId)
  if (instance != null) {
    funcDef = vm.functions.tryGet(instance.defId)
    closureEnvId = instance.closureEnvId
  }
  else {
    funcDef = vm.functions.tryGet(instanceId)
  }
  if (funcDef == null) {
    throw new Error(`CallFunction: function instanceId=${instanceId} not in VM (argCount=${argCount})`)
  }
  const fd: FunctionDef = funcDef
  const savedLocals: FastArray<i32> = vm.fastArrayI32Pool.acquire()
  for (let i: i32 = 0; i < vm.locals.length; i++) savedLocals.push(vm.locals.get(i))
  const callFunctionId: i32 = fd.functionId
  // Push caller's absolute PC so history can source-map inner gens to the user call site
  let callerAbsolutePC: i32 = relativePC
  if (vm.callStack.length > 0) {
    const callerFrame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
    const callerDef: FunctionDef | null = vm.functions.tryGet(callerFrame.functionId)
    if (callerDef != null) {
      callerAbsolutePC = callerDef.bytecodeStartPC + relativePC
    }
  }

  if (fd.firstParamIn == 2 && argCount >= 1 && argsStart >= 0 && argsStart < vm.stackTop) {
    const firstArg: f64 = resolveCellRef(vm, vm.stack[argsStart])
    if (!isArray(firstArg)) {
      const arr: Float64Array = vm.float64Arena.get(2)
      heap.retainValue(vm, firstArg)
      arr[0] = firstArg
      arr[1] = firstArg
      vm.arrays.push(arr)
      vm.arrayLengths.push(2)
      vm.arrayRefcounts.push(0)
      vm.stack[argsStart] = encodeArray(u32(vm.arrays.length))
    }
  }

  if (fd.firstParamIn == 1 && argCount >= 1 && argsStart >= 0 && argsStart < vm.stackTop) {
    const firstArg: f64 = resolveCellRef(vm, vm.stack[argsStart])
    if (isArray(firstArg)) {
      const arrId: u32 = decodeArray(firstArg)
      if (arrId > 0 && arrId <= u32(vm.arrays.length)) {
        const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
        const len: i32 = vm.arrayLengths.get(i32(arrId) - 1)
        if (len == 2) {
          const left: f64 = arr[0]
          const right: f64 = arr[1]
          heap.retainValue(vm, left)
          heap.retainValue(vm, right)
          vm.stack[argsStart] = left
          const stereoArgs: Float64Array = vm.float64Arena.get(argCount)
          stereoArgs[0] = right
          for (let j: i32 = 1; j < argCount; j++) {
            const idx: i32 = argsStart + j
            const argValue: f64 = idx >= 0 && idx < vm.stackTop ? vm.stack[idx] : encodeUndefined()
            heap.retainValue(vm, argValue)
            stereoArgs[j] = argValue
          }
          // Create separate savedLocals for stereo frame to avoid shared reference bug
          const stereoSavedLocals: FastArray<i32> = vm.fastArrayI32Pool.acquire()
          for (let i: i32 = 0; i < savedLocals.length; i++) {
            stereoSavedLocals.push(savedLocals.get(i))
          }
          const stereoFrame: CallFrame = vm.callFramePool.acquire()
          stereoFrame.init(pc, opsPtr, params.opsLength, argsStart, stereoSavedLocals, closureEnvId, callFunctionId,
            false, 1, 0, 0, 0, 0, 0, -1, null, null, relativePC, true, 0, instanceId, closureEnvId, argCount,
            stereoArgs)
          vm.callStack.push(stereoFrame)
          if (vm.absolutePCCallStackTop < 8) {
            vm.absolutePCCallStack[vm.absolutePCCallStackTop++] = callerAbsolutePC
          }
          vm.locals.clear()
          const localCount: i32 = fd.localCount > 0 ? fd.localCount : fd.paramCount
          for (let i: i32 = 0; i < localCount; i++) {
            const stackIdx: i32 = argsStart + i
            const val: f64 = resolveCellRef(vm, i < argCount && stackIdx >= 0 && stackIdx < vm.stackTop
              ? vm.stack[stackIdx]
              : encodeUndefined())
            const cellIdx: i32 = vmCells.allocateCell(vm, val)
            vmCells.registerFrameCell(vm, cellIdx)
            vm.locals.push(cellIdx)
            vmStack.retainValueTagged(vm, val)
          }
          // Release the savedLocals since stereo case handles its own frame
          vm.fastArrayI32Pool.release(savedLocals)
          return RunResult.normal(0, fd.bytecode.dataStart, fd.bytecodeLength)
        }
      }
    }
  }

  const frame: CallFrame = vm.callFramePool.acquire()
  frame.init(pc, opsPtr, params.opsLength, argsStart, savedLocals, closureEnvId, callFunctionId, false, 1, 0, 0, 0, 0,
    0, -1, null, null, relativePC, false, 0, -1, -1, 0, null)
  vm.callStack.push(frame)
  if (vm.absolutePCCallStackTop < 8) {
    vm.absolutePCCallStack[vm.absolutePCCallStackTop++] = callerAbsolutePC
  }
  vm.locals.clear()
  const localCount: i32 = fd.localCount > 0 ? fd.localCount : fd.paramCount
  for (let i: i32 = 0; i < localCount; i++) {
    const stackIdx: i32 = argsStart + i
    const val: f64 = resolveCellRef(vm, i < argCount && stackIdx >= 0 && stackIdx < vm.stackTop
      ? vm.stack[stackIdx]
      : encodeUndefined())
    const cellIdx: i32 = vmCells.allocateCell(vm, val)
    vmCells.registerFrameCell(vm, cellIdx)
    vm.locals.push(cellIdx)
    vmStack.retainValueTagged(vm, val)
  }
  // Record callbacks are compiled with Pop, Pop (seconds, callback). When called with 0 args we only have func on stack; push dummy so the second Pop does not consume the caller's slot.
  if (argCount == 0) vmStack.push(vm, encodeUndefined())
  return RunResult.normal(0, fd.bytecode.dataStart, fd.bytecodeLength)
}

/** Pop return value; unwind frame; push value in caller. */
export function handleReturn(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  if (vm.callStack.length == 0) throw new Error('Return: callStack empty')
  const returnSlot: i32 = vm.stackTop - 1
  let returnValue: f64 = resolveCellRef(vm, returnSlot >= 0 ? vm.stack[returnSlot] : encodeUndefined())
  if (vm.tryStack.length > 0) {
    const tryBlock: TryBlock = vm.tryStack.get(vm.tryStack.length - 1)
    if (tryBlock.finallyPc >= 0 && !tryBlock.pendingReturn) {
      tryBlock.pendingReturn = true
      tryBlock.returnValue = returnValue
      return RunResult.normal(tryBlock.finallyPc, opsPtr, params.opsLength)
    }
    else if (tryBlock.pendingReturn) {
      tryBlock.returnValue = returnValue
    }
  }
  let frame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
  if (frame.stereoFirst && frame.stereoArgs != null) {
    frame.stereoLeftValue = returnValue
    vmStack.retainValueTagged(vm, frame.stereoLeftValue)
    if (frame.returnStackTop < returnSlot) releaseStackRangeWithFullStackCheck(vm, frame.returnStackTop, returnSlot)
    // Return slot ownership is replaced by stereoLeftValue retain above.
    releaseStackRangeWithFullStackCheck(vm, returnSlot, returnSlot + 1)
    if (returnSlot + 1 < vm.stackTop) releaseStackRangeWithFullStackCheck(vm, returnSlot + 1, vm.stackTop)
    vm.stackTop = frame.returnStackTop + 1
    for (let i: i32 = 0; i < frame.stereoArgCount; i++) {
      vmStack.push(vm, frame.stereoArgs![i])
    }
    vmStack.push(vm, encodeFunction(u32(frame.stereoInstanceId)))
    let secondFd: FunctionDef | null = null
    const inst: FunctionInstance | null = vm.functionInstances.tryGet(frame.stereoInstanceId)
    if (inst != null) {
      secondFd = vm.functions.tryGet(inst.defId)
    }
    else {
      secondFd = vm.functions.tryGet(frame.stereoInstanceId)
    }
    if (secondFd == null) throw new Error('Return stereo: function not found')
    const fd2: FunctionDef = secondFd
    vmCells.releaseFrameLocals(vm, frame, frame.stereoLeftValue)
    const secondArgsStart: i32 = vm.stackTop - 1 - frame.stereoArgCount
    const secondLocalsSaved: FastArray<i32> = vm.fastArrayI32Pool.acquire()
    for (let i: i32 = 0; i < frame.localsSaved.length; i++) secondLocalsSaved.push(frame.localsSaved.get(i))
    const secondFrame: CallFrame = vm.callFramePool.acquire()
    secondFrame.init(frame.returnPc, frame.returnOpsPtr, frame.returnOpsLength, secondArgsStart, secondLocalsSaved,
      frame.stereoClosureEnvId, frame.functionId, false, 1, 0, 0, 0, 0, 0, -1, null, null,
      STEREO_SECOND_PASS_RELATIVE_PC, false, 0, -1, -1, 0, null)
    vm.callStack.push(secondFrame)
    vm.locals.clear()
    const localCount2: i32 = fd2.localCount > 0 ? fd2.localCount : fd2.paramCount
    for (let i: i32 = 0; i < localCount2; i++) {
      const stackIdx: i32 = secondArgsStart + i
      const val: f64 = i < frame.stereoArgCount && stackIdx >= 0 && stackIdx < vm.stack.length
        ? vm.stack[stackIdx]
        : encodeUndefined()
      const cellIdx: i32 = vmCells.allocateCell(vm, val)
      vmCells.registerFrameCell(vm, cellIdx)
      vm.locals.push(cellIdx)
      vmStack.retainValueTagged(vm, val)
    }
    return RunResult.normal(0, fd2.bytecode.dataStart, fd2.bytecodeLength)
  }

  frame = vm.callStack.pop()
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--

  if (vm.callStack.length > 0) {
    const prevFrame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
    if (prevFrame.stereoFirst && prevFrame.stereoArgs != null && frame.relativePC == STEREO_SECOND_PASS_RELATIVE_PC) {
      let L: f64 = prevFrame.stereoLeftValue
      if (!isAudio(L) && !isScalar(L) && (isAudio(returnValue) || isScalar(returnValue))) {
        L = returnValue
      }
      vm.callStack.pop()
      if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
      heap.releaseValuesInTaggedArray(vm, prevFrame.stereoArgs!, prevFrame.stereoArgs!.length)
      vm.float64Arena.release(prevFrame.stereoArgs!)
      if (frame.returnStackTop < returnSlot) releaseStackRangeWithFullStackCheck(vm, frame.returnStackTop, returnSlot)
      if (returnSlot + 1 < vm.stackTop) releaseStackRangeWithFullStackCheck(vm, returnSlot + 1, vm.stackTop)
      vmCells.releaseFrameLocals(vm, frame, returnValue)
      const stereoArr: Float64Array = vm.float64Arena.get(2)
      stereoArr[0] = L
      stereoArr[1] = returnValue
      vm.arrays.push(stereoArr)
      vm.arrayLengths.push(2)
      vm.arrayRefcounts.push(0)
      const newArrId: u32 = u32(vm.arrays.length)
      const stereoResult: f64 = encodeArray(newArrId)
      vm.locals.length = 0
      for (let i: i32 = 0; i < prevFrame.localsSaved.length; i++) {
        vm.locals.push(prevFrame.localsSaved.get(i))
      }
      vm.stackTop = prevFrame.returnStackTop
      vmStack.push(vm, stereoResult)
      const returnPc: i32 = prevFrame.returnPc
      const returnOpsPtr: usize = prevFrame.returnOpsPtr
      const returnOpsLength: i32 = prevFrame.returnOpsLength
      vm.fastArrayI32Pool.release(frame.localsSaved)
      if (frame.tempArrayIds != null) vm.fastArrayU32Pool.release(frame.tempArrayIds!)
      vm.callFramePool.release(frame)
      vm.fastArrayI32Pool.release(prevFrame.localsSaved)
      vm.callFramePool.release(prevFrame)
      return RunResult.normal(returnPc, returnOpsPtr, returnOpsLength)
    }
  }

  // Release stack items that are NOT the return value first (full-stack check so caller's slots are not released)
  if (frame.returnStackTop < returnSlot) releaseStackRangeWithFullStackCheck(vm, frame.returnStackTop, returnSlot)
  if (returnSlot + 1 < vm.stackTop) releaseStackRangeWithFullStackCheck(vm, returnSlot + 1, vm.stackTop)

  if (frame.isOversample) {
    const factor: i32 = frame.oversampleFactor
    if (isScalar(returnValue)) {
      // pass through
    }
    else if (factor > 1 && isAudio(returnValue)) {
      const oversampledPtr: usize = decodeAudio(returnValue)
      const output: Float32Array = vm.arena.get(frame.savedBufferLength)
      const outputPtr: usize = output.dataStart
      if (vm.perfCountersEnabled) vm.perfCounters[7]++
      downsample(changetype<VmState>(vm), oversampledPtr, outputPtr, frame.savedBufferLength, factor)
      vm.arena.releaseByPtr(u32(oversampledPtr))
      returnValue = encodeAudio(outputPtr)
    }
    else if (factor > 1 && isArray(returnValue)) {
      const arrId: u32 = decodeArray(returnValue)
      if (arrId > 0 && arrId <= u32(vm.arrays.length)) {
        const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
        const arrLen: i32 = vm.arrayLengths.get(i32(arrId) - 1)
        if (arrLen == 2) {
          const leftTagged: f64 = arr[0]
          const rightTagged: f64 = arr[1]
          if (isAudio(leftTagged) && isAudio(rightTagged)) {
            const oversampledLeftPtr: usize = decodeAudio(leftTagged)
            const oversampledRightPtr: usize = decodeAudio(rightTagged)
            const outputLeft: Float32Array = vm.arena.get(frame.savedBufferLength)
            const outputRight: Float32Array = vm.arena.get(frame.savedBufferLength)
            const outputLeftPtr: usize = outputLeft.dataStart
            const outputRightPtr: usize = outputRight.dataStart
            if (vm.perfCountersEnabled) vm.perfCounters[7]++
            downsample(changetype<VmState>(vm), oversampledLeftPtr, outputLeftPtr, frame.savedBufferLength, factor)
            if (vm.perfCountersEnabled) vm.perfCounters[7]++
            downsample(changetype<VmState>(vm), oversampledRightPtr, outputRightPtr, frame.savedBufferLength, factor)
            vm.arena.releaseByPtr(u32(oversampledLeftPtr))
            vm.arena.releaseByPtr(u32(oversampledRightPtr))
            const newArr: Float64Array = vm.float64Arena.get(2)
            newArr[0] = encodeAudio(outputLeftPtr)
            newArr[1] = encodeAudio(outputRightPtr)
            vm.arrays.push(newArr)
            vm.arrayLengths.push(2)
            vm.arrayRefcounts.push(0)
            const newArrId: u32 = u32(vm.arrays.length)
            returnValue = encodeArray(newArrId)
          }
        }
      }
    }
    const closureOv: Float64Array | null = frame.closureOverride
    let env: ClosureEnv | null = null
    if (closureOv != null && factor > 1 && frame.closureEnvId >= 0) {
      env = vm.closureEnvs.tryGet(frame.closureEnvId)
    }
    if (closureOv != null && env != null) {
      const n: i32 = env.cells.length
      // Do not release audio in closureOv: passed to inner via GetClosure (push with move), already released there
      for (let i: i32 = 0; i < n; i++) {
        const cellIdx: i32 = env.cells.get(i)
        if (cellIdx < 0 || cellIdx >= vm.cells.length) continue
        const v: f64 = closureOv[i]
        if (isUndefined(v)) {
        }
        else if (isAudio(v)) {
          // closureOverride owns one ref per captured upsampled audio (plus any explicit
          // retains for deduplicated cache hits). Inner GetClosure pushes retain/release
          // balanced refs, so we must drop this frame-owned ref here.
          vm.arena.releaseByPtr(u32(decodeAudio(v)))
        }
        else if (isArray(v)) {
          const arrId: u32 = decodeArray(v)
          if (arrId > 0 && arrId <= u32(vm.arrays.length)) {
            const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
            const arrLen: i32 = vm.arrayLengths.get(i32(arrId) - 1)
            const newArr: Float64Array = vm.float64Arena.get(arrLen)
            for (let j: i32 = 0; j < arrLen; j++) {
              const e: f64 = arr[j]
              if (isAudio(e)) {
                const oversampledPtr: usize = decodeAudio(e)
                const output: Float32Array = vm.arena.get(frame.savedBufferLength)
                const outputPtr: usize = output.dataStart
                if (vm.perfCountersEnabled) vm.perfCounters[7]++
                downsample(changetype<VmState>(vm), oversampledPtr, outputPtr, frame.savedBufferLength, factor)
                newArr[j] = encodeAudio(outputPtr)
              }
              else {
                heap.retainValue(vm, e)
                newArr[j] = e
              }
            }
            vm.arrays.push(newArr)
            vm.arrayLengths.push(arrLen)
            vm.arrayRefcounts.push(0)
            const newArrEnc: f64 = encodeArray(u32(vm.arrays.length))
            closureOv[i] = newArrEnc
            vm.cells.get(cellIdx).value = newArrEnc
            // oversampled array elements released when tempArrayIds arrays are released below (array element release)
            for (let j: i32 = 0; j < arrLen; j++) {
              const e: f64 = arr[j]
              vmStack.releaseValueTagged(vm, e)
            }
            if (arr.length > 0) vm.float64Arena.release(arr)
            vm.arrays.set(i32(arrId) - 1, VmState.EMPTY_FLOAT64_ARRAY)
            vm.arrayLengths.set(i32(arrId) - 1, 0)
            vm.arrayRefcounts.set(i32(arrId) - 1, 0)
          }
          else {
            vm.cells.get(cellIdx).value = v
          }
        }
        else {
          vm.cells.get(cellIdx).value = v
        }
      }
    }
    const arrayIds: FastArray<u32> | null = frame.tempArrayIds
    if (arrayIds != null) {
      for (let i: i32 = 0; i < arrayIds.length; i++) {
        const id: u32 = arrayIds.get(i)
        if (id == 0 || id > u32(vm.arrays.length)) continue
        const idx: i32 = i32(id) - 1
        const arr: Float64Array = vm.arrays.get(idx)
        const arrLen: i32 = vm.arrayLengths.get(idx)
        const n: i32 = arrLen < arr.length ? arrLen : arr.length
        for (let j: i32 = 0; j < n; j++) {
          const e: f64 = arr[j]
          vmStack.releaseValueTagged(vm, e)
        }
        if (arr.length > 0) vm.float64Arena.release(arr)
        vm.arrays.set(idx, VmState.EMPTY_FLOAT64_ARRAY)
        vm.arrayLengths.set(idx, 0)
      }
    }
    if (closureOv != null) vm.float64Arena.release(closureOv)
    params.sampleRate = frame.savedSampleRate
    params.nyquist = frame.savedNyquist
    params.piOverNyquist = frame.savedPiOverNyquist
    params.bufferLength = frame.savedBufferLength
    params.sampleCount = i32(frame.savedSampleCount)
  }

  vmCells.releaseFrameLocals(vm, frame, returnValue)
  vm.locals.length = 0
  for (let i: i32 = 0; i < frame.localsSaved.length; i++) {
    vm.locals.push(frame.localsSaved.get(i))
  }
  vm.stackTop = frame.returnStackTop
  vmStack.push(vm, returnValue, isAudio(returnValue))
  const returnPc: i32 = frame.returnPc
  const returnOpsPtr: usize = frame.returnOpsPtr
  const returnOpsLength: i32 = frame.returnOpsLength
  vm.fastArrayI32Pool.release(frame.localsSaved)
  if (frame.tempArrayIds != null) vm.fastArrayU32Pool.release(frame.tempArrayIds!)
  vm.callFramePool.release(frame)
  return RunResult.normal(returnPc, returnOpsPtr, returnOpsLength)
}
