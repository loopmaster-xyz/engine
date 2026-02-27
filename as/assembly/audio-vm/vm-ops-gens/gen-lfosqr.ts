// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Lfosqr_default_bar_audio_offset_audio_trig_audio, Lfosqr_default_bar_audio_offset_audio_trig_scalar, Lfosqr_default_bar_audio_offset_scalar_trig_audio, Lfosqr_default_bar_audio_offset_scalar_trig_scalar, Lfosqr_default_bar_scalar_offset_audio_trig_audio, Lfosqr_default_bar_scalar_offset_audio_trig_scalar, Lfosqr_default_bar_scalar_offset_scalar_trig_audio, Lfosqr_default_bar_scalar_offset_scalar_trig_scalar } from '../../gen/lfosqr'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Lfosqr(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_scalar_offset_scalar_trig_scalar(), 12, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_scalar_offset_scalar_trig_audio(), 13, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_scalar_offset_audio_trig_scalar(), 14, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Lfosqr_default_bar_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_scalar_offset_audio_trig_audio(), 15, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Lfosqr_default_bar_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_audio_offset_scalar_trig_scalar(), 16, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosqr_default_bar_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_audio_offset_scalar_trig_audio(), 17, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Lfosqr_default_bar_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_audio_offset_audio_trig_scalar(), 18, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Lfosqr_default_bar_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosqr_default_bar_audio_offset_audio_trig_audio(), 19, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosqr_default_bar_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Lfosqr_default_bar_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosqr_default_bar_audio_offset_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Lfosqr(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenLfosqr_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const barTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(barTagged) || genOpHelpers.isStereoAudioArray(vm, barTagged)) {
    modeMask |= 1
  }
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 2
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 4
  }
  const barValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barTagged)
  vm.paramScratch[0] = barValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[1] = offsetValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[2] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[12].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_scalar_offset_scalar_trig_scalar = changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[13].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_scalar_offset_scalar_trig_audio = changetype<Lfosqr_default_bar_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[14].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_scalar_offset_audio_trig_scalar = changetype<Lfosqr_default_bar_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[15].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_scalar_offset_audio_trig_audio = changetype<Lfosqr_default_bar_scalar_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[16].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_audio_offset_scalar_trig_scalar = changetype<Lfosqr_default_bar_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, barAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[17].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_audio_offset_scalar_trig_audio = changetype<Lfosqr_default_bar_audio_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, barAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[18].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_audio_offset_audio_trig_scalar = changetype<Lfosqr_default_bar_audio_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, barAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[19].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosqr_default_bar_audio_offset_audio_trig_audio = changetype<Lfosqr_default_bar_audio_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
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
  if (isAudio(barTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barTagged)))
  if (isAudio(offsetTagged)) vm.arena.releaseByPtr(u32(decodeAudio(offsetTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
