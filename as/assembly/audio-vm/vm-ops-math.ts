import { RunParams } from './run-params'
import { RunResult } from './run-params'
import { binary, unary } from './runner'
import { ValueScope } from './value-scope'
import { AudioVmOp } from './vm-op'
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
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const tagged: f64 = vmStack.pop(vm)
  scope.track(tagged)
  const result: f64 = unary(vm, op, tagged, params.bufferLength)
  vm.valueScopePool.release(scope)
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
  const scope: ValueScope = vm.valueScopePool.acquire(vm)
  const right: f64 = vmStack.pop(vm)
  scope.track(right)
  const left: f64 = vmStack.pop(vm)
  scope.track(left)
  const result: f64 = binary(vm, op, left, right, params.bufferLength)
  vm.valueScopePool.release(scope)
  vmStack.push(vm, result, true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
