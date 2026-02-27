import { AudioVmOp } from '../../../dsp/audio-vm-bindings.ts'
import { compileTimelineNotation } from '../../../timeline/compiler.ts'
import type { Arg, Expr } from '../../ast.ts'
import { error } from '../core.ts'
import type { State } from '../state.ts'
import type { HistorySourceMap } from '../types.ts'

export function compileTimeline(state: State, callExpr: Extract<Expr, { type: 'call' }>, args: Arg[]): void {
  let seqExpr: Expr | null = null
  let colorExpr: Expr | null = null
  for (const arg of args) {
    if (arg.type === 'arg' && arg.value) {
      if (arg.name === 'pattern' || arg.name === 'seq' || arg.name === 'sequence') {
        seqExpr = arg.value
      }
      else if (arg.name === 'color') {
        colorExpr = arg.value
      }
      else if (!arg.name) {
        if (!seqExpr) seqExpr = arg.value
        else if (!colorExpr) colorExpr = arg.value
      }
    }
  }

  if (!seqExpr) {
    error(state, 'timeline() requires a pattern string argument', callExpr.loc)
    return
  }

  if (seqExpr.type !== 'string') {
    error(state, 'timeline() pattern argument must be a string literal', callExpr.loc)
    return
  }

  let colorIndex: number | undefined
  if (colorExpr) {
    if (colorExpr.type !== 'number') {
      error(state, 'timeline() color argument must be a number 0-5 (red,green,yellow,blue,purple,cyan)', callExpr.loc)
      return
    }
    const n = Math.floor(Number(colorExpr.value))
    if (n < 0 || n > 5) {
      error(state, 'timeline() color argument must be 0-5', callExpr.loc)
      return
    }
    colorIndex = n
  }

  const sequence = seqExpr.value
  const compiled = compileTimelineNotation(sequence)
  if (compiled.bytecode.length <= 1) {
    error(state, 'timeline() pattern is empty or invalid', callExpr.loc)
    return
  }

  const bytecodeLength = compiled.bytecode.length

  const pc = state.ops.length
  if (callExpr.loc.line > state.preludeLines) {
    const userLine = callExpr.loc.line - state.preludeLines
    const historyEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: 'Timeline',
      pc: state.inFunction ? 0 : pc,
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
      sequence,
      timelineSegmentTokens: compiled.tokens.map(t => ({
        fromTokenStart: t.fromTokenStart,
        fromTokenLength: t.fromTokenLength,
        toTokenStart: t.toTokenStart,
        toTokenLength: t.toTokenLength,
      })),
      ...(colorIndex !== undefined && { timelineColorIndex: colorIndex }),
    }
    state.historySourceMap.push(historyEntry)

    if (state.inFunction && state.currentFunctionId !== null) {
      historyEntry.__functionId = state.currentFunctionId
      historyEntry.__relativePc = pc
    }
    else {
      historyEntry.pc = pc
    }
  }

  state.ops.push(AudioVmOp.Timeline)
  state.ops.push(bytecodeLength)
  for (let i = 0; i < bytecodeLength; i++) {
    state.ops.push(compiled.bytecode[i]!)
  }

  state.stack.push({ expr: callExpr })
}
