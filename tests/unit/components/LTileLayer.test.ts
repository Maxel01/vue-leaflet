import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    gridLayerProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { TileLayer } from 'leaflet'
import LTileLayer from '../../../src/components/LTileLayer.vue'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LTileLayer, {
        propsData: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            layerType: 'base',
            name: 'OpenStreetMap',
            maxZoom: 10,
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

describe('LTileLayer.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LTileLayer')
    testPropsBindingToLeaflet(createWrapper, gridLayerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet tile layer with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as TileLayer

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
