import SamJs from 'sam-js'
import { AudioVmOp, type GenSpec, genSpecs } from '../../dsp/audio-vm-bindings.ts'
import { gens } from '../../dsp/audio-vm-gens.ts'
import { sampleManager } from '../../lib/sample-manager.ts'
import type { Arg, Expr, Loc } from '../ast.ts'
import { compileExpr, error } from './core.ts'
import { compileDtofCall } from './hash-vars.ts'
import { compileMini } from './kernel/mini.ts'
import { compileRecord, processRecordCallSite } from './kernel/record.ts'
import { compileTimeline } from './kernel/timeline.ts'
import { compileTram } from './kernel/tram.ts'
import { getMathBinaryId, getMathTernaryId, getMathUnaryId } from './math-registry.ts'
import type { State } from './state.ts'
import type { FunctionInfo, HistorySourceMap, StoreShape, VariableInfo } from './types.ts'
import {
  compileGetVariable,
  compilePushCellRef,
  getArrayElementObjectKeysForExpr,
  getArrayElementObjectPropertyStoreShapesForExpr,
  getFunctionByName,
  getFunctionIdForVarInfo,
  getObjectKeysForExpr,
  getStoreShapeForExpr,
  lookupVariable,
} from './vars.ts'

const GEN_KEY_SEP = '\0'

const primaryGenNameByVariantName: Record<string, string> = Object.create(null)
const primarySpecByGenKey: Record<string, GenSpec> = Object.create(null)
const opCodeByGenKey: Record<string, number> = Object.create(null)
const paramHasByGenKey: Record<string, Record<string, true>> = Object.create(null)
const defaultsByGenName: Record<string, Record<string, number>> = Object.create(null)
const primaryGeneratorByCallNameCache = new Map<string, { genKey: string; spec: GenSpec } | null>()

const typePredOpByName: Record<string, AudioVmOp> = {
  isundefined: AudioVmOp.IsUndefined,
  isscalar: AudioVmOp.IsScalar,
  isaudio: AudioVmOp.IsAudio,
  isarray: AudioVmOp.IsArray,
  isfunction: AudioVmOp.IsFunction,
}
const PLAY_CALLBACK_OBJECT_KEYS = ['hz', 'trig'] as const

for (const [genName, desc] of Object.entries(gens)) {
  const out: Record<string, number> = Object.create(null)
  for (const p of desc.parameters) {
    if (p.default !== undefined) out[p.name] = p.default
  }
  defaultsByGenName[genName] = out
}

for (const s of genSpecs) {
  if (!(s.variantName in primaryGenNameByVariantName)) {
    primaryGenNameByVariantName[s.variantName] = s.genName
  }

  const key = `${s.genName}${GEN_KEY_SEP}${s.variantName}`
  if (key in primarySpecByGenKey) continue

  primarySpecByGenKey[key] = s

  const has: Record<string, true> = Object.create(null)
  for (const pn of s.paramNames) has[pn] = true
  paramHasByGenKey[key] = has

  const opName = `Gen${s.genName}_${s.variantName}` as keyof typeof AudioVmOp
  const opCode = (AudioVmOp as any)[opName] as number | undefined
  if (opCode !== undefined) opCodeByGenKey[key] = opCode
}

function resolvePrimaryGeneratorByCallName(funcName: string): { genKey: string; spec: GenSpec } | null {
  const cached = primaryGeneratorByCallNameCache.get(funcName)
  if (cached !== undefined) return cached

  const variantGenName = primaryGenNameByVariantName[funcName]
  const genName = variantGenName ?? (funcName.charAt(0).toUpperCase() + funcName.slice(1))
  const variantName = variantGenName ? funcName : 'default'
  const genKey = `${genName}${GEN_KEY_SEP}${variantName}`
  const spec = primarySpecByGenKey[genKey]
  const resolved = spec ? { genKey, spec } : null
  primaryGeneratorByCallNameCache.set(funcName, resolved)
  return resolved
}

function callNameFromCallee(callee: Expr): string {
  if (callee.type === 'identifier') return callee.name
  if (callee.type === 'member') return (callee as Extract<Expr, { type: 'member' }>).property
  if (callee.type === 'index') return '[]'
  return '?'
}

function bestEffortArgs(args: Arg[]): Record<string, Expr[]> {
  const out: Record<string, Expr[]> = {}
  let pos = 0
  for (let i = 0; i < args.length; i++) {
    const a = args[i]!
    const key = a.name ?? String(pos++)
    if (!out[key]) out[key] = []
    out[key].push(a.value)
  }
  return out
}

function countProvidedArgs(args: Arg[]): number {
  return args.length
}

function hasNamedArgument(args: Arg[]): boolean {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg.name) return true
    if (arg.shorthand && arg.value.type === 'identifier') return true
  }
  return false
}

function getArgValue(args: readonly Arg[], index: number): Expr | null {
  return args[index]?.value ?? null
}

function shouldUseNamedMatchingForGeneratorArgs(args: readonly Arg[], paramHas: Record<string, true>): boolean {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg.name) return true
    if (arg.shorthand && arg.value.type === 'identifier' && paramHas[arg.value.name]) return true
  }
  return false
}

function findParamIndexByPrefix(params: readonly string[], prefix: string): number {
  for (let i = 0; i < params.length; i++) {
    if (params[i]!.startsWith(prefix)) return i
  }
  return -1
}

function exprContainsArrayOrObjectLiteral(expr: Expr): boolean {
  switch (expr.type) {
    case 'array':
    case 'object':
      return true
    case 'binary':
      return exprContainsArrayOrObjectLiteral(expr.left) || exprContainsArrayOrObjectLiteral(expr.right)
    case 'unary':
      return exprContainsArrayOrObjectLiteral(expr.expr)
    case 'ternary':
      return exprContainsArrayOrObjectLiteral(expr.test)
        || exprContainsArrayOrObjectLiteral(expr.then)
        || exprContainsArrayOrObjectLiteral(expr.else)
    case 'call':
      if (exprContainsArrayOrObjectLiteral(expr.callee)) return true
      for (const arg of expr.args) {
        if (exprContainsArrayOrObjectLiteral(arg.value)) return true
      }
      return false
    case 'index':
      return exprContainsArrayOrObjectLiteral(expr.object) || exprContainsArrayOrObjectLiteral(expr.index)
    case 'member':
      return exprContainsArrayOrObjectLiteral(expr.object)
    default:
      return false
  }
}

function getValidatedStoreInitExpr(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  args: Arg[],
): Extract<Expr, { type: 'array' }> | Extract<Expr, { type: 'object' }> | null {
  if (args.length !== 1) {
    error(state, 'store(init) requires exactly 1 argument', callExpr.loc)
    return null
  }
  const initArg = getArgValue(args, 0)
  if (!initArg) {
    error(state, 'store(init) requires an initializer argument', callExpr.loc)
    return null
  }
  if (initArg.type !== 'array' && initArg.type !== 'object') {
    error(state, 'store(init) requires a top-level array or object literal', callExpr.loc)
    return null
  }
  if (initArg.type === 'array') {
    for (const item of initArg.items) {
      if (exprContainsArrayOrObjectLiteral(item)) {
        error(state, 'store(array) does not support nested array/object literals', item.loc)
        return null
      }
    }
  }
  else {
    for (const entry of initArg.entries) {
      if (exprContainsArrayOrObjectLiteral(entry.value)) {
        error(state, 'store(object) does not support nested array/object literals', entry.loc)
        return null
      }
    }
  }
  return initArg
}

function matchFixedArgs(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  funcName: string,
  args: Arg[],
  paramNames: string[],
): (Expr | null)[] | null {
  const matched: (Expr | null)[] = new Array(paramNames.length).fill(null)
  const paramIndexByName = new Map<string, number>()
  for (let i = 0; i < paramNames.length; i++) paramIndexByName.set(paramNames[i]!, i)
  const prefixMatchCache = new Map<string, number>()
  let positionalIndex = 0

  for (const arg of args) {
    if (arg.name) {
      const argName = arg.name
      let matchedParamIndex = prefixMatchCache.get(argName)
      if (matchedParamIndex === undefined) {
        matchedParamIndex = findParamIndexByPrefix(paramNames, argName)
        prefixMatchCache.set(argName, matchedParamIndex)
      }

      if (matchedParamIndex === -1) {
        error(state, `No parameter matches '${argName}' in ${funcName}()`, callExpr.loc)
        return null
      }

      if (matched[matchedParamIndex] !== null) {
        error(state, `Parameter '${paramNames[matchedParamIndex]}' already provided in ${funcName}()`, callExpr.loc)
        return null
      }

      matched[matchedParamIndex] = arg.value
    }
    else if (arg.shorthand && arg.value.type === 'identifier') {
      const shorthandName = arg.value.name
      const matchedParamIndex = paramIndexByName.get(shorthandName) ?? -1

      if (matchedParamIndex !== -1) {
        if (matched[matchedParamIndex] !== null) {
          error(state, `Parameter '${paramNames[matchedParamIndex]}' already provided in ${funcName}()`, callExpr.loc)
          return null
        }
        matched[matchedParamIndex] = arg.value
      }
      else {
        while (positionalIndex < paramNames.length && matched[positionalIndex] !== null) {
          positionalIndex++
        }

        if (positionalIndex >= paramNames.length) {
          error(state, `Too many arguments for ${funcName}()`, callExpr.loc)
          return null
        }

        matched[positionalIndex] = arg.value
        positionalIndex++
      }
    }
    else {
      while (positionalIndex < paramNames.length && matched[positionalIndex] !== null) {
        positionalIndex++
      }

      if (positionalIndex >= paramNames.length) {
        error(state, `Too many arguments for ${funcName}()`, callExpr.loc)
        return null
      }

      matched[positionalIndex] = arg.value
      positionalIndex++
    }
  }

  return matched
}

function pushCallMeta(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  name: string,
  args: Record<string, Expr[]> | Arg[],
): void
{
  if (callExpr.loc.line <= state.preludeLines) return
  const resolvedArgs = Array.isArray(args) ? bestEffortArgs(args) : args
  state.functionCallsMeta.push({ name, astNode: callExpr, args: resolvedArgs })
}

function pushArrayGetHistoryForArrayExpr(
  state: State,
  arrayExpr: Expr,
  loc: Loc,
): void {
  const pc = state.ops.length
  if (loc.line <= state.preludeLines) return

  let line = loc.line - state.preludeLines
  let column = loc.column
  let arrayGetElementMapping: Array<{ index: number; startCol: number; endCol: number }> | undefined

  if (arrayExpr.type === 'array') {
    line = arrayExpr.loc.line - state.preludeLines
    column = arrayExpr.loc.column
    arrayGetElementMapping = arrayExpr.items.map((item, index) => ({
      index,
      startCol: item.loc.column,
      endCol: item.loc.column + (item.loc.end - item.loc.start),
    }))
  }
  else if (arrayExpr.type === 'identifier') {
    const literal = state.varToArrayLiteral.get(arrayExpr.name)
    if (literal) {
      line = literal.loc.line - state.preludeLines
      column = literal.loc.column
      arrayGetElementMapping = literal.items.map((item, index) => ({
        index,
        startCol: item.loc.column,
        endCol: item.loc.column + (item.loc.end - item.loc.start),
      }))
    }
  }

  const historyEntry: HistorySourceMap = {
    line,
    column,
    genName: 'ArrayGet',
    pc: state.inFunction ? 0 : pc,
    inFunction: state.inFunction,
    __fromMainProgram: !state.isDeferredPass,
    arrayGetElementMapping,
  }
  state.historySourceMap.push(historyEntry)
  if (state.inFunction && state.currentFunctionId !== null) {
    const entryWithPending = historyEntry as HistorySourceMap & { __functionId?: number; __relativePc?: number }
    entryWithPending.__functionId = state.currentFunctionId
    entryWithPending.__relativePc = pc
  }
  else {
    historyEntry.pc = pc
  }
}

function pushCallSiteSourceMap(state: State, callExpr: Extract<Expr, { type: 'call' }>, funcName: string): void {
  const pc = state.ops.length
  const userLine = Math.max(1, callExpr.loc.line - state.preludeLines)
  const entry: HistorySourceMap = {
    line: userLine,
    column: callExpr.loc.column,
    genName: '_call',
    pc: state.inFunction ? 0 : pc,
    inFunction: state.inFunction,
    __fromMainProgram: !state.isDeferredPass,
    callSite: true,
    funcName,
  }
  state.historySourceMap.push(entry)
  if (state.inFunction && state.currentFunctionId !== null) {
    const entryWithPending = entry as HistorySourceMap & { __functionId?: number; __relativePc?: number }
    entryWithPending.__functionId = state.currentFunctionId
    entryWithPending.__relativePc = pc
  }
  else {
    entry.pc = pc
  }
}

function shouldUseSpecialCallDispatch(funcName: string): boolean {
  switch (funcName) {
    case 'dtof':
    case 'get':
    case 'out':
    case 'solo':
    case 'outs':
    case 'sout':
    case 'oversample':
    case 'espeak':
    case 'sam':
    case 'freesound':
    case 'record':
    case 'tram':
    case 'mini':
    case 'label':
    case 'timeline':
    case 'store':
    case 'alloc':
    case 'append':
    case 'write':
    case 'advance':
    case 'read':
    case 'isundefined':
    case 'isscalar':
    case 'isaudio':
    case 'isarray':
    case 'isfunction':
    case 'slicer':
    case 'Fit':
    case 'Walk':
    case 'Glide':
    case 'Step':
    case 'Random':
      return true
    default:
      return false
  }
}

function compileGeneratorCallFromSpec(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  args: Arg[],
  dollarIndex: number,
  genKey: string,
  spec: GenSpec,
): void {
  const paramCount = spec.paramNames.length
  const usesInput = spec.usesInput
  const totalArgs = paramCount + (usesInput ? 1 : 0)
  const stackBefore = state.stack.length

  const argCount = args.length + (dollarIndex >= 0 ? 1 : 0)
  if (argCount > totalArgs) {
    error(state, `Too many arguments for function '${callNameFromCallee(callExpr.callee)}'`, callExpr.loc)
    return
  }

  const opCode = opCodeByGenKey[genKey]
  if (opCode === undefined) {
    error(state, `Unknown opcode for generator: ${spec.genName}_${spec.variantName}`, callExpr.loc)
    return
  }

  const paramHas = paramHasByGenKey[genKey]
  const resolvedArgs: Record<string, Expr[]> | null = callExpr.loc.line <= state.preludeLines ? null : {}
  const defaults = defaultsByGenName[spec.genName]

  if (!shouldUseNamedMatchingForGeneratorArgs(args, paramHas)) {
    let positionalIndex = 0
    for (let i = 0; i < totalArgs; i++) {
      if (i === dollarIndex) {
        if (state.stack.length === 0) {
          error(state, '$ used without a value on the stack', callExpr.loc)
          return
        }
        positionalIndex++
        continue
      }

      const paramIndex = usesInput ? i - 1 : i
      const paramName = paramIndex >= 0 ? spec.paramNames[paramIndex] : null
      const argExpr = positionalIndex < args.length ? args[positionalIndex++]!.value : null

      if (resolvedArgs && paramName && argExpr) {
        ;(resolvedArgs[paramName] ??= []).push(argExpr)
      }

      if (argExpr) {
        compileExpr(state, argExpr)
      }
      else {
        const defaultValue = (paramName ? defaults?.[paramName] : undefined) ?? 0
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(defaultValue)
        state.stack.push({ expr: { type: 'number' as const, value: defaultValue, loc: callExpr.loc } })
      }
    }
  }
  else {
    const namedByName: Record<string, Expr> = Object.create(null)
    const namedOrder: string[] = []
    const positionalArgs: Expr[] = []

    for (let i = 0; i < args.length; i++) {
      const arg = args[i]!
      if (arg.name) {
        if (!(arg.name in namedByName)) namedOrder.push(arg.name)
        namedByName[arg.name] = arg.value
        continue
      }

      if (arg.shorthand && arg.value.type === 'identifier') {
        const shorthandName = arg.value.name
        if (paramHas[shorthandName]) {
          if (!(shorthandName in namedByName)) namedOrder.push(shorthandName)
          namedByName[shorthandName] = arg.value
          continue
        }
      }

      positionalArgs.push(arg.value)
    }

    let positionalIndex = 0
    const namedUsed = new Array(namedOrder.length).fill(false)

    for (let i = 0; i < totalArgs; i++) {
      if (i === dollarIndex) {
        if (state.stack.length === 0) {
          error(state, '$ used without a value on the stack', callExpr.loc)
          return
        }
        positionalIndex++
        continue
      }

      const paramIndex = usesInput ? i - 1 : i
      const paramName = paramIndex >= 0 ? spec.paramNames[paramIndex] : null

      let argExpr: Expr | null = null
      if (paramName) {
        for (let j = 0; j < namedOrder.length; j++) {
          if (namedUsed[j]) continue
          const argName = namedOrder[j]!
          if (!paramName.startsWith(argName)) continue
          namedUsed[j] = true
          argExpr = namedByName[argName] ?? null
          break
        }
      }

      if (!argExpr) {
        argExpr = positionalArgs[positionalIndex] ?? null
        positionalIndex++
      }

      if (resolvedArgs && paramName && argExpr) {
        ;(resolvedArgs[paramName] ??= []).push(argExpr)
      }

      if (argExpr) {
        compileExpr(state, argExpr)
      }
      else {
        const defaultValue = (paramName ? defaults?.[paramName] : undefined) ?? 0
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(defaultValue)
        state.stack.push({ expr: { type: 'number' as const, value: defaultValue, loc: callExpr.loc } })
      }
    }
  }

  // Store PC: if in function, it's relative to function start; if in main program, it's already absolute.
  const pc = state.ops.length
  if (callExpr.loc.line > state.preludeLines) {
    const userLine = callExpr.loc.line - state.preludeLines
    const historyEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: spec.genName,
      pc: state.inFunction ? 0 : pc,
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
    }
    state.historySourceMap.push(historyEntry)
    if (state.inFunction && state.currentFunctionId !== null) {
      ;(historyEntry as any).__functionId = state.currentFunctionId
      ;(historyEntry as any).__relativePc = pc
    }
    else {
      historyEntry.pc = pc
    }
  }

  state.ops.push(opCode)
  state.stack.length = stackBefore
  state.stack.push({ expr: callExpr })
  pushCallMeta(state, callExpr, spec.genName, resolvedArgs ?? {})
}

/** Compile get(array, index) / arr[i] as ArrayGet gen – same history/source-map path as other gens. */
export function compileGetCall(
  state: State,
  arrayExpr: Expr,
  indexExpr: Expr,
  loc: Loc,
  resultExpr: Expr,
): void {
  const stackBefore = state.stack.length
  const storeShape = getStoreShapeForExpr(state, arrayExpr)
  compileExpr(state, arrayExpr)
  compileExpr(state, indexExpr)

  if (storeShape) {
    state.ops.push(AudioVmOp.StoreGet)
    state.stack.length = stackBefore
    state.stack.push({ expr: resultExpr })
    return
  }

  pushArrayGetHistoryForArrayExpr(state, arrayExpr, loc)

  state.ops.push(AudioVmOp.ArrayGet, 0)
  state.stack.length = stackBefore
  state.stack.push({ expr: resultExpr })
}

export function compileCall(state: State, expr: Extract<Expr, { type: 'call' }>): void {
  if (expr.callee.type === 'member') {
    const memberExpr = expr.callee as Extract<Expr, { type: 'member' }>
    const storeShape = getStoreShapeForExpr(state, memberExpr.object)
    if (storeShape) {
      if (storeShape.kind === 'array') {
        error(state, `Store array methods are not supported: ${memberExpr.property}`, expr.loc)
        return
      }
      const propertyIndex = storeShape.keys.indexOf(memberExpr.property)
      if (propertyIndex < 0) {
        error(state, `Unknown store object method: ${memberExpr.property}`, expr.loc)
        return
      }
      pushCallMeta(state, expr, memberExpr.property, expr.args)
      for (const arg of expr.args) {
        compileExpr(state, arg.value)
      }
      const indexExpr: Extract<Expr, { type: 'number' }> = {
        type: 'number',
        value: propertyIndex,
        loc: memberExpr.loc,
      }
      const indexedCallee: Extract<Expr, { type: 'index' }> = {
        type: 'index',
        object: memberExpr.object,
        index: indexExpr,
        loc: memberExpr.loc,
      }
      compileGetCall(state, indexedCallee.object, indexedCallee.index, indexedCallee.loc, indexedCallee)
      state.ops.push(AudioVmOp.CallFunction)
      state.ops.push(expr.args.length)
      state.stack.push({ expr })
      return
    }

    const objectKeys = getObjectKeysForExpr(state, memberExpr.object)
    if (objectKeys) {
      const propertyIndex = objectKeys.indexOf(memberExpr.property)
      if (propertyIndex < 0) {
        error(state, `Unknown object method: ${memberExpr.property}`, expr.loc)
        return
      }
      pushCallMeta(state, expr, memberExpr.property, expr.args)
      for (const arg of expr.args) {
        compileExpr(state, arg.value)
      }
      const indexExpr: Extract<Expr, { type: 'number' }> = {
        type: 'number',
        value: propertyIndex,
        loc: memberExpr.loc,
      }
      const indexedCallee: Extract<Expr, { type: 'index' }> = {
        type: 'index',
        object: memberExpr.object,
        index: indexExpr,
        loc: memberExpr.loc,
      }
      compileGetCall(state, indexedCallee.object, indexedCallee.index, indexedCallee.loc, indexedCallee)
      state.ops.push(AudioVmOp.CallFunction)
      state.ops.push(expr.args.length)
      state.stack.push({ expr })
      return
    }
    if (memberExpr.property === 'map') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'map', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'avg' || memberExpr.property === 'sum') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: memberExpr.property, loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'shuffle') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'shuffle', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'reverse') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'reverse', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'reduce') {
      if (!expr.args.length || !expr.args[0]?.value) error(state, 'reduce requires a reducer function', expr.loc)
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'reduce', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'slice') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'slice', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'take') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'take', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'fit') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Fit', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'walk') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Walk', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'glide') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Glide', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'step') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Step', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'random') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Random', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'markov') {
      const methodParamNames = ['trig', 'stay', 'step', 'bias', 'seed'] as const
      const methodArgs: Partial<Record<(typeof methodParamNames)[number], Expr>> = {}
      let positionalIndex = 0

      for (const arg of expr.args) {
        if (arg.name) {
          const matchedName = methodParamNames.find(name => name.startsWith(arg.name!))
          if (!matchedName) {
            error(state, `No parameter matches '${arg.name}' in markov()`, expr.loc)
            return
          }
          if (methodArgs[matchedName]) {
            error(state, `Parameter '${matchedName}' already provided in markov()`, expr.loc)
            return
          }
          methodArgs[matchedName] = arg.value
          continue
        }
        if (arg.shorthand && arg.value.type === 'identifier') {
          const matchedName = methodParamNames.find(name =>
            name === (arg.value as Extract<Expr, { type: 'identifier' }>).name
          )
          if (matchedName) {
            if (methodArgs[matchedName]) {
              error(state, `Parameter '${matchedName}' already provided in markov()`, expr.loc)
              return
            }
            methodArgs[matchedName] = arg.value
            continue
          }
        }

        while (positionalIndex < methodParamNames.length && methodArgs[methodParamNames[positionalIndex]]) {
          positionalIndex++
        }
        if (positionalIndex >= methodParamNames.length) {
          error(state, 'Too many arguments for markov()', expr.loc)
          return
        }
        const matchedName = methodParamNames[positionalIndex]
        methodArgs[matchedName] = arg.value
        positionalIndex++
      }

      if (!methodArgs.trig) {
        error(state, 'markov(trig, stay?, step?, bias?, seed?) requires trigger', expr.loc)
        return
      }

      const statesExpr: Extract<Expr, { type: 'member' }> = {
        type: 'member',
        object: memberExpr.object,
        property: 'length',
        loc: memberExpr.object.loc,
      }

      const markovArgs: Arg[] = [{ type: 'arg', name: 'states', value: statesExpr, loc: statesExpr.loc }]
      if (methodArgs.stay) {
        markovArgs.push({ type: 'arg', name: 'stay', value: methodArgs.stay, loc: methodArgs.stay.loc })
      }
      if (methodArgs.step) {
        markovArgs.push({ type: 'arg', name: 'step', value: methodArgs.step, loc: methodArgs.step.loc })
      }
      if (methodArgs.bias) {
        markovArgs.push({ type: 'arg', name: 'bias', value: methodArgs.bias, loc: methodArgs.bias.loc })
      }
      if (methodArgs.seed) {
        markovArgs.push({ type: 'arg', name: 'seed', value: methodArgs.seed, loc: methodArgs.seed.loc })
      }
      markovArgs.push({ type: 'arg', name: 'trig', value: methodArgs.trig, loc: methodArgs.trig.loc })

      const markovCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Markov', loc: expr.loc },
        args: markovArgs,
        loc: expr.loc,
      }

      compileGetCall(state, memberExpr.object, markovCall, expr.loc, expr)
      return
    }

    pushCallMeta(state, expr, memberExpr.property, expr.args)
    compileExpr(state, memberExpr.object)

    if (state.stack.length === 0) {
      error(state, 'Method call requires an object', expr.loc)
      return
    }

    if (memberExpr.property === 'push') {
      const argCount = expr.args.length
      for (let i = 0; i < argCount; i++) {
        compileExpr(state, expr.args[i]!.value)
      }
      if (argCount === 0) {
        error(state, 'push() requires at least one argument', expr.loc)
        return
      }
      state.ops.push(AudioVmOp.ArrayPush)
      state.ops.push(argCount)
      state.stack.length -= argCount
      state.stack.push({ expr })
      return
    }
    else {
      error(state, `Unknown method: ${memberExpr.property}`, expr.loc)
    }
    return
  }

  compileCallWithArgs(state, expr, expr.args, -1)
}

export function compileCallWithArgs(state: State, callExpr: Extract<Expr, { type: 'call' }>, args: Arg[],
  dollarIndex: number): void
{
  const callee = callExpr.callee

  // Handle indexed function calls like fns
  if (callee.type === 'index') {
    pushCallMeta(state, callExpr, '[]', args)
    // Compile arguments first
    for (let i = 0; i < args.length; i++) {
      compileExpr(state, args[i]!.value)
    }

    // Compile the index expression to get the function ID
    const idxCallee = callee as Extract<Expr, { type: 'index' }>
    compileGetCall(state, idxCallee.object, idxCallee.index, idxCallee.loc, idxCallee)

    // Call the function using CallFunction opcode
    state.ops.push(AudioVmOp.CallFunction)
    state.ops.push(args.length)

    // Function returns a value on the stack
    state.stack.push({ expr: callExpr })
    return
  }

  if (callee.type !== 'identifier') {
    pushCallMeta(state, callExpr, callNameFromCallee(callee), args)
    error(state, 'Only simple function calls are supported', callExpr.loc)
    return
  }

  const funcName = callee.name

  const useSpecialDispatch = shouldUseSpecialCallDispatch(funcName)
  const mathUnaryId = getMathUnaryId(funcName)
  const mathBinaryId = mathUnaryId >= 0 ? -1 : getMathBinaryId(funcName)
  const mathTernaryId = mathUnaryId >= 0 || mathBinaryId >= 0 ? -1 : getMathTernaryId(funcName)

  if (!useSpecialDispatch && mathUnaryId < 0 && mathBinaryId < 0 && mathTernaryId < 0) {
    const generator = resolvePrimaryGeneratorByCallName(funcName)
    if (generator) {
      compileGeneratorCallFromSpec(state, callExpr, args, dollarIndex, generator.genKey, generator.spec)
      return
    }
    const varInfo = lookupVariable(state, funcName)
    if (varInfo) {
      compileUserFunctionCall(state, callExpr, funcName, varInfo, args, dollarIndex)
      return
    }
    pushCallMeta(state, callExpr, funcName, args)
    error(state, `Unknown generator: ${funcName}`, callExpr.loc)
    return
  }

  if (funcName === 'dtof') {
    pushCallMeta(state, callExpr, 'dtof', args)
    const degreeArg = getArgValue(args, 0)
    if (!degreeArg || degreeArg.type !== 'number') {
      error(state, 'dtof(degree) requires a literal number (scale degree 1-based)', callExpr.loc)
      return
    }
    compileDtofCall(state, degreeArg.value, callExpr.loc)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'get') {
    if (args.length < 2) {
      pushCallMeta(state, callExpr, 'get', args)
      error(state, 'get(array, index) requires two arguments', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const indexArg = getArgValue(args, 1)
    if (!arrayArg || !indexArg) {
      pushCallMeta(state, callExpr, 'get', args)
      error(state, 'get(array, index) requires two arguments', callExpr.loc)
      return
    }
    compileGetCall(state, arrayArg, indexArg, callExpr.loc, callExpr)
    pushCallMeta(state, callExpr, 'get', { array: [arrayArg], index: [indexArg] })
    return
  }

  if (funcName === 'out' || funcName === 'solo' || funcName === 'outs' || funcName === 'sout') {
    pushCallMeta(state, callExpr, funcName, args)
    const isSolo = funcName !== 'out'
    const argCount = args.length
    for (let i = 0; i < argCount; i++) {
      compileExpr(state, args[i]!.value)
    }
    if (argCount === 0) {
      error(state, `${funcName} requires at least one argument`, callExpr.loc)
      return
    }
    if (argCount > 2) {
      error(state, `${funcName} accepts 1 or 2 arguments, got ${argCount}`, callExpr.loc)
      return
    }
    const userLine = Math.max(1, callExpr.loc.line - state.preludeLines)
    const outSoloPc = state.ops.length
    const outSoloHistoryEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: isSolo ? 'Solo' : 'Out',
      pc: state.inFunction ? 0 : outSoloPc,
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
    }
    state.historySourceMap.push(outSoloHistoryEntry)
    if (state.inFunction && state.currentFunctionId !== null) {
      ;(outSoloHistoryEntry as any).__functionId = state.currentFunctionId
      ;(outSoloHistoryEntry as any).__relativePc = outSoloPc
    }
    else {
      outSoloHistoryEntry.pc = outSoloPc
    }
    state.ops.push(isSolo ? AudioVmOp.Solo : AudioVmOp.Out)
    state.ops.push(argCount)
    for (let i = 0; i < argCount; i++) {
      state.stack.pop()
    }
    return
  }

  if (funcName === 'oversample') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 2) {
      error(state, 'oversample() requires exactly 2 arguments: factor and callback', callExpr.loc)
      return
    }
    const factorArg = getArgValue(args, 0)
    const callbackArg = getArgValue(args, 1)
    if (!factorArg || !callbackArg) {
      error(state, 'oversample() requires factor and callback arguments', callExpr.loc)
      return
    }
    compileExpr(state, factorArg)
    if (callbackArg.type === 'fn') {
      const prev = state.captureGlobalsInClosures
      state.captureGlobalsInClosures = true
      compileExpr(state, callbackArg)
      state.captureGlobalsInClosures = prev
    }
    else {
      compileExpr(state, callbackArg)
    }
    state.ops.push(AudioVmOp.Oversample)
    if (state.stack.length >= 2) {
      state.stack.pop()
      state.stack.pop()
    }
    else {
      state.stack.length = Math.max(0, state.stack.length - 2)
    }
    state.stack.push({ expr: callExpr })
    return
  }

  // Compile-time eSpeak TTS: text/voice/params must be literals so we can render once,
  // register a sample handle, and reuse it at runtime instead of synthesizing per sample.
  if (funcName === 'espeak') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length < 1) {
      error(state, 'espeak() requires at least 1 argument: text', callExpr.loc)
      return
    }

    const espeakParams = ['text', 'variant', 'speed', 'pitch']
    const matchedArgs = matchFixedArgs(state, callExpr, 'espeak', args, espeakParams)
    if (!matchedArgs) return

    const [textArg, variantArg, speedArg, pitchArg] = matchedArgs

    if (!textArg || textArg.type !== 'string') {
      error(state, 'espeak() text must be a literal string', callExpr.loc)
      return
    }

    if (variantArg && variantArg.type !== 'string') {
      error(state, 'espeak() variant must be a literal string', callExpr.loc)
      return
    }
    if (speedArg && speedArg.type !== 'number') {
      error(state, 'espeak() speed must be a literal number', callExpr.loc)
      return
    }
    if (pitchArg && pitchArg.type !== 'number') {
      error(state, 'espeak() pitch must be a literal number', callExpr.loc)
      return
    }

    const text = textArg.value
    const variant = variantArg?.value ?? 'm1'
    const speedNorm = speedArg ? Number(speedArg.value) : 0.5
    const pitchNorm = pitchArg ? Number(pitchArg.value) : 0.5

    const handle = sampleManager.registerEspeak()
    state.sampleRegistrations.push({
      handle,
      type: 'espeak',
      espeakText: text,
      espeakVariant: variant,
      espeakSpeed: speedNorm,
      espeakPitch: pitchNorm,
    })
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(handle)
    state.stack.push({ expr: callExpr })
    return
  }

  // Compile-time SAM (Software Automatic Mouth) synthesis: render speech to a buffer once
  // via sam-js, resample to engine rate, register as inline sample, and push its handle.
  // All control parameters are literals so compilation is deterministic.
  if (funcName === 'sam') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length < 1) {
      error(state, 'sam() requires at least 1 argument: text', callExpr.loc)
      return
    }

    const samParams = ['text', 'pitch', 'speed', 'mouth', 'throat', 'singmode', 'phonetic']
    const matchedArgs = matchFixedArgs(state, callExpr, 'sam', args, samParams)
    if (!matchedArgs) return

    const [
      textArg,
      pitchArg,
      speedArg,
      mouthArg,
      throatArg,
      singmodeArg,
      phoneticArg,
    ] = matchedArgs

    if (!textArg || textArg.type !== 'string') {
      error(state, 'sam() text must be a literal string', callExpr.loc)
      return
    }

    if (pitchArg && pitchArg.type !== 'number') {
      error(state, 'sam() pitch must be a literal number', callExpr.loc)
      return
    }
    if (speedArg && speedArg.type !== 'number') {
      error(state, 'sam() speed must be a literal number', callExpr.loc)
      return
    }
    if (mouthArg && mouthArg.type !== 'number') {
      error(state, 'sam() mouth must be a literal number', callExpr.loc)
      return
    }
    if (throatArg && throatArg.type !== 'number') {
      error(state, 'sam() throat must be a literal number', callExpr.loc)
      return
    }
    if (singmodeArg && singmodeArg.type !== 'number') {
      error(state, 'sam() singmode must be a literal number 0 or 1', callExpr.loc)
      return
    }
    if (phoneticArg && phoneticArg.type !== 'number') {
      error(state, 'sam() phonetic must be a literal number 0 or 1', callExpr.loc)
      return
    }

    const DEFAULT_SPEED = 72
    const DEFAULT_PITCH = 64
    const DEFAULT_THROAT = 128
    const DEFAULT_MOUTH = 128

    const pitchNorm = pitchArg ? Number(pitchArg.value) : undefined
    const speedNorm = speedArg ? Number(speedArg.value) : undefined
    const mouthNorm = mouthArg ? Number(mouthArg.value) : undefined
    const throatNorm = throatArg ? Number(throatArg.value) : undefined

    const pitch = pitchNorm === undefined ? DEFAULT_PITCH : Math.round((1 - pitchNorm) * 255)
    const speed = speedNorm === undefined ? DEFAULT_SPEED : Math.round((1 - speedNorm) * 255)
    const mouth = mouthNorm === undefined ? DEFAULT_MOUTH : Math.round((1 - mouthNorm) * 255)
    const throat = throatNorm === undefined ? DEFAULT_THROAT : Math.round((1 - throatNorm) * 255)

    const singmode = singmodeArg
      ? Number((singmodeArg as Extract<typeof singmodeArg, { type: 'number' }>).value) !== 0
      : false
    const phonetic = phoneticArg
      ? Number((phoneticArg as Extract<typeof phoneticArg, { type: 'number' }>).value) !== 0
      : false

    try {
      const sam = new SamJs({
        pitch,
        speed,
        mouth,
        throat,
        singmode,
        phonetic,
      })
      const buf = sam.buf32(textArg.value, phonetic)
      if (!(buf instanceof Float32Array)) {
        error(state, 'sam() synthesis failed', callExpr.loc)
        return
      }
      const sourceSampleRate = 22050
      const targetSampleRate = 48000
      const ratio = targetSampleRate / sourceSampleRate
      const targetLength = Math.max(1, Math.round(buf.length * ratio))
      const resampled = new Float32Array(targetLength)
      for (let i = 0; i < targetLength; i++) {
        const t = i / ratio
        const i0 = Math.floor(t)
        const i1 = Math.min(i0 + 1, buf.length - 1)
        const frac = t - i0
        const v0 = buf[i0] ?? 0
        const v1 = buf[i1] ?? 0
        resampled[i] = v0 + (v1 - v0) * frac
      }
      const sampleRate = targetSampleRate
      const handle = sampleManager.registerInlineSample([resampled], sampleRate)
      state.sampleRegistrations.push({
        handle,
        type: 'inline',
        inlineChannels: [resampled],
        inlineSampleRate: sampleRate,
      })
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(handle)
      state.stack.push({ expr: callExpr })
      return
    }
    catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      error(state, `sam() synthesis error: ${msg}`, callExpr.loc)
      return
    }
  }

  if (funcName === 'freesound') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 1) {
      error(state, 'freesound() requires exactly 1 argument: id', callExpr.loc)
      return
    }
    const idArg = getArgValue(args, 0)
    if (!idArg || idArg.type !== 'number') {
      error(state, 'freesound() id must be a literal number', callExpr.loc)
      return
    }
    const id = idArg.value
    const handle = sampleManager.registerFreesound(id)
    state.sampleRegistrations.push({ handle, type: 'freesound', freesoundId: id })
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(handle)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'record') {
    pushCallMeta(state, callExpr, funcName, args)
    compileRecord(state, callExpr)
    return
  }

  if (funcName === 'tram') {
    pushCallMeta(state, callExpr, funcName, args)
    compileTram(state, callExpr, args)
    return
  }

  if (funcName === 'mini') {
    pushCallMeta(state, callExpr, funcName, args)
    compileMini(state, callExpr, args)
    return
  }

  if (funcName === 'label') {
    const a0 = getArgValue(args, 0)
    const a1 = getArgValue(args, 1)
    const a2 = getArgValue(args, 2)
    if (a0?.type === 'number' && a1?.type === 'string') {
      const bar = Math.max(0, Math.floor(Number(a0.value)) - 1)
      let colorIndex = 1
      if (a2?.type === 'number') colorIndex = Math.max(0, Math.min(5, Math.floor(Number(a2.value))))
      state.labels.push({ bar, text: a1.value, colorIndex })
    }
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(0)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'timeline') {
    pushCallMeta(state, callExpr, funcName, args)
    compileTimeline(state, callExpr, args)
    return
  }

  if (funcName === 'store') {
    pushCallMeta(state, callExpr, funcName, args)
    const initExpr = getValidatedStoreInitExpr(state, callExpr, args)
    if (!initExpr) return
    const stackBefore = state.stack.length
    compileExpr(state, initExpr)
    if (state.stack.length === stackBefore) {
      error(state, 'store(init) initializer did not produce a value', callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.StoreInit)
    state.ops.push(state.nextStoreCallSiteId++)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'alloc') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 1) {
      error(state, 'alloc() requires 1 argument: seconds', callExpr.loc)
      return
    }
    const secondsArg = getArgValue(args, 0)
    if (!secondsArg) {
      error(state, 'alloc() requires seconds argument', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, secondsArg)
    state.ops.push(AudioVmOp.Alloc)
    state.ops.push(state.nextAllocCallSiteId++)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'append') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 2) {
      error(state, 'append() requires 2 arguments: input and buf', callExpr.loc)
      return
    }
    const inputArg = getArgValue(args, 0)
    const bufArg = getArgValue(args, 1)
    if (!inputArg || !bufArg) {
      error(state, 'append() requires input and buf arguments', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, inputArg)
    compileExpr(state, bufArg)
    state.ops.push(AudioVmOp.Append)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'write') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 2) {
      error(state, 'write() requires 2 arguments: input and buf', callExpr.loc)
      return
    }
    const inputArg = getArgValue(args, 0)
    const bufArg = getArgValue(args, 1)
    if (!inputArg || !bufArg) {
      error(state, 'write() requires input and buf arguments', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, inputArg)
    compileExpr(state, bufArg)
    state.ops.push(AudioVmOp.Write)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'advance') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 1) {
      error(state, 'advance() requires 1 argument: buf', callExpr.loc)
      return
    }
    const bufArg = getArgValue(args, 0)
    if (!bufArg) {
      error(state, 'advance() requires buf argument', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, bufArg)
    state.ops.push(AudioVmOp.Advance)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'read') {
    pushCallMeta(state, callExpr, funcName, args)
    if (args.length !== 2) {
      error(state, 'read() requires 2 arguments: buf and offset (seconds)', callExpr.loc)
      return
    }
    const bufArg = getArgValue(args, 0)
    const offsetArg = getArgValue(args, 1)
    if (!bufArg || !offsetArg) {
      error(state, 'read() requires buf and offset arguments', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, bufArg)
    compileExpr(state, offsetArg)
    state.ops.push(AudioVmOp.Read)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'isundefined' || funcName === 'isscalar' || funcName === 'isaudio' || funcName === 'isarray'
    || funcName === 'isfunction')
  {
    pushCallMeta(state, callExpr, funcName, args)
    const argCount = args.length + (dollarIndex >= 0 ? 1 : 0)
    if (argCount > 1) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const argExpr = dollarIndex === 0 ? null : getArgValue(args, 0)
    if (argExpr) {
      compileExpr(state, argExpr)
    }

    if (state.stack.length === 0) {
      error(state, `${funcName} requires a value`, callExpr.loc)
      return
    }

    const op = typePredOpByName[funcName]
    state.ops.push(op)
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  if (mathUnaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, args)
    const argCount = args.length
    if (argCount > 1) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const argExpr = getArgValue(args, 0)
    if (!argExpr) {
      error(state, `${funcName}(x) requires one argument`, callExpr.loc)
      return
    }
    compileExpr(state, argExpr)
    if (state.stack.length === 0) {
      error(state, `${funcName} requires a value`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathUnary)
    state.ops.push(mathUnaryId)
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  if (mathBinaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, args)
    const argCount = args.length
    if (argCount > 2) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const left = getArgValue(args, 0)
    const right = getArgValue(args, 1)
    if (!left || !right) {
      error(state, `${funcName}(x, y) requires two arguments`, callExpr.loc)
      return
    }
    compileExpr(state, left)
    compileExpr(state, right)
    if (state.stack.length < 2) {
      error(state, `${funcName} requires two values`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathBinary)
    state.ops.push(mathBinaryId)
    state.stack.pop()
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  if (mathTernaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, args)
    const argCount = args.length
    if (argCount > 3) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const a = getArgValue(args, 0)
    const b = getArgValue(args, 1)
    const c = getArgValue(args, 2)
    if (!a || !b || !c) {
      error(state, `${funcName}(a, b, c) requires three arguments`, callExpr.loc)
      return
    }
    compileExpr(state, a)
    compileExpr(state, b)
    compileExpr(state, c)
    if (state.stack.length < 3) {
      error(state, `${funcName} requires three values`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathTernary)
    state.ops.push(mathTernaryId)
    state.stack.pop()
    state.stack.pop()
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'slicer') {
    const thresholdArg = args.find(a => a.name === 'threshold')
    if (thresholdArg && thresholdArg.value.type !== 'number') {
      error(state, 'slicer() threshold parameter must be a scalar value', callExpr.loc)
      return
    }
  }

  if (funcName === 'Fit') {
    pushCallMeta(state, callExpr, 'Fit', args)
    if (args.length < 2) {
      error(state, 'Fit(array, bars, swing?, offset?) requires at least array and bars', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const barsArg = getArgValue(args, 1)
    const swingArg = getArgValue(args, 2)
    const offsetArg = getArgValue(args, 3)
    if (!arrayArg || !barsArg) {
      error(state, 'Fit requires array and bars arguments', callExpr.loc)
      return
    }

    const barPerStepExpr: Expr = {
      type: 'binary',
      op: '/',
      left: barsArg,
      right: { type: 'member', object: arrayArg, property: 'length', loc: arrayArg.loc },
      loc: callExpr.loc,
    }
    compileExpr(state, arrayArg)
    compileExpr(state, barPerStepExpr)
    if (swingArg) compileExpr(state, swingArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    if (offsetArg) compileExpr(state, offsetArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Walk)
    state.stack.length -= 4
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Walk') {
    pushCallMeta(state, callExpr, 'Walk', args)
    if (args.length < 2) {
      error(state, 'Walk(array, bar, swing?, offset?) requires at least array and bar', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const barArg = getArgValue(args, 1)
    const swingArg = getArgValue(args, 2)
    const offsetArg = getArgValue(args, 3)
    if (!arrayArg || !barArg) {
      error(state, 'Walk requires array and bar arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, barArg)
    if (swingArg) compileExpr(state, swingArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    if (offsetArg) compileExpr(state, offsetArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Walk)
    state.stack.length -= 4
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Glide') {
    pushCallMeta(state, callExpr, 'Glide', args)
    if (args.length < 2) {
      error(state, 'Glide(array, bar, exponent?) requires at least array and bar', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const barArg = getArgValue(args, 1)
    const exponentArg = getArgValue(args, 2)
    if (!arrayArg || !barArg) {
      error(state, 'Glide requires array and bar arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, barArg)
    if (exponentArg) compileExpr(state, exponentArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(1)
      state.stack.push({ expr: callExpr })
    }
    state.ops.push(AudioVmOp.Glide)
    state.stack.length -= 3
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Step') {
    pushCallMeta(state, callExpr, 'Step', args)
    if (args.length < 2) {
      error(state, 'Step(array, trig) requires array and trigger', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const trigArg = getArgValue(args, 1)
    if (!arrayArg || !trigArg) {
      error(state, 'Step requires array and trig arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, trigArg)
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Step)
    state.ops.push(state.nextStepCallSiteId++)
    state.stack.length -= 2
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Random') {
    pushCallMeta(state, callExpr, 'Random', args)
    if (args.length < 2) {
      error(state, 'Random(array, trig, seed?) requires array and trigger', callExpr.loc)
      return
    }
    const arrayArg = getArgValue(args, 0)
    const trigArg = getArgValue(args, 1)
    const seedArg = getArgValue(args, 2)
    if (!arrayArg || !trigArg) {
      error(state, 'Random requires array and trig arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, trigArg)
    if (seedArg) {
      compileExpr(state, seedArg)
    }
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Random)
    state.ops.push(state.nextStepCallSiteId++)
    state.stack.length -= 3
    state.stack.push({ expr: callExpr })
    return
  }

  const generator = resolvePrimaryGeneratorByCallName(funcName)
  if (generator) {
    compileGeneratorCallFromSpec(state, callExpr, args, dollarIndex, generator.genKey, generator.spec)
    return
  }

  const varInfo = lookupVariable(state, funcName)
  if (varInfo) {
    compileUserFunctionCall(state, callExpr, funcName, varInfo, args, dollarIndex)
    return
  }
  pushCallMeta(state, callExpr, funcName, args)
  error(state, `Unknown generator: ${funcName}`, callExpr.loc)
}

function resolveFunctionInfo(state: State, funcName: string): FunctionInfo | undefined {
  let info = getFunctionByName(state, funcName)
  if (info) return info
  let target = funcName
  while (state.functionAliases.has(target)) {
    target = state.functionAliases.get(target)!
    info = getFunctionByName(state, target)
    if (info) return info
  }
  return undefined
}

function getFunctionInfoById(state: State, functionId: number): FunctionInfo | undefined {
  const byIndex = state.functions[functionId]
  if (byIndex && byIndex.id === functionId) return byIndex
  for (const info of state.functions) {
    if (info.id === functionId) return info
  }
  return undefined
}

function resolveFunctionInfoForVarInfo(state: State, varInfo: VariableInfo): FunctionInfo | undefined {
  const functionId = getFunctionIdForVarInfo(state, varInfo)
  if (functionId === undefined) return undefined
  return getFunctionInfoById(state, functionId)
}

function resolveFunctionIdFromExpr(state: State, expr: Expr): number | undefined {
  if (expr.type !== 'identifier') return undefined
  const varInfo = lookupVariable(state, expr.name)
  if (varInfo) {
    const id = getFunctionIdForVarInfo(state, varInfo)
    if (id !== undefined) return id
  }
  const info = resolveFunctionInfo(state, expr.name)
  return info?.id
}

function maybeHintFunctionParamBindingsFromPositionalArgs(
  state: State,
  resolvedFuncInfo: FunctionInfo | undefined,
  args: Arg[],
  dollarIndex: number,
): void {
  if (!resolvedFuncInfo) return
  const fnLocKey = resolvedFuncInfo.locKey
  if (!fnLocKey) return
  const paramCount = resolvedFuncInfo.params.length
  if (paramCount === 0) return

  let positionalParamIndex = 0
  for (let i = 0; i < args.length; i++) {
    if (i === dollarIndex) {
      positionalParamIndex++
      continue
    }
    const arg = args[i]!
    const paramIndex = positionalParamIndex++
    if (paramIndex >= paramCount) break
    const functionId = resolveFunctionIdFromExpr(state, arg.value)
    if (functionId === undefined) continue

    const paramHints = state.functionParamHintsByFnLoc.get(fnLocKey) ?? new Map()
    const prev = paramHints.get(paramIndex) ?? {}
    paramHints.set(paramIndex, { ...prev, functionId })
    state.functionParamHintsByFnLoc.set(fnLocKey, paramHints)
  }
}

function maybeHintFunctionParamBindingsFromMatchedArgs(
  state: State,
  resolvedFuncInfo: FunctionInfo | undefined,
  matchedArgs: Array<Expr | null>,
): void {
  if (!resolvedFuncInfo) return
  const fnLocKey = resolvedFuncInfo.locKey
  if (!fnLocKey) return
  if (matchedArgs.length === 0) return

  const paramHints = state.functionParamHintsByFnLoc.get(fnLocKey) ?? new Map()
  for (let i = 0; i < matchedArgs.length; i++) {
    const argExpr = matchedArgs[i]
    if (!argExpr) continue
    const functionId = resolveFunctionIdFromExpr(state, argExpr)
    if (functionId === undefined) continue
    const prev = paramHints.get(i) ?? {}
    paramHints.set(i, { ...prev, functionId })
  }
  if (paramHints.size > 0) state.functionParamHintsByFnLoc.set(fnLocKey, paramHints)
}

function maybeHintInlineMapCallbackParam(
  state: State,
  resolvedFuncInfo: FunctionInfo | undefined,
  args: Arg[],
): void {
  if (!resolvedFuncInfo || resolvedFuncInfo.params.length < 2) return
  if (resolvedFuncInfo.params[0] !== 'array') return
  if (!resolvedFuncInfo.params[1]?.startsWith('fn')) return

  let arrayArg: Expr | null = null
  let callbackArg: Expr | null = null
  const positional: Expr[] = []
  for (const arg of args) {
    if (arg.name) {
      if (!arrayArg && 'array'.startsWith(arg.name)) arrayArg = arg.value
      if (!callbackArg && 'fn'.startsWith(arg.name)) callbackArg = arg.value
    }
    else {
      positional.push(arg.value)
    }
  }
  if (!arrayArg) arrayArg = positional[0] ?? null
  if (!callbackArg) callbackArg = positional[1] ?? null
  if (!arrayArg || !callbackArg || callbackArg.type !== 'fn') return

  const objectKeys = getArrayElementObjectKeysForExpr(state, arrayArg)
  const objectPropertyStoreShapes = getArrayElementObjectPropertyStoreShapesForExpr(state, arrayArg)
  if (!objectKeys && !objectPropertyStoreShapes) return

  const fnLocKey = `${callbackArg.loc.start}:${callbackArg.loc.end}`
  const paramHints = new Map<number, {
    objectKeys?: string[]
    objectPropertyStoreShapes?: Map<string, StoreShape>
  }>()
  paramHints.set(0, {
    objectKeys: objectKeys ? [...objectKeys] : undefined,
    objectPropertyStoreShapes: objectPropertyStoreShapes ?? undefined,
  })
  state.functionParamHintsByFnLoc.set(fnLocKey, paramHints)
}

function setFirstParamObjectKeysHintByFunctionLoc(
  state: State,
  fnLocKey: string,
  objectKeys: readonly string[],
): void {
  const paramHints = state.functionParamHintsByFnLoc.get(fnLocKey) ?? new Map()
  const prev = paramHints.get(0) ?? {}
  paramHints.set(0, {
    ...prev,
    objectKeys: [...objectKeys],
  })
  state.functionParamHintsByFnLoc.set(fnLocKey, paramHints)
}

function maybeHintFunctionValueFirstParamObjectKeys(
  state: State,
  valueExpr: Expr,
  objectKeys: readonly string[],
): void {
  if (valueExpr.type === 'fn') {
    const fnLocKey = `${valueExpr.loc.start}:${valueExpr.loc.end}`
    setFirstParamObjectKeysHintByFunctionLoc(state, fnLocKey, objectKeys)
    return
  }
  if (valueExpr.type !== 'identifier') return

  let targetInfo: FunctionInfo | undefined
  const varInfo = lookupVariable(state, valueExpr.name)
  if (varInfo) targetInfo = resolveFunctionInfoForVarInfo(state, varInfo)
  if (!targetInfo) targetInfo = resolveFunctionInfo(state, valueExpr.name)
  if (!targetInfo?.locKey) return

  setFirstParamObjectKeysHintByFunctionLoc(state, targetInfo.locKey, objectKeys)
}

function getPreludePlayCallbackParamIndex(state: State, resolvedFuncInfo: FunctionInfo | undefined): number {
  if (!resolvedFuncInfo) return -1
  if (resolvedFuncInfo.definitionLine === undefined || resolvedFuncInfo.definitionLine > state.preludeLines) return -1
  if (resolvedFuncInfo.params[0] !== 'events') return -1
  return resolvedFuncInfo.params.indexOf('cb')
}

function maybeHintPlayCallbackParamFromPositionalArgs(
  state: State,
  resolvedFuncInfo: FunctionInfo | undefined,
  args: Arg[],
  dollarIndex: number,
): void {
  const callbackParamIndex = getPreludePlayCallbackParamIndex(state, resolvedFuncInfo)
  if (callbackParamIndex < 0) return

  let positionalParamIndex = 0
  for (let i = 0; i < args.length; i++) {
    if (i === dollarIndex) {
      positionalParamIndex++
      continue
    }
    const arg = args[i]!
    if (positionalParamIndex === callbackParamIndex) {
      maybeHintFunctionValueFirstParamObjectKeys(state, arg.value, PLAY_CALLBACK_OBJECT_KEYS)
      return
    }
    positionalParamIndex++
  }
}

function maybeHintPlayCallbackParamFromMatchedArgs(
  state: State,
  resolvedFuncInfo: FunctionInfo | undefined,
  matchedArgs: Array<Expr | null>,
): void {
  const callbackParamIndex = getPreludePlayCallbackParamIndex(state, resolvedFuncInfo)
  if (callbackParamIndex < 0) return
  const callbackArg = matchedArgs[callbackParamIndex]
  if (!callbackArg) return
  maybeHintFunctionValueFirstParamObjectKeys(state, callbackArg, PLAY_CALLBACK_OBJECT_KEYS)
}

function compileObjectDestructureArgumentForParam(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  argExpr: Expr,
  objectKeys: string[],
  destructureNames: string[],
): boolean {
  const keyIndexByName = new Map<string, number>()
  for (let i = 0; i < objectKeys.length; i++) keyIndexByName.set(objectKeys[i]!, i)
  const keyIndexes: number[] = []
  for (const keyName of destructureNames) {
    const keyIndex = keyIndexByName.get(keyName)
    if (keyIndex === undefined) {
      error(state, `Unknown object property: ${keyName}`, callExpr.loc)
      return false
    }
    keyIndexes.push(keyIndex)
  }

  compileExpr(state, argExpr)
  if (state.stack.length === 0) {
    error(state, 'Argument has no value', callExpr.loc)
    return false
  }

  const isGlobal = state.functionDepth === 0
  const tempIndex = isGlobal ? state.nextGlobalIndex++ : state.nextLocalIndex++
  const setOp = isGlobal ? AudioVmOp.SetGlobal : AudioVmOp.SetLocal
  const getOp = isGlobal ? AudioVmOp.GetGlobal : AudioVmOp.GetLocal
  const stackExpr = { expr: argExpr }

  state.ops.push(setOp, tempIndex)
  state.stack.pop()

  for (const keyIndex of keyIndexes) {
    state.ops.push(getOp, tempIndex)
    state.stack.push(stackExpr)
    state.ops.push(AudioVmOp.PushScalar, keyIndex)
    state.stack.push(stackExpr)
    state.ops.push(AudioVmOp.ArrayGet, 0)
    state.stack.pop() // index
    state.stack.pop() // source
    state.stack.push(stackExpr)
  }

  state.ops.push(AudioVmOp.MakeArray, keyIndexes.length)
  for (let i = 0; i < keyIndexes.length; i++) state.stack.pop()
  state.stack.push(stackExpr)
  return true
}

function compileUserFunctionArgument(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  resolvedFuncInfo: FunctionInfo | undefined,
  paramIndex: number,
  argExpr: Expr,
): boolean {
  const isObjectDestructureParam = resolvedFuncInfo
    && (resolvedFuncInfo.paramTypes[paramIndex] === 'param-destructure'
      || resolvedFuncInfo.paramTypes[paramIndex] === 'param-named-destructure')
    && resolvedFuncInfo.paramDestructureKinds[paramIndex] === 'object'

  if (!isObjectDestructureParam) {
    compileExpr(state, argExpr)
    return true
  }

  const destructureNames = resolvedFuncInfo.paramDestructureNames[paramIndex] ?? []
  const objectKeys = getObjectKeysForExpr(state, argExpr)
  if (!objectKeys) {
    error(state, 'Object destructuring parameter requires known object shape', callExpr.loc)
    return false
  }
  return compileObjectDestructureArgumentForParam(state, callExpr, argExpr, objectKeys, destructureNames)
}

export function compileUserFunctionCall(state: State, callExpr: Extract<Expr, { type: 'call' }>, funcName: string,
  varInfo: VariableInfo, args: Arg[], dollarIndex: number): void
{
  const funcInfo = getFunctionByName(state, funcName)
  let resolvedFuncInfo = funcInfo ?? resolveFunctionInfo(state, funcName)
  if (!resolvedFuncInfo) {
    resolvedFuncInfo = resolveFunctionInfoForVarInfo(state, varInfo)
  }
  maybeHintInlineMapCallbackParam(state, resolvedFuncInfo, args)

  const callSiteLocKey = `${callExpr.loc.line}:${callExpr.loc.column}:${callExpr.loc.start}:${callExpr.loc.end}`
  const callSiteId = state.recordCallIds.get(callSiteLocKey)

  if (
    !state.compilingRecordCallback
    && funcInfo
    && state.functionToRecordCall.has(funcName)
    && callSiteId !== undefined
  ) {
    processRecordCallSite(state, callExpr, funcName, funcInfo, callSiteId)
  }

  // Automatic stereo lifting at compile time for array literals only
  // if (funcInfo && funcInfo.paramCount > 0 && args.length > 0 && dollarIndex !== 0) {
  //   const firstParam = funcInfo.params[0]
  //   const firstParamType = funcInfo.paramTypes[0]
  //   const firstArg = args[0]?.type === 'arg' ? args[0].value : null

  //   // Case 1: First param is 'in' (non-destructured) and arg is 2-element array LITERAL
  //   // Transform f([L,R]) -> [f(L), f(R)] at compile time
  //   if (firstParam === 'in' && firstParamType === 'param' && firstArg?.type === 'array'
  //     && firstArg.items.length === 2)
  //   {
  //     // Compile as [f(L), f(R)]
  //     const leftCall: Extract<Expr, { type: 'call' }> = {
  //       type: 'call',
  //       callee: callExpr.callee,
  //       args: [{ type: 'arg', value: firstArg.items[0], loc: firstArg.items[0].loc }, ...args.slice(1)],
  //       loc: callExpr.loc,
  //     }
  //     const rightCall: Extract<Expr, { type: 'call' }> = {
  //       type: 'call',
  //       callee: callExpr.callee,
  //       args: [{ type: 'arg', value: firstArg.items[1], loc: firstArg.items[1].loc }, ...args.slice(1)],
  //       loc: callExpr.loc,
  //     }

  //     compileUserFunctionCall(state, leftCall, funcName, varInfo, leftCall.args, -1)
  //     compileUserFunctionCall(state, rightCall, funcName, varInfo, rightCall.args, -1)

  //     // Create array from results
  //     state.ops.push(AudioVmOp.MakeArray)
  //     state.ops.push(2)
  //     // adjust stack safely
  //     if (state.stack.length >= 2) {
  //       state.stack.pop()
  //       state.stack.pop()
  //     }
  //     else {
  //       state.stack.length = Math.max(0, state.stack.length - 2)
  //     }
  //     state.stack.push({ expr: callExpr })
  //     return
  //   }

  //   // Case 2: First param is 'in:[L,R]' (named destructured) and arg is NOT an array literal
  //   // Transform f(x) -> f([x, x]) at compile time
  //   if (firstParam === 'in' && firstParamType === 'param-named-destructure' && firstArg
  //     && firstArg.type !== 'array')
  //   {
  //     // Compile as f([x, x])
  //     const arrayArg: Extract<Expr, { type: 'array' }> = {
  //       type: 'array',
  //       items: [firstArg, firstArg],
  //       loc: firstArg.loc,
  //     }
  //     const newArgs = [{ type: 'arg' as const, value: arrayArg, loc: args[0].loc }, ...args.slice(1)]
  //     compileUserFunctionCall(state, callExpr, funcName, varInfo, newArgs, -1)
  //     return
  //   }
  // }

  // Check if any arguments are named (explicit name: value or shorthand identifier that may match a param)
  const hasNamedArgs = hasNamedArgument(args)

  // If no function info or no named arguments, use simple positional matching (use resolvedFuncInfo so aliases work)
  if (!resolvedFuncInfo || !hasNamedArgs) {
    maybeHintPlayCallbackParamFromPositionalArgs(state, resolvedFuncInfo, args, dollarIndex)
    maybeHintFunctionParamBindingsFromPositionalArgs(state, resolvedFuncInfo, args, dollarIndex)
    pushCallMeta(state, callExpr, funcName, args)
    const argsProvided = countProvidedArgs(args) + (dollarIndex >= 0 ? 1 : 0)
    const paramCount = resolvedFuncInfo?.params.length ?? 0
    if (resolvedFuncInfo && argsProvided > paramCount) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    // Push arguments onto stack
    let positionalParamIndex = 0
    for (let i = 0; i < args.length; i++) {
      if (i === dollarIndex) {
        // $ is already on stack, skip
        positionalParamIndex++
        continue
      }
      const arg = args[i]!
      const paramIndex = positionalParamIndex++
      if (!compileUserFunctionArgument(state, callExpr, resolvedFuncInfo, paramIndex, arg.value)) return
    }
    // Push undefined for missing params so defaults apply
    const missingCount = Math.max(0, paramCount - argsProvided)
    for (let i = 0; i < missingCount; i++) {
      state.ops.push(AudioVmOp.PushUndefined)
      state.stack.push({ expr: callExpr })
    }
    const argCount = argsProvided + missingCount

    // Get function ID
    compileGetVariable(state, varInfo)

    pushCallSiteSourceMap(state, callExpr, funcName)
    state.ops.push(AudioVmOp.CallFunction)
    state.ops.push(argCount)

    // Function returns a value on the stack
    state.stack.push({ expr: callExpr })
    return
  }

  // Named argument matching
  const params = resolvedFuncInfo.params
  const paramCount = params.length
  const paramIndexByName = new Map<string, number>()
  for (let i = 0; i < paramCount; i++) paramIndexByName.set(params[i]!, i)
  const prefixMatchCache = new Map<string, number>()

  // Match arguments to parameters (positional and named with prefix matching)
  const matchedArgs: (Expr | null)[] = new Array(paramCount).fill(null)
  let positionalIndex = 0
  let dollarParamIndex = -1

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.type !== 'arg') continue

    if (arg.name) {
      // Explicit named argument (e.g., trig:1)
      const argName = arg.name
      // Named argument - find matching parameter with startsWith
      let matchedParamIndex = prefixMatchCache.get(argName)
      if (matchedParamIndex === undefined) {
        matchedParamIndex = findParamIndexByPrefix(params, argName)
        prefixMatchCache.set(argName, matchedParamIndex)
      }

      if (matchedParamIndex === -1) {
        error(state, `No parameter matches '${argName}' in function '${funcName}'`, callExpr.loc)
        return
      }

      if (matchedArgs[matchedParamIndex] !== null) {
        error(state, `Parameter '${params[matchedParamIndex]}' already provided`, callExpr.loc)
        return
      }

      matchedArgs[matchedParamIndex] = arg.value
    }
    else if (arg.shorthand && arg.value.type === 'identifier') {
      // Shorthand argument (e.g., trig) - only treat as named if it exactly matches a parameter
      const shorthandName = arg.value.name
      const matchedParamIndex = paramIndexByName.get(shorthandName) ?? -1

      if (matchedParamIndex !== -1) {
        // Matches a parameter, treat as named argument
        if (matchedArgs[matchedParamIndex] !== null) {
          error(state, `Parameter '${params[matchedParamIndex]}' already provided`, callExpr.loc)
          return
        }
        matchedArgs[matchedParamIndex] = arg.value
        if (i === dollarIndex) dollarParamIndex = matchedParamIndex
      }
      else {
        // No matching parameter, treat as positional
        while (positionalIndex < paramCount && matchedArgs[positionalIndex] !== null) {
          positionalIndex++
        }

        if (positionalIndex >= paramCount) {
          error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
          return
        }

        matchedArgs[positionalIndex] = arg.value
        if (i === dollarIndex) dollarParamIndex = positionalIndex
        positionalIndex++
      }
    }
    else {
      // Positional argument - find next unfilled parameter
      while (positionalIndex < paramCount && matchedArgs[positionalIndex] !== null) {
        positionalIndex++
      }

      if (positionalIndex >= paramCount) {
        error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
        return
      }

      matchedArgs[positionalIndex] = arg.value
      if (i === dollarIndex) dollarParamIndex = positionalIndex
      positionalIndex++
    }
  }

  maybeHintFunctionParamBindingsFromMatchedArgs(state, resolvedFuncInfo, matchedArgs)
  maybeHintPlayCallbackParamFromMatchedArgs(state, resolvedFuncInfo, matchedArgs)

  const resolvedArgs: Record<string, Expr[]> = {}
  for (let i = 0; i < paramCount; i++) {
    const expr = matchedArgs[i]
    if (expr) resolvedArgs[params[i]] = [expr]
  }
  pushCallMeta(state, callExpr, funcName, resolvedArgs)

  // Compile matched arguments in parameter order
  // We need to compile all arguments up to the last provided one (or all params if none provided)
  let lastProvidedIndex = -1
  for (let i = paramCount - 1; i >= 0; i--) {
    if (matchedArgs[i] !== null) {
      lastProvidedIndex = i
      break
    }
  }

  const argCount = lastProvidedIndex >= 0 ? lastProvidedIndex + 1 : paramCount

  for (let i = 0; i < argCount; i++) {
    if (i === dollarParamIndex) {
      // $ is already on stack, skip
      continue
    }
    const argExpr = matchedArgs[i]
    if (argExpr) {
      if (!compileUserFunctionArgument(state, callExpr, resolvedFuncInfo, i, argExpr)) return
    }
    else {
      // Push undefined for missing arguments (will use default)
      state.ops.push(AudioVmOp.PushUndefined)
      state.stack.push({ expr: callExpr })
    }
  }

  // Get function ID
  compileGetVariable(state, varInfo)

  pushCallSiteSourceMap(state, callExpr, funcName)
  state.ops.push(AudioVmOp.CallFunction)
  state.ops.push(argCount)

  // Function returns a value on the stack
  state.stack.push({ expr: callExpr })

  // Note: If the function contains record(), it was already processed above before the function call
}
