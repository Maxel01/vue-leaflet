import {
    type GridLayerEmits,
    type GridLayerProps,
    gridLayerPropsDefaults,
    setupGridLayer,
} from './gridLayer'
import type { Ref } from 'vue'
import { type TileLayer, type TileLayerOptions } from 'leaflet'

// BREAKING CHANGES: pass layerOptions as Object instead of props
export interface TileLayerProps extends GridLayerProps<TileLayerOptions> {
    url: string
}

export const tileLayerPropsDefaults = {
    ...gridLayerPropsDefaults,
}

export type TileLayerEmits = GridLayerEmits<TileLayer>

// BREAKING CHANGES: setupTileLayer does not return options anymore
export const setupTileLayer = <T extends TileLayer>(
    props: TileLayerProps,
    leafletRef: Ref<T | undefined>,
    emit: TileLayerEmits,
) => {
    const { methods: gridLayerMethods } = setupGridLayer(props, leafletRef, emit)
    const methods = {
        ...gridLayerMethods,
    }

    return { methods }
}
