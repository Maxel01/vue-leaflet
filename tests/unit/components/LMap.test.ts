import { flushPromises, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { CRS, LatLngBounds, LatLngExpression, Map } from 'leaflet'
import { mergeReactiveProps } from './helper/props'
import 'leaflet/dist/leaflet.css'
import { expectBoundsToBeClose } from './helper/geo'
import { createMapWrapper } from './wrapper/LMap'
import { MapProps } from '../../../src/functions/map'

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

describe('LMap.vue', () => {
    testEmitsReady(createMapWrapper)
    testComponentPropBindings(createMapWrapper, 'LMap')
    testPropsBindingToLeaflet(createMapWrapper, mapProps)

    testCorrectInitialisation(createMapWrapper)
    testFitBounds(createMapWrapper)
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
