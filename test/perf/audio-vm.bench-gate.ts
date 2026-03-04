import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

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
}

type BenchPayload = {
  config: {
    vmId: number
    warmupTicks: number
    measureTicks: number
    bufferLength: number
    sampleRate: number
    bpm: number
  }
  scenarios: ScenarioResult[]
}

type BaselinePayload = BenchPayload & {
  generatedAt: string
}

const BASELINE_PATH = resolve('test/perf/audio-vm.baseline.json')
const WASM_PATH = resolve('as/build/index.wasm')

const REQUIRED_IMPROVEMENT = Number(process.env.BENCH_REQUIRED_IMPROVEMENT ?? 0.18)
const MAX_SCENARIO_REGRESSION = Number(process.env.BENCH_MAX_SCENARIO_REGRESSION ?? 0.03)
const REQUIRED_KITCHEN_RELEASE_REDUCTION = Number(process.env.BENCH_REQUIRED_KITCHEN_RELEASE_REDUCTION ?? 0.10)

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}

function meanOfMedians(scenarios: ScenarioResult[]): number {
  if (scenarios.length === 0) return 0
  let sum = 0
  for (const scenario of scenarios) sum += scenario.medianMsPerTick
  return sum / scenarios.length
}

function findScenario(payload: BenchPayload, name: string): ScenarioResult {
  const scenario = payload.scenarios.find(s => s.name === name)
  if (!scenario) throw new Error(`Scenario "${name}" is missing`)
  return scenario
}

function runBenchJson(): BenchPayload {
  if (!existsSync(WASM_PATH)) {
    throw new Error(`WASM not found at "${WASM_PATH}". Run "bun run as:build" first.`)
  }

  const proc = Bun.spawnSync({
    cmd: ['bun', 'run', 'test/perf/audio-vm.runtime.bench.ts', '--json'],
    cwd: process.cwd(),
    env: { ...process.env, DEBUG: '' },
    stdout: 'pipe',
    stderr: 'pipe',
  })

  if (proc.exitCode !== 0) {
    const stderr = proc.stderr.toString().trim()
    const stdout = proc.stdout.toString().trim()
    throw new Error(`Benchmark failed (exit ${proc.exitCode})\n${stderr || stdout}`)
  }

  const text = proc.stdout.toString().trim()
  return JSON.parse(text) as BenchPayload
}

function loadBaseline(): BaselinePayload {
  if (!existsSync(BASELINE_PATH)) {
    throw new Error(`Baseline not found: ${BASELINE_PATH}`)
  }
  return JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as BaselinePayload
}

function checkAgainstBaseline(current: BenchPayload, baseline: BaselinePayload): void {
  const baselineMean = meanOfMedians(baseline.scenarios)
  const currentMean = meanOfMedians(current.scenarios)
  const requiredMean = baselineMean * (1 - REQUIRED_IMPROVEMENT)
  const meanImprovement = baselineMean > 0 ? (baselineMean - currentMean) / baselineMean : 0

  const failures: string[] = []

  if (currentMean > requiredMean) {
    failures.push(
      `mean median improvement too low: got ${formatPercent(meanImprovement)}, required >= ${formatPercent(REQUIRED_IMPROVEMENT)}`,
    )
  }

  for (const baselineScenario of baseline.scenarios) {
    const currentScenario = findScenario(current, baselineScenario.name)
    if (baselineScenario.medianMsPerTick <= 0) continue

    const ratio = (currentScenario.medianMsPerTick - baselineScenario.medianMsPerTick) / baselineScenario.medianMsPerTick
    if (ratio > MAX_SCENARIO_REGRESSION) {
      failures.push(
        `${baselineScenario.name}: median regressed by ${formatPercent(ratio)} (max ${formatPercent(MAX_SCENARIO_REGRESSION)})`,
      )
    }
  }

  const baseKitchen = findScenario(baseline, 'kitchen_sink')
  const currKitchen = findScenario(current, 'kitchen_sink')
  const baseReleased = baseKitchen.arenaDelta.released
  const currReleased = currKitchen.arenaDelta.released

  if (baseReleased > 0) {
    const releasedReduction = (baseReleased - currReleased) / baseReleased
    if (releasedReduction < REQUIRED_KITCHEN_RELEASE_REDUCTION) {
      failures.push(
        `kitchen_sink arena released reduction too low: got ${formatPercent(releasedReduction)}, required >= ${formatPercent(REQUIRED_KITCHEN_RELEASE_REDUCTION)}`,
      )
    }
  }

  console.log(`baseline mean median: ${baselineMean.toFixed(6)} ms/tick`)
  console.log(`current  mean median: ${currentMean.toFixed(6)} ms/tick`)
  console.log(`mean improvement: ${formatPercent(meanImprovement)}`)
  console.log('')
  for (const scenario of current.scenarios) {
    const base = findScenario(baseline, scenario.name)
    const delta = base.medianMsPerTick > 0
      ? (scenario.medianMsPerTick - base.medianMsPerTick) / base.medianMsPerTick
      : 0
    console.log(
      `[${scenario.name}] median=${scenario.medianMsPerTick.toFixed(6)} baseline=${base.medianMsPerTick.toFixed(6)} delta=${formatPercent(delta)}`,
    )
  }

  if (failures.length > 0) {
    console.error('\nBenchmark gate failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }
}

function recordBaseline(payload: BenchPayload): void {
  const today = new Date().toISOString().slice(0, 10)
  const baseline: BaselinePayload = {
    generatedAt: today,
    ...payload,
  }
  writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n', 'utf8')
  console.log(`Recorded baseline at ${BASELINE_PATH}`)
}

const mode = process.argv[2] ?? 'check'
const payload = runBenchJson()

if (mode === 'record') {
  recordBaseline(payload)
}
else if (mode === 'check') {
  const baseline = loadBaseline()
  checkAgainstBaseline(payload, baseline)
}
else {
  console.error(`Unknown mode "${mode}". Use "check" or "record".`)
  process.exit(1)
}
