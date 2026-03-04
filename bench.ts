import { audio, setup } from './test/test-utils.ts'

const code = `
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

await setup()

const times: number[] = []
const iterations = 20
const ticks = 500

for (let i = 0; i < iterations; i++) {
  const label = `audio-${i}`
  const start = performance.now()
  audio(code, { ticks })
  const end = performance.now()
  const duration = end - start
  times.push(duration)
  console.log(`Run ${i + 1}: ${duration.toFixed(2)}ms (${(duration / ticks).toFixed(4)} ms/tick)`)
}

// Drop the first two runs for analysis (warmup)
const usedTimes = times.slice(2)

const avg = usedTimes.reduce((acc, t) => acc + t, 0) / usedTimes.length

const sorted = [...usedTimes].sort((a, b) => a - b)
const median = sorted.length % 2 === 0
  ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
  : sorted[(sorted.length / 2) | 0]

console.log(`Average: ${avg.toFixed(2)}ms (${(avg / ticks).toFixed(4)} ms/tick)`)
console.log(`Median: ${median.toFixed(2)}ms (${(median / ticks).toFixed(4)} ms/tick)`)
console.log(`Best: ${Math.min(...usedTimes).toFixed(2)}ms`)
console.log(`Worst: ${Math.max(...usedTimes).toFixed(2)}ms`)
