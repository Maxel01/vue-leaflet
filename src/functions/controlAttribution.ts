import { Control } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type ControlEmits,
    type ControlAbstractProps,
    controlAbstractPropsDefaults,
    setupControl
} from './control'
import type { Ref } from 'vue'

export interface ControlAttributionProps<
    T extends Control.AttributionOptions = Control.AttributionOptions
> extends ControlAbstractProps<T> {
    /**
     * The HTML text shown before the attributions. Pass `false` to disable.
     * @reactive
     */
    prefix?: string | false
}

export const controlAttributionPropsDefaults = {
    ...controlAbstractPropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface ControlAttributionEmits<T extends Control.Attribution = Control.Attribution>
    extends ControlEmits<T> {}

export const setupControlAttribution = (
    props: ControlAttributionProps,
    leafletRef: Ref<Control.Attribution | undefined>
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.AttributionOptions>(props, controlOptions)

    const methods = {
        ...controlMethods,
        setPrefix(prefix: string | false) {
            leafletRef.value?.setPrefix(prefix)
        }
    }

    return { options, methods }
}
