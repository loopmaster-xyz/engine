import { describe, expect, it } from 'bun:test'
import { compile } from '../../src/live/compiler/index.ts'
import { parse } from '../../src/live/parser.ts'

describe('tram compile', () => {
  it('compiles simple pattern', () => {
    const result = parse('tram(\'x-x-x-x-\');')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('compiles pattern with subdivisions', () => {
    const result = parse('tram(\'x-[xx]-x-\');')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('compiles pattern with nested subdivisions', () => {
    const result = parse('tram(\'x-[[xx]x]-x-\');')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('compiles pattern with named seq parameter', () => {
    const result = parse('tram(seq:\'x-x-\');')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('compiles pattern with bars parameter', () => {
    const result = parse('tram(\'x-x-\', bars: 1/2);')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('compiles pattern with both named parameters', () => {
    const result = parse('tram(seq:\'x-x-x-x-\', bars: 1);')
    expect(result.errors).toEqual([])
    expect(result.program).not.toBeNull()
  })

  it('reports error for missing sequence', () => {
    const parsed = parse('tram();')
    expect(parsed.program).not.toBeNull()
    if (parsed.program) {
      const compiled = compile(parsed.program)
      expect(compiled.errors.length).toBeGreaterThan(0)
      expect(compiled.errors[0].message).toContain('sequence')
    }
  })

  it('reports error for non-string sequence', () => {
    const parsed = parse('tram(123);')
    expect(parsed.program).not.toBeNull()
    if (parsed.program) {
      const compiled = compile(parsed.program)
      expect(compiled.errors.length).toBeGreaterThan(0)
      expect(compiled.errors[0].message).toContain('string literal')
    }
  })

  it('reports error for empty sequence', () => {
    const parsed = parse('tram(\'\');')
    expect(parsed.program).not.toBeNull()
    if (parsed.program) {
      const compiled = compile(parsed.program)
      expect(compiled.errors.length).toBeGreaterThan(0)
      expect(compiled.errors[0].message).toContain('empty')
    }
  })
})
