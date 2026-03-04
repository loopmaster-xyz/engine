import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('tram e2e', () => {
  it('x-x-x-x-', () => {
    expect(audio(`tram('x-x-x-x-') |> out($)`)).toMatchAudio(audio('every(1/4) |> out($)'), 48000)
  })

  it('inside a function', () => {
    expect(audio(`f = () -> { tram('x-x-x-x-') |> out($) }; f()`)).toMatchAudio(audio('every(1/4) |> out($)'), 48000)
  })

  it('every offset is in bars', () => {
    expect(audio('every(1/4, offset:1/8) |> out($)')).toMatchAudio(audio('at(bar:1/8, every:1/4) |> out($)'), 48000)
  })

  it('subdivision', () => {
    expect(audio(`tram('[x-x-x-x-]') |> out($)`)).toMatchAudio(audio(`tram('x-x-x-x-') |> out($)`), 48000)
  })

  it('nested subdivision', () => {
    expect(audio(`tram('[[x-x-x-x-]]') |> out($)`)).toMatchAudio(audio(`tram('x-x-x-x-') |> out($)`), 48000)
  })
})
