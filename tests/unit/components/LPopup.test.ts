import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPopup from '../../../src/components/LPopup.vue'
import { BindPopupInjection, UnbindPopupInjection } from '../../../src/types/injectionKeys'
import { LatLng, Popup } from 'leaflet'
import {
    popperProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockBindPopup, mockUnbindPopup } from './helper/injectionsTests'
import { mergeReactiveProps } from './helper/props'

const popupProps = mergeReactiveProps(popperProps, {
    latLng: new LatLng(44.5, 11.5)
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LPopup, {
        propsData: {
            ...props
        },
        global: {
            provide: {
                [BindPopupInjection as symbol]: mockBindPopup,
                [UnbindPopupInjection as symbol]: mockUnbindPopup
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LPopup.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LPopup')
    testPropsBindingToLeaflet(createWrapper, popupProps)
    // TEST testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    // TEST bindPopup
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet popup with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Popup

        expect(obj).toBeDefined()
    })
}
