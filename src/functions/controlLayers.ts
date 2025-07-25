import { Control, Layer } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type ControlEmits, type ControlProps, controlPropsDefaults, setupControl } from './control'
import type { Ref } from 'vue'

export interface ControlLayersProps extends ControlProps<Control.LayersOptions> {
    collapsed?: boolean
    autoZIndex?: boolean
    hideSingleBase?: boolean
    sortLayers?: boolean
    sortFunction?: ((layerA: Layer, layerB: Layer, nameA: string, nameB: string) => number)
}

export const controlLayersPropsDefaults = {
    ...controlPropsDefaults,
    collapsed: undefined,
    autoZIndex: undefined,
    hideSingleBase: undefined,
    sortLayers: undefined,
}

export type ControlLayersEmits = ControlEmits<Control.Layers>

export const setupControlLayers = (
    props: ControlLayersProps,
    leafletRef: Ref<Control.Layers | undefined>,
) => {
    const { options: controlOptions } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.LayersOptions>(props, controlOptions)

    const methods = {
        addLayer(layer) {
            if (layer.layerType === 'base') {
                leafletRef.value?.addBaseLayer(layer.leafletObject, layer.name)
            } else if (layer.layerType === 'overlay') {
                leafletRef.value?.addOverlay(layer.leafletObject, layer.name)
            }
        },
        removeLayer(layer) {
            leafletRef.value?.removeLayer(layer.leafletObject)
        },
    }

    return { options, methods }
}
