import { preact } from '@preact/preset-vite'
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from 'vite'
import { assemblyScript } from 'vite-plugin-assemblyscript'
import { coopCoep } from 'vite-plugin-coop-coep'
import { openInEditor } from 'vite-plugin-open-in-editor'
import { watch } from 'vite-plugin-watch'

export default ({ mode }: ConfigEnv): UserConfig => {
  const dirname = process.cwd()
  const env = loadEnv(mode, dirname)
  Object.assign(process.env, env)

  return defineConfig({
    plugins: [
      preact({
        exclude: [
          '**/as/assembly/constants.ts',
          '**/src/lib/**',
          '**/src/audio-vm.ts',
          '**/utils/**',
        ],
      }),
      openInEditor({ cmd: 'cursor' }),
      coopCoep(),
      assemblyScript({
        configFile: 'asconfig.json',
        projectRoot: '.',
        srcMatch: 'as/assembly',
        srcEntryFile: 'as/assembly/index.ts',
        mapFile: './as/build/index.wasm.map',
        extra: [
          '--target',
          'debug',
          '--transform',
          './vendor/as-transform-unroll.js',
        ],
      }),
      assemblyScript({
        configFile: 'asconfig-mobile.json',
        projectRoot: '.',
        srcMatch: 'as/assembly',
        srcEntryFile: 'as/assembly/index.ts',
        mapFile: './as/build/index-mobile.wasm.map',
        extra: [
          '--target',
          'debug',
          '--transform',
          './vendor/as-transform-unroll.js',
        ],
      }),
      watch({
        pattern: ['src/dsl/**/*.ts', 'dsl/**/*.dsl'], // glob or array of globs
        command: 'bun run build', // command or array of commands
        timeout: 200, // optional debounce
        silent: false,
      }),
      {
        name: 'exclude-as-build-from-hmr',
        handleHotUpdate({ file }) {
          if (
            (file.includes('as/build/index.d.ts') && !file.includes('as/assembly'))
          ) {
            return []
          }
        },
      },
    ],
    resolve: {
      dedupe: ['@preact/signals-core'],
    },
  })
}
