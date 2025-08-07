import { Control } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import { type ControlEmits, type ControlAbstractProps, controlAbstractPropsDefaults, setupControl } from './control.ts'
import type { Ref } from 'vue'

export interface ControlAttributionProps extends ControlAbstractProps<Control.AttributionOptions> {
    /**
     * The HTML text shown before the attributions. Pass `false` to disable.
     * @reactive
     */
    prefix?: string | false
}

export const controlAttributionPropsDefaults = {
    ...controlAbstractPropsDefaults,
}

export type ControlAttributionEmits = ControlEmits<Control.Attribution>


export const setupControlAttribution = (
    props: ControlAttributionProps,
    leafletRef: Ref<Control.Attribution | undefined>,
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<Control.AttributionOptions>(props, controlOptions)

    const methods = {
        ...controlMethods,
        setPrefix(prefix: string | false) {
            leafletRef.value?.setPrefix(prefix)
        },
    }

    return { options, methods }
}
