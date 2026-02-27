import type * as WasmExports from '../../as/build/index.d.ts'
import { disassembleBytecode, type RecordCallback } from '../live/compiler/index.ts'
import { hashF32Bits } from './bytecode-hash.ts'
import type { WasmSetup } from './wasm-setup.ts'

export function computeCapturedValuesHash(mainBytecode: Float32Array, scopeId: number, numDeps: number): number {
  let hash = hashF32Bits(mainBytecode)
  hash = (hash * 31 + scopeId) | 0
  hash = (hash * 31 + numDeps) | 0
  return hash
}

export function getCapturedValuesFromCaptureStore(opts: {
  core: WasmSetup<typeof WasmExports>
  mainBytecode: Float32Array
  captureStoreGlobalIdx: number
  numDeps: number
  defaultParamRecordGlobals?: number[]
  recordGlobalIndices: number[]
  sampleRate: number
  tempVmId?: number
  bpm?: number
  callbackId?: number
  useNestedCaptureStore?: boolean
}): { capturedValues: number[]; undefinedRecordGlobals: Set<number> } {
  const {
    core,
    mainBytecode,
    captureStoreGlobalIdx,
    numDeps,
    defaultParamRecordGlobals,
    recordGlobalIndices,
    sampleRate,
    tempVmId = 0,
    bpm = 120,
    callbackId = 0,
    useNestedCaptureStore = false,
  } = opts

  const mainPtr = core.wasm.createFloat32Buffer(mainBytecode.length) >>> 0
  new Float32Array(core.memory.buffer, mainPtr, mainBytecode.length).set(mainBytecode)

  core.wasm.resetAudioVmAt(tempVmId)
  const nyquist = sampleRate / 2
  const extractionBufferLength = 128
  core.wasm.runAudioVmAt(tempVmId, mainPtr, mainBytecode.length, extractionBufferLength, 0, sampleRate, nyquist,
    Math.PI / nyquist, bpm)

  const capturedValues: number[] = []
  const skipIndices = new Set<number>()
  const undefinedRecordGlobals = new Set<number>()
  if (defaultParamRecordGlobals?.length) {
    recordGlobalIndices.forEach((recordGlobalIdx, i) => {
      if (defaultParamRecordGlobals.includes(recordGlobalIdx)) skipIndices.add(i)
    })
  }
  for (let i = 0; i < numDeps; i++) {
    const recordGlobalIdx = recordGlobalIndices[i]!
    const isUndefined = useNestedCaptureStore
      ? core.wasm.getAudioVmNestedArrayElementIsUndefined(tempVmId, captureStoreGlobalIdx, callbackId, i)
      : core.wasm.getAudioVmArrayElementIsUndefined(tempVmId, captureStoreGlobalIdx, i)
    const value = useNestedCaptureStore
      ? core.wasm.getAudioVmNestedArrayElementAt(tempVmId, captureStoreGlobalIdx, callbackId, i)
      : core.wasm.getAudioVmArrayElementAt(tempVmId, captureStoreGlobalIdx, i)
    const treatAsUndefined = isUndefined || Number.isNaN(value)
    if (treatAsUndefined) undefinedRecordGlobals.add(recordGlobalIdx)
    capturedValues.push(skipIndices.has(i) ? 0 : (treatAsUndefined ? 0 : value))
  }

  core.wasm.freeFloat32Buffer(mainPtr)

  const invalidIdx = capturedValues.findIndex((v, i) => !skipIndices.has(i) && Number.isNaN(v))
  if (invalidIdx >= 0) {
    throw new Error(
      `Invalid capture at index ${invalidIdx}: captured variable is not a scalar (e.g. was reassigned to a function or array).`,
    )
  }

  return { capturedValues, undefinedRecordGlobals }
}

export function executeRecordCallback(opts: {
  core: WasmSetup<typeof WasmExports>
  setupBytecode: Float32Array
  loopBytecode: Float32Array
  recordGlobalIndices: number[]
  capturedValues: number[]
  numSamples: number
  sampleRate: number
  tempVmId?: number
  bpm?: number
  chunkSize?: number
}): Float32Array {
  const {
    core,
    setupBytecode,
    loopBytecode,
    recordGlobalIndices,
    capturedValues,
    numSamples,
    sampleRate,
    tempVmId = 998,
    bpm = 120,
    chunkSize = 128,
  } = opts

  const output = new Float32Array(numSamples)

  core.wasm.resetAudioVmAt(tempVmId)

  for (let i = 0; i < recordGlobalIndices.length; i++) {
    const recordGlobalIdx = recordGlobalIndices[i]!
    const value = capturedValues[i] ?? 0
    core.wasm.setAudioVmGlobalAt(tempVmId, recordGlobalIdx, value)
  }

  if (setupBytecode.length > 0) {
    const setupPtr = core.wasm.createFloat32Buffer(setupBytecode.length) >>> 0
    new Float32Array(core.memory.buffer, setupPtr, setupBytecode.length).set(setupBytecode)

    const nyquist = sampleRate / 2
    const piOverNyquist = Math.PI / nyquist
    core.wasm.runAudioVmAt(tempVmId, setupPtr, setupBytecode.length, chunkSize, 0, sampleRate, nyquist, piOverNyquist,
      bpm)
    core.wasm.freeFloat32Buffer(setupPtr)
  }

  const loopPtr = core.wasm.createFloat32Buffer(loopBytecode.length) >>> 0
  new Float32Array(core.memory.buffer, loopPtr, loopBytecode.length).set(loopBytecode)

  const nyquist = sampleRate / 2
  const piOverNyquist = Math.PI / nyquist
  let sampleCount = 0

  while (sampleCount < numSamples) {
    const bufferLength = Math.min(chunkSize, numSamples - sampleCount)

    core.wasm.runAudioVmAt(tempVmId, loopPtr, loopBytecode.length, bufferLength, sampleCount, sampleRate, nyquist,
      piOverNyquist, bpm)

    const infoPtr = core.wasm.getAudioVmInfoAt(tempVmId) >>> 0
    const info = new Uint32Array(core.memory.buffer, infoPtr, 10)
    const outputLeftPtr = (info[8] ?? 0) >>> 0

    if (outputLeftPtr) {
      const audioL = new Float32Array(core.memory.buffer, outputLeftPtr, bufferLength)
      output.set(audioL, sampleCount)
    }

    sampleCount += bufferLength
  }

  core.wasm.freeFloat32Buffer(loopPtr)

  return output
}

function findMaxRecordGlobalIdx(recordGlobalIndices: number[]): number {
  let maxRecordGlobalIdx = -1
  for (const recordGlobalIdx of recordGlobalIndices) {
    if (recordGlobalIdx > maxRecordGlobalIdx) maxRecordGlobalIdx = recordGlobalIdx
  }
  return maxRecordGlobalIdx
}

function preSizeGlobalsArray(core: WasmSetup<typeof WasmExports>, minSize: number): void {
  if (minSize <= 0) return
  core.wasm.ensureSampleRecordGlobalsSize(minSize)
}

function setCapturedValues(core: WasmSetup<typeof WasmExports>, recordGlobalIndices: number[], capturedValues: number[],
  skipRecordGlobals: Set<number>, recordVmId: number): void
{
  for (let i = 0; i < recordGlobalIndices.length; i++) {
    const recordGlobalIdx = recordGlobalIndices[i]!
    if (skipRecordGlobals.has(recordGlobalIdx)) continue
    const value = capturedValues[i] ?? 0
    core.wasm.setSampleRecordGlobal(recordGlobalIdx, value)
  }
}

function initializeSampleRecord(core: WasmSetup<typeof WasmExports>, setupBytecode: Float32Array,
  loopBytecode: Float32Array, numSamples: number, sampleRate: number): void
{
  const setupPtr = core.wasm.createFloat32Buffer(setupBytecode.length) >>> 0
  const setupView = new Float32Array(core.memory.buffer, setupPtr, setupBytecode.length)
  setupView.set(setupBytecode)

  const loopPtr = core.wasm.createFloat32Buffer(loopBytecode.length) >>> 0
  const loopView = new Float32Array(core.memory.buffer, loopPtr, loopBytecode.length)
  loopView.set(loopBytecode)

  core.wasm.initSampleRecord(setupPtr, setupBytecode.length, loopPtr, loopBytecode.length, numSamples, sampleRate)
  core.wasm.freeFloat32Buffer(setupPtr)
  core.wasm.freeFloat32Buffer(loopPtr)
}

function runRecordSetup(core: WasmSetup<typeof WasmExports>): void {
  core.wasm.runSampleRecordSetup()
}

function executeRecordLoop(core: WasmSetup<typeof WasmExports>): void {
  core.wasm.recordSampleAll()
}

function extractRecordOutput(core: WasmSetup<typeof WasmExports>, numSamples: number): Float32Array {
  const outputPtr = core.wasm.getSampleRecordOutputPtr() >>> 0
  const output = new Float32Array(numSamples)
  const wasmOutput = new Float32Array(core.memory.buffer, outputPtr, numSamples)
  output.set(wasmOutput)
  return output
}

export function executeRecordCallbackWithSampleRecord(opts: {
  core: WasmSetup<typeof WasmExports>
  setupBytecode: Float32Array
  loopBytecode: Float32Array
  recordGlobalIndices: number[]
  capturedValues: number[]
  defaultParamRecordGlobals?: number[]
  undefinedRecordGlobals?: Set<number>
  maxSetupGlobalIndex?: number
  numSamples: number
  sampleRate: number
}): Float32Array {
  const {
    core,
    setupBytecode,
    loopBytecode,
    recordGlobalIndices,
    capturedValues,
    defaultParamRecordGlobals,
    undefinedRecordGlobals,
    maxSetupGlobalIndex,
    numSamples,
    sampleRate,
  } = opts

  initializeSampleRecord(core, setupBytecode, loopBytecode, numSamples, sampleRate)

  const maxRecordGlobalIdx = findMaxRecordGlobalIdx(recordGlobalIndices)
  const maxGlobalIdx = Math.max(maxRecordGlobalIdx, opts.maxSetupGlobalIndex ?? -1)
  preSizeGlobalsArray(core, maxGlobalIdx + 1)
  // Skip only undefined slots so setup can set default-param slots when the captured value was undefined.
  const skipRecordGlobals = new Set(undefinedRecordGlobals ?? [])
  setCapturedValues(core, recordGlobalIndices, capturedValues, skipRecordGlobals, 1)
  runRecordSetup(core)

  executeRecordLoop(core)

  return extractRecordOutput(core, numSamples)
}

export type RecordRequest = {
  seconds: number
  callbackId: number
}

export function processRecordRequest(opts: {
  core: WasmSetup<typeof WasmExports>
  recordRequest: RecordRequest
  recordCallbacks: Map<number, RecordCallback>
  mainBytecode: Float32Array
  sampleRate?: number
  bpm?: number
  tempVmId?: number
}): { output: Float32Array; capturedValues: number[] } | null {
  const {
    core,
    recordRequest,
    recordCallbacks,
    mainBytecode,
    sampleRate = 48000,
    bpm = 120,
    tempVmId = 0,
  } = opts

  const { seconds, callbackId } = recordRequest
  const callbackData = recordCallbacks.get(callbackId)

  if (!callbackData) {
    return null
  }

  const {
    setup: setupBytecode,
    loop: loopBytecode,
    captureStoreGlobalIdx,
    recordGlobalIndices,
    defaultParamRecordGlobals,
    maxSetupGlobalIndex,
  } = callbackData
  const numSamples = Math.floor(seconds * sampleRate)
  const numDeps = recordGlobalIndices.length

  try {
    const { capturedValues, undefinedRecordGlobals } = getCapturedValuesFromCaptureStore({
      core,
      mainBytecode,
      captureStoreGlobalIdx,
      numDeps,
      defaultParamRecordGlobals,
      recordGlobalIndices,
      sampleRate,
      tempVmId,
      bpm,
      callbackId,
      useNestedCaptureStore: callbackData.useNestedCaptureStore,
    })
    const output = executeRecordCallbackWithSampleRecord({
      core,
      setupBytecode,
      loopBytecode,
      recordGlobalIndices,
      capturedValues,
      defaultParamRecordGlobals,
      undefinedRecordGlobals,
      maxSetupGlobalIndex,
      numSamples,
      sampleRate,
    })
    return { output, capturedValues }
  }
  catch (error) {
    console.groupCollapsed('Main bytecode')
    console.log(disassembleBytecode(mainBytecode).join('\n'))
    console.groupEnd()
    throw error
  }
}
