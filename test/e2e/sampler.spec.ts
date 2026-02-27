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

describe('sampler function', () => {
  it('plays a simple sample with position advancing', async () => {
    const result = await audioAsync(`
      sample = freesound(100)
      out(sampler(sample, speed:1, trig:1))
    `, { ticks: 1 })

    // Sample is a ramp from 0 to 1, first sample should be near 0
    expect(result[0][0]).toBeCloseTo(0, 2)
    // Later samples should have higher values (position is advancing)
    expect(result[0][64]).toBeGreaterThan(result[0][0])
    expect(result[0][127]).toBeGreaterThan(result[0][64])
    // Check position is roughly correct: sample[i] = i/512, so at position 64, value = 64/512 = 0.125
    expect(result[0][64]).toBeCloseTo(64 / 512, 2)
    expect(result[0].length).toBe(128)
  })

  it('handles trigger parameter - starts on trigger', async () => {
    const result = await audioAsync(`
      sample = freesound(200)
      trigger = every(1)
      out(sampler(sample, trig:trigger))
    `, { ticks: 2 })

    // First sample after trigger should be near 0 (start of ramp)
    expect(result[0][0]).toBeCloseTo(0, 2)
    // Position should advance
    expect(result[0][64]).toBeGreaterThan(result[0][0])
  })

  it('handles speed parameter - double speed advances twice as fast', async () => {
    const result = await audioAsync(`
      sample = freesound(300)
      out(sampler(sample, speed:2, trig:1))
    `, { ticks: 1 })

    expect(result[0].length).toBe(128)
    // With speed 2, position advances twice as fast
    // At output sample 64, playback position = 128, value = 128/512 = 0.25
    expect(result[0][64]).toBeCloseTo(128 / 512, 2)
    // At output sample 127, playback position = 254, value = 254/512 ≈ 0.496
    expect(result[0][127]).toBeCloseTo(254 / 512, 2)
  })

  it('handles offset parameter - starts from middle', async () => {
    const result = await audioAsync(`
      sample = freesound(400)
      out(sampler(sample, speed:1, offset:0.5, trig:1))
    `, { ticks: 1 })

    // With offset 0.5, starts at position 256 (half of 512)
    // First sample value should be 256/512 = 0.5
    expect(result[0][0]).toBeCloseTo(0.5, 2)
    // Position should still advance from there
    expect(result[0][64]).toBeCloseTo((256 + 64) / 512, 2)
  })

  it('handles repeat parameter - loops back to start', async () => {
    const result = await audioAsync(`
      sample = freesound(500)
      out(sampler(sample, repeat:1, trig:1))
    `, { ticks: 8 })

    // With repeat, should loop when reaching end
    // Sample length is 512, so after 512 samples it should loop
    // Check that we have values both near start (0) and continuing past the loop
    
    // Should have played through the sample at least once and looped
    // Position 512 should loop back to 0, so position 512 = value 0
    // But we're looking at output, so at output sample 512, playback position wrapped to 0
    expect(result[0][512]).toBeCloseTo(0, 2)
    // And continues from there
    expect(result[0][513]).toBeGreaterThan(result[0][512])
  })

  it('handles negative speed for reverse playback', async () => {
    const result = await audioAsync(`
      sample = freesound(600)
      out(sampler(sample, speed:-1, trig:1))
    `, { ticks: 1 })

    // With negative speed and offset=0, starts from end (position 511)
    // First sample value should be near 1 (511/512)
    expect(result[0][0]).toBeCloseTo(511 / 512, 2)
    // Position should decrease (playing backwards)
    expect(result[0][64]).toBeLessThan(result[0][0])
    // At sample 64, position = 511 - 64 = 447, value = 447/512 ≈ 0.873
    expect(result[0][64]).toBeCloseTo(447 / 512, 2)
  })

  it('stops playing when reaching end without repeat', async () => {
    const result = await audioAsync(`
      sample = freesound(700)
      out(sampler(sample, speed:1, trig:1))
    `, { ticks: 8 })

    // Sample length is 512, without repeat should stop at end
    // Output samples after position 512 should be 0
    expect(result[0][0]).toBeCloseTo(0, 2) // starts at 0
    expect(result[0][511]).toBeGreaterThan(0) // still playing at 511
    expect(result[0][600]).toBe(0) // stopped after 512
  })

  it('does not play before trigger', async () => {
    const result = await audioAsync(`
      sample = freesound(800)
      out(sampler(sample, trig:0))
    `, { ticks: 2 })

    // With trig=0, should never trigger, all output should be 0
    for (let i = 0; i < 256; i++) {
      expect(result[0][i]).toBe(0)
    }
  })

  it('uses default speed value of 1 when not specified', async () => {
    const result = await audioAsync(`
      sample = freesound(900)
      out(sampler(sample, trig:1))
    `, { ticks: 1 })

    // Without speed parameter, should default to 1.0
    // First sample should be near 0 (start of ramp)
    expect(result[0][0]).toBeCloseTo(0, 2)
    // Position should advance at speed 1
    expect(result[0][64]).toBeCloseTo(64 / 512, 2)
  })
})
