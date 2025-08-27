import type { CRS, TileLayer, WMSOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    setupTileLayer,
    type TileLayerEmits,
    type TileLayerProps,
    tileLayerPropsDefaults
} from './tileLayer'
import type { Ref } from 'vue'

export interface WmsTileLayerProps extends TileLayerProps<WMSOptions> {
    /**
     * Comma-separated list of WMS layers to show
     * @initOnly
     */
    layers: string
    /**
     * Comme-separated list of WMS styles
     * @initOnly
     */
    styles?: string
    /**
     * WMS image format (use `image/png` for layers with transparency)
     * @initOnly
     */
    format?: string
    /**
     * If `true`, the WMS service will return images with transparency
     * @initOnly
     */
    transparent?: boolean
    /**
     * Version of the WMS service to use
     * @initOnly
     */
    version?: string
    /**
     * Coordinate Reference System to use for the WMS requests, defaults to the map CRS. Don't change this if you're not sure what it means.
     * @initOnly
     */
    crs?: CRS
    /**
     * If `true`, WMS request parameter keys will be uppercase.
     * @initOnly
     */
    uppercase?: boolean
}

export const wmsTileLayerPropsDefaults = {
    ...tileLayerPropsDefaults,
    transparent: undefined,
    uppercase: undefined
}

export type WmsTileLayerEmits = TileLayerEmits<TileLayer.WMS>

export const setupWMSTileLayer = (
    props: WmsTileLayerProps,
    leafletRef: Ref<TileLayer.WMS | undefined>,
    emit: WmsTileLayerEmits
) => {
    const { options: tileLayerOptions, methods: tileLayerMethods } = setupTileLayer(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<WMSOptions>(props, tileLayerOptions)

    return {
        options,
        methods: {
            ...tileLayerMethods
        }
    }
}
