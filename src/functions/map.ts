import { type CRS, LatLngBounds, type MapOptions, type PointExpression } from 'leaflet'
import { type ComponentProps, componentPropsDefaults, setupComponent } from '@/functions/component'

export interface MapProps extends ComponentProps<MapOptions> {
    /**
     * The width of the map
     * @reactive native
     */
    width?: string
    /**
     * The height of the map
     * @reactive native
     */
    height?: string
    /**
     * The center of the map, supports `v-model`
     * @reactive
     */
    center?: PointExpression
    /**
     * The bounds of the map, supports `v-model`
     * @reactive
     */
    bounds?: LatLngBounds
    /**
     * The max bounds of the map
     * @reactive
     */
    maxBounds?: LatLngBounds
    /**
     * The zoom of the map, supports `v-model`
     * @reactive
     */
    zoom?: number
    /**
     * The minZoom of the map
     * @reactive
     */
    minZoom?: number
    /**
     * The maxZoom of the map
     * @reactive
     */
    maxZoom?: number
    /**
     * The paddingBottomRight of the map. Applies only when LMap.fitBounds is called.
     * @reactive native
     */
    paddingBottomRight?: PointExpression
    /**
     * The paddingTopLeft of the map. Applies only when LMap.fitBounds is called.
     * @reactive native
     */
    paddingTopLeft?: PointExpression
    /**
     * The padding of the map. Applies only when LMap.fitBounds is called.
     * @reactive native
     */
    padding?: PointExpression
    /**
     * With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible.
     * @initOnly
     */
    worldCopyJump?: boolean
    // BREAKING CHANGES: crs value needs to be a value of CRS class
    /**
     * The [Coordinate Reference System](https://leafletjs.com/reference-2.0.0.html#crs) to use. Don't change this if you're not sure what it means.
     * @reactive
     */
    crs?: CRS | typeof CRS.EPSG3857 // typeof only necessary to remove the runtime warning
    /**
     * If `maxBounds` is set, this option will control how solid the bounds are when dragging the map around. The default value of `0.0` allows the user to drag outside the bounds at normal speed, higher values will slow down map dragging outside bounds, and `1.0` makes the bounds fully solid, preventing the user from dragging outside the bounds.
     * @initOnly
     */
    maxBoundsViscosity?: number
    /**
     * If enabled, panning of the map will have an inertia effect where the map builds momentum while dragging and continues moving in the same direction for some time. Feels especially nice on touch devices. Enabled by default.
     * @initOnly
     */
    inertia?: boolean
    /**
     * The rate with which the inertial movement slows down, in pixels/second².
     * @initOnly
     */
    inertiaDeceleration?: number
    /**
     * Max speed of the inertial movement, in pixels/second.
     * @initOnly
     */
    inertiaMaxSpeed?: number
    /**
     * The curvature factor of panning animation easing (third parameter of the [Cubic Bezier curve](https://cubic-bezier.com/)). 1.0 means linear animation, and the smaller this number, the more bowed the curve.
     * @initOnly
     */
    easeLinearity?: number
    /**
     * Whether the map zoom animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.
     * @initOnly
     */
    zoomAnimation?: boolean
    /**
     * Won't animate zoom if the zoom difference exceeds this value.
     * @initOnly
     */
    zoomAnimationThreshold?: number
    /**
     * Whether the tile fade animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.
     * @initOnly
     */
    fadeAnimation?: boolean
    /**
     * Whether markers animate their zoom with the zoom animation, if disabled they will disappear for the length of the animation. By default, it's enabled in all browsers that support CSS3 Transitions except Android.
     * @initOnly
     */
    markerZoomAnimation?: boolean
    /**
     * Whether blocking animations are allowed or not (primarily for [ZoomPanOptions](https://leafletjs.com/reference-2.0.0.html#zoom/pan-options) ?
     * @initOnly
     */
    noBlockingAnimations?: boolean
    /**
     * @initOnly
     */
    beforeMapMount?: () => void | Promise<void>
}

export const mapPropsDefaults = {
    ...componentPropsDefaults,
    width: '100%',
    height: '100%',
    worldCopyJump: undefined,
    inertia: undefined,
    zoomAnimation: undefined,
    fadeAnimation: undefined,
    markerZoomAnimation: undefined,
    noBlockingAnimations: undefined,
}

export const setupMap = (props: MapProps) => {
    return setupComponent(props)
}
