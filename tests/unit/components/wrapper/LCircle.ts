import { mergeReactiveProps } from '@/tests/helper/props'
import { circleMarkerProps } from './LCircleMarker'

export const circleProps = mergeReactiveProps(circleMarkerProps, {
    radius: 10000
})
