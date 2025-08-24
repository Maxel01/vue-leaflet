import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    layerProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { ImageOverlay, LatLngBounds, type LatLngBoundsLiteral } from 'leaflet'
import LImageOverlay from '../../../src/components/LImageOverlay.vue'
import { mergeReactiveProps } from './helper/props'

export const imageOverlayAbstractProps = mergeReactiveProps(layerProps, {
    opacity: 0.5,
    zIndex: 50,
    bounds: new LatLngBounds([0, 0], [50, 50])
})

const imageOverlayProps = mergeReactiveProps(imageOverlayAbstractProps, {
    url: 'replace.jpg',
    expecting: {
        url: (leafletObject: ImageOverlay) => {
            expect(leafletObject._url).toBe(imageOverlayProps.url)
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LImageOverlay, {
        propsData: {
            url: 'some.jpg',
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
