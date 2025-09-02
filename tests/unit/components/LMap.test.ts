import { type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { LatLngBounds, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { expectBoundsToBeClose } from '@/tests/helper/geo'
import { createMapWrapper, mapProps } from './wrapper/LMap'
import type { MapProps } from '@/functions/map'
import LTileLayer from '@/components/LTileLayer.vue'
import LControlLayers from '@/components/LControlLayers.vue'

describe('LMap.vue', () => {
    testEmitsReady(createMapWrapper)
    testComponentPropBindings(createMapWrapper, 'LMap')
    testPropsBindingToLeaflet(createMapWrapper, mapProps)

    testCorrectInitialisation(createMapWrapper)
    testFitBounds(createMapWrapper)
    testBeforeMapMount(createMapWrapper)
    testRemoveLayer(createMapWrapper)
    testRemoveMapOnUmount(createMapWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet map with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Map

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
        const mapElement = wrapper.find('.leaflet-container')
        expect(mapElement.exists()).toBe(true)
    })
}

const testFitBounds = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('fits the map bounds with different paddings', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Map
        // paddingBottomRight
        await wrapper.setProps({
            paddingBottomRight: mapProps.paddingBottomRight,
            paddingTopLeft: undefined,
            padding: undefined
        })
        wrapper.vm.fitBounds(mapProps.bounds.values[0])
        let expectedBounds = new LatLngBounds([-10, -5], [5, 10])
        expectBoundsToBeClose(obj.getBounds(), expectedBounds, [1, 0, 1, 1])
        // paddingTopLeft
        await wrapper.setProps({
            paddingBottomRight: undefined,
            paddingTopLeft: mapProps.paddingTopLeft,
            padding: undefined
        })
        wrapper.vm.fitBounds(mapProps.bounds.values[0])
        expectedBounds = new LatLngBounds([-5, -10], [10, 5])
        expectBoundsToBeClose(obj.getBounds(), expectedBounds, 1)
        // padding
        await wrapper.setProps({
            paddingBottomRight: undefined,
            paddingTopLeft: undefined,
            padding: mapProps.padding
        })
        wrapper.vm.fitBounds(mapProps.bounds.values[0])
        expectedBounds = new LatLngBounds([-10, -10], [10, 10])
        expectBoundsToBeClose(obj.getBounds(), expectedBounds, [0, 1, 1, 1])
    })
}

const testBeforeMapMount = (getWrapper: (props: MapProps) => Promise<VueWrapper<any>>) => {
    it('it calls beforeMapMount', async () => {
        const mockFn = vi.fn()
        await getWrapper({ beforeMapMount: mockFn })
        expect(mockFn).toHaveBeenCalledOnce()
    })
    it('it catches the error in beforeMapMount', async () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
        const mockFn = vi.fn(() => {
            throw new Error('Error in BeforeMapMount')
        })
        await getWrapper({ beforeMapMount: mockFn })
        expect(mockFn).toThrow()
        expect(consoleErrorMock).toHaveBeenCalledExactlyOnceWith(
            'The following error occurred running the provided beforeMapMount hook Error: Error in BeforeMapMount'
        )
    })
}

const testRemoveLayer = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the layer from the map on unmount with ControlLayers', async () => {
        const wrapper = await createMapWrapper(
            {},
            { default: [LControlLayers, h(LTileLayer, { url: '', layerType: 'base' })] }
        )
        wrapper.unmount()
    })
    it('removes the layer from the map on unmount without ControlLayers', async () => {
        const wrapper = await createMapWrapper(
            {},
            { default: h(LTileLayer, { url: '', layerType: 'base' }) }
        )
        wrapper.unmount()
    })
}

const testRemoveMapOnUmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the map on unmount', async () => {
        const wrapper = await getWrapper()

        wrapper.unmount()
        await nextTick()
        const leafletObject = wrapper.vm.leafletObject as Map
        // @ts-expect-error _mapPane is private so not in the types
        expect(leafletObject._mapPane).toBe(undefined)
    })
    it('should not respond to events after removal', async () => {
        const wrapper = await getWrapper()
        const leafletObject = wrapper.vm.leafletObject as Map
        const spy = vi.fn()
        leafletObject.on('click', spy)

        wrapper.unmount()
        leafletObject.fire('click')
        expect(spy).not.toHaveBeenCalled()
    })
}
