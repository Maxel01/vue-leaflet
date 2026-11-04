import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

/**
 * Asserts that the component emits the "ready" event with its Leaflet object on mount.
 * @param getWrapper Async function that resolves to the mounted VueWrapper.
 */
export const testEmitsReady = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('emits "ready" with the Leaflet object', async () => {
        const wrapper = await getWrapper()
        const readyEvent = wrapper.emitted('ready')

        expect(readyEvent).toHaveLength(1)
        expect(readyEvent![0][0]).toBe(wrapper.vm.leafletObject)
    })
}
