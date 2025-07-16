<script setup lang="ts">
import { inject, markRaw, nextTick, onMounted, ref } from "vue";
import { TileLayer } from 'leaflet'

const leafletObject = ref<TileLayer>()

const addLayer = assertInject(AddLayerInjection)

const { options, methods } = setupTileLayer(props, leafletObject, context)

onMounted(async () => {
    leafletObject.value = markRaw<TileLayer>(new TileLayer(props.url, options))

    const { listeners } = remapEvents(context.attrs)
    leafletObject.value.on(listeners)

    propsBinder(methods, leafletObject.value, props)
    addLayer({
        ...props,
        ...methods,
        leafletObject: leafletObject.value
    })
    nextTick(() => context.emit('ready', leafletObject.value))
})
</script>

<template></template>

<style scoped></style>
