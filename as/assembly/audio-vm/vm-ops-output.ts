import {
  decodeArray,
  decodeAudio,
  decodeCellRef,
  decodeScalar,
  encodeArray,
  encodeAudio,
  encodeScalar,
  isArray,
  isAudio,
  isCellRef,
  isScalar,
} from './constants'
import { GenSlot } from './gen-history'
import * as genOpHelpers from './gen-op-helpers'
import * as heap from './heap'
import { RunParams, RunResult } from './run-params'
import { isSameAudioPtr, readOperandI32, stackDump, taggedTypeName } from './util'
import { AudioVmOp } from './vm-op'
import { ArrayOpName, getArrayIndexOrThrow } from './vm-ops-array'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

function requireAudioOrScalar(tagged: f64, channelName: string, opName: string): void {
  if (!isAudio(tagged) && !isScalar(tagged)) {
    throw new Error(opName + ': ' + channelName + ' channel must be audio or scalar, got ' + taggedTypeName(tagged))
  }
}

function requireAudio(tagged: f64, slot: i32, opName: string): void {
  if (!isAudio(tagged)) {
    throw new Error(opName + ': slot ' + slot.toString() + ' expected audio but got ' + taggedTypeName(tagged))
  }
}

function mixOutsToBuffers(vm: VmState, params: RunParams, outputLPtr: usize, outputRPtr: usize): void {
  const outTop: i32 = params.outTop
  if (outTop <= 0) return
  const bufferLength: i32 = params.bufferLength
  const simdLength: i32 = bufferLength & ~3
  let slot: i32 = 0
  while (slot < outTop) {
    assert(slot >= 0 && slot + 2 <= vm.outTop, 'handlePost: slot bounds')
    if (params.hadSolo && vm.solos[slot >> 1] == 0) {
      slot += 2
      continue
    }
    const taggedL: f64 = vm.outs[slot]
    const taggedR: f64 = vm.outs[slot + 1]
    requireAudio(taggedL, slot, '(L) handlePost')
    requireAudio(taggedR, slot + 1, '(R) handlePost')
    const ptrL: usize = decodeAudio(taggedL)
    const ptrR: usize = decodeAudio(taggedR)
    let simdOffset: usize = 0
    for (let i: i32 = 0; i < simdLength; i += 4) {
      v128.store(
        outputLPtr + simdOffset,
        f32x4.add(v128.load(outputLPtr + simdOffset), v128.load(ptrL + simdOffset)),
      )
      v128.store(
        outputRPtr + simdOffset,
        f32x4.add(v128.load(outputRPtr + simdOffset), v128.load(ptrR + simdOffset)),
      )
      simdOffset += 16
    }
    for (let i: i32 = simdLength; i < bufferLength; i++) {
      const sampleOffset: usize = usize(i) << 2
      store<f32>(outputLPtr + sampleOffset, load<f32>(outputLPtr + sampleOffset) + load<f32>(ptrL + sampleOffset))
      store<f32>(outputRPtr + sampleOffset, load<f32>(outputRPtr + sampleOffset) + load<f32>(ptrR + sampleOffset))
    }
    slot += 2
  }
}

/** Pop argCount operands (1 or 2); expand to L/R (array → two elements, mono → dup); push L,R to outs as solo. */
export function handleOutSolo(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const argCount: i32 = readOperandI32(opsPtr, pc)
  pc++

  if (argCount < 1 || argCount > 2) {
    throw new Error(`OutSolo: invalid argCount=${argCount} (must be 1 or 2)`)
  }
  // stackDump(vm)
  if (vm.stackTop < argCount) {
    stackDump(vm)
    throw new Error(`OutSolo: not enough stack (stackTop=${vm.stackTop}, argCount=${argCount})`)
  }

  // Check if this is the end of a solo block (opcode is at pc-2; pc was incremented past op then past argCount)
  const isSoloEnd: bool = (load<u32>(opsPtr + ((pc - 2) << 2)) as AudioVmOp) == AudioVmOp.Solo

  if (argCount == 1) {
    let arg: f64 = vmStack.pop(vm)
    if (isCellRef(arg)) {
      arg = vmOpsVars.resolveCellRef(vm, arg)
    }

    if (isArray(arg)) {
      const id: u32 = decodeArray(arg)
      const idx: i32 = getArrayIndexOrThrow(vm, id, ArrayOpName.OutSolo)
      const values: Float64Array = vm.arrays.get(idx)
      const len: i32 = vm.arrayLengths.get(idx)

      let tagL: f64 = len > 0 ? values[0] : encodeScalar(0.0)
      let tagR: f64 = len > 1 ? values[1] : tagL

      if (isCellRef(tagL)) {
        tagL = vmOpsVars.resolveCellRef(vm, tagL)
      }
      if (isCellRef(tagR)) {
        tagR = vmOpsVars.resolveCellRef(vm, tagR)
      }

      const samePtr: bool = isSameAudioPtr(tagL, tagR)
      vmStack.push(vm, tagL)
      vmStack.push(vm, tagR, samePtr)
    }
    else {
      // Duplicate mono signal to both channels (one retain; second push is move to avoid extra ref)
      vmStack.push(vm, arg)
      vmStack.push(vm, arg, true)
    }
  }

  if (vm.stackTop < 2) {
    throw new Error(`OutSolo: stack underflow after expansion (stackTop=${vm.stackTop})`)
  }

  let captureR: f64 = vmStack.pop(vm)
  let captureL: f64 = vmStack.pop(vm)
  if (isCellRef(captureL)) captureL = vmOpsVars.resolveCellRef(vm, captureL)
  if (isCellRef(captureR)) captureR = vmOpsVars.resolveCellRef(vm, captureR)

  requireAudioOrScalar(captureL, 'L', 'OutSolo')
  requireAudioOrScalar(captureR, 'R', 'OutSolo')

  // Convert scalars to audio buffers (do not push to stack — captureL/R go to pushOut).
  if (isScalar(captureL)) captureL = genOpHelpers.scalarToAudioEncoded(vm, captureL, params.bufferLength)
  if (isScalar(captureR)) captureR = genOpHelpers.scalarToAudioEncoded(vm, captureR, params.bufferLength)

  if (!isAudio(captureL) || !isAudio(captureR)) {
    throw new Error('OutSolo: internal error - captured values should be audio after conversion')
  }

  vmStack.pushOut(vm, captureL, captureR, isSoloEnd)
  params.outTop = vm.outTop
  if (isSoloEnd) params.hadSolo = true

  if (vm.outGenPoolIndex >= 0) {
    const opPc: i32 = pc - 1
    const slot: GenSlot = vm.genPools[vm.outGenPoolIndex].get()
    genOpHelpers.resolveAndPushAbsolutePC(vm, opPc)
    genOpHelpers.writeCallStackMetaToSlot(vm, slot)
    if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
    const captureLeftPtr: usize = decodeAudio(captureL)
    const captureRightPtr: usize = decodeAudio(captureR)
    genOpHelpers.writeStereoChunkToHistoryRing(slot.history, captureLeftPtr, captureRightPtr, params.bufferLength)
  }

  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Pop argCount operands; expand to L/R; mix outs (solo wins) and push stereo array. */
export function handlePost(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  vm.postPcForMixHistory = pc - 1
  const outTop: i32 = params.outTop
  assert(outTop >= 0 && outTop <= vm.outTop, 'handlePost: outTop bounds')

  if (vm.outputLeft.length < params.bufferLength || vm.outputRight.length < params.bufferLength) {
    if (vm.outputLeft.length > 0) vm.arena.release(vm.outputLeft)
    if (vm.outputRight.length > 0) vm.arena.release(vm.outputRight)
    vm.outputLeft = vm.arena.get(params.bufferLength)
    vm.outputRight = vm.arena.get(params.bufferLength)
  }
  const outputLPtr: usize = vm.outputLeft.dataStart
  const outputRPtr: usize = vm.outputRight.dataStart

  memory.fill(outputLPtr, 0, usize(params.bufferLength) << 2)
  memory.fill(outputRPtr, 0, usize(params.bufferLength) << 2)

  mixOutsToBuffers(vm, params, outputLPtr, outputRPtr)

  vm.arena.retain(u32(outputLPtr))
  vm.arena.retain(u32(outputRPtr))
  const stereoArr: Float64Array = vm.float64Arena.get(2)
  stereoArr[0] = encodeAudio(outputLPtr)
  stereoArr[1] = encodeAudio(outputRPtr)
  vm.arrays.push(stereoArr)
  vm.arrayLengths.push(2)
  vm.arrayRefcounts.push(0)

  const arrId: u32 = u32(vm.arrays.length)
  vmStack.releaseOutsRange(vm, 0, outTop)
  params.outTop = 0
  vm.outTop = 0
  vmStack.push(vm, encodeArray(arrId))

  return RunResult.normal(pc, opsPtr, params.opsLength)
}

export function applyMixResultToOutput(vm: VmState, bufferLength: i32): void {
  const tagged: f64 = vmStack.pop(vm)

  if (!isArray(tagged)) {
    heap.releaseValue(vm, tagged)
    return
  }
  const id: u32 = decodeArray(tagged)
  const mixIdx: i32 = getArrayIndexOrThrow(vm, id, ArrayOpName.ApplyMixResultToOutput)
  const arr: Float64Array = vm.arrays.get(mixIdx)
  const len: i32 = vm.arrayLengths.get(mixIdx)
  if (len != 2) throw new Error('applyMixResultToOutput: mix array must have length 2')

  const L: f64 = vmOpsVars.resolveCellRef(vm, arr[0])
  const R: f64 = vmOpsVars.resolveCellRef(vm, arr[1])
  if (!isAudio(L) || !isAudio(R)) {
    heap.releaseArray(vm, id)
    return
  }

  const ptrL: usize = decodeAudio(L)
  const ptrR: usize = decodeAudio(R)

  if (vm.outputLeft.length < bufferLength || vm.outputRight.length < bufferLength) {
    throw new Error('applyMixResultToOutput: output buffers too small')
  }

  if (vm.outputLeft.dataStart != ptrL) memory.copy(vm.outputLeft.dataStart, ptrL, usize(bufferLength) << 2)
  if (vm.outputRight.dataStart != ptrR) memory.copy(vm.outputRight.dataStart, ptrR, usize(bufferLength) << 2)

  if (vm.mixGenPoolIndex >= 0 && vm.postPcForMixHistory >= 0) {
    const slot: GenSlot = vm.genPools[vm.mixGenPoolIndex].get()
    vm.absolutePCCallStack[0] = vm.postPcForMixHistory
    vm.absolutePCCallStackTop = 1
    genOpHelpers.writeCallStackMetaToSlot(vm, slot)
    vm.absolutePCCallStackTop = 0
    const mixOutL: usize = vm.outputLeft.dataStart
    const mixOutR: usize = vm.outputRight.dataStart
    genOpHelpers.writeStereoChunkToHistoryRing(slot.history, mixOutL, mixOutR, bufferLength)
    vm.postPcForMixHistory = -1
  }

  heap.releaseArray(vm, id)
}
