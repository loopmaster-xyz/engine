import type { Expr, FunctionCallInfo, Program } from './ast.ts'
import {
  compile,
  type CompileError,
  type HistorySourceMap,
  type RecordCallback,
  type SampleRegistration,
} from './compiler/index.ts'
import type { ParseError } from './parser.ts'
import { collectNumberLiterals, parseTokens } from './parser.ts'
import { getControlPreludeText } from './prelude.ts'
import type { LexError, Token } from './token.ts'
import { tokenize } from './token.ts'

export type LexSnapshot = {
  preludeText: string
  preludeLen: number
  preludeLines: number
  preludeTokens: Token[]
  userTokens: Token[]
  tokens: Token[]
  errors: LexError[]
}

export type ParseSnapshot = {
  src: string
  fullSrc: string
  preludeLen: number
  preludeLines: number
  program: Program | null
  errors: ParseError[]
  numberLiterals: Extract<Expr, { type: 'number' }>[]
}

export type CompileSnapshot = {
  bytecode: Float32Array | null
  errors: CompileError[]
  sampleRegistrations: SampleRegistration[]
  recordCallbacks?: Map<number, RecordCallback>
  historySourceMap?: HistorySourceMap[]
  labels?: Array<{ bar: number; text: string; colorIndex: number }>
  functionReturnPcs?: Record<string, number>
  functionCalls: FunctionCallInfo[]
  bpm: number
}

export type ControlCompileSnapshot = {
  lex: LexSnapshot
  parse: ParseSnapshot
  compile: CompileSnapshot
  errors: string[]
}

function shiftUserTokens(tokens: Token[], preludeLen: number, preludeLines: number): Token[] {
  const out: Token[] = []
  for (const t of tokens) {
    if (t.type === 'eof') continue
    out.push({
      ...t,
      start: t.start + preludeLen,
      end: t.end + preludeLen,
      line: t.line + preludeLines,
    })
  }
  return out
}

export function createControlPipeline(preludeSrc?: string) {
  const { preludeText, preludeLen, preludeLines } = getControlPreludeText()
  void preludeSrc

  const preludeLex = tokenize(preludeText)
  if (preludeLex.errors.length) {
    throw new Error(
      `Control prelude lex failed:\n${
        preludeLex.errors.map(e => `${e.loc.line}:${e.loc.column} ${e.message}`).join('\n')
      }`,
    )
  }
  const preludeTokens = preludeLex.tokens.filter(t => t.type !== 'eof')

  function lex(src: string): LexSnapshot {
    const userLex = tokenize(src)
    const shiftedUserTokens = shiftUserTokens(userLex.tokens, preludeLen, preludeLines)
    const eof = userLex.tokens[userLex.tokens.length - 1]
    const shiftedEof: Token = {
      ...eof,
      start: eof.start + preludeLen,
      end: eof.end + preludeLen,
      line: eof.line + preludeLines,
    }

    return {
      preludeText,
      preludeLen,
      preludeLines,
      preludeTokens,
      userTokens: userLex.tokens,
      tokens: [...preludeTokens, ...shiftedUserTokens, shiftedEof],
      // Lexer errors are reported in user coordinates.
      errors: userLex.errors,
    }
  }

  function parse(src: string, existingLex?: LexSnapshot): ParseSnapshot {
    const l = existingLex ?? lex(src)
    const fullSrc = preludeText + src
    const parsed = parseTokens(fullSrc, l.tokens)
    const parseErrors = parsed.errors.map(e =>
      e.loc.line > preludeLines ? { ...e, loc: { ...e.loc, line: e.loc.line - preludeLines } } : e
    )
    const lexErrors: ParseError[] = l.errors.map(e => ({
      message: e.message,
      loc: e.loc,
      code: e.code,
    }))
    const errors = [...lexErrors, ...parseErrors]
    const program = errors.length ? null : parsed.program
    const numberLiterals = program
      ? collectNumberLiterals(program).filter(n => n.loc.line > preludeLines)
      : []
    return {
      src,
      fullSrc,
      preludeLen,
      preludeLines,
      program,
      errors,
      numberLiterals,
    }
  }

  function compileProgram(program: Program, opts?: { projectId?: string | null }): CompileSnapshot {
    return compile(program, preludeLines, opts)
  }

  function compileSource(src: string, opts?: { projectId?: string | null }): ControlCompileSnapshot {
    const l = lex(src)
    const p = parse(src, l)

    if (p.errors.length > 0 || !p.program) {
      const formattedErrors: string[] = []
      for (const e of l.errors) formattedErrors.push(`Lex ${e.loc.line}:${e.loc.column} ${e.message}`)
      for (const e of p.errors) formattedErrors.push(`Parse ${e.loc.line}:${e.loc.column} ${e.message}`)
      return {
        lex: l,
        parse: p,
        compile: { bytecode: null, errors: [], sampleRegistrations: [], functionCalls: [], bpm: 120, labels: [] },
        errors: formattedErrors,
      }
    }

    const c0 = compileProgram(p.program, opts)
    const errors = c0.errors.map(e =>
      e.loc.line > p.preludeLines ? { ...e, loc: { ...e.loc, line: e.loc.line - p.preludeLines } } : e
    )
    const c = { ...c0, errors }

    const formattedErrors: string[] = []
    for (const e of l.errors) formattedErrors.push(`Lex ${e.loc.line}:${e.loc.column} ${e.message}`)
    for (const e of p.errors) formattedErrors.push(`Parse ${e.loc.line}:${e.loc.column} ${e.message}`)
    for (const e of c.errors) formattedErrors.push(`Compile ${e.loc.line}:${e.loc.column} ${e.message}`)

    return {
      lex: l,
      parse: p,
      compile: c,
      errors: formattedErrors,
    }
  }

  return { lex, parse, compile: compileProgram, compileSource }
}

export const controlPipeline = createControlPipeline()
