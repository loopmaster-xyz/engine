import { AudioVmOp } from '../../../dsp/audio-vm-bindings.ts'
import { sampleManager } from '../../../lib/sample-manager.ts'
import type { Expr, Stmt } from '../../ast.ts'
import { compileExpr, error } from '../core.ts'
import { encodeCallbackBytecode } from '../encode.ts'
import { compileFunctionBlock } from '../functions.ts'
import { getOpcodeInfo, isOpcode } from '../opcode.ts'
import type { State } from '../state.ts'
import type { FunctionInfo, RecordCallback, RecordDependency, VariableScope } from '../types.ts'
import {
  detectCapturedVarsInBody,
  getFunctionByName,
  hasGlobalFunctionByName,
} from '../vars.ts'

/** Collect global indices from GetGlobal ops in bytecode (including nested DefineFunction bodies). */
function collectGlobalIndicesFromOps(ops: number[], start: number, end: number, out: Set<number>): void {
  let pc = start
  while (pc < end) {
    const value = ops[pc]
    if (!isOpcode(value)) {
      pc++
      continue
    }
    const info = getOpcodeInfo(value)
    pc++
    switch (info.kind) {
      case 'param':
        if (value === AudioVmOp.GetGlobal && pc < end) {
          out.add(Math.round(ops[pc]))
        }
        pc++
        break
      case 'define-function':
        if (pc + 5 < end) {
          const bodyLen = Math.round(ops[pc + 5])
          const bodyStart = pc + 6
          const bodyEnd = bodyStart + bodyLen
          collectGlobalIndicesFromOps(ops, bodyStart, Math.min(bodyEnd, end), out)
          pc = bodyEnd
        }
        break
      case 'pc-param':
      case 'three-param':
        if (info.kind === 'pc-param') pc++
        else pc += 3
        break
      case 'table':
        if (pc < end) {
          const len = Math.round(ops[pc])
          pc += 1 + len
        }
        break
      case 'none':
        break
    }
  }
}

/** Collect function names called from the callback body (direct callees only) so setup only defines those. */
function collectCalleeNamesFromBody(expr: Expr, out: Set<string>): void {
  if (expr.type === 'call') {
    if (expr.callee.type === 'identifier') out.add(expr.callee.name)
    collectCalleeNamesFromBody(expr.callee, out)
    for (const a of expr.args) if (a.type === 'arg') collectCalleeNamesFromBody(a.value, out)
    return
  }
  switch (expr.type) {
    case 'number':
    case 'string':
    case 'identifier':
      return
    case 'fn':
      if (expr.body.type === 'block') {
        for (const s of expr.body.body) collectCalleeNamesFromStmt(s, out)
      }
      else {
        collectCalleeNamesFromBody(expr.body, out)
      }
      return
    case 'array':
      for (const it of expr.items) collectCalleeNamesFromBody(it, out)
      return
    case 'index':
      collectCalleeNamesFromBody(expr.object, out)
      collectCalleeNamesFromBody(expr.index, out)
      return
    case 'member':
      collectCalleeNamesFromBody(expr.object, out)
      return
    case 'unary':
      collectCalleeNamesFromBody(expr.expr, out)
      return
    case 'binary':
      collectCalleeNamesFromBody(expr.left, out)
      collectCalleeNamesFromBody(expr.right, out)
      return
    case 'ternary':
      collectCalleeNamesFromBody(expr.test, out)
      collectCalleeNamesFromBody(expr.then, out)
      collectCalleeNamesFromBody(expr.else, out)
      return
    case 'assign':
      collectCalleeNamesFromBody(expr.left, out)
      collectCalleeNamesFromBody(expr.right, out)
      return
    case 'destructure':
      return
    case 'switch':
      collectCalleeNamesFromBody(expr.test, out)
      for (const c of expr.cases) {
        if (c.test) collectCalleeNamesFromBody(c.test, out)
        for (const st of c.body) collectCalleeNamesFromStmt(st, out)
      }
      return
  }
}

function collectCalleeNamesFromStmt(stmt: Stmt, out: Set<string>): void {
  if (stmt.type === 'expr') return collectCalleeNamesFromBody(stmt.expr, out)
  if (stmt.type === 'switch') {
    collectCalleeNamesFromBody(stmt.test, out)
    for (const c of stmt.cases) {
      if (c.test) collectCalleeNamesFromBody(c.test, out)
      for (const st of c.body) collectCalleeNamesFromStmt(st, out)
    }
    return
  }
  if (stmt.type === 'block') {
    for (const s of stmt.body) collectCalleeNamesFromStmt(s, out)
    return
  }
  const withTest = stmt as { test?: Expr; then?: Stmt; else?: Stmt; body?: Stmt; from?: Expr; to?: Expr;
    iterable?: Expr }
  if (withTest.test) collectCalleeNamesFromBody(withTest.test, out)
  if (withTest.then) collectCalleeNamesFromStmt(withTest.then, out)
  if (withTest.else) collectCalleeNamesFromStmt(withTest.else, out)
  if (withTest.body) collectCalleeNamesFromStmt(withTest.body, out)
  if (withTest.from) collectCalleeNamesFromBody(withTest.from, out)
  if (withTest.to) collectCalleeNamesFromBody(withTest.to, out)
  if (withTest.iterable) collectCalleeNamesFromBody(withTest.iterable, out)
  const withValue = stmt as { value?: Expr }
  if (withValue.value && typeof withValue.value === 'object' && 'type' in withValue.value) {
    collectCalleeNamesFromBody(withValue.value, out)
  }
}

function matchCallArgsToParams(callExpr: Extract<Expr, { type: 'call' }>, params: string[]): Array<Expr | null> {
  const paramCount = params.length
  const matchedArgs: Array<Expr | null> = new Array(paramCount).fill(null)
  let positionalIndex = 0

  for (let i = 0; i < callExpr.args.length; i++) {
    const arg = callExpr.args[i]
    if (!arg || arg.type !== 'arg') continue

    if (arg.name) {
      // Named argument with prefix matching.
      let matchedParamIndex = -1
      for (let j = 0; j < params.length; j++) {
        if (params[j].startsWith(arg.name)) {
          matchedParamIndex = j
          break
        }
      }
      if (matchedParamIndex === -1 || matchedArgs[matchedParamIndex] !== null) continue
      matchedArgs[matchedParamIndex] = arg.value
      continue
    }

    if (arg.shorthand && arg.value.type === 'identifier') {
      // Shorthand named argument when exact parameter exists.
      const shorthandParamIndex = params.indexOf(arg.value.name)
      if (shorthandParamIndex !== -1 && matchedArgs[shorthandParamIndex] === null) {
        matchedArgs[shorthandParamIndex] = arg.value
        continue
      }
    }

    while (positionalIndex < paramCount && matchedArgs[positionalIndex] !== null) positionalIndex++
    if (positionalIndex >= paramCount) continue
    matchedArgs[positionalIndex] = arg.value
    positionalIndex++
  }

  return matchedArgs
}

function compileRecordSetupOverride(state: State, expr: Expr, recordGlobalIdx: number): number[] | null {
  // Only support direct function literals for robust record-VM transfer.
  if (expr.type !== 'fn') return null

  const savedOps = state.ops
  const savedStack = state.stack
  const savedLocals = state.locals
  const savedClosureVars = state.closureVars
  const savedParamMap = state.paramNameToLocalIndex
  const savedErrorsLen = state.errors.length

  const overrideOps: number[] = []
  state.ops = overrideOps
  state.stack = []
  state.locals = [new Map()]
  state.closureVars = []
  state.paramNameToLocalIndex = null

  compileExpr(state, expr)
  if (state.errors.length > savedErrorsLen) {
    state.errors.length = savedErrorsLen
    state.ops = savedOps
    state.stack = savedStack
    state.locals = savedLocals
    state.closureVars = savedClosureVars
    state.paramNameToLocalIndex = savedParamMap
    return null
  }
  state.ops.push(AudioVmOp.SetGlobal)
  state.ops.push(recordGlobalIdx)

  state.ops = savedOps
  state.stack = savedStack
  state.locals = savedLocals
  state.closureVars = savedClosureVars
  state.paramNameToLocalIndex = savedParamMap
  return overrideOps
}

export function addCallSiteToSampleRegistrations(
  state: State,
  handle: number,
  scopeId: number,
  seconds: number,
): void {
  const alreadyInRegistrations = state.sampleRegistrations.some(
    reg =>
      reg.type === 'record'
      && reg.recordCallbackId === scopeId
      && reg.handle === handle
      && reg.recordSeconds === seconds,
  )
  if (!alreadyInRegistrations) {
    state.sampleRegistrations.push({
      handle,
      type: 'record',
      recordSeconds: seconds,
      recordCallbackId: scopeId,
      recordProjectId: state.projectId,
    })
  }
}

export function processRecordCall(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  callbackId: number,
  templateLocKey?: string,
): void {
  const args = callExpr.args
  if (args.length !== 2) {
    error(state, 'record() requires exactly 2 arguments: seconds and callback', callExpr.loc)
    return
  }
  const secondsArg = args[0]?.type === 'arg' ? args[0].value : null
  const callbackArg = args[1]?.type === 'arg' ? args[1].value : null
  if (!secondsArg || secondsArg.type !== 'number') {
    error(state, 'record() seconds must be a literal number', callExpr.loc)
    return
  }

  let callbackFn: Extract<Expr, { type: 'fn' }>

  if (callbackArg?.type === 'identifier') {
    // callback is a named function reference -> create synthetic fn that calls it
    const funcInfo = getFunctionByName(state, callbackArg.name)
    if (!funcInfo) {
      error(
        state,
        `record() callback must be a function, but '${callbackArg.name}' is not a function`,
        callExpr.loc,
      )
      return
    }
    const syntheticCall: Extract<Expr, { type: 'call' }> = {
      type: 'call',
      callee: callbackArg,
      args: [],
      loc: callbackArg.loc,
    }
    callbackFn = {
      type: 'fn',
      params: [],
      defaults: [],
      body: syntheticCall,
      loc: callbackArg.loc,
    }
  }
  else if (callbackArg?.type === 'fn') {
    callbackFn = callbackArg
  }
  else {
    error(state, 'record() callback must be a function expression or function reference', callExpr.loc)
    return
  }

  const seconds = Math.max(0, Math.min(10, secondsArg.value))
  const scopeId = callbackId !== -1 ? callbackId : state.nextRecordScopeId++

  const capturedVars = detectCapturedVarsInBody(state, callbackFn.body)
  const calleeNames = new Set<string>()
  if (callbackFn.body.type === 'block') {
    for (const s of callbackFn.body.body) collectCalleeNamesFromStmt(s, calleeNames)
  }
  else {
    collectCalleeNamesFromBody(callbackFn.body, calleeNames)
  }

  // Save compilation state
  const savedOps = state.ops
  const savedStack = state.stack
  const savedLocals = state.locals
  const savedClosureVars = state.closureVars
  const savedGlobals = new Map(state.globals)

  const resolveToCanonical = (n: string) => state.functionAliases.get(n) ?? n
  const isPreludeFunction = (info: { definitionLine?: number }) =>
    info.definitionLine != null && info.definitionLine <= state.preludeLines

  const hasGlobalFnCache = new Map<string, boolean>()
  const hasGlobalFn = (name: string): boolean => {
    if (hasGlobalFnCache.has(name)) return hasGlobalFnCache.get(name)!
    const v = hasGlobalFunctionByName(state, name)
    hasGlobalFnCache.set(name, v)
    return v
  }

  const globalFnMap = state.functionsByNameStack[0]!
  const funcIdToGlobalName = new Map<number, string>()
  for (const [name, info] of globalFnMap) funcIdToGlobalName.set(info.id, name)

  const canonicalToAliases = new Map<string, string[]>()
  for (const [alias, target] of state.functionAliases) {
    const existing = canonicalToAliases.get(target)
    if (existing) existing.push(alias)
    else canonicalToAliases.set(target, [alias])
  }

  // Determine which functions will be required in setup (starts with direct callback callees)
  const requiredNames = new Set<string>(calleeNames)

  // Build index to name mapping for global lookup
  const indexToName = new Map<number, string>()
  for (const [name, info] of savedGlobals) {
    if (info.scope === 'global') indexToName.set(info.index, name)
  }

  // Expand requiredNames by analyzing transitive dependencies of required global functions.
  // This avoids repeatedly scanning all functions and rebuilding global name lookups.
  const requiredQueue: string[] = Array.from(requiredNames)
  const enqueueRequired = (name: string): void => {
    if (requiredNames.has(name)) return
    requiredNames.add(name)
    requiredQueue.push(name)
  }
  const enqueueCanonicalIfGlobal = (name: string): void => {
    const canonical = resolveToCanonical(name)
    if (canonical !== name && hasGlobalFn(canonical)) enqueueRequired(canonical)
  }
  const tmpCallees = new Set<string>()

  while (requiredQueue.length > 0) {
    const name = requiredQueue.pop()!
    enqueueCanonicalIfGlobal(name)

    const funcInfo = globalFnMap.get(name)
    if (!funcInfo) continue

    // Add callees from default parameter expressions
    for (const defaultExpr of funcInfo.defaultParamExprs ?? []) {
      if (!defaultExpr) continue
      tmpCallees.clear()
      collectCalleeNamesFromBody(defaultExpr, tmpCallees)
      for (const callee of tmpCallees) {
        enqueueRequired(callee)
        enqueueCanonicalIfGlobal(callee)
      }
    }

    // Add callees referenced by compiled bytecode via global indices
    const bytecode = state.functionBytecodes.get(funcInfo.id)
    if (!bytecode) continue
    const indices = new Set<number>()
    collectGlobalIndicesFromOps(bytecode, 0, bytecode.length, indices)
    for (const idx of indices) {
      const refName = indexToName.get(idx)
      if (!refName) continue
      const canonical = resolveToCanonical(refName) ?? refName
      if (hasGlobalFn(canonical)) enqueueRequired(canonical)
    }
  }

  // STEP 1: Identify ALL default param functions that need dedicated slots
  // This includes both enclosing scope default params AND default params from required/prelude functions
  const defaultParamFnToRecordGlobal = new Map<number, number>()
  const enclosingDefaultParamNameToSlot = new Map<string, number>()

  // First, handle enclosing function's default params (captured as locals)
  // These get name-based lookup since they're in the immediate scope
  const enclosingDefaultParams = state.currentFunctionId !== null
    ? state.functionIdToDefaultParamFunctions.get(state.currentFunctionId)
    : undefined

  if (enclosingDefaultParams) {
    for (const [paramName, defaultFnId] of enclosingDefaultParams) {
      const recordGlobalIdx = state.nextRecordGlobalIdx++
      defaultParamFnToRecordGlobal.set(defaultFnId, recordGlobalIdx)
      enclosingDefaultParamNameToSlot.set(paramName, recordGlobalIdx)
    }
  }

  // Second, handle default params from required and prelude functions
  // These are looked up by function ID only, not by name (to avoid name collisions)
  for (const funcInfo of state.functions) {
    const fnName = funcIdToGlobalName.get(funcInfo.id)
    const isRequired = fnName !== undefined && requiredNames.has(fnName)
    const isPrelude = isPreludeFunction(funcInfo)

    if (!isRequired && !isPrelude) continue

    const thisDefaultParams = state.functionIdToDefaultParamFunctions.get(funcInfo.id)
    if (!thisDefaultParams) continue

    for (const [paramName, defaultFnId] of thisDefaultParams) {
      if (defaultParamFnToRecordGlobal.has(defaultFnId)) continue

      const recordGlobalIdx = state.nextRecordGlobalIdx++
      defaultParamFnToRecordGlobal.set(defaultFnId, recordGlobalIdx)
      // Don't add to name map - only function ID matters for non-enclosing defaults
    }
  }

  // STEP 2: Build dependencies and capturedVarMapping, respecting default params
  const dependencies: RecordDependency[] = []
  const recordGlobalIndices: number[] = []
  const capturedVarMapping = new Map<string, number>()
  const scalarCaptureSources: Array<{ scope: VariableScope; sourceIndex: number }> = []

  // Process captured vars
  for (const { name, info } of capturedVars) {
    const canonical = resolveToCanonical(name)
    if (hasGlobalFn(name) || hasGlobalFn(canonical)) continue
    if (calleeNames.has(name) && info.scope === 'global') continue

    // Preserve dedicated default-param function slots for enclosing-scope params.
    if (info.scope === 'local' && enclosingDefaultParamNameToSlot.has(name)) {
      const recordGlobalIdx = enclosingDefaultParamNameToSlot.get(name)!
      dependencies.push({ name, scope: info.scope, sourceIndex: info.index })
      recordGlobalIndices.push(recordGlobalIdx)
      capturedVarMapping.set(name, recordGlobalIdx)
      scalarCaptureSources.push({ scope: info.scope, sourceIndex: info.index })
      continue
    }

    const recordGlobalIdx = state.nextRecordGlobalIdx++
    if (calleeNames.has(name) && (info.scope === 'local' || info.scope === 'closure')) {
      dependencies.push({ name, scope: info.scope, sourceIndex: info.index })
      recordGlobalIndices.push(recordGlobalIdx)
      capturedVarMapping.set(name, recordGlobalIdx)
      continue
    }

    dependencies.push({ name, scope: info.scope, sourceIndex: info.index })
    recordGlobalIndices.push(recordGlobalIdx)
    capturedVarMapping.set(name, recordGlobalIdx)
    scalarCaptureSources.push({ scope: info.scope, sourceIndex: info.index })
  }

  // Process closure vars from required functions
  for (const funcInfo of state.functions) {
    const fnName = funcIdToGlobalName.get(funcInfo.id)
    const isRequired = (fnName !== undefined && requiredNames.has(fnName))
      || defaultParamFnToRecordGlobal.has(funcInfo.id)
    if (!isRequired || !(funcInfo.closureVars?.length ?? 0)) continue

    for (const name of funcInfo.closureVars!) {
      // Skip if already mapped (including default params)
      if (capturedVarMapping.has(name)) continue

      const info = savedGlobals.get(name)
      if (info?.scope !== 'global') continue

      const recordGlobalIdx = state.nextRecordGlobalIdx++
      const canonical = resolveToCanonical(name)
      dependencies.push({ name, scope: 'global', sourceIndex: info.index })
      recordGlobalIndices.push(recordGlobalIdx)
      capturedVarMapping.set(name, recordGlobalIdx)
      if (hasGlobalFn(name) || hasGlobalFn(canonical)) continue
      scalarCaptureSources.push({ scope: 'global', sourceIndex: info.index })
    }
  }

  let captureStoreGlobalIdx = 0
  const captureOps: number[] = []

  // Prepare to compile callback: start from outer globals, redirect only captured vars to record globals
  state.locals = [new Map()]
  state.closureVars = []
  state.globals = new Map(savedGlobals)
  for (const [name, destGlobalIdx] of capturedVarMapping) {
    state.globals.set(name, { scope: 'global', index: destGlobalIdx })
  }

  // Compile loop (callback body) into local array so we never replace state.ops
  const loopOps: number[] = []
  state.ops = loopOps
  state.stack = []
  state.compilingRecordCallback = true

  if (callbackFn.body.type === 'block') {
    compileFunctionBlock(state, callbackFn.body)
  }
  else {
    compileExpr(state, callbackFn.body)
  }

  if (state.stack.length > 0) {
    loopOps.push(AudioVmOp.Solo)
    loopOps.push(1)
    state.stack.pop()
  }
  loopOps.push(AudioVmOp.Post)

  state.compilingRecordCallback = false
  const loopBytecode = encodeCallbackBytecode(loopOps)

  const numDepsFinal = scalarCaptureSources.length
  if (callbackId !== -1) {
    if (!state.scopeCaptureGlobals.has(scopeId)) {
      captureStoreGlobalIdx = state.nextGlobalIndex++
      state.scopeCaptureGlobals.set(scopeId, captureStoreGlobalIdx)
      state.arrayInitRequests.push({ capacity: Math.max(1, numDepsFinal), globalIdx: captureStoreGlobalIdx })
    }
    else {
      captureStoreGlobalIdx = state.scopeCaptureGlobals.get(scopeId)!
    }
    for (let depIndex = 0; depIndex < scalarCaptureSources.length; depIndex++) {
      const { scope, sourceIndex } = scalarCaptureSources[depIndex]!
      captureOps.push(AudioVmOp.GetGlobal, captureStoreGlobalIdx, AudioVmOp.PushScalar, depIndex)
      if (scope === 'global') captureOps.push(AudioVmOp.GetGlobal, sourceIndex)
      else if (scope === 'local') captureOps.push(AudioVmOp.GetLocal, sourceIndex)
      else captureOps.push(AudioVmOp.GetClosure, sourceIndex)
      captureOps.push(AudioVmOp.ArraySet)
    }
  }

  const setupOps: number[] = []
  state.stack = []
  let maxSetupGlobalIndex = -1

  for (const funcInfo of state.functions) {
    const fnName = funcIdToGlobalName.get(funcInfo.id)
    const required = fnName !== undefined && requiredNames.has(fnName) || defaultParamFnToRecordGlobal.has(funcInfo.id)
    if (!required && !isPreludeFunction(funcInfo)) continue

    const funcBytecode = state.functionBytecodes.get(funcInfo.id)
    if (!funcBytecode) continue

    const closureCount = funcInfo.closureVars ? funcInfo.closureVars.length : 0
    if (closureCount > 0) {
      const dummyCellRefGlobalIdx = 0
      const thisDefaultParams = state.functionIdToDefaultParamFunctions.get(funcInfo.id)
      for (const name of funcInfo.closureVars!) {
        const info = savedGlobals.get(name)
        const defaultFnId = thisDefaultParams?.get(name)
        let idx: number
        if (defaultFnId !== undefined && defaultParamFnToRecordGlobal.has(defaultFnId)) {
          idx = defaultParamFnToRecordGlobal.get(defaultFnId)!
        }
        else if (capturedVarMapping.has(name)) {
          idx = capturedVarMapping.get(name)!
        }
        else if (info?.scope === 'global') {
          idx = info.index
        }
        else {
          idx = dummyCellRefGlobalIdx
        }
        if (idx > maxSetupGlobalIndex) maxSetupGlobalIndex = idx
        setupOps.push(AudioVmOp.GetCellRefGlobal)
        setupOps.push(idx)
      }
    }
    setupOps.push(AudioVmOp.DefineFunction)
    setupOps.push(funcInfo.id)
    setupOps.push(funcInfo.paramCount)
    setupOps.push(funcInfo.firstParamIn)
    setupOps.push(closureCount)
    setupOps.push((funcInfo as any).localCount ?? 0)
    setupOps.push(funcBytecode.length)
    for (let k = 0; k < funcBytecode.length; k++) setupOps.push(funcBytecode[k]!)

    const recordGlobalForDefaultParam = defaultParamFnToRecordGlobal.get(funcInfo.id)
    if (!fnName) {
      if (recordGlobalForDefaultParam !== undefined) {
        if (recordGlobalForDefaultParam > maxSetupGlobalIndex) maxSetupGlobalIndex = recordGlobalForDefaultParam
        setupOps.push(AudioVmOp.SetGlobal)
        setupOps.push(recordGlobalForDefaultParam)
      }
      else {
        setupOps.push(AudioVmOp.Pop)
      }
      continue
    }
    const targetNames = [fnName].concat(
      canonicalToAliases.get(fnName) ?? [],
    )
    const indicesToSet: number[] = []
    for (const name of targetNames) {
      const globalInfo = savedGlobals.get(name)
      if (globalInfo?.scope === 'global') indicesToSet.push(globalInfo.index)
      const capturedIdx = capturedVarMapping.get(name)
      if (capturedIdx !== undefined) indicesToSet.push(capturedIdx)
    }
    for (let i = 0; i < indicesToSet.length; i++) {
      if (i < indicesToSet.length - 1) setupOps.push(AudioVmOp.Dup)
      const idx = indicesToSet[i]!
      if (idx > maxSetupGlobalIndex) maxSetupGlobalIndex = idx
      setupOps.push(AudioVmOp.SetGlobal)
      setupOps.push(idx)
    }
  }

  const setupBytecode = encodeCallbackBytecode(setupOps)
  const maxSetupGlobalIndexFinal = maxSetupGlobalIndex >= 0 ? maxSetupGlobalIndex : undefined

  state.globals = savedGlobals
  state.locals = savedLocals
  state.closureVars = savedClosureVars

  const defaultParamRecordGlobals = defaultParamFnToRecordGlobal.size > 0
    ? Array.from(defaultParamFnToRecordGlobal.values())
    : undefined
  const recordCallbackPayload: RecordCallback = {
    setup: setupBytecode,
    loop: loopBytecode,
    dependencies,
    recordGlobalIndices,
    captureStoreGlobalIdx,
    capturedRecordGlobalsByName: capturedVarMapping.size > 0 ? Object.fromEntries(capturedVarMapping) : undefined,
    defaultParamRecordGlobals,
    defaultParamRecordGlobalsByName:
      enclosingDefaultParamNameToSlot.size > 0 ? Object.fromEntries(enclosingDefaultParamNameToSlot) : undefined,
    maxSetupGlobalIndex: maxSetupGlobalIndexFinal,
  }
  if (callbackId !== -1) {
    state.recordCallbacks.set(callbackId, recordCallbackPayload)
  }
  else if (templateLocKey !== undefined) {
    state.recordCallbackTemplates.set(templateLocKey, recordCallbackPayload)
  }

  state.ops = savedOps
  state.stack = savedStack

  // Emit capture ops for direct record() calls (not inside functions)
  if (callbackId !== -1) {
    state.ops.push(...captureOps)
  }

  // Prepare handle for returned value on stack; only emit record-call bytes for top-level record()
  let handle: number
  if (callbackId === -1) {
    handle = 0
    // Inside-function path: caller (compileRecord) will replace seconds/callback with Pop, Pop, lookup
  }
  else {
    handle = sampleManager.registerRecord(state.projectId, seconds, scopeId)
    state.sampleRegistrations.push({
      handle,
      type: 'record',
      recordSeconds: seconds,
      recordCallbackId: scopeId,
      recordProjectId: state.projectId,
    })
    state.ops.push(AudioVmOp.Pop)
    state.ops.push(AudioVmOp.Pop)
    if (state.stack.length >= 2) {
      state.stack.pop()
      state.stack.pop()
    }
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(handle)
  }
  state.stack.push({ expr: callExpr })
}

export function processRecordCallSite(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  funcName: string,
  funcInfo: FunctionInfo,
  callSiteId: number,
): void {
  const recordCallLocKey = state.functionToRecordCall.get(funcName)
  if (!recordCallLocKey) return

  const recordCallExpr = state.recordCallExprs.get(recordCallLocKey)
  if (!recordCallExpr) return

  const args = recordCallExpr.args
  const secondsArg = args[0]?.type === 'arg' ? args[0].value : null
  if (!secondsArg || secondsArg.type !== 'number') return

  const seconds = Math.max(0, Math.min(10, secondsArg.value))
  const handle = sampleManager.registerRecord(state.projectId, seconds, callSiteId)
  const template = state.recordCallbackTemplates.get(recordCallLocKey)
  if (!template) return

  let setupBytecode = template.setup
  const defaultParamSlotsByName = template.defaultParamRecordGlobalsByName
  const capturedSlotsByName = template.capturedRecordGlobalsByName
  if (
    (defaultParamSlotsByName && Object.keys(defaultParamSlotsByName).length > 0)
    || (capturedSlotsByName && Object.keys(capturedSlotsByName).length > 0)
  ) {
    const matchedArgs = matchCallArgsToParams(callExpr, funcInfo.params)
    const overrideOps: number[] = []
    for (let i = 0; i < funcInfo.params.length; i++) {
      const paramName = funcInfo.params[i]!
      const overrideExpr = matchedArgs[i]
      if (!overrideExpr) continue

      const defaultSlot = defaultParamSlotsByName?.[paramName]
      if (defaultSlot !== undefined) {
        const ops = compileRecordSetupOverride(state, overrideExpr, defaultSlot)
        if (ops && ops.length > 0) {
          for (let j = 0; j < ops.length; j++) overrideOps.push(ops[j]!)
        }
      }

      const capturedSlot = capturedSlotsByName?.[paramName]
      if (capturedSlot !== undefined) {
        const ops = compileRecordSetupOverride(state, overrideExpr, capturedSlot)
        if (ops && ops.length > 0) {
          for (let j = 0; j < ops.length; j++) overrideOps.push(ops[j]!)
        }
      }
    }
    if (overrideOps.length > 0) {
      const encodedOverrides = encodeCallbackBytecode(overrideOps)
      const merged = new Float32Array(setupBytecode.length + encodedOverrides.length)
      merged.set(setupBytecode)
      merged.set(encodedOverrides, setupBytecode.length)
      setupBytecode = merged
    }
  }

  const scopeId = callSiteId
  if (state.recordCaptureStoresByScopeGlobal === null) {
    state.recordCaptureStoresByScopeGlobal = state.nextGlobalIndex++
  }
  const captureStoreGlobalIdx = state.recordCaptureStoresByScopeGlobal

  if (state.currentRecordScopeIdGlobal !== null) {
    state.ops.push(AudioVmOp.PushScalar, scopeId, AudioVmOp.SetGlobal, state.currentRecordScopeIdGlobal)
  }
  if (state.recordHandleByScopeGlobal !== null) {
    state.callSiteIdToHandle.set(scopeId, handle)
    state.ops.push(
      AudioVmOp.GetGlobal,
      state.recordHandleByScopeGlobal,
      AudioVmOp.PushScalar,
      scopeId,
      AudioVmOp.PushScalar,
      handle,
      AudioVmOp.ArraySet,
    )
  }

  state.recordCallbacks.set(scopeId, {
    ...template,
    setup: setupBytecode,
    captureStoreGlobalIdx,
    useNestedCaptureStore: true,
  })
  addCallSiteToSampleRegistrations(state, handle, scopeId, seconds)
}

export function compileRecord(state: State, callExpr: Extract<Expr, { type: 'call' }>): void {
  const locKey = `${callExpr.loc.line}:${callExpr.loc.column}:${callExpr.loc.start}:${callExpr.loc.end}`
  const callbackId = state.recordCallIds.get(locKey)

  // If inside a function (no registered callbackId), defer final registration to call sites
  if (callbackId === undefined) {
    state.recordCallExprs.set(locKey, callExpr)

    const args = callExpr.args
    const secondsArg = args[0]?.type === 'arg' ? args[0].value : null
    const callbackArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!secondsArg || secondsArg.type !== 'number') {
      error(state, 'record() seconds must be a literal number', callExpr.loc)
      return
    }
    if (!callbackArg) {
      error(state, 'record() requires exactly 2 arguments: seconds and callback', callExpr.loc)
      return
    }
    const opsBeforeRecord = state.ops.length
    compileExpr(state, secondsArg)
    compileExpr(state, callbackArg)

    const tempCallbackId = -1
    processRecordCall(state, callExpr, tempCallbackId, locKey)

    if (state.recordHandleByScopeGlobal === null) {
      state.recordHandleByScopeGlobal = state.nextGlobalIndex++
      const maxScopeId = state.recordCallIds.size > 0 ? Math.max(...state.recordCallIds.values()) : 0
      const capacity = Math.max(100, maxScopeId + 1)
      state.arrayInitRequests.push({ capacity, globalIdx: state.recordHandleByScopeGlobal })
    }
    if (state.currentRecordScopeIdGlobal === null) {
      state.currentRecordScopeIdGlobal = state.nextGlobalIndex++
    }

    const tempCallbackData = state.recordCallbackTemplates.get(locKey)
    state.ops.length = opsBeforeRecord
    state.ops.push(AudioVmOp.Pop)
    state.ops.push(AudioVmOp.Pop)
    if (state.recordCaptureStoresByScopeGlobal === null) {
      state.recordCaptureStoresByScopeGlobal = state.nextGlobalIndex++
    }
    if (state.recordHandleByScopeGlobal !== null && state.currentRecordScopeIdGlobal !== null) {
      state.ops.push(
        AudioVmOp.GetGlobal,
        state.recordHandleByScopeGlobal,
        AudioVmOp.GetGlobal,
        state.currentRecordScopeIdGlobal,
        AudioVmOp.ArrayGet,
        0,
      )
    }
    else {
      state.ops.push(AudioVmOp.PushScalar, 0)
    }
    if (tempCallbackData && state.recordCaptureStoresByScopeGlobal !== null
      && state.currentRecordScopeIdGlobal !== null)
    {
      for (let depIndex = 0; depIndex < tempCallbackData.dependencies.length; depIndex++) {
        const dep = tempCallbackData.dependencies[depIndex]!
        state.ops.push(
          AudioVmOp.GetGlobal,
          state.recordCaptureStoresByScopeGlobal,
          AudioVmOp.GetGlobal,
          state.currentRecordScopeIdGlobal,
          AudioVmOp.ArrayGet,
        )
        state.ops.push(AudioVmOp.Dup)
        state.ops.push(AudioVmOp.PushScalar, depIndex)
        if (dep.scope === 'global') {
          state.ops.push(AudioVmOp.GetGlobal, dep.sourceIndex)
        }
        else if (dep.scope === 'local') {
          state.ops.push(AudioVmOp.GetLocal, dep.sourceIndex)
        }
        else {
          state.ops.push(AudioVmOp.GetClosure, dep.sourceIndex)
        }
        state.ops.push(AudioVmOp.ArraySet)
      }
    }

    return
  }

  // Direct record() call in top-level: process immediately
  processRecordCall(state, callExpr, callbackId)
}
