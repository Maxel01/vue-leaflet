import { beforeEach, expect, it, vi } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import { mockRemoveLayer } from './injectionsTests'

export const testRemoveOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the leafletObject on unmount', async () => {
        const wrapper = await getWrapper()
        const removeSpy = vi.spyOn(wrapper.vm.leafletObject!, 'remove')

        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledOnce()
    })
}

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
