// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Pwm_default_hz_audio_width_audio_offset_audio_trig_audio, Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar, Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio, Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar, Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio, Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar, Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio, Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar, Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio, Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar, Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio, Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar, Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio, Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar, Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio, Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar } from '../../gen/pwm'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Pwm(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar(), 237, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio(), 238, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar(), 239, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio(), 240, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar(), 241, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio(), 242, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar(), 243, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio(), 244, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar(), 245, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio(), 246, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar(), 247, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio(), 248, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar(), 249, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio(), 250, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar(), 251, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pwm_default_hz_audio_width_audio_offset_audio_trig_audio(), 252, 4, vm.genPoolManager, (dst: Object, src: Object) => {
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
      const slot: GenSlot = vm.genPools[237].get()
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
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[238].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio = changetype<Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio>(slot.instance)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, offsetValue, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[239].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar = changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar>(slot.instance)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, trigValue, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[240].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio = changetype<Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio>(slot.instance)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthValue, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[241].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar = changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar>(slot.instance)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigValue, widthAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[242].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio = changetype<Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio>(slot.instance)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, widthAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[243].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar = changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar>(slot.instance)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, trigValue, widthAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[244].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio = changetype<Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio>(slot.instance)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, widthAudioPtr, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[245].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar = changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, offsetValue, trigValue, hzAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[246].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio = changetype<Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, offsetValue, hzAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[247].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar = changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, trigValue, hzAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[248].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio = changetype<Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, widthValue, hzAudioPtr, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[249].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar = changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, hzAudioPtr, widthAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[250].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio = changetype<Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, hzAudioPtr, widthAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[251].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar = changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, hzAudioPtr, widthAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[252].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pwm_default_hz_audio_width_audio_offset_audio_trig_audio = changetype<Pwm_default_hz_audio_width_audio_offset_audio_trig_audio>(slot.instance)
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const widthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, widthTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzAudioPtr, widthAudioPtr, offsetAudioPtr, trigAudioPtr)
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
