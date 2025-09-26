import { flushPromises, mount } from '@vue/test-utils'
import { expect, vi } from 'vitest'
import LMap from '@/components/LMap.vue'
import { componentProps, expectBoundsToBeClose, mergeReactiveProps } from '@/tests/helper'
import { CRS, LatLngBounds, type LatLngExpression, Map } from 'leaflet'
import type { MapProps } from '@/functions'

export const mapProps = mergeReactiveProps(componentProps, {
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
        paddingBottomRight: (_m: Map, _i, wrapper) => {
            expect((wrapper.vm.$props as MapProps).paddingBottomRight).toStrictEqual(
                mapProps.paddingBottomRight
            )
        },
        paddingTopLeft: (_m: Map, _, wrapper) => {
            expect((wrapper.vm.$props as MapProps).paddingTopLeft).toStrictEqual(
                mapProps.paddingTopLeft
            )
        },
        padding: (_m: Map, _i, wrapper) => {
            expect((wrapper.vm.$props as MapProps).padding).toStrictEqual(mapProps.padding)
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

export const createMapWrapper = async (props = {}, slots = {}) => {
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
