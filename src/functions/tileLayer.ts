import { setupGridLayer } from './gridLayer'
import type { Ref } from 'vue'
import { type TileLayer } from 'leaflet'

export const setupTileLayer = (props, leafletRef: Ref<TileLayer>, emit) => {
    const { methods: gridLayerMethods } = setupGridLayer(props, leafletRef, emit)

    const methods = {
        ...gridLayerMethods,
    }

    return { methods }
}
