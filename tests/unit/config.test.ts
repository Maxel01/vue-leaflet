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
                skipUndefinedProps: true
            }
        })
        setVueLeafletConfig({
            experimental: {
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
            skipUndefinedProps: false
        }
    })
}
