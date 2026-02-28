import * as __import0 from "sample";
import * as __import1 from "debug";
async function instantiate(module, imports = {}) {
  const __module0 = imports.sample;
  const __module1 = imports.debug;
  const adaptedImports = {
    env: Object.setPrototypeOf({
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      "console.log"(text) {
        // ~lib/bindings/dom/console.log(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.log(text);
      },
    }, Object.assign(Object.create(globalThis), imports.env || {})),
    sample: Object.setPrototypeOf({
      readSampleChunk(sampleHandle, channel, startSample, length, destPtr) {
        // as/assembly/kernel/sampler/readSampleChunk(i32, i32, i32, i32, usize) => void
        destPtr = destPtr >>> 0;
        __module0.readSampleChunk(sampleHandle, channel, startSample, length, destPtr);
      },
    }, __module0),
    debug: __module1,
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    createFloat32Buffer(size) {
      // as/assembly/index/createFloat32Buffer(i32) => usize
      return exports.createFloat32Buffer(size) >>> 0;
    },
    memoryUsage() {
      // as/assembly/index/memoryUsage() => usize
      return exports.memoryUsage() >>> 0;
    },
    getFloat32BufferArenaInfo() {
      // as/assembly/index/getFloat32BufferArenaInfo() => usize
      return exports.getFloat32BufferArenaInfo() >>> 0;
    },
    getAudioVmInfo() {
      // as/assembly/index/getAudioVmInfo() => usize
      return exports.getAudioVmInfo() >>> 0;
    },
    getAudioVmInfoAt(vmId) {
      // as/assembly/index/getAudioVmInfoAt(i32) => usize
      return exports.getAudioVmInfoAt(vmId) >>> 0;
    },
    getAudioVmArenaInfoAt(vmId) {
      // as/assembly/index/getAudioVmArenaInfoAt(i32) => usize
      return exports.getAudioVmArenaInfoAt(vmId) >>> 0;
    },
    getAudioVmArrayElementIsUndefined(vmId, arrayGlobalIndex, elementIndex) {
      // as/assembly/index/getAudioVmArrayElementIsUndefined(i32, i32, i32) => bool
      return exports.getAudioVmArrayElementIsUndefined(vmId, arrayGlobalIndex, elementIndex) != 0;
    },
    getAudioVmNestedArrayElementIsUndefined(vmId, outerArrayGlobalIndex, outerIndex, innerIndex) {
      // as/assembly/index/getAudioVmNestedArrayElementIsUndefined(i32, i32, i32, i32) => bool
      return exports.getAudioVmNestedArrayElementIsUndefined(vmId, outerArrayGlobalIndex, outerIndex, innerIndex) != 0;
    },
    setAudioVmPreserveFunctionState(vmId, value) {
      // as/assembly/index/setAudioVmPreserveFunctionState(i32, bool) => void
      value = value ? 1 : 0;
      exports.setAudioVmPreserveFunctionState(vmId, value);
    },
    getSampleRecordOutputPtr() {
      // as/assembly/kernel/sample-record/getSampleRecordOutputPtr() => usize
      return exports.getSampleRecordOutputPtr() >>> 0;
    },
    isSampleRecordComplete() {
      // as/assembly/kernel/sample-record/isSampleRecordComplete() => bool
      return exports.isSampleRecordComplete() != 0;
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  return adaptedExports;
}
export const {
  memory,
  __new,
  __pin,
  __unpin,
  __collect,
  __rtti_base,
  createFloat32Buffer,
  freeFloat32Buffer,
  memoryUsage,
  memoryGrow,
  getFloat32BufferArenaInfo,
  runAudioVm,
  getAudioVmInfo,
  runAudioVmAt,
  getAudioVmInfoAt,
  getAudioVmArenaInfoAt,
  releaseAudioVmOutputsAt,
  copyAudioVmState,
  resetAudioVmAt,
  softResetAudioVmAt,
  getAudioVmGlobalAt,
  setAudioVmGlobalAt,
  setAudioVmGlobalUndefined,
  setAudioVmGlobalsSize,
  getAudioVmArrayElementAt,
  getAudioVmArrayElementIsUndefined,
  getAudioVmNestedArrayElementAt,
  getAudioVmNestedArrayElementIsUndefined,
  setAudioVmOversampleModes,
  setAudioVmPreserveFunctionState,
  bpmOverride,
  initSampleRecord,
  runSampleRecordSetup,
  recordSampleChunk,
  recordSampleAll,
  getSampleRecordOutputPtr,
  getSampleRecordSamplesRecorded,
  isSampleRecordComplete,
  resetSampleRecord,
  ensureSampleRecordGlobalsSize,
  setSampleRecordGlobal,
  setSampleRecordGlobalUndefined,
  generateMiniHistoryWindow,
} = await (async url => instantiate(
  await (async () => {
    const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
    if (isNodeOrBun) { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
    else { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
  })(), {
    sample: __maybeDefault(__import0),
    debug: __maybeDefault(__import1),
  }
))(new URL("index-mobile.wasm", import.meta.url));
function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}
