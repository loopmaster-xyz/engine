import { describe, expect, it } from 'bun:test'
import { parseTramSequence } from '../../src/live/tram-parser.ts'

describe('tram-parser', () => {
  it('parses simple impulse pattern', () => {
    const result = parseTramSequence('x')
    expect(result.bytecode).toEqual([1.0])
  })

  it('parses simple pause pattern', () => {
    const result = parseTramSequence('-')
    expect(result.bytecode).toEqual([0.0])
  })

  it('parses alternating pattern', () => {
    const result = parseTramSequence('x-x-x-x-')
    expect(result.bytecode).toEqual([1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0])
  })

  it('parses pattern with subdivision', () => {
    const result = parseTramSequence('x-[xx]-x-')
    // Format: x, -, subdivision(-1, beatCount=2, content=[x, x]), -, x, -
    expect(result.bytecode).toEqual([1.0, 0.0, -1.0, 2.0, 1.0, 1.0, 0.0, 1.0, 0.0])
  })

  it('parses pattern with nested subdivisions', () => {
    const result = parseTramSequence('x-[[xx]x]-x-')
    // Format: x, -, subdivision(-1, beatCount=2, content=[nestedSub(-1, beatCount=2, [x,x]), x]), -, x, -
    expect(result.bytecode).toEqual([1.0, 0.0, -1.0, 2.0, -1.0, 2.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0])
  })

  it('parses empty sequence', () => {
    const result = parseTramSequence('')
    expect(result.bytecode).toEqual([])
  })

  it('skips whitespace and unknown characters', () => {
    const result = parseTramSequence('x - x - x')
    expect(result.bytecode).toEqual([1.0, 0.0, 1.0, 0.0, 1.0])
  })

  it('parses kick pattern', () => {
    const result = parseTramSequence('x-x-x-x-')
    expect(result.bytecode).toEqual([1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0])
  })

  it('parses subdivision with pauses', () => {
    const result = parseTramSequence('x-[x-x]-x-')
    // Format: x, -, subdivision(-1, beatCount=3, content=[x, -, x]), -, x, -
    expect(result.bytecode).toEqual([1.0, 0.0, -1.0, 3.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0])
  })

  it('parses multiple subdivisions', () => {
    const result = parseTramSequence('[xx]-[xx]-')
    // Format: subdivision(-1, beatCount=2, [x,x]), -, subdivision(-1, beatCount=2, [x,x]), -
    expect(result.bytecode).toEqual([-1.0, 2.0, 1.0, 1.0, 0.0, -1.0, 2.0, 1.0, 1.0, 0.0])
  })

  it('parses triple nested subdivision', () => {
    const result = parseTramSequence('[[[x]]]')
    // Format: subdivision(-1, beatCount=1, nestedSub(-1, beatCount=1, nestedSub(-1, beatCount=1, [x])))
    expect(result.bytecode).toEqual([-1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0])
  })

  it('parses complex pattern', () => {
    const result = parseTramSequence('x-[xx-x]-[x-xx]-x-')
    // First subdivision: -1, 4, [x, x, -, x]
    // Second subdivision: -1, 4, [x, -, x, x]
    expect(result.bytecode.length).toBeGreaterThan(0)
    expect(result.bytecode[0]).toBe(1.0) // First x
    expect(result.bytecode[1]).toBe(0.0) // First -
    expect(result.bytecode[2]).toBe(-1.0) // First subdivision marker
    expect(result.bytecode[3]).toBe(4.0) // First subdivision beat count
  })

  it('parses pattern with nested subdivision containing multiple beats', () => {
    const result = parseTramSequence('x-x-x-[xx[xxx]]-')
    // Format: x, -, x, -, x, -, subdivision(-1, beatCount=3, [x, x, nestedSub(-1, beatCount=3, [x, x, x])]), -
    // Outer subdivision has 3 beats: "xx" (2 beats) and "[xxx]" (1 beat - subdivision counts as 1)
    expect(result.bytecode).toEqual([
      1.0,  // x
      0.0,  // -
      1.0,  // x
      0.0,  // -
      1.0,  // x
      0.0,  // -
      -1.0, // subdivision marker
      3.0,  // beat count (3 beats: x, x, and [xxx] which counts as 1)
      1.0,  // first beat: x
      1.0,  // second beat: x
      -1.0, // nested subdivision marker
      3.0,  // nested beat count (3 beats: xxx)
      1.0,  // nested: x
      1.0,  // nested: x
      1.0,  // nested: x
      0.0,  // -
    ])
  })
})
