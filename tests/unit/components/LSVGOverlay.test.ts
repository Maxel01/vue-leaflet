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
import { type LatLngBoundsLiteral, SVGOverlay } from 'leaflet'
import LSVGOverlay from '@/components/LSVGOverlay.vue'
import { svgOverlayProps } from './wrapper/LSVGOverlay'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LSVGOverlay, {
        propsData: {
            svg: './some.svg',
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

describe('LSVGOverlay.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LSVGOverlay')
    testPropsBindingToLeaflet(createWrapper, svgOverlayProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testWarnings(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet svg overlay with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as SVGOverlay

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
    it('creates a Leaflet svg overlay with the svg slot and correct options', async () => {
        // TEST add test with slots
    })
}

const testWarnings = (getWrapper: (props: object) => Promise<VueWrapper<any>>) => {
    it('it logs an error when props.svg and the svg slot are invalid', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const wrapper = await getWrapper({svg: undefined})
        expect(consoleWarnMock).toHaveBeenCalledExactlyOnceWith('Missing svg prop or slot: LSVGOverlay has not been created.')
        expect(wrapper.vm.leafletObject).toBeUndefined()
    })
}
