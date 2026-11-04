import { describe, expect, it } from 'vitest'
import { setupVueLeafletTest } from '@/tests/helper/setupVueLeafletTest'

describe('setupVueLeafletTest', () => {
    it('sets up ResizeObserver, matchMedia, clientWidth and clientHeight', () => {
        setupVueLeafletTest({ width: 400, height: 500 })

        expect(globalThis.ResizeObserver).toBeDefined()
        const observer = new globalThis.ResizeObserver(() => {})
        expect(typeof observer.observe).toBe('function')
        expect(typeof observer.unobserve).toBe('function')
        expect(typeof observer.disconnect).toBe('function')

        expect(window.matchMedia).toBeDefined()
        const mq = window.matchMedia('(max-width: 600px)')
        expect(mq.matches).toBe(false)
        expect(typeof mq.addListener).toBe('function')
        expect(typeof mq.removeListener).toBe('function')

        const div = document.createElement('div')
        expect(div.clientWidth).toBe(400)
        expect(div.clientHeight).toBe(500)
    })
})
