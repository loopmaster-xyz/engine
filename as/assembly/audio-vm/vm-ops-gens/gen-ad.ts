// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio, Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar, Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio, Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar, Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio, Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar, Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio, Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar, Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio, Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar, Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio, Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar, Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio, Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar, Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio, Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar } from '../../gen/ad'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Ad(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar(), 183, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio(), 184, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar(), 185, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio(), 186, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar(), 187, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio(), 188, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar(), 189, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio(), 190, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar(), 191, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio(), 192, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar(), 193, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio(), 194, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar(), 195, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio(), 196, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar(), 197, 6, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(dst).copyFrom(changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio(), 198, 6, vm.genPoolManager, (dst: Object, src: Object) => {
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
      const slot: GenSlot = vm.genPools[183].get()
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
      const slot: GenSlot = vm.genPools[184].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio = changetype<Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, exponentValue, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[185].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar = changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
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
        const exponentSrc: usize = exponentAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, trigValue, exponentAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[186].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio = changetype<Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const exponentSrc: usize = exponentAudioResult.ptr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayValue, exponentAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[187].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar = changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
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
        const decaySrc: usize = decayAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, exponentValue, trigValue, decayAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[188].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio = changetype<Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, exponentValue, decayAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[189].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar = changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
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
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, trigValue, decayAudioResult.ptr, exponentAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[190].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio = changetype<Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, decayAudioResult.ptr, exponentAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[191].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar = changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, exponentValue, trigValue, attackAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[192].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio = changetype<Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, exponentValue, attackAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[193].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar = changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, trigValue, attackAudioResult.ptr, exponentAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[194].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio = changetype<Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, decayValue, attackAudioResult.ptr, exponentAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[195].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar = changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(decayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, exponentValue, trigValue, attackAudioResult.ptr, decayAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[196].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio = changetype<Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(decayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, exponentValue, attackAudioResult.ptr, decayAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[197].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar = changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(decayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, attackAudioResult.ptr, decayAudioResult.ptr, exponentAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[198].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio = changetype<Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio>(slot.instance)
      vm.paramScratch[4] = instance.stage
      vm.paramScratch[5] = instance.env
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
      const exponentAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, exponentTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
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
        const attackSrc: usize = attackAudioResult.ptr
        const attackBuf: Float32Array = vm.arena.get(baseProcLen)
        const attackPtr: usize = attackBuf.dataStart
        downsample(vm, attackSrc, attackPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(attackPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(attackPtr + (usize(k) << 2), last)
          }
        }
        const decaySrc: usize = decayAudioResult.ptr
        const decayBuf: Float32Array = vm.arena.get(baseProcLen)
        const decayPtr: usize = decayBuf.dataStart
        downsample(vm, decaySrc, decayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(decayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(decayPtr + (usize(k) << 2), last)
          }
        }
        const exponentSrc: usize = exponentAudioResult.ptr
        const exponentBuf: Float32Array = vm.arena.get(baseProcLen)
        const exponentPtr: usize = exponentBuf.dataStart
        downsample(vm, exponentSrc, exponentPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(exponentPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(exponentPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        vm.arena.release(decayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        vm.arena.release(exponentBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioResult.ptr, decayAudioResult.ptr, exponentAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, exponentAudioResult)
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
