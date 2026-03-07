import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('play()', () => {
  it('interprets event objects polyphonically', () => {
    expect(audio(`
      events=[
        { hz:220, trig:1, from:0, id:1 },
        { hz:330, trig:1, from:0, id:2 },
      ]
      play(events,([hz])->sine(hz),voices:4) |> out($)
    `)).toMatchAudio(audio(`
      events=[
        { hz:220, trig:1, from:0, id:1 },
        { hz:330, trig:1, from:0, id:2 },
      ]
      s=0
      for (e of events) s += sine(e.hz)
      out(s/4)
    `), 256)
  })

  it('works with mini() poly streams', () => {
    expect(audio(`
      x=mini('i;1')
      play(x,([hz])->sine(hz),voices:8) |> out($)
    `, { ticks: 16 })).toMatchAudio(audio(`
      x=mini('i;1')
      s=0
      for (e of x) s += sine(e.hz)
      out(s/8)
    `, { ticks: 16 }), 256)
  })

  it('supports callback destructuring as {hz,trig}', () => {
    expect(audio(`
      events=[
        { hz:220, trig:1, from:0, id:2 },
        { hz:330, trig:1, from:0, id:5 },
      ]
      play(events,({hz,trig})->trig,voices:4) |> out($)
    `)).toMatchAudio(audio('out((1 + 1 + 0 + 0)/4)'))
  })

  it('uses sustained trig gate while note is active', () => {
    expect(audio(`
      x=mini('c4;1')
      play(x,([hz,trig])->trig,voices:1) |> out($)
    `, { ticks: 8 })).toMatchAudio(audio('out(1)', { ticks: 8 }), 256)
  })

  it('releases to trig=0 when sustain ends', () => {
    const out = audio(`
      x=mini('c4')
      play(x,([hz,trig])->trig,voices:1) |> out($)
    `, { ticks: 4 })
    expect(out[0][0]).toBeGreaterThan(0.9)
    expect(Math.abs(out[0][140] ?? 0)).toBeLessThan(0.0001)
  })

  it('applies glide from "from" to "hz" when enabled', () => {
    const noGlide = audio(`
      play([{ hz:220, trig:1, from:110, id:1 }],([hz])->hz,voices:1,glide:0) |> out($)
    `)
    const withGlide = audio(`
      play([{ hz:220, trig:1, from:110, id:1 }],([hz])->hz,voices:1,glide:0.1) |> out($)
    `)
    expect(withGlide[0][0]).toBeCloseTo(110, 3)
    expect(noGlide[0][0]).toBeCloseTo(220, 3)
  })
})
