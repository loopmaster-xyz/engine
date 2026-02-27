import { computed, effect, signal, untracked } from '@preact/signals'
import {
  createEditor,
  createPersistedDoc,
  type Doc,
  draw,
  type OnHoverToken,
  type Widget,
  type Widgets,
} from 'editor'
import { Fragment, render } from 'preact'
import { useEffect, useMemo, useRef } from 'preact/hooks'
import type { AdHistory, TramHistory, TypedHistory } from '../src/dsp/audio-vm-bindings.ts'
import { createHistoryReader } from '../src/dsp/audio-vm-helpers.ts'
import { createDspState } from '../src/dsp/dsp-state.ts'
import { createDsp, type Dsp } from '../src/dsp/dsp.ts'
import { arraySignal } from '../src/lib/array-signal.ts'
import { createRingAdapter, type Ring, WaveformBuffer } from '../src/lib/waveform-buffer.ts'
import { getFunctionCallLength } from './get-function-call-length.ts'
import { tokenize } from './tokenizer.ts'

const Editor = ({ doc, onHoverToken }: { doc: Doc; onHoverToken: OnHoverToken }) => {
  const ref = useRef<HTMLDivElement>(null)

  const editor = useMemo(() =>
    createEditor({
      wordWrap: true,
      autoHeight: false,
      colors: {
        black: '#272822',
        red: '#f92672',
        green: '#a6e22e',
        yellow: '#e6db74',
        blue: '#66d9ef',
        purple: '#ae81ff',
        cyan: '#38ccd1',
        white: '#f8f8f2',
        gray: '#75715e',
        brightBlack: '#272822',
        brightRed: '#fd5ff1',
        brightGreen: '#a1efe4',
        brightYellow: '#ffd866',
        brightBlue: '#66d9ef',
        brightPurple: '#ae81ff',
        brightCyan: '#a1efe4',
        brightWhite: '#f9f8f5',
      },
      syntax: c => ({
        keyword: { color: c.blue, style: 'italic', weight: 'regular' },
        function: { color: c.green, style: 'normal', weight: 'regular' },
        identifier: { color: c.white, style: 'normal', weight: 'regular' },
        string: { color: c.yellow, style: 'normal', weight: 'regular' },
        number: { color: c.purple, style: 'normal', weight: 'regular' },
        boolean: { color: c.red, style: 'normal', weight: 'regular' },
        null: { color: c.blue, style: 'normal', weight: 'regular' },
        operator: { color: c.red, style: 'normal', weight: 'regular' },
        punctuation: { color: c.gray, style: 'normal', weight: 'regular' },
        comment: { color: c.gray, style: 'normal', weight: 'regular' },
        text: { color: c.white, style: 'normal', weight: 'regular' },
      }),
    }), [])

  editor.onHoverToken = onHoverToken

  useEffect(() => {
    return () => {
      editor.dispose()
    }
  }, [editor])

  useEffect(() => {
    editor.setDoc(doc)
  }, [editor, doc])

  window.oncontextmenu = event => {
    event.preventDefault()
    editor.settings.wordWrap = !editor.settings.wordWrap
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(editor.canvas)
      editor.canvas.focus()
    }
  }, [ref, editor])

  return <div ref={ref} class="w-full h-full" />
}

const code = signal(localStorage.getItem('code') ?? 'sine(330) |> out($)')
const status = signal('')
const workletStats = signal('')
const stats = signal<any>(null)
const seekSec = signal<number | null>(null)
const syncEnabled = signal(localStorage.getItem('syncEnabled') === '1')
const syncBars = signal<number>(Number(localStorage.getItem('syncBars') ?? '1') || 1)

function createAdWidget(ad: AdHistory, dsp: Dsp): Widget {
  const startCol = ad.source.column
  const endCol = startCol + getFunctionCallLength(untracked(() => code.value), ad.source.line, ad.source.column)
  const line = ad.source.line

  const reader = createHistoryReader(
    ad.size,
    ad.mask,
    { value: 0 },
    state => {
      state.value = 0
    },
    () => dsp.latency.state,
    () => ad.writeIndex,
    index => ad.sampleCounts[index],
    (state, index) => {
      state.value = ad.emit.env.at(index)
    },
  )

  let epoch = 0

  const draw = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
    reader.run(++epoch)

    // Background
    c.fillStyle = 'rgba(0, 0, 0, 0.7)'
    c.fillRect(x, y, w, h)

    // Border
    c.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    c.lineWidth = 1
    c.strokeRect(x, y, w, h)

    // Text
    c.fillStyle = '#fff'
    c.font = '12px monospace'
    c.textAlign = 'left'
    c.textBaseline = 'top'

    const text = `env: ${reader.state.value.toFixed(4)}`
    c.fillText(text, x + 4, y + 4)
  }

  return {
    type: 'above',
    pos: { x: [startCol, endCol], y: line },
    draw,
  }
}

function createTramWidgets(tram: TramHistory, dsp: Dsp): Widget[] {
  if (!tram.beatMapping || tram.beatMapping.length === 0) {
    return []
  }

  const line = tram.source.line
  const widgets: Widget[] = []

  const reader = createHistoryReader(
    tram.size,
    tram.mask,
    new Map<number, number>(),
    state => {
      state.clear()
    },
    () => dsp.latency.state,
    () => tram.writeIndex,
    index => tram.sampleCounts[index],
    (state, index, sampleCount) => {
      state.set(tram.emit.fired.at(index), sampleCount)
    },
  )

  for (const beat of tram.beatMapping) {
    let firedAt = -Infinity
    let elapsed = Infinity
    let epoch = -1
    const draw = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      reader.run(++epoch)
      if (reader.now < firedAt) {
        firedAt = -Infinity
      }
      if (reader.state.has(beat.linearIndex)) {
        firedAt = reader.state.get(beat.linearIndex)!
      }
      elapsed = reader.now - firedAt
      const opacity = Math.max(0, 1 - elapsed / dsp.latency.state.sampleRate)
      if (opacity > 0) {
        c.fillStyle = `rgba(90, 90, 90, ${opacity ** 2.5})`
        c.fillRect(x, y, w, h)
      }
    }

    widgets.push({
      type: 'overlay',
      pos: { x: [beat.startCol, beat.endCol], y: line },
      draw,
    })
  }

  return widgets
}

function createWaveformWidget(
  history: TypedHistory,
  buffers: Map<number, WaveformBuffer>,
): Widget {
  const startCol = history.source.column
  const endCol = startCol
    + getFunctionCallLength(untracked(() => code.value), history.source.line, history.source.column)
  const line = history.source.line

  let buffer = buffers.get(history.index)
  if (!buffer) {
    buffer = new WaveformBuffer()
    buffers.set(history.index, buffer)
  }

  const draw = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
    const view = history.view
    const outRing = view.getOutputRingView()
    if (!view || !outRing) {
      c.fillStyle = 'rgb(30 41 59)'
      c.fillRect(x, y, w, h)
      return
    }
    const ring = createRingAdapter(outRing, view.chunkSamples)
    const display = buffer!.update(ring, view.outputChunkPos)
    if (display) drawWaveformInRect(c, x, y, w, h, display)
    else {
      c.fillStyle = 'rgb(30 41 59)'
      c.fillRect(x, y, w, h)
    }
  }

  return {
    type: 'above',
    pos: { x: [startCol, endCol], y: line },
    draw,
  }
}

function drawWaveformInRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
  samples: Float32Array): void
{
  c.fillStyle = 'rgb(30 41 59)'
  c.fillRect(x, y, w, h)
  const len = samples.length
  if (len < 2) return
  const mid = y + h / 2
  const amp = (h / 2) - 2
  c.strokeStyle = 'rgb(148 163 184)'
  c.lineWidth = 1
  c.beginPath()
  for (let i = 0; i < w; i++) {
    const j = Math.floor((i / w) * len)
    const sy = mid - (samples[j] ?? 0) * amp
    if (i === 0) c.moveTo(x + i, sy)
    else c.lineTo(x + i, sy)
  }
  c.stroke()
}

function drawWaveform(canvas: HTMLCanvasElement, samples: Float32Array): void {
  const dpr = window.devicePixelRatio ?? 1
  const rect = canvas.getBoundingClientRect()
  const w = Math.round(rect.width * dpr)
  const h = Math.round(rect.height * dpr)
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  drawWaveformInRect(ctx, 0, 0, w, h, samples)
}

async function main() {
  const dspState = await createDspState({ latencyHint: 0.01 })
  const dsp = await createDsp(dspState)
  const program = await dsp.createProgram()
  const sr = dsp.state.audioContext.sampleRate
  await program.setSyncMode({ enabled: syncEnabled.value, bars: syncBars.value })

  const doc = createPersistedDoc('doc', tokenize)

  effect(() => {
    doc.code = code.value
  })
  effect(() => {
    code.value = doc.code
  })

  const seek = (sec: number) => {
    void dsp.seek(Math.round(sec * sr), [program], true)
  }

  const histories = arraySignal(program.histories)
  const sineWaveformBuffers = new Map<number, WaveformBuffer>()
  let prevWidgets: Widgets = []
  const widgets = computed(() => {
    const widgets: Widgets = []
    if (!histories.value.length) {
      return prevWidgets
    }
    for (const h of histories.value) {
      if (h.genName === 'Ad') {
        widgets.push(createAdWidget(h, dsp))
      }
      else if (h.genName === 'Tram') {
        widgets.push(...createTramWidgets(h, dsp))
      }
      else if (h.genName === 'Sine' || h.genName === 'Out' || h.genName === 'Biquad') {
        widgets.push(createWaveformWidget(h, sineWaveformBuffers))
      }
    }
    prevWidgets = widgets
    return widgets
  })

  const tickCount = signal(0)
  const debugHistories = computed(() => {
    tickCount.value
    return histories.value.map(h => {
      return `${h.genName} ${h.sampleCounts.latest}`
    }).join('\n')
  })

  effect(() => {
    doc.widgets = widgets.value
  })

  const apply = async () => {
    try {
      localStorage.setItem('code', code.value)
      if (!dsp.isActuallyPlaying) {
        dsp.core.preview.setCode(code.value)
        const { histories: previewHistories } = dsp.core.preview.runPreview()
        histories.value = previewHistories
      }
      await program.setCode(code.value)
      status.value = 'ok'
    }
    catch (e) {
      console.error(e)
      status.value = (e as Error)?.message ?? String(e)
    }
  }

  effect(() => {
    code.value
    queueMicrotask(apply)
  })

  effect(() => {
    code.value
    queueMicrotask(() => {
      program.reapplySourceMapping(code.value)
      histories.value = program.histories
    })
  })

  await apply()

  const waveformBuffer = new WaveformBuffer()
  let waveformSamples: Float32Array | null = null
  let waveformCanvasEl: HTMLCanvasElement | null = null
  const hoveredHistoryIndex = signal<number | null>(null)

  setInterval(async () => {
    try {
      const s = await dsp.core.worklet.getStats({ programId: program.id })
      stats.value = s
      workletStats.value = JSON.stringify(s, null, 2)
    }
    catch (e) {
      workletStats.value = (e as Error)?.message ?? String(e)
    }
  }, 250)

  let rafId: number | null = null
  const rafLoop = () => {
    tickCount.value++
    dsp.latency.update()
    if (dsp.isActuallyPlaying) {
      histories.value = program.histories
      let views = program.historyViews
      if (views.length === 0) {
        void program.refreshHistories()
      }
      else {
        const hovered = hoveredHistoryIndex.value
        const hoveredInBounds = hovered !== null && hovered >= 0 && hovered < views.length
        const idx = hoveredInBounds && views[hovered]?.getOutputRingView()
          ? hovered
          : views.findIndex(v => v.getOutputRingView())
        if (idx >= 0) {
          const v = views[idx]
          const outRing = v.getOutputRingView()
          if (outRing) {
            const ring: Ring = createRingAdapter(outRing, v.chunkSamples)
            const display = waveformBuffer.update(ring, v.outputChunkPos)
            if (display) waveformSamples = display
          }
        }
      }
    }
    if (waveformCanvasEl && waveformSamples) {
      drawWaveform(waveformCanvasEl, waveformSamples)
    }
    draw()
    rafId = requestAnimationFrame(rafLoop)
  }
  rafLoop()

  const onHoverToken: OnHoverToken = (canvas, x, y, token, callBlock, parameterIndex, _callBlockX, _callBlockY) => {
    const functionToken = callBlock[0]
    if (!functionToken || functionToken.line == null || functionToken.column == null) {
      hoveredHistoryIndex.value = null
      return false
    }
    const line = functionToken.line
    const column = functionToken.column
    const name = functionToken.text
    const nameLo = name.toLowerCase()
    const h = program.histories.find(
      x => x.source.line === line && x.source.column === column
        && (x.genName.toLowerCase() === nameLo || x.variantName?.toLowerCase() === nameLo),
    )
    const idx = h != null ? h.index : program.getHistoryIndexForFunctionReturn(name)
    hoveredHistoryIndex.value = idx ?? null
    return false
  }

  const curSec = computed(() => (stats.value?.sampleCount ?? 0) / sr)
  const valueSec = computed(() => curSec.value.toFixed(2))
  const maxSec = 1240
  const rangeValue = computed(() => Math.min(maxSec, Math.max(0, parseFloat(valueSec.value))))
  const App = () => {
    return (
      <div class="p-4 text-slate-100 font-mono">
        <div class="flex gap-2 mb-2">
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={async () => {
            await dsp.start([program])
          }}>
            start dsp
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={async () => {
            dsp.stop([program])
          }}>
            stop dsp
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={() => {
            dsp.playProgram(program)
          }}>
            play
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={() => {
            dsp.stopProgram(program)
          }}>
            stop
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={async () => {
            seekSec.value = null
            seek(0)
          }}>
            restart
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={async () => {
            await dsp.core.worklet.memoryGrow(1)
          }}>
            grow memory
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded" onPointerDown={apply}>apply</button>
        </div>
        <div class="flex items-center gap-3 mb-2 text-xs text-slate-300">
          <label class="flex items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={syncEnabled.value}
              onInput={async e => {
                const v = (e.currentTarget as HTMLInputElement).checked
                syncEnabled.value = v
                localStorage.setItem('syncEnabled', v ? '1' : '0')
                await program.setSyncMode({ enabled: v, bars: syncBars.value })
              }}
            />
            sync mode
          </label>
          <label class="flex items-center gap-2 select-none">
            bars
            <select
              class="bg-slate-700 rounded px-2 py-1"
              value={String(syncBars.value)}
              onChange={async e => {
                const v = Number((e.currentTarget as HTMLSelectElement).value) || 1
                syncBars.value = v
                localStorage.setItem('syncBars', String(v))
                await program.setSyncMode({ enabled: syncEnabled.value, bars: v })
              }}
              disabled={!syncEnabled.value}
            >
              {[1, 2, 4, 8, 16].map(n => <option value={String(n)}>{n}</option>)}
            </select>
          </label>
        </div>
        <div class="flex items-center gap-3 mb-2">
          <div class="text-xs text-slate-300 w-[14ch]">
            {valueSec}s
          </div>
          <input
            type="range"
            class="w-[60dvw]"
            min={0}
            max={maxSec}
            step={0.01}
            value={rangeValue}
            onInput={e => {
              const v = Number((e.currentTarget as HTMLInputElement).value)
              seekSec.value = v
              seek(v)
            }}
          />
        </div>
        <div class="mb-2">
          <div class="text-xs text-slate-300 mb-1">Waveform</div>
          <canvas
            ref={el => {
              waveformCanvasEl = el
            }}
            class="w-full h-20 bg-slate-800 rounded block"
            style={{ width: '100%' }}
          />
        </div>
        <div class="w-full h-[60dvh]">
          <Editor doc={doc} onHoverToken={onHoverToken} />
        </div>
        <pre class="mt-2 text-xs whitespace-pre-wrap">{status}</pre>
        <pre class="mt-2 text-xs whitespace-pre-wrap bg-slate-900/50 p-2 rounded">{workletStats}</pre>
        {stats.value?.vmDebug && (
          <div class="mt-2">
            <div class="text-xs text-slate-300 mb-1">VM debug (watch for growth):</div>
            <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-xs font-mono bg-slate-900/50 p-2 rounded">
              {Object.entries(stats.value.vmDebug).map(([k, v]) => (
                <Fragment key={k}>
                  <span class="text-slate-400">{k}:</span>
                  <span class="text-slate-200">{String(v)}</span>
                </Fragment>
              ))}
            </div>
          </div>
        )}
        <div class="mt-2">
          <div class="text-xs text-slate-300 mb-1">Histories Debug:</div>
          <pre class="text-xs whitespace-pre-wrap bg-slate-900/50 p-2 rounded max-h-[30dvh] overflow-auto">{debugHistories}</pre>
        </div>
      </div>
    )
  }

  render(<App />, document.getElementById('app')!)
}

main()
