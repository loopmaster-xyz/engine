import { describe, expect, it } from 'bun:test'
import { mock } from 'bun:test'
import { atomic } from '../../src/lib/atomic.ts'

describe('atomic', () => {
  it('should execute tasks in order', async () => {
    const result: number[] = []
    let inc = 0
    const asyncFn = async (ms: number) => {
      await new Promise(resolve => setTimeout(resolve, ms))
      result.push(inc++)
    }
    const fn = atomic(asyncFn)
    fn(100)
    fn(80)
    fn(50)
    fn(10)
    await fn(0)
    expect(result).toEqual([0, 1, 2, 3, 4])
    expect(inc).toBe(5)
  })

  it('dropInbetween should drop inbetween tasks', async () => {
    const result: { id: number; value: number }[] = []
    let inc = 0
    const asyncFn = async (ms: number, id: number) => {
      await new Promise(resolve => setTimeout(resolve, ms))
      result.push({ id, value: inc++ })
    }
    const errs = mock()
    const fn = atomic(asyncFn, { dropInbetween: true })
    fn(100, 1)
    fn(80, 2).catch(errs)
    fn(50, 3).catch(errs)
    fn(10, 4).catch(errs)
    await fn(0, 5)
    expect(result).toEqual([
      { id: 1, value: 0 },
      { id: 5, value: 1 },
    ])
    expect(inc).toBe(2)
  })
})
