import type { CRS, TileLayer, WMSOptions } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import {
    setupTileLayer,
    type TileLayerEmits,
    type TileLayerProps,
    tileLayerPropsDefaults,
} from './tileLayer'
import type { Ref } from 'vue'

export interface WmsTileLayerProps extends TileLayerProps<WMSOptions> {
    layers: string
    styles?: string
    format?: string
    transparent?: boolean
    version?: string
    crs?: CRS
    uppercase?: boolean
}

export const wmsTileLayerPropsDefaults = {
    ...tileLayerPropsDefaults,
    transparent: undefined,
    uppercase: undefined,
}

export type WmsTileLayerEmits = TileLayerEmits<TileLayer.WMS>

export const setupWMSTileLayer = (
    props: WmsTileLayerProps,
    leafletRef: Ref<TileLayer.WMS | undefined>,
    emit: WmsTileLayerEmits,
) => {
    const { options: tileLayerOptions, methods: tileLayerMethods } = setupTileLayer(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<WMSOptions>(props, tileLayerOptions)

    return {
        options,
        methods: {
            ...tileLayerMethods,
        },
    }
}
