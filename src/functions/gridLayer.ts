import { onUnmounted, type Ref, type VNode } from 'vue'
import { GridLayer, Point } from 'leaflet'
import { setupLayer } from './layer.ts'

export type VueGridLayerTileRenderer = (props: { coords: Point }) => () => VNode

export const setupGridLayer = (props, leafletRef: Ref<GridLayer>, emit) => {
    const { methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const methods = {
        ...layerMethods,
        setTileComponent() {
            leafletRef.value?.redraw()
        },
    }

    onUnmounted(() => {
        leafletRef.value.off()
    })

    return { methods }
}
