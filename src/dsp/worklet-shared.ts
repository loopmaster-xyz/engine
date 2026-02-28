export enum DspProgramState {
  Stop,
  Start,
  Pause,
}

export const SHARED_PROGRAM_STATE_SLOTS = 5
export const SHARED_PROGRAM_STATE_BYTE_LENGTH = SHARED_PROGRAM_STATE_SLOTS * 4

export enum SharedProgramStateIndex {
  HistoryPackIndex,
  HistoryPackEpoch,
  Bpm,
  State,
  SampleCount,
}

export type SharedProgramStateViews = {
  u32: Uint32Array
  f32: Float32Array
}

export function createSharedProgramStateViewsFromBuffer(
  buffer: ArrayBufferLike,
  byteOffset = 0,
): SharedProgramStateViews {
  return {
    u32: new Uint32Array(buffer, byteOffset, SHARED_PROGRAM_STATE_SLOTS),
    f32: new Float32Array(buffer, byteOffset, SHARED_PROGRAM_STATE_SLOTS),
  }
}

export enum SharedTransportRunningState {
  Stop,
  Start,
  Pause,
}

export const SHARED_TRANSPORT_SLOTS = 9
export const SHARED_TRANSPORT_BYTE_LENGTH = SHARED_TRANSPORT_SLOTS * 4

export enum SharedTransportIndex {
  SampleCount,
  Running,
  SeekVersion,
  StopAndSeekToZero,
  ActuallyPlaying,
  HistorySyncRequested,
  LoopBeginSamples,
  LoopEndSamples,
  ProjectEndSamples,
}

export type SharedTransportViews = {
  u32: Uint32Array
  f32: Float32Array
}

export function createSharedTransportViewsFromBuffer(
  buffer: ArrayBufferLike,
  byteOffset = 0,
): SharedTransportViews {
  return {
    u32: new Uint32Array(buffer, byteOffset, SHARED_TRANSPORT_SLOTS),
    f32: new Float32Array(buffer, byteOffset, SHARED_TRANSPORT_SLOTS),
  }
}

export type ProgramSharedInit = {
  id: number
  /** Each program owns 2 AudioVm ids (double-buffered). */
  vmIds: [number, number]
  stateBuffer: SharedArrayBuffer
  controlOpsCapacity: number
  /** Double-buffered history meta slots (two packs). */
  historyMetaBuffers?: [SharedArrayBuffer, SharedArrayBuffer]
}
