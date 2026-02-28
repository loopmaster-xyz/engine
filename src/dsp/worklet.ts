import { Deferred } from 'utils/deferred'
import { rpc } from 'utils/rpc'
import type * as WasmExports from '../../as/build/index'
import { getSnapshot, track } from '../lib/memory-registry.ts'
import { sampleManager } from '../lib/sample-manager.ts'
import { createWasmImports } from '../lib/wasm-imports.ts'
import { type AudioVm, createAudioVm, createWasmRuntime, type WasmRuntime } from '../lib/wasm-runtime.ts'
import { wasmSetup } from '../lib/wasm-setup.ts'
import { isOpcodeOneParam } from '../live/compiler/opcode.ts'
import { AUDIO_VM_INFO_STRIDE, AudioVmOp, HISTORY_META_STRIDE } from './audio-vm-bindings.ts'
import { CONTROL_OPS_CAPACITY } from './constants.ts'
import type { Dsp } from './dsp.ts'
import { HISTORY_META_SHARED_HEADER } from './history-meta-shared.ts'
import {
  createSharedProgramStateViewsFromBuffer,
  createSharedTransportViewsFromBuffer,
  DspProgramState,
  type ProgramSharedInit,
  SHARED_PROGRAM_STATE_BYTE_LENGTH,
  SharedProgramStateIndex,
  SharedTransportIndex,
  SharedTransportRunningState,
} from './worklet-shared.ts'

export type DspProcessorOptions = { sourcemapUrl: string; config: typeof import('../../asconfig.json') }

export type ProgramRuntime = ReturnType<typeof createProgramRuntime>

const PROGRAM_SWAP_FADE_SAMPLES = 1024

type ProgramVmSlot = {
  vm: AudioVm
  localControlOpsActive: 0 | 1
  controlOpsLength: number
}

type LimiterState = {
  currentGain: number
  lastThreshold: number
  lastRelease: number
  lastSampleRate: number
  releaseCoeff: number
  thresholdLinear: number
}

function createProgramRuntime(opts: {
  vmIds: [number, number]
  vms: [AudioVm, AudioVm]
  id: number
  stateU32: Uint32Array
  stateF32: Float32Array
  bpm: number
  historyMetaBuffers?: [SharedArrayBuffer, SharedArrayBuffer]
}) {
  const stateU32 = opts.stateU32
  const stateF32 = opts.stateF32

  stateU32.fill(0)
  stateF32[SharedProgramStateIndex.Bpm] = opts.bpm
  stateU32[SharedProgramStateIndex.State] = DspProgramState.Stop
  // history pack index/epoch start at 0

  const slots: [ProgramVmSlot, ProgramVmSlot] = [
    { vm: opts.vms[0], localControlOpsActive: 0, controlOpsLength: 0 },
    { vm: opts.vms[1], localControlOpsActive: 0, controlOpsLength: 0 },
  ]

  return {
    vmIds: opts.vmIds,
    slots,
    id: opts.id,
    activeSlot: 0 as 0 | 1,
    gain: 1,
    swapFadeRemaining: 0,
    swapFadeTotal: 0,
    swapFadeFrom: 0 as 0 | 1,
    swapFadeTo: 0 as 0 | 1,
    stateU32,
    stateF32,
    historyMetaBuffers: opts.historyMetaBuffers,
    seekSampleCount: 0,
    get state(): DspProgramState {
      return (stateU32[SharedProgramStateIndex.State] ?? DspProgramState.Stop) as DspProgramState
    },
    set state(v: DspProgramState) {
      stateU32[SharedProgramStateIndex.State] = v
    },
    get sampleCount(): number {
      return Atomics.load(stateU32, SharedProgramStateIndex.SampleCount) >>> 0
    },
    set sampleCount(v: number) {
      Atomics.store(stateU32, SharedProgramStateIndex.SampleCount, v >>> 0)
    },
    set bpm(v: number) {
      stateF32[SharedProgramStateIndex.Bpm] = v
    },
    toSharedInit(): ProgramSharedInit {
      return {
        id: opts.id,
        vmIds: opts.vmIds,
        stateBuffer: stateU32.buffer as SharedArrayBuffer,
        controlOpsCapacity: opts.vms[0].controlOpsCapacity,
        ...(opts.historyMetaBuffers !== undefined && { historyMetaBuffers: opts.historyMetaBuffers }),
      }
    },
    reset(): void {
      slots[0].vm.reset()
      slots[1].vm.reset()
    },
    dispose(): void {
      slots[0].vm.dispose()
      slots[1].vm.dispose()
    },
  }
}

function scanSetBpm(ops: Float32Array, length: number): number {
  const u32 = new Uint32Array(ops.buffer, ops.byteOffset, ops.length)
  const f32 = ops
  let pc = 0
  let bpm = 0
  while (pc < length) {
    const op = u32[pc] ?? 0
    pc++
    if (op === AudioVmOp.SetBpm) {
      bpm = f32[pc] ?? 0
      pc++
      continue
    }
    if (isOpcodeOneParam(op)) pc++
    else if (op === AudioVmOp.PushTryBlock) pc += 3
    else if (op === AudioVmOp.TableLookup) {
      const tableLen = Math.round(f32[pc] ?? 0)
      pc += 1 + Math.max(0, tableLen)
    }
    else if (op === AudioVmOp.DefineFunction) {
      const bytecodeLength = Math.round(f32[pc + 5] ?? 0)
      pc += 6 + Math.max(0, bytecodeLength)
    }
  }
  return bpm
}

function getProgramById(programsById: Map<number, ProgramRuntime>, id: number): ProgramRuntime | null {
  return programsById.get(id) ?? null
}

function clearProgramHistoryMeta(p: ProgramRuntime): void {
  if (!p.historyMetaBuffers) return
  for (const buf of p.historyMetaBuffers) {
    const sharedU32 = new Uint32Array(buf)
    Atomics.store(sharedU32, 0, 1)
    sharedU32[1] = 0
    Atomics.store(sharedU32, 0, 0)
  }
}

function setProgramsState(programsById: Map<number, ProgramRuntime>, state: DspProgramState, ids: number[]): void {
  for (const id of ids) {
    const p = getProgramById(programsById, id)
    if (!p) throw new Error('Program not found with id: ' + id)
    if (state === DspProgramState.Start) clearProgramHistoryMeta(p)
    p.state = state
    if (state !== DspProgramState.Start) {
      p.swapFadeRemaining = 0
      p.swapFadeTotal = 0
    }
  }
}

function applyTransportSeek(
  state: ProcessorState,
  newSampleCount: number,
): void {
  state.transportSeekVersion = state.transportSeekVersion + 1
  state.transportSampleCount = newSampleCount
}

function applyProgramSeek(
  programsById: Map<number, ProgramRuntime>,
  sampleCount: number,
  ids: number[],
): void {
  for (const id of ids) {
    const p = getProgramById(programsById, id)
    if (!p) throw new Error('Program not found with id: ' + id)
    p.sampleCount = p.seekSampleCount = sampleCount
  }
}

function copyHistoryMetaToProgramShared(
  runtime: WasmRuntime,
  p: ProgramRuntime,
  vm: AudioVm,
  info?: Uint32Array,
): void {
  if (!p.historyMetaBuffers) return
  const view = info ?? new Uint32Array(runtime.buffer, vm.infoPtr, 10)
  const historyMetaPtr = view[5] ?? 0
  const historyCount = view[6] ?? 0
  if (historyCount <= 0 || historyMetaPtr <= 0) return
  const currentIndex = Atomics.load(p.stateU32, SharedProgramStateIndex.HistoryPackIndex) >>> 0
  const nextIndex = currentIndex ^ 1
  const sharedU32 = new Uint32Array(p.historyMetaBuffers[nextIndex])
  if (Atomics.compareExchange(sharedU32, 0, 0, 1) !== 0) return
  sharedU32[1] = historyCount
  const len = historyCount * HISTORY_META_STRIDE
  const wasmMeta = new Uint32Array(runtime.buffer, historyMetaPtr, len)
  for (let i = 0; i < len; i++) sharedU32[HISTORY_META_SHARED_HEADER + i] = wasmMeta[i]
  Atomics.store(sharedU32, 0, 0)
  Atomics.store(p.stateU32, SharedProgramStateIndex.HistoryPackIndex, nextIndex)
  Atomics.add(p.stateU32, SharedProgramStateIndex.HistoryPackEpoch, 1)
}

function runProgram(
  runtime: WasmRuntime,
  nyquist: number,
  piOverNyquist: number,
  bpmOverrideValue: number,
  bpm: number,
  p: ProgramRuntime,
  slot: ProgramVmSlot,
  bufferLength: number,
  sampleCount: number,
  outputL: Float32Array,
  outputR: Float32Array,
  gain: number,
  copyHistory: boolean,
): void {
  const audioOpsPtr = slot.localControlOpsActive === 0 ? slot.vm.localControlOpsPtr0 : slot.vm.localControlOpsPtr1
  runtime.runAudioVmAt(
    slot.vm.id,
    audioOpsPtr,
    slot.controlOpsLength,
    bufferLength,
    sampleCount,
    sampleRate,
    nyquist,
    piOverNyquist,
    bpmOverrideValue || bpm,
  )
  const infoPtr = slot.vm.infoPtr
  const info = new Uint32Array(runtime.buffer, infoPtr, 10)
  if (copyHistory) copyHistoryMetaToProgramShared(runtime, p, slot.vm, info)
  const outputLeftPtr = info[8] ?? 0
  const outputRightPtr = info[9] ?? 0
  if (!outputLeftPtr || !outputRightPtr) {
    return
  }
  const audioL = new Float32Array(runtime.buffer, outputLeftPtr, bufferLength)
  const audioR = new Float32Array(runtime.buffer, outputRightPtr, bufferLength)
  for (let i = 0; i < bufferLength; i++) {
    outputL[i] = (outputL[i] ?? 0) + (audioL[i] ?? 0) * gain
    outputR[i] = (outputR[i] ?? 0) + (audioR[i] ?? 0) * gain
  }
}

export type ProcessorState = Awaited<ReturnType<typeof createProcessorState>>

export async function createProcessorState(
  binary: ArrayBuffer,
  opts: { sourcemapUrl: string; config: typeof import('../../asconfig.json'); transportBuffer: SharedArrayBuffer },
) {
  const core = await wasmSetup<typeof WasmExports>({
    binary,
    config: opts.config,
    sourcemapUrl: opts.sourcemapUrl,
    imports: ({ memory }) => createWasmImports(memory),
  })
  let memoryBuffer = core.wasm.memory.buffer
  const transportBuffer = opts.transportBuffer
  const t = createSharedTransportViewsFromBuffer(transportBuffer)
  const transportU32 = t.u32
  const transportF32 = t.f32
  const programsByVmId = new Map<number, ProgramRuntime>()
  const programsById = new Map<number, ProgramRuntime>()
  const runtime = createWasmRuntime(core)
  const sampleCountRef = { value: 0 }
  const bpmRef = { value: 120.0 }
  const bpmOverrideValueRef = { value: 0 }
  const quantumRef = { value: 128 }
  const nyquist = sampleRate * 0.5
  const piOverNyquist = Math.PI / nyquist
  const PREVIEW_SEEK_CHUNKS = 32
  let scheduleProgramsSeek: number[] = []
  let scheduleProgramsSeekChunks = 0
  const limiterThresholdDb = 0
  const limiterReleaseSeconds = 0.1
  const limiterL: LimiterState = {
    currentGain: 1,
    lastThreshold: Infinity,
    lastRelease: Infinity,
    lastSampleRate: Infinity,
    releaseCoeff: 0,
    thresholdLinear: 1,
  }
  const limiterR: LimiterState = {
    currentGain: 1,
    lastThreshold: Infinity,
    lastRelease: Infinity,
    lastSampleRate: Infinity,
    releaseCoeff: 0,
    thresholdLinear: 1,
  }
  let hadError = false
  let wasPlaying = false
  let isPlaying = false
  let idsNowPlaying = new Set<number>()
  let idsWasPlaying = new Set<number>()

  // let count = 0

  function applyLimiter(
    buffer: Float32Array,
    state: LimiterState,
  ): void {
    const thresholdClamped = Math.max(-80, Math.min(limiterThresholdDb, 0))
    const releaseClamped = Math.max(0.0001, Math.min(limiterReleaseSeconds, 5))
    const thresholdChanged = thresholdClamped !== state.lastThreshold
    const releaseChanged = releaseClamped !== state.lastRelease
    const sampleRateChanged = sampleRate !== state.lastSampleRate

    if (thresholdChanged) {
      const th = Math.max(-80, Math.min(thresholdClamped, 0))
      state.thresholdLinear = 10 ** (th / 20)
      state.lastThreshold = thresholdClamped
    }

    if (releaseChanged) {
      state.lastRelease = releaseClamped
    }

    if (releaseChanged || sampleRateChanged) {
      const rel = Math.max(0.0001, Math.min(releaseClamped, 5))
      state.releaseCoeff = Math.exp(-3 / (rel * sampleRate))
      state.lastSampleRate = sampleRate
    }

    let currentGain = state.currentGain
    const thresholdLinear = state.thresholdLinear
    const releaseCoeff = state.releaseCoeff
    const len = buffer.length

    for (let i = 0; i < len; i++) {
      const input = buffer[i] ?? 0
      const inputLevel = Math.abs(input)
      const targetGain = inputLevel > thresholdLinear ? thresholdLinear / inputLevel : 1

      if (currentGain > targetGain) {
        currentGain = targetGain + (currentGain - targetGain) * releaseCoeff
      }
      else {
        currentGain = targetGain
      }

      currentGain = Math.max(0, Math.min(1, currentGain))

      let outSample = input * currentGain
      if (Math.abs(outSample) > thresholdLinear) {
        outSample = thresholdLinear * Math.sign(outSample || 1)
        currentGain = targetGain
      }

      buffer[i] = outSample
    }

    state.currentGain = currentGain
  }

  function processBuffer(outputs: Float32Array[][], dsp: Dsp | null): boolean {
    const bufferLength = outputs[0]?.[0]?.length ?? 0
    const outputL = outputs[0]?.[0]
    const outputR = outputs[0]?.[1] ?? outputL
    if (!outputL || !outputR || bufferLength <= 0) {
      wasPlaying = false
      isPlaying = false
      return true
    }
    quantumRef.value = bufferLength

    // count++
    // if (count % 375 === 0) {
    //   core.wasm.__collect()
    // }

    let scheduleRefresh = false

    const memoryGrew = memoryBuffer !== core.wasm.memory.buffer
    if (memoryGrew) {
      memoryBuffer = core.wasm.memory.buffer
      scheduleRefresh = true
    }

    if (state.transportStopAndSeekToZero !== 0) {
      state.transportStopAndSeekToZero = 0
      state.transportRunning = SharedTransportRunningState.Stop
      state.transportActuallyPlaying = SharedTransportRunningState.Stop
      applyTransportSeek(state, 0)
      setProgramsState(programsById, DspProgramState.Stop, state.scheduleStopAndSeekToZero)
      applyProgramSeek(programsById, 0, state.scheduleStopAndSeekToZero)
      state.scheduleStopAndSeekToZero = []
      core.wasm.__collect()
      for (const p of programsById.values()) {
        const slot = p.slots[p.activeSlot]
        copyHistoryMetaToProgramShared(runtime, p, slot.vm)
        slot.vm.softReset()
      }
      wasPlaying = false
      isPlaying = false
      return true
    }
    const seekVersion = state.transportSeekVersion
    const next = Math.round(state.transportSampleCount)
    if (seekVersion !== state.transportSeekVersion) {
      state.transportSeekVersion = seekVersion
      state.sampleCount = next
      for (const p of programsById.values()) p.sampleCount = next
    }
    const running = state.transportRunning === SharedTransportRunningState.Start
    if (!running && !scheduleProgramsSeekChunks) {
      state.transportActuallyPlaying = state.transportRunning
      state.transportSampleCount = state.sampleCount
      if (wasPlaying) {
        for (const p of programsById.values()) {
          const slot = p.slots[p.activeSlot]
          copyHistoryMetaToProgramShared(runtime, p, slot.vm)
        }
        // core.wasm.__collect()
      }
      wasPlaying = false
      isPlaying = false
      return true
    }
    state.transportActuallyPlaying = state.transportRunning

    try {
      for (const p of programsById.values()) {
        const activeSlot = p.slots[p.activeSlot]
        if ((p.state !== DspProgramState.Start || activeSlot.controlOpsLength <= 0)
          && !scheduleProgramsSeek.includes(p.id))
        {
          const slot = p.slots[p.activeSlot]
          copyHistoryMetaToProgramShared(runtime, p, slot.vm)
          const pending = pendingProgramApplied.get(p.id)
          const pendingSlot = pendingProgramAppliedSlot.get(p.id)
          if (pending && pendingSlot === p.activeSlot) {
            pendingProgramApplied.delete(p.id)
            pendingProgramAppliedSlot.delete(p.id)
            pending.resolve()
          }
          continue
        }
        const advanceSampleCount = !scheduleProgramsSeekChunks
        const baseSampleCount = advanceSampleCount ? p.sampleCount : p.seekSampleCount
        if (p.swapFadeRemaining > 0) {
          const from = p.swapFadeFrom
          const to = p.swapFadeTo
          const remaining = p.swapFadeRemaining
          const total = p.swapFadeTotal || 1
          const t = Math.min(1, Math.max(0, (total - remaining) / total))
          runProgram(
            runtime,
            nyquist,
            piOverNyquist,
            bpmOverrideValueRef.value,
            bpmRef.value,
            p,
            p.slots[from],
            bufferLength,
            baseSampleCount,
            outputL,
            outputR,
            (1 - t) * (p.gain || 0),
            false,
          )
          runProgram(
            runtime,
            nyquist,
            piOverNyquist,
            bpmOverrideValueRef.value,
            bpmRef.value,
            p,
            p.slots[to],
            bufferLength,
            baseSampleCount,
            outputL,
            outputR,
            t * (p.gain || 0),
            true,
          )
          p.swapFadeRemaining = Math.max(0, p.swapFadeRemaining - bufferLength)
        }
        else {
          runProgram(
            runtime,
            nyquist,
            piOverNyquist,
            bpmOverrideValueRef.value,
            bpmRef.value,
            p,
            p.slots[p.activeSlot],
            bufferLength,
            baseSampleCount,
            outputL,
            outputR,
            p.gain || 0,
            true,
          )
        }
        if (advanceSampleCount) {
          p.sampleCount = baseSampleCount + bufferLength
          if (state.loopBeginSamples >= 0 && state.loopEndSamples > 0) {
            if (p.sampleCount >= state.loopEndSamples) {
              p.sampleCount = state.loopBeginSamples + (p.sampleCount - state.loopEndSamples)
            }
          }
          if (state.projectEndSamples > 0) {
            if (p.sampleCount >= state.projectEndSamples) {
              p.sampleCount = 0 + (p.sampleCount - state.projectEndSamples)
            }
          }
        }
        else {
          p.seekSampleCount = baseSampleCount + bufferLength
        }
        const pending = pendingProgramApplied.get(p.id)
        const pendingSlot = pendingProgramAppliedSlot.get(p.id)
        if (pending && pendingSlot === p.activeSlot) {
          pendingProgramApplied.delete(p.id)
          pendingProgramAppliedSlot.delete(p.id)
          pending.resolve()
        }
        idsNowPlaying.add(p.id)
        isPlaying = true
      }

      applyLimiter(outputL, limiterL)
      applyLimiter(outputR, limiterR)

      if (hadError) {
        hadError = false
        void dsp?.setWorkletError(null)
      }
    }
    catch (error) {
      console.error(error)
      if (error instanceof Error && !hadError) {
        hadError = true
        void dsp?.setWorkletError(error.message.split(' in ')[0])
      }
    }

    if (scheduleProgramsSeekChunks && !--scheduleProgramsSeekChunks) {
      scheduleProgramsSeek = []
      scheduleRefresh = true
    }

    state.sampleCount = state.sampleCount + bufferLength
    if (state.loopBeginSamples >= 0 && state.loopEndSamples > 0) {
      if (state.sampleCount >= state.loopEndSamples) {
        state.sampleCount = state.loopBeginSamples + (state.sampleCount - state.loopEndSamples)
      }
    }
    if (state.projectEndSamples > 0) {
      if (state.sampleCount >= state.projectEndSamples) {
        state.sampleCount = 0 + (state.sampleCount - state.projectEndSamples)
      }
    }
    state.transportSampleCount = state.sampleCount

    if (idsNowPlaying.symmetricDifference(idsWasPlaying).size !== 0) {
      scheduleRefresh = true
      idsWasPlaying = new Set(idsNowPlaying)
      idsNowPlaying.clear()
    }

    if (isPlaying && !wasPlaying) {
      scheduleRefresh = true
      wasPlaying = true
    }

    if (scheduleRefresh) void dsp?.refresh()

    return true
  }

  function disposePrograms(programsByVmId: Map<number, ProgramRuntime>): void {
    const seen = new Set<ProgramRuntime>()
    for (const p of programsByVmId.values()) {
      if (seen.has(p)) continue
      seen.add(p)
      p.dispose()
    }
  }

  function dispose() {
    disposePrograms(programsByVmId)
  }

  const pendingProgramApplied = new Map<number, ReturnType<typeof Deferred<void>>>()
  const pendingProgramAppliedSlot = new Map<number, 0 | 1>()

  const state = {
    dispose,
    runtime,
    programsByVmId,
    programsById,
    pendingProgramApplied,
    pendingProgramAppliedSlot,
    nextProgramId: 0,
    nextId: 0,
    freeProgramIds: [] as number[],
    transportU32,
    transportF32,
    nyquist,
    piOverNyquist,

    scheduleStopAndSeekToZero: [] as number[],

    get transportSampleCount(): number {
      return transportF32[SharedTransportIndex.SampleCount]
    },
    set transportSampleCount(v: number) {
      transportF32[SharedTransportIndex.SampleCount] = v
    },
    get transportRunning(): number {
      return Atomics.load(transportU32, SharedTransportIndex.Running)
    },
    set transportRunning(v: number) {
      Atomics.store(transportU32, SharedTransportIndex.Running, v)
    },
    get transportSeekVersion(): number {
      return Atomics.load(transportU32, SharedTransportIndex.SeekVersion)
    },
    set transportSeekVersion(v: number) {
      Atomics.store(transportU32, SharedTransportIndex.SeekVersion, v)
    },
    get transportStopAndSeekToZero(): number {
      return Atomics.load(transportU32, SharedTransportIndex.StopAndSeekToZero)
    },
    set transportStopAndSeekToZero(v: number) {
      Atomics.store(transportU32, SharedTransportIndex.StopAndSeekToZero, v)
    },
    get transportActuallyPlaying(): number {
      return Atomics.load(transportU32, SharedTransportIndex.ActuallyPlaying)
    },
    set transportActuallyPlaying(v: number) {
      Atomics.store(transportU32, SharedTransportIndex.ActuallyPlaying, v)
    },
    get loopBeginSamples(): number {
      return Atomics.load(transportU32, SharedTransportIndex.LoopBeginSamples)
    },
    get loopEndSamples(): number {
      return Atomics.load(transportU32, SharedTransportIndex.LoopEndSamples)
    },
    get projectEndSamples(): number {
      return Atomics.load(transportU32, SharedTransportIndex.ProjectEndSamples)
    },
    get sampleCount(): number {
      return sampleCountRef.value
    },
    set sampleCount(v: number) {
      sampleCountRef.value = v
    },
    get bpm(): number {
      return bpmRef.value
    },
    set bpm(v: number) {
      bpmRef.value = v
    },
    get quantum(): number {
      return quantumRef.value
    },
    set quantum(v: number) {
      quantumRef.value = v
    },
    get bpmOverrideValue(): number {
      return bpmOverrideValueRef.value
    },
    set bpmOverrideValue(v: number) {
      bpmOverrideValueRef.value = v
    },
    getProgramById(id: number): ProgramRuntime | null {
      return getProgramById(programsById, id)
    },
    applyControlOps(p: ProgramRuntime, slot: 0 | 1, ops: Float32Array): void {
      const target = p.slots[slot]
      const max = target.vm.controlOpsCapacity >>> 0
      const len = Math.min(ops.length, max)
      const nextPtr = target.localControlOpsActive === 0 ? target.vm.localControlOpsPtr1 : target.vm.localControlOpsPtr0
      const nextOps = new Float32Array(runtime.buffer, nextPtr, max)
      if (len > 0) nextOps.set(ops.subarray(0, len))
      target.controlOpsLength = len
      target.localControlOpsActive = target.localControlOpsActive === 0 ? 1 : 0
      if (!bpmOverrideValueRef.value && len > 0) {
        const nextBpm = scanSetBpm(nextOps, len)
        if (nextBpm && nextBpm !== bpmRef.value) {
          bpmRef.value = nextBpm
          for (const other of programsById.values()) other.bpm = nextBpm
        }
      }
    },
    setProgramsState(state: DspProgramState, ids: number[]): void {
      setProgramsState(programsById, state, ids)
    },
    applyTransportSeek(sampleCount: number): void {
      applyTransportSeek(state, sampleCount)
    },
    applyProgramSeek(sampleCount: number, ids: number[], preview: boolean): void {
      applyProgramSeek(programsById, sampleCount, ids)
      if (preview) {
        scheduleProgramsSeek = ids
        scheduleProgramsSeekChunks = PREVIEW_SEEK_CHUNKS
      }
    },
    processBuffer(_inputs: Float32Array[][], outputs: Float32Array[][], dsp: Dsp | null): boolean {
      return processBuffer(outputs, dsp)
    },
  }

  return state
}

export class DspProcessor extends AudioWorkletProcessor {
  private sourcemapUrl: string
  private state: ProcessorState | null = null
  private dsp: Dsp | null = null

  private config: DspProcessorOptions['config']
  constructor(options: Omit<AudioWorkletNodeOptions, 'processorOptions'> & { processorOptions: DspProcessorOptions }) {
    super()
    this.sourcemapUrl = options.processorOptions.sourcemapUrl
    this.config = options.processorOptions.config
    this.dsp = rpc<Dsp>(this.port, this)
  }

  async loadWasm(binary: ArrayBuffer, opts: { transportBuffer: SharedArrayBuffer }): Promise<void> {
    if (this.state) {
      this.state.dispose()
      this.state = null
    }
    this.state = await createProcessorState(binary, {
      sourcemapUrl: this.sourcemapUrl,
      config: this.config,
      transportBuffer: opts.transportBuffer,
    })
  }

  async getMemory() {
    if (!this.state) throw new Error('No state')
    return this.state.runtime.memory
  }

  async memoryGrow(delta: number): Promise<number> {
    return this.state ? this.state.runtime.memoryGrow(delta) : 0
  }

  async getStats(opts?: { programId?: number }): Promise<Record<string, number | boolean | object | null>> {
    const s = this.state
    if (!s) {
      return {
        memoryUsage: 0,
        hasCore: false,
        sampleCount: 0,
        bpm: 120,
        bpmOverride: 0,
        programCount: 0,
        programId: opts?.programId ?? 0,
        programState: 0,
        controlOpsLength: 0,
        programSampleCount: 0,
        vmDebug: null,
      }
    }
    const id = opts?.programId ?? 0
    const p = s.getProgramById(id)
    let vmDebug: Record<string, number> | null = null
    if (p) {
      const vm = p.slots[p.activeSlot].vm
      const infoPtr = s.runtime.getAudioVmInfoPtr(vm.id)
      const info = new Uint32Array(s.runtime.buffer, infoPtr, AUDIO_VM_INFO_STRIDE)
      vmDebug = {
        arenaAllocated: info[10] ?? 0,
        arenaReused: info[11] ?? 0,
        arenaReleased: info[12] ?? 0,
        arenaInFlight: info[13] ?? 0,
        arenaPCap: info[14] ?? 0,
        arenaPCount: info[15] ?? 0,
        arenaPTomb: info[16] ?? 0,
        arenaBucketsLen: info[17] ?? 0,
        cellsLength: info[18] ?? 0,
        globalsLength: info[19] ?? 0,
        stackTop: info[20] ?? 0,
        callStackLength: info[21] ?? 0,
        upsampleCacheSize: info[22] ?? 0,
        pendingReleaseAudioSize: info[23] ?? 0,
        genPoolSlots: info[24] ?? 0,
        genPoolsLength: info[25] ?? 0,
        bufferRegistrySize: info[26] ?? 0,
        arraysLength: info[27] ?? 0,
        arenaFreed: info[28] ?? 0,
      }
    }
    return {
      memoryUsage: s.runtime.memoryUsage() / 1024 / 1024,
      hasCore: true,
      sampleCount: s.sampleCount,
      bpm: s.bpm,
      bpmOverride: s.bpmOverrideValue,
      programCount: s.programsById.size,
      programId: id,
      programState: p ? p.state : 0,
      controlOpsLength: p ? p.slots[p.activeSlot].controlOpsLength : 0,
      programSampleCount: p ? p.sampleCount : 0,
      vmDebug,
    }
  }

  async allocateProgramId(): Promise<number> {
    const s = this.state
    if (!s) return 0
    if (s.freeProgramIds.length > 0) return s.freeProgramIds.pop()!
    return s.nextProgramId++
  }

  async initProgramSlot(opts: {
    historyMetaBuffers?: [SharedArrayBuffer, SharedArrayBuffer]
    stateBuffer?: SharedArrayBuffer
  }): Promise<ProgramSharedInit | null> {
    const s = this.state
    if (!s) return null
    const vmId0 = await this.allocateProgramId()
    const vmId1 = await this.allocateProgramId()
    const stateBuffer = opts.stateBuffer ?? (() => {
      track(`sab-state-${vmId0}`, 'SharedArrayBuffer', SHARED_PROGRAM_STATE_BYTE_LENGTH, {
        source: 'worklet:initProgramSlot',
      })
      return new SharedArrayBuffer(SHARED_PROGRAM_STATE_BYTE_LENGTH)
    })()
    const sharedState = createSharedProgramStateViewsFromBuffer(stateBuffer)

    const controlOpsCapacity = CONTROL_OPS_CAPACITY
    const id = s.nextId++
    const historyMetaBuffers = opts.historyMetaBuffers

    const vm0 = createAudioVm(s.runtime, vmId0, controlOpsCapacity)
    const vm1 = createAudioVm(s.runtime, vmId1, controlOpsCapacity)

    const runtime = createProgramRuntime({
      vmIds: [vmId0, vmId1],
      vms: [vm0, vm1],
      id,
      stateU32: sharedState.u32,
      stateF32: sharedState.f32,
      bpm: s.bpm,
      historyMetaBuffers,
    })

    s.programsByVmId.set(vm0.id, runtime)
    s.programsByVmId.set(vm1.id, runtime)
    s.programsById.set(runtime.id, runtime)

    return runtime.toSharedInit()
  }

  async disposeProgram(opts: { programId: number }): Promise<void> {
    const s = this.state
    if (!s) throw new Error('No state')

    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)

    p.reset()
    s.programsByVmId.delete(p.slots[0].vm.id)
    s.programsByVmId.delete(p.slots[1].vm.id)
    s.programsById.delete(p.id)
    p.dispose()
    s.freeProgramIds.push(p.slots[0].vm.id)
    s.freeProgramIds.push(p.slots[1].vm.id)
  }

  async setProgramSync(_opts: { programId: number; enabled: boolean; bars: number }): Promise<void> {}

  async getProgramShared(opts: { programId: number }) {
    const s = this.state
    if (!s) throw new Error('No state')

    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)

    return p.toSharedInit()
  }

  async setControlOps(opts: {
    programId: number
    ops: Float32Array
  }): Promise<void> {
    const s = this.state
    if (!s) throw new Error('No state')

    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)

    s.applyControlOps(p, p.activeSlot, opts.ops)
    const transportPlaying = s.transportRunning === SharedTransportRunningState.Start
    if (p.state !== DspProgramState.Start || !transportPlaying) {
      return
    }
    const deferred = Deferred<void>()
    s.pendingProgramApplied.set(p.id, deferred)
    s.pendingProgramAppliedSlot.set(p.id, p.activeSlot)
    return deferred.promise
  }

  async setControlOpsSwap(opts: {
    programId: number
    ops: Float32Array
    fadeSamples?: number
  }): Promise<void> {
    const s = this.state
    if (!s) throw new Error('No state')

    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)

    const from = p.activeSlot
    const to = (from ^ 1) as 0 | 1
    s.runtime.copyAudioVmState(p.slots[from].vm.id, p.slots[to].vm.id)
    s.applyControlOps(p, to, opts.ops)

    const transportPlaying = s.transportRunning === SharedTransportRunningState.Start
    if (p.state === DspProgramState.Start && transportPlaying) {
      const fadeSamples = Math.max(0, Math.round(opts.fadeSamples ?? PROGRAM_SWAP_FADE_SAMPLES))
        || PROGRAM_SWAP_FADE_SAMPLES
      p.swapFadeFrom = from
      p.swapFadeTo = to
      p.swapFadeRemaining = fadeSamples
      p.swapFadeTotal = fadeSamples
      p.activeSlot = to
    }
    else {
      p.swapFadeRemaining = 0
      p.swapFadeTotal = 0
      p.activeSlot = to
    }

    if (p.state !== DspProgramState.Start || !transportPlaying) {
      return
    }
    const deferred = Deferred<void>()
    s.pendingProgramApplied.set(p.id, deferred)
    s.pendingProgramAppliedSlot.set(p.id, p.activeSlot)
    return deferred.promise
  }

  async getVmInfoPtr(
    opts: { programId: number },
  ): Promise<{ vmId: number; infoPtr: number }> {
    const s = this.state
    if (!s) throw new Error('No state')

    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)

    const vm = p.slots[p.activeSlot].vm
    return {
      vmId: vm.id,
      infoPtr: vm.infoPtr,
    }
  }

  async getMemoryInfo() {
    return {
      snapshot: getSnapshot(),
      samples: sampleManager.getSampleMemoryInfo(),
    }
  }

  async getRequiredSamples(): Promise<
    { handle: number; freesoundId?: number; recordSeconds?: number; recordCallbackId?: number }[]
  > {
    const required: { handle: number; freesoundId?: number; recordSeconds?: number; recordCallbackId?: number }[] = []
    for (const handle of sampleManager.getRequiredSamples()) {
      const req = sampleManager.getRecordRequest(handle)
      required.push({
        handle,
        freesoundId: sampleManager.getFreesoundId(handle),
        recordSeconds: req?.seconds,
        recordCallbackId: req?.callbackId,
      })
    }
    return required
  }

  async setSampleData(opts: { handle: number; channels: SharedArrayBuffer[]; sampleRate: number }): Promise<void> {
    const channels = opts.channels.map(sab => new Float32Array(sab))
    sampleManager.setSampleData(opts.handle, channels, opts.sampleRate)
  }

  async setSampleError(opts: { handle: number; error: string }): Promise<void> {
    sampleManager.setSampleError(opts.handle, opts.error)
  }

  async connectRecord(port: MessagePort): Promise<void> {
    rpc(port, this)
    port.start()
  }

  async setSampleDataDirect(opts: { handle: number; channels: Float32Array[]; sampleRate: number }): Promise<void> {
    sampleManager.setSampleData(opts.handle, opts.channels, opts.sampleRate)
  }

  async setSampleErrorDirect(opts: { handle: number; error: string }): Promise<void> {
    sampleManager.setSampleError(opts.handle, opts.error)
  }

  async syncSampleRegistrations(opts: {
    registrations: Array<{
      handle: number
      type: 'freesound' | 'record' | 'inline' | 'espeak'
      freesoundId?: number
      recordSeconds?: number
      recordCallbackId?: number
    }>
    invalidatedHandles?: number[]
  }): Promise<void> {
    if (opts.invalidatedHandles) {
      for (const handle of opts.invalidatedHandles) sampleManager.clearHandle(handle)
    }
    for (const reg of opts.registrations) {
      if (reg.type === 'freesound' && reg.freesoundId !== undefined) {
        sampleManager.ensureFreesoundHandle(reg.handle, reg.freesoundId)
      }
      else if (reg.type === 'record' && reg.recordSeconds !== undefined && reg.recordCallbackId !== undefined) {
        sampleManager.ensureRecordHandle(reg.handle, reg.recordSeconds, reg.recordCallbackId)
      }
      else if (reg.type === 'inline' || reg.type === 'espeak') {
        sampleManager.ensureInlineHandle(reg.handle)
      }
    }
  }

  async bpmOverride(opts: { bpm: number }): Promise<void> {
    const s = this.state
    if (!s) return
    s.bpmOverrideValue = Number(opts.bpm) || 0
    s.runtime.setBpmOverride(s.bpmOverrideValue)
    if (s.bpmOverrideValue) s.bpm = s.bpmOverrideValue
  }

  getInits() {
    const s = this.state
    if (!s) throw new Error('No state')
    const inits: ProgramSharedInit[] = []
    for (const p of s.programsById.values()) inits.push(p.toSharedInit())
    return inits
  }

  async start(programIds: number[]) {
    const s = this.state
    if (!s) throw new Error('No state')
    s.setProgramsState(DspProgramState.Start, programIds)
    s.transportRunning = SharedTransportRunningState.Start
    return this.getInits()
  }

  async stop(programIds: number[]) {
    const s = this.state
    if (!s) throw new Error('No state')
    s.scheduleStopAndSeekToZero = programIds
    s.transportStopAndSeekToZero = 1
    s.transportRunning = SharedTransportRunningState.Stop
    return this.getInits()
  }

  async pause(programIds: number[]) {
    const s = this.state
    if (!s) throw new Error('No state')
    s.setProgramsState(DspProgramState.Pause, programIds)
    if ([...s.programsById.values()].filter(p => p.state === DspProgramState.Start).every(p =>
      programIds.includes(p.id)
    )) {
      s.transportRunning = SharedTransportRunningState.Pause
    }
    return this.getInits()
  }

  async seek(opts: {
    sampleCount: number
    programIds: number[]
    preview: boolean
  }) {
    const s = this.state
    if (!s) throw new Error('No state')
    s.applyTransportSeek(opts.sampleCount)
    s.applyProgramSeek(opts.sampleCount, opts.programIds, opts.preview)
    return this.getInits()
  }

  async seekPrograms(opts: {
    sampleCount: number
    programIds: number[]
    preview: boolean
  }) {
    const s = this.state
    if (!s) throw new Error('No state')
    s.applyProgramSeek(opts.sampleCount, opts.programIds, opts.preview)
    return this.getInits()
  }

  async setProgramGain(opts: { programId: number; gain: number }): Promise<void> {
    const s = this.state
    if (!s) throw new Error('No state')
    const p = s.getProgramById(opts.programId)
    if (!p) throw new Error('Program not found with id: ' + opts.programId)
    p.gain = Number(opts.gain) || 0
  }

  async swapPrograms(programIds1: number[], programIds2: number[]): Promise<ProgramSharedInit[]> {
    const s = this.state
    if (!s) throw new Error('No state')
    s.setProgramsState(DspProgramState.Stop, programIds1)
    s.setProgramsState(DspProgramState.Start, programIds2)
    return this.getInits()
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const s = this.state
    if (!s) return true
    return s.processBuffer(_inputs, outputs, this.dsp ?? null)
  }
}

registerProcessor('dsp', DspProcessor)
