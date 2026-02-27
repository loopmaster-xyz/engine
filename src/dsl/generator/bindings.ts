import type { Gen } from '../ast.ts'
import { collectAudioVmSpecs, generatedHeader, type GenSpecializationSpec, type GenVariantSpec, getAudioVmOpNames,
  IndentHelper } from './helpers.ts'

export function generateAudioVmBindings(gens: Gen[]): string {
  const { variants, specs, maxParamCount } = collectAudioVmSpecs(gens)
  const opNames = getAudioVmOpNames(variants)

  const lines: string[] = []
  const indent = new IndentHelper()

  lines.push(generatedHeader)
  lines.push('import type { AudioVmHistoryView } from \'./audio-vm-helpers.ts\'')
  lines.push('import type { MiniCompileResult } from \'../live/compiler/index.ts\'')
  lines.push('')
  lines.push('export const AUDIO_VM_INFO_STRIDE = 29')
  lines.push('export const HISTORY_META_STRIDE = 20')
  lines.push(`export const MAX_PARAM_COUNT = ${Math.max(0, maxParamCount)}`)
  lines.push('')
  lines.push('export enum AudioVmOp {')
  indent.indent()
  opNames.forEach(name => lines.push(indent.write(`${name},`)))
  indent.dedent()
  lines.push('}')
  lines.push('')
  lines.push('export type ParamMode = \'scalar\' | \'audio\'')
  lines.push('export type GenSpec = {')
  indent.indent()
  lines.push(indent.write('id: number'))
  lines.push(indent.write('genName: string'))
  lines.push(indent.write('variantName: string'))
  lines.push(indent.write('className: string'))
  lines.push(indent.write('paramNames: string[]'))
  lines.push(indent.write('paramModes: ParamMode[]'))
  lines.push(indent.write('emitNames: string[]'))
  lines.push(indent.write('usesInput: boolean'))
  indent.dedent()
  lines.push('}')
  lines.push('')
  // Build a map of genName+variantName -> usesInput from variants
  const usesInputMap = new Map<string, boolean>()
  for (const v of variants) {
    usesInputMap.set(`${v.genName}_${v.variantName}`, v.usesInput)
  }
  lines.push('export const genSpecs: GenSpec[] = [')
  indent.indent()
  specs.forEach(spec => {
    const params = spec.paramNames.map(p => `'${p}'`).join(', ')
    const modes = spec.paramModes.map(p => `'${p}'`).join(', ')
    const emits = spec.emitNames.map(e => `'${e}'`).join(', ')
    const usesInput = usesInputMap.get(`${spec.genName}_${spec.variantName}`) ?? false
    lines.push(
      indent.write(
        `{ id: ${spec.id}, genName: '${spec.genName}', variantName: '${spec.variantName}', className: '${spec.className}', paramNames: [${params}], paramModes: [${modes}], emitNames: [${emits}], usesInput: ${usesInput} },`,
      ),
    )
  })
  lines.push(
    indent.write(
      `{ id: ${specs.length}, genName: 'Table', variantName: 'lookup', className: 'Table_lookup', paramNames: ['len', 'index'], paramModes: ['scalar', 'scalar'], emitNames: [], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${
        specs.length + 1
      }, genName: 'Tram', variantName: 'default', className: 'TramKernel', paramNames: [], paramModes: [], emitNames: ['fired'], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${
        specs.length + 2
      }, genName: 'Mini', variantName: 'default', className: 'MiniKernel', paramNames: ['bars'], paramModes: ['scalar'], emitNames: [], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${
        specs.length + 3
      }, genName: 'Timeline', variantName: 'default', className: 'TimelineKernel', paramNames: [], paramModes: [], emitNames: [], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${
        specs.length + 4
      }, genName: 'Out', variantName: 'default', className: 'Out', paramNames: [], paramModes: [], emitNames: [], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${
        specs.length + 5
      }, genName: 'Mix', variantName: 'default', className: 'Mix', paramNames: [], paramModes: [], emitNames: [], usesInput: false },`,
    ),
  )
  const arrayGetGenSpecIndex = specs.length + 6
  lines.push(
    indent.write(
      `{ id: ${arrayGetGenSpecIndex}, genName: 'ArrayGet', variantName: 'default', className: 'ArrayGet', paramNames: ['index'], paramModes: ['scalar'], emitNames: ['index'], usesInput: false },`,
    ),
  )
  lines.push(
    indent.write(
      `{ id: ${specs.length + 7}, genName: 'Solo', variantName: 'default', className: 'Solo', paramNames: [], paramModes: [], emitNames: [], usesInput: false },`,
    ),
  )
  indent.dedent()
  lines.push(']')
  lines.push('')

  // Generate typed history interfaces for each generator
  lines.push('export type HistoryParamAccessor = {')
  indent.indent()
  lines.push(indent.write('[index: number]: number'))
  lines.push(indent.write('readonly latest: number'))
  lines.push(indent.write('at(index: number): number'))
  indent.dedent()
  lines.push('}')
  lines.push('')
  lines.push('export type HistorySampleCounts = Int32Array & {')
  indent.indent()
  lines.push(indent.write('readonly latest: number'))
  indent.dedent()
  lines.push('}')
  lines.push('')
  lines.push('export type HistorySource = {')
  indent.indent()
  lines.push(indent.write('line: number'))
  lines.push(indent.write('column: number'))
  indent.dedent()
  lines.push('}')
  lines.push('')

  // Group specs by genName to create one type per generator
  const genSpecsMap = new Map<string, GenSpecializationSpec[]>()
  for (const spec of specs) {
    if (!genSpecsMap.has(spec.genName)) {
      genSpecsMap.set(spec.genName, [])
    }
    genSpecsMap.get(spec.genName)!.push(spec)
  }

  // Add Tram manually since it's not in specs
  genSpecsMap.set('Tram', [{
    id: specs.length + 1,
    genName: 'Tram',
    variantName: 'default',
    className: 'TramKernel',
    paramNames: [],
    paramModes: [],
    paramCount: 1,
    emitNames: ['fired'],
    isStateful: false,
    rate: 'audio',
  }])

  // Add Mini manually since it's not in specs
  genSpecsMap.set('Mini', [{
    id: specs.length + 2,
    genName: 'Mini',
    variantName: 'default',
    className: 'MiniKernel',
    paramNames: ['bars'],
    paramModes: ['scalar'],
    paramCount: 1,
    emitNames: [],
    isStateful: false,
    rate: 'audio',
  }])

  // Add Timeline manually since it's not in specs
  genSpecsMap.set('Timeline', [{
    id: specs.length + 3,
    genName: 'Timeline',
    variantName: 'default',
    className: 'TimelineKernel',
    paramNames: [],
    paramModes: [],
    paramCount: 0,
    emitNames: [],
    isStateful: false,
    rate: 'audio',
  }])

  // Add Out manually (used for out($) history capture)
  genSpecsMap.set('Out', [{
    id: specs.length + 4,
    genName: 'Out',
    variantName: 'default',
    className: 'Out',
    paramNames: [],
    paramModes: [],
    paramCount: 0,
    emitNames: [],
    isStateful: false,
    rate: 'audio',
  }])

  // Add Solo manually (used for solo($) / outs($) history capture)
  genSpecsMap.set('Solo', [{
    id: specs.length + 7,
    genName: 'Solo',
    variantName: 'default',
    className: 'Solo',
    paramNames: [],
    paramModes: [],
    paramCount: 0,
    emitNames: [],
    isStateful: false,
    rate: 'audio',
  }])

  // Add Mix manually (used for mix=> output history at Post)
  genSpecsMap.set('Mix', [{
    id: specs.length + 5,
    genName: 'Mix',
    variantName: 'default',
    className: 'Mix',
    paramNames: [],
    paramModes: [],
    paramCount: 0,
    emitNames: [],
    isStateful: false,
    rate: 'audio',
  }])
  genSpecsMap.set('ArrayGet', [{
    id: arrayGetGenSpecIndex,
    genName: 'ArrayGet',
    variantName: 'default',
    className: 'ArrayGet',
    paramNames: ['index'],
    paramModes: ['scalar'],
    paramCount: 1,
    emitNames: ['index'],
    isStateful: false,
    rate: 'audio',
  }])

  // Generate a type for each generator based on its first spec (they all have same param/emit names)
  for (const [genName, genSpecs] of genSpecsMap.entries()) {
    const firstSpec = genSpecs[0]
    const paramNames = firstSpec.paramNames
    const emitNames = firstSpec.emitNames

    // Create param type
    const paramTypeEntries = paramNames.map(p => `  ${p}: HistoryParamAccessor`).join('\n')
    const emitTypeEntries = emitNames.length > 0
      ? emitNames.map(e => `  ${e}: HistoryParamAccessor`).join('\n')
      : ''

    lines.push(`export type ${genName}HistoryParams = {`)
    lines.push(paramTypeEntries)
    lines.push('}')
    lines.push('')

    lines.push(`export type ${genName}HistoryEmit = {`)
    lines.push(emitTypeEntries)
    lines.push('}')
    lines.push('')

    lines.push(`export type ${genName}History = {`)
    indent.indent()
    lines.push(indent.write('id: number'))
    lines.push(indent.write(`genName: '${genName}'`))
    lines.push(indent.write('variantName: string'))
    lines.push(indent.write('className: string'))
    lines.push(indent.write('source: HistorySource'))
    lines.push(indent.write('view: AudioVmHistoryView'))
    lines.push(indent.write('index: number'))
    lines.push(indent.write(`params: ${genName}HistoryParams`))
    lines.push(indent.write(`emit: ${genName}HistoryEmit`))
    if (genName === 'Tram') {
      lines.push(indent.write('beatMapping: Array<{ linearIndex: number; startCol: number; endCol: number }>'))
    }
    if (genName === 'Mini') {
      lines.push(indent.write('sequence: string'))
      lines.push(indent.write('compileResult: MiniCompileResult'))
    }
    if (genName === 'Timeline') {
      lines.push(indent.write('sequence: string'))
      lines.push(indent.write('segmentTokens: Array<{ fromTokenStart: number; fromTokenLength: number; toTokenStart: number; toTokenLength: number }>'))
      lines.push(indent.write('colorIndex?: number'))
    }
    if (genName === 'ArrayGet') {
      lines.push(indent.write('elementMapping?: Array<{ index: number; startCol: number; endCol: number }>'))
    }
    lines.push(indent.write('size: number'))
    lines.push(indent.write('mask: number'))
    lines.push(indent.write('writeIndex: number'))
    lines.push(indent.write('values: Float32Array'))
    lines.push(indent.write('sampleCounts: HistorySampleCounts'))
    indent.dedent()
    lines.push('}')
    lines.push('')
  }

  // Generate union type
  const genNames = Array.from(genSpecsMap.keys()).sort()
  lines.push(`export type TypedHistory = ${genNames.map(n => `${n}History`).join(' | ')}`)

  return lines.join('\n')
}
