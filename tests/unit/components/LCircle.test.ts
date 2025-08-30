import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LCircle from '@/components/LCircle.vue'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { Circle, LatLng } from 'leaflet'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from '@/tests/helper/injectionsTests'
import { mergeReactiveProps } from '@/tests/helper/props'
import { circleMarkerProps } from './wrapper/LCircleMarker'

const circleProps = mergeReactiveProps(circleMarkerProps, {
    radius: 10000
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LCircle, {
        propsData: {
            latLng: [44.48865, 11.3317],
            radius: 5000,
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

describe('LCircle.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LCircle')
    testPropsBindingToLeaflet(createWrapper, circleProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet circle with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Circle

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(44.48865, 11.3317))
        expect(obj.getRadius()).toBe(5000)
    })
}
