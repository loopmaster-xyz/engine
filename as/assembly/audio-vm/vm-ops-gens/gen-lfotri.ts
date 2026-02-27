// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Lfotri_default_bar_audio_offset_audio_trig_audio, Lfotri_default_bar_audio_offset_audio_trig_scalar, Lfotri_default_bar_audio_offset_scalar_trig_audio, Lfotri_default_bar_audio_offset_scalar_trig_scalar, Lfotri_default_bar_scalar_offset_audio_trig_audio, Lfotri_default_bar_scalar_offset_audio_trig_scalar, Lfotri_default_bar_scalar_offset_scalar_trig_audio, Lfotri_default_bar_scalar_offset_scalar_trig_scalar } from '../../gen/lfotri'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Lfotri(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_scalar_offset_scalar_trig_scalar(), 365, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Lfotri_default_bar_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_scalar_offset_scalar_trig_audio(), 366, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Lfotri_default_bar_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_scalar_offset_audio_trig_scalar(), 367, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Lfotri_default_bar_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_scalar_offset_audio_trig_audio(), 368, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Lfotri_default_bar_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_audio_offset_scalar_trig_scalar(), 369, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Lfotri_default_bar_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_audio_offset_scalar_trig_audio(), 370, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Lfotri_default_bar_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_audio_offset_audio_trig_scalar(), 371, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Lfotri_default_bar_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfotri_default_bar_audio_offset_audio_trig_audio(), 372, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfotri_default_bar_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Lfotri_default_bar_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfotri_default_bar_audio_offset_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Lfotri(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenLfotri_default: {
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
      const slot: GenSlot = vm.genPools[365].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_scalar_offset_scalar_trig_scalar = changetype<Lfotri_default_bar_scalar_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[366].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_scalar_offset_scalar_trig_audio = changetype<Lfotri_default_bar_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[367].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_scalar_offset_audio_trig_scalar = changetype<Lfotri_default_bar_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[368].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_scalar_offset_audio_trig_audio = changetype<Lfotri_default_bar_scalar_offset_audio_trig_audio>(slot.instance)
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
      const slot: GenSlot = vm.genPools[369].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_audio_offset_scalar_trig_scalar = changetype<Lfotri_default_bar_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[3] = instance.phase
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, barAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[370].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_audio_offset_scalar_trig_audio = changetype<Lfotri_default_bar_audio_offset_scalar_trig_audio>(slot.instance)
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
      const slot: GenSlot = vm.genPools[371].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_audio_offset_audio_trig_scalar = changetype<Lfotri_default_bar_audio_offset_audio_trig_scalar>(slot.instance)
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
      const slot: GenSlot = vm.genPools[372].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfotri_default_bar_audio_offset_audio_trig_audio = changetype<Lfotri_default_bar_audio_offset_audio_trig_audio>(slot.instance)
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
