import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPolyline from '../../../src/components/LPolyline.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { LatLng, Polyline } from 'leaflet'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    pathProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'

export const polylineProps = {
    ...pathProps,
    smoothFactor: 0.9,
    noClip: true,
    latLngs: [
        [47.4, -1.51],
        [47.34, -1.3],
        [47.24, -1.2],
        [47.23, -1.36]
    ],
    expecting: {
        latLngs: (leafletObject: Polyline) => {
            expect(leafletObject.getLatLngs()).toStrictEqual(
                polylineProps.latLngs.map(([lat, lng]) => new LatLng(lat, lng))
            )
        }
    }
}

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LPolyline, {
        propsData: {
            latLngs: [
                [47.334852, -1.509485],
                [47.342596, -1.328731],
                [47.241487, -1.190568],
                [47.234787, -1.358337]
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

describe('LPolyline.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LPolyline')
    testPropsBindingToLeaflet(createWrapper, polylineProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet polyline with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Polyline

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([
            new LatLng(47.334852, -1.509485),
            new LatLng(47.342596, -1.328731),
            new LatLng(47.241487, -1.190568),
            new LatLng(47.234787, -1.358337)
        ])
    })
}
