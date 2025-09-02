import { mergeReactiveProps } from '@/tests/helper/props'
import { componentProps } from '@/tests/helper/propsBindingTests'

export const controlAbstractProps = mergeReactiveProps(componentProps, {
    position: 'bottomleft'
})

export const controlProps = mergeReactiveProps(controlAbstractProps, {})
