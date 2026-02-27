import { Constant, Expr, Field, Gen, Import, Parameter, Stmt, Variant } from './ast.ts'
import { Token, tokenize } from './lexer.ts'

export class ParseError extends Error {
  constructor(message: string, public pos: number, public tokens: Token[]) {
    super(message)
    this.name = 'ParseError'
  }

  get location(): string {
    const token = this.tokens[this.pos - 1] || this.tokens[0]
    if (!token) return 'unknown'

    // Show context: 3 tokens before and after
    const start = Math.max(0, this.pos - 4)
    const end = Math.min(this.tokens.length, this.pos + 3)
    const context = this.tokens.slice(start, end).map((t, i) => {
      const idx = start + i
      const marker = idx === this.pos - 1 ? ' <--' : ''
      return `${t.type}${t.value !== null ? `(${t.value})` : ''}${marker}`
    }).join(' ')

    return `at token "${token.type}${token.value !== null ? `(${token.value})` : ''}"\n  Context: ${context}`
  }
}

export class Parser {
  private tokens: Token[] = []
  private pos = 0

  parse(input: string): Gen {
    this.tokens = tokenize(input)
    this.pos = 0

    const gen: Partial<Gen> = {
      imports: [],
      fields: [],
      constants: [],
      parameters: [],
      control: [],
      variants: [],
      audio: [],
      stereo: [],
    }

    while (!this.isEof()) {
      this.skipNewlines()
      if (this.isEof()) break

      if (this.match('keyword', 'name')) {
        this.match('operator', ':') // Optional colon
        gen.name = this.expectIdentifier()
        continue
      }

      if (this.match('identifier', 'description')) {
        this.expect('operator', ':')
        const value = this.parseValue()
        if (typeof value === 'string') {
          gen.description = value
        }
        else {
          this.error('Description must be a string')
        }
        continue
      }

      if (this.match('identifier', 'category')) {
        this.expect('operator', ':')
        const value = this.parseValue()
        if (typeof value === 'string') {
          gen.category = value
        }
        else {
          this.error('Category must be a string')
        }
        continue
      }

      if (this.match('identifier', 'rate')) {
        this.expect('operator', ':')
        const value = this.parseValue()
        if (typeof value === 'string') {
          if (value === 'audio' || value === 'control') {
            gen.rate = value
          }
          else {
            this.error(`Rate must be 'audio' or 'control', got '${value}'`)
          }
        }
        else {
          this.error('Rate must be a string')
        }
        continue
      }

      if (this.match('keyword', 'import')) {
        gen.imports = gen.imports || []
        gen.imports.push(this.parseImport())
        continue
      }

      if (this.match('keyword', 'fields')) {
        gen.fields = this.parseFields()
        continue
      }

      if (this.match('keyword', 'constants')) {
        gen.constants = this.parseConstants()
        continue
      }

      if (this.match('keyword', 'parameters')) {
        gen.parameters = this.parseParameters()
        continue
      }

      if (this.match('keyword', 'control')) {
        const { control, variants } = this.parseControl()
        gen.control = control
        gen.variants = variants
        continue
      }

      if (this.match('keyword', 'audio')) {
        gen.audio = this.parseAudio()
        continue
      }

      if (this.match('keyword', 'stereo')) {
        gen.stereo = this.parseStereo()
        continue
      }

      if (this.match('keyword', 'emit')) {
        gen.emit = this.parseEmit()
        continue
      }

      this.error(`Unexpected token: ${this.peek()?.type}`)
    }

    if (!gen.name) {
      this.error('Missing name declaration')
    }

    return gen as Gen
  }

  private parseImport(): Import {
    this.expect('brace', '{')
    const names: string[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed import statement')

      const name = this.expectIdentifier()
      names.push(name)

      this.skipNewlines()
      if (!this.match('comma')) {
        this.expect('brace', '}')
        break
      }
    }

    return { names }
  }

  private parseFields(): Field[] {
    this.expect('brace', '{')
    const fields: Field[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed fields block')

      const name = this.expectIdentifier()
      this.expect('operator', ':')

      // Parse the rest of the line as a literal string
      // Read tokens until newline or closing brace, preserving spaces
      let value = ''
      let lastTokenType: string | null = null

      while (true) {
        const token = this.peek()
        if (!token || token.type === 'eof') break

        // Stop at newline - consume it and break
        if (token.type === 'newline') {
          this.advance()
          break
        }

        // Stop at closing brace - don't consume it, let outer loop handle it
        if (token.type === 'brace' && (token as any).value === '}') {
          break
        }

        // Add space between tokens if needed
        if (value && lastTokenType && this.needsSpace(lastTokenType, token.type)) {
          value += ' '
        }

        // Get the raw token text
        const tokenText = this.getTokenText(token)
        value += tokenText
        lastTokenType = token.type
        this.advance()
      }

      fields.push({ name, value: value.trim() })
    }

    return fields
  }

  private parseConstants(): Constant[] {
    this.expect('brace', '{')
    const constants: Constant[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed constants block')

      const name = this.expectIdentifier()
      if (!this.match('equals', '=')) {
        this.error('Expected = after constant name')
      }
      const value = this.parseValue()
      if (typeof value !== 'number') {
        this.error('Constant value must be a number')
      }
      constants.push({ name, value })
    }

    return constants
  }

  private parseEmit(): string[] {
    this.expect('brace', '{')
    const emit: string[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed emit block')

      const name = this.expectIdentifier()
      emit.push(name)
    }

    return emit
  }

  private getTokenText(token: Token): string {
    if (token.type === 'identifier') return (token as any).value
    if (token.type === 'number') return (token as any).value.toString()
    if (token.type === 'string') return `"${(token as any).value}"`
    if (token.type === 'keyword') return (token as any).value
    if (token.type === 'operator') return (token as any).value
    if (token.type === 'brace') return (token as any).value
    if (token.type === 'paren') return (token as any).value
    if (token.type === 'bracket') return (token as any).value
    if (token.type === 'equals') return '='
    if (token.type === 'comma') return ','
    if (token.type === 'semicolon') return ';'
    return ''
  }

  private needsSpace(lastType: string, currentType: string): boolean {
    const lastToken = this.tokens[this.pos - 1]
    const currentToken = this.peek()

    // Don't add space after operators that don't need it
    if (lastType === 'operator' && lastToken && ['(', '[', '.'].includes((lastToken as any)?.value)) {
      return false
    }
    // Don't add space before operators that don't need it
    if (currentType === 'operator' && currentToken && [')', ']', '.', ','].includes((currentToken as any)?.value)) {
      return false
    }
    // Don't add space before opening parens/brackets
    if (currentType === 'paren' && (currentToken as any)?.value === '(') {
      return false
    }
    if (currentType === 'bracket' && (currentToken as any)?.value === '[') {
      return false
    }
    // Don't add space after closing parens/brackets
    if (lastType === 'paren' && lastToken && (lastToken as any)?.value === ')') {
      return false
    }
    if (lastType === 'bracket' && lastToken && (lastToken as any)?.value === ']') {
      return false
    }

    // Add space between keywords, identifiers, numbers, and before/after equals
    const needsSpaceBefore = ['keyword', 'identifier', 'number']
    const needsSpaceAfter = ['keyword', 'identifier', 'number', 'equals']

    return needsSpaceAfter.includes(lastType) && (needsSpaceBefore.includes(currentType) || currentType === 'equals')
  }

  private parseParameters(): Parameter[] {
    this.expect('brace', '{')
    const params: Parameter[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed parameters block')

      const name = this.expectIdentifier()

      const param: Partial<Parameter> = { name }

      if (this.match('brace', '{')) {
        while (!this.match('brace', '}')) {
          this.skipNewlines()
          const key = this.expectIdentifierOrKeyword()
          if (!this.match('operator', ':') && !this.match('equals', '=')) {
            this.error('Expected : or = after parameter key')
          }
          const value = this.parseValue()
          if (key === 'default') param.default = value as number
          else if (key === 'min') param.min = value as number
          else if (key === 'max') param.max = value as number
          else if (key === 'unit') param.unit = value as string
          else if (key === 'description') param.description = value as string
          else if (key === 'types') {
            if (Array.isArray(value)) {
              const types = value as string[]
              if (types.every(t => t === 'scalar' || t === 'audio')) {
                param.types = types as ('scalar' | 'audio')[]
              }
              else {
                this.error('types must be an array of "scalar" and/or "audio"')
              }
            }
            else {
              this.error('types must be an array')
            }
          }
          else if (key === 'curve') {
            const curveValue = value as string
            if (curveValue === 'linear' || curveValue === 'exp2') {
              param.curve = curveValue as 'linear' | 'exp2'
            }
            else {
              this.error(`Invalid curve value: ${curveValue}. Must be "linear" or "exp2"`)
            }
          }

          this.match('comma')
        }
      }

      params.push(param as Parameter)
    }

    return params
  }

  private parseControl(): { control: Stmt[]; variants: Variant[] } {
    this.expect('brace', '{')
    const control: Stmt[] = []
    const variants: Variant[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed control block')

      if (this.match('keyword', 'variant')) {
        const variantName = this.expectIdentifier()
        const variantDescription = this.match('string') ? (this.previous() as any).value as string : undefined
        this.expect('brace', '{')
        const variantStmts: Stmt[] = []

        while (true) {
          this.skipNewlines()
          if (this.match('brace', '}')) break
          if (this.isEof()) this.error('Unclosed variant block')
          variantStmts.push(this.parseStatement())
        }

        variants.push({ name: variantName, description: variantDescription, stmts: variantStmts })
        continue
      }

      control.push(this.parseStatement())
    }

    return { control, variants }
  }

  private parseAudio(): Stmt[] {
    this.expect('brace', '{')
    const stmts: Stmt[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed audio block')
      stmts.push(this.parseStatement())
    }

    return stmts
  }

  private parseStereo(): Stmt[] {
    this.expect('brace', '{')
    const stmts: Stmt[] = []

    while (true) {
      this.skipNewlines()
      if (this.match('brace', '}')) break
      if (this.isEof()) this.error('Unclosed stereo block')
      stmts.push(this.parseStatement())
    }

    return stmts
  }

  private parseStatement(): Stmt {
    this.skipNewlines()

    if (this.match('keyword', 'if')) {
      const condition = this.parseExpression()
      this.expect('brace', '{')
      const thenBranch: Stmt[] = []
      while (true) {
        this.skipNewlines()
        if (this.match('brace', '}')) break
        if (this.isEof()) this.error('Unclosed if block')
        thenBranch.push(this.parseStatement())
      }

      // Check for else if or else block
      this.skipNewlines()
      let elseBranch: Stmt[] | undefined
      if (this.match('keyword', 'else')) {
        this.skipNewlines()
        // Check for else if
        if (this.peek()?.type === 'keyword' && (this.peek() as any).value === 'if') {
          // Parse else if as a nested if statement
          elseBranch = [this.parseStatement()]
        } else {
          this.expect('brace', '{')
          elseBranch = []
          while (true) {
            this.skipNewlines()
            if (this.match('brace', '}')) break
            if (this.isEof()) this.error('Unclosed else block')
            elseBranch.push(this.parseStatement())
          }
        }
      }

      return { type: 'if', condition, thenBranch, elseBranch }
    }

    if (this.match('keyword', 'for')) {
      const varName = this.expectIdentifier()
      if (!this.match('keyword', 'in')) {
        this.error('Expected "in" after for variable')
      }
      const iterable = this.parseExpression()
      this.expect('brace', '{')
      const body: Stmt[] = []
      while (!this.match('brace', '}')) {
        this.skipNewlines()
        if (this.isEof()) this.error('Unclosed for loop')
        body.push(this.parseStatement())
      }
      return { type: 'forIn', varName, iterable, body }
    }

    if (this.match('keyword', 'switch')) {
      const expr = this.parseExpression()
      this.expect('brace', '{')
      const cases: { value: Expr | null; stmts: Stmt[] }[] = []

      while (true) {
        this.skipNewlines()
        if (this.match('brace', '}')) break
        if (this.isEof()) this.error('Unclosed switch block')

        let caseValue: Expr | null = null
        if (this.match('keyword', 'case')) {
          caseValue = this.parseExpression()
          this.expect('operator', ':')
        } else if (this.match('keyword', 'default')) {
          this.expect('operator', ':')
        } else {
          this.error('Expected "case" or "default" in switch block')
        }

        const stmts: Stmt[] = []
        while (true) {
          this.skipNewlines()
          const next = this.peek()
          if (!next || next.type === 'eof') this.error('Unclosed switch case')
          if (next.type === 'brace' && (next as any).value === '}') break
          if (next.type === 'keyword' && ((next as any).value === 'case' || (next as any).value === 'default')) break
          stmts.push(this.parseStatement())
        }

        cases.push({ value: caseValue, stmts })
      }

      return { type: 'switch', expr, cases }
    }

    if (this.match('keyword', 'break')) {
      return { type: 'break' }
    }

    if (this.match('keyword', 'continue')) {
      return { type: 'continue' }
    }

    // Try to parse as assignment first
    const savedPos = this.pos
    if (this.match('identifier')) {
      const name = (this.previous() as any).value

      // Check if this is an assignment (has = or +=, -=, etc.)
      if (this.match('equals', '=')) {
        const expr = this.parseExpression()
        return { type: 'assign', name, expr }
      }

      // Check for compound assignment operators (+=, -=, *=, /=)
      const nextToken = this.peek()
      if (nextToken?.type === 'operator' && ['+', '-', '*', '/'].includes((nextToken as any).value)) {
        const op = (nextToken as any).value
        this.advance() // consume the operator
        if (this.match('equals', '=')) {
          // Parse as: name = name op expr
          const rightExpr = this.parseExpression()
          const leftExpr: Expr = { type: 'identifier', name }
          const opExpr: Expr = { type: 'binary', op, left: leftExpr, right: rightExpr }
          return { type: 'assign', name, expr: opExpr }
        }
        // If no = after operator, it's just a binary expression
        this.pos = savedPos
        const expr = this.parseExpression()
        return { type: 'expr', expr }
      }

      // Otherwise, it's an expression statement (like a method call)
      // We need to parse the rest as an expression starting from the identifier
      this.pos = savedPos // Go back to before we matched the identifier
      const expr = this.parseExpression()
      return { type: 'expr', expr }
    }

    this.error('Expected statement')
  }

  private parseExpression(): Expr {
    return this.parseTernary()
  }

  private parseTernary(): Expr {
    let expr = this.parseBinary(0)

    if (this.match('operator', '?')) {
      const condition = expr
      this.skipNewlines()
      const trueExpr = this.parseTernary()
      this.expect('operator', ':')
      this.skipNewlines()
      const falseExpr = this.parseTernary()
      return { type: 'ternary', condition, trueExpr, falseExpr }
    }

    return expr
  }

  private parseBinary(precedence: number): Expr {
    let left = this.parseUnary()

    while (true) {
      this.skipNewlines()
      const op = this.peek()
      if (op?.type !== 'operator') break

      // Don't treat ? or : as binary operators - they're for ternary
      if (op.value === '?' || op.value === ':') break

      const opPrec = this.getPrecedence(op.value)
      if (opPrec < precedence) break

      this.advance()
      this.skipNewlines()
      const right = this.parseBinary(opPrec + 1)
      left = { type: 'binary', op: op.value, left, right }
    }

    return left
  }

  private parseUnary(): Expr {
    if (this.match('operator', '-') || this.match('operator', '+') || this.match('operator', '!')) {
      const op = this.previous()?.value as string
      return { type: 'unary', op, expr: this.parseUnary() }
    }

    return this.parsePrimary()
  }

  private parsePrimary(): Expr {
    this.skipNewlines()

    if (this.match('number')) {
      return { type: 'number', value: (this.previous() as any).value }
    }

    if (this.match('string')) {
      return { type: 'string', value: (this.previous() as any).value }
    }

    if (this.match('keyword', 'new')) {
      const name = this.expectIdentifier()
      this.expect('paren', '(')
      const args: Expr[] = []
      if (!this.match('paren', ')')) {
        do {
          args.push(this.parseExpression())
        }
        while (this.match('comma'))
        this.expect('paren', ')')
      }
      return { type: 'call', name, args, isNew: true } as any
    }

    if (this.match('identifier')) {
      const name = (this.previous() as any).value

      if (this.match('paren', '(')) {
        const args: Expr[] = []
        if (!this.match('paren', ')')) {
          do {
            args.push(this.parseExpression())
          }
          while (this.match('comma'))
          this.expect('paren', ')')
        }
        return { type: 'call', name, args }
      }

      if (this.match('operator', '.')) {
        const property = this.expectIdentifier()

        // Check if there's a call immediately after (e.g., a.b())
        if (this.match('paren', '(')) {
          const args: Expr[] = []
          if (!this.match('paren', ')')) {
            do {
              args.push(this.parseExpression())
            }
            while (this.match('comma'))
            this.expect('paren', ')')
          }
          // Method call: object is the identifier, method name is the property
          return { type: 'call', name: property, args, object: { type: 'identifier', name } } as any
        }

        // Regular member access
        let memberExpr: Expr = { type: 'member', object: { type: 'identifier', name }, property }
        // Handle chained member access (e.g., a.b.c)
        while (this.match('operator', '.')) {
          const nextProperty = this.expectIdentifier()
          // Check if there's a call after this member access
          if (this.match('paren', '(')) {
            const args: Expr[] = []
            if (!this.match('paren', ')')) {
              do {
                args.push(this.parseExpression())
              }
              while (this.match('comma'))
              this.expect('paren', ')')
            }
            // Method call on member: object is the member expression, method name is the property
            return { type: 'call', name: nextProperty, args, object: memberExpr } as any
          }
          memberExpr = { type: 'member', object: memberExpr, property: nextProperty }
        }

        return memberExpr
      }

      // Check if there's a call (e.g., func())
      if (this.match('paren', '(')) {
        const args: Expr[] = []
        if (!this.match('paren', ')')) {
          do {
            args.push(this.parseExpression())
          }
          while (this.match('comma'))
          this.expect('paren', ')')
        }
        return { type: 'call', name, args }
      }

      return { type: 'identifier', name }
    }

    if (this.match('paren', '(')) {
      const expr = this.parseExpression()
      this.expect('paren', ')')
      return expr
    }

    this.error('Unexpected token in expression')
  }

  private getPrecedence(op: string): number {
    switch (op) {
      case '*':
      case '/':
      case '%':
        return 5
      case '+':
      case '-':
        return 4
      case '<':
      case '>':
      case '<=':
      case '>=':
      case '==':
      case '!=':
        return 3
      case '&&':
        return 2
      case '||':
        return 1
      default:
        return 0
    }
  }

  private parseValue(): string | number | (string | number)[] {
    if (this.match('operator', '-') && this.peek()?.type === 'number') {
      this.advance()
      return -(this.previous() as any).value
    }
    if (this.match('number')) {
      return (this.previous() as any).value
    }
    if (this.match('string')) {
      return (this.previous() as any).value
    }
    if (this.match('bracket', '[')) {
      const values: (string | number)[] = []
      if (!this.match('bracket', ']')) {
        do {
          this.skipNewlines()
          if (this.match('number')) {
            values.push((this.previous() as any).value)
          }
          else if (this.match('string')) {
            values.push((this.previous() as any).value)
          }
          else if (this.match('identifier') || this.match('keyword')) {
            values.push((this.previous() as any).value)
          }
          else {
            this.error('Expected value in array')
          }
          this.skipNewlines()
        }
        while (this.match('comma'))
        this.expect('bracket', ']')
      }
      return values
    }
    this.error('Expected value')
  }

  private skipNewlines() {
    while (this.match('newline')) {}
  }

  private match(type: Token['type'], value?: any): boolean {
    const token = this.peek()
    if (token?.type === type && (value === undefined || (token as any).value === value)) {
      this.advance()
      return true
    }
    return false
  }

  private expect(type: Token['type'], value?: any): Token {
    if (this.match(type, value)) {
      return this.previous()!
    }
    const current = this.peek()
    const expected = `${type}${value ? `(${value})` : ''}`
    const found = current ? `${current.type}${current.value !== null ? `(${current.value})` : ''}` : 'EOF'
    this.error(`Expected ${expected}, but found ${found}`)
  }

  private expectIdentifier(): string {
    const token = this.expect('identifier')
    return (token as any).value
  }

  private expectIdentifierOrKeyword(): string {
    const token = this.peek()
    if (token?.type === 'identifier') {
      this.advance()
      return (token as any).value
    }
    if (token?.type === 'keyword') {
      this.advance()
      return (token as any).value
    }
    this.error('Expected identifier or keyword')
  }

  private peek(): Token | null {
    if (this.pos >= this.tokens.length) return null
    return this.tokens[this.pos]
  }

  private previous(): Token | null {
    if (this.pos === 0) return null
    return this.tokens[this.pos - 1]
  }

  private advance(): Token {
    if (this.pos >= this.tokens.length) return { type: 'eof', value: null }
    return this.tokens[this.pos++]
  }

  private isEof(): boolean {
    return this.pos >= this.tokens.length || this.tokens[this.pos]?.type === 'eof'
  }

  private error(message: string): never {
    throw new ParseError(message, this.pos, this.tokens)
  }
}

export function parse(input: string): Gen {
  const parser = new Parser()
  return parser.parse(input)
}
