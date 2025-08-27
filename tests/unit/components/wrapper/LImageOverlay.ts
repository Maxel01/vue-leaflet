import { mergeReactiveProps } from '../helper/props'
import { layerProps } from '../helper/propsBindingTests'
import { LatLngBounds } from 'leaflet'

export const imageOverlayAbstractProps = mergeReactiveProps(layerProps, {
    opacity: 0.5,
    zIndex: 50,
    bounds: new LatLngBounds([0, 0], [50, 50])
})
