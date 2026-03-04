// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio, Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar, Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio, Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar, Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio, Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar, Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio, Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar, Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio, Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar, Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio, Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar, Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio, Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar, Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio, Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar } from '../../gen/lfosah'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Lfosah(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar(), 26, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio(), 27, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar(), 28, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio(), 29, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar(), 30, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio(), 31, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar(), 32, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio(), 33, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar(), 34, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio(), 35, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar(), 36, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio(), 37, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar(), 38, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio(), 39, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar(), 40, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio(), 41, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Lfosah(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenLfosah_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const seedTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(seedTagged) || genOpHelpers.isStereoAudioArray(vm, seedTagged)) {
    modeMask |= 4
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 8
  }
  const barValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barTagged)
  vm.paramScratch[0] = barValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[1] = offsetValue
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[2] = seedValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[3] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[26].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar = changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, seedValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[27].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio = changetype<Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, seedValue, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[28].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar = changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, trigValue, seedAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[29].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio = changetype<Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetValue, seedAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[30].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar = changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, seedValue, trigValue, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[31].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio = changetype<Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, seedValue, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[32].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar = changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, trigValue, offsetAudioPtr, seedAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[33].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio = changetype<Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, offsetAudioPtr, seedAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[34].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar = changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, seedValue, trigValue, barAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[35].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio = changetype<Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, seedValue, barAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[36].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar = changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, trigValue, barAudioPtr, seedAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[37].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio = changetype<Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, barAudioPtr, seedAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[38].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar = changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, trigValue, barAudioPtr, offsetAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[39].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio = changetype<Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, barAudioPtr, offsetAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[40].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar = changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, barAudioPtr, offsetAudioPtr, seedAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[41].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio = changetype<Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const seedAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, seedTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barAudioPtr, offsetAudioPtr, seedAudioPtr, trigAudioPtr)
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
  if (isAudio(barTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barTagged)))
  if (isAudio(offsetTagged)) vm.arena.releaseByPtr(u32(decodeAudio(offsetTagged)))
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
