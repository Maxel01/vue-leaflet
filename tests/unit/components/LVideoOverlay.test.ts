import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet,
    videoOverlayProps
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { type LatLngBoundsLiteral, VideoOverlay } from 'leaflet'
import LVideoOverlay from '../../../src/components/LVideoOverlay.vue'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LVideoOverlay, {
        propsData: {
            video: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
            bounds: [
                [32, -130],
                [13, -100]
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

describe('LVideoOverlay.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LVideoOverlay')
    testPropsBindingToLeaflet(createWrapper, videoOverlayProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet video overlay with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as VideoOverlay

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
