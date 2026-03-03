// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Biquadshelf_hs_cutoff_audio_q_audio_gain_audio, Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar, Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio, Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar, Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio, Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar, Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio, Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar, Biquadshelf_ls_cutoff_audio_q_audio_gain_audio, Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar, Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio, Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar, Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio, Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar, Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio, Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar, Biquadshelf_peak_cutoff_audio_q_audio_gain_audio, Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar, Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio, Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar, Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio, Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar, Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio, Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar } from '../../gen/biquadshelf'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Biquadshelf(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar(), 623, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio(), 624, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar(), 625, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio(), 626, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar(), 627, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio(), 628, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar(), 629, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_ls_cutoff_audio_q_audio_gain_audio(), 630, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar(), 631, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio(), 632, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar(), 633, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio(), 634, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar(), 635, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio(), 636, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar(), 637, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_hs_cutoff_audio_q_audio_gain_audio(), 638, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar(), 639, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio(), 640, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar(), 641, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio(), 642, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar(), 643, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio(), 644, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar(), 645, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquadshelf_peak_cutoff_audio_q_audio_gain_audio(), 646, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(dst).copyFrom(changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(src))
  }, (dst: Object) => { changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(dst).reset() }))
}

export function handleGenOp_Biquadshelf(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenBiquadshelf_ls: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const gainTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(gainTagged) || genOpHelpers.isStereoAudioArray(vm, gainTagged)) {
    modeMask |= 4
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
  const gainValue: f32 = genOpHelpers.scalarOrFirstSample(vm, gainTagged)
  vm.paramScratch[2] = gainValue
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
              const slot: GenSlot = vm.genPools[623].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[623].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const slot: GenSlot = vm.genPools[624].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[624].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[625].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[625].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const slot: GenSlot = vm.genPools[626].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[626].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[627].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[627].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const slot: GenSlot = vm.genPools[628].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[628].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[629].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[629].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const slot: GenSlot = vm.genPools[630].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[630].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
      const slot: GenSlot = vm.genPools[623].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[624].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[625].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[626].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[627].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[628].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[629].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[630].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_ls_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_ls_cutoff_audio_q_audio_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
  if (isAudio(gainTagged)) vm.arena.releaseByPtr(u32(decodeAudio(gainTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

case AudioVmOp.GenBiquadshelf_hs: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const gainTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(gainTagged) || genOpHelpers.isStereoAudioArray(vm, gainTagged)) {
    modeMask |= 4
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
  const gainValue: f32 = genOpHelpers.scalarOrFirstSample(vm, gainTagged)
  vm.paramScratch[2] = gainValue
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
              const slot: GenSlot = vm.genPools[631].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[631].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const slot: GenSlot = vm.genPools[632].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[632].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[633].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[633].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const slot: GenSlot = vm.genPools[634].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[634].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[635].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[635].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const slot: GenSlot = vm.genPools[636].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[636].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[637].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[637].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const slot: GenSlot = vm.genPools[638].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[638].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
      const slot: GenSlot = vm.genPools[631].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[632].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[633].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[634].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[635].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[636].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[637].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[638].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_hs_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_hs_cutoff_audio_q_audio_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
  if (isAudio(gainTagged)) vm.arena.releaseByPtr(u32(decodeAudio(gainTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

case AudioVmOp.GenBiquadshelf_peak: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const gainTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(gainTagged) || genOpHelpers.isStereoAudioArray(vm, gainTagged)) {
    modeMask |= 4
  }
  const cutoffValue: f32 = genOpHelpers.scalarOrFirstSample(vm, cutoffTagged)
  vm.paramScratch[0] = cutoffValue
  const qValue: f32 = genOpHelpers.scalarOrFirstSample(vm, qTagged)
  vm.paramScratch[1] = qValue
  const gainValue: f32 = genOpHelpers.scalarOrFirstSample(vm, gainTagged)
  vm.paramScratch[2] = gainValue
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
              const slot: GenSlot = vm.genPools[639].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[639].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const slot: GenSlot = vm.genPools[640].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[640].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[641].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[641].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const slot: GenSlot = vm.genPools[642].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[642].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[643].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[643].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const slot: GenSlot = vm.genPools[644].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[644].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[645].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[645].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const slot: GenSlot = vm.genPools[646].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[646].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
      const slot: GenSlot = vm.genPools[639].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[640].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio>(slot.instance)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[641].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, gainValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[642].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[643].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, gainValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[644].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[645].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, gainValue, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[646].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquadshelf_peak_cutoff_audio_q_audio_gain_audio = changetype<Biquadshelf_peak_cutoff_audio_q_audio_gain_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      const gainAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, gainTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr, gainAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, gainAudioResult)
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
  if (isAudio(gainTagged)) vm.arena.releaseByPtr(u32(decodeAudio(gainTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
