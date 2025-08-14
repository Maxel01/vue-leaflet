import { Control } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import { type ControlEmits, type ControlAbstractProps, controlAbstractPropsDefaults, setupControl } from './control'
import type { Ref } from 'vue'

export interface ControlZoomProps extends ControlAbstractProps<Control.ZoomOptions> {
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
    ...controlAbstractPropsDefaults,
}

export type ControlZoomEmits = ControlEmits<Control.Zoom>

export const setupControlZoom = (
    props: ControlZoomProps,
    leafletRef: Ref<Control.Zoom | undefined>,
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.ZoomOptions>(props, controlOptions)

    return { options, methods: controlMethods }
}
