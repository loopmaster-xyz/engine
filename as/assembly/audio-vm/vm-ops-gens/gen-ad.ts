// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio, Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar, Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio, Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar, Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio, Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar, Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio, Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar, Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio, Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar, Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio, Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar, Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio, Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar, Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio, Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar } from '../../gen/ad'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Ad(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar(), 253, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio(), 254, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar(), 255, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio(), 256, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar(), 257, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio(), 258, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar(), 259, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio(), 260, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar(), 261, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio(), 262, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar(), 263, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio(), 264, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar(), 265, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio(), 266, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar(), 267, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio(), 268, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Ad(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenAd_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const exponentTagged: f64 = vm.stack[--vm.stackTop]
  const decayTagged: f64 = vm.stack[--vm.stackTop]
  const attackTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(attackTagged) || genOpHelpers.isStereoAudioArray(vm, attackTagged)) {
    modeMask |= 1
  }
  if (isAudio(decayTagged) || genOpHelpers.isStereoAudioArray(vm, decayTagged)) {
    modeMask |= 2
  }
  if (isAudio(exponentTagged) || genOpHelpers.isStereoAudioArray(vm, exponentTagged)) {
    modeMask |= 4
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 8
  }
  const attackValue: f32 = genOpHelpers.scalarOrFirstSample(vm, attackTagged)
  vm.paramScratch[0] = attackValue
  const decayValue: f32 = genOpHelpers.scalarOrFirstSample(vm, decayTagged)
  vm.paramScratch[1] = decayValue
  const exponentValue: f32 = genOpHelpers.scalarOrFirstSample(vm, exponentTagged)
  vm.paramScratch[2] = exponentValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[3] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[253].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar = changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, decayValue, exponentValue, trigValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, exponentValue, trigValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[254].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio = changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, decayValue, exponentValue, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, exponentValue, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[255].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar = changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, decayValue, trigValue, exponentPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(exponentBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, trigValue, exponentAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[256].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio = changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, decayValue, exponentPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(exponentBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, exponentAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[257].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar = changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, exponentValue, trigValue, decayPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(decayBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, exponentValue, trigValue, decayAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[258].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio = changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, exponentValue, decayPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(decayBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, exponentValue, decayAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[259].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar = changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, trigValue, decayPtr, exponentPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(decayBuf)
        vm.arena.release(exponentBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, trigValue, decayAudioPtr, exponentAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[260].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio = changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackValue, decayPtr, exponentPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(decayBuf)
        vm.arena.release(exponentBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayAudioPtr, exponentAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[261].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar = changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, decayValue, exponentValue, trigValue, attackPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, exponentValue, trigValue, attackAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[262].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio = changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, decayValue, exponentValue, attackPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, exponentValue, attackAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[263].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar = changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, decayValue, trigValue, attackPtr, exponentPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(exponentBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, trigValue, attackAudioPtr, exponentAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[264].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio = changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, decayValue, attackPtr, exponentPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(exponentBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, attackAudioPtr, exponentAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[265].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar = changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, exponentValue, trigValue, attackPtr, decayPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(decayBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, exponentValue, trigValue, attackAudioPtr, decayAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[266].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio = changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, exponentValue, attackPtr, decayPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(decayBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, exponentValue, attackAudioPtr, decayAudioPtr, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[267].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar = changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, trigValue, attackPtr, decayPtr, exponentPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(decayBuf)
        vm.arena.release(exponentBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, attackAudioPtr, decayAudioPtr, exponentAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[268].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio = changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const decayAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, decayTagged, procLen)
      const exponentAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, exponentTagged, procLen)
      const trigAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const attackSrc: usize = attackAudioPtr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioPtr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioPtr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioPtr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, attackPtr, decayPtr, exponentPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(attackBuf)
        vm.arena.release(decayBuf)
        vm.arena.release(exponentBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioPtr, decayAudioPtr, exponentAudioPtr, trigAudioPtr)
      }
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
  if (isAudio(attackTagged)) vm.arena.releaseByPtr(u32(decodeAudio(attackTagged)))
  if (isAudio(decayTagged)) vm.arena.releaseByPtr(u32(decodeAudio(decayTagged)))
  if (isAudio(exponentTagged)) vm.arena.releaseByPtr(u32(decodeAudio(exponentTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
