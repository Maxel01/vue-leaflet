import type { Control, ControlOptions, ControlPosition } from 'leaflet'
import { onUnmounted, type Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'

import { type ComponentProps, componentPropsDefaults, setupComponent } from './component'

export interface ControlProps<T extends ControlOptions = ControlOptions> extends ComponentProps<T> {
    position?: ControlPosition
}

export const controlPropsDefaults = {
    ...componentPropsDefaults,
}

export type ControlEmits<T extends Control = Control> = {
    (event: 'ready', layer: T): void
}

export const setupControl = (props: ControlProps, leafletRef: Ref<Control | undefined>) => {
    const { options: componentOptions, methods: componentMethods } = setupComponent(props)

    const options = propsToLeafletOptions<ControlOptions>(props, componentOptions)

    const methods = {
        ...componentMethods,
        setPosition(position: ControlPosition) {
            leafletRef.value?.setPosition(position)
        },
    }

    onUnmounted(() => {
        leafletRef.value?.remove()
    })

    return { options, methods }
}
