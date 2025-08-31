import { mergeReactiveProps } from '@/tests/helper/props'
import { controlAbstractProps } from './LControl'

export const controlAttributionProps = mergeReactiveProps(controlAbstractProps, {
    prefix: 'new prefix'
})
