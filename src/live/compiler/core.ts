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
import { buildEncodedDefineFunctionSegmentCache, encodeToBuffer, patchPcParamsInRange } from './encode.ts'
import { compileFunction } from './functions.ts'
import { compileHashVar, compileNoteVar, isNoteName } from './hash-vars.ts'
import { compileBinaryOp, compileTernary, compileUnaryOp } from './math.ts'
import { compilePipe } from './pipe.ts'
import { State, type FunctionParamHint } from './state.ts'
import { SYSTEM_VARS, type CompileResult, type SampleRegistration, type StoreShape, type VariableInfo } from './types.ts'
import { compileArray, compileMember, compileObject } from './values.ts'
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

function cloneStoreShape(shape: StoreShape): StoreShape {
  if (shape.kind === 'array') return { kind: 'array', length: shape.length }
  return { kind: 'object', keys: [...shape.keys] }
}

function cloneFunctionParamHint(hint: FunctionParamHint): FunctionParamHint {
  return {
    objectKeys: hint.objectKeys ? [...hint.objectKeys] : undefined,
    objectPropertyStoreShapes: hint.objectPropertyStoreShapes
      ? new Map(Array.from(hint.objectPropertyStoreShapes.entries()).map(([k, v]) => [k, cloneStoreShape(v)]))
      : undefined,
    storeShape: hint.storeShape ? cloneStoreShape(hint.storeShape) : undefined,
    functionId: hint.functionId,
  }
}

function cloneFunctionParamHintsByFnLoc(
  hints: Map<string, Map<number, FunctionParamHint>>,
): Map<string, Map<number, FunctionParamHint>> {
  const out = new Map<string, Map<number, FunctionParamHint>>()
  for (const [fnLocKey, byIndex] of hints.entries()) {
    const cloned = new Map<number, FunctionParamHint>()
    for (const [paramIndex, hint] of byIndex.entries()) cloned.set(paramIndex, cloneFunctionParamHint(hint))
    out.set(fnLocKey, cloned)
  }
  return out
}

function mergeFunctionParamHintsByFnLoc(
  into: Map<string, Map<number, FunctionParamHint>>,
  from: Map<string, Map<number, FunctionParamHint>>,
): void {
  for (const [fnLocKey, byIndex] of from.entries()) {
    const targetByIndex = into.get(fnLocKey) ?? new Map<number, FunctionParamHint>()
    for (const [paramIndex, hint] of byIndex.entries()) {
      const prev = targetByIndex.get(paramIndex) ?? {}
      targetByIndex.set(paramIndex, { ...prev, ...cloneFunctionParamHint(hint) })
    }
    into.set(fnLocKey, targetByIndex)
  }
}

function cloneVariableInfo(info: VariableInfo): VariableInfo {
  if (info.closureIndex === undefined) return { scope: info.scope, index: info.index }
  return { scope: info.scope, index: info.index, closureIndex: info.closureIndex }
}

function cloneVariableMap(source: Map<string, VariableInfo>): Map<string, VariableInfo> {
  const cloned = new Map<string, VariableInfo>()
  for (const [name, info] of source.entries()) cloned.set(name, cloneVariableInfo(info))
  return cloned
}

function cloneVariableScopeStack(source: Map<string, VariableInfo>[]): Map<string, VariableInfo>[] {
  return source.map(scope => cloneVariableMap(scope))
}

function cloneStringArrayMap(source: Map<string, string[]>): Map<string, string[]> {
  const cloned = new Map<string, string[]>()
  for (const [key, values] of source.entries()) cloned.set(key, [...values])
  return cloned
}

function cloneStoreShapeMap(source: Map<string, StoreShape>): Map<string, StoreShape> {
  const cloned = new Map<string, StoreShape>()
  for (const [key, shape] of source.entries()) cloned.set(key, cloneStoreShape(shape))
  return cloned
}

function cloneObjectPropertyStoreShapeMap(
  source: Map<string, Map<string, StoreShape>>,
): Map<string, Map<string, StoreShape>> {
  const cloned = new Map<string, Map<string, StoreShape>>()
  for (const [bindingKey, propertyShapes] of source.entries()) {
    const clonedPropertyShapes = new Map<string, StoreShape>()
    for (const [propertyKey, shape] of propertyShapes.entries()) {
      clonedPropertyShapes.set(propertyKey, cloneStoreShape(shape))
    }
    cloned.set(bindingKey, clonedPropertyShapes)
  }
  return cloned
}

function cloneArrayInitRequests(
  requests: Array<{ capacity: number; globalIdx: number }>,
): Array<{ capacity: number; globalIdx: number }> {
  return requests.map(req => ({ capacity: req.capacity, globalIdx: req.globalIdx }))
}

function cloneSampleRegistrations(registrations: SampleRegistration[]): SampleRegistration[] {
  return registrations.map((registration) => {
    if (registration.type !== 'inline' || !registration.inlineChannels) return { ...registration }
    return {
      ...registration,
      inlineChannels: registration.inlineChannels.map(channel => channel.slice()),
    }
  })
}

function cloneProgramWithBody(program: Program, body: Stmt[]): Program {
  return { type: 'program', body, loc: { ...program.loc } }
}

export type SplitProgram = {
  prelude: Program
  user: Program
}

export function splitProgramByPreludeLines(program: Program, preludeLines: number): SplitProgram {
  if (preludeLines <= 0) {
    return {
      prelude: cloneProgramWithBody(program, []),
      user: cloneProgramWithBody(program, [...program.body]),
    }
  }
  const preludeBody: Stmt[] = []
  const userBody: Stmt[] = []
  for (const stmt of program.body) {
    if (stmt.loc.line <= preludeLines) preludeBody.push(stmt)
    else userBody.push(stmt)
  }
  return {
    prelude: cloneProgramWithBody(program, preludeBody),
    user: cloneProgramWithBody(program, userBody),
  }
}

function collectAliasesFromAst(
  state: State,
  body: Stmt[],
  deferredNames: Set<string>,
  includeExistingFunctionTargets: boolean,
): void {
  for (const stmt of body) {
    if (stmt.type === 'block') {
      collectAliasesFromAst(state, stmt.body, deferredNames, includeExistingFunctionTargets)
      continue
    }
    if (stmt.type !== 'expr' || stmt.expr.type !== 'assign') continue
    const assign = stmt.expr
    if (assign.left.type !== 'identifier' || assign.right.type !== 'identifier') continue
    const target = assign.right.name
    if (deferredNames.has(target) || (includeExistingFunctionTargets && hasFunctionByName(state, target))) {
      state.functionAliases.set(assign.left.name, target)
    }
  }
}

type CompileBodyPassOptions = {
  seedDeferredOpsPrefix?: number[]
  seedMainOpsPrefix?: number[]
  includeExistingFunctionAliasTargets?: boolean
}

type CompileBodyPassResult = {
  deferredLocKeys: Set<string>
  deferredOpsRaw: number[]
  mainOpsRaw: number[]
  deferredLength: number
}

function compileBodyPasses(state: State, body: Stmt[], opts: CompileBodyPassOptions = {}): CompileBodyPassResult {
  state.deferredGlobalFunctions = []
  collectDeferredGlobalFunctions(state, body)
  const deferredNames = new Set(state.deferredGlobalFunctions.map(d => d.name))
  collectAliasesFromAst(
    state,
    body,
    deferredNames,
    !!opts.includeExistingFunctionAliasTargets,
  )

  state.ops = opts.seedDeferredOpsPrefix ? [...opts.seedDeferredOpsPrefix] : []
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

  const deferredOpsRaw = state.ops.slice()
  const deferredLength = deferredOpsRaw.length

  state.ops = opts.seedMainOpsPrefix ? [...opts.seedMainOpsPrefix] : []
  state.isDeferredPass = false
  for (const stmt of body) {
    if (isDeferredDefStmt(state, stmt)) continue
    compileStmt(state, stmt)
  }

  const mainOpsRaw = state.ops.slice()
  state.ops = deferredOpsRaw.concat(mainOpsRaw)
  patchPcParamsInRange(state.ops, deferredLength, deferredLength)
  state.arrayInitPcOffset = deferredLength

  const deferredLocKeys = new Set(state.deferredGlobalFunctions.map(d => `${d.fnExpr.loc.start}:${d.fnExpr.loc.end}`))
  return {
    deferredLocKeys,
    deferredOpsRaw,
    mainOpsRaw,
    deferredLength,
  }
}

function collectPendingDeferredHints(
  state: State,
  deferredLocKeys: Set<string>,
): Map<string, Map<number, FunctionParamHint>> {
  const pendingDeferredHints = new Map<string, Map<number, FunctionParamHint>>()
  for (const [fnLocKey, paramHints] of state.functionParamHintsByFnLoc.entries()) {
    if (!deferredLocKeys.has(fnLocKey)) continue
    const clonedByIndex = new Map<number, FunctionParamHint>()
    for (const [paramIndex, hint] of paramHints.entries()) {
      clonedByIndex.set(paramIndex, cloneFunctionParamHint(hint))
    }
    pendingDeferredHints.set(fnLocKey, clonedByIndex)
  }
  return pendingDeferredHints
}

function dedupeArrayInitRequests(state: State): void {
  if (state.arrayInitRequests.length <= 1) return
  const byGlobal = new Map<number, number>()
  for (const req of state.arrayInitRequests) {
    const prev = byGlobal.get(req.globalIdx) ?? 0
    byGlobal.set(req.globalIdx, Math.max(prev, req.capacity))
  }
  state.arrayInitRequests = Array.from(byGlobal.entries()).map(([globalIdx, capacity]) => ({ globalIdx, capacity }))
}

function finalizeCompileResult(state: State): CompileResult {
  dedupeArrayInitRequests(state)

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
    encodeToBuffer(
      state.ops,
      u32View,
      f32View,
      arrayInitOffset,
      arrayInitOffset,
      undefined,
      state.preencodedDefineFunctionSegmentsById ?? undefined,
    )
  }
  else {
    encodeToBuffer(
      state.ops,
      u32View,
      f32View,
      0,
      0,
      undefined,
      state.preencodedDefineFunctionSegmentsById ?? undefined,
    )
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
        // We can identify them by checking if they're call sites (not direct record() call IDs)
        const directRecordCallIds = new Set<number>()
        for (const [locKey, id] of state.recordCallIds.entries()) {
          if (state.recordCallExprs.has(locKey)) {
            directRecordCallIds.add(id)
          }
        }

        for (const [, callSiteId] of state.recordCallIds.entries()) {
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

  const historySourceMap = state.historySourceMap.map(entry => ({
    ...entry,
    pc: entry.pc + arrayInitOffset + (entry.__fromMainProgram ? state.arrayInitPcOffset : 0),
  }))

  const functionReturnPcs: Record<string, number> = {}
  for (const [name, funcInfo] of functionsByNameEntries(state)) {
    const idx = funcInfo.returnHistorySourceMapIndex
    if (idx != null) {
      const entry = historySourceMap[idx]
      if (entry) functionReturnPcs[name] = entry.pc
    }
  }

  return {
    bytecode: f32View,
    errors: [],
    sampleRegistrations: state.sampleRegistrations,
    historySourceMap,
    labels: state.labels,
    recordCallbacks: state.recordCallbacks,
    functionReturnPcs,
    functionCalls: state.functionCallsMeta,
    bpm: state.bpm,
  }
}

function initializeStateForCompile(
  state: State,
  preludeLines: number,
  seedFunctionParamHintsByFnLoc: Map<string, Map<number, FunctionParamHint>>,
  recordMapping: ReturnType<typeof assignRecordCallIds>,
): void {
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
  state.nextAllocCallSiteId = 0
  state.nextStepCallSiteId = 0
  state.nextStoreCallSiteId = 0
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
  state.varToObjectLiteral = new Map()
  state.objectKeysByBinding = new Map()
  state.objectPropertyStoreShapesByBinding = new Map()
  state.arrayElementObjectKeysByBinding = new Map()
  state.arrayElementObjectPropertyStoreShapesByBinding = new Map()
  state.storeShapesByBinding = new Map()
  state.variableFunctionIds = new Map()
  state.functionParamHintsByFnLoc = cloneFunctionParamHintsByFnLoc(seedFunctionParamHintsByFnLoc)
  state.mixDefinitionLoc = null
  state.scale = 'major'
  state.scaleIndex = 0
  state.rootMidi = 0
  state.functionBytecodeStarts = new Map()
  state.currentFunctionId = null
  state.deferredGlobalFunctions = []
  state.functionsByNameStack = [new Map()]
  state.oversampleCallbackFunctionIds = new Set()
  state.functionCallsMeta = []
  state.seenCallSites = new Set()
  state.paramNameToLocalIndex = null
  state.compilingRecordCallback = false
  state.captureGlobalsInClosures = false
  state.functionDepth = 0
  state.recordCallIds = recordMapping.recordCallIds
  state.functionToRecordCall = recordMapping.functionToRecordCall
  state.recordCallExprs = new Map()
  state.preencodedDefineFunctionSegmentsById = null
}

function isSameStoreShape(a: StoreShape | undefined, b: StoreShape | undefined): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.kind !== b.kind) return false
  if (a.kind === 'array' && b.kind === 'array') return a.length === b.length
  if (a.kind === 'object' && b.kind === 'object') {
    if (a.keys.length !== b.keys.length) return false
    for (let i = 0; i < a.keys.length; i++) {
      if (a.keys[i] !== b.keys[i]) return false
    }
    return true
  }
  return false
}

function isSameObjectPropertyStoreShapes(
  a: Map<string, StoreShape> | undefined,
  b: Map<string, StoreShape> | undefined,
): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.size !== b.size) return false
  for (const [key, shape] of a.entries()) {
    if (!isSameStoreShape(shape, b.get(key))) return false
  }
  return true
}

function isSameFunctionParamHint(a: FunctionParamHint | undefined, b: FunctionParamHint | undefined): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  const aKeys = a.objectKeys ?? []
  const bKeys = b.objectKeys ?? []
  if (aKeys.length !== bKeys.length) return false
  for (let i = 0; i < aKeys.length; i++) {
    if (aKeys[i] !== bKeys[i]) return false
  }
  if (!isSameObjectPropertyStoreShapes(a.objectPropertyStoreShapes, b.objectPropertyStoreShapes)) return false
  if (!isSameStoreShape(a.storeShape, b.storeShape)) return false
  return a.functionId === b.functionId
}

function isSameFunctionParamHintsByIndex(
  a: Map<number, FunctionParamHint> | undefined,
  b: Map<number, FunctionParamHint> | undefined,
): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.size !== b.size) return false
  for (const [idx, hint] of a.entries()) {
    if (!isSameFunctionParamHint(hint, b.get(idx))) return false
  }
  return true
}

function hasPreludeHintInvalidation(
  baselineHints: Map<string, Map<number, FunctionParamHint>>,
  currentHints: Map<string, Map<number, FunctionParamHint>>,
  preludeDeferredLocKeys: Set<string>,
): boolean {
  for (const locKey of preludeDeferredLocKeys.values()) {
    const baselineByIndex = baselineHints.get(locKey)
    const currentByIndex = currentHints.get(locKey)
    if (!isSameFunctionParamHintsByIndex(baselineByIndex, currentByIndex)) return true
  }
  return false
}

function ensureRecordHandleArrayCapacity(state: State): void {
  if (state.recordHandleByScopeGlobal === null) return
  let maxScopeId = -1
  for (const callbackId of state.recordCallIds.values()) {
    if (callbackId > maxScopeId) maxScopeId = callbackId
  }
  const requiredCapacity = Math.max(100, maxScopeId + 1)
  let found = false
  for (const req of state.arrayInitRequests) {
    if (req.globalIdx !== state.recordHandleByScopeGlobal) continue
    req.capacity = Math.max(req.capacity, requiredCapacity)
    found = true
  }
  if (!found) {
    state.arrayInitRequests.push({ capacity: requiredCapacity, globalIdx: state.recordHandleByScopeGlobal })
  }
}

export type PreludeSnapshot = {
  preludeLines: number
  preludeDeferredOpsRaw: number[]
  preludeMainOpsRaw: number[]
  preencodedDefineFunctionSegmentsById: Map<number, Uint32Array>
  baseState: State
  preludeSampleRegistrations: SampleRegistration[]
  seedFunctionParamHintsByFnLoc: Map<string, Map<number, FunctionParamHint>>
  preludeDeferredLocKeys: Set<string>
}

export function buildPreludeSnapshot(preludeProgram: Program, preludeLines: number): PreludeSnapshot {
  const preludeState = new State()
  let seedHints = new Map<string, Map<number, FunctionParamHint>>()
  let preludeDeferredLocKeys = new Set<string>()
  let preludeDeferredOpsRaw: number[] = []
  let preludeMainOpsRaw: number[] = []
  const recordMapping = assignRecordCallIds(preludeProgram)
  const maxAttempts = 2
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    initializeStateForCompile(preludeState, preludeLines, seedHints, recordMapping)
    const pass = compileBodyPasses(preludeState, preludeProgram.body)
    preludeDeferredLocKeys = pass.deferredLocKeys
    preludeDeferredOpsRaw = [...pass.deferredOpsRaw]
    preludeMainOpsRaw = [...pass.mainOpsRaw]
    const pendingDeferredHints = collectPendingDeferredHints(preludeState, pass.deferredLocKeys)
    if (attempt === 0 && pendingDeferredHints.size > 0) {
      const mergedHints = cloneFunctionParamHintsByFnLoc(seedHints)
      mergeFunctionParamHintsByFnLoc(mergedHints, pendingDeferredHints)
      seedHints = mergedHints
      continue
    }
    break
  }
  const preencodedDefineFunctionSegmentsById = buildEncodedDefineFunctionSegmentCache(preludeState.ops)

  return {
    preludeLines,
    preludeDeferredOpsRaw,
    preludeMainOpsRaw,
    preencodedDefineFunctionSegmentsById,
    baseState: preludeState,
    preludeSampleRegistrations: cloneSampleRegistrations(preludeState.sampleRegistrations),
    seedFunctionParamHintsByFnLoc: cloneFunctionParamHintsByFnLoc(preludeState.functionParamHintsByFnLoc),
    preludeDeferredLocKeys,
  }
}

function restoreStateFromPreludeSnapshot(
  state: State,
  snapshot: PreludeSnapshot,
  seedFunctionParamHintsByFnLoc: Map<string, Map<number, FunctionParamHint>>,
  recordMapping: ReturnType<typeof assignRecordCallIds>,
): void {
  const projectId = state.projectId
  const baseState = snapshot.baseState

  state.preludeLines = snapshot.preludeLines
  state.ops = []
  state.errors = []
  state.stack = []
  state.functionAliases = new Map(baseState.functionAliases)
  state.globals = cloneVariableMap(baseState.globals)
  state.locals = cloneVariableScopeStack(baseState.locals)
  state.closureVars = cloneVariableScopeStack(baseState.closureVars)
  state.functions = [...baseState.functions]
  state.stringExpressions = new Map(baseState.stringExpressions)
  state.functionBytecodes = new Map(baseState.functionBytecodes)
  state.functionIdToDefaultParamFunctions = new Map(
    Array.from(baseState.functionIdToDefaultParamFunctions.entries()).map(([functionId, mapping]) => [
      functionId,
      new Map(mapping),
    ]),
  )
  state.loopStack = []
  state.pipeVars = []
  state.nextGlobalIndex = baseState.nextGlobalIndex
  state.nextLocalIndex = baseState.nextLocalIndex
  state.nextFunctionId = baseState.nextFunctionId
  state.nextAllocCallSiteId = baseState.nextAllocCallSiteId
  state.nextStepCallSiteId = baseState.nextStepCallSiteId
  state.nextStoreCallSiteId = baseState.nextStoreCallSiteId
  state.nextTempId = baseState.nextTempId
  state.inFunction = false
  state.sampleRegistrations = []
  state.recordCallbacks = new Map(baseState.recordCallbacks)
  state.recordCallbackTemplates = new Map(baseState.recordCallbackTemplates)
  state.nextRecordScopeId = baseState.nextRecordScopeId
  state.scopeCaptureGlobals = new Map(baseState.scopeCaptureGlobals)
  state.arrayInitOps = []
  state.arrayInitRequests = cloneArrayInitRequests(baseState.arrayInitRequests)
  state.arrayInitPcOffset = 0
  state.nextRecordGlobalIdx = baseState.nextRecordGlobalIdx
  state.recordHandleByScopeGlobal = baseState.recordHandleByScopeGlobal
  state.currentRecordScopeIdGlobal = baseState.currentRecordScopeIdGlobal
  state.recordCaptureStoresByScopeGlobal = baseState.recordCaptureStoresByScopeGlobal
  state.callSiteIdToHandle = new Map()
  state.historySourceMap = baseState.historySourceMap.slice()
  state.labels = [...baseState.labels]
  state.varToArrayLiteral = new Map(baseState.varToArrayLiteral)
  state.varToObjectLiteral = new Map(baseState.varToObjectLiteral)
  state.objectKeysByBinding = cloneStringArrayMap(baseState.objectKeysByBinding)
  state.objectPropertyStoreShapesByBinding = cloneObjectPropertyStoreShapeMap(baseState.objectPropertyStoreShapesByBinding)
  state.arrayElementObjectKeysByBinding = cloneStringArrayMap(baseState.arrayElementObjectKeysByBinding)
  state.arrayElementObjectPropertyStoreShapesByBinding = cloneObjectPropertyStoreShapeMap(
    baseState.arrayElementObjectPropertyStoreShapesByBinding,
  )
  state.storeShapesByBinding = cloneStoreShapeMap(baseState.storeShapesByBinding)
  state.variableFunctionIds = new Map(baseState.variableFunctionIds)
  state.functionParamHintsByFnLoc = cloneFunctionParamHintsByFnLoc(seedFunctionParamHintsByFnLoc)
  state.mixDefinitionLoc = baseState.mixDefinitionLoc ? { ...baseState.mixDefinitionLoc } : null
  state.scale = baseState.scale
  state.scaleIndex = baseState.scaleIndex
  state.rootMidi = baseState.rootMidi
  state.functionBytecodeStarts = new Map(baseState.functionBytecodeStarts)
  state.currentFunctionId = null
  state.deferredGlobalFunctions = []
  state.functionsByNameStack = baseState.functionsByNameStack.map(scope => new Map(scope))
  state.oversampleCallbackFunctionIds = new Set(baseState.oversampleCallbackFunctionIds)
  state.functionCallsMeta = [...baseState.functionCallsMeta]
  state.seenCallSites = new Set()
  state.paramNameToLocalIndex = null
  state.compilingRecordCallback = false
  state.captureGlobalsInClosures = false
  state.functionDepth = 0
  state.recordCallIds = recordMapping.recordCallIds
  state.functionToRecordCall = recordMapping.functionToRecordCall
  state.recordCallExprs = new Map(baseState.recordCallExprs)
  state.preencodedDefineFunctionSegmentsById = snapshot.preencodedDefineFunctionSegmentsById
  state.projectId = projectId
}

function userBodyIntroducesGlobalDeclarations(snapshot: PreludeSnapshot, userBody: Stmt[]): boolean {
  if (userBody.length === 0) return false
  const knownGlobals = snapshot.baseState.globals
  for (const stmt of userBody) {
    if (stmt.type !== 'expr' || stmt.expr.type !== 'assign') continue
    const expr = stmt.expr
    if (expr.left.type === 'identifier') {
      const name = expr.left.name
      if (SYSTEM_VARS.has(name)) continue
      if (expr.op === ':=') return true
      if (!knownGlobals.has(name)) return true
      continue
    }
    if (expr.left.type !== 'destructure') continue
    if (expr.op === ':=') {
      for (const name of expr.left.names) {
        if (!SYSTEM_VARS.has(name)) return true
      }
      continue
    }
    for (const name of expr.left.names) {
      if (!SYSTEM_VARS.has(name) && !knownGlobals.has(name)) return true
    }
  }
  return false
}

function replayPreludeSampleRegistrations(state: State, snapshot: PreludeSnapshot): boolean {
  state.sampleRegistrations = []
  let mismatch = false
  for (const registration of snapshot.preludeSampleRegistrations) {
    if (
      registration.type === 'record'
      && registration.recordSeconds !== undefined
      && registration.recordCallbackId !== undefined
    ) {
      const handle = sampleManager.registerRecord(
        state.projectId,
        registration.recordSeconds,
        registration.recordCallbackId,
      )
      if (handle !== registration.handle) mismatch = true
      state.sampleRegistrations.push({
        ...registration,
        handle,
        recordProjectId: state.projectId,
      })
      continue
    }
    if (registration.type === 'freesound' && registration.freesoundId !== undefined) {
      const handle = sampleManager.registerFreesound(registration.freesoundId)
      if (handle !== registration.handle) mismatch = true
      state.sampleRegistrations.push({ ...registration, handle })
      continue
    }
    // Inline and espeak registrations are not expected from control prelude; fallback to full compile if encountered.
    mismatch = true
  }
  return mismatch
}

export type IncrementalCompileResult = {
  result: CompileResult | null
  fallbackToFullCompile: boolean
}

export function compileWithPreludeSnapshot(
  state: State,
  program: Program,
  userBody: Stmt[],
  snapshot: PreludeSnapshot,
): IncrementalCompileResult {
  const recordMapping = assignRecordCallIds(program)
  if (userBodyIntroducesGlobalDeclarations(snapshot, userBody)) {
    return { result: null, fallbackToFullCompile: true }
  }
  let seedHints = cloneFunctionParamHintsByFnLoc(snapshot.seedFunctionParamHintsByFnLoc)
  const maxAttempts = 2
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    restoreStateFromPreludeSnapshot(state, snapshot, seedHints, recordMapping)
    if (replayPreludeSampleRegistrations(state, snapshot)) {
      return { result: null, fallbackToFullCompile: true }
    }
    ensureRecordHandleArrayCapacity(state)
    const pass = compileBodyPasses(state, userBody, {
      seedDeferredOpsPrefix: snapshot.preludeDeferredOpsRaw,
      seedMainOpsPrefix: snapshot.preludeMainOpsRaw,
      includeExistingFunctionAliasTargets: true,
    })
    if (
      hasPreludeHintInvalidation(
        snapshot.seedFunctionParamHintsByFnLoc,
        state.functionParamHintsByFnLoc,
        snapshot.preludeDeferredLocKeys,
      )
    ) {
      return { result: null, fallbackToFullCompile: true }
    }
    const pendingDeferredHints = collectPendingDeferredHints(state, pass.deferredLocKeys)
    if (attempt === 0 && pendingDeferredHints.size > 0) {
      const mergedHints = cloneFunctionParamHintsByFnLoc(seedHints)
      mergeFunctionParamHintsByFnLoc(mergedHints, pendingDeferredHints)
      seedHints = mergedHints
      continue
    }
    return {
      result: finalizeCompileResult(state),
      fallbackToFullCompile: false,
    }
  }

  return { result: finalizeCompileResult(state), fallbackToFullCompile: false }
}

export function compile(
  state: State,
  program: Program,
  preludeLines: number = 0,
  seedFunctionParamHintsByFnLoc: Map<string, Map<number, FunctionParamHint>> = new Map(),
  allowDeferredFunctionHintRecompile: boolean = true,
): CompileResult {
  const recordMapping = assignRecordCallIds(program)
  let seedHints = cloneFunctionParamHintsByFnLoc(seedFunctionParamHintsByFnLoc)
  const maxAttempts = allowDeferredFunctionHintRecompile ? 2 : 1
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    initializeStateForCompile(state, preludeLines, seedHints, recordMapping)
    const pass = compileBodyPasses(state, program.body)
    const pendingDeferredHints = collectPendingDeferredHints(state, pass.deferredLocKeys)
    if (attempt === 0 && allowDeferredFunctionHintRecompile && pendingDeferredHints.size > 0) {
      const mergedHints = cloneFunctionParamHintsByFnLoc(seedHints)
      mergeFunctionParamHintsByFnLoc(mergedHints, pendingDeferredHints)
      seedHints = mergedHints
      continue
    }
    return finalizeCompileResult(state)
  }
  return finalizeCompileResult(state)
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
      state.ops.push(AudioVmOp.Pop)
      state.stack.pop()
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
const BUFFER_BUILTIN_PARAMS: Record<string, string[]> = {
  alloc: ['seconds'],
  append: ['input', 'buf'],
  write: ['input', 'buf'],
  advance: ['buf'],
  read: ['buf', 'offset'],
}
const BUILTIN_SPEC_BY_VARIANT = new Map<string, GenSpec>()
const BUILTIN_DEFAULT_SPEC_BY_GEN_NAME = new Map<string, GenSpec>()
for (const spec of genSpecs) {
  if (!BUILTIN_SPEC_BY_VARIANT.has(spec.variantName)) BUILTIN_SPEC_BY_VARIANT.set(spec.variantName, spec)
  if (spec.variantName === 'default' && !BUILTIN_DEFAULT_SPEC_BY_GEN_NAME.has(spec.genName)) {
    BUILTIN_DEFAULT_SPEC_BY_GEN_NAME.set(spec.genName, spec)
  }
}

function isKnownBuiltinName(name: string): boolean {
  return getBuiltinSpec(name) !== null || OUT_SOLO_BUILTINS.has(name) || name in BUFFER_BUILTIN_PARAMS
}

function getBuiltinSpec(name: string): GenSpec | null {
  const byVariant = BUILTIN_SPEC_BY_VARIANT.get(name)
  if (byVariant) return byVariant
  const genName = name.charAt(0).toUpperCase() + name.slice(1)
  return BUILTIN_DEFAULT_SPEC_BY_GEN_NAME.get(genName) ?? null
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
  const builtinParams = BUFFER_BUILTIN_PARAMS[builtinName]
  if (builtinParams) {
    const params: Extract<Param, { type: 'param' }>[] = builtinParams.map(name => ({ type: 'param', name, loc }))
    const callArgs: Arg[] = builtinParams.map(name => ({
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

    case 'object':
      compileObject(state, expr)
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

    case 'switch':
      compileSwitch(state, expr as Extract<Stmt, { type: 'switch' }>)
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
