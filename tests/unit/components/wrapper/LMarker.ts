import { flushPromises, mount } from '@vue/test-utils'
import { AddLayerInjection, RemoveLayerInjection } from '@/types/injectionKeys'
import { mockAddLayer, mockRemoveLayer } from '@/tests/helper/injectionsTests'
import LMarker from '@/components/LMarker.vue'
import { layerProps, mergeReactiveProps } from '@/tests/helper'
import { LatLng, Marker } from 'leaflet'
import { expect } from 'vitest'

export const markerProps = mergeReactiveProps(layerProps, {
    // TEST draggable: true,
    // TEST icon: ?,
    zIndexOffset: 5,
    latLng: new LatLng(44.5, 11.5),
    expecting: {
        draggable(leafletObject: Marker) {
            // TEST leafletObject.dragging is undefined. Why?
            expect(leafletObject.dragging.enabled()).toBeTruthy()
        }
    }
})

export const createMarkerWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LMarker, {
        propsData: {
            latLng: [44.48865, 11.3317],
            ...props
        },
        slots: slots,
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
