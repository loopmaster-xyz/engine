// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio, Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar, Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio, Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar, Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio, Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar, Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio, Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar, Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio, Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar, Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio, Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar, Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio, Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar, Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio, Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar } from '../../gen/fractal'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Fractal(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar(), 360, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio(), 361, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar(), 362, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio(), 363, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar(), 364, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio(), 365, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar(), 366, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio(), 367, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar(), 368, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio(), 369, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar(), 370, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio(), 371, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar(), 372, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio(), 373, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar(), 374, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio(), 375, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio>(dst).copyFrom(changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Fractal(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenFractal_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const gainTagged: f64 = vm.stack[--vm.stackTop]
  const octavesTagged: f64 = vm.stack[--vm.stackTop]
  const rateTagged: f64 = vm.stack[--vm.stackTop]
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(rateTagged) || genOpHelpers.isStereoAudioArray(vm, rateTagged)) {
    modeMask |= 2
  }
  if (isAudio(octavesTagged) || genOpHelpers.isStereoAudioArray(vm, octavesTagged)) {
    modeMask |= 4
  }
  if (isAudio(gainTagged) || genOpHelpers.isStereoAudioArray(vm, gainTagged)) {
    modeMask |= 8
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 16
  }
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[0] = seedValue
  const rateValue: f32 = genOpHelpers.scalarOrFirstSample(vm, rateTagged)
  vm.paramScratch[1] = rateValue
  const octavesValue: f32 = genOpHelpers.scalarOrFirstSample(vm, octavesTagged)
  vm.paramScratch[2] = octavesValue
  const gainValue: f32 = genOpHelpers.scalarOrFirstSample(vm, gainTagged)
  vm.paramScratch[3] = gainValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[4] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[360].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, octavesValue, gainValue, trigValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 16: {
      const slot: GenSlot = vm.genPools[361].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, octavesValue, gainValue, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 8: {
      const slot: GenSlot = vm.genPools[362].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, octavesValue, trigValue, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 24: {
      const slot: GenSlot = vm.genPools[363].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, octavesValue, gainAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[364].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, gainValue, trigValue, octavesAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      break
    }
    case 20: {
      const slot: GenSlot = vm.genPools[365].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, gainValue, octavesAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[366].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, trigValue, octavesAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 28: {
      const slot: GenSlot = vm.genPools[367].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio = changetype<Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateValue, octavesAudioResult.ptr, gainAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[368].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar = changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, octavesValue, gainValue, trigValue, rateAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      break
    }
    case 18: {
      const slot: GenSlot = vm.genPools[369].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio = changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, octavesValue, gainValue, rateAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[370].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar = changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, octavesValue, trigValue, rateAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 26: {
      const slot: GenSlot = vm.genPools[371].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio = changetype<Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, octavesValue, rateAudioResult.ptr, gainAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[372].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar = changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, gainValue, trigValue, rateAudioResult.ptr, octavesAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      break
    }
    case 22: {
      const slot: GenSlot = vm.genPools[373].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio = changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, gainValue, rateAudioResult.ptr, octavesAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[374].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar = changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, trigValue, rateAudioResult.ptr, octavesAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 30: {
      const slot: GenSlot = vm.genPools[375].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio = changetype<Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio>(slot.instance)
      vm.paramScratch[5] = instance.phase
      const rateAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, rateTagged, procLen)
      const octavesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, octavesTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, rateAudioResult.ptr, octavesAudioResult.ptr, gainAudioResult.ptr, trigAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, rateAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, octavesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (isAudio(rateTagged)) vm.arena.releaseByPtr(u32(decodeAudio(rateTagged)))
  if (isAudio(octavesTagged)) vm.arena.releaseByPtr(u32(decodeAudio(octavesTagged)))
  if (isAudio(gainTagged)) vm.arena.releaseByPtr(u32(decodeAudio(gainTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
