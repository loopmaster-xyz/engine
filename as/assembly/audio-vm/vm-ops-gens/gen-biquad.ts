// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Biquad_ap_cutoff_audio_q_audio, Biquad_ap_cutoff_audio_q_scalar, Biquad_ap_cutoff_scalar_q_audio, Biquad_ap_cutoff_scalar_q_scalar, Biquad_bp_cutoff_audio_q_audio, Biquad_bp_cutoff_audio_q_scalar, Biquad_bp_cutoff_scalar_q_audio, Biquad_bp_cutoff_scalar_q_scalar, Biquad_bs_cutoff_audio_q_audio, Biquad_bs_cutoff_audio_q_scalar, Biquad_bs_cutoff_scalar_q_audio, Biquad_bs_cutoff_scalar_q_scalar, Biquad_hp_cutoff_audio_q_audio, Biquad_hp_cutoff_audio_q_scalar, Biquad_hp_cutoff_scalar_q_audio, Biquad_hp_cutoff_scalar_q_scalar, Biquad_lp_cutoff_audio_q_audio, Biquad_lp_cutoff_audio_q_scalar, Biquad_lp_cutoff_scalar_q_audio, Biquad_lp_cutoff_scalar_q_scalar } from '../../gen/biquad'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Biquad(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Biquad_lp_cutoff_scalar_q_scalar(), 512, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_lp_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Biquad_lp_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_lp_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_lp_cutoff_scalar_q_audio(), 513, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_lp_cutoff_scalar_q_audio>(dst).copyFrom(changetype<Biquad_lp_cutoff_scalar_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_lp_cutoff_scalar_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_lp_cutoff_audio_q_scalar(), 514, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_lp_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Biquad_lp_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_lp_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_lp_cutoff_audio_q_audio(), 515, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_lp_cutoff_audio_q_audio>(dst).copyFrom(changetype<Biquad_lp_cutoff_audio_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_lp_cutoff_audio_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_hp_cutoff_scalar_q_scalar(), 516, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_hp_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Biquad_hp_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_hp_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_hp_cutoff_scalar_q_audio(), 517, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_hp_cutoff_scalar_q_audio>(dst).copyFrom(changetype<Biquad_hp_cutoff_scalar_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_hp_cutoff_scalar_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_hp_cutoff_audio_q_scalar(), 518, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_hp_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Biquad_hp_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_hp_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_hp_cutoff_audio_q_audio(), 519, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_hp_cutoff_audio_q_audio>(dst).copyFrom(changetype<Biquad_hp_cutoff_audio_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_hp_cutoff_audio_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bp_cutoff_scalar_q_scalar(), 520, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bp_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Biquad_bp_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_bp_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bp_cutoff_scalar_q_audio(), 521, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bp_cutoff_scalar_q_audio>(dst).copyFrom(changetype<Biquad_bp_cutoff_scalar_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_bp_cutoff_scalar_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bp_cutoff_audio_q_scalar(), 522, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bp_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Biquad_bp_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_bp_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bp_cutoff_audio_q_audio(), 523, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bp_cutoff_audio_q_audio>(dst).copyFrom(changetype<Biquad_bp_cutoff_audio_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_bp_cutoff_audio_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bs_cutoff_scalar_q_scalar(), 524, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bs_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Biquad_bs_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_bs_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bs_cutoff_scalar_q_audio(), 525, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bs_cutoff_scalar_q_audio>(dst).copyFrom(changetype<Biquad_bs_cutoff_scalar_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_bs_cutoff_scalar_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bs_cutoff_audio_q_scalar(), 526, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bs_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Biquad_bs_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_bs_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_bs_cutoff_audio_q_audio(), 527, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_bs_cutoff_audio_q_audio>(dst).copyFrom(changetype<Biquad_bs_cutoff_audio_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_bs_cutoff_audio_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_ap_cutoff_scalar_q_scalar(), 528, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_ap_cutoff_scalar_q_scalar>(dst).copyFrom(changetype<Biquad_ap_cutoff_scalar_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_ap_cutoff_scalar_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_ap_cutoff_scalar_q_audio(), 529, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_ap_cutoff_scalar_q_audio>(dst).copyFrom(changetype<Biquad_ap_cutoff_scalar_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_ap_cutoff_scalar_q_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_ap_cutoff_audio_q_scalar(), 530, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_ap_cutoff_audio_q_scalar>(dst).copyFrom(changetype<Biquad_ap_cutoff_audio_q_scalar>(src))
  }, (dst: Object) => { changetype<Biquad_ap_cutoff_audio_q_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Biquad_ap_cutoff_audio_q_audio(), 531, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Biquad_ap_cutoff_audio_q_audio>(dst).copyFrom(changetype<Biquad_ap_cutoff_audio_q_audio>(src))
  }, (dst: Object) => { changetype<Biquad_ap_cutoff_audio_q_audio>(dst).reset() }))
}

export function handleGenOp_Biquad(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenBiquad_lp: {
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
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
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
              const slot: GenSlot = vm.genPools[512].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_scalar_q_scalar = changetype<Biquad_lp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[512].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_scalar_q_scalar = changetype<Biquad_lp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[513].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_scalar_q_audio = changetype<Biquad_lp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[513].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_scalar_q_audio = changetype<Biquad_lp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[514].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_audio_q_scalar = changetype<Biquad_lp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[514].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_audio_q_scalar = changetype<Biquad_lp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[515].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_audio_q_audio = changetype<Biquad_lp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[515].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_lp_cutoff_audio_q_audio = changetype<Biquad_lp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
      const slot: GenSlot = vm.genPools[512].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_lp_cutoff_scalar_q_scalar = changetype<Biquad_lp_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[513].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_lp_cutoff_scalar_q_audio = changetype<Biquad_lp_cutoff_scalar_q_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[514].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_lp_cutoff_audio_q_scalar = changetype<Biquad_lp_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[515].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_lp_cutoff_audio_q_audio = changetype<Biquad_lp_cutoff_audio_q_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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

case AudioVmOp.GenBiquad_hp: {
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
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
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
              const slot: GenSlot = vm.genPools[516].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_scalar_q_scalar = changetype<Biquad_hp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[516].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_scalar_q_scalar = changetype<Biquad_hp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[517].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_scalar_q_audio = changetype<Biquad_hp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[517].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_scalar_q_audio = changetype<Biquad_hp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[518].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_audio_q_scalar = changetype<Biquad_hp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[518].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_audio_q_scalar = changetype<Biquad_hp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[519].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_audio_q_audio = changetype<Biquad_hp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[519].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_hp_cutoff_audio_q_audio = changetype<Biquad_hp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
      const slot: GenSlot = vm.genPools[516].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_hp_cutoff_scalar_q_scalar = changetype<Biquad_hp_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[517].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_hp_cutoff_scalar_q_audio = changetype<Biquad_hp_cutoff_scalar_q_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[518].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_hp_cutoff_audio_q_scalar = changetype<Biquad_hp_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[519].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_hp_cutoff_audio_q_audio = changetype<Biquad_hp_cutoff_audio_q_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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

case AudioVmOp.GenBiquad_bp: {
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
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
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
              const slot: GenSlot = vm.genPools[520].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_scalar_q_scalar = changetype<Biquad_bp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[520].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_scalar_q_scalar = changetype<Biquad_bp_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[521].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_scalar_q_audio = changetype<Biquad_bp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[521].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_scalar_q_audio = changetype<Biquad_bp_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[522].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_audio_q_scalar = changetype<Biquad_bp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[522].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_audio_q_scalar = changetype<Biquad_bp_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[523].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_audio_q_audio = changetype<Biquad_bp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[523].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bp_cutoff_audio_q_audio = changetype<Biquad_bp_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
      const slot: GenSlot = vm.genPools[520].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bp_cutoff_scalar_q_scalar = changetype<Biquad_bp_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[521].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bp_cutoff_scalar_q_audio = changetype<Biquad_bp_cutoff_scalar_q_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[522].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bp_cutoff_audio_q_scalar = changetype<Biquad_bp_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[523].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bp_cutoff_audio_q_audio = changetype<Biquad_bp_cutoff_audio_q_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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

case AudioVmOp.GenBiquad_bs: {
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
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
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
              const slot: GenSlot = vm.genPools[524].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_scalar_q_scalar = changetype<Biquad_bs_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[524].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_scalar_q_scalar = changetype<Biquad_bs_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[525].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_scalar_q_audio = changetype<Biquad_bs_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[525].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_scalar_q_audio = changetype<Biquad_bs_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[526].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_audio_q_scalar = changetype<Biquad_bs_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[526].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_audio_q_scalar = changetype<Biquad_bs_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[527].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_audio_q_audio = changetype<Biquad_bs_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[527].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_bs_cutoff_audio_q_audio = changetype<Biquad_bs_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
      const slot: GenSlot = vm.genPools[524].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bs_cutoff_scalar_q_scalar = changetype<Biquad_bs_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[525].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bs_cutoff_scalar_q_audio = changetype<Biquad_bs_cutoff_scalar_q_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[526].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bs_cutoff_audio_q_scalar = changetype<Biquad_bs_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[527].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_bs_cutoff_audio_q_audio = changetype<Biquad_bs_cutoff_audio_q_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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

case AudioVmOp.GenBiquad_ap: {
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
  if (isAudio(qTagged) || genOpHelpers.isStereoAudioArray(vm, qTagged)) {
    modeMask |= 2
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
              const slot: GenSlot = vm.genPools[528].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_scalar_q_scalar = changetype<Biquad_ap_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[528].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_scalar_q_scalar = changetype<Biquad_ap_cutoff_scalar_q_scalar>(slot.instance)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[529].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_scalar_q_audio = changetype<Biquad_ap_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[529].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_scalar_q_audio = changetype<Biquad_ap_cutoff_scalar_q_audio>(slot.instance)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[530].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_audio_q_scalar = changetype<Biquad_ap_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[530].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_audio_q_scalar = changetype<Biquad_ap_cutoff_audio_q_scalar>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[531].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_audio_q_audio = changetype<Biquad_ap_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[531].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Biquad_ap_cutoff_audio_q_audio = changetype<Biquad_ap_cutoff_audio_q_audio>(slot.instance)
              const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
              const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
      const slot: GenSlot = vm.genPools[528].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_ap_cutoff_scalar_q_scalar = changetype<Biquad_ap_cutoff_scalar_q_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[529].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_ap_cutoff_scalar_q_audio = changetype<Biquad_ap_cutoff_scalar_q_audio>(slot.instance)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffValue, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[530].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_ap_cutoff_audio_q_scalar = changetype<Biquad_ap_cutoff_audio_q_scalar>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, qValue, cutoffAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[531].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Biquad_ap_cutoff_audio_q_audio = changetype<Biquad_ap_cutoff_audio_q_audio>(slot.instance)
      const cutoffAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, cutoffTagged, procLen)
      const qAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, qTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, cutoffAudioResult.ptr, qAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, cutoffAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, qAudioResult)
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
