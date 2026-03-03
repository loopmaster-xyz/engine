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
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar(), 539, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio(), 540, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar(), 541, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio(), 542, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar(), 543, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio(), 544, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar(), 545, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio(), 546, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar(), 547, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio(), 548, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar(), 549, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio(), 550, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar(), 551, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio(), 552, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar(), 553, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(dst).copyFrom(changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio(), 554, 5, vm.genPoolManager, (dst: Object, src: Object) => {
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
      const slot: GenSlot = vm.genPools[539].get()
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
      const slot: GenSlot = vm.genPools[540].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio = changetype<Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, offsetValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[541].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar = changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[542].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio = changetype<Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilValue, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[543].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar = changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, trigValue, ceilAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[544].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio = changetype<Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, offsetValue, ceilAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[545].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar = changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, trigValue, ceilAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[546].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio = changetype<Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzValue, ceilAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[547].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar = changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, offsetValue, trigValue, hzAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[548].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio = changetype<Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, offsetValue, hzAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[549].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar = changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, trigValue, hzAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[550].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio = changetype<Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ceilValue, hzAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[551].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar = changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, hzAudioResult.ptr, ceilAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[552].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio = changetype<Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, hzAudioResult.ptr, ceilAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[553].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar = changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, hzAudioResult.ptr, ceilAudioResult.ptr, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[554].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio = changetype<Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const hzAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, hzTagged, procLen)
      const ceilAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ceilTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, hzAudioResult.ptr, ceilAudioResult.ptr, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, hzAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ceilAudioResult)
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
