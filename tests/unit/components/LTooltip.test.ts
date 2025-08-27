import { flushPromises, mount, shallowMount, type VueWrapper } from '@vue/test-utils'
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
import { testBindTooltip, testUnbindTooltipOnUnmount } from './helper/tests'
import { TooltipProps } from '../../../src/functions/tooltip'
import { createMarkerWrapper } from './wrapper/LMarker'

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

const createWrapperWithSlot = async (props = {}) => {
    const wrapper = mount(LTooltip, {
        propsData: {
            ...props
        },
        global: {
            provide: {
                [BindTooltipInjection as symbol]: mockBindTooltip,
                [UnbindTooltipInjection as symbol]: mockUnbindTooltip
            }
        },
        slots: {
            default: 'Something'
        }
    })
    await flushPromises()
    return wrapper
}

describe('LTooltip.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LTooltip')
    testPropsBindingToLeaflet(createWrapper, tooltipProps)
    testUnbindTooltipOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testBindTooltip(createWrapper)
})

const testCorrectInitialisation = (
    getWrapper: (props?: TooltipProps) => Promise<VueWrapper<any>>
) => {
    it('creates a Leaflet tooltip with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Tooltip

        expect(obj).toBeDefined()
        expect(obj.getContent()).toBe('This is a tooltip.')
    })
    it('creates a Leaflet tooltip with correct options', async () => {
        const wrapper = await createWrapperWithSlot()
        const obj = wrapper.vm.leafletObject as Tooltip

        expect(obj).toBeDefined()
        expect((obj.getContent() as HTMLDivElement).outerHTML).toBe(
            '<div><!--\n' +
                "        @slot Content to be rendered inside the Leaflet tooltip's container. This slot replaces the default content and allows full customization of the tooltip's appearance. The content will be injected into the tooltip's root DOM element.\n" +
                '        -->Something</div>'
        )
    })
    it('creates a Leaflet layer (marker) with a tooltip', async () => {
        const wrapper = await createMarkerWrapper({}, { default: LTooltip })
        expect(wrapper.vm.leafletObject).toBeDefined()
        const lTooltip = wrapper.findComponent(LTooltip)
        expect(lTooltip.vm.leafletObject).toBeDefined()
    })
}
