import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, mini, setup } from '../test-utils.ts'

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
})
