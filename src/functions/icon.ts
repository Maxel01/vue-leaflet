import type { DivIconOptions } from 'leaflet'
import { type ComponentProps, componentPropsDefaults } from './component.ts'

// BREAKING CHANGES: pass iconOptions as Object instead of props
export interface IconProps extends ComponentProps {
    iconOptions?: DivIconOptions
}

export const iconPropsDefaults = {
    ...componentPropsDefaults,
}
