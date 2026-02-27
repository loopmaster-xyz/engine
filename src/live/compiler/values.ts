import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import type { Expr } from '../ast.ts'
import { compileExpr, error } from './core.ts'
import type { State } from './state.ts'

export function compileArray(state: State, expr: Extract<Expr, { type: 'array' }>): void {
  if (expr.items.length === 0) {
    state.ops.push(AudioVmOp.MakeArray)
    state.ops.push(0)
    state.stack.push({ expr })
    return
  }

  for (const item of expr.items) {
    compileExpr(state, item)
  }

  state.ops.push(AudioVmOp.MakeArray)
  state.ops.push(expr.items.length)

  state.stack.length -= expr.items.length
  state.stack.push({ expr })
}

export function compileMember(state: State, expr: Extract<Expr, { type: 'member' }>): void {
  compileExpr(state, expr.object)

  if (state.stack.length === 0) {
    error(state, 'Member access requires an object', expr.loc)
    return
  }

  // Runtime will check type
  if (expr.property === 'length') {
    state.ops.push(AudioVmOp.ArrayLen)
    state.stack.pop()
    state.stack.push({ expr })
    return
  }
  else if (expr.property === 'avg' || expr.property === 'push' || expr.property === 'shuffle'
    || expr.property === 'map')
  {
    // These are handled as method calls
    return
  }
  else {
    error(state, `Unknown property: ${expr.property}`, expr.loc)
  }
}
