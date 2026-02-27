import { hashF32Bits } from '../lib/bytecode-hash.ts'
import { getOpcodeInfo } from '../live/compiler/opcode.ts'
import { AudioVmOp } from './audio-vm-bindings.ts'
import {
  createSharedProgramStateViewsFromBuffer,
  SharedProgramStateIndex,
  type ProgramSharedInit,
} from './worklet-shared.ts'

export function bytecodeStructureHash(bytecode: Float32Array): number {
  // Hash only the bytecode "shape":
  // - include opcode stream and structural integer params
  // - ignore scalar literal params (PushScalar, SetBpm) so changing constants is non-significant
  const u32 = new Uint32Array(bytecode.buffer, bytecode.byteOffset, bytecode.length)
  const f32 = bytecode

  const mix = (h: number, v: number) => {
    h = (h ^ v) >>> 0
    h = Math.imul(h, 16777619) >>> 0
    return h >>> 0
  }

  const roundPosI32 = (x: number): number => (x + 0.5) | 0

  const hashRange = (startPc: number, limitPc: number, seed: number): number => {
    let h = seed >>> 0
    let pc = startPc
    while (pc < limitPc) {
      const op = u32[pc]
      h = mix(h, op)
      pc++

      const { kind } = getOpcodeInfo(op as AudioVmOp)
      switch (kind) {
        case 'param':
        case 'pc-param': {
          if (pc >= limitPc) throw new Error(`Invalid bytecode: missing param for op ${op} at pc ${pc - 1}`)
          const paramBits = u32[pc]
          const paramF = f32[pc]
          if (op === AudioVmOp.PushScalar || op === AudioVmOp.PushAudio || op === AudioVmOp.SetBpm) {
            h = mix(h, 0)
          }
          else {
            const r = roundPosI32(paramF) >>> 0
            h = mix(h, r || paramBits)
          }
          pc++
          break
        }

        case 'three-param': {
          if (pc + 2 >= limitPc) throw new Error(`Invalid bytecode: missing 3 params for op ${op} at pc ${pc - 1}`)
          h = mix(h, roundPosI32(f32[pc]) >>> 0)
          pc++
          h = mix(h, roundPosI32(f32[pc]) >>> 0)
          pc++
          h = mix(h, roundPosI32(f32[pc]) >>> 0)
          pc++
          break
        }

        case 'table': {
          if (pc >= limitPc) throw new Error(`Invalid bytecode: missing table len for op ${op} at pc ${pc - 1}`)
          const len = roundPosI32(f32[pc])
          if (len < 0) throw new Error(`Invalid bytecode: negative table len ${len} for op ${op} at pc ${pc - 1}`)
          h = mix(h, len >>> 0)
          const end = pc + 1 + len
          if (end > limitPc) throw new Error(`Invalid bytecode: table overruns bytecode for op ${op} at pc ${pc - 1}`)
          pc = end // ignore table contents
          break
        }

        case 'define-function': {
          if (pc + 5 >= limitPc) throw new Error(`Invalid bytecode: missing function header for op ${op} at pc ${pc - 1}`)
          const functionId = roundPosI32(f32[pc]); pc++
          const paramCount = roundPosI32(f32[pc]); pc++
          const firstParamIn = roundPosI32(f32[pc]); pc++
          const closureCount = roundPosI32(f32[pc]); pc++
          const localCount = roundPosI32(f32[pc]); pc++
          const bytecodeLength = roundPosI32(f32[pc]); pc++
          if (bytecodeLength < 0) throw new Error(`Invalid bytecode: negative function bytecode len ${bytecodeLength}`)
          h = mix(h, functionId >>> 0)
          h = mix(h, paramCount >>> 0)
          h = mix(h, firstParamIn >>> 0)
          h = mix(h, closureCount >>> 0)
          h = mix(h, localCount >>> 0)
          const innerStart = pc
          const innerEnd = pc + bytecodeLength
          if (innerEnd > limitPc) throw new Error(`Invalid bytecode: function overruns bytecode (end ${innerEnd}, limit ${limitPc})`)
          h = hashRange(innerStart, innerEnd, h)
          pc = innerEnd
          break
        }

        case 'none':
        default:
          break
      }
    }
    return h >>> 0
  }

  return hashRange(0, bytecode.length, 2166136261)
}

export function hashCallbackBytecode(
  setup: Float32Array,
  loop: Float32Array,
  recordGlobalIndices: number[],
  captureStoreGlobalIdx: number,
): string {
  let hash = hashF32Bits(setup)
  hash = (hash * 31 + hashF32Bits(loop)) | 0
  return `${hash}:${captureStoreGlobalIdx}:${recordGlobalIndices.join(',')}`
}

export type SharedProgramViews = {
  id: number
  vmIds: [number, number]
  controlOpsCapacity: number
  bufferRef: ArrayBuffer
  stateU32: Uint32Array
  stateF32: Float32Array
  /** Underlying history meta packs (double-buffered). */
  historyMetaPacks: [Uint32Array, Uint32Array]
  /** Convenience view for the current history pack (may change when rebound). */
  historyMetaU32: Uint32Array
}

export function bindProgramShared(
  buf: ArrayBuffer,
  init: ProgramSharedInit,
  historyMeta?: SharedArrayBuffer | Uint32Array,
): SharedProgramViews {
  const stateViews = createSharedProgramStateViewsFromBuffer(init.stateBuffer)

  let packs: [Uint32Array, Uint32Array]
  if (init.historyMetaBuffers && init.historyMetaBuffers.length === 2) {
    packs = [
      new Uint32Array(init.historyMetaBuffers[0]),
      new Uint32Array(init.historyMetaBuffers[1]),
    ]
  }
  else if (historyMeta instanceof SharedArrayBuffer) {
    const u32 = new Uint32Array(historyMeta)
    packs = [u32, u32]
  }
  else if (historyMeta instanceof Uint32Array) {
    packs = [historyMeta, historyMeta]
  }
  else {
    const empty = new Uint32Array(0)
    packs = [empty, empty]
  }

  const packIndex = stateViews.u32[SharedProgramStateIndex.HistoryPackIndex] >>> 0
  const current = packs[Math.min(packIndex, packs.length - 1)]

  return {
    id: init.id,
    vmIds: init.vmIds,
    controlOpsCapacity: init.controlOpsCapacity,
    bufferRef: buf,
    stateU32: stateViews.u32,
    stateF32: stateViews.f32,
    historyMetaPacks: packs,
    historyMetaU32: current,
  }
}
