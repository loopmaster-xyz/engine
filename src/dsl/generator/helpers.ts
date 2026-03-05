import type { Expr, Gen, Parameter, Stmt } from '../ast.ts'

export type UsageSite = 'control' | 'variant' | 'audio'

export type VariableInfo = {
  name: string
  dependencies: Set<string>
  dependents: Set<string>
  assignedIn: Set<UsageSite>
  usedIn: Set<UsageSite>
  needsField: boolean
}

export type AnalysisResult = {
  variables: Map<string, VariableInfo>
  statements: Map<Stmt, { dependencies: Set<string>; site: UsageSite }>
}

export type GenSpecializationSpec = {
  id: number
  genName: string
  variantName: string
  className: string
  paramNames: string[]
  paramModes: Array<'scalar' | 'audio'>
  paramCount: number
  emitNames: string[]
  isStateful: boolean
  rate: 'audio' | 'control'
}

export type GenVariantSpec = {
  opName: string
  genName: string
  variantName: string
  paramNames: string[]
  paramCount: number
  usesInput: boolean
  hasStereo: boolean
  /** True when gen has stereo block but no audio block (stereo-only); mono input should use stereo path with [input, input]. */
  stereoOnly: boolean
  monoSpecializations: GenSpecializationSpec[]
  stereoSpecializations: GenSpecializationSpec[]
}

export const generatedHeader =
  '// dprint-ignore-file\n// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes'

export function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export class IndentHelper {
  public indentLevel = 0
  private indentStr = '  '

  indent(): void {
    this.indentLevel++
  }

  dedent(): void {
    this.indentLevel--
  }

  write(line: string = ''): string {
    return this.indentStr.repeat(this.indentLevel) + line
  }

  writeLines(lines: string[]): string {
    return lines.map(line => this.write(line)).join('\n')
  }
}

export function collectIdentifiers(expr: Expr): Set<string> {
  const ids = new Set<string>()
  function walk(e: Expr) {
    if (e.type === 'identifier') {
      ids.add(e.name)
    }
    else if (e.type === 'binary') {
      walk(e.left)
      walk(e.right)
    }
    else if (e.type === 'unary') {
      walk(e.expr)
    }
    else if (e.type === 'ternary') {
      walk(e.condition)
      walk(e.trueExpr)
      walk(e.falseExpr)
    }
    else if (e.type === 'call') {
      if (e.object) walk(e.object)
      e.args.forEach(walk)
    }
    else if (e.type === 'member') {
      walk(e.object)
    }
  }
  walk(expr)
  return ids
}

export function exprToString(expr: Expr): string {
  switch (expr.type) {
    case 'number':
      return expr.value.toString()
    case 'string':
      return `"${expr.value}"`
    case 'identifier':
      return expr.name
    case 'binary':
      return `(${exprToString(expr.left)} ${expr.op} ${exprToString(expr.right)})`
    case 'unary':
      return `${expr.op}${exprToString(expr.expr)}`
    case 'ternary':
      const cond = exprToString(expr.condition)
      const trueExprStr = exprToString(expr.trueExpr)
      const falseExprStr = exprToString(expr.falseExpr)
      // Don't wrap in extra parens - sub-expressions already have their own
      return `${cond} ? ${trueExprStr} : ${falseExprStr}`
    case 'call':
      const args = expr.args.map(exprToString).join(', ')
      if ((expr as any).isNew) {
        return `new ${expr.name}(${args})`
      }
      if (expr.object) {
        return `${exprToString(expr.object)}.${expr.name}(${args})`
      }
      return `${expr.name}(${args})`
    case 'member':
      return `${exprToString(expr.object)}.${expr.property}`
  }
}

export function stmtUsesIdentifier(stmt: Stmt, name: string): boolean {
  if (stmt.type === 'assign') {
    return collectIdentifiers(stmt.expr).has(name)
  }
  if (stmt.type === 'expr') {
    return collectIdentifiers(stmt.expr).has(name)
  }
  if (stmt.type === 'if') {
    if (collectIdentifiers(stmt.condition).has(name)) return true
    if (stmt.thenBranch.some(s => stmtUsesIdentifier(s, name))) return true
    return stmt.elseBranch?.some(s => stmtUsesIdentifier(s, name)) ?? false
  }
  if (stmt.type === 'forIn') {
    if (collectIdentifiers(stmt.iterable).has(name)) return true
    return stmt.body.some(s => stmtUsesIdentifier(s, name))
  }
  if (stmt.type === 'block') {
    return stmt.stmts.some(s => stmtUsesIdentifier(s, name))
  }
  if (stmt.type === 'switch') {
    if (collectIdentifiers(stmt.expr).has(name)) return true
    return stmt.cases.some(c => c.stmts.some(s => stmtUsesIdentifier(s, name)))
  }
  if (stmt.type === 'break' || stmt.type === 'continue') {
    return false
  }
  return false
}

export function stmtsUseIdentifier(stmts: Stmt[], name: string): boolean {
  return stmts.some(stmt => stmtUsesIdentifier(stmt, name))
}

export function generateParameterVariants(params: Parameter[]): string[][] {
  if (params.length === 0) return [[]]
  const [first, ...rest] = params
  const restVariants = generateParameterVariants(rest)

  // Get allowed types for this parameter (defaults to both scalar and audio)
  const allowedTypes = first.types ?? ['scalar', 'audio']

  const result: string[][] = []
  for (const type of allowedTypes) {
    result.push(...restVariants.map(v => [type, ...v]))
  }
  return result
}

export function analyzeDependencies(
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
): AnalysisResult {
  const variables = new Map<string, VariableInfo>()
  const statements = new Map<Stmt, { dependencies: Set<string>; site: UsageSite }>()

  // Initialize variable info
  const initVar = (name: string) => {
    if (!variables.has(name)) {
      variables.set(name, {
        name,
        dependencies: new Set(),
        dependents: new Set(),
        assignedIn: new Set(),
        usedIn: new Set(),
        needsField: false,
      })
    }
    return variables.get(name)!
  }

  // Analyze statements in a specific site
  const analyzeStmts = (stmts: Stmt[], site: UsageSite) => {
    const walkStmt = (stmt: Stmt) => {
      if (stmt.type === 'assign') {
        const varInfo = initVar(stmt.name)
        varInfo.assignedIn.add(site)

        const deps = collectIdentifiers(stmt.expr)
        statements.set(stmt, { dependencies: deps, site })

        deps.forEach(dep => {
          const depInfo = initVar(dep)
          depInfo.usedIn.add(site)
          depInfo.dependents.add(stmt.name)
          varInfo.dependencies.add(dep)
        })
      }
      else if (stmt.type === 'block') {
        stmt.stmts.forEach(walkStmt)
      }
      else if (stmt.type === 'if') {
        const condDeps = collectIdentifiers(stmt.condition)
        condDeps.forEach(dep => {
          const depInfo = initVar(dep)
          depInfo.usedIn.add(site)
        })
        stmt.thenBranch.forEach(walkStmt)
        stmt.elseBranch?.forEach(walkStmt)
      }
      else if (stmt.type === 'forIn') {
        const iterDeps = collectIdentifiers(stmt.iterable)
        iterDeps.forEach(dep => {
          const depInfo = initVar(dep)
          depInfo.usedIn.add(site)
        })
        stmt.body.forEach(walkStmt)
      }
      else if (stmt.type === 'switch') {
        const exprDeps = collectIdentifiers(stmt.expr)
        exprDeps.forEach(dep => {
          const depInfo = initVar(dep)
          depInfo.usedIn.add(site)
        })
        stmt.cases.forEach(c => {
          if (c.value) {
            const valueDeps = collectIdentifiers(c.value)
            valueDeps.forEach(dep => {
              const depInfo = initVar(dep)
              depInfo.usedIn.add(site)
            })
          }
          c.stmts.forEach(walkStmt)
        })
      }
      else if (stmt.type === 'break' || stmt.type === 'continue') {
        // No variables used
      }
      else if (stmt.type === 'expr') {
        const deps = collectIdentifiers(stmt.expr)
        deps.forEach(dep => {
          const depInfo = initVar(dep)
          depInfo.usedIn.add(site)
        })
      }
    }
    stmts.forEach(walkStmt)
  }

  // Analyze each site
  analyzeStmts(gen.control, 'control')
  analyzeStmts(variant.stmts, 'variant')
  analyzeStmts(gen.audio, 'audio')
  // Also analyze stereo block if it exists
  if (gen.stereo && gen.stereo.length > 0) {
    analyzeStmts(gen.stereo, 'audio')
  }

  return { variables, statements }
}

export function traceToParameters(
  varName: string,
  analysis: AnalysisResult,
  paramNames: Set<string>,
  visited: Set<string> = new Set(),
): Set<string> {
  if (visited.has(varName)) return new Set()
  visited.add(varName)

  // If it's a parameter, return it
  if (paramNames.has(varName)) {
    return new Set([varName])
  }

  const varInfo = analysis.variables.get(varName)
  if (!varInfo) return new Set()

  // Trace through dependencies
  const params = new Set<string>()
  varInfo.dependencies.forEach(dep => {
    const depParams = traceToParameters(dep, analysis, paramNames, new Set(visited))
    depParams.forEach(p => params.add(p))
  })

  return params
}

export function groupVariantStatementsByParams(
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
  analysis: AnalysisResult,
  paramNames: Set<string>,
  scalarParams: string[],
  paramModes: Record<string, 'scalar' | 'audio'>,
): Map<string, Stmt[]> {
  const groups = new Map<string, Stmt[]>()

  // Helper functions (same as above, but for variant statements)
  const checkVariantAudioDep = (stmt: Stmt): boolean => {
    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      const affectingParams = new Set<string>()

      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (paramNames.has(dep)) {
          affectingParams.add(dep)
        }
      })

      varInfo.dependencies.forEach(dep => {
        const params = traceToParameters(dep, analysis, paramNames)
        params.forEach(p => affectingParams.add(p))
      })

      const audioParams = Array.from(paramNames).filter(p => {
        const param = gen.parameters.find(par => par.name === p)
        return param && paramModes[p] === 'audio'
      })
      return audioParams.some(p => affectingParams.has(p))
    }
    else if (stmt.type === 'if') {
      const condDeps = collectIdentifiers(stmt.condition)
      const audioParams = Array.from(paramNames).filter(p => {
        const param = gen.parameters.find(par => par.name === p)
        return param && paramModes[p] === 'audio'
      })
      if (Array.from(condDeps).some(dep => audioParams.includes(dep))) {
        return true
      }
      return false
    }
    else if (stmt.type === 'forIn') {
      const iterDeps = collectIdentifiers(stmt.iterable)
      const audioParams = Array.from(paramNames).filter(p => {
        const param = gen.parameters.find(par => par.name === p)
        return param && paramModes[p] === 'audio'
      })
      return Array.from(iterDeps).some(dep => audioParams.includes(dep))
    }
    else if (stmt.type === 'switch') {
      const exprDeps = collectIdentifiers(stmt.expr)
      const audioParams = Array.from(paramNames).filter(p => {
        const param = gen.parameters.find(par => par.name === p)
        return param && paramModes[p] === 'audio'
      })
      if (Array.from(exprDeps).some(dep => audioParams.includes(dep))) {
        return true
      }
      return stmt.cases.some(c => c.stmts.some(checkVariantAudioDep))
    }
    else if (stmt.type === 'block') {
      return stmt.stmts.some(checkVariantAudioDep)
    }
    else if (stmt.type === 'break' || stmt.type === 'continue') {
      return false
    }
    return false
  }

  const collectVariantStmtParams = (stmt: Stmt): Set<string> => {
    const affectingParams = new Set<string>()

    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (paramNames.has(dep)) {
          affectingParams.add(dep)
        }
      })
      varInfo.dependencies.forEach(dep => {
        const params = traceToParameters(dep, analysis, paramNames)
        params.forEach(p => affectingParams.add(p))
      })
    }
    else if (stmt.type === 'if') {
      const condDeps = collectIdentifiers(stmt.condition)
      condDeps.forEach(dep => {
        if (paramNames.has(dep)) {
          affectingParams.add(dep)
        }
      })
      stmt.thenBranch.forEach(s => {
        collectVariantStmtParams(s).forEach(p => affectingParams.add(p))
      })
      stmt.elseBranch?.forEach(s => {
        collectVariantStmtParams(s).forEach(p => affectingParams.add(p))
      })
    }
    else if (stmt.type === 'switch') {
      const exprDeps = collectIdentifiers(stmt.expr)
      exprDeps.forEach(dep => {
        if (paramNames.has(dep)) {
          affectingParams.add(dep)
        }
      })
      stmt.cases.forEach(c => {
        if (c.value) {
          const valueDeps = collectIdentifiers(c.value)
          valueDeps.forEach(dep => {
            if (paramNames.has(dep)) {
              affectingParams.add(dep)
            }
          })
        }
        c.stmts.forEach(s => {
          collectVariantStmtParams(s).forEach(p => affectingParams.add(p))
        })
      })
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(s => {
        collectVariantStmtParams(s).forEach(p => affectingParams.add(p))
      })
    }

    return affectingParams
  }

  variant.stmts.forEach(stmt => {
    // Skip statements that depend on audio parameters
    if (checkVariantAudioDep(stmt)) {
      return
    }

    // Collect parameter dependencies
    const affectingParams = collectVariantStmtParams(stmt)

    // Determine which scalar parameters affect this statement
    const relevantParams = scalarParams.filter(p => affectingParams.has(p))

    // Create condition key: sorted parameter changes
    const conditionKey = relevantParams.length > 0
      ? relevantParams.map(p => `${p}Changed`).join(' || ')
      : 'true'

    if (!groups.has(conditionKey)) {
      groups.set(conditionKey, [])
    }
    groups.get(conditionKey)!.push(stmt)
  })

  return groups
}

// System parameters that can change between process calls and need change detection
export const trackableSystemParams = [
  'sampleRate',
  'nyquist',
  'piOverNyquist',
  'bpm',
  'co',
  'samplesPerBeat',
  'samplesPerBar',
]

export function groupStatementsByParams(
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
  analysis: AnalysisResult,
  paramModes: Record<string, 'scalar' | 'audio'>,
): Map<string, { control: Stmt[]; variant: Stmt[] }> {
  const paramNames = gen.parameters.map(p => p.name)
  const fieldNames = new Set(gen.fields.map(f => f.name))
  const scalarParams = paramNames.filter(p => paramModes[p] === 'scalar')
  const paramNamesSet = new Set(paramNames)
  const hasScalarParams = scalarParams.length > 0

  if (!hasScalarParams) {
    // Check if any trackable system parameters are used in control statements
    const usesSystemParam = (s: Stmt, p: string): boolean => {
      if (s.type === 'assign') {
        return collectIdentifiers(s.expr).has(p)
      }
      else if (s.type === 'if') {
        if (collectIdentifiers(s.condition).has(p)) return true
        if (s.thenBranch.some(st => usesSystemParam(st, p))) return true
        if (s.elseBranch?.some(st => usesSystemParam(st, p))) return true
      }
      else if (s.type === 'block') {
        return s.stmts.some(st => usesSystemParam(st, p))
      }
      else if (s.type === 'forIn') {
        if (collectIdentifiers(s.iterable).has(p)) return true
        return s.body.some(st => usesSystemParam(st, p))
      }
      else if (s.type === 'switch') {
        if (collectIdentifiers(s.expr).has(p)) return true
        return s.cases.some(c => {
          if (c.value && collectIdentifiers(c.value).has(p)) return true
          return c.stmts.some(st => usesSystemParam(st, p))
        })
      }
      return false
    }

    const hasSystemParamUsage = gen.control.some(stmt =>
      trackableSystemParams.some(param => usesSystemParam(stmt, param))
    )

    if (!hasSystemParamUsage) {
      const allGroups = new Map<string, { control: Stmt[]; variant: Stmt[] }>()
      allGroups.set('always', { control: gen.control, variant: variant.stmts })
      return allGroups
    }

    // System params are used - need to create conditional groups
    // Group control statements by system parameter dependencies
    const controlGroups = new Map<string, Stmt[]>()

    gen.control.forEach(stmt => {
      // Check which trackable system parameters are used in this statement
      const conditionParts: string[] = []
      for (const param of trackableSystemParams) {
        if (usesSystemParam(stmt, param)) {
          conditionParts.push(`${param}Changed`)
        }
      }

      const conditionKey = conditionParts.length > 0
        ? conditionParts.join(' || ')
        : 'true'

      if (!controlGroups.has(conditionKey)) {
        controlGroups.set(conditionKey, [])
      }
      controlGroups.get(conditionKey)!.push(stmt)
    })

    // Combine control and variant groups
    const allGroups = new Map<string, { control: Stmt[]; variant: Stmt[] }>()
    controlGroups.forEach((stmts, condition) => {
      allGroups.set(condition, { control: stmts, variant: [] })
    })
    // Add variant statements to 'true' condition (always execute)
    if (!allGroups.has('true')) {
      allGroups.set('true', { control: [], variant: [] })
    }
    allGroups.get('true')!.variant = variant.stmts

    return allGroups
  }

  // Control computations - group by parameter dependencies
  const controlGroups = new Map<string, Stmt[]>()

  // Helper to check if a statement depends on audio parameters
  const checkAudioDep = (stmt: Stmt): boolean => {
    const audioParams = paramNames.filter(p => paramModes[p] === 'audio')

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

      return audioParams.some(p => affectingParams.has(p))
    }
    else if (stmt.type === 'expr') {
      // Expression statements depend on audio if they reference audio params
      const exprDeps = collectIdentifiers(stmt.expr)
      return Array.from(exprDeps).some(dep => audioParams.includes(dep))
    }
    else if (stmt.type === 'if') {
      // Check condition and branches
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
      return stmt.cases.some(c => c.stmts.some(checkAudioDep))
    }
    else if (stmt.type === 'block') {
      return stmt.stmts.some(checkAudioDep)
    }
    else if (stmt.type === 'break' || stmt.type === 'continue') {
      return false
    }
    return false
  }

  // Helper to collect parameter dependencies from a statement
  // For if statements, prioritize condition dependencies over body dependencies for grouping
  const collectStmtParams = (stmt: Stmt, prioritizeCondition: boolean = false): Set<string> => {
    const affectingParams = new Set<string>()

    if (stmt.type === 'assign') {
      const varInfo = analysis.variables.get(stmt.name)!
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
    }
    else if (stmt.type === 'if') {
      // For grouping, use only condition dependencies (not body dependencies)
      const condDeps = collectIdentifiers(stmt.condition)
      condDeps.forEach(dep => {
        if (paramNamesSet.has(dep)) {
          affectingParams.add(dep)
        }
      })
      // Also trace condition dependencies through variables
      condDeps.forEach(dep => {
        if (!paramNamesSet.has(dep) && !systemParams.has(dep)) {
          const params = traceToParameters(dep, analysis, paramNamesSet)
          params.forEach(p => affectingParams.add(p))
        }
      })

      // Don't include body dependencies for grouping - if statements are grouped by condition only
    }
    else if (stmt.type === 'switch') {
      const exprDeps = collectIdentifiers(stmt.expr)
      exprDeps.forEach(dep => {
        if (paramNamesSet.has(dep)) {
          affectingParams.add(dep)
        }
      })
      exprDeps.forEach(dep => {
        if (!paramNamesSet.has(dep) && !systemParams.has(dep)) {
          const params = traceToParameters(dep, analysis, paramNamesSet)
          params.forEach(p => affectingParams.add(p))
        }
      })
    }
    else if (stmt.type === 'block') {
      stmt.stmts.forEach(s => {
        collectStmtParams(s, prioritizeCondition).forEach(p => affectingParams.add(p))
      })
    }

    return affectingParams
  }

  gen.control.forEach(stmt => {
    // Skip statements that depend on audio parameters
    if (checkAudioDep(stmt)) {
      return
    }

    // Collect parameter dependencies
    // For if statements, prioritize condition dependencies for grouping
    const affectingParams = collectStmtParams(stmt, stmt.type === 'if')

    // Determine which scalar parameters affect this statement
    const relevantParams = scalarParams.filter(p => affectingParams.has(p))

    // Check which trackable system parameters are used in this statement
    const usesSystemParam = (s: Stmt, param: string): boolean => {
      if (s.type === 'assign') {
        return collectIdentifiers(s.expr).has(param)
      }
      else if (s.type === 'if') {
        if (collectIdentifiers(s.condition).has(param)) return true
        if (s.thenBranch.some(st => usesSystemParam(st, param))) return true
        if (s.elseBranch?.some(st => usesSystemParam(st, param))) return true
      }
      else if (s.type === 'block') {
        return s.stmts.some(st => usesSystemParam(st, param))
      }
      else if (s.type === 'forIn') {
        if (collectIdentifiers(s.iterable).has(param)) return true
        return s.body.some(st => usesSystemParam(st, param))
      }
      else if (s.type === 'switch') {
        if (collectIdentifiers(s.expr).has(param)) return true
        return s.cases.some(c => {
          if (c.value && collectIdentifiers(c.value).has(param)) return true
          return c.stmts.some(st => usesSystemParam(st, param))
        })
      }
      return false
    }

    const conditionParts: string[] = []
    if (relevantParams.length > 0) {
      conditionParts.push(...relevantParams.map(p => `${p}Changed`))
    }
    // Add change detection for any trackable system parameters used in this statement
    for (const param of trackableSystemParams) {
      if (usesSystemParam(stmt, param)) {
        conditionParts.push(`${param}Changed`)
      }
    }

    // Create condition key: sorted parameter changes
    const conditionKey = conditionParts.length > 0
      ? conditionParts.join(' || ')
      : 'true'

    if (!controlGroups.has(conditionKey)) {
      controlGroups.set(conditionKey, [])
    }
    controlGroups.get(conditionKey)!.push(stmt)
  })

  // Assignments to fields that are used in audio must run every process() so move them to 'true'.
  // Do not move when the RHS depends on a scalar param (e.g. ah = f(k)) so they stay in kChanged and update when k changes.
  const scalarParamsSet = new Set(scalarParams)
  const stmtRefsScalarParam = (s: Stmt): boolean => {
    if (s.type !== 'assign') return false
    const ids = collectIdentifiers(s.expr)
    return Array.from(ids).some(id => scalarParamsSet.has(id))
  }
  const fieldsUsedInAudio = new Set(
    gen.fields.filter(f => {
      const v = analysis.variables.get(f.name)
      return v?.usedIn.has('audio')
    }).map(f => f.name),
  )
  if (fieldsUsedInAudio.size > 0) {
    const allToMove: Stmt[] = []
    controlGroups.forEach((stmts, condition) => {
      if (condition === 'true') return
      const toMove: Stmt[] = []
      const keep = stmts.filter(s => {
        if (s.type === 'assign' && fieldsUsedInAudio.has(s.name) && !stmtRefsScalarParam(s)) {
          toMove.push(s)
          return false
        }
        return true
      })
      if (toMove.length > 0) {
        controlGroups.set(condition, keep)
        allToMove.push(...toMove)
      }
    })
    if (allToMove.length > 0) {
      const lhsNames = new Set(
        allToMove.filter((s): s is Stmt & { type: 'assign' } => s.type === 'assign').map(s => s.name),
      )
      const deps = (s: Stmt): Set<string> => {
        if (s.type !== 'assign') return new Set()
        const ids = collectIdentifiers(s.expr)
        const internal = new Set<string>()
        ids.forEach(id => {
          if (lhsNames.has(id)) internal.add(id)
        })
        return internal
      }
      const sorted: Stmt[] = []
      const visited = new Set<Stmt>()
      const visit = (s: Stmt) => {
        if (visited.has(s)) return
        visited.add(s)
        const depNames = deps(s)
        allToMove.forEach(t => {
          if (t.type === 'assign' && depNames.has(t.name)) visit(t)
        })
        sorted.push(s)
      }
      allToMove.forEach(s => visit(s))
      if (!controlGroups.has('true')) {
        controlGroups.set('true', [])
      }
      controlGroups.get('true')!.push(...sorted)
    }
  }

  // Fix cross-block deps: subset sets X, superset sets Y=f(X), subset uses Y. Duplicate Y assignment into subset after X.
  const parseCondTerms = (c: string) => new Set(c.split(/\s*\|\|\s*/).map(s => s.trim()))
  controlGroups.forEach((subsetStmts, subsetCond) => {
    if (subsetCond === 'true') return
    const subsetTerms = parseCondTerms(subsetCond)
    controlGroups.forEach((supersetStmts, supersetCond) => {
      if (supersetCond === 'true' || subsetCond === supersetCond) return
      const supersetTerms = parseCondTerms(supersetCond)
      if (subsetTerms.size >= supersetTerms.size) return
      if (![...subsetTerms].every(t => supersetTerms.has(t))) return
      const subsetSets = new Set(
        subsetStmts.filter((s): s is Stmt & { type: 'assign' } => s.type === 'assign').map(s => s.name),
      )
      const subsetUses = (stmts: Stmt[]) => {
        const uses = new Set<string>()
        stmts.forEach(s => {
          if (s.type === 'assign') collectIdentifiers(s.expr).forEach(id => uses.add(id))
          else if (s.type === 'if') collectIdentifiers(s.condition).forEach(id => uses.add(id))
        })
        return uses
      }
      const usesInSubset = subsetUses(subsetStmts)
      const toInsert: Stmt[] = []
      supersetStmts.forEach(s => {
        if (s.type !== 'assign') return
        const exprDeps = collectIdentifiers(s.expr)
        const dependsOnSubset = [...exprDeps].some(d => subsetSets.has(d))
        if (!dependsOnSubset || !usesInSubset.has(s.name)) return
        toInsert.push(s)
      })
      if (toInsert.length === 0) return
      const insertAfter = new Set(toInsert.flatMap(s => s.type === 'assign' ? [...collectIdentifiers(s.expr)] : []))
      let insertIdx = 0
      for (let i = 0; i < subsetStmts.length; i++) {
        const stmt = subsetStmts[i]
        if (stmt.type === 'assign' && insertAfter.has(stmt.name)) insertIdx = i + 1
      }
      subsetStmts.splice(insertIdx, 0, ...toInsert)
    })
  })

  // Get variant groups
  const variantGroups = groupVariantStatementsByParams(gen, variant, analysis, paramNamesSet, scalarParams, paramModes)

  // Merge variant groups with the same condition
  const mergedVariantGroups = new Map<string, Stmt[]>()
  variantGroups.forEach((stmts, condition) => {
    if (!mergedVariantGroups.has(condition)) {
      mergedVariantGroups.set(condition, [])
    }
    mergedVariantGroups.get(condition)!.push(...stmts)
  })

  // Combine control and variant groups by condition
  const allGroups = new Map<string, { control: Stmt[]; variant: Stmt[] }>()

  controlGroups.forEach((stmts, condition) => {
    if (!allGroups.has(condition)) {
      allGroups.set(condition, { control: [], variant: [] })
    }
    allGroups.get(condition)!.control = stmts
  })

  mergedVariantGroups.forEach((stmts, condition) => {
    if (!allGroups.has(condition)) {
      allGroups.set(condition, { control: [], variant: [] })
    }
    allGroups.get(condition)!.variant = stmts
  })

  return allGroups
}

// Mark variables that are used to compute variables that need to be fields
// But exclude function parameters and system variables
export const systemParams = new Set([
  'bufferLength',
  'sampleCount',
  'sampleRate',
  'nyquist',
  'piOverNyquist',
  'bpm',
  'co',
  'samplesPerBeat',
  'samplesPerBar',
  'input$',
  'output$',
  'inputLeft$',
  'inputRight$',
  'outputLeft$',
  'outputRight$',
  'TWO_PI',
  'PI',
  'E',
  'input', // Special audio loop variable
  'output', // Special audio loop variable
  'inputLeft', // Special stereo audio loop variable
  'inputRight', // Special stereo audio loop variable
  'outputLeft', // Special stereo audio loop variable
  'outputRight', // Special stereo audio loop variable
])

export function collectUsedBeforeAssignedWithControlFlow(stmts: Stmt[],
  isTracked: (name: string) => boolean): Set<string>
{
  const usedBeforeAssigned = new Set<string>()

  const markReads = (ids: Set<string>, definitelyAssigned: Set<string>): void => {
    ids.forEach(id => {
      if (!isTracked(id)) return
      if (!definitelyAssigned.has(id)) {
        usedBeforeAssigned.add(id)
      }
    })
  }

  const intersect = (a: Set<string>, b: Set<string>): Set<string> => {
    const out = new Set<string>()
    a.forEach(v => {
      if (b.has(v)) out.add(v)
    })
    return out
  }

  const walk = (block: Stmt[], inAssigned: Set<string>): Set<string> => {
    let definitelyAssigned = new Set(inAssigned)
    for (const stmt of block) {
      if (stmt.type === 'assign') {
        markReads(collectIdentifiers(stmt.expr), definitelyAssigned)
        definitelyAssigned.add(stmt.name)
      }
      else if (stmt.type === 'expr') {
        markReads(collectIdentifiers(stmt.expr), definitelyAssigned)
      }
      else if (stmt.type === 'block') {
        definitelyAssigned = walk(stmt.stmts, definitelyAssigned)
      }
      else if (stmt.type === 'if') {
        markReads(collectIdentifiers(stmt.condition), definitelyAssigned)
        const thenAssigned = walk(stmt.thenBranch, definitelyAssigned)
        const elseAssigned = stmt.elseBranch?.length
          ? walk(stmt.elseBranch, definitelyAssigned)
          : new Set(definitelyAssigned)
        definitelyAssigned = intersect(thenAssigned, elseAssigned)
      }
      else if (stmt.type === 'forIn') {
        markReads(collectIdentifiers(stmt.iterable), definitelyAssigned)
        walk(stmt.body, definitelyAssigned)
        // Loop may execute zero times; don't promote assignments from body to definite.
      }
      else if (stmt.type === 'switch') {
        markReads(collectIdentifiers(stmt.expr), definitelyAssigned)
        // All cases must assign for it to be definite
        const caseAssignments = stmt.cases.map(c => walk(c.stmts, definitelyAssigned))
        if (caseAssignments.length > 0) {
          // Reduce pairwise; avoids TS spread/tuple restriction.
          definitelyAssigned = caseAssignments.reduce((acc, cur) => intersect(acc, cur))
        }
      }
      else if (stmt.type === 'break' || stmt.type === 'continue') {
        // No effect on definite assignment
      }
    }
    return definitelyAssigned
  }

  walk(stmts, new Set())
  return usedBeforeAssigned
}

export function determineFieldsAfterPlacement(
  analysis: AnalysisResult,
  allGroups: Map<string, { control: Stmt[]; variant: Stmt[] }>,
  gen: Gen,
  variant: { name: string; stmts: Stmt[] },
  hasScalarParams: boolean,
  paramModes: Record<string, 'scalar' | 'audio'>,
): void {
  const paramNames = new Set(gen.parameters.map(p => p.name))
  const audioParams = Array.from(paramNames).filter(p => paramModes[p] === 'audio')
  const paramNamesSet = new Set(paramNames)

  // Map each statement to its condition block
  const stmtToCondition = new Map<Stmt, string>()

  if (hasScalarParams) {
    allGroups.forEach(({ control, variant: variantStmts }, condition) => {
      control.forEach(stmt => stmtToCondition.set(stmt, condition))
      variantStmts.forEach(stmt => stmtToCondition.set(stmt, condition))
    })
  }
  else {
    // No scalar params - all control/variant statements are in the same "block"
    gen.control.forEach(stmt => stmtToCondition.set(stmt, 'always'))
    variant.stmts.forEach(stmt => stmtToCondition.set(stmt, 'always'))
  }

  // Map each variable to the conditions where it's assigned and used
  const varAssignConditions = new Map<string, Set<string>>()
  const varUseConditions = new Map<string, Set<string>>()

  analysis.variables.forEach((varInfo, name) => {
    if (systemParams.has(name) || paramNames.has(name)) {
      return
    }

    const assignConditions = new Set<string>()
    const useConditions = new Set<string>()

    // Track assignments
    if (varInfo.assignedIn.has('control')) {
      gen.control.forEach(stmt => {
        if (stmt.type === 'assign' && stmt.name === name) {
          const condition = stmtToCondition.get(stmt) || 'always'
          assignConditions.add(condition)
        }
      })
    }
    if (varInfo.assignedIn.has('variant')) {
      variant.stmts.forEach(stmt => {
        if (stmt.type === 'assign' && stmt.name === name) {
          const condition = stmtToCondition.get(stmt) || 'always'
          assignConditions.add(condition)
        }
      })
    }
    if (varInfo.assignedIn.has('audio')) {
      assignConditions.add('audio')
    }

    // Track uses - for each statement that uses this variable, find its condition
    if (varInfo.usedIn.has('control')) {
      const walkForUses = (stmt: Stmt, parentCondition: string = 'always'): void => {
        let currentCondition = parentCondition
        if (stmtToCondition.has(stmt)) {
          currentCondition = stmtToCondition.get(stmt) || 'always'
        }

        // Check if this statement uses the variable
        let usesVar = false
        if (stmt.type === 'assign') {
          usesVar = collectIdentifiers(stmt.expr).has(name)
        }
        else if (stmt.type === 'if') {
          usesVar = collectIdentifiers(stmt.condition).has(name)
        }
        else if (stmt.type === 'forIn') {
          usesVar = collectIdentifiers(stmt.iterable).has(name)
        }
        else if (stmt.type === 'switch') {
          usesVar = collectIdentifiers(stmt.expr).has(name)
        }

        if (usesVar) {
          useConditions.add(currentCondition)
        }

        // Recurse into nested statements
        if (stmt.type === 'block') {
          stmt.stmts.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'if') {
          stmt.thenBranch.forEach(s => walkForUses(s, currentCondition))
          stmt.elseBranch?.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'forIn') {
          stmt.body.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'switch') {
          stmt.cases.forEach(c => c.stmts.forEach(s => walkForUses(s, currentCondition)))
        }
      }
      gen.control.forEach(stmt => walkForUses(stmt))
    }
    if (varInfo.usedIn.has('variant')) {
      const walkForUses = (stmt: Stmt, parentCondition: string = 'always'): void => {
        let currentCondition = parentCondition
        if (stmtToCondition.has(stmt)) {
          currentCondition = stmtToCondition.get(stmt) || 'always'
        }

        // Check if this statement uses the variable
        let usesVar = false
        if (stmt.type === 'assign') {
          usesVar = collectIdentifiers(stmt.expr).has(name)
        }
        else if (stmt.type === 'if') {
          usesVar = collectIdentifiers(stmt.condition).has(name)
        }
        else if (stmt.type === 'forIn') {
          usesVar = collectIdentifiers(stmt.iterable).has(name)
        }
        else if (stmt.type === 'switch') {
          usesVar = collectIdentifiers(stmt.expr).has(name)
        }

        if (usesVar) {
          useConditions.add(currentCondition)
        }

        // Recurse into nested statements
        if (stmt.type === 'block') {
          stmt.stmts.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'if') {
          stmt.thenBranch.forEach(s => walkForUses(s, currentCondition))
          stmt.elseBranch?.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'forIn') {
          stmt.body.forEach(s => walkForUses(s, currentCondition))
        }
        else if (stmt.type === 'switch') {
          stmt.cases.forEach(c => c.stmts.forEach(s => walkForUses(s, currentCondition)))
        }
      }
      variant.stmts.forEach(stmt => walkForUses(stmt))
    }
    if (varInfo.usedIn.has('audio')) {
      useConditions.add('audio')
    }

    varAssignConditions.set(name, assignConditions)
    varUseConditions.set(name, useConditions)
  })

  // First, identify variables that depend on audio parameters - these should never be fields
  const dependsOnAudioParams = new Set<string>()

  // Find all statements that directly use audio parameters
  const checkStmtForAudio = (stmt: Stmt): Set<string> => {
    const audioDeps = new Set<string>()
    if (stmt.type === 'assign') {
      const directDeps = collectIdentifiers(stmt.expr)
      directDeps.forEach(dep => {
        if (audioParams.includes(dep)) {
          audioDeps.add(stmt.name)
        }
      })
    }
    return audioDeps
  }

  // Check all control and variant statements
  gen.control.forEach(stmt => {
    const deps = checkStmtForAudio(stmt)
    deps.forEach(v => dependsOnAudioParams.add(v))
  })
  variant.stmts.forEach(stmt => {
    const deps = checkStmtForAudio(stmt)
    deps.forEach(v => dependsOnAudioParams.add(v))
  })

  // Transitive: if a variable depends on an audio-dependent variable, it's also audio-dependent
  let changed = true
  while (changed) {
    changed = false
    analysis.variables.forEach((varInfo, name) => {
      if (systemParams.has(name) || paramNames.has(name)) return
      if (dependsOnAudioParams.has(name)) return

      // Check if any dependency is audio-dependent
      for (const dep of varInfo.dependencies) {
        if (dependsOnAudioParams.has(dep)) {
          dependsOnAudioParams.add(name)
          changed = true
          break
        }
      }

      // Also check direct dependencies in assignment statements
      gen.control.forEach(stmt => {
        if (stmt.type === 'assign' && stmt.name === name) {
          const directDeps = collectIdentifiers(stmt.expr)
          directDeps.forEach(dep => {
            if (dependsOnAudioParams.has(dep)) {
              dependsOnAudioParams.add(name)
              changed = true
            }
          })
        }
      })
      variant.stmts.forEach(stmt => {
        if (stmt.type === 'assign' && stmt.name === name) {
          const directDeps = collectIdentifiers(stmt.expr)
          directDeps.forEach(dep => {
            if (dependsOnAudioParams.has(dep)) {
              dependsOnAudioParams.add(name)
              changed = true
            }
          })
        }
      })
    })
  }

  // Check if variables are used before they're assigned in the same block
  // If so, they need to be fields (using value from previous call)
  const usedBeforeAssigned = new Set<string>()
  const audioUsedBeforeAssigned = new Set<string>()

  const findAssignments = (stmts: Stmt[]): Map<string, number> => {
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
      }
      else if (s.type === 'forIn') {
        s.body.forEach(walk)
      }
    }

    stmts.forEach(walk)
    return assignments
  }

  const findUses = (stmts: Stmt[]): Map<string, number> => {
    const uses = new Map<string, number>()
    let index = 0

    const walk = (s: Stmt): void => {
      if (s.type === 'assign') {
        collectIdentifiers(s.expr).forEach(dep => {
          if (!systemParams.has(dep) && !paramNames.has(dep) && !uses.has(dep)) {
            uses.set(dep, index)
          }
        })
        index++
      }
      else if (s.type === 'if') {
        collectIdentifiers(s.condition).forEach(dep => {
          if (!systemParams.has(dep) && !paramNames.has(dep) && !uses.has(dep)) {
            uses.set(dep, index)
          }
        })
        s.thenBranch.forEach(walk)
        s.elseBranch?.forEach(walk)
        index++
      }
      else if (s.type === 'block') {
        s.stmts.forEach(walk)
      }
      else if (s.type === 'forIn') {
        collectIdentifiers(s.iterable).forEach(dep => {
          if (!systemParams.has(dep) && !paramNames.has(dep) && !uses.has(dep)) {
            uses.set(dep, index)
          }
        })
        s.body.forEach(walk)
        index++
      }
    }

    stmts.forEach(walk)
    return uses
  }

  const checkUseBeforeAssign = (stmts: Stmt[]): void => {
    const assignments = findAssignments(stmts)
    const uses = findUses(stmts)

    uses.forEach((useIndex, varName) => {
      const assignIndex = assignments.get(varName)
      // If used and assigned, and used before assigned, it needs to be a field
      if (assignIndex !== undefined && useIndex < assignIndex) {
        usedBeforeAssigned.add(varName)
      }
    })
  }

  checkUseBeforeAssign(gen.control)
  checkUseBeforeAssign(variant.stmts)

  // Check both audio and stereo blocks
  const audioBlock = gen.audio
  const stereoBlock = gen.stereo && gen.stereo.length > 0 ? gen.stereo : []
  const audioAssignedSomewhere = new Set<string>([
    ...Array.from(findAssignments(audioBlock).keys()),
    ...Array.from(findAssignments(stereoBlock).keys()),
  ])
  const audioFlowUsedBeforeAssigned = new Set<string>([
    ...collectUsedBeforeAssignedWithControlFlow(
      audioBlock,
      name => audioAssignedSomewhere.has(name) && !systemParams.has(name) && !paramNames.has(name),
    ),
    ...collectUsedBeforeAssignedWithControlFlow(
      stereoBlock,
      name => audioAssignedSomewhere.has(name) && !systemParams.has(name) && !paramNames.has(name),
    ),
  ])
  audioFlowUsedBeforeAssigned.forEach(name => audioUsedBeforeAssigned.add(name))

  // Determine which variables need to be fields
  analysis.variables.forEach((varInfo, name) => {
    if (systemParams.has(name) || paramNames.has(name)) {
      return
    }

    // If used before assigned in the same block, needs to be a field
    // This takes precedence over audio dependency - even if it depends on audio params,
    // if it's used before assigned, it must be a field to persist across calls
    if (usedBeforeAssigned.has(name)) {
      varInfo.needsField = true
      return
    }

    // Skip variables that depend on audio parameters - they should be locals
    if (dependsOnAudioParams.has(name)) {
      return
    }

    const assignConditions = varAssignConditions.get(name) || new Set()
    const useConditions = varUseConditions.get(name) || new Set()

    const assignedInControl = varInfo.assignedIn.has('control')
    const assignedInVariant = varInfo.assignedIn.has('variant')
    const assignedInAudio = varInfo.assignedIn.has('audio')
    const usedInControl = varInfo.usedIn.has('control')
    const usedInVariant = varInfo.usedIn.has('variant')
    const usedInAudio = varInfo.usedIn.has('audio')

    // Control/variant -> audio: must be field so value persists when condition doesn't run
    if ((assignedInControl || assignedInVariant) && usedInAudio) {
      varInfo.needsField = true
      return
    }

    // State variable: assigned and used in audio (persists across loop iterations)
    if (assignedInAudio && usedInAudio) {
      if (audioUsedBeforeAssigned.has(name)) {
        varInfo.needsField = true
        return
      }
    }

    // Cross-boundary: control -> variant or variant -> control
    // But only if they're in different conditional blocks
    if (assignedInControl && usedInVariant) {
      const assignConds = varAssignConditions.get(name) || new Set()
      const useConds = varUseConditions.get(name) || new Set()
      // If assigned and used in different conditions, needs field
      const hasOverlap = Array.from(assignConds).some(ac => useConds.has(ac))
      // Only mark as field if no overlap OR multiple conditions involved
      // If same single condition, it can be local
      if (!hasOverlap) {
        varInfo.needsField = true
        return
      }
      // If same condition and only one condition, can be local
      if (hasOverlap && assignConds.size === 1 && useConds.size === 1) {
        // Check if it's the exact same condition string
        const assignCond = Array.from(assignConds)[0]
        const useCond = Array.from(useConds)[0]
        if (assignCond === useCond) {
          // Exact same condition - can be local, don't mark as field
          // Continue to check other conditions (like audio usage)
        }
        else {
          // Different condition strings even though they overlap - needs field
          varInfo.needsField = true
          return
        }
      }
      else {
        // Multiple conditions or no exact match - needs field
        varInfo.needsField = true
        return
      }
    }
    if (assignedInVariant && usedInControl) {
      const assignConds = varAssignConditions.get(name) || new Set()
      const useConds = varUseConditions.get(name) || new Set()
      const hasOverlap = Array.from(assignConds).some(ac => useConds.has(ac))
      if (!hasOverlap) {
        varInfo.needsField = true
        return
      }
      if (hasOverlap && assignConds.size === 1 && useConds.size === 1) {
        const assignCond = Array.from(assignConds)[0]
        const useCond = Array.from(useConds)[0]
        if (assignCond === useCond) {
          // Same condition - can be local
        }
        else {
          varInfo.needsField = true
          return
        }
      }
      else {
        varInfo.needsField = true
        return
      }
    }

    // If assigned in one condition and used in a different condition, needs field
    if (assignConditions.size > 0 && useConditions.size > 0) {
      const hasOverlap = Array.from(assignConditions).some(ac => useConditions.has(ac))
      if (!hasOverlap) {
        varInfo.needsField = true
        return
      }
      // If assigned and used in the same condition(s), check if it's used elsewhere
      // If only used within the same condition(s) where assigned, it can be local
      // But if used in audio, it needs to be a field
      // For cross-boundary (control/variant), only mark as field if they're in different conditions
      if (hasOverlap && usedInAudio) {
        if (audioUsedBeforeAssigned.has(name)) {
          varInfo.needsField = true
          return
        }
      }
      // Cross-boundary check: only mark as field if in different conditions
      if (hasOverlap && (assignedInControl && usedInVariant) || (assignedInVariant && usedInControl)) {
        // Already handled by the cross-boundary check above, which checks for same condition
        // So we don't need to mark it here again
      }
    }
  })

  // Don't mark dependencies as fields just because their dependents are fields.
  // Only mark variables as fields if they themselves cross boundaries or are used in different conditions.
  // Dependencies that are only used within the same condition can be local even if their dependents are fields.
}

export function collectAudioVmSpecs(gens: Gen[]): {
  variants: GenVariantSpec[]
  specs: GenSpecializationSpec[]
  maxParamCount: number
} {
  const variants: GenVariantSpec[] = []
  const specs: GenSpecializationSpec[] = []
  let maxParamCount = 0

  for (const gen of gens) {
    const paramNames = gen.parameters.map(p => p.name)
    const variantList = gen.variants.length > 0
      ? gen.variants
      : [{ name: 'default', stmts: [], description: undefined }]
    const usesInput = stmtsUseIdentifier(gen.audio, 'input')
      || (gen.stereo && gen.stereo.length > 0
        && (stmtsUseIdentifier(gen.stereo, 'inputLeft') || stmtsUseIdentifier(gen.stereo, 'inputRight')))

    const hasStereoBlock = gen.stereo && gen.stereo.length > 0
    const hasAudioBlock = gen.audio && gen.audio.length > 0
    const stereoOnly = hasStereoBlock && !hasAudioBlock

    for (const variant of variantList) {
      const paramModeArrays = generateParameterVariants(gen.parameters)
      const monoSpecializations: GenSpecializationSpec[] = []
      const stereoSpecializations: GenSpecializationSpec[] = []

      // Generate mono specializations
      for (const paramModeArray of paramModeArrays) {
        const paramModes: Record<string, 'scalar' | 'audio'> = {}
        paramNames.forEach((name, i) => {
          paramModes[name] = paramModeArray[i] as 'scalar' | 'audio'
        })

        const analysis = analyzeDependencies(gen, variant)
        const allGroups = groupStatementsByParams(gen, variant, analysis, paramModes)
        const hasScalarParams = paramNames.filter(p => paramModes[p] === 'scalar').length > 0
        determineFieldsAfterPlacement(analysis, allGroups, gen, variant, hasScalarParams, paramModes)

        const scalarParams = paramNames.filter(p => paramModes[p] === 'scalar')
        const fieldNames = new Set(gen.fields.map(f => f.name))
        const fieldVars = Array.from(analysis.variables.values())
          .filter(v => v.needsField && !fieldNames.has(v.name))
        const isStateful = gen.fields.length > 0 || fieldVars.length > 0 || scalarParams.length > 0

        const className = `${gen.name}_${variant.name}_${
          paramNames.map((p, i) => `${p}_${paramModeArray[i]}`).join('_')
        }`
        const emitCount = gen.emit ? gen.emit.length : 0
        const emitNames = gen.emit || []
        const spec: GenSpecializationSpec = {
          id: specs.length,
          genName: gen.name,
          variantName: variant.name,
          className,
          paramNames,
          paramModes: paramModeArray as Array<'scalar' | 'audio'>,
          paramCount: paramNames.length + emitCount,
          emitNames,
          isStateful,
          rate: gen.rate === 'control' ? 'control' : 'audio',
        }
        specs.push(spec)
        monoSpecializations.push(spec)
      }

      // Generate stereo specializations if stereo block exists
      if (hasStereoBlock) {
        for (const paramModeArray of paramModeArrays) {
          const paramModes: Record<string, 'scalar' | 'audio'> = {}
          paramNames.forEach((name, i) => {
            paramModes[name] = paramModeArray[i] as 'scalar' | 'audio'
          })

          const analysis = analyzeDependencies(gen, variant)
          const allGroups = groupStatementsByParams(gen, variant, analysis, paramModes)
          const hasScalarParams = paramNames.filter(p => paramModes[p] === 'scalar').length > 0
          determineFieldsAfterPlacement(analysis, allGroups, gen, variant, hasScalarParams, paramModes)

          const scalarParams = paramNames.filter(p => paramModes[p] === 'scalar')
          const fieldNames = new Set(gen.fields.map(f => f.name))
          const fieldVars = Array.from(analysis.variables.values())
            .filter(v => v.needsField && !fieldNames.has(v.name))
          const isStateful = gen.fields.length > 0 || fieldVars.length > 0 || scalarParams.length > 0

          const className = `${gen.name}_${variant.name}_${
            paramNames.map((p, i) => `${p}_${paramModeArray[i]}`).join('_')
          }_stereo`
          const emitCount = gen.emit ? gen.emit.length : 0
          const emitNames = gen.emit || []
          const spec: GenSpecializationSpec = {
            id: specs.length,
            genName: gen.name,
            variantName: variant.name,
            className,
            paramNames,
            paramModes: paramModeArray as Array<'scalar' | 'audio'>,
            paramCount: paramNames.length + emitCount,
            emitNames,
            isStateful,
            rate: gen.rate === 'control' ? 'control' : 'audio',
          }
          specs.push(spec)
          stereoSpecializations.push(spec)
        }
      }

      const emitCount = gen.emit ? gen.emit.length : 0
      variants.push({
        opName: `Gen${gen.name}_${variant.name}`,
        genName: gen.name,
        variantName: variant.name,
        paramNames,
        paramCount: paramNames.length + emitCount,
        usesInput,
        hasStereo: hasStereoBlock,
        stereoOnly,
        monoSpecializations,
        stereoSpecializations,
      })
      maxParamCount = Math.max(maxParamCount, paramNames.length + emitCount)
    }
  }

  return { variants, specs, maxParamCount }
}

export const audioVmUnaryOps = ['Neg', 'Not', 'BitNot'] as const
export const audioVmBinaryOps = [
  'Add',
  'Sub',
  'Mul',
  'Div',
  'Mod',
  'Pow',
  'Greater',
  'Less',
  'GreaterEqual',
  'LessEqual',
  'Equal',
  'NotEqual',
  'And',
  'Or',
  'BitAnd',
  'BitOr',
  'BitXor',
  'ShiftLeft',
  'ShiftRight',
] as const

export function getAudioVmOpNames(variants: GenVariantSpec[]): string[] {
  return [
    'Out',
    'Solo',
    'Post',
    'PushScalar',
    'PushAudio',
    'PushUndefined',
    'SetBpm',
    'Time',
    'TableLookup',
    'Alloc',
    'Write',
    'Read',
    'Tram',
    'Mini',
    'Timeline',
    'Oversample',
    'MakeArray',
    'ArrayGet',
    'ArraySet',
    'ArrayLen',
    'ArrayPush',
    'Walk',
    'Glide',
    'Step',
    'Random',
    'GetSystem',
    'GetGlobal',
    'GetLocal',
    'SetGlobal',
    'SetLocal',
    'GetClosure',
    'SetClosure',
    'GetCellRefLocal',
    'GetCellRefGlobal',
    'GetCellRefClosure',
    'DefineFunction',
    'CallFunction',
    'Return',
    'Throw',
    'PushTryBlock',
    'PopTryBlock',
    'Jump',
    'JumpIfFalse',
    'JumpIfTrue',
    'PushClosure',
    'PopScope',
    'Dup',
    'Pop',
    ...audioVmUnaryOps,
    ...audioVmBinaryOps,
    'IsUndefined',
    'IsScalar',
    'IsAudio',
    'IsArray',
    'IsFunction',
    'MathUnary',
    'MathBinary',
    'MathTernary',
    ...variants.map(v => v.opName),
  ]
}
