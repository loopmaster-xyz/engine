// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio, Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar, Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio, Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar, Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio, Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar, Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio, Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar, Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio, Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar, Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio, Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar, Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio, Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar, Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio, Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar } from '../../gen/inc'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Inc(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar(), 615, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio(), 616, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar(), 617, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio(), 618, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar(), 619, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio(), 620, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar(), 621, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio(), 622, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar(), 623, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio(), 624, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar(), 625, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio(), 626, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar(), 627, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio(), 628, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar(), 629, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio(), 630, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Inc(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenInc_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const ceilTagged: f64 = vm.stack[--vm.stackTop]
  const hzTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(hzTagged) || genOpHelpers.isStereoAudioArray(vm, hzTagged)) {
    modeMask |= 1
  }
  if (isAudio(ceilTagged) || genOpHelpers.isStereoAudioArray(vm, ceilTagged)) {
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
  const ceilValue: f32 = genOpHelpers.scalarOrFirstSample(vm, ceilTagged)
  vm.paramScratch[1] = ceilValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[2] = offsetValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[3] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[615].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar = changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, offsetValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[616].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio = changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, offsetValue, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[617].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar = changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, trigValue, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[618].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio = changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[619].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar = changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigValue, ceilAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[620].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio = changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, ceilAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[621].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar = changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, trigValue, ceilAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[622].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio = changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilAudioPtr, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[623].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar = changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, offsetValue, trigValue, hzAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[624].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio = changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, offsetValue, hzAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[625].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar = changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, trigValue, hzAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[626].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio = changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, hzAudioPtr, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[627].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar = changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, hzAudioPtr, ceilAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[628].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio = changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, hzAudioPtr, ceilAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[629].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar = changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, hzAudioPtr, ceilAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[630].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio = changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, hzTagged, procLen)
      const ceilAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ceilTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzAudioPtr, ceilAudioPtr, offsetAudioPtr, trigAudioPtr)
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
  if (isAudio(ceilTagged)) vm.arena.releaseByPtr(u32(decodeAudio(ceilTagged)))
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
