export const MINI_HISTORY_SIZE: i32 = 2048
export const MINI_HISTORY_SIZE_MINUS_ONE: i32 = 2047
export const MINI_HISTORY_HEADER_SIZE: i32 = 1
export const MINI_HISTORY_ENTRY_SIZE: i32 = 6 // opIndex, voiceIndex, value, velocity, startSample, endSample
export const MINI_HISTORY_WRITE_POS_OFFSET: i32 = 0
export const MINI_HISTORY_DATA_OFFSET: i32 = 1

export const MINI_ARRAY_HEADER_SIZE: i32 = 2 // length, version
export const MINI_ARRAY_VERSION_INDEX: i32 = 1

export const MINI_EVENT_SIZE: i32 = 7
export const MINI_HEADER_SIZE: i32 = 1
export const MINI_MAX_EVENT_VALUES: i32 = 16

// Operation types
export enum MiniOp {
  Event,
  GroupStart,
  GroupEnd,
  Rest,
  Octave,
  Transpose,
  Scale,
  CycleStart,
  CycleEnd,
  Swing,
}

// Operation sizes (in floats)
export const MINI_GROUP_START_SIZE: i32 = 13 // opcode, childCount, angle, velocity, hold, replicate, elongate, density, offset, jitter, prob, glide, strum
export const MINI_GROUP_END_SIZE: i32 = 1 // opcode
export const MINI_REST_SIZE: i32 = 1 // opcode
export const MINI_OCTAVE_SIZE: i32 = 2 // opcode, deltaOctaves
export const MINI_TRANSPOSE_SIZE: i32 = 2 // opcode, deltaSemitones
export const MINI_SCALE_SIZE: i32 = 3 // opcode, rootMidi, scaleIndex
export const MINI_CYCLE_START_SIZE: i32 = 4 // opcode, pos, loop, childCount
export const MINI_CYCLE_END_SIZE: i32 = 1 // opcode
export const MINI_EVENT_BASE_SIZE: i32 = 12 + MINI_MAX_EVENT_VALUES // opcode, valueCount, values..., velocity, hold, glide, prob, density
export const MINI_SWING_SIZE: i32 = 2 // opcode, amount
