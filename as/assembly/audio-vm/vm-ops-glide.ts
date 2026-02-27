// dprint-ignore-file

import { encodeAudio, encodeScalar } from './constants'
import * as genOpHelpers from './gen-op-helpers'
import { RunParams, RunResult } from './run-params'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'
import { ArrayOpName, getArraySlotFromTagged, getElementAt } from './vm-ops-array'
import { applyCurve } from '../util'
import { wrapIndex } from './util'

/** Pop exponent, bar, array. For each sample: compute step index and frac from time (bar length); get array[idx] and array[idx+1]; lerp with applyCurve(frac, exponent); write to output. Push output audio. */
export function handleGlide(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const exponentTagged: f64 = vmStack.pop(vm)
  const barTagged: f64 = vmStack.pop(vm)
  const arrayTagged: f64 = vmStack.pop(vm)

  const slot = getArraySlotFromTagged(vm, arrayTagged, ArrayOpName.Glide)
  const values: Float64Array = slot.values
  const arrLen: i32 = slot.length
  if (arrLen <= 0) {
    vm.arraySlotResultPool.release(slot)
    return genOpHelpers.pushSilenceAndReturn(vm, pc, opsPtr, params)
  }

  const barValue: f32 = Mathf.max(0.000001, genOpHelpers.scalarOrFirstSample(vm, barTagged))
  const exponentValue: f32 = genOpHelpers.scalarOrFirstSample(vm, exponentTagged)

  const samplesPerBar: f64 = f64(vm.samplesPerBar)
  const interval: f64 = f64(barValue) * samplesPerBar

  const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(procLen)
  const outPtr: usize = output.dataStart
  const bl: i32 = params.bufferLength

  for (let i: i32 = 0; i < bl; i++) {
    const globalSample: f64 = f64(params.sampleCount + i)
    const posInInterval: f64 = globalSample / interval - Math.floor(globalSample / interval)
    const frac: f32 = f32(posInInterval)
    const stepIndex: i32 = i32(Math.max(0.0, Math.floor(globalSample / interval)))
    const idx0: i32 = wrapIndex(stepIndex, arrLen)
    const idx1: i32 = wrapIndex(stepIndex + 1, arrLen)
    const elem0: f64 = getElementAt(vm, values, idx0, arrLen)
    const elem1: f64 = getElementAt(vm, values, idx1, arrLen)
    const v0: f32 = genOpHelpers.scalarOrFirstSample(vm, elem0)
    const v1: f32 = genOpHelpers.scalarOrFirstSample(vm, elem1)
    const t: f32 = applyCurve(frac, exponentValue)
    const lerped: f32 = v0 + (v1 - v0) * t
    genOpHelpers.writeTaggedSampleAt(encodeScalar(lerped), outPtr, i)
  }

  vm.arraySlotResultPool.release(slot)
  vmStack.push(vm, encodeAudio(outPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
