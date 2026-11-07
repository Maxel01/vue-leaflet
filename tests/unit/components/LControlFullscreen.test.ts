import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlFullscreen from '@/components/LControlFullscreen.vue'
import { RegisterControlInjection } from '@/types/injectionKeys'
import type { FullscreenControl } from 'leaflet'
import { testRemoveOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockRegisterControl, testControlRegistration } from '@/tests/helper/injectionsTests'
import { controlFullscreenProps } from './wrapper/LControlFullscreen'

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlFullscreen, {
        propsData: {
            position: 'topleft',
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

describe('LControlFullscreen.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControlFullscreen')
    testPropsBindingToLeaflet(createWrapper, controlFullscreenProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet fullscreen control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as FullscreenControl

        expect(obj).toBeDefined()
        expect(obj.options.position).toBe('topleft')
    })
}
