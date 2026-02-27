import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, setup, sine } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('smoke', () => {
  it('sine()', () => {
    expect(audio('sine(10) |> out($)')).toMatchAudio(sine(10))
    expect(audio('sine(100) |> out($)')).toMatchAudio(sine(100))
    expect(audio('sine(1000) |> out($)')).toMatchAudio(sine(1000))
  })

  it('scalar 1', () => {
    expect(audio('out(1)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('scalar 1 pipe', () => {
    expect(audio('1 |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('1+1', () => {
    expect(audio('1+1 |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('$ can be referenced multiple times', () => {
    // $ is the current pipe value and can be used multiple times within the RHS.
    expect(audio('1 |> out($ + $)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('nested pipe shadows $', () => {
    // Inner (2 |> $) binds $ = 2, outer $ remains 1.
    expect(audio('1 |> out((2 |> $) + $)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })
})
