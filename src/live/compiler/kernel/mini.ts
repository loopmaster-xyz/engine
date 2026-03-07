import { AudioVmOp } from '../../../dsp/audio-vm-bindings.ts'
import { compileMiniNotation } from '../../../mini/compiler.ts'
import type { Arg, Expr } from '../../ast.ts'
import { compileExpr, error } from '../core.ts'
import type { State } from '../state.ts'
import type { HistorySourceMap } from '../types.ts'
import { lookupVariable } from '../vars.ts'

export function compileMini(state: State, callExpr: Extract<Expr, { type: 'call' }>, args: Arg[]): void {
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
    error(state, 'mini() requires a sequence string argument', callExpr.loc)
    return
  }

  if (seqExpr.type !== 'string') {
    error(state, 'mini() sequence argument must be a string literal', callExpr.loc)
    return
  }

  const sequence = seqExpr.value

  const compileResult = compileMiniNotation(sequence, {
    defaultScale: { rootMidi: state.rootMidi, scaleIndex: state.scaleIndex },
  })
  if (compileResult.bytecode.length === 0) {
    error(state, 'mini() sequence is empty', callExpr.loc)
    return
  }

  // Convert bytecode format from [opLength, ...ops] to [totalLength, version, opLength, ...ops]
  // compileMiniNotation returns: [opLength, ...ops] (MINI_HEADER_SIZE = 1)
  // generateMiniHistoryWindow expects format like test-utils: [totalLength, version, opLength, ...ops]
  // where totalLength is the length of the original bytecode array
  const opLength = compileResult.bytecode[0]!
  // Slice to only include the actual ops (opLength elements), not the padded buffer
  const ops = compileResult.bytecode.slice(1, 1 + opLength)
  // The format should match test-utils: [totalLength, version, opLength, ...ops]
  // totalLength = compileResult.bytecode.length (includes the opLength header)
  const totalLength = compileResult.bytecode.length
  const bytecodeWithHeader = [totalLength, 1, opLength, ...ops] // [totalLength, version, opLength, ...ops]
  const bytecodeLength = 3 + opLength // totalLength + version + opLength + ops

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
      genName: 'Mini',
      pc: state.inFunction ? 0 : pc, // Will be updated to absolute PC after function emission if in function
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
      sequence,
      compileResult,
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

  const transposeVar = lookupVariable(state, 'transpose')
  const tuneVar = lookupVariable(state, 'tune')
  const transposeIdx = transposeVar && transposeVar.scope === 'global' ? transposeVar.index : -1
  const tuneIdx = tuneVar && tuneVar.scope === 'global' ? tuneVar.index : -1

  state.ops.push(AudioVmOp.Mini)
  state.ops.push(bytecodeLength + 2)
  state.ops.push(...bytecodeWithHeader)
  state.ops.push(transposeIdx)
  state.ops.push(tuneIdx)

  // Pop bars from stack (consumed by Mini opcode)
  state.stack.pop()

  // Push result to stack
  state.stack.push({ expr: callExpr })
}
