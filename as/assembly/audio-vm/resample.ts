// dprint-ignore-file

// @ts-ignore
// @inline
export function downsampleDecimate(
  input$: usize,
  output$: usize,
  outputSize: i32,
  factor: i32,
): void {
  if (factor == 2) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      store<f32>(out$, load<f32>(in$))
      in$ += 8
      out$ += 4
    }
    return
  }
  if (factor == 4) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      store<f32>(out$, load<f32>(in$))
      in$ += 16
      out$ += 4
    }
    return
  }
  if (factor == 8) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      store<f32>(out$, load<f32>(in$))
      in$ += 32
      out$ += 4
    }
    return
  }
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
  if (factor == 2) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = load<f32>(in$ + 4)
      store<f32>(out$, (a + b) * f32(0.5))
      in$ += 8
      out$ += 4
    }
    return
  }
  if (factor == 4) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = load<f32>(in$ + 4)
      const c: f32 = load<f32>(in$ + 8)
      const d: f32 = load<f32>(in$ + 12)
      store<f32>(out$, (a + b + c + d) * f32(0.25))
      in$ += 16
      out$ += 4
    }
    return
  }
  if (factor == 8) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < outputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = load<f32>(in$ + 4)
      const c: f32 = load<f32>(in$ + 8)
      const d: f32 = load<f32>(in$ + 12)
      const e: f32 = load<f32>(in$ + 16)
      const f: f32 = load<f32>(in$ + 20)
      const g: f32 = load<f32>(in$ + 24)
      const h: f32 = load<f32>(in$ + 28)
      store<f32>(out$, (a + b + c + d + e + f + g + h) * f32(0.125))
      in$ += 32
      out$ += 4
    }
    return
  }
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
  if (factor == 2) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const v: f32 = load<f32>(in$)
      store<f32>(out$, v)
      store<f32>(out$ + 4, v)
      in$ += 4
      out$ += 8
    }
    return
  }
  if (factor == 4) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const v: f32 = load<f32>(in$)
      store<f32>(out$, v)
      store<f32>(out$ + 4, v)
      store<f32>(out$ + 8, v)
      store<f32>(out$ + 12, v)
      in$ += 4
      out$ += 16
    }
    return
  }
  if (factor == 8) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const v: f32 = load<f32>(in$)
      store<f32>(out$, v)
      store<f32>(out$ + 4, v)
      store<f32>(out$ + 8, v)
      store<f32>(out$ + 12, v)
      store<f32>(out$ + 16, v)
      store<f32>(out$ + 20, v)
      store<f32>(out$ + 24, v)
      store<f32>(out$ + 28, v)
      in$ += 4
      out$ += 32
    }
    return
  }
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
  if (factor == 2) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = i + 1 < inputSize ? load<f32>(in$ + 4) : a
      const d: f32 = b - a
      store<f32>(out$, a)
      store<f32>(out$ + 4, a + d * f32(0.5))
      in$ += 4
      out$ += 8
    }
    return
  }
  if (factor == 4) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = i + 1 < inputSize ? load<f32>(in$ + 4) : a
      const d: f32 = b - a
      store<f32>(out$, a)
      store<f32>(out$ + 4, a + d * f32(0.25))
      store<f32>(out$ + 8, a + d * f32(0.5))
      store<f32>(out$ + 12, a + d * f32(0.75))
      in$ += 4
      out$ += 16
    }
    return
  }
  if (factor == 8) {
    let in$: usize = input$
    let out$: usize = output$
    for (let i: i32 = 0; i < inputSize; i++) {
      const a: f32 = load<f32>(in$)
      const b: f32 = i + 1 < inputSize ? load<f32>(in$ + 4) : a
      const d: f32 = b - a
      store<f32>(out$, a)
      store<f32>(out$ + 4, a + d * f32(0.125))
      store<f32>(out$ + 8, a + d * f32(0.25))
      store<f32>(out$ + 12, a + d * f32(0.375))
      store<f32>(out$ + 16, a + d * f32(0.5))
      store<f32>(out$ + 20, a + d * f32(0.625))
      store<f32>(out$ + 24, a + d * f32(0.75))
      store<f32>(out$ + 28, a + d * f32(0.875))
      in$ += 4
      out$ += 32
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
