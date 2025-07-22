<script setup lang="ts">
import {
  CreateVueGridLayer, type GridLayerEmits,
  type GridLayerProps,
  gridLayerPropsDefaults,
  setupGridLayer,
  type VueGridLayerTileRenderer,
} from '../functions/gridLayer.ts'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { GridLayer } from 'leaflet'

const props = withDefaults(
    defineProps<
        GridLayerProps & {
            childRender: VueGridLayerTileRenderer
        }
    >(),
    gridLayerPropsDefaults,
)

const emit = defineEmits<GridLayerEmits>()
const {leafletObject, root, ready} = useGridLayer()

defineExpose({ root, ready, leafletObject })

function useGridLayer() {
    const leafletObject = ref<GridLayer>()
    const root = ref<HTMLElement>()
    const ready = ref<boolean>(false)

    const addLayer = assertInject(AddLayerInjection)
    const { methods } = setupGridLayer(props, leafletObject, emit)

    onMounted(async () => {
        const GLayer = CreateVueGridLayer(props.childRender)
        leafletObject.value = markRaw<GridLayer>(new GLayer(props.layerOptions))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value!.on(listeners)

        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return {leafletObject, root, ready}
}
</script>

<template>
    <div v-if="ready" ref="root" style="display: none"></div>
</template>

<style scoped></style>
