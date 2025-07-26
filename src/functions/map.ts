import { type CRS, LatLngBounds, type MapOptions, type PointExpression } from 'leaflet'
import { type ComponentProps, componentPropsDefaults, setupComponent } from './component.ts'

export interface MapProps extends ComponentProps<MapOptions> {
    /**
     * The center of the map, supports .sync modifier
     */
    center?: PointExpression
    /**
     * The bounds of the map, supports .sync modifier
     */
    bounds?: LatLngBounds
    maxBounds?: LatLngBounds
    /**
     * The zoom of the map, supports .sync modifier
     */
    zoom?: number
    minZoom?: number
    maxZoom?: number
    paddingBottomRight?: PointExpression
    paddingTopLeft?: PointExpression
    padding?: PointExpression
    worldCopyJump?: boolean
    // BREAKING CHANGES: crs value needs to be a value of CRS class
    crs?: CRS | typeof CRS.EPSG3857
    maxBoundsViscosity?: number
    inertia?: boolean
    inertiaDeceleration?: number
    inertiaMaxSpeed?: number
    easeLinearity?: number
    zoomAnimation?: boolean
    zoomAnimationThreshold?: number
    fadeAnimation?: boolean
    markerZoomAnimation?: boolean
    noBlockingAnimations?: boolean
    beforeMapMount?: () => void | Promise<void>
}

export const mapPropsDefaults = {
    ...componentPropsDefaults,
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
