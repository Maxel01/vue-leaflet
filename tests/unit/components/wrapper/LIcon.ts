import { mergeReactiveProps } from '@/tests/helper/props'
import { componentProps } from '@/tests/helper/propsBindingTests'
import type { VueWrapper } from '@vue/test-utils'
import { expect, vi } from 'vitest'
import { mockSetIconInjection } from '@/tests/helper/injectionsTests'

export const iconProps = mergeReactiveProps(componentProps, {
    iconUrl: 'replace.icon',
    iconRetinaUrl: 'replaceRetina.icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [10, 10],
    tooltipAnchor: [10, 10],
    shadowUrl: 'replace.shadow',
    shadowRetinaUrl: 'replaceRetina.shadow',
    shadowAnchor: [10, 10],
    bgPos: [10, 10],
    className: 'classes',
    customCheck: async (wrapper: VueWrapper) => {
        await vi.waitFor(() => expect(mockSetIconInjection).toHaveBeenCalledTimes(2))
    }
})
