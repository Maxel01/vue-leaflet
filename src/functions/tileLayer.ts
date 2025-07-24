import {
    type GridLayerEmits,
    type GridLayerProps,
    gridLayerPropsDefaults,
    setupGridLayer,
} from './gridLayer'
import type { Ref } from 'vue'
import { type TileLayer, type TileLayerOptions } from 'leaflet'
import { propsToLeafletOptions } from '../utils.ts'

export interface TileLayerProps extends GridLayerProps<TileLayerOptions> {
    tms?: boolean
    subdomains?: string | string[]
    detectRetina?: boolean
    url: string
}

export const tileLayerPropsDefaults = {
    ...gridLayerPropsDefaults,
}

export type TileLayerEmits = GridLayerEmits<TileLayer>

export const setupTileLayer = <T extends TileLayer>(
    props: TileLayerProps,
    leafletRef: Ref<T | undefined>,
    emit: TileLayerEmits,
) => {
    const { options: gridLayerOptions, methods: gridLayerMethods } = setupGridLayer(
        props,
        leafletRef,
        emit,
    )
    const options = propsToLeafletOptions<TileLayerOptions>(props, gridLayerOptions)

    const methods = {
        ...gridLayerMethods,
    }

    return { options, methods }
}
