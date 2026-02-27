import * as fs from 'node:fs'
import * as path from 'node:path'
import type * as WasmExports from '../as/build/index.d.ts'
import config from '../asconfig.json'
import { createWasmImports } from './lib/wasm-imports.ts'
import { wasmSetup } from './lib/wasm-setup.ts'
import { disassembleBytecode } from './live/compiler/index.ts'
import { controlPipeline } from './live/pipeline.ts'

type Args = {
  code: string
  ticks: number
  bpm: number
  sampleRate: number
  vmId: number
  wasmPath: string
  bufferLength: number
}

function parseArgs(argv: string[]): Args {
  const code = argv[2] ?? ''
  let ticks = 8
  let bpm = 120
  let sampleRate = 48000
  let vmId = 0
  let wasmPath = process.env.LM3_WASM_PATH ?? 'as/build/index.wasm'
  let bufferLength = 128

  for (let i = 3; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--ticks') ticks = Number(argv[++i] ?? ticks)
    else if (a === '--bpm') bpm = Number(argv[++i] ?? bpm)
    else if (a === '--sampleRate') sampleRate = Number(argv[++i] ?? sampleRate)
    else if (a === '--vm') vmId = Number(argv[++i] ?? vmId)
    else if (a === '--wasm') wasmPath = String(argv[++i] ?? wasmPath)
    else if (a === '--buffer') bufferLength = Number(argv[++i] ?? bufferLength)
  }

  if (!code) {
    throw new Error(
      'Missing code. Usage: bun run src/eval-dsp.ts "code" [--ticks N] [--bpm N] [--sampleRate N] [--vm N] [--wasm path]',
    )
  }

  if (!Number.isFinite(ticks) || ticks <= 0) ticks = 8
  if (!Number.isFinite(bpm) || bpm <= 0) bpm = 120
  if (!Number.isFinite(sampleRate) || sampleRate <= 0) sampleRate = 48000
  if (!Number.isFinite(vmId) || vmId < 0) vmId = 0
  if (!Number.isFinite(bufferLength) || bufferLength <= 0) bufferLength = 128

  return { code, ticks, bpm, sampleRate, vmId, wasmPath, bufferLength }
}

function resolveWasmPath(p: string): string {
  const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p)
  if (fs.existsSync(abs)) return abs
  throw new Error(`WASM not found at "${abs}". Set LM3_WASM_PATH or pass --wasm <path>.`)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv)
  const wasmAbsPath = resolveWasmPath(args.wasmPath)
  const binary = fs.readFileSync(wasmAbsPath).buffer

  const core = await wasmSetup<typeof WasmExports>({
    binary,
    sourcemapUrl: new URL('file://' + wasmAbsPath + '.map').toString(),
    config: config as any,
    imports: ({ memory }) => createWasmImports(memory),
  })

  const result = controlPipeline.compileSource(args.code)

  if (result.errors.length > 0) {
    console.error('Compilation failed:')
    for (const error of result.errors) {
      console.error(error)
    }
    process.exitCode = 1
    return
  }

  if (!result.compile.bytecode) {
    console.error('No bytecode generated')
    process.exitCode = 1
    return
  }

  const bytecode = result.compile.bytecode
  console.log('Bytecode length:', bytecode.length)
  console.log('\nDisassembly:')
  const disassembly = disassembleBytecode(bytecode)
  for (const line of disassembly) {
    console.log(line)
  }
  console.log('')

  const audioOpsPtr = core.wasm.__new(bytecode.byteLength, 0)
  const audioOpsView = new Float32Array(core.memory.buffer, audioOpsPtr, bytecode.length)
  audioOpsView.set(bytecode)
  const audioOpsLength = bytecode.length

  let sampleCount = 0
  for (let t = 0; t < args.ticks; t++) {
    const nyquist = args.sampleRate * 0.5
    const piOverNyquist = Math.PI / nyquist

    core.wasm.runAudioVmAt(
      args.vmId,
      audioOpsPtr,
      audioOpsLength,
      args.bufferLength,
      sampleCount,
      args.sampleRate,
      nyquist,
      piOverNyquist,
      args.bpm,
    )

    const aInfoPtr = core.wasm.getAudioVmInfoAt(args.vmId)
    const aInfo = new Uint32Array(core.memory.buffer, aInfoPtr, 10)

    // Read directly from dedicated output buffers
    const outputLeftPtr = aInfo[8] ?? 0
    const outputRightPtr = aInfo[9] ?? 0

    const stats = (buf: Float32Array) => {
      let min = Infinity
      let max = -Infinity
      let sumSq = 0
      let nan = 0
      for (let i = 0; i < buf.length; i++) {
        const v = buf[i] ?? 0
        if (!Number.isFinite(v)) {
          nan++
          continue
        }
        if (v < min) min = v
        if (v > max) max = v
        sumSq += v * v
      }
      const rms = Math.sqrt(sumSq / Math.max(1, buf.length - nan))
      return { min: Number.isFinite(min) ? min : 0, max: Number.isFinite(max) ? max : 0, rms, nan }
    }

    if (!outputLeftPtr || !outputRightPtr) {
      console.log('audio ops (missing output ptrs)', { tick: t, sampleCount, audioOpsPtr, audioOpsLength, outputLeftPtr,
        outputRightPtr })
    }
    else {
      const audioL = new Float32Array(core.memory.buffer, outputLeftPtr, args.bufferLength)
      const audioR = new Float32Array(core.memory.buffer, outputRightPtr, args.bufferLength)
      console.log('audio', {
        tick: t,
        sampleCount,
        audioOpsLength,
        outL: stats(audioL),
        outR: stats(audioR),
        headL: Array.from(audioL.slice(0, 8)),
        headR: Array.from(audioR.slice(0, 8)),
      })
    }

    sampleCount += args.bufferLength
  }
}

await main()
