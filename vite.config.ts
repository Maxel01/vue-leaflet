import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
// @ts-expect-error alias.config.js is a plain JS file shared with Node scripts
import { alias } from './alias.config.js'

// https://vite.dev/config/
export default defineConfig({
    css: {
        postcss: {}
    },
    plugins: [vue(), dts()],
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
    }
})
