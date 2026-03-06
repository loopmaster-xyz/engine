import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import type { Expr } from '../ast.ts'
import { compileExpr, error } from './core.ts'
import type { State } from './state.ts'
import { getObjectKeysForExpr, getStoreShapeForExpr } from './vars.ts'

const ARRAY_METHOD_PROPERTIES = new Set(['avg', 'sum', 'push', 'shuffle', 'map', 'reduce', 'slice', 'take'])

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

export function compileObject(state: State, expr: Extract<Expr, { type: 'object' }>): void {
  if (expr.entries.length === 0) {
    state.ops.push(AudioVmOp.MakeArray)
    state.ops.push(0)
    state.stack.push({ expr })
    return
  }

  for (const entry of expr.entries) {
    compileExpr(state, entry.value)
  }

  state.ops.push(AudioVmOp.MakeArray)
  state.ops.push(expr.entries.length)
  state.stack.length -= expr.entries.length
  state.stack.push({ expr })
}

export function compileMember(state: State, expr: Extract<Expr, { type: 'member' }>): void {
  const storeShape = getStoreShapeForExpr(state, expr.object)
  if (storeShape) {
    if (storeShape.kind === 'array') {
      if (expr.property === 'length') {
        const stackBefore = state.stack.length
        compileExpr(state, expr.object)
        if (state.stack.length > stackBefore) {
          state.ops.push(AudioVmOp.Pop)
          state.stack.length = stackBefore
        }
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(storeShape.length)
        state.stack.push({ expr })
        return
      }
      if (ARRAY_METHOD_PROPERTIES.has(expr.property)) {
        return
      }
      error(state, `Store arrays only support index access and length: ${expr.property}`, expr.loc)
      return
    }

    const propertyIndex = storeShape.keys.indexOf(expr.property)
    if (propertyIndex < 0) {
      error(state, `Unknown store object property: ${expr.property}`, expr.loc)
      return
    }

    const stackBefore = state.stack.length
    compileExpr(state, expr.object)
    compileExpr(state, { type: 'number', value: propertyIndex, loc: expr.loc })
    state.ops.push(AudioVmOp.StoreGet)
    state.stack.length = stackBefore
    state.stack.push({ expr })
    return
  }

  const objectKeys = getObjectKeysForExpr(state, expr.object)
  if (objectKeys) {
    const propertyIndex = objectKeys.indexOf(expr.property)
    if (propertyIndex < 0) {
      error(state, `Unknown object property: ${expr.property}`, expr.loc)
      return
    }

    const stackBefore = state.stack.length
    compileExpr(state, expr.object)
    compileExpr(state, { type: 'number', value: propertyIndex, loc: expr.loc })
    state.ops.push(AudioVmOp.ArrayGet, 0)
    state.stack.length = stackBefore
    state.stack.push({ expr })
    return
  }

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
  else if (ARRAY_METHOD_PROPERTIES.has(expr.property)) {
    // These are handled as method calls
    return
  }
  else {
    error(state, `Property access requires known object shape: ${expr.property}`, expr.loc)
  }
}
