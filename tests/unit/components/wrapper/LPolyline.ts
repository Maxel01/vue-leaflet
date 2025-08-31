import { mergeReactiveProps } from '@/tests/helper/props'
import { pathProps } from '@/tests/helper/propsBindingTests'
import { LatLng, type Polyline } from 'leaflet'
import { expect } from 'vitest'

export const polylineProps = mergeReactiveProps(pathProps, {
    smoothFactor: 0.9,
    noClip: true,
    latLngs: [
        [47.4, -1.51],
        [47.34, -1.3],
        [47.24, -1.2],
        [47.23, -1.36]
    ],
    expecting: {
        latLngs: (leafletObject: Polyline) => {
            expect(leafletObject.getLatLngs()).toStrictEqual(
                polylineProps.latLngs.map(([lat, lng]) => new LatLng(lat, lng))
            )
        }
    }
})
