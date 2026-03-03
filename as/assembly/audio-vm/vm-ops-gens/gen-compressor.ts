// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar } from '../../gen/compressor'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Compressor(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 220, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 221, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 222, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 223, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 224, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 225, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 226, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio(), 227, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 228, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 229, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 230, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio(), 231, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 232, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio(), 233, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar(), 234, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio(), 235, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 236, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 237, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 238, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 239, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 240, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 241, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 242, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio(), 243, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 244, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 245, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 246, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio(), 247, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 248, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio(), 249, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar(), 250, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio(), 251, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 252, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 253, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 254, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 255, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 256, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 257, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 258, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio(), 259, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 260, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 261, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 262, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio(), 263, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 264, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio(), 265, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar(), 266, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio(), 267, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 268, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 269, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 270, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 271, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 272, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 273, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 274, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio(), 275, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 276, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 277, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 278, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio(), 279, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 280, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio(), 281, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar(), 282, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio(), 283, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
}

export function handleGenOp_Compressor(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenCompressor_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const keyTagged: f64 = vm.stack[--vm.stackTop]
  const kneeTagged: f64 = vm.stack[--vm.stackTop]
  const ratioTagged: f64 = vm.stack[--vm.stackTop]
  const thresholdTagged: f64 = vm.stack[--vm.stackTop]
  const releaseTagged: f64 = vm.stack[--vm.stackTop]
  const attackTagged: f64 = vm.stack[--vm.stackTop]
  const inputTagged: f64 = vm.stack[--vm.stackTop]
  const inputResolved: f64 = vmOpsVars.resolveCellRef(vm, inputTagged)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(attackTagged) || genOpHelpers.isStereoAudioArray(vm, attackTagged)) {
    modeMask |= 1
  }
  if (isAudio(releaseTagged) || genOpHelpers.isStereoAudioArray(vm, releaseTagged)) {
    modeMask |= 2
  }
  if (isAudio(thresholdTagged) || genOpHelpers.isStereoAudioArray(vm, thresholdTagged)) {
    modeMask |= 4
  }
  if (isAudio(ratioTagged) || genOpHelpers.isStereoAudioArray(vm, ratioTagged)) {
    modeMask |= 8
  }
  if (isAudio(kneeTagged) || genOpHelpers.isStereoAudioArray(vm, kneeTagged)) {
    modeMask |= 16
  }
  if (isAudio(keyTagged) || genOpHelpers.isStereoAudioArray(vm, keyTagged)) {
    modeMask |= 32
  }
  const attackValue: f32 = genOpHelpers.scalarOrFirstSample(vm, attackTagged)
  vm.paramScratch[0] = attackValue
  const releaseValue: f32 = genOpHelpers.scalarOrFirstSample(vm, releaseTagged)
  vm.paramScratch[1] = releaseValue
  const thresholdValue: f32 = genOpHelpers.scalarOrFirstSample(vm, thresholdTagged)
  vm.paramScratch[2] = thresholdValue
  const ratioValue: f32 = genOpHelpers.scalarOrFirstSample(vm, ratioTagged)
  vm.paramScratch[3] = ratioValue
  const kneeValue: f32 = genOpHelpers.scalarOrFirstSample(vm, kneeTagged)
  vm.paramScratch[4] = kneeValue
  const keyValue: f32 = genOpHelpers.scalarOrFirstSample(vm, keyTagged)
  vm.paramScratch[5] = keyValue
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
              const slot: GenSlot = vm.genPools[220].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[220].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              outputR = output
            }
            break
          }
          case 32: {
            {
              const slot: GenSlot = vm.genPools[221].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[221].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 16: {
            {
              const slot: GenSlot = vm.genPools[222].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[222].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 48: {
            {
              const slot: GenSlot = vm.genPools[223].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[223].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 8: {
            {
              const slot: GenSlot = vm.genPools[224].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[224].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 40: {
            {
              const slot: GenSlot = vm.genPools[225].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[225].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 24: {
            {
              const slot: GenSlot = vm.genPools[226].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[226].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 56: {
            {
              const slot: GenSlot = vm.genPools[227].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[227].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const slot: GenSlot = vm.genPools[228].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[228].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputR = output
            }
            break
          }
          case 36: {
            {
              const slot: GenSlot = vm.genPools[229].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[229].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 20: {
            {
              const slot: GenSlot = vm.genPools[230].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[230].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 52: {
            {
              const slot: GenSlot = vm.genPools[231].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[231].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 12: {
            {
              const slot: GenSlot = vm.genPools[232].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[232].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 44: {
            {
              const slot: GenSlot = vm.genPools[233].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[233].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 28: {
            {
              const slot: GenSlot = vm.genPools[234].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[234].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 60: {
            {
              const slot: GenSlot = vm.genPools[235].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[235].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const slot: GenSlot = vm.genPools[236].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[236].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              outputR = output
            }
            break
          }
          case 34: {
            {
              const slot: GenSlot = vm.genPools[237].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[237].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 18: {
            {
              const slot: GenSlot = vm.genPools[238].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[238].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 50: {
            {
              const slot: GenSlot = vm.genPools[239].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[239].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 10: {
            {
              const slot: GenSlot = vm.genPools[240].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[240].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 42: {
            {
              const slot: GenSlot = vm.genPools[241].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[241].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 26: {
            {
              const slot: GenSlot = vm.genPools[242].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[242].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 58: {
            {
              const slot: GenSlot = vm.genPools[243].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[243].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const slot: GenSlot = vm.genPools[244].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[244].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputR = output
            }
            break
          }
          case 38: {
            {
              const slot: GenSlot = vm.genPools[245].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[245].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 22: {
            {
              const slot: GenSlot = vm.genPools[246].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[246].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 54: {
            {
              const slot: GenSlot = vm.genPools[247].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[247].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 14: {
            {
              const slot: GenSlot = vm.genPools[248].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[248].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 46: {
            {
              const slot: GenSlot = vm.genPools[249].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[249].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 30: {
            {
              const slot: GenSlot = vm.genPools[250].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[250].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 62: {
            {
              const slot: GenSlot = vm.genPools[251].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[251].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const slot: GenSlot = vm.genPools[252].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[252].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              outputR = output
            }
            break
          }
          case 33: {
            {
              const slot: GenSlot = vm.genPools[253].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[253].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 17: {
            {
              const slot: GenSlot = vm.genPools[254].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[254].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 49: {
            {
              const slot: GenSlot = vm.genPools[255].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[255].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 9: {
            {
              const slot: GenSlot = vm.genPools[256].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[256].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 41: {
            {
              const slot: GenSlot = vm.genPools[257].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[257].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 25: {
            {
              const slot: GenSlot = vm.genPools[258].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[258].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 57: {
            {
              const slot: GenSlot = vm.genPools[259].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[259].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const slot: GenSlot = vm.genPools[260].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[260].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputR = output
            }
            break
          }
          case 37: {
            {
              const slot: GenSlot = vm.genPools[261].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[261].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 21: {
            {
              const slot: GenSlot = vm.genPools[262].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[262].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 53: {
            {
              const slot: GenSlot = vm.genPools[263].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[263].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 13: {
            {
              const slot: GenSlot = vm.genPools[264].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[264].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 45: {
            {
              const slot: GenSlot = vm.genPools[265].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[265].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 29: {
            {
              const slot: GenSlot = vm.genPools[266].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[266].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 61: {
            {
              const slot: GenSlot = vm.genPools[267].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[267].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const slot: GenSlot = vm.genPools[268].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[268].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              outputR = output
            }
            break
          }
          case 35: {
            {
              const slot: GenSlot = vm.genPools[269].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[269].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 19: {
            {
              const slot: GenSlot = vm.genPools[270].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[270].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 51: {
            {
              const slot: GenSlot = vm.genPools[271].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[271].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 11: {
            {
              const slot: GenSlot = vm.genPools[272].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[272].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 43: {
            {
              const slot: GenSlot = vm.genPools[273].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[273].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 27: {
            {
              const slot: GenSlot = vm.genPools[274].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[274].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 59: {
            {
              const slot: GenSlot = vm.genPools[275].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[275].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const slot: GenSlot = vm.genPools[276].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[276].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              outputR = output
            }
            break
          }
          case 39: {
            {
              const slot: GenSlot = vm.genPools[277].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[277].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 23: {
            {
              const slot: GenSlot = vm.genPools[278].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[278].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 55: {
            {
              const slot: GenSlot = vm.genPools[279].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[279].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 15: {
            {
              const slot: GenSlot = vm.genPools[280].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[280].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              outputR = output
            }
            break
          }
          case 47: {
            {
              const slot: GenSlot = vm.genPools[281].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[281].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputR = output
            }
            break
          }
          case 31: {
            {
              const slot: GenSlot = vm.genPools[282].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[282].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              outputR = output
            }
            break
          }
          case 63: {
            {
              const slot: GenSlot = vm.genPools[283].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputLeftResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
              outputL = output
            }
            {
              const slot: GenSlot = vm.genPools[283].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputRightResolved, procLen)
              const inputSrcPtr: usize = inputSrcResult.ptr
              const inputSrcBuf: Float32Array = inputSrcResult.buf
              genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
              const inputPtr: usize = inputSrcPtr
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
              const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
              const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
              const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
              const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
              const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
              genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
              genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
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
        if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
        return pc
      }
    }
  }
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[220].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      break
    }
    case 32: {
      const slot: GenSlot = vm.genPools[221].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 16: {
      const slot: GenSlot = vm.genPools[222].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 48: {
      const slot: GenSlot = vm.genPools[223].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 8: {
      const slot: GenSlot = vm.genPools[224].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 40: {
      const slot: GenSlot = vm.genPools[225].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 24: {
      const slot: GenSlot = vm.genPools[226].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 56: {
      const slot: GenSlot = vm.genPools[227].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[228].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      break
    }
    case 36: {
      const slot: GenSlot = vm.genPools[229].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 20: {
      const slot: GenSlot = vm.genPools[230].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 52: {
      const slot: GenSlot = vm.genPools[231].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[232].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 44: {
      const slot: GenSlot = vm.genPools[233].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 28: {
      const slot: GenSlot = vm.genPools[234].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 60: {
      const slot: GenSlot = vm.genPools[235].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[236].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      break
    }
    case 34: {
      const slot: GenSlot = vm.genPools[237].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 18: {
      const slot: GenSlot = vm.genPools[238].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 50: {
      const slot: GenSlot = vm.genPools[239].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[240].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 42: {
      const slot: GenSlot = vm.genPools[241].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 26: {
      const slot: GenSlot = vm.genPools[242].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 58: {
      const slot: GenSlot = vm.genPools[243].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[244].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      break
    }
    case 38: {
      const slot: GenSlot = vm.genPools[245].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 22: {
      const slot: GenSlot = vm.genPools[246].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 54: {
      const slot: GenSlot = vm.genPools[247].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[248].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 46: {
      const slot: GenSlot = vm.genPools[249].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 30: {
      const slot: GenSlot = vm.genPools[250].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 62: {
      const slot: GenSlot = vm.genPools[251].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[252].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      break
    }
    case 33: {
      const slot: GenSlot = vm.genPools[253].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 17: {
      const slot: GenSlot = vm.genPools[254].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 49: {
      const slot: GenSlot = vm.genPools[255].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[256].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 41: {
      const slot: GenSlot = vm.genPools[257].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 25: {
      const slot: GenSlot = vm.genPools[258].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 57: {
      const slot: GenSlot = vm.genPools[259].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[260].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      break
    }
    case 37: {
      const slot: GenSlot = vm.genPools[261].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 21: {
      const slot: GenSlot = vm.genPools[262].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 53: {
      const slot: GenSlot = vm.genPools[263].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[264].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 45: {
      const slot: GenSlot = vm.genPools[265].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 29: {
      const slot: GenSlot = vm.genPools[266].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 61: {
      const slot: GenSlot = vm.genPools[267].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[268].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      break
    }
    case 35: {
      const slot: GenSlot = vm.genPools[269].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 19: {
      const slot: GenSlot = vm.genPools[270].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 51: {
      const slot: GenSlot = vm.genPools[271].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[272].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 43: {
      const slot: GenSlot = vm.genPools[273].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 27: {
      const slot: GenSlot = vm.genPools[274].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 59: {
      const slot: GenSlot = vm.genPools[275].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioResult.ptr, releaseAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[276].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      break
    }
    case 39: {
      const slot: GenSlot = vm.genPools[277].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 23: {
      const slot: GenSlot = vm.genPools[278].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 55: {
      const slot: GenSlot = vm.genPools[279].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[280].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      break
    }
    case 47: {
      const slot: GenSlot = vm.genPools[281].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
      break
    }
    case 31: {
      const slot: GenSlot = vm.genPools[282].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      break
    }
    case 63: {
      const slot: GenSlot = vm.genPools[283].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputSrcResult = genOpHelpers.taggedToInputBuffer(vm, inputResolved, procLen)
      const inputSrcPtr: usize = inputSrcResult.ptr
      const inputSrcBuf: Float32Array = inputSrcResult.buf
      genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, params.bufferLength)
      const inputPtr: usize = inputSrcPtr
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, attackTagged, procLen)
      const releaseAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, releaseTagged, procLen)
      const thresholdAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, thresholdTagged, procLen)
      const ratioAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, ratioTagged, procLen)
      const kneeAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, kneeTagged, procLen)
      const keyAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioResult.ptr, releaseAudioResult.ptr, thresholdAudioResult.ptr, ratioAudioResult.ptr, kneeAudioResult.ptr, keyAudioResult.ptr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedInputBuf(vm, inputSrcBuf)
      genOpHelpers.releaseTaggedAudioParamResult(vm, attackAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, releaseAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, thresholdAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, ratioAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, kneeAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, keyAudioResult)
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
  if (isAudio(attackTagged)) vm.arena.releaseByPtr(u32(decodeAudio(attackTagged)))
  if (isAudio(releaseTagged)) vm.arena.releaseByPtr(u32(decodeAudio(releaseTagged)))
  if (isAudio(thresholdTagged)) vm.arena.releaseByPtr(u32(decodeAudio(thresholdTagged)))
  if (isAudio(ratioTagged)) vm.arena.releaseByPtr(u32(decodeAudio(ratioTagged)))
  if (isAudio(kneeTagged)) vm.arena.releaseByPtr(u32(decodeAudio(kneeTagged)))
  if (isAudio(keyTagged)) vm.arena.releaseByPtr(u32(decodeAudio(keyTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
