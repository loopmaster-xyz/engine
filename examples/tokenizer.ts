import type { Token, Tokenizer, TokenType } from 'editor'

const keywords = new Set([
  'let',
  'const',
  'var',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'return',
  'function',
  'async',
  'await',
  'class',
  'extends',
  'import',
  'export',
  'from',
  'default',
  'try',
  'catch',
  'finally',
  'throw',
  'new',
  'this',
  'super',
  'typeof',
  'instanceof',
  'in',
  'of',
  'with',
  'void',
  'true',
  'false',
  'null',
  'undefined',
  'NaN',
  'Infinity',
  'type',
  'interface',
  'enum',
  'namespace',
  'declare',
  'as',
  'is',
  'satisfies',
  'keyof',
  'readonly',
  'abstract',
  'implements',
  'private',
  'protected',
  'public',
  'static',
  'override',
  'module',
  'global',
])

const operators = new Set([
  '|>',
  '->',
  '->>',
  '-->',
  '<-',
  '<<-',
  '<-->',
  '=>',
  '==>',
  '<=>',
  '<=',
  '>=',
  '<|',
  '<~',
  '~>',
  '<~>',
  '~~>',
  '<->',
  '==',
  '===',
  '!=',
  '!==',
  '<>',
  '<+',
  '+=',
  '-=',
  '*=',
  '/=',
  '**',
  '**=',
  '++',
  '--',
  '-+',
  '+-',
  '&&',
  '||',
  '!!',
  '&=',
  '|=',
  '^=',
  '~=',
  '=',
  '::',
  ':::',
  '|->',
  '|',
  '...',
  '..<',
  '..<.',
  '!!!',
  '~~~',
  '<*>',
  '<$>',
  '<$!>',
  '+++',
  '^^',
  '+',
  '-',
  '*',
  '/',
  '%',
  '&',
  '|',
  '^',
  '~',
  '!',
  '<',
  '>',
  '?',
  ':',
])

const punctuation = new Set([
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '.',
  ',',
  ';',
  ':',
])

function isWhitespace(char: string): boolean {
  return /\s/.test(char)
}

function isDigit(char: string): boolean {
  return /[0-9]/.test(char)
}

function isLetter(char: string): boolean {
  return /[a-zA-Z_]/.test(char)
}

function isIdentifierChar(char: string): boolean {
  return isLetter(char) || isDigit(char) || char === '_' || char === '$'
}

function pushToken(line: Token[], text: string, type: TokenType, lineNum: number, column: number): void {
  line.push({ text, type, line: lineNum, column })
}

export const tokenize: Tokenizer = (input: string) => {
  const lines: Token[][] = []
  let currentLine: Token[] = []
  let i = 0
  let lineNum = 1
  let column = 1

  while (i < input.length) {
    const char = input[i]
    const startLine = lineNum
    const startColumn = column

    if (isWhitespace(char)) {
      let whitespace = ''
      while (i < input.length && isWhitespace(input[i])) {
        if (input[i] === '\n') {
          lineNum++
          column = 1
        }
        else {
          column++
        }
        whitespace += input[i]
        i++
      }
      const parts = whitespace.split('\n')
      if (parts.length > 1) {
        let partLine = startLine
        let partColumn = startColumn
        if (parts[0]) {
          pushToken(currentLine, parts[0], 'text', partLine, partColumn)
          partColumn += parts[0].length
        }
        for (let j = 1; j < parts.length; j++) {
          lines.push(currentLine)
          currentLine = []
          partLine++
          partColumn = 1
          if (parts[j]) {
            pushToken(currentLine, parts[j], 'text', partLine, partColumn)
            partColumn += parts[j].length
          }
        }
      }
      else {
        pushToken(currentLine, whitespace, 'text', startLine, startColumn)
      }
      continue
    }

    if (char === '/' && input[i + 1] === '/') {
      let comment = '//'
      i += 2
      column += 2
      while (i < input.length && input[i] !== '\n') {
        comment += input[i]
        i++
        column++
      }
      pushToken(currentLine, comment, 'comment', startLine, startColumn)
      continue
    }

    if (char === '/' && input[i + 1] === '*') {
      let comment = '/*'
      i += 2
      column += 2
      while (i < input.length - 1) {
        if (input[i] === '\n') {
          comment += input[i]
          pushToken(currentLine, comment, 'comment', startLine, startColumn)
          lines.push(currentLine)
          currentLine = []
          comment = ''
          i++
          lineNum++
          column = 1
        }
        else {
          comment += input[i]
          if (input[i] === '*' && input[i + 1] === '/') {
            comment += input[i + 1]
            i += 2
            column += 2
            break
          }
          i++
          column++
        }
      }
      if (comment) {
        pushToken(currentLine, comment, 'comment', startLine, startColumn)
      }
      continue
    }

    if (char === '"' || char === '\'') {
      const quote = char
      let string = quote
      i++
      column++
      let escaped = false
      while (i < input.length) {
        if (escaped) {
          string += input[i]
          escaped = false
          i++
          column++
        }
        else if (input[i] === '\\') {
          string += input[i]
          escaped = true
          i++
          column++
        }
        else if (input[i] === '\n') {
          string += input[i]
          pushToken(currentLine, string, 'string', startLine, startColumn)
          lines.push(currentLine)
          currentLine = []
          string = ''
          i++
          lineNum++
          column = 1
        }
        else if (input[i] === quote) {
          string += input[i]
          i++
          column++
          break
        }
        else {
          string += input[i]
          i++
          column++
        }
      }
      if (string) {
        pushToken(currentLine, string, 'string', startLine, startColumn)
      }
      continue
    }

    if (char === '`') {
      const quote = char
      let string = quote
      i++
      column++
      let escaped = false
      while (i < input.length) {
        if (escaped) {
          string += input[i]
          escaped = false
          i++
          column++
        }
        else if (input[i] === '\\') {
          string += input[i]
          escaped = true
          i++
          column++
        }
        else if (input[i] === '\n') {
          string += input[i]
          pushToken(currentLine, string, 'string', startLine, startColumn)
          lines.push(currentLine)
          currentLine = []
          string = ''
          i++
          lineNum++
          column = 1
        }
        else if (input[i] === quote) {
          string += input[i]
          i++
          column++
          break
        }
        else {
          string += input[i]
          i++
          column++
        }
      }
      if (string) {
        pushToken(currentLine, string, 'string', startLine, startColumn)
      }
      continue
    }

    if (isDigit(char) || (char === '.' && isDigit(input[i + 1]))) {
      let number = ''
      if (char === '.') {
        number += char
        i++
        column++
      }
      while (i < input.length && isDigit(input[i])) {
        number += input[i]
        i++
        column++
      }
      if (input[i] === '.' && isDigit(input[i + 1])) {
        number += input[i]
        i++
        column++
        while (i < input.length && isDigit(input[i])) {
          number += input[i]
          i++
          column++
        }
      }
      if (input[i] === 'e' || input[i] === 'E') {
        number += input[i]
        i++
        column++
        if (input[i] === '+' || input[i] === '-') {
          number += input[i]
          i++
          column++
        }
        while (i < input.length && isDigit(input[i])) {
          number += input[i]
          i++
          column++
        }
      }
      pushToken(currentLine, number, 'number', startLine, startColumn)
      continue
    }

    let matched = false
    for (let len = 4; len >= 1; len--) {
      const candidate = input.slice(i, i + len)
      if (operators.has(candidate)) {
        pushToken(currentLine, candidate, 'operator', startLine, startColumn)
        i += len
        column += len
        matched = true
        break
      }
    }
    if (matched) continue

    if (punctuation.has(char)) {
      pushToken(currentLine, char, 'punctuation', startLine, startColumn)
      i++
      column++
      continue
    }

    if (isLetter(char)) {
      let identifier = ''
      while (i < input.length && isIdentifierChar(input[i])) {
        identifier += input[i]
        i++
        column++
      }
      let type: TokenType = 'identifier'
      if (keywords.has(identifier)) {
        type = 'keyword'
      }
      else if (identifier === 'true' || identifier === 'false') {
        type = 'boolean'
      }
      else if (identifier === 'null' || identifier === 'undefined') {
        type = 'null'
      }
      else if (i < input.length && input[i] === '(') {
        type = 'function'
      }
      pushToken(currentLine, identifier, type, startLine, startColumn)
      continue
    }

    pushToken(currentLine, char, 'text', startLine, startColumn)
    i++
    column++
  }

  lines.push(currentLine)

  return lines
}
