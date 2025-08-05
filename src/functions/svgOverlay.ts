import type { ImageOverlayOptions, LatLngBoundsExpression } from 'leaflet'
import { SVGOverlay } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'
import type { ImageOverlayEmits, ImageOverlayProps } from './imageOverlay.ts'
import { imageOverlayPropsDefaults, setupImageOverlay } from './imageOverlay.ts'

export interface SVGOverlayProps extends ImageOverlayProps {
    url?: string
    bounds: LatLngBoundsExpression
    svg: SVGElement
}

export const svgOverlayPropsDefaults = {
    ...imageOverlayPropsDefaults
}

export type SVGOverlayEmits = ImageOverlayEmits<SVGOverlay>

export const setupSVGOverlay = (
    props: SVGOverlayProps,
    leafletRef: Ref<SVGOverlay | undefined>,
    emit: SVGOverlayEmits
) => {
    const {
        options: imageOverlayOptions,
        methods: imageOverlayMethods
    } = setupImageOverlay(props, leafletRef, emit)

    const options = propsToLeafletOptions<ImageOverlayOptions>(props, imageOverlayOptions)

    const methods = {
        ...imageOverlayMethods,
    }

    return { options, methods }
}
