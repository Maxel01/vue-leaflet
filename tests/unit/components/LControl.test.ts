import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControl from '@/components/LControl.vue'
import { RegisterControlInjection } from '@/types/injectionKeys'
import type { Control } from 'leaflet'
import { testRemoveOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockRegisterControl, testControlRegistration } from '@/tests/helper/injectionsTests'
import { createMapWrapper } from './wrapper/LMap'
import { controlProps } from '@/tests/unit/components/wrapper'

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
        // @ts-expect-error _map is private so not in the types
        expect((lControl.vm.leafletObject as Control)._map).toBeDefined()
    })
}
