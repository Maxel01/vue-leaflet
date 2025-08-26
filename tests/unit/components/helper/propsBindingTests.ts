import { flushPromises, VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import getReactivePropCount, { mergeReactiveProps } from './props'
import { capitalizeFirstLetter, isFunction } from '../../../../src/utils'
import * as utils from '../../../../src/utils'
import { Layer } from 'leaflet'
import { mockAddLayer, mockRemoveLayer } from './injectionsTests'

export function testComponentPropBindings(
    getWrapper: () => Promise<VueWrapper<any>>,
    componentName: string
) {
    const { initOnly, reactiveNative } = getReactivePropCount(componentName)
    it('registers watch for each prop with matching setter', async () => {
        const propsBinderSpy = vi.spyOn(utils, 'propsBinder')
        await getWrapper()
        expect(propsBinderSpy).toHaveBeenCalledOnce()
        expect((propsBinderSpy.mock.results[0].value.length)).toBe(initOnly + reactiveNative)
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
            const values = Array.isArray(newValue?.values) ? newValue.values : [newValue]

            for (const [i, value] of values.entries()) {
                await wrapper.setProps({ [propName]: value })
                await flushPromises()

                if (updatedProps['expecting']?.[propName]) {
                    updatedProps['expecting']?.[propName](leafletObject, i, wrapper)
                    continue
                }
                const getter = 'get' + capitalizeFirstLetter(propName)
                if (isFunction(leafletObject[getter]))
                    expect(leafletObject[getter]()).toStrictEqual(newValue)
                else expect(leafletObject.options[propName]).toBe(newValue)
            }
        }
    )
}

export const componentProps = {}

export const layerProps = mergeReactiveProps(componentProps, {
    attribution: 'new attribution',
    name: 'name',
    layerType: 'overlay',
    visible: false,
    expecting: {
        name: (_leafletObject: Layer) => {
            expect(mockRemoveLayer).toHaveBeenCalledOnce()
            expect(mockAddLayer).toHaveBeenCalledTimes(2)
        },
        layerType: (_leafletObject: Layer) => {
            expect(mockRemoveLayer).toHaveBeenCalledOnce()
            expect(mockAddLayer).toHaveBeenCalledTimes(2)
        },
        visible: (_leafletObject: Layer) => {
            expect(mockRemoveLayer).toHaveBeenCalledOnce()
            expect(mockAddLayer).toHaveBeenCalledOnce()
        }
    }
})

export const interactiveLayerProps = mergeReactiveProps(layerProps, {})

export const pathProps = mergeReactiveProps(interactiveLayerProps, {
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
})

export const popperProps = mergeReactiveProps(componentProps, {
    content: '<div>Hello</div>'
})
