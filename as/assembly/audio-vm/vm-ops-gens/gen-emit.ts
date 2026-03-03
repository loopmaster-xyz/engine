// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Emit_default_value_audio, Emit_default_value_scalar } from '../../gen/emit'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Emit(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Emit_default_value_scalar(), 284, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Emit_default_value_scalar>(dst).copyFrom(changetype<Emit_default_value_scalar>(src))
  }, (dst: Object) => { changetype<Emit_default_value_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Emit_default_value_audio(), 285, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Emit_default_value_audio>(dst).copyFrom(changetype<Emit_default_value_audio>(src))
  }, (dst: Object) => { changetype<Emit_default_value_audio>(dst).reset() }))
}

export function handleGenOp_Emit(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenEmit_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const valueTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(valueTagged) || genOpHelpers.isStereoAudioArray(vm, valueTagged)) {
    modeMask |= 1
  }
  const valueValue: f32 = genOpHelpers.scalarOrFirstSample(vm, valueTagged)
  vm.paramScratch[0] = valueValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[284].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Emit_default_value_scalar = changetype<Emit_default_value_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, valueValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[285].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Emit_default_value_audio = changetype<Emit_default_value_audio>(slot.instance)
      const valueAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, valueTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, valueAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, valueAudioResult)
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
  if (isAudio(valueTagged)) vm.arena.releaseByPtr(u32(decodeAudio(valueTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
