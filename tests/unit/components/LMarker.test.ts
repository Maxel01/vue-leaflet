import { type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Circle, LatLng, Marker } from 'leaflet'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    layerProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { testAddLayer } from '@/tests/helper/injectionsTests'
import { mergeReactiveProps } from '@/tests/helper/props'
import { createMarkerWrapper } from './wrapper/LMarker'

const markerProps = mergeReactiveProps(layerProps, {
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

describe('LMarker.vue', () => {
    testEmitsReady(createMarkerWrapper)
    testComponentPropBindings(createMarkerWrapper, 'LMarker')
    testPropsBindingToLeaflet(createMarkerWrapper, markerProps)
    testRemoveLayerOnUnmount(createMarkerWrapper)

    testCorrectInitialisation(createMarkerWrapper)
    testAddLayer(createMarkerWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet marker with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Circle

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(44.48865, 11.3317))
    })
}
