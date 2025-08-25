import { mergeReactiveProps } from '../helper/props'
import { layerProps } from '../helper/propsBindingTests'

export const gridLayerProps = mergeReactiveProps(layerProps, {
    opacity: 0.5,
    zIndex: 50
})
