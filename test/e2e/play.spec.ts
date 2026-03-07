import { beforeAll, describe, expect, it } from 'bun:test'
import '../../as/build/index.wasm'
import { audio, mini, setup } from '../test-utils.ts'

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

  it('uses mini \\ glide between consecutive note positions', () => {
    const seq = 'a1;1 c2\\\\1;1'
    const entries = mini(seq, {
      windowStartSample: 0,
      windowEndSample: 1024,
      bpm: 120,
      sampleRate: 256,
      barValue: 1,
    }).filter(e => e.voiceIndex === 0)

    const first = entries[0]
    const second = entries[1]
    expect(first).toBeDefined()
    expect(second).toBeDefined()

    const out = audio(`
      x=mini('${seq}',1)
      play(x,([hz])->hz,voices:1,glide:0) |> out($)
    `, { ticks: 64, sampleRate: 256, bufferLength: 16 })

    const atSecond = out[0][second!.startSample] ?? 0
    const midSecond = out[0][second!.startSample + 20] ?? 0
    expect(atSecond).toBeCloseTo(first!.value, 2)
    expect(midSecond).toBeGreaterThan(first!.value + 0.1)
    expect(midSecond).toBeLessThan(second!.value - 0.1)
  })

  it('respects mini \\ glide duration per note', () => {
    const seq = 'a1;1 c2\\\\.5;1 g3\\\\.1;1'
    const entries = mini(seq, {
      windowStartSample: 0,
      windowEndSample: 1024,
      bpm: 120,
      sampleRate: 256,
      barValue: 1,
    }).filter(e => e.voiceIndex === 0)

    const second = entries[1]
    const third = entries[2]
    expect(second).toBeDefined()
    expect(third).toBeDefined()

    const out = audio(`
      x=mini('${seq}',1)
      play(x,([hz])->hz,voices:1,glide:0) |> out($)
    `, { ticks: 80, sampleRate: 256, bufferLength: 16 })

    const probeOffset = 12
    const v2 = out[0][(second!.startSample + probeOffset)] ?? 0
    const v3 = out[0][(third!.startSample + probeOffset)] ?? 0

    const from2 = entries[0]!.value
    const to2 = second!.value
    const from3 = second!.value
    const to3 = third!.value

    const p2 = Math.abs(v2 - from2) / Math.max(Math.abs(to2 - from2), 0.000001)
    const p3 = Math.abs(v3 - from3) / Math.max(Math.abs(to3 - from3), 0.000001)
    expect(p3).toBeGreaterThan(p2 + 0.2)
  })
})
