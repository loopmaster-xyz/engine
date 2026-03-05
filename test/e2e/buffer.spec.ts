import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, setup, sine } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('alloc/read/append/write buffer ops', () => {
  it('delay() produces delayed signal after warmup', () => {
    // delay(in, seconds, feedback) uses alloc, read, append
    const code = 'delay(sine(440), 0.02, 0) |> out($)'
    const [left] = audio(code, { ticks: 16 })
    // Early blocks: buffer filling, output near zero. Later: delayed sine.
    const blockSize = 128
    const lateBlockStart = 10 * blockSize
    const lateBlock = left.subarray(lateBlockStart, lateBlockStart + blockSize)
    const maxLate = Math.max(...Array.from(lateBlock).map(Math.abs))
    expect(maxLate).toBeGreaterThan(0.01)
  })

  it('write() overwrites latest chunk without advancing write head', () => {
    const blockSeconds = 128 / 48000
    const code = `\
buf=alloc(1)
append(1,buf)
write(2,buf)
now=read(buf,0)
prev=read(buf,${blockSeconds})
out([now,prev])`
    const [left, right] = audio(code, { ticks: 1 })
    const now = left.subarray(0, 128)
    const prev = right.subarray(0, 128)
    const maxNowError = Math.max(...Array.from(now).map(v => Math.abs(v - 2)))
    const maxPrevAbs = Math.max(...Array.from(prev).map(Math.abs))
    expect(maxNowError).toBeLessThan(1e-4)
    expect(maxPrevAbs).toBeLessThan(1e-4)
  })

  it('advance() moves timeline after writeback', () => {
    const code = `\
buf=alloc(0.1)
s=read(buf,0.04)
write(1,buf)
advance(buf)
out(s)`
    const [left] = audio(code, { ticks: 24 })
    const blockSize = 128
    const lateBlockStart = 20 * blockSize
    const lateBlock = left.subarray(lateBlockStart, lateBlockStart + blockSize)
    const maxLate = Math.max(...Array.from(lateBlock).map(Math.abs))
    expect(maxLate).toBeGreaterThan(0.9)
  })

  it('append can be passed as a first-class builtin function', () => {
    const code = `\
apply=(fn,input,buf)->fn(input,buf)
buf=alloc(1)
apply(append,1,buf)
out(read(buf,0))`
    const [left] = audio(code, { ticks: 1 })
    const maxErr = Math.max(...Array.from(left.subarray(0, 128)).map(v => Math.abs(v - 1)))
    expect(maxErr).toBeLessThan(1e-4)
  })
})
