import { beforeAll, describe, expect, it } from 'bun:test'
import { audio, setup, sine } from '../test-utils.ts'
import '../../as/build/index.wasm'

beforeAll(async () => {
  await setup()
})

describe('out() polymorphic signatures', () => {
  describe('out(scalar)', () => {
    it('duplicates scalar to stereo', () => {
      expect(audio('out(0.5)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
    })

    it('duplicates zero to stereo', () => {
      expect(audio('out(0)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
    })

    it('duplicates negative scalar to stereo', () => {
      expect(audio('out(-0.3)')).toMatchAudio([[-0.3, -0.3, -0.3], [-0.3, -0.3, -0.3]])
    })
  })

  describe('out(signal)', () => {
    it('duplicates signal to stereo', () => {
      expect(audio('out(sine(100))')).toMatchAudio(sine(100))
    })

    it('duplicates different frequency to stereo', () => {
      expect(audio('out(sine(200))')).toMatchAudio(sine(200))
    })
  })

  describe('out([L,R])', () => {
    it('extracts L and R from array', () => {
      expect(audio('out([0.3, 0.7])')).toMatchAudio([[0.3, 0.3, 0.3], [0.7, 0.7, 0.7]])
    })

    it('uses first element for both channels if array has one element', () => {
      expect(audio('out([0.5])')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
    })

    it('handles array with signals', () => {
      expect(audio('out([sine(100), sine(200)])')).toMatchAudio([sine(100)[0], sine(200)[0]])
    })

    it('handles mixed scalar and signal in array', () => {
      expect(audio('out([0.5, sine(100)])')).toMatchAudio([[0.5, 0.5, 0.5], [...sine(100)[0].slice(0, 3)]])
    })
  })

  describe('out(L,R)', () => {
    it('uses separate L and R channels', () => {
      expect(audio('out(0.2, 0.8)')).toMatchAudio([[0.2, 0.2, 0.2], [0.8, 0.8, 0.8]])
    })

    it('handles two signals', () => {
      expect(audio('out(sine(1), sine(2))')).toMatchAudio([sine(1)[0], sine(2)[0]])
    })

    it('handles mixed scalar and signal', () => {
      expect(audio('out(0.5, sine(1))')).toMatchAudio([[0.5, 0.5, 0.5], [...sine(1)[0].slice(0, 3)]])
    })

    it('handles signal and scalar', () => {
      expect(audio('out(sine(1), 0.5)')).toMatchAudio([[...sine(1)[0].slice(0, 3)], [0.5, 0.5, 0.5]])
    })
  })

  describe('out() equivalence', () => {
    it('out(x) is equivalent to out(x,x)', () => {
      const mono = audio('out(0.5)')
      const stereo = audio('out(0.5, 0.5)')
      expect(mono).toEqual(stereo)
    })

    it('out(x) is equivalent to out([x,x])', () => {
      const mono = audio('out(0.5)')
      const array = audio('out([0.5, 0.5])')
      expect(mono).toEqual(array)
    })

    it('out(L,R) is equivalent to out([L,R])', () => {
      const twoArgs = audio('out(0.3, 0.7)')
      const array = audio('out([0.3, 0.7])')
      expect(twoArgs).toEqual(array)
    })
  })
})

describe('out() mixing', () => {
  it('mixes multiple out() calls', () => {
    expect(audio('out(0.2); out(0.3)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
  })

  it('mixes mono and stereo out() calls', () => {
    expect(audio('out(0.1); out(0.2, 0.3)')).toMatchAudio([[0.3, 0.3, 0.3], [0.4, 0.4, 0.4]])
  })

  it('mixes array out() calls', () => {
    expect(audio('out([0.1, 0.2]); out([0.3, 0.4])')).toMatchAudio([[0.4, 0.4, 0.4], [0.6, 0.6, 0.6]])
  })

  it('mixes signals', () => {
    expect(audio('out(sine(100)); out(sine(100))')).toMatchAudio(audio('sine(100) + sine(100) |> out($)'))
  })
})

describe('solo() polymorphic signatures', () => {
  describe('solo(scalar)', () => {
    it('duplicates scalar to stereo', () => {
      expect(audio('solo(0.5)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
    })
  })

  describe('solo(signal)', () => {
    it('duplicates signal to stereo', () => {
      expect(audio('solo(sine(100))')).toMatchAudio(sine(100))
    })
  })

  describe('solo([L,R])', () => {
    it('extracts L and R from array', () => {
      expect(audio('solo([0.3, 0.7])')).toMatchAudio([[0.3, 0.3, 0.3], [0.7, 0.7, 0.7]])
    })
  })

  describe('solo(L,R)', () => {
    it('uses separate L and R channels', () => {
      expect(audio('solo(0.2, 0.8)')).toMatchAudio([[0.2, 0.2, 0.2], [0.8, 0.8, 0.8]])
    })
  })
})

describe('solo() muting behavior', () => {
  it('solo() mutes all out() calls', () => {
    expect(audio('out(0.5); solo(0.3)')).toMatchAudio([[0.3, 0.3, 0.3], [0.3, 0.3, 0.3]])
  })

  it('multiple solo() calls are mixed', () => {
    expect(audio('solo(0.2); solo(0.3)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
  })

  it('solo() mutes out() but not other solo()', () => {
    expect(audio('out(0.1); solo(0.2); out(0.3); solo(0.4)')).toMatchAudio([[0.6, 0.6, 0.6], [0.6, 0.6, 0.6]])
  })

  it('without solo(), out() calls work normally', () => {
    expect(audio('out(0.2); out(0.3)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
  })

  it('solo() with stereo mutes out()', () => {
    expect(audio('out(0.1, 0.2); solo(0.3, 0.4)')).toMatchAudio([[0.3, 0.3, 0.3], [0.4, 0.4, 0.4]])
  })

  it('solo() with array mutes out()', () => {
    expect(audio('out([0.1, 0.2]); solo([0.3, 0.4])')).toMatchAudio([[0.3, 0.3, 0.3], [0.4, 0.4, 0.4]])
  })
})

describe('solo() equivalence', () => {
  it('solo(x) is equivalent to solo(x,x)', () => {
    const mono = audio('solo(0.5)')
    const stereo = audio('solo(0.5, 0.5)')
    expect(mono).toEqual(stereo)
  })

  it('solo(x) is equivalent to solo([x,x])', () => {
    const mono = audio('solo(0.5)')
    const array = audio('solo([0.5, 0.5])')
    expect(mono).toEqual(array)
  })

  it('solo(L,R) is equivalent to solo([L,R])', () => {
    const twoArgs = audio('solo(0.3, 0.7)')
    const array = audio('solo([0.3, 0.7])')
    expect(twoArgs).toEqual(array)
  })
})

describe('automatic stereo lifting', () => {
  describe('mono function with "in" parameter', () => {
    it('lifts stereo array to dual mono calls', () => {
      const f = 'f = (in) -> in * 2; [3, 5] |> f($) |> out($)'
      const expected = '[3 * 2, 5 * 2] |> out($)'
      expect(audio(f)).toMatchAudio(audio(expected))
    })

    it('processes scalar normally without lifting', () => {
      expect(audio('f = (in) -> in * 2; 5 |> f($) |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
    })

    it('processes signal normally without lifting', () => {
      expect(audio('f = (in) -> in * 2; sine(440) |> f($) |> out($)')).toMatchAudio(audio('sine(440) * 2 |> out($)'))
    })

    it('lifts stereo with different values', () => {
      expect(audio('f = (in) -> in + 10; [1, 2] |> f($) |> out($)')).toMatchAudio([[11, 11, 11], [12, 12, 12]])
    })

    it('lifts stereo with signals', () => {
      const f = 'f = (in) -> in * 0.5; [sine(440), sine(880)] |> f($) |> out($)'
      const expected = '[sine(440) * 0.5, sine(880) * 0.5] |> out($)'
      expect(audio(f)).toMatchAudio(audio(expected))
    })

    it('lifts stereo with mixed scalar and signal', () => {
      const f = 'f = (in) -> in + 1; [5, sine(440)] |> f($) |> out($)'
      const expected = '[5 + 1, sine(440) + 1] |> out($)'
      expect(audio(f)).toMatchAudio(audio(expected))
    })

    it('lifts with complex processing', () => {
      expect(audio('gain = (in) -> in * 0.5; [10, 20] |> gain($) |> out($)')).toMatchAudio([[5, 5, 5], [10, 10, 10]])
    })

    it('lifts with nested operations', () => {
      expect(audio('f = (in) -> in * 2 + 1; [3, 4] |> f($) |> out($)')).toMatchAudio([[7, 7, 7], [9, 9, 9]])
    })

    it('lifts with the result of another function', () => {
      expect(audio('f = in -> in + 1; g = () -> [1, 2]; g() |> f($) |> out($)')).toMatchAudio([[2, 2, 2], [3, 3, 3]])
    })

    it('edge case - delay', () => {
      const result = audio('[1,2] |> delay($,0) |> out($)', { ticks: 2 })
      const left = result[0]
      expect(left.some(v => Math.abs(v) > 0.0001)).toBe(true)
    })
  })

  describe('stereo function with "in:[L,R]" destructuring', () => {
    it('processes stereo array normally', () => {
      expect(audio('f = (in:[L,R]) -> L + R; out(f([3, 5]))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
    })

    it('lifts scalar to stereo array', () => {
      const f = 'f = (in:[L,R]) -> L + R; out(f(5))'
      const expected = 'f = (in:[L,R]) -> L + R; out(f([5, 5]))'
      expect(audio(f)).toMatchAudio(audio(expected))
    })

    it('lifts signal to stereo array', () => {
      const f = 'f = (in:[L,R]) -> L + R; out(f(sine(440)))'
      const expected = 'f = (in:[L,R]) -> L + R; out(f([sine(440), sine(440)]))'
      expect(audio(f)).toMatchAudio(audio(expected))
    })

    it('processes different stereo values', () => {
      expect(audio('f = (in:[L,R]) -> [L * 2, R * 3]; out(f([1, 2]))')).toMatchAudio([[2, 2, 2], [6, 6, 6]])
    })

    it('lifts scalar with stereo processing', () => {
      expect(audio('f = (in:[L,R]) -> [L * 2, R * 3]; out(f(2))')).toMatchAudio([[4, 4, 4], [6, 6, 6]])
    })

    it('swaps channels with array input', () => {
      expect(audio('swap = (in:[L,R]) -> [R, L]; out(swap([3, 7]))')).toMatchAudio([[7, 7, 7], [3, 3, 3]])
    })

    it('duplicates with scalar input', () => {
      expect(audio('swap = (in:[L,R]) -> [R, L]; out(swap(5))')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
    })
  })

  describe('combined scenarios', () => {
    it('chains mono and stereo functions with literal', () => {
      const code = `
        mono = (in) -> in * 2
        stereo = (in:[L,R]) -> [L + 1, R + 2]
        out(stereo([mono(3), mono(5)]))
      `
      // Manually construct array with mono calls
      // mono(3) -> 6, mono(5) -> 10
      // stereo([6,10]) -> [7, 12]
      expect(audio(code)).toMatchAudio([[7, 7, 7], [12, 12, 12]])
    })

    it('applies gain then pan with literal', () => {
      const code = `
        gain = (in) -> in * 0.5
        pan = (in:[L,R], amount) -> [L * (1 - amount), R * amount]
        out(pan([gain(10), gain(20)], 0.5))
      `
      // gain(10) -> 5, gain(20) -> 10
      // pan([5,10], 0.5) -> [2.5, 5]
      expect(audio(code)).toMatchAudio([[2.5, 2.5, 2.5], [5, 5, 5]])
    })

    it('lifts scalar literal through stereo', () => {
      const code = `
        stereo = (in:[L,R]) -> L + R
        out(stereo(15))
      `
      // stereo(15) -> stereo([15,15]) -> 30
      expect(audio(code)).toMatchAudio([[30, 30, 30], [30, 30, 30]])
    })

    it('processes stereo array literal through mono', () => {
      const code = `
        boost = (in) -> in * 2
        out(boost([1, 2]))
      `
      // boost([1,2]) -> [boost(1), boost(2)] -> [2, 4]
      expect(audio(code)).toMatchAudio([[2, 2, 2], [4, 4, 4]])
    })
  })

  describe('edge cases', () => {
    it('handles array with more than 2 elements in mono function', () => {
      // Should only lift if exactly 2 elements, otherwise pass array through
      expect(audio('f = (in) -> isarray(in); out(f([1, 2, 3]))')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
    })

    it('handles empty array in mono function', () => {
      expect(audio('f = (in) -> isarray(in); out(f([]))')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
    })

    it('handles single element array in mono function', () => {
      expect(audio('f = (in) -> isarray(in); out(f([5]))')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
    })

    it('non-in parameter does not lift', () => {
      expect(audio('f = (x) -> isarray(x); out(f([3, 5]))')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
    })

    it('in parameter with other params', () => {
      expect(audio('f = (in, gain) -> in * gain; out(f([2, 3], 5))')).toMatchAudio([[10, 10, 10], [15, 15, 15]])
    })

    it('stereo function with other params', () => {
      expect(audio('f = (in:[L,R], x) -> [L + x, R + x]; out(f([1, 2], 10))')).toMatchAudio([
        [11, 11, 11],
        [12, 12, 12],
      ])
    })

    it('stereo function with scalar and other params', () => {
      expect(audio('f = (in:[L,R], x) -> [L + x, R + x]; out(f(5, 10))')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
    })
  })

  describe('with out() integration', () => {
    it('mono function output goes to out', () => {
      expect(audio('f = (in) -> in * 2; f([3, 5]) |> out($)')).toMatchAudio([[6, 6, 6], [10, 10, 10]])
    })

    it('stereo function output goes to out', () => {
      expect(audio('f = (in:[L,R]) -> [L * 2, R * 3]; f([1, 2]) |> out($)')).toMatchAudio([[2, 2, 2], [6, 6, 6]])
    })

    it('lifted scalar through stereo to out', () => {
      expect(audio('f = (in:[L,R]) -> [L, R]; f(5) |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
    })
  })

  describe('builtin stereo lifting', () => {
    it('builtin function with stereo parameter', () => {
      expect(audio('out(lp([sine(100), sine(200)]))')).toMatchAudio(audio('out([lp(sine(100)), lp(sine(200))])'))
    })

    it('builtin function lp', () => {
      expect(audio('out(lp([sine(100), sine(200)],1500,1))')).toMatchAudio(
        audio('out([lp(sine(100),1500,1), lp(sine(200),1500,1)])'),
      )
    })
  })
})

describe('bpm semantics', () => {
  it('bpm=123 updates tempo-derived system values', () => {
    expect(audio('bpm=123; out(co)', { ticks: 1, bufferLength: 3, bpm: 120 })).toMatchAudio([
      [0.4878, 0.4878, 0.4878],
      [0.4878, 0.4878, 0.4878],
    ])
    expect(audio('bpm=123; out(samplesPerBar / samplesPerBeat)', { ticks: 1, bufferLength: 3, bpm: 120 })).toMatchAudio(
      [
        [4, 4, 4],
        [4, 4, 4],
      ],
    )
  })

  it('bpmOverride ignores bpm set in code', () => {
    expect(audio('bpm=100; out(co)', { ticks: 1, bufferLength: 3, bpm: 120, bpmOverride: 200 })).toMatchAudio([
      [0.3, 0.3, 0.3],
      [0.3, 0.3, 0.3],
    ])
  })
})

describe('mix', () => {
  it('mix() is the default function', () => {
    expect(audio('mix=(in:[L,R])->[R, L]; out([1, 2])')).toMatchAudio([[2], [1]])
  })

  it('default mix() passes through mixed outputs', () => {
    expect(audio('out(0.2); out(0.3)')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
  })

  it('custom mix() processes mixed outputs', () => {
    expect(audio('mix=(in:[L,R])->[L*2, R*2]; out(0.1); out(0.2)')).toMatchAudio([[0.6, 0.6, 0.6], [0.6, 0.6, 0.6]])
  })

  it('mix() with mono and stereo outputs', () => {
    expect(audio('mix=(in:[L,R])->[L+0.1, R+0.1]; out(0.1); out(0.2, 0.3)')).toMatchAudio([[0.4, 0.4, 0.4], [0.5, 0.5,
      0.5]])
  })

  it('mix() with solo() outputs', () => {
    expect(audio('mix=(in:[L,R])->[L*0.5, R*0.5]; out(0.1); solo(0.2)')).toMatchAudio([[0.1, 0.1, 0.1], [0.1, 0.1,
      0.1]])
  })

  it('mix() with signals', () => {
    expect(audio('mix=(in:[L,R])->[L*0.5, R*0.5]; out(sine(100)); out(sine(200))')).toMatchAudio(
      audio('out((sine(100) + sine(200)) * 0.5)'),
    )
  })

  it('mix() with array syntax', () => {
    expect(audio('mix=(in:[L,R])->[R, L]; out([0.1, 0.2]); out([0.3, 0.4])')).toMatchAudio([[0.6, 0.6, 0.6], [0.4, 0.4,
      0.4]])
  })
})
