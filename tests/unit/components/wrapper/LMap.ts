import { flushPromises, mount } from '@vue/test-utils'
import { expect, vi } from 'vitest'
import LMap from '@/components/LMap.vue'

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver

Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: 300
})
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    value: 300
})

export const createMapWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LMap, {
        propsData: {
            width: '300px',
            height: '300px',
            center: [45, 10],
            zoom: 8,
            noBlockingAnimations: true,
            options: {
                zoomSnap: 0
            },
            ...props
        },
        slots: slots,
        attachTo: document.body
    })
    await flushPromises()
    await vi.waitFor(() => expect(wrapper.emitted('ready')).toBeTruthy())
    return wrapper
}
