import type { FeatureGroup} from 'leaflet';
import { type InteractiveLayerOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup
} from './layerGroup'
import type { Ref } from 'vue'

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface FeatureGroupProps extends LayerGroupProps {}

export const featureGroupPropsDefaults = layerGroupPropsDefaults

export type FeatureGroupEmits = LayerGroupEmits<FeatureGroup>

export const setupFeatureGroup = (
    props: FeatureGroupProps,
    leafletRef: Ref<FeatureGroup | undefined>,
    emit: FeatureGroupEmits
) => {
    const { options: layerOptions, methods: layerGroupMethods } = setupLayerGroup(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<InteractiveLayerOptions>(props, layerOptions)

    const methods = {
        ...layerGroupMethods
    }

    return { options, methods }
}
