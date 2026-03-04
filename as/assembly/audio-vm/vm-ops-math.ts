import {
  isArray,
  decodeAudio,
  decodeScalar,
  encodeScalar,
  isAudio,
  isCellRef,
  isScalar,
  isUndefined,
} from './constants'
import * as heap from './heap'
import { MathOps } from './math-ops'
import { RunParams } from './run-params'
import { RunResult } from './run-params'
import { binary, unary } from './runner'
import { AudioVmOp } from './vm-op'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

/** Pop operand; apply op (audio or scalar); release popped; push result. */
export function handleUnary(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
  op: AudioVmOp,
): RunResult {
  const taggedRaw: f64 = vmStack.pop(vm)
  const fromCellRef: bool = isCellRef(taggedRaw)
  const tagged: f64 = fromCellRef ? vmOpsVars.resolveCellRef(vm, taggedRaw) : taggedRaw

  let result: f64
  let reusedRawAudio: bool = false
  if (isScalar(tagged)) {
    result = encodeScalar(MathOps.unaryScalar(op, decodeScalar(tagged)))
  }
  else {
    const canReuse: bool = isAudio(tagged)
      && !fromCellRef
      && vm.arena.canMutateByPtr(u32(decodeAudio(tagged)))
    const reusePtr: usize = canReuse ? decodeAudio(tagged) : 0
    result = unary(vm, op, tagged, params.bufferLength, reusePtr)
    reusedRawAudio = canReuse && isAudio(taggedRaw)
  }

  if (!heap.isImmediateValue(taggedRaw) && !reusedRawAudio) {
    heap.releaseManagedValue(vm, taggedRaw)
  }
  vmStack.push(vm, result, true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop right, left; apply op; release popped; push result. */
export function handleBinary(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
  op: AudioVmOp,
): RunResult {
  const rightRaw: f64 = vmStack.pop(vm)
  const leftRaw: f64 = vmStack.pop(vm)
  const leftFromCellRef: bool = isCellRef(leftRaw)
  const rightFromCellRef: bool = isCellRef(rightRaw)

  let left: f64 = leftFromCellRef ? vmOpsVars.resolveCellRef(vm, leftRaw) : leftRaw
  let right: f64 = rightFromCellRef ? vmOpsVars.resolveCellRef(vm, rightRaw) : rightRaw

  if (isUndefined(left)) left = encodeScalar(0.0)
  if (isUndefined(right)) right = encodeScalar(0.0)

  let result: f64
  let reuseMode: i32 = 0
  if (isScalar(left) && isScalar(right)) {
    result = encodeScalar(MathOps.binaryScalar(op, decodeScalar(left), decodeScalar(right)))
  }
  else {
    if (!isArray(left) && !isArray(right)) {
      if (isAudio(left) && !leftFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(left)))) {
        reuseMode = 1
      }
      else if (isAudio(right) && !rightFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(right)))) {
        reuseMode = 2
      }
    }
    result = binary(vm, op, left, right, params.bufferLength, reuseMode)
  }

  if (!heap.isImmediateValue(rightRaw) && !(reuseMode == 2 && isAudio(rightRaw))) heap.releaseManagedValue(vm, rightRaw)
  if (!heap.isImmediateValue(leftRaw) && !(reuseMode == 1 && isAudio(leftRaw))) heap.releaseManagedValue(vm, leftRaw)
  vmStack.push(vm, result, true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
