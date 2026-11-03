import { fileURLToPath, URL } from 'node:url'

export const alias: Record<string, string> = {
    '@/playground': fileURLToPath(new URL('./playground', import.meta.url)),
    '@/tests': fileURLToPath(new URL('./tests', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url))
}
