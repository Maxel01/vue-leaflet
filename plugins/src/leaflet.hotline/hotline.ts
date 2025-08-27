import { type PolylineOptions } from 'leaflet'

import type { Ref } from 'vue'
import { Hotline } from './leaflet.hotline'
import {
    propsToLeafletOptions,
    type PolylineEmits,
    type PolylineProps,
    polylinePropsDefaults,
    setupPolyline
} from '@maxel01/vue-leaflet'

export interface HotlineProps<T extends PolylineOptions = PolylineOptions>
    extends PolylineProps<T> {
    /**
     * @initOnly
     */
    min: number,
    /**
     * @initOnly
     */
    max: number
}

export const hotlinePropsDefaults = {
    ...polylinePropsDefaults
}

export interface HotlineEmits<T extends Hotline = Hotline> extends PolylineEmits<T> {}

export const setupHotline = (
    props: HotlineProps,
    leafletRef: Ref<Hotline | undefined>,
    emit: HotlineEmits
) => {
    const { options: polylineOptions, methods: polylineMethods } = setupPolyline(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<PolylineOptions>(props, polylineOptions)

    const methods = {
        ...polylineMethods
    }

    return { options, methods }
}
