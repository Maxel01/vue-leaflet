import type { ImageOverlayOptions } from 'leaflet'
import { SVGOverlay } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '@/utils'
import type { ImageOverlayAbstractProps, ImageOverlayEmits } from './imageOverlay'
import { imageOverlayPropsDefaults, setupImageOverlay } from './imageOverlay'

export interface SVGOverlayProps extends ImageOverlayAbstractProps {
    /**
     * Url of the svg or the SVGElement
     * @initOnly
     */
    svg: string | SVGElement
}

export const svgOverlayPropsDefaults = {
    ...imageOverlayPropsDefaults,
}

export type SVGOverlayEmits = ImageOverlayEmits<SVGOverlay>

export const setupSVGOverlay = (
    props: SVGOverlayProps,
    leafletRef: Ref<SVGOverlay | undefined>,
    emit: SVGOverlayEmits,
) => {
    const { options: imageOverlayOptions, methods: imageOverlayMethods } = setupImageOverlay(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<ImageOverlayOptions>(props, imageOverlayOptions)

    const methods = {
        ...imageOverlayMethods,
    }

    return { options, methods }
}
