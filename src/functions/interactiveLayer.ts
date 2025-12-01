import { type InteractiveLayerOptions, type Layer } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'
import type { Ref } from 'vue'

export interface InteractiveLayerProps<
    T extends InteractiveLayerOptions = InteractiveLayerOptions
> extends LayerProps<T> {
    /**
     * If `false`, the layer will not emit pointer events and will act as a part of the underlying map.
     * @initOnly
     */
    interactive?: boolean
    /**
     * When `true`, a pointer event on this path will trigger the same event on the map (unless [DomEvent.stopPropagation](https://leafletjs.com/reference-2.0.0.html#domevent-stoppropagation) is used).
     * @initOnly
     */
    bubblingPointerEvents?: boolean
}

export const interactiveLayerPropsDefaults = {
    ...layerPropsDefaults,
    interactive: undefined,
    bubblingPointerEvents: undefined
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface InteractiveLayerEmits extends LayerEmits {}

export const setupInteractiveLayer = (
    props: InteractiveLayerProps,
    leafletRef: Ref<Layer | undefined>,
    emit: InteractiveLayerEmits
) => {
    const { options: layerOptions, methods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<InteractiveLayerOptions>(props, layerOptions)

    return { options, methods }
}
