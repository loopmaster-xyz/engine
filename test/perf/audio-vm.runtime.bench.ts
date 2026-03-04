import { setup } from '../test-utils.ts'
import { controlPipeline } from '../../src/live/pipeline.ts'

type ArenaStats = {
  allocated: number
  reused: number
  released: number
  inFlight: number
}

type ScenarioResult = {
  name: string
  medianMsPerTick: number
  p95MsPerTick: number
  stddevMsPerTick: number
  arenaDelta: ArenaStats
  perfDelta: {
    dispatch: number
    genDispatch: number
    tempAllocs: number
    tempReleases: number
    helperGets: number
    helperReleases: number
    upsampleOps: number
    downsampleOps: number
  }
}

const VM_ID = 0
const WARMUP_TICKS = 100
const MEASURE_TICKS = 1000
const BUFFER_LENGTH = 128
const SAMPLE_RATE = 48000

const nyquist = SAMPLE_RATE * 0.5
const piOverNyquist = Math.PI / nyquist
const bpm = 144

const kitchenSinkCode = `
bpm=144

scale='saba'

minimoog=hz->{
   saw(hz/2)*.7
  +sqr(hz*1.018)*.6
  +tri(hz*0.952)*.3
  |> $*.7 |> lpm($, 207, 1) |> tanh($*2) |> stereo($,.004) |> widen($,.0007)
}

bd(
  punch:10.3k,
  cutoff:95k,
  q:.62,
  fm:trig->ad(.00005,.09,200,trig),
  filter:trig->ad(.001,.1,100,trig),
  amp:trig->ad(.0032,.5,21,trig),
  offset:.52,
  sampleOffset:.01,
) |> bus(0,$)

bus(0) |> $+delay($,.11,.2)/2+delay($,.3,.2)/2 |> lp($,55)/2 |> bus(1,$)

chord=[#i7,#i7,#i7,#vi7][t].reverse()

chord.random(every(1/2))*o4 |> marimba($,trig:euclid(3,8,2)) |> bus(1,$*.3)

;(chord*o3).take(3).map(hz->marimba(hz,trig:euclid(5,8,1))).avg() |> bus(1,$*.3)

minimoog(chord[0]*o2)*ad(trig:euclid(5,8,1)) |> lp($,chord[0]*o3,1) |> bus(1,$*.2)

ch(0.2, trig:tram('xxxx',1/4))*[.2,.2,.7,.8][t*4] |> bus(1,$*.4)

bus(0) |> out($)

bus(1) |> $+dattorro($) |> compressor($,att:.0001,rel:.16,thr:-21,ratio:5,knee:4,key:bus(0)) |> out($)

mix=>compressor($,thr:-13)*2 |> limiter($)
`

const scenarios: Array<{ name: string; code: string }> = [
  { name: 'simple_sine', code: 'out(sine(440))' },
  {
    name: 'math_chain',
    code: `
x=sine(440)
y=cos(220)
z=(x*y + x/x + y*y - x%0.7 + x**2 + (x>0) + (y<0))
out(z)
`,
  },
  {
    name: 'oversample_capture',
    code: `
trig=every(1/8)
synth=hz->hz|>oversample(4,()->sine($/2+sine($/4)*$*1)*ad(.0001,.5,trig)**3*.2)
out(synth(440))
`,
  },
  { name: 'kitchen_sink', code: kitchenSinkCode },
]

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const n = sorted.length
  if (n === 0) return 0
  if ((n & 1) === 1) return sorted[n >> 1]!
  return (sorted[(n >> 1) - 1]! + sorted[n >> 1]!) * 0.5
}

function p95(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.max(0, Math.ceil(sorted.length * 0.95) - 1)
  return sorted[index]!
}

function stddev(values: number[]): number {
  if (values.length === 0) return 0
  const mean = values.reduce((acc, value) => acc + value, 0) / values.length
  let variance = 0
  for (const value of values) {
    const d = value - mean
    variance += d * d
  }
  variance /= values.length
  return Math.sqrt(variance)
}

async function main() {
  await setup()
  const testUtils = await import('../test-utils.ts')
  const core = testUtils.coreSingleton
  if (!core) throw new Error('WASM not loaded')

  const getArenaStats = (vmId: number): ArenaStats => {
    const arenaInfoPtr = core.wasm.getAudioVmArenaInfoAt(vmId)
    const stats = new Uint32Array(core.memory.buffer, arenaInfoPtr, 8)
    return {
      allocated: stats[0] ?? 0,
      reused: stats[1] ?? 0,
      released: stats[2] ?? 0,
      inFlight: stats[3] ?? 0,
    }
  }

  const getPerfStats = (vmId: number): number[] => {
    const perfPtr = (core.wasm as any).getAudioVmPerfCountersAt(vmId)
    const view = new Uint32Array(core.memory.buffer, perfPtr, 16)
    return Array.from(view)
  }

  const resetPerfStats = (vmId: number): void => {
    ;(core.wasm as any).resetAudioVmPerfCountersAt(vmId)
  }

  const setPerfStatsEnabled = (vmId: number, enabled: boolean): void => {
    const setEnabled = (core.wasm as any).setAudioVmPerfCountersEnabledAt as
      | ((vmId: number, enabled: boolean) => void)
      | undefined
    if (setEnabled) setEnabled(vmId, enabled)
  }

  const collectPerfCounters = process.env.AUDIO_VM_BENCH_PERF === '1'

  const runTicks = (
    audioOpsPtr: number,
    audioOpsLength: number,
    ticks: number,
    sampleCount: number,
    timed: boolean,
  ): { nextSampleCount: number; times: number[] } => {
    const times: number[] = []
    let currentSampleCount = sampleCount
    for (let i = 0; i < ticks; i++) {
      const t0 = timed ? performance.now() : 0
      core.wasm.runAudioVmAt(
        VM_ID,
        audioOpsPtr,
        audioOpsLength,
        BUFFER_LENGTH,
        currentSampleCount,
        SAMPLE_RATE,
        nyquist,
        piOverNyquist,
        bpm,
      )
      if (timed) times.push(performance.now() - t0)
      currentSampleCount += BUFFER_LENGTH
    }
    return { nextSampleCount: currentSampleCount, times }
  }

  const results: ScenarioResult[] = []

  for (const scenario of scenarios) {
    const compile = controlPipeline.compileSource(scenario.code)
    if (compile.errors.length > 0 || !compile.compile.bytecode) {
      throw new Error(`compile failed for ${scenario.name}: ${compile.errors.join('\n')}`)
    }

    const bytecode = compile.compile.bytecode
    const audioOpsPtr = core.wasm.createFloat32Buffer(bytecode.length)
    new Float32Array(core.memory.buffer, audioOpsPtr, bytecode.length).set(bytecode)

    core.wasm.resetAudioVmAt(VM_ID)
    let sampleCount = 0
    sampleCount = runTicks(audioOpsPtr, bytecode.length, WARMUP_TICKS, sampleCount, false).nextSampleCount
    setPerfStatsEnabled(VM_ID, false)
    resetPerfStats(VM_ID)
    const arenaBefore = getArenaStats(VM_ID)
    const measured = runTicks(audioOpsPtr, bytecode.length, MEASURE_TICKS, sampleCount, true)
    const arenaAfter = getArenaStats(VM_ID)
    let perfAfter = getPerfStats(VM_ID)
    if (collectPerfCounters) {
      core.wasm.resetAudioVmAt(VM_ID)
      sampleCount = 0
      sampleCount = runTicks(audioOpsPtr, bytecode.length, WARMUP_TICKS, sampleCount, false).nextSampleCount
      resetPerfStats(VM_ID)
      setPerfStatsEnabled(VM_ID, true)
      runTicks(audioOpsPtr, bytecode.length, MEASURE_TICKS, sampleCount, false)
      perfAfter = getPerfStats(VM_ID)
      setPerfStatsEnabled(VM_ID, false)
    }

    const times = measured.times
    const scenarioResult: ScenarioResult = {
      name: scenario.name,
      medianMsPerTick: median(times),
      p95MsPerTick: p95(times),
      stddevMsPerTick: stddev(times),
      arenaDelta: {
        allocated: arenaAfter.allocated - arenaBefore.allocated,
        reused: arenaAfter.reused - arenaBefore.reused,
        released: arenaAfter.released - arenaBefore.released,
        inFlight: arenaAfter.inFlight - arenaBefore.inFlight,
      },
      perfDelta: {
        dispatch: perfAfter[0] ?? 0,
        genDispatch: perfAfter[1] ?? 0,
        tempAllocs: perfAfter[2] ?? 0,
        tempReleases: perfAfter[3] ?? 0,
        helperGets: perfAfter[4] ?? 0,
        helperReleases: perfAfter[5] ?? 0,
        upsampleOps: perfAfter[6] ?? 0,
        downsampleOps: perfAfter[7] ?? 0,
      },
    }
    results.push(scenarioResult)

    core.wasm.resetAudioVmAt(VM_ID)
    core.wasm.freeFloat32Buffer(audioOpsPtr)
  }

  const payload = {
    config: {
      vmId: VM_ID,
      warmupTicks: WARMUP_TICKS,
      measureTicks: MEASURE_TICKS,
      bufferLength: BUFFER_LENGTH,
      sampleRate: SAMPLE_RATE,
      bpm,
    },
    scenarios: results,
  }

  const asJson = process.argv.includes('--json')
  if (asJson) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  for (const result of results) {
    console.log(
      [
        `[${result.name}]`,
        `median=${result.medianMsPerTick.toFixed(4)} ms/tick`,
        `p95=${result.p95MsPerTick.toFixed(4)}`,
        `stddev=${result.stddevMsPerTick.toFixed(4)}`,
        `arenaΔ(alloc=${result.arenaDelta.allocated}, reused=${result.arenaDelta.reused}, released=${result.arenaDelta.released}, inFlight=${result.arenaDelta.inFlight})`,
        `perfΔ(dispatch=${result.perfDelta.dispatch}, gen=${result.perfDelta.genDispatch}, tempAlloc=${result.perfDelta.tempAllocs}, tempRelease=${result.perfDelta.tempReleases}, helperGet=${result.perfDelta.helperGets}, helperRelease=${result.perfDelta.helperReleases}, up=${result.perfDelta.upsampleOps}, down=${result.perfDelta.downsampleOps})`,
      ].join(' '),
    )
  }
}

await main()
