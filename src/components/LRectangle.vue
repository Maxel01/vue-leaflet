<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    type RectangleEmits,
    type RectangleProps,
    rectanglePropsDefaults,
    setupRectangle,
} from '../functions/rectangle'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { LatLngBounds, Rectangle } from 'leaflet'

const props = withDefaults(defineProps<RectangleProps>(), rectanglePropsDefaults)
const emit = defineEmits<RectangleEmits>()

const { ready, leafletObject } = useRectangle()
defineExpose({ ready, leafletObject })

function useRectangle() {
    const leafletObject = ref<L.Rectangle>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupRectangle(props, leafletObject, emit)

    onMounted(async () => {
        const bounds = props.bounds
            ? new LatLngBounds(props.bounds)
            : new LatLngBounds(props.latLngs || [])
        leafletObject.value = markRaw<Rectangle>(new Rectangle(bounds, options))

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
