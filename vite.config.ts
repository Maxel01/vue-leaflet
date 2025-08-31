import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { alias } from './alias.config.js'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: './tsconfig.build.json', include: ['src'] })],
    resolve: {
        alias
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/lib.ts', import.meta.url)),
            formats: ['es', 'cjs', 'umd'],
            name: 'vue-leaflet',
            fileName: (fmt) => `vue-leaflet.${fmt}.js`
        },
        rollupOptions: {
            external: ['vue', 'leaflet', /^leaflet\/.*/],
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
