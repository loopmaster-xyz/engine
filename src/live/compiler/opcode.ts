import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'

export type OpcodeKind =
  | 'none'
  | 'param'
  | 'pc-param'
  | 'three-param'
  | 'table'
  | 'define-function'

export interface OpcodeInfo {
  kind: OpcodeKind
}

/**
 * NOTE:
 * - AudioVmOp is a numeric enum
 * - We must NOT use Record<AudioVmOp, …>
 * - This map is intentionally partial
 */
const OPCODE_INFO: Partial<Record<AudioVmOp, OpcodeInfo>> = {
  /* -------- single param -------- */
  [AudioVmOp.PushScalar]: { kind: 'param' },
  [AudioVmOp.PushAudio]: { kind: 'param' },
  [AudioVmOp.SetBpm]: { kind: 'param' },
  [AudioVmOp.GetSystem]: { kind: 'param' },
  [AudioVmOp.GetGlobal]: { kind: 'param' },
  [AudioVmOp.SetGlobal]: { kind: 'param' },
  [AudioVmOp.GetLocal]: { kind: 'param' },
  [AudioVmOp.SetLocal]: { kind: 'param' },
  [AudioVmOp.GetClosure]: { kind: 'param' },
  [AudioVmOp.SetClosure]: { kind: 'param' },
  [AudioVmOp.GetCellRefLocal]: { kind: 'param' },
  [AudioVmOp.GetCellRefGlobal]: { kind: 'param' },
  [AudioVmOp.GetCellRefClosure]: { kind: 'param' },
  [AudioVmOp.PushClosure]: { kind: 'param' },
  [AudioVmOp.CallFunction]: { kind: 'param' },
  [AudioVmOp.ArrayPush]: { kind: 'param' },
  [AudioVmOp.MakeArray]: { kind: 'param' },
  [AudioVmOp.ArrayGet]: { kind: 'param' },
  [AudioVmOp.Out]: { kind: 'param' },
  [AudioVmOp.Solo]: { kind: 'param' },
  [AudioVmOp.MathUnary]: { kind: 'param' },
  [AudioVmOp.MathBinary]: { kind: 'param' },
  [AudioVmOp.MathTernary]: { kind: 'param' },

  /* -------- PC param -------- */
  [AudioVmOp.Jump]: { kind: 'pc-param' },
  [AudioVmOp.JumpIfFalse]: { kind: 'pc-param' },
  [AudioVmOp.JumpIfTrue]: { kind: 'pc-param' },

  /* -------- multi -------- */
  [AudioVmOp.PushTryBlock]: { kind: 'three-param' },
  [AudioVmOp.TableLookup]: { kind: 'table' },
  [AudioVmOp.Alloc]: { kind: 'param' },
  [AudioVmOp.Step]: { kind: 'param' },
  [AudioVmOp.Random]: { kind: 'param' },
  [AudioVmOp.Append]: { kind: 'none' },
  [AudioVmOp.Write]: { kind: 'none' },
  [AudioVmOp.Advance]: { kind: 'none' },
  [AudioVmOp.Tram]: { kind: 'table' },
  [AudioVmOp.Mini]: { kind: 'table' },
  [AudioVmOp.Timeline]: { kind: 'table' },

  /* -------- function -------- */
  [AudioVmOp.DefineFunction]: { kind: 'define-function' },
}

/**
 * Safe opcode test
 */
export function isOpcode(value: number): value is AudioVmOp {
  return Number.isInteger(value) && value >= 0 && value < 256
}

/**
 * Total lookup with safe fallback
 */
export function getOpcodeInfo(op: AudioVmOp): OpcodeInfo {
  return OPCODE_INFO[op] ?? { kind: 'none' }
}

/**
 * Test if an opcode has exactly one parameter
 */
export function isOpcodeOneParam(op: AudioVmOp): boolean {
  const { kind } = getOpcodeInfo(op)
  return kind === 'param' || kind === 'pc-param'
}
