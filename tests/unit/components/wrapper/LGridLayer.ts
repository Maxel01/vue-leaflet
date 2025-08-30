import { mergeReactiveProps } from '@/tests/helper/props'
import { layerProps } from '@/tests/helper/propsBindingTests'

export const gridLayerProps = mergeReactiveProps(layerProps, {
    opacity: 0.5,
    zIndex: 50
})
