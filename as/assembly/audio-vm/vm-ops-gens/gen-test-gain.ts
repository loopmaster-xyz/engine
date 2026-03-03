// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { TestGain_default_amount_audio, TestGain_default_amount_audio_stereo, TestGain_default_amount_scalar, TestGain_default_amount_scalar_stereo } from '../../gen/test-gain'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_TestGain(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new TestGain_default_amount_scalar(), 47, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestGain_default_amount_scalar>(dst).copyFrom(changetype<TestGain_default_amount_scalar>(src))
  }, (dst: Object) => { changetype<TestGain_default_amount_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new TestGain_default_amount_audio(), 48, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestGain_default_amount_audio>(dst).copyFrom(changetype<TestGain_default_amount_audio>(src))
  }, (dst: Object) => { changetype<TestGain_default_amount_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new TestGain_default_amount_scalar_stereo(), 49, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestGain_default_amount_scalar_stereo>(dst).copyFrom(changetype<TestGain_default_amount_scalar_stereo>(src))
  }, (dst: Object) => { changetype<TestGain_default_amount_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new TestGain_default_amount_audio_stereo(), 50, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestGain_default_amount_audio_stereo>(dst).copyFrom(changetype<TestGain_default_amount_audio_stereo>(src))
  }, (dst: Object) => { changetype<TestGain_default_amount_audio_stereo>(dst).reset() }))
}

export function handleGenOp_TestGain(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenTestGain_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const amountTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(amountTagged) || genOpHelpers.isStereoAudioArray(vm, amountTagged)) {
    modeMask |= 1
  }
  const amountValue: f32 = genOpHelpers.scalarOrFirstSample(vm, amountTagged)
  vm.paramScratch[0] = amountValue
  const isStereoInput: bool = isArray(inputResolved)
  if (isStereoInput) {
    const inputArrId: u32 = decodeArray(inputResolved)
    if (inputArrId > 0 && inputArrId <= u32(vm.arrays.length)) {
      const inputArr: Float64Array = vm.arrays.get(i32(inputArrId) - 1)
      const inputArrLen: i32 = vm.arrayLengths.get(i32(inputArrId) - 1)
      if (inputArrLen >= 2) {
        const inputLeftTagged: f64 = inputArr[0]
        const inputRightTagged: f64 = inputArr[1]
        const inputLeftResolved: f64 = vmOpsVars.resolveCellRef(vm, inputLeftTagged)
        const inputRightResolved: f64 = vmOpsVars.resolveCellRef(vm, inputRightTagged)
        const leftResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, params.bufferLength)
        const inputLeftPtr: usize = leftResult.ptr
        const inputLeftBuf: Float32Array = leftResult.buf
        const rightResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, params.bufferLength)
        const inputRightPtr: usize = rightResult.ptr
        const inputRightBuf: Float32Array = rightResult.buf
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[49].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            genOpHelpers.writeInputToHistoryRing(slot.history, inputLeftPtr, params.bufferLength)
            const outputChunkPos: i32 = slot.history.outputChunkPos
            const outputRingPtr: usize = slot.history.outputRing.dataStart
            const outputChunkPos2: i32 = (outputChunkPos + 1) & WAVEFORM_RING_MASK
            const outputLeftRingPtr: usize = outputRingPtr + (usize(outputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
            const outputRightRingPtr: usize = outputRingPtr + (usize(outputChunkPos2 * WAVEFORM_CHUNK_SAMPLES) << 2)
            const outputL: Float32Array = vm.arena.get(procLen)
            const outputR: Float32Array = vm.arena.get(procLen)
            const outputLeftPtr: usize = outputL.dataStart
            const outputRightPtr: usize = outputR.dataStart
            const instance: TestGain_default_amount_scalar_stereo = changetype<TestGain_default_amount_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, amountValue)
            if (params.bufferLength <= WAVEFORM_CHUNK_SAMPLES) {
              memory.copy(outputLeftRingPtr, outputLeftPtr, usize(params.bufferLength) << 2)
              memory.copy(outputRightRingPtr, outputRightPtr, usize(params.bufferLength) << 2)
              if (params.bufferLength < WAVEFORM_CHUNK_SAMPLES) {
                memory.fill(outputLeftRingPtr + (usize(params.bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - params.bufferLength) << 2)
                memory.fill(outputRightRingPtr + (usize(params.bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - params.bufferLength) << 2)
              }
            } else {
              const stride: i32 = params.bufferLength / WAVEFORM_CHUNK_SAMPLES
              for (let i: i32 = 0; i < WAVEFORM_CHUNK_SAMPLES; i++) {
                const srcIdx: i32 = i * stride
                const sample: f32 = srcIdx < params.bufferLength ? load<f32>(outputLeftPtr + (usize(srcIdx) << 2)) : 0.0
                store<f32>(outputLeftRingPtr + (i << 2), sample)
                store<f32>(outputRightRingPtr + (i << 2), srcIdx < params.bufferLength ? load<f32>(outputRightPtr + (usize(srcIdx) << 2)) : 0.0)
              }
            }
            slot.history.outputChunkPos = (outputChunkPos2 + 1) & WAVEFORM_RING_MASK
            slot.history.meta[slot.history.metaOffset + 9] = u32(slot.history.outputChunkPos)
            const stereoArr: Float64Array = vm.float64Arena.get(2)
            stereoArr[0] = encodeAudio(outputL.dataStart)
            stereoArr[1] = encodeAudio(outputR.dataStart)
            vm.arrays.push(stereoArr)
            vm.arrayLengths.push(2)
            vm.arrayRefcounts.push(0)
            push(vm, encodeArray(u32(vm.arrays.length)))
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[50].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            genOpHelpers.writeInputToHistoryRing(slot.history, inputLeftPtr, params.bufferLength)
            const outputChunkPos: i32 = slot.history.outputChunkPos
            const outputRingPtr: usize = slot.history.outputRing.dataStart
            const outputChunkPos2: i32 = (outputChunkPos + 1) & WAVEFORM_RING_MASK
            const outputLeftRingPtr: usize = outputRingPtr + (usize(outputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)
            const outputRightRingPtr: usize = outputRingPtr + (usize(outputChunkPos2 * WAVEFORM_CHUNK_SAMPLES) << 2)
            const outputL: Float32Array = vm.arena.get(procLen)
            const outputR: Float32Array = vm.arena.get(procLen)
            const outputLeftPtr: usize = outputL.dataStart
            const outputRightPtr: usize = outputR.dataStart
            const instance: TestGain_default_amount_audio_stereo = changetype<TestGain_default_amount_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const amountAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, amountTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, amountAudioResult.ptr)
            if (params.bufferLength <= WAVEFORM_CHUNK_SAMPLES) {
              memory.copy(outputLeftRingPtr, outputLeftPtr, usize(params.bufferLength) << 2)
              memory.copy(outputRightRingPtr, outputRightPtr, usize(params.bufferLength) << 2)
              if (params.bufferLength < WAVEFORM_CHUNK_SAMPLES) {
                memory.fill(outputLeftRingPtr + (usize(params.bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - params.bufferLength) << 2)
                memory.fill(outputRightRingPtr + (usize(params.bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - params.bufferLength) << 2)
              }
            } else {
              const stride: i32 = params.bufferLength / WAVEFORM_CHUNK_SAMPLES
              for (let i: i32 = 0; i < WAVEFORM_CHUNK_SAMPLES; i++) {
                const srcIdx: i32 = i * stride
                const sample: f32 = srcIdx < params.bufferLength ? load<f32>(outputLeftPtr + (usize(srcIdx) << 2)) : 0.0
                store<f32>(outputLeftRingPtr + (i << 2), sample)
                store<f32>(outputRightRingPtr + (i << 2), srcIdx < params.bufferLength ? load<f32>(outputRightPtr + (usize(srcIdx) << 2)) : 0.0)
              }
            }
            slot.history.outputChunkPos = (outputChunkPos2 + 1) & WAVEFORM_RING_MASK
            slot.history.meta[slot.history.metaOffset + 9] = u32(slot.history.outputChunkPos)
            const stereoArr: Float64Array = vm.float64Arena.get(2)
            stereoArr[0] = encodeAudio(outputL.dataStart)
            stereoArr[1] = encodeAudio(outputR.dataStart)
            vm.arrays.push(stereoArr)
            vm.arrayLengths.push(2)
            vm.arrayRefcounts.push(0)
            push(vm, encodeArray(u32(vm.arrays.length)))
            genOpHelpers.releaseTaggedAudioParamResult(vm, amountAudioResult)
            break
          }
        }
        genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
        genOpHelpers.releaseTaggedInputResult(vm, inputRightPtr, inputRightBuf)
      } else {
        const monoInputFromArr: f64 = inputArrLen > 0 ? inputArr[0] : encodeScalar(0.0)
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[47].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: TestGain_default_amount_scalar = changetype<TestGain_default_amount_scalar>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, amountValue)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[48].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: TestGain_default_amount_audio = changetype<TestGain_default_amount_audio>(slot.instance)
            const amountAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, amountTagged, procLen)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, amountAudioResult.ptr)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            genOpHelpers.releaseTaggedAudioParamResult(vm, amountAudioResult)
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
        if (isAudio(monoInputFromArr)) vm.arena.releaseByPtr(u32(decodeAudio(monoInputFromArr)))
      }
    }
  } else {
    switch (modeMask) {
      case 0: {
        const slot: GenSlot = vm.genPools[47].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: TestGain_default_amount_scalar = changetype<TestGain_default_amount_scalar>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, amountValue)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        break
      }
      case 1: {
        const slot: GenSlot = vm.genPools[48].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: TestGain_default_amount_audio = changetype<TestGain_default_amount_audio>(slot.instance)
        const amountAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, amountTagged, procLen)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, amountAudioResult.ptr)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, amountAudioResult)
        break
      }
    }
    if (isAudio(inputTagged)) vm.arena.releaseByPtr(u32(decodeAudio(inputTagged)))
    push(vm, encodeAudio(output.dataStart), true)
  }
  if (isAudio(amountTagged)) vm.arena.releaseByPtr(u32(decodeAudio(amountTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
