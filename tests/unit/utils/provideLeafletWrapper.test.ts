import { describe, it, expect, vi } from 'vitest'
import { provideLeafletWrapper, updateLeafletWrapper } from '../../../src/utils'
import { inject, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

const testKey = Symbol('testMethod')

describe('provideLeafletWrapper', () => {
    it('should provide a default wrapper that logs a warning', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const TestComponent = defineComponent({
            setup() {
                const wrapper = provideLeafletWrapper(testKey)
                wrapper('arg1', 'arg2')
                return () => h('div')
            }
        })

        mount(TestComponent)
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'Method Symbol(testMethod) has been invoked without being replaced'
        )
        consoleWarnSpy.mockRestore()
    })

    it('should allow updating the wrapper function', () => {
        const mockFn = vi.fn()

        const TestComponent = defineComponent({
            setup() {
                const wrapper = provideLeafletWrapper(testKey)
                updateLeafletWrapper(wrapper, mockFn)
                wrapper('foo', 'bar')
                return () => h('div')
            }
        })

        mount(TestComponent)
        expect(mockFn).toHaveBeenCalledWith('foo', 'bar')
    })

    it('should inject the wrapper correctly', () => {
        const mockFn = vi.fn()

        const ProviderComponent = defineComponent({
            setup(_, { slots }) {
                const wrapper = provideLeafletWrapper(testKey)
                updateLeafletWrapper(wrapper, mockFn)
                return () => h('div', slots.default?.())
            }
        })

        const ConsumerComponent = defineComponent({
            setup() {
                const injected = inject(testKey) as (...args: any[]) => void
                injected('hello')
                return () => h('div')
            }
        })

        mount(ProviderComponent, {
            slots: {
                default: () => h(ConsumerComponent)
            }
        })

        expect(mockFn).toHaveBeenCalledWith('hello')
    })
})
