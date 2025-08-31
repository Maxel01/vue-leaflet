import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

export const testEmitsReady = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('emits "ready" with the Leaflet object', async () => {
        const wrapper = await getWrapper()
        const readyEvent = wrapper.emitted('ready')

        expect(readyEvent).toHaveLength(1)
        expect(readyEvent![0][0]).toBe(wrapper.vm.leafletObject)
    })
}
