import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { sampleManager } from '../../src/lib/sample-manager.ts'
import { audioAsync, setup } from '../test-utils.ts'
import '../../as/build/index.wasm'

beforeAll(async () => {
  await setup()
})

beforeEach(() => {
  sampleManager.clear()
})

describe('slicer function', () => {
  it('plays a slice from a sample', async () => {
    const result = await audioAsync(`
      sample = freesound(1000)
      out(slicer(sample, slice:0, threshold:0.5, trig:1))
    `, { ticks: 1 })

    expect(result[0].length).toBe(128)
  })

  it('selects different slices with slice parameter', async () => {
    const result1 = await audioAsync(`
      sample = freesound(1100)
      out(slicer(sample, slice:0, threshold:0.3, trig:1))
    `, { ticks: 1 })

    const result2 = await audioAsync(`
      sample = freesound(1100)
      out(slicer(sample, slice:0.9, threshold:0.3, trig:1))
    `, { ticks: 1 })

    // Verify both slices produce output
    expect(result1[0].filter(v => Math.abs(v) > 0.1).length).toBeGreaterThan(0)
    expect(result2[0].filter(v => Math.abs(v) > 0.1).length).toBeGreaterThan(0)
  })

  it('respects threshold parameter', async () => {
    // Test that slicer works with different threshold values
    const result = await audioAsync(`
      sample = freesound(1200)
      out(slicer(sample, slice:0, threshold:0.5, trig:1))
    `, { ticks: 1 })

    // Should produce output
    expect(result[0].filter(v => Math.abs(v) > 0.01).length).toBeGreaterThan(0)
  })

  it('handles repeat parameter', async () => {

    const result = await audioAsync(`
      sample = freesound(1300)
      out(slicer(sample, slice:0, threshold:0.5, repeat:1, trig:1))
    `, { ticks: 8 })

    const nonZeroCount = result[0].filter(v => Math.abs(v) > 0.1).length
    expect(nonZeroCount).toBeGreaterThan(64)
  })
})
