import { mergeReactiveProps } from '@/tests/helper/props'
import { tileLayerProps } from './LTileLayer'
import type { TileLayer } from 'leaflet'
import { expect } from 'vitest'

export const wmsTileLayerProps = mergeReactiveProps(tileLayerProps, {
    url: 'https://ows.terrestris.de/osm/service?',
    expecting: {
        url: (l: TileLayer & { _url: string }) => {
            expect(l._url).toBe(wmsTileLayerProps.url)
        }
    }
})
