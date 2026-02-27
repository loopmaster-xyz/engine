import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { sampleManager } from '../../src/lib/sample-manager.ts'
import { setup } from '../test-utils.ts'
import '../../as/build/index.wasm'

beforeAll(async () => {
  await setup()
})

beforeEach(() => {
  sampleManager.clear()
})

describe('freesound function', () => {
  it('registers a freesound sample', () => {
    const handle = sampleManager.registerFreesound(123)
    expect(handle).toBeGreaterThan(0)
  })

  it('returns same handle for same freesound id', () => {
    const handle1 = sampleManager.registerFreesound(456)
    const handle2 = sampleManager.registerFreesound(456)
    expect(handle1).toBe(handle2)
  })

  it('returns different handles for different freesound ids', () => {
    const handle1 = sampleManager.registerFreesound(789)
    const handle2 = sampleManager.registerFreesound(790)
    expect(handle1).not.toBe(handle2)
  })

  it('tracks required samples', () => {
    sampleManager.registerFreesound(100)
    sampleManager.registerFreesound(101)
    const required = sampleManager.getRequiredSamples()
    expect(required.length).toBe(2)
  })

  it('marks samples as ready after manual recording', () => {
    const handle = sampleManager.registerFreesound(200)
    expect(sampleManager.areAllSamplesReady()).toBe(false)
    
    const testSample = new Float32Array(128)
    sampleManager.recordSample(handle, [testSample], 48000)
    
    expect(sampleManager.areAllSamplesReady()).toBe(true)
  })
})
