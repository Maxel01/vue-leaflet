import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlZoom from '../../../src/components/LControlZoom.vue'
import { RegisterControlInjection } from '../../../src/types/injectionKeys'
import { Control } from 'leaflet'
import { testRemoveOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockRegisterControl, testControlRegistration } from './helper/injectionsTests'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlZoom, {
        propsData: {
            position: 'topright',
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

describe('LControlZoom.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, "LControlZoom")
    testPropsBindingToLeaflet(createWrapper, { position: 'bottomleft' })
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet Attribution control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Zoom

        expect(obj).toBeDefined()
        expect(obj.options.position).toBe('topright')
    })
}
