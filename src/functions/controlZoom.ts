import type { ZoomControl, ZoomControlOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type ControlEmits,
    type ControlAbstractProps,
    controlAbstractPropsDefaults,
    setupControl
} from './control'
import type { Ref } from 'vue'

export interface ControlZoomProps<
    T extends ZoomControlOptions = ZoomControlOptions
> extends ControlAbstractProps<T> {
    /**
     * The text set on the 'zoom in' button
     * @initOnly
     */
    zoomInText?: string
    /**
     * The title set on the 'zoom in' button
     * @initOnly
     */
    zoomInTitle?: string
    /**
     * The text set on the 'zoom out' button
     * @initOnly
     */
    zoomOutText?: string
    /**
     * The title set on the 'zoom out' button
     * @initOnly
     */
    zoomOutTitle?: string
}

export const controlZoomPropsDefaults = {
    ...controlAbstractPropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface ControlZoomEmits<T extends ZoomControl = ZoomControl> extends ControlEmits<T> { }

export const setupControlZoom = (
    props: ControlZoomProps,
    leafletRef: Ref<ZoomControl | undefined>
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<ZoomControlOptions>(props, controlOptions)

    return { options, methods: controlMethods }
}
