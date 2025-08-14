import type { Control, Layer } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type ControlEmits,
    type ControlAbstractProps,
    controlAbstractPropsDefaults,
    setupControl
} from './control'
import type { Ref } from 'vue'
import type { ILayerDefinition } from '@/types/interfaces'

export interface ControlLayersProps extends ControlAbstractProps<Control.LayersOptions> {
    /**
     * If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
     * @initOnly
     */
    collapsed?: boolean
    /**
     * If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
     * @initOnly
     */
    autoZIndex?: boolean
    /**
     * If `true`, the base layers in the control will be hidden when there is only one.
     * @initOnly
     */
    hideSingleBase?: boolean
    /**
     * Whether to sort the layers. When `false`, layers will keep the order in which they were added to the control.
     * @initOnly
     */
    sortLayers?: boolean
    /**
     * A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that will be used for sorting the layers, when `sortLayers` is `true`. The function receives both the [L.Layer](https://leafletjs.com/reference-2.0.0.html#layer) instances and their names, as in `sortFunction(layerA, layerB, nameA, nameB)`. By default, it sorts layers alphabetically by their name.
     * @initOnly
     */
    sortFunction?: (layerA: Layer, layerB: Layer, nameA: string, nameB: string) => number
}

export const controlLayersPropsDefaults = {
    ...controlAbstractPropsDefaults,
    collapsed: undefined,
    autoZIndex: undefined,
    hideSingleBase: undefined,
    sortLayers: undefined
}

export type ControlLayersEmits = ControlEmits<Control.Layers>

export const setupControlLayers = (
    props: ControlLayersProps,
    leafletRef: Ref<Control.Layers | undefined>
) => {
    const { options: controlOptions } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.LayersOptions>(props, controlOptions)

    const methods = {
        addLayer(layer: ILayerDefinition) {
            if (!layer.leafletObject) return
            if (layer.layerType === 'base') {
                leafletRef.value?.addBaseLayer(layer.leafletObject, layer.name || '')
            } else if (layer.layerType === 'overlay') {
                leafletRef.value?.addOverlay(layer.leafletObject, layer.name || '')
            }
        },
        removeLayer(layer: ILayerDefinition) {
            if (!layer.leafletObject) return
            leafletRef.value?.removeLayer(layer.leafletObject)
        }
    }

    return { options, methods }
}
