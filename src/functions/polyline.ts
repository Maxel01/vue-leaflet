import { type LatLngExpression, Polyline, type PolylineOptions } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type PathEmits, type PathProps, pathPropsDefaults, setupPath } from './path'
import type { Ref } from 'vue'

export interface PolylineProps<T extends PolylineOptions = PolylineOptions> extends PathProps<T> {
    smoothFactor?: number
    noClip?: boolean
    latLngs: LatLngExpression[]
}

export const polylinePropsDefaults = {
    ...pathPropsDefaults,
    noClip: undefined,
}

export type PolylineEmits<T extends Polyline = Polyline> = PathEmits & {
    (event: 'ready', layer: T): void
}

export const setupPolyline = (
    props: PolylineProps,
    leafletRef: Ref<Polyline | undefined>,
    emit: PolylineEmits,
) => {
    const { options: pathOptions, methods: pathMethods } = setupPath(props, leafletRef, emit)

    const options = propsToLeafletOptions<PolylineOptions>(props, pathOptions)

    const methods = {
        ...pathMethods,
        setSmoothFactor(smoothFactor: number) {
            leafletRef.value?.setStyle({ smoothFactor })
        },
        setNoClip(noClip: boolean) {
            leafletRef.value?.setStyle({ noClip })
        },
        addLatLng(latLng: LatLngExpression) {
            leafletRef.value?.addLatLng(latLng)
        },
    }

    return { options, methods }
}
