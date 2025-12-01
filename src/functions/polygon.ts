import type { Polygon, LatLngExpression, PolylineOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type PolylineAbstractProps,
    type PolylineEmits,
    polylinePropsDefaults,
    setupPolyline
} from './polyline'
import type { Ref } from 'vue'

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface PolygonAbstractProps<
    T extends PolylineOptions = PolylineOptions
> extends PolylineAbstractProps<T> {}

export interface PolygonProps extends PolygonAbstractProps {
    /**
     * Array of coordinates objects that represent the polyline.
     * @reactive
     */
    latLngs: LatLngExpression[]
}

export const polygonPropsDefaults = {
    ...polylinePropsDefaults
}

export type PolygonEmits<T extends Polygon = Polygon> = PolylineEmits<T>

export const setupPolygon = (
    props: PolygonAbstractProps,
    leafletRef: Ref<Polygon | undefined>,
    emit: PolygonEmits
) => {
    const { options: polylineOptions, methods: polylineMethods } = setupPolyline(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<PolylineOptions>(props, polylineOptions)

    const methods = {
        ...polylineMethods,
        /* v8 ignore start - unreachable code, marked for removal */
        /**
         * TODO remove unused code
         * @deprecated unreachable code ?
         */
        toGeoJSON(precision: number | false) {
            return leafletRef.value?.toGeoJSON(precision)
        }
        /* v8 ignore stop */
    }

    return { options, methods }
}
