// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Pwm_default_hz_audio_width_audio_offset_audio_trig_audio, Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar, Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio, Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar, Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio, Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar, Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio, Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar, Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio, Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar, Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio, Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar, Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio, Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar, Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio, Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar } from '../../gen/pwm'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Pwm(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar(), 167, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio(), 168, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar(), 169, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio(), 170, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar(), 171, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio(), 172, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar(), 173, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio(), 174, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar(), 175, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio(), 176, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar(), 177, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio(), 178, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar(), 179, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio(), 180, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar(), 181, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_audio_trig_audio(), 182, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Pwm(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenPwm_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const widthTagged: f64 = vm.stack[--vm.stackTop]
  const hzTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(hzTagged) || genOpHelpers.isStereoAudioArray(vm, hzTagged)) {
    modeMask |= 1
  }
  if (isAudio(widthTagged) || genOpHelpers.isStereoAudioArray(vm, widthTagged)) {
    modeMask |= 2
  }
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 4
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 8
  }
  const hzValue: f32 = genOpHelpers.scalarOrFirstSample(vm, hzTagged)
  vm.paramScratch[0] = hzValue
  const widthValue: f32 = genOpHelpers.scalarOrFirstSample(vm, widthTagged)
  vm.paramScratch[1] = widthValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[2] = offsetValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[3] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[167].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar = changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, offsetValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const slot: GenSlot = vm.genPools[168].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio = changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(slot.instance)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, offsetValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[169].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar = changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[170].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio = changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[171].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar = changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(slot.instance)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigValue, widthAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[172].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio = changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(slot.instance)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, widthAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[173].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar = changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(slot.instance)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, trigValue, widthAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[174].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio = changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(slot.instance)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[175].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar = changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, offsetValue, trigValue, hzAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[176].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio = changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, offsetValue, hzAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[177].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar = changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, trigValue, hzAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[178].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio = changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, hzAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[179].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar = changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, hzAudioResult.ptr, widthAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[180].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio = changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, hzAudioResult.ptr, widthAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[181].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar = changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, hzAudioResult.ptr, widthAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[182].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_audio_trig_audio = changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_audio>(slot.instance)
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const widthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, widthTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzAudioResult.ptr, widthAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, widthAudioResult)
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
  if (isAudio(widthTagged)) vm.arena.releaseByPtr(u32(decodeAudio(widthTagged)))
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
