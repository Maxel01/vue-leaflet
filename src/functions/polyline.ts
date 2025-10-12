import type { Polyline } from 'leaflet'
import { type LatLngExpression, type PolylineOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import { type PathEmits, type PathProps, pathPropsDefaults, setupPath } from './path'
import type { Ref } from 'vue'

export interface PolylineAbstractProps<T extends PolylineOptions = PolylineOptions>
    extends PathProps<T> {
    /**
     * How much to simplify the polyline on each zoom level. More means better performance and smoother looks, and less means more accurate representation.
     * @reactive
     */
    smoothFactor?: number
    /**
     * Disable polyline clipping.
     * @reactive
     */
    noClip?: boolean
}

export interface PolylineProps<T extends PolylineOptions = PolylineOptions>
    extends PolylineAbstractProps<T> {
    /**
     * Array of coordinates objects that represent the polyline.
     * @reactive
     */
    latLngs: LatLngExpression[]
}

export const polylinePropsDefaults = {
    ...pathPropsDefaults,
    noClip: undefined
}

export interface PolylineEmits<T extends Polyline = Polyline> extends PathEmits {
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', layer: T): void
}

export const setupPolyline = (
    props: PolylineAbstractProps,
    leafletRef: Ref<Polyline | undefined>,
    emit: PolylineEmits
) => {
    const { options: pathOptions, methods: pathMethods } = setupPath(props, leafletRef, emit)

    const options = propsToLeafletOptions<PolylineOptions>(props, pathOptions)

    const methods = {
        ...pathMethods,
        setSmoothFactor(smoothFactor: number) {
            leafletRef.value?.setStyle({ smoothFactor } as PolylineOptions) // TYPES remove cast
        },
        setNoClip(noClip: boolean) {
            leafletRef.value?.setStyle({ noClip } as PolylineOptions) // TYPES remove cast
        },
        /* v8 ignore start - unreachable code, marked for removal */
        /**
         * TODO remove unused code
         * @deprecated unreachable code ?
         */
        addLatLng(latLng: LatLngExpression) {
            leafletRef.value?.addLatLng(latLng)
        }
        /* v8 ignore stop */
    }

    return { options, methods }
}
