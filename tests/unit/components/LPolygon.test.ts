import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPolygon from '../../../src/components/LPolygon.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { LatLng, Polygon } from 'leaflet'
import { testRemoveLayerOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { polylineProps } from './LPolyline.test'
import { mergeReactiveProps } from './helper/props'

export const polygonProps = mergeReactiveProps(polylineProps, {
    latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ],
    expecting: {
        latLngs: (leafletObject: Polygon) => {
            expect(leafletObject.getLatLngs()).toStrictEqual([
                polygonProps.latLngs.map(([lat, lng]) => new LatLng(lat, lng)).slice(0, -1)
            ])
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LPolygon, {
        propsData: {
            latLngs: [
                [25.774, -80.19],
                [18.466, -66.118],
                [32.321, -64.757],
                [25.774, -80.19]
            ],
            ...props
        },
        global: {
            provide: {
                [AddLayerInjection as symbol]: mockAddLayer,
                [RemoveLayerInjection as symbol]: mockRemoveLayer
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LPolygon.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LPolygon')
    testPropsBindingToLeaflet(createWrapper, polygonProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet polygon with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Polygon

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([
            [new LatLng(25.774, -80.19), new LatLng(18.466, -66.118), new LatLng(32.321, -64.757)]
        ])
    })
}
