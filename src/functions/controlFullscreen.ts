import type { FullscreenControl, FullscreenControlOptions } from 'leaflet'

import { propsToLeafletOptions } from '@/utils'

import {
    type ControlEmits,
    type ControlAbstractProps,
    controlAbstractPropsDefaults,
    setupControl
} from './control'
import type { Ref } from 'vue'

export interface ControlFullscreenProps<
    T extends FullscreenControlOptions = FullscreenControlOptions
> extends ControlAbstractProps<T> {
    /**
     * The text set on the button while the map is not fullscreen.
     * @initOnly
     */
    enterText?: string
    /**
     * The title set on the button while the map is not fullscreen.
     * @initOnly
     */
    enterTitle?: string
    /**
     * The text set on the button while the map is fullscreen.
     * @initOnly
     */
    exitText?: string
    /**
     * The title set on the button while the map is fullscreen.
     * @initOnly
     */
    exitTitle?: string
    /**
     * The element to make fullscreen, e.g. a parent that also holds a sidebar. Defaults to the map container.
     * @initOnly
     */
    container?: HTMLElement
    /**
     * Whether to always fill the window with CSS instead of using the Fullscreen API. The control falls back to this where the API isn't available, e.g. on iPhone or in an iframe without `allow="fullscreen"`.
     * @initOnly
     */
    pseudo?: boolean
}

export const controlFullscreenPropsDefaults = {
    ...controlAbstractPropsDefaults,
    enterText: undefined,
    enterTitle: undefined,
    exitText: undefined,
    exitTitle: undefined,
    container: undefined,
    pseudo: undefined
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface ControlFullscreenEmits<
    T extends FullscreenControl = FullscreenControl
> extends ControlEmits<T> {}

export const setupControlFullscreen = (
    props: ControlFullscreenProps,
    leafletRef: Ref<FullscreenControl | undefined>
) => {
    const { options: controlOptions, methods: controlMethods } = setupControl(props, leafletRef)

    const options = propsToLeafletOptions<FullscreenControlOptions>(props, controlOptions)

    const methods = {
        ...controlMethods,
        setFullscreen(on: boolean) {
            leafletRef.value?.setFullscreen(on)
        }
    }

    return { options, methods }
}
