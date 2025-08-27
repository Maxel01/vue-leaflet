import { describe, expect, it } from 'vitest'
import { defineComponent, h, InjectionKey, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { assertInject } from '../../../src/utils'

const MyKey: InjectionKey<string> = Symbol('MyKey')

const Provider = defineComponent({
    setup(_, { slots }) {
        provide(MyKey, 'injectedValue')
        return () => h('div', slots.default?.())
    }
})

const Consumer = defineComponent({
    setup() {
        const value = assertInject(MyKey)
        return () => h('span', value)
    }
})

describe('assertInject (integration)', () => {
    it('injects value from provider', () => {
        const wrapper = mount(Provider, {
            slots: {
                default: () => h(Consumer)
            }
        })

        expect(wrapper.html()).toContain('injectedValue')
    })

    it('throws if value is not provided', () => {
        const wrapperFn = () => mount(Consumer)
        expect(wrapperFn).toThrowError('Attempt to inject MyKey before it was provided.')
    })
})
