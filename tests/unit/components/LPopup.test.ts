import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPopup from '@/components/LPopup.vue'
import { BindPopupInjection, UnbindPopupInjection } from '@/types/injectionKeys'
import { LatLng, Popup } from 'leaflet'
import {
    popperProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockBindPopup, mockUnbindPopup } from '@/tests/helper/injectionsTests'
import { mergeReactiveProps } from '@/tests/helper/props'
import { testBindPopup, testUnbindPopupOnUnmount } from '@/tests/helper/tests'
import type { PopupProps } from '@/functions/popup'
import { createMarkerWrapper } from './wrapper/LMarker'

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
    testUnbindPopupOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testBindPopup(createWrapper)
})

const testCorrectInitialisation = (
    getWrapper: (props?: PopupProps) => Promise<VueWrapper<any>>
) => {
    it('creates a Leaflet popup with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Popup

        expect(obj).toBeDefined()
    })
    it('creates a Leaflet popup with latLng', async () => {
        const wrapper = await getWrapper({ latLng: [45, 5] })
        const obj = wrapper.vm.leafletObject as Popup

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(45, 5))
    })
    it('creates a Leaflet layer with a popup', async () => {
        const wrapper = await createMarkerWrapper({}, { default: LPopup })
        expect(wrapper.vm.leafletObject).toBeDefined()
        const lPopup = wrapper.findComponent(LPopup)
        expect(lPopup.vm.leafletObject).toBeDefined()
    })
}
