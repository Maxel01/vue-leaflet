import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { CRS, LatLngBounds, LatLngExpression, Map } from 'leaflet'
import LMap from '../../../src/components/LMap.vue'
import { mergeReactiveProps } from './helper/props'
import 'leaflet/dist/leaflet.css'
import { expectBoundsToBeClose } from './helper/geo'

const mapProps = mergeReactiveProps(componentProps, {
    width: '400px',
    height: '400px',
    center: {
        values: [undefined, null, [44.5, 10.5]]
    },
    bounds: {
        values: [
            [
                [-5, 5],
                [5, -5]
            ] as LatLngExpression[],
            undefined,
            null,
            [null, undefined] as LatLngExpression[]
        ]
    },
    maxBounds: new LatLngBounds([44.5, 10.5], [47.5, 11.5]),
    zoom: 10,
    minZoom: 3,
    maxZoom: 15,
    paddingBottomRight: [100, 100],
    paddingTopLeft: [100, 100],
    padding: [75, 75],
    crs: CRS.Simple,
    expecting: {
        width: (leafletObject: Map) => {
            expect(leafletObject.getContainer().style.width).toBe('400px')
        },
        height: (leafletObject: Map) => {
            expect(leafletObject.getContainer().style.height).toBe('400px')
        },
        center: (leafletObject: Map, iteration: number) => {
            const [lat, lng] = iteration >= 2 ? mapProps.center.values[iteration] : [45, 10]
            expect(leafletObject.getCenter().lat).toBeCloseTo(lat)
            expect(leafletObject.getCenter().lng).toBeCloseTo(lng)
        },
        bounds: (leafletObject: Map) => {
            const lBounds = leafletObject.getBounds()
            const expectedBounds = new LatLngBounds(mapProps.bounds.values[0])
            expectBoundsToBeClose(lBounds, expectedBounds, [2, 2, 1, 1])
        },
        maxBounds: (leafletObject: Map) => {
            expect(leafletObject.options.maxBounds).toStrictEqual(
                new LatLngBounds([44.5, 10.5], [47.5, 11.5])
            )
        },
        paddingBottomRight: (leafletObject: Map, i, wrapper) => {
            expect(wrapper.vm.$props.paddingBottomRight).toStrictEqual(mapProps.paddingBottomRight)
        },
        paddingTopLeft: (leafletObject: Map, i, wrapper) => {
            expect(wrapper.vm.$props.paddingTopLeft).toStrictEqual(mapProps.paddingTopLeft)
        },
        padding: (leafletObject: Map, i, wrapper) => {
            expect(wrapper.vm.$props.padding).toStrictEqual(mapProps.padding)
        }
    }
})

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver

Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: 300
})
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    value: 300
})

export const createWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LMap, {
        propsData: {
            width: '300px',
            height: '300px',
            center: [45, 10],
            zoom: 8,
            noBlockingAnimations: true,
            options: {
                zoomSnap: 0
            },
            ...props
        },
        slots: slots,
        attachTo: document.body
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
    testFitBounds(createWrapper)
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
