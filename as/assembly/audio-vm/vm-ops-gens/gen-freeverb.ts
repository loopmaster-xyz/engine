// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Freeverb_default_room_audio_damping_audio, Freeverb_default_room_audio_damping_audio_stereo, Freeverb_default_room_audio_damping_scalar, Freeverb_default_room_audio_damping_scalar_stereo, Freeverb_default_room_scalar_damping_audio, Freeverb_default_room_scalar_damping_audio_stereo, Freeverb_default_room_scalar_damping_scalar, Freeverb_default_room_scalar_damping_scalar_stereo } from '../../gen/freeverb'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Freeverb(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_scalar_damping_scalar(), 51, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_scalar_damping_scalar>(dst).copyFrom(changetype<Freeverb_default_room_scalar_damping_scalar>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_scalar_damping_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_scalar_damping_audio(), 52, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_scalar_damping_audio>(dst).copyFrom(changetype<Freeverb_default_room_scalar_damping_audio>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_scalar_damping_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_audio_damping_scalar(), 53, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_audio_damping_scalar>(dst).copyFrom(changetype<Freeverb_default_room_audio_damping_scalar>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_audio_damping_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_audio_damping_audio(), 54, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_audio_damping_audio>(dst).copyFrom(changetype<Freeverb_default_room_audio_damping_audio>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_audio_damping_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_scalar_damping_scalar_stereo(), 55, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_scalar_damping_scalar_stereo>(dst).copyFrom(changetype<Freeverb_default_room_scalar_damping_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_scalar_damping_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_scalar_damping_audio_stereo(), 56, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_scalar_damping_audio_stereo>(dst).copyFrom(changetype<Freeverb_default_room_scalar_damping_audio_stereo>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_scalar_damping_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_audio_damping_scalar_stereo(), 57, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_audio_damping_scalar_stereo>(dst).copyFrom(changetype<Freeverb_default_room_audio_damping_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_audio_damping_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Freeverb_default_room_audio_damping_audio_stereo(), 58, 2, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Freeverb_default_room_audio_damping_audio_stereo>(dst).copyFrom(changetype<Freeverb_default_room_audio_damping_audio_stereo>(src))
  }, (dst: Object) => { changetype<Freeverb_default_room_audio_damping_audio_stereo>(dst).reset() }))
}

export function handleGenOp_Freeverb(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenFreeverb_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const dampingTagged: f64 = vm.stack[--vm.stackTop]
  const roomTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(roomTagged) || genOpHelpers.isStereoAudioArray(vm, roomTagged)) {
    modeMask |= 1
  }
  if (isAudio(dampingTagged) || genOpHelpers.isStereoAudioArray(vm, dampingTagged)) {
    modeMask |= 2
  }
  const roomValue: f32 = genOpHelpers.scalarOrFirstSample(vm, roomTagged)
  vm.paramScratch[0] = roomValue
  const dampingValue: f32 = genOpHelpers.scalarOrFirstSample(vm, dampingTagged)
  vm.paramScratch[1] = dampingValue
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
            const slot: GenSlot = vm.genPools[55].get()
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
            const instance: Freeverb_default_room_scalar_damping_scalar_stereo = changetype<Freeverb_default_room_scalar_damping_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue)
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
          case 2: {
            const slot: GenSlot = vm.genPools[56].get()
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
            const instance: Freeverb_default_room_scalar_damping_audio_stereo = changetype<Freeverb_default_room_scalar_damping_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[57].get()
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
            const instance: Freeverb_default_room_audio_damping_scalar_stereo = changetype<Freeverb_default_room_audio_damping_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[58].get()
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
            const instance: Freeverb_default_room_audio_damping_audio_stereo = changetype<Freeverb_default_room_audio_damping_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
            genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
            break
          }
        }
        genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
        genOpHelpers.releaseTaggedInputResult(vm, inputRightPtr, inputRightBuf)
        if (inputArrId == u32(vm.arrays.length)) { vm.arrays.length = vm.arrays.length - 1; vm.arrayLengths.length = vm.arrayLengths.length - 1; vm.arrayRefcounts.length = vm.arrayRefcounts.length - 1 } else { vm.arrays.set(i32(inputArrId) - 1, VmState.EMPTY_FLOAT64_ARRAY); vm.arrayLengths.set(i32(inputArrId) - 1, 0); vm.arrayRefcounts.set(i32(inputArrId) - 1, 0) }
        if (inputArr.length > 0) vm.float64Arena.release(inputArr)
        if (isAudio(inputLeftResolved)) vm.arena.releaseByPtr(u32(decodeAudio(inputLeftResolved)))
        if (isAudio(inputRightResolved)) vm.arena.releaseByPtr(u32(decodeAudio(inputRightResolved)))
      } else {
        const monoInputFromArr: f64 = inputArrLen > 0 ? inputArr[0] : encodeScalar(0.0)
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[51].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: Freeverb_default_room_scalar_damping_scalar = changetype<Freeverb_default_room_scalar_damping_scalar>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomValue, dampingValue)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[52].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: Freeverb_default_room_scalar_damping_audio = changetype<Freeverb_default_room_scalar_damping_audio>(slot.instance)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomValue, dampingAudioResult.ptr)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[53].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: Freeverb_default_room_audio_damping_scalar = changetype<Freeverb_default_room_audio_damping_scalar>(slot.instance)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, dampingValue, roomAudioResult.ptr)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[54].get()
            genOpHelpers.writeCallStackMetaToSlot(vm, slot)
            const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
            const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, procLen)
            const inputSrcPtr: usize = inputSrcResult.ptr
            const inputSrcBuf: Float32Array = inputSrcResult.buf
            genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
            const inputPtr: usize = inputSrcPtr
            output = vm.arena.get(procLen)
            const outputPtr: usize = output.dataStart
            const instance: Freeverb_default_room_audio_damping_audio = changetype<Freeverb_default_room_audio_damping_audio>(slot.instance)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomAudioResult.ptr, dampingAudioResult.ptr)
            genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
            genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
            genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
            genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
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
        const slot: GenSlot = vm.genPools[51].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: Freeverb_default_room_scalar_damping_scalar = changetype<Freeverb_default_room_scalar_damping_scalar>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomValue, dampingValue)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        break
      }
      case 2: {
        const slot: GenSlot = vm.genPools[52].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: Freeverb_default_room_scalar_damping_audio = changetype<Freeverb_default_room_scalar_damping_audio>(slot.instance)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomValue, dampingAudioResult.ptr)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
        break
      }
      case 1: {
        const slot: GenSlot = vm.genPools[53].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: Freeverb_default_room_audio_damping_scalar = changetype<Freeverb_default_room_audio_damping_scalar>(slot.instance)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, dampingValue, roomAudioResult.ptr)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
        break
      }
      case 3: {
        const slot: GenSlot = vm.genPools[54].get()
        genOpHelpers.writeCallStackMetaToSlot(vm, slot)
        const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
        const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputTagged, procLen)
        const inputSrcPtr: usize = inputSrcResult.ptr
        const inputSrcBuf: Float32Array = inputSrcResult.buf
        genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
        const inputPtr: usize = inputSrcPtr
        output = vm.arena.get(procLen)
        const outputPtr: usize = output.dataStart
        const instance: Freeverb_default_room_audio_damping_audio = changetype<Freeverb_default_room_audio_damping_audio>(slot.instance)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, roomAudioResult.ptr, dampingAudioResult.ptr)
        genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
        genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, roomAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, dampingAudioResult)
        break
      }
    }
    if (isAudio(inputTagged)) vm.arena.releaseByPtr(u32(decodeAudio(inputTagged)))
    push(vm, encodeAudio(output.dataStart), true)
  }
  if (isAudio(roomTagged)) vm.arena.releaseByPtr(u32(decodeAudio(roomTagged)))
  if (isAudio(dampingTagged)) vm.arena.releaseByPtr(u32(decodeAudio(dampingTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
