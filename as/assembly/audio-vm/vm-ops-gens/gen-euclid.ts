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
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar(), 157, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio(), 158, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar(), 159, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio(), 160, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar(), 161, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio(), 162, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar(), 163, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio(), 164, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar(), 165, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio(), 166, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar(), 167, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio(), 168, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar(), 169, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio(), 170, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar(), 171, 5, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(dst).copyFrom(changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(src))
  }, (dst: Object) => { changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio(), 172, 5, vm.genPoolManager, (dst: Object, src: Object) => {
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
      const slot: GenSlot = vm.genPools[157].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar>(slot.instance)
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
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[158].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, offsetValue, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, offsetValue, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[159].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const offsetSrc: usize = offsetAudioPtr
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
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, barValue, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[160].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio = changetype<Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const offsetSrc: usize = offsetAudioPtr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsValue, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(offsetBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsValue, offsetAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[161].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
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
        const stepsSrc: usize = stepsAudioPtr
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
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, offsetValue, barValue, stepsAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[162].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio = changetype<Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
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
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, offsetValue, stepsPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, offsetValue, stepsAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[163].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar = changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
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
        vm.arena.release(offsetBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, barValue, stepsAudioPtr, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[164].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio = changetype<Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesValue, stepsPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepsBuf)
        vm.arena.release(offsetBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesValue, stepsAudioPtr, offsetAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[165].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
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
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, offsetValue, barValue, pulsesAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[166].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio = changetype<Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, offsetValue, pulsesPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, offsetValue, pulsesAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[167].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar = changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
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
        vm.arena.release(offsetBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, barValue, pulsesAudioPtr, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[168].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio = changetype<Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepsValue, pulsesPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        vm.arena.release(offsetBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepsValue, pulsesAudioPtr, offsetAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[169].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar = changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioPtr
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
        vm.arena.release(stepsBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, barValue, pulsesAudioPtr, stepsAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[170].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio = changetype<Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, offsetValue, pulsesPtr, stepsPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        vm.arena.release(stepsBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, pulsesAudioPtr, stepsAudioPtr, barAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[171].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar = changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
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
        vm.arena.release(stepsBuf)
        vm.arena.release(offsetBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barValue, pulsesAudioPtr, stepsAudioPtr, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[172].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio = changetype<Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio>(slot.instance)
      vm.paramScratch[4] = instance.fired
      const pulsesAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, pulsesTagged, procLen)
      const stepsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, stepsTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
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
        const pulsesSrc: usize = pulsesAudioPtr
        const pulsesBuf: Float32Array = vm.arena.get(baseProcLen)
        const pulsesPtr: usize = pulsesBuf.dataStart
        downsample(vm, pulsesSrc, pulsesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(pulsesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(pulsesPtr + (usize(k) << 2), last)
          }
        }
        const stepsSrc: usize = stepsAudioPtr
        const stepsBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepsPtr: usize = stepsBuf.dataStart
        downsample(vm, stepsSrc, stepsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepsPtr + (usize(k) << 2), last)
          }
        }
        const offsetSrc: usize = offsetAudioPtr
        const offsetBuf: Float32Array = vm.arena.get(baseProcLen)
        const offsetPtr: usize = offsetBuf.dataStart
        downsample(vm, offsetSrc, offsetPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(offsetPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(offsetPtr + (usize(k) << 2), last)
          }
        }
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, pulsesPtr, stepsPtr, offsetPtr, barPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(pulsesBuf)
        vm.arena.release(stepsBuf)
        vm.arena.release(offsetBuf)
        vm.arena.release(barBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, pulsesAudioPtr, stepsAudioPtr, offsetAudioPtr, barAudioPtr)
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
