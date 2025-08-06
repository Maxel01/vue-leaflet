import { expect, it, vi } from 'vitest'
import { VueWrapper } from '@vue/test-utils'

export const testRemovesOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the leafletObject on unmount', async () => {
        const wrapper = await getWrapper()
        const removeSpy = vi.spyOn(wrapper.vm.leafletObject!, 'remove')

        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledOnce()
    })
}
