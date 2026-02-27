import { AudioVmOp } from '../../../dsp/audio-vm-bindings.ts'
import type { Arg, Expr } from '../../ast.ts'
import { parseTramSequence } from '../../tram-parser.ts'
import { compileExpr, error } from '../core.ts'
import type { State } from '../state.ts'
import type { HistorySourceMap } from '../types.ts'

export function compileTram(state: State, callExpr: Extract<Expr, { type: 'call' }>, args: Arg[]): void {
  // Find seq argument (string) and bars argument (optional, default 1.0)
  let seqExpr: Expr | null = null
  let barsExpr: Expr | null = null

  for (const arg of args) {
    if (arg.type === 'arg' && arg.value) {
      if (arg.name === 'seq' || arg.name === 'sequence') {
        seqExpr = arg.value
      }
      else if (arg.name === 'bars') {
        barsExpr = arg.value
      }
      else if (!arg.name && !seqExpr) {
        // First positional argument is the sequence
        seqExpr = arg.value
      }
      else if (!arg.name && !barsExpr) {
        // Second positional argument is bars
        barsExpr = arg.value
      }
    }
  }

  if (!seqExpr) {
    error(state, 'tram() requires a sequence string argument', callExpr.loc.line, callExpr.loc.column)
    return
  }

  if (seqExpr.type !== 'string') {
    error(state, 'tram() sequence argument must be a string literal', callExpr.loc.line, callExpr.loc.column)
    return
  }

  const sequence = seqExpr.value

  // Parse the sequence string
  const parseResult = parseTramSequence(sequence)
  if (parseResult.bytecode.length === 0) {
    error(state, 'tram() sequence is empty', callExpr.loc.line, callExpr.loc.column)
    return
  }

  // Compile bars expression (if provided) or push default 1.0
  if (barsExpr) {
    // Compile the bars expression - can be any runtime expression
    compileExpr(state, barsExpr)
  }
  else {
    // Default bars = 1.0
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(1.0)
    state.stack.push({ expr: { type: 'number', value: 1.0, loc: callExpr.loc } })
  }

  // Store PC before emitting to match runtime: at runtime, pc points to opcode, then increments (skip prelude so prelude gen histories are not included)
  const pc = state.ops.length
  if (callExpr.loc.line > state.preludeLines) {
    const userLine = callExpr.loc.line - state.preludeLines
    const historyEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: 'Tram',
      pc: state.inFunction ? 0 : pc, // Will be updated to absolute PC after function emission if in function
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
      tramBeatMapping: parseResult.beatMapping.map(m => ({
        linearIndex: m.linearIndex,
        startCol: seqExpr.loc.column + m.startCol, // seqExpr.loc.column is opening quote, m.startCol is 1-based from string start
        endCol: seqExpr.loc.column + m.endCol,
      })),
    }
    state.historySourceMap.push(historyEntry)

    // If in function, mark this entry to be updated later with absolute PC
    if (state.inFunction && state.currentFunctionId !== null) {
      historyEntry.__functionId = state.currentFunctionId
      historyEntry.__relativePc = pc
    }
    else {
      // In main program, PC is already absolute - store it directly
      historyEntry.pc = pc
    }
  }

  // Emit Tram opcode: Tram <length> <bytecode...>. Validate so VM never sees NaN.
  const bytecode = parseResult.bytecode
  const tramLen = bytecode.length
  if (!Number.isInteger(tramLen) || tramLen <= 0) {
    error(state, 'tram() bytecode length invalid', callExpr.loc.line, callExpr.loc.column)
    return
  }
  for (let b = 0; b < tramLen; b++) {
    const v = bytecode[b]!
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      error(state, 'tram() bytecode contains invalid value', callExpr.loc.line, callExpr.loc.column)
      return
    }
  }
  state.ops.push(AudioVmOp.Tram)
  state.ops.push(tramLen)
  state.ops.push(...bytecode)

  // Pop bars from stack (consumed by Tram opcode)
  state.stack.pop()

  // Push result to stack
  state.stack.push({ expr: callExpr })
}
