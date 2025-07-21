<script setup lang="ts">
import { markRaw, nextTick, onMounted, type Ref, ref, useAttrs } from 'vue'
import { TileLayer, type TileLayerOptions } from 'leaflet'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import type { LayerType } from '../types/enums/LayerType.ts'
import { setupTileLayer } from '../functions/tileLayer.ts'

const props = withDefaults(
    defineProps<{
        tileLayerOptions?: TileLayerOptions
        name?: string
        layerType?: LayerType
        visible?: boolean
        url: string
    }>(),
    { visible: true },
)
const leafletObject = ref<TileLayer>()

const addLayer = assertInject(AddLayerInjection)

const emit = defineEmits<{ (event: 'ready', tileLayer: TileLayer): void }>()
const { methods } = setupTileLayer(props, leafletObject as Ref<TileLayer>, emit)

defineExpose({ leafletObject })
onMounted(async () => {
    leafletObject.value = markRaw<TileLayer>(new TileLayer(props.url, props.tileLayerOptions))

    const { listeners } = remapEvents(useAttrs())
    leafletObject.value.on(listeners)

    propsBinder(methods, leafletObject.value, props)
    addLayer({
        ...props,
        ...methods,
        leafletObject: leafletObject.value,
    })
    nextTick(() => emit('ready', leafletObject.value!))
})
</script>

<template></template>
