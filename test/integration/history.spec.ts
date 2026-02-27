import { beforeAll, describe, expect, it } from 'bun:test'
import { beforeEach } from 'bun:test'
import { AudioVmView, createTypedHistory } from '../../src/dsp/audio-vm-helpers.ts'
import { audio, getCore, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('history', () => {
  beforeEach(() => {
    const core = getCore()
    core.wasm.resetAudioVmAt(0)
  })

  it('create a history', () => {
    const core = getCore()
    audio(`sine(440) |> out($)`, { vmId: 0, ticks: 1 })
    const infoPtr = core.wasm.getAudioVmInfoAt(0)
    const vmView = new AudioVmView(core.memory, infoPtr)
    const history = createTypedHistory(vmView.histories[0], null)
    if (history.genName !== 'Sine') {
      throw new Error('History is not a Sine')
    }
    expect(history.genName).toBe('Sine')
    expect(history.variantName).toBe('default')
    expect(history.className).toStartWith('Sine_default')
    expect(history.params.hz.latest).toBe(440)
    expect(history.params.offset.latest).toBe(0)
    expect(history.params.trig.latest).toBe(0)
    expect(history.size).toBe(1024)
    expect(history.sampleCounts.latest).toBe(0)
    expect(history.writeIndex).toBe(1)
  })

  it('advance with multiple ticks', () => {
    const core = getCore()
    audio(`sine(440) |> out($)`, { vmId: 0, ticks: 2 })
    const infoPtr = core.wasm.getAudioVmInfoAt(0)
    const vmView = new AudioVmView(core.memory, infoPtr)
    const history = createTypedHistory(vmView.histories[0], null)
    if (history.genName !== 'Sine') {
      throw new Error('History is not a Sine')
    }
    expect(history.genName).toBe('Sine')
    expect(history.variantName).toBe('default')
    expect(history.className).toStartWith('Sine_default')
    expect(history.params.hz.latest).toBe(440)
    expect(history.params.offset.latest).toBe(0)
    expect(history.params.trig.latest).toBe(0)
    expect(history.size).toBe(1024)
    expect(history.sampleCounts.latest).toBe(128)
    expect(history.writeIndex).toBe(2)
  })

  it('updates', () => {
    const core = getCore()
    {
      audio(`sine(440) |> out($)`, { vmId: 0, ticks: 1 })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(440)
      expect(history.sampleCounts.latest).toBe(0)
      expect(history.writeIndex).toBe(1)
    }
    {
      audio(`sine(880) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 128, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(880)
      expect(history.sampleCounts.latest).toBe(128)
      expect(history.writeIndex).toBe(2)
    }
  })

  it('works after reset', () => {
    const core = getCore()
    {
      audio(`sine(440) |> out($)`, { vmId: 0, ticks: 1 })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(440)
      expect(history.sampleCounts.latest).toBe(0)
      expect(history.writeIndex).toBe(1)
    }
    {
      audio(`sine(880) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 128, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(880)
      expect(history.sampleCounts.latest).toBe(128)
      expect(history.writeIndex).toBe(2)
    }
    core.wasm.resetAudioVmAt(0)
    {
      audio(`sine(1000) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 256, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(1000)
      expect(history.sampleCounts.latest).toBe(256)
      expect(history.writeIndex).toBe(1)
    }
    {
      audio(`sine(1500) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 384, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(1500)
      expect(history.sampleCounts.latest).toBe(384)
      expect(history.writeIndex).toBe(2)
    }
  })

  it('matches sourcemap', () => {
    const core = getCore()
    const result = audio(`sine(440) |> out($)`, { vmId: 0, ticks: 1 })
    const infoPtr = core.wasm.getAudioVmInfoAt(0)
    const vmView = new AudioVmView(core.memory, infoPtr)
    const historyView = vmView.histories[0]
    const sourceMap = result.compileResult!.compile.historySourceMap!
    expect(historyView.genName).toBe('Sine')
    const sinePc = sourceMap.findLast(sm => sm.genName === 'Sine')!.pc
    expect(historyView.callStackFrames).toContain(sinePc)
  })

  it('matches sourcemap multiple generators', () => {
    const core = getCore()
    const result = audio(`sine(440)*ad(.01,.02,trig:1) |> out($)`, { vmId: 0, ticks: 1 })
    const infoPtr = core.wasm.getAudioVmInfoAt(0)
    const vmView = new AudioVmView(core.memory, infoPtr)
    const h0 = vmView.histories[0]
    const h1 = vmView.histories[1]
    const sourceMap = result.compileResult!.compile.historySourceMap!
    expect(h0.genName).toBe('Sine')
    expect(h1.genName).toBe('Ad')
    expect(h0.callStackFrames).toContain(sourceMap.findLast(sm => sm.genName === 'Sine')!.pc)
    expect(h1.callStackFrames).toContain(sourceMap.findLast(sm => sm.genName === 'Ad')!.pc)
  })

  it('works after copy', () => {
    const core = getCore()
    {
      audio(`sine(440) |> out($)`, { vmId: 0, ticks: 1 })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(440)
      expect(history.sampleCounts.latest).toBe(0)
      expect(history.writeIndex).toBe(1)
    }
    {
      audio(`sine(880) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 128, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(880)
      expect(history.sampleCounts.latest).toBe(128)
      expect(history.writeIndex).toBe(2)
    }
    core.wasm.copyAudioVmState(0, 1)
    {
      audio(`sine(1000) |> out($)`, { vmId: 1, ticks: 1, sampleCount: 256, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(1)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(1000)
      expect(history.sampleCounts.latest).toBe(256)
      expect(history.writeIndex).toBe(1)
    }
    {
      audio(`sine(1500) |> out($)`, { vmId: 1, ticks: 1, sampleCount: 384, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(1)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(1500)
      expect(history.sampleCounts.latest).toBe(384)
      expect(history.writeIndex).toBe(2)
    }
    core.wasm.copyAudioVmState(1, 0)
    {
      audio(`sine(50) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 512, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(50)
      expect(history.sampleCounts.latest).toBe(512)
      expect(history.writeIndex).toBe(3)
    }
    {
      audio(`sine(200) |> out($)`, { vmId: 0, ticks: 1, sampleCount: 768, noReset: true })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[0], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBe(200)
      expect(history.sampleCounts.latest).toBe(768)
      expect(history.writeIndex).toBe(4)
    }
  })

  it('works after many ticks', () => {
    const core = getCore()
    {
      audio(`sine(440+sine(1)*0.01) |> out($)`, { vmId: 0, ticks: 2047 })
      const infoPtr = core.wasm.getAudioVmInfoAt(0)
      const vmView = new AudioVmView(core.memory, infoPtr)
      const history = createTypedHistory(vmView.histories[1], null)
      if (history.genName !== 'Sine') {
        throw new Error('History is not a Sine')
      }
      expect(history.params.hz.latest).toBeCloseTo(440)
      expect(history.writeIndex).toBe(1023)
    }
  })
})
