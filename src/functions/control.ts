import type { Control, ControlOptions, ControlPosition } from 'leaflet'
import { onUnmounted, type Ref } from 'vue'

import { propsToLeafletOptions } from '@/utils'

import { type ComponentProps, componentPropsDefaults, setupComponent } from '@/functions/component'

export interface ControlAbstractProps<T extends ControlOptions = ControlOptions>
    extends ComponentProps<T> {
    /**
     * The position of the control (one of the map corners). Possible values are `topleft`, `topright`, `bottomleft` or `bottomright`.
     * @reactive
     */
    position?: ControlPosition
}

export interface ControlProps<T extends ControlOptions = ControlOptions>
    extends ControlAbstractProps<T> {
    /**
     * Adds stopPropagation to the element's `click`, `dblclick`, `contextmenu` and `pointerdown` events (plus browser variants).
     * @initOnly
     */
    disableClickPropagation?: boolean
    /**
     * Adds stopPropagation to the element's `wheel` events (plus browser variants).
     * @initOnly
     */
    disableScrollPropagation?: boolean
}

export const controlAbstractPropsDefaults = {
    ...componentPropsDefaults
}

export const controlPropsDefaults = {
    ...controlAbstractPropsDefaults,
    disableClickPropagation: true,
    disableScrollPropagation: false
}

export interface ControlEmits<T extends Control = Control> {
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', layer: T): void
}

export const setupControl = (props: ControlAbstractProps, leafletRef: Ref<Control | undefined>) => {
    const { options: componentOptions, methods: componentMethods } = setupComponent(props)

    const options = propsToLeafletOptions<ControlOptions>(props, componentOptions)

    const methods = {
        ...componentMethods,
        setPosition(position: ControlPosition) {
            leafletRef.value?.setPosition(position)
        }
    }

    onUnmounted(() => {
        leafletRef.value?.remove()
    })

    return { options, methods }
}
