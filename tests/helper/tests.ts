import { beforeEach, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import {
    mockBindPopup,
    mockBindTooltip,
    mockRemoveLayer,
    mockUnbindPopup,
    mockUnbindTooltip
} from './injectionsTests'

/**
 * Asserts that leafletObject.remove() is called when the component is unmounted.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testRemoveOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the leafletObject on unmount', async () => {
        const wrapper = await getWrapper()
        const removeSpy = vi.spyOn(wrapper.vm.leafletObject!, 'remove')

        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledOnce()
    })
}

/**
 * Asserts that the layer removal injection (removeLayer) is called when the component is unmounted.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testRemoveLayerOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRemoveLayer.mockReset()
    })
    it('removes the leafletObject on unmount', async () => {
        const wrapper = await getWrapper()
        wrapper.unmount()
        expect(mockRemoveLayer).toHaveBeenCalledOnce()
    })
}

/**
 * Asserts that the tooltip is bound on mount via the bindTooltip injection.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testBindTooltip = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockBindTooltip.mockReset()
    })
    it('binds the tooltip on mount', async () => {
        const wrapper = await getWrapper()
        wrapper.unmount()
        expect(mockBindTooltip).toHaveBeenCalledOnce()
    })
}

/**
 * Asserts that the tooltip is unbound on unmount via the unbindTooltip injection.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testUnbindTooltipOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockUnbindTooltip.mockReset()
    })
    it('unbinds the tooltip on unmount', async () => {
        const wrapper = await getWrapper()
        wrapper.unmount()
        expect(mockUnbindTooltip).toHaveBeenCalledOnce()
    })
}

/**
 * Asserts that the popup is bound on mount via the bindPopup injection.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testBindPopup = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockBindPopup.mockReset()
    })
    it('binds the popup on mount', async () => {
        await getWrapper()
        expect(mockBindPopup).toHaveBeenCalledOnce()
    })
}

/**
 * Asserts that the popup is unbound on unmount via the unbindPopup injection.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testUnbindPopupOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockUnbindPopup.mockReset()
    })
    it('unbinds the popup on unmount', async () => {
        const wrapper = await getWrapper()
        wrapper.unmount()
        expect(mockUnbindPopup).toHaveBeenCalledOnce()
    })
}
