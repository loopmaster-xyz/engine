export {}
declare global {
  export function unroll(times: number, fn: () => void): void
}
