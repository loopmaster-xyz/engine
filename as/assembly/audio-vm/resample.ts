// dprint-ignore-file

// @ts-ignore
// @inline
export function downsampleDecimate(
  input$: usize,
  output$: usize,
  outputSize: i32,
  factor: i32,
): void {
  for (let i: i32 = 0; i < outputSize; i++) {
    const startIdx: i32 = i * factor
    store<f32>(output$ + (i << 2), load<f32>(input$ + (startIdx << 2)))
  }
}

// @ts-ignore
// @inline
export function downsampleBoxcar(
  input$: usize,
  output$: usize,
  outputSize: i32,
  factor: i32,
): void {
  if (outputSize <= 0 || factor <= 0) throw new Error(`downsampleBoxcar: outputSize=${outputSize} factor=${factor}`)
  const inv: f32 = f32(1) / f32(factor)
  for (let i: i32 = 0; i < outputSize; i++) {
    const start: i32 = i * factor
    let acc: f32 = 0
    for (let j: i32 = 0; j < factor; j++) {
      acc += load<f32>(input$ + (usize(start + j) << 2))
    }
    store<f32>(output$ + (usize(i) << 2), acc * inv)
  }
}

// @ts-ignore
// @inline
export function upsampleHold(
  input$: usize,
  output$: usize,
  inputSize: i32,
  factor: i32,
): void {
  if (inputSize <= 0 || factor <= 0) throw new Error(`upsampleHold: inputSize=${inputSize} factor=${factor}`)
  const outSize: i32 = inputSize * factor
  if (outSize <= 0) throw new Error(`upsampleHold: outSize=${outSize}`)
  for (let i: i32 = 0; i < inputSize; i++) {
    const v: f32 = load<f32>(input$ + (usize(i) << 2))
    const start: i32 = i * factor
    for (let j: i32 = 0; j < factor; j++) {
      store<f32>(output$ + (usize(start + j) << 2), v)
    }
  }
}

// @ts-ignore
// @inline
export function upsampleLinear(
  input$: usize,
  output$: usize,
  inputSize: i32,
  factor: i32,
): void {
  if (inputSize <= 0 || factor <= 0) throw new Error(`upsampleLinear: inputSize=${inputSize} factor=${factor}`)
  const outSize: i32 = inputSize * factor
  if (outSize <= 0) throw new Error(`upsampleLinear: outSize=${outSize}`)
  if (inputSize == 1) {
    const v: f32 = load<f32>(input$)
    for (let i: i32 = 0; i < outSize; i++) {
      store<f32>(output$ + (usize(i) << 2), v)
    }
    return
  }
  for (let k: i32 = 0; k < outSize; k++) {
    const pos: f32 = f32(k) / f32(factor)
    const i0: i32 = i32(Mathf.floor(pos))
    let i1: i32 = i0 + 1
    if (i1 >= inputSize) i1 = inputSize - 1
    const t: f32 = pos - f32(i0)
    const a: f32 = load<f32>(input$ + (usize(i0) << 2))
    const b: f32 = load<f32>(input$ + (usize(i1) << 2))
    store<f32>(output$ + (usize(k) << 2), a + (b - a) * t)
  }
}
