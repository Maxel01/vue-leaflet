import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LControlAttribution from '../../../src/components/LControlAttribution.vue'
import { RegisterControlInjection } from '../../../src/types/injectionKeys'
import { Control } from 'leaflet'
import { testComponentPropBindings, testEmitsReady, testRemovesOnUnmount } from './helper/tests'
import { testComponentWatchBindings } from './helper/tststst'

const mockRegisterControl = vi.fn()

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LControlAttribution, {
        propsData: {
            position: 'topright',
            prefix: 'Hello there',
            someProp: undefined,
            ...props,
        },
        global: {
            provide: {
                [RegisterControlInjection as symbol]: mockRegisterControl,
            },
        },
    })

    await flushPromises()
    return wrapper
}

describe('LControlAttribution.vue', () => {
    beforeEach(() => {
        mockRegisterControl.mockReset()
    })

    testEmitsReady(createWrapper)

    it('creates a Leaflet Attribution control with correct options', async () => {
        const wrapper = await createWrapper()
        const obj = wrapper.vm.leafletObject as Control.Attribution

        expect(obj).toBeDefined()
        expect(obj.options.prefix).toBe('Hello there')
        expect(obj.options.position).toBe('topright')
    })

    it('registers the control via injection', async () => {
        const wrapper = await createWrapper()
        expect(mockRegisterControl).toHaveBeenCalledTimes(1)
        expect(mockRegisterControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })
    })

    testReactivePrefix(createWrapper)
    testReactivePosition(createWrapper)
    testRemovesOnUnmount(createWrapper)
    testComponentPropBindings(createWrapper)
})

const testReactivePrefix = (getWrapper: () => Promise<VueWrapper<unknown>>) => {
    it('reactively updates "prefix"', async () => {
        const wrapper = await getWrapper()
        await wrapper.setProps({ prefix: 'new prefix' })
        await flushPromises()

        expect(wrapper.vm.leafletObject?.options.prefix).toBe('new prefix')
    })
}

const testReactivePosition = (getWrapper: () => Promise<VueWrapper<unknown>>) => {
    it('reactively updates "position"', async () => {
        const wrapper = await getWrapper()
        await wrapper.setProps({ position: 'bottomleft' })
        await flushPromises()

        expect(wrapper.vm.leafletObject?.options.position).toBe('bottomleft')
    })
}
