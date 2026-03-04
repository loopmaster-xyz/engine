import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'bun:test'

describe('audio-vm generated dispatch', () => {
  it('uses switch dispatch and maps every imported gen handler', () => {
    const file = resolve('as/assembly/audio-vm/vm-ops-gens.ts')
    const source = readFileSync(file, 'utf8')

    expect(source.includes('switch (op)')).toBe(true)
    expect(source.includes('if (op >= AudioVmOp.')).toBe(false)

    const importedHandlers = source.match(/handleGenOp_[A-Za-z0-9_]+/g) ?? []
    const uniqueHandlers = [...new Set(importedHandlers)].filter(h => h !== 'handleGenOp')

    for (const handler of uniqueHandlers) {
      expect(source.includes(`return ${handler}(`)).toBe(true)
    }
  })
})
