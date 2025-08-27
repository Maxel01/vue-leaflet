import { mergeReactiveProps } from '../helper/props'
import { gridLayerProps } from './LGridLayer'
import { TileLayer } from 'leaflet'
import { expect } from 'vitest'

export const tileLayerProps = mergeReactiveProps(gridLayerProps, {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    expecting: {
        url: (l: TileLayer & { _url: string }) => {
            expect(l._url).toBe(tileLayerProps.url)
        }
    }
})
