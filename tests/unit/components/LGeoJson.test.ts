import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    geoJsonProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { GeoJSON } from 'leaflet'
import LGeoJson from '../../../src/components/LGeoJson.vue'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LGeoJson, {
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

describe('LGeoJson.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LGeoJSON')
    testPropsBindingToLeaflet(createWrapper, geoJsonProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet geo json with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as GeoJSON

        expect(obj).toBeDefined()
    })
}
