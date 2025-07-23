import { type Ref } from 'vue'

import { type ComponentProps, componentPropsDefaults, setupComponent } from './component'
import { DivOverlay } from 'leaflet'

export interface PopperProps extends ComponentProps {
    content?: string
}

export const popperPropsDefaults = {
    ...componentPropsDefaults,
    content: null,
}

export const setupPopper = (props: PopperProps, leafletRef: Ref<DivOverlay | undefined>) => {
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
