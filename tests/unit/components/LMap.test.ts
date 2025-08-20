import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
    mapProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { Map } from 'leaflet'
import LMap from '../../../src/components/LMap.vue'

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LMap, {
        propsData: {
            center: [45, 10],
            zoom: 8,
            ...props
        }
    })

    await flushPromises()
    return wrapper
}

describe('LMap.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LMap')
    testPropsBindingToLeaflet(createWrapper, mapProps)

    testCorrectInitialisation(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet map with correct options', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        const obj = wrapper.vm.leafletObject as Map

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
