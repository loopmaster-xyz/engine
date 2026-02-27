import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, setup, sine } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('alloc/read/write buffer ops (delay)', () => {
  it('delay() produces delayed signal after warmup', () => {
    // delay(in, seconds, feedback) uses alloc, read, write
    const code = 'delay(sine(440), 0.02, 0) |> out($)'
    const [left] = audio(code, { ticks: 16 })
    // Early blocks: buffer filling, output near zero. Later: delayed sine.
    const blockSize = 128
    const lateBlockStart = 10 * blockSize
    const lateBlock = left.subarray(lateBlockStart, lateBlockStart + blockSize)
    const maxLate = Math.max(...Array.from(lateBlock).map(Math.abs))
    expect(maxLate).toBeGreaterThan(0.01)
  })
})
