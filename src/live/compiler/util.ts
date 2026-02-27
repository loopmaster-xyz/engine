import { AudioVmOp } from '../../dsp/audio-vm-bindings.ts'
import { getOpcodeInfo } from './opcode.ts'

export function disassembleBytecode(bytecode: Float32Array, indent = 0): string[] {
  const lines: string[] = []
  const u32 = new Uint32Array(bytecode.buffer, bytecode.byteOffset, bytecode.length)
  let pc = 0
  const pad = '  '.repeat(indent)

  while (pc < bytecode.length) {
    const opcode = u32[pc]
    const info = getOpcodeInfo(opcode)
    const name = AudioVmOp[opcode] ?? `Unknown(${opcode})`
    const here = pc++

    switch (info.kind) {
      case 'param':
      case 'pc-param': {
        const param = Math.round(bytecode[pc])
        const suffix = name === 'CallFunction' ? ` arg(s)` : ''
        lines.push(`${pad}${here}: ${name} ${param}${suffix}`)
        pc++
        break
      }

      case 'three-param':
        lines.push(
          `${pad}${here}: ${name} ${Math.round(bytecode[pc])} ${Math.round(bytecode[pc + 1])} ${
            Math.round(
              bytecode[pc + 2],
            )
          }`,
        )
        pc += 3
        break

      case 'table': {
        const len = Math.round(bytecode[pc])
        lines.push(`${pad}${here}: ${name} len=${len}`)
        pc += 1 + len
        break
      }

      case 'define-function': {
        const id = Math.round(bytecode[pc])
        const paramCount = Math.round(bytecode[pc + 1])
        const firstParamIn = Math.round(bytecode[pc + 2])
        const closureCount = Math.round(bytecode[pc + 3])
        const localCount = Math.round(bytecode[pc + 4])
        const len = Math.round(bytecode[pc + 5])
        lines.push(
          `${pad}${here}: ${name} id=${id} paramCount=${paramCount} firstParamIn=${firstParamIn} closureCount=${closureCount} localCount=${localCount} len=${len}`,
        )
        pc += 6
        lines.push(...disassembleBytecode(bytecode.subarray(pc, pc + len), indent + 1))
        pc += len
        break
      }

      case 'none':
        lines.push(`${pad}${here}: ${name}`)
        break
    }
  }

  return lines
}
