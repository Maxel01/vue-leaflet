<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    setupWMSTileLayer,
    type WmsTileLayerEmits,
    type WmsTileLayerProps,
    wmsTileLayerPropsDefaults,
} from '../functions/wmsTileLayer'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { TileLayer } from 'leaflet'

const props = withDefaults(defineProps<WmsTileLayerProps>(), wmsTileLayerPropsDefaults)
const emit = defineEmits<WmsTileLayerEmits>()

const { leafletObject } = useWmsTileLayer()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<TileLayer.WMS \| undefined>}
     */
    leafletObject
})

function useWmsTileLayer() {
    const leafletObject = ref<TileLayer.WMS>()

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupWMSTileLayer(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<TileLayer.WMS>(new TileLayer.WMS(props.url, options))

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
    return { leafletObject }
}
</script>

<template>
    <div style="display: none"></div>
</template>
