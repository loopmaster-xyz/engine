// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio, Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar, Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio, Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar, Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio, Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar, Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio, Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio, Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar, Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio, Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar, Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio, Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar, Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio, Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio, Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar, Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio, Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar, Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio, Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar, Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio, Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio, Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar, Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio, Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar, Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio, Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar, Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio, Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio, Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar, Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio, Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio, Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar, Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio, Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio, Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar, Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio, Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio, Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar, Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio, Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio, Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar, Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio, Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio, Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar, Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio, Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio, Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar, Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio, Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar, Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio, Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar, Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio, Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar } from '../../gen/markov'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as heap from '../heap'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Markov(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar(), 173, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio(), 174, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar(), 175, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio(), 176, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar(), 177, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio(), 178, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar(), 179, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio(), 180, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar(), 181, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio(), 182, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar(), 183, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio(), 184, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar(), 185, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio(), 186, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar(), 187, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio(), 188, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar(), 189, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio(), 190, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar(), 191, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio(), 192, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar(), 193, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio(), 194, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar(), 195, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio(), 196, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar(), 197, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio(), 198, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar(), 199, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio(), 200, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar(), 201, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio(), 202, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar(), 203, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio(), 204, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar(), 205, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio(), 206, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar(), 207, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio(), 208, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar(), 209, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio(), 210, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar(), 211, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio(), 212, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar(), 213, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio(), 214, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar(), 215, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio(), 216, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar(), 217, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio(), 218, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar(), 219, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio(), 220, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar(), 221, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio(), 222, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar(), 223, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio(), 224, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar(), 225, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio(), 226, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar(), 227, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio(), 228, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar(), 229, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio(), 230, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar(), 231, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio(), 232, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar(), 233, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio(), 234, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar(), 235, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio(), 236, 8, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(dst).copyFrom(changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(src))
  }, (dst: Object) => { changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(dst).reset() }))
}

export function handleGenOp_Markov(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenMarkov_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const trigTagged: f64 = vm.stack[--vm.stackTop]
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  const biasTagged: f64 = vm.stack[--vm.stackTop]
  const stepTagged: f64 = vm.stack[--vm.stackTop]
  const stayTagged: f64 = vm.stack[--vm.stackTop]
  const statesTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  if (isAudio(statesTagged) || genOpHelpers.isStereoAudioArray(vm, statesTagged)) {
    modeMask |= 1
  }
  if (isAudio(stayTagged) || genOpHelpers.isStereoAudioArray(vm, stayTagged)) {
    modeMask |= 2
  }
  if (isAudio(stepTagged) || genOpHelpers.isStereoAudioArray(vm, stepTagged)) {
    modeMask |= 4
  }
  if (isAudio(biasTagged) || genOpHelpers.isStereoAudioArray(vm, biasTagged)) {
    modeMask |= 8
  }
  if (isAudio(seedTagged) || genOpHelpers.isStereoAudioArray(vm, seedTagged)) {
    modeMask |= 16
  }
  if (isAudio(trigTagged) || genOpHelpers.isStereoAudioArray(vm, trigTagged)) {
    modeMask |= 32
  }
  const statesValue: f32 = genOpHelpers.scalarOrFirstSample(vm, statesTagged)
  vm.paramScratch[0] = statesValue
  const stayValue: f32 = genOpHelpers.scalarOrFirstSample(vm, stayTagged)
  vm.paramScratch[1] = stayValue
  const stepValue: f32 = genOpHelpers.scalarOrFirstSample(vm, stepTagged)
  vm.paramScratch[2] = stepValue
  const biasValue: f32 = genOpHelpers.scalarOrFirstSample(vm, biasTagged)
  vm.paramScratch[3] = biasValue
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[4] = seedValue
  const trigValue: f32 = genOpHelpers.scalarOrFirstSample(vm, trigTagged)
  vm.paramScratch[5] = trigValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[173].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, biasValue, seedValue, trigValue)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, biasValue, seedValue, trigValue)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    case 32: {
      const slot: GenSlot = vm.genPools[174].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, biasValue, seedValue, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, biasValue, seedValue, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 16: {
      const slot: GenSlot = vm.genPools[175].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, biasValue, trigValue, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, biasValue, trigValue, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 48: {
      const slot: GenSlot = vm.genPools[176].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, biasValue, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, biasValue, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 8: {
      const slot: GenSlot = vm.genPools[177].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, seedValue, trigValue, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, seedValue, trigValue, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 40: {
      const slot: GenSlot = vm.genPools[178].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, seedValue, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, seedValue, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 24: {
      const slot: GenSlot = vm.genPools[179].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, trigValue, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, trigValue, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 56: {
      const slot: GenSlot = vm.genPools[180].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepValue, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepValue, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 4: {
      const slot: GenSlot = vm.genPools[181].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, biasValue, seedValue, trigValue, stepPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, biasValue, seedValue, trigValue, stepAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      break
    }
    case 36: {
      const slot: GenSlot = vm.genPools[182].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, biasValue, seedValue, stepPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, biasValue, seedValue, stepAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 20: {
      const slot: GenSlot = vm.genPools[183].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, biasValue, trigValue, stepPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, biasValue, trigValue, stepAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 52: {
      const slot: GenSlot = vm.genPools[184].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, biasValue, stepPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, biasValue, stepAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 12: {
      const slot: GenSlot = vm.genPools[185].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, seedValue, trigValue, stepPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, seedValue, trigValue, stepAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 44: {
      const slot: GenSlot = vm.genPools[186].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, seedValue, stepPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, seedValue, stepAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 28: {
      const slot: GenSlot = vm.genPools[187].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, trigValue, stepPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, trigValue, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 60: {
      const slot: GenSlot = vm.genPools[188].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayValue, stepPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayValue, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 2: {
      const slot: GenSlot = vm.genPools[189].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, biasValue, seedValue, trigValue, stayPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, biasValue, seedValue, trigValue, stayAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      break
    }
    case 34: {
      const slot: GenSlot = vm.genPools[190].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, biasValue, seedValue, stayPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, biasValue, seedValue, stayAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 18: {
      const slot: GenSlot = vm.genPools[191].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, biasValue, trigValue, stayPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, biasValue, trigValue, stayAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 50: {
      const slot: GenSlot = vm.genPools[192].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, biasValue, stayPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, biasValue, stayAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 10: {
      const slot: GenSlot = vm.genPools[193].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, seedValue, trigValue, stayPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, seedValue, trigValue, stayAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 42: {
      const slot: GenSlot = vm.genPools[194].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, seedValue, stayPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, seedValue, stayAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 26: {
      const slot: GenSlot = vm.genPools[195].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, trigValue, stayPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, trigValue, stayAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 58: {
      const slot: GenSlot = vm.genPools[196].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stepValue, stayPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stepValue, stayAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 6: {
      const slot: GenSlot = vm.genPools[197].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, biasValue, seedValue, trigValue, stayPtr, stepPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, biasValue, seedValue, trigValue, stayAudioResult.ptr, stepAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      break
    }
    case 38: {
      const slot: GenSlot = vm.genPools[198].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, biasValue, seedValue, stayPtr, stepPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, biasValue, seedValue, stayAudioResult.ptr, stepAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 22: {
      const slot: GenSlot = vm.genPools[199].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, biasValue, trigValue, stayPtr, stepPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, biasValue, trigValue, stayAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 54: {
      const slot: GenSlot = vm.genPools[200].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, biasValue, stayPtr, stepPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, biasValue, stayAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 14: {
      const slot: GenSlot = vm.genPools[201].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, seedValue, trigValue, stayPtr, stepPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, seedValue, trigValue, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 46: {
      const slot: GenSlot = vm.genPools[202].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, seedValue, stayPtr, stepPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, seedValue, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 30: {
      const slot: GenSlot = vm.genPools[203].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, trigValue, stayPtr, stepPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, trigValue, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 62: {
      const slot: GenSlot = vm.genPools[204].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesValue, stayPtr, stepPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesValue, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 1: {
      const slot: GenSlot = vm.genPools[205].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, biasValue, seedValue, trigValue, statesPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, biasValue, seedValue, trigValue, statesAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      break
    }
    case 33: {
      const slot: GenSlot = vm.genPools[206].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, biasValue, seedValue, statesPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, biasValue, seedValue, statesAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 17: {
      const slot: GenSlot = vm.genPools[207].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, biasValue, trigValue, statesPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, biasValue, trigValue, statesAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 49: {
      const slot: GenSlot = vm.genPools[208].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, biasValue, statesPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, biasValue, statesAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 9: {
      const slot: GenSlot = vm.genPools[209].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, seedValue, trigValue, statesPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, seedValue, trigValue, statesAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 41: {
      const slot: GenSlot = vm.genPools[210].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, seedValue, statesPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, seedValue, statesAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 25: {
      const slot: GenSlot = vm.genPools[211].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, trigValue, statesPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, trigValue, statesAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 57: {
      const slot: GenSlot = vm.genPools[212].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, stepValue, statesPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, stepValue, statesAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 5: {
      const slot: GenSlot = vm.genPools[213].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, biasValue, seedValue, trigValue, statesPtr, stepPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, biasValue, seedValue, trigValue, statesAudioResult.ptr, stepAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      break
    }
    case 37: {
      const slot: GenSlot = vm.genPools[214].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, biasValue, seedValue, statesPtr, stepPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, biasValue, seedValue, statesAudioResult.ptr, stepAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 21: {
      const slot: GenSlot = vm.genPools[215].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, biasValue, trigValue, statesPtr, stepPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, biasValue, trigValue, statesAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 53: {
      const slot: GenSlot = vm.genPools[216].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, biasValue, statesPtr, stepPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, biasValue, statesAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 13: {
      const slot: GenSlot = vm.genPools[217].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, seedValue, trigValue, statesPtr, stepPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, seedValue, trigValue, statesAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 45: {
      const slot: GenSlot = vm.genPools[218].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, seedValue, statesPtr, stepPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, seedValue, statesAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 29: {
      const slot: GenSlot = vm.genPools[219].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, trigValue, statesPtr, stepPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, trigValue, statesAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 61: {
      const slot: GenSlot = vm.genPools[220].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stayValue, statesPtr, stepPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stayValue, statesAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 3: {
      const slot: GenSlot = vm.genPools[221].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, biasValue, seedValue, trigValue, statesPtr, stayPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, biasValue, seedValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      break
    }
    case 35: {
      const slot: GenSlot = vm.genPools[222].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, biasValue, seedValue, statesPtr, stayPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, biasValue, seedValue, statesAudioResult.ptr, stayAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 19: {
      const slot: GenSlot = vm.genPools[223].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, biasValue, trigValue, statesPtr, stayPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, biasValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 51: {
      const slot: GenSlot = vm.genPools[224].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, biasValue, statesPtr, stayPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, biasValue, statesAudioResult.ptr, stayAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 11: {
      const slot: GenSlot = vm.genPools[225].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, seedValue, trigValue, statesPtr, stayPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, seedValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 43: {
      const slot: GenSlot = vm.genPools[226].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, seedValue, statesPtr, stayPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, seedValue, statesAudioResult.ptr, stayAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 27: {
      const slot: GenSlot = vm.genPools[227].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, trigValue, statesPtr, stayPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 59: {
      const slot: GenSlot = vm.genPools[228].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, stepValue, statesPtr, stayPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, stepValue, statesAudioResult.ptr, stayAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 7: {
      const slot: GenSlot = vm.genPools[229].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, biasValue, seedValue, trigValue, statesPtr, stayPtr, stepPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, biasValue, seedValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      break
    }
    case 39: {
      const slot: GenSlot = vm.genPools[230].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, biasValue, seedValue, statesPtr, stayPtr, stepPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, biasValue, seedValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 23: {
      const slot: GenSlot = vm.genPools[231].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, biasValue, trigValue, statesPtr, stayPtr, stepPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, biasValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 55: {
      const slot: GenSlot = vm.genPools[232].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, biasValue, statesPtr, stayPtr, stepPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, biasValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 15: {
      const slot: GenSlot = vm.genPools[233].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, seedValue, trigValue, statesPtr, stayPtr, stepPtr, biasPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      break
    }
    case 47: {
      const slot: GenSlot = vm.genPools[234].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, seedValue, statesPtr, stayPtr, stepPtr, biasPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      break
    }
    case 31: {
      const slot: GenSlot = vm.genPools[235].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, trigValue, statesPtr, stayPtr, stepPtr, biasPtr, seedPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, trigValue, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      break
    }
    case 63: {
      const slot: GenSlot = vm.genPools[236].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio = changetype<Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio>(slot.instance)
      vm.paramScratch[6] = instance.state
      vm.paramScratch[7] = instance.fired
      const statesAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, statesTagged, procLen)
      const stayAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stayTagged, procLen)
      const stepAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, stepTagged, procLen)
      const biasAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, biasTagged, procLen)
      const seedAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, seedTagged, procLen)
      const trigAudioResult = genOpHelpers.taggedToAudioParamBuffer(vm, trigTagged, procLen)
      const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)
      if (osFactor > 0) {
        const baseLen: i32 = params.bufferLength / osFactor
        const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
        const baseNyquist: f32 = baseSampleRate * 0.5
        const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
        const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
        const baseProcLen: i32 = (baseLen + 15) & ~15
        const baseOut: Float32Array = vm.arena.get(baseProcLen)
        const baseOutPtr: usize = baseOut.dataStart
        let baseInputPtr: usize = inputPtr
        const statesSrc: usize = statesAudioResult.ptr
        const statesBuf: Float32Array = vm.arena.get(baseProcLen)
        const statesPtr: usize = statesBuf.dataStart
        downsample(vm, statesSrc, statesPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(statesPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(statesPtr + (usize(k) << 2), last)
          }
        }
        const staySrc: usize = stayAudioResult.ptr
        const stayBuf: Float32Array = vm.arena.get(baseProcLen)
        const stayPtr: usize = stayBuf.dataStart
        downsample(vm, staySrc, stayPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stayPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stayPtr + (usize(k) << 2), last)
          }
        }
        const stepSrc: usize = stepAudioResult.ptr
        const stepBuf: Float32Array = vm.arena.get(baseProcLen)
        const stepPtr: usize = stepBuf.dataStart
        downsample(vm, stepSrc, stepPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(stepPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(stepPtr + (usize(k) << 2), last)
          }
        }
        const biasSrc: usize = biasAudioResult.ptr
        const biasBuf: Float32Array = vm.arena.get(baseProcLen)
        const biasPtr: usize = biasBuf.dataStart
        downsample(vm, biasSrc, biasPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(biasPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(biasPtr + (usize(k) << 2), last)
          }
        }
        const seedSrc: usize = seedAudioResult.ptr
        const seedBuf: Float32Array = vm.arena.get(baseProcLen)
        const seedPtr: usize = seedBuf.dataStart
        downsample(vm, seedSrc, seedPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(seedPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(seedPtr + (usize(k) << 2), last)
          }
        }
        const trigSrc: usize = trigAudioResult.ptr
        const trigBuf: Float32Array = vm.arena.get(baseProcLen)
        const trigPtr: usize = trigBuf.dataStart
        downsample(vm, trigSrc, trigPtr, baseLen, osFactor)
        if (baseProcLen > baseLen && baseLen > 0) {
          const last: f32 = load<f32>(trigPtr + (usize(baseLen - 1) << 2))
          for (let k: i32 = baseLen; k < baseProcLen; k++) {
            store<f32>(trigPtr + (usize(k) << 2), last)
          }
        }
        slot.history.write(params.sampleCount / osFactor, vm.paramScratch)
        instance.process(baseLen, params.sampleCount / osFactor, baseSampleRate, baseNyquist, basePiOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, baseInputPtr, baseOutPtr, statesPtr, stayPtr, stepPtr, biasPtr, seedPtr, trigPtr)
        upsample(vm, baseOutPtr, outputPtr, baseLen, osFactor)
        genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, genOpHelpers.alignedProcLength(params.bufferLength))
        vm.arena.release(baseOut)
        vm.arena.release(statesBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        vm.arena.release(stayBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        vm.arena.release(stepBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        vm.arena.release(biasBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        vm.arena.release(seedBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        vm.arena.release(trigBuf)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      } else {
        slot.history.write(params.sampleCount, vm.paramScratch)
        instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, statesAudioResult.ptr, stayAudioResult.ptr, stepAudioResult.ptr, biasAudioResult.ptr, seedAudioResult.ptr, trigAudioResult.ptr)
        genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
        genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
      }
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      genOpHelpers.releaseTaggedAudioParamResult(vm, statesAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stayAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, stepAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, biasAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, seedAudioResult)
      genOpHelpers.releaseTaggedAudioParamResult(vm, trigAudioResult)
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
  if (isAudio(statesTagged)) vm.arena.releaseByPtr(u32(decodeAudio(statesTagged)))
  if (isAudio(stayTagged)) vm.arena.releaseByPtr(u32(decodeAudio(stayTagged)))
  if (isAudio(stepTagged)) vm.arena.releaseByPtr(u32(decodeAudio(stepTagged)))
  if (isAudio(biasTagged)) vm.arena.releaseByPtr(u32(decodeAudio(biasTagged)))
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (isAudio(trigTagged)) vm.arena.releaseByPtr(u32(decodeAudio(trigTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
