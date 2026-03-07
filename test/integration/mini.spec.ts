import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, mini, setup } from '../test-utils.ts'
import { compileMiniNotation } from '../../src/mini/compiler.ts'
import { noteNameToMidi } from '../../src/mini/util.ts'

beforeAll(async () => {
  await setup()
})

describe('mini', () => {
  it('simple mini function call in DSL', () => {
    // Simple test to see bytecode disassembly
    audio('mini("c4")')
  })

  it('generate mini history entries', () => {
    const entries = mini('c4 a4 f4 e4')
    expect(entries).toMatchObject([
      { // scale major c4
        opIndex: 13,
        voiceIndex: -6,
        value: 1,
        velocity: 1,
        startSample: 0,
        endSample: 1,
      },
      { // c4
        opIndex: 16,
        voiceIndex: 0,
        value: 261.6255798339844,
        velocity: 1,
        startSample: 0,
        endSample: 1,
      },
      { // a4
        opIndex: 44,
        voiceIndex: 0,
        value: 440,
        velocity: 1,
        startSample: 64,
        endSample: 65,
      },
      { // f4
        opIndex: 72,
        voiceIndex: 0,
        value: 349.2282409667969,
        velocity: 1,
        startSample: 128,
        endSample: 129,
      },
      { // e4
        opIndex: 100,
        voiceIndex: 0,
        value: 329.6275634765625,
        velocity: 1,
        startSample: 192,
        endSample: 193,
      },
    ])
  })

  it('held note', () => {
    {
      const entries = mini('c4;1')
      expect(entries).toMatchObject([
        { // scale major c4
          opIndex: 13,
          voiceIndex: -6,
          value: 1,
          velocity: 1,
          startSample: 0,
          endSample: 1,
        },
        { // c4
          opIndex: 16,
          voiceIndex: 0,
          value: 261.6255798339844,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
      ])
    }
    {
      const entries = mini('c4;1', { windowStartSample: 1 })
      expect(entries).toMatchObject([
        { // c4
          opIndex: 16,
          voiceIndex: 0,
          value: 261.6255798339844,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
      ])
    }
  })

  it('held notes multiple voices', () => {
    {
      const entries = mini('i;1')
      expect(entries).toMatchObject([
        {
          opIndex: 13,
          voiceIndex: -6,
          value: 1,
          velocity: 1,
          startSample: 0,
          endSample: 1,
        },
        {
          opIndex: 16,
          voiceIndex: 0,
          value: 261.6255798339844,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
        {
          opIndex: 16,
          voiceIndex: 1,
          value: 329.6275634765625,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
        {
          opIndex: 16,
          voiceIndex: 2,
          value: 391.99542236328125,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
      ])
    }
    {
      const entries = mini('i;1', { windowStartSample: 100 })
      expect(entries).toMatchObject([
        {
          opIndex: 16,
          voiceIndex: 0,
          value: 261.6255798339844,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
        {
          opIndex: 16,
          voiceIndex: 1,
          value: 329.6275634765625,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
        {
          opIndex: 16,
          voiceIndex: 2,
          value: 391.99542236328125,
          velocity: 1,
          startSample: 0,
          endSample: 256,
        },
      ])
    }
  })

  it('resets octave directive on each turn', () => {
    const entries = mini('octave 1 c4', {
      windowStartSample: 0,
      windowEndSample: 1024,
      bpm: 60,
      sampleRate: 256,
      barValue: 1,
    }).filter(entry => entry.voiceIndex >= 0)

    expect(entries).toHaveLength(4)
    expect(entries.map(entry => entry.startSample)).toEqual([0, 256, 512, 768])
    for (const entry of entries) {
      expect(entry.value).toBeCloseTo(523.2511, 3)
    }
  })

  it('resets transpose directive on each turn', () => {
    const entries = mini('transpose 1 c4', {
      windowStartSample: 0,
      windowEndSample: 1024,
      bpm: 60,
      sampleRate: 256,
      barValue: 1,
    }).filter(entry => entry.voiceIndex >= 0)

    expect(entries).toHaveLength(4)
    expect(entries.map(entry => entry.startSample)).toEqual([0, 256, 512, 768])
    for (const entry of entries) {
      expect(entry.value).toBeCloseTo(277.1826, 3)
    }
  })

  it('scale directive keeps current root when note is omitted', () => {
    const result = compileMiniNotation('scale minor i', {
      defaultScale: { rootMidi: 0, scaleIndex: 0 },
    })
    const scaleNode = result.nodes.find(node => node.type === 'scale')
    expect(scaleNode?.type).toBe('scale')
    expect(scaleNode?.values[0]).toBe(0)
  })

  it('subsequent scale directives inherit previous explicit root', () => {
    const result = compileMiniNotation('scale c3 major i scale minor i')
    const scaleNodes = result.nodes.filter(node => node.type === 'scale')
    expect(scaleNodes).toHaveLength(2)
    expect(scaleNodes[0]?.values[0]).toBe(noteNameToMidi('c3'))
    expect(scaleNodes[1]?.values[0]).toBe(noteNameToMidi('c3'))
  })

  it('supports octave shorthand oN', () => {
    const shortEntries = mini('o3 c4', { windowStartSample: 0, windowEndSample: 1024, bpm: 60, sampleRate: 256 })
      .filter(entry => entry.voiceIndex >= 0)
    const longEntries = mini('octave 3 c4', { windowStartSample: 0, windowEndSample: 1024, bpm: 60, sampleRate: 256 })
      .filter(entry => entry.voiceIndex >= 0)

    expect(shortEntries).toHaveLength(longEntries.length)
    for (let i = 0; i < shortEntries.length; i++) {
      expect(shortEntries[i]?.startSample).toBe(longEntries[i]?.startSample)
      expect(shortEntries[i]?.value).toBeCloseTo(longEntries[i]?.value ?? 0, 6)
    }
  })

  it('supports octave shorthand o-N', () => {
    const shortEntries = mini('o-2 c4', { windowStartSample: 0, windowEndSample: 1024, bpm: 60, sampleRate: 256 })
      .filter(entry => entry.voiceIndex >= 0)
    const longEntries = mini('octave -2 c4', { windowStartSample: 0, windowEndSample: 1024, bpm: 60, sampleRate: 256 })
      .filter(entry => entry.voiceIndex >= 0)

    expect(shortEntries).toHaveLength(longEntries.length)
    for (let i = 0; i < shortEntries.length; i++) {
      expect(shortEntries[i]?.startSample).toBe(longEntries[i]?.startSample)
      expect(shortEntries[i]?.value).toBeCloseTo(longEntries[i]?.value ?? 0, 6)
    }
  })
})
