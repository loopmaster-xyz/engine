// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Every_default_bars_audio, Every_default_bars_scalar } from '../../gen/every'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Every(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Every_default_bars_scalar(), 8, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_scalar>(dst).copyFrom(changetype<Every_default_bars_scalar>(src))
  }, (dst: Object) => { changetype<Every_default_bars_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Every_default_bars_audio(), 9, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Every_default_bars_audio>(dst).copyFrom(changetype<Every_default_bars_audio>(src))
  }, (dst: Object) => { changetype<Every_default_bars_audio>(dst).reset() }))
}

export function handleGenOp_Every(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenEvery_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const barsTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(barsTagged) || genOpHelpers.isStereoAudioArray(vm, barsTagged)) {
    modeMask |= 1
  }
  const barsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barsTagged)
  vm.paramScratch[0] = barsValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[8].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_scalar = changetype<Every_default_bars_scalar>(slot.instance)
      vm.paramScratch[1] = instance.fired
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[9].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Every_default_bars_audio = changetype<Every_default_bars_audio>(slot.instance)
      vm.paramScratch[1] = instance.fired
      const barsAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, barsTagged, procLen)
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
        const barsSrc: usize = barsAudioResult.ptr
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
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, barsPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(barsBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barsAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, barsAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, barsAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, barsAudioResult)
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
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
