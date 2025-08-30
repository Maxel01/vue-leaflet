import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPolygon from '@/components/LPolygon.vue'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { LatLng, Polygon } from 'leaflet'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { polygonProps } from './wrapper/LPolygon'

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
