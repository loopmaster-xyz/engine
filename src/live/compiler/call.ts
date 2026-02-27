import { AudioVmOp, genSpecs, type GenSpec } from '../../dsp/audio-vm-bindings.ts'
import { gens } from '../../dsp/audio-vm-gens.ts'
import { sampleManager } from '../../lib/sample-manager.ts'
import SamJs from 'sam-js'
import type { Arg, Expr, Loc } from '../ast.ts'
import { compileExpr, error } from './core.ts'
import { compileDtofCall } from './hash-vars.ts'
import { compileMini } from './kernel/mini.ts'
import { compileRecord, processRecordCallSite } from './kernel/record.ts'
import { compileTimeline } from './kernel/timeline.ts'
import { compileTram } from './kernel/tram.ts'
import { getMathBinaryId, getMathTernaryId, getMathUnaryId } from './math-registry.ts'
import type { State } from './state.ts'
import type { FunctionInfo, HistorySourceMap, VariableInfo } from './types.ts'
import { compileGetVariable, compilePushCellRef, getFunctionByName, lookupVariable } from './vars.ts'

const GEN_KEY_SEP = '\0'

const primaryGenNameByVariantName: Record<string, string> = Object.create(null)
const primarySpecByGenKey: Record<string, GenSpec> = Object.create(null)
const opCodeByGenKey: Record<string, number> = Object.create(null)
const paramHasByGenKey: Record<string, Record<string, true>> = Object.create(null)
const defaultsByGenName: Record<string, Record<string, number>> = Object.create(null)

const typePredOpByName: Record<string, AudioVmOp> = {
  isundefined: AudioVmOp.IsUndefined,
  isscalar: AudioVmOp.IsScalar,
  isaudio: AudioVmOp.IsAudio,
  isarray: AudioVmOp.IsArray,
  isfunction: AudioVmOp.IsFunction,
}

for (const [genName, desc] of Object.entries(gens)) {
  const out: Record<string, number> = Object.create(null)
  for (const p of desc.parameters) {
    if (p.default !== undefined) out[p.name] = p.default
  }
  defaultsByGenName[genName] = out
}

for (const s of genSpecs) {
  if (!(s.variantName in primaryGenNameByVariantName)) {
    primaryGenNameByVariantName[s.variantName] = s.genName
  }

  const key = `${s.genName}${GEN_KEY_SEP}${s.variantName}`
  if (key in primarySpecByGenKey) continue

  primarySpecByGenKey[key] = s

  const has: Record<string, true> = Object.create(null)
  for (const pn of s.paramNames) has[pn] = true
  paramHasByGenKey[key] = has

  const opName = `Gen${s.genName}_${s.variantName}` as keyof typeof AudioVmOp
  const opCode = (AudioVmOp as any)[opName] as number | undefined
  if (opCode !== undefined) opCodeByGenKey[key] = opCode
}

function callNameFromCallee(callee: Expr): string {
  if (callee.type === 'identifier') return callee.name
  if (callee.type === 'member') return (callee as Extract<Expr, { type: 'member' }>).property
  if (callee.type === 'index') return '[]'
  return '?'
}

function bestEffortArgs(args: Arg[]): Record<string, Expr[]> {
  const out: Record<string, Expr[]> = {}
  let pos = 0
  for (const a of args) {
    if (a.type !== 'arg' || !a.value) continue
    const key = a.name ?? String(pos++)
    if (!out[key]) out[key] = []
    out[key].push(a.value)
  }
  return out
}

function matchFixedArgs(
  state: State,
  callExpr: Extract<Expr, { type: 'call' }>,
  funcName: string,
  args: Arg[],
  paramNames: string[],
): (Expr | null)[] | null {
  const matched: (Expr | null)[] = new Array(paramNames.length).fill(null)
  let positionalIndex = 0

  for (const arg of args) {
    if (arg.type !== 'arg' || !arg.value) continue

    if (arg.name) {
      const argName = arg.name
      let matchedParamIndex = -1
      for (let j = 0; j < paramNames.length; j++) {
        if (paramNames[j].startsWith(argName)) {
          matchedParamIndex = j
          break
        }
      }

      if (matchedParamIndex === -1) {
        error(state, `No parameter matches '${argName}' in ${funcName}()`, callExpr.loc)
        return null
      }

      if (matched[matchedParamIndex] !== null) {
        error(state, `Parameter '${paramNames[matchedParamIndex]}' already provided in ${funcName}()`, callExpr.loc)
        return null
      }

      matched[matchedParamIndex] = arg.value
    }
    else if (arg.shorthand && arg.value.type === 'identifier') {
      const shorthandName = arg.value.name
      const matchedParamIndex = paramNames.indexOf(shorthandName)

      if (matchedParamIndex !== -1) {
        if (matched[matchedParamIndex] !== null) {
          error(state, `Parameter '${paramNames[matchedParamIndex]}' already provided in ${funcName}()`, callExpr.loc)
          return null
        }
        matched[matchedParamIndex] = arg.value
      }
      else {
        while (positionalIndex < paramNames.length && matched[positionalIndex] !== null) {
          positionalIndex++
        }

        if (positionalIndex >= paramNames.length) {
          error(state, `Too many arguments for ${funcName}()`, callExpr.loc)
          return null
        }

        matched[positionalIndex] = arg.value
        positionalIndex++
      }
    }
    else {
      while (positionalIndex < paramNames.length && matched[positionalIndex] !== null) {
        positionalIndex++
      }

      if (positionalIndex >= paramNames.length) {
        error(state, `Too many arguments for ${funcName}()`, callExpr.loc)
        return null
      }

      matched[positionalIndex] = arg.value
      positionalIndex++
    }
  }

  return matched
}

function pushCallMeta(state: State, callExpr: Extract<Expr, { type: 'call' }>, name: string,
  args: Record<string, Expr[]>): void
{
  if (callExpr.loc.line <= state.preludeLines) return
  state.functionCallsMeta.push({ name, astNode: callExpr, args })
}

function pushArrayGetHistoryForArrayExpr(
  state: State,
  arrayExpr: Expr,
  loc: Loc,
): void {
  const pc = state.ops.length
  if (loc.line <= state.preludeLines) return

  let line = loc.line - state.preludeLines
  let column = loc.column
  let arrayGetElementMapping: Array<{ index: number; startCol: number; endCol: number }> | undefined

  if (arrayExpr.type === 'array') {
    line = arrayExpr.loc.line - state.preludeLines
    column = arrayExpr.loc.column
    arrayGetElementMapping = arrayExpr.items.map((item, index) => ({
      index,
      startCol: item.loc.column,
      endCol: item.loc.column + (item.loc.end - item.loc.start),
    }))
  }
  else if (arrayExpr.type === 'identifier') {
    const literal = state.varToArrayLiteral.get(arrayExpr.name)
    if (literal) {
      line = literal.loc.line - state.preludeLines
      column = literal.loc.column
      arrayGetElementMapping = literal.items.map((item, index) => ({
        index,
        startCol: item.loc.column,
        endCol: item.loc.column + (item.loc.end - item.loc.start),
      }))
    }
  }

  const historyEntry: HistorySourceMap = {
    line,
    column,
    genName: 'ArrayGet',
    pc: state.inFunction ? 0 : pc,
    inFunction: state.inFunction,
    __fromMainProgram: !state.isDeferredPass,
    arrayGetElementMapping,
  }
  state.historySourceMap.push(historyEntry)
  if (state.inFunction && state.currentFunctionId !== null) {
    const entryWithPending = historyEntry as HistorySourceMap & { __functionId?: number; __relativePc?: number }
    entryWithPending.__functionId = state.currentFunctionId
    entryWithPending.__relativePc = pc
  }
  else {
    historyEntry.pc = pc
  }
}

function pushCallSiteSourceMap(state: State, callExpr: Extract<Expr, { type: 'call' }>, funcName: string): void {
  const pc = state.ops.length
  const userLine = Math.max(1, callExpr.loc.line - state.preludeLines)
  const entry: HistorySourceMap = {
    line: userLine,
    column: callExpr.loc.column,
    genName: '_call',
    pc: state.inFunction ? 0 : pc,
    inFunction: state.inFunction,
    __fromMainProgram: !state.isDeferredPass,
    callSite: true,
    funcName,
  }
  state.historySourceMap.push(entry)
  if (state.inFunction && state.currentFunctionId !== null) {
    const entryWithPending = entry as HistorySourceMap & { __functionId?: number; __relativePc?: number }
    entryWithPending.__functionId = state.currentFunctionId
    entryWithPending.__relativePc = pc
  }
  else {
    entry.pc = pc
  }
}

/** Compile get(array, index) / arr[i] as ArrayGet gen – same history/source-map path as other gens. */
export function compileGetCall(
  state: State,
  arrayExpr: Expr,
  indexExpr: Expr,
  loc: Loc,
  resultExpr: Expr,
): void {
  const stackBefore = state.stack.length
  compileExpr(state, arrayExpr)
  compileExpr(state, indexExpr)

  pushArrayGetHistoryForArrayExpr(state, arrayExpr, loc)

  state.ops.push(AudioVmOp.ArrayGet, 0)
  state.stack.length = stackBefore
  state.stack.push({ expr: resultExpr })
}

export function compileCall(state: State, expr: Extract<Expr, { type: 'call' }>): void {
  if (expr.callee.type === 'member') {
    const memberExpr = expr.callee as Extract<Expr, { type: 'member' }>
    if (memberExpr.property === 'map') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'map', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'avg') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'avg', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'shuffle') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'shuffle', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'reverse') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'reverse', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'walk') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Walk', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'glide') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Glide', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'step') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Step', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }
    if (memberExpr.property === 'random') {
      const syntheticCall: Extract<Expr, { type: 'call' }> = {
        type: 'call',
        callee: { type: 'identifier', name: 'Random', loc: expr.loc },
        args: [{ type: 'arg', value: memberExpr.object, loc: memberExpr.object.loc }, ...expr.args],
        loc: expr.loc,
      }
      compileCallWithArgs(state, syntheticCall, syntheticCall.args, -1)
      return
    }

    pushCallMeta(state, expr, memberExpr.property, bestEffortArgs(expr.args))
    compileExpr(state, memberExpr.object)

    if (state.stack.length === 0) {
      error(state, 'Method call requires an object', expr.loc)
      return
    }

    if (memberExpr.property === 'push') {
      const args = expr.args.map(arg => arg.type === 'arg' ? arg.value : null).filter((a): a is Expr => a !== null)
      if (args.length === 0) {
        error(state, 'push() requires at least one argument', expr.loc)
        return
      }
      for (const arg of args) {
        compileExpr(state, arg)
      }
      state.ops.push(AudioVmOp.ArrayPush)
      state.ops.push(args.length)
      state.stack.length -= args.length
      state.stack.push({ expr })
      return
    }
    else {
      error(state, `Unknown method: ${memberExpr.property}`, expr.loc)
    }
    return
  }

  compileCallWithArgs(state, expr, expr.args, -1)
}

export function compileCallWithArgs(state: State, callExpr: Extract<Expr, { type: 'call' }>, args: Arg[],
  dollarIndex: number): void
{
  const callee = callExpr.callee

  // Handle indexed function calls like fns
  if (callee.type === 'index') {
    pushCallMeta(state, callExpr, '[]', bestEffortArgs(args))
    // Compile arguments first
    for (const arg of args) {
      if (arg.type === 'arg' && arg.value) compileExpr(state, arg.value)
    }

    // Compile the index expression to get the function ID
    const idxCallee = callee as Extract<Expr, { type: 'index' }>
    compileGetCall(state, idxCallee.object, idxCallee.index, idxCallee.loc, idxCallee)

    // Call the function using CallFunction opcode
    state.ops.push(AudioVmOp.CallFunction)
    state.ops.push(args.length)

    // Function returns a value on the stack
    state.stack.push({ expr: callExpr })
    return
  }

  if (callee.type !== 'identifier') {
    pushCallMeta(state, callExpr, callNameFromCallee(callee), bestEffortArgs(args))
    error(state, 'Only simple function calls are supported', callExpr.loc)
    return
  }

  const funcName = callee.name

  if (funcName === 'dtof') {
    pushCallMeta(state, callExpr, 'dtof', bestEffortArgs(args))
    const degreeArg = args[0]?.type === 'arg' ? args[0].value : null
    if (!degreeArg || degreeArg.type !== 'number') {
      error(state, 'dtof(degree) requires a literal number (scale degree 1-based)', callExpr.loc)
      return
    }
    compileDtofCall(state, degreeArg.value, callExpr.loc)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'get') {
    if (args.length < 2) {
      pushCallMeta(state, callExpr, 'get', bestEffortArgs(args))
      error(state, 'get(array, index) requires two arguments', callExpr.loc)
      return
    }
    const arrayArg = args[0]?.type === 'arg' ? args[0].value : null
    const indexArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!arrayArg || !indexArg) {
      pushCallMeta(state, callExpr, 'get', bestEffortArgs(args))
      error(state, 'get(array, index) requires two arguments', callExpr.loc)
      return
    }
    compileGetCall(state, arrayArg, indexArg, callExpr.loc, callExpr)
    pushCallMeta(state, callExpr, 'get', { array: [arrayArg], index: [indexArg] })
    return
  }

  if (funcName === 'out' || funcName === 'solo' || funcName === 'outs' || funcName === 'sout') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    const isSolo = funcName !== 'out'
    let argCount = 0
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      if (arg.type === 'arg' && arg.value) {
        compileExpr(state, arg.value)
        argCount++
      }
    }
    if (argCount === 0) {
      error(state, `${funcName} requires at least one argument`, callExpr.loc)
      return
    }
    if (argCount > 2) {
      error(state, `${funcName} accepts 1 or 2 arguments, got ${argCount}`, callExpr.loc)
      return
    }
    const userLine = Math.max(1, callExpr.loc.line - state.preludeLines)
    const outSoloPc = state.ops.length
    const outSoloHistoryEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: isSolo ? 'Solo' : 'Out',
      pc: state.inFunction ? 0 : outSoloPc,
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
    }
    state.historySourceMap.push(outSoloHistoryEntry)
    if (state.inFunction && state.currentFunctionId !== null) {
      ;(outSoloHistoryEntry as any).__functionId = state.currentFunctionId
      ;(outSoloHistoryEntry as any).__relativePc = outSoloPc
    }
    else {
      outSoloHistoryEntry.pc = outSoloPc
    }
    state.ops.push(isSolo ? AudioVmOp.Solo : AudioVmOp.Out)
    state.ops.push(argCount)
    for (let i = 0; i < argCount; i++) {
      state.stack.pop()
    }
    return
  }

  if (funcName === 'oversample') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length !== 2) {
      error(state, 'oversample() requires exactly 2 arguments: factor and callback', callExpr.loc)
      return
    }
    const factorArg = args[0]?.type === 'arg' ? args[0].value : null
    const callbackArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!factorArg || !callbackArg) {
      error(state, 'oversample() requires factor and callback arguments', callExpr.loc)
      return
    }
    compileExpr(state, factorArg)
    if (callbackArg.type === 'fn') {
      const prev = state.captureGlobalsInClosures
      state.captureGlobalsInClosures = true
      compileExpr(state, callbackArg)
      state.captureGlobalsInClosures = prev
    }
    else {
      compileExpr(state, callbackArg)
    }
    state.ops.push(AudioVmOp.Oversample)
    if (state.stack.length >= 2) {
      state.stack.pop()
      state.stack.pop()
    }
    else {
      state.stack.length = Math.max(0, state.stack.length - 2)
    }
    state.stack.push({ expr: callExpr })
    return
  }

  // Compile-time eSpeak TTS: text/voice/params must be literals so we can render once,
  // register a sample handle, and reuse it at runtime instead of synthesizing per sample.
  if (funcName === 'espeak') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length < 1) {
      error(state, 'espeak() requires at least 1 argument: text', callExpr.loc)
      return
    }

    const espeakParams = ['text', 'variant', 'speed', 'pitch']
    const matchedArgs = matchFixedArgs(state, callExpr, 'espeak', args, espeakParams)
    if (!matchedArgs) return

    const [textArg, variantArg, speedArg, pitchArg] = matchedArgs

    if (!textArg || textArg.type !== 'string') {
      error(state, 'espeak() text must be a literal string', callExpr.loc)
      return
    }

    if (variantArg && variantArg.type !== 'string') {
      error(state, 'espeak() variant must be a literal string', callExpr.loc)
      return
    }
    if (speedArg && speedArg.type !== 'number') {
      error(state, 'espeak() speed must be a literal number', callExpr.loc)
      return
    }
    if (pitchArg && pitchArg.type !== 'number') {
      error(state, 'espeak() pitch must be a literal number', callExpr.loc)
      return
    }

    const text = textArg.value
    const variant = variantArg?.value ?? 'm1'
    const speedNorm = speedArg ? Number(speedArg.value) : 0.5
    const pitchNorm = pitchArg ? Number(pitchArg.value) : 0.5

    const handle = sampleManager.registerEspeak()
    state.sampleRegistrations.push({
      handle,
      type: 'espeak',
      espeakText: text,
      espeakVariant: variant,
      espeakSpeed: speedNorm,
      espeakPitch: pitchNorm,
    })
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(handle)
    state.stack.push({ expr: callExpr })
    return
  }

  // Compile-time SAM (Software Automatic Mouth) synthesis: render speech to a buffer once
  // via sam-js, resample to engine rate, register as inline sample, and push its handle.
  // All control parameters are literals so compilation is deterministic.
  if (funcName === 'sam') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length < 1) {
      error(state, 'sam() requires at least 1 argument: text', callExpr.loc)
      return
    }

    const samParams = ['text', 'pitch', 'speed', 'mouth', 'throat', 'singmode', 'phonetic']
    const matchedArgs = matchFixedArgs(state, callExpr, 'sam', args, samParams)
    if (!matchedArgs) return

    const [
      textArg,
      pitchArg,
      speedArg,
      mouthArg,
      throatArg,
      singmodeArg,
      phoneticArg,
    ] = matchedArgs

    if (!textArg || textArg.type !== 'string') {
      error(state, 'sam() text must be a literal string', callExpr.loc)
      return
    }

    if (pitchArg && pitchArg.type !== 'number') {
      error(state, 'sam() pitch must be a literal number', callExpr.loc)
      return
    }
    if (speedArg && speedArg.type !== 'number') {
      error(state, 'sam() speed must be a literal number', callExpr.loc)
      return
    }
    if (mouthArg && mouthArg.type !== 'number') {
      error(state, 'sam() mouth must be a literal number', callExpr.loc)
      return
    }
    if (throatArg && throatArg.type !== 'number') {
      error(state, 'sam() throat must be a literal number', callExpr.loc)
      return
    }
    if (singmodeArg && singmodeArg.type !== 'number') {
      error(state, 'sam() singmode must be a literal number 0 or 1', callExpr.loc)
      return
    }
    if (phoneticArg && phoneticArg.type !== 'number') {
      error(state, 'sam() phonetic must be a literal number 0 or 1', callExpr.loc)
      return
    }

    const DEFAULT_SPEED = 72
    const DEFAULT_PITCH = 64
    const DEFAULT_THROAT = 128
    const DEFAULT_MOUTH = 128

    const pitchNorm = pitchArg ? Number(pitchArg.value) : undefined
    const speedNorm = speedArg ? Number(speedArg.value) : undefined
    const mouthNorm = mouthArg ? Number(mouthArg.value) : undefined
    const throatNorm = throatArg ? Number(throatArg.value) : undefined

    const pitch = pitchNorm === undefined ? DEFAULT_PITCH : Math.round((1 - pitchNorm) * 255)
    const speed = speedNorm === undefined ? DEFAULT_SPEED : Math.round((1 - speedNorm) * 255)
    const mouth = mouthNorm === undefined ? DEFAULT_MOUTH : Math.round((1 - mouthNorm) * 255)
    const throat = throatNorm === undefined ? DEFAULT_THROAT : Math.round((1 - throatNorm) * 255)

    const singmode = singmodeArg ? Number((singmodeArg as Extract<typeof singmodeArg, { type: 'number' }>).value) !== 0 : false
    const phonetic = phoneticArg ? Number((phoneticArg as Extract<typeof phoneticArg, { type: 'number' }>).value) !== 0 : false

    try {
      const sam = new SamJs({
        pitch,
        speed,
        mouth,
        throat,
        singmode,
        phonetic,
      })
      const buf = sam.buf32(textArg.value, phonetic)
      if (!(buf instanceof Float32Array)) {
        error(state, 'sam() synthesis failed', callExpr.loc)
        return
      }
      const sourceSampleRate = 22050
      const targetSampleRate = 48000
      const ratio = targetSampleRate / sourceSampleRate
      const targetLength = Math.max(1, Math.round(buf.length * ratio))
      const resampled = new Float32Array(targetLength)
      for (let i = 0; i < targetLength; i++) {
        const t = i / ratio
        const i0 = Math.floor(t)
        const i1 = Math.min(i0 + 1, buf.length - 1)
        const frac = t - i0
        const v0 = buf[i0] ?? 0
        const v1 = buf[i1] ?? 0
        resampled[i] = v0 + (v1 - v0) * frac
      }
      const sampleRate = targetSampleRate
      const handle = sampleManager.registerInlineSample([resampled], sampleRate)
      state.sampleRegistrations.push({
        handle,
        type: 'inline',
        inlineChannels: [resampled],
        inlineSampleRate: sampleRate,
      })
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(handle)
      state.stack.push({ expr: callExpr })
      return
    }
    catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      error(state, `sam() synthesis error: ${msg}`, callExpr.loc)
      return
    }
  }

  if (funcName === 'freesound') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length !== 1) {
      error(state, 'freesound() requires exactly 1 argument: id', callExpr.loc)
      return
    }
    const idArg = args[0]?.type === 'arg' ? args[0].value : null
    if (!idArg || idArg.type !== 'number') {
      error(state, 'freesound() id must be a literal number', callExpr.loc)
      return
    }
    const id = idArg.value
    const handle = sampleManager.registerFreesound(id)
    state.sampleRegistrations.push({ handle, type: 'freesound', freesoundId: id })
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(handle)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'record') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    compileRecord(state, callExpr)
    return
  }

  if (funcName === 'tram') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    compileTram(state, callExpr, args)
    return
  }

  if (funcName === 'mini') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    compileMini(state, callExpr, args)
    return
  }

  if (funcName === 'label') {
    const a0 = args[0]?.type === 'arg' ? args[0].value : null
    const a1 = args[1]?.type === 'arg' ? args[1].value : null
    const a2 = args[2]?.type === 'arg' ? args[2].value : null
    if (a0?.type === 'number' && a1?.type === 'string') {
      const bar = Math.max(0, Math.floor(Number(a0.value)) - 1)
      let colorIndex = 1
      if (a2?.type === 'number') colorIndex = Math.max(0, Math.min(5, Math.floor(Number(a2.value))))
      state.labels.push({ bar, text: a1.value, colorIndex })
    }
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(0)
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'timeline') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    compileTimeline(state, callExpr, args)
    return
  }

  if (funcName === 'alloc') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length !== 1) {
      error(state, 'alloc() requires 1 argument: seconds', callExpr.loc)
      return
    }
    const secondsArg = args[0]?.type === 'arg' ? args[0].value : null
    if (!secondsArg) {
      error(state, 'alloc() requires seconds argument', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, secondsArg)
    state.ops.push(AudioVmOp.Alloc)
    state.ops.push(state.nextAllocCallSiteId++)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'write') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length !== 2) {
      error(state, 'write() requires 2 arguments: input and buf', callExpr.loc)
      return
    }
    const inputArg = args[0]?.type === 'arg' ? args[0].value : null
    const bufArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!inputArg || !bufArg) {
      error(state, 'write() requires input and buf arguments', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, inputArg)
    compileExpr(state, bufArg)
    state.ops.push(AudioVmOp.Write)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'read') {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    if (args.length !== 2) {
      error(state, 'read() requires 2 arguments: buf and offset (seconds)', callExpr.loc)
      return
    }
    const bufArg = args[0]?.type === 'arg' ? args[0].value : null
    const offsetArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!bufArg || !offsetArg) {
      error(state, 'read() requires buf and offset arguments', callExpr.loc)
      return
    }
    const stackBefore = state.stack.length
    compileExpr(state, bufArg)
    compileExpr(state, offsetArg)
    state.ops.push(AudioVmOp.Read)
    state.stack.length = stackBefore
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'isundefined' || funcName === 'isscalar' || funcName === 'isaudio' || funcName === 'isarray'
    || funcName === 'isfunction')
  {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    let argCount = (dollarIndex >= 0 ? 1 : 0)
    for (const a of args) {
      if (a.type === 'arg' && a.value) argCount++
    }
    if (argCount > 1) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const argExpr = dollarIndex === 0 ? null : (args[0]?.type === 'arg' ? args[0].value : null)
    if (argExpr) {
      compileExpr(state, argExpr)
    }

    if (state.stack.length === 0) {
      error(state, `${funcName} requires a value`, callExpr.loc)
      return
    }

    const op = typePredOpByName[funcName]
    state.ops.push(op)
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  const mathUnaryId = getMathUnaryId(funcName)
  if (mathUnaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    let argCount = 0
    for (const a of args) {
      if (a.type === 'arg' && a.value) argCount++
    }
    if (argCount > 1) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const argExpr = args[0]?.type === 'arg' ? args[0].value : null
    if (!argExpr) {
      error(state, `${funcName}(x) requires one argument`, callExpr.loc)
      return
    }
    compileExpr(state, argExpr)
    if (state.stack.length === 0) {
      error(state, `${funcName} requires a value`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathUnary)
    state.ops.push(mathUnaryId)
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  const mathBinaryId = getMathBinaryId(funcName)
  if (mathBinaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    let argCount = 0
    for (const a of args) {
      if (a.type === 'arg' && a.value) argCount++
    }
    if (argCount > 2) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const left = args[0]?.type === 'arg' ? args[0].value : null
    const right = args[1]?.type === 'arg' ? args[1].value : null
    if (!left || !right) {
      error(state, `${funcName}(x, y) requires two arguments`, callExpr.loc)
      return
    }
    compileExpr(state, left)
    compileExpr(state, right)
    if (state.stack.length < 2) {
      error(state, `${funcName} requires two values`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathBinary)
    state.ops.push(mathBinaryId)
    state.stack.pop()
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  const mathTernaryId = getMathTernaryId(funcName)
  if (mathTernaryId >= 0) {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    let argCount = 0
    for (const a of args) {
      if (a.type === 'arg' && a.value) argCount++
    }
    if (argCount > 3) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    const a = args[0]?.type === 'arg' ? args[0].value : null
    const b = args[1]?.type === 'arg' ? args[1].value : null
    const c = args[2]?.type === 'arg' ? args[2].value : null
    if (!a || !b || !c) {
      error(state, `${funcName}(a, b, c) requires three arguments`, callExpr.loc)
      return
    }
    compileExpr(state, a)
    compileExpr(state, b)
    compileExpr(state, c)
    if (state.stack.length < 3) {
      error(state, `${funcName} requires three values`, callExpr.loc)
      return
    }
    state.ops.push(AudioVmOp.MathTernary)
    state.ops.push(mathTernaryId)
    state.stack.pop()
    state.stack.pop()
    state.stack.pop()
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'slicer') {
    const thresholdArg = args.find(a => a.type === 'arg' && a.name === 'threshold' && a.value)
    if (thresholdArg && thresholdArg.type === 'arg' && thresholdArg.value?.type !== 'number') {
      error(state, 'slicer() threshold parameter must be a scalar value', callExpr.loc)
      return
    }
  }

  if (funcName === 'Walk') {
    pushCallMeta(state, callExpr, 'Walk', bestEffortArgs(args))
    if (args.length < 2) {
      error(state, 'Walk(array, bar, swing?, offset?) requires at least array and bar', callExpr.loc)
      return
    }
    const arrayArg = args[0]?.type === 'arg' ? args[0].value : null
    const barArg = args[1]?.type === 'arg' ? args[1].value : null
    const swingArg = args.length > 2 && args[2]?.type === 'arg' ? args[2].value : null
    const offsetArg = args.length > 3 && args[3]?.type === 'arg' ? args[3].value : null
    if (!arrayArg || !barArg) {
      error(state, 'Walk requires array and bar arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, barArg)
    if (swingArg) compileExpr(state, swingArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    if (offsetArg) compileExpr(state, offsetArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Walk)
    state.stack.length -= 4
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Glide') {
    pushCallMeta(state, callExpr, 'Glide', bestEffortArgs(args))
    if (args.length < 2) {
      error(state, 'Glide(array, bar, exponent?) requires at least array and bar', callExpr.loc)
      return
    }
    const arrayArg = args[0]?.type === 'arg' ? args[0].value : null
    const barArg = args[1]?.type === 'arg' ? args[1].value : null
    const exponentArg = args.length > 2 && args[2]?.type === 'arg' ? args[2].value : null
    if (!arrayArg || !barArg) {
      error(state, 'Glide requires array and bar arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, barArg)
    if (exponentArg) compileExpr(state, exponentArg)
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(1)
      state.stack.push({ expr: callExpr })
    }
    state.ops.push(AudioVmOp.Glide)
    state.stack.length -= 3
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Step') {
    pushCallMeta(state, callExpr, 'Step', bestEffortArgs(args))
    if (args.length < 2) {
      error(state, 'Step(array, trig) requires array and trigger', callExpr.loc)
      return
    }
    const arrayArg = args[0]?.type === 'arg' ? args[0].value : null
    const trigArg = args[1]?.type === 'arg' ? args[1].value : null
    if (!arrayArg || !trigArg) {
      error(state, 'Step requires array and trig arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, trigArg)
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Step)
    state.ops.push(state.nextStepCallSiteId++)
    state.stack.length -= 2
    state.stack.push({ expr: callExpr })
    return
  }

  if (funcName === 'Random') {
    pushCallMeta(state, callExpr, 'Random', bestEffortArgs(args))
    if (args.length < 2) {
      error(state, 'Random(array, trig, seed?) requires array and trigger', callExpr.loc)
      return
    }
    const arrayArg = args[0]?.type === 'arg' ? args[0].value : null
    const trigArg = args[1]?.type === 'arg' ? args[1].value : null
    const seedArg = args[2]?.type === 'arg' ? args[2].value : null
    if (!arrayArg || !trigArg) {
      error(state, 'Random requires array and trig arguments', callExpr.loc)
      return
    }
    compileExpr(state, arrayArg)
    compileExpr(state, trigArg)
    if (seedArg) {
      compileExpr(state, seedArg)
    }
    else {
      state.ops.push(AudioVmOp.PushScalar)
      state.ops.push(0)
      state.stack.push({ expr: callExpr })
    }
    pushArrayGetHistoryForArrayExpr(state, arrayArg, arrayArg.loc)
    state.ops.push(AudioVmOp.Random)
    state.ops.push(state.nextStepCallSiteId++)
    state.stack.length -= 3
    state.stack.push({ expr: callExpr })
    return
  }

  // First check if funcName is a variant name (like 'lp' or 'hp')
  const variantGenName = primaryGenNameByVariantName[funcName]
  const genName = variantGenName ?? (funcName.charAt(0).toUpperCase() + funcName.slice(1))
  const variantName = variantGenName ? funcName : 'default'
  const genKey = `${genName}${GEN_KEY_SEP}${variantName}`
  const spec = primarySpecByGenKey[genKey]

  if (!spec) {
    // Check if this is a user-defined function
    const varInfo = lookupVariable(state, funcName)
    if (varInfo) {
      // This is a user function call - need to get function definition to match named params
      compileUserFunctionCall(state, callExpr, funcName, varInfo, args, dollarIndex)
      return
    }

    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    error(state, `Unknown generator: ${funcName}`, callExpr.loc)
    return
  }

  const paramCount = spec.paramNames.length
  const usesInput = spec.usesInput
  const totalArgs = paramCount + (usesInput ? 1 : 0)
  const stackBefore = state.stack.length

  const paramHas = paramHasByGenKey[genKey]
  const namedByName: Record<string, Expr> = Object.create(null)
  const namedOrder: string[] = []
  const positionalArgs: Expr[] = []
  let argCount = 0

  for (const a of args) {
    if (a.type !== 'arg' || !a.value) continue
    argCount++

    if (a.name) {
      if (!(a.name in namedByName)) namedOrder.push(a.name)
      namedByName[a.name] = a.value
      continue
    }

    if (a.value.type === 'identifier') {
      const n = a.value.name
      if (paramHas[n]) {
        if (!(n in namedByName)) namedOrder.push(n)
        namedByName[n] = a.value
        continue
      }
    }

    positionalArgs.push(a.value)
  }

  argCount += (dollarIndex >= 0 ? 1 : 0)
  if (argCount > totalArgs) {
    error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
    return
  }

  // Runtime will handle polymorphism
  const opCode = opCodeByGenKey[genKey]

  if (opCode === undefined) {
    error(state, `Unknown opcode for generator: ${spec.genName}_${spec.variantName}`, callExpr.loc)
    return
  }

  // Handle $ in pipe - count it as a positional arg at dollarIndex
  let positionalIndex = 0
  const resolvedArgs: Record<string, Expr[]> | null = callExpr.loc.line <= state.preludeLines ? null : {}
  const namedUsed = new Array(namedOrder.length).fill(false)
  const defaults = defaultsByGenName[genName]

  for (let i = 0; i < totalArgs; i++) {
    if (i === dollarIndex) {
      if (state.stack.length === 0) {
        error(state, '$ used without a value on the stack', callExpr.loc)
        return
      }
      // $ is already on stack, counts as a positional arg
      positionalIndex++
    }
    else {
      // Determine parameter name for this position
      const paramIndex = usesInput ? i - 1 : i
      const paramName = paramIndex >= 0 ? spec.paramNames[paramIndex] : null

      // Check for named argument first using startsWith matching
      let argExpr: Expr | null = null
      if (paramName) {
        for (let j = 0; j < namedOrder.length; j++) {
          if (namedUsed[j]) continue
          const argName = namedOrder[j]
          if (!paramName.startsWith(argName)) continue
          namedUsed[j] = true
          argExpr = namedByName[argName] ?? null
          break
        }
      }

      if (!argExpr) {
        // Use positional argument if available
        argExpr = positionalArgs[positionalIndex] ?? null
        positionalIndex++
      }

      if (resolvedArgs && paramName && argExpr) {
        ;(resolvedArgs[paramName] ??= []).push(argExpr)
      }

      if (argExpr) {
        compileExpr(state, argExpr)
      }
      else {
        const defaultValue = (paramName ? defaults?.[paramName] : undefined) ?? 0
        state.ops.push(AudioVmOp.PushScalar)
        state.ops.push(defaultValue)
        state.stack.push({ expr: { type: 'number' as const, value: defaultValue, loc: callExpr.loc } })
      }
    }
  }

  // Store PC: if in function, it's relative to function start; if in main program, it's already absolute
  // Store PC before emitting to match runtime: at runtime, pc points to opcode, then increments, then we calculate pc - 1
  const pc = state.ops.length
  if (callExpr.loc.line > state.preludeLines) {
    const userLine = callExpr.loc.line - state.preludeLines
    const historyEntry: HistorySourceMap = {
      line: userLine,
      column: callExpr.loc.column,
      genName: spec.genName,
      pc: state.inFunction ? 0 : pc,
      inFunction: state.inFunction,
      __fromMainProgram: !state.isDeferredPass,
    }
    state.historySourceMap.push(historyEntry)

    // If in function, mark this entry to be updated later with absolute PC
    if (state.inFunction && state.currentFunctionId !== null) {
      // Store a reference to update later - pc is relative to function bytecode start
      ;(historyEntry as any).__functionId = state.currentFunctionId
      ;(historyEntry as any).__relativePc = pc
    }
    else {
      // In main program, PC is already absolute - store it directly
      historyEntry.pc = pc
    }
  }

  // Emit generator opcode
  state.ops.push(opCode)

  state.stack.length = stackBefore
  state.stack.push({ expr: callExpr })
  pushCallMeta(state, callExpr, spec.genName, resolvedArgs ?? {})
}

function resolveFunctionInfo(state: State, funcName: string): FunctionInfo | undefined {
  let info = getFunctionByName(state, funcName)
  if (info) return info
  let target = funcName
  while (state.functionAliases.has(target)) {
    target = state.functionAliases.get(target)!
    info = getFunctionByName(state, target)
    if (info) return info
  }
  return undefined
}

export function compileUserFunctionCall(state: State, callExpr: Extract<Expr, { type: 'call' }>, funcName: string,
  varInfo: VariableInfo, args: Arg[], dollarIndex: number): void
{
  const funcInfo = getFunctionByName(state, funcName)
  const resolvedFuncInfo = funcInfo ?? resolveFunctionInfo(state, funcName)

  const callSiteLocKey = `${callExpr.loc.line}:${callExpr.loc.column}:${callExpr.loc.start}:${callExpr.loc.end}`
  const callSiteId = state.recordCallIds.get(callSiteLocKey)

  if (
    !state.compilingRecordCallback
    && funcInfo
    && state.functionToRecordCall.has(funcName)
    && callSiteId !== undefined
  ) {
    processRecordCallSite(state, callExpr, funcName, funcInfo, callSiteId)
  }

  // Automatic stereo lifting at compile time for array literals only
  // if (funcInfo && funcInfo.paramCount > 0 && args.length > 0 && dollarIndex !== 0) {
  //   const firstParam = funcInfo.params[0]
  //   const firstParamType = funcInfo.paramTypes[0]
  //   const firstArg = args[0]?.type === 'arg' ? args[0].value : null

  //   // Case 1: First param is 'in' (non-destructured) and arg is 2-element array LITERAL
  //   // Transform f([L,R]) -> [f(L), f(R)] at compile time
  //   if (firstParam === 'in' && firstParamType === 'param' && firstArg?.type === 'array'
  //     && firstArg.items.length === 2)
  //   {
  //     // Compile as [f(L), f(R)]
  //     const leftCall: Extract<Expr, { type: 'call' }> = {
  //       type: 'call',
  //       callee: callExpr.callee,
  //       args: [{ type: 'arg', value: firstArg.items[0], loc: firstArg.items[0].loc }, ...args.slice(1)],
  //       loc: callExpr.loc,
  //     }
  //     const rightCall: Extract<Expr, { type: 'call' }> = {
  //       type: 'call',
  //       callee: callExpr.callee,
  //       args: [{ type: 'arg', value: firstArg.items[1], loc: firstArg.items[1].loc }, ...args.slice(1)],
  //       loc: callExpr.loc,
  //     }

  //     compileUserFunctionCall(state, leftCall, funcName, varInfo, leftCall.args, -1)
  //     compileUserFunctionCall(state, rightCall, funcName, varInfo, rightCall.args, -1)

  //     // Create array from results
  //     state.ops.push(AudioVmOp.MakeArray)
  //     state.ops.push(2)
  //     // adjust stack safely
  //     if (state.stack.length >= 2) {
  //       state.stack.pop()
  //       state.stack.pop()
  //     }
  //     else {
  //       state.stack.length = Math.max(0, state.stack.length - 2)
  //     }
  //     state.stack.push({ expr: callExpr })
  //     return
  //   }

  //   // Case 2: First param is 'in:[L,R]' (named destructured) and arg is NOT an array literal
  //   // Transform f(x) -> f([x, x]) at compile time
  //   if (firstParam === 'in' && firstParamType === 'param-named-destructure' && firstArg
  //     && firstArg.type !== 'array')
  //   {
  //     // Compile as f([x, x])
  //     const arrayArg: Extract<Expr, { type: 'array' }> = {
  //       type: 'array',
  //       items: [firstArg, firstArg],
  //       loc: firstArg.loc,
  //     }
  //     const newArgs = [{ type: 'arg' as const, value: arrayArg, loc: args[0].loc }, ...args.slice(1)]
  //     compileUserFunctionCall(state, callExpr, funcName, varInfo, newArgs, -1)
  //     return
  //   }
  // }

  // Check if any arguments are named (explicit name: value or shorthand identifier that may match a param)
  const hasNamedArgs = args.some(arg =>
    arg.type === 'arg' && (arg.name || (arg.shorthand && arg.value.type === 'identifier'))
  )

  // If no function info or no named arguments, use simple positional matching (use resolvedFuncInfo so aliases work)
  if (!resolvedFuncInfo || !hasNamedArgs) {
    pushCallMeta(state, callExpr, funcName, bestEffortArgs(args))
    const argsProvided = args.filter(a => a.type === 'arg' && a.value).length + (dollarIndex >= 0 ? 1 : 0)
    const paramCount = resolvedFuncInfo?.params.length ?? 0
    if (resolvedFuncInfo && argsProvided > paramCount) {
      error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
      return
    }
    // Push arguments onto stack
    for (let i = 0; i < args.length; i++) {
      if (i === dollarIndex) {
        // $ is already on stack, skip
        continue
      }
      const arg = args[i]
      if (arg.type === 'arg' && arg.value) {
        compileExpr(state, arg.value)
      }
    }
    // Push undefined for missing params so defaults apply
    const missingCount = Math.max(0, paramCount - argsProvided)
    for (let i = 0; i < missingCount; i++) {
      state.ops.push(AudioVmOp.PushUndefined)
      state.stack.push({ expr: callExpr })
    }
    const argCount = argsProvided + missingCount

    // Get function ID
    compileGetVariable(state, varInfo)

    pushCallSiteSourceMap(state, callExpr, funcName)
    state.ops.push(AudioVmOp.CallFunction)
    state.ops.push(argCount)

    // Function returns a value on the stack
    state.stack.push({ expr: callExpr })
    return
  }

  // Named argument matching
  const params = resolvedFuncInfo.params
  const paramCount = params.length

  // Match arguments to parameters (positional and named with prefix matching)
  const matchedArgs: (Expr | null)[] = new Array(paramCount).fill(null)
  let positionalIndex = 0
  let dollarParamIndex = -1

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.type !== 'arg') continue

    if (arg.name) {
      // Explicit named argument (e.g., trig:1)
      const argName = arg.name
      // Named argument - find matching parameter with startsWith
      let matchedParamIndex = -1
      for (let j = 0; j < params.length; j++) {
        if (params[j].startsWith(argName)) {
          matchedParamIndex = j
          break
        }
      }

      if (matchedParamIndex === -1) {
        error(state, `No parameter matches '${argName}' in function '${funcName}'`, callExpr.loc)
        return
      }

      if (matchedArgs[matchedParamIndex] !== null) {
        error(state, `Parameter '${params[matchedParamIndex]}' already provided`, callExpr.loc)
        return
      }

      matchedArgs[matchedParamIndex] = arg.value
    }
    else if (arg.shorthand && arg.value.type === 'identifier') {
      // Shorthand argument (e.g., trig) - only treat as named if it exactly matches a parameter
      const shorthandName = arg.value.name
      const matchedParamIndex = params.indexOf(shorthandName)

      if (matchedParamIndex !== -1) {
        // Matches a parameter, treat as named argument
        if (matchedArgs[matchedParamIndex] !== null) {
          error(state, `Parameter '${params[matchedParamIndex]}' already provided`, callExpr.loc)
          return
        }
        matchedArgs[matchedParamIndex] = arg.value
        if (i === dollarIndex) dollarParamIndex = matchedParamIndex
      }
      else {
        // No matching parameter, treat as positional
        while (positionalIndex < paramCount && matchedArgs[positionalIndex] !== null) {
          positionalIndex++
        }

        if (positionalIndex >= paramCount) {
          error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
          return
        }

        matchedArgs[positionalIndex] = arg.value
        if (i === dollarIndex) dollarParamIndex = positionalIndex
        positionalIndex++
      }
    }
    else {
      // Positional argument - find next unfilled parameter
      while (positionalIndex < paramCount && matchedArgs[positionalIndex] !== null) {
        positionalIndex++
      }

      if (positionalIndex >= paramCount) {
        error(state, `Too many arguments for function '${funcName}'`, callExpr.loc)
        return
      }

      matchedArgs[positionalIndex] = arg.value
      if (i === dollarIndex) dollarParamIndex = positionalIndex
      positionalIndex++
    }
  }

  const resolvedArgs: Record<string, Expr[]> = {}
  for (let i = 0; i < paramCount; i++) {
    const expr = matchedArgs[i]
    if (expr) resolvedArgs[params[i]] = [expr]
  }
  pushCallMeta(state, callExpr, funcName, resolvedArgs)

  // Compile matched arguments in parameter order
  // We need to compile all arguments up to the last provided one (or all params if none provided)
  let lastProvidedIndex = -1
  for (let i = paramCount - 1; i >= 0; i--) {
    if (matchedArgs[i] !== null) {
      lastProvidedIndex = i
      break
    }
  }

  const argCount = lastProvidedIndex >= 0 ? lastProvidedIndex + 1 : paramCount

  for (let i = 0; i < argCount; i++) {
    if (i === dollarParamIndex) {
      // $ is already on stack, skip
      continue
    }
    const argExpr = matchedArgs[i]
    if (argExpr) {
      compileExpr(state, argExpr)
    }
    else {
      // Push undefined for missing arguments (will use default)
      state.ops.push(AudioVmOp.PushUndefined)
      state.stack.push({ expr: callExpr })
    }
  }

  // Get function ID
  compileGetVariable(state, varInfo)

  pushCallSiteSourceMap(state, callExpr, funcName)
  state.ops.push(AudioVmOp.CallFunction)
  state.ops.push(argCount)

  // Function returns a value on the stack
  state.stack.push({ expr: callExpr })

  // Note: If the function contains record(), it was already processed above before the function call
}
