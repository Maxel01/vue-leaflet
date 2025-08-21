import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { Map } from 'leaflet'
import LMap from '../../../src/components/LMap.vue'

const mapProps = {
    ...componentProps
    // TEST width: '300px',
    // TEST height: '300px',
    // TEST center: [44.5, 10.5],
    // TEST bounds: new LatLngBounds([44.5, 10.5], [47.5, 11.5]),
    // TEST maxBounds: new LatLngBounds([44.5, 10.5], [47.5, 11.5]),
    // TEST zoom: 10,
    // TEST minZoom: 3,
    // TEST maxZoom: 15,
    // TEST paddingBottomRight: [20, 20],
    // TEST paddingTopLeft: [20, 20],
    // TEST padding: [20, 20],
    // TEST crs: CRS.Simple,
}

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LMap, {
        propsData: {
            width: '300px',
            height: '300px',
            center: [45, 10],
            zoom: 8,
            ...props
        }
    })
    await flushPromises()
    await vi.waitFor(() => expect(wrapper.emitted('ready')).toBeTruthy())
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
