import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LCircleMarker from '../../../src/components/LCircleMarker.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { Circle, LatLng } from 'leaflet'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    pathProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { mergeReactiveProps } from './helper/props'

export const circleMarkerProps = mergeReactiveProps(pathProps, {
    radius: 15,
    latLng: new LatLng(44.5, 11.5)
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LCircleMarker, {
        propsData: {
            latLng: [44.48865, 11.3317],
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

describe('LCircleMarker.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LCircleMarker')
    testPropsBindingToLeaflet(createWrapper, circleMarkerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet circle marker with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Circle

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(44.48865, 11.3317))
    })
}
