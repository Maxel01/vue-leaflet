import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { RegisterLayerControlInjection } from '@/types/injectionKeys'
import { testRemoveOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import LControlLayers from '@/components/LControlLayers.vue'
import {
    mockRegisterLayerControl,
    testControlLayerRegistration
} from '@/tests/helper/injectionsTests'
import type { Control } from 'leaflet'
import LTileLayer from '@/components/LTileLayer.vue'
import { createMapWrapper } from './wrapper/LMap'
import { controlLayersProps } from './wrapper/LControlLayers'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlLayers, {
        propsData: {
            position: 'topright',
            ...props
        },
        global: {
            provide: {
                [RegisterLayerControlInjection as symbol]: mockRegisterLayerControl
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LControlLayers.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControlLayers')
    testPropsBindingToLeaflet(createWrapper, controlLayersProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlLayerRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet control layers with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Layers

        expect(obj).toBeDefined()
        expect(obj.options.position).toBe('topright')
    })

    // TODO move from unit tests
    it.each(['base', 'overlay'])(
        'creates a Leaflet control layers with Map and a TileLayer',
        async (layerType) => {
            const wrapper = await createMapWrapper(
                {},
                {
                    default: [
                        h(LTileLayer, { layerType: layerType, url: '' }),
                        LControlLayers,
                        h(LTileLayer, { layerType: layerType, url: '' })
                    ]
                }
            )
            const lControlLayers = wrapper.findComponent(LControlLayers)
            expect(lControlLayers.vm.leafletObject).toBeDefined()
            // @ts-expect-error _map is private so not in the types
            expect((lControlLayers.vm.leafletObject as Control.Layers)._map).toBeDefined()
            const lTileLayer = wrapper.findComponent(LTileLayer)
            expect(lTileLayer.vm.leafletObject).toBeDefined()
        }
    )
}
