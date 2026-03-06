// Ids must match src/live/compiler/math-registry.ts (MATH_UNARY, MATH_BINARY, MATH_TERNARY order)

import {
  abs,
  acos,
  asin,
  atan,
  ceil,
  clamp,
  cos,
  cube,
  exp,
  exp2,
  floor,
  fold,
  fract,
  heaviside,
  hypot,
  isinf,
  isnan,
  lerp,
  log10,
  log2,
  logMath,
  max,
  min,
  modFn,
  pingpong,
  round,
  safediv,
  select,
  sign,
  sin,
  smootherstep,
  smoothstep,
  snap,
  sqrt,
  square,
  stepFn,
  swing,
  tan,
  tanh,
  trunc,
  wrap,
} from '../util'
import {
  decodeAudio,
  decodeScalar,
  encodeAudio,
  encodeScalar,
  encodeUndefined,
  isAudio,
  isCellRef,
  isScalar,
} from './constants'
import * as heap from './heap'
import { RunParams } from './run-params'
import { RunResult } from './run-params'
import { readOperandI32 } from './util'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

// @ts-ignore

function applyUnary(id: i32, x: f32): f32 {
  switch (id) {
    case 0:
      return sin(x)
    case 1:
      return cos(x)
    case 2:
      return tan(x)
    case 3:
      return asin(x)
    case 4:
      return acos(x)
    case 5:
      return atan(x)
    case 6:
      return tanh(x)
    case 7:
      return abs(x)
    case 8:
      return sqrt(x)
    case 9:
      return square(x)
    case 10:
      return cube(x)
    case 11:
      return logMath(x)
    case 12:
      return exp(x)
    case 13:
      return log10(x)
    case 14:
      return log2(x)
    case 15:
      return exp2(x)
    case 16:
      return floor(x)
    case 17:
      return ceil(x)
    case 18:
      return round(x)
    case 19:
      return trunc(x)
    case 20:
      return fract(x)
    case 21:
      return sign(x)
    case 22:
      return isnan(x)
    case 23:
      return isinf(x)
    case 24:
      return heaviside(x)
    case 25:
      return x
    case 26:
      return x
    default:
      return 0.0
  }
}

// @ts-ignore
// @inline
function unaryIdReturnsScalar(id: i32): bool {
  return id == 25 || id == 26
}

// @ts-ignore

function applyBinary(id: i32, a: f32, b: f32): f32 {
  switch (id) {
    case 0:
      return min(a, b)
    case 1:
      return max(a, b)
    case 2:
      return hypot(a, b)
    case 3:
      return modFn(a, b)
    case 4:
      return snap(a, b)
    case 5:
      return stepFn(a, b)
    case 6:
      return safediv(a, b)
    case 7:
      return swing(a, b)
    default:
      return 0.0
  }
}

// @ts-ignore

function applyTernary(id: i32, a: f32, b: f32, c: f32): f32 {
  switch (id) {
    case 0:
      return clamp(a, b, c)
    case 1:
      return lerp(a, b, c)
    case 2:
      return wrap(a, b, c)
    case 3:
      return pingpong(a, b, c)
    case 4:
      return fold(a, b, c)
    case 5:
      return smoothstep(b, c, a)
    case 6:
      return smootherstep(b, c, a)
    case 7:
      return select(a, b, c)
    default:
      return 0.0
  }
}

// @ts-ignore

export function mathUnaryById(
  vm: VmState,
  id: i32,
  tagged: f64,
  bufferLength: i32,
  reuseOutputPtr: usize = 0,
): f64 {
  if (isCellRef(tagged)) tagged = vmOpsVars.resolveCellRef(vm, tagged)
  if (isScalar(tagged)) {
    const x: f32 = decodeScalar(tagged)
    return encodeScalar(applyUnary(id, x))
  }
  if (isAudio(tagged)) {
    const inputPtr: usize = decodeAudio(tagged)
    if (id == 25) {
      if (bufferLength <= 0) return encodeScalar(0.0)
      return encodeScalar(load<f32>(inputPtr))
    }
    if (id == 26) {
      if (bufferLength <= 0) return encodeScalar(0.0)
      let m: f32 = load<f32>(inputPtr)
      let input$: usize = inputPtr + 4
      for (let i: i32 = 1; i < bufferLength; i++) {
        const v: f32 = load<f32>(input$)
        if (v > m) m = v
        input$ += 4
      }
      return encodeScalar(m)
    }
    const procLen: i32 = (bufferLength + 15) & ~15
    let outputPtr: usize = reuseOutputPtr
    if (outputPtr == 0) outputPtr = vm.arena.get(procLen).dataStart
    let input$: usize = inputPtr
    let output$: usize = outputPtr
    let sample: f32
    for (let i: i32 = 0; i < procLen; i += 16) {
      unroll(16, () => {
        sample = load<f32>(input$)
        store<f32>(output$, applyUnary(id, sample))
        input$ += 4
        output$ += 4
      })
    }
    return encodeAudio(outputPtr)
  }
  return encodeUndefined()
}

// @ts-ignore

export function mathBinaryById(
  vm: VmState,
  id: i32,
  left: f64,
  right: f64,
  bufferLength: i32,
  reuseMode: i32 = 0,
): f64 {
  if (isCellRef(left)) left = vmOpsVars.resolveCellRef(vm, left)
  if (isCellRef(right)) right = vmOpsVars.resolveCellRef(vm, right)
  const leftIsAudio: bool = isAudio(left)
  const rightIsAudio: bool = isAudio(right)
  if (!leftIsAudio && !rightIsAudio) {
    const a: f32 = decodeScalar(left)
    const b: f32 = decodeScalar(right)
    return encodeScalar(applyBinary(id, a, b))
  }
  const procLen: i32 = (bufferLength + 15) & ~15
  const leftPtr: usize = leftIsAudio ? decodeAudio(left) : 0
  const rightPtr: usize = rightIsAudio ? decodeAudio(right) : 0
  const leftScalar: f32 = leftIsAudio ? 0.0 : decodeScalar(left)
  const rightScalar: f32 = rightIsAudio ? 0.0 : decodeScalar(right)
  let outputPtr: usize = 0
  if (reuseMode == 1 && leftIsAudio) outputPtr = leftPtr
  else if (reuseMode == 2 && rightIsAudio) outputPtr = rightPtr
  else outputPtr = vm.arena.get(procLen).dataStart
  let out$: usize = outputPtr
  if (leftIsAudio && rightIsAudio) {
    let left$: usize = leftPtr
    let right$: usize = rightPtr
    let la: f32
    let ra: f32
    for (let i: i32 = 0; i < procLen; i += 16) {
      unroll(16, () => {
        la = load<f32>(left$)
        ra = load<f32>(right$)
        store<f32>(out$, applyBinary(id, la, ra))
        left$ += 4
        right$ += 4
        out$ += 4
      })
    }
  }
  else if (leftIsAudio) {
    let left$: usize = leftPtr
    let la: f32
    for (let i: i32 = 0; i < procLen; i += 16) {
      unroll(16, () => {
        la = load<f32>(left$)
        store<f32>(out$, applyBinary(id, la, rightScalar))
        left$ += 4
        out$ += 4
      })
    }
  }
  else {
    let right$: usize = rightPtr
    let ra: f32
    for (let i: i32 = 0; i < procLen; i += 16) {
      unroll(16, () => {
        ra = load<f32>(right$)
        store<f32>(out$, applyBinary(id, leftScalar, ra))
        right$ += 4
        out$ += 4
      })
    }
  }
  return encodeAudio(outputPtr)
}

// @ts-ignore

export function mathTernaryById(
  vm: VmState,
  id: i32,
  a: f64,
  b: f64,
  c: f64,
  bufferLength: i32,
  reuseMode: i32 = 0,
): f64 {
  if (isCellRef(a)) a = vmOpsVars.resolveCellRef(vm, a)
  if (isCellRef(b)) b = vmOpsVars.resolveCellRef(vm, b)
  if (isCellRef(c)) c = vmOpsVars.resolveCellRef(vm, c)
  const aAudio: bool = isAudio(a)
  const bAudio: bool = isAudio(b)
  const cAudio: bool = isAudio(c)
  if (!aAudio && !bAudio && !cAudio) {
    const af: f32 = decodeScalar(a)
    const bf: f32 = decodeScalar(b)
    const cf: f32 = decodeScalar(c)
    return encodeScalar(applyTernary(id, af, bf, cf))
  }
  const procLen: i32 = (bufferLength + 15) & ~15
  const aPtr: usize = aAudio ? decodeAudio(a) : 0
  const bPtr: usize = bAudio ? decodeAudio(b) : 0
  const cPtr: usize = cAudio ? decodeAudio(c) : 0
  const aScalar: f32 = aAudio ? 0.0 : decodeScalar(a)
  const bScalar: f32 = bAudio ? 0.0 : decodeScalar(b)
  const cScalar: f32 = cAudio ? 0.0 : decodeScalar(c)
  let outputPtr: usize = 0
  if (reuseMode == 1 && aAudio) outputPtr = aPtr
  else if (reuseMode == 2 && bAudio) outputPtr = bPtr
  else if (reuseMode == 3 && cAudio) outputPtr = cPtr
  else outputPtr = vm.arena.get(procLen).dataStart
  let out$: usize = outputPtr
  let a$: usize = aPtr
  let b$: usize = bPtr
  let c$: usize = cPtr
  let av: f32
  let bv: f32
  let cv: f32
  for (let i: i32 = 0; i < procLen; i += 16) {
    unroll(16, () => {
      av = aAudio ? load<f32>(a$) : aScalar
      bv = bAudio ? load<f32>(b$) : bScalar
      cv = cAudio ? load<f32>(c$) : cScalar
      store<f32>(out$, applyTernary(id, av, bv, cv))
      if (aAudio) a$ += 4
      if (bAudio) b$ += 4
      if (cAudio) c$ += 4
      out$ += 4
    })
  }
  return encodeAudio(outputPtr)
}

/** Pop operand; apply math unary (by id from bytecode); push result. */
export function handleMathUnary(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const id: i32 = readOperandI32(opsPtr, pc)
  const taggedRaw: f64 = vmStack.pop(vm)
  const fromCellRef: bool = isCellRef(taggedRaw)
  const tagged: f64 = fromCellRef ? vmOpsVars.resolveCellRef(vm, taggedRaw) : taggedRaw
  let result: f64
  let reusedRawAudio: bool = false
  if (isScalar(tagged)) {
    result = encodeScalar(applyUnary(id, decodeScalar(tagged)))
  }
  else {
    const canReuse: bool = !unaryIdReturnsScalar(id)
      && isAudio(tagged)
      && !fromCellRef
      && vm.arena.canMutateByPtr(u32(decodeAudio(tagged)))
    const reusePtr: usize = canReuse ? decodeAudio(tagged) : 0
    result = mathUnaryById(vm, id, tagged, params.bufferLength, reusePtr)
    reusedRawAudio = canReuse && isAudio(taggedRaw)
  }
  if (!heap.isImmediateValue(taggedRaw) && !reusedRawAudio) heap.releaseManagedValue(vm, taggedRaw)
  vmStack.push(vm, result, true)
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}

/** Pop right, left; apply math binary by id; push result. */
export function handleMathBinary(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const id: i32 = readOperandI32(opsPtr, pc)
  const rightRaw: f64 = vmStack.pop(vm)
  const leftRaw: f64 = vmStack.pop(vm)
  const leftFromCellRef: bool = isCellRef(leftRaw)
  const rightFromCellRef: bool = isCellRef(rightRaw)
  const left: f64 = leftFromCellRef ? vmOpsVars.resolveCellRef(vm, leftRaw) : leftRaw
  const right: f64 = rightFromCellRef ? vmOpsVars.resolveCellRef(vm, rightRaw) : rightRaw
  let result: f64
  let reuseMode: i32 = 0
  if (isScalar(left) && isScalar(right)) {
    result = encodeScalar(applyBinary(id, decodeScalar(left), decodeScalar(right)))
  }
  else {
    if (isAudio(left) && !leftFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(left)))) {
      reuseMode = 1
    }
    else if (isAudio(right) && !rightFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(right)))) {
      reuseMode = 2
    }
    result = mathBinaryById(vm, id, left, right, params.bufferLength, reuseMode)
  }
  if (!heap.isImmediateValue(rightRaw) && !(reuseMode == 2 && isAudio(rightRaw))) heap.releaseManagedValue(vm, rightRaw)
  if (!heap.isImmediateValue(leftRaw) && !(reuseMode == 1 && isAudio(leftRaw))) heap.releaseManagedValue(vm, leftRaw)
  vmStack.push(vm, result, true)
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}

/** Pop c, b, a; apply math ternary by id; push result. */
export function handleMathTernary(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const id: i32 = readOperandI32(opsPtr, pc)
  const cRaw: f64 = vmStack.pop(vm)
  const bRaw: f64 = vmStack.pop(vm)
  const aRaw: f64 = vmStack.pop(vm)
  const aFromCellRef: bool = isCellRef(aRaw)
  const bFromCellRef: bool = isCellRef(bRaw)
  const cFromCellRef: bool = isCellRef(cRaw)
  const a: f64 = aFromCellRef ? vmOpsVars.resolveCellRef(vm, aRaw) : aRaw
  const b: f64 = bFromCellRef ? vmOpsVars.resolveCellRef(vm, bRaw) : bRaw
  const c: f64 = cFromCellRef ? vmOpsVars.resolveCellRef(vm, cRaw) : cRaw
  let result: f64
  let reuseMode: i32 = 0
  if (isScalar(a) && isScalar(b) && isScalar(c)) {
    result = encodeScalar(applyTernary(id, decodeScalar(a), decodeScalar(b), decodeScalar(c)))
  }
  else {
    if (isAudio(a) && !aFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(a)))) {
      reuseMode = 1
    }
    else if (isAudio(b) && !bFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(b)))) {
      reuseMode = 2
    }
    else if (isAudio(c) && !cFromCellRef && vm.arena.canMutateByPtr(u32(decodeAudio(c)))) {
      reuseMode = 3
    }
    result = mathTernaryById(vm, id, a, b, c, params.bufferLength, reuseMode)
  }
  if (!heap.isImmediateValue(cRaw) && !(reuseMode == 3 && isAudio(cRaw))) heap.releaseManagedValue(vm, cRaw)
  if (!heap.isImmediateValue(bRaw) && !(reuseMode == 2 && isAudio(bRaw))) heap.releaseManagedValue(vm, bRaw)
  if (!heap.isImmediateValue(aRaw) && !(reuseMode == 1 && isAudio(aRaw))) heap.releaseManagedValue(vm, aRaw)
  vmStack.push(vm, result, true)
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}
