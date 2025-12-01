import type { GeoJsonObject } from 'geojson'
import type { GeoJSON, GeoJSONOptions, PathOptions, StyleFunction } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '@/utils'

import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup
} from './layerGroup'

export interface GeoJSONProps<
    T extends GeoJSONOptions = GeoJSONOptions
> extends LayerGroupProps<T> {
    /**
     * An object in GeoJSON format to display on the map (you can alternatively add it later with addData method).
     * @reactive
     */
    geojson?: GeoJsonObject
    /**
     * A Function defining the styling for GeoJSON lines and polygons. See more in [original Leaflet documentation](https://leafletjs.com/reference-2.0.0.html#geojson-style)
     * @reactive
     */
    optionsStyle?: StyleFunction
}

export const geoJSONPropsDefaults = layerGroupPropsDefaults

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface GeoJSONEmits<T extends GeoJSON = GeoJSON> extends LayerGroupEmits<T> {}

export const setupGeoJSON = (
    props: GeoJSONProps,
    leafletRef: Ref<GeoJSON | undefined>,
    emit: GeoJSONEmits
) => {
    const { options: layerOptions, methods: layerGroupMethods } = setupLayerGroup(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<GeoJSONOptions>(props, layerOptions)
    if (Object.prototype.hasOwnProperty.call(props, 'optionsStyle')) {
        options.style = props.optionsStyle
    }

    const methods = {
        ...layerGroupMethods,
        setGeojson(newVal: GeoJsonObject) {
            leafletRef.value?.clearLayers()
            leafletRef.value?.addData(newVal)
        },
        setOptionsStyle(newVal: PathOptions | StyleFunction) {
            leafletRef.value?.setStyle(newVal)
        },
        /* v8 ignore start - unreachable code, marked for removal */
        /**
         * TODO remove unused code
         * @deprecated unreachable code ?
         */
        getGeoJSONData() {
            return leafletRef.value?.toGeoJSON()
        },
        /**
         * TODO remove unused code
         * @deprecated unreachable code ?
         */
        getBounds() {
            return leafletRef.value?.getBounds()
        }
        /* v8 ignore end */
    }

    return { options, methods }
}
