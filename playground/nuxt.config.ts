// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['leaflet/dist/leaflet.css'],
    vite: {
        resolve: {
            alias: {
                '@maxel01/vue-leaflet': 'vue-leaflet-v2',
                //'@maxel01/vue-leaflet': '@maxel01/vue-leaflet'
                //'@maxel01/vue-leaflet': '@vue-leaflet/vue-leaflet'
            }
        }
    }
})
