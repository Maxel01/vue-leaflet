import { onBeforeUnmount, type Ref } from 'vue'

import { UnbindTooltipInjection } from '../types/injectionKeys'
import { assertInject } from '../utils'

import { type PopperProps, popperPropsDefaults, setupPopper } from './popper'
import type { Tooltip } from 'leaflet'

export type TooltipProps = PopperProps

export const tooltipPropsDefaults = {
    ...popperPropsDefaults,
}

export const setupTooltip = (props: PopperProps, leafletRef: Ref<Tooltip | undefined>) => {
    const { options, methods } = setupPopper(props, leafletRef)

    const unbindTooltip = assertInject(UnbindTooltipInjection)

    onBeforeUnmount(() => {
        unbindTooltip()
    })

    return { options, methods }
}
