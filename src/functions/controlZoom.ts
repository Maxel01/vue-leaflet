import { Control } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type ControlEmits, type ControlProps, controlPropsDefaults, setupControl } from './control'
import type { Ref } from 'vue'

export interface ControlZoomProps extends ControlProps<Control.ZoomOptions> {
    zoomInText?: string
    zoomInTitle?: string
    zoomOutText?: string
    zoomOutTitle?: string
}

export const controlZoomPropsDefaults = {
    ...controlPropsDefaults,
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
