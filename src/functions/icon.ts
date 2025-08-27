import type { DivIconOptions, PointExpression } from 'leaflet'
import { type ComponentProps, componentPropsDefaults } from '@/functions/component'

export interface IconProps extends ComponentProps<DivIconOptions> {
    /**
     * The URL to the icon image (absolute or relative to your script path).
     * @reactive
     */
    iconUrl?: string
    /**
     * The URL to a retina sized version of the icon image (absolute or relative to your script path). Used for Retina screen devices.
     * @reactive
     */
    iconRetinaUrl?: string
    /**
     * Size of the icon image in pixels.
     * @reactive
     */
    iconSize?: PointExpression
    /**
     * The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.
     * @reactive
     */
    iconAnchor?: PointExpression
    /**
     * The coordinates of the point from which popups will "open", relative to the icon anchor
     * @reactive
     */
    popupAnchor?: PointExpression
    /**
     * The coordinates of the point from which tooltips will "open", relative to the icon anchor
     * @reactive
     */
    tooltipAnchor?: PointExpression
    /**
     * The URL to the icon shadow image. If not specified, no shadow image will be created
     * @reactive
     */
    shadowUrl?: string
    /**
     *
     * @reactive
     */
    shadowRetinaUrl?: string
    /**
     * Size of the shadow image in pixels
     * @initOnly
     */
    shadowSize?: PointExpression
    /**
     * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified)
     * @reactive
     */
    shadowAnchor?: PointExpression
    /**
     *
     * @reactive
     */
    bgPos?: PointExpression
    /**
     * A custom class name to assign to both icon and shadow images. Empty by default.
     * @reactive
     */
    className?: string
}

export const iconPropsDefaults = {
    ...componentPropsDefaults
}
