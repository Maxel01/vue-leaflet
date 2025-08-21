import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe } from 'vitest'
import { RegisterLayerControlInjection } from '../../../src/types/injectionKeys'
import { testRemoveOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import LControlLayers from '../../../src/components/LControlLayers.vue'
import { mockRegisterLayerControl, testControlLayerRegistration } from './helper/injectionsTests'
import { controlAbstractProps } from './LControl.test'

const controlLayersProps = {
    ...controlAbstractProps
}

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

    testControlLayerRegistration(createWrapper)
})
