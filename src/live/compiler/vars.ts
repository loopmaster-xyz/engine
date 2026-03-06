import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import { findScaleIndex } from '../../mini/scales.ts'
import type { Expr, Loc, Stmt } from '../ast.ts'
import { collectClosureVarNames } from '../deps.ts'
import { compileExpr, error, getCurrentScope } from './core.ts'
import { compileFunction } from './functions.ts'
import type { State } from './state.ts'
import type { FunctionInfo, StoreShape } from './types.ts'
import { SYSTEM_VARS, type VariableInfo } from './types.ts'

const PIPE_SCOPE: Map<string, unknown> = new Map([['$', true]])
const SYSTEM_VAR_NAMES = Array.from(SYSTEM_VARS)

const COMPOUND_ASSIGN_OP_TO_OPCODE: Record<string, AudioVmOp> = {
  '+=': AudioVmOp.Add,
  '-=': AudioVmOp.Sub,
  '*=': AudioVmOp.Mul,
  '/=': AudioVmOp.Div,
  '%=': AudioVmOp.Mod,
  '**=': AudioVmOp.Pow,
  '&=': AudioVmOp.BitAnd,
  '|=': AudioVmOp.BitOr,
  '^=': AudioVmOp.BitXor,
  '<<=': AudioVmOp.ShiftLeft,
  '>>=': AudioVmOp.ShiftRight,
}

export function variableBindingKey(scope: VariableInfo['scope'], index: number): string {
  return `${scope}:${index}`
}

function clearVariableFunctionBinding(state: State, varInfo: VariableInfo): void {
  state.variableFunctionIds.delete(variableBindingKey(varInfo.scope, varInfo.index))
  if (varInfo.scope === 'closure') {
    state.variableFunctionIds.delete(variableBindingKey('local', varInfo.index))
    state.variableFunctionIds.delete(variableBindingKey('global', varInfo.index))
  }
}

function setVariableFunctionBinding(state: State, varInfo: VariableInfo, functionId: number): void {
  state.variableFunctionIds.set(variableBindingKey(varInfo.scope, varInfo.index), functionId)
}

function setVariableObjectShape(state: State, varInfo: VariableInfo, keys: string[]): void {
  state.objectKeysByBinding.set(variableBindingKey(varInfo.scope, varInfo.index), [...keys])
}

function clearVariableObjectShape(state: State, varInfo: VariableInfo): void {
  state.objectKeysByBinding.delete(variableBindingKey(varInfo.scope, varInfo.index))
  if (varInfo.scope === 'closure') {
    state.objectKeysByBinding.delete(variableBindingKey('local', varInfo.index))
    state.objectKeysByBinding.delete(variableBindingKey('global', varInfo.index))
  }
}

function setVariableStoreShape(state: State, varInfo: VariableInfo, shape: StoreShape): void {
  if (shape.kind === 'array') {
    state.storeShapesByBinding.set(variableBindingKey(varInfo.scope, varInfo.index), { kind: 'array', length: shape.length })
    return
  }
  state.storeShapesByBinding.set(variableBindingKey(varInfo.scope, varInfo.index), {
    kind: 'object',
    keys: [...shape.keys],
  })
}

function clearVariableStoreShape(state: State, varInfo: VariableInfo): void {
  state.storeShapesByBinding.delete(variableBindingKey(varInfo.scope, varInfo.index))
  if (varInfo.scope === 'closure') {
    state.storeShapesByBinding.delete(variableBindingKey('local', varInfo.index))
    state.storeShapesByBinding.delete(variableBindingKey('global', varInfo.index))
  }
}

function getFunctionInfoById(state: State, functionId: number): FunctionInfo | undefined {
  for (const info of state.functions) {
    if (info.id === functionId) return info
  }
  return undefined
}

function resolveFunctionInfoByAlias(state: State, funcName: string): FunctionInfo | undefined {
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

export function getObjectKeysForVarInfo(state: State, varInfo: VariableInfo): string[] | null {
  const direct = state.objectKeysByBinding.get(variableBindingKey(varInfo.scope, varInfo.index))
  if (direct) return [...direct]
  if (varInfo.scope === 'closure') {
    const local = state.objectKeysByBinding.get(variableBindingKey('local', varInfo.index))
    if (local) return [...local]
    const global = state.objectKeysByBinding.get(variableBindingKey('global', varInfo.index))
    if (global) return [...global]
  }
  return null
}

export function getStoreShapeForVarInfo(state: State, varInfo: VariableInfo): StoreShape | null {
  const direct = state.storeShapesByBinding.get(variableBindingKey(varInfo.scope, varInfo.index))
  if (direct) {
    return direct.kind === 'array'
      ? { kind: 'array', length: direct.length }
      : { kind: 'object', keys: [...direct.keys] }
  }
  if (varInfo.scope === 'closure') {
    const local = state.storeShapesByBinding.get(variableBindingKey('local', varInfo.index))
    if (local) {
      return local.kind === 'array'
        ? { kind: 'array', length: local.length }
        : { kind: 'object', keys: [...local.keys] }
    }
    const global = state.storeShapesByBinding.get(variableBindingKey('global', varInfo.index))
    if (global) {
      return global.kind === 'array'
        ? { kind: 'array', length: global.length }
        : { kind: 'object', keys: [...global.keys] }
    }
  }
  return null
}

function isStoreInitializerCall(expr: Expr): expr is Extract<Expr, { type: 'call' }> {
  return expr.type === 'call' && expr.callee.type === 'identifier' && expr.callee.name === 'store'
}

export function getFunctionReturnObjectKeysForCall(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
): string[] | null {
  if (callExpr.callee.type !== 'identifier') return null
  const calleeName = callExpr.callee.name
  const varInfo = lookupVariable(state, calleeName)
  if (varInfo) {
    const functionId = getFunctionIdForVarInfo(state, varInfo)
    if (functionId !== undefined) {
      const infoById = getFunctionInfoById(state, functionId)
      if (infoById?.returnObjectKeys) return [...infoById.returnObjectKeys]
    }
  }
  const info = resolveFunctionInfoByAlias(state, calleeName)
  if (info?.returnObjectKeys) return [...info.returnObjectKeys]
  return null
}

export function getObjectKeysForExpr(state: State, expr: Expr): string[] | null {
  if (expr.type === 'object') return expr.entries.map(entry => entry.key)
  if (expr.type === 'identifier') {
    const varInfo = lookupVariable(state, expr.name)
    if (!varInfo) return null
    return getObjectKeysForVarInfo(state, varInfo)
  }
  if (expr.type === 'call') {
    return getFunctionReturnObjectKeysForCall(state, expr)
  }
  return null
}

export function getStoreShapeForExpr(state: State, expr: Expr): StoreShape | null {
  if (expr.type === 'identifier') {
    const varInfo = lookupVariable(state, expr.name)
    if (!varInfo) return null
    return getStoreShapeForVarInfo(state, varInfo)
  }
  if (isStoreInitializerCall(expr)) {
    const initArg = expr.args.find(arg => arg.type === 'arg' && !!arg.value)?.value ?? null
    if (!initArg) return null
    if (initArg.type === 'array') return { kind: 'array', length: initArg.items.length }
    if (initArg.type === 'object') return { kind: 'object', keys: initArg.entries.map(entry => entry.key) }
  }
  return null
}

export function getFunctionIdForVarInfo(state: State, varInfo: VariableInfo): number | undefined {
  const direct = state.variableFunctionIds.get(variableBindingKey(varInfo.scope, varInfo.index))
  if (direct !== undefined) return direct
  if (varInfo.scope === 'closure') {
    const local = state.variableFunctionIds.get(variableBindingKey('local', varInfo.index))
    if (local !== undefined) return local
    const global = state.variableFunctionIds.get(variableBindingKey('global', varInfo.index))
    if (global !== undefined) return global
  }
  return undefined
}

export function getFunctionByName(state: State, name: string): FunctionInfo | undefined {
  for (let i = state.functionsByNameStack.length - 1; i >= 0; i--) {
    const info = state.functionsByNameStack[i]!.get(name)
    if (info) return info
  }
  return undefined
}

export function hasFunctionByName(state: State, name: string): boolean {
  return getFunctionByName(state, name) !== undefined
}

/** All (name, funcInfo) from all scopes; innermost scope wins for duplicate names. */
export function* functionsByNameEntries(state: State): Generator<[string, FunctionInfo]> {
  const seen = new Set<string>()
  for (let i = state.functionsByNameStack.length - 1; i >= 0; i--) {
    const map = state.functionsByNameStack[i]!
    for (const [name, info] of map) {
      if (!seen.has(name)) {
        seen.add(name)
        yield [name, info]
      }
    }
  }
}

/** Only global-scope (top-level) functions; for record setup which must not process nested functions as globals. */
export function hasGlobalFunctionByName(state: State, name: string): boolean {
  return state.functionsByNameStack[0]?.has(name) ?? false
}

export function* functionsByNameGlobalEntries(state: State): Generator<[string, FunctionInfo]> {
  const map = state.functionsByNameStack[0]
  if (map) { for (const e of map) yield e }
}

export function lookupVariable(state: State, name: string): VariableInfo | null {
  if (SYSTEM_VARS.has(name)) {
    const systemIndex = SYSTEM_VAR_NAMES.indexOf(name)
    return { scope: 'system', index: systemIndex }
  }

  if (!state.compilingRecordCallback && state.paramNameToLocalIndex?.has(name)) {
    return { scope: 'local', index: state.paramNameToLocalIndex.get(name)! }
  }

  // Check local scopes
  for (let i = state.locals.length - 1; i >= 0; i--) {
    const local = state.locals[i].get(name)
    if (local) return local
  }

  // Check closure variables if in function
  if (state.inFunction) {
    for (let i = state.closureVars.length - 1; i >= 0; i--) {
      const closure = state.closureVars[i].get(name)
      if (closure) return closure
    }
  }

  // Check globals
  const global = state.globals.get(name)
  if (global) {
    return global
  }

  // If not in globals but is a global function, ensure it's in globals (hoist)
  // Only hoist top-level functions; locals/closure functions stay in their scope
  const funcInfo = getFunctionByName(state, name)
  if (funcInfo?.isGlobalScope) {
    const info: VariableInfo = { scope: 'global', index: state.nextGlobalIndex++ }
    state.globals.set(name, info)
    return info
  }

  return null
}

export function declareVariable(state: State, name: string, loc: Loc, shadow = false): VariableInfo {
  if (SYSTEM_VARS.has(name)) {
    error(state, `Cannot assign to system variable: ${name}`, loc)
    return { scope: 'system', index: 0 }
  }

  // For := always create new local in current scope
  if (shadow) {
    const currentScope = getCurrentScope(state)
    if (currentScope) {
      const info: VariableInfo = { scope: 'local', index: state.nextLocalIndex++ }
      currentScope.set(name, info)
      return info
    }
    // If no local scope, create global (shouldn't happen but handle it)
    const info: VariableInfo = { scope: 'global', index: state.nextGlobalIndex++ }
    state.globals.set(name, info)
    return info
  }

  // For = operator, check if variable exists anywhere
  const existing = lookupVariable(state, name)
  if (existing && existing.scope !== 'system') {
    return existing
  }

  // Variable doesn't exist, create it
  const currentScope = getCurrentScope(state)
  if (currentScope) {
    // Create local in current scope
    const info: VariableInfo = { scope: 'local', index: state.nextLocalIndex++ }
    currentScope.set(name, info)
    return info
  }

  // Create global variable
  const info: VariableInfo = { scope: 'global', index: state.nextGlobalIndex++ }
  state.globals.set(name, info)
  return info
}

export function compilePushCellRef(state: State, varInfo: VariableInfo, expr: Expr): void {
  switch (varInfo.scope) {
    case 'system':
      error(state, 'Cannot capture system variable in closure', expr.loc)
      break
    case 'global':
      state.ops.push(AudioVmOp.GetCellRefGlobal)
      state.ops.push(varInfo.index)
      break
    case 'local':
      state.ops.push(AudioVmOp.GetCellRefLocal)
      state.ops.push(varInfo.index)
      break
    case 'closure':
      state.ops.push(AudioVmOp.GetCellRefClosure)
      state.ops.push(varInfo.closureIndex ?? 0)
      break
  }
}

export function compileGetVariable(state: State, varInfo: VariableInfo): void {
  switch (varInfo.scope) {
    case 'system':
      state.ops.push(AudioVmOp.GetSystem)
      state.ops.push(varInfo.index)
      break
    case 'global':
      state.ops.push(AudioVmOp.GetGlobal)
      state.ops.push(varInfo.index)
      break
    case 'local':
      state.ops.push(AudioVmOp.GetLocal)
      state.ops.push(varInfo.index)
      break
    case 'closure':
      // Access parent's locals using the closure index
      state.ops.push(AudioVmOp.GetClosure)
      state.ops.push(varInfo.closureIndex ?? 0)
      break
  }
}

export function compileSetVariable(state: State, varInfo: VariableInfo, expr: Expr): void {
  switch (varInfo.scope) {
    case 'system':
      error(state, 'Cannot assign to system variable', expr.loc)
      break
    case 'global':
      state.ops.push(AudioVmOp.SetGlobal)
      state.ops.push(varInfo.index)
      break
    case 'local':
      state.ops.push(AudioVmOp.SetLocal)
      state.ops.push(varInfo.index)
      break
    case 'closure':
      state.ops.push(AudioVmOp.SetClosure)
      state.ops.push(varInfo.closureIndex ?? 0)
      break
  }
}

export function compileAssign(state: State, expr: Extract<Expr, { type: 'assign' }>): void {
  const ops = state.ops
  const stack = state.stack
  const { left, right, op } = expr
  const stackExpr = { expr }

  // Handle destructuring assignment: [a, b] = x
  if (left.type === 'destructure') {
    if (op !== '=' && op !== ':=') {
      error(state, 'Destructuring assignment only supports = and := operators', expr.loc)
      return
    }

    // Compile the right-hand side (should be an array)
    compileExpr(state, right)
    if (stack.length === 0) {
      error(state, 'Assignment has no value', expr.loc)
      return
    }

    const shadow = op === ':='
    const stackRight = { expr: right }

    // For each name in the destructuring pattern, extract the corresponding index and assign it
    const names = left.names
    for (let i = 0; i < names.length; i++) {
      const name = names[i]

      // Duplicate the array on the stack so we can use it for each index
      ops.push(AudioVmOp.Dup)
      stack.push(stackRight)

      // Push the index
      ops.push(AudioVmOp.PushScalar, i)
      stack.push(stackRight)

      // Index into the array (ArrayGet pops: array, index, pushes: value); 0 = no history recording
      ops.push(AudioVmOp.ArrayGet, 0)
      stack.pop() // index
      stack.pop() // array (the duplicate)
      stack.push(stackRight)

      // Declare and assign the variable
      const varInfo = declareVariable(state, name, left.loc, shadow)
      clearVariableFunctionBinding(state, varInfo)
      clearVariableObjectShape(state, varInfo)
      clearVariableStoreShape(state, varInfo)
      compileSetVariable(state, varInfo, left)
      stack.pop() // value
    }

    // After all iterations, we still have the original array on the stack
    // The assignment expression returns the assigned array
    stack.push(stackExpr)
    return
  }

  if (left.type !== 'identifier' && left.type !== 'index' && left.type !== 'member') {
    error(state, 'Assignment target must be an identifier, object property, array index, or destructuring pattern',
      expr.loc)
    return
  }

  if (op === '=>') {
    if (left.type !== 'identifier') {
      error(state, 'Function definition target must be an identifier', expr.loc)
      return
    }
    const leftName = left.name
    if (leftName === 'mix') state.mixDefinitionLoc = expr.loc

    const x: Extract<Expr, { type: 'identifier' }> = {
      type: 'identifier',
      name: 'x',
      loc: left.loc,
    }

    const fnExpr: Extract<Expr, { type: 'fn' }> = {
      type: 'fn',
      params: [{ type: 'param', name: 'x', loc: left.loc }],
      defaults: [null],
      body: { type: 'binary', op: '|>', left: x, right, loc: right.loc },
      loc: expr.loc,
    }

    if (state.functionDepth === 0 && state.deferredGlobalFunctions.some(
      d => d.name === leftName && d.loc.start === expr.loc.start && d.loc.end === expr.loc.end,
    )) return

    const functionId = compileFunction(state, fnExpr, leftName)

    if (stack.length === 0) return

    const varInfo = declareVariable(state, leftName, expr.loc)
    setVariableFunctionBinding(state, varInfo, functionId)
    clearVariableObjectShape(state, varInfo)
    clearVariableStoreShape(state, varInfo)
    ops.push(AudioVmOp.Dup)
    stack.push({ expr: right })
    compileSetVariable(state, varInfo, left)
    stack.pop()
    stack.push(stackExpr)
    return
  }

  // Semantic: scale=<string> — compile-time only, updates state for # var resolution
  if (left.type === 'identifier' && left.name === 'scale' && (op === '=' || op === ':=')) {
    if (right.type !== 'string') {
      error(state, 'scale must be set to a string literal', expr.loc)
      return
    }
    const scaleIdx = findScaleIndex(right.value)
    if (scaleIdx === undefined) {
      error(state, `Unknown scale: ${right.value}`, expr.loc)
      return
    }
    state.scale = right.value
    state.scaleIndex = scaleIdx
    const varInfo = declareVariable(state, 'scale', expr.loc)
    ops.push(AudioVmOp.PushScalar, 0, AudioVmOp.SetGlobal, varInfo.index, AudioVmOp.PushScalar, 0)
    stack.push(stackExpr)
    return
  }

  // Semantic: bpm=<number>
  // This compiles to the dedicated SetBpm opcode so the VM updates all tempo-derived system values
  // (t, co, samplesPerBeat, samplesPerBar, etc).
  if (left.type === 'identifier' && left.name === 'bpm' && (op === '=' || op === ':=')) {
    if (right.type !== 'number') {
      error(state, 'bpm must be set to a literal number', expr.loc)
      return
    }
    const bpm = right.value
    if (!Number.isFinite(bpm) || bpm <= 0) {
      error(state, 'bpm must be a finite number > 0', expr.loc)
      return
    }
    ops.push(AudioVmOp.SetBpm, bpm)
    state.bpm = bpm
    // Keep assignment-like behavior: the expression evaluates to the bpm value.
    ops.push(AudioVmOp.PushScalar, bpm)
    stack.push(stackExpr)
    return
  }

  // Lower known object-property writes to array index writes.
  if (left.type === 'member') {
    if (op === ':=') {
      error(state, 'Object property assignment does not support :=', expr.loc)
      return
    }
    const storeShape = getStoreShapeForExpr(state, left.object)
    if (storeShape?.kind === 'array') {
      error(state, `Store arrays do not support property writes: ${left.property}`, left.loc)
      return
    }
    if (storeShape?.kind === 'object') {
      const propertyIndex = storeShape.keys.indexOf(left.property)
      if (propertyIndex < 0) {
        error(state, `Unknown store object property: ${left.property}`, left.loc)
        return
      }
      const indexExpr: Extract<Expr, { type: 'index' }> = {
        type: 'index',
        object: left.object,
        index: { type: 'number', value: propertyIndex, loc: left.loc },
        loc: left.loc,
      }
      const rewritten: Extract<Expr, { type: 'assign' }> = { ...expr, left: indexExpr }
      compileAssign(state, rewritten)
      return
    }
    const objectKeys = getObjectKeysForExpr(state, left.object)
    if (!objectKeys) {
      error(state, `Property write requires known object shape: ${left.property}`, left.loc)
      return
    }
    const propertyIndex = objectKeys.indexOf(left.property)
    if (propertyIndex < 0) {
      error(state, `Unknown object property: ${left.property}`, left.loc)
      return
    }
    const indexExpr: Extract<Expr, { type: 'index' }> = {
      type: 'index',
      object: left.object,
      index: { type: 'number', value: propertyIndex, loc: left.loc },
      loc: left.loc,
    }
    const rewritten: Extract<Expr, { type: 'assign' }> = { ...expr, left: indexExpr }
    compileAssign(state, rewritten)
    return
  }

  // Handle array element assignment: arr[i] = value or arr[i] += value etc
  if (left.type === 'index') {
    const isCompound = op !== '=' && op !== ':='
    const opCode = COMPOUND_ASSIGN_OP_TO_OPCODE[op]
    const stackRight = { expr: right }
    const stackLeft = { expr: left }
    const storeShape = getStoreShapeForExpr(state, left.object)
    const useStoreOps = !!storeShape

    if (isCompound && opCode === undefined) {
      error(state, 'Compound assignment not supported for array elements', expr.loc)
      return
    }
    if (useStoreOps && op === ':=') {
      error(state, 'Store element assignment does not support :=', expr.loc)
      return
    }

    compileExpr(state, left.object)
    if (stack.length === 0) {
      error(state, 'Array expression has no value', expr.loc)
      return
    }
    compileExpr(state, left.index)
    if (stack.length === 0) {
      error(state, 'Index expression has no value', expr.loc)
      return
    }

    if (isCompound) {
      const isGlobal = state.functionDepth === 0
      const a = isGlobal ? state.nextGlobalIndex++ : state.nextLocalIndex++
      const b = isGlobal ? state.nextGlobalIndex++ : state.nextLocalIndex++
      const v = isGlobal ? state.nextGlobalIndex++ : state.nextLocalIndex++
      const saveOp = isGlobal ? AudioVmOp.SetGlobal : AudioVmOp.SetLocal
      const loadOp = isGlobal ? AudioVmOp.GetGlobal : AudioVmOp.GetLocal

      ops.push(saveOp, a)  // a = index (was top)
      stack.pop()
      ops.push(saveOp, b)  // b = array
      stack.pop()
      ops.push(loadOp, b, loadOp, a)
      if (useStoreOps) {
        ops.push(AudioVmOp.StoreGet)
      }
      else {
        ops.push(AudioVmOp.ArrayGet, 0)
      }
      stack.pop()
      stack.pop()
      stack.push(stackLeft)

      compileExpr(state, right)
      if (stack.length < 2) {
        error(state, 'Compound assignment missing operands', expr.loc)
        return
      }
      ops.push(opCode!)
      stack.pop()
      stack.pop()
      stack.push(stackExpr)

      ops.push(saveOp, v)
      stack.pop()
      ops.push(loadOp, b, loadOp, a, loadOp, v)
      stack.push(stackRight)
      ops.push(useStoreOps ? AudioVmOp.StoreSet : AudioVmOp.ArraySet)
      stack.pop()
      stack.pop()
      stack.pop()
      ops.push(loadOp, v)
      stack.pop()
      stack.push(stackExpr)
    }
    else {
      compileExpr(state, right)
      if (stack.length === 0) {
        error(state, 'Assignment has no value', expr.loc)
        return
      }

      if (state.functionDepth === 0) {
        const tempGlobalIdx = state.nextGlobalIndex++
        ops.push(AudioVmOp.SetGlobal, tempGlobalIdx)
        stack.pop()
        ops.push(AudioVmOp.GetGlobal, tempGlobalIdx)
        stack.push(stackRight)
        ops.push(useStoreOps ? AudioVmOp.StoreSet : AudioVmOp.ArraySet)
        stack.pop()
        stack.pop()
        stack.pop()
        ops.push(AudioVmOp.GetGlobal, tempGlobalIdx)
        stack.pop()
        stack.push(stackExpr)
      }
      else {
        const tempIndex = state.nextLocalIndex++
        ops.push(AudioVmOp.SetLocal, tempIndex)
        stack.pop()
        ops.push(AudioVmOp.GetLocal, tempIndex)
        stack.push(stackRight)
        ops.push(useStoreOps ? AudioVmOp.StoreSet : AudioVmOp.ArraySet)
        stack.pop()
        stack.pop()
        stack.pop()
        ops.push(AudioVmOp.GetLocal, tempIndex)
        stack.pop()
        stack.push(stackExpr)
      }
    }
    return
  }

  if (right.type === 'fn' && left.type === 'identifier') {
    const leftName = left.name
    if (leftName === 'mix') state.mixDefinitionLoc = expr.loc
    if (state.functionDepth === 0 && state.deferredGlobalFunctions.some(
      d => d.name === leftName && d.loc.start === expr.loc.start && d.loc.end === expr.loc.end,
    )) return
    const shadow = op === ':='
    const varInfo = declareVariable(state, leftName, expr.loc, shadow)
    const functionId = compileFunction(state, right, leftName)
    if (stack.length === 0) return
    setVariableFunctionBinding(state, varInfo, functionId)
    clearVariableObjectShape(state, varInfo)
    clearVariableStoreShape(state, varInfo)
    ops.push(AudioVmOp.Dup)
    stack.push({ expr: right })
    compileSetVariable(state, varInfo, left)
    stack.pop()
    stack.push(stackExpr)
    return
  }

  if (op === '=' || op === ':=') {
    const aliasFunctionId = (left.type === 'identifier'
      && right.type === 'identifier'
      && hasFunctionByName(state, right.name))
      ? getFunctionByName(state, right.name)?.id
      : undefined
    const inferredObjectKeys = left.type === 'identifier' ? getObjectKeysForExpr(state, right) : null
    const inferredStoreShape = left.type === 'identifier' ? getStoreShapeForExpr(state, right) : null
    if (left.type === 'identifier' && right.type === 'array') {
      state.varToArrayLiteral.set(left.name, right)
    }
    if (left.type === 'identifier' && right.type === 'object') {
      state.varToObjectLiteral.set(left.name, right)
    }
    if (left.type === 'identifier' && right.type === 'identifier'
      && hasFunctionByName(state, right.name))
    {
      state.functionAliases.set(left.name, right.name)
    }
    compileExpr(state, right)

    if (stack.length === 0) {
      error(state, 'Assignment has no value', expr.loc)
      return
    }

    const shadow = op === ':='
    const varInfo = declareVariable(state, left.name, expr.loc, shadow)
    clearVariableFunctionBinding(state, varInfo)
    clearVariableObjectShape(state, varInfo)
    clearVariableStoreShape(state, varInfo)
    if (aliasFunctionId !== undefined) setVariableFunctionBinding(state, varInfo, aliasFunctionId)
    if (inferredObjectKeys) setVariableObjectShape(state, varInfo, inferredObjectKeys)
    if (inferredStoreShape) setVariableStoreShape(state, varInfo, inferredStoreShape)
    // Duplicate the value on stack so we can both store it and return it
    ops.push(AudioVmOp.Dup)
    stack.push({ expr: right })
    // Store to variable (pops one copy)
    compileSetVariable(state, varInfo, left)
    stack.pop()
    // The other copy remains on stack as the assignment expression result
    stack.push(stackExpr)
  }
  else {
    const varInfo = lookupVariable(state, left.name)
    if (!varInfo) {
      error(state, `Unknown variable: ${left.name}`, expr.loc)
      return
    }

    compileGetVariable(state, varInfo)
    stack.push({ expr: left })

    compileExpr(state, right)

    if (stack.length < 2) {
      error(state, 'Compound assignment missing operands', expr.loc)
      return
    }

    const opCode = COMPOUND_ASSIGN_OP_TO_OPCODE[op]
    if (opCode !== undefined) {
      ops.push(opCode)
      stack.pop()
      stack.pop()
      stack.push(stackExpr)
    }

    ops.push(AudioVmOp.Dup)
    stack.push(stackExpr)
    clearVariableFunctionBinding(state, varInfo)
    clearVariableObjectShape(state, varInfo)
    clearVariableStoreShape(state, varInfo)
    compileSetVariable(state, varInfo, left)
    stack.pop()
    stack.push(stackExpr)
  }
}

export function detectClosureVars(state: State, expr: Extract<Expr, { type: 'fn' }>,
  outerLocals: Map<string, VariableInfo>[]): string[]
{
  const outerPipe = state.pipeVars[state.pipeVars.length - 1]
  const includePipe = !!outerPipe && outerPipe.functionDepth < state.functionDepth
  const includeGlobals = state.captureGlobalsInClosures

  let scopes: Array<Map<string, unknown>> = outerLocals as unknown as Array<Map<string, unknown>>
  if (includePipe || includeGlobals) {
    // Never mutate the caller-provided `outerLocals` array: this function may be called many times.
    scopes = scopes.slice()
    if (includePipe) scopes.push(PIPE_SCOPE)
    if (includeGlobals) scopes.push(state.globals as unknown as Map<string, unknown>)
  }
  return collectClosureVarNames(expr, scopes, { systemVars: SYSTEM_VARS })
}

// Detect all variables accessed in an expression/statement that need to be captured for record callbacks
// Returns array of {name, info} for all non-system variables (globals, locals, closures)
export function detectCapturedVarsInBody(state: State, body: Expr | Stmt): Array<{ name: string; info: VariableInfo }> {
  const outerScopes: Array<Map<string, unknown>> = []

  // Include lexical locals in scope order.
  for (const scope of state.locals) {
    outerScopes.push(scope as unknown as Map<string, unknown>)
  }

  // Include explicit function parameter-name map (covers param-named-destructure aliases).
  if (state.paramNameToLocalIndex && state.paramNameToLocalIndex.size > 0) {
    const paramScope = new Map<string, unknown>()
    for (const name of state.paramNameToLocalIndex.keys()) paramScope.set(name, true)
    outerScopes.push(paramScope)
  }

  // Include closure and global scopes so nested callback bodies can capture them as dependencies.
  for (const scope of state.closureVars) {
    outerScopes.push(scope as unknown as Map<string, unknown>)
  }
  outerScopes.push(state.globals as unknown as Map<string, unknown>)

  const bodyLoc = body.loc
  const syntheticFn: Extract<Expr, { type: 'fn' }> = {
    type: 'fn',
    params: [],
    defaults: [],
    body: body.type === 'block' ? body : body as Expr,
    loc: bodyLoc,
  }

  const names = collectClosureVarNames(syntheticFn, outerScopes, { systemVars: SYSTEM_VARS })
  const captured: Array<{ name: string; info: VariableInfo }> = []
  for (const name of names) {
    const info = lookupVariable(state, name)
    if (info) captured.push({ name, info })
  }
  return captured
}
