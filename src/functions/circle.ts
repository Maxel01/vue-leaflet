import type { Circle, CircleOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type CircleMarkerEmits,
    type CircleMarkerProps,
    circleMarkerPropsDefaults,
    setupCircleMarker
} from './circleMarker'
import type { Ref } from 'vue'

export interface CircleProps<T extends CircleOptions = CircleOptions> extends CircleMarkerProps<T> {
    /**
     * Radius of the circle, in meters
     * @reactive
     */
    radius: number
}

export const circlePropsDefaults = {
    ...circleMarkerPropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface CircleEmits<T extends Circle = Circle> extends CircleMarkerEmits<T> {}

export const setupCircle = (
    props: CircleProps,
    leafletRef: Ref<Circle | undefined>,
    emit: CircleEmits
) => {
    const { options: circleMarkerOptions, methods: circleMarkerMethods } = setupCircleMarker(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<CircleOptions>(props, circleMarkerOptions)

    const methods = {
        ...circleMarkerMethods
    }

    return { options, methods }
}
