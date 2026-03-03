// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Velvet_default_room_audio_damping_audio_decay_audio, Velvet_default_room_audio_damping_audio_decay_audio_stereo, Velvet_default_room_audio_damping_audio_decay_scalar, Velvet_default_room_audio_damping_audio_decay_scalar_stereo, Velvet_default_room_audio_damping_scalar_decay_audio, Velvet_default_room_audio_damping_scalar_decay_audio_stereo, Velvet_default_room_audio_damping_scalar_decay_scalar, Velvet_default_room_audio_damping_scalar_decay_scalar_stereo, Velvet_default_room_scalar_damping_audio_decay_audio, Velvet_default_room_scalar_damping_audio_decay_audio_stereo, Velvet_default_room_scalar_damping_audio_decay_scalar, Velvet_default_room_scalar_damping_audio_decay_scalar_stereo, Velvet_default_room_scalar_damping_scalar_decay_audio, Velvet_default_room_scalar_damping_scalar_decay_audio_stereo, Velvet_default_room_scalar_damping_scalar_decay_scalar, Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo } from '../../gen/velvet'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Velvet(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_scalar_decay_scalar(), 464, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_scalar_decay_audio(), 465, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_scalar_decay_audio>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_scalar_decay_audio>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_scalar_decay_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_audio_decay_scalar(), 466, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_audio_decay_scalar>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_audio_decay_scalar>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_audio_decay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_audio_decay_audio(), 467, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_audio_decay_audio>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_audio_decay_audio>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_audio_decay_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_scalar_decay_scalar(), 468, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_scalar_decay_scalar>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_scalar_decay_scalar>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_scalar_decay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_scalar_decay_audio(), 469, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_scalar_decay_audio>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_scalar_decay_audio>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_scalar_decay_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_audio_decay_scalar(), 470, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_audio_decay_scalar>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_audio_decay_scalar>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_audio_decay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_audio_decay_audio(), 471, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_audio_decay_audio>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_audio_decay_audio>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_audio_decay_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo(), 472, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_scalar_decay_audio_stereo(), 473, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_audio_decay_scalar_stereo(), 474, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_scalar_damping_audio_decay_audio_stereo(), 475, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(dst).copyFrom(changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_scalar_decay_scalar_stereo(), 476, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_scalar_decay_audio_stereo(), 477, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_audio_decay_scalar_stereo(), 478, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Velvet_default_room_audio_damping_audio_decay_audio_stereo(), 479, 3, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(dst).copyFrom(changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(src))
  }, (dst: Object) => { changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(dst).reset() }))
}

export function handleGenOp_Velvet(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenVelvet_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const decayTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(decayTagged) || genOpHelpers.isStereoAudioArray(vm, decayTagged)) {
    modeMask |= 4
  }
  const roomValue: f32 = genOpHelpers.scalarOrFirstSample(vm, roomTagged)
  vm.paramScratch[0] = roomValue
  const dampingValue: f32 = genOpHelpers.scalarOrFirstSample(vm, dampingTagged)
  vm.paramScratch[1] = dampingValue
  const decayValue: f32 = genOpHelpers.scalarOrFirstSample(vm, decayTagged)
  vm.paramScratch[2] = decayValue
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
            const slot: GenSlot = vm.genPools[472].get()
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
            const instance: Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue)
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
          case 4: {
            const slot: GenSlot = vm.genPools[473].get()
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
            const instance: Velvet_default_room_scalar_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[474].get()
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
            const instance: Velvet_default_room_scalar_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr)
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
          case 6: {
            const slot: GenSlot = vm.genPools[475].get()
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
            const instance: Velvet_default_room_scalar_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[476].get()
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
            const instance: Velvet_default_room_audio_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr)
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
          case 5: {
            const slot: GenSlot = vm.genPools[477].get()
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
            const instance: Velvet_default_room_audio_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[478].get()
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
            const instance: Velvet_default_room_audio_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
          case 7: {
            const slot: GenSlot = vm.genPools[479].get()
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
            const instance: Velvet_default_room_audio_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
        }
        genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
        genOpHelpers.releaseTaggedInputResult(vm, inputRightPtr, inputRightBuf)
      } else {
        const monoInputFromArr: f64 = inputArrLen > 0 ? inputArr[0] : encodeScalar(0.0)
        const monoInputResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, params.bufferLength)
        const inputLeftPtr: usize = monoInputResult.ptr
        const inputRightPtr: usize = monoInputResult.ptr
        const inputLeftBuf: Float32Array = monoInputResult.buf
        const inputRightBuf: Float32Array = monoInputResult.buf
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[472].get()
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
            const instance: Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue)
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
          case 4: {
            const slot: GenSlot = vm.genPools[473].get()
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
            const instance: Velvet_default_room_scalar_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[474].get()
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
            const instance: Velvet_default_room_scalar_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr)
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
          case 6: {
            const slot: GenSlot = vm.genPools[475].get()
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
            const instance: Velvet_default_room_scalar_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[476].get()
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
            const instance: Velvet_default_room_audio_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr)
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
          case 5: {
            const slot: GenSlot = vm.genPools[477].get()
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
            const instance: Velvet_default_room_audio_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[478].get()
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
            const instance: Velvet_default_room_audio_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
          case 7: {
            const slot: GenSlot = vm.genPools[479].get()
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
            const instance: Velvet_default_room_audio_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
            break
          }
        }
        genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
        if (isAudio(monoInputFromArr)) vm.arena.releaseByPtr(u32(decodeAudio(monoInputFromArr)))
      }
    }
  } else {
    const monoInputResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, params.bufferLength)
    const inputLeftPtr: usize = monoInputResult.ptr
    const inputRightPtr: usize = monoInputResult.ptr
    const inputLeftBuf: Float32Array = monoInputResult.buf
    const inputRightBuf: Float32Array = monoInputResult.buf
    switch (modeMask) {
      case 0: {
        const slot: GenSlot = vm.genPools[472].get()
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
        const instance: Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue)
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
      case 4: {
        const slot: GenSlot = vm.genPools[473].get()
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
        const instance: Velvet_default_room_scalar_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_scalar_decay_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        break
      }
      case 2: {
        const slot: GenSlot = vm.genPools[474].get()
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
        const instance: Velvet_default_room_scalar_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr)
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
      case 6: {
        const slot: GenSlot = vm.genPools[475].get()
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
        const instance: Velvet_default_room_scalar_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_scalar_damping_audio_decay_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        break
      }
      case 1: {
        const slot: GenSlot = vm.genPools[476].get()
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
        const instance: Velvet_default_room_audio_damping_scalar_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr)
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
      case 5: {
        const slot: GenSlot = vm.genPools[477].get()
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
        const instance: Velvet_default_room_audio_damping_scalar_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_scalar_decay_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        break
      }
      case 3: {
        const slot: GenSlot = vm.genPools[478].get()
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
        const instance: Velvet_default_room_audio_damping_audio_decay_scalar_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
      case 7: {
        const slot: GenSlot = vm.genPools[479].get()
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
        const instance: Velvet_default_room_audio_damping_audio_decay_audio_stereo = changetype<Velvet_default_room_audio_damping_audio_decay_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, decayAudioResult)
        break
      }
    }
    genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
    if (isAudio(inputTagged)) vm.arena.releaseByPtr(u32(decodeAudio(inputTagged)))
    if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
    return pc
  }
  if (isAudio(roomTagged)) vm.arena.releaseByPtr(u32(decodeAudio(roomTagged)))
  if (isAudio(dampingTagged)) vm.arena.releaseByPtr(u32(decodeAudio(dampingTagged)))
  if (isAudio(decayTagged)) vm.arena.releaseByPtr(u32(decodeAudio(decayTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
