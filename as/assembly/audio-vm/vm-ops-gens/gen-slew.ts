// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Slew_default_up_audio_down_audio_exp_audio, Slew_default_up_audio_down_audio_exp_scalar, Slew_default_up_audio_down_scalar_exp_audio, Slew_default_up_audio_down_scalar_exp_scalar, Slew_default_up_scalar_down_audio_exp_audio, Slew_default_up_scalar_down_audio_exp_scalar, Slew_default_up_scalar_down_scalar_exp_audio, Slew_default_up_scalar_down_scalar_exp_scalar } from '../../gen/slew'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Slew(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Slew_default_up_scalar_down_scalar_exp_scalar(), 607, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(dst).copyFrom(changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(src))
  }, (dst: Object) => { changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_scalar_down_scalar_exp_audio(), 608, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_scalar_down_scalar_exp_audio>(dst).copyFrom(changetype<Slew_default_up_scalar_down_scalar_exp_audio>(src))
  }, (dst: Object) => { changetype<Slew_default_up_scalar_down_scalar_exp_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_scalar_down_audio_exp_scalar(), 609, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_scalar_down_audio_exp_scalar>(dst).copyFrom(changetype<Slew_default_up_scalar_down_audio_exp_scalar>(src))
  }, (dst: Object) => { changetype<Slew_default_up_scalar_down_audio_exp_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_scalar_down_audio_exp_audio(), 610, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_scalar_down_audio_exp_audio>(dst).copyFrom(changetype<Slew_default_up_scalar_down_audio_exp_audio>(src))
  }, (dst: Object) => { changetype<Slew_default_up_scalar_down_audio_exp_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_audio_down_scalar_exp_scalar(), 611, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_audio_down_scalar_exp_scalar>(dst).copyFrom(changetype<Slew_default_up_audio_down_scalar_exp_scalar>(src))
  }, (dst: Object) => { changetype<Slew_default_up_audio_down_scalar_exp_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_audio_down_scalar_exp_audio(), 612, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_audio_down_scalar_exp_audio>(dst).copyFrom(changetype<Slew_default_up_audio_down_scalar_exp_audio>(src))
  }, (dst: Object) => { changetype<Slew_default_up_audio_down_scalar_exp_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_audio_down_audio_exp_scalar(), 613, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_audio_down_audio_exp_scalar>(dst).copyFrom(changetype<Slew_default_up_audio_down_audio_exp_scalar>(src))
  }, (dst: Object) => { changetype<Slew_default_up_audio_down_audio_exp_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Slew_default_up_audio_down_audio_exp_audio(), 614, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Slew_default_up_audio_down_audio_exp_audio>(dst).copyFrom(changetype<Slew_default_up_audio_down_audio_exp_audio>(src))
  }, (dst: Object) => { changetype<Slew_default_up_audio_down_audio_exp_audio>(dst).reset() }))
}

export function handleGenOp_Slew(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenSlew_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const expTagged: f64 = vm.stack[--vm.stackTop]
  const downTagged: f64 = vm.stack[--vm.stackTop]
  const upTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(upTagged) || genOpHelpers.isStereoAudioArray(vm, upTagged)) {
    modeMask |= 1
  }
  if (isAudio(downTagged) || genOpHelpers.isStereoAudioArray(vm, downTagged)) {
    modeMask |= 2
  }
  if (isAudio(expTagged) || genOpHelpers.isStereoAudioArray(vm, expTagged)) {
    modeMask |= 4
  }
  const upValue: f32 = genOpHelpers.scalarOrFirstSample(vm, upTagged)
  vm.paramScratch[0] = upValue
  const downValue: f32 = genOpHelpers.scalarOrFirstSample(vm, downTagged)
  vm.paramScratch[1] = downValue
  const expValue: f32 = genOpHelpers.scalarOrFirstSample(vm, expTagged)
  vm.paramScratch[2] = expValue
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
              const slot: GenSlot = vm.genPools[607].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_scalar_exp_scalar = changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[607].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_scalar_exp_scalar = changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[608].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_scalar_exp_audio = changetype<Slew_default_up_scalar_down_scalar_exp_audio>(slot.instance)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[608].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_scalar_exp_audio = changetype<Slew_default_up_scalar_down_scalar_exp_audio>(slot.instance)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[609].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_audio_exp_scalar = changetype<Slew_default_up_scalar_down_audio_exp_scalar>(slot.instance)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, expValue, downAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[609].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_audio_exp_scalar = changetype<Slew_default_up_scalar_down_audio_exp_scalar>(slot.instance)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, expValue, downAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[610].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_audio_exp_audio = changetype<Slew_default_up_scalar_down_audio_exp_audio>(slot.instance)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downAudioPtr, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[610].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_scalar_down_audio_exp_audio = changetype<Slew_default_up_scalar_down_audio_exp_audio>(slot.instance)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downAudioPtr, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[611].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_scalar_exp_scalar = changetype<Slew_default_up_audio_down_scalar_exp_scalar>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, expValue, upAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[611].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_scalar_exp_scalar = changetype<Slew_default_up_audio_down_scalar_exp_scalar>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, expValue, upAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[612].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_scalar_exp_audio = changetype<Slew_default_up_audio_down_scalar_exp_audio>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, upAudioPtr, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[612].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_scalar_exp_audio = changetype<Slew_default_up_audio_down_scalar_exp_audio>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, upAudioPtr, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[613].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_audio_exp_scalar = changetype<Slew_default_up_audio_down_audio_exp_scalar>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, expValue, upAudioPtr, downAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[613].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_audio_exp_scalar = changetype<Slew_default_up_audio_down_audio_exp_scalar>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, expValue, upAudioPtr, downAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[614].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_audio_exp_audio = changetype<Slew_default_up_audio_down_audio_exp_audio>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upAudioPtr, downAudioPtr, expAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[614].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Slew_default_up_audio_down_audio_exp_audio = changetype<Slew_default_up_audio_down_audio_exp_audio>(slot.instance)
              const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
              const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
              const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upAudioPtr, downAudioPtr, expAudioPtr)
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
      const slot: GenSlot = vm.genPools[607].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_scalar_down_scalar_exp_scalar = changetype<Slew_default_up_scalar_down_scalar_exp_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[608].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_scalar_down_scalar_exp_audio = changetype<Slew_default_up_scalar_down_scalar_exp_audio>(slot.instance)
      const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downValue, expAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[609].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_scalar_down_audio_exp_scalar = changetype<Slew_default_up_scalar_down_audio_exp_scalar>(slot.instance)
      const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, expValue, downAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[610].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_scalar_down_audio_exp_audio = changetype<Slew_default_up_scalar_down_audio_exp_audio>(slot.instance)
      const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
      const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upValue, downAudioPtr, expAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[611].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_audio_down_scalar_exp_scalar = changetype<Slew_default_up_audio_down_scalar_exp_scalar>(slot.instance)
      const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, expValue, upAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[612].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_audio_down_scalar_exp_audio = changetype<Slew_default_up_audio_down_scalar_exp_audio>(slot.instance)
      const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
      const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, downValue, upAudioPtr, expAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[613].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_audio_down_audio_exp_scalar = changetype<Slew_default_up_audio_down_audio_exp_scalar>(slot.instance)
      const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
      const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, expValue, upAudioPtr, downAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[614].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Slew_default_up_audio_down_audio_exp_audio = changetype<Slew_default_up_audio_down_audio_exp_audio>(slot.instance)
      const upAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, upTagged, procLen)
      const downAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, downTagged, procLen)
      const expAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, expTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, upAudioPtr, downAudioPtr, expAudioPtr)
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
  if (isAudio(upTagged)) vm.arena.releaseByPtr(u32(decodeAudio(upTagged)))
  if (isAudio(downTagged)) vm.arena.releaseByPtr(u32(decodeAudio(downTagged)))
  if (isAudio(expTagged)) vm.arena.releaseByPtr(u32(decodeAudio(expTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
