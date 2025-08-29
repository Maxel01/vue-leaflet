// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import { alias } from '../alias.config'

const version: 'local' | 'dist' | 'npm' = 'dist'
const vue_leaflet = {
    local: path.resolve(__dirname, '../src/lib'),
    dist: '@dist/vue-leaflet',
    npm: '@maxel01/vue-leaflet'
}

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['leaflet/dist/leaflet.css'],
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    vite: {
        resolve: {
            alias: {
                '@maxel01/vue-leaflet': vue_leaflet[version],
                ...alias
            }
        }
    }
})
