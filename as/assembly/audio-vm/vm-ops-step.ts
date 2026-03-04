// dprint-ignore-file

import { decodeAudio, decodeScalar, encodeAudio, isAudio, isScalar } from './constants'
import { GenSlot } from './gen-history'
import { resolveAndPushAbsolutePC, writeCallStackMetaToHistory, writeTaggedSampleAt } from './gen-op-helpers'
import * as genOpHelpers from './gen-op-helpers'
import { RunParams, RunResult } from './run-params'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { StepEntry } from './vm-state'
import { ArrayOpName, getArraySlotFromTagged, getElementAt } from './vm-ops-array'
import { wrapIndex } from './util'

/** Pop trig and array. Scalar trig: advance index on rising edge, output array[index] (constant per block). Audio trig: per-sample rising edge advances index; output array[index] per sample. Push output audio. */
export function handleStep(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const callSiteId: i32 = i32(load<u32>(opsPtr + (pc << 2)))
  pc++

  const trigTagged: f64 = vmStack.pop(vm)
  const arrayTagged: f64 = vmStack.pop(vm)

  const slot = getArraySlotFromTagged(vm, arrayTagged, ArrayOpName.Step)
  const values: Float64Array = slot.values
  const arrLen: i32 = slot.length
  if (arrLen <= 0) {
    vm.arraySlotResultPool.release(slot)
    return genOpHelpers.pushSilenceAndReturn(vm, pc, opsPtr, params)
  }

  let entry: StepEntry
  const existing: StepEntry | null = vm.stepRegistry.tryGet(callSiteId)
  if (existing != null) {
    entry = existing
  } else {
    entry = vm.stepEntryPool.acquire()
    vm.stepRegistry.set(callSiteId, entry)
  }

  const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(procLen)
  const outPtr: usize = output.dataStart
  const bl: i32 = params.bufferLength

  const trigResolved: f64 = vmOpsVars.resolveCellRef(vm, trigTagged)

  let recordIdx: i32 = -1

  if (isScalar(trigResolved)) {
    // Scalar trig: one index for whole block.
    const trigVal: f32 = decodeScalar(trigResolved)
    if (trigVal > 0.0 && entry.lastTrig <= 0.0) {
      entry.currentIndex++
    }
    entry.lastTrig = trigVal
    const idx: i32 = wrapIndex(entry.currentIndex, arrLen)
    recordIdx = idx
    const elem: f64 = getElementAt(vm, values, idx, arrLen)
    const outVal: f32 = genOpHelpers.scalarOrFirstSample(vm, elem)
    for (let i: i32 = 0; i < bl; i++) {
      store<f32>(outPtr + (usize(i) << 2), outVal)
    }
  }
  else if (isAudio(trigResolved)) {
    // Audio trig: index can change per sample.
    const trigPtr: usize = decodeAudio(trigResolved)
    let recorded: bool = false
    for (let i: i32 = 0; i < bl; i++) {
      const trig: f32 = load<f32>(trigPtr + (usize(i) << 2))
      if (trig > 0.0 && entry.lastTrig <= 0.0) {
        entry.currentIndex++
      }
      entry.lastTrig = trig
      const idx: i32 = wrapIndex(entry.currentIndex, arrLen)
      const elem: f64 = getElementAt(vm, values, idx, arrLen)
      if (!recorded) {
        recordIdx = idx
        recorded = true
      }
      writeTaggedSampleAt(elem, outPtr, i)
    }
  }
  else {
    memory.fill(outPtr, 0, usize(procLen) << 2)
  }

  if (vm.arrayGetGenPoolIndex >= 0 && recordIdx >= 0) {
    const slotHistory: GenSlot = vm.genPools[vm.arrayGetGenPoolIndex].get()
    resolveAndPushAbsolutePC(vm, pc - 1)
    writeCallStackMetaToHistory(vm, slotHistory.history)
    vm.paramScratch[0] = f32(recordIdx)
    slotHistory.history.write(params.sampleCount, vm.paramScratch)
    if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  }

  vm.arraySlotResultPool.release(slot)
  vmStack.releaseValueTagged(vm, trigTagged)
  vmStack.releaseValueTagged(vm, arrayTagged)
  vmStack.push(vm, encodeAudio(outPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
