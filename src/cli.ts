#!/usr/bin/env bun

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'path'
import type { Gen } from './dsl/ast.ts'
import { generateAudioVmBindings } from './dsl/generator/bindings.ts'
import { generateAll, generateGens } from './dsl/generator/gens.ts'
import { generateAudioVmAssembly, generateAudioVmOp, generateAudioVmParams } from './dsl/generator/ops.ts'
import { parse } from './dsl/parser.ts'

const command = process.argv[2]

if (command === 'dsl') {
  const dslDir = 'dsl'
  const outputDir = 'as/assembly/gen'
  const audioVmDir = 'as/assembly/audio-vm'
  const gens: Gen[] = []

  if (!existsSync(dslDir)) {
    console.error(`Directory ${dslDir} not found`)
    process.exit(1)
  }

  const entries = readdirSync(dslDir, { withFileTypes: true })
  const dslFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.dsl'))
    .map(e => join(dslDir, e.name))

  if (dslFiles.length === 0) {
    console.error(`No .dsl files found in ${dslDir}`)
    process.exit(1)
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

  for (const dslFile of dslFiles) {
    try {
      console.log(`Processing ${dslFile}...`)
      const content = readFileSync(dslFile, 'utf-8')
      const gen = parse(content)
      gens.push(gen)
      const code = generateAll(gen)

      const dslName = basename(dslFile, '.dsl')
      const outputName = toKebabCase(dslName)
      const outputFile = join(outputDir, `${outputName}.ts`)
      writeFileSync(outputFile, code, 'utf-8')
      console.log(`  Generated ${outputFile}`)
    }
    catch (error) {
      console.error(`Error processing ${dslFile}: ${(error as Error).message}`)
      if (error instanceof Error && 'location' in error) {
        console.error(`  ${(error as any).location}`)
      }
      process.exit(1)
    }
  }

  try {
    if (!existsSync(audioVmDir)) {
      mkdirSync(audioVmDir, { recursive: true })
    }

    const audioVmParams = generateAudioVmParams(gens)
    const audioVmParamsPath = join(audioVmDir, 'vm-params.ts')
    writeFileSync(audioVmParamsPath, audioVmParams, 'utf-8')
    console.log(`  Generated ${audioVmParamsPath}`)

    const audioVmOp = generateAudioVmOp(gens)
    const audioVmOpPath = join(audioVmDir, 'vm-op.ts')
    writeFileSync(audioVmOpPath, audioVmOp, 'utf-8')
    console.log(`  Generated ${audioVmOpPath}`)

    const { controller, genFiles } = generateAudioVmAssembly(gens)
    const vmOpsGensDir = join(audioVmDir, 'vm-ops-gens')
    if (!existsSync(vmOpsGensDir)) {
      mkdirSync(vmOpsGensDir, { recursive: true })
    }
    writeFileSync(join(audioVmDir, 'vm-ops-gens.ts'), controller, 'utf-8')
    console.log(`  Generated ${join(audioVmDir, 'vm-ops-gens.ts')}`)
    for (const [genName, content] of genFiles) {
      const genPath = join(vmOpsGensDir, `gen-${toKebabCase(genName)}.ts`)
      writeFileSync(genPath, content, 'utf-8')
      console.log(`  Generated ${genPath}`)
    }

    const audioVmBindings = generateAudioVmBindings(gens)
    const audioVmBindingsPath = join('src', 'dsp', 'audio-vm-bindings.ts')
    writeFileSync(audioVmBindingsPath, audioVmBindings, 'utf-8')
    console.log(`  Generated ${audioVmBindingsPath}`)

    const gensDescriptor = generateGens(gens)
    const gensPath = join('src', 'dsp', 'audio-vm-gens.ts')
    writeFileSync(gensPath, gensDescriptor, 'utf-8')
    console.log(`  Generated ${gensPath}`)
  }
  catch (error) {
    console.error(`Error generating audio VM: ${(error as Error).message}`)
    process.exit(1)
  }

  console.log('Done!')
}
else {
  console.error(`Unknown command: ${command}`)
  console.error('Usage: bun run src/cli.ts dsl')
  process.exit(1)
}
