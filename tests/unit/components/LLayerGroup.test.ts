import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LLayerGroup from '../../../src/components/LLayerGroup.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    layerProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { LayerGroup } from 'leaflet'

export const layerGroupProps = {
    ...layerProps
}

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LLayerGroup, {
        propsData: {
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
}
