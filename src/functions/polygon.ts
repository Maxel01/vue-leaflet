import { type LatLngExpression, Polygon, type PolylineOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type PolylineAbstractProps,
    type PolylineEmits,
    polylinePropsDefaults,
    setupPolyline
} from './polyline'
import type { Ref } from 'vue'

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface PolygonAbstractProps extends PolylineAbstractProps {
}

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
        toGeoJSON(precision: number | false) {
            return leafletRef.value?.toGeoJSON(precision)
        }
    }

    return { options, methods }
}
