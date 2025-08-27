import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import LLayerGroup from '../../../src/components/LLayerGroup.vue'
import LTileLayer from '../../../src/components/LTileLayer.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { LayerGroup } from 'leaflet'
import { layerGroupProps } from './wrapper/LLayerGroup'

const createWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LLayerGroup, {
        propsData: {
            ...props
        },
        slots: slots,
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

describe('LLayerGroup.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LLayerGroup')
    testPropsBindingToLeaflet(createWrapper, layerGroupProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet layer group with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as LayerGroup

        expect(obj).toBeDefined()
    })
    it('creates a Leaflet layer group with layers', async () => {
        const wrapper = await createWrapper({}, { default: h(LTileLayer, { url: '' }) })
        const obj = wrapper.vm.leafletObject as LayerGroup

        expect(obj).toBeDefined()
    })
}
