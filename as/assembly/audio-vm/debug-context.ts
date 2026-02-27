/** Debug counters for oversample inner execution (arena get/release while running inner callback). */
let inOversampleInner: boolean = false
let debugInnerGetCount: u32 = 0
let debugInnerReleaseCount: u32 = 0

export function setInOversampleInner(v: boolean): void {
  inOversampleInner = v
}

export function getDebugInnerGetCount(): u32 {
  return debugInnerGetCount
}

export function getDebugInnerReleaseCount(): u32 {
  return debugInnerReleaseCount
}

export function incDebugInnerGet(): void {
  if (inOversampleInner) debugInnerGetCount++
}

export function incDebugInnerRelease(): void {
  if (inOversampleInner) debugInnerReleaseCount++
}

export function resetDebugInner(): void {
  debugInnerGetCount = 0
  debugInnerReleaseCount = 0
}
