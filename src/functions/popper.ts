import { type Ref } from 'vue'

import { type ComponentProps, componentPropsDefaults, setupComponent } from './component'
import { type DivOverlay } from 'leaflet'

export interface PopperProps<T extends object> extends ComponentProps<T> {
    /**
     * Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a String or HTMLElement to be used in the overlay.
     * @reactive
     */
    content?: string | HTMLElement
}

export const popperPropsDefaults = {
    ...componentPropsDefaults,
    content: undefined,
}

export const setupPopper = (props: PopperProps<object>, leafletRef: Ref<DivOverlay | undefined>) => {
    const { options, methods: componentMethods } = setupComponent(props)

    const methods = {
        ...componentMethods,
        setContent(newVal: string | HTMLElement) {
            if (leafletRef.value && newVal !== null && newVal !== undefined) {
                leafletRef.value.setContent(newVal)
            }
        },
    }

    return { options, methods }
}
