import { compile as incrementalCompile } from '../../src/live/compiler/index.ts'
import * as core from '../../src/live/compiler/core.ts'
import { State } from '../../src/live/compiler/state.ts'
import { parse } from '../../src/live/parser.ts'

type BenchSummary = {
  runs: number
  warmup: number
  fullMedianMs: number
  incrementalMedianMs: number
  speedup: number
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = sorted.length >> 1
  return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) * 0.5 : sorted[mid]!
}

function bench(fn: () => void, runs: number): number[] {
  const times: number[] = []
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now()
    fn()
    times.push(performance.now() - t0)
  }
  return times
}

const code = 'out(sine(440))'
const parsed = parse(code)
if (parsed.errors.length > 0 || !parsed.program) {
  throw new Error(`Parse failed:\n${parsed.errors.map(e => `${e.loc.line}:${e.loc.column} ${e.message}`).join('\n')}`)
}

const runs = Number(process.env.LM_COMPILE_BENCH_RUNS ?? 250)
const warmup = Number(process.env.LM_COMPILE_BENCH_WARMUP ?? 40)

for (let i = 0; i < warmup; i++) {
  core.compile(new State(), parsed.program, parsed.preludeLines)
  incrementalCompile(parsed.program, parsed.preludeLines)
}

const fullTimes = bench(() => {
  core.compile(new State(), parsed.program!, parsed.preludeLines)
}, runs)

const incrementalTimes = bench(() => {
  incrementalCompile(parsed.program!, parsed.preludeLines)
}, runs)

const fullMedianMs = median(fullTimes)
const incrementalMedianMs = median(incrementalTimes)
const speedup = incrementalMedianMs > 0 ? fullMedianMs / incrementalMedianMs : 0

const summary: BenchSummary = {
  runs,
  warmup,
  fullMedianMs,
  incrementalMedianMs,
  speedup,
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(summary, null, 2))
}
else {
  console.log('[compile bench] full median ms:', fullMedianMs.toFixed(3))
  console.log('[compile bench] incremental median ms:', incrementalMedianMs.toFixed(3))
  console.log('[compile bench] speedup:', `${speedup.toFixed(2)}x`)
  console.log('[compile bench] summary:', JSON.stringify(summary))
}
