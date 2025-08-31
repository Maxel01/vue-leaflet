import { config, flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LRectangle from '@/components/LRectangle.vue'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { LatLng, LatLngBounds, type Rectangle } from 'leaflet'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { rectangleProps } from './wrapper/LRectangle'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LRectangle, {
        propsData: {
            latLngs: [
                [46.334852, -1.509485],
                [46.342596, -1.328731],
                [46.241487, -1.190568],
                [46.234787, -1.358337],
                [46.294733, -1.234567]
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

describe('LRectangle.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LRectangle')
    testPropsBindingToLeaflet(createWrapper, rectangleProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: (props?) => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet rectangle with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Rectangle

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([
            [
                new LatLng(46.234787, -1.509485),
                new LatLng(46.342596, -1.509485),
                new LatLng(46.342596, -1.190568),
                new LatLng(46.234787, -1.190568)
            ]
        ])
    })
    it('creates a Leaflet rectangle with undefined latLngs', async () => {
        let caughtError: unknown = null
        config.global.config.errorHandler = (err) => {
            caughtError = err
        }
        await getWrapper({ latLngs: undefined })
        expect(caughtError).toBeInstanceOf(Error)
        expect((caughtError as Error).message).toMatch(
            'Specify bounds or LatLngs for a valid rectangle.'
        )
    })
    it('creates a Leaflet rectangle with bounds', async () => {
        const wrapper = await getWrapper({
            bounds: [
                [46.234787, -1.509485],
                [46.342596, -1.190568]
            ]
        })
        const obj = wrapper.vm.leafletObject as Rectangle

        expect(obj.getBounds()).toStrictEqual(
            new LatLngBounds([46.234787, -1.509485], [46.342596, -1.190568])
        )
    })
}
