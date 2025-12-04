<script setup lang="ts">
import {
    setupTileLayer,
    type TileLayerEmits,
    type TileLayerProps,
    tileLayerPropsDefaults
} from '@/functions/tileLayer'
import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import { TileLayer } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

/**
 * > Load tiles from a map server and display them accordingly to map zoom, center and size.
 * @demo tile-layer {7-19}
 */
defineOptions({ name: 'LTileLayer' })
const props = withDefaults(defineProps<TileLayerProps>(), tileLayerPropsDefaults)
const emit = defineEmits<TileLayerEmits>()

const { leafletObject } = useTileLayer()

defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<TileLayer \| undefined>}
     */
    leafletObject
})

function useTileLayer() {
    const leafletObject = ref<TileLayer>()

    const addLayer = assertInject(AddLayerInjection)
    const { options, methods } = setupTileLayer(props, leafletObject, emit)

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
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { leafletObject }
}
</script>

<template>
    <div style="display: none"></div>
</template>
