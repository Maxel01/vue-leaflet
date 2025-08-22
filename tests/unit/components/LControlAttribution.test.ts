import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlAttribution from '../../../src/components/LControlAttribution.vue'
import { RegisterControlInjection } from '../../../src/types/injectionKeys'
import { Control } from 'leaflet'
import { testRemoveOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockRegisterControl, testControlRegistration } from './helper/injectionsTests'
import { controlAbstractProps } from './LControl.test'
import { mergeReactiveProps } from './helper/props'

const controlAttributionProps = mergeReactiveProps(controlAbstractProps, {
    prefix: 'new prefix'
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlAttribution, {
        propsData: {
            position: 'topright',
            prefix: 'Hello there',
            ...props
        },
        global: {
            provide: {
                [RegisterControlInjection as symbol]: mockRegisterControl
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LControlAttribution.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControlAttribution')
    testPropsBindingToLeaflet(createWrapper, controlAttributionProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet attribution control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Attribution

        expect(obj).toBeDefined()
        expect(obj.options.prefix).toBe('Hello there')
        expect(obj.options.position).toBe('topright')
    })
}
