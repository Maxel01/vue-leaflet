import { propsToLeafletOptions } from '../utils'

import { type PathEmits, type PathProps, pathPropsDefaults, setupPath as pathSetup } from './path'
import { CircleMarker, type CircleMarkerOptions, type LatLngExpression } from 'leaflet'
import type { Ref } from 'vue'

export interface CircleMarkerProps<T extends CircleMarkerOptions = CircleMarkerOptions>
    extends PathProps<T> {
    /**
     * Radius of the marker in pixels.
     */
    radius?: number
    latLng: LatLngExpression
}

export const circleMarkerPropsDefaults = {
    ...pathPropsDefaults,
    // radius should be optional
    options: () => ({ radius: 10 }),
}

export type CircleMarkerEmits<T extends CircleMarker = CircleMarker> = PathEmits & {
    (event: 'ready', layer: T): void
}

export const setupCircleMarker = (
    props: CircleMarkerProps,
    leafletRef: Ref<CircleMarker | undefined>,
    emit: CircleMarkerEmits,
) => {
    const { options: pathOptions, methods: pathMethods } = pathSetup(props, leafletRef, emit)

    const options = propsToLeafletOptions<CircleMarkerOptions>(props, pathOptions)

    const methods = {
        ...pathMethods,
        setRadius(radius: number) {
            leafletRef.value?.setRadius(radius)
        },
        setLatLng(latLng: LatLngExpression) {
            leafletRef.value?.setLatLng(latLng)
        },
    }

    return { options, methods }
}
