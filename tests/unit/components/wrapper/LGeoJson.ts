import { mergeReactiveProps } from '@/tests/helper/props'
import { layerGroupProps } from './LLayerGroup'
import geoJsonReplace from '@/tests/unit/components/geo_replace.json'
import { GeoJSON, Layer } from 'leaflet'
import { expect } from 'vitest'

export const geoJsonProps = mergeReactiveProps(layerGroupProps, {
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
