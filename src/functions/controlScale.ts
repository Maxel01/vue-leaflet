import { Control } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type ControlEmits, type ControlProps, controlPropsDefaults, setupControl } from './control'
import type { Ref } from 'vue'

export interface ControlScaleProps extends ControlProps<Control.ScaleOptions> {
    maxWidth?: number
    metric?: boolean
    imperial?: boolean
    updateWhenIdle?: boolean
}

export const controlScalePropsDefaults = {
    ...controlPropsDefaults,
    metric: undefined,
    imperial: undefined,
    updateWhenIdle: undefined,
}

export type ControlScaleEmits = ControlEmits<Control.Scale>

export const setupControlScale = (
    props: ControlScaleProps,
    leafletRef: Ref<Control.Scale | undefined>,
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.ScaleOptions>(props, controlOptions)

    return { options, methods: controlMethods }
}
