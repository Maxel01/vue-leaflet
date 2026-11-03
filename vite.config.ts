import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { configDefaults, defineConfig } from 'vitest/config'
// @ts-expect-error alias.config.js is a plain JS file shared with Node scripts
import { alias } from './alias.config.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isTestHelpers = mode === 'test-helpers'

    return {
        css: {
            postcss: {}
        },
        plugins: [vue(), dts()],
        resolve: {
            alias
        },
        build: isTestHelpers
            ? {
                  emptyOutDir: false,
                  lib: {
                      entry: fileURLToPath(new URL('./tests/test-helpers.ts', import.meta.url)),
                      formats: ['es', 'cjs'],
                      name: 'vue-leaflet-test-helpers',
                      fileName: (fmt) => `vue-leaflet-test-helpers.${fmt}.js`
                  },
                  rolldownOptions: {
                      external: ['vue', 'leaflet', /^leaflet\/.*/, 'vitest', '@vue/test-utils', 'ts-morph'],
                      output: {
                          globals: {
                              vue: 'Vue',
                              leaflet: 'L'
                          }
                      }
                  }
              }
            : {
                  lib: {
                      entry: fileURLToPath(new URL('./src/lib.ts', import.meta.url)),
                      formats: ['es', 'cjs', 'umd'],
                      name: 'vue-leaflet',
                      fileName: (fmt) => `vue-leaflet.${fmt}.js`
                  },
                  rolldownOptions: {
                      external: ['vue', 'leaflet', /^leaflet\/.*/],
                      output: {
                          // Global variables for use in the UMD build
                          globals: {
                              vue: 'Vue',
                              leaflet: 'L'
                          }
                      }
                  }
              },
        test: {
            environment: 'jsdom',
            setupFiles: ['./tests/setup.ts'],
            exclude: [...configDefaults.exclude, 'tests/e2e/**', 'node_modules'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            coverage: {
                provider: 'v8',
                include: ['src/**'],
                exclude: ['src/types/**', 'tests/exports/**']
            }
        }
    }
})
