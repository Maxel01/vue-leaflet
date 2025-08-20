import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    imageOverlayProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { ImageOverlay, type LatLngBoundsLiteral } from 'leaflet'
import LImageOverlay from '../../../src/components/LImageOverlay.vue'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LImageOverlay, {
        propsData: {
            url: 'https://www.printablee.com/postpic/2011/06/blank-100-square-grid-paper_405041.jpg',
            bounds: [
                [0, 0],
                [100, 100]
            ] as LatLngBoundsLiteral,
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

describe('LImageOverlay.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LImageOverlay')
    testPropsBindingToLeaflet(createWrapper, imageOverlayProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet image overlay with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as ImageOverlay

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
