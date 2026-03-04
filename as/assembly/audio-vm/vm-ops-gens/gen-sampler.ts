// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio, Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo, Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar, Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo, Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio, Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo, Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar, Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo } from '../../gen/sampler'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Sampler(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar(), 653, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio(), 654, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar(), 655, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio(), 656, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo(), 657, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo(), 658, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo(), 659, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo(), 660, 7, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo>(dst).copyFrom(changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo>(src))
  }, (dst: Object) => { changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo>(dst).reset() }))
}

export function handleGenOp_Sampler(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenSampler_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const repeatTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const speedTagged: f64 = vm.stack[--vm.stackTop]
  const sampleTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 4
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 16
  }
  const sampleValue: f32 = genOpHelpers.scalarOrFirstSample(vm, sampleTagged)
  vm.paramScratch[0] = sampleValue
  const speedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, speedTagged)
  vm.paramScratch[1] = speedValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[2] = offsetValue
  const repeatValue: f32 = genOpHelpers.scalarOrFirstSample(vm, repeatTagged)
  vm.paramScratch[3] = repeatValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[4] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[653].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar = changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.position
      vm.paramScratch[6] = instance.playing
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, sampleValue, speedValue, offsetValue, repeatValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 16: {
      const slot: GenSlot = vm.genPools[654].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio = changetype<Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.position
      vm.paramScratch[6] = instance.playing
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, sampleValue, speedValue, offsetValue, repeatValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[655].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar = changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.position
      vm.paramScratch[6] = instance.playing
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, sampleValue, speedValue, repeatValue, trigValue, offsetAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 20: {
      const slot: GenSlot = vm.genPools[656].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio = changetype<Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.position
      vm.paramScratch[6] = instance.playing
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, sampleValue, speedValue, repeatValue, offsetAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
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
  if (isAudio(sampleTagged)) vm.arena.releaseByPtr(u32(decodeAudio(sampleTagged)))
  if (isAudio(speedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(speedTagged)))
  if (isAudio(offsetTagged)) vm.arena.releaseByPtr(u32(decodeAudio(offsetTagged)))
  if (isAudio(repeatTagged)) vm.arena.releaseByPtr(u32(decodeAudio(repeatTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
