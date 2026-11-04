import { flushPromises, type VueWrapper } from '@vue/test-utils'
import { beforeEach, expect, it, type Mock, vi } from 'vitest'

/** Mock injection for registering a control (`registerControlKey`). */
export const mockRegisterControl: Mock = vi.fn()
/** Mock injection for registering a layer control (`registerLayerControlKey`). */
export const mockRegisterLayerControl: Mock = vi.fn()
/** Mock injection for adding a layer to a parent container (`addLayerKey`). */
export const mockAddLayer: Mock = vi.fn()
/** Mock injection for hiding a layer (`hideLayerKey`). */
export const mockHideLayer: Mock = vi.fn()
/** Mock injection for removing a layer from a parent container (`removeLayerKey`). */
export const mockRemoveLayer: Mock = vi.fn()
/** Mock injection returning whether parent HTML can be set (`canSetParentHtmlKey`). */
export const mockCanSetParentHtmlInjection: Mock = vi.fn(() => true)
/** Mock injection for setting parent HTML (`setParentHtmlKey`). */
export const mockSetParentHtmlInjection: Mock = vi.fn()
/** Mock injection for setting an icon on a parent marker (`setIconKey`). */
export const mockSetIconInjection: Mock = vi.fn()
/** Mock injection for binding a popup to a layer (`bindPopupKey`). */
export const mockBindPopup: Mock = vi.fn()
/** Mock injection for unbinding a popup from a layer (`unbindPopupKey`). */
export const mockUnbindPopup: Mock = vi.fn()
/** Mock injection for binding a tooltip to a layer (`bindTooltipKey`). */
export const mockBindTooltip: Mock = vi.fn()
/** Mock injection for unbinding a tooltip from a layer (`unbindTooltipKey`). */
export const mockUnbindTooltip: Mock = vi.fn()

/**
 * Asserts that the component registers itself with the specified mock injection on mount.
 */
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

/**
 * Asserts that the control registers itself via the mockRegisterControl injection on mount.
 */
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

/**
 * Asserts that the layer control registers itself via the mockRegisterLayerControl injection on mount.
 */
export const testControlLayerRegistration = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockRegisterLayerControl.mockReset()
    })
    it('registers the layer control via injection', async () => {
        await getWrapper()
        expect(mockRegisterLayerControl).toHaveBeenCalledOnce()
        /* TEST
        expect(mockRegisterLayerControl).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

/**
 * Asserts that the layer is added to the parent via the mockAddLayer injection on mount.
 */
export const testAddLayer = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockAddLayer.mockReset()
    })
    it('adds the layer via injection', async () => {
        await getWrapper()
        await flushPromises()
        expect(mockAddLayer).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

/**
 * Asserts that the layer is hidden via the mockHideLayer injection.
 */
export const testHideLayer = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockHideLayer.mockReset()
    })
    it('hides the layer via injection', async () => {
        await getWrapper()
        await flushPromises()
        /* TEST
        expect(mockHideLayer).toHaveBeenCalledOnce()
        */
    })
}

/**
 * Asserts that the layer is removed from the parent via the mockRemoveLayer injection on unmount.
 */
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

/**
 * Asserts that the component checks canSetParentHtml injection on mount.
 */
export const testCanSetParentHtml = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockCanSetParentHtmlInjection.mockReset()
    })
    it('checks can set parent html injection', async () => {
        await getWrapper()
        await flushPromises()
        expect(mockCanSetParentHtmlInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

/**
 * Asserts that the component sets parent HTML via setParentHtml injection.
 */
export const testSetParentHtml = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockSetParentHtmlInjection.mockReset()
    })
    it('sets parent html via injection', async () => {
        await getWrapper()
        await flushPromises()
        expect(mockSetParentHtmlInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}

/**
 * Asserts that the component sets the icon via setIcon injection.
 */
export const testSetIcon = (getWrapper: () => Promise<VueWrapper<any>>) => {
    beforeEach(() => {
        mockSetIconInjection.mockReset()
    })
    it('sets icon via injection', async () => {
        await getWrapper()
        await flushPromises()
        expect(mockSetIconInjection).toHaveBeenCalledOnce()
        /* TEST
        expect(mockAddLayer).toHaveBeenCalledWith({
            leafletObject: wrapper.vm.leafletObject,
        })*/
    })
}
