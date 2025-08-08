import type {
    ImageOverlay,
    ImageOverlayOptions,
    LatLngBounds,
    LatLngBoundsExpression,
} from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'

export interface ImageOverlayAbstractProps<T extends ImageOverlayOptions = ImageOverlayOptions>
    extends LayerProps<T> {
    /**
     * The opacity of the image overlay.
     * @reactive
     */
    opacity?: number
    /**
     * Text for the alt attribute of the image (useful for accessibility).
     * @initOnly
     */
    alt?: string
    /**
     * If `true`, the image overlay will emit [mouse events](https://leafletjs.com/reference-2.0.0.html#interactive-layer) when clicked or hovered
     * @initOnly
     */
    interactive?: boolean
    /**
     * Whether the crossOrigin attribute will be added to the image. If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data. Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
     * @initOnly
     */
    crossOrigin?: boolean
    /**
     * URL to the overlay image to show in place of the overlay that failed to load.
     * @initOnly
     */
    errorOverlayUrl?: string
    /**
     * The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
     * @reactive
     */
    zIndex?: number
    /**
     * A custom class name to assign to the image. Empty by default.
     * @initOnly
     */
    className?: string
    /**
     * The geographical bounds
     * @reactive
     */
    bounds: LatLngBoundsExpression
}

export interface ImageOverlayProps extends ImageOverlayAbstractProps {
    /**
     * Url of the image
     * @reactive
     */
    url: string
}

export const imageOverlayPropsDefaults = {
    ...layerPropsDefaults,
    interactive: undefined,
    crossOrigin: undefined,
}

export type ImageOverlayEmits<T extends ImageOverlay = ImageOverlay> = LayerEmits & {
    (event: 'ready', layer: T): void
}

export const setupImageOverlay = (
    props: ImageOverlayProps,
    leafletRef: Ref<ImageOverlay | undefined>,
    emit: ImageOverlayEmits,
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<ImageOverlayOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        /**
         * Sets the opacity of the overlay.
         * @param {number} opacity
         */
        setOpacity(opacity: number) {
            return leafletRef.value?.setOpacity(opacity)
        },
        /**
         * Changes the URL of the image.
         * @param {string} url
         */
        setUrl(url: string) {
            return leafletRef.value?.setUrl(url)
        },
        /**
         * Update the bounds that this ImageOverlay covers
         * @param {LatLngBounds | Array<Array<number>>} bounds
         */
        setBounds(bounds: LatLngBounds) {
            return leafletRef.value?.setBounds(bounds)
        },
        /**
         * Get the bounds that this ImageOverlay covers
         */
        getBounds(): LatLngBounds | undefined {
            return leafletRef.value?.getBounds()
        },
        /**
         * Returns the instance of HTMLImageElement used by this overlay.
         */
        getElement(): HTMLElement | undefined {
            return leafletRef.value?.getElement()
        },
        /**
         * Brings the layer to the top of all overlays.
         */
        bringToFront() {
            return leafletRef.value?.bringToFront()
        },
        /**
         * Brings the layer to the bottom of all overlays.
         */
        bringToBack() {
            return leafletRef.value?.bringToBack()
        },
        /**
         * Changes the zIndex of the image overlay.
         * @param {number} zIndex
         */
        setZIndex(zIndex: number) {
            return leafletRef.value?.setZIndex(zIndex)
        },
    }

    return { options, methods }
}
