import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { ImageOverlay, type LatLngBoundsLiteral } from 'leaflet'
import LImageOverlay from '@/components/LImageOverlay.vue'
import { mergeReactiveProps } from '@/tests/helper/props'
import { imageOverlayAbstractProps } from './wrapper/LImageOverlay'

const imageOverlayProps = mergeReactiveProps(imageOverlayAbstractProps, {
    url: 'replace.jpg',
    expecting: {
        url: (leafletObject: ImageOverlay) => {
            // @ts-expect-error _url is private so not in the types
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
