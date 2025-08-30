import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LControlZoom from '@/components/LControlZoom.vue'
import { RegisterControlInjection } from '@/types/injectionKeys'
import { Control } from 'leaflet'
import { testRemoveOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockRegisterControl, testControlRegistration } from '@/tests/helper/injectionsTests'
import { mergeReactiveProps } from '@/tests/helper/props'
import { controlAbstractProps } from './wrapper/LControl'

const controlZoomProps = mergeReactiveProps(controlAbstractProps, {})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlZoom, {
        propsData: {
            position: 'topright',
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

describe('LControlZoom.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LControlZoom')
    testPropsBindingToLeaflet(createWrapper, controlZoomProps)
    testRemoveOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testControlRegistration(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet zoom control with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Control.Zoom

        expect(obj).toBeDefined()
        expect(obj.options.position).toBe('topright')
    })
}
