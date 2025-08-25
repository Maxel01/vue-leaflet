import { mergeReactiveProps } from '../helper/props'
import { LatLng, Polygon } from 'leaflet'
import { expect } from 'vitest'
import { polylineProps } from './LPolyline'

export const polygonProps = mergeReactiveProps(polylineProps, {
    latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ],
    expecting: {
        latLngs: (leafletObject: Polygon) => {
            expect(leafletObject.getLatLngs()).toStrictEqual([
                polygonProps.latLngs.map(([lat, lng]) => new LatLng(lat, lng)).slice(0, -1)
            ])
        }
    }
})
