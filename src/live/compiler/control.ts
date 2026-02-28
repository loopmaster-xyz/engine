import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import type { Stmt } from '../ast.ts'
import { compileExpr, compileStmt, error, getCurrentScope, popScope, pushScope } from './core.ts'
import type { State } from './state.ts'
import type { LoopContext } from './types.ts'
import { compileGetVariable, compileSetVariable, declareVariable } from './vars.ts'

export function compileIf(state: State, stmt: Extract<Stmt, { type: 'if' }>): void {
  // Compile test condition
  compileExpr(state, stmt.test)

  // JumpIfFalse to else branch or end
  state.ops.push(AudioVmOp.JumpIfFalse)
  const jumpToElsePatchIndex = state.ops.length
  state.ops.push(0) // Placeholder for jump offset

  // Compile then branch
  compileStmt(state, stmt.then)

  if (stmt.else) {
    // Jump over else branch
    state.ops.push(AudioVmOp.Jump)
    const jumpToEndPatchIndex = state.ops.length
    state.ops.push(0) // Placeholder for jump offset

    // Patch jump to else - target is current position
    const elseTarget = state.ops.length
    state.ops[jumpToElsePatchIndex] = elseTarget

    // Compile else branch
    compileStmt(state, stmt.else)

    // Patch jump to end - target is current position
    const endTarget = state.ops.length
    state.ops[jumpToEndPatchIndex] = endTarget
  }
  else {
    // No else branch, patch jump to end
    const endTarget = state.ops.length
    state.ops[jumpToElsePatchIndex] = endTarget
  }
}

export function compileWhile(state: State, stmt: Extract<Stmt, { type: 'while' }>): void {
  // Mark loop start position
  const loopStart = state.ops.length

  // Push loop context
  const loopContext: LoopContext = { breakTargets: [], continueTargets: [] }
  state.loopStack.push(loopContext)

  // Compile test condition
  compileExpr(state, stmt.test)

  // JumpIfFalse to end of loop
  state.ops.push(AudioVmOp.JumpIfFalse)
  const jumpToEndPatchIndex = state.ops.length
  state.ops.push(0) // Placeholder for jump offset

  // Compile loop body
  compileStmt(state, stmt.body)

  // Patch continue targets to jump here (before jumping back to start)
  const continueTarget = state.ops.length
  for (const patchIndex of loopContext.continueTargets) {
    state.ops[patchIndex] = continueTarget
  }

  // Jump back to loop start
  state.ops.push(AudioVmOp.Jump)
  state.ops.push(loopStart)

  // Patch jump to end and break targets
  const endTarget = state.ops.length
  state.ops[jumpToEndPatchIndex] = endTarget
  for (const patchIndex of loopContext.breakTargets) {
    state.ops[patchIndex] = endTarget
  }

  // Pop loop context
  state.loopStack.pop()
}

export function compileDoWhile(state: State, stmt: Extract<Stmt, { type: 'do' }>): void {
  // Mark loop start position
  const loopStart = state.ops.length

  // Push loop context
  const loopContext: LoopContext = { breakTargets: [], continueTargets: [] }
  state.loopStack.push(loopContext)

  // Compile loop body first (do-while always executes at least once)
  compileStmt(state, stmt.body) // Pop unused expression results

  // Patch continue targets to jump here (before test)
  const continueTarget = state.ops.length
  for (const patchIndex of loopContext.continueTargets) {
    state.ops[patchIndex] = continueTarget
  }

  // Compile test condition
  compileExpr(state, stmt.test)

  // JumpIfTrue back to loop start
  state.ops.push(AudioVmOp.JumpIfTrue)
  state.ops.push(loopStart)

  // Patch break targets
  const endTarget = state.ops.length
  for (const patchIndex of loopContext.breakTargets) {
    state.ops[patchIndex] = endTarget
  }

  // Pop loop context
  state.loopStack.pop()
}

export function compileFor(state: State, stmt: Extract<Stmt, { type: 'for' }>): void {
  // for (i in from..to) body
  // Compile as: i = from; while (i <= to) { body; i = i + 1 }
  // But with continue jumping to the increment

  pushScope(state)

  // Initialize loop variable: i = from
  compileExpr(state, stmt.from)
  if (state.stack.length === 0) {
    error(state, 'for loop start has no value', stmt.loc)
    popScope(state)
    return
  }
  const loopVar = declareVariable(state, stmt.init, stmt.loc)
  compileSetVariable(state, loopVar, stmt.from)
  state.stack.pop()

  // Start loop
  const loopStart = state.ops.length
  const loopContext: LoopContext = { breakTargets: [], continueTargets: [] }
  state.loopStack.push(loopContext)

  // Test: i <= to
  compileGetVariable(state, loopVar)
  state.stack.push({ expr: { type: 'identifier', name: stmt.init, loc: stmt.loc } })
  compileExpr(state, stmt.to)
  state.ops.push(AudioVmOp.LessEqual)
  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr: stmt.from })

  // JumpIfFalse to end
  state.ops.push(AudioVmOp.JumpIfFalse)
  const jumpToEndPatchIndex = state.ops.length
  state.ops.push(0)
  state.stack.pop()

  // Compile body
  compileStmt(state, stmt.body)

  // Patch continue targets to jump here (before increment)
  const continueTarget = state.ops.length
  for (const patchIndex of loopContext.continueTargets) {
    state.ops[patchIndex] = continueTarget
  }

  // Increment: i = i + 1
  compileGetVariable(state, loopVar)
  state.stack.push({ expr: { type: 'identifier', name: stmt.init, loc: stmt.loc } })
  state.ops.push(AudioVmOp.PushScalar)
  state.ops.push(1)
  state.stack.push({ expr: { type: 'number', value: 1, loc: stmt.loc } })
  state.ops.push(AudioVmOp.Add)
  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr: { type: 'identifier', name: stmt.init, loc: stmt.loc } })
  compileSetVariable(state, loopVar, stmt.from)
  state.stack.pop()

  // Jump back to start
  state.ops.push(AudioVmOp.Jump)
  state.ops.push(loopStart)

  // Patch end target and break targets
  const endTarget = state.ops.length
  state.ops[jumpToEndPatchIndex] = endTarget
  for (const patchIndex of loopContext.breakTargets) {
    state.ops[patchIndex] = endTarget
  }

  state.loopStack.pop()
  popScope(state)
}

export function compileForOf(state: State, stmt: Extract<Stmt, { type: 'for-of' }>): void {
  // Desugar for-of to while loop WITHOUT creating a new scope
  // for (v of arr) body
  // =>
  // __i_N = 0; __arr_N = arr; __len_N = arr.length;
  // while (__i_N < __len_N) { v = __arr_N[__i_N]; [index = __i_N;] [length = __len_N;] body; __i_N = __i_N + 1 }

  // Generate unique temp variable names
  const tempId = state.nextTempId++
  const arrName = `__arr_${tempId}`
  const lenName = `__len_${tempId}`
  const idxName = `__i_${tempId}`

  // Compile iterable expression
  compileExpr(state, stmt.iterable)
  if (state.stack.length === 0) {
    error(state, 'for-of iterable has no value', stmt.loc)
    return
  }

  // Store array in temp variable
  const arrayVar = declareVariable(state, arrName, stmt.loc)
  compileSetVariable(state, arrayVar, stmt.iterable)
  state.stack.pop()

  // Get array length
  compileGetVariable(state, arrayVar)
  state.stack.push({ expr: stmt.iterable })
  state.ops.push(AudioVmOp.ArrayLen)
  state.stack.pop()
  state.stack.push({ expr: stmt.iterable })

  // Store length in temp variable
  const lengthVar = declareVariable(state, lenName, stmt.loc)
  compileSetVariable(state, lengthVar, stmt.iterable)
  state.stack.pop()

  // Initialize index to 0
  state.ops.push(AudioVmOp.PushScalar)
  state.ops.push(0)
  state.stack.push({ expr: { type: 'number', value: 0, loc: stmt.loc } })
  const indexVar = declareVariable(state, idxName, stmt.loc)
  compileSetVariable(state, indexVar, stmt.iterable)
  state.stack.pop()

  // Start while loop
  const loopStart = state.ops.length
  const loopContext: LoopContext = { breakTargets: [], continueTargets: [] }
  state.loopStack.push(loopContext)

  // Test: __i < __len
  compileGetVariable(state, indexVar)
  state.stack.push({ expr: { type: 'identifier', name: idxName, loc: stmt.loc } })
  compileGetVariable(state, lengthVar)
  state.stack.push({ expr: { type: 'identifier', name: lenName, loc: stmt.loc } })
  state.ops.push(AudioVmOp.Less)
  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr: stmt.iterable })

  // JumpIfFalse to end
  state.ops.push(AudioVmOp.JumpIfFalse)
  const jumpToEndPatchIndex = state.ops.length
  state.ops.push(0)
  state.stack.pop()

  // Loop body: v = __arr[__i]
  compileGetVariable(state, arrayVar)
  state.stack.push({ expr: stmt.iterable })
  compileGetVariable(state, indexVar)
  state.stack.push({ expr: { type: 'identifier', name: idxName, loc: stmt.loc } })
  state.ops.push(AudioVmOp.ArrayGet, 0)
  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr: { type: 'identifier', name: stmt.value, loc: stmt.loc } })

  const valueVar = declareVariable(state, stmt.value, stmt.loc)
  compileSetVariable(state, valueVar, stmt.iterable)
  state.stack.pop()

  // Optional: index = __i
  if (stmt.index) {
    compileGetVariable(state, indexVar)
    state.stack.push({ expr: { type: 'identifier', name: idxName, loc: stmt.loc } })
    const idxVar = declareVariable(state, stmt.index, stmt.loc)
    compileSetVariable(state, idxVar, stmt.iterable)
    state.stack.pop()
  }

  // Optional: length = __len
  if (stmt.length) {
    compileGetVariable(state, lengthVar)
    state.stack.push({ expr: { type: 'identifier', name: lenName, loc: stmt.loc } })
    const lenVar = declareVariable(state, stmt.length, stmt.loc)
    compileSetVariable(state, lenVar, stmt.iterable)
    state.stack.pop()
  }

  // Compile user body
  compileStmt(state, stmt.body)

  // Patch continue targets
  const continueTarget = state.ops.length
  for (const patchIndex of loopContext.continueTargets) {
    state.ops[patchIndex] = continueTarget
  }

  // Increment: __i = __i + 1
  compileGetVariable(state, indexVar)
  state.stack.push({ expr: { type: 'identifier', name: idxName, loc: stmt.loc } })
  state.ops.push(AudioVmOp.PushScalar)
  state.ops.push(1)
  state.stack.push({ expr: { type: 'number', value: 1, loc: stmt.loc } })
  state.ops.push(AudioVmOp.Add)
  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr: { type: 'identifier', name: idxName, loc: stmt.loc } })
  compileSetVariable(state, indexVar, stmt.iterable)
  state.stack.pop()

  // Jump back to start
  state.ops.push(AudioVmOp.Jump)
  state.ops.push(loopStart)

  // Patch end target
  const endTarget = state.ops.length
  state.ops[jumpToEndPatchIndex] = endTarget
  for (const patchIndex of loopContext.breakTargets) {
    state.ops[patchIndex] = endTarget
  }

  state.loopStack.pop()
}

export function compileBreak(state: State, stmt: Extract<Stmt, { type: 'break' }>): void {
  if (state.loopStack.length === 0) {
    error(state, 'break statement outside of loop', stmt.loc)
    return
  }

  // Find the target loop (by label if specified, otherwise innermost)
  let targetLoop: LoopContext | null = null
  if (stmt.label) {
    // Search for labeled loop from innermost to outermost
    for (let i = state.loopStack.length - 1; i >= 0; i--) {
      if (state.loopStack[i].label === stmt.label) {
        targetLoop = state.loopStack[i]
        break
      }
    }
    if (!targetLoop) {
      error(state, `Label not found: ${stmt.label}`, stmt.loc)
      return
    }
  }
  else {
    // Use innermost loop
    targetLoop = state.loopStack[state.loopStack.length - 1]
  }

  // Emit jump and record patch index
  state.ops.push(AudioVmOp.Jump)
  const patchIndex = state.ops.length
  state.ops.push(0) // Placeholder
  targetLoop.breakTargets.push(patchIndex)
}

export function compileContinue(state: State, stmt: Extract<Stmt, { type: 'continue' }>): void {
  if (state.loopStack.length === 0) {
    error(state, 'continue statement outside of loop', stmt.loc)
    return
  }

  // Find the target loop (by label if specified, otherwise innermost)
  let targetLoop: LoopContext | null = null
  if (stmt.label) {
    // Search for labeled loop from innermost to outermost
    for (let i = state.loopStack.length - 1; i >= 0; i--) {
      if (state.loopStack[i].label === stmt.label) {
        targetLoop = state.loopStack[i]
        break
      }
    }
    if (!targetLoop) {
      error(state, `Label not found: ${stmt.label}`, stmt.loc)
      return
    }
  }
  else {
    // Use innermost loop
    targetLoop = state.loopStack[state.loopStack.length - 1]
  }

  if (targetLoop.isSwitch) {
    error(state, 'continue statement not allowed in switch', stmt.loc)
    return
  }

  // Emit jump and record patch index
  state.ops.push(AudioVmOp.Jump)
  const patchIndex = state.ops.length
  state.ops.push(0) // Placeholder
  targetLoop.continueTargets.push(patchIndex)
}

export function compileSwitch(state: State, stmt: Extract<Stmt, { type: 'switch' }>): void {
  const loopContext: LoopContext = { breakTargets: [], continueTargets: [], isSwitch: true }
  state.loopStack.push(loopContext)

  compileExpr(state, stmt.test)
  if (state.stack.length === 0) {
    error(state, 'switch expression has no value', stmt.loc)
    state.loopStack.pop()
    return
  }

  const tempId = state.nextTempId++
  const tempName = `__switch_${tempId}`
  const tempVar = declareVariable(state, tempName, stmt.loc)
  compileSetVariable(state, tempVar, stmt.test)
  state.stack.pop()

  const jumpToEndPatchIndices: number[] = []
  for (const c of stmt.cases) {
    if (c.test !== null) {
      compileGetVariable(state, tempVar)
      state.stack.push({ expr: stmt.test })
      compileExpr(state, c.test)
      state.ops.push(AudioVmOp.Equal)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: c.test })
      state.ops.push(AudioVmOp.JumpIfFalse)
      const jumpToNextIndex = state.ops.length
      state.ops.push(0)
      state.stack.pop()

      pushScope(state)
      for (const s of c.body) compileStmt(state, s)
      popScope(state)

      state.ops.push(AudioVmOp.Jump)
      jumpToEndPatchIndices.push(state.ops.length)
      state.ops.push(0)

      const nextCaseTarget = state.ops.length
      state.ops[jumpToNextIndex] = nextCaseTarget
    }
    else {
      pushScope(state)
      for (const s of c.body) compileStmt(state, s)
      popScope(state)
    }
  }

  const endTarget = state.ops.length
  for (const idx of jumpToEndPatchIndices) {
    state.ops[idx] = endTarget
  }
  for (const idx of loopContext.breakTargets) {
    state.ops[idx] = endTarget
  }

  state.loopStack.pop()
}

export function compileLabel(state: State, stmt: Extract<Stmt, { type: 'label' }>): void {
  if (stmt.stmt.type === 'switch') {
    const labelContext: LoopContext = { label: stmt.name, breakTargets: [], continueTargets: [] }
    state.loopStack.push(labelContext)
    compileSwitch(state, stmt.stmt)
    const endTarget = state.ops.length
    for (const idx of labelContext.breakTargets) {
      state.ops[idx] = endTarget
    }
    state.loopStack.pop()
    return
  }

  // Check if the labeled statement is a loop
  if (stmt.stmt.type === 'while' || stmt.stmt.type === 'do' || stmt.stmt.type === 'for'
    || stmt.stmt.type === 'for-of')
  {
    // Push loop context with label, then compile the loop
    // The loop compilation methods will use this context instead of creating their own
    const loopContext: LoopContext = { label: stmt.name, breakTargets: [], continueTargets: [] }
    state.loopStack.push(loopContext)

    // Compile the loop - but we need to inline the logic to avoid double context
    if (stmt.stmt.type === 'while') {
      const loopStart = state.ops.length
      compileExpr(state, stmt.stmt.test)
      state.ops.push(AudioVmOp.JumpIfFalse)
      const jumpToEndPatchIndex = state.ops.length
      state.ops.push(0)
      compileStmt(state, stmt.stmt.body)
      const continueTarget = state.ops.length
      for (const patchIndex of loopContext.continueTargets) {
        state.ops[patchIndex] = continueTarget
      }
      state.ops.push(AudioVmOp.Jump)
      state.ops.push(loopStart)
      const endTarget = state.ops.length
      state.ops[jumpToEndPatchIndex] = endTarget
      for (const patchIndex of loopContext.breakTargets) {
        state.ops[patchIndex] = endTarget
      }
    }
    else if (stmt.stmt.type === 'do') {
      const loopStart = state.ops.length
      compileStmt(state, stmt.stmt.body)
      const continueTarget = state.ops.length
      for (const patchIndex of loopContext.continueTargets) {
        state.ops[patchIndex] = continueTarget
      }
      compileExpr(state, stmt.stmt.test)
      state.ops.push(AudioVmOp.JumpIfTrue)
      state.ops.push(loopStart)
      const endTarget = state.ops.length
      for (const patchIndex of loopContext.breakTargets) {
        state.ops[patchIndex] = endTarget
      }
    }
    else if (stmt.stmt.type === 'for') {
      // Inline for loop compilation with the existing label context
      pushScope(state)
      compileExpr(state, stmt.stmt.from)
      if (state.stack.length === 0) {
        error(state, 'for loop start has no value', stmt.stmt.loc)
        popScope(state)
        state.loopStack.pop()
        return
      }
      const loopVar = declareVariable(state, stmt.stmt.init, stmt.stmt.loc)
      compileSetVariable(state, loopVar, stmt.stmt.from)
      state.stack.pop()

      const loopStart = state.ops.length
      compileGetVariable(state, loopVar)
      state.stack.push({ expr: { type: 'identifier', name: stmt.stmt.init, loc: stmt.stmt.loc } })
      compileExpr(state, stmt.stmt.to)
      state.ops.push(AudioVmOp.LessEqual)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: stmt.stmt.from })
      state.ops.push(AudioVmOp.JumpIfFalse)
      const jumpToEndPatchIndex = state.ops.length
      state.ops.push(0)
      state.stack.pop()

      compileStmt(state, stmt.stmt.body)

      const continueTarget = state.ops.length
      for (const patchIndex of loopContext.continueTargets) {
        state.ops[patchIndex] = continueTarget
      }

      compileGetVariable(state, loopVar)
      state.stack.push({ expr: { type: 'identifier', name: stmt.stmt.init, loc: stmt.stmt.loc } })
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(1)
      state.stack.push({ expr: { type: 'number', value: 1, loc: stmt.stmt.loc } })
      state.ops.push(AudioVmOp.Add)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: { type: 'identifier', name: stmt.stmt.init, loc: stmt.stmt.loc } })
      compileSetVariable(state, loopVar, stmt.stmt.from)
      state.stack.pop()

      state.ops.push(AudioVmOp.Jump)
      state.ops.push(loopStart)

      const endTarget = state.ops.length
      state.ops[jumpToEndPatchIndex] = endTarget
      for (const patchIndex of loopContext.breakTargets) {
        state.ops[patchIndex] = endTarget
      }

      popScope(state)
    }
    else if (stmt.stmt.type === 'for-of') {
      // Inline for-of compilation with the existing label context (no pushScope!)
      const forOfStmt = stmt.stmt

      const tempId = state.nextTempId++
      const arrName = `__arr_${tempId}`
      const lenName = `__len_${tempId}`
      const idxName = `__i_${tempId}`

      compileExpr(state, forOfStmt.iterable)
      if (state.stack.length === 0) {
        error(state, 'for-of iterable has no value', forOfStmt.loc)
        state.loopStack.pop()
        return
      }

      const arrayVar = declareVariable(state, arrName, forOfStmt.loc)
      compileSetVariable(state, arrayVar, forOfStmt.iterable)
      state.stack.pop()

      compileGetVariable(state, arrayVar)
      state.stack.push({ expr: forOfStmt.iterable })
      state.ops.push(AudioVmOp.ArrayLen)
      state.stack.pop()
      state.stack.push({ expr: forOfStmt.iterable })

      const lengthVar = declareVariable(state, lenName, forOfStmt.loc)
      compileSetVariable(state, lengthVar, forOfStmt.iterable)
      state.stack.pop()

      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: { type: 'number', value: 0, loc: forOfStmt.loc } })
      const indexVar = declareVariable(state, idxName, forOfStmt.loc)
      compileSetVariable(state, indexVar, forOfStmt.iterable)
      state.stack.pop()

      const loopStart = state.ops.length
      compileGetVariable(state, indexVar)
      state.stack.push({ expr: { type: 'identifier', name: idxName, loc: forOfStmt.loc } })
      compileGetVariable(state, lengthVar)
      state.stack.push({ expr: { type: 'identifier', name: lenName, loc: forOfStmt.loc } })
      state.ops.push(AudioVmOp.Less)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: forOfStmt.iterable })

      state.ops.push(AudioVmOp.JumpIfFalse)
      const jumpToEndPatchIndex = state.ops.length
      state.ops.push(0)
      state.stack.pop()

      compileGetVariable(state, arrayVar)
      state.stack.push({ expr: forOfStmt.iterable })
      compileGetVariable(state, indexVar)
      state.stack.push({ expr: { type: 'identifier', name: idxName, loc: forOfStmt.loc } })
      state.ops.push(AudioVmOp.ArrayGet, 0)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: { type: 'identifier', name: forOfStmt.value, loc: forOfStmt.loc } })

      const valueVar = declareVariable(state, forOfStmt.value, forOfStmt.loc)
      compileSetVariable(state, valueVar, forOfStmt.iterable)
      state.stack.pop()

      if (forOfStmt.index) {
        compileGetVariable(state, indexVar)
        state.stack.push({ expr: { type: 'identifier', name: idxName, loc: forOfStmt.loc } })
        const idxVar = declareVariable(state, forOfStmt.index, forOfStmt.loc)
        compileSetVariable(state, idxVar, forOfStmt.iterable)
        state.stack.pop()
      }

      if (forOfStmt.length) {
        compileGetVariable(state, lengthVar)
        state.stack.push({ expr: { type: 'identifier', name: lenName, loc: forOfStmt.loc } })
        const lenVar = declareVariable(state, forOfStmt.length, forOfStmt.loc)
        compileSetVariable(state, lenVar, forOfStmt.iterable)
        state.stack.pop()
      }

      compileStmt(state, forOfStmt.body)

      const continueTarget = state.ops.length
      for (const patchIndex of loopContext.continueTargets) {
        state.ops[patchIndex] = continueTarget
      }

      compileGetVariable(state, indexVar)
      state.stack.push({ expr: { type: 'identifier', name: idxName, loc: forOfStmt.loc } })
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(1)
      state.stack.push({ expr: { type: 'number', value: 1, loc: forOfStmt.loc } })
      state.ops.push(AudioVmOp.Add)
      state.stack.pop()
      state.stack.pop()
      state.stack.push({ expr: { type: 'identifier', name: idxName, loc: forOfStmt.loc } })
      compileSetVariable(state, indexVar, forOfStmt.iterable)
      state.stack.pop()

      state.ops.push(AudioVmOp.Jump)
      state.ops.push(loopStart)

      const endTarget = state.ops.length
      state.ops[jumpToEndPatchIndex] = endTarget
      for (const patchIndex of loopContext.breakTargets) {
        state.ops[patchIndex] = endTarget
      }
    }

    state.loopStack.pop()
  }
  else {
    // Non-loop labeled statement (just compile the statement)
    compileStmt(state, stmt.stmt)
  }
}

export function compileThrow(state: State, stmt: Extract<Stmt, { type: 'throw' }>): void {
  if (stmt.value) {
    compileExpr(state, stmt.value)
  }
  else {
    // Throw 0 if no value
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(0)
    state.stack.push({ expr: { type: 'number', value: 0, loc: stmt.loc } })
  }
  state.ops.push(AudioVmOp.Throw)
  state.stack.pop()
}

export function compileTry(state: State, stmt: Extract<Stmt, { type: 'try' }>): void {
  // Structure:
  // PushTryBlock <catchPc> <finallyPc> <catchParam>
  // try body
  // PopTryBlock
  // Jump <finally or end>
  // catch: (catchPc points here, jumped to by Throw)
  //   catch body
  //   Jump <finally or end>
  // finally: (finallyPc points here)
  //   finally body
  // end:

  // Pre-allocate catch parameter if needed
  let catchParamIndex = -1
  if (stmt.catch) {
    catchParamIndex = state.nextLocalIndex
    state.nextLocalIndex++ // Reserve the local slot
  }

  // Emit PushTryBlock
  state.ops.push(AudioVmOp.PushTryBlock)
  const catchPcIndex = state.ops.length
  state.ops.push(-1) // Will be patched to catch start
  const finallyPcIndex = state.ops.length
  state.ops.push(-1) // Will be patched to finally start
  state.ops.push(catchParamIndex)

  // Compile try body
  compileStmt(state, stmt.body)

  // If there's no finally, pop try block after successful execution
  if (!stmt.finally) {
    state.ops.push(AudioVmOp.PopTryBlock)
  }

  // Jump to finally (or end if no finally)
  state.ops.push(AudioVmOp.Jump)
  const jumpFromTryIndex = state.ops.length
  state.ops.push(0) // Will be patched

  // Track all jumps that should go to finally (or end)
  const jumpsToFinallyOrEnd: number[] = [jumpFromTryIndex]

  // Compile catch block
  if (stmt.catch) {
    const catchStart = state.ops.length
    state.ops[catchPcIndex] = catchStart

    // Push a new scope for the catch block
    pushScope(state)

    // Register the catch parameter in the catch scope
    const currentScope = getCurrentScope(state)
    if (currentScope) {
      currentScope.set(stmt.catch.param, { scope: 'local', index: catchParamIndex })
    }

    // Compile catch body (don't push scope if it's a block, we already did)
    if (stmt.catch.body.type === 'block') {
      for (const s of stmt.catch.body.body) {
        compileStmt(state, s)
      }
    }
    else {
      compileStmt(state, stmt.catch.body)
    }

    popScope(state)

    // Pop try block if no finally (finally will pop it)
    if (!stmt.finally) {
      state.ops.push(AudioVmOp.PopTryBlock)
    }

    // Jump to finally (or end if no finally)
    state.ops.push(AudioVmOp.Jump)
    jumpsToFinallyOrEnd.push(state.ops.length)
    state.ops.push(0) // Will be patched
  }

  // Compile finally block
  let finallyStart = -1
  if (stmt.finally) {
    finallyStart = state.ops.length
    state.ops[finallyPcIndex] = finallyStart

    // Compile finally body
    compileStmt(state, stmt.finally)

    // Pop try block after finally
    state.ops.push(AudioVmOp.PopTryBlock)
  }

  const endTarget = state.ops.length

  // Patch all jumps
  const jumpTarget = stmt.finally ? finallyStart : endTarget
  for (const index of jumpsToFinallyOrEnd) {
    state.ops[index] = jumpTarget
  }
}
