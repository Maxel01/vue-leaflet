import { h, onUnmounted, type Ref, render, type VNode } from 'vue'
import {
    type Coords,
    DomUtil,
    GridLayer,
    type GridLayerOptions,
    Point,
    type TileEvent,
} from 'leaflet'
import {type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer} from './layer.ts'

export type GridLayerProps<T extends GridLayerOptions = GridLayerOptions> = LayerProps<T>

export const gridLayerPropsDefaults = {
    ...layerPropsDefaults
}

export type GridLayerEmits<T extends GridLayer = GridLayer> = LayerEmits & {
    (event: 'ready', layer: T): void
}

export type VueGridLayerTileRenderer = (props: { coords: Point }) => () => VNode

export const setupGridLayer = <T extends GridLayer>(props: GridLayerProps, leafletRef: Ref<T | undefined>, emit: GridLayerEmits<T>) => {
    const { methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const methods = {
        ...layerMethods,
        setTileComponent() {
            leafletRef.value?.redraw()
        },
    }

    onUnmounted(() => {
        leafletRef.value?.off()
    })

    return { methods }
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
