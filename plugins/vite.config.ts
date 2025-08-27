import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { alias } from '../alias.config.js'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: './tsconfig.build.json' })],
    resolve: {
        alias: {
            '@maxel01/vue-leaflet': path.resolve(__dirname, '../src/lib'),
            ...alias
        }
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/plugins.ts', import.meta.url)),
            formats: ['es', 'cjs', 'umd'],
            name: 'vue-leaflet-plugins',
            fileName: (fmt) => `vue-leaflet-plugins.${fmt}.js`
        },
        rollupOptions: {
            external: ['vue', 'leaflet', /^leaflet\/.*/, '@maxel01/vue-leaflet'],
            output: {
                // Global variables for use in the UMD build
                globals: {
                    vue: 'Vue',
                    leaflet: 'L'
                }
            },
        }
    }
})
