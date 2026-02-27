import { decodeScalar, encodeScalar, encodeUndefined, isScalar } from './constants'
import { FastArray } from './lib/fast-array'
import { RunParams } from './run-params'
import { RunResult } from './run-params'
import { readOperandI32 } from './util'
import * as vmCells from './vm-cells'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { CallFrame, TryBlock } from './vm-types'

/** Set pc to operand offset (unconditional jump). */
export function handleJump(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const offset: i32 = readOperandI32(opsPtr, pc)
  return RunResult.normal(offset, opsPtr, params.opsLength)
}

/** Pop value; if falsy jump to offset else advance pc. */
export function handleJumpIfFalse(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const offset: i32 = readOperandI32(opsPtr, pc)
  pc++
  const tagged: f64 = vmStack.pop(vm)
  const value: f32 = isScalar(tagged) ? decodeScalar(tagged) : 0.0
  const nextPc: i32 = value == 0.0 ? offset : pc
  return RunResult.normal(nextPc, opsPtr, params.opsLength)
}

/** Pop value; if truthy jump to offset else advance pc. */
export function handleJumpIfTrue(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const offset: i32 = readOperandI32(opsPtr, pc)
  pc++
  const tagged: f64 = vmStack.pop(vm)
  const value: f32 = isScalar(tagged) ? decodeScalar(tagged) : 0.0
  const nextPc: i32 = value != 0.0 ? offset : pc
  return RunResult.normal(nextPc, opsPtr, params.opsLength)
}

/** Push try block (catchPc, finallyPc, catchParam) onto try stack. */
export function handlePushTryBlock(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const catchPc: i32 = readOperandI32(opsPtr, pc)
  pc++
  const finallyPc: i32 = readOperandI32(opsPtr, pc)
  pc++
  const catchParam: i32 = readOperandI32(opsPtr, pc)
  pc++
  const tryBlock: TryBlock = vm.tryBlockPool.acquire(catchPc, finallyPc, catchParam, opsPtr, params.opsLength,
    vm.stackTop)
  vm.tryStack.push(tryBlock)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** No-op at runtime (closure pushed at definition). */
export function handlePushClosure(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** No-op. */
export function handlePopScope(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop error value; unwind try stack to catch/finally; set pc and optionally store error in catch param. */
export function handleThrow(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  let currentPc: i32 = pc
  let currentOpsPtr: usize = opsPtr
  let currentOpsLength: i32 = params.opsLength
  const errorSlot: i32 = vm.stackTop - 1
  const errorValue: f64 = errorSlot >= 0 ? vm.stack[errorSlot] : encodeScalar(0.0)
  if (errorSlot >= 0) vmStack.pop(vm)
  let handled: bool = false
  while (!handled) {
    if (vm.tryStack.length > 0) {
      const tryBlock: TryBlock = vm.tryStack.get(vm.tryStack.length - 1)
      if (tryBlock.inHandler) {
        vm.tryBlockPool.release(vm.tryStack.pop())
        continue
      }
      vmStack.releaseStackRange(vm, tryBlock.stackTop, vm.stackTop)
      vm.stackTop = tryBlock.stackTop
      if (tryBlock.catchPc >= 0) {
        // Unwind to catch: store error in param, set pc to catch.
        tryBlock.inHandler = true
        currentOpsPtr = tryBlock.opsPtr
        currentOpsLength = tryBlock.opsLength
        if (tryBlock.catchParam >= 0) {
          while (vm.locals.length <= tryBlock.catchParam) {
            const cellIdx: i32 = vmCells.allocateCell(vm, encodeUndefined())
            vmCells.registerFrameCell(vm, cellIdx)
            vm.locals.push(cellIdx)
          }
          const catchCellIdx: i32 = vm.locals.get(tryBlock.catchParam)
          if (catchCellIdx >= 0 && catchCellIdx < vm.cells.length) vm.cells.get(catchCellIdx).value = errorValue
        }
        currentPc = tryBlock.catchPc
        handled = true
      }
      else if (tryBlock.finallyPc >= 0) {
        // Run finally and rethrow.
        currentOpsPtr = tryBlock.opsPtr
        currentOpsLength = tryBlock.opsLength
        currentPc = tryBlock.finallyPc
        handled = true
      }
    }
    else if (vm.callStack.length > 0) {
      const frame: CallFrame = vm.callStack.pop()
      if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
      vmCells.releaseFrameLocals(vm, frame, encodeUndefined())
      vm.locals.length = 0
      for (let i: i32 = 0; i < frame.localsSaved.length; i++) {
        vm.locals.push(frame.localsSaved.get(i))
      }
      vmStack.releaseStackRange(vm, frame.returnStackTop, vm.stackTop)
      vm.stackTop = frame.returnStackTop
      currentPc = frame.returnPc
      currentOpsPtr = frame.returnOpsPtr
      currentOpsLength = frame.returnOpsLength
      vm.fastArrayI32Pool.release(frame.localsSaved)
      if (frame.tempArrayIds != null) vm.fastArrayU32Pool.release(frame.tempArrayIds!)
      vm.callFramePool.release(frame)
    }
    else {
      handled = true
    }
  }
  return RunResult.normal(currentPc, currentOpsPtr, currentOpsLength)
}

/** Pop try block; run finally if present. */
export function handlePopTryBlock(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  let currentPc: i32 = pc
  let currentOpsPtr: usize = opsPtr
  let currentOpsLength: i32 = params.opsLength
  if (vm.tryStack.length > 0) {
    const tryBlock: TryBlock = vm.tryStack.pop()
      if (tryBlock.pendingReturn) {
      if (vm.callStack.length > 0) {
        const frame: CallFrame = vm.callStack.pop()
        if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
        vmCells.releaseFrameLocals(vm, frame, tryBlock.returnValue)
        vm.locals.length = 0
        for (let i: i32 = 0; i < frame.localsSaved.length; i++) {
          vm.locals.push(frame.localsSaved.get(i))
        }
        vmStack.releaseStackRange(vm, frame.returnStackTop, vm.stackTop)
        vm.stackTop = frame.returnStackTop
        vmStack.push(vm, tryBlock.returnValue)
        currentPc = frame.returnPc
        currentOpsPtr = frame.returnOpsPtr
        currentOpsLength = frame.returnOpsLength
        vm.fastArrayI32Pool.release(frame.localsSaved)
        if (frame.tempArrayIds != null) vm.fastArrayU32Pool.release(frame.tempArrayIds!)
        vm.callFramePool.release(frame)
      }
      vm.tryBlockPool.release(tryBlock)
    }
  }
  return RunResult.normal(currentPc, currentOpsPtr, currentOpsLength)
}
