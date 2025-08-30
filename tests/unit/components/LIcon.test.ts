import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection
} from '@/types/injectionKeys'
import {
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from '@/tests/helper/propsBindingTests'
import {
    mockCanSetParentHtmlInjection,
    mockSetIconInjection,
    mockSetParentHtmlInjection,
    testSetIcon
} from '@/tests/helper/injectionsTests'
import LIcon from '@/components/LIcon.vue'
import { iconProps } from './wrapper/LIcon'

// TODO incomplete testing

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
