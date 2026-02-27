import {
  MINI_CYCLE_END_SIZE,
  MINI_CYCLE_START_SIZE,
  MINI_EVENT_BASE_SIZE,
  MINI_GROUP_END_SIZE,
  MINI_GROUP_START_SIZE,
  MINI_HEADER_SIZE,
  MINI_MAX_EVENT_VALUES,
  MINI_OCTAVE_SIZE,
  MINI_REST_SIZE,
  MINI_SCALE_SIZE,
  MINI_SWING_SIZE,
  MINI_TRANSPOSE_SIZE,
  MiniOp,
} from '../../as/assembly/mini/constants.ts'
import type { Modifiers, NodeSource } from './tokenizer.ts'

export interface MiniSourceMapEntry {
  eventIndex: number
  source: NodeSource
}

export interface TimelineEvent {
  start: number
  end: number
  value: number
  velocity: number
  hold: number
  glide: number
  prob: number
  source?: MiniSourceMapEntry
}

export function allocateBytecode(operationCount: number): Float32Array {
  const size = MINI_HEADER_SIZE
    + operationCount
      * Math.max(MINI_EVENT_BASE_SIZE, MINI_GROUP_START_SIZE, MINI_SCALE_SIZE, MINI_CYCLE_START_SIZE,
        MINI_CYCLE_END_SIZE, MINI_REST_SIZE, MINI_OCTAVE_SIZE, MINI_TRANSPOSE_SIZE, MINI_SWING_SIZE)
  return new Float32Array(size)
}

export function writeEventOp(
  buffer: Float32Array,
  offset: number,
  values: number[],
  modifiers: Modifiers,
): number {
  const base = MINI_HEADER_SIZE + offset
  let pc = 0
  function emit(op: number) {
    buffer[base + pc] = op
    pc++
  }
  emit(MiniOp.Event)
  const valueCount = Math.min(values.length, MINI_MAX_EVENT_VALUES)
  emit(valueCount)
  emit(modifiers.velocity)
  emit(modifiers.hold)
  emit(modifiers.replicate)
  emit(modifiers.elongate)
  emit(modifiers.density)
  emit(modifiers.offset)
  emit(modifiers.jitter)
  emit(modifiers.prob)
  emit(modifiers.glide)
  emit(modifiers.strum)
  for (let i = 0; i < MINI_MAX_EVENT_VALUES; i++) {
    emit(values[i] ?? 0)
  }
  return MINI_EVENT_BASE_SIZE
}

export function writeGroupStartOp(
  buffer: Float32Array,
  offset: number,
  childCount: number,
  mode: number,
  modifiers: Modifiers,
): number {
  const base = MINI_HEADER_SIZE + offset
  let pc = 0
  function emit(op: number) {
    buffer[base + pc] = op
    pc++
  }
  emit(MiniOp.GroupStart)
  emit(childCount)
  emit(mode === 2 ? 2 : mode === 1 ? 1 : 0)
  emit(modifiers.velocity)
  emit(modifiers.hold)
  emit(modifiers.replicate)
  emit(modifiers.elongate)
  emit(modifiers.density)
  emit(modifiers.offset)
  emit(modifiers.jitter)
  emit(modifiers.prob)
  emit(modifiers.glide)
  emit(modifiers.strum)
  return MINI_GROUP_START_SIZE
}

export function writeGroupEndOp(
  buffer: Float32Array,
  offset: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.GroupEnd
  return MINI_GROUP_END_SIZE
}

export function writeCycleStartOp(
  buffer: Float32Array,
  offset: number,
  pos: number,
  loop: number,
  childCount: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.CycleStart
  buffer[base + 1] = pos
  buffer[base + 2] = loop
  buffer[base + 3] = childCount
  return MINI_CYCLE_START_SIZE
}

export function writeCycleEndOp(
  buffer: Float32Array,
  offset: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.CycleEnd
  return MINI_CYCLE_END_SIZE
}

export function writeRestOp(
  buffer: Float32Array,
  offset: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.Rest
  return MINI_REST_SIZE
}

export function writeOctaveOp(
  buffer: Float32Array,
  offset: number,
  delta: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.Octave
  buffer[base + 1] = delta
  return MINI_OCTAVE_SIZE
}

export function writeTransposeOp(
  buffer: Float32Array,
  offset: number,
  delta: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.Transpose
  buffer[base + 1] = delta
  return MINI_TRANSPOSE_SIZE
}

export function writeScaleOp(
  buffer: Float32Array,
  offset: number,
  rootMidi: number,
  scaleIndex: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.Scale
  buffer[base + 1] = rootMidi
  buffer[base + 2] = scaleIndex
  return MINI_SCALE_SIZE
}

export function writeSwingOp(
  buffer: Float32Array,
  offset: number,
  amount: number,
): number {
  const base = MINI_HEADER_SIZE + offset
  buffer[base + 0] = MiniOp.Swing
  buffer[base + 1] = amount
  return MINI_SWING_SIZE
}
