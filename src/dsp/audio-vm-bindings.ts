// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes
import type { AudioVmHistoryView } from './audio-vm-helpers.ts'
import type { MiniCompileResult } from '../live/compiler/index.ts'

export const AUDIO_VM_INFO_STRIDE = 29
export const HISTORY_META_STRIDE = 20
export const MAX_PARAM_COUNT = 10

export enum AudioVmOp {
  Out,
  Solo,
  Post,
  PushScalar,
  PushAudio,
  PushUndefined,
  SetBpm,
  Time,
  TableLookup,
  Alloc,
  Write,
  Read,
  Tram,
  Mini,
  Timeline,
  Oversample,
  MakeArray,
  ArrayGet,
  ArraySet,
  ArrayLen,
  ArrayPush,
  Walk,
  Glide,
  Step,
  Random,
  GetSystem,
  GetGlobal,
  GetLocal,
  SetGlobal,
  SetLocal,
  GetClosure,
  SetClosure,
  GetCellRefLocal,
  GetCellRefGlobal,
  GetCellRefClosure,
  DefineFunction,
  CallFunction,
  Return,
  Throw,
  PushTryBlock,
  PopTryBlock,
  Jump,
  JumpIfFalse,
  JumpIfTrue,
  PushClosure,
  PopScope,
  Dup,
  Pop,
  Neg,
  Not,
  BitNot,
  Add,
  Sub,
  Mul,
  Div,
  Mod,
  Pow,
  Greater,
  Less,
  GreaterEqual,
  LessEqual,
  Equal,
  NotEqual,
  And,
  Or,
  BitAnd,
  BitOr,
  BitXor,
  ShiftLeft,
  ShiftRight,
  IsUndefined,
  IsScalar,
  IsAudio,
  IsArray,
  IsFunction,
  MathUnary,
  MathBinary,
  MathTernary,
  GenPhasor_default,
  GenEvery_default,
  GenWhite_default,
  GenLfosqr_default,
  GenLfosah_default,
  GenDc_default,
  GenGauss_default,
  GenImpulse_default,
  GenTestGain_default,
  GenFreeverb_default,
  GenSaw_default,
  GenTestOversample_default,
  GenSine_default,
  GenLfosine_default,
  GenSlicer_default,
  GenBrown_default,
  GenEuclid_default,
  GenPwm_default,
  GenAd_default,
  GenOnepole_lp1,
  GenOnepole_hp1,
  GenSqr_default,
  GenHold_default,
  GenLfosaw_default,
  GenCompressor_default,
  GenEmit_default,
  GenFractal_default,
  GenLforamp_default,
  GenTri_default,
  GenPitchshift_default,
  GenZerox_default,
  GenLimiter_default,
  GenAt_default,
  GenDiodeladder_default,
  GenRamp_default,
  GenSmooth_default,
  GenLfotri_default,
  GenAdsr_default,
  GenAnalyser_default,
  GenBiquad_lp,
  GenBiquad_hp,
  GenBiquad_bp,
  GenBiquad_bs,
  GenBiquad_ap,
  GenEnvfollow_default,
  GenSah_default,
  GenVelvet_default,
  GenFdn_default,
  GenPink_default,
  GenDattorro_default,
  GenRandom_default,
  GenSlew_default,
  GenInc_default,
  GenBiquadshelf_ls,
  GenBiquadshelf_hs,
  GenBiquadshelf_peak,
  GenSampler_default,
  GenMoog_lpm,
  GenMoog_hpm,
  GenSvf_lps,
  GenSvf_hps,
  GenSvf_bps,
  GenSvf_bss,
  GenSvf_peaks,
  GenSvf_aps,
}

export type ParamMode = 'scalar' | 'audio'
export type GenSpec = {
  id: number
  genName: string
  variantName: string
  className: string
  paramNames: string[]
  paramModes: ParamMode[]
  emitNames: string[]
  usesInput: boolean
}

export const genSpecs: GenSpec[] = [
  { id: 0, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 1, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 2, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 3, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 4, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 5, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 6, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 7, genName: 'Phasor', variantName: 'default', className: 'Phasor_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 8, genName: 'Every', variantName: 'default', className: 'Every_default_bars_scalar', paramNames: ['bars'], paramModes: ['scalar'], emitNames: ['fired'], usesInput: false },
  { id: 9, genName: 'Every', variantName: 'default', className: 'Every_default_bars_audio', paramNames: ['bars'], paramModes: ['audio'], emitNames: ['fired'], usesInput: false },
  { id: 10, genName: 'White', variantName: 'default', className: 'White_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 11, genName: 'White', variantName: 'default', className: 'White_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 12, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 13, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 14, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 15, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 16, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 17, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 18, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 19, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 20, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 21, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 22, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 23, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 24, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 25, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 26, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 27, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 28, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 29, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 30, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 31, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 32, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 33, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 34, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 35, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 36, genName: 'Dc', variantName: 'default', className: 'Dc_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 37, genName: 'Gauss', variantName: 'default', className: 'Gauss_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 38, genName: 'Gauss', variantName: 'default', className: 'Gauss_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 39, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 40, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 41, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 42, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 43, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 44, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 45, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 46, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 47, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_scalar', paramNames: ['amount'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 48, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_audio', paramNames: ['amount'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 49, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_scalar_stereo', paramNames: ['amount'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 50, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_audio_stereo', paramNames: ['amount'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 51, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_scalar', paramNames: ['room', 'damping'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 52, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_audio', paramNames: ['room', 'damping'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 53, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_scalar', paramNames: ['room', 'damping'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 54, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_audio', paramNames: ['room', 'damping'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 55, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_scalar_stereo', paramNames: ['room', 'damping'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 56, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_audio_stereo', paramNames: ['room', 'damping'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 57, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_scalar_stereo', paramNames: ['room', 'damping'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 58, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_audio_stereo', paramNames: ['room', 'damping'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 59, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 60, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 61, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 62, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 63, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 64, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 65, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 66, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 67, genName: 'TestOversample', variantName: 'default', className: 'TestOversample_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 68, genName: 'TestOversample', variantName: 'default', className: 'TestOversample_default__stereo', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 69, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 70, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 71, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 72, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 73, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 74, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 75, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 76, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 77, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 78, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 79, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 80, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 81, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 82, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 83, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 84, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 85, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 86, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 87, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 88, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 89, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 90, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 91, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 92, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 93, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 94, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 95, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 96, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 97, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 98, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 99, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 100, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 101, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 102, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 103, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 104, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 105, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 106, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 107, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 108, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 109, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 110, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 111, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 112, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 113, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 114, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 115, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 116, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 117, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 118, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 119, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 120, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 121, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 122, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 123, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 124, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 125, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 126, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 127, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 128, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 129, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 130, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 131, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 132, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 133, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 134, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 135, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 136, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 137, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 138, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 139, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 140, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 141, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 142, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 143, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 144, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 145, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 146, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 147, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 148, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 149, genName: 'Brown', variantName: 'default', className: 'Brown_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 150, genName: 'Brown', variantName: 'default', className: 'Brown_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 151, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 152, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 153, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 154, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 155, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 156, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 157, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 158, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 159, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 160, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 161, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 162, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 163, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 164, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 165, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 166, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 167, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 168, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 169, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 170, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 171, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 172, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 173, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 174, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 175, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 176, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 177, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 178, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 179, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 180, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 181, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 182, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 183, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 184, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 185, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 186, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 187, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 188, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 189, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 190, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 191, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 192, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 193, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 194, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 195, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 196, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 197, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 198, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 199, genName: 'Onepole', variantName: 'lp1', className: 'Onepole_lp1_cutoff_scalar', paramNames: ['cutoff'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 200, genName: 'Onepole', variantName: 'lp1', className: 'Onepole_lp1_cutoff_audio', paramNames: ['cutoff'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 201, genName: 'Onepole', variantName: 'hp1', className: 'Onepole_hp1_cutoff_scalar', paramNames: ['cutoff'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 202, genName: 'Onepole', variantName: 'hp1', className: 'Onepole_hp1_cutoff_audio', paramNames: ['cutoff'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 203, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 204, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 205, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 206, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 207, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 208, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 209, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 210, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 211, genName: 'Hold', variantName: 'default', className: 'Hold_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 212, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 213, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 214, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 215, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 216, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 217, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 218, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 219, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 220, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 221, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 222, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 223, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 224, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 225, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 226, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 227, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 228, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 229, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 230, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 231, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 232, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 233, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 234, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 235, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 236, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 237, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 238, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 239, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 240, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 241, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 242, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 243, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 244, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 245, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 246, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 247, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 248, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 249, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 250, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 251, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 252, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 253, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 254, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 255, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 256, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 257, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 258, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 259, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 260, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 261, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 262, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 263, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 264, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 265, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 266, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 267, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 268, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 269, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 270, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 271, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 272, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 273, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 274, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 275, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 276, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 277, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 278, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 279, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 280, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 281, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 282, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 283, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 284, genName: 'Emit', variantName: 'default', className: 'Emit_default_value_scalar', paramNames: ['value'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 285, genName: 'Emit', variantName: 'default', className: 'Emit_default_value_audio', paramNames: ['value'], paramModes: ['audio'], emitNames: [], usesInput: false },
  { id: 286, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 287, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 288, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 289, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 290, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 291, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 292, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 293, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 294, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 295, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 296, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 297, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 298, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 299, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 300, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 301, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 302, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 303, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 304, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 305, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 306, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 307, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 308, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 309, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 310, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 311, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 312, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 313, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 314, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 315, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 316, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 317, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 318, genName: 'Pitchshift', variantName: 'default', className: 'Pitchshift_default_ratio_scalar', paramNames: ['ratio'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 319, genName: 'Pitchshift', variantName: 'default', className: 'Pitchshift_default_ratio_audio', paramNames: ['ratio'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 320, genName: 'Zerox', variantName: 'default', className: 'Zerox_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 321, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_scalar_release_scalar', paramNames: ['threshold', 'release'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 322, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_scalar_release_audio', paramNames: ['threshold', 'release'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 323, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_audio_release_scalar', paramNames: ['threshold', 'release'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 324, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_audio_release_audio', paramNames: ['threshold', 'release'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 325, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_scalar_prob_scalar_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 326, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_scalar_prob_audio_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 327, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_audio_prob_scalar_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 328, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_audio_prob_audio_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 329, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_scalar_prob_scalar_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 330, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_scalar_prob_audio_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 331, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_audio_prob_scalar_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 332, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_audio_prob_audio_seed_scalar', paramNames: ['bar', 'every', 'prob', 'seed'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 333, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 334, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 335, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 336, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 337, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 338, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 339, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 340, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 341, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 342, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 343, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 344, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 345, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 346, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 347, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 348, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 349, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 350, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 351, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 352, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 353, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 354, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 355, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 356, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 357, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 358, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 359, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 360, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 361, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 362, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 363, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 364, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 365, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 366, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 367, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 368, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 369, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 370, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 371, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 372, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 373, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 374, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 375, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 376, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 377, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 378, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 379, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 380, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 381, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 382, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 383, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 384, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 385, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 386, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 387, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 388, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 389, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 390, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 391, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 392, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 393, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 394, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 395, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 396, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 397, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 398, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 399, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 400, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 401, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 402, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 403, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 404, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 405, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 406, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 407, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 408, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 409, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 410, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 411, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 412, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 413, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 414, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 415, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 416, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 417, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 418, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 419, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 420, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 421, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 422, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 423, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 424, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 425, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 426, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 427, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 428, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 429, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 430, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 431, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 432, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 433, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 434, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 435, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 436, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 437, genName: 'Analyser', variantName: 'default', className: 'Analyser_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 438, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 439, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 440, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 441, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 442, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 443, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 444, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 445, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 446, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 447, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 448, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 449, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 450, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 451, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 452, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 453, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 454, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 455, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 456, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 457, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 458, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_scalar_release_scalar', paramNames: ['attack', 'release'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 459, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_scalar_release_audio', paramNames: ['attack', 'release'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 460, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_audio_release_scalar', paramNames: ['attack', 'release'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 461, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_audio_release_audio', paramNames: ['attack', 'release'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 462, genName: 'Sah', variantName: 'default', className: 'Sah_default_trig_scalar', paramNames: ['trig'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 463, genName: 'Sah', variantName: 'default', className: 'Sah_default_trig_audio', paramNames: ['trig'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 464, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 465, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 466, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 467, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 468, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 469, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 470, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 471, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 472, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 473, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 474, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 475, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 476, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 477, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 478, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 479, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 480, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 481, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 482, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 483, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 484, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 485, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 486, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 487, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 488, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 489, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 490, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 491, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 492, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 493, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 494, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 495, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 496, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 497, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 498, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 499, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 500, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 501, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 502, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 503, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 504, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 505, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 506, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 507, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 508, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 509, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 510, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 511, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 512, genName: 'Pink', variantName: 'default', className: 'Pink_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 513, genName: 'Pink', variantName: 'default', className: 'Pink_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 514, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 515, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 516, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 517, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 518, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 519, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 520, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 521, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 522, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 523, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 524, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 525, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 526, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 527, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 528, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 529, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 530, genName: 'Random', variantName: 'default', className: 'Random_default_seed_scalar', paramNames: ['seed'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 531, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_scalar_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 532, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_scalar_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 533, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_audio_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 534, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_audio_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 535, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_scalar_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 536, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_scalar_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 537, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_audio_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 538, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_audio_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 539, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 540, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 541, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 542, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 543, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 544, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 545, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 546, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 547, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 548, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 549, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 550, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 551, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 552, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 553, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 554, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 555, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 556, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 557, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 558, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 559, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 560, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 561, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 562, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 563, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 564, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 565, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 566, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 567, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 568, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 569, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 570, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 571, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 572, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 573, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 574, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 575, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 576, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 577, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 578, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 579, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 580, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 581, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 582, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 583, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 584, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 585, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 586, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 587, genName: 'Moog', variantName: 'lpm', className: 'Moog_lpm_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 588, genName: 'Moog', variantName: 'lpm', className: 'Moog_lpm_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 589, genName: 'Moog', variantName: 'hpm', className: 'Moog_hpm_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 590, genName: 'Moog', variantName: 'hpm', className: 'Moog_hpm_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 591, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 592, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 593, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 594, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 595, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 596, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 597, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 598, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 599, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 600, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 601, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 602, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 603, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 604, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 605, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 606, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 607, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 608, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 609, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 610, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 611, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 612, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 613, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 614, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 615, genName: 'Table', variantName: 'lookup', className: 'Table_lookup', paramNames: ['len', 'index'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 616, genName: 'Tram', variantName: 'default', className: 'TramKernel', paramNames: [], paramModes: [], emitNames: ['fired'], usesInput: false },
  { id: 617, genName: 'Mini', variantName: 'default', className: 'MiniKernel', paramNames: ['bars'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 618, genName: 'Timeline', variantName: 'default', className: 'TimelineKernel', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 619, genName: 'Out', variantName: 'default', className: 'Out', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 620, genName: 'Mix', variantName: 'default', className: 'Mix', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 621, genName: 'ArrayGet', variantName: 'default', className: 'ArrayGet', paramNames: ['index'], paramModes: ['scalar'], emitNames: ['index'], usesInput: false },
  { id: 622, genName: 'Solo', variantName: 'default', className: 'Solo', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
]

export type HistoryParamAccessor = {
  [index: number]: number
  readonly latest: number
  at(index: number): number
}

export type HistorySampleCounts = Int32Array & {
  readonly latest: number
}

export type HistorySource = {
  line: number
  column: number
}

export type PhasorHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type PhasorHistoryEmit = {
  phase: HistoryParamAccessor
}

export type PhasorHistory = {
  id: number
  genName: 'Phasor'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: PhasorHistoryParams
  emit: PhasorHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type EveryHistoryParams = {
  bars: HistoryParamAccessor
}

export type EveryHistoryEmit = {
  fired: HistoryParamAccessor
}

export type EveryHistory = {
  id: number
  genName: 'Every'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: EveryHistoryParams
  emit: EveryHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type WhiteHistoryParams = {
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type WhiteHistoryEmit = {

}

export type WhiteHistory = {
  id: number
  genName: 'White'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: WhiteHistoryParams
  emit: WhiteHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LfosqrHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LfosqrHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LfosqrHistory = {
  id: number
  genName: 'Lfosqr'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LfosqrHistoryParams
  emit: LfosqrHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LfosahHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LfosahHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LfosahHistory = {
  id: number
  genName: 'Lfosah'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LfosahHistoryParams
  emit: LfosahHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type DcHistoryParams = {

}

export type DcHistoryEmit = {

}

export type DcHistory = {
  id: number
  genName: 'Dc'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: DcHistoryParams
  emit: DcHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type GaussHistoryParams = {
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type GaussHistoryEmit = {

}

export type GaussHistory = {
  id: number
  genName: 'Gauss'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: GaussHistoryParams
  emit: GaussHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type ImpulseHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type ImpulseHistoryEmit = {

}

export type ImpulseHistory = {
  id: number
  genName: 'Impulse'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: ImpulseHistoryParams
  emit: ImpulseHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TestGainHistoryParams = {
  amount: HistoryParamAccessor
}

export type TestGainHistoryEmit = {

}

export type TestGainHistory = {
  id: number
  genName: 'TestGain'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: TestGainHistoryParams
  emit: TestGainHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type FreeverbHistoryParams = {
  room: HistoryParamAccessor
  damping: HistoryParamAccessor
}

export type FreeverbHistoryEmit = {

}

export type FreeverbHistory = {
  id: number
  genName: 'Freeverb'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: FreeverbHistoryParams
  emit: FreeverbHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SawHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SawHistoryEmit = {

}

export type SawHistory = {
  id: number
  genName: 'Saw'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SawHistoryParams
  emit: SawHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TestOversampleHistoryParams = {

}

export type TestOversampleHistoryEmit = {

}

export type TestOversampleHistory = {
  id: number
  genName: 'TestOversample'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: TestOversampleHistoryParams
  emit: TestOversampleHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SineHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SineHistoryEmit = {

}

export type SineHistory = {
  id: number
  genName: 'Sine'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SineHistoryParams
  emit: SineHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LfosineHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LfosineHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LfosineHistory = {
  id: number
  genName: 'Lfosine'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LfosineHistoryParams
  emit: LfosineHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SlicerHistoryParams = {
  sample: HistoryParamAccessor
  speed: HistoryParamAccessor
  offset: HistoryParamAccessor
  slice: HistoryParamAccessor
  threshold: HistoryParamAccessor
  repeat: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SlicerHistoryEmit = {
  slicePosition: HistoryParamAccessor
  slicePlaying: HistoryParamAccessor
  currentSlice: HistoryParamAccessor
}

export type SlicerHistory = {
  id: number
  genName: 'Slicer'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SlicerHistoryParams
  emit: SlicerHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type BrownHistoryParams = {
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type BrownHistoryEmit = {

}

export type BrownHistory = {
  id: number
  genName: 'Brown'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: BrownHistoryParams
  emit: BrownHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type EuclidHistoryParams = {
  pulses: HistoryParamAccessor
  steps: HistoryParamAccessor
  offset: HistoryParamAccessor
  bar: HistoryParamAccessor
}

export type EuclidHistoryEmit = {

}

export type EuclidHistory = {
  id: number
  genName: 'Euclid'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: EuclidHistoryParams
  emit: EuclidHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type PwmHistoryParams = {
  hz: HistoryParamAccessor
  width: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type PwmHistoryEmit = {

}

export type PwmHistory = {
  id: number
  genName: 'Pwm'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: PwmHistoryParams
  emit: PwmHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type AdHistoryParams = {
  attack: HistoryParamAccessor
  decay: HistoryParamAccessor
  exponent: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type AdHistoryEmit = {
  stage: HistoryParamAccessor
  env: HistoryParamAccessor
}

export type AdHistory = {
  id: number
  genName: 'Ad'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: AdHistoryParams
  emit: AdHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type OnepoleHistoryParams = {
  cutoff: HistoryParamAccessor
}

export type OnepoleHistoryEmit = {

}

export type OnepoleHistory = {
  id: number
  genName: 'Onepole'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: OnepoleHistoryParams
  emit: OnepoleHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SqrHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SqrHistoryEmit = {

}

export type SqrHistory = {
  id: number
  genName: 'Sqr'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SqrHistoryParams
  emit: SqrHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type HoldHistoryParams = {

}

export type HoldHistoryEmit = {

}

export type HoldHistory = {
  id: number
  genName: 'Hold'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: HoldHistoryParams
  emit: HoldHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LfosawHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LfosawHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LfosawHistory = {
  id: number
  genName: 'Lfosaw'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LfosawHistoryParams
  emit: LfosawHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type CompressorHistoryParams = {
  attack: HistoryParamAccessor
  release: HistoryParamAccessor
  threshold: HistoryParamAccessor
  ratio: HistoryParamAccessor
  knee: HistoryParamAccessor
  key: HistoryParamAccessor
}

export type CompressorHistoryEmit = {
  inputLevel: HistoryParamAccessor
  gainReduction: HistoryParamAccessor
}

export type CompressorHistory = {
  id: number
  genName: 'Compressor'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: CompressorHistoryParams
  emit: CompressorHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type EmitHistoryParams = {
  value: HistoryParamAccessor
}

export type EmitHistoryEmit = {

}

export type EmitHistory = {
  id: number
  genName: 'Emit'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: EmitHistoryParams
  emit: EmitHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type FractalHistoryParams = {
  seed: HistoryParamAccessor
  rate: HistoryParamAccessor
  octaves: HistoryParamAccessor
  gain: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type FractalHistoryEmit = {
  phase: HistoryParamAccessor
}

export type FractalHistory = {
  id: number
  genName: 'Fractal'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: FractalHistoryParams
  emit: FractalHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LforampHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LforampHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LforampHistory = {
  id: number
  genName: 'Lforamp'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LforampHistoryParams
  emit: LforampHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TriHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type TriHistoryEmit = {

}

export type TriHistory = {
  id: number
  genName: 'Tri'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: TriHistoryParams
  emit: TriHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type PitchshiftHistoryParams = {
  ratio: HistoryParamAccessor
}

export type PitchshiftHistoryEmit = {

}

export type PitchshiftHistory = {
  id: number
  genName: 'Pitchshift'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: PitchshiftHistoryParams
  emit: PitchshiftHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type ZeroxHistoryParams = {

}

export type ZeroxHistoryEmit = {

}

export type ZeroxHistory = {
  id: number
  genName: 'Zerox'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: ZeroxHistoryParams
  emit: ZeroxHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LimiterHistoryParams = {
  threshold: HistoryParamAccessor
  release: HistoryParamAccessor
}

export type LimiterHistoryEmit = {

}

export type LimiterHistory = {
  id: number
  genName: 'Limiter'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LimiterHistoryParams
  emit: LimiterHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type AtHistoryParams = {
  bar: HistoryParamAccessor
  every: HistoryParamAccessor
  prob: HistoryParamAccessor
  seed: HistoryParamAccessor
}

export type AtHistoryEmit = {
  fired: HistoryParamAccessor
}

export type AtHistory = {
  id: number
  genName: 'At'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: AtHistoryParams
  emit: AtHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type DiodeladderHistoryParams = {
  cutoff: HistoryParamAccessor
  q: HistoryParamAccessor
  k: HistoryParamAccessor
  sat: HistoryParamAccessor
}

export type DiodeladderHistoryEmit = {

}

export type DiodeladderHistory = {
  id: number
  genName: 'Diodeladder'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: DiodeladderHistoryParams
  emit: DiodeladderHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type RampHistoryParams = {
  hz: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type RampHistoryEmit = {

}

export type RampHistory = {
  id: number
  genName: 'Ramp'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: RampHistoryParams
  emit: RampHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SmoothHistoryParams = {
  seed: HistoryParamAccessor
  rate: HistoryParamAccessor
  curve: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SmoothHistoryEmit = {
  phase: HistoryParamAccessor
}

export type SmoothHistory = {
  id: number
  genName: 'Smooth'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SmoothHistoryParams
  emit: SmoothHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type LfotriHistoryParams = {
  bar: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type LfotriHistoryEmit = {
  phase: HistoryParamAccessor
}

export type LfotriHistory = {
  id: number
  genName: 'Lfotri'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: LfotriHistoryParams
  emit: LfotriHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type AdsrHistoryParams = {
  attack: HistoryParamAccessor
  decay: HistoryParamAccessor
  sustain: HistoryParamAccessor
  release: HistoryParamAccessor
  exponent: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type AdsrHistoryEmit = {
  stage: HistoryParamAccessor
  env: HistoryParamAccessor
}

export type AdsrHistory = {
  id: number
  genName: 'Adsr'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: AdsrHistoryParams
  emit: AdsrHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type AnalyserHistoryParams = {

}

export type AnalyserHistoryEmit = {

}

export type AnalyserHistory = {
  id: number
  genName: 'Analyser'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: AnalyserHistoryParams
  emit: AnalyserHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type BiquadHistoryParams = {
  cutoff: HistoryParamAccessor
  q: HistoryParamAccessor
}

export type BiquadHistoryEmit = {

}

export type BiquadHistory = {
  id: number
  genName: 'Biquad'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: BiquadHistoryParams
  emit: BiquadHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type EnvfollowHistoryParams = {
  attack: HistoryParamAccessor
  release: HistoryParamAccessor
}

export type EnvfollowHistoryEmit = {

}

export type EnvfollowHistory = {
  id: number
  genName: 'Envfollow'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: EnvfollowHistoryParams
  emit: EnvfollowHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SahHistoryParams = {
  trig: HistoryParamAccessor
}

export type SahHistoryEmit = {

}

export type SahHistory = {
  id: number
  genName: 'Sah'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SahHistoryParams
  emit: SahHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type VelvetHistoryParams = {
  room: HistoryParamAccessor
  damping: HistoryParamAccessor
  decay: HistoryParamAccessor
}

export type VelvetHistoryEmit = {

}

export type VelvetHistory = {
  id: number
  genName: 'Velvet'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: VelvetHistoryParams
  emit: VelvetHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type FdnHistoryParams = {
  room: HistoryParamAccessor
  damping: HistoryParamAccessor
  decay: HistoryParamAccessor
  depth: HistoryParamAccessor
}

export type FdnHistoryEmit = {

}

export type FdnHistory = {
  id: number
  genName: 'Fdn'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: FdnHistoryParams
  emit: FdnHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type PinkHistoryParams = {
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type PinkHistoryEmit = {

}

export type PinkHistory = {
  id: number
  genName: 'Pink'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: PinkHistoryParams
  emit: PinkHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type DattorroHistoryParams = {
  room: HistoryParamAccessor
  damping: HistoryParamAccessor
  bandwidth: HistoryParamAccessor
  indiff1: HistoryParamAccessor
  indiff2: HistoryParamAccessor
  decdiff1: HistoryParamAccessor
  decdiff2: HistoryParamAccessor
  excrate: HistoryParamAccessor
  excdepth: HistoryParamAccessor
  predelay: HistoryParamAccessor
}

export type DattorroHistoryEmit = {

}

export type DattorroHistory = {
  id: number
  genName: 'Dattorro'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: DattorroHistoryParams
  emit: DattorroHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type RandomHistoryParams = {
  seed: HistoryParamAccessor
}

export type RandomHistoryEmit = {

}

export type RandomHistory = {
  id: number
  genName: 'Random'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: RandomHistoryParams
  emit: RandomHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SlewHistoryParams = {
  up: HistoryParamAccessor
  down: HistoryParamAccessor
  exp: HistoryParamAccessor
}

export type SlewHistoryEmit = {

}

export type SlewHistory = {
  id: number
  genName: 'Slew'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SlewHistoryParams
  emit: SlewHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type IncHistoryParams = {
  hz: HistoryParamAccessor
  ceil: HistoryParamAccessor
  offset: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type IncHistoryEmit = {
  phase: HistoryParamAccessor
}

export type IncHistory = {
  id: number
  genName: 'Inc'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: IncHistoryParams
  emit: IncHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type BiquadshelfHistoryParams = {
  cutoff: HistoryParamAccessor
  q: HistoryParamAccessor
  gain: HistoryParamAccessor
}

export type BiquadshelfHistoryEmit = {

}

export type BiquadshelfHistory = {
  id: number
  genName: 'Biquadshelf'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: BiquadshelfHistoryParams
  emit: BiquadshelfHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SamplerHistoryParams = {
  sample: HistoryParamAccessor
  speed: HistoryParamAccessor
  offset: HistoryParamAccessor
  repeat: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SamplerHistoryEmit = {
  position: HistoryParamAccessor
  playing: HistoryParamAccessor
}

export type SamplerHistory = {
  id: number
  genName: 'Sampler'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SamplerHistoryParams
  emit: SamplerHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type MoogHistoryParams = {
  cutoff: HistoryParamAccessor
  q: HistoryParamAccessor
}

export type MoogHistoryEmit = {

}

export type MoogHistory = {
  id: number
  genName: 'Moog'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: MoogHistoryParams
  emit: MoogHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SvfHistoryParams = {
  cutoff: HistoryParamAccessor
  q: HistoryParamAccessor
}

export type SvfHistoryEmit = {

}

export type SvfHistory = {
  id: number
  genName: 'Svf'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SvfHistoryParams
  emit: SvfHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TramHistoryParams = {

}

export type TramHistoryEmit = {
  fired: HistoryParamAccessor
}

export type TramHistory = {
  id: number
  genName: 'Tram'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: TramHistoryParams
  emit: TramHistoryEmit
  beatMapping: Array<{ linearIndex: number; startCol: number; endCol: number }>
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type MiniHistoryParams = {
  bars: HistoryParamAccessor
}

export type MiniHistoryEmit = {

}

export type MiniHistory = {
  id: number
  genName: 'Mini'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: MiniHistoryParams
  emit: MiniHistoryEmit
  sequence: string
  compileResult: MiniCompileResult
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TimelineHistoryParams = {

}

export type TimelineHistoryEmit = {

}

export type TimelineHistory = {
  id: number
  genName: 'Timeline'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: TimelineHistoryParams
  emit: TimelineHistoryEmit
  sequence: string
  segmentTokens: Array<{ fromTokenStart: number; fromTokenLength: number; toTokenStart: number; toTokenLength: number }>
  colorIndex?: number
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type OutHistoryParams = {

}

export type OutHistoryEmit = {

}

export type OutHistory = {
  id: number
  genName: 'Out'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: OutHistoryParams
  emit: OutHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type SoloHistoryParams = {

}

export type SoloHistoryEmit = {

}

export type SoloHistory = {
  id: number
  genName: 'Solo'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SoloHistoryParams
  emit: SoloHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type MixHistoryParams = {

}

export type MixHistoryEmit = {

}

export type MixHistory = {
  id: number
  genName: 'Mix'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: MixHistoryParams
  emit: MixHistoryEmit
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type ArrayGetHistoryParams = {
  index: HistoryParamAccessor
}

export type ArrayGetHistoryEmit = {
  index: HistoryParamAccessor
}

export type ArrayGetHistory = {
  id: number
  genName: 'ArrayGet'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: ArrayGetHistoryParams
  emit: ArrayGetHistoryEmit
  elementMapping?: Array<{ index: number; startCol: number; endCol: number }>
  size: number
  mask: number
  writeIndex: number
  values: Float32Array
  sampleCounts: HistorySampleCounts
}

export type TypedHistory = AdHistory | AdsrHistory | AnalyserHistory | ArrayGetHistory | AtHistory | BiquadHistory | BiquadshelfHistory | BrownHistory | CompressorHistory | DattorroHistory | DcHistory | DiodeladderHistory | EmitHistory | EnvfollowHistory | EuclidHistory | EveryHistory | FdnHistory | FractalHistory | FreeverbHistory | GaussHistory | HoldHistory | ImpulseHistory | IncHistory | LforampHistory | LfosahHistory | LfosawHistory | LfosineHistory | LfosqrHistory | LfotriHistory | LimiterHistory | MiniHistory | MixHistory | MoogHistory | OnepoleHistory | OutHistory | PhasorHistory | PinkHistory | PitchshiftHistory | PwmHistory | RampHistory | RandomHistory | SahHistory | SamplerHistory | SawHistory | SineHistory | SlewHistory | SlicerHistory | SmoothHistory | SoloHistory | SqrHistory | SvfHistory | TestGainHistory | TestOversampleHistory | TimelineHistory | TramHistory | TriHistory | VelvetHistory | WhiteHistory | ZeroxHistory