import { mergeReactiveProps } from '@/tests/helper/props'
import { layerProps } from '@/tests/helper/propsBindingTests'
import { type ImageOverlay, LatLngBounds } from 'leaflet'
import { expect } from 'vitest'

export const imageOverlayAbstractProps = mergeReactiveProps(layerProps, {
    opacity: 0.5,
    zIndex: 50,
    bounds: new LatLngBounds([0, 0], [50, 50])
})

export const imageOverlayProps = mergeReactiveProps(imageOverlayAbstractProps, {
    url: 'replace.jpg',
    expecting: {
        url: (leafletObject: ImageOverlay) => {
            // @ts-expect-error _url is private so not in the types
            expect(leafletObject._url).toBe(imageOverlayProps.url)
        }
    }
})
