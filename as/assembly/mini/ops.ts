import {
  MINI_CYCLE_END_SIZE,
  MINI_CYCLE_START_SIZE,
  MINI_EVENT_BASE_SIZE,
  MINI_GROUP_END_SIZE,
  MINI_GROUP_START_SIZE,
  MINI_MAX_EVENT_VALUES,
  MINI_OCTAVE_SIZE,
  MINI_REST_SIZE,
  MINI_SCALE_SIZE,
  MINI_SWING_SIZE,
  MINI_TRANSPOSE_SIZE,
  MiniOp,
} from './constants'

@unmanaged
export class EventOp {
  opcode!: f32
  valueCount!: f32
  velocity!: f32
  hold!: f32
  replicate!: f32
  elongate!: f32
  density!: f32
  offset!: f32
  jitter!: f32
  prob!: f32
  glide!: f32
  strum!: f32
  // values[MAX_EVENT_VALUES] stored at offset + 12

  static size(): i32 {
    return MINI_EVENT_BASE_SIZE
  }

  static at(array$: usize, offset: i32): EventOp {
    return changetype<EventOp>(array$ + (offset << 2))
  }

  getValue(index: i32): f32 {
    if (index >= 0 && index < MINI_MAX_EVENT_VALUES) {
      const valuesPtr = changetype<usize>(this) + ((12 + index) << 2)
      return load<f32>(valuesPtr)
    }
    return 0.0
  }
}

@unmanaged
export class GroupStartOp {
  opcode!: f32
  childCount!: f32
  angle!: f32
  velocity!: f32
  hold!: f32
  replicate!: f32
  elongate!: f32
  density!: f32
  offset!: f32
  jitter!: f32
  prob!: f32
  glide!: f32
  strum!: f32

  static size(): i32 {
    return MINI_GROUP_START_SIZE
  }

  static at(array$: usize, offset: i32): GroupStartOp {
    return changetype<GroupStartOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class CycleStartOp {
  opcode!: f32
  pos!: f32
  loop!: f32
  childCount!: f32

  static size(): i32 {
    return MINI_CYCLE_START_SIZE
  }

  static at(array$: usize, offset: i32): CycleStartOp {
    return changetype<CycleStartOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class CycleEndOp {
  opcode!: f32

  static size(): i32 {
    return MINI_CYCLE_END_SIZE
  }

  static at(array$: usize, offset: i32): CycleEndOp {
    return changetype<CycleEndOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class RestOp {
  opcode!: f32

  static size(): i32 {
    return MINI_REST_SIZE
  }

  static at(array$: usize, offset: i32): RestOp {
    return changetype<RestOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class OctaveOp {
  opcode!: f32
  delta!: f32

  static size(): i32 {
    return MINI_OCTAVE_SIZE
  }

  static at(array$: usize, offset: i32): OctaveOp {
    return changetype<OctaveOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class TransposeOp {
  opcode!: f32
  delta!: f32

  static size(): i32 {
    return MINI_TRANSPOSE_SIZE
  }

  static at(array$: usize, offset: i32): TransposeOp {
    return changetype<TransposeOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class ScaleOp {
  opcode!: f32
  rootMidi!: f32
  scaleIndex!: f32

  static size(): i32 {
    return MINI_SCALE_SIZE
  }

  static at(array$: usize, offset: i32): ScaleOp {
    return changetype<ScaleOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class SwingOp {
  opcode!: f32
  amount!: f32

  static size(): i32 {
    return MINI_SWING_SIZE
  }

  static at(array$: usize, offset: i32): SwingOp {
    return changetype<SwingOp>(array$ + (offset << 2))
  }
}

@unmanaged
export class GroupEndOp {
  opcode!: f32

  static size(): i32 {
    return MINI_GROUP_END_SIZE
  }

  static at(array$: usize, offset: i32): GroupEndOp {
    return changetype<GroupEndOp>(array$ + (offset << 2))
  }
}

export function getOpcode(array$: usize, offset: i32): i32 {
  return i32(load<f32>(array$ + (offset << 2)))
}

export function skipOp(array$: usize, offset: i32): i32 {
  const opcode = getOpcode(array$, offset)
  if (opcode === MiniOp.Event) return offset + MINI_EVENT_BASE_SIZE
  if (opcode === MiniOp.Rest) return offset + MINI_REST_SIZE
  if (opcode === MiniOp.GroupStart) return offset + MINI_GROUP_START_SIZE
  if (opcode === MiniOp.GroupEnd) return offset + MINI_GROUP_END_SIZE
  if (opcode === MiniOp.CycleStart) return offset + MINI_CYCLE_START_SIZE
  if (opcode === MiniOp.CycleEnd) return offset + MINI_CYCLE_END_SIZE
  if (opcode === MiniOp.Octave) return offset + MINI_OCTAVE_SIZE
  if (opcode === MiniOp.Transpose) return offset + MINI_TRANSPOSE_SIZE
  if (opcode === MiniOp.Scale) return offset + MINI_SCALE_SIZE
  if (opcode === MiniOp.Swing) return offset + MINI_SWING_SIZE
  return offset
}
