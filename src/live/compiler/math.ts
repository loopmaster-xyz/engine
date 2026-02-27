import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import type { Expr } from '../ast.ts'
import { compileExpr, error } from './core.ts'
import type { State } from './state.ts'

export function compileUnaryOp(state: State, expr: Extract<Expr, { type: 'unary' }>): void {
  compileExpr(state, expr.expr)

  if (state.stack.length === 0) {
    error(state, 'Unary operator requires an operand', expr.loc.line, expr.loc.column)
    return
  }

  const opMap: Record<string, AudioVmOp> = {
    '-': AudioVmOp.Neg,
    '!': AudioVmOp.Not,
    '~': AudioVmOp.BitNot,
  }

  const opCode = opMap[expr.op]
  if (opCode === undefined) {
    error(state, `Unknown unary operator: ${expr.op}`, expr.loc.line, expr.loc.column)
    return
  }

  state.ops.push(opCode)

  state.stack.pop()
  state.stack.push({ expr })
}

export function compileBinaryOp(state: State, expr: Extract<Expr, { type: 'binary' }>): void {
  compileExpr(state, expr.left)
  compileExpr(state, expr.right)

  const opMap: Record<string, AudioVmOp> = {
    '+': AudioVmOp.Add,
    '-': AudioVmOp.Sub,
    '*': AudioVmOp.Mul,
    '/': AudioVmOp.Div,
    '%': AudioVmOp.Mod,
    '**': AudioVmOp.Pow,
    '>': AudioVmOp.Greater,
    '<': AudioVmOp.Less,
    '>=': AudioVmOp.GreaterEqual,
    '<=': AudioVmOp.LessEqual,
    '==': AudioVmOp.Equal,
    '!=': AudioVmOp.NotEqual,
    '&&': AudioVmOp.And,
    '||': AudioVmOp.Or,
    '&': AudioVmOp.BitAnd,
    '|': AudioVmOp.BitOr,
    '^': AudioVmOp.BitXor,
    '<<': AudioVmOp.ShiftLeft,
    '>>': AudioVmOp.ShiftRight,
  }

  const opCode = opMap[expr.op]
  if (opCode === undefined) {
    error(state, `Unknown binary operator: ${expr.op}`, expr.loc.line, expr.loc.column)
    return
  }

  state.ops.push(opCode)

  state.stack.pop()
  state.stack.pop()
  state.stack.push({ expr })
}

export function compileTernary(state: State, expr: Extract<Expr, { type: 'ternary' }>): void {
  // Compile test condition
  compileExpr(state, expr.test)

  // JumpIfFalse to else expression
  state.ops.push(AudioVmOp.JumpIfFalse)
  const jumpToElsePatchIndex = state.ops.length
  state.ops.push(0) // Placeholder for jump offset

  // Compile then expression
  compileExpr(state, expr.then)

  // Jump over else expression
  state.ops.push(AudioVmOp.Jump)
  const jumpToEndPatchIndex = state.ops.length
  state.ops.push(0) // Placeholder for jump offset

  // Patch jump to else - target is current position
  const elseTarget = state.ops.length
  state.ops[jumpToElsePatchIndex] = elseTarget

  // Pop the then result since we're taking the else path
  state.stack.pop()

  // Compile else expression
  compileExpr(state, expr.else)

  // Patch jump to end - target is current position
  const endTarget = state.ops.length
  state.ops[jumpToEndPatchIndex] = endTarget

  state.stack[state.stack.length - 1] = { expr }
}
