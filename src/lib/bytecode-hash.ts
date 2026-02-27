export function hashF32Bits(arr: Float32Array): number {
  const u32 = new Uint32Array(arr.buffer, arr.byteOffset, (arr.byteLength / 4) | 0)
  let hash = 0
  for (let i = 0; i < u32.length; i++) {
    hash = (hash * 31 + (u32[i] ?? 0)) | 0
  }
  return hash
}

