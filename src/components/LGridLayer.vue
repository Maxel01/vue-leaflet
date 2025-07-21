<script setup lang="ts">
import { setupGridLayer, type VueGridLayerTileRenderer } from '../functions/gridLayer.ts'
import type { LayerType } from '../types/enums/LayerType.ts'
import { markRaw, nextTick, onMounted, type Ref, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { GridLayer } from 'leaflet'
import type { GridLayerOptions } from 'leaflet'

const props = defineProps<{
    gridLayerOptions?: GridLayerOptions
    name?: string
    layerType?: LayerType
    visible?: boolean
    childRender: VueGridLayerTileRenderer
}>()

const leafletObject = ref<GridLayer>()
const root = ref(null)
const ready = ref(false)

const addLayer = assertInject(AddLayerInjection)

defineExpose({ root, ready, leafletObject })

const emit = defineEmits<{
    (event: 'ready', gridLayer: GridLayer): void
}>()

const { methods } = setupGridLayer(props, leafletObject as Ref<GridLayer>, emit)

onMounted(async () => {
    leafletObject.value = markRaw<L.GridLayer>(new GridLayer(props.gridLayerOptions))

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
</script>

<template>
    <div v-if="ready" ref="root" style="display: none"></div>
</template>

<style scoped></style>
