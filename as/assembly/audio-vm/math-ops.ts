import { fastPowAudio } from '../util'
import { isUndefined } from './constants'
import { AudioVmOp } from './vm-op'

export class MathOps {
  // @inline
  static unaryScalar(op: AudioVmOp, value: f32): f32 {
    switch (op) {
      case AudioVmOp.Neg:
        return -value
      case AudioVmOp.Not:
        return value == f32(0) ? f32(1) : f32(0)
      case AudioVmOp.BitNot:
        return f32(~i32(value))
      case AudioVmOp.IsUndefined:
        return isUndefined(value) ? f32(1) : f32(0)
      default:
        return value
    }
  }

  // @inline
  static unaryAudio(op: AudioVmOp, inputPtr: usize, outputPtr: usize, bufferLength: i32): void {
    switch (op) {
      case AudioVmOp.Neg: {
        let input$: usize = inputPtr
        let output$: usize = outputPtr
        for (let i = 0; i < bufferLength; i += 4) {
          v128.store(output$, f32x4.neg(v128.load(input$)))
          input$ += 16
          output$ += 16
        }
        break
      }
      case AudioVmOp.Not: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        let input$: usize = inputPtr
        let output$: usize = outputPtr
        for (let i = 0; i < bufferLength; i += 4) {
          const v: v128 = v128.load(input$)
          v128.store(output$, v128.bitselect(ones, zeros, f32x4.eq(v, zeros)))
          input$ += 16
          output$ += 16
        }
        break
      }
      case AudioVmOp.BitNot: {
        let input$: usize = inputPtr
        let output$: usize = outputPtr
        for (let i = 0; i < bufferLength; i += 4) {
          v128.store(output$, v128.not(v128.load(input$)))
          input$ += 16
          output$ += 16
        }
        break
      }
      case AudioVmOp.IsUndefined: {
        let input$: usize = inputPtr
        let output$: usize = outputPtr
        let sample: f32
        for (let i = 0; i < bufferLength; i += 16) {
          unroll(16, () => {
            sample = load<f32>(input$)
            store<f32>(output$, isUndefined(sample) ? f32(1) : f32(0))
            input$ += 4
            output$ += 4
          })
        }
        break
      }
    }
  }

  // @inline
  static binaryScalar(op: AudioVmOp, left: f32, right: f32): f32 {
    switch (op) {
      case AudioVmOp.Add:
        return left + right
      case AudioVmOp.Sub:
        return left - right
      case AudioVmOp.Mul:
        return left * right
      case AudioVmOp.Div:
        return left / right
      case AudioVmOp.Mod:
        return left % right
      case AudioVmOp.Pow:
        const exp: i32 = i32(right)
        if (right == f32(exp) && exp >= 0 && exp <= 16) return fastPowAudio(left, exp)
        return Mathf.pow(left, right)
      case AudioVmOp.Greater:
        return left > right ? f32(1) : f32(0)
      case AudioVmOp.Less:
        return left < right ? f32(1) : f32(0)
      case AudioVmOp.GreaterEqual:
        return left >= right ? f32(1) : f32(0)
      case AudioVmOp.LessEqual:
        return left <= right ? f32(1) : f32(0)
      case AudioVmOp.Equal:
        return left == right ? f32(1) : f32(0)
      case AudioVmOp.NotEqual:
        return left != right ? f32(1) : f32(0)
      case AudioVmOp.And:
        return (left != f32(0) && right != f32(0)) ? f32(1) : f32(0)
      case AudioVmOp.Or:
        return (left != f32(0) || right != f32(0)) ? f32(1) : f32(0)
      case AudioVmOp.BitAnd:
        return f32(i32(left) & i32(right))
      case AudioVmOp.BitOr:
        return f32(i32(left) | i32(right))
      case AudioVmOp.BitXor:
        return f32(i32(left) ^ i32(right))
      case AudioVmOp.ShiftLeft:
        return f32(i32(left) << i32(right))
      case AudioVmOp.ShiftRight:
        return f32(i32(left) >> i32(right))
      default:
        return left
    }
  }

  // @inline
  static binaryAudio(
    op: AudioVmOp,
    leftPtr: usize,
    leftScalar: f32,
    rightPtr: usize,
    rightScalar: f32,
    outputPtr: usize,
    bufferLength: i32,
    leftIsAudio: bool,
    rightIsAudio: bool,
  ): void {
    switch (op) {
      case AudioVmOp.Add: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.add(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          if (rightScalar == f32(0)) {
            memory.copy(outputPtr, leftPtr, usize(bufferLength) << 2)
            break
          }
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.add(v128.load(left$), right))
            left$ += 16
            output$ += 16
          }
        }
        else {
          if (leftScalar == f32(0)) {
            memory.copy(outputPtr, rightPtr, usize(bufferLength) << 2)
            break
          }
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.add(left, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Sub: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.sub(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          if (rightScalar == f32(0)) {
            memory.copy(outputPtr, leftPtr, usize(bufferLength) << 2)
            break
          }
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.sub(v128.load(left$), right))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.sub(left, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Mul: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.mul(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          if (rightScalar == f32(1)) {
            memory.copy(outputPtr, leftPtr, usize(bufferLength) << 2)
            break
          }
          if (rightScalar == f32(0)) {
            memory.fill(outputPtr, 0, usize(bufferLength) << 2)
            break
          }
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.mul(v128.load(left$), right))
            left$ += 16
            output$ += 16
          }
        }
        else {
          if (leftScalar == f32(1)) {
            memory.copy(outputPtr, rightPtr, usize(bufferLength) << 2)
            break
          }
          if (leftScalar == f32(0)) {
            memory.fill(outputPtr, 0, usize(bufferLength) << 2)
            break
          }
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.mul(left, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Div: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.div(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          if (rightScalar == f32(1)) {
            memory.copy(outputPtr, leftPtr, usize(bufferLength) << 2)
            break
          }
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.div(v128.load(left$), right))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, f32x4.div(left, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Mod: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let leftSample: f32
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              leftSample = load<f32>(left$)
              rightSample = load<f32>(right$)
              store<f32>(output$, leftSample % rightSample)
              left$ += 4
              right$ += 4
              output$ += 4
            })
          }
        }
        else if (leftIsAudio) {
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          let leftSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              leftSample = load<f32>(left$)
              store<f32>(output$, leftSample % rightScalar)
              left$ += 4
              output$ += 4
            })
          }
        }
        else {
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              rightSample = load<f32>(right$)
              store<f32>(output$, leftScalar % rightSample)
              right$ += 4
              output$ += 4
            })
          }
        }
        break
      }
      case AudioVmOp.Pow: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let leftSample: f32
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              leftSample = load<f32>(left$)
              rightSample = load<f32>(right$)
              store<f32>(output$, Mathf.pow(leftSample, rightSample))
              left$ += 4
              right$ += 4
              output$ += 4
            })
          }
        }
        else if (leftIsAudio) {
          const exp: i32 = i32(rightScalar)
          const canFastPow: bool = rightScalar == f32(exp) && exp >= 0 && exp <= 16
          if (canFastPow) {
            let left$: usize = leftPtr
            let output$: usize = outputPtr
            let leftSample: f32
            for (let i = 0; i < bufferLength; i += 16) {
              unroll(16, () => {
                leftSample = load<f32>(left$)
                store<f32>(output$, fastPowAudio(leftSample, exp))
                left$ += 4
                output$ += 4
              })
            }
          }
          else {
            let left$: usize = leftPtr
            let output$: usize = outputPtr
            let leftSample: f32
            for (let i = 0; i < bufferLength; i += 16) {
              unroll(16, () => {
                leftSample = load<f32>(left$)
                store<f32>(output$, Mathf.pow(leftSample, rightScalar))
                left$ += 4
                output$ += 4
              })
            }
          }
        }
        else {
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              rightSample = load<f32>(right$)
              store<f32>(output$, Mathf.pow(leftScalar, rightSample))
              right$ += 4
              output$ += 4
            })
          }
        }
        break
      }
      case AudioVmOp.Greater: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.gt(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.gt(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.gt(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Less: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.lt(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.lt(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.lt(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.GreaterEqual: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ge(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ge(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ge(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.LessEqual: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.le(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.le(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.le(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Equal: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.eq(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.eq(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.eq(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.NotEqual: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ne(l, r)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const right: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ne(l, right)))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const left: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            v128.store(output$, v128.bitselect(ones, zeros, f32x4.ne(left, r)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.And: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            const mask: v128 = v128.and(f32x4.ne(l, zeros), f32x4.ne(r, zeros))
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const rightMask: v128 = f32x4.ne(f32x4.splat(rightScalar), zeros)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const mask: v128 = v128.and(f32x4.ne(l, zeros), rightMask)
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const leftMask: v128 = f32x4.ne(f32x4.splat(leftScalar), zeros)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            const mask: v128 = v128.and(leftMask, f32x4.ne(r, zeros))
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.Or: {
        const zeros: v128 = f32x4.splat(0)
        const ones: v128 = f32x4.splat(1)
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const r: v128 = v128.load(right$)
            const mask: v128 = v128.or(f32x4.ne(l, zeros), f32x4.ne(r, zeros))
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const rightMask: v128 = f32x4.ne(f32x4.splat(rightScalar), zeros)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const l: v128 = v128.load(left$)
            const mask: v128 = v128.or(f32x4.ne(l, zeros), rightMask)
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const leftMask: v128 = f32x4.ne(f32x4.splat(leftScalar), zeros)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            const r: v128 = v128.load(right$)
            const mask: v128 = v128.or(leftMask, f32x4.ne(r, zeros))
            v128.store(output$, v128.bitselect(ones, zeros, mask))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.BitAnd: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.and(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const rightVec: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.and(v128.load(left$), rightVec))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const leftVec: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.and(leftVec, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.BitOr: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.or(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const rightVec: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.or(v128.load(left$), rightVec))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const leftVec: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.or(leftVec, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.BitXor: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.xor(v128.load(left$), v128.load(right$)))
            left$ += 16
            right$ += 16
            output$ += 16
          }
        }
        else if (leftIsAudio) {
          const rightVec: v128 = f32x4.splat(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.xor(v128.load(left$), rightVec))
            left$ += 16
            output$ += 16
          }
        }
        else {
          const leftVec: v128 = f32x4.splat(leftScalar)
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, v128.xor(leftVec, v128.load(right$)))
            right$ += 16
            output$ += 16
          }
        }
        break
      }
      case AudioVmOp.ShiftLeft: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let leftSample: f32
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              leftSample = load<f32>(left$)
              rightSample = load<f32>(right$)
              store<f32>(output$, f32(i32(leftSample) << i32(rightSample)))
              left$ += 4
              right$ += 4
              output$ += 4
            })
          }
        }
        else if (leftIsAudio) {
          const amount: i32 = i32(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, i32x4.shl(v128.load(left$), amount))
            left$ += 16
            output$ += 16
          }
        }
        else {
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              rightSample = load<f32>(right$)
              store<f32>(output$, f32(i32(leftScalar) << i32(rightSample)))
              right$ += 4
              output$ += 4
            })
          }
        }
        break
      }
      case AudioVmOp.ShiftRight: {
        if (leftIsAudio && rightIsAudio) {
          let left$: usize = leftPtr
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let leftSample: f32
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              leftSample = load<f32>(left$)
              rightSample = load<f32>(right$)
              store<f32>(output$, f32(i32(leftSample) >> i32(rightSample)))
              left$ += 4
              right$ += 4
              output$ += 4
            })
          }
        }
        else if (leftIsAudio) {
          const amount: i32 = i32(rightScalar)
          let left$: usize = leftPtr
          let output$: usize = outputPtr
          for (let i = 0; i < bufferLength; i += 4) {
            v128.store(output$, i32x4.shr_s(v128.load(left$), amount))
            left$ += 16
            output$ += 16
          }
        }
        else {
          let right$: usize = rightPtr
          let output$: usize = outputPtr
          let rightSample: f32
          for (let i = 0; i < bufferLength; i += 16) {
            unroll(16, () => {
              rightSample = load<f32>(right$)
              store<f32>(output$, f32(i32(leftScalar) >> i32(rightSample)))
              right$ += 4
              output$ += 4
            })
          }
        }
        break
      }
    }
  }
}
