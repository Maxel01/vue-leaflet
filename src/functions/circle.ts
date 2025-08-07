import { Circle, type CircleOptions } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import {
    type CircleMarkerEmits,
    type CircleMarkerProps,
    circleMarkerPropsDefaults,
    setupCircleMarker,
} from './circleMarker'
import type { Ref } from 'vue'

export interface CircleProps extends CircleMarkerProps<CircleOptions> {
    /**
     * Radius of the circle, in meters
     * @reactive
     */
    radius: number
}

export const circlePropsDefaults = {
    ...circleMarkerPropsDefaults,
}

export type CircleEmits = CircleMarkerEmits<Circle>

export const setupCircle = (
    props: CircleProps,
    leafletRef: Ref<Circle | undefined>,
    emit: CircleEmits,
) => {
    const { options: circleMarkerOptions, methods: circleMarkerMethods } = setupCircleMarker(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<CircleOptions>(props, circleMarkerOptions)

    const methods = {
        ...circleMarkerMethods,
    }

    return { options, methods }
}
