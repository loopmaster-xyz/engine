// dprint-ignore-file
import { decodeAudio, decodeCellRef, encodeAudio, isAudio, isCellRef } from './constants'
import * as heap from './heap'
import { stackDump } from './util'
import * as vmOpsVars from './vm-ops-vars'
import { VmState } from './vm-state'

/** Push value onto stack; retain unless move. */
// @ts-ignore
// @inline
export function push(vm: VmState, value: f64, move: bool = false): void {
  if (vm.stackTop >= vm.stackCapacity) {
    ensureStackCapacity(vm, vm.stackTop + 1)
  }
  if (vm.stackTop < 0) {
    stackDump(vm)
    throw new Error(`push: stackTop=${vm.stackTop} is negative (should be >=0)`)
  }
  if (vm.stackTop >= vm.stack.length) {
    stackDump(vm)
    throw new Error(`push: stack overflow (stackTop=${vm.stackTop}, stackCapacity=${vm.stackCapacity})`)
  }
  if (!move) heap.retainValue(vm, value)
  vm.stack[vm.stackTop] = value
  vm.stackTop++
}

/** Pop and return top of stack. */
// @ts-ignore
// @inline
export function pop(vm: VmState): f64 {
  if (vm.stackTop < 0) {
    stackDump(vm)
    throw new Error(`pop: stackTop=${vm.stackTop} is negative (should be >=0)`)
  }
  if (vm.stackTop === 0) {
    stackDump(vm)
    throw new Error(`pop: stack underflow (stackTop=${vm.stackTop}, stackCapacity=${vm.stackCapacity})`)
  }
  vm.stackTop--
  return vm.stack[vm.stackTop]
}

// @ts-ignore
// @inline
export function ensureStackCapacity(vm: VmState, required: i32): void {
  if (required < 1) required = 1
  if (required <= vm.stackCapacity) return

  let capacity: i32 = 1
  while (capacity < required) capacity <<= 1

  const nextStack: Float64Array = vm.float64Arena.get(capacity)
  if (vm.stackTop > 0) {
    memory.copy(nextStack.dataStart, vm.stack.dataStart, usize(vm.stackTop) << 3)
  }
  if (vm.stackCapacity > 0) vm.float64Arena.release(vm.stack)
  vm.stack = nextStack
  vm.stackCapacity = capacity
}

// @ts-ignore
// @inline
export function ensureOutsCapacity(vm: VmState, requiredStereoOuts: i32): void {
  const required: i32 = requiredStereoOuts <= 0 ? 2 : (requiredStereoOuts << 1)
  if (required <= vm.outsCapacity) return

  let capacity: i32 = 2
  while (capacity < required) capacity <<= 1

  const nextOuts: Float64Array = vm.float64Arena.get(capacity)
  const nextSolos: Int32Array = vm.int32Arena.get(capacity >> 1)
  if (vm.outTop > 0) {
    memory.copy(nextOuts.dataStart, vm.outs.dataStart, usize(vm.outTop) << 3)
    memory.copy(nextSolos.dataStart, vm.solos.dataStart, usize(vm.outTop >> 1) << 2)
  }
  if (vm.outsCapacity > 0) {
    vm.float64Arena.release(vm.outs)
    vm.int32Arena.release(vm.solos)
  }
  vm.outs = nextOuts
  vm.solos = nextSolos
  vm.outsCapacity = capacity
}

// @ts-ignore
// @inline
export function pushOut(vm: VmState, L: f64, R: f64, isSolo: bool): void {
  ensureOutsCapacity(vm, (vm.outTop >> 1) + 1)
  vm.outs[vm.outTop] = L
  vm.outs[vm.outTop + 1] = R
  vm.solos[vm.outTop >> 1] = isSolo ? 1 : 0
  vm.outTop += 2
}

// @ts-ignore
// @inline
export function popOut(vm: VmState): void {
  if (vm.outTop < 2) throw new Error('popOut: outs empty')
  releaseOutsRange(vm, vm.outTop - 2, vm.outTop)
  vm.outTop -= 2
}

// @ts-ignore
// @inline
export function releaseAudioIfUnreferenced(vm: VmState, tagged: f64): void {
  let value: f64 = tagged
  if (isCellRef(value)) {
    const cellIdx: i32 = decodeCellRef(value)
    value = vm.cells.get(cellIdx).value
  }
  if (!isAudio(value)) return
  vm.arena.releaseByPtr(u32(decodeAudio(value)))
}

/** Release tagged value (audio, array, cell-ref). */
// @ts-ignore
// @inline
export function releaseValueTagged(vm: VmState, tagged: f64): void {
  heap.releaseValue(vm, vmOpsVars.resolveCellRef(vm, tagged))
}

/** Retain tagged value (audio, array, cell-ref). */
// @ts-ignore
// @inline
export function retainValueTagged(vm: VmState, tagged: f64): void {
  heap.retainValue(vm, vmOpsVars.resolveCellRef(vm, tagged))
}

/** Copy audio buffer to new arena buffer and push (caller ensures audioTagged is audio). */
export function pushAudioCopy(vm: VmState, audioTagged: f64, length: i32): void {
  audioTagged = vmOpsVars.resolveCellRef(vm, audioTagged)
  const ptr: usize = decodeAudio(audioTagged)
  const out: Float32Array = vm.arena.get(length)
  memory.copy(out.dataStart, ptr, usize(length) << 2)
  push(vm, encodeAudio(out.dataStart), true) // move: arena.get returns new buffer, we own it
}

// @ts-ignore
// @inline
export function releaseOutsRange(vm: VmState, from: i32, to: i32): void {
  if (from < 0) from = 0
  if (to <= from) return
  if (to > vm.outTop) to = vm.outTop
  assert(from >= 0 && to <= vm.outTop, 'releaseOutsRange: bounds')

  for (let i: i32 = from; i < to; i++) {
    heap.releaseValue(vm, vm.outs[i])
  }
}

// @ts-ignore
// @inline
export function releaseStackAndOutsValues(vm: VmState): void {
  for (let i: i32 = 0; i < vm.stackTop; i++) {
    heap.releaseValue(vm, vm.stack[i])
  }
  for (let i: i32 = 0; i < vm.outTop; i++) {
    heap.releaseValue(vm, vm.outs[i])
  }
}

// @ts-ignore
// @inline
export function releaseStackRange(vm: VmState, from: i32, to: i32): void {
  if (from < 0) from = 0
  if (to <= from) return
  if (to > vm.stackTop) to = vm.stackTop
  assert(from >= 0 && to <= vm.stackTop, 'releaseStackRange: bounds')

  for (let i: i32 = from; i < to; i++) {
    heap.releaseValue(vm, vm.stack[i])
  }
}

