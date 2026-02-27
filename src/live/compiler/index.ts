import type { Program } from '../ast.ts'
import * as core from './core.ts'
import { State } from './state.ts'
import type { CompileResult } from './types.ts'

export * from './types.ts'

export { disassembleBytecode } from './util.ts'

export function compile(program: Program, preludeLines: number = 0, opts?: { projectId?: string | null }): CompileResult {
  const state = new State()
  if (opts?.projectId !== undefined) state.projectId = opts.projectId
  return core.compile(state, program, preludeLines)
}
