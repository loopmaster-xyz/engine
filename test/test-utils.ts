import { expect } from 'bun:test'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Struct } from 'utils/struct'
import { MINI_ARRAY_HEADER_SIZE, MINI_HISTORY_ENTRY_SIZE, MINI_HISTORY_HEADER_SIZE,
  MINI_HISTORY_SIZE } from '../as/assembly/mini/constants.ts'
import type * as WasmExports from '../as/build/index.d.ts'
import config from '../asconfig.json'
import { processRecordRequest } from '../src/lib/record-utils.ts'
import { sampleManager } from '../src/lib/sample-manager.ts'
import { createWasmImports } from '../src/lib/wasm-imports.ts'
import { type WasmSetup, wasmSetup } from '../src/lib/wasm-setup.ts'
import { type CompileResult, disassembleBytecode, type RecordCallback,
  type SampleRegistration } from '../src/live/compiler/index.ts'
import { type ControlCompileSnapshot, controlPipeline } from '../src/live/pipeline.ts'
import { compileMiniNotation } from '../src/mini/compiler.ts'

const DEBUG = process.env.DEBUG

declare module 'bun:test' {
  interface Matchers<T> {
    toMatchAudio(expected: [number[], number[]] | [Float32Array, Float32Array], sliceLength?: number,
      tolerance?: number): T
  }
}

type Options = {
  noReset?: boolean
  ticks?: number
  bpm?: number
  bpmOverride?: number
  sampleRate?: number
  vmId?: number
  bufferLength?: number
  sampleCount?: number
}

type AudioResult = [left: Float32Array, right: Float32Array] & {
  compileResult?: ControlCompileSnapshot
}

export let coreSingleton: WasmSetup<typeof WasmExports> | null = null

export function sine(hz: number, options: Options = {}): AudioResult {
  const ticks = options.ticks ?? 8
  const sampleRate = options.sampleRate ?? 48000
  const bufferLength = options.bufferLength ?? 128
  const totalSamples = ticks * bufferLength

  const left = new Float32Array(totalSamples)
  const right = new Float32Array(totalSamples)

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate
    const value = Math.sin(2 * Math.PI * hz * t)
    left[i] = value
    right[i] = value
  }

  return [left, right]
}

export function setOversampleModes(
  { up, down }: { up: 'hold' | 'linear'; down: 'decimate' | 'boxcar' },
  options: { vmId?: number } = {},
): void {
  const core = coreSingleton
  if (!core) throw new Error('WASM not loaded. Call setup() first.')
  const vmId = options.vmId ?? 0
  const upMode = up === 'linear' ? 1 : 0
  const downMode = down === 'boxcar' ? 1 : 0
  core.wasm.setAudioVmOversampleModes(vmId, upMode, downMode)
}

function resolveWasmPath(p: string): string {
  const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p)
  if (fs.existsSync(abs)) return abs
  throw new Error(`WASM not found at "${abs}". Set LM3_WASM_PATH or pass wasmPath to setup.`)
}

export async function setup(wasmPath?: string): Promise<void> {
  if (coreSingleton) return

  const path = wasmPath ?? process.env.LM3_WASM_PATH ?? 'as/build/index.wasm'
  const wasmAbsPath = resolveWasmPath(path)
  const binary = fs.readFileSync(wasmAbsPath).buffer

  coreSingleton = await wasmSetup<typeof WasmExports>({
    binary,
    sourcemapUrl: new URL('file://' + wasmAbsPath + '.map').toString(),
    config: config as any,
    imports: ({ memory }) => createWasmImports(memory),
  })
}

export function getCore(): WasmSetup<typeof WasmExports> {
  if (!coreSingleton) {
    throw new Error('WASM not loaded. Call setup() first.')
  }
  return coreSingleton
}

export function audio(code: string, options: Options = {}): AudioResult {
  if (!coreSingleton) {
    throw new Error('WASM not loaded. Call setup() first.')
  }

  const ticks = options.ticks ?? 8
  const bpm = options.bpm ?? 120
  const bpmOverride = options.bpmOverride ?? 0
  const sampleRate = options.sampleRate ?? 48000
  const vmId = options.vmId ?? 0
  const bufferLength = options.bufferLength ?? 128
  let sampleCount = options.sampleCount ?? 0

  const core = coreSingleton

  if (!options.noReset) {
    core.wasm.resetAudioVmAt(vmId)
  }
  core.wasm.bpmOverride(bpmOverride)

  const result = controlPipeline.compileSource(code)

  if (result.errors.length > 0) {
    throw new Error(`Compilation failed:\n${result.errors.join('\n')}`)
  }

  if (!result.compile.bytecode) {
    throw new Error('No bytecode generated')
  }

  const bytecode = result.compile.bytecode

  if (DEBUG) {
    console.log('Bytecode length:', bytecode.length)
    console.log('\nDisassembly:')
    const disassembly = disassembleBytecode(bytecode)
    for (const line of disassembly) {
      console.log(line)
    }
    console.log('')
  }

  // Use the WASM-side float32 arena allocator to match worklet execution.
  const audioOpsPtr = core.wasm.createFloat32Buffer(bytecode.length)
  const audioOpsView = new Float32Array(core.memory.buffer, audioOpsPtr, bytecode.length)
  audioOpsView.set(bytecode)
  const audioOpsLength = bytecode.length

  const totalSamples = ticks * bufferLength
  const left = new Float32Array(totalSamples)
  const right = new Float32Array(totalSamples)

  for (let t = 0; t < ticks; t++) {
    const nyquist = sampleRate * 0.5
    const piOverNyquist = Math.PI / nyquist

    core.wasm.runAudioVmAt(
      vmId,
      audioOpsPtr,
      audioOpsLength,
      bufferLength,
      sampleCount,
      sampleRate,
      nyquist,
      piOverNyquist,
      bpm,
    )

    const aInfoPtr = core.wasm.getAudioVmInfoAt(vmId)
    const aInfo = new Uint32Array(core.memory.buffer, aInfoPtr, 10)

    // Read directly from dedicated output buffers
    const outputLeftPtr = aInfo[8] ?? 0
    const outputRightPtr = aInfo[9] ?? 0
    if (outputLeftPtr && outputRightPtr) {
      const audioL = new Float32Array(core.memory.buffer, outputLeftPtr, bufferLength)
      const audioR = new Float32Array(core.memory.buffer, outputRightPtr, bufferLength)
      left.set(audioL, sampleCount - (options.sampleCount ?? 0))
      right.set(audioR, sampleCount - (options.sampleCount ?? 0))
    }

    sampleCount += bufferLength
  }

  core.wasm.freeFloat32Buffer(audioOpsPtr)
  return Object.assign([left, right] as [left: Float32Array, right: Float32Array], { compileResult: result })
}

export function runTicks(code: string, options: Options = {}): void {
  if (!coreSingleton) {
    throw new Error('WASM not loaded. Call setup() first.')
  }

  const ticks = options.ticks ?? 8
  const bpm = options.bpm ?? 120
  const bpmOverride = options.bpmOverride ?? 0
  const sampleRate = options.sampleRate ?? 48000
  const vmId = options.vmId ?? 0
  const bufferLength = options.bufferLength ?? 128

  const core = coreSingleton

  core.wasm.resetAudioVmAt(vmId)
  ;(core.wasm as any).bpmOverride?.(bpmOverride)

  const result = controlPipeline.compileSource(code)
  if (result.errors.length > 0) {
    throw new Error(`Compilation failed:\n${result.errors.join('\n')}`)
  }
  if (!result.compile.bytecode) {
    throw new Error('No bytecode generated')
  }

  const bytecode = result.compile.bytecode
  const audioOpsPtr = core.wasm.createFloat32Buffer(bytecode.length)
  new Float32Array(core.memory.buffer, audioOpsPtr, bytecode.length).set(bytecode)
  const audioOpsLength = bytecode.length

  let sampleCount = 0
  for (let t = 0; t < ticks; t++) {
    const nyquist = sampleRate * 0.5
    const piOverNyquist = Math.PI / nyquist
    try {
      core.wasm.runAudioVmAt(
        vmId,
        audioOpsPtr,
        audioOpsLength,
        bufferLength,
        sampleCount,
        sampleRate,
        nyquist,
        piOverNyquist,
        bpm,
      )
    }
    catch (e) {
      throw new Error(`runAudioVmAt failed at tick=${t} sampleCount=${sampleCount}: ${(e as Error).message}`)
    }
    sampleCount += bufferLength
  }

  try {
    core.wasm.resetAudioVmAt(vmId)
  }
  catch (e) {
    throw new Error(`resetAudioVmAt failed after run: ${(e as Error).message}`)
  }

  core.wasm.freeFloat32Buffer(audioOpsPtr)
}

function registerAllSampleHandles(sampleRegistrations: SampleRegistration[]): void {
  for (const reg of sampleRegistrations || []) {
    if (reg.type === 'record' && reg.recordSeconds !== undefined && reg.recordCallbackId !== undefined) {
      sampleManager.registerRecord(null, reg.recordSeconds, reg.recordCallbackId)
    }
  }
}

function groupRegistrationsByHandle(sampleRegistrations: SampleRegistration[]): Map<number, SampleRegistration[]> {
  const registrationsByHandle = new Map<number, SampleRegistration[]>()
  for (const reg of sampleRegistrations || []) {
    if (!registrationsByHandle.has(reg.handle)) {
      registrationsByHandle.set(reg.handle, [])
    }
    registrationsByHandle.get(reg.handle)!.push(reg)
  }
  return registrationsByHandle
}

function selectRegistrationForHandle(regs: SampleRegistration[],
  recordCallbacks: Map<number, RecordCallback> | undefined): SampleRegistration
{
  const regWithCapturedInfo = regs.find(r => {
    if (r.type !== 'record' || r.recordCallbackId === undefined) return false
    const callbackData = recordCallbacks?.get(r.recordCallbackId)
    return callbackData && callbackData.recordGlobalIndices.length > 0
  })
  const chosen = regWithCapturedInfo || regs[0]!
  return chosen
}

function storeFreesoundSample(handle: number): void {
  const length = 512
  const sample = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    sample[i] = i / length
  }
  sampleManager.setSampleData(handle, [sample], 48000)
}

function storeRecordSample(reg: SampleRegistration, handle: number, compileResult: CompileResult,
  core: WasmSetup<typeof WasmExports>, options: Options): void
{
  if (reg.type !== 'record' || reg.recordSeconds === undefined || reg.recordCallbackId === undefined
    || !compileResult.recordCallbacks)
  {
    return
  }

  const recordSampleRate = options.sampleRate ?? 48000
  const mainBytecode = compileResult.bytecode!
  const callbackData = compileResult.recordCallbacks.get(reg.recordCallbackId)

  if (!callbackData) {
    return
  }

  let recordResult: { output: Float32Array; capturedValues: number[] } | null = null
  try {
    recordResult = processRecordRequest({
      core,
      recordRequest: { seconds: reg.recordSeconds, callbackId: reg.recordCallbackId },
      recordCallbacks: compileResult.recordCallbacks,
      mainBytecode,
      sampleRate: recordSampleRate,
      bpm: options.bpm ?? 120,
      tempVmId: options.vmId ?? 0,
    })
  }
  catch (e) {
    console.error('[record path] storeRecordSample failed for handle', handle, 'callbackId', reg.recordCallbackId, e)
    throw e
  }

  if (recordResult) {
    sampleManager.setSampleData(handle, [recordResult.output], recordSampleRate)
  }
  else {
    throw new Error(
      `[storeRecordSample] processRecordRequest returned null for handle: ${handle} callbackId: ${reg.recordCallbackId}`,
    )
  }
}

function storeSamplesForRegistrations(compileResult: CompileResult, core: WasmSetup<typeof WasmExports>,
  options: Options): void
{
  const registrationsByHandle = groupRegistrationsByHandle(compileResult.sampleRegistrations)
  const entries = Array.from(registrationsByHandle.entries())
  entries.sort(([, a], [, b]) => {
    const aRecord = a.find((r): r is SampleRegistration & { type: 'record'; recordSeconds: number } =>
      r.type === 'record' && typeof (r as any).recordSeconds === 'number'
    )
    const bRecord = b.find((r): r is SampleRegistration & { type: 'record'; recordSeconds: number } =>
      r.type === 'record' && typeof (r as any).recordSeconds === 'number'
    )
    const aSec = aRecord ? aRecord.recordSeconds : 0
    const bSec = bRecord ? bRecord.recordSeconds : 0
    return aSec - bSec
  })

  for (const [handle, regs] of entries) {
    const recordRegs = regs.filter((r): r is Extract<SampleRegistration, { type: 'record' }> => r.type === 'record')
    const regToUse = selectRegistrationForHandle(regs, compileResult.recordCallbacks)

    if (regToUse.type === 'freesound' && regToUse.freesoundId !== undefined) {
      storeFreesoundSample(handle)
    }
    else if (regToUse.type === 'record') {
      storeRecordSample(regToUse, handle, compileResult, core, options)
    }
  }
}

export async function audioAsync(code: string, options: Options = {}): Promise<AudioResult> {
  if (!coreSingleton) {
    throw new Error('WASM not loaded. Call setup() first.')
  }

  // Reset sample manager to ensure clean state and consistent handles
  sampleManager.clear()

  const result = controlPipeline.compileSource(code)

  const bytecode = result.compile.bytecode!

  if (DEBUG) {
    console.log('Bytecode length:', bytecode.length)
    console.log('\nDisassembly:')
    const disassembly = disassembleBytecode(bytecode)
    for (const line of disassembly) {
      console.log(line)
    }
    console.log('')
  }

  if (result.errors.length > 0) {
    throw new Error(`Compilation failed:\n${result.errors.join('\n')}`)
  }

  if (!result.compile.bytecode) {
    throw new Error('No bytecode generated')
  }

  const core = coreSingleton
  if (!core) {
    throw new Error('WASM not loaded. Call setup() first.')
  }

  registerAllSampleHandles(result.compile.sampleRegistrations)

  storeSamplesForRegistrations(result.compile, core, options)

  // Use the already-compiled bytecode instead of recompiling
  const ticks = options.ticks ?? 8
  const bpm = options.bpm ?? 120
  const sampleRate = options.sampleRate ?? 48000
  const vmId = options.vmId ?? 0
  const bufferLength = options.bufferLength ?? 128

  if (!core) {
    throw new Error('WASM not loaded. Call setup() first.')
  }

  core.wasm.resetAudioVmAt(vmId)

  const audioOpsPtr = core.wasm.createFloat32Buffer(bytecode.length)
  new Float32Array(core.memory.buffer, audioOpsPtr, bytecode.length).set(bytecode)
  const audioOpsLength = bytecode.length

  const totalSamples = ticks * bufferLength
  const left = new Float32Array(totalSamples)
  const right = new Float32Array(totalSamples)

  let sampleCount = 0
  for (let t = 0; t < ticks; t++) {
    const nyquist = sampleRate * 0.5
    const piOverNyquist = Math.PI / nyquist

    core.wasm.runAudioVmAt(
      vmId,
      audioOpsPtr,
      audioOpsLength,
      bufferLength,
      sampleCount,
      sampleRate,
      nyquist,
      piOverNyquist,
      bpm,
    )

    const aInfoPtr = core.wasm.getAudioVmInfoAt(vmId)
    const aInfo = new Uint32Array(core.memory.buffer, aInfoPtr, 10)

    // Read directly from dedicated output buffers
    const outputLeftPtr = aInfo[8] ?? 0
    const outputRightPtr = aInfo[9] ?? 0
    if (outputLeftPtr && outputRightPtr) {
      const audioL = new Float32Array(core.memory.buffer, outputLeftPtr, bufferLength)
      const audioR = new Float32Array(core.memory.buffer, outputRightPtr, bufferLength)
      left.set(audioL, sampleCount)
      right.set(audioR, sampleCount)
    }

    sampleCount += bufferLength
  }

  core.wasm.freeFloat32Buffer(audioOpsPtr)
  return [left, right]
}

expect.extend({
  toMatchAudio(
    received: unknown,
    expected: [number[], number[]] | [Float32Array, Float32Array],
    sliceLength: number = 3,
    tolerance?: number,
  ) {
    if (!received || !Array.isArray(received) || received.length !== 2) {
      return {
        message: () => `Expected AudioResult, but got ${typeof received}`,
        pass: false,
      }
    }

    function json(audio: Float32Array | Array<number>): string {
      return Array.from(audio).map(v => parseFloat(v.toFixed(4)).toString()).join(',')
    }

    const audioResult = received as AudioResult
    let [expectedLeft, expectedRight] = expected
    expectedLeft = expectedLeft.slice(0, sliceLength)
    expectedRight = expectedRight.slice(0, sliceLength)
    const leftActualArr = audioResult[0].slice(0, expectedLeft.length)
    const rightActualArr = audioResult[1].slice(0, expectedRight.length)

    const withinTolerance = (a: number, e: number) => (tolerance == null ? false : Math.abs(a - e) <= tolerance)
    let leftMatch: boolean
    let rightMatch: boolean
    let maxLeftDiff = 0
    let maxRightDiff = 0
    if (tolerance != null) {
      const leftLenMatch = leftActualArr.length === expectedLeft.length
      const rightLenMatch = rightActualArr.length === expectedRight.length
      if (leftLenMatch) {
        for (let i = 0; i < leftActualArr.length; i++) {
          const d = Math.abs(leftActualArr[i] - expectedLeft[i])
          if (d > maxLeftDiff) maxLeftDiff = d
        }
      }
      if (rightLenMatch) {
        for (let i = 0; i < rightActualArr.length; i++) {
          const d = Math.abs(rightActualArr[i] - expectedRight[i])
          if (d > maxRightDiff) maxRightDiff = d
        }
      }
      leftMatch = leftLenMatch && leftActualArr.every((a, i) => withinTolerance(a, expectedLeft[i]))
      rightMatch = rightLenMatch && rightActualArr.every((a, i) => withinTolerance(a, expectedRight[i]))
    }
    else {
      leftMatch = JSON.stringify(json(leftActualArr)) === JSON.stringify(json(expectedLeft))
      rightMatch = JSON.stringify(json(rightActualArr)) === JSON.stringify(json(expectedRight))
    }

    if (leftMatch && rightMatch) {
      return {
        message: () => `Expected audio not to match ${JSON.stringify(expected)}`,
        pass: true,
      }
    }

    const diffInfo = tolerance != null
      ? ` Lengths: L ${leftActualArr.length}/${expectedLeft.length} R ${rightActualArr.length}/${expectedRight.length}. Max sample diff: L ${
        maxLeftDiff.toExponential(4)
      } R ${maxRightDiff.toExponential(4)}.`
      : ''
    const shortActualL = leftActualArr.length > 5 ? json(Array.from(leftActualArr.slice(0, 3))) : json(leftActualArr)
    const shortExpectedL = expectedLeft.length > 5 ? json(Array.from(expectedLeft.slice(0, 3))) : json(expectedLeft)
    const shortActualR = rightActualArr.length > 5 ? json(Array.from(rightActualArr.slice(0, 3))) : json(rightActualArr)
    const shortExpectedR = expectedRight.length > 5 ? json(Array.from(expectedRight.slice(0, 3))) : json(expectedRight)
    return {
      message: () =>
        `Expected audio to match but did not.${diffInfo} Expected [[${shortExpectedL}],[${shortExpectedR}]] got [[${shortActualL}],[${shortActualR}]]`,
      pass: false,
    }
  },
})

const HistoryEntry = Struct({
  opIndex: 'f32',
  voiceIndex: 'f32',
  value: 'f32',
  velocity: 'f32',
  startSample: 'f32',
  endSample: 'f32',
})

type MiniOptions = {
  windowStartSample?: number
  windowEndSample?: number
  bpm?: number
  sampleRate?: number
  barValue?: number
}

export function mini(code: string, {
  windowStartSample = 0,
  windowEndSample = 256,
  bpm = 60,
  sampleRate = 256,
  barValue = 1,
}: MiniOptions = {}) {
  const core = getCore()
  const result = compileMiniNotation(code)
  const arraySize = MINI_ARRAY_HEADER_SIZE + result.bytecode.length
  const bytecode$ = core.wasm.createFloat32Buffer(arraySize)
  const array = new Float32Array(core.memory.buffer, bytecode$, arraySize)
  array[0] = result.bytecode.length
  array[1] = 1
  array.set(result.bytecode, MINI_ARRAY_HEADER_SIZE)
  const history$ = core.wasm.createFloat32Buffer(
    MINI_HISTORY_HEADER_SIZE + MINI_HISTORY_SIZE * MINI_HISTORY_ENTRY_SIZE,
  )
  core.wasm.generateMiniHistoryWindow(
    bytecode$,
    history$,
    windowStartSample,
    windowEndSample,
    bpm,
    sampleRate,
    barValue,
  )
  const history = new Float32Array(core.memory.buffer, history$, MINI_HISTORY_SIZE)
  const length = history[0]
  const historyEntry = HistoryEntry(core.memory.buffer)
  const entries = new Array<
    { opIndex: number; voiceIndex: number; value: number; velocity: number; startSample: number; endSample: number }
  >(length)
  for (let i = 0; i < length; i++) {
    historyEntry.byteOffset = history$ + ((MINI_HISTORY_HEADER_SIZE + i * MINI_HISTORY_ENTRY_SIZE) << 2)
    const { opIndex, voiceIndex, value, velocity, startSample, endSample } = historyEntry
    entries[i] = { opIndex, voiceIndex, value, velocity, startSample, endSample }
  }
  return entries
}
