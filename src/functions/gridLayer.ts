import { h, onUnmounted, type Ref, render, type VNode } from 'vue'
import {
    type Coords,
    DomUtil,
    GridLayer,
    type GridLayerOptions,
    type Point,
    type PointExpression,
    type TileEvent,
} from 'leaflet'
import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer.ts'
import { propsToLeafletOptions } from '../utils.ts'

export interface GridLayerAbstractProps<T extends GridLayerOptions = GridLayerOptions>
    extends LayerProps<T> {
    /**
     * Opacity of the tiles. Can be used in the createTile() function.
     * @reactive
     */
    opacity?: number
    /**
     * The explicit zIndex of the tile layer
     * @reactive
     */
    zIndex?: number
    /**
     * Width and height of tiles in the grid. Use a number if width and height are equal, or `Point(width, height)` otherwise.
     * @initOnly
     */
    tileSize?: number | PointExpression
    /**
     * Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the [map CRS](https://leafletjs.com/reference.html#map-crs) doesn't wrap around. Can be used in combination with `bounds` to prevent requesting tiles outside the CRS limits.
     * @initOnly
     */
    noWrap?: boolean
    /**
     * The minimum zoom level down to which this layer will be displayed (inclusive)
     * @initOnly
     */
    minZoom?: number
    /**
     * The maximum zoom level up to which this layer will be displayed (inclusive)
     * @initOnly
     */
    maxZoom?: number
    /**
     * A custom class name to assign to the tile layer. Empty by default.
     * @initOnly
     */
    className?: string
}

export interface GridLayerProps extends GridLayerAbstractProps {
    /**
     * @initOnly
     */
    childRender: VueGridLayerTileRenderer
}

export const gridLayerAbstractPropsDefaults = {
    ...layerPropsDefaults,
    noWrap: undefined,
}

export const gridLayerPropsDefaults = gridLayerAbstractPropsDefaults

export interface GridLayerEmits<T extends GridLayer = GridLayer> extends LayerEmits {
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', layer: T): void
}

export type VueGridLayerTileRenderer = (props: { coords: Point }) => () => VNode

export const setupGridLayer = <T extends GridLayer>(
    props: GridLayerAbstractProps,
    leafletRef: Ref<T | undefined>,
    emit: GridLayerEmits<T>,
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<GridLayerOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        setTileComponent() {
            leafletRef.value?.redraw()
        },
    }

    onUnmounted(() => {
        leafletRef.value?.off()
    })

    return { options, methods }
}

export function CreateVueGridLayer(childRenderer: VueGridLayerTileRenderer): typeof GridLayer {
    class VueGridLayer extends GridLayer {
        private tileComponents: Record<string, HTMLElement | undefined> = {}

        constructor(options?: GridLayerOptions) {
            super(options)
            this.on('tileunload', this._unloadTile, this)
        }

        override createTile(coords: Coords): HTMLElement {
            const key = this._tileCoordsToKey(coords)
            const container = DomUtil.create('div')
            this.tileComponents[key] = container

            const vnode = h({ setup: childRenderer, props: ['coords'] }, { coords })
            render(vnode, container)

            return container
        }

        private _unloadTile(e: TileEvent): void {
            const key = this._tileCoordsToKey(e.coords)
            const tile = this.tileComponents[key]
            if (tile) {
                tile.innerHTML = ''
                this.tileComponents[key] = undefined
            }
        }
    }

    return VueGridLayer
}
