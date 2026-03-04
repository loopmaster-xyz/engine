/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * as/assembly/index/createFloat32Buffer
 * @param size `i32`
 * @returns `usize`
 */
export declare function createFloat32Buffer(size: number): number;
/**
 * as/assembly/index/freeFloat32Buffer
 * @param ptr `usize`
 */
export declare function freeFloat32Buffer(ptr: number): void;
/**
 * as/assembly/index/memoryUsage
 * @returns `usize`
 */
export declare function memoryUsage(): number;
/**
 * as/assembly/index/memoryGrow
 * @param delta `i32`
 * @returns `i32`
 */
export declare function memoryGrow(delta: number): number;
/**
 * as/assembly/index/getFloat32BufferArenaInfo
 * @returns `usize`
 */
export declare function getFloat32BufferArenaInfo(): number;
/**
 * as/assembly/index/runAudioVm
 * @param opsPtr `usize`
 * @param opsLength `i32`
 * @param bufferLength `i32`
 * @param sampleCount `i32`
 * @param sampleRate `f32`
 * @param nyquist `f32`
 * @param piOverNyquist `f32`
 * @param bpm `f32`
 */
export declare function runAudioVm(opsPtr: number, opsLength: number, bufferLength: number, sampleCount: number, sampleRate: number, nyquist: number, piOverNyquist: number, bpm: number): void;
/**
 * as/assembly/index/getAudioVmInfo
 * @returns `usize`
 */
export declare function getAudioVmInfo(): number;
/**
 * as/assembly/index/runAudioVmAt
 * @param vmId `i32`
 * @param opsPtr `usize`
 * @param opsLength `i32`
 * @param bufferLength `i32`
 * @param sampleCount `i32`
 * @param sampleRate `f32`
 * @param nyquist `f32`
 * @param piOverNyquist `f32`
 * @param bpm `f32`
 */
export declare function runAudioVmAt(vmId: number, opsPtr: number, opsLength: number, bufferLength: number, sampleCount: number, sampleRate: number, nyquist: number, piOverNyquist: number, bpm: number): void;
/**
 * as/assembly/index/getAudioVmInfoAt
 * @param vmId `i32`
 * @returns `usize`
 */
export declare function getAudioVmInfoAt(vmId: number): number;
/**
 * as/assembly/index/getAudioVmArenaInfoAt
 * @param vmId `i32`
 * @returns `usize`
 */
export declare function getAudioVmArenaInfoAt(vmId: number): number;
/**
 * as/assembly/index/getAudioVmPerfCountersAt
 * @param vmId `i32`
 * @returns `usize`
 */
export declare function getAudioVmPerfCountersAt(vmId: number): number;
/**
 * as/assembly/index/resetAudioVmPerfCountersAt
 * @param vmId `i32`
 */
export declare function resetAudioVmPerfCountersAt(vmId: number): void;
/**
 * as/assembly/index/setAudioVmPerfCountersEnabledAt
 * @param vmId `i32`
 * @param enabled `bool`
 */
export declare function setAudioVmPerfCountersEnabledAt(vmId: number, enabled: boolean): void;
/**
 * as/assembly/index/releaseAudioVmOutputsAt
 * @param vmId `i32`
 */
export declare function releaseAudioVmOutputsAt(vmId: number): void;
/**
 * as/assembly/index/copyAudioVmState
 * @param fromVmId `i32`
 * @param toVmId `i32`
 */
export declare function copyAudioVmState(fromVmId: number, toVmId: number): void;
/**
 * as/assembly/index/resetAudioVmAt
 * @param vmId `i32`
 */
export declare function resetAudioVmAt(vmId: number): void;
/**
 * as/assembly/index/softResetAudioVmAt
 * @param vmId `i32`
 */
export declare function softResetAudioVmAt(vmId: number): void;
/**
 * as/assembly/index/getAudioVmGlobalAt
 * @param vmId `i32`
 * @param index `i32`
 * @returns `f32`
 */
export declare function getAudioVmGlobalAt(vmId: number, index: number): number;
/**
 * as/assembly/index/setAudioVmGlobalAt
 * @param vmId `i32`
 * @param index `i32`
 * @param value `f32`
 */
export declare function setAudioVmGlobalAt(vmId: number, index: number, value: number): void;
/**
 * as/assembly/index/setAudioVmGlobalUndefined
 * @param vmId `i32`
 * @param index `i32`
 */
export declare function setAudioVmGlobalUndefined(vmId: number, index: number): void;
/**
 * as/assembly/index/setAudioVmGlobalsSize
 * @param vmId `i32`
 * @param size `i32`
 */
export declare function setAudioVmGlobalsSize(vmId: number, size: number): void;
/**
 * as/assembly/index/getAudioVmArrayElementAt
 * @param vmId `i32`
 * @param arrayGlobalIndex `i32`
 * @param elementIndex `i32`
 * @returns `f32`
 */
export declare function getAudioVmArrayElementAt(vmId: number, arrayGlobalIndex: number, elementIndex: number): number;
/**
 * as/assembly/index/getAudioVmArrayElementIsUndefined
 * @param vmId `i32`
 * @param arrayGlobalIndex `i32`
 * @param elementIndex `i32`
 * @returns `bool`
 */
export declare function getAudioVmArrayElementIsUndefined(vmId: number, arrayGlobalIndex: number, elementIndex: number): boolean;
/**
 * as/assembly/index/getAudioVmNestedArrayElementAt
 * @param vmId `i32`
 * @param outerArrayGlobalIndex `i32`
 * @param outerIndex `i32`
 * @param innerIndex `i32`
 * @returns `f32`
 */
export declare function getAudioVmNestedArrayElementAt(vmId: number, outerArrayGlobalIndex: number, outerIndex: number, innerIndex: number): number;
/**
 * as/assembly/index/getAudioVmNestedArrayElementIsUndefined
 * @param vmId `i32`
 * @param outerArrayGlobalIndex `i32`
 * @param outerIndex `i32`
 * @param innerIndex `i32`
 * @returns `bool`
 */
export declare function getAudioVmNestedArrayElementIsUndefined(vmId: number, outerArrayGlobalIndex: number, outerIndex: number, innerIndex: number): boolean;
/**
 * as/assembly/index/setAudioVmOversampleModes
 * @param vmId `i32`
 * @param upMode `i32`
 * @param downMode `i32`
 */
export declare function setAudioVmOversampleModes(vmId: number, upMode: number, downMode: number): void;
/**
 * as/assembly/index/setAudioVmPreserveFunctionState
 * @param vmId `i32`
 * @param value `bool`
 */
export declare function setAudioVmPreserveFunctionState(vmId: number, value: boolean): void;
/**
 * as/assembly/audio-vm/constants/bpmOverride
 * @param value `f32`
 */
export declare function bpmOverride(value: number): void;
/**
 * as/assembly/kernel/sample-record/initSampleRecord
 * @param setupPtr `usize`
 * @param setupLength `i32`
 * @param loopPtr `usize`
 * @param loopLength `i32`
 * @param numSamples `i32`
 * @param sampleRate `f32`
 */
export declare function initSampleRecord(setupPtr: number, setupLength: number, loopPtr: number, loopLength: number, numSamples: number, sampleRate: number): void;
/**
 * as/assembly/kernel/sample-record/runSampleRecordSetup
 */
export declare function runSampleRecordSetup(): void;
/**
 * as/assembly/kernel/sample-record/recordSampleChunk
 * @param chunkSize `i32`
 * @returns `i32`
 */
export declare function recordSampleChunk(chunkSize: number): number;
/**
 * as/assembly/kernel/sample-record/recordSampleAll
 */
export declare function recordSampleAll(): void;
/**
 * as/assembly/kernel/sample-record/getSampleRecordOutputPtr
 * @returns `usize`
 */
export declare function getSampleRecordOutputPtr(): number;
/**
 * as/assembly/kernel/sample-record/getSampleRecordSamplesRecorded
 * @returns `i32`
 */
export declare function getSampleRecordSamplesRecorded(): number;
/**
 * as/assembly/kernel/sample-record/isSampleRecordComplete
 * @returns `bool`
 */
export declare function isSampleRecordComplete(): boolean;
/**
 * as/assembly/kernel/sample-record/resetSampleRecord
 */
export declare function resetSampleRecord(): void;
/**
 * as/assembly/kernel/sample-record/ensureSampleRecordGlobalsSize
 * @param size `i32`
 */
export declare function ensureSampleRecordGlobalsSize(size: number): void;
/**
 * as/assembly/kernel/sample-record/setSampleRecordGlobal
 * @param index `i32`
 * @param value `f32`
 */
export declare function setSampleRecordGlobal(index: number, value: number): void;
/**
 * as/assembly/kernel/sample-record/setSampleRecordGlobalUndefined
 * @param index `i32`
 */
export declare function setSampleRecordGlobalUndefined(index: number): void;
/**
 * as/assembly/mini/index/generateMiniHistoryWindow
 * @param bytecode$ `usize`
 * @param history$ `usize`
 * @param windowStartSample `i32`
 * @param windowEndSample `i32`
 * @param bpm `f32`
 * @param sampleRate `f32`
 * @param barValue `f32`
 */
export declare function generateMiniHistoryWindow(bytecode$: number, history$: number, windowStartSample: number, windowEndSample: number, bpm: number, sampleRate: number, barValue: number): void;
