import { AudioVmOp, type GenSpec, genSpecs } from '../../dsp/audio-vm-bindings.ts'
import { sampleManager } from '../../lib/sample-manager.ts'
import type { Arg, Expr, Loc, Param, Program, Stmt } from '../ast.ts'
import { assignRecordCallIds } from '../deps.ts'
import { compileCall, compileGetCall } from './call.ts'
import {
  compileBreak,
  compileContinue,
  compileDoWhile,
  compileFor,
  compileForOf,
  compileIf,
  compileLabel,
  compileSwitch,
  compileThrow,
  compileTry,
  compileWhile,
} from './control.ts'
import { encodeToBuffer, patchPcParamsInRange } from './encode.ts'
import { compileFunction } from './functions.ts'
import { compileHashVar, compileNoteVar, isNoteName } from './hash-vars.ts'
import { compileBinaryOp, compileTernary, compileUnaryOp } from './math.ts'
import { compilePipe } from './pipe.ts'
import type { State } from './state.ts'
import type { CompileResult, VariableInfo } from './types.ts'
import { compileArray, compileMember } from './values.ts'
import {
  compileAssign,
  compileGetVariable,
  compilePushCellRef,
  declareVariable,
  functionsByNameEntries,
  hasFunctionByName,
  lookupVariable,
} from './vars.ts'

function isTopLevelFnAssign(state: State,
  stmt: Stmt): stmt is Extract<Stmt, { type: 'expr' }> & { expr: Extract<Expr, { type: 'assign' }> }
{
  if (state.functionDepth !== 0) return false
  if (stmt.type !== 'expr' || stmt.expr.type !== 'assign') return false
  const expr = stmt.expr
  if (expr.left.type !== 'identifier') return false
  return expr.op === '=>' || (expr.op === ':=' && expr.right.type === 'fn')
    || (expr.op === '=' && expr.right.type === 'fn')
}

function isDeferredDefStmt(state: State, stmt: Stmt): boolean {
  if (!isTopLevelFnAssign(state, stmt)) return false
  const expr = stmt.expr
  if (expr.left.type !== 'identifier') return false
  const name = expr.left.name
  const loc = expr.loc
  return state.deferredGlobalFunctions.some(
    d => d.name === name && d.loc.start === loc.start && d.loc.end === loc.end,
  )
}

function declareAssignLhs(state: State, expr: Extract<Expr, { type: 'assign' }>): void {
  const shadow = expr.op === ':='
  if (expr.left.type === 'destructure') {
    for (const name of expr.left.names) declareVariable(state, name, expr.left.loc, shadow)
    return
  }
  if (expr.left.type === 'identifier') declareVariable(state, expr.left.name, expr.loc, shadow)
}

function collectDeferredGlobalFunctions(state: State, body: Stmt[], atTopLevel = true): void {
  for (const stmt of body) {
    if (stmt.type === 'block') {
      pushScope(state)
      collectDeferredGlobalFunctions(state, stmt.body, false)
      popScope(state)
      continue
    }
    if (stmt.type === 'expr' && stmt.expr.type === 'assign') {
      const assign = stmt.expr
      const existedBefore = atTopLevel && assign.left.type === 'identifier'
        ? lookupVariable(state, assign.left.name)
        : null
      declareAssignLhs(state, assign)
      if (atTopLevel && isTopLevelFnAssign(state, stmt)) {
        if (assign.left.type !== 'identifier') continue
        const name = assign.left.name
        if (existedBefore) continue
        if (name === 'mix') state.mixDefinitionLoc = assign.loc
        const varInfo = lookupVariable(state, name)
        if (!varInfo || varInfo.scope !== 'global') continue
        const globalIndex = varInfo.index
        let fnExpr: Extract<Expr, { type: 'fn' }>
        if (assign.op === '=>') {
          // right of => is any expression, wrapped as x |> right
          const x: Extract<Expr, { type: 'identifier' }> = { type: 'identifier', name: 'x', loc: assign.left.loc }
          fnExpr = {
            type: 'fn',
            params: [{ type: 'param', name: 'x', loc: assign.left.loc }],
            defaults: [null],
            body: { type: 'binary', op: '|>', left: x, right: assign.right, loc: assign.right.loc },
            loc: assign.loc,
          }
        }
        else {
          if (assign.right.type !== 'fn') continue
          fnExpr = assign.right
        }
        state.deferredGlobalFunctions.push({ name, fnExpr, globalIndex, loc: assign.loc })
      }
    }
  }
}

export function compile(state: State, program: Program, preludeLines: number = 0): CompileResult {
  state.preludeLines = preludeLines
  state.ops = []
  state.errors = []
  state.stack = []
  state.functionAliases = new Map()
  state.globals = new Map()
  state.locals = []
  state.closureVars = []
  state.functions = []
  state.stringExpressions = new Map()
  state.functionBytecodes = new Map()
  state.loopStack = []
  state.pipeVars = []
  state.nextGlobalIndex = 0
  state.nextLocalIndex = 0
  state.nextFunctionId = 0
  state.nextTempId = 0
  state.inFunction = false
  state.sampleRegistrations = []
  state.recordCallbacks = new Map()
  state.recordCallbackTemplates = new Map()
  state.nextRecordScopeId = 0
  state.scopeCaptureGlobals = new Map()
  state.arrayInitOps = []
  state.arrayInitRequests = []
  state.arrayInitPcOffset = 0
  state.nextRecordGlobalIdx = 1000
  state.recordHandleByScopeGlobal = null
  state.currentRecordScopeIdGlobal = null
  state.recordCaptureStoresByScopeGlobal = null
  state.callSiteIdToHandle = new Map()
  state.historySourceMap = []
  state.labels = []
  state.varToArrayLiteral = new Map()
  state.mixDefinitionLoc = null
  state.scale = 'major'
  state.scaleIndex = 0
  state.rootMidi = 0
  state.functionBytecodeStarts = new Map()
  state.currentFunctionId = null
  state.deferredGlobalFunctions = []
  state.functionsByNameStack = [new Map()]
  state.oversampleCallbackFunctionIds = new Set()
  const recordMapping = assignRecordCallIds(program)
  state.recordCallIds = recordMapping.recordCallIds
  state.functionToRecordCall = recordMapping.functionToRecordCall
  state.recordCallExprs = new Map()

  // Pre-register all callSiteId handles to ensure deterministic handles
  // This ensures record() returns the same handle that we'll store samples for
  // For each function that contains record(), we need to find the record() call to get seconds
  // Then pre-register handles for all callSiteIds that will call this function
  // We'll do this by walking the program to find record() calls inside functions
  const preRegisterCallSiteHandles = (stmt: Stmt): void => {
    if (stmt.type === 'expr' && stmt.expr.type === 'call') {
      const callExpr = stmt.expr
      if (callExpr.callee.type === 'identifier' && callExpr.callee.name === 'record') {
        const locKey = `${callExpr.loc.line}:${callExpr.loc.column}:${callExpr.loc.start}:${callExpr.loc.end}`
        // If this record() is inside a function, it won't be in recordCallIds
        // But we need to find all callSiteIds that will call functions containing this record()
        // For now, we'll handle this during function call compilation
      }
    }
    // Recursively check nested statements
  }

  // Actually, a simpler approach: pre-register handles when we process record() calls inside functions
  // We'll store the record() call expression, and when we compile function calls, we'll register the handle
  // This is already done in compileUserFunctionCall, but we need to ensure it happens for all call sites

  // Pass 1: collect top-level function definitions (declare names only) so we can compile their bodies before the rest.
  collectDeferredGlobalFunctions(state, program.body)
  const deferredNames = new Set(state.deferredGlobalFunctions.map(d => d.name))
  const collectAliasesFromAst = (body: Stmt[]): void => {
    for (const stmt of body) {
      if (stmt.type === 'block') {
        collectAliasesFromAst(stmt.body)
        continue
      }
      if (stmt.type === 'expr' && stmt.expr.type === 'assign') {
        const assign = stmt.expr
        if (assign.left.type === 'identifier' && assign.right.type === 'identifier') {
          const target = assign.right.name
          if (deferredNames.has(target)) {
            state.functionAliases.set(assign.left.name, target)
          }
        }
      }
    }
  }
  collectAliasesFromAst(program.body)
  // Pass 2: compile deferred function bodies so functionsByName is populated for record() and user calls.
  state.ops = []
  state.isDeferredPass = true
  for (const { name, fnExpr, globalIndex, loc } of state.deferredGlobalFunctions) {
    const prevCaptureGlobals = state.captureGlobalsInClosures
    const isPrelude = loc.line <= state.preludeLines
    if (isPrelude) state.captureGlobalsInClosures = true
    compileFunction(state, fnExpr, name)
    state.captureGlobalsInClosures = prevCaptureGlobals
    state.ops.push(AudioVmOp.SetGlobal, globalIndex)
    state.stack.pop()
  }
  const deferredOps = state.ops.slice()
  const deferredLength = deferredOps.length
  // Pass 3: compile all statements, skipping deferred defs (already emitted in deferredOps).
  state.ops = []
  state.isDeferredPass = false
  for (const stmt of program.body) {
    if (isDeferredDefStmt(state, stmt)) continue
    compileStmt(state, stmt)
  }
  state.ops = deferredOps.concat(state.ops)
  patchPcParamsInRange(state.ops, deferredLength, deferredLength)
  state.arrayInitPcOffset = deferredLength

  // Expand array init requests into a local buffer (never touch state.arrayInitOps so it cannot alias state.ops)
  const arrayInitOps: number[] = []
  for (const { capacity, globalIdx } of state.arrayInitRequests) {
    for (let j = 0; j < capacity; j++) arrayInitOps.push(AudioVmOp.PushUndefined)
    arrayInitOps.push(AudioVmOp.MakeArray, capacity, AudioVmOp.SetGlobal, globalIdx)
  }
  if (state.recordCaptureStoresByScopeGlobal !== null && state.recordCallbacks.size > 0) {
    const maxScopeId = Math.max(...state.recordCallbacks.keys(), -1)
    for (let scopeId = 0; scopeId <= maxScopeId; scopeId++) {
      const cb = state.recordCallbacks.get(scopeId)
      const numDeps = cb ? cb.recordGlobalIndices.length : 1
      const capacity = Math.max(1, numDeps)
      for (let j = 0; j < capacity; j++) arrayInitOps.push(AudioVmOp.PushUndefined)
      arrayInitOps.push(AudioVmOp.MakeArray, capacity)
    }
    arrayInitOps.push(AudioVmOp.MakeArray, maxScopeId + 1, AudioVmOp.SetGlobal, state.recordCaptureStoresByScopeGlobal)
  }
  state.arrayInitRequests = []

  const arrayInitOffset = arrayInitOps.length
  if (arrayInitOffset > 0) {
    for (let i = 0; i < state.historySourceMap.length; i++) {
      const entry = state.historySourceMap[i]!
      if (entry.inFunction && entry.__finalFunctionId !== undefined) {
        if (state.oversampleCallbackFunctionIds.has(entry.__finalFunctionId)) continue
      }
      // state.historySourceMap[i]!.pc += arrayInitOffset
    }
  }

  if (state.errors.length > 0) {
    return {
      bytecode: null,
      errors: state.errors,
      sampleRegistrations: [],
      recordCallbacks: new Map(),
      historySourceMap: [],
      labels: [],
      functionCalls: [],
      bpm: state.bpm,
    }
  }

  // Emit Post op to mix all outputs into [L, R] array; capture mix output via history sourcemapped to latest mix=> definition (only when user defined mix, not prelude)
  const postPc = state.ops.length
  const mixDef = state.mixDefinitionLoc as Loc | null
  if (mixDef !== null) {
    const mixLine = Math.max(1, mixDef.line - state.preludeLines)
    state.historySourceMap.push({
      line: mixLine,
      column: mixDef.column,
      genName: 'Mix',
      pc: postPc,
      inFunction: false,
    })
  }
  state.ops.push(AudioVmOp.Post)
  // Get mix function - check if user defined mix, otherwise use prelude mix (global index 0)
  const mixVarInfo = lookupVariable(state, 'mix')
  if (mixVarInfo && mixVarInfo.scope === 'global') {
    // User defined mix function
    state.ops.push(AudioVmOp.GetGlobal)
    state.ops.push(mixVarInfo.index)
  }
  else {
    // Use prelude mix function (global index 0)
    state.ops.push(AudioVmOp.GetGlobal)
    state.ops.push(0)
  }
  // Call mix function with 1 argument (the array from Post)
  state.ops.push(AudioVmOp.CallFunction)
  state.ops.push(1)
  // Update stack tracking - Post pushes array, CallFunction consumes it and pushes result
  if (state.stack.length > 0) {
    state.stack.pop()
  }
  state.stack.push({ expr: { type: 'array', items: [], loc: { start: 0, end: 0, line: 0, column: 0 } } })

  const totalLen = arrayInitOffset + state.ops.length
  const buffer = new ArrayBuffer(totalLen * 4)
  const u32View = new Uint32Array(buffer)
  const f32View = new Float32Array(buffer)
  if (arrayInitOffset > 0) {
    encodeToBuffer(arrayInitOps, u32View, f32View, 0, 0)
    encodeToBuffer(state.ops, u32View, f32View, arrayInitOffset, arrayInitOffset)
  }
  else {
    encodeToBuffer(state.ops, u32View, f32View, 0, 0)
  }

  // After compilation, ensure all callSiteId handles are in sampleRegistrations (prelude + user = e.g. 4 + 1)
  for (const [funcName, recordCallLocKey] of state.functionToRecordCall.entries()) {
    if (!hasFunctionByName(state, funcName)) continue
    const recordCallExpr = state.recordCallExprs.get(recordCallLocKey)
    if (recordCallExpr) {
      const args = recordCallExpr.args
      const secondsArg = args[0]?.type === 'arg' ? args[0].value : null
      if (secondsArg && secondsArg.type === 'number') {
        const seconds = Math.max(0, Math.min(10, secondsArg.value))

        // Find all callSiteIds that correspond to calls to this function
        // These are the IDs in recordCallIds that correspond to function call sites
        // We can identify them by checking if they're call sites (not direct record() calls)
        // Actually, we need to match callSiteIds to function calls, which is complex
        // Instead, let's ensure that when compileUserFunctionCall processes a call site,
        // it always adds the handle to sampleRegistrations (which it already does at line 1587-1588)
        // The issue might be that compileUserFunctionCall isn't being called for all call sites
        // So let's pre-register handles for all callSiteIds that might be used
        // We'll identify callSiteIds by checking if they're not direct record() call IDs
        const directRecordCallIds = new Set<number>()
        for (const [locKey, id] of state.recordCallIds.entries()) {
          if (state.recordCallExprs.has(locKey)) {
            directRecordCallIds.add(id)
          }
        }

        for (const [callSiteLocKey, callSiteId] of state.recordCallIds.entries()) {
          if (directRecordCallIds.has(callSiteId)) continue
          if (!state.recordCallbacks.has(callSiteId)) continue

          const alreadyRegistered = state.sampleRegistrations.some(
            reg => reg.type === 'record' && reg.recordCallbackId === callSiteId,
          )
          if (!alreadyRegistered) {
            const handle = sampleManager.registerRecord(state.projectId, seconds, callSiteId)
            state.sampleRegistrations.push({
              handle,
              type: 'record',
              recordSeconds: seconds,
              recordCallbackId: callSiteId,
              recordProjectId: state.projectId,
            })
          }
        }
      }
    }
  }

  for (const entry of state.historySourceMap) {
    entry.pc += arrayInitOffset + (entry.__fromMainProgram ? state.arrayInitPcOffset : 0)
  }

  const functionReturnPcs: Record<string, number> = {}
  for (const [name, funcInfo] of functionsByNameEntries(state)) {
    const idx = funcInfo.returnHistorySourceMapIndex
    if (idx != null) {
      const entry = state.historySourceMap[idx]
      if (entry) functionReturnPcs[name] = entry.pc
    }
  }

  return {
    bytecode: f32View,
    errors: [],
    sampleRegistrations: state.sampleRegistrations,
    historySourceMap: state.historySourceMap,
    labels: state.labels,
    recordCallbacks: state.recordCallbacks,
    functionReturnPcs,
    functionCalls: state.functionCallsMeta,
    bpm: state.bpm,
  }
}

export function compileStmt(state: State, stmt: Stmt): void {
  switch (stmt.type) {
    case 'expr':
      compileExpr(state, stmt.expr)
      break
    case 'block':
      pushScope(state)
      for (const s of stmt.body) {
        compileStmt(state, s)
      }
      popScope(state)
      break
    case 'return':
      if (stmt.value) {
        compileExpr(state, stmt.value)
      }
      else {
        // Return undefined (represented as 0)
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(0)
        state.stack.push({ expr: { type: 'number', value: 0, loc: stmt.loc } })
      }
      state.ops.push(AudioVmOp.Return)
      break
    case 'if':
      compileIf(state, stmt)
      break
    case 'while':
      compileWhile(state, stmt)
      break
    case 'do':
      compileDoWhile(state, stmt)
      break
    case 'for':
      compileFor(state, stmt)
      break
    case 'for-of':
      compileForOf(state, stmt)
      break
    case 'switch':
      compileSwitch(state, stmt)
      break
    case 'break':
      compileBreak(state, stmt)
      break
    case 'continue':
      compileContinue(state, stmt)
      break
    case 'label':
      compileLabel(state, stmt)
      break
    case 'throw':
      compileThrow(state, stmt)
      break
    case 'try':
      compileTry(state, stmt)
      break
    default:
      error(state, `Unsupported statement type: ${(stmt as Stmt).type}`, (stmt as Stmt).loc)
  }
}

const OUT_SOLO_BUILTINS = new Set(['out', 'solo'])

function isKnownBuiltinName(name: string): boolean {
  return getBuiltinSpec(name) !== null || OUT_SOLO_BUILTINS.has(name)
}

function getBuiltinSpec(name: string): GenSpec | null {
  const byVariant = genSpecs.find(s => s.variantName === name)
  if (byVariant) return byVariant
  const genName = name.charAt(0).toUpperCase() + name.slice(1)
  return genSpecs.find(s => s.genName === genName && s.variantName === 'default') ?? null
}

function compileBuiltinAsValue(state: State, builtinName: string, loc: Loc): void {
  if (OUT_SOLO_BUILTINS.has(builtinName)) {
    const params: Extract<Param, { type: 'param' }>[] = [
      { type: 'param', name: 'in', loc },
      { type: 'param', name: 'name', loc },
    ]
    const defaults: Array<Expr | null> = [null, { type: 'identifier', name: 'undefined', loc }]
    const callArgs: Arg[] = [
      { type: 'arg', value: { type: 'identifier', name: 'in', loc }, shorthand: true, loc },
      { type: 'arg', value: { type: 'identifier', name: 'name', loc }, shorthand: true, loc },
    ]
    const wrapperBody: Extract<Expr, { type: 'call' }> = {
      type: 'call',
      callee: { type: 'identifier', name: builtinName, loc },
      args: callArgs,
      loc,
    }
    const wrapperFn: Extract<Expr, { type: 'fn' }> = {
      type: 'fn',
      params,
      defaults,
      body: wrapperBody,
      loc,
    }
    compileFunction(state, wrapperFn, null)
    return
  }
  const spec = getBuiltinSpec(builtinName)
  if (!spec) return
  const paramNames = spec.usesInput ? ['in', ...spec.paramNames] : spec.paramNames
  const params: Extract<Param, { type: 'param' }>[] = paramNames.map(name => ({
    type: 'param',
    name,
    loc,
  }))
  const callArgs: Arg[] = paramNames.map(name => ({
    type: 'arg' as const,
    value: { type: 'identifier' as const, name, loc },
    shorthand: true,
    loc,
  }))
  const wrapperBody: Extract<Expr, { type: 'call' }> = {
    type: 'call',
    callee: { type: 'identifier', name: builtinName, loc },
    args: callArgs,
    loc,
  }
  const wrapperFn: Extract<Expr, { type: 'fn' }> = {
    type: 'fn',
    params,
    body: wrapperBody,
    loc,
  }
  compileFunction(state, wrapperFn, null)
}

export function compileExpr(state: State, expr: Expr): void {
  switch (expr.type) {
    case 'number':
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(expr.value)
      state.stack.push({ expr })
      break

    case 'string':
      // Strings are compile-time only and not emitted to bytecode
      // Store string information for special functions to access during compilation
      const stringKey = `${expr.loc.start}:${expr.loc.end}:${expr.loc.line}:${expr.loc.column}`
      state.stringExpressions.set(stringKey, {
        value: expr.value,
        delimiter: expr.delimiter,
        loc: expr.loc,
      })
      // Push the expr to stack so it's available when compiling function calls
      // but don't emit any bytecode
      state.stack.push({ expr })
      break

    case 'identifier':
      if (expr.name === '$') {
        const pipe = state.pipeVars[state.pipeVars.length - 1]
        if (!pipe) {
          error(state, '$ used outside of a pipe', expr.loc)
          return
        }
        if (pipe.functionDepth === state.functionDepth) {
          compileGetVariable(state, pipe.varInfo)
        }
        else {
          const varInfo = lookupVariable(state, '$')
          if (!varInfo) {
            error(state, '$ used outside of a pipe', expr.loc)
            return
          }
          compileGetVariable(state, varInfo)
        }
        state.stack.push({ expr })
      }
      else if (expr.name.startsWith('#')) {
        compileHashVar(state, expr.name, expr.loc)
        state.stack.push({ expr })
      }
      else {
        const varInfo = lookupVariable(state, expr.name)
        if (varInfo) {
          compileGetVariable(state, varInfo)
          state.stack.push({ expr })
        }
        else if (isNoteName(expr.name)) {
          compileNoteVar(state, expr.name, expr.loc)
          state.stack.push({ expr })
        }
        else if (isKnownBuiltinName(expr.name)) {
          compileBuiltinAsValue(state, expr.name, expr.loc)
          state.stack.push({ expr })
        }
        else {
          error(state, `Unknown identifier: ${expr.name}`, expr.loc)
        }
      }
      break

    case 'array':
      compileArray(state, expr)
      break

    case 'index': {
      const idx = expr as Extract<Expr, { type: 'index' }>
      compileGetCall(state, idx.object, idx.index, idx.loc, idx)
      break
    }

    case 'member':
      compileMember(state, expr)
      break

    case 'fn':
      compileFunction(state, expr, null)
      break

    case 'assign':
      compileAssign(state, expr)
      break

    case 'call':
      compileCall(state, expr)
      break

    case 'unary':
      compileUnaryOp(state, expr as Extract<Expr, { type: 'unary' }>)
      break

    case 'binary':
      if (expr.op === '|>') {
        compilePipe(state, expr as Extract<Expr, { type: 'binary'; op: '|>' }>)
      }
      else {
        compileBinaryOp(state, expr as Extract<Expr, { type: 'binary' }>)
      }
      break

    case 'ternary':
      compileTernary(state, expr as Extract<Expr, { type: 'ternary' }>)
      break

    case 'destructure':
      // Destructure patterns should only appear as the left side of assignments
      // If we're compiling one as a standalone expression, that's an error
      error(state, 'Destructuring pattern can only be used in assignments', expr.loc)
      break

    default:
      error(state, `Unsupported expression type: ${(expr as Expr).type}`, (expr as Expr).loc)
  }
}

export function error(state: State, message: string, loc: Loc): void {
  state.errors.push({ message, loc })
}

export function pushScope(state: State): void {
  state.locals.push(new Map())
}

export function popScope(state: State): void {
  state.locals.pop()
}

export function getCurrentScope(state: State): Map<string, VariableInfo> | null {
  return state.locals.length > 0 ? state.locals[state.locals.length - 1] : null
}
