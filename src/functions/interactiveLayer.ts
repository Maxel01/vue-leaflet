import { type InteractiveLayerOptions, type Layer } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'
import type { Ref } from 'vue'

export interface InteractiveLayerProps<T extends InteractiveLayerOptions = InteractiveLayerOptions>
    extends LayerProps<T> {
    interactive?: boolean
    bubblingMouseEvents?: boolean
}

export const interactiveLayerPropsDefaults = {
    ...layerPropsDefaults,
    interactive: undefined,
    bubblingMouseEvents: undefined,
}

export type InteractiveLayerEmits = LayerEmits

export const setupInteractiveLayer = (
    props: InteractiveLayerProps,
    leafletRef: Ref<Layer | undefined>,
    emit: InteractiveLayerEmits,
) => {
    const { options: layerOptions, methods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<InteractiveLayerOptions>(props, layerOptions)

    return { options, methods }
}
