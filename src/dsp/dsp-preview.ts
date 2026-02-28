import {
  MINI_ARRAY_HEADER_SIZE,
  MINI_HISTORY_ENTRY_SIZE,
  MINI_HISTORY_HEADER_SIZE,
  MINI_HISTORY_SIZE,
} from '../../as/assembly/mini/constants.ts'
import { sampleManager } from '../lib/sample-manager.ts'
import { type WasmRuntime } from '../lib/wasm-runtime.ts'
import type { HistorySourceMap, MiniCompileResult } from '../live/compiler/index.ts'
import type { SampleRegistration } from '../live/compiler/types.ts'
import { type ControlCompileSnapshot, controlPipeline } from '../live/pipeline.ts'
import type { TypedHistory } from './audio-vm-bindings.ts'
import { AudioVmView, createTypedHistories, type UserCallHistory } from './audio-vm-helpers.ts'
import { fetchEspeakSample } from './fetch-samples.ts'
import { bytecodeStructureHash } from './helpers.ts'

const DEBUG_PREVIEW_TIMING = typeof process !== 'undefined' && process.env?.DEBUG_PREVIEW_TIMING === '1'

type MiniEntry = {
  opIndex: number
  voiceIndex: number
  value: number
  velocity: number
  startSeconds: number
  endSeconds: number
}

function ensureMiniEntryPool(pool: MiniEntry[], size: number): void {
  while (pool.length < size) {
    pool.push({
      opIndex: 0,
      voiceIndex: 0,
      value: 0,
      velocity: 0,
      startSeconds: 0,
      endSeconds: 0,
    })
  }
}

export type DspPreview = ReturnType<typeof createDspPreview>

export function createDspPreview(runtime: WasmRuntime) {
  let previewAudioContext: AudioContext | null = null

  const state = {
    bytecode: null as Float32Array | null,
    result: null as ControlCompileSnapshot | null,
    historySourceMap: [] as HistorySourceMap[],
    sampleRate: 48000,
    structureHash: 0,
    vmView: null as AudioVmView | null,
    histories: [] as TypedHistory[],
    userCallHistories: [] as UserCallHistory[],
    audioOpsPtr: 0 as number,
    audioOpsCapacity: 0,
    lastBuiltStructureHash: 0,
    lastAppliedHistorySourceMap: [] as HistorySourceMap[],
    miniBytecodePtr: 0 as number,
    miniBytecodeCapacity: 0,
    miniHistoryPtr: 0 as number,
    miniEntryPool: [] as MiniEntry[],
  }

  async function ensurePreviewSamples(registrations: SampleRegistration[]): Promise<void> {
    if (typeof AudioContext === 'undefined') return
    if (!previewAudioContext) {
      try {
        previewAudioContext = new AudioContext({ latencyHint: 'interactive' })
      }
      catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[preview] Failed to create AudioContext for espeak samples:', msg)
        return
      }
    }

    const ctx = previewAudioContext
    for (const reg of registrations) {
      if (reg.type === 'inline' && reg.inlineChannels && reg.inlineSampleRate != null) {
        sampleManager.setSampleData(reg.handle, reg.inlineChannels, reg.inlineSampleRate)
      }
      else if (reg.type === 'espeak' && reg.espeakText) {
        const text = reg.espeakText
        const variant = reg.espeakVariant ?? 'm1'
        const speed = reg.espeakSpeed ?? 0.5
        const pitch = reg.espeakPitch ?? 0.5
        try {
          const { channels, sampleRate } = await fetchEspeakSample(ctx, {
            text,
            variant,
            speed,
            pitch,
          })
          sampleManager.setSampleData(reg.handle, channels, sampleRate)
        }
        catch (error) {
          const msg = error instanceof Error ? error.message : String(error)
          console.error('[preview] Error fetching espeak sample:', msg)
          sampleManager.setSampleError(reg.handle, msg)
        }
      }
    }
  }

  return {
    setControlCompileSnapshot(ccs: ControlCompileSnapshot) {
      state.result = ccs
      state.bytecode = ccs.compile.bytecode
      state.historySourceMap = ccs.compile.historySourceMap || []
      if (state.bytecode) state.structureHash = bytecodeStructureHash(state.bytecode)
      if (ccs.compile.sampleRegistrations?.length) {
        // Fire and forget – sampler widgets will pick up data when ready
        void ensurePreviewSamples(ccs.compile.sampleRegistrations)
      }
    },
    runPreview(vmId = 0, sampleCount = 0, bufferLength = 128) {
      const t0 = DEBUG_PREVIEW_TIMING ? performance.now() : 0
      if (!state.bytecode) throw new Error('No code set. Call setCode() first.')
      const nyquist = state.sampleRate / 2
      const piOverNyquist = Math.PI / nyquist
      const bpm = state.result!.compile.bpm
      runtime.resetAudioVmAt(vmId)
      const len = state.bytecode.length
      if (state.audioOpsCapacity < len) {
        if (state.audioOpsPtr) runtime.freeFloat32Buffer(state.audioOpsPtr)
        state.audioOpsPtr = runtime.createFloat32Buffer(len)
        state.audioOpsCapacity = len
      }
      const audioOpsPtr = state.audioOpsPtr
      new Float32Array(runtime.buffer, audioOpsPtr, len).set(state.bytecode)
      runtime.runAudioVmAt(
        vmId,
        audioOpsPtr,
        len,
        bufferLength,
        sampleCount,
        state.sampleRate,
        nyquist,
        piOverNyquist,
        bpm,
      )
      runtime.gc()
      const infoPtr = runtime.getAudioVmInfoPtr(vmId)
      if (!state.vmView || state.structureHash !== state.lastBuiltStructureHash) {
        state.vmView = new AudioVmView(runtime.memory, infoPtr)
        state.lastBuiltStructureHash = state.structureHash
        state.lastAppliedHistorySourceMap = state.historySourceMap
      }
      else if (state.historySourceMap !== state.lastAppliedHistorySourceMap) {
        state.lastAppliedHistorySourceMap = state.historySourceMap
      }
      const result = createTypedHistories(state.vmView!.histories, state.historySourceMap)
      state.histories = result.typedHistories
      state.userCallHistories = result.userCallHistories
      const vmView = state.vmView
      const histories = state.histories
      const userCallHistories = state.userCallHistories
      if (DEBUG_PREVIEW_TIMING) console.log('[preview] runPreview', (performance.now() - t0).toFixed(2), 'ms')
      return { vmView, histories, userCallHistories }
    },
    runMiniPreview(
      compileResult: MiniCompileResult,
      startSeconds: number,
      endSeconds: number,
      bars: number,
    ) {
      const t0 = DEBUG_PREVIEW_TIMING ? performance.now() : 0
      const result = state.result
      if (!result) throw new Error('No code set. Call setCode() first.')
      const arraySize = MINI_ARRAY_HEADER_SIZE + compileResult.bytecode.length
      if (state.miniBytecodeCapacity < arraySize) {
        if (state.miniBytecodePtr) runtime.freeFloat32Buffer(state.miniBytecodePtr)
        state.miniBytecodePtr = runtime.createFloat32Buffer(arraySize)
        state.miniBytecodeCapacity = arraySize
      }
      if (!state.miniHistoryPtr) {
        state.miniHistoryPtr = runtime.createFloat32Buffer(
          MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE,
        )
      }
      const bytecode$ = state.miniBytecodePtr
      const history$ = state.miniHistoryPtr
      const buf = runtime.memory.buffer
      const array = new Float32Array(buf, bytecode$, arraySize)
      array[0] = compileResult.bytecode.length
      array[1] = 1
      array.set(compileResult.bytecode, MINI_ARRAY_HEADER_SIZE)
      const sampleRate = 100
      const windowStartSample = startSeconds * sampleRate
      const windowEndSample = endSeconds * sampleRate
      runtime.generateMiniHistoryWindow(
        bytecode$,
        history$,
        windowStartSample,
        windowEndSample,
        result.compile.bpm,
        sampleRate,
        bars,
      )
      const historyLen = MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE
      const history = new Float32Array(buf, history$, historyLen)
      const length = history[0]
      ensureMiniEntryPool(state.miniEntryPool, length)
      const pool = state.miniEntryPool
      const entries: MiniEntry[] = []
      for (let i = 0; i < length; i++) {
        const base = MINI_HISTORY_HEADER_SIZE + i * MINI_HISTORY_ENTRY_SIZE
        const startSample = history[base + 4]
        const endSample = history[base + 5]
        const e = pool[i]
        e.opIndex = history[base]
        e.voiceIndex = history[base + 1]
        e.value = history[base + 2]
        e.velocity = history[base + 3]
        e.startSeconds = startSample / sampleRate
        e.endSeconds = endSample / sampleRate
        entries.push({ ...e })
      }
      if (DEBUG_PREVIEW_TIMING) console.log('[preview] runMiniPreview', (performance.now() - t0).toFixed(2), 'ms')
      return entries
    },
    *renderToAudio(
      code: string,
      bars: number,
      beatsPerBar = 4,
      vmId = 999,
    ): Generator<number, { left: Float32Array; right: Float32Array }, void> {
      const ccs = controlPipeline.compileSource(code)
      this.setControlCompileSnapshot(ccs)
      if (ccs.errors.length > 0) throw new Error(`Compilation failed:\n${ccs.errors.join('\n')}`)
      if (!state.bytecode) throw new Error('No bytecode generated')
      const bpm = ccs.compile.bpm
      const totalSamples = Math.floor((bars * beatsPerBar * 60 / bpm) * state.sampleRate)
      const chunk = 128
      const numChunks = Math.ceil(totalSamples / chunk)
      const renderedLength = numChunks * chunk
      const left = new Float32Array(renderedLength)
      const right = new Float32Array(renderedLength)
      const nyquist = state.sampleRate / 2
      const piOverNyquist = Math.PI / nyquist
      const audioOpsPtr = runtime.createFloat32Buffer(state.bytecode.length)
      new Float32Array(runtime.buffer, audioOpsPtr, state.bytecode.length).set(state.bytecode)
      runtime.resetAudioVmAt(vmId)
      let offset = 0
      for (let i = 0; i < numChunks; i++) {
        runtime.runAudioVmAt(
          vmId,
          audioOpsPtr,
          state.bytecode!.length,
          chunk,
          offset,
          state.sampleRate,
          nyquist,
          piOverNyquist,
          bpm,
        )
        const infoPtr = runtime.getAudioVmInfoPtr(vmId)
        const aInfo = new Uint32Array(runtime.buffer, infoPtr, 10)
        const outputLeftPtr = aInfo[8]
        const outputRightPtr = aInfo[9]
        if (outputLeftPtr && outputRightPtr) {
          left.set(new Float32Array(runtime.buffer, outputLeftPtr, chunk), offset)
          right.set(new Float32Array(runtime.buffer, outputRightPtr, chunk), offset)
        }
        offset += chunk
        if ((i + 1) % 128 === 0 || i === numChunks - 1) {
          yield totalSamples > 0 ? Math.min(1, offset / totalSamples) : 1
        }
      }
      runtime.freeFloat32Buffer(audioOpsPtr)
      yield 1
      return {
        left: left.subarray(0, totalSamples).slice(),
        right: right.subarray(0, totalSamples).slice(),
      }
    },
  }
}
