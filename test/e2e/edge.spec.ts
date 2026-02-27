import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, audioAsync, runTicks, setOversampleModes, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
  // Use exact-match oversampling for tests.
  setOversampleModes({ up: 'hold', down: 'decimate' })
})

describe('edge cases', () => {
  it('same expression', () => {
    expect(audio(`
      trig=every(1/8)
      ;[60,61,62,65,67,71][t*4] |> midiToHz($) |> sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2 |> out($/2)
      ;[60,61,62,65,67,71][t*4] |> midiToHz($) |> sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2 |> out($/2)
    `)).toMatchAudio(
      audio(`
      trig=every(1/8)
      ;[60,61,62,65,67,71][t*4] |> midiToHz($) |> sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2 |> out($)
      `),
    )
  })

  it('record index out of range', async () => {
    const result = await audioAsync(`
      kicksynth=(x,trig=1)->{
        sine(x+18000,trig)*ad(.012,.8,trig)
      }

      kick=()->{
        sample=record(1,()->kicksynth(52))
        sampler(sample,trig:1)
      }

      kick() |> out($)
    `)
  })

  it('record binary', async () => {
    const actual = await audioAsync(`
      s1=()->saw(330)
      s2=()->sqr(660)
      r1=()->{
        sample=record(.1,s1)
        sampler(sample,trig:1)
      }
      r2=()->{
        sample=record(.1,s2)
        sampler(sample,trig:1)
      }
      r1()+r2()|>out($)
    `)
    const expected = await audioAsync(`
      s1=()->saw(330)
      s2=()->sqr(660)
      r1=()->{
        sample=record(.1,s1)
        sampler(sample,trig:1)
      }
      r2=()->{
        sample=record(.1,s2)
        sampler(sample,trig:1)
      }
      r1()|>out($)
      r2()|>out($)
    `)
    expect(actual).toMatchAudio(expected)
  })

  it('record not a scalar', async () => {
    expect(await audioAsync(`
      fm=>$
      drums() |> out($)
    `)).toMatchAudio(await audioAsync('drums() |> out($)'))
  })

  it('record shadowing', async () => {
    expect(await audioAsync(`
      s=(x=()->1)->x()
      f=(x)->{
        sample=record(.1,()->s(x))
        sampler(sample,trig:1)
      }
      x=()->2
      f() |> out($)
    `)).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })
})
