// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Sustain_default_seconds_audio_trig_audio, Sustain_default_seconds_audio_trig_scalar, Sustain_default_seconds_scalar_trig_audio, Sustain_default_seconds_scalar_trig_scalar } from '../../gen/sustain'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Sustain(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Sustain_default_seconds_scalar_trig_scalar(), 269, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sustain_default_seconds_scalar_trig_scalar>(dst).copyFrom(changetype<Sustain_default_seconds_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Sustain_default_seconds_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sustain_default_seconds_scalar_trig_audio(), 270, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sustain_default_seconds_scalar_trig_audio>(dst).copyFrom(changetype<Sustain_default_seconds_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Sustain_default_seconds_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sustain_default_seconds_audio_trig_scalar(), 271, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sustain_default_seconds_audio_trig_scalar>(dst).copyFrom(changetype<Sustain_default_seconds_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Sustain_default_seconds_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Sustain_default_seconds_audio_trig_audio(), 272, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Sustain_default_seconds_audio_trig_audio>(dst).copyFrom(changetype<Sustain_default_seconds_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Sustain_default_seconds_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Sustain(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenSustain_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const secondsTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(secondsTagged) || genOpHelpers.isStereoAudioArray(vm, secondsTagged)) {
    modeMask |= 1
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 2
  }
  const secondsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, secondsTagged)
  vm.paramScratch[0] = secondsValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[1] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[269].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sustain_default_seconds_scalar_trig_scalar = changetype<Sustain_default_seconds_scalar_trig_scalar>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, secondsValue, trigValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, secondsValue, trigValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[270].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sustain_default_seconds_scalar_trig_audio = changetype<Sustain_default_seconds_scalar_trig_audio>(slot.instance)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, secondsValue, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, secondsValue, trigAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[271].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sustain_default_seconds_audio_trig_scalar = changetype<Sustain_default_seconds_audio_trig_scalar>(slot.instance)
      const secondsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, secondsTagged, procLen)
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
        const secondsSrc: usize = secondsAudioPtr
        const secondsBuf: Float32Array = vm.arena.get(baseProcLen)
        const secondsPtr: usize = secondsBuf.dataStart
        downsample(vm, secondsSrc, secondsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(secondsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(secondsPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, trigValue, secondsPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(secondsBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, secondsAudioPtr)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[272].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Sustain_default_seconds_audio_trig_audio = changetype<Sustain_default_seconds_audio_trig_audio>(slot.instance)
      const secondsAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, secondsTagged, procLen)
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
        const secondsSrc: usize = secondsAudioPtr
        const secondsBuf: Float32Array = vm.arena.get(baseProcLen)
        const secondsPtr: usize = secondsBuf.dataStart
        downsample(vm, secondsSrc, secondsPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(secondsPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(secondsPtr + (usize(k) << 2), last)
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, secondsPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(secondsBuf)
        vm.arena.release(trigBuf)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, secondsAudioPtr, trigAudioPtr)
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
  if (isAudio(secondsTagged)) vm.arena.releaseByPtr(u32(decodeAudio(secondsTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
