import { encodeAudio, getBpmOverride } from './constants'
import { RunParams, RunResult } from './run-params'
import * as util from './util'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

/** Read BPM from bytecode; set vm.currentBpm and derived (samplesPerBeat, samplesPerBar). Skip if BPM override active. */
export function handleSetBpm(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const value: f32 = load<f32>(opsPtr + (pc << 2))
  if (getBpmOverride() != 0.0) return RunResult.normal(pc + 1, opsPtr, params.opsLength)
  vm.currentBpm = value
  vm.co = 60.0 / value
  vm.samplesPerBeat = params.sampleRate * vm.co
  vm.samplesPerBar = vm.samplesPerBeat * 4.0
  return RunResult.normal(pc + 1, opsPtr, params.opsLength)
}

/** Push audio buffer of time-in-beats (sampleCount/samplesPerBeat + i/samplesPerBeat per sample). */
export function handleTime(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const output: Float32Array = vm.arena.get(params.bufferLength)
  util.writeTimeBuffer(output.dataStart, params.bufferLength, params.sampleCount, vm.samplesPerBeat)
  vmStack.push(vm, encodeAudio(output.dataStart), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}
