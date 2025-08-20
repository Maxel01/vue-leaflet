import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection
} from '../../../src/types/injectionKeys'
import { testRemoveLayerOnUnmount } from './helper/tests'
import {
    iconProps,
    testComponentPropBindings,
    testPropsBindingToLeaflet
} from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import {
    mockCanSetParentHtmlInjection,
    mockSetIconInjection,
    mockSetParentHtmlInjection,
    testCanSetParentHtml,
    testSetIcon,
    testSetParentHtml
} from './helper/injectionsTests'
import { Icon } from 'leaflet'
import LIcon from '../../../src/components/LIcon.vue'

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
    return wrapper
}

describe('LIcon.vue', () => {
    // TEST testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LIcon')
    testPropsBindingToLeaflet(createWrapper, iconProps)
    // TEST testRemoveLayerOnUnmount(createWrapper)

    // TEST testCorrectInitialisation(createWrapper)
    // TEST testCanSetParentHtml(createWrapper)
    // TEST testSetParentHtml(createWrapper)
    testSetIcon(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet icon with correct options', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        const obj = wrapper.vm.leafletObject as Icon

        expect(obj).toBeDefined()
    })
}
