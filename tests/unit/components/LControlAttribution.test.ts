import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlAttribution from '@/components/LControlAttribution.vue'
import { RegisterControlInjection } from '@/types/injectionKeys'
import type { Control } from 'leaflet'
import { testRemoveOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockRegisterControl, testControlRegistration } from '@/tests/helper/injectionsTests'
import { controlAttributionProps } from './wrapper/LControlAttribution'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlAttribution, {
        propsData: {
            position: 'topright',
            prefix: 'Hello there',
            ...props
        },
        global: {
            provide: {
                [RegisterControlInjection as symbol]: mockRegisterControl
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LControlAttribution.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControlAttribution')
    testPropsBindingToLeaflet(createWrapper, controlAttributionProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet attribution control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Attribution

        expect(obj).toBeDefined()
        expect(obj.options.prefix).toBe('Hello there')
        expect(obj.options.position).toBe('topright')
    })
}
