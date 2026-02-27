import { AudioVmOp } from '../dsp/audio-vm-bindings.ts'
import { sampleManager } from './sample-manager.ts'

export function createWasmImports(memory: WebAssembly.Memory) {
  return {
    debug: {
      debugAudioVmOp: (pc: number, op: number = -1, stackTop: number) => {
        // console.log(`[vm debug] pc:${pc}\t op:${op}:${(AudioVmOp[op] ?? 'Unknown').padEnd(15)}\t stackTop:${stackTop}`)
      },
    },
    sample: {
      readSampleChunk: (sampleHandle: number, channel: number, startSample: number, length: number,
        destPtr: number) =>
      {
        const sample = sampleManager.getSample(sampleHandle)
        if (!sample || !sample.ready) {
          const chunk = new Float32Array(length)
          const f32 = new Float32Array(memory.buffer, destPtr, length)
          f32.set(chunk)
          return
        }
        const chunk = sampleManager.readChunk(sampleHandle, channel, startSample, length)
        const f32 = new Float32Array(memory.buffer, destPtr, length)
        f32.set(chunk)
      },
      getSampleLength: (sampleHandle: number, channel: number) => {
        const sample = sampleManager.getSample(sampleHandle)
        const length = (!sample || !sample.ready) ? 0 : (sample.channels[channel] ? sample.channels[channel].length : 0)
        return length
      },
      getSampleChannelCount: (sampleHandle: number) => {
        const sample = sampleManager.getSample(sampleHandle)
        if (!sample || !sample.ready) return 0
        return sample.channels.length
      },
      getSliceCount: (sampleHandle: number, threshold: number) => {
        const result = sampleManager.getSlices(sampleHandle, threshold)
        return result.count
      },
      getSlicePoint: (sampleHandle: number, threshold: number, index: number) => {
        const result = sampleManager.getSlices(sampleHandle, threshold)
        if (index < 0 || index >= result.count) return 0
        return result.points[index] ?? 0
      },
      getSampleVersion: (sampleHandle: number) => sampleManager.getSampleVersion(sampleHandle),
    },
  }
}
