import { beforeAll, describe, expect, it } from 'bun:test'
import { compile } from '../../src/live/compiler/index.ts'
import { parse, parseTokens } from '../../src/live/parser.ts'
import { tokenize } from '../../src/live/token.ts'
import { audio, audioAsync, setup, sine } from '../test-utils.ts'
import '../../as/build/index.wasm'

beforeAll(async () => {
  await setup()
})

describe('variables', () => {
  it('x = 1', () => {
    expect(audio('x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('x = 1; y = x + 1', () => {
    expect(audio('x = 1; y = x + 1; y |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  describe('audio buffer reuse', () => {
    it('global variable reused multiple times with ad', () => {
      const out = audio('trig=every(1/4); ad(.001,.8,trig) + ad(.001,.8,trig) + ad(.001,.8,trig) |> out($)', {
        ticks: 4,
      })
      expect(out).toMatchAudio(
        [[0.0625, 0.125, 0.1875], [0.0625, 0.125, 0.1875]],
        3,
        0.02,
      )
    })

    it('local variable reused multiple times with ad', () => {
      const out = audio(
        'f = () -> { trig := every(1/4); ad(.001,.8,trig) + ad(.001,.8,trig) + ad(.001,.8,trig) }; f() |> out($)',
        { ticks: 4 },
      )
      expect(out).toMatchAudio(
        [[0.0625, 0.125, 0.1875], [0.0625, 0.125, 0.1875]],
        3,
        0.02,
      )
    })

    it('global variable with sine and trig parameter', () => {
      const withVar = audio('trig=every(1/4); sine(440,trig) |> out($)', { ticks: 4 })
      const direct = audio('sine(440,every(1/4)) |> out($)', { ticks: 4 })
      expect(withVar).toMatchAudio(direct)
    })

    it('local variable with sine and trig parameter', () => {
      const withVar = audio('f = () -> { trig := every(1/4); sine(440,trig) }; f() |> out($)', { ticks: 4 })
      const direct = audio('f = () -> { sine(440,every(1/4)) }; f() |> out($)', { ticks: 4 })
      expect(withVar).toMatchAudio(direct)
    })

    it('global variable used in sine hz and trig', () => {
      const withVar = audio('trig=every(1/4); sine(ad(.001,.8,trig),trig) |> out($)', { ticks: 4 })
      const direct = audio('sine(ad(.001,.8,every(1/4)),every(1/4)) |> out($)', { ticks: 4 })
      expect(withVar).toMatchAudio(direct)
    })

    it('local variable used in sine hz and trig', () => {
      const withVar = audio('f = () -> { trig := every(1/4); sine(ad(.001,.8,trig),trig) }; f() |> out($)', {
        ticks: 4,
      })
      const direct = audio('f = () -> { sine(ad(.001,.8,every(1/4)),every(1/4)) }; f() |> out($)', { ticks: 4 })
      expect(withVar).toMatchAudio(direct)
    })

    it('global variable with sine, ad in hz, trig, and multiply by ad', () => {
      const withVar = audio('trig=every(1/4); sine(ad(.001,.8,trig),trig)*ad(.007,.8,trig) |> out($)', { ticks: 4 })
      const direct = audio('sine(ad(.001,.8,every(1/4)),every(1/4))*ad(.007,.8,every(1/4)) |> out($)', { ticks: 4 })
      expect(withVar).toMatchAudio(direct)
    })

    it('local variable with sine, ad in hz, trig, and multiply by ad', () => {
      const withVar = audio(
        'f = () -> { trig := every(1/4); sine(ad(.001,.8,trig),trig)*ad(.007,.8,trig) }; f() |> out($)',
        { ticks: 4 },
      )
      const direct = audio(
        'f = () -> { sine(ad(.001,.8,every(1/4)),every(1/4))*ad(.007,.8,every(1/4)) }; f() |> out($)',
        { ticks: 4 },
      )
      expect(withVar).toMatchAudio(direct)
    })

    it('global variable with complex expression (original bug case)', () => {
      const withVar = audio(
        'trig=every(1/4); sine(52+1700*ad(.001,.8,trig)**170,offset:.5,trig)*ad(.007,.8,trig)**5 |> out($)',
        { ticks: 4 },
      )
      const direct = audio(
        'sine(52+1700*ad(.001,.8,every(1/4))**170,offset:.5,every(1/4))*ad(.007,.8,every(1/4))**5 |> out($)',
        { ticks: 4 },
      )
      expect(withVar).toMatchAudio(direct)
    })

    it('local variable with complex expression', () => {
      const withVar = audio(
        'f = () -> { trig := every(1/4); sine(52+1700*ad(.001,.8,trig)**170,offset:.5,trig)*ad(.007,.8,trig)**5 }; f() |> out($)',
        { ticks: 4 },
      )
      const direct = audio(
        'f = () -> { sine(52+1700*ad(.001,.8,every(1/4))**170,offset:.5,every(1/4))*ad(.007,.8,every(1/4))**5 }; f() |> out($)',
        { ticks: 4 },
      )
      expect(withVar).toMatchAudio(direct)
    })

    it('audio variable reused with x + x', () => {
      const withVar = audio('x = sine(440); x + x |> out($)', { ticks: 1 })
      const direct = audio('sine(440) + sine(440) |> out($)', { ticks: 1 })
      expect(withVar).toMatchAudio(direct)
    })

    it('audio variable reused with x * x', () => {
      const withVar = audio('x = sine(440); x * x |> out($)', { ticks: 1 })
      const direct = audio('sine(440) * sine(440) |> out($)', { ticks: 1 })
      expect(withVar).toMatchAudio(direct)
    })

    it('multiple audio variables reused', () => {
      const withVar = audio('a = sine(440); b = sine(880); a + b + a + b |> out($)', { ticks: 1 })
      const direct = audio('sine(440) + sine(880) + sine(440) + sine(880) |> out($)', { ticks: 1 })
      expect(withVar).toMatchAudio(direct)
    })
  })
})

describe('arithmetic', () => {
  it('1+1', () => {
    expect(audio('1+1 |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('a+b', () => {
    expect(audio('a=1; b=2; a+b |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('1+sine(100)', () => {
    expect(audio('1+sine(100) |> out($)')).toMatchAudio([[...sine(100)[0].slice(0, 3)].map(x => x + 1),
      [...sine(100)[0].slice(0, 3)].map(x => x + 1)])
  })

  it('addition', () => {
    expect(audio('x = 5 + 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('subtraction', () => {
    expect(audio('x = 10 - 3; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('multiplication', () => {
    expect(audio('x = 4 * 5; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('division', () => {
    expect(audio('x = 20 / 4; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('modulo', () => {
    expect(audio('x = 10 % 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('power', () => {
    expect(audio('x = 2 ** 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('negative numbers', () => {
    expect(audio('x = -5; x |> out($)')).toMatchAudio([[-5, -5, -5], [-5, -5, -5]])
  })

  it('negation of expression', () => {
    expect(audio('x = -(5 + 3); x |> out($)')).toMatchAudio([[-8, -8, -8], [-8, -8, -8]])
  })

  it('addition with negatives', () => {
    expect(audio('x = -5 + 3; x |> out($)')).toMatchAudio([[-2, -2, -2], [-2, -2, -2]])
  })

  it('subtraction with negatives', () => {
    expect(audio('x = -5 - 3; x |> out($)')).toMatchAudio([[-8, -8, -8], [-8, -8, -8]])
  })

  it('multiplication with negatives', () => {
    expect(audio('x = -5 * 3; x |> out($)')).toMatchAudio([[-15, -15, -15], [-15, -15, -15]])
  })

  it('division with negatives', () => {
    expect(audio('x = -20 / 4; x |> out($)')).toMatchAudio([[-5, -5, -5], [-5, -5, -5]])
  })

  it('double negative', () => {
    expect(audio('x = -(-5); x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('order of operations - multiplication before addition', () => {
    expect(audio('x = 2 + 3 * 4; x |> out($)')).toMatchAudio([[14, 14, 14], [14, 14, 14]])
  })

  it('order of operations - division before subtraction', () => {
    expect(audio('x = 20 - 10 / 2; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('order of operations - power before multiplication', () => {
    expect(audio('x = 2 * 3 ** 2; x |> out($)')).toMatchAudio([[18, 18, 18], [18, 18, 18]])
  })

  it('chained addition', () => {
    expect(audio('x = 1 + 2 + 3 + 4; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('chained multiplication', () => {
    expect(audio('x = 2 * 3 * 4; x |> out($)')).toMatchAudio([[24, 24, 24], [24, 24, 24]])
  })

  it('mixed operations', () => {
    expect(audio('x = 10 + 5 * 2 - 3; x |> out($)')).toMatchAudio([[17, 17, 17], [17, 17, 17]])
  })

  it('division by decimal', () => {
    expect(audio('x = 10 / 2.5; x |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('decimal multiplication', () => {
    expect(audio('x = 2.5 * 4; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('decimal addition', () => {
    expect(audio('x = 1.5 + 2.5; x |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('power with decimals', () => {
    expect(audio('x = 2.5 ** 2; x |> out($)')).toMatchAudio([[6.25, 6.25, 6.25], [6.25, 6.25, 6.25]])
  })

  it('modulo with decimals', () => {
    expect(audio('x = 10.5 % 3; x |> out($)')).toMatchAudio([[1.5, 1.5, 1.5], [1.5, 1.5, 1.5]])
  })

  it('zero addition', () => {
    expect(audio('x = 5 + 0; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('zero multiplication', () => {
    expect(audio('x = 5 * 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('one multiplication', () => {
    expect(audio('x = 5 * 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('division by one', () => {
    expect(audio('x = 5 / 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('power of zero', () => {
    expect(audio('x = 5 ** 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('power of one', () => {
    expect(audio('x = 5 ** 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('zero to power', () => {
    expect(audio('x = 0 ** 5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('complex expression', () => {
    expect(audio('x = (2 + 3) * (4 - 1) / 3; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('nested parentheses', () => {
    expect(audio('x = ((2 + 3) * 4) - 5; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('arithmetic with variables', () => {
    expect(audio('a = 5; b = 3; x = a + b; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('compound arithmetic', () => {
    expect(audio('a = 10; b = 5; c = 2; x = a + b * c; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('arithmetic in function', () => {
    expect(audio('f = (a, b) -> a * b + 10; f(5, 3) |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('arithmetic with array elements', () => {
    expect(audio('arr = [10, 5, 2]; x = arr[0] + arr[1] * arr[2]; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20,
      20]])
  })

  it('arithmetic with array length', () => {
    expect(audio('arr = [1, 2, 3]; x = arr.length * 10; x |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('arithmetic with array avg', () => {
    expect(audio('arr = [10, 20, 30]; x = arr.avg() + 5; x |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('power with negative exponent', () => {
    expect(audio('x = 2 ** -2; x |> out($)')).toMatchAudio([[0.25, 0.25, 0.25], [0.25, 0.25, 0.25]])
  })

  it('large numbers', () => {
    expect(audio('x = 1000 + 2000; x |> out($)')).toMatchAudio([[3000, 3000, 3000], [3000, 3000, 3000]])
  })

  it('small decimals', () => {
    expect(audio('x = 0.1 + 0.2; x |> out($)')).toMatchAudio([[0.3, 0.3, 0.3], [0.3, 0.3, 0.3]])
  })

  it('division resulting in decimal', () => {
    expect(audio('x = 5 / 2; x |> out($)')).toMatchAudio([[2.5, 2.5, 2.5], [2.5, 2.5, 2.5]])
  })

  it('modulo with larger divisor', () => {
    expect(audio('x = 5 % 10; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('modulo with equal numbers', () => {
    expect(audio('x = 5 % 5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('subtraction resulting in negative', () => {
    expect(audio('x = 5 - 10; x |> out($)')).toMatchAudio([[-5, -5, -5], [-5, -5, -5]])
  })

  it('multiplication by negative', () => {
    expect(audio('x = 5 * -3; x |> out($)')).toMatchAudio([[-15, -15, -15], [-15, -15, -15]])
  })

  it('division by negative', () => {
    expect(audio('x = 20 / -4; x |> out($)')).toMatchAudio([[-5, -5, -5], [-5, -5, -5]])
  })

  it('negative power', () => {
    expect(audio('x = -2 ** 3; x |> out($)')).toMatchAudio([[-8, -8, -8], [-8, -8, -8]])
  })

  it('arithmetic assignment operators +=', () => {
    expect(audio('x = 5; x += 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('arithmetic assignment operators -=', () => {
    expect(audio('x = 10; x -= 3; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('arithmetic assignment operators *=', () => {
    expect(audio('x = 5; x *= 3; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('arithmetic assignment operators /=', () => {
    expect(audio('x = 20; x /= 4; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('arithmetic assignment operators %=', () => {
    expect(audio('x = 10; x %= 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('arithmetic assignment operators **=', () => {
    expect(audio('x = 2; x **= 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('chained assignment operators', () => {
    expect(audio('x = 10; x += 5; x *= 2; x |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('compound assignment with array elements +=', () => {
    expect(audio('arr = [1, 2, 3]; arr[0] += 10; arr[0] |> out($)')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('compound assignment with array elements -=', () => {
    expect(audio('arr = [10, 20]; arr[0] -= 3; arr[0] |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('compound assignment with array elements *=', () => {
    expect(audio('arr = [1, 2, 3]; arr[1] *= 5; arr[1] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('compound assignment with array elements /=', () => {
    expect(audio('arr = [20, 10]; arr[0] /= 4; arr[0] |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('compound assignment with array elements **=', () => {
    expect(audio('arr = [2, 3]; arr[0] **= 3; arr[0] |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('chained compound assignment with array elements', () => {
    expect(audio('arr = [10]; arr[0] += 5; arr[0] *= 2; arr[0] |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('arithmetic in ternary', () => {
    expect(audio('x = 1 > 0 ? 5 + 3 : 10 - 2; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('arithmetic in if condition', () => {
    expect(audio('x = 0; if (5 + 3 > 7) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('fractional power', () => {
    expect(audio('x = 9 ** 0.5; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('cube root via power', () => {
    expect(audio('x = 27 ** (1 / 3); x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })
})

describe('bitwise', () => {
  it('bitwise AND basic', () => {
    expect(audio('x = 5 & 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise OR basic', () => {
    expect(audio('x = 5 | 3; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('bitwise XOR basic', () => {
    expect(audio('x = 5 ^ 3; x |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('left shift basic', () => {
    expect(audio('x = 5 << 2; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('right shift basic', () => {
    expect(audio('x = 20 >> 2; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('bitwise AND with zero', () => {
    expect(audio('x = 5 & 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('bitwise OR with zero', () => {
    expect(audio('x = 5 | 0; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('bitwise XOR with zero', () => {
    expect(audio('x = 5 ^ 0; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('bitwise XOR with self', () => {
    expect(audio('x = 5 ^ 5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('bitwise AND all ones', () => {
    expect(audio('x = 15 & 15; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('bitwise OR all ones', () => {
    expect(audio('x = 15 | 15; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('left shift by zero', () => {
    expect(audio('x = 5 << 0; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('right shift by zero', () => {
    expect(audio('x = 5 >> 0; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('left shift by one', () => {
    expect(audio('x = 7 << 1; x |> out($)')).toMatchAudio([[14, 14, 14], [14, 14, 14]])
  })

  it('right shift by one', () => {
    expect(audio('x = 14 >> 1; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('chained bitwise AND', () => {
    expect(audio('x = 15 & 7 & 3; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('chained bitwise OR', () => {
    expect(audio('x = 1 | 2 | 4; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('chained bitwise XOR', () => {
    expect(audio('x = 5 ^ 3 ^ 1; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('mixed bitwise operations', () => {
    expect(audio('x = (5 | 3) & 6; x |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('bitwise with variables', () => {
    expect(audio('a = 5; b = 3; x = a & b; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise in expression', () => {
    expect(audio('x = (5 & 3) + (5 | 3); x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('shift with variable', () => {
    expect(audio('a = 5; b = 2; x = a << b; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('bitwise AND with larger numbers', () => {
    expect(audio('x = 255 & 127; x |> out($)')).toMatchAudio([[127, 127, 127], [127, 127, 127]])
  })

  it('bitwise OR with larger numbers', () => {
    expect(audio('x = 128 | 64; x |> out($)')).toMatchAudio([[192, 192, 192], [192, 192, 192]])
  })

  it('bitwise XOR swap pattern', () => {
    expect(audio('a = 5; b = 3; a = a ^ b; b = a ^ b; a = a ^ b; a |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('left shift multiple bits', () => {
    expect(audio('x = 1 << 4; x |> out($)')).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('right shift multiple bits', () => {
    expect(audio('x = 64 >> 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('bitwise mask operation', () => {
    expect(audio('x = 123 & 15; x |> out($)')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('bitwise set bit', () => {
    expect(audio('x = 8 | 4; x |> out($)')).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('bitwise clear bit', () => {
    expect(audio('x = 15 & 11; x |> out($)')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('bitwise toggle bit', () => {
    expect(audio('x = 12 ^ 4; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('power of two check', () => {
    expect(audio('x = 16 & 15; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('bitwise with arithmetic', () => {
    expect(audio('x = (5 + 3) & (10 - 2); x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('shift and add', () => {
    expect(audio('x = (1 << 3) + (1 << 2); x |> out($)')).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('bitwise in function', () => {
    expect(audio('f = (a, b) -> a & b; f(5, 3) |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise with array elements', () => {
    expect(audio('arr = [5, 3]; x = arr[0] & arr[1]; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('compound assignment with array elements &=', () => {
    expect(audio('arr = [5, 3]; arr[0] &= 3; arr[0] |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('compound assignment with array elements |=', () => {
    expect(audio('arr = [5, 3]; arr[0] |= 3; arr[0] |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('compound assignment with array elements <<=', () => {
    expect(audio('arr = [5]; arr[0] <<= 2; arr[0] |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('bitwise assignment &=', () => {
    expect(audio('x = 5; x &= 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise assignment |=', () => {
    expect(audio('x = 5; x |= 3; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('bitwise assignment ^=', () => {
    expect(audio('x = 5; x ^= 3; x |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('bitwise assignment <<=', () => {
    expect(audio('x = 5; x <<= 2; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('bitwise assignment >>=', () => {
    expect(audio('x = 20; x >>= 2; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('bitwise in ternary', () => {
    expect(audio('x = 1 > 0 ? 5 & 3 : 5 | 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise in if condition', () => {
    expect(audio('x = 0; if (5 & 3) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('complex bitwise expression', () => {
    expect(audio('x = ((5 | 3) & 7) ^ 2; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('bitwise precedence with arithmetic', () => {
    expect(audio('x = 5 + 3 & 7; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('shift precedence with arithmetic', () => {
    expect(audio('x = 2 + 3 << 1; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('bitwise OR vs logical OR precedence', () => {
    expect(audio('x = 1 || 5 | 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('bitwise AND vs logical AND precedence', () => {
    expect(audio('x = 1 && 5 & 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('extract low nibble', () => {
    expect(audio('x = 123 & 15; x |> out($)')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('extract high nibble', () => {
    expect(audio('x = (123 >> 4) & 15; x |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('combine nibbles', () => {
    expect(audio('x = (7 << 4) | 11; x |> out($)')).toMatchAudio([[123, 123, 123], [123, 123, 123]])
  })

  it('bitwise with parentheses', () => {
    expect(audio('x = (5 & 3); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('multiple shifts', () => {
    expect(audio('x = 1 << 2 << 1; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('shift then mask', () => {
    expect(audio('x = (255 >> 4) & 15; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('bitwise in array literal', () => {
    expect(audio('arr = [5 & 3, 5 | 3, 5 ^ 3]; arr[0] + arr[1] + arr[2] |> out($)')).toMatchAudio([[14, 14, 14], [14,
      14, 14]])
  })
})

describe('logical', () => {
  it('logical AND true true', () => {
    expect(audio('x = 1 && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical AND true false', () => {
    expect(audio('x = 1 && 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical AND false true', () => {
    expect(audio('x = 0 && 1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical AND false false', () => {
    expect(audio('x = 0 && 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical OR true true', () => {
    expect(audio('x = 1 || 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical OR true false', () => {
    expect(audio('x = 1 || 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical OR false true', () => {
    expect(audio('x = 0 || 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical OR false false', () => {
    expect(audio('x = 0 || 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical NOT true', () => {
    expect(audio('x = !1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical NOT false', () => {
    expect(audio('x = !0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('double NOT true', () => {
    expect(audio('x = !!1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('double NOT false', () => {
    expect(audio('x = !!0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical AND with numbers', () => {
    expect(audio('x = 5 && 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical OR with numbers', () => {
    expect(audio('x = 5 || 3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with number', () => {
    expect(audio('x = !5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical AND with zero', () => {
    expect(audio('x = 0 && 5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical OR with zero', () => {
    expect(audio('x = 0 || 5; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('chained logical AND', () => {
    expect(audio('x = 1 && 1 && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('chained logical AND with false', () => {
    expect(audio('x = 1 && 0 && 1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('chained logical OR', () => {
    expect(audio('x = 0 || 0 || 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('chained logical OR all false', () => {
    expect(audio('x = 0 || 0 || 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('mixed logical AND OR', () => {
    expect(audio('x = 1 && 1 || 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('mixed logical OR AND', () => {
    expect(audio('x = 0 || 1 && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with parentheses', () => {
    expect(audio('x = (1 || 0) && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with AND', () => {
    expect(audio('x = !0 && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with OR', () => {
    expect(audio('x = !1 || 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with variables', () => {
    expect(audio('a = 1; b = 0; x = a && b; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical with comparison', () => {
    expect(audio('x = 5 > 3 && 2 < 4; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with equality', () => {
    expect(audio('x = 5 == 5 || 3 == 4; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with comparison', () => {
    expect(audio('x = !(5 > 3); x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical in ternary condition', () => {
    expect(audio('x = 1 && 1 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('logical in ternary branches', () => {
    expect(audio('x = 1 > 0 ? 1 && 1 : 0 || 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical in if condition', () => {
    expect(audio('x = 0; if (1 && 1) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical in function', () => {
    expect(audio('f = (a, b) -> a && b; f(1, 1) |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with array elements', () => {
    expect(audio('arr = [1, 0]; x = arr[0] && arr[1]; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical NOT with array element', () => {
    expect(audio('arr = [0]; x = !arr[0]; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('complex logical expression', () => {
    expect(audio('x = (1 || 0) && (1 || 0) && !(0 && 1); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with arithmetic', () => {
    expect(audio('x = 5 + 3 > 7 && 10 - 2 < 9; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical precedence AND before OR', () => {
    expect(audio('x = 0 || 1 && 0; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical with negative numbers', () => {
    expect(audio('x = -5 && -3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with negative', () => {
    expect(audio('x = !-5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical in array literal', () => {
    expect(audio('arr = [1 && 1, 0 || 1, !0]; arr[0] + arr[1] + arr[2] |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('logical short circuit AND false', () => {
    expect(audio('a = 0; b = 5; x = a && b; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical short circuit OR true', () => {
    expect(audio('a = 1; b = 5; x = a || b; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with multiple NOT', () => {
    expect(audio('x = !!!1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical AND with all truthy', () => {
    expect(audio('x = 5 && 3 && 7; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical OR with first truthy', () => {
    expect(audio('x = 5 || 0 || 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with decimal numbers', () => {
    expect(audio('x = 0.5 && 0.3; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with decimal', () => {
    expect(audio('x = !0.5; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical with comparison chains', () => {
    expect(audio('x = 5 > 3 && 3 > 1 && 1 > 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with inequality chains', () => {
    expect(audio('x = 5 != 3 || 3 != 3 || 1 != 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical in nested ternary', () => {
    expect(audio('x = 1 && 1 ? 1 || 0 ? 10 : 20 : 30; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('logical with array length', () => {
    expect(audio('arr = [1, 2, 3]; x = arr.length > 0 && arr.length < 10; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1,
      1]])
  })

  it('logical NOT with array length', () => {
    expect(audio('arr = []; x = !arr.length; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with function return', () => {
    expect(audio('f = () -> 1; x = f() && 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with function return', () => {
    expect(audio('f = () -> 0; x = !f(); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('complex nested logical', () => {
    expect(audio('x = (1 && (0 || 1)) && (!(0 && 1) || 0); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with modulo', () => {
    expect(audio('x = 10 % 2 == 0 && 15 % 3 == 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with power', () => {
    expect(audio('x = 2 ** 3 > 7 && 3 ** 2 < 10; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical in assignment', () => {
    expect(audio('a = 1; b = 0; c = a && b; c |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('logical with multiple variables', () => {
    expect(audio('a = 1; b = 1; c = 0; x = a && b && !c; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical precedence complex', () => {
    expect(audio('x = 1 || 0 && 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical with bitwise result', () => {
    expect(audio('x = (5 & 3) && (5 | 3); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('logical NOT with bitwise', () => {
    expect(audio('x = !(5 & 0); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })
})

describe('loops', () => {
  it('while loop basic', () => {
    expect(audio('x = 0; i = 0; while (i < 3) { x = x + 1; i = i + 1 }; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3,
      3]])
  })

  it('while loop with zero iterations', () => {
    expect(audio('x = 0; i = 10; while (i < 3) { x = x + 1; i = i + 1 }; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0,
      0]])
  })

  it('while loop accumulator', () => {
    expect(audio('sum = 0; i = 1; while (i <= 5) { sum = sum + i; i = i + 1 }; sum |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('while loop with break condition', () => {
    expect(audio('x = 0; i = 0; while (i < 10) { x = x + 1; i = i + 1; if (i == 3) i = 10 }; x |> out($)'))
      .toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('while loop modifying multiple variables', () => {
    expect(audio('a = 0; b = 0; i = 0; while (i < 3) { a = a + 1; b = b + 2; i = i + 1 }; a + b |> out($)'))
      .toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('while loop with comparison', () => {
    expect(audio('x = 1; while (x < 10) x = x * 2; x |> out($)')).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('while loop with equality', () => {
    expect(audio('x = 0; i = 0; while (i != 5) { x = x + 1; i = i + 1 }; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5,
      5]])
  })

  it('while loop with logical AND', () => {
    expect(audio('x = 0; i = 0; j = 0; while (i < 3 && j < 3) { x = x + 1; i = i + 1; j = j + 1 }; x |> out($)'))
      .toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('while loop with logical OR', () => {
    expect(audio('x = 0; i = 0; while (i < 3 || i > 10) { x = x + 1; i = i + 1 }; x |> out($)')).toMatchAudio([[3, 3,
      3], [3, 3, 3]])
  })

  it('nested while loops', () => {
    expect(
      audio('x = 0; i = 0; while (i < 2) { j = 0; while (j < 3) { x = x + 1; j = j + 1 }; i = i + 1 }; x |> out($)'),
    ).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('while loop with array', () => {
    expect(
      audio('arr = [1, 2, 3]; sum = 0; i = 0; while (i < arr.length) { sum = sum + arr[i]; i = i + 1 }; sum |> out($)'),
    ).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('while loop reading array', () => {
    expect(
      audio(
        'arr = [1, 2, 3]; sum = 0; i = 0; while (i < arr.length) { sum = sum + arr[i] * 2; i = i + 1 }; sum |> out($)',
      ),
    ).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('while loop with function call', () => {
    expect(audio('f = x -> x * 2; sum = 0; i = 1; while (i <= 3) { sum = sum + f(i); i = i + 1 }; sum |> out($)'))
      .toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('while loop single statement', () => {
    expect(audio('x = 0; while (x < 5) x = x + 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('while loop with ternary', () => {
    expect(audio('x = 0; i = 0; while (i < 5) { x = x + (i % 2 == 0 ? 1 : 2); i = i + 1 }; x |> out($)')).toMatchAudio([
      [7, 7, 7],
      [7, 7, 7],
    ])
  })

  it('do-while loop basic', () => {
    expect(audio('x = 0; i = 0; do { x = x + 1; i = i + 1 } while (i < 3); x |> out($)')).toMatchAudio([[3, 3, 3], [3,
      3, 3]])
  })

  it('do-while loop executes at least once', () => {
    expect(audio('x = 0; i = 10; do { x = x + 1; i = i + 1 } while (i < 3); x |> out($)')).toMatchAudio([[1, 1, 1], [1,
      1, 1]])
  })

  it('do-while loop accumulator', () => {
    expect(audio('sum = 0; i = 1; do { sum = sum + i; i = i + 1 } while (i <= 5); sum |> out($)')).toMatchAudio([[15,
      15, 15], [15, 15, 15]])
  })

  it('do-while loop with comparison', () => {
    expect(audio('x = 1; do x = x * 2 while (x < 10); x |> out($)')).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('do-while loop with equality', () => {
    expect(audio('x = 0; i = 0; do { x = x + 1; i = i + 1 } while (i != 5); x |> out($)')).toMatchAudio([[5, 5, 5], [5,
      5, 5]])
  })

  it('do-while loop with logical AND', () => {
    expect(audio('x = 0; i = 0; j = 0; do { x = x + 1; i = i + 1; j = j + 1 } while (i < 3 && j < 3); x |> out($)'))
      .toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('do-while loop single execution', () => {
    expect(audio('x = 0; do x = x + 1 while (0); x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('nested do-while loops', () => {
    expect(
      audio(
        'x = 0; i = 0; do { j = 0; do { x = x + 1; j = j + 1 } while (j < 3); i = i + 1 } while (i < 2); x |> out($)',
      ),
    ).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('do-while with array', () => {
    expect(
      audio(
        'arr = [1, 2, 3]; sum = 0; i = 0; do { sum = sum + arr[i]; i = i + 1 } while (i < arr.length); sum |> out($)',
      ),
    ).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('do-while with function call', () => {
    expect(audio('f = x -> x * 2; sum = 0; i = 1; do { sum = sum + f(i); i = i + 1 } while (i <= 3); sum |> out($)'))
      .toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('for loop basic', () => {
    expect(audio('sum = 0; for (i in 1..5) sum = sum + i; sum |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('for loop with zero', () => {
    expect(audio('sum = 0; for (i in 0..3) sum = sum + i; sum |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('for loop single iteration', () => {
    expect(audio('x = 0; for (i in 5..5) x = i; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('for loop with block', () => {
    expect(audio('sum = 0; for (i in 1..3) { sum = sum + i }; sum |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('for loop modifying external variable', () => {
    expect(audio('x = 0; for (i in 1..5) x = x + i; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('for loop reading array', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (i in 0..2) sum = sum + arr[i]; sum |> out($)')).toMatchAudio([[6, 6,
      6], [6, 6, 6]])
  })

  it('for loop with multiplication', () => {
    expect(audio('prod = 1; for (i in 1..4) prod = prod * i; prod |> out($)')).toMatchAudio([[24, 24, 24], [24, 24,
      24]])
  })

  it('nested for loops', () => {
    expect(audio('sum = 0; for (i in 1..2) for (j in 1..3) sum = sum + 1; sum |> out($)')).toMatchAudio([[6, 6, 6], [6,
      6, 6]])
  })

  it('for loop with function', () => {
    expect(audio('f = x -> x * 2; sum = 0; for (i in 1..3) sum = sum + f(i); sum |> out($)')).toMatchAudio([[12, 12,
      12], [12, 12, 12]])
  })

  it('for loop with ternary', () => {
    expect(audio('sum = 0; for (i in 1..5) sum = sum + (i % 2 == 0 ? i : 0); sum |> out($)')).toMatchAudio([[6, 6, 6], [
      6,
      6,
      6,
    ]])
  })

  it('for loop using loop variable', () => {
    expect(audio('sum = 0; for (i in 1..5) sum = sum + i * i; sum |> out($)')).toMatchAudio([[55, 55, 55], [55, 55,
      55]])
  })

  it('for loop with negative range', () => {
    expect(audio('sum = 0; for (i in 0..0) sum = sum + i; sum |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('while loop with arithmetic', () => {
    expect(audio('x = 0; i = 1; while (i <= 4) { x = x + i * 2; i = i + 1 }; x |> out($)')).toMatchAudio([[20, 20, 20],
      [20, 20, 20]])
  })

  it('do-while with arithmetic', () => {
    expect(audio('x = 0; i = 1; do { x = x + i * 2; i = i + 1 } while (i <= 4); x |> out($)')).toMatchAudio([[20, 20,
      20], [20, 20, 20]])
  })

  it('for loop with arithmetic', () => {
    expect(audio('x = 0; for (i in 1..4) x = x + i * 2; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('while loop with modulo', () => {
    expect(audio('x = 0; i = 0; while (i < 10) { if (i % 2 == 0) x = x + 1; i = i + 1 }; x |> out($)')).toMatchAudio([[
      5,
      5,
      5,
    ], [5, 5, 5]])
  })

  it('for loop with modulo', () => {
    expect(audio('x = 0; for (i in 0..9) if (i % 2 == 0) x = x + 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('for loop mixing audio', () => {
    expect(audio(`
      mel=[60,63,69]
      for (note of mel) {
        sine(midiToHz(note)) |> out($)
      }
    `)).toMatchAudio(audio(`
      sine(midiToHz(60)) |> out($)
      sine(midiToHz(63)) |> out($)
      sine(midiToHz(69)) |> out($)
    `))
  })

  it('while loop with power', () => {
    expect(audio('x = 1; i = 0; while (i < 5) { x = x * 2; i = i + 1 }; x |> out($)')).toMatchAudio([[32, 32, 32], [32,
      32, 32]])
  })

  it('mixed while and for', () => {
    expect(audio('x = 0; i = 0; while (i < 2) { for (j in 1..3) x = x + j; i = i + 1 }; x |> out($)')).toMatchAudio([[
      12,
      12,
      12,
    ], [12, 12, 12]])
  })

  it('mixed for and while', () => {
    expect(audio('x = 0; for (i in 1..2) { j = 0; while (j < 3) { x = x + 1; j = j + 1 } }; x |> out($)')).toMatchAudio(
      [[6, 6, 6], [6, 6, 6]],
    )
  })

  it('while loop with bitwise', () => {
    expect(audio('x = 1; i = 0; while (i < 4) { x = x << 1; i = i + 1 }; x |> out($)')).toMatchAudio([[16, 16, 16], [16,
      16, 16]])
  })

  it('for loop with bitwise', () => {
    expect(audio('x = 1; for (i in 1..4) x = x << 1; x |> out($)')).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('while loop countdown', () => {
    expect(audio('sum = 0; i = 5; while (i > 0) { sum = sum + i; i = i - 1 }; sum |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('do-while countdown', () => {
    expect(audio('sum = 0; i = 5; do { sum = sum + i; i = i - 1 } while (i > 0); sum |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('while with greater than', () => {
    expect(audio('x = 10; while (x > 5) x = x - 1; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('while with less than or equal', () => {
    expect(audio('sum = 0; i = 1; while (i <= 5) { sum = sum + i; i = i + 1 }; sum |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('while with greater than or equal', () => {
    expect(audio('sum = 0; i = 5; while (i >= 1) { sum = sum + i; i = i - 1 }; sum |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('for loop large range', () => {
    expect(audio('sum = 0; for (i in 1..10) sum = sum + 1; sum |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('while loop with assignment in body', () => {
    expect(audio('x = 0; i = 0; while (i < 3) { i = i + 1; x = i }; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('for loop with compound assignment', () => {
    expect(audio('x = 0; for (i in 1..5) x += i; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('while loop with compound assignment', () => {
    expect(audio('x = 1; i = 0; while (i < 4) { x *= 2; i += 1 }; x |> out($)')).toMatchAudio([[16, 16, 16], [16, 16,
      16]])
  })

  it('while with break', () => {
    expect(audio('x = 0; i = 0; while (i < 10) { x = x + 1; i = i + 1; if (i == 3) break }; x |> out($)')).toMatchAudio(
      [[3, 3, 3], [3, 3, 3]],
    )
  })

  it('while with continue', () => {
    expect(audio('x = 0; i = 0; while (i < 5) { i = i + 1; if (i == 3) continue; x = x + 1 }; x |> out($)'))
      .toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('do-while with break', () => {
    expect(audio('x = 0; i = 0; do { x = x + 1; i = i + 1; if (i == 3) break } while (i < 10); x |> out($)'))
      .toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('do-while with continue', () => {
    expect(audio('x = 0; i = 0; do { i = i + 1; if (i == 3) continue; x = x + 1 } while (i < 5); x |> out($)'))
      .toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('for with break', () => {
    expect(audio('x = 0; for (i in 1..10) { x = x + 1; if (i == 3) break }; x |> out($)')).toMatchAudio([[3, 3, 3], [3,
      3, 3]])
  })

  it('for with continue', () => {
    expect(audio('x = 0; for (i in 1..5) { if (i == 3) continue; x = x + 1 }; x |> out($)')).toMatchAudio([[4, 4, 4], [
      4,
      4,
      4,
    ]])
  })

  it('nested loops with break', () => {
    expect(
      audio(
        'x = 0; i = 0; while (i < 3) { j = 0; while (j < 3) { x = x + 1; j = j + 1; if (j == 2) break }; i = i + 1 }; x |> out($)',
      ),
    ).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('nested loops with continue', () => {
    expect(
      audio(
        'x = 0; i = 0; while (i < 3) { j = 0; while (j < 4) { j = j + 1; if (j == 2) continue; x = x + 1 }; i = i + 1 }; x |> out($)',
      ),
    ).toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('labeled while with break', () => {
    expect(
      audio(
        'x = 0; outer: while (x < 10) { i = 0; while (i < 3) { x = x + 1; i = i + 1; if (x == 5) break outer } }; x |> out($)',
      ),
    ).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('labeled while with continue', () => {
    expect(
      audio('x = 0; i = 0; outer: while (i < 5) { i = i + 1; if (i == 3) continue outer; x = x + 1 }; x |> out($)'),
    ).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('for-of basic', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (v of arr) sum = sum + v; sum |> out($)')).toMatchAudio([[6, 6, 6], [6,
      6, 6]])
  })

  it('for-of with index', () => {
    expect(audio('arr = [10, 20, 30]; sum = 0; for (v, i of arr) sum = sum + i; sum |> out($)')).toMatchAudio([[3, 3,
      3], [3, 3, 3]])
  })

  it('for-of with index and length', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (v, i, len of arr) sum = sum + len; sum |> out($)')).toMatchAudio([[9,
      9, 9], [9, 9, 9]])
  })

  it('for-of with block', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (v of arr) { sum = sum + v * 2 }; sum |> out($)')).toMatchAudio([[12,
      12, 12], [12, 12, 12]])
  })

  it('for-of empty array', () => {
    expect(audio('arr = []; sum = 0; for (v of arr) sum = sum + v; sum |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('for-of single element', () => {
    expect(audio('arr = [5]; x = 0; for (v of arr) x = v; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('for-of with break', () => {
    expect(audio('arr = [1, 2, 3, 4, 5]; sum = 0; for (v of arr) { sum = sum + v; if (v == 3) break }; sum |> out($)'))
      .toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('for-of with continue', () => {
    expect(
      audio('arr = [1, 2, 3, 4, 5]; sum = 0; for (v of arr) { if (v == 3) continue; sum = sum + v }; sum |> out($)'),
    )
      .toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('for-of nested', () => {
    expect(
      audio(
        'arr1 = [1, 2]; arr2 = [10, 20]; sum = 0; for (a of arr1) for (b of arr2) sum = sum + a * b; sum |> out($)',
      ),
    )
      .toMatchAudio([[90, 90, 90], [90, 90, 90]])
  })

  it('for-of with arithmetic', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (v of arr) sum = sum + v * 2; sum |> out($)'))
      .toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('for-of using index', () => {
    expect(audio('arr = [10, 20, 30]; sum = 0; for (v, i of arr) sum = sum + v + i; sum |> out($)')).toMatchAudio([[63,
      63, 63], [63, 63, 63]])
  })

  it('for-of modifying external variable', () => {
    expect(audio('arr = [1, 2, 3]; x = 0; for (v of arr) x = v; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('for-of with ternary', () => {
    expect(audio('arr = [1, 2, 3, 4]; sum = 0; for (v of arr) sum = sum + (v % 2 == 0 ? v : 0); sum |> out($)'))
      .toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('for-of with arithmetic', () => {
    expect(audio('arr = [1, 2, 3]; sum = 0; for (v of arr) sum = sum + v * v; sum |> out($)')).toMatchAudio([[14, 14,
      14], [14, 14, 14]])
  })

  it('for-of with break and continue', () => {
    expect(
      audio(
        'arr = [1, 2, 3, 4, 5]; sum = 0; for (v of arr) { if (v == 2) continue; if (v == 4) break; sum = sum + v }; sum |> out($)',
      ),
    ).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('labeled for-of with break', () => {
    expect(
      audio(
        'arr1 = [1, 2, 3]; arr2 = [10, 20]; sum = 0; outer: for (a of arr1) for (b of arr2) { sum = sum + 1; if (sum == 3) break outer }; sum |> out($)',
      ),
    ).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })
})

describe('functions', () => {
  it('simple function', () => {
    expect(audio('double = x -> x * 2; out(double(5))')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function definition operator => desugars to x->x|>body (identity)', () => {
    expect(audio('identity => $; out(identity(7))')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('function definition operator => desugars to x->x|>body (double)', () => {
    expect(audio('double => $ + $; out(double(5))')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  describe('pipe and arrow precedence', () => {
    it('=> body includes pipe (pipe binds inside arrow)', () => {
      const src = 'fm=>sine($)*ad(trig:every(1/8)) |> lp($,cutoff:1000,q:1)'
      const { program, errors } = parseTokens(src, tokenize(src).tokens)
      expect(errors).toEqual([])
      expect(program).not.toBeNull()
      const stmt = program!.body[0]
      expect(stmt.type).toBe('expr')
      const expr = (stmt as Extract<typeof stmt, { type: 'expr' }>).expr
      expect(expr.type).toBe('assign')
      expect((expr as Extract<typeof expr, { type: 'assign' }>).op).toBe('=>')
      const body = (expr as Extract<typeof expr, { type: 'assign' }>).right
      expect(body.type).toBe('binary')
      expect((body as Extract<typeof body, { type: 'binary' }>).op).toBe('|>')
    })

    it('-> body includes pipe (pipe binds inside arrow)', () => {
      const src = 'fm -> sine($)*ad(trig:every(1/8)) |> lp($,cutoff:1000,q:1)'
      const { program, errors } = parseTokens(src, tokenize(src).tokens)
      expect(errors).toEqual([])
      expect(program).not.toBeNull()
      const stmt = program!.body[0]
      expect(stmt.type).toBe('expr')
      const expr = (stmt as Extract<typeof stmt, { type: 'expr' }>).expr
      expect(expr.type).toBe('fn')
      const body = (expr as Extract<typeof expr, { type: 'fn' }>).body
      expect(body.type).toBe('binary')
      expect((body as Extract<typeof body, { type: 'binary' }>).op).toBe('|>')
    })

    it('=> with pipe runs as single function (sine then out)', () => {
      const withPipeInside = audio('f = hz=>sine($) |> out($); f(440)', { ticks: 1 })
      const explicit = audio('f = hz=>(sine($) |> out($)); f(440)', { ticks: 1 })
      expect(withPipeInside).toMatchAudio(explicit)
    })

    it('-> with pipe runs as single function (sine then out)', () => {
      const withPipeInside = audio('f = hz -> sine(hz) |> out($); f(440)', { ticks: 1 })
      const explicit = audio('f = hz -> (sine(hz) |> out($)); f(440)', { ticks: 1 })
      expect(withPipeInside).toMatchAudio(explicit)
    })
  })

  it('function with multiple params', () => {
    expect(audio('add = (a, b) -> a + b; out(add(3, 4))')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('local shadowing with :=', () => {
    expect(audio('x = 1; f = () -> { x := 10; x }; out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function modifying global', () => {
    expect(audio('x = 5; f = () -> { x = x + 1; x }; out(f())')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('nested function calls', () => {
    expect(audio('add = (a, b) -> a + b; mul = (x, y) -> x * y; out(mul(add(2, 3), 4))')).toMatchAudio([[20, 20, 20], [
      20,
      20,
      20,
    ]])
  })

  it('function with system variable', () => {
    expect(audio('f = () -> samplesPerBeat; x = f(); out(x)')).toMatchAudio([[24000, 24000, 24000], [24000, 24000,
      24000]])
  })

  it('closure capturing outer variable', () => {
    expect(audio('x = 7; f = () -> x; out(f())')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('function with default implicit return', () => {
    expect(audio('f = () -> { x := 3; x + 5 }; out(f())')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('function with compound assignment', () => {
    expect(audio('x = 10; f = () -> { x += 5; x }; out(f())')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('recursive local scopes', () => {
    expect(audio('x = 1; f = () -> { x := 2; { x := 3; x } }; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('function using t system variable', () => {
    expect(audio('f = () -> t * 100; out(f())')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('function with audio generator', () => {
    expect(audio('f = hz -> sine(hz); out(f(440))')).toMatchAudio([[0.0000, 0.0576, 0.1149], [0.0000, 0.0576, 0.1149]])
  })

  it('closure with outer variable modification', () => {
    expect(audio('x = 10; f = () -> { x = x * 2; x }; y = f(); out(y)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('multiple function calls preserve state', () => {
    expect(
      audio(
        'counter = 0; increment = () -> { counter = counter + 1; counter }; a = increment(); b = increment(); out(b)',
      ),
    )
      .toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('function returning function result', () => {
    expect(audio('add = (a, b) -> a + b; wrapper = (x, y) -> add(x, y); out(wrapper(5, 7))')).toMatchAudio([[12, 12,
      12], [12, 12, 12]])
  })

  it('shadowing in nested scopes', () => {
    expect(audio('x = 1; f = () -> { x := 5; g = () -> { x := 10; x }; g() }; out(f())')).toMatchAudio(
      [[10, 10, 10], [10, 10, 10]],
    )
  })

  it('function parameter without default', () => {
    expect(audio('f = x -> x; out(f(7))')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('function with single default parameter', () => {
    expect(audio('f = (x = 5) -> x * 2; out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function with default parameter overridden', () => {
    expect(audio('f = (x = 5) -> x * 2; out(f(7))')).toMatchAudio([[14, 14, 14], [14, 14, 14]])
  })

  it('function with multiple default parameters', () => {
    expect(audio('f = (a = 3, b = 4) -> a + b; out(f())')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('function with partial default parameters', () => {
    expect(audio('f = (a, b = 10) -> a + b; out(f(5))')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('function with mixed defaults and provided args', () => {
    expect(audio('f = (a = 1, b = 2, c = 3) -> a + b + c; out(f(10, 20))')).toMatchAudio([[33, 33, 33], [33, 33, 33]])
  })

  it('function with expression as default', () => {
    expect(audio('x = 100; f = (a = x / 10) -> a * 2; out(f())')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('function with arithmetic expression default', () => {
    expect(audio('f = (a = 2 + 3) -> a * 4; out(f())')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('function with array as default parameter', () => {
    expect(audio('f = (arr = [1, 2, 3]) -> arr[0] + arr[1]; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('function with array default overridden', () => {
    expect(audio('f = (arr = [1, 2, 3]) -> arr[0] + arr[1]; out(f([10, 20]))')).toMatchAudio([[30, 30, 30], [30, 30,
      30]])
  })

  it('function with array default using array methods', () => {
    expect(audio('f = (arr = [2, 4, 6]) -> arr.length; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('function with array default and scalar param', () => {
    expect(audio('f = (x, arr = [1, 2]) -> x + arr[0]; out(f(10))')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('function with multiple array defaults', () => {
    expect(audio('f = (a = [1, 2], b = [3, 4]) -> a[0] + b[0]; out(f())')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('function default referencing another function', () => {
    expect(audio('g = x -> x * 2; f = (fn = g) -> fn(5); out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function default with function call result', () => {
    expect(audio('g = () -> 7; f = (x = g()) -> x + 3; out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function default with nested function', () => {
    expect(audio('f = (fn = (x -> x + 1)) -> fn(5); out(f())')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('function with function parameter overridden', () => {
    expect(audio('g = x -> x * 2; h = x -> x * 3; f = (fn = g) -> fn(5); out(f(h))')).toMatchAudio([[15, 15, 15], [15,
      15, 15]])
  })

  it('function with audio default parameter', () => {
    const length = 128
    expect(
      audio('f = (x = every(1/1024)) -> x; out(f())'),
    ).toMatchAudio(
      audio('out(every(1/1024))'),
      length,
    )
  })

  it('record accepts function reference as callback', async () => {
    const code = `kick = () -> sine(440); sample = record(0.1, kick)`
    const parseResult = parse(code)
    const compileResult = compile(parseResult.program!, parseResult.preludeLines)

    expect(compileResult.errors).toHaveLength(0)
    const recordRegs = compileResult.sampleRegistrations.filter(r => r.type === 'record')
    expect(recordRegs.length).toBeGreaterThanOrEqual(1)
    const userReg = recordRegs.find(r => r.recordSeconds === 0.1)
    expect(userReg).toBeDefined()
    expect(compileResult.recordCallbacks?.size).toBeGreaterThanOrEqual(1)
    const callbackId = userReg!.recordCallbackId
    expect(callbackId).toBeDefined()
    expect(compileResult.recordCallbacks?.get(callbackId!)).toBeDefined()
  })

  it('function default with closure variable', () => {
    expect(audio('x = 100; f = (a = x) -> a / 2; out(f())')).toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('function with array from outer scope as default', () => {
    expect(audio('arr = [5, 10, 15]; f = (a = arr) -> a[1]; out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function with mixed array and scalar defaults', () => {
    expect(audio('f = (x = 5, arr = [1, 2], y = 10) -> x + arr[0] + y; out(f())')).toMatchAudio([[16, 16, 16], [16, 16,
      16]])
  })

  it('function with array default and partial args', () => {
    expect(audio('f = (x, arr = [1, 2], y = 10) -> x + arr[0] + y; out(f(100))')).toMatchAudio([[111, 111, 111], [111,
      111, 111]])
  })

  it('function with array default overridden and scalar default used', () => {
    expect(audio('f = (arr = [1, 2], y = 10) -> arr[0] + y; out(f([5, 6]))')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('function returning function with defaults', () => {
    expect(audio('f = () -> (x = 5) -> x * 2; g = f(); out(g())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function with default using array.avg', () => {
    expect(audio('arr = [2, 4, 6]; f = (x = arr.avg()) -> x * 2; out(f())')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('nested function calls with defaults', () => {
    expect(audio('f = (x = 5) -> x + 1; g = (y = f()) -> y * 2; out(g())')).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('function with all defaults provided', () => {
    expect(audio('f = (a = 1, b = 2, c = 3) -> a + b + c; out(f(10, 20, 30))')).toMatchAudio([[60, 60, 60], [60, 60,
      60]])
  })

  it('named parameter exact match', () => {
    expect(audio('f = (freq, offset) -> freq + offset; out(f(offset: 10, freq: 20))')).toMatchAudio([[30, 30, 30], [30,
      30, 30]])
  })

  it('named parameter prefix match', () => {
    expect(audio('f = (frequency, offset) -> frequency + offset; out(f(off: 10, fr: 20))')).toMatchAudio([[30, 30, 30],
      [30, 30, 30]])
  })

  it('mixed positional and named parameters', () => {
    expect(audio('f = (a, b, c) -> a + b + c; out(f(1, c: 3, b: 2))')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('named parameters with defaults', () => {
    expect(audio('f = (freq = 100, offset = 5) -> freq + offset; out(f(off: 10))')).toMatchAudio([[110, 110, 110], [110,
      110, 110]])
  })

  it('named parameters out of order', () => {
    expect(audio('f = (a, b, c) -> a * 100 + b * 10 + c; out(f(c: 3, a: 1, b: 2))')).toMatchAudio([[123, 123, 123], [
      123,
      123,
      123,
    ]])
  })

  it('named parameter with array', () => {
    expect(audio('f = (arr = [1, 2], multiplier = 1) -> arr[0] * multiplier; out(f(mult: 3, arr: [10, 20]))'))
      .toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('named parameter single letter prefix', () => {
    expect(audio('f = (frequency, amplitude) -> frequency + amplitude; out(f(f: 100, a: 5))')).toMatchAudio([[105, 105,
      105], [105, 105, 105]])
  })

  it('mixed positional and named with defaults', () => {
    expect(audio('f = (a, b = 20, c = 30) -> a + b + c; out(f(1, c: 300))')).toMatchAudio([[321, 321, 321], [321, 321,
      321]])
  })

  it('all named parameters with defaults', () => {
    expect(audio('f = (x = 1, y = 2, z = 3) -> x + y + z; out(f(z: 30, x: 10))')).toMatchAudio([[42, 42, 42], [42, 42,
      42]])
  })

  it('named parameters skip positional slots', () => {
    expect(audio('f = (a, b, c, d) -> a + b + c + d; out(f(1, d: 4, c: 3, b: 2))')).toMatchAudio([[10, 10, 10], [10, 10,
      10]])
  })

  it('user example: foo with freq and offset', () => {
    expect(audio('foo = (freq, offset) -> freq + offset; out(foo(off: 123, fr: 456))')).toMatchAudio([[579, 579, 579], [
      579,
      579,
      579,
    ]])
  })

  it('named parameters shorthand', async () => {
    expect(await audioAsync(`
      f=(trig=1)->{
        sample=record(1,()->sine(330))
        sampler(sample,trig)
      }

      f(1) |> out($)
    `)).toMatchAudio(audio('out(sine(330))'))
  })

  it('user function explicit named arguments', () => {
    const withNamed = audio('tube(sine(440), drive: 2, bias: .1) |> out($)', { ticks: 2 })
    const positional = audio('tube(sine(440), 2, .1) |> out($)', { ticks: 2 })
    expect(withNamed).toMatchAudio(positional)
  })

  it('user function named shorthand', () => {
    expect(audio('a = 1; b = 2; f = (a, b) -> a + b; out(f(a, b))')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array destructuring basic', () => {
    expect(audio('f = ([a, b]) -> a + b; out(f([10, 20]))')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array destructuring with default', () => {
    expect(audio('f = ([a, b] = [1, 2]) -> a + b; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array destructuring with provided array', () => {
    expect(audio('f = ([a, b] = [1, 2]) -> a + b; out(f([10, 20]))')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array destructuring three elements', () => {
    expect(audio('f = ([x, y, z]) -> x + y + z; out(f([1, 2, 3]))')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('array destructuring with other params', () => {
    expect(audio('f = (a, [b, c]) -> a + b + c; out(f(10, [20, 30]))')).toMatchAudio([[60, 60, 60], [60, 60, 60]])
  })

  it('array destructuring mixed with defaults', () => {
    expect(audio('f = (a = 1, [b, c] = [2, 3]) -> a + b + c; out(f())')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('array destructuring partial override', () => {
    expect(audio('f = (a = 1, [b, c] = [2, 3]) -> a + b + c; out(f(10))')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array destructuring user example', () => {
    expect(audio('foo = ([L, R]) -> L + R; out(foo([100, 200]))')).toMatchAudio([[300, 300, 300], [300, 300, 300]])
  })

  it('array destructuring with named parameter', () => {
    expect(audio('f = (mult, [a, b]) -> (a + b) * mult; out(f(m: 10, [2, 3]))')).toMatchAudio([[50, 50, 50], [50, 50,
      50]])
  })

  it('named with destructuring and defaults', () => {
    expect(audio('f = (mult = 1, [a, b] = [2, 3]) -> (a + b) * mult; out(f(m: 10))')).toMatchAudio([[50, 50, 50], [50,
      50, 50]])
  })

  it('named with destructuring override both', () => {
    expect(audio('f = (mult = 1, [a, b] = [2, 3]) -> (a + b) * mult; out(f(m: 10, [20, 30]))')).toMatchAudio([[500, 500,
      500], [500, 500, 500]])
  })

  it('named with destructuring positional array', () => {
    expect(audio('f = ([a, b] = [2, 3], mult = 1) -> (a + b) * mult; out(f([20, 30]))')).toMatchAudio([[50, 50, 50], [
      50,
      50,
      50,
    ]])
  })

  it('complex named destructuring with multiple params', () => {
    expect(audio('f = (x = 1, [a, b] = [10, 20], y = 2) -> x + a + b + y; out(f(y: 100, x: 5))')).toMatchAudio([[135,
      135, 135], [135, 135, 135]])
  })

  it('function with array destructuring basic', () => {
    expect(audio('sum = ([a, b, c]) -> a + b + c; out(sum([10, 11, 12]))')).toMatchAudio([[33, 33, 33], [33, 33, 33]])
  })

  it('array destructuring with arithmetic operations', () => {
    expect(audio('calc = ([a, b, c]) -> (a + b) * c; out(calc([2, 3, 4]))')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('function with multiple destructured arrays', () => {
    expect(audio('combine = ([a, b], [c, d]) -> a + b + c + d; out(combine([1, 2], [3, 4]))')).toMatchAudio([[10, 10,
      10], [10, 10, 10]])
  })

  it('function with mixed regular and destructured params', () => {
    expect(audio('calc = (mult, [a, b], offset) -> (a + b) * mult + offset; out(calc(2, [5, 10], 3))')).toMatchAudio([[
      33,
      33,
      33,
    ], [33, 33, 33]])
  })

  it('function with destructuring and named parameters', () => {
    expect(audio('calc = (mult, [a, b]) -> (a + b) * mult; out(calc(m: 3, [10, 20]))')).toMatchAudio([[90, 90, 90], [90,
      90, 90]])
  })

  it('function with all features combined', () => {
    expect(audio('calc = (mult = 2, [a, b] = [5, 10], offset = 0) -> (a + b) * mult + offset; out(calc(m: 3, off: 5))'))
      .toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('function returning array to variable', () => {
    expect(audio('f = () -> [1, 2, 3]; arr = f(); out(arr[0] + arr[1] + arr[2])')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('function returning array passed to destructuring', () => {
    expect(audio('makeArr = (x) -> [x, x + 1, x + 2]; sum = ([a, b, c]) -> a + b + c; out(sum(makeArr(10)))'))
      .toMatchAudio([[33, 33, 33], [33, 33, 33]])
  })

  it('function returning array with swap', () => {
    expect(audio('swap = ([a, b]) -> [b, a]; process = ([x, y]) -> x - y; out(process(swap([10, 20])))')).toMatchAudio([
      [10, 10, 10],
      [10, 10, 10],
    ])
  })

  it('function returning array with named params', () => {
    expect(audio('combine = (x, y) -> [x * 2, y * 3]; sum = ([a, b]) -> a + b; out(sum(combine(y: 5, x: 10)))'))
      .toMatchAudio([[35, 35, 35], [35, 35, 35]])
  })

  it('function returning array with defaults', () => {
    expect(audio('makePair = (a = 10, b = 20) -> [a, b]; sum = ([x, y]) -> x + y; out(sum(makePair()))')).toMatchAudio([
      [30, 30, 30],
      [30, 30, 30],
    ])
  })

  it('chained array functions', () => {
    expect(audio('makeArr = (x) -> [x, x * 2]; process = ([a, b]) -> a + b; out(process(makeArr(10)))')).toMatchAudio([[
      30,
      30,
      30,
    ], [30, 30, 30]])
  })

  it('function with destructuring returning array', () => {
    expect(
      audio('transform = ([a, b] = [1, 2], c = 3) -> [a + c, b + c]; sum = ([x, y]) -> x + y; out(sum(transform()))'),
    ).toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('nested function returning array', () => {
    expect(
      audio(
        'outer = () -> { inner = (x) -> [x, x * 2]; inner(5) }; process = ([a, b]) -> a + b; out(process(outer()))',
      ),
    ).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('function with named destructuring returning array', () => {
    expect(
      audio(
        'f = (mult = 2, [a, b] = [5, 10]) -> [a * mult, b * mult]; sum = ([x, y]) -> x + y; out(sum(f(m: 3)))',
      ),
    ).toMatchAudio([[45, 45, 45], [45, 45, 45]])
  })

  it('multiple array functions composed', () => {
    expect(
      audio(
        'double = ([a, b]) -> [a * 2, b * 2]; add = ([x, y]) -> [x + 10, y + 10]; sum = ([p, q]) -> p + q; out(sum(add(double([5, 10]))))',
      ),
    ).toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('function returning array indexed directly', () => {
    expect(audio('f = (a, b) -> [a + b, a - b, a * b]; out(f(10, 5)[2])')).toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('function returning array with length', () => {
    expect(audio('f = (a, b, c) -> [a, b, c]; arr = f(10, 20, 30); out(arr.length)')).toMatchAudio([[3, 3, 3], [3, 3,
      3]])
  })

  it('function with mixed operations', () => {
    expect(audio('base = 100; f = (x, factor) -> { result := x * factor; result + base }; out(f(2, 3))'))
      .toMatchAudio([[106, 106, 106], [106, 106, 106]])
  })

  it('function with pipe operator', () => {
    expect(audio('double = x -> x * 2; 5 |> double($) |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function accessing multiple system vars', () => {
    expect(audio('f = () -> t + co; out(f())')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
  })

  it('function with nested blocks', () => {
    expect(audio('f = () -> { a := 5; { b := 3; a + b } }; out(f())')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('multiple functions sharing globals', () => {
    expect(
      audio('x = 0; increment = () -> { x = x + 1; x }; double = () -> { x = x * 2; x }; increment(); out(double())'),
    )
      .toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('nested function accessing outer function local', () => {
    expect(audio('f = () -> { x := 5; g = () -> x + 3; g() }; out(f())')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('nested function with parameters', () => {
    expect(audio('f = (a) -> { g = (b) -> a + b; g(10) }; out(f(5))')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('deeply nested functions', () => {
    expect(audio('f = () -> { g = () -> { h = () -> 42; h() }; g() }; out(f())')).toMatchAudio([[42, 42, 42], [42, 42,
      42]])
  })

  it('closure modifying outer variable', () => {
    expect(audio('f = () -> { x := 10; g = () -> { x = x * 2; x }; g() }; out(f())')).toMatchAudio([[20, 20, 20], [20,
      20, 20]])
  })

  it('multiple closures sharing variable', () => {
    // Both closures share the same x variable (reference semantics)
    expect(
      audio(
        'f = () -> { x := 5; increment = () -> { x = x + 1; x }; double = () -> { x = x * 2; x }; increment(); double() }; out(f())',
      ),
    ).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('closure with multiple captured variables', () => {
    expect(audio('f = (a, b) -> { g = (c) -> a + b + c; g(3) }; out(f(10, 20))')).toMatchAudio([[33, 33, 33], [33, 33,
      33]])
  })

  it('closure returning closure', () => {
    expect(audio('makeAdder = (x) -> (y) -> x + y; add5 = makeAdder(5); out(add5(10))')).toMatchAudio([[15, 15, 15], [
      15,
      15,
      15,
    ]])
  })

  it('multiple independent closure instances', () => {
    expect(
      audio('makeAdder = (x) -> (y) -> x + y; add5 = makeAdder(5); add10 = makeAdder(10); out(add5(3) + add10(3))'),
    ).toMatchAudio([[21, 21, 21], [21, 21, 21]])
  })

  it('closure modifying captured variable persists', () => {
    expect(
      audio(
        'makeCounter = () -> { count := 0; () -> { count = count + 1; count } }; counter = makeCounter(); a = counter(); b = counter(); out(b)',
      ),
    ).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  describe('array destructuring parameters', () => {
    it('basic array destructuring', () => {
      expect(audio('f = ([a, b]) -> a + b; out(f([3, 5]))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
    })

    it('destructuring with two elements', () => {
      expect(audio('f = ([x, y]) -> x * y; out(f([4, 7]))')).toMatchAudio([[28, 28, 28], [28, 28, 28]])
    })

    it('destructuring with three elements', () => {
      expect(audio('f = ([a, b, c]) -> a + b + c; out(f([1, 2, 3]))')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
    })

    it('destructuring accesses first element', () => {
      expect(audio('f = ([first, second]) -> first; out(f([10, 20]))')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
    })

    it('destructuring accesses second element', () => {
      expect(audio('f = ([first, second]) -> second; out(f([10, 20]))')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
    })

    it('destructuring with signals', () => {
      expect(audio('f = ([L, R]) -> L + R; out(f([sine(440), sine(880)]))')).toMatchAudio(
        audio('out(sine(440) + sine(880))'),
      )
    })

    it('destructuring mixed scalars and signals', () => {
      expect(audio('f = ([a, b]) -> a + b; out(f([5, sine(440)]))')).toMatchAudio(audio('out(5 + sine(440))'))
    })

    it('multiple destructured parameters', () => {
      expect(audio('f = ([a, b], [c, d]) -> a + b + c + d; out(f([1, 2], [3, 4]))')).toMatchAudio([
        [10, 10, 10],
        [10, 10, 10],
      ])
    })

    it('destructuring with regular parameter', () => {
      expect(audio('f = (x, [a, b]) -> x + a + b; out(f(10, [3, 5]))')).toMatchAudio([[18, 18, 18], [18, 18, 18]])
    })

    it('regular parameter with destructuring', () => {
      expect(audio('f = ([a, b], x) -> a + b + x; out(f([3, 5], 10))')).toMatchAudio([[18, 18, 18], [18, 18, 18]])
    })

    it('destructuring in closure', () => {
      expect(audio('f = ([a, b]) -> { g = (x) -> a + b + x; g(10) }; out(f([3, 5]))')).toMatchAudio([
        [18, 18, 18],
        [18, 18, 18],
      ])
    })

    it('destructuring with default values', () => {
      expect(audio('f = ([a, b] = [1, 2]) -> a + b; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
    })

    it('destructuring with provided array overrides default', () => {
      expect(audio('f = ([a, b] = [1, 2]) -> a + b; out(f([10, 20]))')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
    })

    it('destructuring empty array uses undefined', () => {
      expect(audio('f = ([a, b]) -> isundefined(a) + isundefined(b); out(f([]))')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
    })

    it('destructuring with fewer elements', () => {
      expect(audio('f = ([a, b, c]) -> a + b; out(f([1, 2]))')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
    })

    it('destructuring in arrow function shorthand', () => {
      expect(audio('f = ([a, b]) -> a - b; out(f([10, 3]))')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
    })

    it('destructuring with array of arrays', () => {
      expect(audio('f = ([arr1, arr2]) -> arr1[0] + arr1[1] + arr2[0] + arr2[1]; out(f([[1, 2], [3, 4]]))'))
        .toMatchAudio([
          [10, 10, 10],
          [10, 10, 10],
        ])
    })

    it('destructuring for stereo processing', () => {
      expect(audio('process = ([L, R]) -> [L * 2, R * 3]; out(process([1, 2]))')).toMatchAudio([[2, 2, 2], [6, 6, 6]])
    })

    it('destructuring with computation', () => {
      expect(audio('swap = ([a, b]) -> [b, a]; out(swap([3, 7]))')).toMatchAudio([[7, 7, 7], [3, 3, 3]])
    })
  })

  describe('named array destructuring parameters', () => {
    it('basic named destructuring', () => {
      expect(audio('f = (stereo:[L,R]) -> L + R; out(f([3, 5]))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
    })

    it('named destructuring with named call', () => {
      expect(audio('f = (stereo:[L,R]) -> L + R; out(f(stereo:[3, 5]))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
    })

    it('named destructuring for stereo processing', () => {
      expect(audio('process = (input:[L,R]) -> [L * 2, R * 3]; out(process([1, 2]))')).toMatchAudio([
        [2, 2, 2],
        [6, 6, 6],
      ])
    })

    it('named destructuring with named call for stereo', () => {
      expect(audio('process = (input:[L,R]) -> [L * 2, R * 3]; out(process(input:[1, 2]))')).toMatchAudio([
        [2, 2, 2],
        [6, 6, 6],
      ])
    })

    it('named destructuring with signals', () => {
      expect(audio('f = (channels:[L,R]) -> L + R; out(f([sine(440), sine(880)]))')).toMatchAudio(
        audio('out(sine(440) + sine(880))'),
      )
    })

    it('named destructuring with three elements', () => {
      expect(audio('f = (rgb:[r,g,b]) -> r + g + b; out(f([1, 2, 3]))')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
    })

    it('named destructuring with default value', () => {
      expect(audio('f = (stereo:[L,R] = [1, 2]) -> L + R; out(f())')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
    })

    it('named destructuring overriding default', () => {
      expect(audio('f = (stereo:[L,R] = [1, 2]) -> L + R; out(f([10, 20]))')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
    })

    it('named destructuring with named call overriding default', () => {
      expect(audio('f = (stereo:[L,R] = [1, 2]) -> L + R; out(f(stereo:[10, 20]))')).toMatchAudio([
        [30, 30, 30],
        [30, 30, 30],
      ])
    })

    it('multiple named destructuring parameters', () => {
      expect(audio('f = (a:[x,y], b:[z,w]) -> x + y + z + w; out(f([1, 2], [3, 4]))')).toMatchAudio([
        [10, 10, 10],
        [10, 10, 10],
      ])
    })

    it('multiple named destructuring with named calls', () => {
      expect(audio('f = (a:[x,y], b:[z,w]) -> x + y + z + w; out(f(a:[1, 2], b:[3, 4]))')).toMatchAudio([
        [10, 10, 10],
        [10, 10, 10],
      ])
    })

    it('mixed regular and named destructuring parameters', () => {
      expect(audio('f = (scale, stereo:[L,R]) -> [L * scale, R * scale]; out(f(2, [3, 4]))')).toMatchAudio([
        [6, 6, 6],
        [8, 8, 8],
      ])
    })

    it('mixed with named call', () => {
      expect(audio('f = (scale, stereo:[L,R]) -> [L * scale, R * scale]; out(f(2, stereo:[3, 4]))')).toMatchAudio([
        [6, 6, 6],
        [8, 8, 8],
      ])
    })

    it('named destructuring in closure', () => {
      expect(audio('f = (stereo:[L,R]) -> { g = (x) -> L + R + x; g(10) }; out(f([3, 5]))')).toMatchAudio([
        [18, 18, 18],
        [18, 18, 18],
      ])
    })

    it('descriptive parameter name for audio processing', () => {
      expect(
        audio('pan = (signal:[left,right], amount) -> [left * (1 - amount), right * amount]; out(pan([10, 20], 0.5))'),
      ).toMatchAudio([
        [5, 5, 5],
        [10, 10, 10],
      ])
    })

    it('swap with named parameter', () => {
      expect(audio('swap = (pair:[a,b]) -> [b, a]; out(swap([3, 7]))')).toMatchAudio([[7, 7, 7], [3, 3, 3]])
    })

    it('named destructuring with computation', () => {
      expect(audio('diff = (values:[a,b]) -> a - b; out(diff([10, 3]))')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
    })
  })

  describe('array destructuring assignments', () => {
    it('basic destructuring assignment', () => {
      expect(audio('[a, b] = [3, 5]; out(a + b)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
    })

    it('destructuring assignment with two elements', () => {
      expect(audio('[x, y] = [10, 20]; out([x, y])')).toMatchAudio([[10, 10, 10], [20, 20, 20]])
    })

    it('destructuring assignment with three elements', () => {
      expect(audio('[r, g, b] = [1, 2, 3]; out(r + g + b)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
    })

    it('destructuring assignment with signals', () => {
      expect(audio('[L, R] = [sine(440), sine(880)]; out(L + R)')).toMatchAudio(
        audio('out(sine(440) + sine(880))'),
      )
    })

    it('destructuring assignment with shadow operator', () => {
      expect(audio('[a, b] := [7, 11]; out(a + b)')).toMatchAudio([[18, 18, 18], [18, 18, 18]])
    })

    it('destructuring assignment in function', () => {
      expect(audio('f = () -> { [x, y] = [2, 3]; x + y }; out(f())')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
    })

    it('destructuring assignment with variable', () => {
      expect(audio('arr = [100, 200]; [a, b] = arr; out(a + b)')).toMatchAudio([[300, 300, 300], [300, 300, 300]])
    })

    it('destructuring assignment with function call', () => {
      expect(audio('getPair = () -> [4, 6]; [x, y] = getPair(); out(x * y)')).toMatchAudio([
        [24, 24, 24],
        [24, 24, 24],
      ])
    })
  })
})

describe('arrays', () => {
  it('array literal with scalars', () => {
    expect(audio('x = [1, 2, 3]; out(5)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array length property', () => {
    expect(audio('x = [1, 2, 3]; x.length |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('empty array length', () => {
    expect(audio('x = []; x.length |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('single element array length', () => {
    expect(audio('x = [42]; x.length |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array index access', () => {
    expect(audio('x = [10, 20, 30]; x[1] |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array index access first element', () => {
    expect(audio('x = [5, 10, 15]; x[0] |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array index access last element', () => {
    expect(audio('x = [7, 14, 21]; x[2] |> out($)')).toMatchAudio([[21, 21, 21], [21, 21, 21]])
  })

  it('array index with negative wrapping', () => {
    expect(audio('x = [10, 20, 30]; x[-1] |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array index with negative wrapping -2', () => {
    expect(audio('x = [10, 20, 30]; x[-2] |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array index modulo wrapping', () => {
    expect(audio('x = [1, 2, 3]; x[5] |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array push empty', () => {
    expect(audio('x = []; x.push(1); x.length |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array push with elements', () => {
    expect(audio('x = [1, 2, 3]; x.push(4); x.length |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('array push arbitrary values', () => {
    expect(audio('x = []; x.push(sine(440)); x.push(2); x.push(1?2:3); x.length |> out($)')).toMatchAudio([[3, 3, 3], [
      3,
      3,
      3,
    ]])
  })

  it('array avg method with scalars', () => {
    expect(audio('x = [10, 20, 30]; x.avg() |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array avg method single element', () => {
    expect(audio('x = [42]; x.avg() |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('array avg method two elements', () => {
    expect(audio('x = [10, 30]; x.avg() |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array literal inline access', () => {
    expect(audio('[5, 10, 15][1] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array literal inline length', () => {
    expect(audio('[1, 2, 3, 4].length |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('array literal inline avg', () => {
    expect(audio('[2, 4, 6].avg() |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('array in variable reassignment', () => {
    expect(audio('x = [1, 2]; x = [3, 4, 5]; x.length |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('multiple arrays', () => {
    expect(audio('a = [1, 2]; b = [3, 4, 5]; a.length + b.length |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array with arithmetic', () => {
    expect(audio('x = [10, 20, 30]; x[0] + x[2] |> out($)')).toMatchAudio([[40, 40, 40], [40, 40, 40]])
  })

  it('array avg in expression', () => {
    expect(audio('x = [10, 20, 30]; x.avg() * 2 |> out($)')).toMatchAudio([[40, 40, 40], [40, 40, 40]])
  })

  it('array in function', () => {
    expect(audio('f = () -> { x := [5, 10, 15]; x[1] }; out(f())')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array passed through variable', () => {
    expect(audio('x = [100, 200]; y = x; y[1] |> out($)')).toMatchAudio([[200, 200, 200], [200, 200, 200]])
  })

  it('nested array access', () => {
    expect(audio('x = [1, 2, 3]; i = 1; x[i] |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array with computed index', () => {
    expect(audio('x = [10, 20, 30, 40]; x[1 + 1] |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array with scalar variables', () => {
    expect(audio('a = 5; b = 10; c = 15; x = [a, b, c]; x[1] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array with mixed scalar variables and literals', () => {
    expect(audio('a = 100; b = 200; x = [a, 50, b]; x.avg() |> out($)')).toMatchAudio([[(100 + 50 + 200) / 3,
      (100 + 50 + 200) / 3, (100 + 50 + 200) / 3], [(100 + 50 + 200) / 3, (100 + 50 + 200) / 3, (100 + 50 + 200) / 3]])
  })

  it('array reassignment with variables', () => {
    expect(audio('a = 1; x = [a, 2, 3]; a = 10; x[0] |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('multiple arrays with shared variables', () => {
    expect(audio('v = 5; x = [v, 10]; y = [v, 20]; x[0] + y[1] |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array of audio values', () => {
    expect(audio('a = sine(440); b = sine(880); x = [a, b]; x.length |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array of audio avg', () => {
    expect(audio('a = sine(440); b = sine(880); x = [a, b]; x.avg() |> out($)')).toMatchAudio(
      audio('(sine(440) + sine(880)) / 2 |> out($)'),
    )
  })

  it('array with audio index access', () => {
    expect(audio('a = sine(440); b = sine(880); c = sine(1320); x = [a, b, c]; x[1] |> out($)')).toMatchAudio(
      audio('sine(880) |> out($)'),
    )
  })

  it('array with function results', () => {
    expect(audio('f = x -> x * 2; x = [f(5), f(10), f(15)]; x.avg() |> out($)')).toMatchAudio([[20, 20, 20], [20, 20,
      20]])
  })

  it('array length in arithmetic', () => {
    expect(audio('x = [1, 2, 3, 4, 5]; y = [10, 20]; x.length + y.length |> out($)')).toMatchAudio([[7, 7, 7], [7, 7,
      7]])
  })

  it('array element modification through variable', () => {
    expect(audio('x = [5, 10, 15]; i = 0; x[i] + x[i + 1] |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array with negative index and variables', () => {
    expect(audio('x = [100, 200, 300]; offset = -1; x[offset] |> out($)')).toMatchAudio([[300, 300, 300], [300, 300,
      300]])
  })

  it('nested array operations', () => {
    expect(audio('a = [1, 2, 3]; b = [4, 5, 6]; a[0] * b[0] + a[1] * b[1] |> out($)')).toMatchAudio([[14, 14, 14], [14,
      14, 14]])
  })

  it('array avg with single audio element', () => {
    expect(audio('x = [sine(440)]; x.avg() |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
  })

  it('array of audio with scalar index from variable', () => {
    expect(audio('idx = 2; waves = [sine(220), sine(440), sine(880)]; waves[idx] |> out($)')).toMatchAudio(
      audio('sine(880) |> out($)'),
    )
  })

  it('empty array length', () => {
    expect(audio('x = []; x.length |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('single element array', () => {
    expect(audio('x = [99]; x[0] |> out($)')).toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('array index zero', () => {
    expect(audio('x = [7, 8, 9]; x[0] |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('array last index', () => {
    expect(audio('x = [1, 2, 3, 4, 5]; x[4] |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array negative index -1', () => {
    expect(audio('x = [10, 20, 30, 40]; x[-1] |> out($)')).toMatchAudio([[40, 40, 40], [40, 40, 40]])
  })

  it('array negative index -3', () => {
    expect(audio('x = [5, 10, 15, 20]; x[-3] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array modulo wrapping positive large index', () => {
    expect(audio('x = [1, 2, 3]; x[10] |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array modulo wrapping negative large index', () => {
    expect(audio('x = [7, 8, 9]; x[-10] |> out($)')).toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('array length property multiple times', () => {
    expect(audio('x = [1, 2, 3]; x.length + x.length |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('array avg with two elements', () => {
    expect(audio('x = [50, 150]; x.avg() |> out($)')).toMatchAudio([[100, 100, 100], [100, 100, 100]])
  })

  it('array avg with many elements', () => {
    expect(audio('x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; x.avg() |> out($)')).toMatchAudio([[5.5, 5.5, 5.5], [5.5, 5.5,
      5.5]])
  })

  it('array with zero values', () => {
    expect(audio('x = [0, 0, 0]; x.avg() |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('array with negative values', () => {
    expect(audio('x = [-10, -20, -30]; x.avg() |> out($)')).toMatchAudio([[-20, -20, -20], [-20, -20, -20]])
  })

  it('array with mixed positive and negative', () => {
    expect(audio('x = [-10, 10, -20, 20]; x.avg() |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('array with decimal values', () => {
    expect(audio('x = [1.5, 2.5, 3.5]; x.avg() |> out($)')).toMatchAudio([[2.5, 2.5, 2.5], [2.5, 2.5, 2.5]])
  })

  it('array index with zero', () => {
    expect(audio('x = [100, 200, 300]; i = 0; x[i] |> out($)')).toMatchAudio([[100, 100, 100], [100, 100, 100]])
  })

  it('array index with negative variable', () => {
    expect(audio('x = [1, 2, 3, 4]; i = -2; x[i] |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array in nested arithmetic', () => {
    expect(audio('x = [2, 3, 4]; x[0] * x[1] * x[2] |> out($)')).toMatchAudio([[24, 24, 24], [24, 24, 24]])
  })

  it('array length in division', () => {
    expect(audio('x = [1, 2, 3, 4]; 100 / x.length |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array with all same values', () => {
    expect(audio('x = [7, 7, 7, 7]; x.avg() |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('array reassignment preserves independence', () => {
    expect(audio('x = [1, 2]; y = [3, 4]; x = y; x.length |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('multiple array accesses in expression', () => {
    expect(audio('x = [10, 20, 30]; x[0] + x[1] + x[2] |> out($)')).toMatchAudio([[60, 60, 60], [60, 60, 60]])
  })

  it('array avg compared to manual average', () => {
    expect(audio('x = [10, 20, 30]; x.avg() |> out($)')).toMatchAudio(
      audio('x = [10, 20, 30]; (x[0] + x[1] + x[2]) / 3 |> out($)'),
    )
  })

  it('array created in function scope', () => {
    expect(audio('f = () -> { x := [5, 10, 15]; x[2] }; f() |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array length in function scope', () => {
    expect(audio('f = () -> { x := [1, 2, 3, 4, 5]; x.length }; f() |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array avg in function scope', () => {
    expect(audio('f = () -> { x := [10, 20, 30]; x.avg() }; f() |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array with function parameter in scope', () => {
    expect(audio('f = n -> { x := [n, n * 2, n * 3]; x[1] }; f(10) |> out($)')).toMatchAudio([[20, 20, 20], [20, 20,
      20]])
  })

  it('array index with modulo on exact boundary', () => {
    expect(audio('x = [1, 2, 3]; x[3] |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array index with modulo on exact negative boundary', () => {
    expect(audio('x = [1, 2, 3]; x[-3] |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array with large values', () => {
    expect(audio('x = [1000, 2000, 3000]; x.avg() |> out($)')).toMatchAudio([[2000, 2000, 2000], [2000, 2000, 2000]])
  })

  it('array with small decimal values', () => {
    expect(audio('x = [0.1, 0.2, 0.3]; x.avg() |> out($)')).toMatchAudio([[0.2, 0.2, 0.2], [0.2, 0.2, 0.2]])
  })

  it('array length used as index', () => {
    expect(audio('x = [10, 20, 30, 40]; x[x.length - 1] |> out($)')).toMatchAudio([[40, 40, 40], [40, 40, 40]])
  })

  it('array with computed values', () => {
    expect(audio('a = 5; x = [a * 2, a * 3, a * 4]; x[1] |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array avg with computed values', () => {
    expect(audio('a = 10; x = [a, a * 2, a * 3]; x.avg() |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('nested array variable references', () => {
    expect(audio('a = [1, 2, 3]; b = [4, 5, 6]; c = [7, 8, 9]; a[0] + b[1] + c[2] |> out($)')).toMatchAudio([[15, 15,
      15], [15, 15, 15]])
  })

  it('array of audio with negative index', () => {
    expect(audio('waves = [sine(220), sine(440), sine(880)]; waves[-1] |> out($)')).toMatchAudio(
      audio('sine(880) |> out($)'),
    )
  })

  it('array of audio with modulo wrapping', () => {
    expect(audio('waves = [sine(220), sine(440)]; waves[5] |> out($)')).toMatchAudio(
      audio('sine(440) |> out($)'),
    )
  })

  it('multiple audio arrays', () => {
    expect(audio('a = [sine(220)]; b = [sine(440)]; a.length + b.length |> out($)')).toMatchAudio([[2, 2, 2], [2, 2,
      2]])
  })

  it('array of audio with length and avg', () => {
    expect(audio('waves = [sine(440), sine(880)]; waves.length |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array with expression as index', () => {
    expect(audio('x = [5, 10, 15, 20]; i = 1; x[i * 2] |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array length equals literal', () => {
    expect(audio('x = [1, 2, 3]; x.length == 3 |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array avg comparison', () => {
    expect(audio('x = [10, 20, 30]; x.avg() > 15 |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array element comparison', () => {
    expect(audio('x = [5, 10, 15]; x[1] >= 10 |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array with very large index wrapping', () => {
    expect(audio('x = [1, 2, 3]; x[100] |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array with very large negative index wrapping', () => {
    expect(audio('x = [1, 2, 3]; x[-100] |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array index at exact length boundary', () => {
    expect(audio('x = [10, 20, 30]; x[3] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array with floating point index truncation', () => {
    expect(audio('x = [5, 10, 15, 20]; x[2.7] |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array length with empty array', () => {
    expect(audio('x = []; y = [1, 2]; x.length + y.length |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('array avg with single negative element', () => {
    expect(audio('x = [-42]; x.avg() |> out($)')).toMatchAudio([[-42, -42, -42], [-42, -42, -42]])
  })

  it('array with multiple reassignments', () => {
    expect(audio('x = [1]; x = [1, 2]; x = [1, 2, 3]; x.length |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('array index with variable arithmetic', () => {
    expect(audio('x = [10, 20, 30, 40, 50]; i = 2; j = 1; x[i + j] |> out($)')).toMatchAudio([[40, 40, 40], [40, 40,
      40]])
  })

  it('array avg with alternating signs', () => {
    expect(audio('x = [10, -10, 20, -20]; x.avg() |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('array element used multiple times', () => {
    expect(audio('x = [3, 4, 5]; x[1] * x[1] |> out($)')).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('array length used in multiple operations', () => {
    expect(audio('x = [1, 2, 3]; x.length * x.length |> out($)')).toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('array avg used in multiple operations', () => {
    expect(audio('x = [10, 20]; x.avg() + x.avg() |> out($)')).toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array with index from another array', () => {
    expect(audio('indices = [0, 1, 2]; values = [10, 20, 30]; values[indices[1]] |> out($)')).toMatchAudio([[20, 20,
      20], [20, 20, 20]])
  })

  it('array of audio with multiple accesses', () => {
    expect(audio('waves = [sine(220), sine(440)]; waves[0] + waves[1] |> out($)')).toMatchAudio(
      audio('sine(220) + sine(440) |> out($)'),
    )
  })

  it('array element subtraction', () => {
    expect(audio('x = [100, 30]; x[0] - x[1] |> out($)')).toMatchAudio([[70, 70, 70], [70, 70, 70]])
  })

  it('array element multiplication', () => {
    expect(audio('x = [7, 8]; x[0] * x[1] |> out($)')).toMatchAudio([[56, 56, 56], [56, 56, 56]])
  })

  it('array element division', () => {
    expect(audio('x = [100, 4]; x[0] / x[1] |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array element power', () => {
    expect(audio('x = [2, 3]; x[0] ** x[1] |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('array element modulo', () => {
    expect(audio('x = [10, 3]; x[0] % x[1] |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('array times scalar element-wise', () => {
    expect(audio('x = [1, 2, 3] * 2; x[0] |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
    expect(audio('x = [1, 2, 3] * 2; x[1] |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
    expect(audio('x = [1, 2, 3] * 2; x[2] |> out($)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('scalar times array element-wise', () => {
    expect(audio('x = 2 * [1, 2, 3]; x[0] + x[1] + x[2] |> out($)')).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('array plus scalar element-wise', () => {
    expect(audio('x = [1, 2, 3] + 10; x[0] |> out($)')).toMatchAudio([[11, 11, 11], [11, 11, 11]])
    expect(audio('x = [1, 2, 3] + 10; x[2] |> out($)')).toMatchAudio([[13, 13, 13], [13, 13, 13]])
  })

  it('array of audio times scalar element-wise', () => {
    expect(audio('waves = [sine(220), sine(440)]; (waves * 0.5)[0] |> out($)')).toMatchAudio(
      audio('sine(220) * 0.5 |> out($)'),
    )
    expect(audio('waves = [sine(220), sine(440)]; (waves * 0.5)[1] |> out($)')).toMatchAudio(
      audio('sine(440) * 0.5 |> out($)'),
    )
  })

  it('audio times array of scalars element-wise', () => {
    expect(audio('(sine(440) * [1, 0.5])[0] |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
    expect(audio('(sine(440) * [1, 0.5])[1] |> out($)')).toMatchAudio(audio('sine(440) * 0.5 |> out($)'))
  })

  it('array of audio times audio element-wise', () => {
    expect(audio('waves = [sine(220), sine(440)]; gain = sine(1); (waves * gain)[0] |> out($)')).toMatchAudio(
      audio('sine(220) * sine(1) |> out($)'),
    )
  })

  it('array with chained operations', () => {
    expect(audio('x = [2, 3, 4]; x[0] * x[1] + x[2] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array length in nested arithmetic', () => {
    expect(audio('x = [1, 2, 3]; y = [4, 5]; x.length * y.length + 1 |> out($)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('array avg with length', () => {
    expect(audio('x = [10, 20, 30]; x.avg() + x.length |> out($)')).toMatchAudio([[23, 23, 23], [23, 23, 23]])
  })

  it('array of functions basic', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fn = fns[0]; fn(5) |> out($)')).toMatchAudio([[10,
      10, 10], [10, 10, 10]])
  })

  it('array of functions select second', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fn = fns[1]; fn(5) |> out($)')).toMatchAudio([[15,
      15, 15], [15, 15, 15]])
  })

  it('array of functions with three elements', () => {
    expect(
      audio('f1 = x -> x * 2; f2 = x -> x * 3; f3 = x -> x * 4; fns = [f1, f2, f3]; fn = fns[2]; fn(10) |> out($)'),
    )
      .toMatchAudio([[40, 40, 40], [40, 40, 40]])
  })

  it('array of functions direct call', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[0](5) |> out($)')).toMatchAudio([[10, 10, 10], [
      10,
      10,
      10,
    ]])
  })

  it('array of functions direct call second', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[1](10) |> out($)')).toMatchAudio([[30, 30, 30],
      [
        30,
        30,
        30,
      ]])
  })

  it('array of functions direct call with three', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; f3 = x -> x * 4; [f1, f2, f3][2](123) |> out($)')).toMatchAudio([[
      492,
      492,
      492,
    ], [492, 492, 492]])
  })

  it('array literal of functions direct call', () => {
    expect(audio('f1 = x -> x + 10; f2 = x -> x + 20; [f1, f2][1](5) |> out($)')).toMatchAudio([[25, 25, 25], [25, 25,
      25]])
  })

  it('array of functions with negative index', () => {
    expect(audio('f1 = x -> x + 10; f2 = x -> x + 20; fns = [f1, f2]; fn = fns[-1]; fn(5) |> out($)')).toMatchAudio([[
      25,
      25,
      25,
    ], [25, 25, 25]])
  })

  it('array of functions direct call with negative index', () => {
    expect(audio('f1 = x -> x + 10; f2 = x -> x + 20; fns = [f1, f2]; fns[-1](5) |> out($)')).toMatchAudio([[25, 25,
      25], [25, 25, 25]])
  })

  it('array of functions with modulo wrapping', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fn = fns[5]; fn(10) |> out($)')).toMatchAudio([[30,
      30, 30], [30, 30, 30]])
  })

  it('array of functions direct call with modulo wrapping', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[5](10) |> out($)')).toMatchAudio([[30, 30, 30],
      [
        30,
        30,
        30,
      ]])
  })

  it('array of functions length', () => {
    expect(audio('f1 = x -> x; f2 = x -> x; f3 = x -> x; fns = [f1, f2, f3]; fns.length |> out($)')).toMatchAudio([[3,
      3, 3], [3, 3, 3]])
  })

  it('array of functions with variable index', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; i = 1; fn = fns[i]; fn(7) |> out($)')).toMatchAudio(
      [
        [21, 21, 21],
        [21, 21, 21],
      ],
    )
  })

  it('array of functions direct call with variable index', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; i = 1; fns[i](7) |> out($)')).toMatchAudio([[21, 21,
      21], [21, 21, 21]])
  })

  it('array of functions with computed index', () => {
    expect(
      audio('f1 = x -> x + 1; f2 = x -> x + 2; f3 = x -> x + 3; fns = [f1, f2, f3]; fn = fns[1 + 1]; fn(10) |> out($)'),
    )
      .toMatchAudio([[13, 13, 13], [13, 13, 13]])
  })

  it('array of functions direct call with computed index', () => {
    expect(audio('f1 = x -> x + 1; f2 = x -> x + 2; f3 = x -> x + 3; fns = [f1, f2, f3]; fns[1 + 1](10) |> out($)'))
      .toMatchAudio([[13, 13, 13], [13, 13, 13]])
  })

  it('array of functions returning scalars', () => {
    expect(audio('f1 = () -> 100; f2 = () -> 200; fns = [f1, f2]; fn = fns[0]; fn() |> out($)')).toMatchAudio([[100,
      100, 100], [100, 100, 100]])
  })

  it('array of functions direct call returning scalars', () => {
    expect(audio('f1 = () -> 100; f2 = () -> 200; [f1, f2][1]() |> out($)')).toMatchAudio([[200, 200, 200], [200, 200,
      200]])
  })

  it('array of functions with different arities', () => {
    expect(audio('f1 = x -> x * 2; f2 = (x, y) -> x + y; fns = [f1, f2]; fn = fns[1]; fn(10, 20) |> out($)'))
      .toMatchAudio(
        [[30, 30, 30], [30, 30, 30]],
      )
  })

  it('array of functions direct call with two parameters', () => {
    expect(audio('f1 = x -> x * 2; f2 = (x, y) -> x + y; [f1, f2][1](10, 20) |> out($)')).toMatchAudio([[30, 30, 30], [
      30,
      30,
      30,
    ]])
  })

  it('array of functions with audio return', () => {
    expect(audio('f1 = () -> sine(220); f2 = () -> sine(440); fns = [f1, f2]; fn = fns[1]; fn() |> out($)'))
      .toMatchAudio(
        audio('sine(440) |> out($)'),
      )
  })

  it('array of functions direct call with audio return', () => {
    expect(audio('f1 = () -> sine(220); f2 = () -> sine(440); [f1, f2][1]() |> out($)')).toMatchAudio(
      audio('sine(440) |> out($)'),
    )
  })

  it('array of functions called multiple times', () => {
    expect(
      audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fn1 = fns[0]; fn2 = fns[1]; fn1(5) + fn2(5) |> out($)'),
    )
      .toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array of functions direct calls in arithmetic', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[0](5) + fns[1](5) |> out($)')).toMatchAudio([[
      25,
      25,
      25,
    ], [25, 25, 25]])
  })

  it('array of functions in arithmetic', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fn = fns[0]; fn(10) + 5 |> out($)')).toMatchAudio([[
      25,
      25,
      25,
    ], [25, 25, 25]])
  })

  it('array of functions direct call in arithmetic', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[0](10) + 5 |> out($)')).toMatchAudio([[25, 25,
      25], [25, 25, 25]])
  })

  it('array of functions with closure', () => {
    expect(audio('mult = n -> x -> x * n; f1 = mult(2); f2 = mult(3); fns = [f1, f2]; fn = fns[1]; fn(10) |> out($)'))
      .toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array of functions reassignment', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1]; fns = [f1, f2]; fn = fns[1]; fn(10) |> out($)'))
      .toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('multiple arrays of functions', () => {
    expect(
      audio('f1 = x -> x * 2; f2 = x -> x * 3; a = [f1]; b = [f2]; fn1 = a[0]; fn2 = b[0]; fn1(5) + fn2(5) |> out($)'),
    )
      .toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array of functions with length and call', () => {
    expect(
      audio('f1 = x -> x + 10; f2 = x -> x * 2; fns = [f1, f2]; len = fns.length; fn = fns[0]; len + fn(5) |> out($)'),
    )
      .toMatchAudio([[17, 17, 17], [17, 17, 17]])
  })

  it('array of functions in function scope', () => {
    expect(
      audio(
        'outer = () -> { f1 := x -> x * 2; f2 := x -> x * 3; fns := [f1, f2]; fn := fns[1]; fn(10) }; outer() |> out($)',
      ),
    )
      .toMatchAudio([[30, 30, 30], [30, 30, 30]])
  })

  it('array of functions passed through variable', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns1 = [f1, f2]; fns2 = fns1; fn = fns2[0]; fn(10) |> out($)'))
      .toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('array of functions direct call with zero parameters', () => {
    expect(audio('f1 = () -> 42; f2 = () -> 84; [f1, f2][0]() |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('array of functions direct call with three parameters', () => {
    expect(audio('f = (a, b, c) -> a + b + c; [f][0](10, 20, 30) |> out($)')).toMatchAudio([[60, 60, 60], [60, 60, 60]])
  })

  it('array of functions direct call in nested arithmetic', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; fns[0](5) * fns[1](2) |> out($)')).toMatchAudio([[
      60,
      60,
      60,
    ], [60, 60, 60]])
  })

  it('array of functions direct call with chained operations', () => {
    expect(audio('f = x -> x + 10; fns = [f]; fns[0](5) + fns[0](10) |> out($)')).toMatchAudio([[35, 35, 35], [35, 35,
      35]])
  })

  it('inline array literal function call', () => {
    expect(audio('add = (a, b) -> a + b; mult = (a, b) -> a * b; [add, mult][0](10, 5) |> out($)')).toMatchAudio([[15,
      15, 15], [15, 15, 15]])
  })

  it('inline array literal function call second element', () => {
    expect(audio('add = (a, b) -> a + b; mult = (a, b) -> a * b; [add, mult][1](10, 5) |> out($)')).toMatchAudio([[50,
      50, 50], [50, 50, 50]])
  })

  it('array of functions direct call with negative result', () => {
    expect(audio('f = x -> x - 100; [f][0](30) |> out($)')).toMatchAudio([[-70, -70, -70], [-70, -70, -70]])
  })

  it('array of functions direct call with division', () => {
    expect(audio('f = x -> x / 2; [f][0](100) |> out($)')).toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('array of functions direct call with power', () => {
    expect(audio('f = x -> x ** 2; [f][0](5) |> out($)')).toMatchAudio([[25, 25, 25], [25, 25, 25]])
  })

  it('array of functions direct call index from another array', () => {
    expect(audio('f1 = x -> x * 2; f2 = x -> x * 3; fns = [f1, f2]; idx = [1]; fns[idx[0]](10) |> out($)'))
      .toMatchAudio([
        [30, 30, 30],
        [30, 30, 30],
      ])
  })

  it('array element assignment basic', () => {
    expect(audio('arr = [1, 2, 3]; arr[1] = 10; arr[1] |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('array element assignment first element', () => {
    expect(audio('arr = [5, 10, 15]; arr[0] = 100; arr[0] |> out($)')).toMatchAudio([[100, 100, 100], [100, 100, 100]])
  })

  it('array element assignment last element', () => {
    expect(audio('arr = [1, 2, 3]; arr[2] = 99; arr[2] |> out($)')).toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('array element assignment with expression', () => {
    expect(audio('arr = [1, 2, 3]; arr[0] = arr[1] + arr[2]; arr[0] |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array element assignment preserves other elements', () => {
    expect(audio('arr = [10, 20, 30]; arr[1] = 99; arr[0] + arr[1] + arr[2] |> out($)')).toMatchAudio([[139, 139, 139],
      [139, 139, 139]])
  })

  it('array element assignment with variable', () => {
    expect(audio('arr = [1, 2, 3]; x = 50; arr[1] = x; arr[1] |> out($)')).toMatchAudio([[50, 50, 50], [50, 50, 50]])
  })

  it('array element assignment with computed index', () => {
    expect(audio('arr = [10, 20, 30, 40]; i = 1; arr[i + 1] = 99; arr[2] |> out($)')).toMatchAudio([[99, 99, 99], [99,
      99, 99]])
  })

  it('array element assignment with negative index', () => {
    expect(audio('arr = [1, 2, 3]; arr[-1] = 100; arr[2] |> out($)')).toMatchAudio([[100, 100, 100], [100, 100, 100]])
  })

  it('array element assignment multiple times', () => {
    expect(audio('arr = [1, 2, 3]; arr[0] = 10; arr[0] = 20; arr[0] |> out($)')).toMatchAudio([[20, 20, 20], [20, 20,
      20]])
  })

  it('array element assignment to audio', () => {
    expect(audio('arr = [1, 2, 3]; arr[1] = sine(440); arr[1] |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
  })

  it('array element assignment from audio to scalar', () => {
    expect(audio('arr = [sine(220), sine(440)]; arr[0] = 42; arr[0] |> out($)')).toMatchAudio([[42, 42, 42], [42, 42,
      42]])
  })

  it('array element assignment in sequence', () => {
    expect(audio('arr = [1, 2, 3]; arr[0] = 10; arr[1] = 20; arr[2] = 30; arr[0] + arr[1] + arr[2] |> out($)'))
      .toMatchAudio([[60, 60, 60], [60, 60, 60]])
  })

  it('array element assignment with function result', () => {
    expect(audio('f = x -> x * 2; arr = [1, 2, 3]; arr[1] = f(10); arr[1] |> out($)')).toMatchAudio([[20, 20, 20], [20,
      20, 20]])
  })

  it('array element assignment and read back', () => {
    expect(audio('arr = [5, 10]; x = arr[0]; arr[0] = 20; y = arr[0]; x + y |> out($)')).toMatchAudio([[25, 25, 25], [
      25,
      25,
      25,
    ]])
  })

  it('array element assignment with modulo wrapping', () => {
    expect(audio('arr = [1, 2, 3]; arr[5] = 99; arr[2] |> out($)')).toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('array element assignment in function', () => {
    expect(audio('f = () -> { arr := [1, 2, 3]; arr[1] = 100; arr[1] }; f() |> out($)')).toMatchAudio([[100, 100, 100],
      [100, 100, 100]])
  })

  it('array element assignment affects shared reference', () => {
    expect(audio('arr = [1, 2, 3]; ref = arr; arr[1] = 99; ref[1] |> out($)')).toMatchAudio([[99, 99, 99], [99, 99,
      99]])
  })
})

describe('control flow', () => {
  it('return from function', () => {
    expect(audio('f = () -> { return 42 }; f() |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('return with expression', () => {
    expect(audio('f = x -> { return x * 2 }; f(21) |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('return without value', () => {
    expect(audio('f = () -> { return }; f() |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('early return', () => {
    expect(audio('f = x -> { if (x > 0) return 10; 20 }; f(1) |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('early return not taken', () => {
    expect(audio('f = x -> { if (x > 0) return 10; 20 }; f(0) |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('ternary true branch', () => {
    expect(audio('x = 1 > 0 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary false branch', () => {
    expect(audio('x = 0 > 1 ? 10 : 20; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('ternary with expressions', () => {
    expect(audio('a = 5; b = 10; x = a > 3 ? a * 2 : b * 2; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('nested ternary', () => {
    expect(audio('x = 1; y = x > 0 ? (x > 1 ? 30 : 20) : 10; y |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('ternary in expression', () => {
    expect(audio('x = (1 > 0 ? 5 : 10) + 3; x |> out($)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('if expression equivalent to ternary', () => {
    expect(audio('x = if (1 > 0) 10 else 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if expression false branch', () => {
    expect(audio('x = if (0 > 1) 10 else 20; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('if expression in call argument', () => {
    const withIf = audio('sine(if (1 > 0) 440 else 220) |> out($)')
    const withTernary = audio('sine(1 > 0 ? 440 : 220) |> out($)')
    expect(withIf).toMatchAudio(withTernary)
  })

  it('if expression in call with variable', () => {
    const withIf = audio('ok = 1; sine(if (ok) 440 else 220) |> out($)')
    const withTernary = audio('ok = 1; sine(ok ? 440 : 220) |> out($)')
    expect(withIf).toMatchAudio(withTernary)
  })

  it('parses if expression as ternary in call argument', () => {
    const result = parse('sine(if (ok) 440 else 220);')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stmt = result.program!.body.find(s => s.type === 'expr' && s.expr?.type === 'call')
    const call = stmt?.type === 'expr' ? stmt.expr : null
    const arg = call?.type === 'call' ? call.args[0]?.value : null
    expect(arg?.type).toBe('ternary')
    if (arg?.type === 'ternary') {
      expect(arg.test.type).toBe('identifier')
      if (arg.test.type === 'identifier') expect(arg.test.name).toBe('ok')
      expect(arg.then.type).toBe('number')
      if (arg.then.type === 'number') expect(arg.then.value).toBe(440)
      expect(arg.else.type).toBe('number')
      if (arg.else.type === 'number') expect(arg.else.value).toBe(220)
    }
  })

  it('if statement true', () => {
    expect(audio('x = 0; if (1 > 0) x = 10; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if statement false', () => {
    expect(audio('x = 0; if (0 > 1) x = 10; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('if else true branch', () => {
    expect(audio('x = 0; if (1 > 0) x = 10 else x = 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if else false branch', () => {
    expect(audio('x = 0; if (0 > 1) x = 10 else x = 20; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('if with block', () => {
    expect(audio('x = 0; if (1 > 0) { x = 5; x = x * 2 }; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if else with blocks', () => {
    expect(audio('x = 0; if (0 > 1) { x = 5 } else { x = 10 }; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('nested if', () => {
    expect(audio('x = 0; if (1 > 0) if (2 > 1) x = 10; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('nested if else', () => {
    expect(audio('x = 0; if (1 > 0) if (0 > 1) x = 10 else x = 20; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20,
      20]])
  })

  it('if with multiple statements', () => {
    expect(audio('a = 1; b = 2; if (a > 0) { a = a + 1; b = b + 2 }; a + b |> out($)')).toMatchAudio([[6, 6, 6], [6, 6,
      6]])
  })

  it('if modifying array', () => {
    expect(audio('x = [1, 2, 3]; if (1 > 0) x = [4, 5, 6]; x[0] |> out($)')).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('ternary with audio', () => {
    expect(audio('x = 1 > 0 ? sine(440) : sine(880); x |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
  })

  it('if with audio assignment', () => {
    expect(audio('x = sine(220); if (1 > 0) x = sine(440); x |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
  })

  it('switch case 1', () => {
    expect(audio('x = 0; switch(1){case 1: x = 10; break; case 2: x = 20; break; default: x = 0}; x |> out($)'))
      .toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('switch case 2', () => {
    expect(audio('x = 0; switch(2){case 1: x = 10; break; case 2: x = 20; break; default: x = 0}; x |> out($)'))
      .toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('switch default', () => {
    expect(audio('x = 0; switch(99){case 1: x = 10; break; case 2: x = 20; break; default: x = 99}; x |> out($)'))
      .toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('switch with break', () => {
    expect(audio('x = 0; switch(1){case 1: x = 1; break; case 2: x = 2}; x |> out($)'))
      .toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('switch in function', () => {
    expect(audio('f = n -> { x = 0; switch(n){case 1: x = 1; case 2: x = 2; default: x = 0}; x }; f(2) |> out($)'))
      .toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('switch with expression test', () => {
    expect(audio('x = 0; switch(1+1){case 2: x = 42; break; default: x = 0}; x |> out($)'))
      .toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('switch expression returns value', () => {
    expect(audio('switch(0){case 0: 10; case 1: 20; default: 0} |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('switch expression case 1', () => {
    expect(audio('switch(1){case 0: 10; case 1: 20; default: 0} |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('switch expression default', () => {
    expect(audio('switch(99){case 0: 10; case 1: 20; default: 42} |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('switch expression in pipe with audio', () => {
    const src = 'x = step(4, dec()); switch (x % 4) { case 0: saw(c4); case 1: tri(e4); case 2: sqr(g#4); default: saw(c4) } |> out($)'
    expect(audio(src, { ticks: 8 })).toBeDefined()
  })

  it('return audio from function', () => {
    expect(audio('f = () -> { return sine(440) }; f() |> out($)')).toMatchAudio(audio('sine(440) |> out($)'))
  })

  it('return in nested function', () => {
    expect(audio('outer = () -> { inner = () -> { return 42 }; inner() }; outer() |> out($)')).toMatchAudio([[42, 42,
      42], [42, 42, 42]])
  })

  it('return with arithmetic', () => {
    expect(audio('f = (a, b) -> { return a + b * 2 }; f(10, 5) |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('multiple returns in function', () => {
    expect(audio('f = x -> { if (x > 10) return 100; if (x > 5) return 50; 0 }; f(7) |> out($)')).toMatchAudio([[50, 50,
      50], [50, 50, 50]])
  })

  it('return from array function', () => {
    expect(audio('f1 = () -> { return 10 }; f2 = () -> { return 20 }; [f1, f2][1]() |> out($)')).toMatchAudio([[20, 20,
      20], [20, 20, 20]])
  })

  it('ternary with zero', () => {
    expect(audio('x = 0 ? 10 : 20; x |> out($)')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('ternary with non-zero', () => {
    expect(audio('x = 5 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary with negative', () => {
    expect(audio('x = -1 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary with comparison operators', () => {
    expect(audio('a = 5; b = 10; x = a < b ? a : b; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('ternary with equality', () => {
    expect(audio('x = 5 == 5 ? 100 : 200; x |> out($)')).toMatchAudio([[100, 100, 100], [100, 100, 100]])
  })

  it('ternary with logical and', () => {
    expect(audio('x = 1 && 1 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary with logical or', () => {
    expect(audio('x = 0 || 1 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary chained', () => {
    expect(audio('x = 1; y = x > 2 ? 30 : x > 1 ? 20 : 10; y |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary with function calls', () => {
    expect(audio('f = x -> x * 2; g = x -> x * 3; x = 1 > 0 ? f(5) : g(5); x |> out($)')).toMatchAudio([[10, 10, 10], [
      10,
      10,
      10,
    ]])
  })

  it('ternary with array access', () => {
    expect(audio('arr = [10, 20, 30]; x = 1 > 0 ? arr[0] : arr[2]; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10,
      10]])
  })

  it('ternary with array methods', () => {
    expect(audio('arr = [1, 2, 3]; x = 1 > 0 ? arr.length : 0; x |> out($)')).toMatchAudio([[3, 3, 3], [3, 3, 3]])
  })

  it('if with comparison', () => {
    expect(audio('a = 5; b = 10; x = 0; if (a < b) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with equality', () => {
    expect(audio('x = 0; if (5 == 5) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with inequality', () => {
    expect(audio('x = 0; if (5 != 10) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with logical and true', () => {
    expect(audio('x = 0; if (1 && 1) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with logical and false', () => {
    expect(audio('x = 0; if (1 && 0) x = 1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('if with logical or true', () => {
    expect(audio('x = 0; if (0 || 1) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with logical or false', () => {
    expect(audio('x = 0; if (0 || 0) x = 1; x |> out($)')).toMatchAudio([[0, 0, 0], [0, 0, 0]])
  })

  it('if with negation', () => {
    expect(audio('x = 0; if (!0) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if else with multiple conditions', () => {
    expect(audio('a = 5; x = 0; if (a > 10) x = 1 else if (a > 3) x = 2 else x = 3; x |> out($)')).toMatchAudio([[2, 2,
      2], [2, 2, 2]])
  })

  it('if with array length check', () => {
    expect(audio('arr = [1, 2, 3]; x = 0; if (arr.length > 2) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with array element check', () => {
    expect(audio('arr = [5, 10, 15]; x = 0; if (arr[1] > 8) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if modifying multiple variables', () => {
    expect(audio('a = 1; b = 2; if (1 > 0) { a = 10; b = 20 }; a + b |> out($)')).toMatchAudio([[30, 30, 30], [30, 30,
      30]])
  })

  it('if else modifying same variable', () => {
    expect(audio('x = 5; if (x > 10) x = x * 2 else x = x * 3; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('nested if with different conditions', () => {
    expect(audio('a = 5; b = 10; x = 0; if (a > 0) if (b > 5) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('nested if else combinations', () => {
    expect(audio('a = 5; x = 0; if (a > 0) if (a > 10) x = 1 else x = 2 else x = 3; x |> out($)')).toMatchAudio([[2, 2,
      2], [2, 2, 2]])
  })

  it('if with function call in condition', () => {
    expect(audio('f = () -> 1; x = 0; if (f()) x = 10; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if with function call in body', () => {
    expect(audio('f = x -> x * 2; y = 0; if (1 > 0) y = f(5); y |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('ternary in function return', () => {
    expect(audio('f = x -> x > 0 ? 10 : 20; f(1) |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if in function with return', () => {
    expect(audio('f = x -> { if (x > 0) return 10 else return 20 }; f(1) |> out($)')).toMatchAudio([[10, 10, 10], [10,
      10, 10]])
  })

  it('complex nested ternary', () => {
    expect(audio('a = 5; b = 10; x = a > 3 ? (b > 5 ? 100 : 50) : (b > 15 ? 25 : 10); x |> out($)')).toMatchAudio([[100,
      100, 100], [100, 100, 100]])
  })

  it('if with empty else block', () => {
    expect(audio('x = 5; if (0 > 1) x = 10 else { }; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('ternary with same values', () => {
    expect(audio('x = 1 > 0 ? 42 : 42; x |> out($)')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('if with arithmetic in condition', () => {
    expect(audio('a = 5; b = 3; x = 0; if (a + b > 7) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with modulo in condition', () => {
    expect(audio('x = 0; if (10 % 3 == 1) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('ternary with multiplication', () => {
    expect(audio('a = 5 * 3; x = a > 10 ? 10 : 20; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('if with greater or equal', () => {
    expect(audio('x = 0; if (5 >= 5) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with less or equal', () => {
    expect(audio('x = 0; if (3 <= 5) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('return with ternary', () => {
    expect(audio('f = x -> { return x > 0 ? 10 : 20 }; f(1) |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('return with if result', () => {
    expect(audio('f = x -> { y = 0; if (x > 0) y = 10 else y = 20; return y }; f(1) |> out($)')).toMatchAudio([[10, 10,
      10], [10, 10, 10]])
  })

  it('ternary with negative numbers', () => {
    expect(audio('x = -5 < 0 ? -10 : -20; x |> out($)')).toMatchAudio([[-10, -10, -10], [-10, -10, -10]])
  })

  it('if with power operator', () => {
    expect(audio('x = 0; if (2 ** 3 == 8) x = 1; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('deeply nested if else', () => {
    expect(audio('a = 2; x = 0; if (a > 0) if (a > 1) if (a > 2) x = 3 else x = 2 else x = 1 else x = 0; x |> out($)'))
      .toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('ternary with array avg', () => {
    expect(audio('arr = [10, 20, 30]; x = arr.avg() > 15 ? 1 : 0; x |> out($)')).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('if with closure variable', () => {
    expect(audio('a = 5; f = () -> { x := 0; if (a > 3) x = 10; x }; f() |> out($)')).toMatchAudio([[10, 10, 10], [10,
      10, 10]])
  })

  it('ternary in array literal', () => {
    expect(audio('arr = [1 > 0 ? 10 : 20, 0 > 1 ? 30 : 40]; arr[0] + arr[1] |> out($)')).toMatchAudio([[50, 50, 50], [
      50,
      50,
      50,
    ]])
  })

  it('if with variable assignment then check', () => {
    expect(audio('x = 5; if (x) x = x * 2; x |> out($)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })
})

describe('error handling', () => {
  it('throw without value', () => {
    expect(audio('x = 5; throw; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('throw with value', () => {
    expect(audio('x = 5; throw 42; x |> out($)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('try catch basic', () => {
    expect(audio('x = 1; try { x = 2; throw 99; x = 3 } catch (e) { x = e }; x |> out($)')).toMatchAudio([[99, 99, 99],
      [99, 99, 99]])
  })

  it('try catch no error', () => {
    expect(audio('x = 1; try { x = 2 } catch (e) { x = 99 }; x |> out($)')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('try finally basic', () => {
    expect(audio('x = 1; try { x = 2 } finally { x = x + 10 }; x |> out($)')).toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('try catch finally', () => {
    expect(audio('x = 1; try { throw 5 } catch (e) { x = e } finally { x = x * 2 }; x |> out($)')).toMatchAudio([[10,
      10, 10], [10, 10, 10]])
  })

  it('try catch finally no error', () => {
    expect(audio('x = 1; try { x = 3 } catch (e) { x = 99 } finally { x = x + 1 }; x |> out($)')).toMatchAudio([[4, 4,
      4], [4, 4, 4]])
  })

  it('nested try catch', () => {
    expect(
      audio('x = 0; try { try { throw 5 } catch (e) { x = e; throw e * 2 } } catch (e) { x = x + e }; x |> out($)'),
    ).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('throw in function', () => {
    expect(audio('f = () -> { throw 42 }; x = 1; try { f() } catch (e) { x = e }; x |> out($)')).toMatchAudio([[42, 42,
      42], [42, 42, 42]])
  })

  it('catch with arithmetic', () => {
    expect(audio('x = 0; try { throw 10 } catch (e) { x = e + 5 }; x |> out($)')).toMatchAudio([[15, 15, 15], [15, 15,
      15]])
  })

  it('finally always executes', () => {
    expect(audio('x = 1; y = 0; try { x = 2; throw 99 } catch (e) { y = 1 } finally { x = x + 10 }; x |> out($)'))
      .toMatchAudio([[12, 12, 12], [12, 12, 12]])
  })

  it('throw in loop (unhandled, continues)', () => {
    // Unhandled throw is ignored, loop continues
    expect(audio('x = 0; for (i in 1..3) { if (i == 2) throw i; x = x + i }; x |> out($)')).toMatchAudio([[6, 6, 6], [6,
      6, 6]])
  })

  it('try catch in loop', () => {
    expect(
      audio(
        'sum = 0; for (i in 1..3) { try { if (i == 2) throw 10; sum = sum + i } catch (e) { sum = sum + e } }; sum |> out($)',
      ),
    ).toMatchAudio([[14, 14, 14], [14, 14, 14]])
  })

  it('return in try with finally', () => {
    expect(audio('x = 0; f = () -> { try { x = 5; return 10 } finally { x = 99 } }; result = f(); x |> out($)'))
      .toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('return value from try with finally', () => {
    expect(audio('f = () -> { x = 0; try { return 10 } finally { x = 99 } }; f() |> out($)')).toMatchAudio([[10, 10,
      10], [10, 10, 10]])
  })

  it('return in catch with finally', () => {
    expect(
      audio(
        'x = 0; f = () -> { try { throw 5 } catch (e) { return e * 2 } finally { x = 99 } }; result = f(); x |> out($)',
      ),
    ).toMatchAudio([[99, 99, 99], [99, 99, 99]])
  })

  it('return in finally overrides try return', () => {
    expect(audio('f = () -> { try { return 5 } finally { return 10 } }; f() |> out($)')).toMatchAudio([[10, 10, 10], [
      10,
      10,
      10,
    ]])
  })

  it('return value from catch with finally', () => {
    expect(audio('f = () -> { try { throw 5 } catch (e) { return e * 2 } finally { } }; f() |> out($)')).toMatchAudio([[
      10,
      10,
      10,
    ], [10, 10, 10]])
  })
})

describe('value polymorphism', () => {
  it('variable holds scalar', () => {
    expect(audio('x = 5; out(x)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('variable reassigned from scalar to different scalar', () => {
    expect(audio('x = 5; x = 10; out(x)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('variable reassigned from scalar to audio', () => {
    expect(audio('x = 5; a = x; x = sine(440); out(a)', { ticks: 1 })[0].slice(0, 3)).toEqual(
      new Float32Array([5, 5, 5]),
    )
  })

  it('variable reassigned from audio to scalar', () => {
    expect(audio('x = sine(440); x = 7; out(x)')[0].slice(0, 3)).toEqual(new Float32Array([7, 7, 7]))
  })

  it('variable reassigned from scalar to array', () => {
    expect(audio('x = 5; x = [1, 2, 3]; out(x[1])')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('variable reassigned from array to scalar', () => {
    expect(audio('x = [1, 2, 3]; x = 8; out(x)')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('variable reassigned from scalar to function', () => {
    expect(audio('x = 5; x = y -> y * 2; out(x(3))')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('variable reassigned from function to scalar', () => {
    expect(audio('x = y -> y * 2; x = 9; out(x)')).toMatchAudio([[9, 9, 9], [9, 9, 9]])
  })

  it('variable cycles through scalar, audio, array', () => {
    expect(audio('x = 5; a = x; x = sine(440); x = [1, 2]; b = x[0]; out(a + b)')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })

  it('variable cycles through all types', () => {
    expect(audio('x = 5; x = sine(440); x = [1, 2]; x = y -> y * 2; out(x(4))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('array holds mixed scalar and audio', () => {
    expect(audio('arr = [5, 10]; out(arr[0] + arr[1])')).toMatchAudio([[15, 15, 15], [15, 15, 15]])
  })

  it('array element accessed shows polymorphism', () => {
    expect(audio('arr = [5, sine(440)]; a = arr[0]; b = arr[1]; out(isscalar(a) + isaudio(b))')).toMatchAudio([[2, 2,
      2], [2, 2, 2]])
  })

  it('array element reassigned to different value', () => {
    expect(audio('arr = [5, 10]; x = arr[0]; arr[0] = 20; y = arr[0]; out(x + y)')).toMatchAudio([[25, 25, 25], [25, 25,
      25]])
  })

  it('array element assigned with expression', () => {
    expect(audio('arr = [1, 2, 3]; arr[0] = arr[1] + arr[2]; out(arr[0])')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('array element reassigned to different type', () => {
    expect(audio('arr = [5, 10]; arr[0] = sine(440); out(isaudio(arr[0]) + isscalar(arr[1]))')).toMatchAudio([[2, 2, 2],
      [2, 2, 2]])
  })

  it('conditional returns scalar or audio based on condition', () => {
    expect(audio('x = 1 > 0 ? 5 : sine(440); out(x)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('conditional returns different scalar based on condition', () => {
    expect(audio('x = 0 > 1 ? 5 : 7; out(x)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('variable holds undefined then scalar', () => {
    expect(audio('x = undefined; x = 5; out(x)')).toMatchAudio([[5, 5, 5], [5, 5, 5]])
  })

  it('variable holds scalar then undefined then scalar', () => {
    expect(audio('x = 3; x = undefined; x = 7; out(x)')).toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('type checking confirms reassignment from scalar to audio', () => {
    expect(audio('x = 5; a = isscalar(x); x = sine(440); b = isaudio(x); out(a + b)')).toMatchAudio([[2, 2, 2], [2, 2,
      2]])
  })

  it('type checking confirms cycle through all types', () => {
    expect(
      audio(
        'x = 5; a = isscalar(x); x = sine(440); b = isaudio(x); x = [1]; c = isarray(x); x = y -> y; d = isfunction(x); out(a + b + c + d)',
      ),
    ).toMatchAudio([[4, 4, 4], [4, 4, 4]])
  })

  it('type checking with undefined reassignment', () => {
    expect(audio('x = undefined; a = isundefined(x); x = 5; b = isscalar(x); out(a + b)')).toMatchAudio([[2, 2, 2], [2,
      2, 2]])
  })

  it('multiple variables with different types used together', () => {
    expect(audio('a = 5; b = sine(440); c = [1, 2]; d = x -> x; out(a + c[0])')).toMatchAudio([[6, 6, 6], [6, 6, 6]])
  })
})

describe('function polymorphism', () => {
  it('function accepts scalar returns scalar', () => {
    expect(audio('f = x -> x * 2; out(f(5))')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('function accepts audio', () => {
    expect(audio('f = x -> x; out(f(sine(440)))')).toMatchAudio(audio('out(sine(440))'))
  })

  it('function accepts audio returns audio', () => {
    expect(audio('f = x -> x * 2; out(f(sine(440)))')).toMatchAudio(audio('out(sine(440)*2)'))
  })

  it('same function accepts scalar then audio', () => {
    expect(audio('f = x -> x * 2; a = f(5); b = f(sine(440)); out(a)')).toMatchAudio([[10, 10, 10], [10, 10, 10]])
  })

  it('same function returns different types based on input', () => {
    expect(audio('f = x -> isaudio(x) ? [1] : x + 1; a = f(5); b = f(sine(440)); out(a + b[0])'))
      .toMatchAudio([[7, 7, 7], [7, 7, 7]])
  })

  it('function accepts array returns array element', () => {
    expect(audio('f = arr -> arr[1]; out(f([10, 20, 30]))')).toMatchAudio([[20, 20, 20], [20, 20, 20]])
  })

  it('function accepts and returns function', () => {
    expect(audio('wrapper = fn -> fn; double = x -> x * 2; f = wrapper(double); out(f(5))')).toMatchAudio([[10, 10, 10],
      [10, 10, 10]])
  })

  it('function returns different scalar values', () => {
    expect(audio('f = x -> x > 5 ? 100 : 200; a = f(10); b = f(3); out(a + b)')).toMatchAudio([[300, 300, 300], [300,
      300, 300]])
  })

  it('function parameter type affects return type', () => {
    expect(audio('f = x -> x * 2; a = f(5); b = f(sine(440)); out(isscalar(a) + isaudio(b))')).toMatchAudio([[2, 2, 2],
      [2, 2, 2]])
  })

  it('higher order function with scalar', () => {
    expect(audio('apply = (fn, x) -> fn(x); double = x -> x * 2; out(apply(double, 5))')).toMatchAudio([[10, 10, 10], [
      10,
      10,
      10,
    ]])
  })

  it('higher order function with audio', () => {
    expect(
      audio('apply = (fn, x) -> fn(x); double = x -> x * 2; result = apply(double, sine(440)); out(isaudio(result))'),
    ).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('higher order function accepts different types', () => {
    expect(
      audio(
        'apply = (fn, x) -> fn(x); double = x -> x * 2; a = apply(double, 5); b = apply(double, sine(440)); out(a + isaudio(b))',
      ),
    ).toMatchAudio([[11, 11, 11], [11, 11, 11]])
  })

  it('function returns function that accepts different types', () => {
    expect(
      audio(
        'makeMultiplier = n -> x -> x * n; times3 = makeMultiplier(3); a = times3(5); b = times3(sine(440)); out(a + isaudio(b))',
      ),
    ).toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('curried function with scalar', () => {
    expect(audio('add = x -> y -> x + y; add5 = add(5); out(add5(3))')).toMatchAudio([[8, 8, 8], [8, 8, 8]])
  })

  it('curried function with audio', () => {
    expect(audio('add = x -> y -> x + y; add5 = add(5); result = add5(sine(440)); out(isaudio(result))')).toMatchAudio([
      [1, 1, 1],
      [1, 1, 1],
    ])
  })

  it('function stored in array called with scalar', () => {
    expect(audio('double = x -> x * 2; triple = x -> x * 3; fns = [double, triple]; out(fns[0](5))')).toMatchAudio([[10,
      10, 10], [10, 10, 10]])
  })

  it('function stored in array called with audio', () => {
    expect(
      audio(
        'double = x -> x * 2; triple = x -> x * 3; fns = [double, triple]; result = fns[1](sine(440)); out(isaudio(result))',
      ),
    ).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('conditional selects function, calls with scalar', () => {
    expect(audio('double = x -> x * 2; triple = x -> x * 3; f = 1 > 0 ? double : triple; out(f(5))')).toMatchAudio([[10,
      10, 10], [10, 10, 10]])
  })

  it('conditional selects function, calls with audio', () => {
    expect(
      audio(
        'double = x -> x * 2; triple = x -> x * 3; f = 0 > 1 ? double : triple; result = f(sine(440)); out(isaudio(result))',
      ),
    ).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('function composition with scalars', () => {
    expect(audio('double = x -> x * 2; add3 = x -> x + 3; composed = x -> double(add3(x)); out(composed(5))'))
      .toMatchAudio([[16, 16, 16], [16, 16, 16]])
  })

  it('function composition with audio', () => {
    expect(
      audio(
        'double = x -> x * 2; add3 = x -> x + 3; composed = x -> double(add3(x)); result = composed(sine(440)); out(isaudio(result))',
      ),
    ).toMatchAudio([[1, 1, 1], [1, 1, 1]])
  })

  it('identity function with scalar', () => {
    expect(audio('identity = x -> x; out(identity(42))')).toMatchAudio([[42, 42, 42], [42, 42, 42]])
  })

  it('identity function with audio', () => {
    expect(audio('identity = x -> x; result = identity(sine(440)); out(isaudio(result))')).toMatchAudio([[1, 1, 1], [1,
      1, 1]])
  })

  it('identity function with array', () => {
    expect(audio('identity = x -> x; arr = identity([1, 2, 3]); out(arr[1])')).toMatchAudio([[2, 2, 2], [2, 2, 2]])
  })

  it('identity function with function', () => {
    expect(audio('identity = x -> x; double = x -> x * 2; f = identity(double); out(f(5))')).toMatchAudio([[10, 10, 10],
      [10, 10, 10]])
  })
})

describe('strings', () => {
  it('parses single quote string', () => {
    const result = parse('\'hello world\';')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('hello world')
      expect(stringExpr.expr.delimiter).toBe('single')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('parses double quote string', () => {
    const result = parse('"hello world";')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('hello world')
      expect(stringExpr.expr.delimiter).toBe('double')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('parses backtick string', () => {
    const result = parse('`hello world`;')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('hello world')
      expect(stringExpr.expr.delimiter).toBe('backtick')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('parses multiline single quote string', () => {
    const result = parse(`'foo
bar
baz';`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('foo\nbar\nbaz')
      expect(stringExpr.expr.delimiter).toBe('single')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('parses multiline double quote string', () => {
    const result = parse(`"foo
bar
baz";`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('foo\nbar\nbaz')
      expect(stringExpr.expr.delimiter).toBe('double')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('parses multiline backtick string', () => {
    const result = parse(`\`foo
bar
baz\`;`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('foo\nbar\nbaz')
      expect(stringExpr.expr.delimiter).toBe('backtick')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('allows delimiter character inside string when using different delimiter', () => {
    const result = parse(`'string with "double quotes" inside';`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('string with "double quotes" inside')
      expect(stringExpr.expr.delimiter).toBe('single')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('allows single quotes inside double quote string', () => {
    const result = parse(`"string with 'single quotes' inside";`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('string with \'single quotes\' inside')
      expect(stringExpr.expr.delimiter).toBe('double')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('allows backticks inside single quote string', () => {
    const result = parse(`'string with \`backticks\` inside';`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('string with `backticks` inside')
      expect(stringExpr.expr.delimiter).toBe('single')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('allows newlines and special characters without escaping', () => {
    const result = parse(`'line1
line2\twith tab
line3';`)
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
    const stringExpr = result.program!.body[result.program!.body.length - 1]
    if (stringExpr.type === 'expr' && stringExpr.expr.type === 'string') {
      expect(stringExpr.expr.value).toBe('line1\nline2\twith tab\nline3')
      expect(stringExpr.expr.delimiter).toBe('single')
    }
    else {
      throw new Error('Expected string expression')
    }
  })

  it('reports error for unclosed string', () => {
    const result = parse('\'unclosed string;')
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0].message).toContain('Unclosed string')
  })

  it('compiles without emitting bytecode for strings', () => {
    const program = parse('\'test string\';').program
    expect(program).not.toBeNull()
    if (program) {
      const result = compile(program)
      // Strings should not cause compilation errors even though they don't emit bytecode
      expect(result).not.toBeNull()
    }
  })

  it('handles empty strings', () => {
    const result1 = parse('\'\';')
    expect(result1.errors).toEqual([])
    const stringExpr1 = result1.program!.body[result1.program!.body.length - 1]
    if (stringExpr1.type === 'expr' && stringExpr1.expr.type === 'string') {
      expect(stringExpr1.expr.value).toBe('')
      expect(stringExpr1.expr.delimiter).toBe('single')
    }

    const result2 = parse('"";')
    expect(result2.errors).toEqual([])
    const stringExpr2 = result2.program!.body[result2.program!.body.length - 1]
    if (stringExpr2.type === 'expr' && stringExpr2.expr.type === 'string') {
      expect(stringExpr2.expr.value).toBe('')
      expect(stringExpr2.expr.delimiter).toBe('double')
    }

    const result3 = parse('``;')
    expect(result3.errors).toEqual([])
    const stringExpr3 = result3.program!.body[result3.program!.body.length - 1]
    if (stringExpr3.type === 'expr' && stringExpr3.expr.type === 'string') {
      expect(stringExpr3.expr.value).toBe('')
      expect(stringExpr3.expr.delimiter).toBe('backtick')
    }
  })
})
