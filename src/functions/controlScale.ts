import { Control } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type ControlEmits,
    type ControlAbstractProps,
    controlAbstractPropsDefaults,
    setupControl
} from './control'
import type { Ref } from 'vue'

export interface ControlScaleProps<T extends Control.ScaleOptions = Control.ScaleOptions>
    extends ControlAbstractProps<T> {
    /**
     * Maximum width of the control in pixels. The width is set dynamically to show round values (eg. 100, 200, 500).
     * @initOnly
     */
    maxWidth?: number
    /**
     * Whether to show the metric scale line (m/km).
     * @initOnly
     */
    metric?: boolean
    /**
     * Whether to show the imperial scale line (mi/ft).
     * @initOnly
     */
    imperial?: boolean
    /**
     * If `true`, the control is updated on [moveend](https://leafletjs.com/reference-2.0.0html#map-moveend), otherwise it's always up-to-date (updated on [move](https://leafletjs.com/reference.html#map-move)).
     * @initOnly
     */
    updateWhenIdle?: boolean
}

export const controlScalePropsDefaults = {
    ...controlAbstractPropsDefaults,
    metric: undefined,
    imperial: undefined,
    updateWhenIdle: undefined
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface ControlScaleEmits<T extends Control.Scale = Control.Scale>
    extends ControlEmits<T> {}

export const setupControlScale = (
    props: ControlScaleProps,
    leafletRef: Ref<Control.Scale | undefined>
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.ScaleOptions>(props, controlOptions)

    return { options, methods: controlMethods }
}
