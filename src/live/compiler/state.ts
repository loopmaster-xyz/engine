import type { Expr, FunctionCallInfo, Loc } from '../ast.ts'

type ArrayLiteralExpr = Extract<Expr, { type: 'array' }>
import type {
  CompileError,
  FunctionInfo,
  HistorySourceMap,
  LoopContext,
  PipeBinding,
  RecordCallback,
  SampleRegistration,
  StackValue,
  VariableInfo,
} from './types.ts'

export type DeferredGlobalFunction = {
  name: string
  fnExpr: Extract<Expr, { type: 'fn' }>
  globalIndex: number
  loc: Loc
}

export class State {
  arrayInitOps: number[] = [] // Filled in core from arrayInitRequests before encode
  arrayInitPcOffset: number = 0 // Add to historySourceMap PCs when returning (never mutate entries)
  arrayInitRequests: Array<{ capacity: number; globalIdx: number }> = [] // Record kernel registers; core expands once
  callSiteIdToHandle: Map<number, number> = new Map() // callSiteId -> handle mapping
  captureGlobalsInClosures = false
  /** Scope id -> global index of that scope's capture array (one array per scope, no name keying). */
  scopeCaptureGlobals: Map<number, number> = new Map()
  nextRecordScopeId = 0
  closureVars: Map<string, VariableInfo>[] = []
  compilingRecordCallback = false // true while building record callback loop bytecode – skip call-site capture
  currentFunctionId: number | null = null // Track which function we're currently compiling
  deferredGlobalFunctions: DeferredGlobalFunction[] = []
  errors: CompileError[] = []
  functionCallsMeta: FunctionCallInfo[] = []
  functionBytecodes: Map<number, number[]> = new Map() // Store bytecode for each function
  functionBytecodeStarts: Map<number, number> = new Map() // functionId -> absolute bytecode start position in main ops
  functionDepth = 0
  functions: FunctionInfo[] = []
  functionAliases: Map<string, string> = new Map() // alias name -> target function name (e.g. ntof -> midiToHz)
  /** Stack of name->FunctionInfo maps; index 0 = global scope. Nested functions use inner scopes to avoid overwriting. */
  functionsByNameStack: Map<string, FunctionInfo>[] = [new Map()]
  functionToRecordCall: Map<string, string> = new Map() // function name -> record() loc key
  functionIdToDefaultParamFunctions: Map<number, Map<string, number>> = new Map() // functionId -> (paramName -> innerFnId)
  globals: Map<string, VariableInfo> = new Map()
  historySourceMap: HistorySourceMap[] = [] // Maps history index to source location, genName, PC, whether it's in a function, and functionId
  labels: Array<{ bar: number; text: string; colorIndex: number }> = [] // Compile-time label(bar, text, color?) calls
  mixDefinitionLoc: Loc | null = null // Location of mix=> definition for history sourcemap (prelude line 3 if not set)
  isDeferredPass = false // Pass 2 = true, Pass 3 = false; used so history entries get correct buffer PC after concat
  inFunction = false
  /** Param name -> local index; guard prevents returning global when name is a param. */
  paramNameToLocalIndex: Map<string, number> | null = null
  locals: Map<string, VariableInfo>[] = []
  loopStack: LoopContext[] = []
  nextFunctionId = 0
  nextGlobalIndex = 0
  nextLocalIndex = 0
  nextRecordGlobalIdx = 1000 // Separate counter for recordGlobalIdx in recording VM (start high to avoid conflicts with function globals)
  nextAllocCallSiteId = 0
  nextStepCallSiteId = 0
  nextTempId = 0
  ops: number[] = []
  oversampleCallbackFunctionIds: Set<number> = new Set() // Track which functions are oversample callbacks
  pipeVars: PipeBinding[] = []
  preludeLines: number = 0 // Number of lines in prelude (to adjust sourcemap)
  recordCallbacks: Map<number, RecordCallback> = new Map()
  recordCallbackTemplates: Map<string, RecordCallback> = new Map() // record() loc key -> template
  recordCallExprs: Map<string, Extract<Expr, { type: 'call' }>> = new Map() // record() loc key -> record() call expr
  recordCallIds: Map<string, number> = new Map()
  /** Global index of array mapping scopeId -> handle; host fills before run. */
  recordHandleByScopeGlobal: number | null = null
  /** When record() is inside a function: global holding current scope id so body can lookup handle. */
  currentRecordScopeIdGlobal: number | null = null
  /** When record() is inside a function: single global holding array of capture arrays (scopeId -> capture array). */
  recordCaptureStoresByScopeGlobal: number | null = null
  sampleRegistrations: SampleRegistration[] = []
  projectId: string | null = null
  seenCallSites: Set<string> = new Set() // Track unique generator call sites to avoid duplicates
  stack: StackValue[] = []
  stringExpressions: Map<string, { value: string; delimiter: 'single' | 'double' | 'backtick'; loc: Loc }> = new Map() // Store string expressions by location key for compile-time access
  bpm: number = 120 // Last bpm from SetBpm in source (literal bpm = N)
  varToArrayLiteral: Map<string, ArrayLiteralExpr> = new Map()
  variableFunctionIds: Map<string, number> = new Map() // binding key -> functionId for identifiers currently known as fn values
  scale: string = 'major'
  scaleIndex: number = 0 // from SCALE_KEY_TO_INDEX.major
  rootMidi: number = 0 // octave -1 (C-1); # vars and dtof are relative, use transpose for pitch
}
