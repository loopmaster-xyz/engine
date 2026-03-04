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
              const slot: GenSlot = vm.genPools[294].get()
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
              const slot: GenSlot = vm.genPools[294].get()
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
              const slot: GenSlot = vm.genPools[295].get()
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
              const slot: GenSlot = vm.genPools[295].get()
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
              const slot: GenSlot = vm.genPools[296].get()
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
              const slot: GenSlot = vm.genPools[296].get()
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
              const slot: GenSlot = vm.genPools[297].get()
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
              const slot: GenSlot = vm.genPools[297].get()
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
              const slot: GenSlot = vm.genPools[298].get()
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
              const slot: GenSlot = vm.genPools[298].get()
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
              const slot: GenSlot = vm.genPools[299].get()
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
              const slot: GenSlot = vm.genPools[299].get()
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
              const slot: GenSlot = vm.genPools[300].get()
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
              const slot: GenSlot = vm.genPools[300].get()
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
              const slot: GenSlot = vm.genPools[301].get()
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
              const slot: GenSlot = vm.genPools[301].get()
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
              const slot: GenSlot = vm.genPools[302].get()
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
              const slot: GenSlot = vm.genPools[302].get()
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
              const slot: GenSlot = vm.genPools[303].get()
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
              const slot: GenSlot = vm.genPools[303].get()
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
              const slot: GenSlot = vm.genPools[304].get()
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
              const slot: GenSlot = vm.genPools[304].get()
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
              const slot: GenSlot = vm.genPools[305].get()
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
              const slot: GenSlot = vm.genPools[305].get()
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
              const slot: GenSlot = vm.genPools[306].get()
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
              const slot: GenSlot = vm.genPools[306].get()
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
              const slot: GenSlot = vm.genPools[307].get()
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
              const slot: GenSlot = vm.genPools[307].get()
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
              const slot: GenSlot = vm.genPools[308].get()
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
              const slot: GenSlot = vm.genPools[308].get()
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
              const slot: GenSlot = vm.genPools[309].get()
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
              const slot: GenSlot = vm.genPools[309].get()
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
              const slot: GenSlot = vm.genPools[310].get()
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
              const slot: GenSlot = vm.genPools[310].get()
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
              const slot: GenSlot = vm.genPools[311].get()
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
              const slot: GenSlot = vm.genPools[311].get()
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
              const slot: GenSlot = vm.genPools[312].get()
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
              const slot: GenSlot = vm.genPools[312].get()
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
              const slot: GenSlot = vm.genPools[313].get()
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
              const slot: GenSlot = vm.genPools[313].get()
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
              const slot: GenSlot = vm.genPools[314].get()
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
              const slot: GenSlot = vm.genPools[314].get()
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
              const slot: GenSlot = vm.genPools[315].get()
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
              const slot: GenSlot = vm.genPools[315].get()
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
              const slot: GenSlot = vm.genPools[316].get()
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
              const slot: GenSlot = vm.genPools[316].get()
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
              const slot: GenSlot = vm.genPools[317].get()
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
              const slot: GenSlot = vm.genPools[317].get()
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
              const slot: GenSlot = vm.genPools[318].get()
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
              const slot: GenSlot = vm.genPools[318].get()
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
              const slot: GenSlot = vm.genPools[319].get()
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
              const slot: GenSlot = vm.genPools[319].get()
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
              const slot: GenSlot = vm.genPools[320].get()
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
              const slot: GenSlot = vm.genPools[320].get()
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
              const slot: GenSlot = vm.genPools[321].get()
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
              const slot: GenSlot = vm.genPools[321].get()
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
              const slot: GenSlot = vm.genPools[322].get()
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
              const slot: GenSlot = vm.genPools[322].get()
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
              const slot: GenSlot = vm.genPools[323].get()
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
              const slot: GenSlot = vm.genPools[323].get()
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
              const slot: GenSlot = vm.genPools[324].get()
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
              const slot: GenSlot = vm.genPools[324].get()
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
              const slot: GenSlot = vm.genPools[325].get()
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
              const slot: GenSlot = vm.genPools[325].get()
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
              const slot: GenSlot = vm.genPools[326].get()
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
              const slot: GenSlot = vm.genPools[326].get()
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
              const slot: GenSlot = vm.genPools[327].get()
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
              const slot: GenSlot = vm.genPools[327].get()
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
              const slot: GenSlot = vm.genPools[328].get()
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
              const slot: GenSlot = vm.genPools[328].get()
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
              const slot: GenSlot = vm.genPools[329].get()
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
              const slot: GenSlot = vm.genPools[329].get()
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
              const slot: GenSlot = vm.genPools[330].get()
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
              const slot: GenSlot = vm.genPools[330].get()
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
              const slot: GenSlot = vm.genPools[331].get()
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
              const slot: GenSlot = vm.genPools[331].get()
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
              const slot: GenSlot = vm.genPools[332].get()
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
              const slot: GenSlot = vm.genPools[332].get()
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
              const slot: GenSlot = vm.genPools[333].get()
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
              const slot: GenSlot = vm.genPools[333].get()
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
              const slot: GenSlot = vm.genPools[334].get()
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
              const slot: GenSlot = vm.genPools[334].get()
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
              const slot: GenSlot = vm.genPools[335].get()
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
              const slot: GenSlot = vm.genPools[335].get()
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
              const slot: GenSlot = vm.genPools[336].get()
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
              const slot: GenSlot = vm.genPools[336].get()
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
              const slot: GenSlot = vm.genPools[337].get()
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
              const slot: GenSlot = vm.genPools[337].get()
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
              const slot: GenSlot = vm.genPools[338].get()
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
              const slot: GenSlot = vm.genPools[338].get()
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
              const slot: GenSlot = vm.genPools[339].get()
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
              const slot: GenSlot = vm.genPools[339].get()
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
              const slot: GenSlot = vm.genPools[340].get()
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
              const slot: GenSlot = vm.genPools[340].get()
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
              const slot: GenSlot = vm.genPools[341].get()
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
              const slot: GenSlot = vm.genPools[341].get()
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
              const slot: GenSlot = vm.genPools[342].get()
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
              const slot: GenSlot = vm.genPools[342].get()
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
              const slot: GenSlot = vm.genPools[343].get()
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
              const slot: GenSlot = vm.genPools[343].get()
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
              const slot: GenSlot = vm.genPools[344].get()
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
              const slot: GenSlot = vm.genPools[344].get()
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
              const slot: GenSlot = vm.genPools[345].get()
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
              const slot: GenSlot = vm.genPools[345].get()
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
              const slot: GenSlot = vm.genPools[346].get()
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
              const slot: GenSlot = vm.genPools[346].get()
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
              const slot: GenSlot = vm.genPools[347].get()
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
              const slot: GenSlot = vm.genPools[347].get()
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
              const slot: GenSlot = vm.genPools[348].get()
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
              const slot: GenSlot = vm.genPools[348].get()
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
              const slot: GenSlot = vm.genPools[349].get()
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
              const slot: GenSlot = vm.genPools[349].get()
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
              const slot: GenSlot = vm.genPools[350].get()
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
              const slot: GenSlot = vm.genPools[350].get()
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
              const slot: GenSlot = vm.genPools[351].get()
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
              const slot: GenSlot = vm.genPools[351].get()
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
              const slot: GenSlot = vm.genPools[352].get()
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
              const slot: GenSlot = vm.genPools[352].get()
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
              const slot: GenSlot = vm.genPools[353].get()
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
              const slot: GenSlot = vm.genPools[353].get()
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
              const slot: GenSlot = vm.genPools[354].get()
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
              const slot: GenSlot = vm.genPools[354].get()
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
              const slot: GenSlot = vm.genPools[355].get()
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
              const slot: GenSlot = vm.genPools[355].get()
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
              const slot: GenSlot = vm.genPools[356].get()
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
              const slot: GenSlot = vm.genPools[356].get()
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
              const slot: GenSlot = vm.genPools[357].get()
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
              const slot: GenSlot = vm.genPools[357].get()
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
        heap.releaseValue(vm, inputResolved)
        if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
        return pc
      }
    }
  }
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[294].get()
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
      const slot: GenSlot = vm.genPools[295].get()
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
      const slot: GenSlot = vm.genPools[296].get()
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
      const slot: GenSlot = vm.genPools[297].get()
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
      const slot: GenSlot = vm.genPools[298].get()
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
      const slot: GenSlot = vm.genPools[299].get()
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
      const slot: GenSlot = vm.genPools[300].get()
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
      const slot: GenSlot = vm.genPools[301].get()
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
      const slot: GenSlot = vm.genPools[302].get()
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
      const slot: GenSlot = vm.genPools[303].get()
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
      const slot: GenSlot = vm.genPools[304].get()
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
      const slot: GenSlot = vm.genPools[305].get()
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
      const slot: GenSlot = vm.genPools[306].get()
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
      const slot: GenSlot = vm.genPools[307].get()
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
      const slot: GenSlot = vm.genPools[308].get()
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
      const slot: GenSlot = vm.genPools[309].get()
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
      const slot: GenSlot = vm.genPools[310].get()
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
      const slot: GenSlot = vm.genPools[311].get()
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
      const slot: GenSlot = vm.genPools[312].get()
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
      const slot: GenSlot = vm.genPools[313].get()
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
      const slot: GenSlot = vm.genPools[314].get()
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
      const slot: GenSlot = vm.genPools[315].get()
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
      const slot: GenSlot = vm.genPools[316].get()
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
      const slot: GenSlot = vm.genPools[317].get()
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
      const slot: GenSlot = vm.genPools[318].get()
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
      const slot: GenSlot = vm.genPools[319].get()
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
      const slot: GenSlot = vm.genPools[320].get()
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
      const slot: GenSlot = vm.genPools[321].get()
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
      const slot: GenSlot = vm.genPools[322].get()
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
      const slot: GenSlot = vm.genPools[323].get()
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
      const slot: GenSlot = vm.genPools[324].get()
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
      const slot: GenSlot = vm.genPools[325].get()
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
      const slot: GenSlot = vm.genPools[326].get()
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
      const slot: GenSlot = vm.genPools[327].get()
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
      const slot: GenSlot = vm.genPools[328].get()
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
      const slot: GenSlot = vm.genPools[329].get()
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
      const slot: GenSlot = vm.genPools[330].get()
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
      const slot: GenSlot = vm.genPools[331].get()
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
      const slot: GenSlot = vm.genPools[332].get()
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
      const slot: GenSlot = vm.genPools[333].get()
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
      const slot: GenSlot = vm.genPools[334].get()
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
      const slot: GenSlot = vm.genPools[335].get()
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
      const slot: GenSlot = vm.genPools[336].get()
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
      const slot: GenSlot = vm.genPools[337].get()
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
      const slot: GenSlot = vm.genPools[338].get()
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
      const slot: GenSlot = vm.genPools[339].get()
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
      const slot: GenSlot = vm.genPools[340].get()
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
      const slot: GenSlot = vm.genPools[341].get()
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
      const slot: GenSlot = vm.genPools[342].get()
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
      const slot: GenSlot = vm.genPools[343].get()
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
      const slot: GenSlot = vm.genPools[344].get()
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
      const slot: GenSlot = vm.genPools[345].get()
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
      const slot: GenSlot = vm.genPools[346].get()
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
      const slot: GenSlot = vm.genPools[347].get()
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
      const slot: GenSlot = vm.genPools[348].get()
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
      const slot: GenSlot = vm.genPools[349].get()
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
      const slot: GenSlot = vm.genPools[350].get()
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
      const slot: GenSlot = vm.genPools[351].get()
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
      const slot: GenSlot = vm.genPools[352].get()
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
      const slot: GenSlot = vm.genPools[353].get()
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
      const slot: GenSlot = vm.genPools[354].get()
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
      const slot: GenSlot = vm.genPools[355].get()
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
      const slot: GenSlot = vm.genPools[356].get()
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
      const slot: GenSlot = vm.genPools[357].get()
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
