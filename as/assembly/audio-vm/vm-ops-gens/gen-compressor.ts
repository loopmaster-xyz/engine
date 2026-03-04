// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio, Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar } from '../../gen/compressor'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Compressor(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 294, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 295, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 296, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 297, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 298, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 299, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 300, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio(), 301, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 302, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 303, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 304, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio(), 305, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 306, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio(), 307, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar(), 308, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio(), 309, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 310, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 311, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 312, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 313, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 314, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 315, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 316, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio(), 317, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 318, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 319, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 320, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio(), 321, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 322, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio(), 323, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar(), 324, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio(), 325, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 326, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 327, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 328, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 329, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 330, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 331, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 332, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio(), 333, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 334, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 335, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 336, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio(), 337, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 338, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio(), 339, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar(), 340, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio(), 341, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar(), 342, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio(), 343, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar(), 344, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio(), 345, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar(), 346, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio(), 347, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar(), 348, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio(), 349, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar(), 350, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio(), 351, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar(), 352, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio(), 353, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar(), 354, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio(), 355, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar(), 356, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).copyFrom(changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(src))
  }, (dst: Object) => { changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio(), 357, 8, vm.genPoolManager, (dst: Object, src: Object) => {
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
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[294].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[294].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 32: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[295].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[295].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 16: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[296].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[296].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 48: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[297].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[297].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 8: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[298].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[298].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 40: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[299].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[299].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 24: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[300].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[300].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 56: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[301].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[301].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 4: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[302].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[302].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 36: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[303].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[303].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 20: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[304].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[304].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 52: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[305].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[305].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 12: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[306].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[306].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 44: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[307].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[307].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 28: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[308].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[308].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 60: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[309].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[309].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 2: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[310].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[310].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 34: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[311].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[311].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 18: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[312].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[312].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 50: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[313].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[313].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 10: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[314].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[314].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 42: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[315].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[315].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 26: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[316].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[316].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 58: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[317].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[317].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 6: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[318].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[318].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 38: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[319].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[319].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 22: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[320].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[320].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 54: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[321].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[321].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 14: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[322].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[322].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 46: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[323].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[323].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 30: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[324].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[324].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 62: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[325].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[325].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 1: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[326].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[326].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 33: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[327].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[327].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 17: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[328].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[328].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 49: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[329].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[329].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 9: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[330].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[330].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 41: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[331].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[331].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 25: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[332].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[332].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 57: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[333].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[333].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 5: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[334].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[334].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 37: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[335].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[335].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 21: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[336].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[336].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 53: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[337].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[337].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 13: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[338].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[338].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 45: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[339].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[339].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 29: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[340].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[340].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 61: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[341].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[341].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 3: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[342].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[342].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 35: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[343].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[343].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 19: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[344].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[344].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 51: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[345].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioPtr, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[345].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioPtr, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 11: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[346].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[346].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 43: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[347].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[347].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 27: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[348].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[348].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 59: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[349].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[349].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 7: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[350].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[350].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 39: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[351].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[351].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 23: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[352].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[352].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 55: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[353].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[353].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 15: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[354].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[354].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 47: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[355].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[355].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 31: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[356].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[356].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputR = output
            }
            break
          }
          case 63: {
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[357].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputLeftResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
              genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
              vm.endTempAudioScope(tempScopeMark)
              outputL = output
            }
            {
              const tempScopeMark: i32 = vm.beginTempAudioScope()
              const slot: GenSlot = vm.genPools[357].get()
              genOpHelpers.writeCallStackMetaToSlot(vm, slot)
              const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
              const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputRightResolved, procLen)
              genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
              output = vm.arena.get(procLen)
              const outputPtr: usize = output.dataStart
              const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
              vm.paramScratch[6] = instance.inputLevel
              vm.paramScratch[7] = instance.gainReduction
              const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
              const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
              const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
              const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
              const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
              const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
              slot.history.write(params.sampleCount, vm.paramScratch)
              instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
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
      const slot: GenSlot = vm.genPools[294].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 32: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[295].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeValue, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 16: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[296].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, inputPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 48: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[297].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioValue, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 8: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[298].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, inputPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 40: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[299].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, kneeValue, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 24: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[300].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, inputPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 56: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[301].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdValue, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 4: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[302].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, inputPtr, thresholdAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 36: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[303].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, kneeValue, thresholdAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 20: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[304].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, inputPtr, thresholdAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 52: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[305].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, ratioValue, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 12: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[306].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, inputPtr, thresholdAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 44: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[307].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, kneeValue, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 28: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[308].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, inputPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 60: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[309].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseValue, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 2: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[310].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 34: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[311].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, kneeValue, releaseAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 18: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[312].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, inputPtr, releaseAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 50: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[313].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, ratioValue, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 10: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[314].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, inputPtr, releaseAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 42: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[315].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, kneeValue, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 26: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[316].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, inputPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 58: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[317].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, thresholdValue, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 6: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[318].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 38: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[319].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 22: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[320].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 54: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[321].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, ratioValue, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 14: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[322].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 46: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[323].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, kneeValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 30: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[324].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, inputPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 62: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[325].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackValue, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 1: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[326].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 33: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[327].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, kneeValue, attackAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 17: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[328].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, inputPtr, attackAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 49: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[329].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, ratioValue, attackAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 9: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[330].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, inputPtr, attackAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 41: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[331].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, kneeValue, attackAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 25: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[332].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, inputPtr, attackAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 57: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[333].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, thresholdValue, attackAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 5: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[334].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 37: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[335].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, kneeValue, attackAudioPtr, thresholdAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 21: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[336].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, inputPtr, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 53: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[337].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, ratioValue, attackAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 13: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[338].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 45: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[339].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, kneeValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 29: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[340].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, inputPtr, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 61: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[341].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, releaseValue, attackAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 3: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[342].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 35: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[343].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 19: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[344].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 51: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[345].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, ratioValue, attackAudioPtr, releaseAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 11: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[346].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 43: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[347].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, kneeValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 27: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[348].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, inputPtr, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 59: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[349].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, thresholdValue, attackAudioPtr, releaseAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 7: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[350].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 39: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[351].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 23: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[352].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 55: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[353].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, ratioValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, kneeAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 15: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[354].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 47: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[355].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, kneeValue, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, keyAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 31: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[356].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, inputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      vm.endTempAudioScope(tempScopeMark)
      break
    }
    case 63: {
      const tempScopeMark: i32 = vm.beginTempAudioScope()
      const slot: GenSlot = vm.genPools[357].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      const inputPtr: usize = genOpHelpers.taggedToInputPtr(vm, inputResolved, procLen)
      genOpHelpers.writeInputToHistoryRing(slot.history, inputPtr, params.bufferLength)
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio = changetype<Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio>(slot.instance)
      vm.paramScratch[6] = instance.inputLevel
      vm.paramScratch[7] = instance.gainReduction
      const attackAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, attackTagged, procLen)
      const releaseAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, releaseTagged, procLen)
      const thresholdAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, thresholdTagged, procLen)
      const ratioAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, ratioTagged, procLen)
      const kneeAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, kneeTagged, procLen)
      const keyAudioPtr: usize = genOpHelpers.taggedToAudioParamPtr(vm, keyTagged, procLen)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, attackAudioPtr, releaseAudioPtr, thresholdAudioPtr, ratioAudioPtr, kneeAudioPtr, keyAudioPtr)
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
