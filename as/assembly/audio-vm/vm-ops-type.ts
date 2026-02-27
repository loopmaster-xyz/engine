import { encodeScalar, isArray, isAudio, isFunction, isScalar, isUndefined } from './constants'
import { RunParams, RunResult } from './run-params'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

/** Pop value; push 1 if pred(tagged) else 0; release popped. */
function handleIs(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
  pred: (tagged: f64) => bool,
): RunResult {
  const tagged: f64 = vmStack.pop(vm)
  vmStack.releaseValueTagged(vm, tagged)
  const result: f32 = pred(tagged) ? f32(1) : f32(0)
  vmStack.push(vm, encodeScalar(result))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop value; push 1 if undefined else 0. */
export function handleIsUndefined(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return handleIs(vm, pc, opsPtr, params, isUndefined)
}

/** Pop value; push 1 if scalar else 0. */
export function handleIsScalar(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return handleIs(vm, pc, opsPtr, params, isScalar)
}

/** Pop value; push 1 if audio else 0. */
export function handleIsAudio(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return handleIs(vm, pc, opsPtr, params, isAudio)
}

/** Pop value; push 1 if array else 0. */
export function handleIsArray(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return handleIs(vm, pc, opsPtr, params, isArray)
}

/** Pop value; push 1 if function else 0. */
export function handleIsFunction(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  return handleIs(vm, pc, opsPtr, params, isFunction)
}
