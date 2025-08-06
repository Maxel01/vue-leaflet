import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlAttribution from '../../../src/components/LControlAttribution.vue'
import { RegisterControlInjection } from '../../../src/types/injectionKeys'
import { Control } from 'leaflet'
import { testRemovesOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockRegisterControl, testControlRegistration } from './helper/injectionsTests'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlAttribution, {
        propsData: {
            position: 'topright',
            prefix: 'Hello there',
            ...props,
        },
        global: {
            provide: {
                [RegisterControlInjection as symbol]: mockRegisterControl,
            },
        },
    })

    await flushPromises()
    return wrapper
}

describe('LControlAttribution.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper)
    testPropsBindingToLeaflet(createWrapper, { prefix: 'new prefix', position: 'bottomleft' })
    testRemovesOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet Attribution control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Attribution

        expect(obj).toBeDefined()
        expect(obj.options.prefix).toBe('Hello there')
        expect(obj.options.position).toBe('topright')
    })
}
