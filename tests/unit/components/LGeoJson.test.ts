import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { GeoJSON, Layer } from 'leaflet'
import LGeoJson from '../../../src/components/LGeoJson.vue'
import geoJson from './geo.json'
import geoJsonReplace from './geo_replace.json'
import { mergeReactiveProps } from './helper/props'
import { layerGroupProps } from './wrapper/LLayerGroup'

const geoJsonProps = mergeReactiveProps(layerGroupProps, {
    geojson: geoJsonReplace,
    optionsStyle: () => ({
        opacity: 0.35
    }),
    expecting: {
        ...layerGroupProps.expecting,
        geojson: (leafletObject: GeoJSON) => {
            expect(leafletObject.toGeoJSON()).toStrictEqual(geoJsonReplace)
        },
        optionsStyle: (leafletObject: GeoJSON) => {
            leafletObject.eachLayer((layer: Layer) => {
                expect(layer.options).toStrictEqual({ opacity: 0.35 })
            })
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LGeoJson, {
        propsData: {
            geojson: geoJson,
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

describe('LGeoJson.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LGeoJSON')
    testPropsBindingToLeaflet(createWrapper, geoJsonProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet geo json with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as GeoJSON

        expect(obj).toBeDefined()
    })
}
