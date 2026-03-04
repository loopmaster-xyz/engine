// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Moog_hpm_cutoff_audio_q_scalar, Moog_hpm_cutoff_scalar_q_scalar, Moog_lpm_cutoff_audio_q_scalar, Moog_lpm_cutoff_scalar_q_scalar } from '../../gen/moog'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Moog(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Moog_lpm_cutoff_scalar_q_scalar(), 661, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Moog_lpm_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Moog_lpm_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Moog_lpm_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Moog_lpm_cutoff_audio_q_scalar(), 662, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Moog_lpm_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Moog_lpm_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Moog_lpm_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Moog_hpm_cutoff_scalar_q_scalar(), 663, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Moog_hpm_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Moog_hpm_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Moog_hpm_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Moog_hpm_cutoff_audio_q_scalar(), 664, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Moog_hpm_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Moog_hpm_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Moog_hpm_cutoff_audio_q_scalar>(dst).reset() }))
}

export function handleGenOp_Moog(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenMoog_lpm: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const qTagged: f64 = vm.stack[--vm.stackTop]
  const cutoffTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(cutoffTagged) || genOpHelpers.isStereoAudioArray(vm, cutoffTagged)) {
    modeMask |= 1
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
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
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[661].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_lpm_cutoff_scalar_q_scalar = changetype<Moog_lpm_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[661].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_lpm_cutoff_scalar_q_scalar = changetype<Moog_lpm_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[662].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_lpm_cutoff_audio_q_scalar = changetype<Moog_lpm_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[662].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_lpm_cutoff_audio_q_scalar = changetype<Moog_lpm_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
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
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[661].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Moog_lpm_cutoff_scalar_q_scalar = changetype<Moog_lpm_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[662].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Moog_lpm_cutoff_audio_q_scalar = changetype<Moog_lpm_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
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
  if (isAudio(inputResolved)) vm.arena.releaseByPtr(u32(decodeAudio(inputResolved)))
  push(vm, encodeAudio(output.dataStart), true)
  if (isAudio(cutoffTagged)) vm.arena.releaseByPtr(u32(decodeAudio(cutoffTagged)))
  if (isAudio(qTagged)) vm.arena.releaseByPtr(u32(decodeAudio(qTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

case AudioVmOp.GenMoog_hpm: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const qTagged: f64 = vm.stack[--vm.stackTop]
  const cutoffTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(cutoffTagged) || genOpHelpers.isStereoAudioArray(vm, cutoffTagged)) {
    modeMask |= 1
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
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
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[663].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_hpm_cutoff_scalar_q_scalar = changetype<Moog_hpm_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[663].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_hpm_cutoff_scalar_q_scalar = changetype<Moog_hpm_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[664].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_hpm_cutoff_audio_q_scalar = changetype<Moog_hpm_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[664].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Moog_hpm_cutoff_audio_q_scalar = changetype<Moog_hpm_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
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
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[663].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Moog_hpm_cutoff_scalar_q_scalar = changetype<Moog_hpm_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[664].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Moog_hpm_cutoff_audio_q_scalar = changetype<Moog_hpm_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr)
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
  if (isAudio(inputResolved)) vm.arena.releaseByPtr(u32(decodeAudio(inputResolved)))
  push(vm, encodeAudio(output.dataStart), true)
  if (isAudio(cutoffTagged)) vm.arena.releaseByPtr(u32(decodeAudio(cutoffTagged)))
  if (isAudio(qTagged)) vm.arena.releaseByPtr(u32(decodeAudio(qTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
