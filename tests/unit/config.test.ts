import { describe, expect, it } from 'vitest'
import { setVueLeafletConfig, vueLeafletConfig } from '@/config'

describe('config', () => {
    it('checks the default settings for the config', () => {
        expectDefault()
    })

    it('changes the settings for the config', () => {
        setVueLeafletConfig({
            experimental: {
                skipUndefinedProps: true
            }
        })
        expect(vueLeafletConfig).to.deep.equal({
            experimental: {
                useResetWebpackIcon: true,
                skipUndefinedProps: true
            }
        })
        setVueLeafletConfig({
            experimental: {
                useResetWebpackIcon: false
            }
        })
        expect(vueLeafletConfig).to.deep.equal({
            experimental: {
                useResetWebpackIcon: false,
                skipUndefinedProps: true
            }
        })
        setVueLeafletConfig({
            experimental: {
                useResetWebpackIcon: true,
                skipUndefinedProps: false
            }
        })
        expectDefault()
    })
    it('gets an empty config', () => {
        setVueLeafletConfig({})
        expectDefault()
        setVueLeafletConfig({ experimental: {} })
        expectDefault()
    })
})

function expectDefault() {
    expect(vueLeafletConfig).to.deep.equal({
        experimental: {
            useResetWebpackIcon: true,
            skipUndefinedProps: false
        }
    })
}
