<script setup lang="ts">
import { markRaw, nextTick, onMounted, type Ref, ref, useAttrs } from 'vue'
import { TileLayer } from 'leaflet'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import {
  setupTileLayer, type TileLayerEmits,
  type TileLayerProps,
  tileLayerPropsDefaults,
} from '../functions/tileLayer.ts'

const props = withDefaults(defineProps<TileLayerProps>(), tileLayerPropsDefaults)
const leafletObject = ref<TileLayer>()

const addLayer = assertInject(AddLayerInjection)

const emit = defineEmits<TileLayerEmits>()
const { methods } = setupTileLayer(props, leafletObject as Ref<TileLayer>, emit)

defineExpose({ leafletObject })
onMounted(async () => {
    leafletObject.value = markRaw<TileLayer>(new TileLayer(props.url, props.layerOptions))

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
