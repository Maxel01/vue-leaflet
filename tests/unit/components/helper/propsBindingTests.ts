import { flushPromises, VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

export function testComponentPropBindings(getWrapper: () => Promise<VueWrapper<any>>) {
    it('registers watch for each prop with matching setter', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        await getWrapper()
        expect(consoleWarnMock).not.toHaveBeenCalled()
        consoleWarnMock.mockRestore()
    })
}

export function testPropsBindingToLeaflet(
    getWrapper: (initialProps?: Record<string, any>) => Promise<VueWrapper<any>>,
    updatedProps: Record<string, any>,
) {
    const entries = Object.entries(updatedProps)
    it.each(entries)(
        'updates Leaflet object when prop "%s" changes',
        async (propName, newValue) => {
            const wrapper = await getWrapper()
            const leafletObject = wrapper.vm.leafletObject

            await wrapper.setProps({ [propName]: newValue })
            await flushPromises()

            expect(leafletObject.options[propName]).toBe(newValue)
        },
    )
}
