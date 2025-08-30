import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { GridLayer } from 'leaflet'
import LGridLayer from '@/components/LGridLayer.vue'
import { gridLayerProps } from './wrapper/LGridLayer'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LGridLayer, {
        propsData: {
            childRender: (props) => () => {
                return h(
                    'div',
                    { style: 'border: 1px solid grey; height: 100%;' },
                    `x: ${props.coords.x} y: ${props.coords.y} z: ${props.coords.z}`
                )
            },
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

describe('LGridLayer.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LGridLayer')
    testPropsBindingToLeaflet(createWrapper, gridLayerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet grid layer with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as GridLayer

        expect(obj).toBeDefined()
        expect(obj.options).toBeDefined()
    })
}
