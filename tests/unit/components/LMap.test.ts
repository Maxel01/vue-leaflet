import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { LatLng, Map } from 'leaflet'
import LMap from '../../../src/components/LMap.vue'
import { mergeReactiveProps } from './helper/props'

const mapProps = mergeReactiveProps(componentProps, {
    width: '400px',
    height: '400px',
    center: [44.5, 10.5],
    // TEST bounds: new LatLngBounds([44.5, 10.5], [47.5, 11.5]),
    // TEST maxBounds: new LatLngBounds([44.5, 10.5], [47.5, 11.5]),
    // zoom: 10,
    minZoom: 3,
    maxZoom: 15,
    // TEST paddingBottomRight: [20, 20],
    // TEST paddingTopLeft: [20, 20],
    // TEST padding: [20, 20],
    // TEST crs: CRS.Simple,
    expecting: {
        width: (leafletObject: Map) => {
            expect(leafletObject.getContainer().style.width).toBe('400px')
        },
        height: (leafletObject: Map) => {
            expect(leafletObject.getContainer().style.height).toBe('400px')
        },
        center: (leafletObject: Map) => {
            expect(leafletObject.getCenter()).toEqual(new LatLng(44.5, 10.5))
        }
    }
})

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
