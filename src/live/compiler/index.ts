import type { Program } from '../ast.ts'
import * as core from './core.ts'
import { State } from './state.ts'
import type { CompileResult } from './types.ts'

export * from './types.ts'

export { disassembleBytecode } from './util.ts'

let preludeSnapshot: core.PreludeSnapshot | null = null
let preludeSnapshotPreludeLines = -1

export function compile(program: Program, preludeLines: number = 0, opts?: { projectId?: string | null }): CompileResult {
  const state = new State()
  if (opts?.projectId !== undefined) state.projectId = opts.projectId

  if (preludeLines <= 0) return core.compile(state, program, preludeLines)

  const split = core.splitProgramByPreludeLines(program, preludeLines)
  if (split.prelude.body.length === 0) return core.compile(state, program, preludeLines)

  if (!preludeSnapshot || preludeSnapshotPreludeLines !== preludeLines) {
    preludeSnapshot = core.buildPreludeSnapshot(split.prelude, preludeLines)
    preludeSnapshotPreludeLines = preludeLines
  }

  const incremental = core.compileWithPreludeSnapshot(state, program, split.user.body, preludeSnapshot)
  if (incremental.fallbackToFullCompile || !incremental.result) {
    return core.compile(state, program, preludeLines)
  }
  return incremental.result
}
