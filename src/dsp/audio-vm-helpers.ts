import type { HistorySourceMap } from '../live/compiler/index.ts'
import {
  AUDIO_VM_INFO_STRIDE,
  type GenSpec,
  genSpecs,
  HISTORY_META_STRIDE,
  type HistoryParamAccessor,
  type HistorySampleCounts,
  type HistorySource,
  type ParamMode,
  type TypedHistory,
} from './audio-vm-bindings.ts'
import type { DspLatency } from './dsp-latency.ts'
import { historyMetaMetaOffset } from './history-meta-shared.ts'

const DEBUG = false

function createStaleMetaFacade(): Uint32Array {
  const m = new Uint32Array(HISTORY_META_STRIDE)
  m[12] = 0xffffffff
  return m
}

export class AudioVmHistoryView {
  private memory: WebAssembly.Memory
  private metaOffset: number
  private infoPtr: number
  private metaSlice: Uint32Array | null = null

  constructor(memory: WebAssembly.Memory, metaOffset: number, infoPtr: number, metaSlice?: Uint32Array) {
    this.memory = memory
    this.metaOffset = metaOffset
    this.infoPtr = infoPtr
    this.metaSlice = metaSlice ?? null
  }

  private get meta(): Uint32Array {
    if (this.metaSlice) return this.metaSlice
    const info = new Uint32Array(this.memory.buffer, this.infoPtr, AUDIO_VM_INFO_STRIDE)
    const historyCount = info[6]
    const historyIndex = this.metaOffset / HISTORY_META_STRIDE
    if (historyIndex >= historyCount) {
      this.metaSlice = createStaleMetaFacade()
      return this.metaSlice
    }
    const historyMetaPtr = info[5]
    return new Uint32Array(this.memory.buffer, historyMetaPtr + this.metaOffset * 4, HISTORY_META_STRIDE)
  }

  /** Build a history view from meta already read from the shared buffer (no WASM meta reads). */
  static fromMeta(memory: WebAssembly.Memory, historyIndex: number, metaU32: Uint32Array,
    metaBaseOffset: number): AudioVmHistoryView
  {
    const slice = new Uint32Array(metaU32.buffer, metaU32.byteOffset + metaBaseOffset * 4, HISTORY_META_STRIDE)
    return new AudioVmHistoryView(memory, historyIndex * HISTORY_META_STRIDE, 0, slice)
  }

  private get spec(): GenSpec {
    return genSpecs[this.meta[0]]
  }

  get id(): number {
    return this.meta[0]
  }
  get historyIndex(): number {
    return this.metaOffset / HISTORY_META_STRIDE
  }
  get genName(): string {
    return this.spec.genName
  }
  get variantName(): string {
    return this.spec.variantName
  }
  get className(): string {
    return this.spec.className
  }
  get paramNames(): string[] {
    return this.spec.paramNames
  }
  get paramModes(): ParamMode[] {
    return this.spec.paramModes
  }
  get emitNames(): string[] {
    return this.spec.emitNames
  }
  get paramCount(): number {
    return this.meta[1]
  }
  get size(): number {
    return this.meta[2]
  }
  get writeIndex(): number {
    return this.meta[3]
  }
  get sampleCounts(): Int32Array {
    const m = this.meta
    return new Int32Array(this.memory.buffer, m[4], m[2])
  }
  get values(): Float32Array {
    const m = this.meta
    return new Float32Array(this.memory.buffer, m[5], m[2] * m[1])
  }
  get inputPtr(): number {
    return this.meta[6]
  }
  get inputChunkPos(): number {
    return this.meta[7]
  }
  get outputPtr(): number {
    return this.meta[8]
  }
  get outputChunkPos(): number {
    return this.meta[9]
  }
  get chunkSamples(): number {
    return this.meta[10]
  }
  get ringChunks(): number {
    return this.meta[11]
  }
  get callStackFrames(): number[] {
    const frames: number[] = []
    const m = this.meta
    for (let i = 0; i < 8; i++) {
      const frame = m[12 + i]
      if (frame === 0xFFFFFFFF) break
      frames.push(frame)
    }
    return frames
  }

  getInputBuffer(bufferLength: number): Float32Array | null {
    const ptr = this.meta[6]
    if (ptr === 0) return null
    return new Float32Array(this.memory.buffer, ptr, bufferLength)
  }

  getOutputBuffer(bufferLength: number): Float32Array | null {
    const ptr = this.meta[8]
    if (ptr === 0) return null
    return new Float32Array(this.memory.buffer, ptr, bufferLength)
  }

  getInputRingView(): Float32Array | null {
    const ptr = this.meta[6]
    if (ptr === 0) return null
    const chunkSamples = this.meta[10]
    const ringChunks = this.meta[11]
    return new Float32Array(this.memory.buffer, ptr, chunkSamples * ringChunks)
  }

  _outputRingView: Float32Array | null = null
  getOutputRingView(): Float32Array | null {
    const ptr = this.meta[8]
    if (ptr === 0) return null
    const chunkSamples = this.meta[10]
    const ringChunks = this.meta[11]
    if (!this._outputRingView || this._outputRingView.buffer !== this.memory.buffer) {
      this._outputRingView = new Float32Array(this.memory.buffer, ptr, chunkSamples * ringChunks)
    }
    return this._outputRingView
  }
}

export class AudioVmView {
  private memory: WebAssembly.Memory
  private infoPtr: number

  constructor(memory: WebAssembly.Memory, infoPtr: number) {
    if (!memory || !memory.buffer) {
      throw new Error('Invalid memory: memory or memory.buffer is undefined')
    }
    this.memory = memory
    this.infoPtr = infoPtr
  }

  private get info(): Uint32Array {
    return new Uint32Array(this.memory.buffer, this.infoPtr, AUDIO_VM_INFO_STRIDE)
  }

  get stackTop(): number {
    return this.info[3]
  }
  get stack(): Float64Array {
    const i = this.info
    return new Float64Array(this.memory.buffer, i[0], i[4])
  }
  get histories(): AudioVmHistoryView[] {
    const historyCount = this.info[6]
    return Array.from({ length: historyCount },
      (_, i) => new AudioVmHistoryView(this.memory, i * HISTORY_META_STRIDE, this.infoPtr))
  }

  /** Build VM view from history meta shared buffer (lock must be 0 at call site). No WASM meta reads. */
  static fromHistoryMetaShared(memory: WebAssembly.Memory,
    historyMetaU32: Uint32Array): { histories: AudioVmHistoryView[] }
  {
    const historyCount = historyMetaU32[1] ?? 0
    const views: AudioVmHistoryView[] = []
    for (let i = 0; i < historyCount; i++) {
      const baseOffset = historyMetaMetaOffset(i)
      views.push(AudioVmHistoryView.fromMeta(memory, i, historyMetaU32, baseOffset))
    }
    return { histories: views }
  }
}

function createTypedParamAccessor(
  getValues: () => Float32Array,
  getWriteIndex: () => number,
  paramIndex: number,
  paramCount: number,
  size: number,
): HistoryParamAccessor {
  const accessor = {
    get latest() {
      const values = getValues()
      const writeIndex = getWriteIndex()
      const latestIndex = writeIndex > 0 ? (writeIndex - 1) % size : size - 1
      return values[latestIndex * paramCount + paramIndex] ?? 0
    },
    at(index: number): number {
      return getValues()[index * paramCount + paramIndex] ?? 0
    },
  } as {
    [index: number]: number
    readonly latest: number
    at(index: number): number
  }

  return new Proxy(accessor, {
    get(target, prop) {
      if (typeof prop === 'string' && /^\d+$/.test(prop)) {
        const index = parseInt(prop, 10)
        const values = getValues()
        const valueIndex = index * paramCount + paramIndex
        return values[valueIndex] ?? 0
      }
      return Reflect.get(target, prop)
    },
  })
}

function createTypedSampleCountsAccessor(
  getSampleCounts: () => Int32Array,
  getWriteIndex: () => number,
  size: number,
): HistorySampleCounts {
  const arr = getSampleCounts()
  Object.defineProperty(arr, 'latest', {
    get() {
      const sampleCounts = getSampleCounts()
      const writeIndex = getWriteIndex()
      const latestIndex = writeIndex > 0 ? (writeIndex - 1) % size : size - 1
      return sampleCounts[latestIndex] ?? 0
    },
    enumerable: true,
  })
  return arr as HistorySampleCounts
}

export function createTypedHistory(
  history: AudioVmHistoryView,
  source: HistorySource | null,
): TypedHistory {
  const size = history.size
  const mask = size - 1
  const paramCount = history.paramCount

  const paramNames = history.paramNames
  const emitNames = history.emitNames || []

  const getWriteIndex = () => history.writeIndex
  const getValues = () => history.values
  const getSampleCounts = () => history.sampleCounts

  const sampleCounts = createTypedSampleCountsAccessor(getSampleCounts, getWriteIndex, size)

  const params: Record<string, any> = {}
  for (let i = 0; i < paramNames.length; i++) {
    params[paramNames[i]] = createTypedParamAccessor(getValues, getWriteIndex, i, paramCount, size)
  }

  const emit: Record<string, any> = {}
  if (emitNames.length > 0) {
    for (let i = 0; i < emitNames.length; i++) {
      const emitIndex = paramNames.length + i
      emit[emitNames[i]] = createTypedParamAccessor(getValues, getWriteIndex, emitIndex, paramCount, size)
    }
  }

  // Construct the history object with proper typing based on genName
  // TypeScript will narrow the union type when checking genName === 'Ad', etc.
  const baseHistory = {
    id: history.id,
    genName: history.genName,
    variantName: history.variantName,
    className: history.className,
    source,
    view: history,
    index: history.historyIndex,
    params,
    emit,
    size,
    mask,
    get writeIndex() {
      return getWriteIndex()
    },
    get values() {
      return getValues()
    },
    sampleCounts,
  } as TypedHistory

  return baseHistory
}

export type CallSiteSource = HistorySource & { funcName: string }

export type UserCallHistory = {
  source: HistorySource
  funcName: string
  inner: TypedHistory[]
}

export function createTypedHistories(
  histories: AudioVmHistoryView[],
  sourceMap: HistorySourceMap[],
): { typedHistories: TypedHistory[]; userCallHistories: UserCallHistory[] } {
  type CallSiteEntry = HistorySourceMap & { callSite: true; funcName: string }

  const framesByHistory = new WeakMap<AudioVmHistoryView, number[]>()
  const getFrames = (h: AudioVmHistoryView): number[] => {
    const cached = framesByHistory.get(h)
    if (cached) return cached
    const frames = h.callStackFrames
    framesByHistory.set(h, frames)
    return frames
  }

  const sourceMapByPc = new Map<number, HistorySourceMap[]>()
  const callSiteByPc = new Map<number, CallSiteEntry>()
  const callSiteEntries: CallSiteEntry[] = []
  for (const entry of sourceMap) {
    const arr = sourceMapByPc.get(entry.pc)
    if (arr) arr.push(entry)
    else sourceMapByPc.set(entry.pc, [entry])

    // Only keep user-program call sites. Prelude/internal call-site entries can
    // otherwise remap unrelated histories to line 1 and duplicate widgets.
    if (entry.callSite && entry.funcName && entry.__fromMainProgram !== false) {
      const e = entry as CallSiteEntry
      callSiteByPc.set(entry.pc, e)
      callSiteEntries.push(e)
    }
  }
  const matches: Array<{ history: AudioVmHistoryView; sourceMap: HistorySourceMap }> = []

  const outSoloMatch = (eGen: string, hGen: string) =>
    eGen === hGen || (eGen === 'Solo' && hGen === 'Out') || (eGen === 'Out' && hGen === 'Solo')

  for (const history of histories) {
    const frames = getFrames(history)
    let match = false
    for (const pc of frames) {
      const entries = sourceMapByPc.get(pc)
      const candidates = entries?.filter(e => !e.callSite && outSoloMatch(e.genName, history.genName))
      const sm = candidates?.find(e => e.__fromMainProgram !== false) ?? candidates?.[0]
      if (sm) {
        match = true
        matches.push({ history, sourceMap: sm })
        break
      }
    }
    if (DEBUG && !match && frames.length > 0 && frames[0] !== 0xFFFFFFFF) {
      const sourceMapPcs = Array.from(sourceMapByPc.keys()).sort((a, b) => a - b)
      const sourceMapEntries = Array.from(sourceMapByPc.entries()).flatMap(([pc, entries]) =>
        entries.map(sm => [pc, sm] as const)
      )
      const sourceMapInFunctions = sourceMapEntries.filter(([, sm]) => sm.inFunction).map(([pc]) => pc)
      const sourceMapInMain = sourceMapEntries.filter(([, sm]) => !sm.inFunction).map(([pc]) => pc)
      const frameMatches = frames.map((framePc, idx) => {
        const closest = sourceMapPcs.map(spc => ({ pc: spc, diff: Math.abs(spc - framePc) })).sort((a, b) =>
          a.diff - b.diff
        ).slice(0, 3)
        const analysis = {
          framePc,
          matchesMain: sourceMapInMain.filter(spc => Math.abs(spc - framePc) < 10),
          matchesFunction: sourceMapInFunctions.filter(spc => Math.abs(spc - framePc) < 10),
          closestMain: sourceMapInMain.length > 0
            ? sourceMapInMain.map(spc => ({ pc: spc, diff: Math.abs(spc - framePc) })).sort((a, b) =>
              a.diff - b.diff
            )[0]
            : null,
          closestFunction: sourceMapInFunctions.length > 0
            ? sourceMapInFunctions.map(spc => ({ pc: spc, diff: Math.abs(spc - framePc) })).sort((a, b) =>
              a.diff - b.diff
            )[0]
            : null,
        }
        return { frameIdx: idx, framePc, closest, analysis }
      })
      console.warn('PC mismatch:', {
        historyPcs: frames,
        sourceMapPcs,
        sourceMapDetails: sourceMapEntries.map(([pc, sm]) => ({ pc, genName: sm.genName, inFunction: sm.inFunction })),
        frameMatches,
      })
    }
  }

  const matchedHistoryViews = new Set(matches.map(m => m.history))

  const typedHistories = matches.map(({ history, sourceMap }) => {
    const source: HistorySource = {
      line: sourceMap.line,
      column: sourceMap.column,
    }
    const typedHistory = createTypedHistory(history, source)
    if (sourceMap.genName === 'Out' || sourceMap.genName === 'Solo') {
      ;(typedHistory as { genName: string }).genName = sourceMap.genName
    }
    if (typedHistory.genName === 'Tram') {
      if (sourceMap.tramBeatMapping === undefined) {
        throw new Error('Tram history source map entry missing tramBeatMapping')
      }
      typedHistory.beatMapping = sourceMap.tramBeatMapping
    }
    if (typedHistory.genName === 'Mini') {
      if (sourceMap.sequence === undefined || sourceMap.compileResult === undefined) {
        throw new Error('Mini history source map entry missing sequence or compileResult')
      }
      typedHistory.sequence = sourceMap.sequence
      typedHistory.compileResult = sourceMap.compileResult
    }
    if (typedHistory.genName === 'Timeline') {
      if (sourceMap.sequence === undefined) {
        throw new Error('Timeline history source map entry missing sequence')
      }
      typedHistory.sequence = sourceMap.sequence
      typedHistory.segmentTokens = sourceMap.timelineSegmentTokens ?? []
      if (sourceMap.timelineColorIndex !== undefined) {
        ;(typedHistory as TypedHistory & { colorIndex?: number }).colorIndex = sourceMap.timelineColorIndex
      }
    }
    if (typedHistory.genName === 'ArrayGet' && sourceMap.arrayGetElementMapping !== undefined) {
      ;(typedHistory as TypedHistory & { elementMapping?: Array<{ index: number; startCol: number; endCol: number }> })
        .elementMapping = sourceMap.arrayGetElementMapping
    }
    // Map back to user call site when this gen ran inside a function called from that site
    const frames = getFrames(history)
    const genPc = sourceMap.pc
    for (const pc of frames) {
      if (pc !== genPc) {
        const callSm = callSiteByPc.get(pc)
        if (callSm?.funcName) {
          ;(typedHistory as TypedHistory & { callSiteSource?: CallSiteSource }).callSiteSource = {
            line: callSm.line,
            column: callSm.column,
            funcName: callSm.funcName,
          }
          break
        }
      }
    }
    return typedHistory
  })

  // Prelude gen histories: no gen source map entry, but include in user call histories when their stack has a user call site
  const innerOnlyByCallSitePc = new Map<number, TypedHistory[]>()
  for (const history of histories) {
    if (matchedHistoryViews.has(history)) continue
    const frames = getFrames(history)
    if (frames.length === 0 || frames[0] === 0xFFFFFFFF) continue
    for (const pc of frames) {
      const callSm = callSiteByPc.get(pc)
      if (callSm?.funcName) {
        const source: HistorySource = { line: callSm.line, column: callSm.column }
        const typed = createTypedHistory(history, source)
        const arr = innerOnlyByCallSitePc.get(pc) ?? []
        arr.push(typed)
        innerOnlyByCallSitePc.set(pc, arr)
        break
      }
    }
  }

  const fromTopLevelByCallSitePc = new Map<number, TypedHistory[]>()
  for (const th of typedHistories) {
    const view = (th as { view: AudioVmHistoryView }).view
    const frames = getFrames(view)
    for (const pc of frames) {
      if (!callSiteByPc.has(pc)) continue
      const arr = fromTopLevelByCallSitePc.get(pc)
      if (arr) arr.push(th)
      else fromTopLevelByCallSitePc.set(pc, [th])
    }
  }

  const userCallHistories: UserCallHistory[] = []
  for (const entry of callSiteEntries) {
    const fromTopLevel = fromTopLevelByCallSitePc.get(entry.pc) ?? []
    const fromPrelude = innerOnlyByCallSitePc.get(entry.pc) ?? []
    const inner = [...fromTopLevel, ...fromPrelude]
    if (inner.length > 0) {
      userCallHistories.push({
        source: { line: entry.line, column: entry.column },
        funcName: entry.funcName,
        inner,
      })
    }
  }

  return { typedHistories, userCallHistories }
}

export function createHistoryReader<T>(
  size: number,
  mask: number,
  state: T,
  clear: (state: T) => void,
  getLatency: () => DspLatency['state'],
  getWriteIndex: () => number,
  getSampleCount: (index: number) => number,
  emit: (state: T, index: number, sampleCount: number) => void,
) {
  let lastReadIndex = 0
  let lastReadSampleCount = -1
  let lastEpoch = -1
  let now = 0

  const run = (epoch: number) => {
    if (epoch === lastEpoch) return
    lastEpoch = epoch

    now = getLatency().sampleCount

    // clock reset / wrap
    if (now < lastReadSampleCount) {
      clear(state)
      lastReadSampleCount = -1
    }

    const writeIndex = getWriteIndex()

    let distance = writeIndex - lastReadIndex
    if (distance < 0) distance += size
    if (distance > size) distance = size

    let nextReadIndex = lastReadIndex

    for (let i = 0; i < distance; i++) {
      const idx = (lastReadIndex + i) & mask
      const sampleCount = getSampleCount(idx)

      // skip old or future samples, but DO NOT break
      if (sampleCount <= lastReadSampleCount) continue
      if (sampleCount > now) continue

      emit(state, idx, sampleCount)
      lastReadSampleCount = sampleCount
      nextReadIndex = (idx + 1) & mask
    }

    lastReadIndex = nextReadIndex
  }

  return {
    run,
    state,
    get now() {
      return now
    },
  }
}
