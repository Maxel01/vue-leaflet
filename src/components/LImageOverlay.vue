<script setup lang="ts">
import { ImageOverlay } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    type ImageOverlayEmits,
    type ImageOverlayProps,
    imageOverlayPropsDefaults,
    setupImageOverlay,
} from '../functions/imageOverlay'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'

const props = withDefaults(defineProps<ImageOverlayProps>(), imageOverlayPropsDefaults)
const emit = defineEmits<ImageOverlayEmits>()

const { ready, leafletObject } = useImageOverlay()
defineExpose({ ready, leafletObject })

function useImageOverlay() {
    const leafletObject = ref<L.ImageOverlay>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupImageOverlay(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<ImageOverlay>(
            new ImageOverlay(props.url, props.bounds, options),
        )

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
