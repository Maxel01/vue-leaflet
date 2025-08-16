import { fileURLToPath, URL } from 'node:url'

export const alias = {
    '@/playground': fileURLToPath(new URL('./playground', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url))
}
