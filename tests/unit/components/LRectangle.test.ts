import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LRectangle from '../../../src/components/LRectangle.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { LatLng, Rectangle } from 'leaflet'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    rectangleProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'

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

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet rectangle with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Rectangle

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([[
            new LatLng(46.234787, -1.509485),
            new LatLng(46.342596, -1.509485),
            new LatLng(46.342596, -1.190568),
            new LatLng(46.234787, -1.190568)
        ]])
    })
}
