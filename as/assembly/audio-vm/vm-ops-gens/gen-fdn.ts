// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Fdn_default_room_audio_damping_audio_decay_audio_depth_audio, Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo, Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar, Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo, Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio, Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo, Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar, Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo, Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio, Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo, Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar, Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo, Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio, Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo, Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar, Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo, Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio, Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo, Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar, Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo, Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio, Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo, Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar, Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo, Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio, Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo, Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar, Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo, Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio, Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo, Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar, Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo } from '../../gen/fdn'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Fdn(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar(), 554, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio(), 555, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar(), 556, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio(), 557, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar(), 558, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio(), 559, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar(), 560, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio(), 561, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar(), 562, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio(), 563, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar(), 564, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio(), 565, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar(), 566, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio(), 567, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar(), 568, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_audio_depth_audio(), 569, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo(), 570, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo(), 571, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo(), 572, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo(), 573, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo(), 574, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo(), 575, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo(), 576, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo(), 577, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo(), 578, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo(), 579, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo(), 580, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo(), 581, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo(), 582, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo(), 583, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo(), 584, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo(), 585, 4, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(dst).copyFrom(changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(src))
  }, (dst: Object) => { changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(dst).reset() }))
}

export function handleGenOp_Fdn(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenFdn_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const depthTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(depthTagged) || genOpHelpers.isStereoAudioArray(vm, depthTagged)) {
    modeMask |= 8
  }
  const roomValue: f32 = genOpHelpers.scalarOrFirstSample(vm, roomTagged)
  vm.paramScratch[0] = roomValue
  const dampingValue: f32 = genOpHelpers.scalarOrFirstSample(vm, dampingTagged)
  vm.paramScratch[1] = dampingValue
  const decayValue: f32 = genOpHelpers.scalarOrFirstSample(vm, decayTagged)
  vm.paramScratch[2] = decayValue
  const depthValue: f32 = genOpHelpers.scalarOrFirstSample(vm, depthTagged)
  vm.paramScratch[3] = depthValue
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
            const slot: GenSlot = vm.genPools[570].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthValue)
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
          case 8: {
            const slot: GenSlot = vm.genPools[571].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 4: {
            const slot: GenSlot = vm.genPools[572].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, depthValue, decayAudioResult.ptr)
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
          case 12: {
            const slot: GenSlot = vm.genPools[573].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[574].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, depthValue, dampingAudioResult.ptr)
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
          case 10: {
            const slot: GenSlot = vm.genPools[575].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 6: {
            const slot: GenSlot = vm.genPools[576].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, depthValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
          case 14: {
            const slot: GenSlot = vm.genPools[577].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[578].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, depthValue, roomAudioResult.ptr)
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
          case 9: {
            const slot: GenSlot = vm.genPools[579].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 5: {
            const slot: GenSlot = vm.genPools[580].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, depthValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
          case 13: {
            const slot: GenSlot = vm.genPools[581].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[582].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
          case 11: {
            const slot: GenSlot = vm.genPools[583].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 7: {
            const slot: GenSlot = vm.genPools[584].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
          case 15: {
            const slot: GenSlot = vm.genPools[585].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
        }
        genOpHelpers.releaseTaggedInputResult(vm, inputLeftPtr, inputLeftBuf)
        genOpHelpers.releaseTaggedInputResult(vm, inputRightPtr, inputRightBuf)
        heap.releaseValue(vm, inputResolved)
      } else {
        const monoInputFromArr: f64 = inputArrLen > 0 ? inputArr[0] : encodeScalar(0.0)
        const monoInputResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, params.bufferLength)
        const inputLeftPtr: usize = monoInputResult.ptr
        const inputRightPtr: usize = monoInputResult.ptr
        const inputLeftBuf: Float32Array = monoInputResult.buf
        const inputRightBuf: Float32Array = monoInputResult.buf
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[570].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthValue)
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
          case 8: {
            const slot: GenSlot = vm.genPools[571].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 4: {
            const slot: GenSlot = vm.genPools[572].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, depthValue, decayAudioResult.ptr)
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
          case 12: {
            const slot: GenSlot = vm.genPools[573].get()
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
            const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[574].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, depthValue, dampingAudioResult.ptr)
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
          case 10: {
            const slot: GenSlot = vm.genPools[575].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 6: {
            const slot: GenSlot = vm.genPools[576].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, depthValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
          case 14: {
            const slot: GenSlot = vm.genPools[577].get()
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
            const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[578].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, depthValue, roomAudioResult.ptr)
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
          case 9: {
            const slot: GenSlot = vm.genPools[579].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 5: {
            const slot: GenSlot = vm.genPools[580].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, depthValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
          case 13: {
            const slot: GenSlot = vm.genPools[581].get()
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
            const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[582].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
          case 11: {
            const slot: GenSlot = vm.genPools[583].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
            break
          }
          case 7: {
            const slot: GenSlot = vm.genPools[584].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
          case 15: {
            const slot: GenSlot = vm.genPools[585].get()
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
            const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
            const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
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
        const slot: GenSlot = vm.genPools[570].get()
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
        const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthValue)
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
      case 8: {
        const slot: GenSlot = vm.genPools[571].get()
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
        const instance: Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayValue, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 4: {
        const slot: GenSlot = vm.genPools[572].get()
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
        const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, depthValue, decayAudioResult.ptr)
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
      case 12: {
        const slot: GenSlot = vm.genPools[573].get()
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
        const instance: Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, decayAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 2: {
        const slot: GenSlot = vm.genPools[574].get()
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
        const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, depthValue, dampingAudioResult.ptr)
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
      case 10: {
        const slot: GenSlot = vm.genPools[575].get()
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
        const instance: Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, decayValue, dampingAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 6: {
        const slot: GenSlot = vm.genPools[576].get()
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
        const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, depthValue, dampingAudioResult.ptr, decayAudioResult.ptr)
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
      case 14: {
        const slot: GenSlot = vm.genPools[577].get()
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
        const instance: Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 1: {
        const slot: GenSlot = vm.genPools[578].get()
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
        const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, depthValue, roomAudioResult.ptr)
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
      case 9: {
        const slot: GenSlot = vm.genPools[579].get()
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
        const instance: Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, decayValue, roomAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 5: {
        const slot: GenSlot = vm.genPools[580].get()
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
        const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, depthValue, roomAudioResult.ptr, decayAudioResult.ptr)
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
      case 13: {
        const slot: GenSlot = vm.genPools[581].get()
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
        const instance: Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, roomAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 3: {
        const slot: GenSlot = vm.genPools[582].get()
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
        const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
      case 11: {
        const slot: GenSlot = vm.genPools[583].get()
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
        const instance: Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, decayValue, roomAudioResult.ptr, dampingAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
        break
      }
      case 7: {
        const slot: GenSlot = vm.genPools[584].get()
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
        const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, depthValue, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr)
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
      case 15: {
        const slot: GenSlot = vm.genPools[585].get()
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
        const instance: Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo = changetype<Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const decayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, decayTagged, procLen)
        const depthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, depthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomAudioResult.ptr, dampingAudioResult.ptr, decayAudioResult.ptr, depthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, depthAudioResult)
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
  if (isAudio(depthTagged)) vm.arena.releaseByPtr(u32(decodeAudio(depthTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
