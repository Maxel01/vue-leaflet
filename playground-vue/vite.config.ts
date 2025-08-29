import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import { alias } from '../alias.config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@maxel01/vue-leaflet': path.resolve(__dirname, '../src/lib'),
            //'@maxel01/vue-leaflet': '@maxel01/vue-leaflet'
            //'@maxel01/vue-leaflet': '@vue-leaflet/vue-leaflet'
            ...alias
        }
    }
})
