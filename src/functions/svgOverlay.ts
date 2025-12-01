import type { ImageOverlayOptions, SVGOverlay } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '@/utils'
import {
    type ImageOverlayAbstractProps,
    type ImageOverlayEmits,
    imageOverlayPropsDefaults,
    setupImageOverlay
} from './imageOverlay'

export interface SVGOverlayProps<
    T extends ImageOverlayOptions = ImageOverlayOptions
> extends ImageOverlayAbstractProps<T> {
    /**
     * Url of the svg or the SVGElement. Will be ignored when using the named slot `svg`.
     * @initOnly
     */
    svg?: string | SVGElement
}

export const svgOverlayPropsDefaults = {
    ...imageOverlayPropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface SVGOverlayEmits<T extends SVGOverlay = SVGOverlay> extends ImageOverlayEmits<T> {}

export const setupSVGOverlay = (
    props: SVGOverlayProps,
    leafletRef: Ref<SVGOverlay | undefined>,
    emit: SVGOverlayEmits
) => {
    const { options: imageOverlayOptions, methods: imageOverlayMethods } = setupImageOverlay(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<ImageOverlayOptions>(props, imageOverlayOptions)

    const methods = {
        ...imageOverlayMethods
    }

    return { options, methods }
}
