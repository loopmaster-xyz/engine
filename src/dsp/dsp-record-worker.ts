import { rpc } from 'utils/rpc'
import { sampleManager } from '../lib/sample-manager.ts'
import type { WasmBinary } from './dsp-state.ts'
import type { RecordWorker } from './record-worker.ts'
import recordWorkerUrl from './record-worker.ts?worker&url'
import type { DspProcessor as DspWorklet } from './worklet.ts'

export async function createRecordWorker(wasmBinary: WasmBinary, worklet: DspWorklet) {
  const url = new URL(recordWorkerUrl, window.location.origin).toString()
  const worker = new Worker(url, { type: 'module' })
  const mainChannel = new MessageChannel()
  const sampleSyncChannel = new MessageChannel()
  sampleSyncChannel.port2.onmessage = (e: MessageEvent) => {
    const d = e.data
    if (d?.type === 'sampleDataSync') {
      sampleManager.setSampleData(
        d.handle,
        (d.channels as SharedArrayBuffer[]).map(sab => new Float32Array(sab)),
        d.sampleRate,
      )
    }
    else if (d?.type === 'sampleErrorSync') {
      sampleManager.setSampleError(d.handle, d.error)
    }
  }
  sampleSyncChannel.port2.start()
  worker.postMessage(
    { type: 'init', port: mainChannel.port1, sampleSyncPort: sampleSyncChannel.port1 },
    [mainChannel.port1, sampleSyncChannel.port1],
  )
  const record = rpc<RecordWorker>(mainChannel.port2)
  mainChannel.port2.start()
  await record.loadWasm(wasmBinary.binary, { sourcemapUrl: wasmBinary.sourcemapUrl, config: wasmBinary.config })
  const workerWorkletChannel = new MessageChannel()
  await record.connectWorklet(workerWorkletChannel.port1)
  await worklet.connectRecord(workerWorkletChannel.port2)
  return record
}
