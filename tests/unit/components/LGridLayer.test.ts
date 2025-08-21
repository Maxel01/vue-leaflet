import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    layerProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { GridLayer } from 'leaflet'
import LGridLayer from '../../../src/components/LGridLayer.vue'

export const gridLayerProps = {
    ...layerProps,
    opacity: 0.5,
    zIndex: 50
}

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
