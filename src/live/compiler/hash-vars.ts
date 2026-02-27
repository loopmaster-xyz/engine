import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import { parseChordSuffix, romanToDegree } from '../../mini/chord-parser.ts'
import {
  degreeToMidiTs,
  getScaleIntervalsByIndex,
} from '../../mini/scales.ts'
import { isNoteName, noteNameToMidi } from '../../mini/util.ts'
import type { Loc } from '../ast.ts'
import { error } from './core.ts'
import type { State } from './state.ts'
import { compileGetVariable, lookupVariable } from './vars.ts'

export { isNoteName }

export function compileNoteVar(state: State, name: string, loc: Loc): void {
  const midi = noteNameToMidi(name)
  emitMidiToHzCall(state, midi, loc)
}

export function compileDtofCall(state: State, degree: number, loc: Loc): void {
  const midi = degreeToMidiTs(state.rootMidi, state.scaleIndex, degree)
  if (midi < 0) {
    error(state, `dtof: invalid degree ${degree} for current scale`, loc)
    return
  }
  emitMidiToHzCall(state, midi, loc)
}

function getMidiToHzVar(state: State) {
  return lookupVariable(state, 'midiToHz') ?? lookupVariable(state, 'ntof') ?? lookupVariable(state, 'mtof')
}

function emitMidiToHzCall(state: State, midi: number, loc: Loc): void {
  const varInfo = getMidiToHzVar(state)
  if (!varInfo) {
    error(state, 'midiToHz (or ntof) must be defined before using note/chord variables', loc)
    return
  }
  state.ops.push(AudioVmOp.PushScalar)
  state.ops.push(midi)
  compileGetVariable(state, varInfo)
  state.ops.push(AudioVmOp.CallFunction)
  state.ops.push(1)
  state.stack.push({ expr: { type: 'number', value: 0, loc } })
}

export type HashVarResult = { midi: number } | { midis: number[] }

export function resolveHashVar(name: string, state: State): HashVarResult | null {
  if (!name.startsWith('#')) return null

  const rest = name.slice(1)

  if (rest === 'scale') {
    const intervals = getScaleIntervalsByIndex(state.scaleIndex)
    if (!intervals || intervals.length === 0) return null
    const rootMidi = state.rootMidi
    const midis: number[] = []
    for (let d = 1; d <= intervals.length; d++) {
      const m = degreeToMidiTs(rootMidi, state.scaleIndex, d)
      if (m >= 0) midis.push(m)
    }
    return { midis }
  }

  const scaleDegreeMatch = rest.match(/^(\d+)$/)
  if (scaleDegreeMatch) {
    const degree = parseInt(scaleDegreeMatch[1]!, 10)
    const rootMidi = state.rootMidi
    const midi = degreeToMidiTs(rootMidi, state.scaleIndex, degree)
    if (midi < 0) return null
    return { midi }
  }

  const chordMatch = rest.match(/^([ivxlcdmIVXLCDM]+)(.*)$/)
  if (chordMatch) {
    const roman = chordMatch[1]!
    const suffix = chordMatch[2] ?? ''
    const base = romanToDegree(roman)
    if (base === null) return null
    const tones = parseChordSuffix(suffix)
    const rootMidi = state.rootMidi
    const midis: number[] = []
    for (const tone of tones) {
      const scaleDegree = base + tone.degree
      const midi = degreeToMidiTs(rootMidi, state.scaleIndex, scaleDegree, tone.semitoneAdjust)
      if (midi >= 0) midis.push(midi)
    }
    return { midis }
  }

  return null
}

function emitMapMidiToHz(state: State, midis: number[], loc: Loc): void {
  const mapVar = lookupVariable(state, 'map')
  const midiToHzVar = getMidiToHzVar(state)
  if (!mapVar || !midiToHzVar) {
    error(state, 'map and midiToHz (or ntof) must be defined before using chord variables', loc)
    return
  }
  for (const m of midis) {
    state.ops.push(AudioVmOp.PushScalar)
    state.ops.push(m)
  }
  state.ops.push(AudioVmOp.MakeArray)
  state.ops.push(midis.length)
  compileGetVariable(state, midiToHzVar)
  compileGetVariable(state, mapVar)
  state.ops.push(AudioVmOp.CallFunction)
  state.ops.push(2)
  state.stack.push({ expr: { type: 'array', items: [], loc } })
}

export function compileHashVar(state: State, name: string, loc: Loc): void {
  const result = resolveHashVar(name, state)
  if (!result) {
    error(state, `Unknown # variable: ${name}`, loc)
    return
  }
  if ('midi' in result) {
    emitMidiToHzCall(state, result.midi, loc)
  }
  else {
    emitMapMidiToHz(state, result.midis, loc)
  }
}
