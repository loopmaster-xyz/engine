// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Ramp_default_hz_audio_offset_audio_trig_audio, Ramp_default_hz_audio_offset_audio_trig_scalar, Ramp_default_hz_audio_offset_scalar_trig_audio, Ramp_default_hz_audio_offset_scalar_trig_scalar, Ramp_default_hz_scalar_offset_audio_trig_audio, Ramp_default_hz_scalar_offset_audio_trig_scalar, Ramp_default_hz_scalar_offset_scalar_trig_audio, Ramp_default_hz_scalar_offset_scalar_trig_scalar } from '../../gen/ramp'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Ramp(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_scalar_offset_scalar_trig_scalar(), 349, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Ramp_default_hz_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_scalar_offset_scalar_trig_audio(), 350, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Ramp_default_hz_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_scalar_offset_audio_trig_scalar(), 351, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Ramp_default_hz_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_scalar_offset_audio_trig_audio(), 352, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Ramp_default_hz_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_audio_offset_scalar_trig_scalar(), 353, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Ramp_default_hz_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_audio_offset_scalar_trig_audio(), 354, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Ramp_default_hz_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_audio_offset_audio_trig_scalar(), 355, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Ramp_default_hz_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ramp_default_hz_audio_offset_audio_trig_audio(), 356, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ramp_default_hz_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Ramp_default_hz_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ramp_default_hz_audio_offset_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Ramp(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenRamp_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const hzTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(hzTagged) || genOpHelpers.isStereoAudioArray(vm, hzTagged)) {
    modeMask |= 1
  }
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 2
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 4
  }
  const hzValue: f32 = genOpHelpers.scalarOrFirstSample(vm, hzTagged)
  vm.paramScratch[0] = hzValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[1] = offsetValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[2] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[349].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_scalar_offset_scalar_trig_scalar = changetype<Ramp_default_hz_scalar_offset_scalar_trig_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[350].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_scalar_offset_scalar_trig_audio = changetype<Ramp_default_hz_scalar_offset_scalar_trig_audio>(slot.instance)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[351].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_scalar_offset_audio_trig_scalar = changetype<Ramp_default_hz_scalar_offset_audio_trig_scalar>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[352].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_scalar_offset_audio_trig_audio = changetype<Ramp_default_hz_scalar_offset_audio_trig_audio>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[353].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_audio_offset_scalar_trig_scalar = changetype<Ramp_default_hz_audio_offset_scalar_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, hzAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[354].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_audio_offset_scalar_trig_audio = changetype<Ramp_default_hz_audio_offset_scalar_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, hzAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[355].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_audio_offset_audio_trig_scalar = changetype<Ramp_default_hz_audio_offset_audio_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, hzAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[356].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ramp_default_hz_audio_offset_audio_trig_audio = changetype<Ramp_default_hz_audio_offset_audio_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
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
  if (isAudio(hzTagged)) vm.arena.releaseByPtr(u32(decodeAudio(hzTagged)))
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
