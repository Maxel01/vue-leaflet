import { mergeReactiveProps } from '../helper/props'
import { pathProps } from '../helper/propsBindingTests'
import { LatLng } from 'leaflet'

export const circleMarkerProps = mergeReactiveProps(pathProps, {
    radius: 15,
    latLng: new LatLng(44.5, 11.5)
})
