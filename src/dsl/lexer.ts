export type Token =
  | { type: 'name'; value: string }
  | { type: 'identifier'; value: string }
  | { type: 'number'; value: number }
  | { type: 'string'; value: string }
  | { type: 'keyword'; value: string }
  | { type: 'operator'; value: string }
  | { type: 'brace'; value: '{' | '}' }
  | { type: 'paren'; value: '(' | ')' }
  | { type: 'bracket'; value: '[' | ']' }
  | { type: 'equals'; value: '=' }
  | { type: 'comma'; value: ',' }
  | { type: 'semicolon'; value: ';' }
  | { type: 'newline'; value: '\n' }
  | { type: 'eof'; value: null }

const KEYWORDS = new Set(['name', 'parameters', 'control', 'audio', 'stereo', 'variant', 'for', 'if', 'else', 'let', 'const',
  'return', 'import', 'fields', 'constants', 'emit', 'new', 'in', 'switch', 'case', 'break', 'continue', 'default'])

export function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let pos = 0
  const len = input.length

  while (pos < len) {
    const char = input[pos]

    if (char === '\n') {
      tokens.push({ type: 'newline', value: '\n' })
      pos++
      continue
    }

    if (char === '/' && pos + 1 < len && input[pos + 1] === '/') {
      // Skip comment until end of line
      while (pos < len && input[pos] !== '\n') {
        pos++
      }
      continue
    }

    if (/\s/.test(char)) {
      pos++
      continue
    }

    if (char === '{') {
      tokens.push({ type: 'brace', value: '{' })
      pos++
      continue
    }

    if (char === '}') {
      tokens.push({ type: 'brace', value: '}' })
      pos++
      continue
    }

    if (char === '(') {
      tokens.push({ type: 'paren', value: '(' })
      pos++
      continue
    }

    if (char === ')') {
      tokens.push({ type: 'paren', value: ')' })
      pos++
      continue
    }

    if (char === '[') {
      tokens.push({ type: 'bracket', value: '[' })
      pos++
      continue
    }

    if (char === ']') {
      tokens.push({ type: 'bracket', value: ']' })
      pos++
      continue
    }

    if (char === '=') {
      if (pos + 1 < len && input[pos + 1] === '=') {
        tokens.push({ type: 'operator', value: '==' })
        pos += 2
        continue
      }
      tokens.push({ type: 'equals', value: '=' })
      pos++
      continue
    }

    if (char === ',') {
      tokens.push({ type: 'comma', value: ',' })
      pos++
      continue
    }

    if (char === ';') {
      tokens.push({ type: 'semicolon', value: ';' })
      pos++
      continue
    }

    if (char === ':') {
      tokens.push({ type: 'operator', value: ':' })
      pos++
      continue
    }

    if (char === '.') {
      tokens.push({ type: 'operator', value: '.' })
      pos++
      continue
    }

    if (char === '"' || char === '\'') {
      const quote = char
      pos++
      let value = ''
      while (pos < len && input[pos] !== quote) {
        if (input[pos] === '\\') {
          pos++
          if (pos < len) {
            value += input[pos]
            pos++
          }
        }
        else {
          value += input[pos]
          pos++
        }
      }
      if (pos < len) pos++
      tokens.push({ type: 'string', value })
      continue
    }

    if (/[0-9]/.test(char) || (char === '.' && pos + 1 < len && /[0-9]/.test(input[pos + 1]))) {
      let numStr = ''
      while (pos < len
        && (/[0-9.]/.test(input[pos]) || input[pos] === 'e' || input[pos] === 'E' || input[pos] === '+'
          || input[pos] === '-'))
      {
        numStr += input[pos]
        pos++
      }
      const num = parseFloat(numStr)
      if (!isNaN(num)) {
        tokens.push({ type: 'number', value: num })
      }
      continue
    }

    if (/[a-zA-Z_]/.test(char)) {
      let ident = ''
      while (pos < len && /[a-zA-Z0-9_]/.test(input[pos])) {
        ident += input[pos]
        pos++
      }
      if (KEYWORDS.has(ident)) {
        tokens.push({ type: 'keyword', value: ident })
      }
      else {
        tokens.push({ type: 'identifier', value: ident })
      }
      continue
    }

    if (char === '?') {
      tokens.push({ type: 'operator', value: '?' })
      pos++
      continue
    }

    const operators = ['+', '-', '*', '/', '%', '!', '<', '>', '&', '|']
    if (operators.includes(char)) {
      let op = char
      pos++
      // Check for two-character operators
      if (pos < len) {
        const twoChar = char + input[pos]
        if (['<=', '>=', '==', '!=', '&&', '||'].includes(twoChar)) {
          op = twoChar
          pos++
        }
        else if (operators.includes(input[pos]) && ['<<', '>>'].includes(twoChar)) {
          // For now, we don't have shift operators, but this could be extended
          op = twoChar
          pos++
        }
      }
      tokens.push({ type: 'operator', value: op })
      continue
    }

    pos++
  }

  tokens.push({ type: 'eof', value: null })
  return tokens
}
