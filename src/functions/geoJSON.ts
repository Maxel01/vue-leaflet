import type { GeoJsonObject } from 'geojson'
import type { GeoJSON, GeoJSONOptions, PathOptions, StyleFunction } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'

import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup,
} from './layerGroup'

export interface GeoJSONProps extends LayerGroupProps<GeoJSONOptions> {
    geojson?: GeoJsonObject
    optionsStyle?: StyleFunction
}

export const geoJSONPropsDefaults = layerGroupPropsDefaults

export type GeoJSONEmits = LayerGroupEmits<GeoJSON>

export const setupGeoJSON = (
    props: GeoJSONProps,
    leafletRef: Ref<GeoJSON | undefined>,
    emit: GeoJSONEmits,
) => {
    const { options: layerOptions, methods: layerGroupMethods } = setupLayerGroup(
        props,
        leafletRef,
        emit,
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
        getGeoJSONData() {
            return leafletRef.value?.toGeoJSON()
        },
        getBounds() {
            return leafletRef.value?.getBounds()
        },
    }

    return { options, methods }
}
