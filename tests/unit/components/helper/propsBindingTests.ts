import { flushPromises, VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import getReactivePropCount from './props'
import { capitalizeFirstLetter, isFunction } from '../../../../src/utils'
import { LatLng, LatLngBounds } from 'leaflet'

export function testComponentPropBindings(
    getWrapper: () => Promise<VueWrapper<any>>,
    componentName: string
) {
    const { initOnly } = getReactivePropCount(componentName)
    it('registers watch for each prop with matching setter', async () => {
        const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
        await getWrapper()
        expect(consoleWarnMock).toHaveBeenCalledTimes(initOnly)
        consoleWarnMock.mockRestore()
    })
}

export function testPropsBindingToLeaflet(
    getWrapper: (initialProps?: Record<string, any>) => Promise<VueWrapper<any>>,
    updatedProps: Record<string, any>
) {
    const entries = Object.entries(updatedProps)
    it.each(entries)(
        'updates Leaflet object when prop "%s" changes',
        async (propName, newValue) => {
            const wrapper = await getWrapper()
            const leafletObject = wrapper.vm.leafletObject

            await wrapper.setProps({ [propName]: newValue })
            await flushPromises()

            const getter = 'get' + capitalizeFirstLetter(propName)
            if (isFunction(leafletObject[getter]))
                expect(leafletObject[getter]()).toStrictEqual(newValue)
            else expect(leafletObject.options[propName]).toBe(newValue)
        }
    )
}

const componentProps = {}

const layerProps = {
    ...componentProps,
    attribution: 'attribution'
    // TEST name: "name",
    // TEST layerType: "base",
    // TEST visible: false,
}

const interactiveLayerProps = {
    ...layerProps
}

const pathProps = {
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

export const circleMarkerProps = {
    ...pathProps,
    radius: 15,
    latLng: new LatLng(44.5, 11.5)
}

export const circleProps = {
    ...circleMarkerProps,
    radius: 10000
}

export const markerProps = {
    ...layerProps,
    // TEST draggable: true,
    // TEST icon: ?,
    // TEST zIndexOffset: 5,
    latLng: new LatLng(44.5, 11.5)
}

export const layerGroupProps = {
    ...layerProps
}

export const featureGroupProps = {
    ...layerGroupProps
}

export const geoJsonProps = {
    ...layerGroupProps
    // TEST geojson: await import("../geo.json"),
    /* TEST optionsStyle: (feature) => ({
        opacity: feature.properties.code / 100000
    })*/
}

export const gridLayerProps = {
    ...layerProps
    // TEST opacity: 0.5,
    // TEST zIndex: 50
}

export const iconProps = {
    ...componentProps
    // TODO add props
}

export const imageOverlayAbstractProps = {
    ...layerProps,
    opacity: 0.5,
    zIndex: 50,
    bounds: new LatLngBounds([0, 0], [50, 50])
}

export const imageOverlayProps = {
    ...imageOverlayAbstractProps,
    url: 'https://www.printablee.com/postpic/2011/06/blank-100-square-grid-paper_405041.jpg'
}

export const svgOverlayProps = {
    ...imageOverlayAbstractProps,
    // TODO use svg url
    svg: 'https://www.printablee.com/postpic/2011/06/blank-100-square-grid-paper_405041.jpg'
}

export const videoOverlayProps = {
    ...imageOverlayAbstractProps,
    video: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm'
}

export const polylineProps = {
    ...pathProps,
    smoothFactor: 0.9,
    noClip: true
    /* TEST latLngs: [
        [47.4, -1.51],
        [47.34, -1.3],
        [47.24, -1.2],
        [47.23, -1.36]
    ]*/
}

export const polygonProps = {
    ...polylineProps
    /* TEST latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ]*/
}

export const popperProps = {
    ...componentProps
    // TEST content
}

export const popupProps = {
    ...popperProps
    // TEST latLng: new LatLng(44.5, 11.5)
}

export const tooltipProps = {
    ...popperProps
}

export const rectangleProps = {
    ...polygonProps
    /* TEST bounds: [
        new LatLng(46.2, -1.5),
        new LatLng(46.3, -1.5),
        new LatLng(46.3, -1.1),
        new LatLng(46.2, -1.1)
    ]*/
    /* TEST latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ]*/
}
