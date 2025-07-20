<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { TileLayer } from 'leaflet'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { AddLayerInjection } from '../types/injectionKeys.ts'

const props = defineProps<{}>()
const leafletObject = ref<TileLayer>()

const addLayer = assertInject(AddLayerInjection)

const { options, methods } = setupTileLayer(props, leafletObject, context)

defineExpose({ leafletObject })
const emit = defineEmits<{ (event: 'ready', tileLayer: TileLayer): void }>()

onMounted(async () => {
    leafletObject.value = markRaw<TileLayer>(new TileLayer(props.url, options))

    const { listeners } = remapEvents(useAttrs())
    leafletObject.value.on(listeners)

    propsBinder(methods, leafletObject.value, props)
    addLayer({
        ...props,
        ...methods,
        leafletObject: leafletObject.value
    })
    nextTick(() => emit('ready', leafletObject.value))
})
</script>

<template></template>

<style scoped></style>
