import { MiniKernel } from '../kernel/mini'
import { TimelineKernel } from '../kernel/timeline'
import { TramKernel } from '../kernel/tram'
import {
  decodeArray,
  decodeAudio,
  decodeFunction,
  decodeScalar,
  encodeArray,
  encodeAudio,
  encodeScalar,
  encodeUndefined,
  isArray,
  isAudio,
  isFunction,
  isScalar,
} from './constants'
import * as genOpHelpers from './gen-op-helpers'
import * as heap from './heap'
import { FastArray } from './lib/fast-array'
import { RunParams, RunResult } from './run-params'
import { downsample, getScalarGlobal, upsample, VmState } from './runner'
import { readOperandI32 } from './util'
import * as vmOpsVars from './vm-ops-vars'
import * as vmStack from './vm-stack'
import { CallFrame, ClosureEnv, FunctionDef, FunctionInstance } from './vm-types'

/** Pop bars; run embedded bytecode (Tram kernel) for one block; push output audio. */
export function handleTram(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  if (vm.tramGenPoolIndex < 0) throw new Error(`Tram: tramGenPoolIndex=${vm.tramGenPoolIndex}`)

  const tramOpPc: i32 = pc
  const len: i32 = readOperandI32(opsPtr, pc)
  pc++
  const tramBytecodePtr: usize = opsPtr + (pc << 2)
  pc += len

  if (vm.stackTop <= 0) throw new Error('Tram: stack empty')

  const barsTagged: f64 = vmStack.pop(vm)
  let barsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barsTagged)

  const outputLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(outputLen)
  const outputPtr: usize = output.dataStart

  const slot = vm.genPools[vm.tramGenPoolIndex].get()

  genOpHelpers.resolveAndPushAbsolutePC(vm, tramOpPc)
  genOpHelpers.writeCallStackMetaToSlot(vm, slot)

  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--

  vm.paramScratch[0] = -1.0
  const instance: TramKernel = changetype<TramKernel>(slot.instance)
  const osFactor: i32 = genOpHelpers.getOversampleFactor(vm)

  if (osFactor <= 0) {
    // normal processing
    vm.paramScratch[0] = instance.fired
    slot.history.write(params.sampleCount, vm.paramScratch)
    instance.process(
      params.bufferLength,
      params.sampleCount,
      params.sampleRate,
      params.nyquist,
      params.piOverNyquist,
      vm.currentBpm,
      vm.co,
      vm.samplesPerBeat,
      vm.samplesPerBar,
      tramBytecodePtr,
      len,
      barsValue,
      outputPtr,
    )
    genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
  }
  else {
    // oversampled processing
    let baseLen: i32 = params.bufferLength / osFactor
    if (baseLen <= 0) baseLen = 1 // ensure at least 1 sample

    const baseSampleRate: f32 = params.sampleRate / f32(osFactor)
    const baseNyquist: f32 = baseSampleRate * 0.5
    const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist
    const baseSampleCount: f32 = f32(params.sampleCount) / f32(osFactor)
    const baseProcLen: i32 = genOpHelpers.alignedProcLength(baseLen)

    const baseOutPtr: usize = vm.getOversampleScratchA(baseProcLen).dataStart

    let baseBarsValue: f32 = barsValue
    let barsBuf: Float32Array | null = null

    if (isAudio(barsTagged)) {
      const barsSrc: usize = decodeAudio(barsTagged)
      barsBuf = vm.getOversampleScratchB(baseProcLen)
      const barsPtr: usize = barsBuf.dataStart
      if (vm.perfCountersEnabled) vm.perfCounters[7]++
      downsample(changetype<VmState>(vm), barsSrc, barsPtr, baseLen, osFactor)
      genOpHelpers.extendBufferWithLastSample(barsPtr, baseLen, baseProcLen)
      baseBarsValue = load<f32>(barsPtr)
    }

    vm.paramScratch[0] = instance.fired
    slot.history.write(params.sampleCount / osFactor, vm.paramScratch)

    instance.process(
      baseLen,
      params.sampleCount / osFactor,
      baseSampleRate,
      baseNyquist,
      basePiOverNyquist,
      vm.currentBpm,
      vm.co,
      vm.samplesPerBeat,
      vm.samplesPerBar,
      tramBytecodePtr,
      len,
      baseBarsValue,
      baseOutPtr,
    )

    if (vm.perfCountersEnabled) vm.perfCounters[6]++
    upsample(changetype<VmState>(vm), baseOutPtr, outputPtr, baseLen, osFactor)
    genOpHelpers.extendBufferWithLastSample(outputPtr, params.bufferLength, outputLen)

    genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)
  }

  if (isAudio(barsTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barsTagged)))
  vmStack.push(vm, encodeAudio(outputPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Run Timeline kernel over embedded bytecode; push output audio. */
export function handleTimeline(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  if (vm.timelineGenPoolIndex < 0) throw new Error(`Timeline: timelineGenPoolIndex=${vm.timelineGenPoolIndex}`)

  const timelineOpPc: i32 = pc
  const len: i32 = readOperandI32(opsPtr, pc)
  pc++
  const timelineBytecodePtr: usize = opsPtr + (pc << 2)
  pc += len

  const outputLen: i32 = genOpHelpers.alignedProcLength(params.bufferLength)
  const output: Float32Array = vm.arena.get(outputLen)
  const outputPtr: usize = output.dataStart

  const slot = vm.genPools[vm.timelineGenPoolIndex].get()

  genOpHelpers.resolveAndPushAbsolutePC(vm, timelineOpPc)
  genOpHelpers.writeCallStackMetaToSlot(vm, slot)

  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--

  const instance: TimelineKernel = changetype<TimelineKernel>(slot.instance)
  instance.process(
    params.bufferLength,
    params.sampleCount,
    params.sampleRate,
    vm.currentBpm,
    timelineBytecodePtr,
    len,
    outputPtr,
  )

  genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, params.bufferLength)

  vmStack.push(vm, encodeAudio(outputPtr), true)
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

/** Run Mini (pattern) kernel; optional transpose/tune from bytecode; push output audio. */
export function handleMini(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  if (vm.miniGenPoolIndex < 0) throw new Error(`Mini: miniGenPoolIndex=${vm.miniGenPoolIndex}`)
  const miniOpPc: i32 = pc
  const totalLen: i32 = readOperandI32(opsPtr, pc)
  pc++
  const hasTransposeTune: bool = totalLen >= 5
  const bytecodeLen: i32 = hasTransposeTune ? totalLen - 2 : totalLen
  const miniBytecodePtr: usize = opsPtr + (pc << 2)
  const transposeIdx: i32 = hasTransposeTune ? i32(load<f32>(opsPtr + ((pc + bytecodeLen) << 2))) : -1
  const tuneIdx: i32 = hasTransposeTune ? i32(load<f32>(opsPtr + ((pc + bytecodeLen + 1) << 2))) : -1
  pc += totalLen

  let transpose: f32 = 0.0
  let tune: f32 = 1.0
  if (transposeIdx >= 0 && transposeIdx < vm.globals.length) transpose = getScalarGlobal(vm, transposeIdx)
  if (tuneIdx >= 0 && tuneIdx < vm.globals.length) tune = getScalarGlobal(vm, tuneIdx)
  const freqMul: f64 = Math.pow(2.0, transpose as f64 / 12.0) * (tune as f64)

  if (vm.stackTop <= 0) throw new Error('Mini: stack empty')

  const barsTagged: f64 = vmStack.pop(vm)
  const barsValue: f32 = genOpHelpers.scalarOrFirstSample(vm, barsTagged)
  if (isAudio(barsTagged)) vm.arena.releaseByPtr(u32(decodeAudio(barsTagged)))

  const slot = vm.genPools[vm.miniGenPoolIndex].get()
  genOpHelpers.resolveAndPushAbsolutePC(vm, miniOpPc)
  genOpHelpers.writeCallStackMetaToSlot(vm, slot)
  if (vm.absolutePCCallStackTop > 0) vm.absolutePCCallStackTop--

  vm.paramScratch[0] = barsValue
  slot.history.write(params.sampleCount, vm.paramScratch)

  const instance: MiniKernel = changetype<MiniKernel>(slot.instance)
  const windowStartSample: i32 = i32(params.sampleCount)
  const windowEndSample: i32 = windowStartSample + params.bufferLength
  const tupleBuffer: Float64Array = vm.float64Arena.get(1024 * 3)
  const tupleCount: i32 = instance.process(params.bufferLength, f32(params.sampleCount), params.sampleRate,
    vm.currentBpm, miniBytecodePtr, bytecodeLen, barsValue, windowStartSample, windowEndSample, tupleBuffer)
  if (freqMul != 1.0) {
    for (let i: i32 = 0; i < tupleCount * 3; i += 3) {
      tupleBuffer[i] = tupleBuffer[i] * freqMul
    }
  }
  if (tupleCount <= 0) {
    vm.float64Arena.release(tupleBuffer)
    const outerArrayValues: Float64Array = VmState.EMPTY_FLOAT64_ARRAY
    vm.arrays.push(outerArrayValues)
    vm.arrayLengths.push(0)
    vm.arrayRefcounts.push(0)
    vmStack.push(vm, encodeArray(u32(vm.arrays.length)))
    return RunResult.normal(pc, opsPtr, params.opsLength)
  }
  for (let i: i32 = tupleCount - 1; i >= 0; i--) {
    const baseIdx: i32 = i * 3
    const tupleArr: Float64Array = vm.float64Arena.get(3)
    tupleArr[0] = encodeScalar(tupleBuffer[baseIdx + 0] as f32)
    tupleArr[1] = encodeScalar(tupleBuffer[baseIdx + 1] as f32)
    tupleArr[2] = encodeScalar(tupleBuffer[baseIdx + 2] as f32)
    vm.arrays.push(tupleArr)
    vm.arrayLengths.push(3)
    vm.arrayRefcounts.push(0)
    vmStack.push(vm, encodeArray(u32(vm.arrays.length)))
  }
  vm.float64Arena.release(tupleBuffer)
  const outerArrayValues: Float64Array = vm.float64Arena.get(tupleCount)
  for (let i: i32 = tupleCount - 1; i >= 0; i--) {
    outerArrayValues[i] = vmStack.pop(vm)
    if (isAudio(outerArrayValues[i])) vm.arena.retain(u32(decodeAudio(outerArrayValues[i])))
  }
  vm.arrays.push(outerArrayValues)
  vm.arrayLengths.push(tupleCount)
  vm.arrayRefcounts.push(0)
  vmStack.push(vm, encodeArray(u32(vm.arrays.length)))
  return RunResult.normal(pc, opsPtr, params.opsLength)
}

export function handleOversample(
  vm: VmState,
  pc: i32,
  opsPtr: usize,
  params: RunParams,
): RunResult {
  const relativePC: i32 = pc - 1

  if (vm.stackTop < 2) throw new Error(`Oversample: stackTop=${vm.stackTop} < 2`)

  let funcTagged: f64 = vm.stack[vm.stackTop - 1]
  const factorTagged: f64 = vm.stack[vm.stackTop - 2]
  funcTagged = vmOpsVars.resolveCellRef(vm, funcTagged)

  if (!isScalar(factorTagged) || !isFunction(funcTagged)) {
    throw new Error('Oversample: factor must be scalar and func must be function')
  }

  // Use proper pops so vmStack release logic runs for each slot (safe for
  // scalar/function types today, and correct if types ever change).
  vmStack.pop(vm) // func
  vmStack.pop(vm) // factor

  const factor: i32 = i32(decodeScalar(factorTagged))
  if (factor < 1) throw new Error(`Oversample: factor=${factor} < 1`)

  const instanceId: i32 = i32(decodeFunction(funcTagged))
  let closureEnvId: i32 = -1
  let funcDef: FunctionDef | null = null

  const instance: FunctionInstance | null = vm.functionInstances.tryGet(instanceId)
  if (instance != null) {
    funcDef = vm.functions.tryGet(instance.defId)
    closureEnvId = instance.closureEnvId
  }
  else {
    funcDef = vm.functions.tryGet(instanceId)
  }

  if (funcDef == null) throw new Error(`Oversample: function not found instanceId=${instanceId}`)

  const oversampledLength: i32 = params.bufferLength * factor
  const oversampledProcLen: i32 = (oversampledLength + 15) & ~15
  const oversampledSampleRate: f32 = params.sampleRate * f32(factor)
  const oversampledNyquist: f32 = oversampledSampleRate * 0.5
  const oversampledPiOverNyquist: f32 = f32(Mathf.PI) / oversampledNyquist

  let tempArrayIds: FastArray<u32> | null = null
  let closureOverride: Float64Array | null = null

  const closureEnv: ClosureEnv | null = factor > 1 && closureEnvId >= 0 ? vm.closureEnvs.tryGet(closureEnvId) : null
  if (closureEnv != null) {
    const env: ClosureEnv = closureEnv
    const n: i32 = env.cells.length
    closureOverride = vm.float64Arena.get(n)
    for (let i: i32 = 0; i < n; i++) closureOverride[i] = encodeUndefined()

    tempArrayIds = vm.fastArrayU32Pool.acquire()
    vm.upsampleCache.clear()

    for (let i: i32 = 0; i < n; i++) {
      const cellIdx: i32 = env.cells.get(i)
      const v: f64 = cellIdx >= 0 && cellIdx < vm.cells.length
        ? vmOpsVars.getCellValue(vm, cellIdx)
        : encodeUndefined()

      if (isAudio(v)) {
        const basePtr: u32 = u32(decodeAudio(v))
        let upPtr: u32 = vm.upsampleCache.get(basePtr)
        if (upPtr != 0) {
          vm.arena.retain(upPtr)
        }
        else {
          const up: Float32Array = vm.arena.get(oversampledProcLen)
          const upData: usize = up.dataStart
          if (vm.perfCountersEnabled) vm.perfCounters[6]++
          upsample(changetype<VmState>(vm), usize(basePtr), upData, params.bufferLength, factor)
          genOpHelpers.extendBufferWithLastSample(upData, oversampledLength, oversampledProcLen)

          upPtr = u32(upData)
          vm.upsampleCache.set(basePtr, upPtr)
        }

        closureOverride[i] = encodeAudio(usize(upPtr))
      }
      else if (isScalar(v)) {
        closureOverride[i] = encodeUndefined()
      }
      else if (isArray(v)) {
        const arrId: u32 = decodeArray(v)
        if (arrId > 0 && arrId <= u32(vm.arrays.length)) {
          const arr: Float64Array = vm.arrays.get(i32(arrId) - 1)
          const len: i32 = vm.arrayLengths.get(i32(arrId) - 1)
          const cloned: Float64Array = vm.float64Arena.get(len)

          for (let j: i32 = 0; j < len; j++) {
            const e: f64 = arr[j]
            if (isAudio(e)) {
              const basePtr: u32 = u32(decodeAudio(e))
              let upPtr: u32 = vm.upsampleCache.get(basePtr)
              if (upPtr != 0) {
                vm.arena.retain(upPtr)
              }
              else {
                const up: Float32Array = vm.arena.get(oversampledProcLen)
                const upData: usize = up.dataStart
                if (vm.perfCountersEnabled) vm.perfCounters[6]++
                upsample(changetype<VmState>(vm), usize(basePtr), upData, params.bufferLength, factor)
                genOpHelpers.extendBufferWithLastSample(upData, oversampledLength, oversampledProcLen)

                upPtr = u32(upData)
                vm.upsampleCache.set(basePtr, upPtr)
              }

              cloned[j] = encodeAudio(usize(upPtr))
            }
            else {
              cloned[j] = e
            }
          }

          vm.arrays.push(cloned)
          vm.arrayLengths.push(len)
          vm.arrayRefcounts.push(0)
          const newArrId: u32 = u32(vm.arrays.length)
          tempArrayIds.push(newArrId)
          closureOverride[i] = encodeArray(newArrId)
        }
        else {
          closureOverride[i] = v
        }
      }
      else {
        closureOverride[i] = v
      }
    }
    // Do not overwrite outer scope cells; GetClosure reads from closureOverride (or cell for scalars)
  }

  const savedLocals: FastArray<i32> = vm.fastArrayI32Pool.acquire()
  for (let i: i32 = 0; i < vm.locals.length; i++) savedLocals.push(vm.locals.get(i))

  const oversampleFunctionId: i32 = funcDef.functionId
  let absolutePC: i32 = relativePC
  if (vm.callStack.length > 0) {
    const callerFrame: CallFrame = vm.callStack.get(vm.callStack.length - 1)
    const currentFuncDef: FunctionDef | null = vm.functions.tryGet(callerFrame.functionId)
    if (currentFuncDef != null) {
      absolutePC = currentFuncDef.bytecodeStartPC + relativePC
    }
  }

  const frame: CallFrame = vm.callFramePool.acquire()
  frame.init(
    pc,
    opsPtr,
    params.opsLength,
    vm.stackTop,
    savedLocals,
    closureEnvId,
    oversampleFunctionId,
    true,
    factor,
    params.sampleRate,
    params.nyquist,
    params.piOverNyquist,
    params.bufferLength,
    f32(params.sampleCount),
    -1,
    tempArrayIds,
    closureOverride,
    relativePC,
    false,
    0,
    -1,
    -1,
    0,
    null,
  )

  vm.callStack.push(frame)

  if (vm.absolutePCCallStackTop < 8) {
    vm.absolutePCCallStack[vm.absolutePCCallStackTop++] = absolutePC
  }

  vm.locals.clear()

  params.bufferLength = oversampledLength
  params.sampleRate = oversampledSampleRate
  params.sampleCount = i32(f32(params.sampleCount) * f32(factor))
  params.nyquist = oversampledNyquist
  params.piOverNyquist = oversampledPiOverNyquist

  return RunResult.continue(0, funcDef.bytecode.dataStart, funcDef.bytecodeLength)
}
