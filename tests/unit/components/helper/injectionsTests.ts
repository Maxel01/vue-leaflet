import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, expect, it, Mock, vi } from 'vitest'

export const mockRegisterControl = vi.fn()
export const mockRegisterLayerControl = vi.fn()

export const testRegistration = (getWrapper: () => Promise<VueWrapper<any>>, mockRegister: Mock) => {
    beforeEach(() => {
        mockRegister.mockReset()
    })
    it('registers the control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegister).toHaveBeenCalledTimes(1)
        expect(mockRegister).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })
    })
}

export const testControlRegistration = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRegisterControl.mockReset()
    })
    it('registers the control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegisterControl).toHaveBeenCalledTimes(1)
        expect(mockRegisterControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })
    })
}

export const testControlLayerRegistration = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRegisterLayerControl.mockReset()
    })
    it('registers the layer control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegisterLayerControl).toHaveBeenCalledTimes(1)
        // TODO
        /*expect(mockRegisterLayerControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}
