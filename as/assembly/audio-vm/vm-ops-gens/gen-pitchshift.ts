// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Pitchshift_default_ratio_audio, Pitchshift_default_ratio_scalar } from '../../gen/pitchshift'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Pitchshift(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Pitchshift_default_ratio_scalar(), 392, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pitchshift_default_ratio_scalar>(dst).copyFrom(changetype<Pitchshift_default_ratio_scalar>(src))
  }, (dst: Object) => { changetype<Pitchshift_default_ratio_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Pitchshift_default_ratio_audio(), 393, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Pitchshift_default_ratio_audio>(dst).copyFrom(changetype<Pitchshift_default_ratio_audio>(src))
  }, (dst: Object) => { changetype<Pitchshift_default_ratio_audio>(dst).reset() }))
}

export function handleGenOp_Pitchshift(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenPitchshift_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const ratioTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(ratioTagged) || genOpHelpers.isStereoAudioArray(vm, ratioTagged)) {
    modeMask |= 1
  }
  const ratioValue: f32 = genOpHelpers.scalarOrFirstSample(vm, ratioTagged)
  vm.paramScratch[0] = ratioValue
  if (isArray(inputResolved)) {
    const inputArrId: u32 = decodeArray(inputResolved)
    if (inputArrId > 0 && inputArrId <= u32(vm.arrays.length)) {
      const inputArr: Float64Array = vm.arrays.get(i32(inputArrId) - 1)
      const inputArrLen: i32 = vm.arrayLengths.get(i32(inputArrId) - 1)
      if (inputArrLen >= 2) {
        const inputLeftTagged: f64 = inputArr[0]
        const inputRightTagged: f64 = inputArr[1]
        const inputLeftResolved: f64 = vmOpsVars.resolveCellRef(vm, inputLeftTagged)
        const inputRightResolved: f64 = vmOpsVars.resolveCellRef(vm, inputRightTagged)
        let outputL: Float32Array = changetype<Float32Array>(0)
        let outputR: Float32Array = changetype<Float32Array>(0)
        switch (modeMask) {
          case 0: {
            {
              const slot: GenSlot = vm.genPools[392].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Pitchshift_default_ratio_scalar = changetype<Pitchshift_default_ratio_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[392].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Pitchshift_default_ratio_scalar = changetype<Pitchshift_default_ratio_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[393].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Pitchshift_default_ratio_audio = changetype<Pitchshift_default_ratio_audio>(slot.instance)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[393].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Pitchshift_default_ratio_audio = changetype<Pitchshift_default_ratio_audio>(slot.instance)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
        }
        const stereoArr: Float64Array = vm.float64Arena.get(2)
        stereoArr[0] = encodeAudio(outputL.dataStart)
        stereoArr[1] = encodeAudio(outputR.dataStart)
        vm.arrays.push(stereoArr)
        vm.arrayLengths.push(2)
        vm.arrayRefcounts.push(0)
        push(vm, encodeArray(u32(vm.arrays.length)))
        heap.releaseValue(vm, inputResolved)
        if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
        return pc
      }
    }
  }
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[392].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pitchshift_default_ratio_scalar = changetype<Pitchshift_default_ratio_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[393].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Pitchshift_default_ratio_audio = changetype<Pitchshift_default_ratio_audio>(slot.instance)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    default: {
      const procLen: i32 = (params.bufferLength + 15) & ~15
      output = vm.arena.get(procLen)
      memory.fill(output.dataStart, 0, usize(procLen) << 2)
      break
    }
  }
  if (isAudio(inputResolved)) vm.arena.releaseByPtr(u32(decodeAudio(inputResolved)))
  push(vm, encodeAudio(output.dataStart), true)
  if (isAudio(ratioTagged)) vm.arena.releaseByPtr(u32(decodeAudio(ratioTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
