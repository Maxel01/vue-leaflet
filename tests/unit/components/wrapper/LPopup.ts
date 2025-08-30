import { mergeReactiveProps } from '@/tests/helper/props'
import { popperProps } from '@/tests/helper/propsBindingTests'
import { LatLng } from 'leaflet'

export const popupProps = mergeReactiveProps(popperProps, {
    latLng: new LatLng(44.5, 11.5)
})
