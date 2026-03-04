// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Every_default_bars_audio_offset_audio_length_audio, Every_default_bars_audio_offset_audio_length_scalar, Every_default_bars_audio_offset_scalar_length_audio, Every_default_bars_audio_offset_scalar_length_scalar, Every_default_bars_scalar_offset_audio_length_audio, Every_default_bars_scalar_offset_audio_length_scalar, Every_default_bars_scalar_offset_scalar_length_audio, Every_default_bars_scalar_offset_scalar_length_scalar } from '../../gen/every'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Every(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Every_default_bars_scalar_offset_scalar_length_scalar(), 8, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_scalar_offset_scalar_length_scalar>(dst).copyFrom(changetype<Every_default_bars_scalar_offset_scalar_length_scalar>(src))
  }, (dst: Object) => { changetype<Every_default_bars_scalar_offset_scalar_length_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_scalar_offset_scalar_length_audio(), 9, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_scalar_offset_scalar_length_audio>(dst).copyFrom(changetype<Every_default_bars_scalar_offset_scalar_length_audio>(src))
  }, (dst: Object) => { changetype<Every_default_bars_scalar_offset_scalar_length_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_scalar_offset_audio_length_scalar(), 10, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_scalar_offset_audio_length_scalar>(dst).copyFrom(changetype<Every_default_bars_scalar_offset_audio_length_scalar>(src))
  }, (dst: Object) => { changetype<Every_default_bars_scalar_offset_audio_length_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_scalar_offset_audio_length_audio(), 11, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_scalar_offset_audio_length_audio>(dst).copyFrom(changetype<Every_default_bars_scalar_offset_audio_length_audio>(src))
  }, (dst: Object) => { changetype<Every_default_bars_scalar_offset_audio_length_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_audio_offset_scalar_length_scalar(), 12, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_audio_offset_scalar_length_scalar>(dst).copyFrom(changetype<Every_default_bars_audio_offset_scalar_length_scalar>(src))
  }, (dst: Object) => { changetype<Every_default_bars_audio_offset_scalar_length_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_audio_offset_scalar_length_audio(), 13, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_audio_offset_scalar_length_audio>(dst).copyFrom(changetype<Every_default_bars_audio_offset_scalar_length_audio>(src))
  }, (dst: Object) => { changetype<Every_default_bars_audio_offset_scalar_length_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_audio_offset_audio_length_scalar(), 14, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_audio_offset_audio_length_scalar>(dst).copyFrom(changetype<Every_default_bars_audio_offset_audio_length_scalar>(src))
  }, (dst: Object) => { changetype<Every_default_bars_audio_offset_audio_length_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_audio_offset_audio_length_audio(), 15, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_audio_offset_audio_length_audio>(dst).copyFrom(changetype<Every_default_bars_audio_offset_audio_length_audio>(src))
  }, (dst: Object) => { changetype<Every_default_bars_audio_offset_audio_length_audio>(dst).reset() }))
}

export function handleGenOp_Every(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenEvery_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const lengthTagged: f64 = vm.stack[--vm.stackTop]
  const offsetTagged: f64 = vm.stack[--vm.stackTop]
  const barsTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(barsTagged) || genOpHelpers.isStereoAudioArray(vm, barsTagged)) {
    modeMask |= 1
  }
  if (isAudio(offsetTagged) || genOpHelpers.isStereoAudioArray(vm, offsetTagged)) {
    modeMask |= 2
  }
  if (isAudio(lengthTagged) || genOpHelpers.isStereoAudioArray(vm, lengthTagged)) {
    modeMask |= 4
  }
  const barsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barsTagged)
  vm.paramScratch[0] = barsValue
  const offsetValue: f32 = genOpHelpers.scalarOrFirstSample(vm, offsetTagged)
  vm.paramScratch[1] = offsetValue
  const lengthValue: f32 = genOpHelpers.scalarOrFirstSample(vm, lengthTagged)
  vm.paramScratch[2] = lengthValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[8].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_scalar_offset_scalar_length_scalar = changetype<Every_default_bars_scalar_offset_scalar_length_scalar>(slot.instance)
      vm.paramScratch[3] = instance.fired
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsValue, offsetValue, lengthValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsValue, offsetValue, lengthValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[9].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_scalar_offset_scalar_length_audio = changetype<Every_default_bars_scalar_offset_scalar_length_audio>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const lengthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, lengthTagged, procLen)
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
        const lengthSrc: usize = lengthAudioPtr
        const lengthBuf: Float32Array = vm.arena.get(baseProcLen)
        const lengthPtr: usize = lengthBuf.dataStart
        downsample(vm, lengthSrc, lengthPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(lengthPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(lengthPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsValue, offsetValue, lengthPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(lengthBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsValue, offsetValue, lengthAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[10].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_scalar_offset_audio_length_scalar = changetype<Every_default_bars_scalar_offset_audio_length_scalar>(slot.instance)
      vm.paramScratch[3] = instance.fired
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsValue, lengthValue, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(offsetBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsValue, lengthValue, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[11].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_scalar_offset_audio_length_audio = changetype<Every_default_bars_scalar_offset_audio_length_audio>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const lengthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, lengthTagged, procLen)
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
        const lengthSrc: usize = lengthAudioPtr
        const lengthBuf: Float32Array = vm.arena.get(baseProcLen)
        const lengthPtr: usize = lengthBuf.dataStart
        downsample(vm, lengthSrc, lengthPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(lengthPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(lengthPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsValue, offsetPtr, lengthPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(offsetBuf)
        vm.arena.release(lengthBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsValue, offsetAudioPtr, lengthAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[12].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_audio_offset_scalar_length_scalar = changetype<Every_default_bars_audio_offset_scalar_length_scalar>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const barsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barsTagged, procLen)
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
        const barsSrc: usize = barsAudioPtr
        const barsBuf: Float32Array = vm.arena.get(baseProcLen)
        const barsPtr: usize = barsBuf.dataStart
        downsample(vm, barsSrc, barsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barsPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, offsetValue, lengthValue, barsPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barsBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, lengthValue, barsAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[13].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_audio_offset_scalar_length_audio = changetype<Every_default_bars_audio_offset_scalar_length_audio>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const barsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barsTagged, procLen)
      const lengthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, lengthTagged, procLen)
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
        const barsSrc: usize = barsAudioPtr
        const barsBuf: Float32Array = vm.arena.get(baseProcLen)
        const barsPtr: usize = barsBuf.dataStart
        downsample(vm, barsSrc, barsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barsPtr + (usize(k) << 2), last)
          }
        }
        const lengthSrc: usize = lengthAudioPtr
        const lengthBuf: Float32Array = vm.arena.get(baseProcLen)
        const lengthPtr: usize = lengthBuf.dataStart
        downsample(vm, lengthSrc, lengthPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(lengthPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(lengthPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, offsetValue, barsPtr, lengthPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barsBuf)
        vm.arena.release(lengthBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, offsetValue, barsAudioPtr, lengthAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[14].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_audio_offset_audio_length_scalar = changetype<Every_default_bars_audio_offset_audio_length_scalar>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const barsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barsTagged, procLen)
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
        const barsSrc: usize = barsAudioPtr
        const barsBuf: Float32Array = vm.arena.get(baseProcLen)
        const barsPtr: usize = barsBuf.dataStart
        downsample(vm, barsSrc, barsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barsPtr + (usize(k) << 2), last)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, lengthValue, barsPtr, offsetPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barsBuf)
        vm.arena.release(offsetBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, lengthValue, barsAudioPtr, offsetAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[15].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_audio_offset_audio_length_audio = changetype<Every_default_bars_audio_offset_audio_length_audio>(slot.instance)
      vm.paramScratch[3] = instance.fired
      const barsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, barsTagged, procLen)
      const offsetAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, offsetTagged, procLen)
      const lengthAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, lengthTagged, procLen)
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
        const barsSrc: usize = barsAudioPtr
        const barsBuf: Float32Array = vm.arena.get(baseProcLen)
        const barsPtr: usize = barsBuf.dataStart
        downsample(vm, barsSrc, barsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(barsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(barsPtr + (usize(k) << 2), last)
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
        const lengthSrc: usize = lengthAudioPtr
        const lengthBuf: Float32Array = vm.arena.get(baseProcLen)
        const lengthPtr: usize = lengthBuf.dataStart
        downsample(vm, lengthSrc, lengthPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(lengthPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(lengthPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsPtr, offsetPtr, lengthPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barsBuf)
        vm.arena.release(offsetBuf)
        vm.arena.release(lengthBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsAudioPtr, offsetAudioPtr, lengthAudioPtr)
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
  if (isAudio(barsTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barsTagged)))
  if (isAudio(offsetTagged)) vm.arena.releaseByPtr(u32(decodeAudio(offsetTagged)))
  if (isAudio(lengthTagged)) vm.arena.releaseByPtr(u32(decodeAudio(lengthTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
