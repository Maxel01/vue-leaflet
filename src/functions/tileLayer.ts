import {
    type GridLayerEmits,
    type GridLayerAbstractProps,
    gridLayerAbstractPropsDefaults,
    setupGridLayer
} from './gridLayer'
import type { Ref } from 'vue'
import { TileLayer, type TileLayerOptions } from 'leaflet'
import { propsToLeafletOptions } from '@/utils'

export interface TileLayerProps<
    T extends TileLayerOptions = TileLayerOptions
> extends GridLayerAbstractProps<T> {
    /**
     * If `true`, inverses Y axis numbering for tiles (turn this on for TMS services)
     * @initOnly
     */
    tms?: boolean
    /**
     * Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
     * @initOnly
     */
    subdomains?: string | string[]
    /**
     * If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
     * @initOnly
     */
    detectRetina?: boolean
    /**
     * A string of the form `'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'`. See more in the [original Leaflet documentation](https://leafletjs.com/reference-2.0.0.html#tilelayer)
     * @reactive
     */
    url: string
    /**
     * A function that provides a TileLayer class. This prop may cause unintended errors, loss of reactivity or memory leaks if not used properly. Prefer creating a custom component if you encounter issues.
     * @param url url of the TileLayer
     * @param options options of the TileLayer
     * @initOnly
     */
    tileLayerClass?: (url: string, options: TileLayerOptions) => TileLayer
}

export const tileLayerPropsDefaults = {
    ...gridLayerAbstractPropsDefaults,
    tms: undefined,
    detectRetina: undefined,
    tileLayerClass: (url: string, options: TileLayerOptions) => new TileLayer(url, options)
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface TileLayerEmits<T extends TileLayer = TileLayer> extends GridLayerEmits<T> {}

export const setupTileLayer = <T extends TileLayer>(
    props: TileLayerProps,
    leafletRef: Ref<T | undefined>,
    emit: TileLayerEmits<T>
) => {
    const { options: gridLayerOptions, methods: gridLayerMethods } = setupGridLayer(
        props,
        leafletRef,
        emit
    )
    const options = propsToLeafletOptions<TileLayerOptions>(props, gridLayerOptions)

    const methods = {
        ...gridLayerMethods
    }

    return { options, methods }
}
