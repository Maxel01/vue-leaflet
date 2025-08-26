import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection
} from '../../../src/types/injectionKeys'
import {
    componentProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import {
    mockCanSetParentHtmlInjection,
    mockSetIconInjection,
    mockSetParentHtmlInjection,
    testSetIcon
} from './helper/injectionsTests'
import LIcon from '../../../src/components/LIcon.vue'
import { mergeReactiveProps } from './helper/props'

// TODO incomplete testing

const iconProps = mergeReactiveProps(componentProps, {
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

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LIcon, {
        propsData: {
            ...props
        },
        global: {
            provide: {
                [CanSetParentHtmlInjection as symbol]: mockCanSetParentHtmlInjection,
                [SetParentHtmlInjection as symbol]: mockSetParentHtmlInjection,
                [SetIconInjection as symbol]: mockSetIconInjection
            }
        }
    })
    await flushPromises()
    await vi.waitFor(() => expect(mockSetIconInjection).toHaveBeenCalledOnce())
    return wrapper
}

describe('LIcon.vue', () => {
    testComponentPropBindings(createWrapper, 'LIcon')
    testPropsBindingToLeaflet(createWrapper, iconProps)
    // TEST testRemoveLayerOnUnmount(createWrapper)

    // TEST testCorrectInitialisation(createWrapper)
    testSetIcon(createWrapper)
    testSwapHtml(createWrapper)
})

const testSwapHtml = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet icon with correct options', async () => {
        const wrapper = await getWrapper()
        wrapper.vm.root.innerHTML = '<div>SOme new content</div>'
        await vi.waitFor(() => expect(mockSetParentHtmlInjection).toHaveBeenCalledOnce())
    })
}
