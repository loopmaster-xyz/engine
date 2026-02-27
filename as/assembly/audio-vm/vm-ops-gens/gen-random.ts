// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { Random_default_seed_scalar } from '../../gen/random'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_Random(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new Random_default_seed_scalar(), 530, 1, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<Random_default_seed_scalar>(dst).copyFrom(changetype<Random_default_seed_scalar>(src))
  }, (dst: Object) => { changetype<Random_default_seed_scalar>(dst).reset() }))
}

export function handleGenOp_Random(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenRandom_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  const seedTagged: f64 = vm.stack[--vm.stackTop]
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  const seedValue: f32 = genOpHelpers.scalarOrFirstSample(vm, seedTagged)
  vm.paramScratch[0] = seedValue
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[530].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: Random_default_seed_scalar = changetype<Random_default_seed_scalar>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr, seedValue)
      genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
      break
    }
    default: {
      const procLen: i32 = (params.bufferLength + 15) & ~15
      output = vm.arena.get(procLen)
      memory.fill(output.dataStart, 0, usize(procLen) << 2)
      break
    }
  }
  push(vm, encodeAudio(output.dataStart), true)
  if (isAudio(seedTagged)) vm.arena.releaseByPtr(u32(decodeAudio(seedTagged)))
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
