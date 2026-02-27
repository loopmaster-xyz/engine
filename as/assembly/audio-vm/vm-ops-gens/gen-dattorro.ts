// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo, Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar, Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo } from '../../gen/dattorro'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Dattorro(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 514, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 515, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 516, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 517, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 518, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 519, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 520, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar(), 521, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 522, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 523, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 524, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 525, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 526, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 527, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 528, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo(), 529, 10, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).copyFrom(changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(src))
  }, (dst: Object) => { changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(dst).reset() }))
}

export function handleGenOp_Dattorro(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenDattorro_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const predelayTagged: f64 = vm.stack[--vm.stackTop]
  const excdepthTagged: f64 = vm.stack[--vm.stackTop]
  const excrateTagged: f64 = vm.stack[--vm.stackTop]
  const decdiff2Tagged: f64 = vm.stack[--vm.stackTop]
  const decdiff1Tagged: f64 = vm.stack[--vm.stackTop]
  const indiff2Tagged: f64 = vm.stack[--vm.stackTop]
  const indiff1Tagged: f64 = vm.stack[--vm.stackTop]
  const bandwidthTagged: f64 = vm.stack[--vm.stackTop]
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
  if (isAudio(bandwidthTagged) || genOpHelpers.isStereoAudioArray(vm, bandwidthTagged)) {
    modeMask |= 4
  }
  const roomValue: f32 = genOpHelpers.scalarOrFirstSample(vm, roomTagged)
  vm.paramScratch[0] = roomValue
  const dampingValue: f32 = genOpHelpers.scalarOrFirstSample(vm, dampingTagged)
  vm.paramScratch[1] = dampingValue
  const bandwidthValue: f32 = genOpHelpers.scalarOrFirstSample(vm, bandwidthTagged)
  vm.paramScratch[2] = bandwidthValue
  const indiff1Value: f32 = genOpHelpers.scalarOrFirstSample(vm, indiff1Tagged)
  vm.paramScratch[3] = indiff1Value
  const indiff2Value: f32 = genOpHelpers.scalarOrFirstSample(vm, indiff2Tagged)
  vm.paramScratch[4] = indiff2Value
  const decdiff1Value: f32 = genOpHelpers.scalarOrFirstSample(vm, decdiff1Tagged)
  vm.paramScratch[5] = decdiff1Value
  const decdiff2Value: f32 = genOpHelpers.scalarOrFirstSample(vm, decdiff2Tagged)
  vm.paramScratch[6] = decdiff2Value
  const excrateValue: f32 = genOpHelpers.scalarOrFirstSample(vm, excrateTagged)
  vm.paramScratch[7] = excrateValue
  const excdepthValue: f32 = genOpHelpers.scalarOrFirstSample(vm, excdepthTagged)
  vm.paramScratch[8] = excdepthValue
  const predelayValue: f32 = genOpHelpers.scalarOrFirstSample(vm, predelayTagged)
  vm.paramScratch[9] = predelayValue
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
            const slot: GenSlot = vm.genPools[522].get()
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
            const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue)
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
            const slot: GenSlot = vm.genPools[523].get()
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
            const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[524].get()
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
            const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[525].get()
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
            const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[526].get()
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
            const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[527].get()
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
            const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[528].get()
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
            const instance: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[529].get()
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
            const instance: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
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
        const monoInputResult = genOpHelpers.taggedToInputBuffer(vm, monoInputFromArr, params.bufferLength)
        const inputLeftPtr: usize = monoInputResult.ptr
        const inputRightPtr: usize = monoInputResult.ptr
        const inputLeftBuf: Float32Array = monoInputResult.buf
        const inputRightBuf: Float32Array = monoInputResult.buf
        switch (modeMask) {
          case 0: {
            const slot: GenSlot = vm.genPools[522].get()
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
            const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue)
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
            const slot: GenSlot = vm.genPools[523].get()
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
            const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 2: {
            const slot: GenSlot = vm.genPools[524].get()
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
            const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[525].get()
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
            const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 1: {
            const slot: GenSlot = vm.genPools[526].get()
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
            const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[527].get()
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
            const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
            break
          }
          case 3: {
            const slot: GenSlot = vm.genPools[528].get()
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
            const instance: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
            const slot: GenSlot = vm.genPools[529].get()
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
            const instance: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
            slot.history.write(params.sampleCount, vm.paramScratch)
            const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
            const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
            const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
            instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
            genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
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
        const slot: GenSlot = vm.genPools[522].get()
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
        const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue)
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
        const slot: GenSlot = vm.genPools[523].get()
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
        const instance: Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, bandwidthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
        break
      }
      case 2: {
        const slot: GenSlot = vm.genPools[524].get()
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
        const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr)
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
        const slot: GenSlot = vm.genPools[525].get()
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
        const instance: Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, roomValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
        break
      }
      case 1: {
        const slot: GenSlot = vm.genPools[526].get()
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
        const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr)
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
        const slot: GenSlot = vm.genPools[527].get()
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
        const instance: Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, dampingValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, bandwidthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
        break
      }
      case 3: {
        const slot: GenSlot = vm.genPools[528].get()
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
        const instance: Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, bandwidthValue, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr)
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
        const slot: GenSlot = vm.genPools[529].get()
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
        const instance: Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo = changetype<Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo>(slot.instance)
        slot.history.write(params.sampleCount, vm.paramScratch)
        const roomAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, roomTagged, procLen)
        const dampingAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, dampingTagged, procLen)
        const bandwidthAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, bandwidthTagged, procLen)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputLeftPtr, inputRightPtr, outputLeftPtr, outputRightPtr, indiff1Value, indiff2Value, decdiff1Value, decdiff2Value, excrateValue, excdepthValue, predelayValue, roomAudioResult.ptr, dampingAudioResult.ptr, bandwidthAudioResult.ptr)
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
        genOpHelpers.releaseTaggedAudioParamResult(vm, bandwidthAudioResult)
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
  if (isAudio(bandwidthTagged)) vm.arena.releaseByPtr(u32(decodeAudio(bandwidthTagged)))
  if (isAudio(indiff1Tagged)) vm.arena.releaseByPtr(u32(decodeAudio(indiff1Tagged)))
  if (isAudio(indiff2Tagged)) vm.arena.releaseByPtr(u32(decodeAudio(indiff2Tagged)))
  if (isAudio(decdiff1Tagged)) vm.arena.releaseByPtr(u32(decodeAudio(decdiff1Tagged)))
  if (isAudio(decdiff2Tagged)) vm.arena.releaseByPtr(u32(decodeAudio(decdiff2Tagged)))
  if (isAudio(excrateTagged)) vm.arena.releaseByPtr(u32(decodeAudio(excrateTagged)))
  if (isAudio(excdepthTagged)) vm.arena.releaseByPtr(u32(decodeAudio(excdepthTagged)))
  if (isAudio(predelayTagged)) vm.arena.releaseByPtr(u32(decodeAudio(predelayTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
