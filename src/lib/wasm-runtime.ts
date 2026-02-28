import type * as WasmExports from '../../as/build/index.d.ts'
import type { WasmSetup } from './wasm-setup.ts'

export type AudioVm = ReturnType<typeof createAudioVm>

export function createAudioVm(
  runtime: WasmRuntime,
  vmId: number,
  controlOpsCapacity: number,
) {
  const localControlOpsPtr0 = runtime.createFloat32Buffer(controlOpsCapacity)
  const localControlOpsPtr1 = runtime.createFloat32Buffer(controlOpsCapacity)
  return {
    id: vmId,
    localControlOpsPtr0,
    localControlOpsPtr1,
    controlOpsCapacity,
    get infoPtr(): number {
      return runtime.getAudioVmInfoPtr(vmId)
    },
    reset(): void {
      runtime.resetAudioVmAt(vmId)
    },
    softReset(): void {
      runtime.softResetAudioVmAt(vmId)
    },
    dispose(): void {
      runtime.freeFloat32Buffer(localControlOpsPtr0)
      runtime.freeFloat32Buffer(localControlOpsPtr1)
    },
  }
}

export type WasmRuntime = ReturnType<typeof createWasmRuntime>

export function createWasmRuntime(core: WasmSetup<typeof WasmExports>) {
  const { wasm, memory } = core
  return {
    get memory() {
      return memory
    },
    get buffer() {
      return memory.buffer
    },
    createFloat32Buffer(capacity: number): number {
      return wasm.createFloat32Buffer(capacity)
    },
    freeFloat32Buffer(ptr: number): void {
      wasm.freeFloat32Buffer(ptr >>> 0)
    },
    copyAudioVmState(fromVmId: number, toVmId: number): void {
      wasm.copyAudioVmState(fromVmId, toVmId)
    },
    getAudioVmInfoPtr(vmId: number): number {
      return wasm.getAudioVmInfoAt(vmId)
    },
    generateMiniHistoryWindow(
      bytecodePtr: number,
      historyPtr: number,
      windowStartSample: number,
      windowEndSample: number,
      bpm: number,
      sampleRate: number,
      barValue: number,
    ): void {
      wasm.generateMiniHistoryWindow(
        bytecodePtr,
        historyPtr,
        windowStartSample,
        windowEndSample,
        bpm,
        sampleRate,
        barValue,
      )
    },
    runAudioVmAt(
      vmId: number,
      audioOpsPtr: number,
      controlOpsLength: number,
      bufferLength: number,
      sampleCount: number,
      sampleRate: number,
      nyquist: number,
      piOverNyquist: number,
      bpm: number,
    ): void {
      wasm.runAudioVmAt(
        vmId,
        audioOpsPtr,
        controlOpsLength,
        bufferLength,
        sampleCount,
        sampleRate,
        nyquist,
        piOverNyquist,
        bpm,
      )
    },
    resetAudioVmAt(vmId: number): void {
      wasm.resetAudioVmAt(vmId)
    },
    softResetAudioVmAt(vmId: number): void {
      wasm.softResetAudioVmAt(vmId)
    },
    gc(): void {
      wasm.__collect()
    },
    memoryGrow(delta: number): number {
      return wasm.memoryGrow(delta)
    },
    memoryUsage(): number {
      return wasm.memoryUsage()
    },
    setBpmOverride(bpm: number): void {
      wasm.bpmOverride(bpm)
    },
  }
}
