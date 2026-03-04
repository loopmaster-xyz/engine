// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { At_default_bar_audio_every_audio_probability_audio_seed_scalar, At_default_bar_audio_every_audio_probability_scalar_seed_scalar, At_default_bar_audio_every_scalar_probability_audio_seed_scalar, At_default_bar_audio_every_scalar_probability_scalar_seed_scalar, At_default_bar_scalar_every_audio_probability_audio_seed_scalar, At_default_bar_scalar_every_audio_probability_scalar_seed_scalar, At_default_bar_scalar_every_scalar_probability_audio_seed_scalar, At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar } from '../../gen/at'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_At(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar(), 399, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_scalar_probability_audio_seed_scalar(), 400, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_scalar_probability_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_scalar_probability_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_scalar_probability_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_audio_probability_scalar_seed_scalar(), 401, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_audio_probability_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_audio_probability_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_audio_probability_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_audio_probability_audio_seed_scalar(), 402, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_audio_probability_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_audio_probability_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_audio_probability_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_scalar_probability_scalar_seed_scalar(), 403, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_scalar_probability_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_scalar_probability_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_scalar_probability_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_scalar_probability_audio_seed_scalar(), 404, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_scalar_probability_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_scalar_probability_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_scalar_probability_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_audio_probability_scalar_seed_scalar(), 405, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_audio_probability_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_audio_probability_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_audio_probability_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_audio_probability_audio_seed_scalar(), 406, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_audio_probability_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_audio_probability_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_audio_probability_audio_seed_scalar>(dst).reset() }))
}

export function handleGenOp_At(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenAt_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  const probabilityTagged: f64 = vm.stack[--vm.stackTop]
  const everyTagged: f64 = vm.stack[--vm.stackTop]
  const barTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(barTagged) || genOpHelpers.isStereoAudioArray(vm, barTagged)) {
    modeMask |= 1
  }
  if (isAudio(everyTagged) || genOpHelpers.isStereoAudioArray(vm, everyTagged)) {
    modeMask |= 2
  }
  if (isAudio(probabilityTagged) || genOpHelpers.isStereoAudioArray(vm, probabilityTagged)) {
    modeMask |= 4
  }
  const barValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barTagged)
  vm.paramScratch[0] = barValue
  const everyValue: f32 = genOpHelpers.scalarOrFirstSample(vm, everyTagged)
  vm.paramScratch[1] = everyValue
  const probabilityValue: f32 = genOpHelpers.scalarOrFirstSample(vm, probabilityTagged)
  vm.paramScratch[2] = probabilityValue
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[3] = seedValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[399].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar = changetype<At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, everyValue, probabilityValue, seedValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, everyValue, probabilityValue, seedValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[400].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_scalar_probability_audio_seed_scalar = changetype<At_default_bar_scalar_every_scalar_probability_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const probabilityAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, probabilityTagged, procLen)
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
        const probabilitySrc: usize = probabilityAudioPtr
        const probabilityBuf: Float32Array = vm.arena.get(baseProcLen)
        const probabilityPtr: usize = probabilityBuf.dataStart
        downsample(vm, probabilitySrc, probabilityPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probabilityPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probabilityPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, everyValue, seedValue, probabilityPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(probabilityBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, everyValue, seedValue, probabilityAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[401].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_audio_probability_scalar_seed_scalar = changetype<At_default_bar_scalar_every_audio_probability_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const everyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, everyTagged, procLen)
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
        const everySrc: usize = everyAudioPtr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, probabilityValue, seedValue, everyPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(everyBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, probabilityValue, seedValue, everyAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[402].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_audio_probability_audio_seed_scalar = changetype<At_default_bar_scalar_every_audio_probability_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const everyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, everyTagged, procLen)
      const probabilityAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, probabilityTagged, procLen)
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
        const everySrc: usize = everyAudioPtr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        const probabilitySrc: usize = probabilityAudioPtr
        const probabilityBuf: Float32Array = vm.arena.get(baseProcLen)
        const probabilityPtr: usize = probabilityBuf.dataStart
        downsample(vm, probabilitySrc, probabilityPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probabilityPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probabilityPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, seedValue, everyPtr, probabilityPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(everyBuf)
        vm.arena.release(probabilityBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, seedValue, everyAudioPtr, probabilityAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[403].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_scalar_probability_scalar_seed_scalar = changetype<At_default_bar_audio_every_scalar_probability_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
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
        const barSrc: usize = barAudioPtr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, everyValue, probabilityValue, seedValue, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, everyValue, probabilityValue, seedValue, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[404].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_scalar_probability_audio_seed_scalar = changetype<At_default_bar_audio_every_scalar_probability_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const probabilityAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, probabilityTagged, procLen)
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
        const barSrc: usize = barAudioPtr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const probabilitySrc: usize = probabilityAudioPtr
        const probabilityBuf: Float32Array = vm.arena.get(baseProcLen)
        const probabilityPtr: usize = probabilityBuf.dataStart
        downsample(vm, probabilitySrc, probabilityPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probabilityPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probabilityPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, everyValue, seedValue, barPtr, probabilityPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        vm.arena.release(probabilityBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, everyValue, seedValue, barAudioPtr, probabilityAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[405].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_audio_probability_scalar_seed_scalar = changetype<At_default_bar_audio_every_audio_probability_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const everyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, everyTagged, procLen)
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
        const barSrc: usize = barAudioPtr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const everySrc: usize = everyAudioPtr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, probabilityValue, seedValue, barPtr, everyPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        vm.arena.release(everyBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, probabilityValue, seedValue, barAudioPtr, everyAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[406].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_audio_probability_audio_seed_scalar = changetype<At_default_bar_audio_every_audio_probability_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barTagged, procLen)
      const everyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, everyTagged, procLen)
      const probabilityAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, probabilityTagged, procLen)
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
        const barSrc: usize = barAudioPtr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const everySrc: usize = everyAudioPtr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        const probabilitySrc: usize = probabilityAudioPtr
        const probabilityBuf: Float32Array = vm.arena.get(baseProcLen)
        const probabilityPtr: usize = probabilityBuf.dataStart
        downsample(vm, probabilitySrc, probabilityPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probabilityPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probabilityPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, seedValue, barPtr, everyPtr, probabilityPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        vm.arena.release(everyBuf)
        vm.arena.release(probabilityBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, barAudioPtr, everyAudioPtr, probabilityAudioPtr)
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
  if (isAudio(barTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barTagged)))
  if (isAudio(everyTagged)) vm.arena.releaseByPtr(u32(decodeAudio(everyTagged)))
  if (isAudio(probabilityTagged)) vm.arena.releaseByPtr(u32(decodeAudio(probabilityTagged)))
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
