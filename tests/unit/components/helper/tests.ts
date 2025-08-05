import { expect, vi, it, describe } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'

export const testEmitsReady = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('emits "ready" with the Leaflet object', async () => {
        const wrapper = await getWrapper()
        const readyEvent = wrapper.emitted('ready')

        expect(readyEvent).toHaveLength(1)
        expect(readyEvent![0][0]).toBe(wrapper.vm.leafletObject)
    })
}

export const testRemovesOnUnmount = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('removes the leafletObject on unmount', async () => {
        const wrapper = await getWrapper()
        const removeSpy = vi.spyOn(wrapper.vm.leafletObject!, 'remove')

        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledOnce()
    })
}

export function testComponentPropBindings(getWrapper: () => Promise<VueWrapper<unknown>>) {
    it('registers watch for each prop with matching setter', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        await getWrapper()
        expect(consoleWarnMock).not.toHaveBeenCalled()
        consoleWarnMock.mockRestore()
    })
}
