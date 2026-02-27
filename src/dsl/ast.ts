export type Expr =
  | { type: 'number'; value: number }
  | { type: 'string'; value: string }
  | { type: 'identifier'; name: string }
  | { type: 'binary'; op: string; left: Expr; right: Expr }
  | { type: 'unary'; op: string; expr: Expr }
  | { type: 'call'; name: string; args: Expr[]; object?: Expr }
  | { type: 'member'; object: Expr; property: string }
  | { type: 'ternary'; condition: Expr; trueExpr: Expr; falseExpr: Expr }

export type Stmt =
  | { type: 'assign'; name: string; expr: Expr }
  | { type: 'block'; stmts: Stmt[] }
  | { type: 'expr'; expr: Expr }
  | { type: 'if'; condition: Expr; thenBranch: Stmt[]; elseBranch?: Stmt[] }
  | { type: 'forIn'; varName: string; iterable: Expr; body: Stmt[] }
  | { type: 'switch'; expr: Expr; cases: { value: Expr | null; stmts: Stmt[] }[] }
  | { type: 'break' }
  | { type: 'continue' }

export type Parameter = {
  name: string
  default?: number
  min?: number
  max?: number
  unit?: string
  curve?: 'linear' | 'exp2'
  description?: string
  types?: ('scalar' | 'audio')[]
}

export type Variant = {
  name: string
  description?: string
  stmts: Stmt[]
}

export type Import = {
  names: string[]
}

export type Field = {
  name: string
  value: string
}

export type Constant = {
  name: string
  value: number
}

export type Gen = {
  name: string
  description?: string
  category?: string
  rate?: 'audio' | 'control'
  imports: Import[]
  fields: Field[]
  constants: Constant[]
  parameters: Parameter[]
  control: Stmt[]
  variants: Variant[]
  audio: Stmt[]
  stereo: Stmt[]
  emit?: string[]
}

export type Specialization = {
  variantName: string
  paramModes: Record<string, 'scalar' | 'audio'>
}
