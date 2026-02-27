import { rpc } from 'utils/rpc'
import type * as WasmExports from '../../as/build/index'
import {
  computeCapturedValuesHash,
  getCapturedValuesFromCaptureStore,
  processRecordRequest,
} from '../lib/record-utils.ts'
import { getSnapshot, track, untrack } from '../lib/memory-registry.ts'
import { createWasmImports } from '../lib/wasm-imports.ts'
import { type WasmSetup, wasmSetup } from '../lib/wasm-setup.ts'
import type { DspProcessor as DspWorklet } from './worklet.ts'

let core: WasmSetup<typeof WasmExports> | null = null
let worklet: DspWorklet | null = null

// Cache for getCapturedValues - avoids running bytecode repeatedly
let capturedValuesCache: { hash: number; values: number[] } | null = null

export class RecordWorker {
  private sourcemapUrl: string = ''
  private sampleSyncPort: MessagePort | null = null

  constructor(sampleSyncPort?: MessagePort) {
    this.sampleSyncPort = sampleSyncPort ?? null
  }

  async loadWasm(binary: ArrayBuffer, opts: { sourcemapUrl: string; config: typeof import('../../asconfig.json') }): Promise<void> {
    this.sourcemapUrl = opts.sourcemapUrl
    core = await wasmSetup<typeof WasmExports>({
      binary,
      sourcemapUrl: this.sourcemapUrl,
      config: opts.config as any,
      imports: ({ memory }) => createWasmImports(memory),
    })
  }

  async getMemoryInfo() {
    const wasmMemoryMb = core?.wasm?.memoryUsage
      ? (core.wasm.memoryUsage() as number) / 1024 / 1024
      : undefined
    return { snapshot: getSnapshot(), wasmMemoryMb }
  }

  // Called by main thread to connect directly to AudioWorklet
  async connectWorklet(port: MessagePort): Promise<void> {
    worklet = rpc<DspWorklet>(port)
    port.start()
  }

  async getCapturedValues(opts: {
    mainBytecode: Float32Array
    scopeId: number
    captureStoreGlobalIdx: number
    numDeps: number
    recordGlobalIndices: number[]
    defaultParamRecordGlobals?: number[]
    sampleRate: number
  }): Promise<number[] | null> {
    if (!core) {
      throw new Error('Recording WASM core not initialized')
    }

    const {
      mainBytecode,
      scopeId,
      captureStoreGlobalIdx,
      numDeps,
      recordGlobalIndices,
      defaultParamRecordGlobals,
      sampleRate,
    } = opts

    const hash = computeCapturedValuesHash(mainBytecode, scopeId, numDeps)
    if (capturedValuesCache && capturedValuesCache.hash === hash) {
      return capturedValuesCache.values
    }

    const { capturedValues } = getCapturedValuesFromCaptureStore({
      core,
      mainBytecode,
      captureStoreGlobalIdx,
      numDeps,
      recordGlobalIndices,
      defaultParamRecordGlobals,
      sampleRate,
      tempVmId: 0,
      bpm: 120,
      callbackId: scopeId,
      useNestedCaptureStore: true,
    })
    core.wasm.__collect()
    capturedValuesCache = { hash, values: capturedValues }
    return capturedValues
  }

  // Record and send result directly to AudioWorklet (bypasses main thread)
  // Returns the captured values used for this recording
  async recordAndSend(opts: {
    handle: number
    mainBytecode: Float32Array
    setupBytecode: Float32Array
    loopBytecode: Float32Array
    captureStoreGlobalIdx: number
    recordGlobalIndices: number[]
    defaultParamRecordGlobals?: number[]
    callbackId: number
    useNestedCaptureStore?: boolean
    numSamples: number
    sampleRate: number
  }): Promise<number[]> {
    if (!core) {
      throw new Error('Recording WASM core not initialized')
    }
    if (!worklet) {
      throw new Error('Worklet not connected')
    }

    const {
      handle,
      mainBytecode,
      setupBytecode,
      loopBytecode,
      captureStoreGlobalIdx,
      recordGlobalIndices,
      defaultParamRecordGlobals,
      callbackId,
      useNestedCaptureStore = true,
      numSamples,
      sampleRate,
    } = opts

    try {
      const recordCallbacks = new Map([
        [
          callbackId,
          {
            setup: setupBytecode,
            loop: loopBytecode,
            dependencies: [],
            recordGlobalIndices,
            captureStoreGlobalIdx,
            defaultParamRecordGlobals,
            useNestedCaptureStore,
          },
        ],
      ])

      const recordResult = processRecordRequest({
        core,
        recordRequest: { seconds: numSamples / sampleRate, callbackId },
        recordCallbacks,
        mainBytecode,
        sampleRate,
        bpm: 120,
        tempVmId: 0,
      })

      if (!recordResult) {
        throw new Error('Record failed: invalid capture state.')
      }

      untrack(`sab-record-${handle}`)
      const bytes = numSamples * 4
      track(`sab-record-${handle}`, 'SharedArrayBuffer', bytes, { source: 'record-worker:recordAndSend', handle })
      const sharedOutput = new Float32Array(new SharedArrayBuffer(bytes))
      sharedOutput.set(recordResult.output)

      await worklet.setSampleDataDirect({ handle, channels: [sharedOutput], sampleRate })
      this.sampleSyncPort?.postMessage({
        type: 'sampleDataSync',
        handle,
        channels: [sharedOutput.buffer],
        sampleRate,
      })

      return recordResult.capturedValues
    }
    catch (error) {
      console.error(error)
      const errorMsg = error instanceof Error ? error.message : String(error)
      await worklet.setSampleErrorDirect({ handle, error: errorMsg })
      this.sampleSyncPort?.postMessage({ type: 'sampleErrorSync', handle, error: errorMsg })
      throw error
    }
    finally {
      core.wasm.__collect()
    }
  }
}

// When the worker receives a port from the main thread, set up RPC
self.onmessage = (e: MessageEvent) => {
  if (e.data?.type === 'init' && e.data.port) {
    const port = e.data.port as MessagePort
    const sampleSyncPort = e.data.sampleSyncPort as MessagePort | undefined
    const worker = new RecordWorker(sampleSyncPort)
    rpc(port, worker)
    port.start()
  }
}
