import { type LatLngBoundsExpression, type LatLngExpression, type PolylineOptions, Rectangle } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type PolygonEmits, type PolygonProps, polygonPropsDefaults, setupPolygon } from './polygon'
import type { Ref } from 'vue'

export interface RectangleProps extends PolygonProps {
    /**
     * Array of coordinates objects that represent the rectangle
     * @reactive
     */
    latLngs?: LatLngExpression[]
    /**
     * The rectangle geographical bounds
     * @reactive
     */
    bounds?: LatLngExpression[]
}

export const rectanglePropsDefaults = {
    ...polygonPropsDefaults,
}

export type RectangleEmits = PolygonEmits<Rectangle>

export const setupRectangle = (
    props: RectangleProps,
    leafletRef: Ref<Rectangle | undefined>,
    emit: RectangleEmits,
) => {
    const { options: polygonOptions, methods: polygonMethods } = setupPolygon(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<PolylineOptions>(props, polygonOptions)

    const methods = {
        ...polygonMethods,
        setBounds(latLngBounds: LatLngBoundsExpression) {
            leafletRef.value?.setBounds(latLngBounds)
        },
        setLatLngs(latLngs: LatLngBoundsExpression) {
            // Calling setLatLngs on a Leaflet rectangle will convert it
            // to a polygon. So instead, we call setBounds here to ensure
            // that the rectangle remains a rectangle, defined by the
            // bounds of the points in the latLngs array.
            leafletRef.value?.setBounds(latLngs)
        },
    }

    return { options, methods }
}
