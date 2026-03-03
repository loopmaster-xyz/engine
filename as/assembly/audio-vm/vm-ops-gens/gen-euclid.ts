// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio, Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar, Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio, Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar, Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio, Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar, Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio, Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar, Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio, Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar, Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio, Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar, Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio, Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar, Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio, Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar } from '../../gen/euclid'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Euclid(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar(), 151, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio(), 152, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar(), 153, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio(), 154, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar(), 155, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio(), 156, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar(), 157, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio(), 158, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar(), 159, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio(), 160, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar(), 161, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio(), 162, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar(), 163, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio(), 164, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar(), 165, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio(), 166, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio>(dst).reset() }))
}

export function handleGenOp_Euclid(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenEuclid_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const barTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const stepsTagged: f64 = vm.stack[--vm.stackTop]
  const pulsesTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(pulsesTagged) || genOpHelpers.isStereoAudioArray(vm, pulsesTagged)) {
    modeMask |= 1
  }
  if (isAudio(stepsTagged) || genOpHelpers.isStereoAudioArray(vm, stepsTagged)) {
    modeMask |= 2
  }
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 4
  }
  if (isAudio(barTagged) || genOpHelpers.isStereoAudioArray(vm, barTagged)) {
    modeMask |= 8
  }
  const pulsesValue: f32 = genOpHelpers.scalarOrFirstSample(vm, pulsesTagged)
  vm.paramScratch[0] = pulsesValue
  const stepsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, stepsTagged)
  vm.paramScratch[1] = stepsValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[2] = offsetValue
  const barValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barTagged)
  vm.paramScratch[3] = barValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[151].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, offsetValue, barValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, offsetValue, barValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 8: {
      const slot: GenSlot = vm.genPools[152].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, offsetValue, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, offsetValue, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[153].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, barValue, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, barValue, offsetAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[154].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(slot.instance)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, offsetAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[155].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(slot.instance)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
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
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, offsetValue, barValue, stepsPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, offsetValue, barValue, stepsAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[156].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio = changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(slot.instance)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
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
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, offsetValue, stepsPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, offsetValue, stepsAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[157].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(slot.instance)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, barValue, stepsPtr, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, barValue, stepsAudioResult.ptr, offsetAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[158].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio = changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(slot.instance)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsAudioResult.ptr, offsetAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[159].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, offsetValue, barValue, pulsesPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, offsetValue, barValue, pulsesAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[160].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio = changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, offsetValue, pulsesPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, offsetValue, pulsesAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[161].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar = changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, barValue, pulsesPtr, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, barValue, pulsesAudioResult.ptr, offsetAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[162].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio = changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, pulsesPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, pulsesAudioResult.ptr, offsetAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[163].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, offsetValue, barValue, pulsesPtr, stepsPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, barValue, pulsesAudioResult.ptr, stepsAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[164].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio = changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, offsetValue, pulsesPtr, stepsPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, pulsesAudioResult.ptr, stepsAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[165].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar = changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barValue, pulsesPtr, stepsPtr, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, pulsesAudioResult.ptr, stepsAudioResult.ptr, offsetAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[166].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio = changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio>(slot.instance)
      const pulsesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, pulsesTagged, procLen)
      const stepsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepsTagged, procLen)
      const offsetAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioResult.ptr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioResult.ptr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioResult.ptr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesPtr, stepsPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        vm.arena.release(stepsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        vm.arena.release(offsetBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        vm.arena.release(barBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesAudioResult.ptr, stepsAudioResult.ptr, offsetAudioResult.ptr, barAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, pulsesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepsAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, offsetAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barAudioResult)
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
  if (isAudio(pulsesTagged)) vm.arena.releaseByPtr(u32(decodeAudio(pulsesTagged)))
  if (isAudio(stepsTagged)) vm.arena.releaseByPtr(u32(decodeAudio(stepsTagged)))
  if (isAudio(offsetTagged)) vm.arena.releaseByPtr(u32(decodeAudio(offsetTagged)))
  if (isAudio(barTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
