import { mergeReactiveProps } from '@/tests/helper/props'
import { polygonProps } from './LPolygon'
import { LatLng, LatLngBounds, Rectangle } from 'leaflet'
import { expect } from 'vitest'

export const rectangleProps = mergeReactiveProps(polygonProps, {
    bounds: [
        new LatLng(46.2, -1.5),
        new LatLng(46.3, -1.5),
        new LatLng(46.3, -1.1),
        new LatLng(46.2, -1.1)
    ],
    latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ],
    expecting: {
        bounds: (leafletObject: Rectangle) => {
            expect(leafletObject.getBounds()).toStrictEqual(
                new LatLngBounds([46.3, -1.1], [46.2, -1.5])
            )
        },
        latLngs: (leafletObject: Rectangle) => {
            expect(leafletObject.getLatLngs()).toStrictEqual([
                [
                    new LatLng(19.466, -81.19),
                    new LatLng(33.321, -81.19),
                    new LatLng(33.321, -65.757),
                    new LatLng(19.466, -65.757)
                ]
            ])
        }
    }
})
