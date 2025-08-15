import DefaultTheme from 'vitepress/theme'
import './custom.css'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        const components = import.meta.glob('@/playground/app/pages/*.vue', { eager: true })
        for (const [path, module] of Object.entries(components)) {
            const name = 'demo-' + path
                .split('/')
                .pop()
                .replace(/\.vue$/, '')
            app.component(name, module.default)
        }
    }
}
