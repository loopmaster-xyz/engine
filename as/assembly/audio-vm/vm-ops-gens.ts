// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { handleGenOp_Phasor, initGenPools_Phasor } from './vm-ops-gens/gen-phasor'
import { handleGenOp_Every, initGenPools_Every } from './vm-ops-gens/gen-every'
import { handleGenOp_White, initGenPools_White } from './vm-ops-gens/gen-white'
import { handleGenOp_Lfosqr, initGenPools_Lfosqr } from './vm-ops-gens/gen-lfosqr'
import { handleGenOp_Lfosah, initGenPools_Lfosah } from './vm-ops-gens/gen-lfosah'
import { handleGenOp_Dc, initGenPools_Dc } from './vm-ops-gens/gen-dc'
import { handleGenOp_Gauss, initGenPools_Gauss } from './vm-ops-gens/gen-gauss'
import { handleGenOp_Impulse, initGenPools_Impulse } from './vm-ops-gens/gen-impulse'
import { handleGenOp_TestGain, initGenPools_TestGain } from './vm-ops-gens/gen-test-gain'
import { handleGenOp_Freeverb, initGenPools_Freeverb } from './vm-ops-gens/gen-freeverb'
import { handleGenOp_Saw, initGenPools_Saw } from './vm-ops-gens/gen-saw'
import { handleGenOp_TestOversample, initGenPools_TestOversample } from './vm-ops-gens/gen-test-oversample'
import { handleGenOp_Sine, initGenPools_Sine } from './vm-ops-gens/gen-sine'
import { handleGenOp_Lfosine, initGenPools_Lfosine } from './vm-ops-gens/gen-lfosine'
import { handleGenOp_Slicer, initGenPools_Slicer } from './vm-ops-gens/gen-slicer'
import { handleGenOp_Brown, initGenPools_Brown } from './vm-ops-gens/gen-brown'
import { handleGenOp_Euclid, initGenPools_Euclid } from './vm-ops-gens/gen-euclid'
import { handleGenOp_Pwm, initGenPools_Pwm } from './vm-ops-gens/gen-pwm'
import { handleGenOp_Ad, initGenPools_Ad } from './vm-ops-gens/gen-ad'
import { handleGenOp_Onepole, initGenPools_Onepole } from './vm-ops-gens/gen-onepole'
import { handleGenOp_Sqr, initGenPools_Sqr } from './vm-ops-gens/gen-sqr'
import { handleGenOp_Hold, initGenPools_Hold } from './vm-ops-gens/gen-hold'
import { handleGenOp_Lfosaw, initGenPools_Lfosaw } from './vm-ops-gens/gen-lfosaw'
import { handleGenOp_Compressor, initGenPools_Compressor } from './vm-ops-gens/gen-compressor'
import { handleGenOp_Emit, initGenPools_Emit } from './vm-ops-gens/gen-emit'
import { handleGenOp_Fractal, initGenPools_Fractal } from './vm-ops-gens/gen-fractal'
import { handleGenOp_Lforamp, initGenPools_Lforamp } from './vm-ops-gens/gen-lforamp'
import { handleGenOp_Tri, initGenPools_Tri } from './vm-ops-gens/gen-tri'
import { handleGenOp_Pitchshift, initGenPools_Pitchshift } from './vm-ops-gens/gen-pitchshift'
import { handleGenOp_Zerox, initGenPools_Zerox } from './vm-ops-gens/gen-zerox'
import { handleGenOp_Limiter, initGenPools_Limiter } from './vm-ops-gens/gen-limiter'
import { handleGenOp_At, initGenPools_At } from './vm-ops-gens/gen-at'
import { handleGenOp_Diodeladder, initGenPools_Diodeladder } from './vm-ops-gens/gen-diodeladder'
import { handleGenOp_Ramp, initGenPools_Ramp } from './vm-ops-gens/gen-ramp'
import { handleGenOp_Smooth, initGenPools_Smooth } from './vm-ops-gens/gen-smooth'
import { handleGenOp_Lfotri, initGenPools_Lfotri } from './vm-ops-gens/gen-lfotri'
import { handleGenOp_Adsr, initGenPools_Adsr } from './vm-ops-gens/gen-adsr'
import { handleGenOp_Analyser, initGenPools_Analyser } from './vm-ops-gens/gen-analyser'
import { handleGenOp_Biquad, initGenPools_Biquad } from './vm-ops-gens/gen-biquad'
import { handleGenOp_Envfollow, initGenPools_Envfollow } from './vm-ops-gens/gen-envfollow'
import { handleGenOp_Sah, initGenPools_Sah } from './vm-ops-gens/gen-sah'
import { handleGenOp_Velvet, initGenPools_Velvet } from './vm-ops-gens/gen-velvet'
import { handleGenOp_Fdn, initGenPools_Fdn } from './vm-ops-gens/gen-fdn'
import { handleGenOp_Pink, initGenPools_Pink } from './vm-ops-gens/gen-pink'
import { handleGenOp_Dattorro, initGenPools_Dattorro } from './vm-ops-gens/gen-dattorro'
import { handleGenOp_Random, initGenPools_Random } from './vm-ops-gens/gen-random'
import { handleGenOp_Slew, initGenPools_Slew } from './vm-ops-gens/gen-slew'
import { handleGenOp_Inc, initGenPools_Inc } from './vm-ops-gens/gen-inc'
import { handleGenOp_Biquadshelf, initGenPools_Biquadshelf } from './vm-ops-gens/gen-biquadshelf'
import { handleGenOp_Sampler, initGenPools_Sampler } from './vm-ops-gens/gen-sampler'
import { handleGenOp_Moog, initGenPools_Moog } from './vm-ops-gens/gen-moog'
import { handleGenOp_Svf, initGenPools_Svf } from './vm-ops-gens/gen-svf'
import { VmState } from './vm-state'
import { GenPool } from './gen-pool'
import { TramKernel } from '../kernel/tram'
import { MiniKernel } from '../kernel/mini'
import { TimelineKernel } from '../kernel/timeline'
import { debugAudioVmOp } from './imports'
import { AudioVmOp } from './vm-op'
import { RunParams } from './run-params'

export function initGenPools(vm: VmState): void {
  initGenPools_Phasor(vm)
  initGenPools_Every(vm)
  initGenPools_White(vm)
  initGenPools_Lfosqr(vm)
  initGenPools_Lfosah(vm)
  initGenPools_Dc(vm)
  initGenPools_Gauss(vm)
  initGenPools_Impulse(vm)
  initGenPools_TestGain(vm)
  initGenPools_Freeverb(vm)
  initGenPools_Saw(vm)
  initGenPools_TestOversample(vm)
  initGenPools_Sine(vm)
  initGenPools_Lfosine(vm)
  initGenPools_Slicer(vm)
  initGenPools_Brown(vm)
  initGenPools_Euclid(vm)
  initGenPools_Pwm(vm)
  initGenPools_Ad(vm)
  initGenPools_Onepole(vm)
  initGenPools_Sqr(vm)
  initGenPools_Hold(vm)
  initGenPools_Lfosaw(vm)
  initGenPools_Compressor(vm)
  initGenPools_Emit(vm)
  initGenPools_Fractal(vm)
  initGenPools_Lforamp(vm)
  initGenPools_Tri(vm)
  initGenPools_Pitchshift(vm)
  initGenPools_Zerox(vm)
  initGenPools_Limiter(vm)
  initGenPools_At(vm)
  initGenPools_Diodeladder(vm)
  initGenPools_Ramp(vm)
  initGenPools_Smooth(vm)
  initGenPools_Lfotri(vm)
  initGenPools_Adsr(vm)
  initGenPools_Analyser(vm)
  initGenPools_Biquad(vm)
  initGenPools_Envfollow(vm)
  initGenPools_Sah(vm)
  initGenPools_Velvet(vm)
  initGenPools_Fdn(vm)
  initGenPools_Pink(vm)
  initGenPools_Dattorro(vm)
  initGenPools_Random(vm)
  initGenPools_Slew(vm)
  initGenPools_Inc(vm)
  initGenPools_Biquadshelf(vm)
  initGenPools_Sampler(vm)
  initGenPools_Moog(vm)
  initGenPools_Svf(vm)
  vm.genPools.push(new GenPool(() => changetype<Object>(0), 615, 2, vm.genPoolManager))
  vm.genPools.push(new GenPool(() => new TramKernel(), 616, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TramKernel>(dst).reset()
  }, (dst: Object) => { changetype<TramKernel>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new MiniKernel(), 617, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<MiniKernel>(dst).reset()
  }, (dst: Object) => { changetype<MiniKernel>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new TimelineKernel(), 618, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TimelineKernel>(dst).reset()
  }, (dst: Object) => { changetype<TimelineKernel>(dst).reset() }))
  vm.genPools.push(new GenPool(() => changetype<Object>(0), 619, 0, vm.genPoolManager))
  vm.genPools.push(new GenPool(() => changetype<Object>(0), 620, 0, vm.genPoolManager))
  vm.genPools.push(new GenPool(() => changetype<Object>(0), 621, 1, vm.genPoolManager))
  vm.arrayGetGenPoolIndex = vm.genPools.length - 1
  vm.tableGenPoolIndex = 615
  vm.tramGenPoolIndex = 616
  vm.miniGenPoolIndex = 617
  vm.timelineGenPoolIndex = 618
  vm.outGenPoolIndex = 619
  vm.mixGenPoolIndex = 620
}

export function handleGenOp(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  if (op >= AudioVmOp.GenPhasor_default && op <= AudioVmOp.GenPhasor_default) return handleGenOp_Phasor(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenEvery_default && op <= AudioVmOp.GenEvery_default) return handleGenOp_Every(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenWhite_default && op <= AudioVmOp.GenWhite_default) return handleGenOp_White(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLfosqr_default && op <= AudioVmOp.GenLfosqr_default) return handleGenOp_Lfosqr(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLfosah_default && op <= AudioVmOp.GenLfosah_default) return handleGenOp_Lfosah(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenDc_default && op <= AudioVmOp.GenDc_default) return handleGenOp_Dc(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenGauss_default && op <= AudioVmOp.GenGauss_default) return handleGenOp_Gauss(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenImpulse_default && op <= AudioVmOp.GenImpulse_default) return handleGenOp_Impulse(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenTestGain_default && op <= AudioVmOp.GenTestGain_default) return handleGenOp_TestGain(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenFreeverb_default && op <= AudioVmOp.GenFreeverb_default) return handleGenOp_Freeverb(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSaw_default && op <= AudioVmOp.GenSaw_default) return handleGenOp_Saw(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenTestOversample_default && op <= AudioVmOp.GenTestOversample_default) return handleGenOp_TestOversample(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSine_default && op <= AudioVmOp.GenSine_default) return handleGenOp_Sine(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLfosine_default && op <= AudioVmOp.GenLfosine_default) return handleGenOp_Lfosine(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSlicer_default && op <= AudioVmOp.GenSlicer_default) return handleGenOp_Slicer(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenBrown_default && op <= AudioVmOp.GenBrown_default) return handleGenOp_Brown(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenEuclid_default && op <= AudioVmOp.GenEuclid_default) return handleGenOp_Euclid(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenPwm_default && op <= AudioVmOp.GenPwm_default) return handleGenOp_Pwm(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenAd_default && op <= AudioVmOp.GenAd_default) return handleGenOp_Ad(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenOnepole_lp1 && op <= AudioVmOp.GenOnepole_hp1) return handleGenOp_Onepole(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSqr_default && op <= AudioVmOp.GenSqr_default) return handleGenOp_Sqr(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenHold_default && op <= AudioVmOp.GenHold_default) return handleGenOp_Hold(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLfosaw_default && op <= AudioVmOp.GenLfosaw_default) return handleGenOp_Lfosaw(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenCompressor_default && op <= AudioVmOp.GenCompressor_default) return handleGenOp_Compressor(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenEmit_default && op <= AudioVmOp.GenEmit_default) return handleGenOp_Emit(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenFractal_default && op <= AudioVmOp.GenFractal_default) return handleGenOp_Fractal(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLforamp_default && op <= AudioVmOp.GenLforamp_default) return handleGenOp_Lforamp(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenTri_default && op <= AudioVmOp.GenTri_default) return handleGenOp_Tri(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenPitchshift_default && op <= AudioVmOp.GenPitchshift_default) return handleGenOp_Pitchshift(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenZerox_default && op <= AudioVmOp.GenZerox_default) return handleGenOp_Zerox(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLimiter_default && op <= AudioVmOp.GenLimiter_default) return handleGenOp_Limiter(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenAt_default && op <= AudioVmOp.GenAt_default) return handleGenOp_At(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenDiodeladder_default && op <= AudioVmOp.GenDiodeladder_default) return handleGenOp_Diodeladder(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenRamp_default && op <= AudioVmOp.GenRamp_default) return handleGenOp_Ramp(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSmooth_default && op <= AudioVmOp.GenSmooth_default) return handleGenOp_Smooth(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenLfotri_default && op <= AudioVmOp.GenLfotri_default) return handleGenOp_Lfotri(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenAdsr_default && op <= AudioVmOp.GenAdsr_default) return handleGenOp_Adsr(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenAnalyser_default && op <= AudioVmOp.GenAnalyser_default) return handleGenOp_Analyser(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenBiquad_lp && op <= AudioVmOp.GenBiquad_ap) return handleGenOp_Biquad(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenEnvfollow_default && op <= AudioVmOp.GenEnvfollow_default) return handleGenOp_Envfollow(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSah_default && op <= AudioVmOp.GenSah_default) return handleGenOp_Sah(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenVelvet_default && op <= AudioVmOp.GenVelvet_default) return handleGenOp_Velvet(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenFdn_default && op <= AudioVmOp.GenFdn_default) return handleGenOp_Fdn(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenPink_default && op <= AudioVmOp.GenPink_default) return handleGenOp_Pink(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenDattorro_default && op <= AudioVmOp.GenDattorro_default) return handleGenOp_Dattorro(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenRandom_default && op <= AudioVmOp.GenRandom_default) return handleGenOp_Random(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSlew_default && op <= AudioVmOp.GenSlew_default) return handleGenOp_Slew(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenInc_default && op <= AudioVmOp.GenInc_default) return handleGenOp_Inc(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenBiquadshelf_ls && op <= AudioVmOp.GenBiquadshelf_peak) return handleGenOp_Biquadshelf(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSampler_default && op <= AudioVmOp.GenSampler_default) return handleGenOp_Sampler(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenMoog_lpm && op <= AudioVmOp.GenMoog_hpm) return handleGenOp_Moog(vm, op, pc, opsPtr, params)
  if (op >= AudioVmOp.GenSvf_lps && op <= AudioVmOp.GenSvf_aps) return handleGenOp_Svf(vm, op, pc, opsPtr, params)
  debugAudioVmOp(pc - 1, op, vm.stackTop)
  throw new Error(`Unknown gen: ${op}`)
}
