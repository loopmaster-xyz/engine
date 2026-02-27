import { encodeAudio, encodeScalar, encodeUndefined } from './constants'
import * as heap from './heap'
import { RunParams, RunResult } from './run-params'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

/** Read scalar from bytecode; push. */
export function handlePushScalar(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const value: f32 = load<f32>(opsPtr + (pc << 2))
  vmStack.push(vm, encodeScalar(value))
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}

/** Read audio ptr from bytecode; push. */
export function handlePushAudio(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const ptr: u32 = load<u32>(opsPtr + (pc << 2))
  vmStack.push(vm, encodeAudio(usize(ptr)))
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}

/** Push undefined. */
export function handlePushUndefined(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  vmStack.push(vm, encodeUndefined())
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Push copy of top of stack. */
export function handleDup(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const top: f64 = vm.stackTop > 0 ? vm.stack[vm.stackTop - 1] : encodeUndefined()
  vmStack.push(vm, top)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Release top (audio/cells) and pop. */
export function handlePop(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const tagged: f64 = vmStack.pop(vm)
  heap.releaseValue(vm, tagged)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
