import { flushPromises, VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import getReactivePropCount from './props'
import { capitalizeFirstLetter, isFunction } from '../../../../src/utils'

export function testComponentPropBindings(
    getWrapper: () => Promise<VueWrapper<any>>,
    componentName: string
) {
    const { initOnly, reactiveNative } = getReactivePropCount(componentName)
    it('registers watch for each prop with matching setter', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        await getWrapper()
        expect(consoleWarnMock).toHaveBeenCalledTimes(initOnly + reactiveNative)
        consoleWarnMock.mockRestore()
    })
}

export function testPropsBindingToLeaflet(
    getWrapper: (initialProps?: Record<string, any>) => Promise<VueWrapper<any>>,
    updatedProps: Record<string, any>
) {
    const entries = Object.entries(updatedProps).filter(([key]) => key !== 'expecting')
    it.each(entries)(
        'updates Leaflet object when prop "%s" changes',
        async (propName, newValue) => {
            const wrapper = await getWrapper()
            const leafletObject = wrapper.vm.leafletObject

            await wrapper.setProps({ [propName]: newValue })
            await flushPromises()

            if (updatedProps['expecting']?.[propName]) {
                updatedProps['expecting']?.[propName](leafletObject)
                return
            }
            const getter = 'get' + capitalizeFirstLetter(propName)
            if (isFunction(leafletObject[getter]))
                expect(leafletObject[getter]()).toStrictEqual(newValue)
            else expect(leafletObject.options[propName]).toBe(newValue)
        }
    )
}

export const componentProps = {}

export const layerProps = {
    ...componentProps,
    attribution: 'attribution'
    // TEST name: "name",
    // TEST layerType: "base",
    // TEST visible: false,
}

export const interactiveLayerProps = {
    ...layerProps
}

export const pathProps = {
    ...interactiveLayerProps,
    stroke: false,
    color: 'green',
    weight: 5,
    opacity: 0.5,
    lineCap: 'square',
    lineJoin: 'square',
    dashArray: '4 1 2',
    dashOffset: '3',
    fill: true,
    fillColor: 'red',
    fillOpacity: 0.4,
    fillRule: 'nonzero',
    className: 'circleMarkerClass'
}

export const popperProps = {
    ...componentProps
    // TEST content
}
