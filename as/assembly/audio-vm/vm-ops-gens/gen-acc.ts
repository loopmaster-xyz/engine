// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Acc_default_trig_audio_amount_scalar, Acc_default_trig_scalar_amount_scalar } from '../../gen/acc'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Acc(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Acc_default_trig_scalar_amount_scalar(), 384, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Acc_default_trig_scalar_amount_scalar>(dst).copyFrom(changetype<Acc_default_trig_scalar_amount_scalar>(src))
  }, (dst: Object) => { changetype<Acc_default_trig_scalar_amount_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Acc_default_trig_audio_amount_scalar(), 385, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Acc_default_trig_audio_amount_scalar>(dst).copyFrom(changetype<Acc_default_trig_audio_amount_scalar>(src))
  }, (dst: Object) => { changetype<Acc_default_trig_audio_amount_scalar>(dst).reset() }))
}

export function handleGenOp_Acc(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenAcc_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const amountTagged: f64 = vm.stack[--vm.stackTop]
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 1
  }
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[0] = trigValue
  const amountValue: f32 = genOpHelpers.scalarOrFirstSample(vm, amountTagged)
  vm.paramScratch[1] = amountValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[384].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Acc_default_trig_scalar_amount_scalar = changetype<Acc_default_trig_scalar_amount_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, amountValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[385].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Acc_default_trig_audio_amount_scalar = changetype<Acc_default_trig_audio_amount_scalar>(slot.instance)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, amountValue, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    default: {
      const procLen: i32 = (params.bufferLength + 15) & ~15
      output = vm.arena.get(procLen)
      memory.fill(output.dataStart, 0, usize(procLen) << 2)
      break
    }
  }
  push(vm, encodeAudio(output.dataStart), true)
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (isAudio(amountTagged)) vm.arena.releaseByPtr(u32(decodeAudio(amountTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
