import type { Expr } from '../ast.ts'
import { compileExpr, error, getCurrentScope, popScope, pushScope } from './core.ts'
import type { State } from './state.ts'
import type { VariableInfo } from './types.ts'
import { compileSetVariable, declareVariable } from './vars.ts'

export function compilePipe(state: State, expr: Extract<Expr, { type: 'binary' }>): void {
  compileExpr(state, expr.left)

  if (state.stack.length === 0) {
    error(state, 'Pipe operator requires a left-hand value', expr.loc)
    return
  }

  // Each pipe introduces a new `$` binding, shadowing any outer one.
  // At top level (no call frame) use a global temp; inside a function use a local.
  pushScope(state)
  const pipeName = `__pipe_${state.nextTempId++}`
  const pipeVar: VariableInfo = state.functionDepth === 0
    ? (() => {
      const info: VariableInfo = { scope: 'global', index: state.nextGlobalIndex++ }
      getCurrentScope(state)!.set(pipeName, info)
      return info
    })()
    : declareVariable(state, pipeName, expr.loc, true)
  compileSetVariable(state, pipeVar, expr.left)
  state.stack.pop()
  state.pipeVars.push({ varInfo: pipeVar, functionDepth: state.functionDepth })

  compileExpr(state, expr.right)

  state.pipeVars.pop()
  popScope(state)
}
