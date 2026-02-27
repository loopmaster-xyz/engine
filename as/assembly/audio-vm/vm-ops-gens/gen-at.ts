// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { At_default_bar_audio_every_audio_prob_audio_seed_scalar, At_default_bar_audio_every_audio_prob_scalar_seed_scalar, At_default_bar_audio_every_scalar_prob_audio_seed_scalar, At_default_bar_audio_every_scalar_prob_scalar_seed_scalar, At_default_bar_scalar_every_audio_prob_audio_seed_scalar, At_default_bar_scalar_every_audio_prob_scalar_seed_scalar, At_default_bar_scalar_every_scalar_prob_audio_seed_scalar, At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar } from '../../gen/at'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_At(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar(), 325, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_scalar_prob_audio_seed_scalar(), 326, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_scalar_prob_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_scalar_prob_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_scalar_prob_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_audio_prob_scalar_seed_scalar(), 327, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_audio_prob_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_audio_prob_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_audio_prob_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_scalar_every_audio_prob_audio_seed_scalar(), 328, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_scalar_every_audio_prob_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_scalar_every_audio_prob_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_scalar_every_audio_prob_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_scalar_prob_scalar_seed_scalar(), 329, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_scalar_prob_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_scalar_prob_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_scalar_prob_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_scalar_prob_audio_seed_scalar(), 330, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_scalar_prob_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_scalar_prob_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_scalar_prob_audio_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_audio_prob_scalar_seed_scalar(), 331, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_audio_prob_scalar_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_audio_prob_scalar_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_audio_prob_scalar_seed_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new At_default_bar_audio_every_audio_prob_audio_seed_scalar(), 332, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<At_default_bar_audio_every_audio_prob_audio_seed_scalar>(dst).copyFrom(changetype<At_default_bar_audio_every_audio_prob_audio_seed_scalar>(src))
  }, (dst: Object) => { changetype<At_default_bar_audio_every_audio_prob_audio_seed_scalar>(dst).reset() }))
}

export function handleGenOp_At(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenAt_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  const probTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(probTagged) || genOpHelpers.isStereoAudioArray(vm, probTagged)) {
    modeMask |= 4
  }
  const barValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barTagged)
  vm.paramScratch[0] = barValue
  const everyValue: f32 = genOpHelpers.scalarOrFirstSample(vm, everyTagged)
  vm.paramScratch[1] = everyValue
  const probValue: f32 = genOpHelpers.scalarOrFirstSample(vm, probTagged)
  vm.paramScratch[2] = probValue
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[3] = seedValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[325].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar = changetype<At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, everyValue, probValue, seedValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, everyValue, probValue, seedValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[326].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_scalar_prob_audio_seed_scalar = changetype<At_default_bar_scalar_every_scalar_prob_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const probAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, probTagged, procLen)
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
        const probSrc: usize = probAudioResult.ptr
        const probBuf: Float32Array = vm.arena.get(baseProcLen)
        const probPtr: usize = probBuf.dataStart
        downsample(vm, probSrc, probPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, everyValue, seedValue, probPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(probBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, everyValue, seedValue, probAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[327].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_audio_prob_scalar_seed_scalar = changetype<At_default_bar_scalar_every_audio_prob_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const everyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, everyTagged, procLen)
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
        const everySrc: usize = everyAudioResult.ptr
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, probValue, seedValue, everyPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(everyBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, probValue, seedValue, everyAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[328].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_scalar_every_audio_prob_audio_seed_scalar = changetype<At_default_bar_scalar_every_audio_prob_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const everyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, everyTagged, procLen)
      const probAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, probTagged, procLen)
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
        const everySrc: usize = everyAudioResult.ptr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        const probSrc: usize = probAudioResult.ptr
        const probBuf: Float32Array = vm.arena.get(baseProcLen)
        const probPtr: usize = probBuf.dataStart
        downsample(vm, probSrc, probPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, seedValue, everyPtr, probPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(everyBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
        vm.arena.release(probBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, seedValue, everyAudioResult.ptr, probAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[329].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_scalar_prob_scalar_seed_scalar = changetype<At_default_bar_audio_every_scalar_prob_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
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
        const barSrc: usize = barAudioResult.ptr
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, everyValue, probValue, seedValue, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, everyValue, probValue, seedValue, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[330].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_scalar_prob_audio_seed_scalar = changetype<At_default_bar_audio_every_scalar_prob_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const probAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, probTagged, procLen)
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
        const barSrc: usize = barAudioResult.ptr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const probSrc: usize = probAudioResult.ptr
        const probBuf: Float32Array = vm.arena.get(baseProcLen)
        const probPtr: usize = probBuf.dataStart
        downsample(vm, probSrc, probPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, everyValue, seedValue, barPtr, probPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        vm.arena.release(probBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, everyValue, seedValue, barAudioResult.ptr, probAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[331].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_audio_prob_scalar_seed_scalar = changetype<At_default_bar_audio_every_audio_prob_scalar_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const everyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, everyTagged, procLen)
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
        const barSrc: usize = barAudioResult.ptr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const everySrc: usize = everyAudioResult.ptr
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, probValue, seedValue, barPtr, everyPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        vm.arena.release(everyBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, probValue, seedValue, barAudioResult.ptr, everyAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[332].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: At_default_bar_audio_every_audio_prob_audio_seed_scalar = changetype<At_default_bar_audio_every_audio_prob_audio_seed_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const barAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barTagged, procLen)
      const everyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, everyTagged, procLen)
      const probAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, probTagged, procLen)
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
        const barSrc: usize = barAudioResult.ptr
        const barBuf: Float32Array = vm.arena.get(baseProcLen)
        const barPtr: usize = barBuf.dataStart
        downsample(vm, barSrc, barPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barPtr + (usize(k) << 2), last)
          }
        }
        const everySrc: usize = everyAudioResult.ptr
        const everyBuf: Float32Array = vm.arena.get(baseProcLen)
        const everyPtr: usize = everyBuf.dataStart
        downsample(vm, everySrc, everyPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(everyPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(everyPtr + (usize(k) << 2), last)
          }
        }
        const probSrc: usize = probAudioResult.ptr
        const probBuf: Float32Array = vm.arena.get(baseProcLen)
        const probPtr: usize = probBuf.dataStart
        downsample(vm, probSrc, probPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(probPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(probPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, seedValue, barPtr, everyPtr, probPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        vm.arena.release(everyBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
        vm.arena.release(probBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, barAudioResult.ptr, everyAudioResult.ptr, probAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, everyAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, probAudioResult)
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
  if (isAudio(probTagged)) vm.arena.releaseByPtr(u32(decodeAudio(probTagged)))
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
