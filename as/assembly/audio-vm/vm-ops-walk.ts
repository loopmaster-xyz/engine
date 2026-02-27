// dprint-ignore-file

import { encodeAudio } from './constants'
import { GenSlot } from './gen-history'
import { resolveAndPushAbsolutePC, writeCallStackMetaToHistory, writeTaggedSampleAt } from './gen-op-helpers'
import * as genOpHelpers from './gen-op-helpers'
import { RunParams, RunResult } from './run-params'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { ArrayOpName, getArraySlotFromTagged, getElementAt } from './vm-ops-array'
import { wrapIndex } from './util'

function clamp01f32(x: f32): f32 {
  if (x < 0.0) return 0.0
  if (x > 1.0) return 1.0
  return x
}

/** Pop offset, swing, bar, array. For each sample: compute step index from time (bar length, swing); get array[stepIndex]; write that element's sample to output. Push output audio. */
export function handleWalk(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const offsetTagged: f64 = vmStack.pop(vm)
  const swingTagged: f64 = vmStack.pop(vm)
  const barTagged: f64 = vmStack.pop(vm)
  const arrayTagged: f64 = vmStack.pop(vm)

  const slot = getArraySlotFromTagged(vm, arrayTagged, ArrayOpName.Walk)
  const values: Float64Array = slot.values
  const arrLen: i32 = slot.length
  if (arrLen <= 0) {
    vm.arraySlotResultPool.release(slot)
    return genOpHelpers.pushSilenceAndReturn(vm, pc, opsPtr, params)
  }

  const barValue: f32 = Mathf.max(0.000001, genOpHelpers.scalarOrFirstSample(vm, barTagged))
  const swingValue: f32 = clamp01f32(genOpHelpers.scalarOrFirstSample(vm, swingTagged))
  const offsetResolved: f64 = vmOpsVars.resolveCellRef(vm, offsetTagged)
  const offsetSeconds: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetResolved)

  const sampleRate: f64 = f64(params.sampleRate)
  const samplesPerBar: f64 = f64(vm.samplesPerBar)
  const interval: f64 = f64(barValue) * samplesPerBar
  const offsetSamples: f64 = f64(offsetSeconds) * sampleRate

  const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(procLen)
  const outPtr: usize = output.dataStart
  const bl: i32 = params.bufferLength

  let recordIdx: i32 = -1

  for (let i: i32 = 0; i < bl; i++) {
    const globalSample: f64 = f64(params.sampleCount + i)
    let sample: f64 = globalSample - offsetSamples

    if (swingValue > 0.0) {
      const swingOffset: f64 = interval * f64(swingValue) * 0.5
      const beatIndex: i32 = i32(Math.floor(sample / interval))
      if ((beatIndex & 1) === 1) {
        sample -= swingOffset
      }
    }

    const stepIndex: i32 = i32(Math.max(0.0, Math.floor(sample / interval)))
    const idx: i32 = wrapIndex(stepIndex, arrLen)
    if (recordIdx < 0) {
      recordIdx = idx
    }
    const elem: f64 = getElementAt(vm, values, idx, arrLen)
    writeTaggedSampleAt(elem, outPtr, i)
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
  vmStack.push(vm, encodeAudio(outPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
