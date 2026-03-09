import { beforeEach, describe, expect, it } from 'bun:test'
import { sampleManager } from '../../src/lib/sample-manager.ts'
import { compile as incrementalCompile } from '../../src/live/compiler/index.ts'
import * as core from '../../src/live/compiler/core.ts'
import { State } from '../../src/live/compiler/state.ts'
import type { RecordCallback, SampleRegistration } from '../../src/live/compiler/types.ts'
import { parse } from '../../src/live/parser.ts'

function f32Bits(input: Float32Array | null | undefined): number[] | null {
  if (!input) return null
  return Array.from(new Uint32Array(input.buffer, input.byteOffset, input.length))
}

function normalizeSampleRegistrations(regs: SampleRegistration[]): Array<Record<string, unknown>> {
  return regs.map((reg) => {
    return {
      handle: reg.handle,
      type: reg.type,
      freesoundId: reg.freesoundId,
      recordSeconds: reg.recordSeconds,
      recordCallbackId: reg.recordCallbackId,
      recordProjectId: reg.recordProjectId,
      inlineSampleRate: reg.inlineSampleRate,
      inlineChannels: reg.inlineChannels?.map(ch => f32Bits(ch)),
      espeakText: reg.espeakText,
      espeakVariant: reg.espeakVariant,
      espeakSpeed: reg.espeakSpeed,
      espeakPitch: reg.espeakPitch,
    }
  })
}

function normalizeRecordCallbacks(map: Map<number, RecordCallback> | undefined): Array<Record<string, unknown>> {
  if (!map) return []
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([callbackId, callback]) => ({
      callbackId,
      setupBits: f32Bits(callback.setup),
      loopBits: f32Bits(callback.loop),
      dependencies: callback.dependencies,
      recordGlobalIndices: callback.recordGlobalIndices,
      captureStoreGlobalIdx: callback.captureStoreGlobalIdx,
      useNestedCaptureStore: callback.useNestedCaptureStore,
      capturedRecordGlobalsByName: callback.capturedRecordGlobalsByName,
      defaultParamRecordGlobals: callback.defaultParamRecordGlobals,
      defaultParamRecordGlobalsByName: callback.defaultParamRecordGlobalsByName,
      maxSetupGlobalIndex: callback.maxSetupGlobalIndex,
    }))
}

function compilePair(src: string): {
  incremental: ReturnType<typeof incrementalCompile>
  full: ReturnType<typeof core.compile>
} {
  const parsed = parse(src)
  expect(parsed.errors).toHaveLength(0)
  expect(parsed.program).toBeTruthy()

  sampleManager.clear()
  const incremental = incrementalCompile(parsed.program!, parsed.preludeLines)
  sampleManager.clear()
  const full = core.compile(new State(), parsed.program!, parsed.preludeLines)

  return { incremental, full }
}

function expectCompileParity(src: string): void {
  const { incremental, full } = compilePair(src)

  expect(incremental.errors).toEqual(full.errors)
  expect(f32Bits(incremental.bytecode)).toEqual(f32Bits(full.bytecode))
  expect(normalizeSampleRegistrations(incremental.sampleRegistrations)).toEqual(normalizeSampleRegistrations(full
    .sampleRegistrations))
  expect(normalizeRecordCallbacks(incremental.recordCallbacks)).toEqual(normalizeRecordCallbacks(full.recordCallbacks))
  expect(incremental.historySourceMap ?? []).toEqual(full.historySourceMap ?? [])
  expect(incremental.functionReturnPcs ?? {}).toEqual(full.functionReturnPcs ?? {})
  expect(incremental.bpm).toEqual(full.bpm)
}

beforeEach(() => {
  sampleManager.clear()
})

describe('incremental prelude compiler parity', () => {
  it('keeps parity for repeated tiny edits', () => {
    expectCompileParity('out(sine(440))')
    expectCompileParity('out(sine(220))')
    expectCompileParity('out(sine(440)+sine(660))')
  })

  it('keeps parity when user overrides mix', () => {
    expectCompileParity(`
mix = x -> x * 0.25
out(sine(440))
`)
  })

  it('keeps parity for prelude record functions across literal edits', () => {
    expectCompileParity(`
bd(base:#1*o2,punch:9k,offset:.5) |> out($)
`)
    expectCompileParity(`
bd(base:#1*o2,punch:7k,offset:.4) |> out($)
`)
  })

  it('keeps parity when user deferred functions require hint recompile', () => {
    expectCompileParity(`
apply=(value,fn)->fn(value)
id=x->x
apply(1,id) |> out($)
`)
  })

  it('keeps parity on prelude-hint invalidation fallback path', () => {
    expectCompileParity(`
sum(map([1,2,3],x->x*2)) |> out($)
`)
  })
})
