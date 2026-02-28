export type Loc = {
  start: number
  end: number
  line: number
  column: number
}

export type Program = {
  type: 'program'
  body: Stmt[]
  loc: Loc
}

export type SwitchCase = { test: Expr | null; body: Stmt[] } // test null = default

export type Stmt =
  | { type: 'block'; body: Stmt[]; loc: Loc }
  | { type: 'if'; test: Expr; then: Stmt; else?: Stmt; loc: Loc }
  | { type: 'while'; test: Expr; body: Stmt; loc: Loc }
  | { type: 'do'; body: Stmt; test: Expr; loc: Loc }
  | { type: 'for'; init: string; from: Expr; to: Expr; body: Stmt; loc: Loc }
  | { type: 'for-of'; value: string; index?: string; length?: string; iterable: Expr; body: Stmt; loc: Loc }
  | { type: 'switch'; test: Expr; cases: SwitchCase[]; loc: Loc }
  | { type: 'return'; value?: Expr; loc: Loc }
  | { type: 'break'; label?: string; loc: Loc }
  | { type: 'continue'; label?: string; loc: Loc }
  | { type: 'label'; name: string; stmt: Stmt; loc: Loc }
  | { type: 'throw'; value?: Expr; loc: Loc }
  | { type: 'try'; body: Stmt; catch?: { param: string; body: Stmt }; finally?: Stmt; loc: Loc }
  | { type: 'expr'; expr: Expr; loc: Loc }

export type Param =
  | { type: 'param'; name: string; loc: Loc }
  | { type: 'param-destructure'; names: string[]; loc: Loc }
  | { type: 'param-named-destructure'; paramName: string; names: string[]; loc: Loc }

export type Expr =
  | { type: 'number'; value: number; loc: Loc }
  | { type: 'string'; value: string; delimiter: 'single' | 'double' | 'backtick'; loc: Loc }
  | { type: 'identifier'; name: string; loc: Loc }
  | { type: 'fn'; params: Param[]; defaults?: Array<Expr | null>; body: Expr | Extract<Stmt, { type: 'block' }>; loc: Loc }
  | { type: 'array'; items: Expr[]; loc: Loc }
  | { type: 'index'; object: Expr; index: Expr; loc: Loc }
  | { type: 'unary'; op: string; expr: Expr; loc: Loc }
  | { type: 'binary'; op: string; left: Expr; right: Expr; loc: Loc }
  | { type: 'ternary'; test: Expr; then: Expr; else: Expr; loc: Loc }
  | { type: 'call'; callee: Expr; args: Arg[]; loc: Loc }
  | { type: 'member'; object: Expr; property: string; loc: Loc }
  | { type: 'destructure'; names: string[]; loc: Loc }
  | { type: 'assign'; op: '=' | ':=' | '=>' | '+=' | '-=' | '*=' | '/=' | '%=' | '**='; left: Expr; right: Expr; loc: Loc }

export type Arg =
  | { type: 'arg'; value: Expr; name?: string; shorthand?: boolean; loc: Loc }

export type FunctionCallInfo = {
  name: string
  astNode: Extract<Expr, { type: 'call' }>
  args: Record<string, Expr[]>
}

