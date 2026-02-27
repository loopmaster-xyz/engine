import { beforeAll, describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import '../../as/build/index.wasm'
import { generateAll } from '../../src/dsl/generator/gens.ts'
import { generateAudioVmOp } from '../../src/dsl/generator/ops.ts'
import { parse } from '../../src/dsl/parser.ts'
import { audio, setup } from '../test-utils.ts'

beforeAll(async () => {
  await setup()
})

describe('DSL stereo support', () => {
  it('parses stereo block correctly', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)

    expect(ast.stereo).toBeDefined()
    expect(ast.stereo.length).toBeGreaterThan(0)
  })

  it('generates both mono and stereo classes', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)
    const code = generateAll(ast)

    // Check that mono class exists
    expect(code).toContain('export class Freeverb_default_room_scalar_damping_scalar {')

    // Check that stereo class exists
    expect(code).toContain('export class Freeverb_default_room_scalar_damping_scalar_stereo {')
  })

  it('stereo class has correct process signature', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)
    const code = generateAll(ast)

    // Check that stereo process method has inputLeft$, inputRight$, outputLeft$, outputRight$
    expect(code).toContain('inputLeft$: usize')
    expect(code).toContain('inputRight$: usize')
    expect(code).toContain('outputLeft$: usize')
    expect(code).toContain('outputRight$: usize')
  })

  it('stereo class uses stereo block variables', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)
    const code = generateAll(ast)

    // Check that stereo variant uses inputLeft, inputRight, outputLeft, outputRight
    expect(code).toContain('inputLeft = load<f32>(inputLeft$)')
    expect(code).toContain('inputRight = load<f32>(inputRight$)')
    expect(code).toContain('store<f32>(outputLeft$, outputLeft)')
    expect(code).toContain('store<f32>(outputRight$, outputRight)')
  })

  it('generates single op with runtime stereo detection', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)
    const gens = [ast]
    const opCode = generateAudioVmOp(gens)

    // Single op handles both mono and stereo at runtime
    expect(opCode).toContain('GenFreeverb_default,')
    // No separate stereo op - stereo is detected at runtime
    expect(opCode).not.toContain('GenFreeverb_default_Stereo,')
  })

  it('stereo variant uses freeverbKernelStereo', () => {
    const dsl = readFileSync('./dsl/freeverb.dsl', 'utf-8')
    const ast = parse(dsl)
    const code = generateAll(ast)

    // Check that stereo variant uses freeverbKernelStereo
    const lines = code.split('\n')
    const stereoClassStart = lines.findIndex(l => l.includes('_stereo {'))
    const stereoClassEnd = lines.findIndex((l, i) => i > stereoClassStart && l === '}')
    const stereoClassCode = lines.slice(stereoClassStart, stereoClassEnd).join('\n')

    expect(stereoClassCode).toContain('freeverbKernelStereo')
    expect(stereoClassCode).toContain('freeverbKernelStereo.left.combs')
    expect(stereoClassCode).toContain('freeverbKernelStereo.right.combs')
  })
})

// The language uses camelCase for gen names: TestGain -> testGain
describe('DSL stereo audio processing', () => {
  describe('testGain with mono input', () => {
    it('processes mono signal with gain', () => {
      // input 0.5 * gain 0.5 = 0.25, duplicated to stereo
      expect(audio('out(testGain(0.5, 0.5))')).toMatchAudio([[0.25, 0.25, 0.25], [0.25, 0.25, 0.25]])
    })

    it('applies testGain to full signal', () => {
      // input 1.0 * gain 0.5 = 0.5
      expect(audio('out(testGain(1.0, 0.5))')).toMatchAudio([[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]])
    })
  })

  describe('testGain with stereo input', () => {
    it('processes stereo signal independently', () => {
      // left 0.4 * 0.5 = 0.2, right 0.8 * 0.5 = 0.4
      expect(audio('out(testGain([0.4, 0.8], 0.5))')).toMatchAudio([[0.2, 0.2, 0.2], [0.4, 0.4, 0.4]])
    })

    it('processes different L/R values correctly', () => {
      // left 1.0 * 0.5 = 0.5, right 0.5 * 0.5 = 0.25
      expect(audio('out(testGain([1.0, 0.5], 0.5))')).toMatchAudio([[0.5, 0.5, 0.5], [0.25, 0.25, 0.25]])
    })
  })
})
