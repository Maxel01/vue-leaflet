import { fileURLToPath, URL } from 'node:url'

export const alias = {
    '@/maxel01/vue-leaflet': fileURLToPath(new URL('./src/lib', import.meta.url)),
    '@/playground': fileURLToPath(new URL('./playground', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url))
}
