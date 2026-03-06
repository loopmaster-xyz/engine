// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio, Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar, Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio, Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar, Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio, Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar, Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio, Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar, Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio, Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar, Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio, Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar, Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio, Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar, Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio, Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar } from '../../gen/diodeladder'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Diodeladder(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar(), 409, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio(), 410, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar(), 411, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio(), 412, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar(), 413, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio(), 414, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar(), 415, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio(), 416, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar(), 417, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio(), 418, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar(), 419, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio(), 420, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar(), 421, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio(), 422, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar(), 423, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio(), 424, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(dst).copyFrom(changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(src))
  }, (dst: Object) => { changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(dst).reset() }))
}

export function handleGenOp_Diodeladder(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenDiodeladder_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const satTagged: f64 = vm.stack[--vm.stackTop]
  const kTagged: f64 = vm.stack[--vm.stackTop]
  const qTagged: f64 = vm.stack[--vm.stackTop]
  const cutoffTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(cutoffTagged) || genOpHelpers.isStereoAudioArray(vm, cutoffTagged)) {
    modeMask |= 1
  }
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
  }
  if (isAudio(kTagged) || genOpHelpers.isStereoAudioArray(vm, kTagged)) {
    modeMask |= 4
  }
  if (isAudio(satTagged) || genOpHelpers.isStereoAudioArray(vm, satTagged)) {
    modeMask |= 8
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
  const kValue: f32 = genOpHelpers.scalarOrFirstSample(vm, kTagged)
  vm.paramScratch[2] = kValue
  const satValue: f32 = genOpHelpers.scalarOrFirstSample(vm, satTagged)
  vm.paramScratch[3] = satValue
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
              const slot: GenSlot = vm.genPools[409].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[409].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 8: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[410].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(slot.instance)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[410].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(slot.instance)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[411].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(slot.instance)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, satValue, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[411].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(slot.instance)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, satValue, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 12: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[412].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(slot.instance)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[412].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(slot.instance)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[413].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, satValue, qAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[413].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, satValue, qAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 10: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[414].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, qAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[414].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, qAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[415].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, satValue, qAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[415].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, satValue, qAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 14: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[416].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioPtr, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[416].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(slot.instance)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioPtr, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[417].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, satValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[417].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, satValue, cutoffAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 9: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[418].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, cutoffAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[418].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, cutoffAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[419].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, satValue, cutoffAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[419].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, satValue, cutoffAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 13: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[420].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[420].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[421].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, satValue, cutoffAudioPtr, qAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[421].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, satValue, cutoffAudioPtr, qAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 11: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[422].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, cutoffAudioPtr, qAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[422].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, cutoffAudioPtr, qAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[423].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, satValue, cutoffAudioPtr, qAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[423].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, satValue, cutoffAudioPtr, qAudioPtr, kAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 15: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[424].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioPtr, qAudioPtr, kAudioPtr, satAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[424].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(slot.instance)
              const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
              const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
              const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
              const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioPtr, qAudioPtr, kAudioPtr, satAudioPtr)
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
      const slot: GenSlot = vm.genPools[409].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[410].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio>(slot.instance)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kValue, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[411].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar>(slot.instance)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, satValue, kAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[412].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio>(slot.instance)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, kAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[413].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar>(slot.instance)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, satValue, qAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[414].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio>(slot.instance)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, kValue, qAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[415].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar>(slot.instance)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, satValue, qAudioPtr, kAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[416].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio>(slot.instance)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioPtr, kAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[417].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, satValue, cutoffAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[418].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, kValue, cutoffAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[419].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, satValue, cutoffAudioPtr, kAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[420].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioPtr, kAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[421].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, satValue, cutoffAudioPtr, qAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[422].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kValue, cutoffAudioPtr, qAudioPtr, satAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[423].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, satValue, cutoffAudioPtr, qAudioPtr, kAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[424].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio = changetype<Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio>(slot.instance)
      const cutoffAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, cutoffTagged, procLen)
      const qAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, qTagged, procLen)
      const kAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kTagged, procLen)
      const satAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, satTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioPtr, qAudioPtr, kAudioPtr, satAudioPtr)
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
  if (isAudio(kTagged)) vm.arena.releaseByPtr(u32(decodeAudio(kTagged)))
  if (isAudio(satTagged)) vm.arena.releaseByPtr(u32(decodeAudio(satTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
