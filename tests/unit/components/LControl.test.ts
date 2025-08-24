import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControl from '../../../src/components/LControl.vue'
import { RegisterControlInjection } from '../../../src/types/injectionKeys'
import { Control } from 'leaflet'
import { testRemoveOnUnmount } from './helper/tests'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockRegisterControl, testControlRegistration } from './helper/injectionsTests'
import { mergeReactiveProps } from './helper/props'
import { createWrapper as createMapWrapper } from './LMap.test'

export const controlAbstractProps = mergeReactiveProps(componentProps, {
    position: 'bottomleft'
})

export const controlProps = mergeReactiveProps(controlAbstractProps, {})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControl, {
        propsData: {
            position: 'topright',
            disableScrollPropagation: true,
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

describe('LControl.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControl')
    testPropsBindingToLeaflet(createWrapper, controlProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control

        expect(obj).toBeDefined()
        expect(obj.options.position).toBe('topright')
    })

    // TODO move from unit tests
    it('creates a Leaflet control with Map', async () => {
        const wrapper = await createMapWrapper({}, { default: LControl })
        const lControl = wrapper.findComponent(LControl)
        expect(lControl.vm.leafletObject).toBeDefined()
        expect((lControl.vm.leafletObject as Control)._map).toBeDefined()
    })
}
