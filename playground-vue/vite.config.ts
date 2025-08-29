import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import { alias } from '../alias.config'

const version: 'local' | 'dist' | 'npm' = 'dist'
const vue_leaflet = {
    local: path.resolve(__dirname, '../src/lib'),
    dist: '@dist/vue-leaflet',
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
