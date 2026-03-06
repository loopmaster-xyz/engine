import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import type { Expr, Param, Stmt } from '../ast.ts'
import { compileExpr, compileStmt, popScope, pushScope } from './core.ts'
import type { State } from './state.ts'
import type { FunctionInfo, VariableInfo } from './types.ts'
import {
  compileGetVariable,
  compilePushCellRef,
  compileSetVariable,
  detectClosureVars,
  lookupVariable,
} from './vars.ts'

export function compileFunctionBlock(state: State, block: Extract<Stmt, { type: 'block' }>): void {
  const stmts = block.body
  for (let i = 0; i < stmts.length; i++) {
    const stmt = stmts[i]
    const isLast = i === stmts.length - 1

    if (isLast) {
      // Last statement determines the return value
      if (stmt.type === 'expr') {
        compileExpr(state, stmt.expr)
      }
      else if (stmt.type === 'block') {
        // Nested block as last statement
        pushScope(state)
        compileFunctionBlock(state, stmt)
        popScope(state)
      }
      else {
        // Other statements don't produce values
        compileStmt(state, stmt)
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(0)
      }
    }
    else {
      // Not the last statement - compile and pop any result
      if (stmt.type === 'expr') {
        compileExpr(state, stmt.expr)
        // Pop the result since it's not used
        if (state.stack.length > 0) {
          state.ops.push(AudioVmOp.Pop)
          state.stack.pop()
        }
      }
      else {
        compileStmt(state, stmt)
      }
    }
  }

  // If block is empty, return undefined
  if (stmts.length === 0) {
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(0)
  }
}

function objectKeysFromExpr(expr: Expr): string[] | null {
  if (expr.type !== 'object') return null
  return expr.entries.map(entry => entry.key)
}

function sameObjectKeySequence(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function inferImplicitReturnObjectKeys(block: Extract<Stmt, { type: 'block' }>): string[] | null {
  if (block.body.length === 0) return null
  const last = block.body[block.body.length - 1]
  if (!last) return null
  if (last.type === 'expr') return objectKeysFromExpr(last.expr)
  if (last.type === 'block') return inferImplicitReturnObjectKeys(last)
  return null
}

function collectExplicitReturnObjectKeys(stmt: Stmt, out: Array<string[] | null>): void {
  switch (stmt.type) {
    case 'return':
      out.push(stmt.value ? objectKeysFromExpr(stmt.value) : null)
      return
    case 'block':
      for (const it of stmt.body) collectExplicitReturnObjectKeys(it, out)
      return
    case 'if':
      collectExplicitReturnObjectKeys(stmt.then, out)
      if (stmt.else) collectExplicitReturnObjectKeys(stmt.else, out)
      return
    case 'while':
    case 'do':
    case 'for':
    case 'for-of':
      collectExplicitReturnObjectKeys(stmt.body, out)
      return
    case 'label':
      collectExplicitReturnObjectKeys(stmt.stmt, out)
      return
    case 'switch':
      for (const c of stmt.cases) {
        for (const st of c.body) collectExplicitReturnObjectKeys(st, out)
      }
      return
    case 'try':
      collectExplicitReturnObjectKeys(stmt.body, out)
      if (stmt.catch) collectExplicitReturnObjectKeys(stmt.catch.body, out)
      if (stmt.finally) collectExplicitReturnObjectKeys(stmt.finally, out)
      return
    case 'expr':
    case 'break':
    case 'continue':
    case 'throw':
      return
  }
}

function inferFunctionReturnObjectKeys(expr: Extract<Expr, { type: 'fn' }>): string[] | undefined {
  if (expr.body.type !== 'block') {
    const direct = objectKeysFromExpr(expr.body)
    return direct ? [...direct] : undefined
  }

  const explicit: Array<string[] | null> = []
  collectExplicitReturnObjectKeys(expr.body, explicit)
  if (explicit.length > 0) {
    if (explicit.some(keys => keys === null)) return undefined
    const first = explicit[0]
    if (!first) return undefined
    for (let i = 1; i < explicit.length; i++) {
      const keys = explicit[i]
      if (!keys || !sameObjectKeySequence(first, keys)) return undefined
    }
    return [...first]
  }

  const implicit = inferImplicitReturnObjectKeys(expr.body)
  return implicit ? [...implicit] : undefined
}

export function compileFunction(state: State, expr: Extract<Expr, { type: 'fn' }>, name: string | null): number {
  const savedFunctionDepth = state.functionDepth
  state.functionDepth = savedFunctionDepth + 1
  const functionId = state.nextFunctionId++
  const params = expr.params
  const paramCount = params.length
  const defaults = expr.defaults || []
  const historyStartIndex = state.historySourceMap.length

  // Save current compilation state
  const savedOps = state.ops
  const savedStack = state.stack
  const savedLocals = state.locals
  const savedNextLocalIndex = state.nextLocalIndex
  const savedInFunction = state.inFunction
  const savedClosureVars = state.closureVars
  const savedParamMap = state.paramNameToLocalIndex
  const savedVariableFunctionIds = state.variableFunctionIds

  if (savedFunctionDepth > 0) {
    state.functionsByNameStack.push(new Map())
  }

  // Detect closure variables (variables from outer scopes that this function will access).
  // Use current this.locals so outer body locals (e.g. x := 5) are in scope.
  const closureVarNames = detectClosureVars(state, expr, state.locals)

  // Map closure variable names to their info in the outer scope
  const closureVarInfos: VariableInfo[] = []
  for (const varName of closureVarNames) {
    if (varName === '$') {
      const outerPipe = state.pipeVars[state.pipeVars.length - 1]
      if (outerPipe) closureVarInfos.push(outerPipe.varInfo)
      continue
    }
    const varInfo = lookupVariable(state, varName)
    if (varInfo) closureVarInfos.push(varInfo)
  }

  // Start new function compilation — use a dedicated array so body cannot be mixed with main ops
  const savedCurrentFunctionId = state.currentFunctionId
  const isOversampleCallback = state.captureGlobalsInClosures
  state.currentFunctionId = functionId
  const bodyOps: number[] = []
  state.ops = bodyOps
  state.stack = []
  state.locals = [new Map()]
  state.nextLocalIndex = 0
  state.inFunction = true
  state.closureVars = []
  // Keep outer function-binding map stable while compiling nested function bodies.
  state.variableFunctionIds = new Map(savedVariableFunctionIds)

  // Set up closure variables - they will reference the outer scope's locals.
  for (let i = 0; i < closureVarNames.length; i++) {
    const outerVarInfo = closureVarInfos[i]
    const closureInfo: VariableInfo = {
      scope: 'closure',
      index: outerVarInfo.index,
      closureIndex: i,
    }
    state.locals[0].set(closureVarNames[i], closureInfo)
  }

  // Declare parameters as local variables
  // Track which parameters are destructured for later processing
  const destructuredParams: Array<{ names: string[]; tempVar: VariableInfo } | null> = new Array(paramCount)
  const paramNameToLocalIndex = new Map<string, number>()

  for (let i = 0; i < paramCount; i++) {
    const param = params[i]

    if (param.type === 'param-destructure') {
      // For destructuring, create a temporary array parameter
      const tempVarInfo: VariableInfo = {
        scope: 'local',
        index: state.nextLocalIndex++,
      }
      destructuredParams[i] = { names: param.names, tempVar: tempVarInfo }
    }
    else if (param.type === 'param-named-destructure') {
      // For named destructuring, create a temporary array parameter
      const tempVarInfo: VariableInfo = {
        scope: 'local',
        index: state.nextLocalIndex++,
      }
      destructuredParams[i] = { names: param.names, tempVar: tempVarInfo }
      paramNameToLocalIndex.set(param.paramName, tempVarInfo.index)
    }
    else {
      // Regular parameter
      const paramInfo: VariableInfo = {
        scope: 'local',
        index: state.nextLocalIndex++,
      }
      state.locals[0].set(param.name, paramInfo)
      destructuredParams[i] = null
      paramNameToLocalIndex.set(param.name, i)
    }
  }

  state.paramNameToLocalIndex = paramNameToLocalIndex

  // Handle default parameters: if param is undefined, set to default value
  const defaultParamFunctionIds = new Map<number, number>()
  const defaultParamFunctionIdsByName = new Map<string, number>()
  let hasDefaultCalls = false
  for (let i = 0; i < paramCount; i++) {
    const defaultExpr = defaults[i]
    if (defaultExpr) {
      if (defaultExpr.type === 'call') hasDefaultCalls = true
      const param = params[i]
      const destructInfo = destructuredParams[i]
      const paramName = param.type === 'param' ? param.name : null
      const paramInfo = destructInfo
        ? destructInfo.tempVar
        : { scope: 'local' as const, index: i }

      // Get parameter value and check if it's undefined (always GetLocal for param slot)
      compileGetVariable(state, paramInfo)
      state.stack.push({ expr: defaultExpr })

      state.ops.push(AudioVmOp.IsUndefined)
      state.stack.pop()
      state.stack.push({ expr: defaultExpr })

      // If undefined (IsUndefined returned 1), don't jump - continue to set default
      // If not undefined (IsUndefined returned 0), jump to skip setting default
      state.ops.push(AudioVmOp.JumpIfFalse)
      const jumpToSkipIndex = state.ops.length
      state.ops.push(0)
      state.stack.pop()

      // Default expressions run in a scope where this param is not yet visible (shadowing)
      if (paramName) state.locals[0].delete(paramName)
      if (defaultExpr.type === 'fn') {
        const innerId = compileFunction(state, defaultExpr, null)
        defaultParamFunctionIds.set(i, innerId)
        if (paramName) defaultParamFunctionIdsByName.set(paramName, innerId)
      }
      else {
        compileExpr(state, defaultExpr)
      }
      if (paramName) state.locals[0].set(paramName, paramInfo)

      // Set parameter to default value
      compileSetVariable(state, paramInfo, defaultExpr)
      state.stack.pop()

      // Skip target
      const skipTarget = state.ops.length
      state.ops[jumpToSkipIndex] = skipTarget
    }
  }
  if (defaultParamFunctionIdsByName.size > 0) {
    state.functionIdToDefaultParamFunctions.set(functionId, defaultParamFunctionIdsByName)
  }

  // Destructure array parameters
  for (let i = 0; i < paramCount; i++) {
    const destructInfo = destructuredParams[i]
    if (destructInfo) {
      const { names, tempVar } = destructInfo

      // Declare local variables for each destructured name
      for (let j = 0; j < names.length; j++) {
        const localInfo: VariableInfo = {
          scope: 'local',
          index: state.nextLocalIndex++,
        }
        state.locals[0].set(names[j], localInfo)

        // Get the array parameter
        compileGetVariable(state, tempVar)
        state.stack.push({ expr: params[i] as unknown as Expr })

        // Push the index
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(j)
        state.stack.push({ expr: params[i] as unknown as Expr })

        // Index into the array (0 = no history recording)
        state.ops.push(AudioVmOp.ArrayGet, 0)
        state.stack.pop() // index
        state.stack.pop() // array
        state.stack.push({ expr: params[i] as unknown as Expr })

        // Set the local variable
        compileSetVariable(state, localInfo, params[i] as unknown as Expr)
        state.stack.pop()
      }
    }
  }

  // Compile function body
  if (expr.body.type === 'block') {
    compileFunctionBlock(state, expr.body)
    state.ops.push(AudioVmOp.Return)
  }
  else {
    // Single expression body
    compileExpr(state, expr.body)
    state.ops.push(AudioVmOp.Return)
  }

  // Store function bytecode (bodyOps was never shared with main program)
  const bytecodeLength = bodyOps.length
  const localCount = state.nextLocalIndex

  // Store function bytecode for use by record callbacks
  state.functionBytecodes.set(functionId, bodyOps)

  // Store function info for named parameter lookup
  const paramNames: string[] = new Array(paramCount)
  const paramTypes: Array<'param' | 'param-destructure' | 'param-named-destructure'> = new Array(paramCount)
  let firstParamIn = 0
  for (let i = 0; i < paramCount; i++) {
    const p = params[i]!
    paramTypes[i] = p.type
    if (p.type === 'param') paramNames[i] = p.name
    else if (p.type === 'param-named-destructure') paramNames[i] = p.paramName
    else paramNames[i] = p.names[0] || '_'
  }
  if (paramCount > 0 && paramNames[0] === 'in') {
    if (paramTypes[0] === 'param') firstParamIn = 1
    else if (paramTypes[0] === 'param-named-destructure') {
      const first = params[0] as Extract<Param, { type: 'param-named-destructure' }>
      if (first.names.length === 2) firstParamIn = 2
    }
  }
  const funcInfo: FunctionInfo = {
    id: functionId,
    paramCount,
    params: paramNames,
    paramTypes,
    firstParamIn,
    bytecodeStart: 0,
    bytecodeLength,
    closureVars: closureVarNames,
    definitionLine: expr.loc.line,
    defaultParamFunctionIds: defaultParamFunctionIds.size > 0 ? defaultParamFunctionIds : undefined,
    defaultParamExprs: hasDefaultCalls ? defaults : undefined,
    returnObjectKeys: inferFunctionReturnObjectKeys(expr),
  }
  state.functions.push(funcInfo)
  if (name) {
    funcInfo.isGlobalScope = savedFunctionDepth === 0
    const top = state.functionsByNameStack[state.functionsByNameStack.length - 1]!
    top.set(name, funcInfo)
  }

  // Restore compilation state
  state.ops = savedOps
  state.stack = savedStack
  state.locals = savedLocals
  state.nextLocalIndex = savedNextLocalIndex
  state.inFunction = savedInFunction
  state.closureVars = savedClosureVars
  state.paramNameToLocalIndex = savedParamMap
  state.variableFunctionIds = savedVariableFunctionIds
  state.functionDepth = savedFunctionDepth
  if (savedFunctionDepth > 0) {
    state.functionsByNameStack.pop()
  }

  // Emit closure capture code - push cell refs (not values) so DefineFunction stores shared cells
  for (const varInfo of closureVarInfos) {
    compilePushCellRef(state, varInfo, expr)
    state.stack.push({ expr })
  }

  // Emit DefineFunction opcode with function metadata
  // Format: DefineFunction <functionId> <paramCount> <firstParamIn> <closureCount> <localCount> <bytecodeLength> <bytecode...>
  // firstParamIn: 0=none, 1=plain 'in' (stereo dual-call when arg is [L,R]), 2=in:[L,R] (lift single to [x,x])
  state.ops.push(AudioVmOp.DefineFunction)
  state.ops.push(functionId)
  state.ops.push(paramCount)
  state.ops.push(firstParamIn)
  state.ops.push(closureVarNames.length)
  state.ops.push(localCount)
  state.ops.push(bytecodeLength)
  const functionBytecodeStart = state.ops.length // Absolute position where function bytecode starts
  state.functionBytecodeStarts.set(functionId, functionBytecodeStart)
  // Avoid `push(...bodyOps)` which can be slow/fragile for large bytecode.
  for (let i = 0; i < bodyOps.length; i++) state.ops.push(bodyOps[i]!)

  // Update all historySourceMap entries for this function to use absolute PCs
  const history = state.historySourceMap
  for (let i = historyStartIndex; i < history.length; i++) {
    const entry = history[i]!
    if (entry.__functionId === functionId) {
      const relativePc = entry.__relativePc
      if (relativePc !== undefined) {
        entry.pc = functionBytecodeStart + relativePc
        // Store the function ID for later use in adjustment filtering
        entry.__finalFunctionId = functionId
      }
      delete entry.__functionId
      delete entry.__relativePc
    }
  }

  // Return gen = history entry with largest PC in this function (the gen whose value is left on stack before Return)
  let returnIndex: number | undefined
  let maxPc = -1
  for (let i = 0; i < state.historySourceMap.length; i++) {
    const entry = state.historySourceMap[i]!
    if (entry.__finalFunctionId === functionId && entry.pc > maxPc) {
      maxPc = entry.pc
      returnIndex = i
    }
  }
  if (returnIndex !== undefined) funcInfo.returnHistorySourceMapIndex = returnIndex

  if (isOversampleCallback) state.oversampleCallbackFunctionIds.add(functionId)
  state.currentFunctionId = savedCurrentFunctionId

  // DefineFunction pushes instance ID onto stack
  state.stack.push({ expr })
  return functionId
}
