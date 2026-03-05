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
  Append,
  Write,
  Advance,
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
  GenMarkov_default,
  GenPwm_default,
  GenAd_default,
  GenSustain_default,
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
  { id: 8, genName: 'Every', variantName: 'default', className: 'Every_default_bars_scalar_offset_scalar_length_scalar', paramNames: ['bars', 'offset', 'length'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 9, genName: 'Every', variantName: 'default', className: 'Every_default_bars_scalar_offset_scalar_length_audio', paramNames: ['bars', 'offset', 'length'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['fired'], usesInput: false },
  { id: 10, genName: 'Every', variantName: 'default', className: 'Every_default_bars_scalar_offset_audio_length_scalar', paramNames: ['bars', 'offset', 'length'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 11, genName: 'Every', variantName: 'default', className: 'Every_default_bars_scalar_offset_audio_length_audio', paramNames: ['bars', 'offset', 'length'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['fired'], usesInput: false },
  { id: 12, genName: 'Every', variantName: 'default', className: 'Every_default_bars_audio_offset_scalar_length_scalar', paramNames: ['bars', 'offset', 'length'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 13, genName: 'Every', variantName: 'default', className: 'Every_default_bars_audio_offset_scalar_length_audio', paramNames: ['bars', 'offset', 'length'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['fired'], usesInput: false },
  { id: 14, genName: 'Every', variantName: 'default', className: 'Every_default_bars_audio_offset_audio_length_scalar', paramNames: ['bars', 'offset', 'length'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 15, genName: 'Every', variantName: 'default', className: 'Every_default_bars_audio_offset_audio_length_audio', paramNames: ['bars', 'offset', 'length'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['fired'], usesInput: false },
  { id: 16, genName: 'White', variantName: 'default', className: 'White_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 17, genName: 'White', variantName: 'default', className: 'White_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 18, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 19, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 20, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 21, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 22, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 23, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 24, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 25, genName: 'Lfosqr', variantName: 'default', className: 'Lfosqr_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 26, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 27, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 28, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 29, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_scalar_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 30, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 31, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 32, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 33, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_scalar_offset_audio_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 34, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 35, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 36, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 37, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_scalar_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 38, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 39, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_scalar_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 40, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_audio_trig_scalar', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 41, genName: 'Lfosah', variantName: 'default', className: 'Lfosah_default_bar_audio_offset_audio_seed_audio_trig_audio', paramNames: ['bar', 'offset', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 42, genName: 'Dc', variantName: 'default', className: 'Dc_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 43, genName: 'Gauss', variantName: 'default', className: 'Gauss_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 44, genName: 'Gauss', variantName: 'default', className: 'Gauss_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 45, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 46, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 47, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 48, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 49, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 50, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 51, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 52, genName: 'Impulse', variantName: 'default', className: 'Impulse_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 53, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_scalar', paramNames: ['amount'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 54, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_audio', paramNames: ['amount'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 55, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_scalar_stereo', paramNames: ['amount'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 56, genName: 'TestGain', variantName: 'default', className: 'TestGain_default_amount_audio_stereo', paramNames: ['amount'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 57, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_scalar', paramNames: ['room', 'damping'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 58, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_audio', paramNames: ['room', 'damping'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 59, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_scalar', paramNames: ['room', 'damping'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 60, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_audio', paramNames: ['room', 'damping'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 61, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_scalar_stereo', paramNames: ['room', 'damping'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 62, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_scalar_damping_audio_stereo', paramNames: ['room', 'damping'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 63, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_scalar_stereo', paramNames: ['room', 'damping'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 64, genName: 'Freeverb', variantName: 'default', className: 'Freeverb_default_room_audio_damping_audio_stereo', paramNames: ['room', 'damping'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 65, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 66, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 67, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 68, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 69, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 70, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 71, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 72, genName: 'Saw', variantName: 'default', className: 'Saw_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 73, genName: 'TestOversample', variantName: 'default', className: 'TestOversample_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 74, genName: 'TestOversample', variantName: 'default', className: 'TestOversample_default__stereo', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 75, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 76, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 77, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 78, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 79, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 80, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 81, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 82, genName: 'Sine', variantName: 'default', className: 'Sine_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 83, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 84, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 85, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 86, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 87, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 88, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 89, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 90, genName: 'Lfosine', variantName: 'default', className: 'Lfosine_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 91, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 92, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 93, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 94, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 95, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 96, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 97, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 98, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 99, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 100, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 101, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 102, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 103, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 104, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 105, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 106, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 107, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 108, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 109, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 110, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 111, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 112, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 113, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 114, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 115, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 116, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 117, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 118, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 119, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 120, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 121, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 122, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 123, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 124, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 125, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 126, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 127, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 128, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 129, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 130, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 131, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 132, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 133, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 134, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 135, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 136, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 137, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 138, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_scalar_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 139, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 140, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 141, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 142, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 143, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 144, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 145, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 146, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_scalar_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 147, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 148, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 149, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 150, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_scalar_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 151, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 152, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 153, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 154, genName: 'Slicer', variantName: 'default', className: 'Slicer_default_sample_scalar_speed_audio_offset_audio_slice_audio_threshold_scalar_repeat_audio_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'slice', 'threshold', 'repeat', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['slicePosition', 'slicePlaying', 'currentSlice'], usesInput: false },
  { id: 155, genName: 'Brown', variantName: 'default', className: 'Brown_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 156, genName: 'Brown', variantName: 'default', className: 'Brown_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 157, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 158, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 159, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 160, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_scalar_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 161, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 162, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 163, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 164, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_scalar_steps_audio_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 165, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 166, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 167, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 168, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_scalar_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 169, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 170, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_scalar_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 171, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_audio_bar_scalar', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 172, genName: 'Euclid', variantName: 'default', className: 'Euclid_default_pulses_audio_steps_audio_offset_audio_bar_audio', paramNames: ['pulses', 'steps', 'offset', 'bar'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 173, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 174, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 175, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 176, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 177, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 178, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 179, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 180, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 181, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 182, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 183, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 184, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 185, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 186, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 187, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 188, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 189, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 190, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 191, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 192, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 193, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 194, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 195, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 196, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 197, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 198, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 199, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 200, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 201, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 202, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 203, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 204, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_scalar_stay_audio_step_audio_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 205, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 206, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 207, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 208, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 209, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 210, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 211, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 212, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_scalar_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 213, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 214, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 215, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 216, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 217, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 218, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 219, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 220, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_scalar_step_audio_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 221, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 222, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 223, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 224, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 225, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 226, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 227, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 228, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_scalar_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 229, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 230, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 231, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 232, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_scalar_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 233, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 234, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_scalar_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 235, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_scalar', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 236, genName: 'Markov', variantName: 'default', className: 'Markov_default_states_audio_stay_audio_step_audio_bias_audio_seed_audio_trig_audio', paramNames: ['states', 'stay', 'step', 'bias', 'seed', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['state', 'fired'], usesInput: false },
  { id: 237, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 238, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 239, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 240, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_scalar_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 241, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 242, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 243, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 244, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_scalar_width_audio_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 245, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 246, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 247, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 248, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_scalar_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 249, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 250, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_scalar_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 251, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_audio_trig_scalar', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 252, genName: 'Pwm', variantName: 'default', className: 'Pwm_default_hz_audio_width_audio_offset_audio_trig_audio', paramNames: ['hz', 'width', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 253, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 254, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 255, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 256, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 257, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 258, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 259, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 260, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_scalar_decay_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 261, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 262, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 263, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 264, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 265, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 266, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 267, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 268, genName: 'Ad', variantName: 'default', className: 'Ad_default_attack_audio_decay_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 269, genName: 'Sustain', variantName: 'default', className: 'Sustain_default_seconds_scalar_trig_scalar', paramNames: ['seconds', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 270, genName: 'Sustain', variantName: 'default', className: 'Sustain_default_seconds_scalar_trig_audio', paramNames: ['seconds', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 271, genName: 'Sustain', variantName: 'default', className: 'Sustain_default_seconds_audio_trig_scalar', paramNames: ['seconds', 'trig'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 272, genName: 'Sustain', variantName: 'default', className: 'Sustain_default_seconds_audio_trig_audio', paramNames: ['seconds', 'trig'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: false },
  { id: 273, genName: 'Onepole', variantName: 'lp1', className: 'Onepole_lp1_cutoff_scalar', paramNames: ['cutoff'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 274, genName: 'Onepole', variantName: 'lp1', className: 'Onepole_lp1_cutoff_audio', paramNames: ['cutoff'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 275, genName: 'Onepole', variantName: 'hp1', className: 'Onepole_hp1_cutoff_scalar', paramNames: ['cutoff'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 276, genName: 'Onepole', variantName: 'hp1', className: 'Onepole_hp1_cutoff_audio', paramNames: ['cutoff'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 277, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 278, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 279, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 280, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 281, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 282, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 283, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 284, genName: 'Sqr', variantName: 'default', className: 'Sqr_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 285, genName: 'Hold', variantName: 'default', className: 'Hold_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 286, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 287, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 288, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 289, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 290, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 291, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 292, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 293, genName: 'Lfosaw', variantName: 'default', className: 'Lfosaw_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 294, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 295, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 296, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 297, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 298, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 299, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 300, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 301, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 302, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 303, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 304, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 305, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 306, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 307, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 308, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 309, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 310, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 311, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 312, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 313, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 314, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 315, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 316, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 317, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 318, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 319, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 320, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 321, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 322, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 323, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 324, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 325, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_scalar_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 326, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 327, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 328, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 329, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 330, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 331, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 332, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 333, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 334, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 335, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 336, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 337, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 338, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 339, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 340, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 341, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_scalar_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 342, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 343, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 344, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 345, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 346, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 347, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 348, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 349, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_scalar_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 350, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 351, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 352, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 353, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_scalar_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 354, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 355, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_scalar_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 356, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_scalar', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 357, genName: 'Compressor', variantName: 'default', className: 'Compressor_default_attack_audio_release_audio_threshold_audio_ratio_audio_knee_audio_key_audio', paramNames: ['attack', 'release', 'threshold', 'ratio', 'knee', 'key'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['inputLevel', 'gainReduction'], usesInput: true },
  { id: 358, genName: 'Emit', variantName: 'default', className: 'Emit_default_value_scalar', paramNames: ['value'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 359, genName: 'Emit', variantName: 'default', className: 'Emit_default_value_audio', paramNames: ['value'], paramModes: ['audio'], emitNames: [], usesInput: false },
  { id: 360, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 361, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 362, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 363, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_scalar_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 364, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 365, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 366, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 367, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_scalar_octaves_audio_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 368, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 369, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 370, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 371, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_scalar_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 372, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 373, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_scalar_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 374, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_scalar', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 375, genName: 'Fractal', variantName: 'default', className: 'Fractal_default_seed_scalar_rate_audio_octaves_audio_gain_audio_trig_audio', paramNames: ['seed', 'rate', 'octaves', 'gain', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 376, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 377, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 378, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 379, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 380, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 381, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 382, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 383, genName: 'Lforamp', variantName: 'default', className: 'Lforamp_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 384, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 385, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 386, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 387, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 388, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 389, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 390, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 391, genName: 'Tri', variantName: 'default', className: 'Tri_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 392, genName: 'Pitchshift', variantName: 'default', className: 'Pitchshift_default_ratio_scalar', paramNames: ['ratio'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 393, genName: 'Pitchshift', variantName: 'default', className: 'Pitchshift_default_ratio_audio', paramNames: ['ratio'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 394, genName: 'Zerox', variantName: 'default', className: 'Zerox_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 395, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_scalar_release_scalar', paramNames: ['threshold', 'release'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 396, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_scalar_release_audio', paramNames: ['threshold', 'release'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 397, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_audio_release_scalar', paramNames: ['threshold', 'release'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 398, genName: 'Limiter', variantName: 'default', className: 'Limiter_default_threshold_audio_release_audio', paramNames: ['threshold', 'release'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 399, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_scalar_probability_scalar_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 400, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_scalar_probability_audio_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 401, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_audio_probability_scalar_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 402, genName: 'At', variantName: 'default', className: 'At_default_bar_scalar_every_audio_probability_audio_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 403, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_scalar_probability_scalar_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 404, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_scalar_probability_audio_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 405, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_audio_probability_scalar_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 406, genName: 'At', variantName: 'default', className: 'At_default_bar_audio_every_audio_probability_audio_seed_scalar', paramNames: ['bar', 'every', 'probability', 'seed'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['fired'], usesInput: false },
  { id: 407, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 408, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 409, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 410, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_scalar_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 411, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 412, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 413, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 414, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_scalar_q_audio_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 415, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 416, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 417, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 418, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_scalar_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 419, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 420, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_scalar_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 421, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_scalar', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 422, genName: 'Diodeladder', variantName: 'default', className: 'Diodeladder_default_cutoff_audio_q_audio_k_audio_sat_audio', paramNames: ['cutoff', 'q', 'k', 'sat'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 423, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 424, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 425, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 426, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_scalar_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 427, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 428, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_scalar_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 429, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_audio_trig_scalar', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: false },
  { id: 430, genName: 'Ramp', variantName: 'default', className: 'Ramp_default_hz_audio_offset_audio_trig_audio', paramNames: ['hz', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: false },
  { id: 431, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 432, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_scalar_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 433, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 434, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_scalar_curve_audio_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 435, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 436, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_scalar_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 437, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_audio_trig_scalar', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 438, genName: 'Smooth', variantName: 'default', className: 'Smooth_default_seed_scalar_rate_audio_curve_audio_trig_audio', paramNames: ['seed', 'rate', 'curve', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 439, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 440, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 441, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 442, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_scalar_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 443, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_scalar_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 444, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_scalar_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 445, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_audio_trig_scalar', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 446, genName: 'Lfotri', variantName: 'default', className: 'Lfotri_default_bar_audio_offset_audio_trig_audio', paramNames: ['bar', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 447, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 448, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 449, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 450, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 451, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 452, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 453, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 454, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 455, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 456, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 457, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 458, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 459, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 460, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 461, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 462, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 463, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 464, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 465, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 466, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 467, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 468, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 469, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 470, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 471, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 472, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 473, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 474, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 475, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 476, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 477, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 478, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_scalar_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 479, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 480, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 481, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 482, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 483, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 484, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 485, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 486, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 487, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 488, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 489, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 490, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 491, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 492, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 493, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 494, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_scalar_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 495, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 496, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 497, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 498, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 499, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 500, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 501, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 502, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_scalar_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 503, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 504, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 505, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 506, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_scalar_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 507, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 508, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_scalar_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'scalar', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 509, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_scalar', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'scalar'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 510, genName: 'Adsr', variantName: 'default', className: 'Adsr_default_attack_audio_decay_audio_sustain_audio_release_audio_exponent_audio_trig_audio', paramNames: ['attack', 'decay', 'sustain', 'release', 'exponent', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio', 'audio', 'audio'], emitNames: ['stage', 'env'], usesInput: false },
  { id: 511, genName: 'Analyser', variantName: 'default', className: 'Analyser_default_', paramNames: [], paramModes: [], emitNames: [], usesInput: true },
  { id: 512, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 513, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 514, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 515, genName: 'Biquad', variantName: 'lp', className: 'Biquad_lp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 516, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 517, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 518, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 519, genName: 'Biquad', variantName: 'hp', className: 'Biquad_hp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 520, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 521, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 522, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 523, genName: 'Biquad', variantName: 'bp', className: 'Biquad_bp_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 524, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 525, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 526, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 527, genName: 'Biquad', variantName: 'bs', className: 'Biquad_bs_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 528, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 529, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 530, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 531, genName: 'Biquad', variantName: 'ap', className: 'Biquad_ap_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 532, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_scalar_release_scalar', paramNames: ['attack', 'release'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 533, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_scalar_release_audio', paramNames: ['attack', 'release'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 534, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_audio_release_scalar', paramNames: ['attack', 'release'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 535, genName: 'Envfollow', variantName: 'default', className: 'Envfollow_default_attack_audio_release_audio', paramNames: ['attack', 'release'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 536, genName: 'Sah', variantName: 'default', className: 'Sah_default_trig_scalar', paramNames: ['trig'], paramModes: ['scalar'], emitNames: [], usesInput: true },
  { id: 537, genName: 'Sah', variantName: 'default', className: 'Sah_default_trig_audio', paramNames: ['trig'], paramModes: ['audio'], emitNames: [], usesInput: true },
  { id: 538, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 539, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 540, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 541, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 542, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 543, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 544, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_scalar', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 545, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_audio', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 546, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 547, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_scalar_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 548, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 549, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_scalar_damping_audio_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 550, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 551, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_scalar_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 552, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_scalar_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 553, genName: 'Velvet', variantName: 'default', className: 'Velvet_default_room_audio_damping_audio_decay_audio_stereo', paramNames: ['room', 'damping', 'decay'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 554, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 555, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 556, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 557, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 558, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 559, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 560, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 561, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 562, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 563, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 564, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 565, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 566, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 567, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 568, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 569, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_audio', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 570, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 571, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 572, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 573, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_scalar_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 574, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 575, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 576, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 577, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_scalar_damping_audio_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 578, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 579, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 580, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 581, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_scalar_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 582, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 583, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_scalar_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 584, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_scalar_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 585, genName: 'Fdn', variantName: 'default', className: 'Fdn_default_room_audio_damping_audio_decay_audio_depth_audio_stereo', paramNames: ['room', 'damping', 'decay', 'depth'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 586, genName: 'Pink', variantName: 'default', className: 'Pink_default_seed_scalar_trig_scalar', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 587, genName: 'Pink', variantName: 'default', className: 'Pink_default_seed_scalar_trig_audio', paramNames: ['seed', 'trig'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: false },
  { id: 588, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 589, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 590, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 591, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 592, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 593, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 594, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 595, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 596, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 597, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 598, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 599, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_scalar_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['scalar', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 600, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 601, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_scalar_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'scalar', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 602, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_scalar_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 603, genName: 'Dattorro', variantName: 'default', className: 'Dattorro_default_room_audio_damping_audio_bandwidth_audio_indiff1_scalar_indiff2_scalar_decdiff1_scalar_decdiff2_scalar_excrate_scalar_excdepth_scalar_predelay_scalar_stereo', paramNames: ['room', 'damping', 'bandwidth', 'indiff1', 'indiff2', 'decdiff1', 'decdiff2', 'excrate', 'excdepth', 'predelay'], paramModes: ['audio', 'audio', 'audio', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 604, genName: 'Random', variantName: 'default', className: 'Random_default_seed_scalar', paramNames: ['seed'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 605, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_scalar_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 606, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_scalar_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 607, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_audio_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 608, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_scalar_down_audio_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 609, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_scalar_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 610, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_scalar_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 611, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_audio_exp_scalar', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 612, genName: 'Slew', variantName: 'default', className: 'Slew_default_up_audio_down_audio_exp_audio', paramNames: ['up', 'down', 'exp'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 613, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 614, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 615, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 616, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_scalar_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 617, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 618, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 619, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 620, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_scalar_ceil_audio_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['scalar', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 621, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 622, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 623, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 624, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_scalar_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'scalar', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 625, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_scalar_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 626, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_scalar_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'scalar', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 627, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_audio_trig_scalar', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'scalar'], emitNames: ['phase'], usesInput: false },
  { id: 628, genName: 'Inc', variantName: 'default', className: 'Inc_default_hz_audio_ceil_audio_offset_audio_trig_audio', paramNames: ['hz', 'ceil', 'offset', 'trig'], paramModes: ['audio', 'audio', 'audio', 'audio'], emitNames: ['phase'], usesInput: false },
  { id: 629, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 630, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 631, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 632, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 633, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 634, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 635, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 636, genName: 'Biquadshelf', variantName: 'ls', className: 'Biquadshelf_ls_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 637, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 638, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 639, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 640, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 641, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 642, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 643, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 644, genName: 'Biquadshelf', variantName: 'hs', className: 'Biquadshelf_hs_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 645, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 646, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 647, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 648, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_scalar_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['scalar', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 649, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_scalar_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 650, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_scalar_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 651, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_audio_gain_scalar', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 652, genName: 'Biquadshelf', variantName: 'peak', className: 'Biquadshelf_peak_cutoff_audio_q_audio_gain_audio', paramNames: ['cutoff', 'q', 'gain'], paramModes: ['audio', 'audio', 'audio'], emitNames: [], usesInput: true },
  { id: 653, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 654, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 655, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 656, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 657, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 658, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_scalar_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'scalar', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 659, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_scalar_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'scalar'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 660, genName: 'Sampler', variantName: 'default', className: 'Sampler_default_sample_scalar_speed_scalar_offset_audio_repeat_scalar_trig_audio_stereo', paramNames: ['sample', 'speed', 'offset', 'repeat', 'trig'], paramModes: ['scalar', 'scalar', 'audio', 'scalar', 'audio'], emitNames: ['position', 'playing'], usesInput: false },
  { id: 661, genName: 'Moog', variantName: 'lpm', className: 'Moog_lpm_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 662, genName: 'Moog', variantName: 'lpm', className: 'Moog_lpm_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 663, genName: 'Moog', variantName: 'hpm', className: 'Moog_hpm_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 664, genName: 'Moog', variantName: 'hpm', className: 'Moog_hpm_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 665, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 666, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 667, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 668, genName: 'Svf', variantName: 'lps', className: 'Svf_lps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 669, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 670, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 671, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 672, genName: 'Svf', variantName: 'hps', className: 'Svf_hps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 673, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 674, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 675, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 676, genName: 'Svf', variantName: 'bps', className: 'Svf_bps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 677, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 678, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 679, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 680, genName: 'Svf', variantName: 'bss', className: 'Svf_bss_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 681, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 682, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 683, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 684, genName: 'Svf', variantName: 'peaks', className: 'Svf_peaks_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 685, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_scalar_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: true },
  { id: 686, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_scalar_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['scalar', 'audio'], emitNames: [], usesInput: true },
  { id: 687, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_audio_q_scalar', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'scalar'], emitNames: [], usesInput: true },
  { id: 688, genName: 'Svf', variantName: 'aps', className: 'Svf_aps_cutoff_audio_q_audio', paramNames: ['cutoff', 'q'], paramModes: ['audio', 'audio'], emitNames: [], usesInput: true },
  { id: 689, genName: 'Table', variantName: 'lookup', className: 'Table_lookup', paramNames: ['len', 'index'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },
  { id: 690, genName: 'Tram', variantName: 'default', className: 'TramKernel', paramNames: [], paramModes: [], emitNames: ['fired'], usesInput: false },
  { id: 691, genName: 'Mini', variantName: 'default', className: 'MiniKernel', paramNames: ['bars'], paramModes: ['scalar'], emitNames: [], usesInput: false },
  { id: 692, genName: 'Timeline', variantName: 'default', className: 'TimelineKernel', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 693, genName: 'Out', variantName: 'default', className: 'Out', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 694, genName: 'Mix', variantName: 'default', className: 'Mix', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
  { id: 695, genName: 'ArrayGet', variantName: 'default', className: 'ArrayGet', paramNames: ['index'], paramModes: ['scalar'], emitNames: ['index'], usesInput: false },
  { id: 696, genName: 'Solo', variantName: 'default', className: 'Solo', paramNames: [], paramModes: [], emitNames: [], usesInput: false },
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
  offset: HistoryParamAccessor
  length: HistoryParamAccessor
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

export type MarkovHistoryParams = {
  states: HistoryParamAccessor
  stay: HistoryParamAccessor
  step: HistoryParamAccessor
  bias: HistoryParamAccessor
  seed: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type MarkovHistoryEmit = {
  state: HistoryParamAccessor
  fired: HistoryParamAccessor
}

export type MarkovHistory = {
  id: number
  genName: 'Markov'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: MarkovHistoryParams
  emit: MarkovHistoryEmit
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

export type SustainHistoryParams = {
  seconds: HistoryParamAccessor
  trig: HistoryParamAccessor
}

export type SustainHistoryEmit = {

}

export type SustainHistory = {
  id: number
  genName: 'Sustain'
  variantName: string
  className: string
  source: HistorySource
  view: AudioVmHistoryView
  index: number
  params: SustainHistoryParams
  emit: SustainHistoryEmit
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
  probability: HistoryParamAccessor
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

export type TypedHistory = AdHistory | AdsrHistory | AnalyserHistory | ArrayGetHistory | AtHistory | BiquadHistory | BiquadshelfHistory | BrownHistory | CompressorHistory | DattorroHistory | DcHistory | DiodeladderHistory | EmitHistory | EnvfollowHistory | EuclidHistory | EveryHistory | FdnHistory | FractalHistory | FreeverbHistory | GaussHistory | HoldHistory | ImpulseHistory | IncHistory | LforampHistory | LfosahHistory | LfosawHistory | LfosineHistory | LfosqrHistory | LfotriHistory | LimiterHistory | MarkovHistory | MiniHistory | MixHistory | MoogHistory | OnepoleHistory | OutHistory | PhasorHistory | PinkHistory | PitchshiftHistory | PwmHistory | RampHistory | RandomHistory | SahHistory | SamplerHistory | SawHistory | SineHistory | SlewHistory | SlicerHistory | SmoothHistory | SoloHistory | SqrHistory | SustainHistory | SvfHistory | TestGainHistory | TestOversampleHistory | TimelineHistory | TramHistory | TriHistory | VelvetHistory | WhiteHistory | ZeroxHistory