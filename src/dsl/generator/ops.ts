import type { Gen } from '../ast.ts'
import {
  collectAudioVmSpecs,
  generatedHeader,
  type GenSpecializationSpec,
  type GenVariantSpec,
  getAudioVmOpNames,
  IndentHelper,
  toKebabCase,
} from './helpers.ts'

export type AudioVmAssemblySplit = {
  controller: string
  genFiles: Map<string, string>
}

type GenVariantsEntry = {
  gen: Gen
  variants: GenVariantSpec[]
  firstOpName: string
  lastOpName: string
}

function buildGenVariantsList(gens: Gen[], variants: GenVariantSpec[]): GenVariantsEntry[] {
  const list: GenVariantsEntry[] = []
  for (const gen of gens) {
    const gv = variants.filter(v => v.genName === gen.name)
    if (gv.length === 0) continue
    list.push({
      gen,
      variants: gv,
      firstOpName: gv[0].opName,
      lastOpName: gv[gv.length - 1].opName,
    })
  }
  return list
}

export function generateAudioVmParams(gens: Gen[]): string {
  const { maxParamCount, specs } = collectAudioVmSpecs(gens)
  const value = Math.max(0, maxParamCount)
  const arrayGetGenSpecIndex = specs.length + 5
  return `${generatedHeader}
export const MAX_PARAM_COUNT: i32 = ${value}
export const ARRAY_HISTORY_TYPE_ID: i32 = ${arrayGetGenSpecIndex}
`
}

export function generateAudioVmOp(gens: Gen[]): string {
  const { variants } = collectAudioVmSpecs(gens)
  const opNames = getAudioVmOpNames(variants)

  const lines: string[] = []
  const indent = new IndentHelper()

  lines.push(generatedHeader)
  lines.push('')
  lines.push('export enum AudioVmOp {')
  indent.indent()
  opNames.forEach(name => lines.push(indent.write(`${name},`)))
  indent.dedent()
  lines.push('}')
  lines.push('')
  const firstGenOpName = variants.length > 0 ? variants[0].opName : 'GenEvery_default'
  lines.push(`export const FIRST_GEN_OP: AudioVmOp = AudioVmOp.${firstGenOpName}`)

  return lines.join('\n')
}

export function generateAudioVmAssembly(gens: Gen[]): AudioVmAssemblySplit {
  const { variants, specs } = collectAudioVmSpecs(gens)
  const genMap = new Map<string, Gen>()
  gens.forEach(gen => genMap.set(gen.name, gen))
  const genVariantsList = buildGenVariantsList(gens, variants)
  const tableTypeId = specs.length
  const tramGenId = specs.length + 1
  const miniGenId = specs.length + 2
  const timelineGenId = specs.length + 3
  const outGenId = specs.length + 4
  const mixGenId = specs.length + 5
  const arrayGetGenSpecIndex = specs.length + 6

  function emitVariantCases(
    variantsToEmit: GenVariantSpec[],
    caseGenMap: Map<string, Gen>,
    outLines: string[],
    outIndent: IndentHelper,
  ): void {
    const oversample = (
      indent: IndentHelper,
      options: {
        onActive: (indent: IndentHelper, baseVars: {
          baseLen: string
          baseSampleCount: string
          baseSampleRate: string
          baseNyquist: string
          basePiOverNyquist: string
          baseProcLen: string
          baseOut: string
          baseOutPtr: string
          osFactor: string
        }) => string[]
        onInactive: (indent: IndentHelper) => string[]
      },
    ): string[] => {
      const oversampleLines: string[] = []
      oversampleLines.push(indent.write('const osFactor: i32 = genOpHelpers.getOversampleFactor(this)'))
      oversampleLines.push(indent.write('if (osFactor > 0) {'))
      outIndent.indent()
      oversampleLines.push(indent.write('const baseLen: i32 = bufferLength / osFactor'))
      oversampleLines.push(indent.write('const baseSampleRate: f32 = sampleRate / f32(osFactor)'))
      oversampleLines.push(indent.write('const baseNyquist: f32 = baseSampleRate * 0.5'))
      oversampleLines.push(indent.write('const basePiOverNyquist: f32 = f32(Mathf.PI) / baseNyquist'))
      oversampleLines.push(indent.write('const baseSampleCount: f32 = f32(sampleCount) / f32(osFactor)'))
      oversampleLines.push(indent.write('const baseProcLen: i32 = (baseLen + 15) & ~15'))
      oversampleLines.push(indent.write('const baseOut: Float32Array = this.arena.get(baseProcLen)'))
      oversampleLines.push(indent.write('const baseOutPtr: usize = baseOut.dataStart'))
      const baseVars = {
        baseLen: 'baseLen',
        baseSampleCount: 'baseSampleCount',
        baseSampleRate: 'baseSampleRate',
        baseNyquist: 'baseNyquist',
        basePiOverNyquist: 'basePiOverNyquist',
        baseProcLen: 'baseProcLen',
        baseOut: 'baseOut',
        baseOutPtr: 'baseOutPtr',
        osFactor: 'osFactor',
      }
      oversampleLines.push(...options.onActive(indent, baseVars))
      outIndent.dedent()
      oversampleLines.push(indent.write('} else {'))
      outIndent.indent()
      oversampleLines.push(...options.onInactive(indent))
      outIndent.dedent()
      oversampleLines.push(indent.write('}'))
      return oversampleLines
    }

    // Helper to generate mono specialization code
    // inputVar is the name of the variable holding the input tagged value (could be audio or scalar)
    const generateMonoSpecCode = (
      indent: IndentHelper,
      variant: GenVariantSpec,
      spec: GenSpecializationSpec,
      paramNames: string[],
      inputVar: string = 'inputTagged',
    ): string[] => {
      const specLines: string[] = []
      specLines.push(indent.write(`const slot: GenSlot = this.genPools[${spec.id}].get()`))
      const gen = caseGenMap.get(spec.genName)
      specLines.push(indent.write('genOpHelpers.writeCallStackMetaToSlot(this, slot)'))
      // Generated kernels use unrolled loops (e.g. 16-sample blocks) and may write past `bufferLength`
      // when it is not a multiple of the unroll factor (tests sometimes use bufferLength=1).
      specLines.push(indent.write('const procLen: i32 = genOpHelpers.alignedProcLength(bufferLength)'))
      if (variant.usesInput) {
        specLines.push(
          indent.write(`const inputSrcResult = genOpHelpers.taggedToInputBuffer(this, ${inputVar}, procLen)`),
        )
        specLines.push(indent.write(`const inputSrcPtr: usize = inputSrcResult.ptr`))
        specLines.push(indent.write(`const inputSrcBuf: Float32Array = inputSrcResult.buf`))
        specLines.push(indent.write('genOpHelpers.writeInputToHistoryRing(slot.history, inputSrcPtr, bufferLength)'))
        specLines.push(indent.write('const inputPtr: usize = inputSrcPtr'))
      }
      else {
        specLines.push(indent.write('genOpHelpers.writeInputToHistoryRingZero(slot.history)'))
        specLines.push(indent.write('const inputPtr: usize = 0'))
      }
      // Render into a real output buffer (bufferLength may differ from waveform chunk size under oversampling).
      specLines.push(indent.write('output = this.arena.get(procLen)'))
      specLines.push(indent.write('const outputPtr: usize = output.dataStart'))
      specLines.push(indent.write(`const instance: ${spec.className} = changetype<${spec.className}>(slot.instance)`))
      // Write emit values
      if (gen && gen.emit && gen.emit.length > 0) {
        gen.emit.forEach((emitName, index) => {
          const paramIndex = paramNames.length + index
          specLines.push(indent.write(`this.paramScratch[${paramIndex}] = instance.${emitName}`))
        })
      }
      const orderedParams = [
        ...paramNames.map((paramName, i) => ({ paramName, mode: spec.paramModes[i] })).filter(p => p.mode === 'scalar'),
        ...paramNames.map((paramName, i) => ({ paramName, mode: spec.paramModes[i] })).filter(p => p.mode === 'audio'),
      ]
      const audioParamInfosForSpec = orderedParams.filter(p => p.mode === 'audio')
      for (const p of audioParamInfosForSpec) {
        specLines.push(indent.write(`const ${p.paramName}AudioResult = genOpHelpers.taggedToAudioParamBuffer(this, ${p.paramName}Tagged, procLen)`))
      }
      const callArg = (p: { paramName: string; mode: string }) => {
        if (p.paramName === 'key' && p.mode === 'scalar' && variant.usesInput) return 'inputPtr'
        return p.mode === 'audio' ? `${p.paramName}AudioResult.ptr` : `${p.paramName}Value`
      }
      const callArgs = [
        'bufferLength',
        'sampleCount',
        'sampleRate',
        'nyquist',
        'piOverNyquist',
        'this.currentBpm',
        'this.co',
        'this.samplesPerBeat',
        'this.samplesPerBar',
        'inputPtr',
        'outputPtr',
        ...orderedParams.map(callArg),
      ]
      if (spec.rate === 'control') {
        const audioParamInfos = paramNames
          .map((paramName, i) => ({ paramName, mode: spec.paramModes[i] }))
          .filter(p => p.mode === 'audio')
        specLines.push(
          ...oversample(indent, {
            onActive: (indent, baseVars) => {
              const activeLines: string[] = []
              activeLines.push(indent.write('let baseInputPtr: usize = inputPtr'))
              if (variant.usesInput) {
                activeLines.push(indent.write('let baseIn: Float32Array = changetype<Float32Array>(0)'))
                activeLines.push(indent.write('if (inputPtr != 0) {'))
                outIndent.indent()
                activeLines.push(indent.write('baseIn = this.arena.get(baseProcLen)'))
                activeLines.push(indent.write('baseInputPtr = baseIn.dataStart'))
                activeLines.push(indent.write('this.downsample(inputPtr, baseInputPtr, baseLen, osFactor)'))
                activeLines.push(indent.write('if (baseProcLen > baseLen && baseLen > 0) {'))
                outIndent.indent()
                activeLines.push(indent.write('const last: f32 = load<f32>(baseInputPtr + (usize(baseLen - 1) << 2))'))
                activeLines.push(indent.write('for (let k: i32 = baseLen; k < baseProcLen; k++) {'))
                outIndent.indent()
                activeLines.push(indent.write('store<f32>(baseInputPtr + (usize(k) << 2), last)'))
                outIndent.dedent()
                activeLines.push(indent.write('}'))
                outIndent.dedent()
                activeLines.push(indent.write('}'))
                outIndent.dedent()
                activeLines.push(indent.write('}'))
              }
              for (const p of audioParamInfos) {
                const n = p.paramName
                activeLines.push(indent.write(`const ${n}Src: usize = ${n}AudioResult.ptr`))
                activeLines.push(indent.write(`const ${n}Buf: Float32Array = this.arena.get(baseProcLen)`))
                activeLines.push(indent.write(`const ${n}Ptr: usize = ${n}Buf.dataStart`))
                activeLines.push(indent.write(`this.downsample(${n}Src, ${n}Ptr, baseLen, osFactor)`))
                activeLines.push(indent.write('if (baseProcLen > baseLen && baseLen > 0) {'))
                outIndent.indent()
                activeLines.push(indent.write(`const last: f32 = load<f32>(${n}Ptr + (usize(baseLen - 1) << 2))`))
                activeLines.push(indent.write('for (let k: i32 = baseLen; k < baseProcLen; k++) {'))
                outIndent.indent()
                activeLines.push(indent.write(`store<f32>(${n}Ptr + (usize(k) << 2), last)`))
                outIndent.dedent()
                activeLines.push(indent.write('}'))
                outIndent.dedent()
                activeLines.push(indent.write('}'))
              }
              activeLines.push(indent.write('slot.history.write(sampleCount / osFactor, this.paramScratch)'))
              const baseArgs = [
                'baseLen',
                'sampleCount / osFactor',
                'baseSampleRate',
                'baseNyquist',
                'basePiOverNyquist',
                'this.currentBpm',
                'this.co',
                'this.samplesPerBeat',
                'this.samplesPerBar',
                'baseInputPtr',
                'baseOutPtr',
                ...orderedParams.map(p =>
                  p.paramName === 'key' && p.mode === 'scalar' && variant.usesInput
                    ? 'baseInputPtr'
                    : p.mode === 'audio'
                    ? `${p.paramName}Ptr`
                    : `${p.paramName}Value`
                ),
              ]
              activeLines.push(indent.write(`instance.process(${baseArgs.join(', ')})`))
              activeLines.push(indent.write('this.upsample(baseOutPtr, outputPtr, baseLen, osFactor)'))
              activeLines.push(
                indent.write(
                  'genOpHelpers.extendBufferWithLastSample(outputPtr, bufferLength, genOpHelpers.alignedProcLength(bufferLength))',
                ),
              )
              activeLines.push(indent.write('this.arena.release(baseOut)'))
              for (const p of audioParamInfos) {
                const n = p.paramName
                activeLines.push(indent.write(`this.arena.release(${n}Buf)`))
                activeLines.push(indent.write(`genOpHelpers.releaseTaggedAudioParamResult(this, ${n}AudioResult)`))
              }
              if (variant.usesInput) {
                activeLines.push(indent.write('if (baseIn != changetype<Float32Array>(0)) this.arena.release(baseIn)'))
              }
              return activeLines
            },
            onInactive: indent => {
              const inactiveLines: string[] = []
              inactiveLines.push(indent.write('slot.history.write(sampleCount, this.paramScratch)'))
              inactiveLines.push(indent.write(`instance.process(${callArgs.join(', ')})`))
              for (const p of audioParamInfos) {
                inactiveLines.push(indent.write(`genOpHelpers.releaseTaggedAudioParamResult(this, ${p.paramName}AudioResult)`))
              }
              return inactiveLines
            },
          }),
        )
      }
      else {
        specLines.push(indent.write('slot.history.write(sampleCount, this.paramScratch)'))
        specLines.push(indent.write(`instance.process(${callArgs.join(', ')})`))
      }
      specLines.push(indent.write('genOpHelpers.writeOutputToHistoryRing(slot.history, outputPtr, bufferLength)'))

      if (variant.usesInput) {
        specLines.push(indent.write('genOpHelpers.releaseTaggedInputBuf(this, inputSrcBuf)'))
      }
      for (const p of audioParamInfosForSpec) {
        specLines.push(indent.write(`genOpHelpers.releaseTaggedAudioParamResult(this, ${p.paramName}AudioResult)`))
      }
      return specLines
    }

    // Helper to generate stereo specialization code
    const generateStereoSpecCode = (
      indent: IndentHelper,
      variant: GenVariantSpec,
      spec: GenSpecializationSpec,
      paramNames: string[],
    ): string[] => {
      const specLines: string[] = []
      specLines.push(indent.write(`const slot: GenSlot = this.genPools[${spec.id}].get()`))
      const gen = caseGenMap.get(spec.genName)
      specLines.push(indent.write('genOpHelpers.writeCallStackMetaToSlot(this, slot)'))
      specLines.push(indent.write('const procLen: i32 = genOpHelpers.alignedProcLength(bufferLength)'))
      specLines.push(indent.write('genOpHelpers.writeInputToHistoryRing(slot.history, inputLeftPtr, bufferLength)'))
      specLines.push(indent.write('const outputChunkPos: i32 = slot.history.outputChunkPos'))
      specLines.push(indent.write('const outputRingPtr: usize = slot.history.outputRing.dataStart'))
      specLines.push(indent.write('const outputChunkPos2: i32 = (outputChunkPos + 1) & WAVEFORM_RING_MASK'))
      specLines.push(
        indent.write(
          'const outputLeftRingPtr: usize = outputRingPtr + (usize(outputChunkPos * WAVEFORM_CHUNK_SAMPLES) << 2)',
        ),
      )
      specLines.push(
        indent.write(
          'const outputRightRingPtr: usize = outputRingPtr + (usize(outputChunkPos2 * WAVEFORM_CHUNK_SAMPLES) << 2)',
        ),
      )
      specLines.push(indent.write('const outputL: Float32Array = this.arena.get(procLen)'))
      specLines.push(indent.write('const outputR: Float32Array = this.arena.get(procLen)'))
      specLines.push(indent.write('const outputLeftPtr: usize = outputL.dataStart'))
      specLines.push(indent.write('const outputRightPtr: usize = outputR.dataStart'))
      specLines.push(indent.write(`const instance: ${spec.className} = changetype<${spec.className}>(slot.instance)`))
      // Write emit values
      if (gen && gen.emit && gen.emit.length > 0) {
        gen.emit.forEach((emitName, index) => {
          const paramIndex = paramNames.length + index
          specLines.push(indent.write(`this.paramScratch[${paramIndex}] = instance.${emitName}`))
        })
      }
      specLines.push(indent.write('slot.history.write(sampleCount, this.paramScratch)'))
      const orderedParams = [
        ...paramNames.map((paramName, i) => ({ paramName, mode: spec.paramModes[i] })).filter(p => p.mode === 'scalar'),
        ...paramNames.map((paramName, i) => ({ paramName, mode: spec.paramModes[i] })).filter(p => p.mode === 'audio'),
      ]
      const stereoAudioParamInfos = orderedParams.filter(p => p.mode === 'audio')
      for (const p of stereoAudioParamInfos) {
        specLines.push(indent.write(`const ${p.paramName}AudioResult = genOpHelpers.taggedToAudioParamBuffer(this, ${p.paramName}Tagged, procLen)`))
      }
      const callArgs = [
        'bufferLength',
        'sampleCount',
        'sampleRate',
        'nyquist',
        'piOverNyquist',
        'this.currentBpm',
        'this.co',
        'this.samplesPerBeat',
        'this.samplesPerBar',
        'inputLeftPtr',
        'inputRightPtr',
        'outputLeftPtr',
        'outputRightPtr',
        ...orderedParams.map(p => p.mode === 'audio' ? `${p.paramName}AudioResult.ptr` : `${p.paramName}Value`),
      ]
      specLines.push(indent.write(`instance.process(${callArgs.join(', ')})`))
      specLines.push(indent.write('if (bufferLength <= WAVEFORM_CHUNK_SAMPLES) {'))
      specLines.push(indent.write('  memory.copy(outputLeftRingPtr, outputLeftPtr, usize(bufferLength) << 2)'))
      specLines.push(indent.write('  memory.copy(outputRightRingPtr, outputRightPtr, usize(bufferLength) << 2)'))
      specLines.push(indent.write('  if (bufferLength < WAVEFORM_CHUNK_SAMPLES) {'))
      specLines.push(
        indent.write(
          '    memory.fill(outputLeftRingPtr + (usize(bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - bufferLength) << 2)',
        ),
      )
      specLines.push(
        indent.write(
          '    memory.fill(outputRightRingPtr + (usize(bufferLength) << 2), 0, usize(WAVEFORM_CHUNK_SAMPLES - bufferLength) << 2)',
        ),
      )
      specLines.push(indent.write('  }'))
      specLines.push(indent.write('} else {'))
      specLines.push(indent.write('  const stride: i32 = bufferLength / WAVEFORM_CHUNK_SAMPLES'))
      specLines.push(indent.write('  for (let i: i32 = 0; i < WAVEFORM_CHUNK_SAMPLES; i++) {'))
      specLines.push(indent.write('    const srcIdx: i32 = i * stride'))
      specLines.push(
        indent.write(
          '    const sample: f32 = srcIdx < bufferLength ? load<f32>(outputLeftPtr + (usize(srcIdx) << 2)) : 0.0',
        ),
      )
      specLines.push(indent.write('    store<f32>(outputLeftRingPtr + (i << 2), sample)'))
      specLines.push(
        indent.write(
          '    store<f32>(outputRightRingPtr + (i << 2), srcIdx < bufferLength ? load<f32>(outputRightPtr + (usize(srcIdx) << 2)) : 0.0)',
        ),
      )
      specLines.push(indent.write('  }'))
      specLines.push(indent.write('}'))
      specLines.push(indent.write('slot.history.outputChunkPos = (outputChunkPos2 + 1) & WAVEFORM_RING_MASK'))
      specLines.push(indent.write('slot.history.meta[slot.history.metaOffset + 9] = u32(slot.history.outputChunkPos)'))
      // Create stereo array [L, R] and push it
      specLines.push(indent.write('const stereoArr: Float64Array = this.float64Arena.get(2)'))
      specLines.push(indent.write('stereoArr[0] = encodeAudio(outputL.dataStart)'))
      specLines.push(indent.write('stereoArr[1] = encodeAudio(outputR.dataStart)'))
      specLines.push(indent.write('this.arrays.push(stereoArr)'))
      specLines.push(indent.write('this.arrayLengths.push(2)'))
      specLines.push(indent.write('this.arrayRefcounts.push(0)'))
      specLines.push(indent.write('push(vm, encodeArray(u32(vm.arrays.length)))'))
      for (const p of stereoAudioParamInfos) {
        specLines.push(indent.write(`genOpHelpers.releaseTaggedAudioParamResult(this, ${p.paramName}AudioResult)`))
      }
      return specLines
    }

    const runVar = (s: string) =>
      s.replace(/\bbufferLength\b/g, 'params.bufferLength')
        .replace(/\bsampleCount\b/g, 'params.sampleCount')
        .replace(/\bsampleRate\b/g, 'params.sampleRate')
        .replace(/\boutTop\b/g, 'params.outTop')
        .replace(/\bnyquist\b/g, 'params.nyquist')
        .replace(/\bpiOverNyquist\b/g, 'params.piOverNyquist')
    const wState = (s: string) =>
      outIndent.write(
        runVar(s)
          .replace(/\bthis\b/g, 'vm')
          .replace(/\bvm\.push\(/g, 'push(vm, ')
          .replace(/\bvm\.downsample\(/g, 'downsample(vm, ')
          .replace(/\bvm\.upsample\(/g, 'upsample(vm, '),
      )
    const runVarState = (s: string) =>
      runVar(s)
        .replace(/\bthis\b/g, 'vm')
        .replace(/\bvm\.push\(/g, 'push(vm, ')
        .replace(/\bvm\.downsample\(/g, 'downsample(vm, ')
        .replace(/\bvm\.upsample\(/g, 'upsample(vm, ')
    variantsToEmit.forEach(variant => {
      outLines.push(wState(`case AudioVmOp.${variant.opName}: {`))
      outIndent.indent()
      outLines.push(wState('genOpHelpers.resolveAndPushAbsolutePC(vm, pc)'))
      const paramNames = variant.paramNames
      const reversedParams = [...paramNames].reverse()
      reversedParams.forEach(paramName => {
        outLines.push(wState(`const ${paramName}Tagged: f64 = this.stack[--this.stackTop]`))
      })
      if (variant.usesInput) {
        outLines.push(wState('const inputTagged: f64 = this.stack[--this.stackTop]'))
        outLines.push(
          wState(
            'const inputResolved: f64 = vmOpsVars.resolveCellRef(this, inputTagged)',
          ),
        )
      }
      outLines.push(wState('let output: Float32Array = changetype<Float32Array>(0)'))
      outLines.push(wState('let modeMask: i32 = 0'))
      // Only treat parameters as "audio" in the mode mask if any specialization
      // for this variant actually has that parameter in audio mode. This lets
      // scalar-only params still receive audio signals while using the scalar
      // specialization (value comes from scalarOrFirstSample).
      const audioCapableParams = new Set<number>()
      variant.monoSpecializations.forEach(spec => {
        spec.paramModes.forEach((mode, index) => {
          if (mode === 'audio') audioCapableParams.add(index)
        })
      })
      variant.stereoSpecializations.forEach(spec => {
        spec.paramModes.forEach((mode, index) => {
          if (mode === 'audio') audioCapableParams.add(index)
        })
      })
      paramNames.forEach((paramName, index) => {
        if (!audioCapableParams.has(index)) return
        outLines.push(wState(`if (isAudio(${paramName}Tagged) || genOpHelpers.isStereoAudioArray(vm, ${paramName}Tagged)) {`))
        outIndent.indent()
        outLines.push(wState(`modeMask |= ${1 << index}`))
        outIndent.dedent()
        outLines.push(wState('}'))
      })
      paramNames.forEach((paramName, index) => {
        outLines.push(wState(`const ${paramName}Value: f32 = genOpHelpers.scalarOrFirstSample(vm, ${paramName}Tagged)`))
        outLines.push(wState(`this.paramScratch[${index}] = ${paramName}Value`))
      })

      // Check if this variant has stereo support and input is stereo (array of 2)
      if (variant.hasStereo && variant.usesInput) {
        outLines.push(wState('const isStereoInput: bool = isArray(inputResolved)'))
        outLines.push(wState('if (isStereoInput) {'))
        outIndent.indent()
        outLines.push(wState('const inputArrId: u32 = decodeArray(inputResolved)'))
        outLines.push(wState('if (inputArrId > 0 && inputArrId <= u32(this.arrays.length)) {'))
        outIndent.indent()
        outLines.push(wState('const inputArr: Float64Array = this.arrays.get(i32(inputArrId) - 1)'))
        outLines.push(wState('const inputArrLen: i32 = this.arrayLengths.get(i32(inputArrId) - 1)'))
        outLines.push(wState('if (inputArrLen >= 2) {'))
        outIndent.indent()
        outLines.push(wState('const inputLeftTagged: f64 = inputArr[0]'))
        outLines.push(wState('const inputRightTagged: f64 = inputArr[1]'))
        outLines.push(
          wState(
            'const inputLeftResolved: f64 = vmOpsVars.resolveCellRef(this, inputLeftTagged)',
          ),
        )
        outLines.push(
          wState(
            'const inputRightResolved: f64 = vmOpsVars.resolveCellRef(this, inputRightTagged)',
          ),
        )
        outLines.push(
          wState('const leftResult = genOpHelpers.taggedToInputBuffer(this, inputLeftResolved, bufferLength)'),
        )
        outLines.push(wState('const inputLeftPtr: usize = leftResult.ptr'))
        outLines.push(wState('const inputLeftBuf: Float32Array = leftResult.buf'))
        outLines.push(
          wState('const rightResult = genOpHelpers.taggedToInputBuffer(this, inputRightResolved, bufferLength)'),
        )
        outLines.push(wState('const inputRightPtr: usize = rightResult.ptr'))
        outLines.push(wState('const inputRightBuf: Float32Array = rightResult.buf'))
        outLines.push(wState('switch (modeMask) {'))
        outIndent.indent()
        variant.stereoSpecializations.forEach(spec => {
          const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
          outLines.push(wState(`case ${mask}: {`))
          outIndent.indent()
          generateStereoSpecCode(outIndent, variant, spec, paramNames).forEach(l => outLines.push(runVarState(l)))
          outLines.push(wState('break'))
          outIndent.dedent()
          outLines.push(wState('}'))
        })
        outIndent.dedent()
        outLines.push(wState('}'))
        outLines.push(wState('genOpHelpers.releaseTaggedInputResult(this, inputLeftPtr, inputLeftBuf)'))
        outLines.push(wState('genOpHelpers.releaseTaggedInputResult(this, inputRightPtr, inputRightBuf)'))
        // Input arrays are borrowed values; do not consume/release them here.
        // Stereo path: L/R already pushed inside generateStereoSpecCode
        outIndent.dedent()
        outLines.push(wState('} else {'))
        outIndent.indent()
        // Fall through for arrays with < 2 elements
        outLines.push(wState('const monoInputFromArr: f64 = inputArrLen > 0 ? inputArr[0] : encodeScalar(0.0)'))
        if (variant.stereoOnly) {
          // Stereo-only: use stereo variant with [monoInputFromArr, monoInputFromArr]
          outLines.push(
            wState('const monoInputResult = genOpHelpers.taggedToInputBuffer(this, monoInputFromArr, bufferLength)'),
          )
          outLines.push(wState('const inputLeftPtr: usize = monoInputResult.ptr'))
          outLines.push(wState('const inputRightPtr: usize = monoInputResult.ptr'))
          outLines.push(wState('const inputLeftBuf: Float32Array = monoInputResult.buf'))
          outLines.push(wState('const inputRightBuf: Float32Array = monoInputResult.buf'))
          outLines.push(wState('switch (modeMask) {'))
          outIndent.indent()
          variant.stereoSpecializations.forEach(spec => {
            const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
            outLines.push(wState(`case ${mask}: {`))
            outIndent.indent()
            generateStereoSpecCode(outIndent, variant, spec, paramNames).forEach(l => outLines.push(runVarState(l)))
            outLines.push(wState('break'))
            outIndent.dedent()
            outLines.push(wState('}'))
          })
          outIndent.dedent()
          outLines.push(wState('}'))
          outLines.push(wState('genOpHelpers.releaseTaggedInputResult(this, inputLeftPtr, inputLeftBuf)'))
        }
        else {
          outLines.push(wState('switch (modeMask) {'))
          outIndent.indent()
          variant.monoSpecializations.forEach(spec => {
            const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
            outLines.push(wState(`case ${mask}: {`))
            outIndent.indent()
            generateMonoSpecCode(outIndent, variant, spec, paramNames, 'monoInputFromArr').forEach(l =>
              outLines.push(runVarState(l))
            )
            outLines.push(wState('break'))
            outIndent.dedent()
            outLines.push(wState('}'))
          })
          outLines.push(wState('default: {'))
          outIndent.indent()
          outLines.push(wState('const procLen: i32 = (bufferLength + 15) & ~15'))
          outLines.push(wState('output = this.arena.get(procLen)'))
          outLines.push(wState('memory.fill(output.dataStart, 0, usize(procLen) << 2)'))
          outLines.push(wState('break'))
          outIndent.dedent()
          outLines.push(wState('}'))
          outIndent.dedent()
          outLines.push(wState('}'))
          outLines.push(wState('this.push(encodeAudio(output.dataStart), true)'))
        }
        outLines.push(
          wState(
            'if (isAudio(monoInputFromArr)) this.arena.releaseByPtr(u32(decodeAudio(monoInputFromArr)))',
          ),
        )
        outIndent.dedent()
        outLines.push(wState('}'))
        outIndent.dedent()
        outLines.push(wState('}'))
        // Close validity check, fall through to mono if invalid array
        outIndent.dedent()
        outLines.push(wState('} else {'))
        outIndent.indent()
        // Mono input path (not an array)
        if (variant.stereoOnly) {
          // Stereo-only gen (no audio block): use stereo variant with [input, input]
          outLines.push(
            wState('const monoInputResult = genOpHelpers.taggedToInputBuffer(this, inputResolved, bufferLength)'),
          )
          outLines.push(wState('const inputLeftPtr: usize = monoInputResult.ptr'))
          outLines.push(wState('const inputRightPtr: usize = monoInputResult.ptr'))
          outLines.push(wState('const inputLeftBuf: Float32Array = monoInputResult.buf'))
          outLines.push(wState('const inputRightBuf: Float32Array = monoInputResult.buf'))
          outLines.push(wState('switch (modeMask) {'))
          outIndent.indent()
          variant.stereoSpecializations.forEach(spec => {
            const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
            outLines.push(wState(`case ${mask}: {`))
            outIndent.indent()
            generateStereoSpecCode(outIndent, variant, spec, paramNames).forEach(l => outLines.push(runVarState(l)))
            outLines.push(wState('break'))
            outIndent.dedent()
            outLines.push(wState('}'))
          })
          outIndent.dedent()
          outLines.push(wState('}'))
          outLines.push(wState('genOpHelpers.releaseTaggedInputResult(this, inputLeftPtr, inputLeftBuf)'))
          outLines.push(
            wState('if (isAudio(inputTagged)) this.arena.releaseByPtr(u32(decodeAudio(inputTagged)))'),
          )
          outLines.push(wState('if (this.absolutePCCallStackTop > 0) this.absolutePCCallStackTop--'))
          outLines.push(wState('return pc'))
        }
        else {
          outLines.push(wState('switch (modeMask) {'))
          outIndent.indent()
          variant.monoSpecializations.forEach(spec => {
            const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
            outLines.push(wState(`case ${mask}: {`))
            outIndent.indent()
            generateMonoSpecCode(outIndent, variant, spec, paramNames).forEach(l => outLines.push(runVarState(l)))
            outLines.push(wState('break'))
            outIndent.dedent()
            outLines.push(wState('}'))
          })
          outIndent.dedent()
          outLines.push(wState('}'))
          // Release mono input (batched at tick end)
          outLines.push(
            wState('if (isAudio(inputTagged)) this.arena.releaseByPtr(u32(decodeAudio(inputTagged)))'),
          )
          outLines.push(wState('this.push(encodeAudio(output.dataStart), true)'))
        }
        outIndent.dedent()
        outLines.push(wState('}'))
      }
      else {
        if (variant.usesInput) {
          // Stereo lifting: if input is 2-element array, run generator twice
          outLines.push(wState('if (isArray(inputResolved)) {'))
          outIndent.indent()
          outLines.push(wState('const inputArrId: u32 = decodeArray(inputResolved)'))
          outLines.push(wState('if (inputArrId > 0 && inputArrId <= u32(this.arrays.length)) {'))
          outIndent.indent()
          outLines.push(wState('const inputArr: Float64Array = this.arrays.get(i32(inputArrId) - 1)'))
          outLines.push(wState('const inputArrLen: i32 = this.arrayLengths.get(i32(inputArrId) - 1)'))
          outLines.push(wState('if (inputArrLen >= 2) {'))
          outIndent.indent()
          outLines.push(wState('const inputLeftTagged: f64 = inputArr[0]'))
          outLines.push(wState('const inputRightTagged: f64 = inputArr[1]'))
          outLines.push(
            wState(
              'const inputLeftResolved: f64 = vmOpsVars.resolveCellRef(this, inputLeftTagged)',
            ),
          )
          outLines.push(
            wState(
              'const inputRightResolved: f64 = vmOpsVars.resolveCellRef(this, inputRightTagged)',
            ),
          )
          outLines.push(wState('let outputL: Float32Array = changetype<Float32Array>(0)'))
          outLines.push(wState('let outputR: Float32Array = changetype<Float32Array>(0)'))
          // Generate stereo lifting code for each mono specialization
          outLines.push(wState('switch (modeMask) {'))
          outIndent.indent()
          variant.monoSpecializations.forEach(spec => {
            const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
            outLines.push(wState(`case ${mask}: {`))
            outIndent.indent()
            // Left channel
            outLines.push(wState('{'))
            outIndent.indent()
            generateMonoSpecCode(outIndent, variant, spec, paramNames, 'inputLeftResolved').forEach(l =>
              outLines.push(runVarState(l))
            )
            outLines.push(wState('outputL = output'))
            outIndent.dedent()
            outLines.push(wState('}'))
            // Right channel
            outLines.push(wState('{'))
            outIndent.indent()
            generateMonoSpecCode(outIndent, variant, spec, paramNames, 'inputRightResolved').forEach(l =>
              outLines.push(runVarState(l))
            )
            outLines.push(wState('outputR = output'))
            outIndent.dedent()
            outLines.push(wState('}'))
            outLines.push(wState('break'))
            outIndent.dedent()
            outLines.push(wState('}'))
          })
          outIndent.dedent()
          outLines.push(wState('}'))
          // Create stereo array result
          outLines.push(wState('const stereoArr: Float64Array = this.float64Arena.get(2)'))
          outLines.push(wState('stereoArr[0] = encodeAudio(outputL.dataStart)'))
          outLines.push(wState('stereoArr[1] = encodeAudio(outputR.dataStart)'))
          outLines.push(wState('this.arrays.push(stereoArr)'))
          outLines.push(wState('this.arrayLengths.push(2)'))
          outLines.push(wState('this.arrayRefcounts.push(0)'))
          outLines.push(wState('this.push(encodeArray(u32(this.arrays.length)))'))
          // Input arrays are borrowed values; do not consume/release them here.
          outLines.push(wState('if (this.absolutePCCallStackTop > 0) this.absolutePCCallStackTop--'))
          outLines.push(wState('return pc'))
          outIndent.dedent()
          outLines.push(wState('}'))
          outIndent.dedent()
          outLines.push(wState('}'))
          outIndent.dedent()
          outLines.push(wState('}'))
        }
        // Normal mono path
        outLines.push(wState('switch (modeMask) {'))
        outIndent.indent()
        variant.monoSpecializations.forEach(spec => {
          const mask = spec.paramModes.reduce((acc, mode, index) => acc + (mode === 'audio' ? (1 << index) : 0), 0)
          outLines.push(wState(`case ${mask}: {`))
          outIndent.indent()
          generateMonoSpecCode(outIndent, variant, spec, paramNames, variant.usesInput ? 'inputResolved' : undefined)
            .forEach(l => outLines.push(runVarState(l)))
          outLines.push(wState('break'))
          outIndent.dedent()
          outLines.push(wState('}'))
        })
        outLines.push(wState('default: {'))
        outIndent.indent()
        outLines.push(wState('const procLen: i32 = (bufferLength + 15) & ~15'))
        outLines.push(wState('output = this.arena.get(procLen)'))
        outLines.push(wState('memory.fill(output.dataStart, 0, usize(procLen) << 2)'))
        outLines.push(wState('break'))
        outIndent.dedent()
        outLines.push(wState('}'))
        outIndent.dedent()
        outLines.push(wState('}'))
        if (variant.usesInput) {
          outLines.push(
            wState('if (isAudio(inputResolved)) this.arena.releaseByPtr(u32(decodeAudio(inputResolved)))'),
          )
        }
        outLines.push(wState('this.push(encodeAudio(output.dataStart), true)'))
      }

      // Release param buffers that were passed as audio (same ref can be used by multiple gens in one tick)
      paramNames.forEach(paramName => {
        outLines.push(
          wState(
            `if (isAudio(${paramName}Tagged)) this.arena.releaseByPtr(u32(decodeAudio(${paramName}Tagged)))`,
          ),
        )
      })
      outLines.push(wState('if (this.absolutePCCallStackTop > 0) this.absolutePCCallStackTop--'))
      outLines.push(wState('return pc'))
      outIndent.dedent()
      outLines.push(wState('}'))
      outLines.push('')
    })
  }

  function generateGenOpHandlerFile(
    gen: Gen,
    genVariants: GenVariantSpec[],
    specsForGen: GenSpecializationSpec[],
  ): string {
    const caseIndent = new IndentHelper()
    const caseLines: string[] = []
    const singleGenMap = new Map<string, Gen>()
    singleGenMap.set(gen.name, gen)
    emitVariantCases(genVariants, singleGenMap, caseLines, caseIndent)
    const classNames = [...new Set(specsForGen.map(s => s.className))].sort()
    const kebab = toKebabCase(gen.name)
    const lines: string[] = []
    lines.push(generatedHeader)
    lines.push('')
    lines.push(`import { ${classNames.join(', ')} } from '../../gen/${kebab}'`)
    lines.push(
      `import { VmState, push, downsample, upsample } from '../runner'`,
    )
    lines.push(`import * as genOpHelpers from '../gen-op-helpers'`)
    lines.push(`import * as vmOpsVars from '../vm-ops-vars'`)
    lines.push(`import { AudioVmOp } from '../vm-op'`)
    lines.push(
      `import { decodeAudio, decodeArray, decodeCellRef, decodeScalar, encodeAudio, encodeArray, encodeScalar, isArray, isAudio, isCellRef, isScalar, WAVEFORM_CHUNK_SAMPLES, WAVEFORM_RING_MASK } from '../constants'`,
    )
    lines.push(`import { GenSlot } from '../gen-history'`)
    lines.push(`import { GenPool } from '../gen-pool'`)
    lines.push(`import { RunParams } from '../run-params'`)
    lines.push('')
    const initBodyIndent = new IndentHelper()
    initBodyIndent.indent()
    const initLines = generateInitGenPoolsForGen(gen, specsForGen, initBodyIndent)
    lines.push(`export function initGenPools_${gen.name}(vm: VmState): void {`)
    initLines.forEach(l => lines.push(l))
    lines.push('}')
    lines.push('')
    lines.push(
      `export function handleGenOp_${gen.name}(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {`,
    )
    caseIndent.indent()
    lines.push(caseIndent.write('switch (op) {'))
    caseIndent.indent()
    caseLines.forEach(l => lines.push(l))
    lines.push(caseIndent.write('default: {'))
    caseIndent.indent()
    lines.push(caseIndent.write('throw new Error(`Unknown gen op: ${op}`)'))
    caseIndent.dedent()
    lines.push(caseIndent.write('}'))
    caseIndent.dedent()
    lines.push(caseIndent.write('}'))
    caseIndent.dedent()
    lines.push(caseIndent.write('}'))
    lines.push('')
    return lines.join('\n')
  }

  function generateInitGenPoolsForGen(
    gen: Gen,
    specsForGen: GenSpecializationSpec[],
    bodyIndent: IndentHelper,
  ): string[] {
    const out: string[] = []
    specsForGen.forEach(spec => {
      out.push(
        bodyIndent.write(
          `vm.genPools.push(new GenPool(() => new ${spec.className}(), ${spec.id}, ${spec.paramCount}, vm.genPoolManager, (dst: Object, src: Object) => {`,
        ),
      )
      out.push(
        bodyIndent.write(
          `  changetype<${spec.className}>(dst).copyFrom(changetype<${spec.className}>(src))`,
        ),
      )
      out.push(
        bodyIndent.write(
          `}, (dst: Object) => { changetype<${spec.className}>(dst).reset() }))`,
        ),
      )
    })
    return out
  }

  function generateVmOpsGensController(): string {
    const cIndent = new IndentHelper()
    const lines: string[] = []
    lines.push(generatedHeader)
    lines.push('')
    for (const entry of genVariantsList) {
      const kebab = toKebabCase(entry.gen.name)
      lines.push(
        `import { handleGenOp_${entry.gen.name}, initGenPools_${entry.gen.name} } from './vm-ops-gens/gen-${kebab}'`,
      )
    }
    lines.push(`import { VmState } from './vm-state'`)
    lines.push(`import { GenPool } from './gen-pool'`)
    lines.push(`import { TramKernel } from '../kernel/tram'`)
    lines.push(`import { MiniKernel } from '../kernel/mini'`)
    lines.push(`import { TimelineKernel } from '../kernel/timeline'`)
    lines.push(`import { debugAudioVmOp } from './imports'`)
    lines.push(`import { AudioVmOp } from './vm-op'`)
    lines.push(`import { RunParams } from './run-params'`)
    lines.push('')
    lines.push('export function initGenPools(vm: VmState): void {')
    cIndent.indent()
    for (const entry of genVariantsList) {
      lines.push(cIndent.write(`initGenPools_${entry.gen.name}(vm)`))
    }
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => changetype<Object>(0), ${tableTypeId}, 2, vm.genPoolManager))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => new TramKernel(), ${tramGenId}, 1, vm.genPoolManager, (dst: Object, src: Object) => {`,
      ),
    )
    lines.push(cIndent.write(`  changetype<TramKernel>(dst).reset()`))
    lines.push(
      cIndent.write(
        `}, (dst: Object) => { changetype<TramKernel>(dst).reset() }))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => new MiniKernel(), ${miniGenId}, 1, vm.genPoolManager, (dst: Object, src: Object) => {`,
      ),
    )
    lines.push(cIndent.write(`  changetype<MiniKernel>(dst).reset()`))
    lines.push(
      cIndent.write(
        `}, (dst: Object) => { changetype<MiniKernel>(dst).reset() }))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => new TimelineKernel(), ${timelineGenId}, 1, vm.genPoolManager, (dst: Object, src: Object) => {`,
      ),
    )
    lines.push(cIndent.write(`  changetype<TimelineKernel>(dst).reset()`))
    lines.push(
      cIndent.write(
        `}, (dst: Object) => { changetype<TimelineKernel>(dst).reset() }))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => changetype<Object>(0), ${outGenId}, 0, vm.genPoolManager))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => changetype<Object>(0), ${mixGenId}, 0, vm.genPoolManager))`,
      ),
    )
    lines.push(
      cIndent.write(
        `vm.genPools.push(new GenPool(() => changetype<Object>(0), ${arrayGetGenSpecIndex}, 1, vm.genPoolManager))`,
      ),
    )
    lines.push(cIndent.write(`vm.arrayGetGenPoolIndex = vm.genPools.length - 1`))
    lines.push(cIndent.write(`vm.tableGenPoolIndex = ${tableTypeId}`))
    lines.push(cIndent.write(`vm.tramGenPoolIndex = ${tramGenId}`))
    lines.push(cIndent.write(`vm.miniGenPoolIndex = ${miniGenId}`))
    lines.push(cIndent.write(`vm.timelineGenPoolIndex = ${timelineGenId}`))
    lines.push(cIndent.write(`vm.outGenPoolIndex = ${outGenId}`))
    lines.push(cIndent.write(`vm.mixGenPoolIndex = ${mixGenId}`))
    cIndent.dedent()
    lines.push('}')
    lines.push('')
    lines.push(
      cIndent.write(
        'export function handleGenOp(vm: VmState, op: AudioVmOp, pc: i32, opsPtr: usize, params: RunParams): i32 {',
      ),
    )
    cIndent.indent()
    for (const entry of genVariantsList) {
      lines.push(
        cIndent.write(
          `if (op >= AudioVmOp.${entry.firstOpName} && op <= AudioVmOp.${entry.lastOpName}) return handleGenOp_${entry.gen.name}(vm, op, pc, opsPtr, params)`,
        ),
      )
    }
    lines.push(cIndent.write('debugAudioVmOp(pc - 1, op, vm.stackTop)'))
    lines.push(cIndent.write('throw new Error(`Unknown gen: ${op}`)'))
    cIndent.dedent()
    lines.push(cIndent.write('}'))
    lines.push('')
    return lines.join('\n')
  }

  const genFiles = new Map<string, string>()
  for (const entry of genVariantsList) {
    const specsForGen = specs.filter(s => s.genName === entry.gen.name)
    genFiles.set(
      entry.gen.name,
      generateGenOpHandlerFile(entry.gen, entry.variants, specsForGen),
    )
  }
  const controller = generateVmOpsGensController()
  return { controller, genFiles }
}
