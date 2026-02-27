import { getOpcodeInfo, isOpcode } from './opcode.ts'

type U32Bits = Uint32Array

const FUNCTION_BYTECODE_CACHE_MAX_ENTRIES = 2048
const FUNCTION_BYTECODE_CACHE_MAX_WORDS = 2_000_000

const functionBytecodeCache = new Map<string, U32Bits>()
let functionBytecodeCacheWords = 0

const hashScratchF32 = new Float32Array(1)
const hashScratchU32 = new Uint32Array(hashScratchF32.buffer)

function cacheGetFunctionBytecode(key: string): U32Bits | undefined {
  const hit = functionBytecodeCache.get(key)
  if (!hit) return
  functionBytecodeCache.delete(key)
  functionBytecodeCache.set(key, hit)
  return hit
}

function cachePutFunctionBytecode(key: string, u32: U32Bits): void {
  const existing = functionBytecodeCache.get(key)
  if (existing) {
    functionBytecodeCacheWords -= existing.length
    functionBytecodeCache.delete(key)
  }
  functionBytecodeCache.set(key, u32)
  functionBytecodeCacheWords += u32.length

  while (
    functionBytecodeCache.size > FUNCTION_BYTECODE_CACHE_MAX_ENTRIES
    || functionBytecodeCacheWords > FUNCTION_BYTECODE_CACHE_MAX_WORDS
  ) {
    const first = functionBytecodeCache.entries().next().value as [string, U32Bits] | undefined
    if (!first) break
    functionBytecodeCache.delete(first[0])
    functionBytecodeCacheWords -= first[1].length
  }
}

function hashFunctionBytecodeSegment(ops: number[], startPc: number, segLen: number): string {
  let h1 = 0x811c9dc5 | 0
  let h2 = 0x9e3779b9 | 0

  for (let i = 0; i < segLen; i++) {
    hashScratchF32[0] = ops[startPc + i]!
    const b = hashScratchU32[0]!
    h1 = Math.imul(h1 ^ (b + i), 0x01000193)
    h2 = Math.imul(h2 ^ (b + (i << 1)), 0x85ebca6b)
  }

  return `${segLen},${h1 >>> 0},${h2 >>> 0}`
}

/**
 * Add delta to all PC operands in ops[startIndex..]. Used when prepending bytecode
 * so jump/break/continue targets in the main program are correct. Skips DefineFunction bodies.
 */
export function patchPcParamsInRange(ops: number[], startIndex: number, delta: number): void {
  let pc = startIndex
  const limit = ops.length
  while (pc < limit) {
    const value = ops[pc]
    if (!isOpcode(value)) {
      pc++
      continue
    }
    const info = getOpcodeInfo(value)
    pc++
    switch (info.kind) {
      case 'pc-param':
        if (pc < limit) ops[pc++] += delta
        break
      case 'three-param':
        if (pc < limit) ops[pc++] += delta
        if (pc < limit) ops[pc++] += delta
        if (pc < limit) pc++
        break
      case 'define-function':
        if (pc + 5 < limit) {
          const bytecodeLen = ops[pc + 5]
          pc += 6 + bytecodeLen
        }
        break
      case 'param':
      case 'none':
        if (info.kind === 'param') pc++
        break
      case 'table':
        if (pc < limit) {
          const len = ops[pc++]
          pc += len
        }
        break
    }
  }
}

function getVal(ops: number[], pc: number, patchMap: Map<number, number> | undefined, add: number): number {
  if (patchMap == null) return ops[pc]! + add
  const v = patchMap.get(pc)
  return v !== undefined ? v : ops[pc]! + add
}

/**
 * Encodes a DefineFunction body.
 * pc points at the first word *after* the DefineFunction opcode.
 * Writes to view[outputOffset + pc]. Jump targets get +jumpTargetAdd.
 * patchMap: optional main-ops index -> value (applied when writing params/literals).
 */
export function encodeFunctionBytecode(
  ops: number[],
  u32View: Uint32Array,
  f32View: Float32Array,
  pc: number,
  limit: number,
  outputOffset: number = 0,
  jumpTargetAdd: number = 0,
  patchMap?: Map<number, number>,
): number {
  const startPc = pc
  const canCache = patchMap == null && pc + 6 <= limit
  let cacheKey: string | null = null
  let cacheSegLen = 0
  if (canCache) {
    const bytecodeLen = ops[pc + 5]!
    cacheSegLen = 6 + bytecodeLen
    const segEnd = pc + cacheSegLen
    if (segEnd <= limit) {
      cacheKey = hashFunctionBytecodeSegment(ops, pc, cacheSegLen)
      const cached = cacheGetFunctionBytecode(cacheKey)
      if (cached) {
        u32View.set(cached, outputOffset + pc)
        return segEnd
      }
    }
    else {
      cacheKey = null
      cacheSegLen = 0
    }
  }

  for (let i = 0; i < 5 && pc < limit; i++) {
    f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
    pc++
  }
  if (pc >= limit) return pc
  const bytecodeLen = ops[pc]!
  f32View[outputOffset + pc] = bytecodeLen
  pc++
  const bodyEnd = pc + bytecodeLen
  const bodyJumpAdd = 0
  while (pc < bodyEnd && pc < limit) {
    const value = ops[pc]!
    if (!isOpcode(value)) {
      f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
      pc++
      continue
    }
    const opcode = value
    const info = getOpcodeInfo(opcode)
    u32View[outputOffset + pc] = opcode
    pc++
    switch (info.kind) {
      case 'none':
        break
      case 'param':
        if (pc < limit && pc < bodyEnd) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
          pc++
        }
        break
      case 'pc-param':
        if (pc < limit && pc < bodyEnd) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, bodyJumpAdd)
          pc++
        }
        break
      case 'three-param':
        if (pc < limit && pc < bodyEnd) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, bodyJumpAdd)
        pc++
        if (pc < limit && pc < bodyEnd) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, bodyJumpAdd)
        pc++
        if (pc < limit && pc < bodyEnd) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
        pc++
        break
      case 'table': {
        if (pc >= limit || pc >= bodyEnd) break
        const len = ops[pc]!
        f32View[outputOffset + pc] = len
        pc++
        for (let j = 0; j < len && pc < limit && pc < bodyEnd; j++) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
          pc++
        }
        break
      }
      case 'define-function':
        pc = encodeFunctionBytecode(ops, u32View, f32View, pc, Math.min(limit, bodyEnd), outputOffset, jumpTargetAdd,
          patchMap)
        break
    }
  }

  if (cacheKey && cacheSegLen > 0 && pc === startPc + cacheSegLen) {
    const encoded = u32View.slice(outputOffset + startPc, outputOffset + startPc + cacheSegLen)
    cachePutFunctionBytecode(cacheKey, encoded)
  }
  return pc
}

/**
 * Encode ops to buffer at [outputOffset, outputOffset+ops.length).
 * Jump targets (pc-param, first two of three-param) get +jumpTargetAdd.
 * patchMap: optional ops index -> value (applied when writing params/literals).
 */
export function encodeToBuffer(
  ops: number[],
  u32View: Uint32Array,
  f32View: Float32Array,
  outputOffset: number,
  jumpTargetAdd: number,
  patchMap?: Map<number, number>,
): void {
  const limit = ops.length
  let pc = 0

  while (pc < limit) {
    const value = ops[pc]!
    if (!isOpcode(value)) {
      f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
      pc++
      continue
    }
    const opcode = value
    const info = getOpcodeInfo(opcode)
    u32View[outputOffset + pc] = opcode
    pc++
    switch (info.kind) {
      case 'none':
        break
      case 'param':
        if (pc < limit) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
          pc++
        }
        break
      case 'pc-param':
        if (pc < limit) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, jumpTargetAdd)
          pc++
        }
        break
      case 'three-param':
        if (pc < limit) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, jumpTargetAdd)
        pc++
        if (pc < limit) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, jumpTargetAdd)
        pc++
        if (pc < limit) f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
        pc++
        break
      case 'table': {
        if (pc >= limit) break
        const len = ops[pc]!
        f32View[outputOffset + pc] = len
        pc++
        for (let i = 0; i < len && pc < limit; i++) {
          f32View[outputOffset + pc] = getVal(ops, pc, patchMap, 0)
          pc++
        }
        break
      }
      case 'define-function':
        pc = encodeFunctionBytecode(ops, u32View, f32View, pc, limit, outputOffset, jumpTargetAdd, patchMap)
        break
    }
  }
}

/**
 * Unified encoder (single-pass, pc-safe); writes to [0, ops.length).
 */
export function encodeBytecode(
  ops: number[],
  u32View: Uint32Array,
  f32View: Float32Array,
): void {
  encodeToBuffer(ops, u32View, f32View, 0, 0)
}

export function encodeCallbackBytecode(ops: number[]): Float32Array {
  const buffer = new ArrayBuffer(ops.length * 4)
  const u32View = new Uint32Array(buffer)
  const f32View = new Float32Array(buffer)
  encodeBytecode(ops, u32View, f32View)
  return f32View
}
