// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio, Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar, Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio, Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar, Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio, Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar, Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio, Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar } from '../../gen/smooth'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Smooth(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar(), 431, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio(), 432, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar(), 433, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio(), 434, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar(), 435, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio(), 436, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar(), 437, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio(), 438, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio>(dst).copyFrom(changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Smooth(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenSmooth_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const curveTagged: f64 = vm.stack[--vm.stackTop]
  const rateTagged: f64 = vm.stack[--vm.stackTop]
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(rateTagged) || genOpHelpers.isStereoAudioArray(vm, rateTagged)) {
    modeMask |= 2
  }
  if (isAudio(curveTagged) || genOpHelpers.isStereoAudioArray(vm, curveTagged)) {
    modeMask |= 4
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 8
  }
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[0] = seedValue
  const rateValue: f32 = genOpHelpers.scalarOrFirstSample(vm, rateTagged)
  vm.paramScratch[1] = rateValue
  const curveValue: f32 = genOpHelpers.scalarOrFirstSample(vm, curveTagged)
  vm.paramScratch[2] = curveValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[3] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[431].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar = changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, curveValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[432].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio = changetype<Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, curveValue, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[433].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar = changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const curveAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, curveTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, trigValue, curveAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[434].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio = changetype<Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const curveAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, curveTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, curveAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[435].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar = changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const rateAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, rateTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, curveValue, trigValue, rateAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[436].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio = changetype<Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const rateAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, rateTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, curveValue, rateAudioPtr, trigAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[437].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar = changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const rateAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, rateTagged, procLen)
      const curveAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, curveTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, trigValue, rateAudioPtr, curveAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[438].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio = changetype<Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.phase
      const rateAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, rateTagged, procLen)
      const curveAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, curveTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateAudioPtr, curveAudioPtr, trigAudioPtr)
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
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (isAudio(rateTagged)) vm.arena.releaseByPtr(u32(decodeAudio(rateTagged)))
  if (isAudio(curveTagged)) vm.arena.releaseByPtr(u32(decodeAudio(curveTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
