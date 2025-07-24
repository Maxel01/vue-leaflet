<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import {
    type PolygonEmits,
    type PolygonProps,
    polygonPropsDefaults,
    setupPolygon,
} from '../functions/polygon'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { Polygon } from 'leaflet'

const props = withDefaults(defineProps<PolygonProps>(), polygonPropsDefaults)
const emit = defineEmits<PolygonEmits>()

const { ready, leafletObject } = usePolygon()
defineExpose({ ready, leafletObject })

function usePolygon() {
    const leafletObject = ref<L.Polygon>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupPolygon(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Polygon>(new Polygon(props.latLngs, options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)

        propsBinder(methods, leafletObject.value, props)

        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { ready, leafletObject }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <slot />
    </div>
</template>
