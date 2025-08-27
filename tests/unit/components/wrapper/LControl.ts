import { mergeReactiveProps } from '../helper/props'
import { componentProps } from '../helper/propsBindingTests'

export const controlAbstractProps = mergeReactiveProps(componentProps, {
    position: 'bottomleft'
})
