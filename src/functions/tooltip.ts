import { onBeforeUnmount, type Ref } from 'vue'

import { UnbindTooltipInjection } from '../types/injectionKeys'
import { assertInject } from '../utils'

import { type PopperProps, popperPropsDefaults, setupPopper } from './popper'
import type { Tooltip, TooltipOptions } from 'leaflet'

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface TooltipProps extends PopperProps<TooltipOptions> {
}

export const tooltipPropsDefaults = {
    ...popperPropsDefaults,
}

export const setupTooltip = (props: TooltipProps, leafletRef: Ref<Tooltip | undefined>) => {
    const { options, methods } = setupPopper(props, leafletRef)

    const unbindTooltip = assertInject(UnbindTooltipInjection)

    onBeforeUnmount(() => {
        unbindTooltip()
    })

    return { options, methods }
}
