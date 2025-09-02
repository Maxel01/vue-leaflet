import { type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Circle, LatLng } from 'leaflet'
import { testRemoveLayerOnUnmount } from '@/tests/helper/tests'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import { testEmitsReady } from '@/tests/helper/emitTests'
import { testAddLayer } from '@/tests/helper/injectionsTests'
import { createMarkerWrapper, markerProps } from './wrapper/LMarker'

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
