import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { type LatLngBoundsLiteral, VideoOverlay } from 'leaflet'
import LVideoOverlay from '@/components/LVideoOverlay.vue'
import { videoOverlayProps } from './wrapper/LVideoOverlay'

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
    testWarnings(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet video overlay with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as VideoOverlay

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
    it('creates a Leaflet video overlay with the video slot and correct options', async () => {
        // TEST add test with slots
    })
}

const testWarnings = (getWrapper: (props: object) => Promise<VueWrapper<any>>) => {
    it('it logs an error when props.video and the video slot are invalid', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const wrapper = await getWrapper({ video: undefined })
        expect(consoleWarnMock).toHaveBeenCalledExactlyOnceWith(
            'Missing video prop or slot: VideoOverlay has not been created.'
        )
        expect(wrapper.vm.leafletObject).toBeUndefined()
    })
}
