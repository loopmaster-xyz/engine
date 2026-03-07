import type { Arg, Expr, Loc, Param, Program, Stmt } from './ast.ts'
import { controlPipeline } from './pipeline.ts'
import type { Token } from './token.ts'

export type ParseError = {
  message: string
  loc: Loc
  code: string
}

type ParseResult = {
  program: Program | null
  errors: ParseError[]
  preludeLines: number
}

const ASSIGN_OPS = new Set(['=', ':=', '=>', '+=', '-=', '*=', '/=', '%=', '**=', '&=', '|=', '^=', '<<=', '>>='])

const BIN_PREC: Record<string, { prec: number; right?: boolean }> = {
  // NOTE: '|>' is parsed separately (lowest precedence) so the RHS can be an assignment.
  '||': { prec: 2 },
  '&&': { prec: 3 },
  '|': { prec: 3.5 },
  '^': { prec: 3.7 },
  '&': { prec: 3.9 },
  '==': { prec: 4 },
  '!=': { prec: 4 },
  '<': { prec: 5 },
  '<=': { prec: 5 },
  '>': { prec: 5 },
  '>=': { prec: 5 },
  '<<': { prec: 5.5 },
  '>>': { prec: 5.5 },
  '+': { prec: 6 },
  '-': { prec: 6 },
  '*': { prec: 7 },
  '/': { prec: 7 },
  '%': { prec: 7 },
  '**': { prec: 8, right: true },
}

export function parse(input: string): ParseResult {
  const parsed = controlPipeline.parse(input)
  const errors = parsed.errors
  return {
    program: errors.length ? null : parsed.program,
    errors,
    preludeLines: parsed.preludeLines,
  }
}

export function parseTokens(input: string, tokens: Token[]): { program: Program | null; errors: ParseError[] } {
  const p = new Parser(input, tokens)
  let program: Program | null = null
  try {
    program = p.parseProgram()
  }
  catch (e) {
    // Error already added to p.errors before throwing
    if (p.errors.length === 0) {
      p.error('Parse error: ' + (e instanceof Error ? e.message : String(e)))
    }
  }
  return { program, errors: p.errors }
}

export function collectNumberLiterals(program: Program): Extract<Expr, { type: 'number' }>[] {
  const out: Extract<Expr, { type: 'number' }>[] = []
  const walkExpr = (e: Expr): void => {
    if (e.type === 'number') {
      out.push(e)
      return
    }
    switch (e.type) {
      case 'string':
      case 'identifier':
      case 'destructure':
        return
      case 'array':
        for (const it of e.items) walkExpr(it)
        return
      case 'object':
        for (const entry of e.entries) walkExpr(entry.value)
        return
      case 'index':
        walkExpr(e.object)
        walkExpr(e.index)
        return
      case 'member':
        walkExpr(e.object)
        return
      case 'unary':
        walkExpr(e.expr)
        return
      case 'binary':
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'ternary':
        walkExpr(e.test)
        walkExpr(e.then)
        walkExpr(e.else)
        return
      case 'call':
        walkExpr(e.callee)
        for (const a of e.args) {
          if (a.type === 'arg') walkExpr(a.value)
        }
        return
      case 'assign':
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'fn':
        for (const d of e.defaults ?? []) {
          if (d) walkExpr(d)
        }
        if (e.body.type === 'block') walkStmt(e.body)
        else walkExpr(e.body)
        return
      case 'switch':
        walkExpr(e.test)
        for (const c of e.cases) {
          if (c.test) walkExpr(c.test)
          for (const st of c.body) walkStmt(st)
        }
        return
      default:
        return
    }
  }
  const walkStmt = (s: Stmt): void => {
    switch (s.type) {
      case 'expr':
        walkExpr(s.expr)
        return
      case 'block':
        for (const it of s.body) walkStmt(it)
        return
      case 'if':
        walkExpr(s.test)
        walkStmt(s.then)
        if (s.else) walkStmt(s.else)
        return
      case 'while':
      case 'do':
        walkExpr(s.test)
        walkStmt(s.body)
        return
      case 'for':
        walkExpr(s.from)
        walkExpr(s.to)
        walkStmt(s.body)
        return
      case 'for-of':
        walkExpr(s.iterable)
        walkStmt(s.body)
        return
      case 'return':
      case 'throw':
        if (s.value) walkExpr(s.value)
        return
      case 'try':
        walkStmt(s.body)
        if (s.catch) walkStmt(s.catch.body)
        if (s.finally) walkStmt(s.finally)
        return
      case 'label':
        walkStmt(s.stmt)
        return
      case 'switch':
        walkExpr(s.test)
        for (const c of s.cases) {
          for (const st of c.body) walkStmt(st)
        }
        return
      case 'break':
      case 'continue':
        return
    }
  }
  for (const stmt of program.body) walkStmt(stmt)
  return out
}

class Parser {
  readonly errors: ParseError[] = []
  private pos = 0
  private guard = 0
  private guardMax: number
  private hasFatalError = false

  constructor(
    private input: string,
    private tokens: Token[],
  ) {
    // Hard guard to ensure the parser can never infinite-loop.
    this.guardMax = tokens.length * 16 + 1024
  }

  private checkUnmatchedBraces(): { message: string; token: Token } | null {
    let braceDepth = 0
    let parenDepth = 0
    let bracketDepth = 0
    const openBraces: Token[] = []
    const openParens: Token[] = []
    const openBrackets: Token[] = []

    for (let i = 0; i < this.tokens.length; i++) {
      const tok = this.tokens[i]
      if (tok.type === 'eof') break

      if (tok.type === 'punct') {
        const val = String(tok.value)
        if (val === '{') {
          braceDepth++
          openBraces.push(tok)
        }
        else if (val === '}') {
          braceDepth--
          if (braceDepth < 0) {
            return { message: `Unmatched closing brace "}"`, token: tok }
          }
          openBraces.pop()
        }
        else if (val === '(') {
          parenDepth++
          openParens.push(tok)
        }
        else if (val === ')') {
          parenDepth--
          if (parenDepth < 0) {
            return { message: `Unmatched closing parenthesis ")"`, token: tok }
          }
          openParens.pop()
        }
        else if (val === '[') {
          bracketDepth++
          openBrackets.push(tok)
        }
        else if (val === ']') {
          bracketDepth--
          if (bracketDepth < 0) {
            return { message: `Unmatched closing bracket "]"`, token: tok }
          }
          openBrackets.pop()
        }
      }
    }

    if (braceDepth > 0 && openBraces.length > 0) {
      const lastOpen = openBraces[openBraces.length - 1]
      return { message: `Unclosed brace "{"`, token: lastOpen }
    }
    if (parenDepth > 0 && openParens.length > 0) {
      const lastOpen = openParens[openParens.length - 1]
      return { message: `Unclosed parenthesis "("`, token: lastOpen }
    }
    if (bracketDepth > 0 && openBrackets.length > 0) {
      const lastOpen = openBrackets[openBrackets.length - 1]
      return { message: `Unclosed bracket "["`, token: lastOpen }
    }

    return null
  }

  private tick(): void {
    this.guard++
    if (this.guard > this.guardMax) {
      const braceError = this.checkUnmatchedBraces()
      if (braceError) {
        this.error(braceError.message, braceError.token)
      }
      else {
        this.error(
          'Parser exceeded max steps (possible infinite loop). Check for unmatched braces, parentheses, or brackets.',
        )
      }
      throw new Error('parse guard')
    }
  }

  private at(): Token {
    const t = this.tokens[this.pos]
    if (t === undefined) throw new Error('Parser invariant: pos out of range')
    return t
  }

  private prev(): Token {
    if (this.pos <= 0) throw new Error('Parser invariant: prev at start')
    return this.tokens[this.pos - 1]!
  }

  private is(type: Token['type'], value?: string): boolean {
    const t = this.at()
    if (t.type !== type) return false
    if (value === undefined) return true
    return t.value === value
  }

  private eat(type: Token['type'], value?: string): Token | null {
    const t = this.at()
    if (t.type !== type || (value !== undefined && t.value !== value)) return null
    this.pos++
    return t
  }

  private expect(type: Token['type'], value?: string, message?: string): Token {
    const t = this.at()
    if (t.type === type && (value === undefined || t.value === value)) {
      this.pos++
      return t
    }
    this.error(message ?? `Expected ${value ?? type}`)
    return t
  }

  error(message: string, tok = this.at()): void {
    this.errors.push({
      message,
      loc: { start: tok.start, end: tok.end, line: tok.line, column: tok.column },
      code: this.input.slice(tok.start, Math.min(this.input.length, tok.start + 80)),
    })
  }

  private locFrom(start: Token, end: Token): Loc {
    return { start: start.start, end: end.end, line: start.line, column: start.column }
  }

  parseProgram(): Program {
    // Check for unmatched braces early to provide better error messages
    const braceError = this.checkUnmatchedBraces()
    if (braceError) {
      this.error(braceError.message, braceError.token)
      this.hasFatalError = true
      // Stop parsing immediately to avoid infinite loops
      const start = this.at()
      const end = this.prev()
      throw new Error('parse error')
    }

    const start = this.at()
    const body: Stmt[] = []
    while (!this.is('eof') && !this.hasFatalError) {
      this.tick()
      if (this.is('punct', ';')) {
        this.pos++
        continue
      }
      const stmt = this.parseStmt()
      if (stmt) body.push(stmt)
      this.eat('punct', ';')
    }
    const end = this.prev()
    return { type: 'program', body, loc: this.locFrom(start, end) }
  }

  private syncStmt(): void {
    if (this.hasFatalError) return
    const startLine = this.at().line
    while (!this.is('eof') && !this.hasFatalError) {
      this.tick()
      if (this.is('punct', ';') || this.is('punct', '}')) return
      // In the editor we want error recovery to be cheap even when semicolons
      // are omitted. Stop recovery at the next line boundary.
      if (this.at().line > startLine) return
      this.pos++
    }
  }

  private isObjectDestructureAssignStart(): boolean {
    if (!this.is('punct', '{')) return false
    let i = this.pos + 1
    if (this.tokens[i]?.type === 'punct' && this.tokens[i]?.value === '}') {
      i++
      const opTok = this.tokens[i]
      return opTok?.type === 'operator' && ASSIGN_OPS.has(String(opTok.value))
    }
    while (i < this.tokens.length) {
      const tok = this.tokens[i]
      const isKey = tok?.type === 'identifier' || (tok?.type === 'keyword' && tok.value === 'in')
      if (!isKey) return false
      i++
      const sep = this.tokens[i]
      if (sep?.type === 'punct' && sep.value === ',') {
        i++
        continue
      }
      if (sep?.type === 'punct' && sep.value === '}') {
        i++
        const opTok = this.tokens[i]
        return opTok?.type === 'operator' && ASSIGN_OPS.has(String(opTok.value))
      }
      return false
    }
    return false
  }

  private parseStmt(): Stmt | null {
    if (this.hasFatalError) return null
    const t = this.at()

    if (!this.isObjectDestructureAssignStart() && this.eat('punct', '{')) {
      const body: Stmt[] = []
      while (!this.is('eof') && !this.is('punct', '}') && !this.hasFatalError) {
        this.tick()
        if (this.is('punct', ';')) {
          this.pos++
          continue
        }
        const stmt = this.parseStmt()
        if (stmt) body.push(stmt)
        this.eat('punct', ';')
      }
      if (this.hasFatalError) return null
      const endTok = this.expect('punct', '}', 'Unclosed block')
      return { type: 'block', body, loc: this.locFrom(t, endTok) }
    }

    if (this.eat('keyword', 'if')) {
      const start = t
      this.expect('punct', '(', 'Expected "(" after if')
      const test = this.parseExpr()
      this.expect('punct', ')', 'Expected ")" after if condition')
      const then = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }
      let elseBranch: Stmt | undefined
      if (this.eat('keyword', 'else')) {
        elseBranch = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }
      }
      const end = elseBranch ? elseBranch.loc : then.loc
      return { type: 'if', test, then, else: elseBranch,
        loc: { start: start.start, end: end.end, line: start.line, column: start.column } }
    }

    if (this.eat('keyword', 'while')) {
      const start = t
      this.expect('punct', '(', 'Expected "(" after while')
      const test = this.parseExpr()
      this.expect('punct', ')', 'Expected ")" after while condition')
      const body = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }
      return { type: 'while', test, body, loc: this.locFrom(start, this.prev()) }
    }

    if (this.eat('keyword', 'do')) {
      const start = t
      const body = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }
      this.expect('keyword', 'while', 'Expected "while" after do body')
      this.expect('punct', '(', 'Expected "(" after while')
      const test = this.parseExpr()
      this.expect('punct', ')', 'Expected ")" after while condition')
      return { type: 'do', body, test, loc: this.locFrom(start, this.prev()) }
    }

    if (this.eat('keyword', 'for')) {
      const start = t
      this.expect('punct', '(', 'Expected "(" after for')
      const nameTok = this.expect('identifier', undefined, 'Expected loop variable name')
      const name = String(nameTok.value)

      // Check for 'in' (range) or 'of' (iteration)
      if (this.eat('keyword', 'in')) {
        // for (i in start..end) - range loop
        const from = this.parseExpr()
        this.expect('operator', '..', 'Expected ".." range in for loop')
        const to = this.parseExpr()
        this.expect('punct', ')', 'Expected ")" after for loop')
        const body = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }

        return {
          type: 'for',
          init: name,
          from,
          to,
          body,
          loc: this.locFrom(start, this.prev()),
        }
      }
      else {
        // Check if it's for-of: for (value of array) or for (value, index, length of array)
        let indexName: string | undefined
        let lengthName: string | undefined

        // Check for optional index and length parameters before 'of'
        if (this.eat('punct', ',')) {
          const indexTok = this.expect('identifier', undefined, 'Expected index variable name')
          indexName = String(indexTok.value)

          if (this.eat('punct', ',')) {
            const lengthTok = this.expect('identifier', undefined, 'Expected length variable name')
            lengthName = String(lengthTok.value)
          }
        }

        // Now expect 'of'
        if (!this.eat('keyword', 'of')) {
          this.error('Expected "in" or "of" in for loop')
          return { type: 'block', body: [], loc: this.locFrom(start, start) }
        }

        const iterable = this.parseExpr()
        this.expect('punct', ')', 'Expected ")" after for-of loop')
        const body = this.parseStmt() ?? { type: 'block', body: [], loc: this.locFrom(this.prev(), this.prev()) }

        return {
          type: 'for-of',
          value: name,
          index: indexName,
          length: lengthName,
          iterable,
          body,
          loc: this.locFrom(start, this.prev()),
        }
      }
    }

    if (this.eat('keyword', 'return')) {
      const start = t
      if (this.is('punct', ';') || this.is('punct', '}') || this.is('eof')) {
        return { type: 'return', loc: this.locFrom(start, start) }
      }
      const value = this.parseExpr()
      return { type: 'return', value, loc: this.locFrom(start, this.prev()) }
    }

    if (this.eat('keyword', 'break')) {
      const start = t
      const label = this.is('identifier') ? String(this.at().value) : undefined
      if (label) this.pos++
      return { type: 'break', label, loc: this.locFrom(start, this.prev()) }
    }

    if (this.eat('keyword', 'continue')) {
      const start = t
      const label = this.is('identifier') ? String(this.at().value) : undefined
      if (label) this.pos++
      return { type: 'continue', label, loc: this.locFrom(start, this.prev()) }
    }

    if (this.eat('keyword', 'throw')) {
      const start = t
      if (this.is('punct', ';') || this.is('punct', '}') || this.is('eof')) {
        return { type: 'throw', loc: this.locFrom(start, start) }
      }
      const value = this.parseExpr()
      return { type: 'throw', value, loc: this.locFrom(start, this.prev()) }
    }


    if (this.eat('keyword', 'try')) {
      const start = t
      const body = this.parseStmt()
      if (!body) {
        this.error('Expected statement after try')
        return { type: 'block', body: [], loc: this.locFrom(start, start) }
      }

      let catchClause: { param: string; body: Stmt } | undefined
      let finallyClause: Stmt | undefined

      if (this.eat('keyword', 'catch')) {
        this.expect('punct', '(', 'Expected "(" after catch')
        const paramTok = this.expect('identifier', undefined, 'Expected parameter name in catch')
        const param = String(paramTok.value)
        this.expect('punct', ')', 'Expected ")" after catch parameter')
        const catchBody = this.parseStmt()
        if (!catchBody) {
          this.error('Expected statement after catch')
        }
        else {
          catchClause = { param, body: catchBody }
        }
      }

      if (this.eat('keyword', 'finally')) {
        const finallyBody = this.parseStmt()
        if (!finallyBody) {
          this.error('Expected statement after finally')
        }
        else {
          finallyClause = finallyBody
        }
      }

      if (!catchClause && !finallyClause) {
        this.error('try statement must have catch or finally clause')
      }

      return { type: 'try', body, catch: catchClause, finally: finallyClause, loc: this.locFrom(start, this.prev()) }
    }

    if (this.is('identifier') && this.tokens[this.pos + 1]?.type === 'punct'
      && this.tokens[this.pos + 1]?.value === ':')
    {
      const nameTok = this.eat('identifier')!
      this.eat('punct', ':')
      const stmt = this.parseStmt()
      if (!stmt) {
        this.error('Expected statement after label')
        this.syncStmt()
        return null
      }
      return { type: 'label', name: String(nameTok.value), stmt, loc: this.locFrom(nameTok, this.prev()) }
    }

    if (this.hasFatalError) {
      return null
    }
    try {
      const expr = this.parseExpr()
      return { type: 'expr', expr, loc: expr.loc }
    }
    catch {
      if (this.hasFatalError) {
        return null
      }
      this.syncStmt()
      return null
    }
  }

  private parseSwitch(start: Token): Extract<Stmt, { type: 'switch' }> {
    this.expect('punct', '(', 'Expected "(" after switch')
    const test = this.parseExpr()
    this.expect('punct', ')', 'Expected ")" after switch expression')
    this.expect('punct', '{', 'Expected "{" after switch')
    const cases: Array<{ test: Expr | null; body: Stmt[] }> = []
    while (!this.is('eof') && !this.is('punct', '}') && !this.hasFatalError) {
      this.tick()
      if (this.eat('keyword', 'case')) {
        const caseTest = this.parseExpr()
        this.expect('punct', ':', 'Expected ":" after case value')
        const body: Stmt[] = []
        while (!this.is('eof') && !this.is('punct', '}') && !this.is('keyword', 'case') && !this.is('keyword', 'default') && !this.hasFatalError) {
          this.tick()
          if (this.is('punct', ';')) {
            this.pos++
            continue
          }
          const stmt = this.parseStmt()
          if (stmt) body.push(stmt)
          this.eat('punct', ';')
        }
        cases.push({ test: caseTest, body })
        continue
      }
      if (this.eat('keyword', 'default')) {
        this.expect('punct', ':', 'Expected ":" after default')
        const body: Stmt[] = []
        while (!this.is('eof') && !this.is('punct', '}') && !this.is('keyword', 'case') && !this.hasFatalError) {
          this.tick()
          if (this.is('punct', ';')) {
            this.pos++
            continue
          }
          const stmt = this.parseStmt()
          if (stmt) body.push(stmt)
          this.eat('punct', ';')
        }
        cases.push({ test: null, body })
        continue
      }
      if (this.is('punct', ';')) {
        this.pos++
        continue
      }
      break
    }
    const endTok = this.expect('punct', '}', 'Unclosed switch block')
    return { type: 'switch', test, cases, loc: this.locFrom(start, endTok) }
  }

  private parseExpr(): Expr {
    return this.parsePipe()
  }

  // Lowest-precedence operator.
  // This allows patterns like `... |> hz=$` to parse as `... |> (hz = $)` (instead of `( ... |> hz ) = $`).
  private parsePipe(): Expr {
    const left = this.parseAssign()
    if (!this.eat('operator', '|>')) return left
    const opTok = this.prev()
    const right = this.parsePipe()
    return { type: 'binary', op: '|>', left, right, loc: this.locFrom(this.tokenFromLoc(left.loc), this.prev()) }
    void opTok
  }

  private parseAssign(): Expr {
    const left = this.parseTernary()

    if (this.is('operator') && ASSIGN_OPS.has(String(this.at().value))) {
      const opTok = this.at()
      // Check if left side is a potential destructuring pattern.
      let destructureLeft: Expr | null = null
      if (left.type === 'array' && left.items.every(item => item.type === 'identifier')) {
        // This looks like an array destructuring pattern - convert it.
        const names = left.items.map(item => (item as Extract<Expr, { type: 'identifier' }>).name)
        destructureLeft = { type: 'destructure', kind: 'array', names, loc: left.loc }
      }
      else if (
        left.type === 'object'
        && left.entries.every(entry => entry.value.type === 'identifier' && entry.value.name === entry.key)
      ) {
        // Shorthand/same-name object entries on assignment LHS are object destructuring.
        const names = left.entries.map(entry => entry.key)
        destructureLeft = { type: 'destructure', kind: 'object', names, loc: left.loc }
      }

      this.pos++
      const op = String(opTok.value)
      // Parse assignment RHS via parsePipe so both forms bind correctly:
      // - `a = b |> f($)` -> `a = (b |> f($))`
      // - `a |> b = $`    -> `a |> (b = $)`
      const right = this.parsePipe()
      return {
        type: 'assign',
        op: op as any,
        left: destructureLeft || left,
        right,
        loc: this.locFrom(
          (left as any).loc ? { ...opTok, start: left.loc.start, line: left.loc.line, column: left.loc.column } : opTok,
          this.prev(),
        ),
      }
    }
    return left
  }

  private parseTernary(): Expr {
    const test = this.parseBinary(0)
    if (!this.eat('punct', '?')) return test
    const then = this.parseExpr()
    this.expect('punct', ':', 'Expected ":" in ternary expression')
    const elseExpr = this.parseExpr()
    return { type: 'ternary', test, then, else: elseExpr, loc: this.locFrom(this.tokenFromLoc(test.loc), this.prev()) }
  }

  private parseBinary(minPrec: number): Expr {
    let left = this.parseUnary()
    while (true) {
      this.tick()
      const t = this.at()
      if (t.type !== 'operator') break
      const op = String(t.value)
      const info = BIN_PREC[op]
      if (!info) break
      if (info.prec < minPrec) break
      this.pos++
      const nextMin = info.right ? info.prec : info.prec + 1
      const right = this.parseBinary(nextMin)
      left = { type: 'binary', op, left, right, loc: this.locFrom(this.tokenFromLoc(left.loc), this.prev()) }
    }
    return left
  }

  private parseUnary(): Expr {
    const t = this.at()
    if (t.type === 'operator' && (t.value === '!' || t.value === '-' || t.value === '+')) {
      this.pos++
      const expr = this.parseUnary()
      return { type: 'unary', op: String(t.value), expr, loc: this.locFrom(t, this.prev()) }
    }
    return this.parsePostfix()
  }

  private parsePostfix(): Expr {
    let expr = this.parsePrimary()
    while (true) {
      this.tick()
      const before = this.pos
      if (this.eat('punct', '.')) {
        const prop = this.expect('identifier', undefined, 'Expected property name after "."')
        expr = { type: 'member', object: expr, property: String(prop.value),
          loc: this.locFrom(this.tokenFromLoc(expr.loc), prop) }
        continue
      }
      if (this.eat('punct', '[')) {
        const start = this.prev()
        const index = this.parseExpr()
        const end = this.expect('punct', ']', 'Expected "]" to close index')
        expr = { type: 'index', object: expr, index, loc: this.locFrom(this.tokenFromLoc(expr.loc), end) }
        void start
        continue
      }
      if (this.eat('punct', '(')) {
        const args: Arg[] = []
        const start = this.prev()
        while (!this.is('eof') && !this.is('punct', ')')) {
          this.tick()
          const argStart = this.at()
          if ((this.is('identifier') || (this.is('keyword') && this.at().value === 'in'))
            && this.tokens[this.pos + 1]?.type === 'punct' && this.tokens[this.pos + 1]?.value === ':')
          {
            const nameTok = this.at()
            this.pos++
            this.eat('punct', ':')
            const value = this.parseExpr()
            args.push({
              type: 'arg',
              name: String(nameTok.value),
              value,
              loc: this.locFrom(argStart, this.prev()),
            })
          }
          else {
            const value = this.parseExpr()
            const shorthand = value.type === 'identifier'
            args.push({
              type: 'arg',
              value,
              shorthand,
              loc: this.locFrom(argStart, this.prev()),
            })
          }
          if (!this.eat('punct', ',')) break
        }
        const end = this.expect('punct', ')', 'Expected ")" to close call')
        expr = { type: 'call', callee: expr, args, loc: this.locFrom(this.tokenFromLoc(expr.loc), end) }
        continue
      }
      if (this.pos === before) break
      break
    }
    return expr
  }

  private parsePrimary(): Expr {
    const t = this.at()

    if (t.type === 'number') {
      this.pos++
      return { type: 'number', value: Number(t.value), loc: this.locFrom(t, t) }
    }

    if (t.type === 'string') {
      this.pos++
      const delimiter = t.stringDelimiter ?? 'double'
      return { type: 'string', value: String(t.value), delimiter, loc: this.locFrom(t, t) }
    }

    if (t.type === 'keyword') {
      if (t.value === 'if') {
        const start = t
        this.pos++
        this.expect('punct', '(', 'Expected "(" after if')
        const test = this.parseExpr()
        this.expect('punct', ')', 'Expected ")" after if condition')
        const then = this.parseExpr()
        this.expect('keyword', 'else', 'Expected "else" in if expression')
        const elseExpr = this.parseExpr()
        return { type: 'ternary', test, then, else: elseExpr, loc: this.locFrom(start, this.prev()) }
      }
      if (t.value === 'switch') {
        this.pos++
        return this.parseSwitch(t)
      }
      if (t.value === 'true' || t.value === 'false' || t.value === 'null') {
        this.pos++
        const v = t.value === 'true'
          ? 1
          : t.value === 'false'
          ? 0
          : 0
        return { type: 'number', value: v, loc: this.locFrom(t, t) }
      }
      // Allow 'in' as identifier in expression context
      if (t.value === 'in') {
        const nameTok = t
        const name = String(t.value)
        const next = this.tokens[this.pos + 1]
        if (next?.type === 'operator' && next.value === '->') {
          this.pos += 2
          const body = this.parseFnBody()
          const param: Param = { type: 'param', name, loc: this.locFrom(nameTok, nameTok) }
          return { type: 'fn', params: [param], defaults: [null], body, loc: this.locFrom(nameTok, this.prev()) }
        }
        this.pos++
        return { type: 'identifier', name, loc: this.locFrom(nameTok, nameTok) }
      }
    }

    if (t.type === 'identifier') {
      const nameTok = t
      const name = String(t.value)
      const next = this.tokens[this.pos + 1]
      if (next?.type === 'operator' && next.value === '->') {
        this.pos += 2
        const body = this.parseFnBody()
        const param: Param = { type: 'param', name, loc: this.locFrom(nameTok, nameTok) }
        return { type: 'fn', params: [param], defaults: [null], body, loc: this.locFrom(nameTok, this.prev()) }
      }
      this.pos++
      return { type: 'identifier', name, loc: this.locFrom(nameTok, nameTok) }
    }

    if (this.eat('punct', '[')) {
      const start = t

      if (this.eat('punct', ']')) {
        const end = this.prev()
        return { type: 'array', items: [], loc: this.locFrom(start, end) }
      }

      const first = this.parseExpr()

      // Range array literal sugar: [start..end] -> range(start, end)
      if (this.eat('operator', '..')) {
        const to = this.parseExpr()
        const end = this.expect('punct', ']', 'Expected "]" to close range array literal')
        const callee: Extract<Expr, { type: 'identifier' }> = {
          type: 'identifier',
          name: 'range',
          loc: this.locFrom(start, start),
        }
        return {
          type: 'call',
          callee,
          args: [
            { type: 'arg', value: first, loc: first.loc },
            { type: 'arg', value: to, loc: to.loc },
          ],
          loc: this.locFrom(start, end),
        }
      }

      const items: Expr[] = [first]
      while (!this.is('eof') && !this.is('punct', ']')) {
        if (!this.eat('punct', ',')) break
        if (this.is('punct', ']')) break
        items.push(this.parseExpr())
      }
      const end = this.expect('punct', ']', 'Expected "]" to close array literal')
      return { type: 'array', items, loc: this.locFrom(start, end) }
    }

    if (this.eat('punct', '{')) {
      const start = t
      const entries: Array<{ key: string; value: Expr; shorthand: boolean; loc: Loc }> = []
      const seen = new Set<string>()

      while (!this.is('eof') && !this.is('punct', '}')) {
        const entryStart = this.at()
        const keyToken = this.at()
        let key: string
        let value: Expr
        let shorthand = false

        if (this.is('string')) {
          key = String(this.at().value)
          this.pos++
          this.expect('punct', ':', 'Expected ":" after object key')
          value = this.parseExpr()
        }
        else if (this.is('identifier') || (this.is('keyword') && this.at().value === 'in')) {
          key = String(this.at().value)
          const keyLoc = this.locFrom(this.at(), this.at())
          this.pos++
          if (this.eat('punct', ':')) {
            value = this.parseExpr()
          }
          else {
            shorthand = true
            value = { type: 'identifier', name: key, loc: keyLoc }
          }
        }
        else {
          this.error('Expected object key', this.at())
          this.hasFatalError = true
          throw new Error('parse error')
        }

        if (seen.has(key)) {
          this.error(`Duplicate object key: ${key}`, keyToken)
        }
        seen.add(key)
        entries.push({ key, value, shorthand, loc: this.locFrom(entryStart, this.prev()) })

        if (!this.eat('punct', ',')) break
        if (this.is('punct', '}')) break
      }

      const end = this.expect('punct', '}', 'Expected "}" to close object literal')
      return { type: 'object', entries, loc: this.locFrom(start, end) }
    }

    if (this.eat('punct', '(')) {
      const startPos = this.pos
      const start = this.prev()
      const parsedParams = this.tryParseFnParamsUntilCloseParen()
      if (parsedParams) {
        const arrow = this.at()
        if (arrow.type === 'operator' && arrow.value === '->') {
          this.pos++
          const body = this.parseFnBody()
          return { type: 'fn', params: parsedParams.params, defaults: parsedParams.defaults, body,
            loc: this.locFrom(start, this.prev()) }
        }
        // Not a function, rewind and parse as a grouped expression.
        this.pos = startPos
      }
      // Grouped expression.
      const expr = this.parseExpr()
      this.expect('punct', ')', 'Expected ")"')
      return { ...expr, loc: this.locFrom(start, this.prev()) }
    }

    this.error('Unexpected token in expression')
    this.hasFatalError = true
    throw new Error('parse error')
  }

  private parseFnBody(): Extract<Stmt, { type: 'block' }> | Expr {
    if (this.is('punct', '{')) {
      return this.parseStmt() as Extract<Stmt, { type: 'block' }>
    }
    return this.parsePipe()
  }

  private tryParseFnParamsUntilCloseParen(): { params: Param[]; defaults: Array<Expr | null> } | null {
    const startPos = this.pos
    const params: Param[] = []
    const defaults: Array<Expr | null> = []
    if (this.eat('punct', ')')) return { params, defaults }
    while (!this.is('eof')) {
      this.tick()
      const paramStart = this.at()

      // Check for destructuring: [a, b, c] / {a, b, c} or name:[a, b] / name:{a, b}
      if (this.is('punct', '[') || this.is('punct', '{')) {
        const open = String(this.at().value)
        const kind = open === '[' ? 'array' as const : 'object' as const
        const close = open === '[' ? ']' : '}'
        this.pos++
        const names: string[] = []
        while (!this.is('eof') && !this.is('punct', close)) {
          if (!this.is('identifier') && !(this.is('keyword') && this.at().value === 'in')) {
            this.pos = startPos
            return null
          }
          names.push(String(this.at().value))
          this.pos++
          if (!this.eat('punct', ',')) break
        }
        if (!this.eat('punct', close)) {
          this.pos = startPos
          return null
        }
        const param: Param = { type: 'param-destructure', kind, names, loc: this.locFrom(paramStart, this.prev()) }
        params.push(param)
      }
      // Regular identifier parameter or named destructuring: name:[a, b]
      // Allow 'in' as identifier in parameter context
      else if (this.is('identifier') || (this.is('keyword') && this.at().value === 'in')) {
        const name = String(this.at().value)
        this.pos++

        // Check for named destructuring: name:[a, b] / name:{a, b}
        if (this.eat('punct', ':') && (this.is('punct', '[') || this.is('punct', '{'))) {
          const open = String(this.at().value)
          const kind = open === '[' ? 'array' as const : 'object' as const
          const close = open === '[' ? ']' : '}'
          this.pos++
          const names: string[] = []
          while (!this.is('eof') && !this.is('punct', close)) {
            if (!this.is('identifier') && !(this.is('keyword') && this.at().value === 'in')) {
              this.pos = startPos
              return null
            }
            names.push(String(this.at().value))
            this.pos++
            if (!this.eat('punct', ',')) break
          }
          if (!this.eat('punct', close)) {
            this.pos = startPos
            return null
          }
          const param: Param = { type: 'param-named-destructure', kind, paramName: name, names,
            loc: this.locFrom(paramStart, this.prev()) }
          params.push(param)
        }
        // Regular parameter
        else {
          const param: Param = { type: 'param', name, loc: this.locFrom(paramStart, this.prev()) }
          params.push(param)
        }
      }
      else {
        this.pos = startPos
        return null
      }

      let def: Expr | null = null
      if (this.eat('operator', '=')) {
        // Allow empty default while typing: (d=)
        if (!this.is('punct', ',') && !this.is('punct', ')')) {
          const errLen = this.errors.length
          const before = this.pos
          try {
            def = this.parseExpr()
          }
          catch {
            // Keep it a non-function parse if default expr can't be parsed.
            this.errors.length = errLen
            this.pos = startPos
            return null
          }
          // If we somehow didn't advance, treat as not-a-function to avoid hangs.
          if (this.pos === before) {
            this.errors.length = errLen
            this.pos = startPos
            return null
          }
          this.errors.length = errLen
        }
      }
      defaults.push(def)
      if (this.eat('punct', ',')) {
        // Allow trailing comma in parameter list: (a, b=1,)
        if (this.eat('punct', ')')) return { params, defaults }
        continue
      }
      if (this.eat('punct', ')')) return { params, defaults }
      this.pos = startPos
      return null
    }
    this.pos = startPos
    return null
  }

  private tokenFromLoc(loc: Loc): Token {
    const t = this.at()
    return { ...t, start: loc.start, end: loc.end, line: loc.line, column: loc.column }
  }
}
