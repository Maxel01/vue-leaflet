import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import { alias } from '../alias.config.ts'

const version: 'local' | 'dist' | 'npm' = 'dist'
const vue_leaflet = {
    local: path.resolve(import.meta.dirname, '../src/lib.ts'),
    dist: path.resolve(import.meta.dirname, '../dist/vue-leaflet.es.js'),
    npm: '@maxel01/vue-leaflet'
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@maxel01/vue-leaflet': vue_leaflet[version],
            ...alias
        }
    }
})
