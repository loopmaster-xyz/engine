import { atomic } from '../lib/atomic.ts'
import { hashF32Bits } from '../lib/bytecode-hash.ts'
import { track } from '../lib/memory-registry.ts'
import { sampleManager } from '../lib/sample-manager.ts'
import type { HistorySourceMap, RecordCallback } from '../live/compiler/index.ts'
import type { SampleRegistration } from '../live/compiler/types.ts'
import { controlPipeline } from '../live/pipeline.ts'
import type { TypedHistory } from './audio-vm-bindings.ts'
import type { UserCallHistory } from './audio-vm-helpers.ts'
import { AudioVmHistoryView, AudioVmView, createTypedHistories } from './audio-vm-helpers.ts'
import { createDspLatency } from './dsp-latency.ts'
import type { DspState } from './dsp-state.ts'
import { fetchEspeakSample, fetchRequiredSamples } from './fetch-samples.ts'
import { bindProgramShared, bytecodeStructureHash, hashCallbackBytecode, type SharedProgramViews } from './helpers.ts'
import type { RecordWorker } from './record-worker.ts'
import {
  DspProgramState,
  SharedProgramStateIndex,
} from './worklet-shared.ts'
import type { DspProcessor as DspWorklet } from './worklet.ts'

let _mainBytecodeTempId = 0

async function setControlOps(
  dspState: DspState,
  worklet: DspWorklet,
  program: DspProgram,
  ops: Float32Array,
) {
  const stale = dspState.isProgramSharedStale(program.shared.bufferRef)
  if (stale) {
    const init = await worklet.getProgramShared({ programId: program.shared.id })
    if (init) program.shared = bindProgramShared(dspState.buffer!, init, program.shared.historyMetaU32)
  }
  if (ops.length > program.shared.controlOpsCapacity) {
    throw new Error(`Control ops length ${ops.length} exceeds capacity ${program.shared.controlOpsCapacity}`)
  }
  await worklet.setControlOps({
    programId: program.shared.id,
    ops,
  })
  program.lastOps = ops
}

async function setControlOpsSwap(
  dspState: DspState,
  worklet: DspWorklet,
  program: DspProgram,
  ops: Float32Array,
) {
  const stale = dspState.isProgramSharedStale(program.shared.bufferRef)
  if (stale) {
    const init = await worklet.getProgramShared({ programId: program.shared.id })
    if (init) program.shared = bindProgramShared(dspState.buffer!, init, program.shared.historyMetaU32)
  }
  if (ops.length > program.shared.controlOpsCapacity) {
    throw new Error(`Control ops length ${ops.length} exceeds capacity ${program.shared.controlOpsCapacity}`)
  }
  await worklet.setControlOpsSwap({
    programId: program.shared.id,
    ops,
  })
  program.lastOps = ops
}

function compileAndValidate(src: string, opts?: { projectId?: string | null }) {
  const result = controlPipeline.compileSource(src, opts)
  if (result.errors.length > 0) console.error(new Error(result.errors.join('\n') || 'compilation failed'))
  if (!result.compile.bytecode) console.error(new Error('No bytecode generated'))
  return result
}

function applyCompileState(result: Awaited<ReturnType<typeof controlPipeline.compileSource>>) {
  const mainBytecode = result.compile.bytecode!
  const historySourceMap = (result.compile.historySourceMap || []) as HistorySourceMap[]
  const functionReturnPcs = result.compile.functionReturnPcs ?? {}
  const structureHash = bytecodeStructureHash(mainBytecode)
  const arrayGetHistoryCount = historySourceMap.filter(e => e.genName === 'ArrayGet').length
  return {
    mainBytecode,
    newRecordCallbacks: result.compile.recordCallbacks || new Map(),
    structureHash,
    historySourceMap,
    functionReturnPcs,
    arrayGetHistoryCount,
  }
}

function getProgramState(shared: SharedProgramViews): DspProgramState {
  return (shared.stateU32[SharedProgramStateIndex.State] ?? DspProgramState.Stop) as DspProgramState
}

function updateMainBytecodeHash(
  mainBytecode: Float32Array,
  lastHash: number,
): { changed: boolean; newHash: number } {
  const mainHash = hashF32Bits(mainBytecode)
  return { changed: mainHash !== lastHash, newHash: mainHash }
}

function computeCallbackChanges(
  newRecordCallbacks: Map<number, RecordCallback>,
  mainBytecodeChanged: boolean,
  lastCallbackBytecodeHashes: Map<number, string>,
  lastCapturedValues: Map<number, number[]>,
) {
  const newBytecodeHashes = new Map<number, string>()
  const changedCallbackIds = new Set<number>()
  const callbacksToCheckValues: Array<{ callbackId: number; data: RecordCallback }> = []
  for (const [callbackId, data] of newRecordCallbacks) {
    const hash = hashCallbackBytecode(
      data.setup,
      data.loop,
      data.recordGlobalIndices,
      data.captureStoreGlobalIdx,
    )
    newBytecodeHashes.set(callbackId, hash)
    const oldHash = lastCallbackBytecodeHashes.get(callbackId)
    if (oldHash !== hash) changedCallbackIds.add(callbackId)
    else if (
      mainBytecodeChanged
      && data.recordGlobalIndices.length > 0
      && lastCapturedValues.has(callbackId)
    ) {
      callbacksToCheckValues.push({ callbackId, data })
    }
  }
  return { newBytecodeHashes, changedCallbackIds, callbacksToCheckValues }
}

async function checkCapturedValueChanges(
  callbacksToCheckValues: Array<{ callbackId: number; data: RecordCallback }>,
  mainBytecode: Float32Array,
  changedCallbackIds: Set<number>,
  record: RecordWorker,
  lastCapturedValues: Map<number, number[]>,
) {
  if (callbacksToCheckValues.length === 0) return
  const id = `sab-mainBytecode-${++_mainBytecodeTempId}`
  track(id, 'SharedArrayBuffer', mainBytecode.byteLength, { source: 'dsp-program:checkCapturedValueChanges' })
  const mainBytecodeShared = new Float32Array(new SharedArrayBuffer(mainBytecode.byteLength))
  mainBytecodeShared.set(mainBytecode)
  for (const { callbackId, data } of callbacksToCheckValues) {
    const newValues = await record.getCapturedValues({
      mainBytecode: mainBytecodeShared,
      scopeId: callbackId,
      captureStoreGlobalIdx: data.captureStoreGlobalIdx,
      numDeps: data.recordGlobalIndices.length,
      recordGlobalIndices: data.recordGlobalIndices,
      defaultParamRecordGlobals: data.defaultParamRecordGlobals,
      sampleRate: 48000,
    })
    if (!newValues) continue
    const oldValues = lastCapturedValues.get(callbackId) || []
    const valuesChanged = newValues.length !== oldValues.length
      || newValues.some((v: number, i: number) => v !== oldValues[i])
    if (valuesChanged) changedCallbackIds.add(callbackId)
  }
}

function markRemovedCallbacksAsChanged(
  newRecordCallbacks: Map<number, RecordCallback>,
  changedCallbackIds: Set<number>,
  lastCallbackBytecodeHashes: Map<number, string>,
  lastCapturedValues: Map<number, number[]>,
) {
  for (const callbackId of lastCallbackBytecodeHashes.keys()) {
    if (!newRecordCallbacks.has(callbackId)) {
      changedCallbackIds.add(callbackId)
      lastCapturedValues.delete(callbackId)
    }
  }
}

function invalidateHandlesForChangedCallbacks(
  programId: number,
  changedCallbackIds: Set<number>,
  registrations: SampleRegistration[],
  dspState: DspState,
): number[] {
  const invalidatedHandles: number[] = []
  if (changedCallbackIds.size === 0) return invalidatedHandles
  for (const reg of registrations) {
    if (reg.type === 'record' && reg.recordCallbackId !== undefined) {
      if (changedCallbackIds.has(reg.recordCallbackId)) {
        sampleManager.clearHandle(reg.handle)
        invalidatedHandles.push(reg.handle)
      }
    }
  }
  dspState.invalidateRecordings(programId)
  for (const h of invalidatedHandles) dspState.fetchingSamples.delete(h)
  return invalidatedHandles
}

async function ensureSharedBound(
  dspState: DspState,
  worklet: DspWorklet,
  shared: SharedProgramViews,
): Promise<SharedProgramViews | null> {
  if (!dspState.isProgramSharedStale(shared.bufferRef)) return null
  const init = await worklet.getProgramShared({ programId: shared.id })
  if (!init) return null
  return bindProgramShared(dspState.buffer!, init, shared.historyMetaU32)
}

function getHistoryIndexForFunctionReturn(
  name: string,
  functionReturnPcs: Record<string, number>,
  cachedHistoryViews: AudioVmHistoryView[],
): number | null {
  const pc = functionReturnPcs[name]
  if (pc == null) return null
  const view = cachedHistoryViews.find(v => v.callStackFrames.includes(pc))
  return view?.historyIndex ?? null
}

async function getVmView(memory: WebAssembly.Memory, worklet: DspWorklet, programId: number) {
  const result = await worklet.getVmInfoPtr({ programId })
  if (result === null) return null
  const { infoPtr } = result
  return new AudioVmView(memory, infoPtr)
}

async function refreshHistories(
  shared: SharedProgramViews,
  memory: WebAssembly.Memory | null,
  historySourceMap: HistorySourceMap[],
): Promise<{ views: AudioVmHistoryView[]; histories: TypedHistory[]; userCallHistories: UserCallHistory[] } | null> {
  if (!(shared.historyMetaU32.buffer instanceof SharedArrayBuffer) || !memory) return null
  const meta = shared.historyMetaU32
  const lockRetries = 80
  for (let i = 0; i < lockRetries; i++) {
    const prev = Atomics.compareExchange(meta, 0, 0, 1)
    if (prev === 0) {
      const historyCount = meta[1] ?? 0
      if (historyCount === 0) {
        Atomics.store(meta, 0, 0)
        return null
      }
      const { histories } = AudioVmView.fromHistoryMetaShared(memory, meta)
      const { typedHistories, userCallHistories } = createTypedHistories(histories, historySourceMap)
      Atomics.store(meta, 0, 0)
      return {
        views: histories,
        histories: typedHistories,
        userCallHistories,
      }
    }
    await new Promise<void>(r => (i % 10 === 0 ? requestAnimationFrame(() => r()) : queueMicrotask(r)))
  }
  return null
}

function applySourceMappingToViews(
  result: Awaited<ReturnType<typeof controlPipeline.compileSource>>,
  cachedHistoryViews: AudioVmHistoryView[],
): { typedHistories: TypedHistory[]; userCallHistories: UserCallHistory[] } {
  if (cachedHistoryViews.length === 0) return { typedHistories: [], userCallHistories: [] }
  if (result.errors.length > 0) return { typedHistories: [], userCallHistories: [] }
  const newSourceMap = (result.compile.historySourceMap || []) as HistorySourceMap[]
  return createTypedHistories(cachedHistoryViews, newSourceMap)
}

async function applySyncMode(
  opts: { enabled: boolean; bars: number },
  worklet: DspWorklet,
  programId: number,
): Promise<{ syncEnabled: boolean; syncBars: number }> {
  const syncEnabled = !!opts.enabled
  const syncBars = Math.max(1, Math.round(Number(opts.bars) || 1))
  await worklet.setProgramSync({ programId, enabled: syncEnabled, bars: syncBars })
  return { syncEnabled, syncBars }
}

function setProgramState(shared: SharedProgramViews, s: DspProgramState) {
  shared.stateU32[SharedProgramStateIndex.State] = s
}

async function rebindProgram(
  worklet: DspWorklet,
  shared: SharedProgramViews,
  dspState: DspState,
): Promise<SharedProgramViews> {
  const init = await worklet.getProgramShared({ programId: shared.id })
  if (!init) return shared
  return bindProgramShared(dspState.buffer!, init, shared.historyMetaU32)
}

const setCodeImpl = atomic(async (
  src: string,
  shared: SharedProgramViews,
  dspState: DspState,
  worklet: DspWorklet,
  record: RecordWorker,
  setCodeToken: number,
  program: DspProgram,
  recordCallbacks: Map<number, RecordCallback>,
  lastStructureHash: number | null,
  lastMainBytecodeHash: number,
  lastCallbackBytecodeHashes: Map<number, string>,
  lastCapturedValues: Map<number, number[]>,
  lastRecordSecondsByCallbackId: Map<number, number>,
  freesoundIds: Set<number>,
  opts?: { fullResync?: boolean; projectId?: string | null },
) => {
  // console.log(`[dsp] Setting code for program ${shared.id}... source:\n${src}`)
  const token = (setCodeToken + 1) >>> 0
  setCodeToken = token

  const result = compileAndValidate(src, { projectId: opts?.projectId })
  if (result.errors.length > 0) {
    return {
      result,
    }
  }

  const {
    mainBytecode,
    newRecordCallbacks,
    structureHash,
    historySourceMap: newHistorySourceMap,
    functionReturnPcs: newFunctionReturnPcs,
    arrayGetHistoryCount,
  } = applyCompileState(result)

  const historySourceMap = newHistorySourceMap
  const functionReturnPcs = newFunctionReturnPcs

  const hashResult = updateMainBytecodeHash(mainBytecode, lastMainBytecodeHash)
  lastMainBytecodeHash = hashResult.newHash
  const mainBytecodeChanged = hashResult.changed
  const { newBytecodeHashes, changedCallbackIds, callbacksToCheckValues } = computeCallbackChanges(
    newRecordCallbacks,
    mainBytecodeChanged,
    lastCallbackBytecodeHashes,
    lastCapturedValues,
  )

  await checkCapturedValueChanges(
    callbacksToCheckValues,
    mainBytecode,
    changedCallbackIds,
    record,
    lastCapturedValues,
  )

  const structureUnchanged = structureHash === lastStructureHash
  lastStructureHash = structureHash

  let recordDurationChanged = false
  let freesoundsChanged = false
  let inlineSamplesPresent = false
  let espeakSamplesPresent = false
  for (const reg of result.compile.sampleRegistrations) {
    if (reg.type === 'record' && reg.recordCallbackId != null && reg.recordSeconds != null) {
      if (lastRecordSecondsByCallbackId.get(reg.recordCallbackId) !== reg.recordSeconds) {
        recordDurationChanged = true
        break
      }
    }
    else if (reg.type === 'freesound' && reg.freesoundId != null && !freesoundIds.has(reg.freesoundId)) {
      freesoundIds.add(reg.freesoundId)
      freesoundsChanged = true
    }
    else if (reg.type === 'inline') {
      inlineSamplesPresent = true
    }
    else if (reg.type === 'espeak') {
      espeakSamplesPresent = true
    }
  }

  if (
    changedCallbackIds.size === 0
    && structureUnchanged
    && !recordDurationChanged
    && !freesoundsChanged
    && !inlineSamplesPresent
    && !espeakSamplesPresent
    && !opts?.fullResync
  ) {
    const hashResult = updateMainBytecodeHash(mainBytecode, lastMainBytecodeHash)
    lastMainBytecodeHash = hashResult.newHash
    const nextShared = await ensureSharedBound(dspState, worklet, shared)
    if (nextShared) shared = nextShared
    await setControlOps(dspState, worklet, program, mainBytecode)
    return {
      result,
      shared,
      historySourceMap,
      functionReturnPcs,
      lastStructureHash,
      lastMainBytecodeHash,
    }
  }

  markRemovedCallbacksAsChanged(
    newRecordCallbacks,
    changedCallbackIds,
    lastCallbackBytecodeHashes,
    lastCapturedValues,
  )

  const invalidatedHandles = invalidateHandlesForChangedCallbacks(
    shared.id,
    changedCallbackIds,
    result.compile.sampleRegistrations,
    dspState,
  )

  recordCallbacks.clear()
  for (const [k, v] of newRecordCallbacks) recordCallbacks.set(k, v)
  lastCallbackBytecodeHashes.clear()
  for (const [k, v] of newBytecodeHashes) lastCallbackBytecodeHashes.set(k, v)
  lastRecordSecondsByCallbackId.clear()
  for (const reg of result.compile.sampleRegistrations) {
    if (reg.type === 'record' && reg.recordCallbackId != null && reg.recordSeconds != null) {
      lastRecordSecondsByCallbackId.set(reg.recordCallbackId, reg.recordSeconds)
    }
  }

  await worklet.syncSampleRegistrations({
    registrations: result.compile.sampleRegistrations,
    invalidatedHandles: invalidatedHandles.length > 0 ? invalidatedHandles : undefined,
  })

  for (const reg of result.compile.sampleRegistrations) {
    if (reg.type === 'inline' && reg.inlineChannels && reg.inlineSampleRate != null) {
      await worklet.setSampleDataDirect({
        handle: reg.handle,
        channels: reg.inlineChannels,
        sampleRate: reg.inlineSampleRate,
      })
      sampleManager.setSampleData(reg.handle, reg.inlineChannels, reg.inlineSampleRate)
    }
    else if (reg.type === 'espeak' && reg.espeakText) {
      const text = reg.espeakText
      const variant = reg.espeakVariant ?? 'm1'
      const speed = reg.espeakSpeed ?? 0.5
      const pitch = reg.espeakPitch ?? 0.5
      try {
        console.log(`[dsp] Fetching espeak sample for handle ${reg.handle}...`)
        const { channels, sampleRate } = await fetchEspeakSample(dspState.audioContext, {
          text,
          variant,
          speed,
          pitch,
        })
        await worklet.setSampleDataDirect({
          handle: reg.handle,
          channels,
          sampleRate,
        })
        sampleManager.setSampleData(reg.handle, channels, sampleRate)
        console.log(`[dsp] Set espeak sample data for handle ${reg.handle}`)
      }
      catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error('[dsp] Error fetching espeak sample:', msg)
        await worklet.setSampleError({ handle: reg.handle, error: msg })
        sampleManager.setSampleError(reg.handle, msg)
        throw error
      }
    }
  }

  await fetchRequiredSamples(
    dspState.audioContext,
    worklet,
    record,
    dspState.fetchingSamples,
    shared.id,
    () => dspState.getProgramRecordGeneration(shared.id),
    recordCallbacks,
    mainBytecode,
    (callbackId, values) => {
      if (token !== setCodeToken) return
      lastCapturedValues.set(callbackId, values)
    },
  )
  if (token !== setCodeToken) {
    throw new Error('Superceeded by a newer setCode call')
  }

  const nextShared = await ensureSharedBound(dspState, worklet, shared)
  if (nextShared) shared = nextShared
  await setControlOpsSwap(dspState, worklet, program, mainBytecode)

  return {
    result,
    shared,
    historySourceMap,
    functionReturnPcs,
    lastStructureHash,
    lastMainBytecodeHash,
  }
}, { dropInbetween: true, timeout: 1000 })

export type DspProgram = ReturnType<typeof createDspProgram>

export function createDspProgram(
  dspState: DspState,
  shared: SharedProgramViews,
  worklet: DspWorklet,
  record: RecordWorker,
) {
  let lastOps: Float32Array | null = null
  let lastStructureHash: number | null = null
  let setCodeToken = 0
  let syncEnabled = false
  let syncBars = 1
  let recordCallbacks = new Map<number, RecordCallback>()
  let lastCallbackBytecodeHashes = new Map<number, string>()
  let lastCapturedValues = new Map<number, number[]>()
  let lastRecordSecondsByCallbackId = new Map<number, number>()
  let freesoundIds = new Set<number>()
  let lastMainBytecodeHash = 0
  let historySourceMap: HistorySourceMap[] = []
  let functionReturnPcs: Record<string, number> = {}
  let cachedHistories: TypedHistory[] = []
  let cachedUserCallHistories: UserCallHistory[] = []
  let cachedHistoryViews: AudioVmHistoryView[] = []
  let lastHistoryPackEpoch = 0

  const latency = createDspLatency({
    audioContext: dspState.audioContext,
    getIsPlaying: () => getProgramState(shared) === DspProgramState.Start,
    getRawSampleCount: (): number => Number(Atomics.load(shared.stateU32, SharedProgramStateIndex.SampleCount)) >>> 0,
  })

  const emptyOutputs = {
    left: new Float32Array(0),
    right: new Float32Array(0),
    chunkSamples: 128,
    currentChunkPos: 0,
  }

  async function setCode(src: string, opts?: { fullResync?: boolean; projectId?: string | null }) {
    // console.log('set code', src, opts)
    const result = await setCodeImpl(
      src,
      shared,
      dspState,
      worklet,
      record,
      setCodeToken,
      program,
      recordCallbacks,
      lastStructureHash,
      lastMainBytecodeHash,
      lastCallbackBytecodeHashes,
      lastCapturedValues,
      lastRecordSecondsByCallbackId,
      freesoundIds,
      opts,
    )
    if (result.lastStructureHash) lastStructureHash = result.lastStructureHash
    if (result.lastMainBytecodeHash) lastMainBytecodeHash = result.lastMainBytecodeHash
    if (result.historySourceMap) historySourceMap = result.historySourceMap
    if (result.functionReturnPcs) functionReturnPcs = result.functionReturnPcs
    if (result.shared) shared = result.shared
    return result.result
  }

  function updateHistoriesFromCurrentPack(): boolean {
    const memory = dspState.memory
    if (!memory?.buffer) return false
    const epoch = Atomics.load(shared.stateU32, SharedProgramStateIndex.HistoryPackEpoch) >>> 0
    if (epoch === lastHistoryPackEpoch) return false
    lastHistoryPackEpoch = epoch

    const packIndex = Atomics.load(shared.stateU32, SharedProgramStateIndex.HistoryPackIndex) >>> 0
    const metaPacks = shared.historyMetaPacks
    const meta = metaPacks[packIndex] ?? metaPacks[0]
    if (!(meta.buffer instanceof SharedArrayBuffer)) return false

    const lock = Atomics.load(meta, 0)
    const historyCount = meta[1] ?? 0
    if (lock !== 0 || historyCount === 0) return false

    const { histories } = AudioVmView.fromHistoryMetaShared(memory, meta)
    const { typedHistories, userCallHistories } = createTypedHistories(histories, historySourceMap)
    cachedHistoryViews = histories
    cachedHistories = typedHistories
    cachedUserCallHistories = userCallHistories
    return true
  }

  function getOutputs() {
    const memory = dspState.memory
    if (!memory?.buffer) return emptyOutputs
    updateHistoriesFromCurrentPack()
    const outHistory = cachedHistoryViews.find(h => h.genName === 'Out' || h.genName === 'Solo')
    if (outHistory && outHistory.outputPtr !== 0) {
      const ringLen = outHistory.ringChunks * outHistory.chunkSamples
      const ptr = outHistory.outputPtr
      return {
        left: new Float32Array(memory.buffer, ptr, ringLen),
        right: new Float32Array(memory.buffer, ptr, ringLen),
        chunkSamples: outHistory.chunkSamples,
        currentChunkPos: outHistory.outputChunkPos,
      }
    }
    return emptyOutputs
  }

  const program = {
    get id() {
      return shared.id
    },
    get vmIds() {
      return shared.vmIds
    },
    get shared() {
      return shared
    },
    set shared(s: SharedProgramViews) {
      shared = s
    },
    get lastOps() {
      return lastOps
    },
    set lastOps(o: Float32Array | null) {
      lastOps = o
    },
    get state() {
      return getProgramState(shared)
    },
    get isPlaying() {
      return getProgramState(shared) === DspProgramState.Start
    },
    get sampleCount() {
      return Atomics.load(shared.stateU32, SharedProgramStateIndex.SampleCount) >>> 0
    },
    set sampleCount(value: number) {
      Atomics.store(shared.stateU32, SharedProgramStateIndex.SampleCount, value >>> 0)
    },
    get histories() {
      return cachedHistories
    },
    get userCallHistories() {
      return cachedUserCallHistories
    },
    get historyViews() {
      return cachedHistoryViews
    },
    get outputs() {
      return getOutputs()
    },
    latency,
    getHistoryIndexForFunctionReturn: (name: string) =>
      getHistoryIndexForFunctionReturn(name, functionReturnPcs, cachedHistoryViews),
    getVmView: () => getVmView(dspState.memory!, worklet, shared.id),
    refreshHistories(): boolean {
      return updateHistoriesFromCurrentPack()
    },
    reapplySourceMapping(result: Awaited<ReturnType<typeof controlPipeline.compileSource>>) {
      const next = applySourceMappingToViews(result, cachedHistoryViews)
      if (next.typedHistories.length > 0) {
        cachedHistories = next.typedHistories
        cachedUserCallHistories = next.userCallHistories
      }
    },
    async setSyncMode(opts: { enabled: boolean; bars: number }) {
      const sync = await applySyncMode(opts, worklet, shared.id)
      syncEnabled = sync.syncEnabled
      syncBars = sync.syncBars
    },
    async rebind() {
      shared = await rebindProgram(worklet, shared, dspState)
    },
    setCode,
    start() {
      setProgramState(shared, DspProgramState.Start)
    },
    pause() {
      setProgramState(shared, DspProgramState.Pause)
    },
    stop() {
      setProgramState(shared, DspProgramState.Stop)
    },
    _setState(s: DspProgramState) {
      setProgramState(shared, s)
    },
    _getHistoryMetaU32() {
      return shared.historyMetaU32
    },
    _applyShared(_shared: SharedProgramViews) {
      shared = _shared
    },
  }

  return program
}
