import {
  decodeAudio,
  encodeAudio,
  encodeScalar,
  encodeUndefined,
  isAudio,
  isScalar,
} from './constants'
import * as heap from './heap'
import { RunParams, RunResult } from './run-params'
import { readOperandI32, wrappedIndexFromAudioAt, wrappedIndexFromScalar } from './util'
import * as vmStack from './vm-stack'
import { VmState } from './vm-state'

/** Pop index; lookup table[index] (wrapped). Scalar index → one value; audio index → buffer of table[index[i]]; else undefined. With gen pool: record for history. */
export function handleTableLookup(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const len: i32 = readOperandI32(opsPtr, pc)
  pc++
  const tablePtr: usize = opsPtr + (pc << 2)
  pc += len

  // Fix #5: guard before pop so the stack isn't left in a dirty state on throw.
  if (len <= 0) throw new Error(`TableLookup: len=${len} <= 0`)

  const indexTagged: f64 = vmStack.pop(vm)

  if (vm.tableGenPoolIndex < 0) {
    // No gen pool: simple lookup.
    if (isScalar(indexTagged)) {
      const idx: i32 = wrappedIndexFromScalar(indexTagged, len)
      vmStack.push(vm, encodeScalar(load<f32>(tablePtr + (idx << 2))))
    }
    else if (isAudio(indexTagged)) {
      const indexPtr: usize = decodeAudio(indexTagged)
      const output: Float32Array = vm.arena.get(params.bufferLength)
      const outPtr: usize = output.dataStart
      for (let i: i32 = 0; i < params.bufferLength; i++) {
        const idx: i32 = wrappedIndexFromAudioAt(indexPtr, i, len)
        store<f32>(outPtr + (i << 2), load<f32>(tablePtr + (idx << 2)))
      }
      // Fix #2: release the arena buffer backing the popped audio index directly,
      // rather than calling releaseStackRange with an already-adjusted stackTop.
      heap.releaseValue(vm, indexTagged)
      vmStack.push(vm, encodeAudio(outPtr))
    }
    else {
      vmStack.push(vm, encodeUndefined())
    }
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }

  // Fix #4: guard against an out-of-range gen pool index.
  if (vm.tableGenPoolIndex >= vm.genPools.length) {
    throw new Error(`TableLookup: tableGenPoolIndex=${vm.tableGenPoolIndex} out of range (len=${vm.genPools.length})`)
  }

  if (isScalar(indexTagged)) {
    const idx: i32 = wrappedIndexFromScalar(indexTagged, len)
    const value: f32 = load<f32>(tablePtr + (idx << 2))
    vm.paramScratch[0] = f32(len)
    vm.paramScratch[1] = f32(idx)
    vm.genPools[vm.tableGenPoolIndex].get().history.write(params.sampleCount, vm.paramScratch)
    vmStack.push(vm, encodeScalar(value))
  }
  else if (isAudio(indexTagged)) {
    const indexPtr: usize = decodeAudio(indexTagged)
    const output: Float32Array = vm.arena.get(params.bufferLength)
    const outPtr: usize = output.dataStart
    let firstIdx: i32 = 0
    for (let i: i32 = 0; i < params.bufferLength; i++) {
      const idx: i32 = wrappedIndexFromAudioAt(indexPtr, i, len)
      if (i == 0) firstIdx = idx
      store<f32>(outPtr + (i << 2), load<f32>(tablePtr + (idx << 2)))
    }
    vm.paramScratch[0] = f32(len)
    // Fix #3: document that history records only the first sample's index for audio.
    // Full per-sample history is not stored; consumers of this record should treat
    // paramScratch[1] as representative (first sample) rather than exhaustive.
    vm.paramScratch[1] = f32(firstIdx)
    vm.genPools[vm.tableGenPoolIndex].get().history.write(params.sampleCount, vm.paramScratch)
    // Fix #2: same as above — release the index buffer directly.
    heap.releaseValue(vm, indexTagged)
    vmStack.push(vm, encodeAudio(outPtr))
  }
  else {
    vmStack.push(vm, encodeUndefined())
  }

  return RunResult.normal(pc, opsPtr, params.opsLength)
}
