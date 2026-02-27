import { Expr, Gen, Parameter, Stmt } from '../ast.ts'
import { type AnalysisResult, analyzeDependencies, collectIdentifiers, collectUsedBeforeAssignedWithControlFlow,
  determineFieldsAfterPlacement, exprToString, generatedHeader, generateParameterVariants, groupStatementsByParams,
  IndentHelper, stmtsUseIdentifier, systemParams, toPascalCase, traceToParameters, trackableSystemParams,
  type UsageSite, type VariableInfo } from './helpers.ts'

export function generateGens(gens: Gen[]): string {
  const lines: string[] = []

  lines.push(generatedHeader)
  lines.push('')
  lines.push('export type GenParameter = {')
  lines.push('  name: string')
  lines.push('  default?: number')
  lines.push('  min?: number')
  lines.push('  max?: number')
  lines.push('  unit?: string')
  lines.push('  curve?: \'linear\' | \'exp2\'')
  lines.push('  description?: string')
  lines.push('}')
  lines.push('')
  lines.push('export type GenDescriptor = {')
  lines.push('  name: string')
  lines.push('  description?: string')
  lines.push('  category?: string')
  lines.push('  variants?: Record<string, string>')
  lines.push('  parameters: GenParameter[]')
  lines.push('}')
  lines.push('')
  lines.push('export const gens: Record<string, GenDescriptor> = {')

  for (let i = 0; i < gens.length; i++) {
    const gen = gens[i]
    const isLast = i === gens.length - 1
    const usesInput = stmtsUseIdentifier(gen.audio, 'input')
      || (gen.stereo && gen.stereo.length > 0
        && (stmtsUseIdentifier(gen.stereo, 'inputLeft') || stmtsUseIdentifier(gen.stereo, 'inputRight')))
    const hasVariants = gen.variants.length > 0
    const variants = hasVariants ? gen.variants : [{ name: 'default', stmts: [], description: undefined }]

    lines.push(`  ${gen.name}: {`)
    lines.push(`    name: '${gen.name}',`)
    if (gen.description !== undefined) {
      lines.push(`    description: '${gen.description}',`)
    }
    if (gen.category !== undefined) {
      lines.push(`    category: '${gen.category}',`)
    }
    if (hasVariants) {
      lines.push('    variants: {')
      for (let j = 0; j < variants.length; j++) {
        const v = variants[j]
        const d = v.description ?? ''
        const suffix = j === variants.length - 1 ? '' : ','
        lines.push(`      ${v.name}: '${d}'${suffix}`)
      }
      lines.push('    },')
    }
    lines.push('    parameters: [')
    if (usesInput) {
      lines.push(`      { name: 'input', description: 'Input signal' },`)
    }

    for (let j = 0; j < gen.parameters.length; j++) {
      const param = gen.parameters[j]
      const isLastParam = j === gen.parameters.length - 1
      const paramLines: string[] = []

      paramLines.push(`      { name: '${param.name}'`)
      if (param.default !== undefined) {
        paramLines.push(`, default: ${param.default}`)
      }
      if (param.min !== undefined) {
        paramLines.push(`, min: ${param.min}`)
      }
      if (param.max !== undefined) {
        paramLines.push(`, max: ${param.max}`)
      }
      if (param.curve !== undefined) {
        paramLines.push(`, curve: '${param.curve}'`)
      }
      if (param.unit !== undefined) {
        paramLines.push(`, unit: '${param.unit}'`)
      }
      if (param.description !== undefined) {
        paramLines.push(`, description: '${param.description}'`)
      }
      paramLines.push(' }')

      lines.push(paramLines.join('') + (isLastParam ? '' : ','))
    }

    lines.push('    ]')
    lines.push('  }' + (isLast ? '' : ','))
  }

  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

function collectParamsUsedInConditions(
  allGroups: Map<string, { control: Stmt[]; variant: Stmt[] }>,
  scalarParams: string[],
): Set<string> {
  const paramsUsedInConditions = new Set<string>()
  if (scalarParams.length === 0) {
    return paramsUsedInConditions
  }

  allGroups.forEach((_, condition) => {
    scalarParams.forEach(p => {
      if (condition.includes(`${p}Changed`)) {
        paramsUsedInConditions.add(p)
      }
    })
  })

  return paramsUsedInConditions
}

function checkSystemParamUsedInConditionalControl(
  allGroups: Map<string, { control: Stmt[]; variant: Stmt[] }>,
  systemParam: string,
): boolean {
  for (const [condition, { control }] of allGroups.entries()) {
    // Only check conditional blocks (not 'always' or 'true')
    if (condition !== 'always' && condition !== 'true') {
      for (const stmt of control) {
        const walk = (s: Stmt): boolean => {
          if (s.type === 'assign') {
            if (collectIdentifiers(s.expr).has(systemParam)) {
              return true
            }
          }
          else if (s.type === 'if') {
            if (collectIdentifiers(s.condition).has(systemParam)) {
              return true
            }
            if (s.thenBranch.some(walk)) return true
            if (s.elseBranch?.some(walk)) return true
          }
          else if (s.type === 'block') {
            if (s.stmts.some(walk)) return true
          }
          else if (s.type === 'forIn') {
            if (collectIdentifiers(s.iterable).has(systemParam)) {
              return true
            }
            if (s.body.some(walk)) return true
          }
          else if (s.type === 'switch') {
            if (collectIdentifiers(s.expr).has(systemParam)) {
              return true
            }
            if (s.cases.some(c => {
              if (c.value && collectIdentifiers(c.value).has(systemParam)) {
                return true
              }
              return c.stmts.some(walk)
            })) return true
          }
          return false
        }
        if (walk(stmt)) {
          return true
        }
      }
    }
  }
  return false
}

function collectTrackableSystemParamsUsedInConditionalControl(
  allGroups: Map<string, { control: Stmt[]; variant: Stmt[] }>,
): Set<string> {
  const usedParams = new Set<string>()
  for (const param of trackableSystemParams) {
    if (checkSystemParamUsedInConditionalControl(allGroups, param)) {
      usedParams.add(param)
    }
  }
  // Also include any trackable system param whose "paramChanged" appears in a condition key
  // (e.g. after moving stmts to 'true', a group can still have condition "decayChanged || sampleRateChanged")
  for (const condition of allGroups.keys()) {
    if (condition === 'always' || condition === 'true') continue
    for (const param of trackableSystemParams) {
      const changedVar = `${param}Changed`
      if (condition.includes(changedVar)) {
        usedParams.add(param)
      }
    }
  }
  return usedParams
}

function collectSubexpressions(expr: string): string[] {
  const subexprs: string[] = []
  const stack: Array<{ start: number; isFunctionCall: boolean }> = []

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      // Check if this is a function call by looking at the character before '('
      const beforeParen = i > 0 ? expr[i - 1] : ''
      const isFunctionCall = /[a-zA-Z_0-9]/.test(beforeParen)
      stack.push({ start: i, isFunctionCall })
    }
    else if (expr[i] === ')') {
      const frame = stack.pop()
      if (frame !== undefined) {
        const subexpr = expr.substring(frame.start, i + 1)
        // Skip function calls - only optimize the arguments, not the entire call
        if (!frame.isFunctionCall) {
          subexprs.push(subexpr)
        }
      }
    }
  }

  return subexprs
}

function optimizeExpressions(exprs: string[]): { optimized: string[]; declarations: string[] } {
  const exprCount = new Map<string, number>()
  const exprToOpt = new Map<string, string>()
  const declarations: string[] = []
  let optCounter = 0

  // Count occurrences of each subexpression across all expressions
  for (const expr of exprs) {
    const subexprs = collectSubexpressions(expr)
    for (const subexpr of subexprs) {
      // Skip simple expressions (just a variable or number)
      if (subexpr.match(/^\([a-zA-Z_]\w*\)$/) || subexpr.match(/^\(\d+\.?\d*\)$/)) {
        continue
      }
      exprCount.set(subexpr, (exprCount.get(subexpr) || 0) + 1)
    }
  }

  // Create optimization variables for subexpressions that appear more than once
  // Sort by length ascending to process smaller expressions first (so they can be used in larger ones)
  const sortedSubexprs = Array.from(exprCount.entries())
    .filter(([_, count]) => count > 1)
    .sort((a, b) => a[0].length - b[0].length)

  for (const [subexpr, count] of sortedSubexprs) {
    const optVar = `__opt${optCounter++}`
    exprToOpt.set(subexpr, optVar)

    // Replace subexpressions in the declaration itself
    let declExpr = subexpr
    for (const [prevSubexpr, prevOptVar] of exprToOpt.entries()) {
      if (prevSubexpr !== subexpr) {
        const escaped = prevSubexpr.replace(/[()[\]{}*+?^$|\\]/g, '\\$&')
        declExpr = declExpr.replace(new RegExp(escaped, 'g'), prevOptVar)
      }
    }

    declarations.push(`const ${optVar}: f32 = ${declExpr}`)
  }

  // Replace subexpressions with optimization variables
  const optimized = exprs.map(expr => {
    let result = expr
    // Sort by length descending to replace longer expressions first
    const sortedReplacements = Array.from(exprToOpt.entries()).sort((a, b) => b[0].length - a[0].length)
    for (const [subexpr, optVar] of sortedReplacements) {
      const escaped = subexpr.replace(/[()[\]{}*+?^$|\\]/g, '\\$&')
      result = result.replace(new RegExp(escaped, 'g'), optVar)
    }
    return result
  })

  return { optimized, declarations }
}

function collectVariables(stmts: Stmt[]): Set<string> {
  const vars = new Set<string>()
  function walkStmt(stmt: Stmt) {
    if (stmt.type === 'assign') {
      vars.add(stmt.name)
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(walkStmt)
    }
    else if (stmt.type === 'if') {
      stmt.thenBranch.forEach(walkStmt)
      stmt.elseBranch?.forEach(walkStmt)
    }
    else if (stmt.type === 'forIn') {
      stmt.body.forEach(walkStmt)
    }
    else if (stmt.type === 'switch') {
      stmt.cases.forEach(c => c.stmts.forEach(walkStmt))
    }
  }
  stmts.forEach(walkStmt)
  return vars
}

/** Returns names of variables that are used-before-assigned in the audio block and must be class fields (state). */
function getStateVarNamesForClassFields(
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
  analysis: AnalysisResult,
  paramModes: Record<string, 'scalar' | 'audio'>,
  channelMode: 'mono' | 'stereo',
): Set<string> {
  const audioBlock = channelMode === 'stereo' ? gen.stereo : gen.audio
  const paramNames = gen.parameters.map(p => p.name)
  const paramNamesSet = new Set(paramNames)

  const audioBlockAssignedVars = new Set<string>()
  const collectAudioBlockAssigned = (s: Stmt): void => {
    if (s.type === 'assign') audioBlockAssignedVars.add(s.name)
    else if (s.type === 'if') {
      s.thenBranch.forEach(collectAudioBlockAssigned)
      s.elseBranch?.forEach(collectAudioBlockAssigned)
    }
    else if (s.type === 'block') s.stmts.forEach(collectAudioBlockAssigned)
    else if (s.type === 'forIn') s.body.forEach(collectAudioBlockAssigned)
    else if (s.type === 'switch') s.cases.forEach(c => c.stmts.forEach(collectAudioBlockAssigned))
  }
  audioBlock.forEach(collectAudioBlockAssigned)

  const variantAfterAudioLhsSetTop = new Set(
    variant.stmts
      .filter((stmt): stmt is Extract<Stmt, { type: 'assign' }> =>
        stmt.type === 'assign' && Array.from(collectIdentifiers(stmt.expr)).some(dep => audioBlockAssignedVars.has(dep))
      )
      .map(s => s.name),
  )

  const audioVars = collectVariables(audioBlock)
  const findAudioAssignments = (stmts: Stmt[]): Map<string, number> => {
    const assignments = new Map<string, number>()
    let index = 0
    const walk = (s: Stmt): void => {
      if (s.type === 'assign') {
        if (!assignments.has(s.name)) assignments.set(s.name, index)
        index++
      }
      else if (s.type === 'block') s.stmts.forEach(walk)
      else if (s.type === 'if') {
        s.thenBranch.forEach(walk)
        s.elseBranch?.forEach(walk)
        index++
      }
      else if (s.type === 'forIn') {
        s.body.forEach(walk)
        index++
      }
      else if (s.type === 'expr') index++
    }
    stmts.forEach(walk)
    return assignments
  }
  const audioAssignedSomewhere = new Set<string>(Array.from(findAudioAssignments(audioBlock).keys()))
  const audioUsedBeforeAssigned = collectUsedBeforeAssignedWithControlFlow(
    audioBlock,
    name => audioAssignedSomewhere.has(name) && !systemParams.has(name) && !paramNamesSet.has(name),
  )

  const out = new Set<string>()
  analysis.variables.forEach((v, name) => {
    if (
      v.assignedIn.has('audio')
      && v.usedIn.has('audio')
      && audioVars.has(name)
      && audioUsedBeforeAssigned.has(name)
      && !variantAfterAudioLhsSetTop.has(name)
      && !v.assignedIn.has('control')
    ) {
      out.add(name)
    }
  })
  return out
}

// For *SampleCount fields (i32), emit integer expr: sampleCount + bufferLength instead of sampleCount + f32(bufferLength)
function continuityExprForI32(targetName: string, expr: string): string {
  if (!targetName.endsWith('SampleCount')) return expr
  return expr.replace(/\bf32\s*\(\s*bufferLength\s*\)/g, 'bufferLength')
}

function generateProcessMethod(
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
  paramModes: Record<string, 'scalar' | 'audio'>,
  analysis: AnalysisResult,
  allGroups: Map<string, { control: Stmt[]; variant: Stmt[] }>,
  className: string,
  channelMode: 'mono' | 'stereo' = 'mono',
): string {
  const indent = new IndentHelper()
  indent.indentLevel = 1 // Methods are at class body level (1 indent)

  // Use stereo block if in stereo mode, otherwise use audio block
  const audioBlock = channelMode === 'stereo' ? gen.stereo : gen.audio

  // Variables assigned in the audio block; variant statements referencing these must be skipped in control and emitted after the audio block in the loop
  const audioBlockAssignedVars = new Set<string>()
  const collectAudioBlockAssigned = (s: Stmt): void => {
    if (s.type === 'assign') {
      audioBlockAssignedVars.add(s.name)
    }
    else if (s.type === 'if') {
      s.thenBranch.forEach(collectAudioBlockAssigned)
      s.elseBranch?.forEach(collectAudioBlockAssigned)
    }
    else if (s.type === 'block') {
      s.stmts.forEach(collectAudioBlockAssigned)
    }
    else if (s.type === 'forIn') {
      s.body.forEach(collectAudioBlockAssigned)
    }
    else if (s.type === 'switch') {
      s.cases.forEach(c => c.stmts.forEach(collectAudioBlockAssigned))
    }
  }
  audioBlock.forEach(collectAudioBlockAssigned)

  // LHS of variant statements that reference audio block vars; excluded from stateVars and from audioDependentFields
  const variantAfterAudioLhsSetTop = new Set(
    variant.stmts
      .filter((stmt): stmt is Extract<Stmt, { type: 'assign' }> =>
        stmt.type === 'assign' && Array.from(collectIdentifiers(stmt.expr)).some(dep => audioBlockAssignedVars.has(dep))
      )
      .map(s => s.name),
  )

  const paramNames = gen.parameters.map(p => p.name)
  const effectiveParamModes: Record<string, 'scalar' | 'audio'> = { ...paramModes }
  if (paramNames.includes('key') && effectiveParamModes['key'] === 'scalar') {
    effectiveParamModes['key'] = 'audio'
  }
  const scalarParams = paramNames.filter(p => effectiveParamModes[p] === 'scalar')
  const audioParams = paramNames.filter(p => effectiveParamModes[p] === 'audio')
  const paramNamesSet = new Set(paramNames)
  const fieldNames = new Set(gen.fields.map(f => f.name))
  const constantNames = new Set(gen.constants.map(c => c.name))
  let fieldLocalsInAudio = new Set<string>()
  const fieldTypes = new Map<string, string>()
  gen.fields.forEach(f => {
    const typePart = f.value.split('=')[0]?.trim()
    if (typePart) {
      fieldTypes.set(f.name, typePart)
    }
  })

  const controlToAudioLocals = new Set(
    Array.from(analysis.variables.values())
      .filter(v =>
        (v.assignedIn.has('control') || v.assignedIn.has('variant'))
        && v.usedIn.has('audio')
        && !fieldNames.has(v.name)
        && !v.needsField
      )
      .map(v => v.name),
  )

  // Helper to replace constants in expressions
  const replaceConstants = (expr: string): string => {
    // Constants are module-level, so they can be used directly
    // No replacement needed - they're already valid identifiers
    return expr
  }

  // Helper to get variable reference (field or local)
  const getVarRef = (varName: string, site: UsageSite): string => {
    // Constants are module-level, so they can be used directly
    if (constantNames.has(varName)) {
      return varName
    }
    if (fieldNames.has(varName)) {
      if (site === 'audio' && fieldLocalsInAudio.has(varName)) return varName
      return `this.${varName}`
    }
    const varInfo = analysis.variables.get(varName)
    if (!varInfo) return varName // Parameter or system variable

    // If it needs to be a field, use this. unless we have a local shadow in audio
    if (varInfo.needsField) {
      if (site === 'audio' && fieldLocalsInAudio.has(varName)) return varName
      return `this.${varName}`
    }

    // Otherwise it's a local variable
    return varName
  }

  // Helper to get parameter reference (clamped if min/max defined, otherwise raw)
  const getClampExpr = (value: string, param: Parameter | undefined): string => {
    if (!param) return value
    if (param.min !== undefined && param.max !== undefined) {
      return `clamp(${value}, ${param.min}, ${param.max})`
    }
    else if (param.min !== undefined) {
      return `max(${value}, ${param.min})`
    }
    else if (param.max !== undefined) {
      return `min(${value}, ${param.max})`
    }
    return value
  }

  const getParamRef = (paramName: string): string => {
    const param = gen.parameters.find(p => p.name === paramName)
    if (param && (param.min !== undefined || param.max !== undefined)) {
      return `${paramName}Clamped`
    }
    return paramName
  }
  const getAudioParamRef = (paramName: string): string => {
    const param = gen.parameters.find(p => p.name === paramName)
    if (param) {
      return getClampExpr(`load<f32>(${paramName}$)`, param)
    }
    return `load<f32>(${paramName}$)`
  }
  const getAudioLocalName = (paramName: string): string => {
    const param = gen.parameters.find(p => p.name === paramName)
    if (param && (param.min !== undefined || param.max !== undefined)) {
      return `${paramName}Clamped`
    }
    return paramName
  }

  // Generate parameter declarations
  const params = channelMode === 'stereo'
    ? [
      'bufferLength: i32',
      'sampleCount: i32',
      'sampleRate: f32',
      'nyquist: f32',
      'piOverNyquist: f32',
      'bpm: f32',
      'co: f32',
      'samplesPerBeat: f32',
      'samplesPerBar: f32',
      'inputLeft$: usize',
      'inputRight$: usize',
      'outputLeft$: usize',
      'outputRight$: usize',
      ...scalarParams.map(p => `${p}: f32`),
      ...audioParams.map(p => `${p}$: usize`),
    ]
    : [
      'bufferLength: i32',
      'sampleCount: i32',
      'sampleRate: f32',
      'nyquist: f32',
      'piOverNyquist: f32',
      'bpm: f32',
      'co: f32',
      'samplesPerBeat: f32',
      'samplesPerBar: f32',
      'input$: usize',
      'output$: usize',
      ...scalarParams.map(p => `${p}: f32`),
      ...audioParams.map(p => `${p}$: usize`),
    ]

  const lines: string[] = []

  lines.push(indent.write(`process(${params.join(', ')}): void {`))
  indent.indent() // Indent for method contents

  // Generate control block - only compute when scalar parameters or system parameters change
  let hasScalarParams = scalarParams.length > 0

  // Check which trackable system parameters are used in conditional control blocks (needed for later)
  const usedSystemParams = collectTrackableSystemParamsUsedInConditionalControl(allGroups)
  const hasConditionalGroups = Array.from(allGroups.keys()).some(k => k !== 'always' && k !== 'true')

  // Clamped variable declarations - only for parameters with min/max (needed regardless of conditional groups)
  if (hasScalarParams) {
    scalarParams.forEach(p => {
      const param = gen.parameters.find(par => par.name === p)
      if (!param) return
      if (param.min !== undefined || param.max !== undefined) {
        const clampExpr = getClampExpr(p, param)
        lines.push(indent.write(`const ${p}Clamped: f32 = ${clampExpr}`))
      }
    })
  }

  if (hasConditionalGroups) {
    // Change detection - only for parameters that are actually used in conditional blocks
    const paramsUsedInConditions = collectParamsUsedInConditions(allGroups, scalarParams)

    paramsUsedInConditions.forEach(p => {
      const lastName = `last${toPascalCase(p)}`
      const paramRef = getParamRef(p)
      lines.push(indent.write(`const ${p}Changed: boolean = ${paramRef} !== this.${lastName}`))
    })

    // Change detection for trackable system parameters if used in conditional control blocks
    usedSystemParams.forEach(param => {
      const lastName = `last${toPascalCase(param)}`
      lines.push(indent.write(`const ${param}Changed: boolean = ${param} !== this.${lastName}`))
    })

    lines.push('')

    // Sort groups: when one condition is subset of another, order by dependency - the block that sets vars
    // the other uses must run first. Moog: subset sets freqClamped, superset uses it → subset first.
    // SVF: superset sets w0, subset uses it → superset first.
    const blockSets = (stmts: Stmt[]) => new Set(stmts.filter((s): s is Stmt & { type: 'assign' } => s.type === 'assign').map(s => s.name))
    const blockUses = (stmts: Stmt[]) => {
      const uses = new Set<string>()
      stmts.forEach(s => {
        if (s.type === 'assign') collectIdentifiers(s.expr).forEach(id => uses.add(id))
        else if (s.type === 'if') collectIdentifiers(s.condition).forEach(id => uses.add(id))
      })
      return uses
    }
    const allControlSets = new Set(gen.control.filter((s): s is Stmt & { type: 'assign' } => s.type === 'assign').map(s => s.name))
    const sortedAllGroups = Array.from(allGroups.entries()).sort((a, b) => {
      if (a[0] === 'true') return 1
      if (b[0] === 'true') return -1
      const aCond = a[0]
      const bCond = b[0]
      const aTerms = new Set(aCond.split(/\s*\|\|\s*/).map((s: string) => s.trim()))
      const bTerms = new Set(bCond.split(/\s*\|\|\s*/).map((s: string) => s.trim()))
      const aSets = blockSets(a[1].control)
      const bSets = blockSets(b[1].control)
      const aUses = new Set([...blockUses(a[1].control)].filter(id => allControlSets.has(id)))
      const bUses = new Set([...blockUses(b[1].control)].filter(id => allControlSets.has(id)))
      if (aTerms.size < bTerms.size && [...aTerms].every((t: string) => bTerms.has(t))) {
        if ([...aUses].some(id => bSets.has(id))) return 1
        if ([...bUses].some(id => aSets.has(id))) return -1
        return -1
      }
      if (bTerms.size < aTerms.size && [...bTerms].every((t: string) => aTerms.has(t))) {
        if ([...bUses].some(id => aSets.has(id))) return -1
        if ([...aUses].some(id => bSets.has(id))) return 1
        return 1
      }
      const aFirstControl = a[1].control[0]
      const aFirstVariant = a[1].variant[0]
      const bFirstControl = b[1].control[0]
      const bFirstVariant = b[1].variant[0]

      // Compare control statements first
      if (aFirstControl && bFirstControl) {
        const aIdx = gen.control.indexOf(aFirstControl)
        const bIdx = gen.control.indexOf(bFirstControl)
        if (aIdx !== bIdx) return aIdx - bIdx
      }
      if (aFirstControl && !bFirstControl) return -1
      if (!aFirstControl && bFirstControl) return 1

      // Then compare variant statements
      if (aFirstVariant && bFirstVariant) {
        const aIdx = variant.stmts.indexOf(aFirstVariant)
        const bIdx = variant.stmts.indexOf(bFirstVariant)
        return aIdx - bIdx
      }
      return 0
    })

    // Sort statements within each group by original order
    sortedAllGroups.forEach(([condition, { control, variant: variantStmts }]) => {
      control.sort((a, b) => {
        const aIdx = gen.control.indexOf(a)
        const bIdx = gen.control.indexOf(b)
        return aIdx - bIdx
      })
      variantStmts.sort((a, b) => {
        const aIdx = variant.stmts.indexOf(a)
        const bIdx = variant.stmts.indexOf(b)
        return aIdx - bIdx
      })
    })

    // Check which parameters have single-parameter conditions (most specific)
    const singleParamConditions = new Set<string>()
    sortedAllGroups.forEach(([condition]) => {
      // If condition is just a single parameter (e.g., "cutoffChanged"), it's most specific
      if (scalarParams.some(p => condition === `${p}Changed`)) {
        singleParamConditions.add(condition)
      }
    })

    if (controlToAudioLocals.size > 0) {
      lines.push('')
      Array.from(controlToAudioLocals).sort().forEach(name => {
        const type = name.endsWith('SampleCount') ? 'i32' : 'f32'
        lines.push(indent.write(`let ${name}: ${type} = 0`))
      })
    }

    // Generate combined blocks
    sortedAllGroups.forEach(([condition, { control: controlStmts, variant: variantStmts }]) => {
      const isAlways = condition === 'true'
      lines.push('')
      if (!isAlways) {
        lines.push(indent.write(`if (${condition}) {`))
        indent.indent()
      }

      // Sort control statements: emit "if" before "assign" so conditions see previous frame values (e.g. prevTrig)
      // before we update them; then last* updates run after all control stmts
      const sortedControl = [...controlStmts].sort((a, b) => {
        const aIdx = gen.control.indexOf(a)
        const bIdx = gen.control.indexOf(b)
        if (a.type === 'if' && b.type !== 'if') return -1
        if (a.type !== 'if' && b.type === 'if') return 1
        return aIdx - bIdx
      })

      // Track which variables have been declared in this conditional block
      const declaredInBlock = new Set<string>()

      // Track which assignments were optimized (to skip them when generating if statement bodies)
      const optimizedAssignments = new Set<string>()

      // Vars assigned more than once in this block must be emitted in order, not optimized as one
      const assignCountInBlock = new Map<string, number>()
      sortedControl.forEach(s => {
        if (s.type === 'assign') {
          assignCountInBlock.set(s.name, (assignCountInBlock.get(s.name) ?? 0) + 1)
        }
      })

      // Collect expressions for optimization
      const expressionsToOptimize: Array<
        { stmt: Extract<Stmt, { type: 'assign' }>; expr: string; varInfo: VariableInfo }
      > = []

      // Helper to generate a statement recursively
      const collectAudioParamsInStmt = (stmt: Stmt, acc: Set<string>): void => {
        if (stmt.type === 'assign') {
          collectIdentifiers(stmt.expr).forEach(dep => {
            if (audioParams.includes(dep)) {
              acc.add(dep)
            }
          })
        }
        else if (stmt.type === 'if') {
          collectIdentifiers(stmt.condition).forEach(dep => {
            if (audioParams.includes(dep)) {
              acc.add(dep)
            }
          })
          stmt.thenBranch.forEach(s => collectAudioParamsInStmt(s, acc))
          stmt.elseBranch?.forEach(s => collectAudioParamsInStmt(s, acc))
        }
        else if (stmt.type === 'block') {
          stmt.stmts.forEach(s => collectAudioParamsInStmt(s, acc))
        }
        else if (stmt.type === 'forIn') {
          collectIdentifiers(stmt.iterable).forEach(dep => {
            if (audioParams.includes(dep)) {
              acc.add(dep)
            }
          })
          stmt.body.forEach(s => collectAudioParamsInStmt(s, acc))
        }
        else if (stmt.type === 'switch') {
          collectIdentifiers(stmt.expr).forEach(dep => {
            if (audioParams.includes(dep)) {
              acc.add(dep)
            }
          })
          stmt.cases.forEach(c => {
            if (c.value) {
              collectIdentifiers(c.value).forEach(dep => {
                if (audioParams.includes(dep)) {
                  acc.add(dep)
                }
              })
            }
            c.stmts.forEach(s => collectAudioParamsInStmt(s, acc))
          })
        }
      }

      const generateStmt = (
        stmt: Stmt,
        audioLocals: Set<string> = new Set(),
        allowAudioParams: boolean = false,
        collectMode: boolean = false,
      ): void => {
        if (stmt.type === 'assign') {
          const varInfo = analysis.variables.get(stmt.name)!

          // Check if this statement depends on audio parameters - skip if so
          const affectingParams = new Set<string>()
          const directDeps = collectIdentifiers(stmt.expr)
          directDeps.forEach(dep => {
            if (paramNamesSet.has(dep)) {
              affectingParams.add(dep)
            }
          })
          varInfo.dependencies.forEach(dep => {
            const params = traceToParameters(dep, analysis, paramNamesSet)
            params.forEach(p => affectingParams.add(p))
          })
          const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
          if (dependsOnAudio && !allowAudioParams) {
            return // Skip - will be computed in audio block
          }

          let expr = exprToString(stmt.expr)

          // Replace constants
          expr = replaceConstants(expr)

          // Replace parameter references
          gen.parameters.forEach(param => {
            const paramName = param.name
            if (effectiveParamModes[paramName] === 'scalar') {
              const paramRef = getParamRef(paramName)
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
            }
            else {
              if (audioLocals.has(paramName)) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
              }
              else if (allowAudioParams) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
              }
              else {
                const defaultValue = param.default?.toString() ?? '0'
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
              }
            }
          })

          // Replace variable references (but not property names after dots)
          varInfo.dependencies.forEach(dep => {
            const ref = getVarRef(dep, 'control')
            expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          })

          if (collectMode) {
            // Only optimize vars assigned once in this block; multiple assigns must be emitted in order
            if ((assignCountInBlock.get(stmt.name) ?? 0) === 1) {
              expressionsToOptimize.push({ stmt, expr, varInfo })
            }
          }
          else {
            if (varInfo.needsField) {
              lines.push(indent.write(`this.${stmt.name} = ${expr}`))
            }
            else if (controlToAudioLocals.has(stmt.name)) {
              lines.push(indent.write(`${stmt.name} = ${expr}`))
            }
            else {
              lines.push(indent.write(`const ${stmt.name}: f32 = ${expr}`))
              declaredInBlock.add(stmt.name)
            }
          }
        }
        else if (stmt.type === 'if') {
          if (collectMode) {
            // Don't collect assignments from inside if statements for optimization
            // They should remain conditional
            return
          }

          // Check if condition or body depends on audio parameters - skip if so
          const checkCondDeps = collectIdentifiers(stmt.condition)
          const checkConditionUsesAudio = Array.from(checkCondDeps).some(dep => audioParams.includes(dep))
          const checkBodyUsesAudio = stmt.thenBranch.some(s => {
            if (s.type === 'assign') {
              const affectingParams = new Set<string>()
              const directDeps = collectIdentifiers(s.expr)
              directDeps.forEach(dep => {
                if (paramNamesSet.has(dep)) {
                  affectingParams.add(dep)
                }
                else {
                  const params = traceToParameters(dep, analysis, paramNamesSet)
                  params.forEach(p => affectingParams.add(p))
                }
              })
              return audioParams.some(p => affectingParams.has(p))
            }
            return false
          }) || (stmt.elseBranch?.some(s => {
            if (s.type === 'assign') {
              const affectingParams = new Set<string>()
              const directDeps = collectIdentifiers(s.expr)
              directDeps.forEach(dep => {
                if (paramNamesSet.has(dep)) {
                  affectingParams.add(dep)
                }
                else {
                  const params = traceToParameters(dep, analysis, paramNamesSet)
                  params.forEach(p => affectingParams.add(p))
                }
              })
              return audioParams.some(p => affectingParams.has(p))
            }
            return false
          }) ?? false)

          if ((checkConditionUsesAudio || checkBodyUsesAudio) && !allowAudioParams) {
            return // Skip - will be computed in audio block
          }

          let cond = exprToString(stmt.condition)

          // Replace constants
          cond = replaceConstants(cond)

          // Replace parameter references in condition
          gen.parameters.forEach(param => {
            const paramName = param.name
            if (effectiveParamModes[paramName] === 'scalar') {
              const paramRef = getParamRef(paramName)
              cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
            }
            else {
              if (audioLocals.has(paramName)) {
                cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
              }
              else if (allowAudioParams) {
                cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
              }
              else {
                const defaultValue = param.default?.toString() ?? '0'
                cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
              }
            }
          })

          // Replace variable references in condition - need to replace in dependency order
          // First collect all dependencies
          const condDeps = collectIdentifiers(stmt.condition)
          const depsArray = Array.from(condDeps).sort((a, b) => {
            // Replace longer names first to avoid partial matches
            return b.length - a.length
          })

          depsArray.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              const ref = getVarRef(dep, 'control')
              cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
            }
          })

          lines.push(indent.write(`if (${cond}) {`))
          indent.indent()

          const conditionUsesAudio = Array.from(condDeps).some(dep => audioParams.includes(dep))
          const allowBranchAudioParams = allowAudioParams || !conditionUsesAudio
          const thenAudioParams = new Set<string>()
          collectAudioParamsInStmt({ type: 'block', stmts: stmt.thenBranch }, thenAudioParams)
          const thenAudioLocals = new Set(audioLocals)
          Array.from(thenAudioParams).sort().forEach(paramName => {
            const localName = getAudioLocalName(paramName)
            lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
            thenAudioLocals.add(paramName)
          })
          stmt.thenBranch.forEach(s => generateStmt(s, thenAudioLocals, allowBranchAudioParams, collectMode))

          if (stmt.elseBranch && stmt.elseBranch.length > 0) {
            // Check if else branch is a single if statement (for else if)
            const isElseIf = stmt.elseBranch.length === 1 && stmt.elseBranch[0].type === 'if'

            if (isElseIf) {
              const nestedIf = stmt.elseBranch[0] as { type: 'if'; condition: Expr; thenBranch: Stmt[];
                elseBranch?: Stmt[] }

              // Generate else if
              indent.dedent()

              let elseCond = exprToString(nestedIf.condition)
              elseCond = replaceConstants(elseCond)

              gen.parameters.forEach(param => {
                const paramName = param.name
                if (effectiveParamModes[paramName] === 'scalar') {
                  const paramRef = getParamRef(paramName)
                  elseCond = elseCond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
                }
                else {
                  if (audioLocals.has(paramName)) {
                    elseCond = elseCond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
                  }
                  else if (allowAudioParams) {
                    elseCond = elseCond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
                  }
                  else {
                    const defaultValue = param.default?.toString() ?? '0'
                    elseCond = elseCond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
                  }
                }
              })

              const elseCondDeps = collectIdentifiers(nestedIf.condition)
              const elseDepsArray = Array.from(elseCondDeps).sort((a, b) => b.length - a.length)
              elseDepsArray.forEach(dep => {
                if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
                  const ref = getVarRef(dep, 'control')
                  elseCond = elseCond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
                }
              })

              lines.push(indent.write(`} else if (${elseCond}) {`))
              indent.indent()

              const elseConditionUsesAudio = Array.from(elseCondDeps).some(dep => audioParams.includes(dep))
              const allowElseBranchAudioParams = allowAudioParams || !elseConditionUsesAudio
              const elseThenAudioParams = new Set<string>()
              collectAudioParamsInStmt({ type: 'block', stmts: nestedIf.thenBranch }, elseThenAudioParams)
              const elseThenAudioLocals = new Set(audioLocals)
              Array.from(elseThenAudioParams).sort().forEach(paramName => {
                const localName = getAudioLocalName(paramName)
                lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
                elseThenAudioLocals.add(paramName)
              })
              nestedIf.thenBranch.forEach(s =>
                generateStmt(s, elseThenAudioLocals, allowElseBranchAudioParams, collectMode)
              )

              // Recursively handle nested else/else if
              if (nestedIf.elseBranch && nestedIf.elseBranch.length > 0) {
                const nestedIsElseIf = nestedIf.elseBranch.length === 1 && nestedIf.elseBranch[0].type === 'if'
                if (nestedIsElseIf) {
                  // Recursively generate by creating a temporary if statement
                  generateStmt(
                    { type: 'if', condition: { type: 'number', value: 1 }, thenBranch: [],
                      elseBranch: nestedIf.elseBranch } as any,
                    audioLocals,
                    allowAudioParams,
                    collectMode,
                  )
                  // Remove the dummy if that was generated
                  const lastLines = lines.slice(-2)
                  if (lastLines[0]?.includes('if (1)') && lastLines[1]?.includes('}')) {
                    lines.splice(-2, 2)
                  }
                }
                else {
                  indent.dedent()
                  lines.push(indent.write('} else {'))
                  indent.indent()
                  const nestedElseAudioParams = new Set<string>()
                  collectAudioParamsInStmt({ type: 'block', stmts: nestedIf.elseBranch }, nestedElseAudioParams)
                  const nestedElseAudioLocals = new Set(audioLocals)
                  Array.from(nestedElseAudioParams).sort().forEach(paramName => {
                    const localName = getAudioLocalName(paramName)
                    lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
                    nestedElseAudioLocals.add(paramName)
                  })
                  nestedIf.elseBranch.forEach(s =>
                    generateStmt(s, nestedElseAudioLocals, allowElseBranchAudioParams, collectMode)
                  )
                  indent.dedent()
                  lines.push(indent.write('}'))
                }
              }
              else {
                indent.dedent()
                lines.push(indent.write('}'))
              }
            }
            else {
              indent.dedent()
              lines.push(indent.write('} else {'))
              indent.indent()
              const elseAudioParams = new Set<string>()
              collectAudioParamsInStmt({ type: 'block', stmts: stmt.elseBranch }, elseAudioParams)
              const elseAudioLocals = new Set(audioLocals)
              Array.from(elseAudioParams).sort().forEach(paramName => {
                const localName = getAudioLocalName(paramName)
                lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
                elseAudioLocals.add(paramName)
              })
              stmt.elseBranch.forEach(s => generateStmt(s, elseAudioLocals, allowBranchAudioParams, collectMode))
              indent.dedent()
              lines.push(indent.write('}'))
            }
          }
          else {
            indent.dedent()
            lines.push(indent.write('}'))
          }
        }
        else if (stmt.type === 'block') {
          stmt.stmts.forEach(s => generateStmt(s, audioLocals, allowAudioParams, collectMode))
        }
        else if (stmt.type === 'expr') {
          if (collectMode) return

          let expr = exprToString(stmt.expr)

          // Replace constants
          expr = replaceConstants(expr)

          gen.parameters.forEach(param => {
            const paramName = param.name
            if (effectiveParamModes[paramName] === 'scalar') {
              const paramRef = getParamRef(paramName)
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
            }
            else {
              if (audioLocals.has(paramName)) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
              }
              else if (allowAudioParams) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
              }
              else {
                const defaultValue = param.default?.toString() ?? '0'
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
              }
            }
          })

          const exprDeps = collectIdentifiers(stmt.expr)
          exprDeps.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              const ref = getVarRef(dep, 'control')
              expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
            }
          })

          lines.push(indent.write(expr))
        }
        else if (stmt.type === 'forIn') {
          if (collectMode) {
            stmt.body.forEach(s => generateStmt(s, audioLocals, allowAudioParams, collectMode))
            return
          }

          let iterable = exprToString(stmt.iterable)
          const iterDeps = collectIdentifiers(stmt.iterable)

          gen.parameters.forEach(param => {
            const paramName = param.name
            if (effectiveParamModes[paramName] === 'scalar') {
              const paramRef = getParamRef(paramName)
              iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
            }
            else {
              if (audioLocals.has(paramName)) {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
              }
              else if (allowAudioParams) {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
              }
              else {
                const defaultValue = param.default?.toString() ?? '0'
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
              }
            }
          })

          iterDeps.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              const ref = getVarRef(dep, 'control')
              iterable = iterable.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
            }
          })

          lines.push(indent.write(`for (let i = 0; i < ${iterable}.length; i++) {`))
          indent.indent()
          lines.push(indent.write(`const ${stmt.varName} = ${iterable}[i]`))

          const bodyAudioParams = new Set<string>()
          if (allowAudioParams) {
            collectAudioParamsInStmt({ type: 'block', stmts: stmt.body }, bodyAudioParams)
          }
          const bodyAudioLocals = new Set(audioLocals)
          Array.from(bodyAudioParams).sort().forEach(paramName => {
            const localName = getAudioLocalName(paramName)
            lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
            bodyAudioLocals.add(paramName)
          })

          stmt.body.forEach(s => generateStmt(s, bodyAudioLocals, allowAudioParams, collectMode))

          indent.dedent()
          lines.push(indent.write('}'))
        }
        else if (stmt.type === 'switch') {
          if (collectMode) {
            stmt.cases.forEach(c => c.stmts.forEach(s => generateStmt(s, audioLocals, allowAudioParams, collectMode)))
            return
          }

          let switchExpr = exprToString(stmt.expr)
          const switchDeps = collectIdentifiers(stmt.expr)

          // Replace constants
          switchExpr = replaceConstants(switchExpr)

          gen.parameters.forEach(param => {
            const paramName = param.name
            if (effectiveParamModes[paramName] === 'scalar') {
              const paramRef = getParamRef(paramName)
              switchExpr = switchExpr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
            }
            else {
              if (audioLocals.has(paramName)) {
                switchExpr = switchExpr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
              }
              else if (allowAudioParams) {
                switchExpr = switchExpr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
              }
              else {
                const defaultValue = param.default?.toString() ?? '0'
                switchExpr = switchExpr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
              }
            }
          })

          switchDeps.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              const ref = getVarRef(dep, 'control')
              switchExpr = switchExpr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
            }
          })

          lines.push(indent.write(`switch (${switchExpr}) {`))
          indent.indent()

          stmt.cases.forEach((caseItem, idx) => {
            if (caseItem.value) {
              let caseValue = exprToString(caseItem.value)
              const caseDeps = collectIdentifiers(caseItem.value)

              // Replace constants
              caseValue = replaceConstants(caseValue)

              gen.parameters.forEach(param => {
                const paramName = param.name
                if (effectiveParamModes[paramName] === 'scalar') {
                  const paramRef = getParamRef(paramName)
                  caseValue = caseValue.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
                }
                else {
                  if (audioLocals.has(paramName)) {
                    caseValue = caseValue.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioLocalName(paramName))
                  }
                  else if (allowAudioParams) {
                    caseValue = caseValue.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
                  }
                  else {
                    const defaultValue = param.default?.toString() ?? '0'
                    caseValue = caseValue.replace(new RegExp(`\\b${paramName}\\b`, 'g'), defaultValue)
                  }
                }
              })

              caseDeps.forEach(dep => {
                if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
                  const ref = getVarRef(dep, 'control')
                  caseValue = caseValue.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
                }
              })

              lines.push(indent.write(`case ${caseValue}:`))
            }
            else {
              lines.push(indent.write('default:'))
            }

            indent.indent()
            const caseAudioParams = new Set<string>()
            collectAudioParamsInStmt({ type: 'block', stmts: caseItem.stmts }, caseAudioParams)
            const caseAudioLocals = new Set(audioLocals)
            Array.from(caseAudioParams).sort().forEach(paramName => {
              const localName = getAudioLocalName(paramName)
              lines.push(indent.write(`const ${localName}: f32 = ${getAudioParamRef(paramName)}`))
              caseAudioLocals.add(paramName)
            })
            caseItem.stmts.forEach(s => generateStmt(s, caseAudioLocals, allowAudioParams, collectMode))
            indent.dedent()
          })

          indent.dedent()
          lines.push(indent.write('}'))
        }
        else if (stmt.type === 'break') {
          if (collectMode) return
          lines.push(indent.write('break'))
        }
        else if (stmt.type === 'continue') {
          if (collectMode) return
          lines.push(indent.write('continue'))
        }
      }

      // First pass: collect expressions for optimization
      sortedControl.forEach(stmt => generateStmt(stmt, new Set(), false, true))

      // Optimize collected expressions and keep results keyed by var name for ordered output
      const optimizedByVarName = new Map<string, { optimizedExpr: string; needsField: boolean }>()
      const blockVars = new Set(sortedControl.filter((s): s is Stmt & { type: 'assign' } => s.type === 'assign').map(s => s.name))
      const declRefs = (decl: string): { block: Set<string>; opt: Set<string> } => {
        const m = decl.match(/=\s*(.+)$/)
        const rhsExpr = m ? m[1] : ''
        const block = new Set<string>()
        const opt = new Set<string>()
        for (const mat of rhsExpr.matchAll(/(?:this\.)?([a-zA-Z_]\w*)/g)) {
          const name = mat[1]
          if (name.startsWith('__opt')) opt.add(name)
          else if (blockVars.has(name)) block.add(name)
        }
        return { block, opt }
      }
      let declarations: string[] = []
      if (expressionsToOptimize.length > 0) {
        const exprs = expressionsToOptimize.map(e => e.expr)
        const result = optimizeExpressions(exprs)
        declarations = result.declarations

        expressionsToOptimize.forEach((item, idx) => {
          optimizedByVarName.set(item.stmt.name, {
            optimizedExpr: result.optimized[idx],
            needsField: item.varInfo.needsField,
          })
        })

        // Clear for next block
        expressionsToOptimize.length = 0
      }

      const assignedInBlock = new Set<string>()
      const emittedOpts = new Set<string>()
      const emitReadyDecls = (): void => {
        for (let i = 0; i < declarations.length; i++) {
          const decl = declarations[i]
          const optName = decl.match(/^const\s+(\w+)/)?.[1]
          if (optName && emittedOpts.has(optName)) continue
          const { block, opt } = declRefs(decl)
          const blockReady = [...block].every(r => assignedInBlock.has(r))
          const optReady = [...opt].every(r => emittedOpts.has(r))
          if (blockReady && optReady) {
            lines.push(indent.write(decl))
            if (optName) emittedOpts.add(optName)
          }
        }
      }

      // Emit control in sorted order so rising-edge if (e.g. trig > 0 && prevTrig <= 0) runs before prevTrig = trig
      sortedControl.forEach(stmt => {
        emitReadyDecls()
        const opt = stmt.type === 'assign' ? optimizedByVarName.get(stmt.name) : undefined
        if (opt && 'name' in stmt) {
          optimizedAssignments.add(stmt.name)
          if (opt.needsField) {
            const rhs = continuityExprForI32(stmt.name, opt.optimizedExpr)
            lines.push(indent.write(`this.${stmt.name} = ${rhs}`))
          }
          else if (controlToAudioLocals.has(stmt.name)) {
            const rhs = continuityExprForI32(stmt.name, opt.optimizedExpr)
            lines.push(indent.write(`${stmt.name} = ${rhs}`))
          }
          else {
            lines.push(indent.write(`const ${stmt.name}: f32 = ${opt.optimizedExpr}`))
            declaredInBlock.add(stmt.name)
          }
          assignedInBlock.add(stmt.name)
        }
        else if (stmt.type !== 'assign' || !optimizedAssignments.has(stmt.name)) {
          generateStmt(stmt)
        }
      })
      emitReadyDecls()

      // Update last* values after control statements so rising-edge conditions (e.g. trig > 0 && prevTrig <= 0) see previous values
      if (!isAlways) {
        scalarParams.forEach(param => {
          const changedVar = `${param}Changed`
          const singleCondition = `${param}Changed`
          if (condition.includes(changedVar)) {
            if (condition === singleCondition || !singleParamConditions.has(singleCondition)) {
              const lastName = `last${toPascalCase(param)}`
              const paramRef = getParamRef(param)
              lines.push(indent.write(`this.${lastName} = ${paramRef}`))
            }
          }
        })
        usedSystemParams.forEach(param => {
          const changedVar = `${param}Changed`
          if (condition.includes(changedVar)) {
            const lastName = `last${toPascalCase(param)}`
            lines.push(indent.write(`this.${lastName} = ${param}`))
          }
        })
      }

      // Sort variant statements by original order
      const sortedVariant = [...variantStmts].sort((a, b) => {
        const aIdx = variant.stmts.indexOf(a)
        const bIdx = variant.stmts.indexOf(b)
        return aIdx - bIdx
      })

      // Collect variant expressions for optimization
      const variantExpressionsToOptimize: Array<
        { stmt: Extract<Stmt, { type: 'assign' }>; expr: string; varInfo: VariableInfo }
      > = []

      sortedVariant.forEach(stmt => {
        if (stmt.type === 'assign') {
          const varInfo = analysis.variables.get(stmt.name)!

          // Check if this statement depends on audio parameters or audio-block vars - skip if so
          const directDeps = collectIdentifiers(stmt.expr)
          if (Array.from(directDeps).some(dep => audioBlockAssignedVars.has(dep))) {
            return // Skip - will be computed in audio block after state update
          }
          const affectingParams = new Set<string>()
          directDeps.forEach(dep => {
            if (paramNamesSet.has(dep)) {
              affectingParams.add(dep)
            }
          })
          varInfo.dependencies.forEach(dep => {
            const params = traceToParameters(dep, analysis, paramNamesSet)
            params.forEach(p => affectingParams.add(p))
          })
          const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
          if (dependsOnAudio) {
            return // Skip - will be computed in audio block
          }

          let expr = exprToString(stmt.expr)

          // Replace constants
          expr = replaceConstants(expr)

          // Replace scalar parameters with clamped versions (if min/max defined)
          scalarParams.forEach(p => {
            expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), getParamRef(p))
          })

          varInfo.dependencies.forEach(dep => {
            const ref = getVarRef(dep, 'variant')
            expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          })

          variantExpressionsToOptimize.push({ stmt, expr, varInfo })
        }
      })

      // Optimize variant expressions
      if (variantExpressionsToOptimize.length > 0) {
        const exprs = variantExpressionsToOptimize.map(e => e.expr)
        const { optimized, declarations } = optimizeExpressions(exprs)

        // Output optimization variable declarations
        declarations.forEach(decl => {
          lines.push(indent.write(decl))
        })

        // Track which variables have been assigned and their expressions for value reuse
        const assignedVars = new Map<string, string>()

        // Output optimized statements
        variantExpressionsToOptimize.forEach((item, idx) => {
          const optimizedExpr = optimized[idx]

          // Check if this expression matches a previously assigned variable
          // Prefer optimization variables (start with __opt) over field references
          let reuseVar: string | undefined

          // First check if the optimized expression is just an optimization variable
          if (optimizedExpr.match(/^__opt\d+$/)) {
            // It's already just an optimization variable, use it directly
            reuseVar = undefined
          }
          else {
            // Check if we've seen this expression before
            for (const [varName, varExpr] of assignedVars.entries()) {
              if (varExpr === optimizedExpr) {
                reuseVar = varName
                break
              }
            }
          }

          if (item.varInfo.needsField) {
            if (reuseVar) {
              lines.push(indent.write(`this.${item.stmt.name} = this.${reuseVar}`))
            }
            else {
              lines.push(indent.write(`this.${item.stmt.name} = ${optimizedExpr}`))
              assignedVars.set(item.stmt.name, optimizedExpr)
            }
          }
          else {
            if (controlToAudioLocals.has(item.stmt.name)) {
              if (reuseVar) {
                lines.push(indent.write(`${item.stmt.name} = ${reuseVar}`))
              }
              else {
                lines.push(indent.write(`${item.stmt.name} = ${optimizedExpr}`))
                assignedVars.set(item.stmt.name, optimizedExpr)
              }
            }
            else if (declaredInBlock.has(item.stmt.name)) {
              if (reuseVar) {
                lines.push(indent.write(`${item.stmt.name} = ${reuseVar}`))
              }
              else {
                lines.push(indent.write(`${item.stmt.name} = ${optimizedExpr}`))
                assignedVars.set(item.stmt.name, optimizedExpr)
              }
            }
            else {
              if (reuseVar) {
                lines.push(indent.write(`const ${item.stmt.name}: f32 = ${reuseVar}`))
              }
              else {
                lines.push(indent.write(`const ${item.stmt.name}: f32 = ${optimizedExpr}`))
                assignedVars.set(item.stmt.name, optimizedExpr)
              }
              declaredInBlock.add(item.stmt.name)
            }
          }
        })
      }

      if (!isAlways) {
        indent.dedent()
        lines.push(indent.write('}'))
      }
    })
  }
  else {
    // No conditional groups, but may need to detect system param changes or use clamped variables
    if (usedSystemParams.size > 0) {
      // Change detection for trackable system parameters if used in conditional control blocks
      usedSystemParams.forEach(param => {
        const lastName = `last${toPascalCase(param)}`
        lines.push(indent.write(`const ${param}Changed: boolean = ${param} !== this.${lastName}`))
      })
      lines.push('')
    }

    if (controlToAudioLocals.size > 0) {
      lines.push('')
      Array.from(controlToAudioLocals).sort().forEach(name => {
        const type = name.endsWith('SampleCount') ? 'i32' : 'f32'
        lines.push(indent.write(`let ${name}: ${type} = 0`))
      })
    }

    // Track which variables have been declared
    const declaredInBlock = new Set<string>()

    const generateControlStmt = (stmt: Stmt): void => {
      if (stmt.type === 'assign') {
        const varInfo = analysis.variables.get(stmt.name)!

        // Check if this statement depends on audio parameters - skip if so
        const affectingParams = new Set<string>()
        const directDeps = collectIdentifiers(stmt.expr)
        directDeps.forEach(dep => {
          if (paramNamesSet.has(dep)) {
            affectingParams.add(dep)
          }
        })
        varInfo.dependencies.forEach(dep => {
          const params = traceToParameters(dep, analysis, paramNamesSet)
          params.forEach(p => affectingParams.add(p))
        })
        const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
        if (dependsOnAudio) {
          return // Skip - will be computed in audio block
        }

        let expr = exprToString(stmt.expr)

        // Replace variable references
        varInfo.dependencies.forEach(dep => {
          const ref = getVarRef(dep, 'control')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        })

        if (varInfo.needsField) {
          const rhs = continuityExprForI32(stmt.name, expr)
          lines.push(indent.write(`this.${stmt.name} = ${rhs}`))
        }
        else if (controlToAudioLocals.has(stmt.name)) {
          const rhs = continuityExprForI32(stmt.name, expr)
          lines.push(indent.write(`${stmt.name} = ${rhs}`))
        }
        else {
          lines.push(indent.write(`const ${stmt.name}: f32 = ${expr}`))
          declaredInBlock.add(stmt.name)
        }
      }
      else if (stmt.type === 'if') {
        // Check if condition or body depends on audio parameters - skip if so
        const condDeps = collectIdentifiers(stmt.condition)
        const conditionUsesAudio = Array.from(condDeps).some(dep => audioParams.includes(dep))
        const bodyUsesAudio = stmt.thenBranch.some(s => {
          if (s.type === 'assign') {
            const affectingParams = new Set<string>()
            const directDeps = collectIdentifiers(s.expr)
            directDeps.forEach(dep => {
              if (paramNamesSet.has(dep)) {
                affectingParams.add(dep)
              }
              else {
                const params = traceToParameters(dep, analysis, paramNamesSet)
                params.forEach(p => affectingParams.add(p))
              }
            })
            return audioParams.some(p => affectingParams.has(p))
          }
          return false
        }) || (stmt.elseBranch?.some(s => {
          if (s.type === 'assign') {
            const affectingParams = new Set<string>()
            const directDeps = collectIdentifiers(s.expr)
            directDeps.forEach(dep => {
              if (paramNamesSet.has(dep)) {
                affectingParams.add(dep)
              }
              else {
                const params = traceToParameters(dep, analysis, paramNamesSet)
                params.forEach(p => affectingParams.add(p))
              }
            })
            return audioParams.some(p => affectingParams.has(p))
          }
          return false
        }) ?? false)

        if (conditionUsesAudio || bodyUsesAudio) {
          return // Skip - will be computed in audio block
        }

        // Generate if statement with condition preserved
        let cond = exprToString(stmt.condition)
        cond = replaceConstants(cond)

        // Replace parameter references in condition
        gen.parameters.forEach(param => {
          const paramName = param.name
          if (effectiveParamModes[paramName] === 'scalar') {
            const paramRef = getParamRef(paramName)
            cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
          }
        })

        // Replace variable references in condition
        const condDepsArray = Array.from(condDeps).sort((a, b) => b.length - a.length)
        condDepsArray.forEach(dep => {
          if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
            const ref = getVarRef(dep, 'control')
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        })

        lines.push(indent.write(`if (${cond}) {`))
        indent.indent()
        stmt.thenBranch.forEach(generateControlStmt)
        if (stmt.elseBranch && stmt.elseBranch.length > 0) {
          indent.dedent()
          lines.push(indent.write('} else {'))
          indent.indent()
          stmt.elseBranch.forEach(generateControlStmt)
        }
        indent.dedent()
        lines.push(indent.write('}'))
      }
    }

    gen.control.forEach(generateControlStmt)

    // Update last* values for trackable system parameters if they changed
    if (usedSystemParams.size > 0) {
      usedSystemParams.forEach(param => {
        const lastName = `last${toPascalCase(param)}`
        lines.push(indent.write(`this.${lastName} = ${param}`))
      })
    }

    // Helper to generate variant statements recursively
    const generateVariantStmt = (stmt: Stmt): void => {
      if (stmt.type === 'assign') {
        const varInfo = analysis.variables.get(stmt.name)!

        // Check if this statement depends on audio parameters or audio-block vars - skip if so
        const directDeps = collectIdentifiers(stmt.expr)
        if (Array.from(directDeps).some(dep => audioBlockAssignedVars.has(dep))) {
          return // Skip - will be computed in audio block after state update
        }
        const affectingParams = new Set<string>()
        directDeps.forEach(dep => {
          if (paramNamesSet.has(dep)) {
            affectingParams.add(dep)
          }
        })
        varInfo.dependencies.forEach(dep => {
          const params = traceToParameters(dep, analysis, paramNamesSet)
          params.forEach(p => affectingParams.add(p))
        })
        const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
        if (dependsOnAudio) {
          return // Skip - will be computed in audio block
        }

        let expr = exprToString(stmt.expr)

        // Replace constants
        expr = replaceConstants(expr)

        // Replace scalar parameters with clamped versions (if min/max defined)
        scalarParams.forEach(p => {
          expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), getParamRef(p))
        })

        // Replace variable references based on analysis
        varInfo.dependencies.forEach(dep => {
          const ref = getVarRef(dep, 'variant')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        })

        if (varInfo.needsField) {
          lines.push(indent.write(`this.${stmt.name} = ${expr}`))
        }
        else if (controlToAudioLocals.has(stmt.name)) {
          lines.push(indent.write(`${stmt.name} = ${expr}`))
        }
        else if (declaredInBlock.has(stmt.name)) {
          lines.push(indent.write(`${stmt.name} = ${expr}`))
        }
        else {
          lines.push(indent.write(`const ${stmt.name}: f32 = ${expr}`))
          declaredInBlock.add(stmt.name)
        }
      }
      else if (stmt.type === 'if') {
        let cond = exprToString(stmt.condition)

        // Replace constants
        cond = replaceConstants(cond)

        // Replace parameter references in condition
        gen.parameters.forEach(param => {
          const paramName = param.name
          if (effectiveParamModes[paramName] === 'scalar') {
            cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getParamRef(paramName))
          }
          else {
            cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), getAudioParamRef(paramName))
          }
        })

        // Replace variable references in condition
        const condDeps = collectIdentifiers(stmt.condition)
        condDeps.forEach(dep => {
          if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
            const ref = getVarRef(dep, 'variant')
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        })

        lines.push(indent.write(`if (${cond}) {`))
        indent.indent()

        stmt.thenBranch.forEach(generateVariantStmt)

        if (stmt.elseBranch && stmt.elseBranch.length > 0) {
          indent.dedent()
          lines.push(indent.write('} else {'))
          indent.indent()
          stmt.elseBranch.forEach(generateVariantStmt)
        }

        indent.dedent()
        lines.push(indent.write('}'))
      }
      else if (stmt.type === 'block') {
        stmt.stmts.forEach(generateVariantStmt)
      }
    }

    // Generate variant computations
    variant.stmts.forEach(generateVariantStmt)
  }

  lines.push('')

  // Audio setup - only generate variables that are actually used
  const audioVars = collectVariables(audioBlock)

  const audioUsedBeforeAssigned = new Set<string>()
  const findAudioAssignments = (stmts: Stmt[]): Map<string, number> => {
    const assignments = new Map<string, number>()
    let index = 0

    const walk = (s: Stmt): void => {
      if (s.type === 'assign') {
        if (!assignments.has(s.name)) {
          assignments.set(s.name, index)
        }
        index++
      }
      else if (s.type === 'block') {
        s.stmts.forEach(walk)
      }
      else if (s.type === 'if') {
        s.thenBranch.forEach(walk)
        s.elseBranch?.forEach(walk)
        index++
      }
      else if (s.type === 'forIn') {
        s.body.forEach(walk)
        index++
      }
      else if (s.type === 'expr') {
        index++
      }
    }

    stmts.forEach(walk)
    return assignments
  }

  const findAudioUses = (stmts: Stmt[]): Map<string, number> => {
    const uses = new Map<string, number>()
    let index = 0

    const walk = (s: Stmt): void => {
      const recordUse = (dep: string): void => {
        if (!systemParams.has(dep) && !paramNamesSet.has(dep) && !uses.has(dep)) {
          uses.set(dep, index)
        }
      }
      if (s.type === 'assign') {
        collectIdentifiers(s.expr).forEach(recordUse)
        index++
      }
      else if (s.type === 'if') {
        collectIdentifiers(s.condition).forEach(recordUse)
        s.thenBranch.forEach(walk)
        s.elseBranch?.forEach(walk)
        index++
      }
      else if (s.type === 'forIn') {
        collectIdentifiers(s.iterable).forEach(recordUse)
        s.body.forEach(walk)
        index++
      }
      else if (s.type === 'block') {
        s.stmts.forEach(walk)
      }
      else if (s.type === 'expr') {
        collectIdentifiers(s.expr).forEach(recordUse)
        index++
      }
    }

    stmts.forEach(walk)
    return uses
  }

  // Collect audio-dependent statements to know which vars to exclude
  const audioDependentVarsForExclusion = new Set<string>()
  const audioDependentStmtsForExclusion: Stmt[] = []
  gen.control.forEach(stmt => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      const affectingParams = new Set<string>()
      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (paramNamesSet.has(dep)) {
          affectingParams.add(dep)
        }
      })
      varInfo.dependencies.forEach(dep => {
        const params = traceToParameters(dep, analysis, paramNamesSet)
        params.forEach(p => affectingParams.add(p))
      })
      const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
      if (dependsOnAudio) {
        audioDependentStmtsForExclusion.push(stmt)
        audioDependentVarsForExclusion.add(stmt.name)
      }
    }
  })
  variant.stmts.forEach(stmt => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      const affectingParams = new Set<string>()
      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (paramNamesSet.has(dep)) {
          affectingParams.add(dep)
        }
      })
      varInfo.dependencies.forEach(dep => {
        const params = traceToParameters(dep, analysis, paramNamesSet)
        params.forEach(p => affectingParams.add(p))
      })
      const dependsOnAudio = audioParams.some(p => affectingParams.has(p))
      if (dependsOnAudio) {
        audioDependentStmtsForExclusion.push(stmt)
        audioDependentVarsForExclusion.add(stmt.name)
      }
    }
  })

  // Also add variables that depend on audio-dependent vars
  audioDependentStmtsForExclusion.forEach(stmt => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      varInfo.dependents.forEach(dep => {
        const depInfo = analysis.variables.get(dep)
        if (depInfo) {
          depInfo.dependencies.forEach(d => {
            if (audioDependentVarsForExclusion.has(d)) {
              audioDependentVarsForExclusion.add(dep)
            }
          })
        }
      })
    }
  })

  const audioAssignedSomewhere = new Set<string>(Array.from(findAudioAssignments(audioBlock).keys()))
  const audioFlowUsedBeforeAssigned = collectUsedBeforeAssignedWithControlFlow(
    audioBlock,
    name => audioAssignedSomewhere.has(name) && !systemParams.has(name) && !paramNamesSet.has(name),
  )
  audioFlowUsedBeforeAssigned.forEach(name => audioUsedBeforeAssigned.add(name))

  // Fetch field variables into locals for faster access
  // Exclude variables assigned per-sample and audio-dependent vars
  const fieldVarsUsedInAudio = new Set<string>()
  const addFieldVarIfNeeded = (id: string): void => {
    if (fieldNames.has(id)) {
      fieldVarsUsedInAudio.add(id)
      return
    }
    const varInfo = analysis.variables.get(id)
    if (varInfo && varInfo.needsField && id !== 'input' && id !== 'output') {
      fieldVarsUsedInAudio.add(id)
    }
  }
  const collectFieldVarsFromAudio = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      collectIdentifiers(stmt.expr).forEach(addFieldVarIfNeeded)
    }
    else if (stmt.type === 'expr') {
      collectIdentifiers(stmt.expr).forEach(addFieldVarIfNeeded)
    }
    else if (stmt.type === 'if') {
      collectIdentifiers(stmt.condition).forEach(addFieldVarIfNeeded)
      stmt.thenBranch.forEach(collectFieldVarsFromAudio)
      stmt.elseBranch?.forEach(collectFieldVarsFromAudio)
    }
    else if (stmt.type === 'forIn') {
      collectIdentifiers(stmt.iterable).forEach(addFieldVarIfNeeded)
      stmt.body.forEach(collectFieldVarsFromAudio)
    }
    else if (stmt.type === 'switch') {
      collectIdentifiers(stmt.expr).forEach(addFieldVarIfNeeded)
      stmt.cases.forEach(c => {
        if (c.value) {
          collectIdentifiers(c.value).forEach(addFieldVarIfNeeded)
        }
        c.stmts.forEach(collectFieldVarsFromAudio)
      })
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(collectFieldVarsFromAudio)
    }
  }
  audioBlock.forEach(collectFieldVarsFromAudio)

  // Determine state variables: used before assignment in audio (must fetch from this and write back)
  // Exclude vars assigned in control — they are set before the audio loop and need not persist
  const stateVars = Array.from(analysis.variables.values())
    .filter(v =>
      v.assignedIn.has('audio')
      && v.usedIn.has('audio')
      && audioVars.has(v.name)
      && audioUsedBeforeAssigned.has(v.name)
      && !variantAfterAudioLhsSetTop.has(v.name)
      && !v.assignedIn.has('control')
    )
    .map(v => v.name)

  // Also include DSL-defined fields that are assigned in audio block
  gen.fields.forEach(f => {
    if (audioVars.has(f.name) && !stateVars.includes(f.name)) {
      stateVars.push(f.name)
    }
  })

  stateVars.forEach(v => {
    const fieldType = fieldTypes.get(v)
    const type = fieldType ?? (v.endsWith('SampleCount') ? 'i32' : 'f32')
    lines.push(indent.write(`let ${v}: ${type} = this.${v}`))
  })

  // Declare input and output variables
  if (channelMode === 'stereo') {
    if (audioVars.has('inputLeft')
      || audioBlock.some(stmt =>
        (stmt.type === 'assign' && collectIdentifiers(stmt.expr).has('inputLeft'))
        || (stmt.type === 'expr' && collectIdentifiers(stmt.expr).has('inputLeft'))
      ))
    {
      lines.push(indent.write('let inputLeft: f32'))
    }
    if (audioVars.has('inputRight')
      || audioBlock.some(stmt =>
        (stmt.type === 'assign' && collectIdentifiers(stmt.expr).has('inputRight'))
        || (stmt.type === 'expr' && collectIdentifiers(stmt.expr).has('inputRight'))
      ))
    {
      lines.push(indent.write('let inputRight: f32'))
    }
    if (audioVars.has('outputLeft')) {
      lines.push(indent.write('let outputLeft: f32'))
    }
    if (audioVars.has('outputRight')) {
      lines.push(indent.write('let outputRight: f32'))
    }
  }
  else {
    if (audioVars.has('input')
      || audioBlock.some(stmt => stmt.type === 'assign' && collectIdentifiers(stmt.expr).has('input')))
    {
      lines.push(indent.write('let input: f32'))
    }
    if (audioVars.has('output')) {
      lines.push(indent.write('let output: f32'))
    }
  }

  // Collect audio parameters used in the audio block (before other declarations)
  const audioParamsInAudioBlock = new Set<string>()
  const collectAudioBlockParams = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      collectIdentifiers(stmt.expr).forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInAudioBlock.add(dep)
        }
      })
      // Also check the assignment target if it's a parameter
      if (audioParams.includes(stmt.name)) {
        audioParamsInAudioBlock.add(stmt.name)
      }
    }
    else if (stmt.type === 'if') {
      collectIdentifiers(stmt.condition).forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInAudioBlock.add(dep)
        }
      })
      stmt.thenBranch.forEach(collectAudioBlockParams)
      stmt.elseBranch?.forEach(collectAudioBlockParams)
    }
    else if (stmt.type === 'expr') {
      collectIdentifiers(stmt.expr).forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInAudioBlock.add(dep)
        }
      })
    }
    else if (stmt.type === 'forIn') {
      collectIdentifiers(stmt.iterable).forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInAudioBlock.add(dep)
        }
      })
      stmt.body.forEach(collectAudioBlockParams)
    }
    else if (stmt.type === 'switch') {
      collectIdentifiers(stmt.expr).forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInAudioBlock.add(dep)
        }
      })
      stmt.cases.forEach(c => {
        if (c.value) {
          collectIdentifiers(c.value).forEach(dep => {
            if (audioParams.includes(dep)) {
              audioParamsInAudioBlock.add(dep)
            }
          })
        }
        c.stmts.forEach(collectAudioBlockParams)
      })
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(collectAudioBlockParams)
    }
  }
  audioBlock.forEach(collectAudioBlockParams)

  // Collect audio-dependent variables first (before checking field vars)

  // Check if input is used (assign LHS/RHS or expr e.g. method call args)
  const usesInput = channelMode === 'stereo'
    ? (audioBlock.some(stmt =>
      (stmt.type === 'assign' && (
        stmt.name === 'inputLeft'
        || stmt.name === 'inputRight'
        || collectIdentifiers(stmt.expr).has('inputLeft')
        || collectIdentifiers(stmt.expr).has('inputRight')
      ))
      || (stmt.type === 'expr' && (
        collectIdentifiers(stmt.expr).has('inputLeft')
        || collectIdentifiers(stmt.expr).has('inputRight')
      ))
    ))
    : (audioBlock.some(stmt =>
      (stmt.type === 'assign' && (
        stmt.name === 'input'
        || collectIdentifiers(stmt.expr).has('input')
      ))
      || (stmt.type === 'expr' && collectIdentifiers(stmt.expr).has('input'))
    ))

  // Helper to check if a statement depends on audio parameters or on variables assigned in the audio block
  const checkStmtAudioDep = (stmt: Stmt): boolean => {
    if (stmt.type === 'assign') {
      const directDeps = collectIdentifiers(stmt.expr)
      if (Array.from(directDeps).some(dep => audioBlockAssignedVars.has(dep))) {
        return true
      }
      const varInfo = analysis.variables.get(stmt.name)!
      const affectingParams = new Set<string>()
      directDeps.forEach(dep => {
        if (paramNamesSet.has(dep)) {
          affectingParams.add(dep)
        }
      })
      varInfo.dependencies.forEach(dep => {
        const params = traceToParameters(dep, analysis, paramNamesSet)
        params.forEach(p => affectingParams.add(p))
      })
      return audioParams.some(p => affectingParams.has(p))
    }
    else if (stmt.type === 'expr') {
      // Expression statements (like method calls) depend on audio if they reference audio params
      const exprDeps = collectIdentifiers(stmt.expr)
      return Array.from(exprDeps).some(dep => audioParams.includes(dep))
    }
    else if (stmt.type === 'if') {
      const condDeps = collectIdentifiers(stmt.condition)
      if (Array.from(condDeps).some(dep => audioParams.includes(dep))) {
        return true
      }
      return false
    }
    else if (stmt.type === 'forIn') {
      const iterDeps = collectIdentifiers(stmt.iterable)
      return Array.from(iterDeps).some(dep => audioParams.includes(dep))
    }
    else if (stmt.type === 'switch') {
      const exprDeps = collectIdentifiers(stmt.expr)
      if (Array.from(exprDeps).some(dep => audioParams.includes(dep))) {
        return true
      }
      return stmt.cases.some(c => c.stmts.some(checkStmtAudioDep))
    }
    else if (stmt.type === 'block') {
      return stmt.stmts.some(checkStmtAudioDep)
    }
    else if (stmt.type === 'break' || stmt.type === 'continue') {
      return false
    }
    return false
  }

  // Collect control/variant statements that depend on audio parameters
  const audioDependentStmts: Stmt[] = []

  gen.control.forEach(stmt => {
    if (checkStmtAudioDep(stmt)) {
      audioDependentStmts.push(stmt)
    }
  })

  variant.stmts.forEach(stmt => {
    if (checkStmtAudioDep(stmt)) {
      audioDependentStmts.push(stmt)
    }
  })

  // Pre-collect optimization variables for audio-dependent variant statements
  const audioOptVarsPreCollect: string[] = []

  // Separate control and variant statements for pre-collection
  const audioDepVariantStmtsForPreCollect: Stmt[] = []

  audioDependentStmts.forEach(stmt => {
    if (!gen.control.includes(stmt)) {
      audioDepVariantStmtsForPreCollect.push(stmt)
    }
  })

  // Pre-collect variant expressions to determine optimization variables
  if (audioDepVariantStmtsForPreCollect.length > 0) {
    const preCollectExprs: string[] = []
    audioDepVariantStmtsForPreCollect.forEach(stmt => {
      if (stmt.type === 'assign') {
        preCollectExprs.push(exprToString(stmt.expr))
      }
    })

    if (preCollectExprs.length > 0) {
      const { declarations } = optimizeExpressions(preCollectExprs)
      declarations.forEach(decl => {
        const match = decl.match(/const (__opt\d+): f32 = (.+)/)
        if (match) {
          audioOptVarsPreCollect.push(match[1])
        }
      })
    }
  }

  const collectFieldVarsFromStmt = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      collectIdentifiers(stmt.expr).forEach(addFieldVarIfNeeded)
    }
    else if (stmt.type === 'if') {
      collectIdentifiers(stmt.condition).forEach(addFieldVarIfNeeded)
      stmt.thenBranch.forEach(collectFieldVarsFromStmt)
      stmt.elseBranch?.forEach(collectFieldVarsFromStmt)
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(collectFieldVarsFromStmt)
    }
    else if (stmt.type === 'forIn') {
      collectIdentifiers(stmt.iterable).forEach(addFieldVarIfNeeded)
      stmt.body.forEach(collectFieldVarsFromStmt)
    }
    else if (stmt.type === 'switch') {
      collectIdentifiers(stmt.expr).forEach(addFieldVarIfNeeded)
      stmt.cases.forEach(c => {
        if (c.value) {
          collectIdentifiers(c.value).forEach(addFieldVarIfNeeded)
        }
        c.stmts.forEach(collectFieldVarsFromStmt)
      })
    }
  }

  audioDependentStmts.forEach(collectFieldVarsFromStmt)

  const fieldVarsFetchedForAudio = new Set<string>()
  Array.from(fieldVarsUsedInAudio).sort().forEach(varName => {
    if (variantAfterAudioLhsSetTop.has(varName)) {
      return
    }
    if (audioDependentVarsForExclusion.has(varName)) {
      return
    }
    const varInfo = analysis.variables.get(varName)
    if (varInfo && varInfo.assignedIn.has('audio')) {
      return
    }
    fieldVarsFetchedForAudio.add(varName)
    const fieldType = fieldTypes.get(varName)
    const type = fieldType ?? (varName.endsWith('SampleCount') ? 'i32' : 'f32')
    const isAssignedInControl = varInfo && varInfo.assignedIn.has('control')
    const declKeyword = isAssignedInControl ? 'let' : 'const'
    lines.push(indent.write(`${declKeyword} ${varName}: ${type} = this.${varName}`))
  })

  // Collect audio parameters used in conditions vs bodies
  const audioParamsInConditions = new Set<string>()
  const audioParamsInBodies = new Set<string>()

  const collectAudioParams = (stmt: Stmt, inCondition: boolean): void => {
    if (stmt.type === 'assign') {
      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (audioParams.includes(dep)) {
          if (inCondition) {
            audioParamsInConditions.add(dep)
          }
          else {
            audioParamsInBodies.add(dep)
          }
        }
      })
    }
    else if (stmt.type === 'if') {
      const condDeps = collectIdentifiers(stmt.condition)
      condDeps.forEach(dep => {
        if (audioParams.includes(dep)) {
          audioParamsInConditions.add(dep)
        }
      })
      stmt.thenBranch.forEach(s => collectAudioParams(s, false))
      stmt.elseBranch?.forEach(s => collectAudioParams(s, false))
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(s => collectAudioParams(s, inCondition))
    }
  }
  audioDependentStmts.forEach(stmt => collectAudioParams(stmt, false))

  const variantAfterAudioLhsSet = variantAfterAudioLhsSetTop

  // Collect fields that are assigned in audio-dependent statements
  // These need to be fetched before the loop and written back after
  const audioDependentFields = new Set<string>()
  const audioDependentVars = new Set<string>()
  audioDependentStmts.forEach(stmt => {
    if (stmt.type === 'assign') {
      if (variantAfterAudioLhsSet.has(stmt.name)) {
        audioDependentVars.add(stmt.name)
        return
      }
      const varInfo = analysis.variables.get(stmt.name)
      if (varInfo) {
        if (varInfo.needsField) {
          audioDependentFields.add(stmt.name)
        }
        else {
          audioDependentVars.add(stmt.name)
        }
      }
    }
  })

  // Fields assigned in both control and audio must use local (loop-updated value) in audio block
  const needLocalInAudio = new Set(
    Array.from(fieldVarsUsedInAudio).filter(v => {
      if (stateVars.includes(v) || audioDependentFields.has(v)) return false
      const vi = analysis.variables.get(v)
      return vi != null && vi.assignedIn.has('control') && vi.assignedIn.has('audio')
    }),
  )
  if (needLocalInAudio.size > 0) {
    lines.push('')
    Array.from(needLocalInAudio).sort().forEach(varName => {
      const type = (fieldTypes.get(varName) ?? (varName.endsWith('SampleCount') ? 'i32' : 'f32')) as string
      lines.push(indent.write(`let ${varName}: ${type} = this.${varName}`))
    })
  }

  const loopStepInAudioDependent = new Set(
    Array.from(audioDependentFields).filter(v => {
      const vi = analysis.variables.get(v)
      return vi != null && vi.assignedIn.has('control') && vi.assignedIn.has('audio')
    }),
  )
  fieldLocalsInAudio = new Set([...needLocalInAudio, ...loopStepInAudioDependent])

  // Declare local audio variables that are assigned in the audio block
  const audioLocalVars = Array.from(audioVars)
    .filter(v =>
      !stateVars.includes(v)
      && v !== 'input'
      && v !== 'output'
      && v !== 'inputLeft'
      && v !== 'inputRight'
      && v !== 'outputLeft'
      && v !== 'outputRight'
      && !audioDependentVars.has(v)
      && !audioDependentFields.has(v)
      && !needLocalInAudio.has(v)
      && !controlToAudioLocals.has(v)
    )
  if (audioLocalVars.length > 0) {
    lines.push('')
    audioLocalVars.sort().forEach(varName => {
      lines.push(indent.write(`let ${varName}: f32`))
    })
  }

  // Declare audio parameters used in conditions as locals before the loop
  if (audioParamsInConditions.size > 0) {
    lines.push('')
    Array.from(audioParamsInConditions).sort().forEach(paramName => {
      const param = gen.parameters.find(p => p.name === paramName)
      if (param && (param.min !== undefined || param.max !== undefined)) {
        lines.push(indent.write(`let ${paramName}Clamped: f32`))
      }
      else {
        lines.push(indent.write(`let ${paramName}: f32`))
      }
    })
  }

  // Fetch fields that are assigned in audio-dependent statements
  if (audioDependentFields.size > 0) {
    lines.push('')
    Array.from(audioDependentFields).sort().forEach(varName => {
      const type = varName.endsWith('SampleCount') ? 'i32' : 'f32'
      lines.push(indent.write(`let ${varName}: ${type} = this.${varName}`))
    })
  }

  if (audioDependentVars.size > 0 || audioOptVarsPreCollect.length > 0) {
    lines.push('')
    audioDependentVars.forEach(varName => {
      if (stateVars.includes(varName) || controlToAudioLocals.has(varName) || needLocalInAudio.has(varName)) {
        return
      }
      lines.push(indent.write(`let ${varName}: f32`))
    })
    audioOptVarsPreCollect.forEach(optVar => {
      lines.push(indent.write(`let ${optVar}: f32`))
    })
  }

  // Declare audio parameters used in audio block as locals before the loop
  // Only declare those not already declared for conditions
  const audioParamsOnlyInAudioBlockForDecl = Array.from(audioParamsInAudioBlock).filter(p =>
    !audioParamsInConditions.has(p)
  )
  if (audioParamsOnlyInAudioBlockForDecl.length > 0) {
    lines.push('')
    Array.from(audioParamsOnlyInAudioBlockForDecl).sort().forEach(paramName => {
      const param = gen.parameters.find(p => p.name === paramName)
      if (param && (param.min !== undefined || param.max !== undefined)) {
        lines.push(indent.write(`let ${paramName}Clamped: f32`))
      }
      else {
        lines.push(indent.write(`let ${paramName}: f32`))
      }
    })
  }

  // Fallback: check all audio parameters and declare those used in audio block but not in conditions
  const declaredParams = new Set(audioParamsOnlyInAudioBlockForDecl)
  audioParams.forEach(paramName => {
    if (declaredParams.has(paramName) || audioParamsInConditions.has(paramName)) {
      return
    }

    // Check if this param is used in audio block by directly checking audioBlock
    const usedInAudioBlock = audioBlock.some(stmt => {
      if (stmt.type === 'assign') {
        const deps = collectIdentifiers(stmt.expr)
        if (deps.has(paramName)) {
          return true
        }
      }
      else if (stmt.type === 'if') {
        if (collectIdentifiers(stmt.condition).has(paramName)) {
          return true
        }
        if (stmt.thenBranch.some(s => s.type === 'assign' && collectIdentifiers(s.expr).has(paramName))) {
          return true
        }
        if (stmt.elseBranch?.some(s => s.type === 'assign' && collectIdentifiers(s.expr).has(paramName))) {
          return true
        }
      }
      else if (stmt.type === 'block') {
        if (stmt.stmts.some(s => s.type === 'assign' && collectIdentifiers(s.expr).has(paramName))) {
          return true
        }
      }
      return false
    })

    if (usedInAudioBlock) {
      const param = gen.parameters.find(p => p.name === paramName)
      if (param && (param.min !== undefined || param.max !== undefined)) {
        lines.push(indent.write(`let ${paramName}Clamped: f32`))
        declaredParams.add(paramName)
      }
      else {
        lines.push(indent.write(`let ${paramName}: f32`))
        declaredParams.add(paramName)
      }
    }
  })

  // Final check: directly scan audio block for any audio params and declare them
  // This ensures all audio params used in audio block are declared, even if collection missed them
  const allDeclaredAudioParams = new Set([
    ...audioParamsOnlyInAudioBlockForDecl,
    ...Array.from(audioParamsInConditions),
    ...Array.from(declaredParams),
  ])

  // Scan audioBlock and declare any audio params used there
  audioBlock.forEach(stmt => {
    if (stmt.type === 'assign') {
      const deps = collectIdentifiers(stmt.expr)
      deps.forEach(dep => {
        // If it's an audio param, not used in conditions, and not already declared
        if (audioParams.includes(dep) && !audioParamsInConditions.has(dep)) {
          // Double-check it's not already declared
          if (!allDeclaredAudioParams.has(dep)) {
            const param = gen.parameters.find(p => p.name === dep)
            if (param && (param.min !== undefined || param.max !== undefined)) {
              lines.push(indent.write(`let ${dep}Clamped: f32`))
              allDeclaredAudioParams.add(dep)
            }
            else {
              lines.push(indent.write(`let ${dep}: f32`))
              allDeclaredAudioParams.add(dep)
            }
          }
        }
      })
    }
  })

  // Check if sampleCount is used in audio block
  const usesSampleCount = audioBlock.some(stmt => {
    if (stmt.type === 'assign') {
      return collectIdentifiers(stmt.expr).has('sampleCount') || stmt.name === 'sampleCount'
    }
    else if (stmt.type === 'if') {
      return collectIdentifiers(stmt.condition).has('sampleCount')
        || stmt.thenBranch.some(s =>
          s.type === 'assign' && (collectIdentifiers(s.expr).has('sampleCount') || s.name === 'sampleCount')
        )
        || stmt.elseBranch?.some(s =>
          s.type === 'assign' && (collectIdentifiers(s.expr).has('sampleCount') || s.name === 'sampleCount')
        )
    }
    else if (stmt.type === 'block') {
      return stmt.stmts.some(s =>
        s.type === 'assign' && (collectIdentifiers(s.expr).has('sampleCount') || s.name === 'sampleCount')
      )
    }
    else if (stmt.type === 'expr') {
      return collectIdentifiers(stmt.expr).has('sampleCount')
    }
    return false
  })

  // Use an integer sample counter inside the audio loop when sampleCount is referenced.
  if (usesSampleCount) {
    lines.push(indent.write('let sc: i32 = sampleCount'))
  }

  // Audio loop
  lines.push(indent.write('for (let i = 0; i < bufferLength; i += 16) {'))
  indent.indent()
  lines.push(indent.write('unroll(16, () => {'))
  indent.indent()

  // Load audio parameters used in conditions at the start of each iteration
  Array.from(audioParamsInConditions).sort().forEach(paramName => {
    const param = gen.parameters.find(p => p.name === paramName)
    if (param && (param.min !== undefined || param.max !== undefined)) {
      const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
      lines.push(indent.write(`${paramName}Clamped = ${clampExpr}`))
    }
    else {
      lines.push(indent.write(`${paramName} = load<f32>(${paramName}$)`))
    }
  })

  // Load audio parameters used in audio block at the start of each iteration
  const audioParamsOnlyInAudioBlock = Array.from(audioParamsInAudioBlock).filter(p => !audioParamsInConditions.has(p))
  Array.from(audioParamsOnlyInAudioBlock).sort().forEach(paramName => {
    const param = gen.parameters.find(p => p.name === paramName)
    if (param && (param.min !== undefined || param.max !== undefined)) {
      const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
      lines.push(indent.write(`${paramName}Clamped = ${clampExpr}`))
    }
    else {
      lines.push(indent.write(`${paramName} = load<f32>(${paramName}$)`))
    }
  })

  // Load input if it's used
  if (usesInput) {
    if (channelMode === 'stereo') {
      const stmtUsesInputLeft = (stmt: Stmt): boolean =>
        (stmt.type === 'assign' && (stmt.name === 'inputLeft' || collectIdentifiers(stmt.expr).has('inputLeft')))
        || (stmt.type === 'expr' && collectIdentifiers(stmt.expr).has('inputLeft'))
      const stmtUsesInputRight = (stmt: Stmt): boolean =>
        (stmt.type === 'assign' && (stmt.name === 'inputRight' || collectIdentifiers(stmt.expr).has('inputRight')))
        || (stmt.type === 'expr' && collectIdentifiers(stmt.expr).has('inputRight'))
      if (audioVars.has('inputLeft') || audioBlock.some(stmtUsesInputLeft)) {
        lines.push(indent.write('inputLeft = load<f32>(inputLeft$)'))
      }
      if (audioVars.has('inputRight') || audioBlock.some(stmtUsesInputRight)) {
        lines.push(indent.write('inputRight = load<f32>(inputRight$)'))
      }
    }
    else {
      lines.push(indent.write('input = load<f32>(input$)'))
    }
  }

  // Track which audio parameters are loaded in the current scope (for body statements)
  const loadedBodyParams = new Set<string>()

  // Generate audio-dependent control/variant statements inside the loop
  // These are computed per sample from audio parameters, so they're always locals
  const generateAudioDependentStmt = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      let expr = exprToString(stmt.expr)

      // Replace parameters: audio params with local names if already loaded, otherwise load them
      gen.parameters.forEach(param => {
        const paramName = param.name
        if (effectiveParamModes[paramName] === 'audio') {
          if (audioParamsInBodies.has(paramName)) {
            // Used in body - check if it's also used in condition (loaded at start)
            if (audioParamsInConditions.has(paramName)) {
              // Used in both - use the variable loaded at start
              if (param.min !== undefined || param.max !== undefined) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else if (loadedBodyParams.has(paramName)) {
              // Already loaded in this body scope - use the local variable
              if (param.min !== undefined || param.max !== undefined) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else {
              // Not loaded yet - load inline (shouldn't happen if we load before body)
              const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), clampExpr)
            }
          }
          else {
            // Used in condition - use local variable name (already loaded at start of iteration)
            if (param.min !== undefined || param.max !== undefined) {
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
            }
            else {
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
            }
          }
        }
        else {
          // Scalar parameter - use clamped version if min/max defined, otherwise raw
          const paramRef = getParamRef(paramName)
          expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
        }
      })

      // Replace variable references - use local names only for vars we actually fetched
      varInfo.dependencies.forEach(dep => {
        if (audioDependentVars.has(dep) || audioDependentFields.has(dep)
          || fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep))
        {
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
        }
        else {
          const ref = getVarRef(dep, 'audio')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        }
      })

      // Always use local name in audio loop (fields are fetched before loop)
      lines.push(indent.write(`${stmt.name} = ${expr}`))
    }
    else if (stmt.type === 'if') {
      let cond = exprToString(stmt.condition)

      // Replace constants
      cond = replaceConstants(cond)

      // Replace parameters: audio params with local variable names (already loaded at start), scalar params with clamped versions
      gen.parameters.forEach(param => {
        const paramName = param.name
        if (effectiveParamModes[paramName] === 'audio') {
          // Use the local variable name (already loaded at start of iteration)
          if (param.min !== undefined || param.max !== undefined) {
            cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
          }
          else {
            cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
          }
        }
        else {
          const paramRef = getParamRef(paramName)
          cond = cond.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
        }
      })

      // Replace variable references in condition
      const condDeps = collectIdentifiers(stmt.condition)
      condDeps.forEach(dep => {
        if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
          if (audioDependentVars.has(dep) || audioDependentFields.has(dep) || fieldVarsFetchedForAudio.has(dep)
            || stateVars.includes(dep) || dep === 'input' || dep === 'output')
          {
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
          }
          else {
            const ref = getVarRef(dep, 'audio')
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        }
      })

      lines.push(indent.write(`if (${cond}) {`))
      indent.indent()

      // Load audio parameters used in the body before generating body statements
      const bodyParams = new Set<string>()
      const collectBodyParams = (s: Stmt): void => {
        if (s.type === 'assign') {
          collectIdentifiers(s.expr).forEach(dep => {
            if (audioParams.includes(dep)) {
              bodyParams.add(dep)
            }
          })
        }
        else if (s.type === 'if') {
          s.thenBranch.forEach(collectBodyParams)
          s.elseBranch?.forEach(collectBodyParams)
        }
        else if (s.type === 'block') {
          s.stmts.forEach(collectBodyParams)
        }
      }
      stmt.thenBranch.forEach(collectBodyParams)
      stmt.elseBranch?.forEach(collectBodyParams)

      Array.from(bodyParams).sort().forEach(paramName => {
        // Skip if already loaded in condition (loaded at start of iteration) or already loaded in current scope
        if (audioParamsInConditions.has(paramName) || loadedBodyParams.has(paramName)) {
          return
        }
        const param = gen.parameters.find(p => p.name === paramName)
        if (param && (param.min !== undefined || param.max !== undefined)) {
          const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
          lines.push(
            indent.write(
              `const ${paramName}Clamped: f32 = ${clampExpr}`,
            ),
          )
          loadedBodyParams.add(paramName)
        }
        else {
          lines.push(indent.write(`const ${paramName}: f32 = load<f32>(${paramName}$)`))
          loadedBodyParams.add(paramName)
        }
      })

      stmt.thenBranch.forEach(generateAudioDependentStmt)

      // Clear loaded params after the if block
      bodyParams.forEach(p => loadedBodyParams.delete(p))

      if (stmt.elseBranch && stmt.elseBranch.length > 0) {
        // Load audio parameters used in else branch
        const elseBodyParams = new Set<string>()
        const collectElseBodyParams = (s: Stmt): void => {
          if (s.type === 'assign') {
            collectIdentifiers(s.expr).forEach(dep => {
              if (audioParams.includes(dep)) {
                elseBodyParams.add(dep)
              }
            })
          }
          else if (s.type === 'if') {
            s.thenBranch.forEach(collectElseBodyParams)
            s.elseBranch?.forEach(collectElseBodyParams)
          }
          else if (s.type === 'block') {
            s.stmts.forEach(collectElseBodyParams)
          }
        }
        stmt.elseBranch.forEach(collectElseBodyParams)

        Array.from(elseBodyParams).sort().forEach(paramName => {
          // Skip if already loaded in condition (loaded at start of iteration) or already loaded in current scope
          if (audioParamsInConditions.has(paramName) || loadedBodyParams.has(paramName)) {
            return
          }
          const param = gen.parameters.find(p => p.name === paramName)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
            lines.push(
              indent.write(
                `const ${paramName}Clamped: f32 = ${clampExpr}`,
              ),
            )
            loadedBodyParams.add(paramName)
          }
          else {
            lines.push(indent.write(`const ${paramName}: f32 = load<f32>(${paramName}$)`))
            loadedBodyParams.add(paramName)
          }
        })

        indent.dedent()
        lines.push(indent.write('} else {'))
        indent.indent()
        stmt.elseBranch.forEach(generateAudioDependentStmt)

        // Clear loaded params after else block
        elseBodyParams.forEach(p => loadedBodyParams.delete(p))
      }
      else {
        // Clear loaded params after the if block (if no else branch)
        bodyParams.forEach(p => loadedBodyParams.delete(p))
      }

      indent.dedent()
      lines.push(indent.write('}'))
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(generateAudioDependentStmt)
    }
    else if (stmt.type === 'expr') {
      let expr = exprToString(stmt.expr)

      // Replace parameters: always load from audio buffer for audio-dependent statements
      gen.parameters.forEach(param => {
        const paramName = param.name
        if (effectiveParamModes[paramName] === 'audio') {
          // Audio parameter - load from buffer
          const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
          expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), clampExpr)
        }
        else {
          // Scalar parameter - use field variable if it exists (like currentSpeed), otherwise use param ref
          const fieldVarName = `current${toPascalCase(paramName)}`
          if (fieldNames.has(fieldVarName)) {
            expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), fieldVarName)
          }
          else {
            const paramRef = getParamRef(paramName)
            expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
          }
        }
      })

      const exprDeps = collectIdentifiers(stmt.expr)
      exprDeps.forEach(dep => {
        if (audioDependentVars.has(dep) || audioDependentFields.has(dep)) {
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
        }
        else {
          const ref = getVarRef(dep, 'audio')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        }
      })

      lines.push(indent.write(expr))
    }
    else if (stmt.type === 'forIn') {
      let iterable = exprToString(stmt.iterable)

      gen.parameters.forEach(param => {
        const paramName = param.name
        if (effectiveParamModes[paramName] === 'audio') {
          if (audioParamsInBodies.has(paramName)) {
            if (audioParamsInConditions.has(paramName)) {
              if (param.min !== undefined || param.max !== undefined) {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else if (loadedBodyParams.has(paramName)) {
              if (param.min !== undefined || param.max !== undefined) {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else {
              const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
              iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), clampExpr)
            }
          }
          else {
            if (param.min !== undefined || param.max !== undefined) {
              iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
            }
            else {
              iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
            }
          }
        }
        else {
          const paramRef = getParamRef(paramName)
          iterable = iterable.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
        }
      })

      const iterDeps = collectIdentifiers(stmt.iterable)
      iterDeps.forEach(dep => {
        if (audioDependentVars.has(dep) || audioDependentFields.has(dep)) {
          iterable = iterable.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
        }
        else {
          const ref = getVarRef(dep, 'audio')
          iterable = iterable.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        }
      })

      lines.push(indent.write(`for (let i = 0; i < ${iterable}.length; i++) {`))
      indent.indent()
      lines.push(indent.write(`const ${stmt.varName} = ${iterable}[i]`))
      stmt.body.forEach(generateAudioDependentStmt)
      indent.dedent()
      lines.push(indent.write('}'))
    }
  }

  // Separate control and variant statements
  const audioDepControlStmts: Stmt[] = []
  const audioDepVariantStmts: Stmt[] = []

  audioDependentStmts.forEach(stmt => {
    if (gen.control.includes(stmt)) {
      audioDepControlStmts.push(stmt)
    }
    else {
      audioDepVariantStmts.push(stmt)
    }
  })

  // Variant statements that reference vars assigned in the audio block must be emitted after the audio block
  const variantStmtsAfterAudio = audioDepVariantStmts.filter(stmt =>
    stmt.type === 'assign' && Array.from(collectIdentifiers(stmt.expr)).some(dep => audioBlockAssignedVars.has(dep))
  )
  const variantStmtsBeforeAudio = audioDepVariantStmts.filter(s => !variantStmtsAfterAudio.includes(s))

  // Generate control statements first (without optimization for now)
  audioDepControlStmts.forEach(generateAudioDependentStmt)

  // Collect variant expressions for optimization
  const audioDepExpressionsToOptimize: Array<
    { stmt: Extract<Stmt, { type: 'assign' }>; expr: string; varInfo: VariableInfo }
  > = []

  const collectAudioDepExpr = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      let expr = exprToString(stmt.expr)

      // Replace parameters: audio params with local names if already loaded, otherwise load them
      gen.parameters.forEach(param => {
        const paramName = param.name
        if (effectiveParamModes[paramName] === 'audio') {
          if (audioParamsInBodies.has(paramName)) {
            // Used in body - check if it's also used in condition (loaded at start)
            if (audioParamsInConditions.has(paramName)) {
              // Used in both - use the variable loaded at start
              if (param.min !== undefined || param.max !== undefined) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else if (loadedBodyParams.has(paramName)) {
              // Already loaded in this body scope - use the local variable
              if (param.min !== undefined || param.max !== undefined) {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
              }
              else {
                expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
              }
            }
            else {
              // Not loaded yet - load inline (shouldn't happen if we load before body)
              const clampExpr = getClampExpr(`load<f32>(${paramName}$)`, param)
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), clampExpr)
            }
          }
          else {
            // Used in condition - use local variable name (already loaded at start of iteration)
            if (param.min !== undefined || param.max !== undefined) {
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `${paramName}Clamped`)
            }
            else {
              expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramName)
            }
          }
        }
        else {
          // Scalar parameter - use clamped version if min/max defined, otherwise raw
          const paramRef = getParamRef(paramName)
          expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), paramRef)
        }
      })

      // Replace variable references - use local names for audio-dependent vars and fields
      varInfo.dependencies.forEach(dep => {
        if (audioDependentVars.has(dep) || audioDependentFields.has(dep)
          || fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep))
        {
          // Use local variable (already fetched if it's a field)
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
        }
        else {
          // Use field/local reference
          const ref = getVarRef(dep, 'audio')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        }
      })

      audioDepExpressionsToOptimize.push({ stmt, expr, varInfo })
    }
  }

  variantStmtsBeforeAudio.forEach(collectAudioDepExpr)

  // Optimize and output variant expressions
  if (audioDepExpressionsToOptimize.length > 0) {
    const exprs = audioDepExpressionsToOptimize.map(e => e.expr)
    const { optimized, declarations } = optimizeExpressions(exprs)

    // Output optimization variable assignments (not declarations, since they're declared before the loop)
    declarations.forEach(decl => {
      // Convert "const __optN: f32 = expr" to "__optN = expr"
      const match = decl.match(/const (__opt\d+): f32 = (.+)/)
      if (match) {
        lines.push(indent.write(`${match[1]} = ${match[2]}`))
      }
    })

    // Track which variables have been assigned and their expressions for value reuse
    const assignedVars = new Map<string, string>()

    // Output optimized statements
    audioDepExpressionsToOptimize.forEach((item, idx) => {
      const optimizedExpr = optimized[idx]

      // Check if this expression matches a previously assigned variable
      // Prefer optimization variables (start with __opt) over other references
      let reuseVar: string | undefined

      // First check if the optimized expression is just an optimization variable
      if (optimizedExpr.match(/^__opt\d+$/)) {
        // It's already just an optimization variable, use it directly
        reuseVar = undefined
      }
      else {
        // Check if we've seen this expression before
        for (const [varName, varExpr] of assignedVars.entries()) {
          if (varExpr === optimizedExpr) {
            reuseVar = varName
            break
          }
        }
      }

      if (reuseVar) {
        lines.push(indent.write(`${item.stmt.name} = ${reuseVar}`))
      }
      else {
        lines.push(indent.write(`${item.stmt.name} = ${optimizedExpr}`))
        assignedVars.set(item.stmt.name, optimizedExpr)
      }
    })
  }
  else {
    variantStmtsBeforeAudio.forEach(generateAudioDependentStmt)
  }

  // Audio code
  const generateAudioStmt = (stmt: Stmt): void => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      let expr = exprToString(stmt.expr)

      // Replace constants
      expr = replaceConstants(expr)

      // Replace 'input' with local variable
      expr = expr.replace(/\binput\b/g, 'input')

      // Replace scalar parameters with clamped versions (if min/max defined)
      scalarParams.forEach(p => {
        expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), getParamRef(p))
      })

      // Replace audio parameters with local variable names (already loaded at start of iteration)
      audioParams.forEach(p => {
        if (audioParamsInAudioBlock.has(p)) {
          const param = gen.parameters.find(par => par.name === p)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
          }
          else {
            expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
          }
        }
        else {
          // Not used in audio block, but might be in audio-dependent statements - load inline
          expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
        }
      })

      // Replace variable references - use local names only for vars we actually fetched
      varInfo.dependencies.forEach(dep => {
        if (usesSampleCount && dep === 'sampleCount') {
          const scRef = expr.includes('sampleCount /') || expr.includes('(sampleCount - 1') ? 'f64(sc)' : 'f32(sc)'
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), scRef)
        }
        else if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
          || audioDependentVars.has(dep))
        {
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
        }
        else {
          const ref = getVarRef(dep, 'audio')
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
        }
      })

      // util floor() is f32; use Math.floor for f64 division so assign target f32 gets explicit cast
      if (expr.includes('f64(sc)')) {
        expr = expr.replace(/\bfloor\(/g, 'Math.floor(')
        expr = `f32(${expr})`
      }
      const assignTarget = stmt.name // In audio loop, always use local name
      lines.push(indent.write(`${assignTarget} = ${expr}`))
    }
    else if (stmt.type === 'if') {
      let cond = exprToString(stmt.condition)

      // Replace scalar parameters with clamped versions (if min/max defined)
      scalarParams.forEach(p => {
        const paramRef = getParamRef(p)
        cond = cond.replace(new RegExp(`\\b${p}\\b`, 'g'), paramRef)
      })

      // Replace audio parameters with local variable names (already loaded at start of iteration)
      audioParams.forEach(p => {
        if (audioParamsInAudioBlock.has(p)) {
          const param = gen.parameters.find(par => par.name === p)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            cond = cond.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
          }
          else {
            cond = cond.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
          }
        }
        else {
          // Not used in audio block, but might be in audio-dependent statements - load inline
          cond = cond.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
        }
      })

      // Replace variable references in condition
      const condDeps = collectIdentifiers(stmt.condition)
      condDeps.forEach(dep => {
        if (usesSampleCount && dep === 'sampleCount') {
          const scRef = cond.includes('sampleCount /') || cond.includes('(sampleCount - 1') ? 'f64(sc)' : 'f32(sc)'
          cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), scRef)
          return
        }
        if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
          if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
            || audioDependentVars.has(dep))
          {
            // Use local variable
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
          }
          else {
            // Use field reference
            const ref = getVarRef(dep, 'audio')
            cond = cond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        }
      })

      lines.push(indent.write(`if (${cond}) {`))
      indent.indent()

      stmt.thenBranch.forEach(generateAudioStmt)

      if (stmt.elseBranch && stmt.elseBranch.length > 0) {
        // Check if else branch is a single if statement (for else if)
        const isElseIf = stmt.elseBranch.length === 1 && stmt.elseBranch[0].type === 'if'

        if (isElseIf) {
          const nestedIf = stmt.elseBranch[0] as { type: 'if'; condition: Expr; thenBranch: Stmt[];
            elseBranch?: Stmt[] }

          indent.dedent()

          let elseCond = exprToString(nestedIf.condition)

          scalarParams.forEach(p => {
            const paramRef = getParamRef(p)
            elseCond = elseCond.replace(new RegExp(`\\b${p}\\b`, 'g'), paramRef)
          })

          audioParams.forEach(p => {
            if (audioParamsInAudioBlock.has(p)) {
              const param = gen.parameters.find(par => par.name === p)
              if (param && (param.min !== undefined || param.max !== undefined)) {
                elseCond = elseCond.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
              }
              else {
                elseCond = elseCond.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
              }
            }
            else {
              elseCond = elseCond.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
            }
          })

          const elseCondDeps = collectIdentifiers(nestedIf.condition)
          elseCondDeps.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
                || audioDependentVars.has(dep))
              {
                elseCond = elseCond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
              }
              else {
                const ref = getVarRef(dep, 'audio')
                elseCond = elseCond.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
              }
            }
          })

          lines.push(indent.write(`} else if (${elseCond}) {`))
          indent.indent()
          nestedIf.thenBranch.forEach(generateAudioStmt)

          // Recursively handle nested else/else if
          if (nestedIf.elseBranch && nestedIf.elseBranch.length > 0) {
            const nestedIsElseIf = nestedIf.elseBranch.length === 1 && nestedIf.elseBranch[0].type === 'if'
            if (nestedIsElseIf) {
              // Create a temporary if to recursively handle
              const tempStmt: Stmt = { type: 'if', condition: { type: 'number', value: 1 }, thenBranch: [],
                elseBranch: nestedIf.elseBranch }
              generateAudioStmt(tempStmt)
              // Remove the dummy if lines
              const lastLines = lines.slice(-2)
              if (lastLines[0]?.includes('if ((1))') && lastLines[1]?.includes('}')) {
                lines.splice(-2, 2)
              }
            }
            else {
              indent.dedent()
              lines.push(indent.write('} else {'))
              indent.indent()
              nestedIf.elseBranch.forEach(generateAudioStmt)
              indent.dedent()
              lines.push(indent.write('}'))
            }
          }
          else {
            indent.dedent()
            lines.push(indent.write('}'))
          }
        }
        else {
          indent.dedent()
          lines.push(indent.write('} else {'))
          indent.indent()
          stmt.elseBranch.forEach(generateAudioStmt)
          indent.dedent()
          lines.push(indent.write('}'))
        }
      }
      else {
        indent.dedent()
        lines.push(indent.write('}'))
      }
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(generateAudioStmt)
    }
    else if (stmt.type === 'expr') {
      let expr = exprToString(stmt.expr)

      // Replace constants
      expr = replaceConstants(expr)

      // Replace scalar parameters with clamped versions
      scalarParams.forEach(p => {
        expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
      })

      // Replace audio parameters with local variable names (already loaded at start of iteration)
      audioParams.forEach(p => {
        if (audioParamsInAudioBlock.has(p)) {
          const param = gen.parameters.find(par => par.name === p)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
          }
          else {
            expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
          }
        }
        else {
          expr = expr.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
        }
      })

      const exprDeps = collectIdentifiers(stmt.expr)
      exprDeps.forEach(dep => {
        if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
          if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
            || audioDependentVars.has(dep))
          {
            expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
          }
          else {
            const ref = getVarRef(dep, 'audio')
            expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        }
        else if (usesSampleCount && dep === 'sampleCount' && systemParams.has(dep)) {
          const scRef = expr.includes('sampleCount /') || expr.includes('(sampleCount - 1') ? 'f64(sc)' : 'f32(sc)'
          expr = expr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), scRef)
        }
      })

      lines.push(indent.write(expr))
    }
    else if (stmt.type === 'forIn') {
      let iterable = exprToString(stmt.iterable)

      scalarParams.forEach(p => {
        iterable = iterable.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
      })

      audioParams.forEach(p => {
        if (audioParamsInAudioBlock.has(p)) {
          const param = gen.parameters.find(par => par.name === p)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            iterable = iterable.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
          }
          else {
            iterable = iterable.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
          }
        }
        else {
          iterable = iterable.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
        }
      })

      const iterDeps = collectIdentifiers(stmt.iterable)
      iterDeps.forEach(dep => {
        if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
          if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
            || audioDependentVars.has(dep))
          {
            iterable = iterable.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
          }
          else {
            const ref = getVarRef(dep, 'audio')
            iterable = iterable.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        }
      })

      lines.push(indent.write(`for (let i = 0; i < ${iterable}.length; i++) {`))
      indent.indent()
      lines.push(indent.write(`const ${stmt.varName} = ${iterable}[i]`))
      stmt.body.forEach(generateAudioStmt)
      indent.dedent()
      lines.push(indent.write('}'))
    }
    else if (stmt.type === 'switch') {
      let switchExpr = exprToString(stmt.expr)

      // Replace constants
      switchExpr = replaceConstants(switchExpr)

      // Replace scalar parameters
      scalarParams.forEach(p => {
        switchExpr = switchExpr.replace(new RegExp(`\\b${p}\\b`, 'g'), getParamRef(p))
      })

      // Replace audio parameters
      audioParams.forEach(p => {
        if (audioParamsInAudioBlock.has(p)) {
          const param = gen.parameters.find(par => par.name === p)
          if (param && (param.min !== undefined || param.max !== undefined)) {
            switchExpr = switchExpr.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
          }
          else {
            switchExpr = switchExpr.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
          }
        }
        else {
          switchExpr = switchExpr.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
        }
      })

      // Replace variable references
      const switchDeps = collectIdentifiers(stmt.expr)
      switchDeps.forEach(dep => {
        if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
          if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
            || audioDependentVars.has(dep))
          {
            switchExpr = switchExpr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
          }
          else {
            const ref = getVarRef(dep, 'audio')
            switchExpr = switchExpr.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
          }
        }
      })

      lines.push(indent.write(`switch (${switchExpr}) {`))
      indent.indent()

      stmt.cases.forEach(caseItem => {
        if (caseItem.value) {
          let caseValue = exprToString(caseItem.value)

          // Replace constants
          caseValue = replaceConstants(caseValue)

          // Replace scalar parameters
          scalarParams.forEach(p => {
            caseValue = caseValue.replace(new RegExp(`\\b${p}\\b`, 'g'), getParamRef(p))
          })

          // Replace audio parameters
          audioParams.forEach(p => {
            if (audioParamsInAudioBlock.has(p)) {
              const param = gen.parameters.find(par => par.name === p)
              if (param && (param.min !== undefined || param.max !== undefined)) {
                caseValue = caseValue.replace(new RegExp(`\\b${p}\\b`, 'g'), `${p}Clamped`)
              }
              else {
                caseValue = caseValue.replace(new RegExp(`\\b${p}\\b`, 'g'), p)
              }
            }
            else {
              caseValue = caseValue.replace(new RegExp(`\\b${p}\\b`, 'g'), `load<f32>(${p}$)`)
            }
          })

          // Replace variable references
          const caseDeps = collectIdentifiers(caseItem.value)
          caseDeps.forEach(dep => {
            if (fieldNames.has(dep) || (!paramNamesSet.has(dep) && !systemParams.has(dep))) {
              if (fieldVarsFetchedForAudio.has(dep) || stateVars.includes(dep) || dep === 'input' || dep === 'output'
                || audioDependentVars.has(dep))
              {
                caseValue = caseValue.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), dep)
              }
              else {
                const ref = getVarRef(dep, 'audio')
                caseValue = caseValue.replace(new RegExp(`(?<![.])\\b${dep}\\b`, 'g'), ref)
              }
            }
          })

          lines.push(indent.write(`case ${caseValue}:`))
        }
        else {
          lines.push(indent.write('default:'))
        }

        indent.indent()
        caseItem.stmts.forEach(generateAudioStmt)
        indent.dedent()
      })

      indent.dedent()
      lines.push(indent.write('}'))
    }
    else if (stmt.type === 'break') {
      lines.push(indent.write('break'))
    }
    else if (stmt.type === 'continue') {
      lines.push(indent.write('continue'))
    }
  }

  // Emit variant statements that depend on audio block vars right before the first audio statement that uses them
  const variantAfterAudioLhs = new Set(
    variantStmtsAfterAudio
      .filter((s): s is Extract<Stmt, { type: 'assign' }> => s.type === 'assign')
      .map(s => s.name),
  )
  let emittedVariantAfterAudio = false
  const generateAudioStmtWithVariantDeps = (stmt: Stmt): void => {
    if (
      !emittedVariantAfterAudio
      && variantAfterAudioLhs.size > 0
      && stmt.type === 'assign'
      && Array.from(collectIdentifiers(stmt.expr)).some(r => variantAfterAudioLhs.has(r))
    ) {
      variantStmtsAfterAudio.forEach(generateAudioDependentStmt)
      emittedVariantAfterAudio = true
    }
    generateAudioStmt(stmt)
  }
  audioBlock.forEach(generateAudioStmtWithVariantDeps)

  // Store output
  if (channelMode === 'stereo') {
    if (audioVars.has('outputLeft')) {
      lines.push(indent.write('store<f32>(outputLeft$, outputLeft)'))
    }
    if (audioVars.has('outputRight')) {
      lines.push(indent.write('store<f32>(outputRight$, outputRight)'))
    }
  }
  else {
    if (audioVars.has('output')) {
      lines.push(indent.write('store<f32>(output$, output)'))
    }
  }

  // Increment pointers
  if (usesInput) {
    if (channelMode === 'stereo') {
      lines.push(indent.write('inputLeft$ += 4'))
      lines.push(indent.write('inputRight$ += 4'))
    }
    else {
      lines.push(indent.write('input$ += 4'))
    }
  }
  if (channelMode === 'stereo') {
    if (audioVars.has('outputLeft')) {
      lines.push(indent.write('outputLeft$ += 4'))
    }
    if (audioVars.has('outputRight')) {
      lines.push(indent.write('outputRight$ += 4'))
    }
  }
  else {
    if (audioVars.has('output')) {
      lines.push(indent.write('output$ += 4'))
    }
  }
  audioParams.forEach(p => {
    lines.push(indent.write(`${p}$ += 4`))
  })

  // Increment sampleCount if used in audio block
  if (usesSampleCount) {
    lines.push(indent.write('sc = sc + 1'))
  }

  indent.dedent()
  lines.push(indent.write('})'))

  indent.dedent()
  lines.push(indent.write('}'))

  // Audio cleanup - save state variables and fields assigned in audio-dependent statements
  if (stateVars.length > 0 || audioDependentFields.size > 0) {
    lines.push('')
    stateVars.forEach(v => {
      lines.push(indent.write(`this.${v} = ${v}`))
    })
    Array.from(audioDependentFields).sort().forEach(v => {
      lines.push(indent.write(`this.${v} = ${v}`))
    })
  }

  indent.dedent()
  lines.push(indent.write('}'))

  indent.dedent() // Back to method declaration level

  return lines.join('\n')
}

function generateCopyFromMethod(fields: string[], className: string): string {
  const indent = new IndentHelper()
  const fieldsWithTypes: Array<{ name: string; type: string }> = []
  for (const f of fields) {
    const parts = f.split(':')
    const name = parts[0]?.trim()
    const type = parts[1]?.trim().split('=')[0]?.trim()
    if (!name) continue
    fieldsWithTypes.push({ name, type: type ?? '' })
  }
  indent.indentLevel = 1
  const lines: string[] = []
  lines.push(indent.write(`copyFrom(src: ${className}): void {`))
  indent.indent()
  for (const field of fieldsWithTypes) {
    // Check if this is a kernel type that has a reset method
    if (field.type.includes('Kernel') && !field.type.includes('[]')) {
      lines.push(indent.write(`this.${field.name}.reset()`))
    }
    else {
      lines.push(indent.write(`this.${field.name} = src.${field.name}`))
    }
  }
  if (fieldsWithTypes.length === 0) {
    lines.push(indent.write('// No fields to copy'))
  }
  indent.dedent()
  lines.push(indent.write('}'))
  return lines.join('\n')
}

export function generateAll(gen: Gen): string {
  const indent = new IndentHelper()
  const classes: string[] = []

  // If no variants, create a default one
  const variants = gen.variants.length > 0 ? gen.variants : [{ name: 'default', stmts: [], description: undefined }]

  // Determine if we need to generate stereo variants
  const hasStereoBlock = gen.stereo && gen.stereo.length > 0
  const channelModes: Array<'mono' | 'stereo'> = hasStereoBlock ? ['mono', 'stereo'] : ['mono']

  for (const variant of variants) {
    const paramNames = gen.parameters.map(p => p.name)
    const paramModeArrays = generateParameterVariants(gen.parameters)

    for (const channelMode of channelModes) {
      for (const paramModeArray of paramModeArrays) {
        const paramModes: Record<string, 'scalar' | 'audio'> = {}
        paramNames.forEach((name, i) => {
          paramModes[name] = paramModeArray[i] as 'scalar' | 'audio'
        })

        // Analyze dependencies to determine which variables need to be fields
        const analysis = analyzeDependencies(gen, variant)

        // Group statements by parameter dependencies to determine placement
        const allGroups = groupStatementsByParams(gen, variant, analysis, paramModes)
        const hasScalarParams = paramNames.filter(p => paramModes[p] === 'scalar').length > 0

        // Third pass: determine fields vs locals after knowing placement
        determineFieldsAfterPlacement(analysis, allGroups, gen, variant, hasScalarParams, paramModes)

        // Add last* fields only for params used in conditions
        const scalarParams = paramNames.filter(p => paramModes[p] === 'scalar')
        const paramsUsedInConditions = collectParamsUsedInConditions(allGroups, scalarParams)
        const lastFields = scalarParams
          .filter(p => paramsUsedInConditions.has(p))
          .map(p => `last${toPascalCase(p)}: f32 = Infinity`)

        // Check which trackable system parameters are used in conditional control blocks
        const usedSystemParams = collectTrackableSystemParamsUsedInConditionalControl(allGroups)
        const systemParamFields = Array.from(usedSystemParams).map(
          param => `last${toPascalCase(param)}: f32 = Infinity`,
        )

        // Only include variables that need to be fields
        const fieldNames = new Set(gen.fields.map(f => f.name))
        const dslFields = gen.fields.map(f => `${f.name}: ${f.value}`)
        const stateVarNamesForFields = getStateVarNamesForClassFields(gen, variant, analysis, paramModes, channelMode)
        const fieldVars = Array.from(analysis.variables.values())
          .filter(v =>
            !fieldNames.has(v.name)
            && (v.needsField || stateVarNamesForFields.has(v.name))
          )
          .map(v => `${v.name}: ${v.name.endsWith('SampleCount') ? 'i32' : 'f32'}`)

        const channelSuffix = channelMode === 'stereo' ? '_stereo' : ''
        const className = `${gen.name}_${variant.name}_${
          paramNames.map((p, i) => `${p}_${paramModeArray[i]}`).join('_')
        }${channelSuffix}`

        const fields = [...dslFields, ...lastFields, ...systemParamFields, ...fieldVars]

        const processMethod = generateProcessMethod(gen, variant, paramModes, analysis, allGroups, className,
          channelMode)
        const copyFromMethod = generateCopyFromMethod(fields, className)

        indent.indentLevel = 0
        indent.indent() // Indent for class body
        const fieldLines = fields.map(field => indent.write(field))
        indent.dedent()

        indent.indent()
        const classBody = [
          indent.write(`static readonly defaultInstance: ${className} = new ${className}()`),
          '',
          ...fieldLines,
          ...(fieldLines.length > 0 ? [''] : []),
          indent.write('reset(): void {'),
          indent.write(`  this.copyFrom(${className}.defaultInstance)`),
          indent.write('}'),
          '',
          copyFromMethod,
          '',
          processMethod,
        ]
        indent.dedent()

        classes.push([
          `export class ${className} {`,
          ...classBody,
          '}',
        ].join('\n'))
      }
    }
  }

  // Generate imports from gen.imports, always include common math ops from util
  const importNames = new Set<string>(['applyCurve', 'clamp', 'sin', 'cos', 'sinNormalized', 'cosNormalized', 'fract01',
    'floor', 'min', 'max', 'polyBlep', 'pow', 'sqrt', 'TWO_PI', 'log', 'warn'])
  gen.imports.forEach(imp => {
    imp.names.forEach(name => importNames.add(name))
  })
  const imports = `import { ${Array.from(importNames).sort().join(', ')} } from '../util'`

  // Generate constants at the top of the file (only once, not per class)
  const constants = gen.constants.length > 0
    ? gen.constants.map(c => `export const ${c.name}: f32 = f32(${c.value})`).join('\n') + '\n'
    : ''

  return `${generatedHeader}
${imports}
${constants}
${classes.join('\n\n')}`
}
