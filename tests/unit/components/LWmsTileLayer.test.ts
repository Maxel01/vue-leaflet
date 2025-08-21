import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { TileLayer } from 'leaflet'
import LWmsTileLayer from '../../../src/components/LWmsTileLayer.vue'
import { tileLayerProps } from './LTileLayer.test'

const wmsTileLayerProps = {
    ...tileLayerProps,
    // TODO change url
    url: 'https://ows.mundialis.de/services/service?'
}

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LWmsTileLayer, {
        propsData: {
            url: 'https://ows.mundialis.de/services/service?',
            attribution: 'Mundialis',
            layerType: 'base',
            name: 'mundialis.de',
            maxZoom: 10,
            version: '1.3.0',
            format: 'image/png',
            transparent: true,
            layers: "'TOPO-WMS,OSM-Overlay-WMS'",
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

describe('LWmsTileLayer.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LWmsTileLayer')
    testPropsBindingToLeaflet(createWrapper, wmsTileLayerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet wms tile layer with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as TileLayer.WMS

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
