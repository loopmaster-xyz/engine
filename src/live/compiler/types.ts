import type { MiniSourceMapEntry } from '../../mini/bytecode.ts'
import type { Node } from '../../mini/tokenizer.ts'
import type { Expr, FunctionCallInfo, Loc } from '../ast.ts'

export type MiniCompileResult = {
  bytecode: Float32Array
  sourceMap: MiniSourceMapEntry[]
  nodes: Node[]
}

export type CompileError = {
  message: string
  loc: Loc
}

export type SampleRegistration = {
  handle: number
  type: 'freesound' | 'record' | 'inline' | 'espeak'
  freesoundId?: number
  recordSeconds?: number
  recordCallbackId?: number
  recordProjectId?: string | null
  inlineChannels?: Float32Array[]
  inlineSampleRate?: number
  espeakText?: string
  espeakVariant?: string
  espeakSpeed?: number
  espeakPitch?: number
}

export type HistorySourceMap = {
  line: number
  column: number
  genName: string
  pc: number
  inFunction: boolean
  __functionId?: number // Temporary: function ID for entries that need PC conversion
  __relativePc?: number // Temporary: relative PC before conversion to absolute
  __finalFunctionId?: number // Persistent: function ID for entries in functions (used for adjustment filtering)
  __fromMainProgram?: boolean // True when entry.pc is relative to main ops (after deferred); used for buffer index
  /** User function call site: inner gen histories can map back to this call */
  callSite?: boolean
  funcName?: string
  tramBeatMapping?: Array<{ linearIndex: number; startCol: number; endCol: number }> // For Tram: maps linear position index to source column positions
  arrayGetElementMapping?: Array<{ index: number; startCol: number; endCol: number }> // For ArrayGet: maps array element index to source column range (from array literal)
  sequence?: string // For Mini: the sequence string passed to mini()
  compileResult?: MiniCompileResult // For Mini: compile result (sourceMap, nodes) from compileMiniNotation
  timelineSegmentTokens?: Array<
    { fromTokenStart: number; fromTokenLength: number; toTokenStart: number; toTokenLength: number }
  > // For Timeline: segment token spans for overlay widget
  timelineColorIndex?: number // For Timeline: optional 0-5 = red,green,yellow,blue,purple,cyan from theme
}

export type RecordDependency = {
  name: string
  scope: VariableScope
  sourceIndex: number
}

/** Per-scope capture layout: one global array (captureStoreGlobalIdx) of length numDeps; host reads indices 0..numDeps-1. */
export type RecordCallback = {
  setup: Float32Array
  loop: Float32Array
  /** Explicit dependency list for this scope (no name-keyed globals). */
  dependencies: RecordDependency[]
  /** recordGlobalIdx for each dependency in order; host sets these before running record VM. */
  recordGlobalIndices: number[]
  /** Global index of the scope's capture array in the main VM (or array-of-arrays when useNestedCaptureStore). */
  captureStoreGlobalIdx: number
  /** When true, capture store is array of arrays; host reads via getAudioVmNestedArrayElementAt(..., callbackId, i). */
  useNestedCaptureStore?: boolean
  /** Captured callback dependencies by name -> record global slot (for call-site override wiring). */
  capturedRecordGlobalsByName?: Record<string, number>
  defaultParamRecordGlobals?: number[]
  /** Enclosing function default-parameter function slots by parameter name. */
  defaultParamRecordGlobalsByName?: Record<string, number>
  maxSetupGlobalIndex?: number
}

export type CompileResult = {
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

export type StackValue = {
  expr: Expr
}

export type VariableScope = 'system' | 'global' | 'local' | 'closure'

export type VariableInfo = {
  scope: VariableScope
  index: number
  closureIndex?: number
}

export type FunctionInfo = {
  id: number
  paramCount: number
  params: string[]
  paramTypes: Array<'param' | 'param-destructure' | 'param-named-destructure'>
  firstParamIn: number // 0=none, 1=plain 'in', 2=in:[L,R]
  bytecodeStart: number
  bytecodeLength: number
  closureVars: string[]
  returnHistorySourceMapIndex?: number
  definitionLine?: number // used to include prelude functions in record setup
  isGlobalScope?: boolean // true = top-level, only these get hoisted to globals in lookupVariable
  defaultParamFunctionIds?: Map<number, number> // paramIndex -> functionId of default's fn (for record setup)
  defaultParamExprs?: Array<Expr | null> // default expressions for transitive callee collection
}

export type LoopContext = {
  label?: string
  breakTargets: number[] // Indices in ops array to patch with break target
  continueTargets: number[] // Indices in ops array to patch with continue target
  isSwitch?: boolean // true = break allowed, continue disallowed
}

export const SYSTEM_VARS = new Set(['t', 'samplesPerBeat', 'samplesPerBar', 'co', 'undefined'])

export type PipeBinding = {
  varInfo: VariableInfo
  functionDepth: number
}
