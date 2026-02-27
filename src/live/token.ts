import type { Loc } from './ast.ts'

export type TokenType =
  | 'number'
  | 'string'
  | 'identifier'
  | 'keyword'
  | 'operator'
  | 'punct'
  | 'eof'

export type Token = {
  type: TokenType
  value: string | number | null
  start: number
  end: number
  line: number
  column: number
  stringDelimiter?: 'single' | 'double' | 'backtick'
}

const KEYWORDS = new Set([
  'if',
  'else',
  'for',
  'while',
  'do',
  'break',
  'continue',
  'return',
  'switch',
  'case',
  'default',
  'try',
  'catch',
  'finally',
  'throw',
  'true',
  'false',
  'null',
  'in',
  'of',
])

const OPS = [
  '>>>',
  '>>=',
  '<<=',
  '**=',
  '&=',
  '|=',
  '^=',
  '=>',
  '..',
  '==',
  '!=',
  '<=',
  '>=',
  '&&',
  '||',
  '|>',
  '->',
  ':=',
  '<<',
  '>>',
  '**',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
] as const

const SINGLE_OPS = new Set([
  '=',
  '<',
  '>',
  '+',
  '-',
  '*',
  '/',
  '%',
  '!',
  '&',
  '|',
  '^',
  '~',
])

const PUNCT = new Set(['(', ')', '{', '}', '[', ']', ',', ';', ':', '.', '?'])

export type LexError = {
  message: string
  loc: Loc
  code: string
}

export function tokenize(input: string): { tokens: Token[]; errors: LexError[] } {
  const tokens: Token[] = []
  const errors: LexError[] = []
  let i = 0
  let line = 1
  let column = 1
  let guard = 0
  const guardMax = input.length * 4 + 1024

  const push = (type: TokenType, value: Token['value'], start: number, end: number, l: number, c: number,
    stringDelimiter?: Token['stringDelimiter']) =>
  {
    tokens.push({ type, value, start, end, line: l, column: c, stringDelimiter })
  }

  const err = (message: string, start: number, end: number, l: number, c: number) => {
    errors.push({
      message,
      loc: { start, end, line: l, column: c },
      code: input.slice(start, Math.min(input.length, start + 80)),
    })
  }

  const isWs = (ch: string) => ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n'
  const isDigit = (ch: string) => ch >= '0' && ch <= '9'
  const isIdentStart = (ch: string) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' || ch === '$'
  const isIdent = (ch: string) => isIdentStart(ch) || isDigit(ch)

  const advance = (n = 1) => {
    while (n-- > 0) {
      const ch = input[i]
      i++
      if (ch === '\n') {
        line++
        column = 1
      }
      else {
        column++
      }
    }
  }

  const matchOp = (): string | null => {
    for (const op of OPS) {
      if (input.startsWith(op, i)) return op
    }
    return null
  }

  while (i < input.length) {
    guard++
    if (guard > guardMax) {
      err('Lexer exceeded max steps (possible infinite loop)', i, i + 1, line, column)
      break
    }
    const ch = input[i]

    if (isWs(ch)) {
      advance(1)
      continue
    }

    if (ch === '/' && input[i + 1] === '/') {
      advance(2)
      while (i < input.length && input[i] !== '\n') advance(1)
      continue
    }

    if (ch === '/' && input[i + 1] === '*') {
      const start = i
      const l = line
      const c = column
      advance(2)
      let closed = false
      while (i < input.length) {
        if (input[i] === '*' && input[i + 1] === '/') {
          advance(2)
          closed = true
          break
        }
        advance(1)
      }
      if (!closed) {
        err('Unclosed block comment', start, i, l, c)
      }
      continue
    }

    const op = matchOp()
    if (op) {
      const start = i
      const l = line
      const c = column
      advance(op.length)
      push('operator', op, start, i, l, c)
      continue
    }

    // Negative/positive number literals only in prefix context (after = ( , [ ? : or start)
    const lastTok = tokens[tokens.length - 1]
    const prefixCtx = !lastTok
      || (lastTok.type === 'punct' && '([,?:'.includes(String(lastTok.value)))
      || (lastTok.type === 'operator' && lastTok.value === '=')
    const next = input[i + 1]
    if (prefixCtx && (ch === '-' || ch === '+') && (isDigit(next ?? '') || (next === '.' && isDigit(input[i + 2] ?? '')))) {
      const start = i
      const l = line
      const c = column
      const sign = ch === '-' ? -1 : 1
      advance(1) // consume - or +
      const numStart = i
      let hasDot = false
      while (i < input.length) {
        const cur = input[i]
        if (isDigit(cur)) {
          advance(1)
          continue
        }
        if (cur === '.' && !hasDot) {
          if (input[i + 1] === '.') break
          hasDot = true
          advance(1)
          continue
        }
        if ((cur === 'e' || cur === 'E') && (isDigit(input[i + 1] ?? '') || ['+', '-'].includes(input[i + 1] ?? ''))) {
          advance(1)
          if (input[i] === '+' || input[i] === '-') advance(1)
          while (isDigit(input[i] ?? '')) advance(1)
          continue
        }
        break
      }
      const rawEnd = i
      let mult = 1
      if (input[i] === 'k') {
        mult = 1000
        advance(1)
      }
      const raw = input.slice(numStart, rawEnd)
      const n = Number(raw) * mult * sign
      if (!Number.isFinite(n)) {
        err('Invalid number literal', start, i, l, c)
      }
      push('number', n, start, i, l, c)
      continue
    }

    if (SINGLE_OPS.has(ch)) {
      const start = i
      const l = line
      const c = column
      advance(1)
      push('operator', ch, start, i, l, c)
      continue
    }

    if (PUNCT.has(ch) && !(ch === '.' && isDigit(input[i + 1] ?? ''))) {
      const start = i
      const l = line
      const c = column
      advance(1)
      push('punct', ch, start, i, l, c)
      continue
    }

    if (ch === '"' || ch === '\'' || ch === '`') {
      const quote = ch
      let delimiter: Token['stringDelimiter']
      if (ch === '\'') {
        delimiter = 'single'
      }
      else if (ch === '"') {
        delimiter = 'double'
      }
      else {
        delimiter = 'backtick'
      }
      const start = i
      const l = line
      const c = column
      advance(1)
      let content = ''
      let closed = false
      while (i < input.length) {
        const cur = input[i]
        if (cur === quote) {
          advance(1)
          closed = true
          break
        }
        // Multiline strings: no escaping needed except for the delimiter itself
        // Just consume all characters including newlines until we find the closing delimiter
        content += cur
        advance(1)
      }
      if (!closed) {
        err('Unclosed string literal', start, i, l, c)
      }
      push('string', content, start, i, l, c, delimiter)
      continue
    }

    if (isDigit(ch) || (ch === '.' && isDigit(input[i + 1] ?? ''))) {
      const start = i
      const l = line
      const c = column
      let hasDot = false
      while (i < input.length) {
        const cur = input[i]
        if (isDigit(cur)) {
          advance(1)
          continue
        }
        if (cur === '.' && !hasDot) {
          // Don't consume '.' as a decimal point if it's actually a range operator '..'.
          if (input[i + 1] === '.') break
          hasDot = true
          advance(1)
          continue
        }
        if ((cur === 'e' || cur === 'E') && (isDigit(input[i + 1] ?? '') || ['+', '-'].includes(input[i + 1] ?? ''))) {
          advance(1)
          if (input[i] === '+' || input[i] === '-') {
            advance(1)
          }
          while (isDigit(input[i] ?? '')) {
            advance(1)
          }
          continue
        }
        break
      }
      const rawEnd = i
      let mult = 1
      if (input[i] === 'k') {
        mult = 1000
        advance(1)
      }
      const raw = input.slice(start, rawEnd)
      const n = Number(raw) * mult
      if (!Number.isFinite(n)) {
        err('Invalid number literal', start, i, l, c)
      }
      push('number', n, start, i, l, c)
      continue
    }

    if (ch === '#') {
      const start = i
      const l = line
      const c = column
      advance(1)
      while (i < input.length && isIdent(input[i] ?? '')) {
        advance(1)
      }
      push('identifier', '#' + input.slice(start + 1, i), start, i, l, c)
      continue
    }

    const isNoteLetter = (c: string) => /^[a-gA-G]$/.test(c)
    if (isNoteLetter(ch)) {
      const noteMatch = input.slice(i).match(/^[a-gA-G]([#b])?(-?\d+)/)
      if (noteMatch) {
        const start = i
        const l = line
        const c = column
        advance(noteMatch[0].length)
        push('identifier', noteMatch[0], start, i, l, c)
        continue
      }
    }

    if (isIdentStart(ch)) {
      const start = i
      const l = line
      const c = column
      while (i < input.length && isIdent(input[i] ?? '')) {
        advance(1)
      }
      const s = input.slice(start, i)
      if (KEYWORDS.has(s)) {
        push('keyword', s, start, i, l, c)
      }
      else {
        push('identifier', s, start, i, l, c)
      }
      continue
    }

    {
      const start = i
      const l = line
      const c = column
      advance(1)
      err(`Unexpected character "${ch}"`, start, i, l, c)
    }
  }

  push('eof', null, i, i, line, column)
  return { tokens, errors }
}
