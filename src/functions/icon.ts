import type { DivIconOptions, PointExpression } from 'leaflet'
import { type ComponentProps, componentPropsDefaults } from './component.ts'

export interface IconProps extends ComponentProps<DivIconOptions> {
    iconUrl?: string
    iconRetinaUrl?: string
    iconSize?: PointExpression
    iconAnchor?: PointExpression
    popupAnchor?: PointExpression
    tooltipAnchor?: PointExpression
    shadowUrl?: string
    shadowRetinaUrl?: string
    shadowSize?: PointExpression
    shadowAnchor?: PointExpression
    bgPos?: PointExpression
    className?: string
}

export const iconPropsDefaults = {
    ...componentPropsDefaults,
}
