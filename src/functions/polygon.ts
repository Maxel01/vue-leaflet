import { Polygon, type PolylineOptions } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import {
    type PolylineEmits,
    type PolylineProps,
    polylinePropsDefaults,
    setupPolyline,
} from './polyline'
import type { Ref } from 'vue'

export type PolygonProps = PolylineProps

export const polygonPropsDefaults = {
    ...polylinePropsDefaults,
}

export type PolygonEmits = PolylineEmits<Polygon>

export const setupPolygon = (
    props: PolygonProps,
    leafletRef: Ref<Polygon | undefined>,
    emit: PolygonEmits,
) => {
    const { options: polylineOptions, methods: polylineMethods } = setupPolyline(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<PolylineOptions>(props, polylineOptions)

    const methods = {
        ...polylineMethods,
        toGeoJSON(precision: number | false) {
            return leafletRef.value?.toGeoJSON(precision)
        },
    }

    return { options, methods }
}
