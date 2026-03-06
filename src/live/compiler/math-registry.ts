// Order of names defines function id for VM. AS math-funcs.ts must use same order.

export const MATH_UNARY = [
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'tanh', 'abs', 'sqrt', 'square',
  'cube', 'log', 'exp', 'log10', 'log2', 'exp2', 'floor', 'ceil', 'round',
  'trunc', 'fract', 'sign', 'isnan', 'isinf', 'heaviside', 'scalar', 'scalarmax',
] as const

export const MATH_BINARY = [
  'min', 'max', 'hypot', 'mod', 'snap', 'step', 'safediv', 'swing',
] as const

export const MATH_TERNARY = [
  'clamp', 'lerp', 'wrap', 'pingpong', 'fold', 'smoothstep', 'smootherstep', 'select',
] as const

export function getMathUnaryId(name: string): number {
  const i = (MATH_UNARY as readonly string[]).indexOf(name)
  return i >= 0 ? i : -1
}

export function getMathBinaryId(name: string): number {
  const i = (MATH_BINARY as readonly string[]).indexOf(name)
  return i >= 0 ? i : -1
}

export function getMathTernaryId(name: string): number {
  const i = (MATH_TERNARY as readonly string[]).indexOf(name)
  return i >= 0 ? i : -1
}
