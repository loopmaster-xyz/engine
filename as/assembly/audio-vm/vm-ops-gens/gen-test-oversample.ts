// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

import { TestOversample_default_, TestOversample_default__stereo } from '../../gen/test-oversample'
import { VmState, push, downsample, upsample } from '../runner'
import * as genOpHelpers from '../gen-op-helpers'
import * as vmOpsVars from '../vm-ops-vars'
import { AudioVmOp } from '../vm-op'
import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'
import { GenSlot } from '../gen-history'
import { GenPool } from '../gen-pool'
import { RunParams } from '../run-params'

export function initGenPools_TestOversample(vm: VmState): void {
  vm.genPools.push(new GenPool(() => new TestOversample_default_(), 67, 0, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestOversample_default_>(dst).copyFrom(changetype<TestOversample_default_>(src))
  }, (dst: Object) => { changetype<TestOversample_default_>(dst).reset() }))
  vm.genPools.push(new GenPool(() => new TestOversample_default__stereo(), 68, 0, vm.genPoolManager, (dst: Object, src: Object) => {
    changetype<TestOversample_default__stereo>(dst).copyFrom(changetype<TestOversample_default__stereo>(src))
  }, (dst: Object) => { changetype<TestOversample_default__stereo>(dst).reset() }))
}

export function handleGenOp_TestOversample(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {
  switch (op) {
case AudioVmOp.GenTestOversample_default: {
  genOpHelpers.resolveAndPushAbsolutePC(vm, pc)
  let output: Float32Array = changetype<Float32Array>(0)
  let modeMask: i32 = 0
  switch (modeMask) {
    case 0: {
      const slot: GenSlot = vm.genPools[67].get()
      genOpHelpers.writeCallStackMetaToSlot(vm, slot)
      const procLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
      genOpHelpers.writeInputToHistoryRingZero(slot.history)
      const inputPtr: usize = 0
      output = vm.arena.get(procLen)
      const outputPtr: usize = output.dataStart
      const instance: TestOversample_default_ = changetype<TestOversample_default_>(slot.instance)
      slot.history.write(params.sampleCount, vm.paramScratch)
      instance.process(params.bufferLength, params.sampleCount, params.sampleRate, params.nyquist, params.piOverNyquist, vm.currentBpm, vm.co, vm.samplesPerBeat, vm.samplesPerBar, inputPtr, outputPtr)
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
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--
  return pc
}

    default: {
      throw new Error(`Unknown gen op: ${op}`)
    }
  }
}
