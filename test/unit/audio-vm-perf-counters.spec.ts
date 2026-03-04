import { beforeAll, describe, expect, it } from 'bun:test'
import { audio, getCore, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('audio-vm perf counters', () => {
  it('increments on run and resets to zero', () => {
    const core = getCore()
    const vmId = 0
    const reset = (core.wasm as any).resetAudioVmPerfCountersAt as ((vmId: number) => void)
    const getPtr = (core.wasm as any).getAudioVmPerfCountersAt as ((vmId: number) => number)
    const setEnabled = (core.wasm as any).setAudioVmPerfCountersEnabledAt as
      | ((vmId: number, enabled: boolean) => void)
      | undefined

    reset(vmId)
    if (setEnabled) setEnabled(vmId, true)
    let counters = new Uint32Array(core.memory.buffer, getPtr(vmId), 16)
    for (let i = 0; i < 8; i++) {
      expect(counters[i]).toBe(0)
    }

    ;(core.wasm as any).resetAudioVmAt(vmId)
    if (setEnabled) setEnabled(vmId, true)
    audio('out(sine(440))', { vmId, ticks: 4, noReset: true })

    counters = new Uint32Array(core.memory.buffer, getPtr(vmId), 16)
    expect(counters[0]).toBeGreaterThan(0)
    expect(counters[1]).toBeGreaterThan(0)

    reset(vmId)
    if (setEnabled) setEnabled(vmId, false)
    counters = new Uint32Array(core.memory.buffer, getPtr(vmId), 16)
    for (let i = 0; i < 8; i++) {
      expect(counters[i]).toBe(0)
    }
  })
})
