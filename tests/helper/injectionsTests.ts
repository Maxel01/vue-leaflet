import { flushPromises, type VueWrapper } from '@vue/test-utils'
import { beforeEach, expect, it, type Mock, vi } from 'vitest'

export const mockRegisterControl = vi.fn()
export const mockRegisterLayerControl = vi.fn()
export const mockAddLayer = vi.fn()
export const mockRemoveLayer = vi.fn()
export const mockCanSetParentHtmlInjection = vi.fn(() => true)
export const mockSetParentHtmlInjection = vi.fn()
export const mockSetIconInjection = vi.fn()
export const mockBindPopup = vi.fn()
export const mockUnbindPopup = vi.fn()
export const mockBindTooltip = vi.fn()
export const mockUnbindTooltip = vi.fn()

export const testRegistration = (
    getWrapper: () => Promise<VueWrapper<any>>,
    mockRegister: Mock
) => {
    beforeEach(() => {
        mockRegister.mockReset()
    })
    it('registers the control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegister).toHaveBeenCalledOnce()
        expect(mockRegister).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject
        })
    })
}

export const testControlRegistration = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRegisterControl.mockReset()
    })
    it('registers the control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegisterControl).toHaveBeenCalledOnce()
        expect(mockRegisterControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject
        })
    })
}

export const testControlLayerRegistration = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRegisterLayerControl.mockReset()
    })
    it('registers the layer control via injection', async () => {
        const wrapper = await getWrapper()
        expect(mockRegisterLayerControl).toHaveBeenCalledOnce()
        /* TEST
        expect(mockRegisterLayerControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

export const testAddLayer = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockAddLayer.mockReset()
    })
    it('adds the layer via injection', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        expect(mockAddLayer).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

export const testRemoveLayer = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRemoveLayer.mockReset()
    })
    it('removes the layer via injection', async () => {
        const wrapper = await getWrapper()
        wrapper.unmount()
        expect(mockRemoveLayer).toHaveBeenCalledOnce()
    })
}

export const testCanSetParentHtml = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockCanSetParentHtmlInjection.mockReset()
    })
    it('checks can set parent html injection', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        expect(mockCanSetParentHtmlInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

export const testSetParentHtml = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockSetParentHtmlInjection.mockReset()
    })
    it('sets parent html via injection', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        expect(mockSetParentHtmlInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

export const testSetIcon = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockSetIconInjection.mockReset()
    })
    it('sets icon via injection', async () => {
        const wrapper = await getWrapper()
        await flushPromises()
        expect(mockSetIconInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}
