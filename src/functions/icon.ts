import type { BaseIconOptions, PointExpression } from 'leaflet'
import { type ComponentProps, componentPropsDefaults } from './component.ts'

export interface IconProps extends ComponentProps {
    iconOptions?: BaseIconOptions
    bgPos?: PointExpression
}

export const iconPropsDefaults = {
    ...componentPropsDefaults,
}
