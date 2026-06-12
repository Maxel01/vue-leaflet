import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { alias } from './alias.config.js'

export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: './tsconfig.build.json' })
    ],
    resolve: {
        alias
    },
    build: {
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
                // Global variables for use in the UMD build
                globals: {
                    vue: 'Vue',
                    leaflet: 'L'
                }
            }
        }
    }
})
