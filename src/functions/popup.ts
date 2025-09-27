import type { LatLngExpression, Popup, PopupOptions } from 'leaflet'
import type { Ref } from 'vue'

import { type PopperProps, popperPropsDefaults, setupPopper } from './popper'

export interface PopupProps<T extends PopupOptions = PopupOptions> extends PopperProps<T> {
    /**
     * The position of the popup
     * @reactive
     */
    latLng?: LatLngExpression
}

export const popupPropsDefaults = {
    ...popperPropsDefaults
}

export const setupPopup = (props: PopupProps, leafletRef: Ref<Popup | undefined>) => {
    const { options, methods } = setupPopper(props, leafletRef)

    return { options, methods }
}
