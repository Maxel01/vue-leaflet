import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LFeatureGroup from '@/components/LFeatureGroup.vue'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { FeatureGroup } from 'leaflet'
import { featureGroupProps } from './wrapper/LFeatureGroup'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LFeatureGroup, {
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

describe('LFeatureGroup.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LFeatureGroup')
    testPropsBindingToLeaflet(createWrapper, featureGroupProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet feature group with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as FeatureGroup

        expect(obj).toBeDefined()
    })
}
