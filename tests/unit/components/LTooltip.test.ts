import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LTooltip from '../../../src/components/LTooltip.vue'
import { BindTooltipInjection, UnbindTooltipInjection } from '../../../src/types/injectionKeys'
import {
    popperProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockBindTooltip, mockUnbindTooltip } from './helper/injectionsTests'
import { Tooltip } from 'leaflet'
import { mergeReactiveProps } from './helper/props'

const tooltipProps = mergeReactiveProps(popperProps, {})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LTooltip, {
        propsData: {
            content: 'This is a tooltip.',
            ...props
        },
        global: {
            provide: {
                [BindTooltipInjection as symbol]: mockBindTooltip,
                [UnbindTooltipInjection as symbol]: mockUnbindTooltip
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LTooltip.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LTooltip')
    testPropsBindingToLeaflet(createWrapper, tooltipProps)
    // TEST testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet tooltip with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Tooltip

        expect(obj).toBeDefined()
        expect(obj.getContent()).toBe('This is a tooltip.')
    })
}
